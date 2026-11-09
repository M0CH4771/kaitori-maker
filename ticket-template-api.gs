const TEMPLATE_PROPERTY = 'TICKET_SHARED_TEMPLATES_V1';
const ADMIN_KEY_PROPERTY = 'TICKET_TEMPLATE_ADMIN_KEY';
const MAX_SHARED_TEMPLATES = 20;
// Apps Scriptのプロパティは1値あたり約9KB（UTF-8バイト数）が上限のため、余裕を持たせて分割する。
const TEMPLATE_CHUNK_BYTES = 8000;
// プロパティストア全体の上限（約500KB）から、管理キーやチャンク名の分を差し引いた保存上限。
const MAX_TEMPLATE_BYTES = 440000;
const LOCK_TIMEOUT_MS = 15000;
const IMAGE_PROXY_MAX_BYTES = 3 * 1024 * 1024;

function setupTicketTemplateApi() {
  const properties = PropertiesService.getScriptProperties();
  let key = properties.getProperty(ADMIN_KEY_PROPERTY);
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '');
    properties.setProperty(ADMIN_KEY_PROPERTY, key);
  }
  console.log('管理キー: ' + key);
  return key;
}

function doGet(e) {
  let result;
  const action = String((e && e.parameter && e.parameter.action) || '');
  try {
    result = action === 'image'
      ? { ok: true, dataUrl: fetchImageDataUrl_(e.parameter.url) }
      : { ok: true, templates: withLock_(() => readTemplates_()) };
  } catch (error) {
    result = { ok: false, error: String(error.message || error) };
  }
  const callback = String((e && e.parameter && e.parameter.callback) || '');
  const json = JSON.stringify(result);
  if (callback && /^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    assertAdmin_(params.adminKey);
    const action = String(params.action || '');
    const payload = JSON.parse(String(params.payload || '{}'));
    withLock_(() => {
      if (action === 'save') saveTemplate_(payload);
      else if (action === 'delete') deleteTemplate_(payload.id);
      else throw new Error('未対応の操作です。');
    });
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

// CORS制限で画像を直接取得できない場合の取得口。外部の無料プロキシより先に使う。
// 画像以外・大きすぎる画像は返さない。CacheServiceの上限（1値100KB）に収まるものだけ6時間キャッシュする。
function fetchImageDataUrl_(rawUrl) {
  const url = String(rawUrl || '').trim();
  if (!/^https?:\/\/[^\s]+$/i.test(url) || url.length > 2000) throw new Error('画像URLが不正です。');
  const cache = CacheService.getScriptCache();
  const cacheKey = 'img_' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, url)
  );
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
  if (response.getResponseCode() !== 200) throw new Error('画像を取得できませんでした（' + response.getResponseCode() + '）。');
  const blob = response.getBlob();
  const contentType = String(blob.getContentType() || '').toLowerCase();
  if (!/^image\/[a-z0-9.+-]+$/.test(contentType)) throw new Error('画像ではありません。');
  const bytes = blob.getBytes();
  if (!bytes.length || bytes.length > IMAGE_PROXY_MAX_BYTES) throw new Error('画像サイズが大きすぎます。');
  const dataUrl = 'data:' + contentType + ';base64,' + Utilities.base64Encode(bytes);
  if (dataUrl.length <= 95000) cache.put(cacheKey, dataUrl, 21600);
  return dataUrl;
}

function withLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(LOCK_TIMEOUT_MS)) throw new Error('他の端末が保存中です。少し待ってからもう一度お試しください。');
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}

// 読み込みに失敗した場合は空配列を返さずにエラーにする。
// 空配列で続行すると、次の保存で既存テンプレートがすべて上書き消去されるため。
function readTemplates_() {
  const properties = PropertiesService.getScriptProperties();
  const count = Number(properties.getProperty(TEMPLATE_PROPERTY + '_COUNT') || 0);
  if (!count) return [];
  let source = '';
  for (let index = 0; index < count; index++) {
    const chunk = properties.getProperty(TEMPLATE_PROPERTY + '_' + index);
    if (chunk === null) throw new Error('共有テンプレートの保存データが欠けています（' + index + '/' + count + '）。');
    source += chunk;
  }
  let value;
  try {
    value = JSON.parse(source);
  } catch (error) {
    throw new Error('共有テンプレートの保存データを読み込めません。');
  }
  if (!Array.isArray(value)) throw new Error('共有テンプレートの保存データ形式が不正です。');
  return value;
}

function saveTemplate_(source) {
  const name = String(source.name || '').trim().slice(0, 40);
  if (!name) throw new Error('テンプレート名が必要です。');
  const templates = readTemplates_();
  const id = String(source.id || Utilities.getUuid());
  const lowerName = name.toLowerCase();
  const sameName = templates.find(item => String(item.name).toLowerCase() === lowerName && String(item.id) !== id);
  if (sameName) {
    throw new Error('「' + name + '」という名前の共有テンプレートが既にあります。一覧を読み込み直してから上書きするか、別の名前にしてください。');
  }
  const template = {
    id: id,
    name: name,
    settings: source.settings || {},
    layout: source.layout || {},
    logoDataUrl: sanitizeLogoDataUrl_(source.logoDataUrl),
    updatedAt: new Date().toISOString()
  };
  const index = templates.findIndex(item => String(item.id) === id);
  if (index >= 0) templates.splice(index, 1);
  templates.unshift(template);
  if (templates.length > MAX_SHARED_TEMPLATES) templates.length = MAX_SHARED_TEMPLATES;
  writeTemplates_(templates);
}

function deleteTemplate_(id) {
  const target = String(id || '');
  const templates = readTemplates_().filter(item => String(item.id) !== target);
  writeTemplates_(templates);
}

function sanitizeLogoDataUrl_(value) {
  const text = String(value || '');
  // base64形式・URLエンコード形式（SVG）の画像データURLのみ許可し、HTML属性を壊せる文字は拒否する。
  return /^data:image\/[a-z0-9.+-]+(?:;[a-z0-9=._-]+)*,[^"<>\\\s`]*$/i.test(text) ? text : '';
}

function utf8Length_(text) {
  let bytes = 0;
  for (const char of text) {
    const code = char.codePointAt(0);
    bytes += code < 0x80 ? 1 : code < 0x800 ? 2 : code < 0x10000 ? 3 : 4;
  }
  return bytes;
}

// UTF-8のバイト数で分割する（コードポイント単位なので、サロゲートペアの途中では切らない）。
function splitByUtf8Bytes_(text, maxBytes) {
  const chunks = [];
  let current = '';
  let currentBytes = 0;
  for (const char of text) {
    const code = char.codePointAt(0);
    const size = code < 0x80 ? 1 : code < 0x800 ? 2 : code < 0x10000 ? 3 : 4;
    if (currentBytes + size > maxBytes) {
      chunks.push(current);
      current = '';
      currentBytes = 0;
    }
    current += char;
    currentBytes += size;
  }
  if (current) chunks.push(current);
  return chunks;
}

function writeTemplates_(templates) {
  const properties = PropertiesService.getScriptProperties();
  const source = JSON.stringify(templates);
  if (utf8Length_(source) > MAX_TEMPLATE_BYTES) {
    throw new Error('共有テンプレートの保存容量を超えました。不要なテンプレートか大きなロゴを削除してください。');
  }
  const oldCount = Number(properties.getProperty(TEMPLATE_PROPERTY + '_COUNT') || 0);
  const chunks = splitByUtf8Bytes_(source, TEMPLATE_CHUNK_BYTES);
  const values = {};
  chunks.forEach((chunk, index) => { values[TEMPLATE_PROPERTY + '_' + index] = chunk; });
  values[TEMPLATE_PROPERTY + '_COUNT'] = String(chunks.length);
  // チャンクと件数を1回の呼び出しでまとめて書き込む。
  properties.setProperties(values, false);
  for (let index = chunks.length; index < oldCount; index++) properties.deleteProperty(TEMPLATE_PROPERTY + '_' + index);
}

function assertAdmin_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty(ADMIN_KEY_PROPERTY);
  if (!expected) throw new Error('setupTicketTemplateApiを先に実行してください。');
  if (!constantTimeEquals_(String(provided || ''), expected)) throw new Error('管理キーが違います。');
}

function constantTimeEquals_(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index++) diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return diff === 0;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
