from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, got {count}")
    text = text.replace(old, new, 1)


# 4タブ化
replace_once(
    'grid-template-columns: repeat(3, minmax(0, 1fr));',
    'grid-template-columns: repeat(4, minmax(0, 1fr));',
    'view tabs columns',
)

replace_once(
    '<p>CSVを読み込んで、買取表・単品告知画像・X投稿文を作成できます。</p>',
    '<p>CSVを読み込んで、買取表・単品告知画像・X投稿文・商品引換券を作成できます。</p>',
    'app header copy',
)

xpost_tab = '''        <button
            class="view-tab"
            id="xPostTabButton"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="xPostMakerView"
            onclick="switchAppView('xpost')"
        ><span class="view-tab-index">03</span><span class="view-tab-copy"><strong>X投稿文</strong><small>テンプレートから作成</small></span></button>'''
replace_once(
    xpost_tab,
    xpost_tab + '''
        <button
            class="view-tab"
            id="ticketTabButton"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="ticketMakerView"
            onclick="switchAppView('ticket')"
        ><span class="view-tab-index">04</span><span class="view-tab-copy"><strong>商品引換券</strong><small>63×88mm・PNG</small></span></button>''',
    'ticket nav tab',
)

# 店舗ごとにタイトル・注意事項を保存
replace_once(
    '    const X_POST_TEMPLATE_STORAGE_KEY = "kaitori_xpost_templates_v1";',
    '    const TICKET_SETTINGS_STORAGE_KEY = "kaitori_prize_ticket_settings_v1";\n    const X_POST_TEMPLATE_STORAGE_KEY = "kaitori_xpost_templates_v1";',
    'ticket settings constant',
)
replace_once(
    '        SINGLE_TEMPLATE_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,',
    '        SINGLE_TEMPLATE_STORAGE_KEY,\n        TICKET_SETTINGS_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,',
    'store data key',
)
replace_once(
    '        SINGLE_TEMPLATE_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,\n        X_POST_TEMPLATE_EDITOR_STORAGE_KEY,',
    '        SINGLE_TEMPLATE_STORAGE_KEY,\n        TICKET_SETTINGS_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,\n        X_POST_TEMPLATE_EDITOR_STORAGE_KEY,',
    'json store data key',
)

# 引換券画面をメインscript直前へ追加
marker = '''        </section>
    </section>

</div>

<script>
    const DEFAULT_LOGO'''
if text.count(marker) != 1:
    raise SystemExit(f"ticket view insertion marker: expected 1 match, got {text.count(marker)}")

ticket_html = r'''

    <section class="ticket-maker view-hidden" id="ticketMakerView" aria-label="商品引換券作成">
        <aside class="control-panel ticket-control" id="ticketControl" aria-label="商品引換券の設定">
            <div class="panel-heading">
                <div class="panel-heading-row">
                    <h2>商品引換券</h2>
                </div>
                <p>オリパ・自販機などで使う63×88mmの引換券を作成します</p>
            </div>

            <div class="ticket-setting-grid">
                <div class="control-group">
                    <label for="ticketTitleInput">券タイトル</label>
                    <input type="text" id="ticketTitleInput" maxlength="20" value="商品引換券">
                </div>
                <div class="control-group">
                    <label for="ticketSubtitleInput">英字サブタイトル</label>
                    <input type="text" id="ticketSubtitleInput" maxlength="36" value="PRIZE EXCHANGE TICKET">
                </div>
                <div class="control-group ticket-setting-wide">
                    <label for="ticketPrizeNameInput">景品名</label>
                    <input type="text" id="ticketPrizeNameInput" maxlength="42" placeholder="例：ピカチュウ PSA10">
                </div>
                <div class="control-group ticket-setting-wide">
                    <label for="ticketImageInput">商品画像</label>
                    <input type="file" id="ticketImageInput" accept="image/*">
                    <div class="ticket-inline-actions">
                        <button class="btn-muted" type="button" onclick="clearPrizeTicketImage()">画像を削除</button>
                    </div>
                    <small class="help">PNG・JPEG・WebPなど。画像全体が見えるように自動で収めます。</small>
                </div>
                <div class="control-group ticket-setting-wide">
                    <label for="ticketSerialInput">SERIAL No.</label>
                    <div class="ticket-serial-controls">
                        <input type="text" id="ticketSerialInput" maxlength="24" placeholder="0000-0000-0000">
                        <button class="btn-template" type="button" onclick="generatePrizeTicketSerial()">シリアル再生成</button>
                    </div>
                    <small class="help">12桁のランダム番号を自動発行します。手入力にも変更できます。</small>
                </div>
                <div class="control-group ticket-setting-wide">
                    <label for="ticketNotesInput">注意事項</label>
                    <textarea id="ticketNotesInput" rows="8">【注意事項】
※本券は、自販機から排出後に店内で開封した場合のみ有効です。
※開封前・開封後を問わず、店外へ持ち出した場合は無効です。
※本券が入っていた場合は、そのまま受付までお持ちください。
※後日のお引換えはできません。
※引換時に本券を回収いたします。
※複製・改ざん・無効なシリアルの券は使用できません。</textarea>
                </div>
            </div>

            <div class="panel-actions ticket-panel-actions">
                <div class="export-note">出力サイズ：744×1039px（63×88mm・300dpi相当）</div>
                <button class="btn-export" type="button" onclick="exportPrizeTicket()">引換券PNGを保存</button>
            </div>
        </aside>

        <section class="ticket-preview-container" id="ticketPreviewContainer" aria-label="商品引換券プレビュー">
            <div class="ticket-preview-heading">
                <strong>仕上がりプレビュー</strong>
                <span>実データは744×1039pxで出力します</span>
            </div>
            <div class="ticket-preview-shell" id="ticketPreviewShell">
                <article class="prize-ticket" id="prizeTicket">
                    <div class="ticket-edge ticket-edge-top" aria-hidden="true"></div>
                    <div class="ticket-edge ticket-edge-bottom" aria-hidden="true"></div>
                    <div class="ticket-corner ticket-corner-tl" aria-hidden="true"></div>
                    <div class="ticket-corner ticket-corner-tr" aria-hidden="true"></div>

                    <header class="ticket-card-header">
                        <img class="ticket-logo" id="ticketLogo" alt="店舗ロゴ">
                        <h2 id="ticketTitleText">商品引換券</h2>
                        <div class="ticket-subtitle" id="ticketSubtitleText">PRIZE EXCHANGE TICKET</div>
                    </header>

                    <div class="ticket-image-stage">
                        <img id="ticketProductImage" class="ticket-product-image" alt="商品画像" hidden>
                        <div class="ticket-image-placeholder" id="ticketImagePlaceholder">
                            <span>商品画像</span>
                            <small>PRODUCT IMAGE</small>
                        </div>
                    </div>

                    <div class="ticket-prize-banner">
                        <span id="ticketPrizeNameText">景品名</span>
                    </div>

                    <div class="ticket-serial-block">
                        <div class="ticket-serial-label">SERIAL No.</div>
                        <div class="ticket-serial-number" id="ticketSerialText">0000-0000-0000</div>
                    </div>

                    <div class="ticket-notes" id="ticketNotesText"></div>
                </article>
            </div>
        </section>
    </section>
'''
text = text.replace(marker, '        </section>\n    </section>' + ticket_html + '\n</div>\n\n<script>\n    const DEFAULT_LOGO', 1)

# CSS
css = r'''
        /* ===== 商品引換券 ===== */
        body[data-app-view="ticket"] .official-baseline-panel {
            display: none !important;
        }

        .ticket-maker {
            display: grid;
            grid-template-columns: minmax(420px, 560px) minmax(0, 1fr);
            gap: 24px;
            align-items: start;
        }

        .ticket-setting-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            padding: 18px 20px 4px;
        }

        .ticket-setting-wide {
            grid-column: 1 / -1;
        }

        .ticket-inline-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 8px;
        }

        .ticket-inline-actions button {
            width: auto;
            margin: 0;
        }

        .ticket-serial-controls {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px;
            align-items: center;
        }

        .ticket-serial-controls button {
            width: auto;
            min-height: 42px;
            margin: 0;
            white-space: nowrap;
        }

        .ticket-panel-actions {
            margin: 18px 20px 20px;
        }

        .ticket-preview-container {
            min-width: 0;
            min-height: 720px;
            padding: 18px;
            border: 1px solid rgba(17,24,39,.12);
            border-radius: 16px;
            background:
                radial-gradient(circle at 50% 0%, rgba(217,173,74,.12), transparent 28%),
                #dfe4eb;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,.5);
        }

        .ticket-preview-heading {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
            margin: 0 2px 14px;
            color: #111827;
        }

        .ticket-preview-heading strong {
            font-size: 14px;
            font-weight: 950;
        }

        .ticket-preview-heading span {
            color: #64748b;
            font-size: 10px;
            font-weight: 800;
        }

        .ticket-preview-shell {
            position: relative;
            margin: 0 auto;
            overflow: visible;
        }

        .prize-ticket {
            position: absolute;
            top: 0;
            left: 0;
            width: 744px;
            height: 1039px;
            overflow: hidden;
            padding: 56px 66px 46px;
            color: #111;
            border: 8px solid #cda33c;
            border-radius: 4px;
            background:
                linear-gradient(135deg, rgba(255,255,255,.92), rgba(240,240,240,.96)),
                #f5f5f4;
            box-shadow: 0 22px 55px rgba(15,23,42,.28);
            transform-origin: top left;
            isolation: isolate;
        }

        .prize-ticket::before {
            position: absolute;
            inset: 22px;
            z-index: -1;
            border: 3px solid #111;
            border-radius: 8px;
            content: "";
            pointer-events: none;
        }

        .prize-ticket::after {
            position: absolute;
            inset: 108px 38px 182px;
            z-index: -2;
            opacity: .035;
            background:
                repeating-linear-gradient(135deg, transparent 0 84px, #caa038 84px 90px, transparent 90px 174px);
            content: "";
            pointer-events: none;
        }

        .ticket-edge {
            position: absolute;
            left: 0;
            width: 100%;
            height: 18px;
            background: linear-gradient(90deg, #9b741f, #ffe89b 26%, #cda33c 48%, #fff1af 72%, #8b6519);
        }

        .ticket-edge-top { top: 0; }
        .ticket-edge-bottom { bottom: 0; }

        .ticket-corner {
            position: absolute;
            top: 16px;
            z-index: 2;
            width: 152px;
            height: 76px;
            border-top: 12px solid #080808;
        }

        .ticket-corner::after {
            position: absolute;
            top: 10px;
            width: 118px;
            height: 42px;
            border-top: 8px solid #d6aa3d;
            content: "";
        }

        .ticket-corner-tl {
            left: 18px;
            border-left: 12px solid #080808;
            transform: skewX(-28deg);
        }

        .ticket-corner-tl::after {
            left: 12px;
            border-left: 7px solid #d6aa3d;
        }

        .ticket-corner-tr {
            right: 18px;
            border-right: 12px solid #080808;
            transform: skewX(28deg);
        }

        .ticket-corner-tr::after {
            right: 12px;
            border-right: 7px solid #d6aa3d;
        }

        .ticket-card-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .ticket-logo {
            display: block;
            width: 430px;
            height: 116px;
            object-fit: contain;
        }

        .ticket-card-header h2 {
            margin: 16px 0 0;
            font-family: "Noto Sans JP", sans-serif;
            font-size: 42px;
            font-weight: 950;
            line-height: 1.05;
            letter-spacing: .05em;
        }

        .ticket-subtitle {
            margin-top: 5px;
            font-family: Oswald, "Arial Narrow", sans-serif;
            font-size: 24px;
            font-weight: 900;
            letter-spacing: .02em;
        }

        .ticket-image-stage {
            display: flex;
            width: 520px;
            height: 318px;
            align-items: center;
            justify-content: center;
            margin: 34px auto 0;
            overflow: hidden;
            border-radius: 8px;
            background: radial-gradient(circle, rgba(217,173,74,.08), transparent 62%);
        }

        .ticket-product-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 10px 12px rgba(0,0,0,.16));
        }

        .ticket-image-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #171717;
            font-size: 34px;
            font-weight: 900;
        }

        .ticket-image-placeholder small {
            margin-top: 6px;
            color: #8a7040;
            font-family: Oswald, sans-serif;
            font-size: 16px;
            letter-spacing: .12em;
        }

        .ticket-prize-banner {
            position: relative;
            display: flex;
            width: 568px;
            min-height: 70px;
            align-items: center;
            justify-content: center;
            margin: 18px auto 0;
            padding: 8px 42px;
            color: #17130a;
            border: 5px solid #050505;
            background: linear-gradient(90deg, #c89222, #ffe69a 28%, #fff4c0 50%, #edc85f 73%, #b47c17);
            clip-path: polygon(6% 0,94% 0,100% 50%,94% 100%,6% 100%,0 50%);
            font-size: 28px;
            font-weight: 950;
            line-height: 1.15;
            text-align: center;
        }

        .ticket-serial-block {
            margin-top: 32px;
            text-align: center;
        }

        .ticket-serial-label {
            font-family: Oswald, "Arial Narrow", sans-serif;
            font-size: 34px;
            font-weight: 900;
            letter-spacing: .04em;
        }

        .ticket-serial-number {
            display: inline-flex;
            min-width: 430px;
            min-height: 58px;
            align-items: center;
            justify-content: center;
            margin-top: 9px;
            padding: 8px 20px;
            color: #fff;
            border: 3px solid #d6aa3d;
            border-radius: 7px;
            background: #111318;
            font-family: Oswald, "Arial Narrow", monospace;
            font-size: 31px;
            font-weight: 900;
            letter-spacing: .08em;
            line-height: 1;
        }

        .ticket-notes {
            position: absolute;
            right: 66px;
            bottom: 48px;
            left: 66px;
            min-height: 150px;
            padding: 13px 10px 0;
            white-space: pre-line;
            border-top: 4px dotted #d1ad4a;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.35;
            text-align: left;
        }

        @media (max-width: 1180px) {
            .view-tabs {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .ticket-maker {
                grid-template-columns: 1fr;
            }

            .ticket-preview-container {
                min-height: 620px;
            }
        }

        @media (max-width: 680px) {
            .view-tabs {
                grid-template-columns: 1fr;
            }

            .ticket-setting-grid {
                grid-template-columns: 1fr;
            }

            .ticket-setting-wide {
                grid-column: auto;
            }

            .ticket-serial-controls {
                grid-template-columns: 1fr;
            }
        }
'''
close_style = "    </style>\n</head>"
if text.count(close_style) != 1:
    raise SystemExit(f"closing style: expected 1 match, got {text.count(close_style)}")
text = text.replace(close_style, css + "\n    </style>\n</head>", 1)

# JS本体
js = r'''
    const DEFAULT_TICKET_SETTINGS = Object.freeze({
        title: "商品引換券",
        subtitle: "PRIZE EXCHANGE TICKET",
        notes: "【注意事項】\n※本券は、自販機から排出後に店内で開封した場合のみ有効です。\n※開封前・開封後を問わず、店外へ持ち出した場合は無効です。\n※本券が入っていた場合は、そのまま受付までお持ちください。\n※後日のお引換えはできません。\n※引換時に本券を回収いたします。\n※複製・改ざん・無効なシリアルの券は使用できません。"
    });
    let ticketProductImageDataUrl = "";

    function normalizePrizeTicketSettings(settings = {}) {
        return {
            title: String(settings.title || DEFAULT_TICKET_SETTINGS.title).trim().slice(0, 20) || DEFAULT_TICKET_SETTINGS.title,
            subtitle: String(settings.subtitle || DEFAULT_TICKET_SETTINGS.subtitle).trim().slice(0, 36) || DEFAULT_TICKET_SETTINGS.subtitle,
            notes: String(settings.notes || DEFAULT_TICKET_SETTINGS.notes).slice(0, 900) || DEFAULT_TICKET_SETTINGS.notes
        };
    }

    function getPrizeTicketSettings() {
        try {
            return normalizePrizeTicketSettings(
                JSON.parse(getScopedItem(TICKET_SETTINGS_STORAGE_KEY) || "{}")
            );
        } catch (error) {
            return normalizePrizeTicketSettings({});
        }
    }

    function savePrizeTicketSettings() {
        const settings = normalizePrizeTicketSettings({
            title: document.getElementById("ticketTitleInput")?.value,
            subtitle: document.getElementById("ticketSubtitleInput")?.value,
            notes: document.getElementById("ticketNotesInput")?.value
        });
        setScopedItem(TICKET_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    }

    function applyPrizeTicketSettings(settings = getPrizeTicketSettings()) {
        const normalized = normalizePrizeTicketSettings(settings);
        const title = document.getElementById("ticketTitleInput");
        const subtitle = document.getElementById("ticketSubtitleInput");
        const notes = document.getElementById("ticketNotesInput");
        if (title) title.value = normalized.title;
        if (subtitle) subtitle.value = normalized.subtitle;
        if (notes) notes.value = normalized.notes;
    }

    function randomTicketDigits(length = 12) {
        const digits = [];
        if (window.crypto?.getRandomValues) {
            const buffer = new Uint32Array(length);
            window.crypto.getRandomValues(buffer);
            buffer.forEach(value => digits.push(String(value % 10)));
        } else {
            while (digits.length < length) {
                digits.push(String(Math.floor(Math.random() * 10)));
            }
        }
        return digits.join("");
    }

    function normalizePrizeTicketSerial(value) {
        const cleaned = String(value || "")
            .toUpperCase()
            .replace(/[^0-9A-Z-]/g, "")
            .slice(0, 24);
        if (!cleaned) return "0000-0000-0000";
        const compactDigits = cleaned.replace(/-/g, "");
        if (/^\d{12}$/.test(compactDigits)) {
            return compactDigits.match(/.{1,4}/g).join("-");
        }
        return cleaned;
    }

    function generatePrizeTicketSerial() {
        const raw = randomTicketDigits(12);
        const formatted = raw.match(/.{1,4}/g).join("-");
        const input = document.getElementById("ticketSerialInput");
        if (input) input.value = formatted;
        renderPrizeTicketPreview();
        return formatted;
    }

    function clearPrizeTicketImage() {
        ticketProductImageDataUrl = "";
        const input = document.getElementById("ticketImageInput");
        if (input) input.value = "";
        renderPrizeTicketPreview();
    }

    function handlePrizeTicketImage(event) {
        const file = event?.target?.files?.[0];
        if (!file) return;
        if (!String(file.type || "").startsWith("image/")) {
            alert("画像ファイルを選択してください。");
            event.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            ticketProductImageDataUrl = String(reader.result || "");
            renderPrizeTicketPreview();
        };
        reader.onerror = () => alert("商品画像を読み込めませんでした。");
        reader.readAsDataURL(file);
    }

    function renderPrizeTicketPreview() {
        const ticket = document.getElementById("prizeTicket");
        if (!ticket) return;
        const title = String(document.getElementById("ticketTitleInput")?.value || DEFAULT_TICKET_SETTINGS.title).trim() || DEFAULT_TICKET_SETTINGS.title;
        const subtitle = String(document.getElementById("ticketSubtitleInput")?.value || DEFAULT_TICKET_SETTINGS.subtitle).trim() || DEFAULT_TICKET_SETTINGS.subtitle;
        const prizeName = String(document.getElementById("ticketPrizeNameInput")?.value || "").trim() || "景品名";
        const serial = normalizePrizeTicketSerial(document.getElementById("ticketSerialInput")?.value);
        const notes = String(document.getElementById("ticketNotesInput")?.value || DEFAULT_TICKET_SETTINGS.notes);

        document.getElementById("ticketTitleText").textContent = title;
        document.getElementById("ticketSubtitleText").textContent = subtitle;
        document.getElementById("ticketPrizeNameText").textContent = prizeName;
        document.getElementById("ticketSerialText").textContent = serial;
        document.getElementById("ticketNotesText").textContent = notes;

        const logo = document.getElementById("ticketLogo");
        if (logo) logo.src = logoDataUrl || DEFAULT_LOGO;

        const image = document.getElementById("ticketProductImage");
        const placeholder = document.getElementById("ticketImagePlaceholder");
        if (ticketProductImageDataUrl) {
            image.src = ticketProductImageDataUrl;
            image.hidden = false;
            placeholder.hidden = true;
        } else {
            image.removeAttribute("src");
            image.hidden = true;
            placeholder.hidden = false;
        }
        requestAnimationFrame(fitPrizeTicketPreview);
    }

    function fitPrizeTicketPreview() {
        const container = document.getElementById("ticketPreviewContainer");
        const shell = document.getElementById("ticketPreviewShell");
        const ticket = document.getElementById("prizeTicket");
        if (!container || !shell || !ticket || container.classList.contains("view-hidden")) return;
        const availableWidth = Math.max(280, container.clientWidth - 36);
        const scale = Math.min(1, availableWidth / 744);
        ticket.style.transform = `scale(${scale})`;
        shell.style.width = `${Math.round(744 * scale)}px`;
        shell.style.height = `${Math.round(1039 * scale)}px`;
    }

    function initializePrizeTicketTool() {
        applyPrizeTicketSettings();
        const serialInput = document.getElementById("ticketSerialInput");
        if (serialInput && !serialInput.value.trim()) generatePrizeTicketSerial();

        ["ticketTitleInput", "ticketSubtitleInput", "ticketPrizeNameInput", "ticketSerialInput", "ticketNotesInput"]
            .forEach(id => {
                const element = document.getElementById(id);
                if (!element) return;
                element.addEventListener("input", () => {
                    if (["ticketTitleInput", "ticketSubtitleInput", "ticketNotesInput"].includes(id)) {
                        savePrizeTicketSettings();
                    }
                    renderPrizeTicketPreview();
                });
            });
        document.getElementById("ticketImageInput")?.addEventListener("change", handlePrizeTicketImage);
        window.addEventListener("resize", () => {
            if (document.body.dataset.appView === "ticket") fitPrizeTicketPreview();
        });
        renderPrizeTicketPreview();
    }

    function safePrizeTicketFilename(value) {
        return String(value || "景品")
            .trim()
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\s+/g, " ")
            .slice(0, 60) || "景品";
    }

    async function exportPrizeTicket() {
        const ticket = document.getElementById("prizeTicket");
        if (!ticket) return;
        renderPrizeTicketPreview();
        try {
            if (document.fonts?.ready) await document.fonts.ready;
            const canvas = await html2canvas(ticket, {
                scale: 1,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null,
                width: 744,
                height: 1039,
                logging: false
            });
            const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
            if (!blob) throw new Error("PNGを作成できませんでした。");
            const prizeName = safePrizeTicketFilename(document.getElementById("ticketPrizeNameInput")?.value);
            const serial = safePrizeTicketFilename(normalizePrizeTicketSerial(document.getElementById("ticketSerialInput")?.value));
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `商品引換券_${prizeName}_${serial}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1200);
        } catch (error) {
            console.error("商品引換券の保存に失敗しました。", error);
            alert(`商品引換券を保存できませんでした。\n${error.message || error}`);
        }
    }
'''

switch_marker = '    function switchAppView(view) {'
if text.count(switch_marker) != 1:
    raise SystemExit(f"switchAppView marker: expected 1 match, got {text.count(switch_marker)}")
text = text.replace(switch_marker, js + '\n\n' + switch_marker, 1)

old_switch = r'''    function switchAppView(view) {
        const isBuylist = view === "buylist";
        const isSingle = view === "single";
        const isXPost = view === "xpost";
        document.body.dataset.appView = view;
        document.getElementById("buylistMakerView").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("buylistControl").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("pagesContainer").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("singleMakerView").classList.toggle("view-hidden", !isSingle);
        document.getElementById("xPostMakerView").classList.toggle("view-hidden", !isXPost);
        document.getElementById("buylistTabButton").classList.toggle("is-active", isBuylist);
        document.getElementById("singleTabButton").classList.toggle("is-active", isSingle);
        document.getElementById("xPostTabButton").classList.toggle("is-active", isXPost);
        document.getElementById("buylistTabButton").setAttribute("aria-selected", String(isBuylist));
        document.getElementById("singleTabButton").setAttribute("aria-selected", String(isSingle));
        document.getElementById("xPostTabButton").setAttribute("aria-selected", String(isXPost));

        requestAnimationFrame(() => {
            if (isSingle) {
                syncPanelLayoutWidth("single");
                fitSinglePreviews();
            } else if (isBuylist) {
                syncPanelLayoutWidth("buylist");
                fitPreviewPages();
            } else if (isXPost) {
                syncPanelLayoutWidth("xpost");
                if (!syncDefaultXPostTemplateForCategory()) {
                    syncSingleXPostDraft(false);
                }
            }
        });
    }'''
new_switch = r'''    function switchAppView(view) {
        const isBuylist = view === "buylist";
        const isSingle = view === "single";
        const isXPost = view === "xpost";
        const isTicket = view === "ticket";
        document.body.dataset.appView = view;
        document.getElementById("buylistMakerView").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("buylistControl").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("pagesContainer").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("singleMakerView").classList.toggle("view-hidden", !isSingle);
        document.getElementById("xPostMakerView").classList.toggle("view-hidden", !isXPost);
        document.getElementById("ticketMakerView").classList.toggle("view-hidden", !isTicket);
        document.getElementById("buylistTabButton").classList.toggle("is-active", isBuylist);
        document.getElementById("singleTabButton").classList.toggle("is-active", isSingle);
        document.getElementById("xPostTabButton").classList.toggle("is-active", isXPost);
        document.getElementById("ticketTabButton").classList.toggle("is-active", isTicket);
        document.getElementById("buylistTabButton").setAttribute("aria-selected", String(isBuylist));
        document.getElementById("singleTabButton").setAttribute("aria-selected", String(isSingle));
        document.getElementById("xPostTabButton").setAttribute("aria-selected", String(isXPost));
        document.getElementById("ticketTabButton").setAttribute("aria-selected", String(isTicket));

        requestAnimationFrame(() => {
            if (isSingle) {
                syncPanelLayoutWidth("single");
                fitSinglePreviews();
            } else if (isBuylist) {
                syncPanelLayoutWidth("buylist");
                fitPreviewPages();
            } else if (isXPost) {
                syncPanelLayoutWidth("xpost");
                if (!syncDefaultXPostTemplateForCategory()) {
                    syncSingleXPostDraft(false);
                }
            } else if (isTicket) {
                renderPrizeTicketPreview();
                fitPrizeTicketPreview();
            }
        });
    }'''
replace_once(old_switch, new_switch, 'switch app view')

# 初期化
replace_once(
    '        renderSingleAdPreviews();\n        updateXPostSelectionPreview();',
    '        renderSingleAdPreviews();\n        initializePrizeTicketTool();\n        updateXPostSelectionPreview();',
    'ticket init',
)

required = [
    'id="ticketTabButton"',
    'id="ticketMakerView"',
    'class="prize-ticket"',
    'TICKET_SETTINGS_STORAGE_KEY',
    'function generatePrizeTicketSerial()',
    'function exportPrizeTicket()',
    'const isTicket = view === "ticket";',
    'initializePrizeTicketTool();',
    'width: 744px;',
    'height: 1039px;',
]
for needle in required:
    if needle not in text:
        raise SystemExit(f"missing validation marker: {needle}")

path.write_text(text, encoding="utf-8")
