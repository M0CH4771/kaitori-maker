const TEMPLATE_PROPERTY = 'TICKET_SHARED_TEMPLATES_V1';
const ADMIN_KEY_PROPERTY = 'TICKET_TEMPLATE_ADMIN_KEY';
const MAX_SHARED_TEMPLATES = 20;
const TEMPLATE_CHUNK_SIZE = 8000;

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
  const result = { ok: true, templates: readTemplates_() };
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
    if (action === 'save') saveTemplate_(payload);
    else if (action === 'delete') deleteTemplate_(payload.id);
    else throw new Error('未対応の操作です。');
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function readTemplates_() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const count = Number(properties.getProperty(TEMPLATE_PROPERTY + '_COUNT') || 0);
    let source = '';
    for (let index = 0; index < count; index++) source += properties.getProperty(TEMPLATE_PROPERTY + '_' + index) || '';
    const value = JSON.parse(source || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function saveTemplate_(source) {
  const name = String(source.name || '').trim().slice(0, 40);
  if (!name) throw new Error('テンプレート名が必要です。');
  const templates = readTemplates_();
  const id = String(source.id || Utilities.getUuid());
  const template = {
    id: id,
    name: name,
    settings: source.settings || {},
    layout: source.layout || {},
    logoDataUrl: /^data:image\//.test(String(source.logoDataUrl || '')) ? String(source.logoDataUrl) : '',
    updatedAt: new Date().toISOString()
  };
  const index = templates.findIndex(item => String(item.id) === id || String(item.name).toLowerCase() === name.toLowerCase());
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

function writeTemplates_(templates) {
  const properties = PropertiesService.getScriptProperties();
  const source = JSON.stringify(templates);
  if (source.length > 450000) throw new Error('共有テンプレートの保存容量を超えました。不要なテンプレートか大きなロゴを削除してください。');
  const oldCount = Number(properties.getProperty(TEMPLATE_PROPERTY + '_COUNT') || 0);
  const chunks = [];
  for (let index = 0; index < source.length; index += TEMPLATE_CHUNK_SIZE) chunks.push(source.slice(index, index + TEMPLATE_CHUNK_SIZE));
  chunks.forEach((chunk, index) => properties.setProperty(TEMPLATE_PROPERTY + '_' + index, chunk));
  for (let index = chunks.length; index < oldCount; index++) properties.deleteProperty(TEMPLATE_PROPERTY + '_' + index);
  properties.setProperty(TEMPLATE_PROPERTY + '_COUNT', String(chunks.length));
}

function assertAdmin_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty(ADMIN_KEY_PROPERTY);
  if (!expected) throw new Error('setupTicketTemplateApiを先に実行してください。');
  if (String(provided || '') !== expected) throw new Error('管理キーが違います。');
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
