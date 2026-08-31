"use strict";

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const PRODUCT_PAGE_SIZE = 40;
const TICKET_WIDTH_PX = 744;
const TICKET_HEIGHT_PX = 1039;
const ACTIVE_STORE_KEY = "kaitori_active_store_v1";
const TICKET_SETTINGS_KEY = "kaitori_prize_ticket_settings_v1";
const TICKET_LAYOUT_KEY = "kaitori_prize_ticket_layout_v2";
const DEFAULT_NOTES = "【注意事項】\n※本券は、自販機から排出後に店内で開封した場合のみ有効です。\n※開封前・開封後を問わず、店外へ持ち出した場合は無効です。\n※本券が入っていた場合は、そのまま受付までお持ちください。\n※後日のお引換えはできません。\n※引換時に本券を回収いたします。\n※複製・改ざん・無効なシリアルの券は使用できません。";

const DEFAULT_SETTINGS = Object.freeze({
  title: "商品引換券",
  subtitle: "PRIZE EXCHANGE TICKET",
  notes: DEFAULT_NOTES
});

const DEFAULT_LAYOUT_SETTINGS = Object.freeze({
  cardWidthMm: 63,
  cardHeightMm: 88,
  gapXMm: 2,
  gapYMm: 2,
  offsetXMm: 0,
  offsetYMm: 0,
  cropMarks: true,
  borderWidth: 14,
  innerInset: 23,
  edgeHeight: 16,
  logoX: 157,
  logoY: 43,
  logoWidth: 430,
  logoHeight: 108,
  titleX: 372,
  titleY: 194,
  titleSize: 40,
  subtitleX: 372,
  subtitleY: 224,
  subtitleSize: 21,
  imageX: 72,
  imageY: 238,
  imageWidth: 600,
  imageHeight: 386,
  imageZoom: 1.25,
  imageOffsetX: 0,
  imageOffsetY: 0,
  bannerX: 77,
  bannerY: 634,
  bannerWidth: 590,
  bannerHeight: 76,
  bannerSize: 28,
  serialLabelX: 372,
  serialLabelY: 754,
  serialLabelSize: 30,
  serialBoxX: 142,
  serialBoxY: 771,
  serialBoxWidth: 460,
  serialBoxHeight: 64,
  serialSize: 31,
  dividerY: 854,
  notesX: 65,
  notesY: 869,
  notesWidth: 614,
  notesSize: 15,
  notesLineHeight: 20,
  notesMaxLines: 8
});

const LAYOUT_CONTROL_GROUPS = Object.freeze([
  {
    title: "A4面付け",
    description: "券の実寸・券同士の間隔・用紙内の位置",
    fields: [
      { key: "cardWidthMm", label: "券の横幅", min: 55, max: 65, step: .5, unit: "mm" },
      { key: "cardHeightMm", label: "券の縦幅", min: 80, max: 94, step: .5, unit: "mm" },
      { key: "gapXMm", label: "横の間隔", min: 0, max: 8, step: .5, unit: "mm" },
      { key: "gapYMm", label: "縦の間隔", min: 0, max: 8, step: .5, unit: "mm" },
      { key: "offsetXMm", label: "全体の左右位置", min: -15, max: 15, step: .5, unit: "mm" },
      { key: "offsetYMm", label: "全体の上下位置", min: -15, max: 15, step: .5, unit: "mm" }
    ]
  },
  {
    title: "外枠・金帯",
    description: "券面を囲む枠と上下の金帯",
    fields: [
      { key: "borderWidth", label: "金枠の太さ", min: 4, max: 26, step: 1, unit: "px" },
      { key: "innerInset", label: "内枠の余白", min: 14, max: 46, step: 1, unit: "px" },
      { key: "edgeHeight", label: "上下金帯の高さ", min: 0, max: 34, step: 1, unit: "px" }
    ]
  },
  {
    title: "店舗ロゴ",
    description: "左・上位置と表示領域",
    fields: [
      { key: "logoX", label: "左位置", min: 20, max: 500, step: 1, unit: "px" },
      { key: "logoY", label: "上位置", min: 20, max: 220, step: 1, unit: "px" },
      { key: "logoWidth", label: "横幅", min: 160, max: 650, step: 2, unit: "px" },
      { key: "logoHeight", label: "高さ", min: 45, max: 180, step: 1, unit: "px" }
    ]
  },
  {
    title: "タイトル・英字",
    description: "文字の中心位置と大きさ",
    fields: [
      { key: "titleX", label: "タイトル左右", min: 80, max: 664, step: 1, unit: "px" },
      { key: "titleY", label: "タイトル上下", min: 90, max: 340, step: 1, unit: "px" },
      { key: "titleSize", label: "タイトル文字", min: 20, max: 64, step: 1, unit: "px" },
      { key: "subtitleX", label: "英字左右", min: 80, max: 664, step: 1, unit: "px" },
      { key: "subtitleY", label: "英字上下", min: 110, max: 380, step: 1, unit: "px" },
      { key: "subtitleSize", label: "英字文字", min: 11, max: 38, step: 1, unit: "px" }
    ]
  },
  {
    title: "商品画像",
    description: "画像領域・拡大率・領域内の位置",
    fields: [
      { key: "imageX", label: "左位置", min: 20, max: 450, step: 1, unit: "px" },
      { key: "imageY", label: "上位置", min: 160, max: 620, step: 1, unit: "px" },
      { key: "imageWidth", label: "横幅", min: 180, max: 700, step: 2, unit: "px" },
      { key: "imageHeight", label: "高さ", min: 120, max: 520, step: 2, unit: "px" },
      { key: "imageZoom", label: "画像ズーム", min: .5, max: 2.5, step: .05, unit: "倍" },
      { key: "imageOffsetX", label: "画像だけ左右", min: -180, max: 180, step: 2, unit: "px" },
      { key: "imageOffsetY", label: "画像だけ上下", min: -180, max: 180, step: 2, unit: "px" }
    ]
  },
  {
    title: "商品名",
    description: "金色の商品名帯",
    fields: [
      { key: "bannerX", label: "左位置", min: 20, max: 400, step: 1, unit: "px" },
      { key: "bannerY", label: "上位置", min: 420, max: 820, step: 1, unit: "px" },
      { key: "bannerWidth", label: "横幅", min: 260, max: 700, step: 2, unit: "px" },
      { key: "bannerHeight", label: "高さ", min: 44, max: 130, step: 1, unit: "px" },
      { key: "bannerSize", label: "商品名文字", min: 14, max: 44, step: 1, unit: "px" }
    ]
  },
  {
    title: "シリアル",
    description: "見出しと番号枠の位置・大きさ",
    fields: [
      { key: "serialLabelX", label: "見出し左右", min: 80, max: 664, step: 1, unit: "px" },
      { key: "serialLabelY", label: "見出し上下", min: 560, max: 910, step: 1, unit: "px" },
      { key: "serialLabelSize", label: "見出し文字", min: 15, max: 50, step: 1, unit: "px" },
      { key: "serialBoxX", label: "番号枠の左位置", min: 30, max: 480, step: 1, unit: "px" },
      { key: "serialBoxY", label: "番号枠の上位置", min: 590, max: 930, step: 1, unit: "px" },
      { key: "serialBoxWidth", label: "番号枠の横幅", min: 220, max: 670, step: 2, unit: "px" },
      { key: "serialBoxHeight", label: "番号枠の高さ", min: 38, max: 100, step: 1, unit: "px" },
      { key: "serialSize", label: "番号文字", min: 16, max: 48, step: 1, unit: "px" }
    ]
  },
  {
    title: "注意事項",
    description: "区切り線と本文領域",
    fields: [
      { key: "dividerY", label: "区切り線の上下", min: 700, max: 980, step: 1, unit: "px" },
      { key: "notesX", label: "本文の左位置", min: 30, max: 250, step: 1, unit: "px" },
      { key: "notesY", label: "本文の上位置", min: 720, max: 990, step: 1, unit: "px" },
      { key: "notesWidth", label: "本文の横幅", min: 280, max: 670, step: 2, unit: "px" },
      { key: "notesSize", label: "本文文字", min: 9, max: 26, step: 1, unit: "px" },
      { key: "notesLineHeight", label: "本文の行間", min: 12, max: 34, step: 1, unit: "px" },
      { key: "notesMaxLines", label: "最大行数", min: 3, max: 12, step: 1, unit: "行" }
    ]
  }
]);

const NO_IMAGE_DATA_URL = createSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="360" viewBox="0 0 500 360">
    <rect width="500" height="360" rx="18" fill="#f4f2ec"/>
    <path d="M150 122h200v116H150z" fill="none" stroke="#c7b983" stroke-width="6"/>
    <circle cx="215" cy="165" r="18" fill="#d8cb9d"/>
    <path d="m164 220 72-60 48 43 40-31 27 48" fill="none" stroke="#c7b983" stroke-width="7" stroke-linejoin="round"/>
    <text x="250" y="286" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="#8c805b">NO IMAGE</text>
  </svg>
`);

const DEFAULT_LOGO_DATA_URL = createSvgDataUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="160" viewBox="0 0 600 160">
    <rect width="600" height="160" rx="18" fill="#ffffff"/>
    <path d="M40 80h74M486 80h74" stroke="#d9ad4a" stroke-width="5"/>
    <text x="300" y="68" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="#111827" letter-spacing="6">SHOP</text>
    <text x="300" y="112" text-anchor="middle" font-family="Arial,sans-serif" font-size="40" font-weight="900" fill="#a90018" letter-spacing="2">LOGO</text>
  </svg>
`);

const state = {
  products: [],
  selectedOrder: [],
  productPage: 1,
  previewPage: 1,
  settings: { ...DEFAULT_SETTINGS },
  layout: { ...DEFAULT_LAYOUT_SETTINGS },
  logoDataUrl: DEFAULT_LOGO_DATA_URL,
  sourceName: "",
  exporting: false
};

const imageDataCache = new Map();
const imageElementCache = new Map();

const elements = {
  csvFileInput: document.getElementById("csvFileInput"),
  csvChooseButton: document.getElementById("csvChooseButton"),
  csvStatus: document.getElementById("csvStatus"),
  csvCountBadge: document.getElementById("csvCountBadge"),
  productSearchInput: document.getElementById("productSearchInput"),
  groupFilterSelect: document.getElementById("groupFilterSelect"),
  selectedOnlyCheckbox: document.getElementById("selectedOnlyCheckbox"),
  selectPageButton: document.getElementById("selectPageButton"),
  clearSelectionButton: document.getElementById("clearSelectionButton"),
  productList: document.getElementById("productList"),
  productPagination: document.getElementById("productPagination"),
  productPrevButton: document.getElementById("productPrevButton"),
  productNextButton: document.getElementById("productNextButton"),
  productPageLabel: document.getElementById("productPageLabel"),
  selectedProductCount: document.getElementById("selectedProductCount"),
  selectedTicketCount: document.getElementById("selectedTicketCount"),
  selectedPageCount: document.getElementById("selectedPageCount"),
  ticketTitleInput: document.getElementById("ticketTitleInput"),
  ticketSubtitleInput: document.getElementById("ticketSubtitleInput"),
  ticketNotesInput: document.getElementById("ticketNotesInput"),
  ticketLogoInput: document.getElementById("ticketLogoInput"),
  logoStatus: document.getElementById("logoStatus"),
  layoutControls: document.getElementById("layoutControls"),
  cropMarksCheckbox: document.getElementById("cropMarksCheckbox"),
  resetLayoutButton: document.getElementById("resetLayoutButton"),
  layoutWarning: document.getElementById("layoutWarning"),
  exportSummary: document.getElementById("exportSummary"),
  exportDetail: document.getElementById("exportDetail"),
  exportPdfButton: document.getElementById("exportPdfButton"),
  exportProgressTrack: document.getElementById("exportProgressTrack"),
  exportProgressBar: document.getElementById("exportProgressBar"),
  a4Sheet: document.getElementById("a4Sheet"),
  previewHint: document.getElementById("previewHint"),
  previewPrevButton: document.getElementById("previewPrevButton"),
  previewNextButton: document.getElementById("previewNextButton"),
  previewPageLabel: document.getElementById("previewPageLabel"),
  previewCardMeta: document.getElementById("previewCardMeta"),
  previewGridMeta: document.getElementById("previewGridMeta"),
  previewGapMeta: document.getElementById("previewGapMeta"),
  previewMarginMeta: document.getElementById("previewMarginMeta")
};

function createSvgDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(String(svg).trim())}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clamp(value, min, max) {
  const numeric = Number(value);
  return Math.min(max, Math.max(min, Number.isFinite(numeric) ? numeric : min));
}

function scopedStorageKey(baseKey) {
  const storeId = localStorage.getItem(ACTIVE_STORE_KEY) || "main";
  return `${baseKey}__store_${storeId}`;
}

function getScopedItem(baseKey) {
  return localStorage.getItem(scopedStorageKey(baseKey)) ?? localStorage.getItem(baseKey);
}

function setScopedItem(baseKey, value) {
  localStorage.setItem(scopedStorageKey(baseKey), String(value));
}

function normalizeSettings(candidate = {}) {
  return {
    title: String(candidate.title || DEFAULT_SETTINGS.title).trim().slice(0, 20) || DEFAULT_SETTINGS.title,
    subtitle: String(candidate.subtitle || DEFAULT_SETTINGS.subtitle).trim().slice(0, 36) || DEFAULT_SETTINGS.subtitle,
    notes: String(candidate.notes || DEFAULT_SETTINGS.notes).slice(0, 900) || DEFAULT_SETTINGS.notes
  };
}

function roundToStep(value, step) {
  const decimals = String(step).includes(".") ? String(step).split(".")[1].length : 0;
  return Number((Math.round(value / step) * step).toFixed(decimals));
}

function normalizeLayoutSettings(candidate = {}) {
  const normalized = { ...DEFAULT_LAYOUT_SETTINGS };
  LAYOUT_CONTROL_GROUPS.forEach(group => {
    group.fields.forEach(field => {
      const raw = Number(candidate[field.key]);
      const fallback = DEFAULT_LAYOUT_SETTINGS[field.key];
      normalized[field.key] = roundToStep(clamp(Number.isFinite(raw) ? raw : fallback, field.min, field.max), field.step);
    });
  });
  normalized.cropMarks = candidate.cropMarks === undefined
    ? DEFAULT_LAYOUT_SETTINGS.cropMarks
    : Boolean(candidate.cropMarks);
  return normalized;
}

function getGridGeometry(layout = state.layout) {
  const gridWidth = layout.cardWidthMm * 3 + layout.gapXMm * 2;
  const gridHeight = layout.cardHeightMm * 3 + layout.gapYMm * 2;
  const startX = (PAGE_WIDTH_MM - gridWidth) / 2 + layout.offsetXMm;
  const startY = (PAGE_HEIGHT_MM - gridHeight) / 2 + layout.offsetYMm;
  return {
    gridWidth,
    gridHeight,
    startX,
    startY,
    rightMargin: PAGE_WIDTH_MM - startX - gridWidth,
    bottomMargin: PAGE_HEIGHT_MM - startY - gridHeight
  };
}

function getLayoutIssues() {
  const geometry = getGridGeometry();
  const issues = [];
  if (geometry.startX < 0 || geometry.rightMargin < 0) issues.push("横方向がA4からはみ出しています");
  if (geometry.startY < 0 || geometry.bottomMargin < 0) issues.push("縦方向がA4からはみ出しています");
  return issues;
}

function formatLayoutValue(value, step) {
  return Number(value).toFixed(String(step).includes(".") ? String(step).split(".")[1].length : 0);
}

function renderLayoutControls() {
  elements.layoutControls.innerHTML = LAYOUT_CONTROL_GROUPS.map((group, groupIndex) => `
    <details class="layout-group" ${groupIndex === 0 ? "open" : ""}>
      <summary><span><strong>${escapeHtml(group.title)}</strong><small>${escapeHtml(group.description)}</small></span></summary>
      <div class="layout-group-body">
        ${group.fields.map(field => `
          <label class="layout-control-row">
            <span>${escapeHtml(field.label)}</span>
            <input type="range" min="${field.min}" max="${field.max}" step="${field.step}" value="${state.layout[field.key]}" data-layout-key="${field.key}" data-layout-kind="range" aria-label="${escapeHtml(field.label)}">
            <span class="layout-number-wrap">
              <input type="number" min="${field.min}" max="${field.max}" step="${field.step}" value="${formatLayoutValue(state.layout[field.key], field.step)}" data-layout-key="${field.key}" data-layout-kind="number" aria-label="${escapeHtml(field.label)}の数値">
              <small>${escapeHtml(field.unit)}</small>
            </span>
          </label>
        `).join("")}
      </div>
    </details>
  `).join("");
  elements.cropMarksCheckbox.checked = state.layout.cropMarks;
}

function syncLayoutControlValues(key) {
  const field = LAYOUT_CONTROL_GROUPS.flatMap(group => group.fields).find(item => item.key === key);
  if (!field) return;
  elements.layoutControls.querySelectorAll(`[data-layout-key="${key}"]`).forEach(input => {
    input.value = input.dataset.layoutKind === "number"
      ? formatLayoutValue(state.layout[key], field.step)
      : state.layout[key];
  });
}

function persistLayoutSettings() {
  try {
    setScopedItem(TICKET_LAYOUT_KEY, JSON.stringify(state.layout));
  } catch (error) {
    // 保存容量が不足しても、その場の調整値は引き続き使用する。
  }
}

function updatePreviewMeta() {
  const layout = state.layout;
  const geometry = getGridGeometry();
  elements.previewCardMeta.textContent = `カード：${layout.cardWidthMm}×${layout.cardHeightMm}mm`;
  elements.previewGridMeta.textContent = "配置：3列×3段";
  elements.previewGapMeta.textContent = `間隔：横${layout.gapXMm}mm・縦${layout.gapYMm}mm`;
  elements.previewMarginMeta.textContent = `余白：左${geometry.startX.toFixed(1)}・右${geometry.rightMargin.toFixed(1)}・上${geometry.startY.toFixed(1)}・下${geometry.bottomMargin.toFixed(1)}mm`;
  const issues = getLayoutIssues();
  elements.layoutWarning.hidden = issues.length === 0;
  elements.layoutWarning.textContent = issues.join("／");
}

function updateLayoutFromControl(target) {
  const key = target.dataset.layoutKey;
  const field = LAYOUT_CONTROL_GROUPS.flatMap(group => group.fields).find(item => item.key === key);
  if (!field) return;
  const numericValue = Number(target.value);
  if (!Number.isFinite(numericValue)) return;
  state.layout[key] = roundToStep(clamp(numericValue, field.min, field.max), field.step);
  syncLayoutControlValues(key);
  persistLayoutSettings();
  updateSelectionSummary();
}

function loadStoredSettings() {
  try {
    state.settings = normalizeSettings(JSON.parse(getScopedItem(TICKET_SETTINGS_KEY) || "{}"));
  } catch (error) {
    state.settings = { ...DEFAULT_SETTINGS };
  }
  elements.ticketTitleInput.value = state.settings.title;
  elements.ticketSubtitleInput.value = state.settings.subtitle;
  elements.ticketNotesInput.value = state.settings.notes;

  try {
    state.layout = normalizeLayoutSettings(JSON.parse(getScopedItem(TICKET_LAYOUT_KEY) || "{}"));
  } catch (error) {
    state.layout = { ...DEFAULT_LAYOUT_SETTINGS };
  }
  renderLayoutControls();

  const savedLogo = getScopedItem("kaitori_logo");
  if (savedLogo && /^data:image\//.test(savedLogo)) {
    state.logoDataUrl = savedLogo;
    elements.logoStatus.textContent = "買取表作成ツールに保存済みの店舗ロゴを使用中です。";
  } else {
    elements.logoStatus.textContent = "保存済みロゴがないため仮ロゴを使用中です。ここから変更できます。";
  }
}

function saveSettingsFromInputs() {
  state.settings = normalizeSettings({
    title: elements.ticketTitleInput.value,
    subtitle: elements.ticketSubtitleInput.value,
    notes: elements.ticketNotesInput.value
  });
  try {
    setScopedItem(TICKET_SETTINGS_KEY, JSON.stringify(state.settings));
  } catch (error) {
    // 保存容量が不足しても、その場の編集内容は引き続き使用する。
  }
  renderA4Preview();
}

function randomTicketSerial() {
  const digits = new Uint8Array(12);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(digits);
    return Array.from(digits, value => String(value % 10)).join("").match(/.{1,4}/g).join("-");
  }
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("").match(/.{1,4}/g).join("-");
}

function getAssignedSerials(exceptProduct = null) {
  const assigned = new Set();
  state.products.forEach(product => {
    if (product === exceptProduct) return;
    (product.serials || []).forEach(serial => assigned.add(serial));
  });
  return assigned;
}

function createUniqueSerial(assigned) {
  let serial = randomTicketSerial();
  while (assigned.has(serial)) serial = randomTicketSerial();
  assigned.add(serial);
  return serial;
}

function syncProductSerials(product, regenerate = false) {
  if (!product) return;
  const quantity = clamp(product.quantity, 1, 99);
  const assigned = getAssignedSerials(product);
  const current = regenerate ? [] : (Array.isArray(product.serials) ? product.serials.slice(0, quantity) : []);
  current.forEach(serial => assigned.add(serial));
  while (current.length < quantity) current.push(createUniqueSerial(assigned));
  product.serials = current;
}

function normalizeSerial(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 12);
  if (!digits) return randomTicketSerial();
  return digits.match(/.{1,4}/g).join("-");
}

async function readCsvFileText(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder("utf-16le").decode(bytes.subarray(2));
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder("utf-16be").decode(bytes.subarray(2));
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return new TextDecoder("utf-8").decode(bytes.subarray(3));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    return new TextDecoder("shift_jis", { fatal: true }).decode(bytes);
  }
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  const source = String(text || "").replace(/^\uFEFF/, "");

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"' && inQuotes && source[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  return rows;
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s_\-・:：()（）【】\[\]]/g, "");
}

function parseProductsFromCsv(text) {
  const rows = parseCsvRows(text);
  const keywords = [
    "カード名", "商品名", "画像リンク", "画像URL", "掲載グループ", "掲載状況", "種別", "買取金額"
  ].map(normalizeHeader);
  let headerIndex = -1;
  let columns = [];

  for (let rowIndex = 0; rowIndex < Math.min(15, rows.length); rowIndex += 1) {
    const values = rows[rowIndex].map(value => String(value || "").trim());
    const matches = values.filter(value => keywords.some(keyword => normalizeHeader(value).includes(keyword))).length;
    if (matches >= 2) {
      headerIndex = rowIndex;
      columns = values.map((name, index) => ({ name, normalized: normalizeHeader(name), index }));
      break;
    }
  }
  if (headerIndex < 0) throw new Error("カード名・画像リンクなどのCSVヘッダーを確認できませんでした。");

  function getValue(parts, aliases) {
    for (const alias of aliases) {
      const normalizedAlias = normalizeHeader(alias);
      const column = columns.find(item => item.normalized.includes(normalizedAlias));
      if (column) return String(parts[column.index] || "").trim();
    }
    return "";
  }

  const products = [];
  let excluded = 0;
  let missingImages = 0;
  for (let rowIndex = headerIndex + 1; rowIndex < rows.length; rowIndex += 1) {
    const parts = rows[rowIndex];
    if (!parts.some(value => String(value || "").trim())) continue;
    const status = getValue(parts, ["掲載状況", "状況", "ステータス", "掲載"]);
    const name = getValue(parts, ["カード名", "商品名", "タイトル", "品名"]);
    if (!name || status.includes("無効") || status.includes("非掲載")) {
      excluded += 1;
      continue;
    }
    const imageUrl = getValue(parts, ["画像リンク", "画像URL", "画像", "Image"]);
    if (!imageUrl) missingImages += 1;
    products.push({
      id: products.length,
      sourceRow: rowIndex + 1,
      name,
      type: getValue(parts, ["種別", "型番", "グレード", "タイプ", "区分"]),
      group: getValue(parts, ["掲載グループ", "グループ", "カテゴリ", "分類"]),
      imageUrl,
      selected: false,
      quantity: 1,
      serials: []
    });
  }
  if (!products.length) throw new Error("選択できる商品がCSV内にありませんでした。");
  return { products, excluded, missingImages };
}

async function handleCsvFile(file) {
  if (!file) return;
  elements.csvStatus.className = "inline-status";
  elements.csvStatus.textContent = `${file.name} を読み込み中…`;
  elements.csvChooseButton.disabled = true;
  try {
    const text = await readCsvFileText(file);
    const result = parseProductsFromCsv(text);
    state.products = result.products;
    state.selectedOrder = [];
    state.sourceName = file.name;
    state.productPage = 1;
    state.previewPage = 1;
    imageDataCache.clear();
    renderGroupFilter();
    renderProductList();
    updateSelectionSummary();
    elements.csvCountBadge.textContent = `${result.products.length}商品`;
    elements.csvCountBadge.className = "panel-badge is-ready";
    elements.csvStatus.className = "inline-status is-ready";
    elements.csvStatus.textContent = `${file.name}：${result.products.length}商品を読込` +
      (result.missingImages ? `／画像なし${result.missingImages}件` : "") +
      (result.excluded ? `／除外${result.excluded}行` : "");
  } catch (error) {
    console.error(error);
    state.products = [];
    state.selectedOrder = [];
    renderGroupFilter();
    renderProductList();
    updateSelectionSummary();
    elements.csvCountBadge.textContent = "読込失敗";
    elements.csvCountBadge.className = "panel-badge";
    elements.csvStatus.className = "inline-status is-error";
    elements.csvStatus.textContent = error.message || String(error);
  } finally {
    elements.csvChooseButton.disabled = false;
  }
}

function getFilteredProducts() {
  const query = elements.productSearchInput.value.trim().normalize("NFKC").toLowerCase();
  const group = elements.groupFilterSelect.value;
  const selectedOnly = elements.selectedOnlyCheckbox.checked;
  return state.products.filter(product => {
    if (selectedOnly && !product.selected) return false;
    if (group && product.group !== group) return false;
    if (!query) return true;
    return `${product.name} ${product.type} ${product.group}`.normalize("NFKC").toLowerCase().includes(query);
  });
}

function renderGroupFilter() {
  const current = elements.groupFilterSelect.value;
  const groups = [...new Set(state.products.map(product => product.group).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, "ja", { numeric: true, sensitivity: "base" }));
  elements.groupFilterSelect.innerHTML = '<option value="">すべて</option>' +
    groups.map(group => `<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`).join("");
  if (groups.includes(current)) elements.groupFilterSelect.value = current;
}

function normalizeImageUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (value.includes("drive.google.com")) {
    const match = value.match(/[?&]id=([^&]+)/) || value.match(/\/d\/([^/]+)/);
    if (match?.[1]) return `https://drive.google.com/thumbnail?id=${encodeURIComponent(match[1])}&sz=w500`;
  }
  return value;
}

function renderProductList() {
  const filtered = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCT_PAGE_SIZE));
  state.productPage = clamp(state.productPage, 1, totalPages);
  const pageStart = (state.productPage - 1) * PRODUCT_PAGE_SIZE;
  const pageProducts = filtered.slice(pageStart, pageStart + PRODUCT_PAGE_SIZE);

  elements.selectPageButton.disabled = pageProducts.length === 0;
  elements.clearSelectionButton.disabled = state.selectedOrder.length === 0;
  elements.productPagination.hidden = filtered.length <= PRODUCT_PAGE_SIZE;
  elements.productPageLabel.textContent = `${state.productPage} / ${totalPages}`;
  elements.productPrevButton.disabled = state.productPage <= 1;
  elements.productNextButton.disabled = state.productPage >= totalPages;

  if (!state.products.length) {
    elements.productList.innerHTML = '<div class="empty-state">CSVを読み込むと商品一覧が表示されます</div>';
    return;
  }
  if (!pageProducts.length) {
    elements.productList.innerHTML = '<div class="empty-state">条件に一致する商品がありません</div>';
    return;
  }

  elements.productList.innerHTML = pageProducts.map(product => {
    const imageSource = normalizeImageUrl(product.imageUrl) || NO_IMAGE_DATA_URL;
    return `
      <div class="product-row${product.selected ? " is-selected" : ""}" data-product-id="${product.id}">
        <input class="product-select" type="checkbox" data-action="select" ${product.selected ? "checked" : ""} aria-label="${escapeHtml(product.name)}を選択">
        <img class="product-thumb" src="${escapeHtml(imageSource)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${escapeHtml(NO_IMAGE_DATA_URL)}'">
        <div class="product-main">
          <div class="product-name">${escapeHtml(product.name)}</div>
          <div class="product-meta">
            ${product.type ? `<span>${escapeHtml(product.type)}</span>` : ""}
            ${product.group ? `<span>${escapeHtml(product.group)}</span>` : ""}
            <span>CSV ${product.sourceRow}行目</span>
          </div>
          <div class="ticket-row-controls" ${product.selected ? "" : "hidden"}>
            <label>枚数<input class="ticket-quantity" data-action="quantity" type="number" min="1" max="99" value="${product.quantity}"></label>
            <div class="serial-auto-status"><span>シリアル</span><strong>1枚ごとに自動発番</strong><small>${escapeHtml(product.serials?.[0] || "選択時に生成")}${product.quantity > 1 ? ` ほか${product.quantity - 1}件` : ""}</small></div>
            <button class="serial-refresh" data-action="refresh-serial" type="button" title="この商品の全シリアルを再生成">↻</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function setProductSelected(product, selected) {
  if (!product || product.selected === selected) return;
  product.selected = selected;
  if (selected) {
    syncProductSerials(product);
    state.selectedOrder.push(product.id);
  } else {
    state.selectedOrder = state.selectedOrder.filter(id => id !== product.id);
  }
}

function getSelectedProducts() {
  const lookup = new Map(state.products.map(product => [product.id, product]));
  return state.selectedOrder.map(id => lookup.get(id)).filter(Boolean);
}

function buildTicketQueue() {
  const queue = [];
  getSelectedProducts().forEach(product => {
    const quantity = clamp(product.quantity, 1, 99);
    syncProductSerials(product);
    for (let index = 0; index < quantity; index += 1) {
      queue.push({ product, serial: product.serials[index], copyIndex: index });
    }
  });
  return queue;
}

function updateSelectionSummary() {
  const selectedProducts = getSelectedProducts();
  const ticketTotal = selectedProducts.reduce((total, product) => total + clamp(product.quantity, 1, 99), 0);
  const pageTotal = ticketTotal ? Math.ceil(ticketTotal / 9) : 0;
  const layoutValid = getLayoutIssues().length === 0;
  elements.selectedProductCount.textContent = selectedProducts.length;
  elements.selectedTicketCount.textContent = ticketTotal;
  elements.selectedPageCount.textContent = pageTotal;
  elements.clearSelectionButton.disabled = selectedProducts.length === 0;
  elements.exportPdfButton.disabled = selectedProducts.length === 0 || state.exporting || !layoutValid;
  elements.exportSummary.textContent = selectedProducts.length
    ? `${selectedProducts.length}商品・${ticketTotal}枚を一括作成`
    : "商品を選択してください";
  elements.exportDetail.textContent = selectedProducts.length
    ? `A4 ${pageTotal}ページ／全券に別シリアルを自動発番`
    : "選択時は1商品1枚／全券に別シリアル";
  updatePreviewMeta();
  renderA4Preview();
}

function xPercent(value) {
  return `${Number(value) / TICKET_WIDTH_PX * 100}%`;
}

function yPercent(value) {
  return `${Number(value) / TICKET_HEIGHT_PX * 100}%`;
}

function miniTicketHtml(ticket) {
  const product = ticket.product;
  const layout = state.layout;
  const imageSource = normalizeImageUrl(product.imageUrl);
  return `
    <div class="mini-ticket" style="--ticket-border:${layout.borderWidth / TICKET_WIDTH_PX * 100}cqw;--inner-inset-x:${xPercent(layout.innerInset)};--inner-inset-y:${yPercent(layout.innerInset)};--edge-height:${yPercent(layout.edgeHeight)}">
      <img class="mini-logo" src="${escapeHtml(state.logoDataUrl)}" alt="" style="left:${xPercent(layout.logoX)};top:${yPercent(layout.logoY)};width:${xPercent(layout.logoWidth)};height:${yPercent(layout.logoHeight)}">
      <div class="mini-title" style="left:${xPercent(layout.titleX)};top:${yPercent(layout.titleY - layout.titleSize * 1.05)};font-size:${layout.titleSize / TICKET_WIDTH_PX * 100}cqw">${escapeHtml(state.settings.title)}</div>
      <div class="mini-subtitle" style="left:${xPercent(layout.subtitleX)};top:${yPercent(layout.subtitleY - layout.subtitleSize * 1.05)};font-size:${layout.subtitleSize / TICKET_WIDTH_PX * 100}cqw">${escapeHtml(state.settings.subtitle)}</div>
      <div class="mini-image-stage" style="left:${xPercent(layout.imageX)};top:${yPercent(layout.imageY)};width:${xPercent(layout.imageWidth)};height:${yPercent(layout.imageHeight)}">
        ${imageSource
          ? `<img src="${escapeHtml(imageSource)}" alt="" referrerpolicy="no-referrer" style="transform:translate(${layout.imageOffsetX / TICKET_WIDTH_PX * 100}cqw,${layout.imageOffsetY / TICKET_WIDTH_PX * 100}cqw) scale(${layout.imageZoom})" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mini-no-image',textContent:'NO IMAGE'}))">`
          : '<span class="mini-no-image">NO IMAGE</span>'}
      </div>
      <div class="mini-prize-name" style="left:${xPercent(layout.bannerX)};top:${yPercent(layout.bannerY)};width:${xPercent(layout.bannerWidth)};height:${yPercent(layout.bannerHeight)};font-size:${layout.bannerSize / TICKET_WIDTH_PX * 100}cqw">${escapeHtml(product.name)}${product.type ? `<br><small>${escapeHtml(product.type)}</small>` : ""}</div>
      <div class="mini-serial-label" style="left:${xPercent(layout.serialLabelX)};top:${yPercent(layout.serialLabelY - layout.serialLabelSize)};font-size:${layout.serialLabelSize / TICKET_WIDTH_PX * 100}cqw">SERIAL No.</div>
      <div class="mini-serial" style="left:${xPercent(layout.serialBoxX)};top:${yPercent(layout.serialBoxY)};width:${xPercent(layout.serialBoxWidth)};height:${yPercent(layout.serialBoxHeight)};font-size:${layout.serialSize / TICKET_WIDTH_PX * 100}cqw">${escapeHtml(ticket.serial)}</div>
      <div class="mini-divider" style="left:${xPercent(layout.notesX)};top:${yPercent(layout.dividerY)};width:${xPercent(layout.notesWidth)}"></div>
      <div class="mini-notes" style="left:${xPercent(layout.notesX)};top:${yPercent(layout.notesY)};width:${xPercent(layout.notesWidth)};font-size:${layout.notesSize / TICKET_WIDTH_PX * 100}cqw;line-height:${layout.notesLineHeight / layout.notesSize};--notes-lines:${layout.notesMaxLines}">${escapeHtml(state.settings.notes)}</div>
    </div>
  `;
}

function renderA4Preview() {
  const queue = buildTicketQueue();
  const totalPages = Math.max(1, Math.ceil(queue.length / 9));
  state.previewPage = clamp(state.previewPage, 1, totalPages);
  const pageItems = queue.slice((state.previewPage - 1) * 9, state.previewPage * 9);
  elements.a4Sheet.innerHTML = "";

  for (let index = 0; index < 9; index += 1) {
    const row = Math.floor(index / 3);
    const column = index % 3;
    const card = document.createElement("div");
    card.className = `a4-card${pageItems[index] ? "" : " is-empty"}`;
    const geometry = getGridGeometry();
    card.style.left = `${(geometry.startX + column * (state.layout.cardWidthMm + state.layout.gapXMm)) / PAGE_WIDTH_MM * 100}%`;
    card.style.top = `${(geometry.startY + row * (state.layout.cardHeightMm + state.layout.gapYMm)) / PAGE_HEIGHT_MM * 100}%`;
    card.style.width = `${state.layout.cardWidthMm / PAGE_WIDTH_MM * 100}%`;
    card.style.height = `${state.layout.cardHeightMm / PAGE_HEIGHT_MM * 100}%`;
    if (pageItems[index]) card.innerHTML = miniTicketHtml(pageItems[index]);
    else card.textContent = queue.length ? "空き" : "引換券";
    elements.a4Sheet.appendChild(card);
  }

  elements.previewPageLabel.textContent = `${state.previewPage} / ${totalPages}`;
  elements.previewPrevButton.disabled = state.previewPage <= 1;
  elements.previewNextButton.disabled = state.previewPage >= totalPages;
  elements.previewHint.textContent = queue.length
    ? `${state.previewPage}ページ目：${pageItems.length}枚表示／全${queue.length}枚`
    : "商品を選択すると、ここに実際の並び順で表示します。";
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function fetchWithTimeout(url, timeout = 12000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { mode: "cors", cache: "force-cache", signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

function isUsableImageBlob(blob) {
  return Boolean(blob && blob.size > 0 && blob.size <= 12 * 1024 * 1024 && String(blob.type || "").toLowerCase().includes("image"));
}

async function fetchImageDataUrl(url) {
  const target = normalizeImageUrl(url);
  if (!target) return NO_IMAGE_DATA_URL;
  if (imageDataCache.has(target)) return imageDataCache.get(target);

  const task = (async () => {
    try {
      const response = await fetchWithTimeout(target);
      if (response.ok) {
        const blob = await response.blob();
        if (isUsableImageBlob(blob)) return await blobToDataUrl(blob);
      }
    } catch (error) {
      // 公開画像側のCORS制限時は、既存作成機と同じ画像プロキシ候補を試す。
    }

    const encoded = encodeURIComponent(target);
    const proxies = [
      `https://wsrv.nl/?url=${encoded}&output=webp&w=700`,
      `https://api.allorigins.win/raw?url=${encoded}`,
      `https://corsproxy.io/?${encoded}`
    ];
    try {
      const blob = await Promise.any(proxies.map(async proxy => {
        const response = await fetchWithTimeout(proxy);
        if (!response.ok) throw new Error("image fetch failed");
        const candidate = await response.blob();
        if (!isUsableImageBlob(candidate)) throw new Error("invalid image");
        return candidate;
      }));
      return await blobToDataUrl(blob);
    } catch (error) {
      return NO_IMAGE_DATA_URL;
    }
  })();

  imageDataCache.set(target, task);
  const result = await task;
  imageDataCache.set(target, result);
  return result;
}

function loadImageElement(source) {
  const key = String(source || "");
  if (imageElementCache.has(key)) return imageElementCache.get(key);
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
  imageElementCache.set(key, promise);
  return promise;
}

function pathRoundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function drawContainedImage(context, image, x, y, width, height, padding = 0, options = {}) {
  const availableWidth = width - padding * 2;
  const availableHeight = height - padding * 2;
  const zoom = Number(options.zoom) || 1;
  const scale = Math.min(availableWidth / image.naturalWidth, availableHeight / image.naturalHeight) * zoom;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  context.drawImage(
    image,
    x + (width - drawWidth) / 2 + (Number(options.offsetX) || 0),
    y + (height - drawHeight) / 2 + (Number(options.offsetY) || 0),
    drawWidth,
    drawHeight
  );
  context.restore();
}

function fitCanvasFont(context, text, maxWidth, startSize, minSize, fontFamily, weight = 900) {
  let size = startSize;
  do {
    context.font = `${weight} ${size}px ${fontFamily}`;
    if (context.measureText(text).width <= maxWidth) return size;
    size -= 1;
  } while (size > minSize);
  context.font = `${weight} ${minSize}px ${fontFamily}`;
  return minSize;
}

function wrapCanvasText(context, text, maxWidth) {
  const lines = [];
  let current = "";
  for (const character of String(text || "")) {
    if (character === "\n") {
      lines.push(current);
      current = "";
      continue;
    }
    const next = current + character;
    if (current && context.measureText(next).width > maxWidth) {
      lines.push(current);
      current = character;
    } else {
      current = next;
    }
  }
  if (current || !lines.length) lines.push(current);
  return lines;
}

function drawPrizeBanner(context, name, type, layout) {
  const x = layout.bannerX;
  const y = layout.bannerY;
  const width = layout.bannerWidth;
  const height = layout.bannerHeight;
  const point = Math.min(34, width * .08, height * .45);
  const gradient = context.createLinearGradient(x, 0, x + width, 0);
  gradient.addColorStop(0, "#bd8418");
  gradient.addColorStop(.28, "#ffe69a");
  gradient.addColorStop(.5, "#fff4c0");
  gradient.addColorStop(.73, "#edc85f");
  gradient.addColorStop(1, "#a66f12");
  context.beginPath();
  context.moveTo(x + point, y);
  context.lineTo(x + width - point, y);
  context.lineTo(x + width, y + height / 2);
  context.lineTo(x + width - point, y + height);
  context.lineTo(x + point, y + height);
  context.lineTo(x, y + height / 2);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = "#090909";
  context.stroke();

  context.fillStyle = "#17130a";
  context.textAlign = "center";
  context.textBaseline = "middle";
  if (type) {
    fitCanvasFont(context, name, width - point * 2 - 24, layout.bannerSize, Math.max(12, layout.bannerSize * .62), '"Noto Sans JP", "Yu Gothic", sans-serif');
    context.fillText(name, x + width / 2, y + height * .37);
    fitCanvasFont(context, type, width - point * 2 - 24, layout.bannerSize * .62, Math.max(10, layout.bannerSize * .45), '"Noto Sans JP", "Yu Gothic", sans-serif', 800);
    context.fillText(type, x + width / 2, y + height * .72);
  } else {
    fitCanvasFont(context, name, width - point * 2 - 24, layout.bannerSize, Math.max(12, layout.bannerSize * .58), '"Noto Sans JP", "Yu Gothic", sans-serif');
    context.fillText(name, x + width / 2, y + height / 2 + 1);
  }
}

async function renderTicketDataUrl(ticket, imageDataUrl, logoDataUrl, settings, layout) {
  const product = ticket.product;
  const [productImage, logoImage] = await Promise.all([
    loadImageElement(imageDataUrl).catch(() => loadImageElement(NO_IMAGE_DATA_URL)),
    loadImageElement(logoDataUrl).catch(() => loadImageElement(DEFAULT_LOGO_DATA_URL))
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = TICKET_WIDTH_PX;
  canvas.height = TICKET_HEIGHT_PX;
  const context = canvas.getContext("2d", { alpha: false });
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const paper = context.createLinearGradient(0, 0, TICKET_WIDTH_PX, TICKET_HEIGHT_PX);
  paper.addColorStop(0, "#ffffff");
  paper.addColorStop(1, "#eeeeec");
  context.fillStyle = paper;
  context.fillRect(0, 0, TICKET_WIDTH_PX, TICKET_HEIGHT_PX);

  context.strokeStyle = "#cda33c";
  context.lineWidth = layout.borderWidth;
  context.strokeRect(layout.borderWidth / 2, layout.borderWidth / 2, TICKET_WIDTH_PX - layout.borderWidth, TICKET_HEIGHT_PX - layout.borderWidth);
  context.strokeStyle = "#111111";
  context.lineWidth = 3;
  pathRoundedRect(context, layout.innerInset, layout.innerInset, TICKET_WIDTH_PX - layout.innerInset * 2, TICKET_HEIGHT_PX - layout.innerInset * 2, 8);
  context.stroke();

  const edge = context.createLinearGradient(0, 0, TICKET_WIDTH_PX, 0);
  edge.addColorStop(0, "#8f691b");
  edge.addColorStop(.25, "#ffe89b");
  edge.addColorStop(.5, "#cda33c");
  edge.addColorStop(.75, "#fff1af");
  edge.addColorStop(1, "#805d16");
  context.fillStyle = edge;
  context.fillRect(0, 0, TICKET_WIDTH_PX, layout.edgeHeight);
  context.fillRect(0, TICKET_HEIGHT_PX - layout.edgeHeight, TICKET_WIDTH_PX, layout.edgeHeight);

  drawContainedImage(context, logoImage, layout.logoX, layout.logoY, layout.logoWidth, layout.logoHeight, 2);

  context.fillStyle = "#111111";
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  fitCanvasFont(context, settings.title, TICKET_WIDTH_PX - 80, layout.titleSize, Math.max(16, layout.titleSize * .55), '"Noto Sans JP", "Yu Gothic", sans-serif');
  context.fillText(settings.title, layout.titleX, layout.titleY);
  fitCanvasFont(context, settings.subtitle, TICKET_WIDTH_PX - 90, layout.subtitleSize, Math.max(9, layout.subtitleSize * .55), 'Oswald, "Arial Narrow", sans-serif');
  context.fillText(settings.subtitle, layout.subtitleX, layout.subtitleY);

  context.save();
  context.shadowColor = "rgba(0,0,0,.18)";
  context.shadowBlur = 14;
  context.shadowOffsetY = 8;
  drawContainedImage(
    context,
    productImage,
    layout.imageX,
    layout.imageY,
    layout.imageWidth,
    layout.imageHeight,
    8,
    { zoom: layout.imageZoom, offsetX: layout.imageOffsetX, offsetY: layout.imageOffsetY }
  );
  context.restore();

  drawPrizeBanner(context, product.name, product.type, layout);

  context.fillStyle = "#111111";
  context.font = `900 ${layout.serialLabelSize}px Oswald, "Arial Narrow", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.fillText("SERIAL No.", layout.serialLabelX, layout.serialLabelY);

  pathRoundedRect(context, layout.serialBoxX, layout.serialBoxY, layout.serialBoxWidth, layout.serialBoxHeight, 7);
  context.fillStyle = "#111318";
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "#d6aa3d";
  context.stroke();
  context.fillStyle = "#ffffff";
  fitCanvasFont(context, ticket.serial, layout.serialBoxWidth - 44, layout.serialSize, Math.max(14, layout.serialSize * .58), 'Oswald, "Arial Narrow", monospace');
  context.textBaseline = "middle";
  context.fillText(ticket.serial, layout.serialBoxX + layout.serialBoxWidth / 2, layout.serialBoxY + layout.serialBoxHeight / 2 + 1);

  context.setLineDash([5, 6]);
  context.strokeStyle = "#caa33c";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(layout.notesX, layout.dividerY);
  context.lineTo(layout.notesX + layout.notesWidth, layout.dividerY);
  context.stroke();
  context.setLineDash([]);

  context.fillStyle = "#262626";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.font = `700 ${layout.notesSize}px "Noto Sans JP", "Yu Gothic", sans-serif`;
  const noteLines = wrapCanvasText(context, settings.notes, layout.notesWidth).slice(0, layout.notesMaxLines);
  noteLines.forEach((line, index) => context.fillText(line, layout.notesX, layout.notesY + index * layout.notesLineHeight));

  return canvas.toDataURL("image/png");
}

function drawCropMarks(pdf, x, y, width, height) {
  const right = x + width;
  const bottom = y + height;
  const length = .7;
  const offset = .25;
  pdf.line(x - offset - length, y, x - offset, y);
  pdf.line(right + offset, y, right + offset + length, y);
  pdf.line(x - offset - length, bottom, x - offset, bottom);
  pdf.line(right + offset, bottom, right + offset + length, bottom);
  pdf.line(x, y - offset - length, x, y - offset);
  pdf.line(right, y - offset - length, right, y - offset);
  pdf.line(x, bottom + offset, x, bottom + offset + length);
  pdf.line(right, bottom + offset, right, bottom + offset + length);
}

function setExportProgress(percent, message) {
  const safePercent = clamp(percent, 0, 100);
  elements.exportProgressTrack.hidden = safePercent <= 0 || safePercent >= 100;
  elements.exportProgressBar.style.width = `${safePercent}%`;
  if (message) elements.exportSummary.textContent = message;
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

function safeFilename(value) {
  return String(value || "引換券")
    .replace(/\.[^.]+$/, "")
    .replace(/[\\/:*?"<>|]/g, "_")
    .trim()
    .slice(0, 60) || "引換券";
}

async function exportBatchPdf() {
  const selectedProducts = getSelectedProducts();
  if (!selectedProducts.length || state.exporting) return;
  const layoutIssues = getLayoutIssues();
  if (layoutIssues.length) {
    elements.exportSummary.textContent = layoutIssues.join("／");
    return;
  }
  if (!window.jspdf?.jsPDF) {
    elements.exportSummary.textContent = "PDF作成ライブラリを読み込めませんでした";
    return;
  }

  state.exporting = true;
  elements.exportPdfButton.disabled = true;
  elements.exportPdfButton.textContent = "A4 PDFを作成中…";
  const ticketTotal = selectedProducts.reduce((total, product) => total + clamp(product.quantity, 1, 99), 0);
  const queue = buildTicketQueue();
  const layoutSnapshot = normalizeLayoutSettings(state.layout);
  const settingsSnapshot = { ...state.settings };
  const geometry = getGridGeometry(layoutSnapshot);

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    let completed = 0;
    const fetchedImages = await mapWithConcurrency(selectedProducts, 3, async product => {
      const result = await fetchImageDataUrl(product.imageUrl);
      completed += 1;
      setExportProgress(5 + completed / selectedProducts.length * 35, `商品画像を準備中 ${completed}/${selectedProducts.length}`);
      return result;
    });

    const imageByProductId = new Map(selectedProducts.map((product, index) => [product.id, fetchedImages[index]]));
    const ticketData = [];
    for (let index = 0; index < queue.length; index += 1) {
      const ticket = queue[index];
      ticketData.push(await renderTicketDataUrl(
        ticket,
        imageByProductId.get(ticket.product.id),
        state.logoDataUrl,
        settingsSnapshot,
        layoutSnapshot
      ));
      setExportProgress(40 + (index + 1) / queue.length * 35, `引換券を生成中 ${index + 1}/${queue.length}`);
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    pdf.setDrawColor(145, 145, 145);
    pdf.setLineWidth(.12);

    for (let index = 0; index < queue.length; index += 1) {
      if (index > 0 && index % 9 === 0) pdf.addPage("a4", "portrait");
      const position = index % 9;
      const row = Math.floor(position / 3);
      const column = position % 3;
      const x = geometry.startX + column * (layoutSnapshot.cardWidthMm + layoutSnapshot.gapXMm);
      const y = geometry.startY + row * (layoutSnapshot.cardHeightMm + layoutSnapshot.gapYMm);
      const ticket = queue[index];
      const alias = `ticket-${ticket.product.id}-${String(ticket.serial).replace(/\D/g, "")}`;
      pdf.addImage(ticketData[index], "PNG", x, y, layoutSnapshot.cardWidthMm, layoutSnapshot.cardHeightMm, alias, "FAST");
      if (layoutSnapshot.cropMarks) drawCropMarks(pdf, x, y, layoutSnapshot.cardWidthMm, layoutSnapshot.cardHeightMm);
      if (index % 9 === 8 || index === queue.length - 1) {
        setExportProgress(75 + (index + 1) / queue.length * 23, `A4へ配置中 ${index + 1}/${queue.length}`);
      }
    }

    pdf.setProperties({
      title: `商品引換券 ${selectedProducts.length}商品 ${ticketTotal}枚`,
      subject: `${layoutSnapshot.cardWidthMm}×${layoutSnapshot.cardHeightMm}mm・3列×3段${layoutSnapshot.cropMarks ? "・裁断目印付き" : ""}`,
      creator: "商品引換券・一括作成"
    });
    const source = safeFilename(state.sourceName || "買取CSV");
    pdf.save(`商品引換券_A4_${selectedProducts.length}商品_${ticketTotal}枚_${source}.pdf`);
    setExportProgress(100, `${selectedProducts.length}商品・${ticketTotal}枚のPDFを保存しました`);
    elements.exportDetail.textContent = `A4 ${Math.ceil(ticketTotal / 9)}ページ／全券別シリアル／印刷は倍率100%`;
  } catch (error) {
    console.error(error);
    elements.exportSummary.textContent = `PDFを作成できませんでした：${error.message || error}`;
    elements.exportDetail.textContent = "画像リンクまたは通信状態を確認してください";
    elements.exportProgressTrack.hidden = true;
  } finally {
    state.exporting = false;
    elements.exportPdfButton.disabled = !state.selectedOrder.length || getLayoutIssues().length > 0;
    elements.exportPdfButton.textContent = "A4・引換券PDFを一括保存";
  }
}

function handleProductListChange(event) {
  const row = event.target.closest(".product-row");
  if (!row) return;
  const product = state.products.find(item => item.id === Number(row.dataset.productId));
  if (!product) return;
  const action = event.target.dataset.action;
  if (action === "select") {
    setProductSelected(product, event.target.checked);
    renderProductList();
    updateSelectionSummary();
  } else if (action === "quantity") {
    product.quantity = clamp(event.target.value, 1, 99);
    syncProductSerials(product);
    event.target.value = product.quantity;
    renderProductList();
    updateSelectionSummary();
  }
}

function handleProductListInput(event) {
  if (event.target.dataset.action !== "quantity") return;
  const row = event.target.closest(".product-row");
  const product = state.products.find(item => item.id === Number(row?.dataset.productId));
  if (!product) return;
  const numericValue = Number(event.target.value);
  if (!Number.isFinite(numericValue) || numericValue < 1) return;
  product.quantity = clamp(numericValue, 1, 99);
  syncProductSerials(product);
  updateSelectionSummary();
}

function handleProductListClick(event) {
  const button = event.target.closest('[data-action="refresh-serial"]');
  if (!button) return;
  const row = button.closest(".product-row");
  const product = state.products.find(item => item.id === Number(row?.dataset.productId));
  if (!product) return;
  syncProductSerials(product, true);
  renderProductList();
  updateSelectionSummary();
}

async function handleLogoFile(file) {
  if (!file || !String(file.type || "").startsWith("image/")) return;
  try {
    state.logoDataUrl = await blobToDataUrl(file);
    elements.logoStatus.textContent = `${file.name} を使用中です。`;
    imageElementCache.clear();
    renderA4Preview();
  } catch (error) {
    elements.logoStatus.textContent = "ロゴを読み込めませんでした。";
  }
}

function attachEvents() {
  elements.csvChooseButton.addEventListener("click", () => {
    elements.csvFileInput.value = "";
    elements.csvFileInput.click();
  });
  elements.csvFileInput.addEventListener("change", event => handleCsvFile(event.target.files?.[0]));
  elements.productSearchInput.addEventListener("input", () => {
    state.productPage = 1;
    renderProductList();
  });
  elements.groupFilterSelect.addEventListener("change", () => {
    state.productPage = 1;
    renderProductList();
  });
  elements.selectedOnlyCheckbox.addEventListener("change", () => {
    state.productPage = 1;
    renderProductList();
  });
  elements.productPrevButton.addEventListener("click", () => {
    state.productPage -= 1;
    renderProductList();
    elements.productList.scrollTop = 0;
  });
  elements.productNextButton.addEventListener("click", () => {
    state.productPage += 1;
    renderProductList();
    elements.productList.scrollTop = 0;
  });
  elements.selectPageButton.addEventListener("click", () => {
    const filtered = getFilteredProducts();
    const start = (state.productPage - 1) * PRODUCT_PAGE_SIZE;
    filtered.slice(start, start + PRODUCT_PAGE_SIZE).forEach(product => setProductSelected(product, true));
    renderProductList();
    updateSelectionSummary();
  });
  elements.clearSelectionButton.addEventListener("click", () => {
    state.products.forEach(product => { product.selected = false; });
    state.selectedOrder = [];
    state.previewPage = 1;
    renderProductList();
    updateSelectionSummary();
  });
  elements.productList.addEventListener("change", handleProductListChange);
  elements.productList.addEventListener("input", handleProductListInput);
  elements.productList.addEventListener("click", handleProductListClick);
  [elements.ticketTitleInput, elements.ticketSubtitleInput, elements.ticketNotesInput]
    .forEach(input => input.addEventListener("input", saveSettingsFromInputs));
  elements.ticketLogoInput.addEventListener("change", event => handleLogoFile(event.target.files?.[0]));
  elements.layoutControls.addEventListener("input", event => {
    if (event.target.dataset.layoutKey) updateLayoutFromControl(event.target);
  });
  elements.layoutControls.addEventListener("change", event => {
    if (event.target.dataset.layoutKey) updateLayoutFromControl(event.target);
  });
  elements.cropMarksCheckbox.addEventListener("change", event => {
    state.layout.cropMarks = event.target.checked;
    persistLayoutSettings();
    updateSelectionSummary();
  });
  elements.resetLayoutButton.addEventListener("click", () => {
    state.layout = { ...DEFAULT_LAYOUT_SETTINGS };
    renderLayoutControls();
    persistLayoutSettings();
    updateSelectionSummary();
  });
  elements.previewPrevButton.addEventListener("click", () => {
    state.previewPage -= 1;
    renderA4Preview();
  });
  elements.previewNextButton.addEventListener("click", () => {
    state.previewPage += 1;
    renderA4Preview();
  });
  elements.exportPdfButton.addEventListener("click", exportBatchPdf);
}

loadStoredSettings();
attachEvents();
renderGroupFilter();
renderProductList();
updateSelectionSummary();
