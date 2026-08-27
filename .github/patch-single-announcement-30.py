from pathlib import Path
import re

path = Path("index.html")
text = path.read_text(encoding="utf-8")


def once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, got {count}")
    text = text.replace(old, new, 1)


def regex(pattern, replacement, label):
    global text
    text, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, got {count}")


once(
    'const SINGLE_SIZES = ["square", "portrait", "landscape"];\n    const DEFAULT_SINGLE_HEADLINE_SCALE = 100;',
    'const SINGLE_SIZES = ["square", "portrait", "landscape"];\n    const MAX_SINGLE_ITEMS_PER_IMAGE = 30;\n    const DEFAULT_SINGLE_HEADLINE_SCALE = 100;',
    "max items constant",
)
once('<small>1〜10商品</small>', '<small>1〜30商品</small>', "tab label")
once(
    '<p>1枚に<strong>1〜10商品</strong>を配置できます</p>',
    '<p>1枚に<strong>1〜30商品</strong>を配置できます</p>',
    "panel label",
)

once(
    '''                            <option value="9">9商品</option>\n                            <option value="10">10商品</option>\n                        </select>''',
    '''                            <option value="9">9商品</option>\n                            <option value="10">10商品</option>\n                            <optgroup label="高密度レイアウト">\n                                <option value="11">11商品</option>\n                                <option value="12">12商品</option>\n                                <option value="13">13商品</option>\n                                <option value="14">14商品</option>\n                                <option value="15">15商品</option>\n                                <option value="16">16商品</option>\n                                <option value="17">17商品</option>\n                                <option value="18">18商品</option>\n                                <option value="19">19商品</option>\n                                <option value="20">20商品</option>\n                                <option value="21">21商品</option>\n                                <option value="22">22商品</option>\n                                <option value="23">23商品</option>\n                                <option value="24">24商品</option>\n                                <option value="25">25商品</option>\n                                <option value="26">26商品</option>\n                                <option value="27">27商品</option>\n                                <option value="28">28商品</option>\n                                <option value="29">29商品</option>\n                                <option value="30">30商品</option>\n                            </optgroup>\n                        </select>''',
    "item count options",
)

once(
    '''                    <input\n                        type="text"\n                        id="singleSearchInput"\n                        placeholder="カード名・種別・掲載グループで検索"\n                        aria-label="単品告知に使用する商品を検索"\n                    >\n                    <button class="btn-soft" type="button" onclick="selectVisibleSingleCards()">表示中の商品を選択</button>''',
    '''                    <input\n                        type="text"\n                        id="singleSearchInput"\n                        placeholder="カード名・種別・掲載グループ・掲載状況で検索"\n                        aria-label="単品告知に使用する商品を検索"\n                    >\n                    <select id="singleStatusFilterSelect" aria-label="掲載状況で絞り込み">\n                        <option value="all">掲載状況：すべて</option>\n                        <option value="strengthened">強化のみ</option>\n                        <option value="not-strengthened">強化以外</option>\n                    </select>\n                    <button class="btn-soft" type="button" onclick="selectVisibleSingleCards()">表示中の商品を選択</button>''',
    "status filter UI",
)

old_clamp = '''Math.min(\n            10,\n            Math.max(1, Number(document.getElementById("singleItemsPerImageSelect")?.value) || 1)\n        )'''
new_clamp = '''Math.min(\n            MAX_SINGLE_ITEMS_PER_IMAGE,\n            Math.max(1, Number(document.getElementById("singleItemsPerImageSelect")?.value) || 1)\n        )'''
if text.count(old_clamp) != 2:
    raise SystemExit(f"count clamps: expected 2, got {text.count(old_clamp)}")
text = text.replace(old_clamp, new_clamp)
once(
    'String(Math.min(10, Math.max(1, Number(settings.itemsPerImage) || 1)));',
    'String(Math.min(MAX_SINGLE_ITEMS_PER_IMAGE, Math.max(1, Number(settings.itemsPerImage) || 1)));',
    "saved count clamp",
)

regex(
    r'''    function getSingleMultiLayout\(size, count\) \{.*?\n    \}\n\n    function renderSingleProductRows''',
    '''    function getSingleMultiLayout(size, count) {\n        const safeCount = Math.min(MAX_SINGLE_ITEMS_PER_IMAGE, Math.max(2, Number(count) || 2));\n        const legacyLayoutMap = {\n            square: {2:[2,1],3:[3,1],4:[2,2],5:[3,2],6:[3,2],7:[4,2],8:[4,2],9:[5,2],10:[5,2]},\n            portrait: {2:[2,1],3:[3,1],4:[2,2],5:[3,2],6:[3,2],7:[4,2],8:[4,2],9:[5,2],10:[5,2]},\n            landscape: {2:[2,1],3:[3,1],4:[4,1],5:[5,1],6:[3,2],7:[4,2],8:[4,2],9:[5,2],10:[5,2]}\n        };\n        const normalizedSize = SINGLE_SIZES.includes(size) ? size : "square";\n        let columns, rows;\n        if (safeCount <= 10) {\n            [columns, rows] = legacyLayoutMap[normalizedSize][safeCount];\n        } else if (normalizedSize === "portrait") {\n            if (safeCount <= 12) [columns, rows] = [3,4];\n            else if (safeCount <= 15) [columns, rows] = [3,5];\n            else if (safeCount <= 20) [columns, rows] = [4,5];\n            else if (safeCount <= 24) [columns, rows] = [4,6];\n            else [columns, rows] = [5,6];\n        } else if (normalizedSize === "landscape") {\n            if (safeCount <= 12) [columns, rows] = [6,2];\n            else if (safeCount <= 15) [columns, rows] = [5,3];\n            else if (safeCount <= 18) [columns, rows] = [6,3];\n            else if (safeCount <= 20) [columns, rows] = [5,4];\n            else if (safeCount <= 24) [columns, rows] = [6,4];\n            else if (safeCount === 25) [columns, rows] = [5,5];\n            else [columns, rows] = [6,5];\n        } else {\n            if (safeCount <= 12) [columns, rows] = [4,3];\n            else if (safeCount <= 15) [columns, rows] = [5,3];\n            else if (safeCount === 16) [columns, rows] = [4,4];\n            else if (safeCount <= 20) [columns, rows] = [5,4];\n            else if (safeCount <= 24) [columns, rows] = [6,4];\n            else if (safeCount === 25) [columns, rows] = [5,5];\n            else [columns, rows] = [6,5];\n        }\n        const density = safeCount >= 21 ? "micro" : safeCount >= 13 ? "ultra" : safeCount >= 9 ? "dense" : safeCount >= 7 || (normalizedSize === "landscape" && safeCount >= 4) ? "compact" : "comfortable";\n        const gap = density === "micro" ? 5 : density === "ultra" ? 8 : density === "dense" ? 12 : density === "compact" ? 14 : 18;\n        const totalColumnGap = Math.max(0, columns - 1) * gap;\n        return { columns, rows, density, gap, rowGap: gap, cardWidth: `calc((100% - ${totalColumnGap}px) / ${columns})` };\n    }\n\n    function renderSingleProductRows''',
    "layouts 11-30",
)

regex(
    r'''    function getSingleHeadlineSize\(settings, isMulti, density\) \{.*?\n    \}\n\n    function getSingleProductNameSize\(settings, isMulti, density, size\) \{.*?\n    \}\n\n    function getSinglePriceSize\(settings, isMulti, density, size\) \{.*?\n    \}\n\n    function getSingleAdAreas''',
    '''    function getSingleHeadlineSize(settings, isMulti, density) {\n        let baseSize = settings.design === "mono" ? 64 : 57;\n        if (isMulti) baseSize = density === "micro" ? 22 : density === "ultra" ? 28 : density === "dense" ? 34 : density === "compact" ? 38 : 42;\n        const scale = clampTitleNumber(settings.headlineScale, 60, 160, DEFAULT_SINGLE_HEADLINE_SCALE);\n        return Math.round(baseSize * scale) / 100;\n    }\n\n    function getSingleProductNameSize(settings, isMulti, density, size) {\n        let baseSize = size === "portrait" ? 34 : 39;\n        if (isMulti) baseSize = density === "micro" ? 10 : density === "ultra" ? 13 : density === "dense" ? 16 : density === "compact" ? 18 : 21;\n        const scale = clampTitleNumber(settings.nameScale, 60, 160, DEFAULT_SINGLE_NAME_SCALE);\n        return Math.round(baseSize * scale) / 100;\n    }\n\n    function getSinglePriceSize(settings, isMulti, density, size) {\n        let baseSize = size === "portrait" ? 61 : settings.design === "redimpact" ? 78 : 72;\n        if (isMulti) baseSize = density === "micro" ? 14 : density === "ultra" ? 18 : density === "dense" ? 24 : density === "compact" ? 27 : 31;\n        const scale = clampTitleNumber(settings.priceScale, 60, 160, DEFAULT_SINGLE_PRICE_SCALE);\n        const hiddenNameBoost = settings.nameDisplay === "hide" ? (isMulti ? (density === "micro" ? 1.06 : density === "ultra" ? 1.12 : density === "dense" ? 1.22 : density === "compact" ? 1.28 : 1.34) : 1.4) : 1;\n        return Math.round(baseSize * scale * hiddenNameBoost) / 100;\n    }\n\n    function getSingleAdAreas''',
    "high-density typography",
)

regex(
    r'''    function getFilteredSingleCards\(\) \{.*?\n    \}\n\n    function renderSingleCardPicker''',
    '''    function refreshSingleStatusFilterOptions() {\n        const select = document.getElementById("singleStatusFilterSelect");\n        if (!select) return;\n        const currentValue = select.value || "all";\n        const statuses = Array.from(new Set(globalCardData.map(card => String(card.status || "").trim()).filter(Boolean))).sort((a,b) => a.localeCompare(b, "ja", {numeric:true, sensitivity:"base"}));\n        const options = [["all","掲載状況：すべて"],["strengthened","強化のみ"],["not-strengthened","強化以外"], ...statuses.map(status => [`status:${status}`, `掲載「${status}」だけ`])];\n        if (globalCardData.some(card => !String(card.status || "").trim())) options.push(["status:","掲載状況：空欄だけ"]);\n        select.innerHTML = "";\n        options.forEach(([value,label]) => { const option = document.createElement("option"); option.value = value; option.textContent = label; select.appendChild(option); });\n        select.value = options.some(([value]) => value === currentValue) ? currentValue : "all";\n    }\n\n    function getFilteredSingleCards() {\n        const query = String(document.getElementById("singleSearchInput")?.value || "").trim().toLocaleLowerCase("ja");\n        const statusFilter = String(document.getElementById("singleStatusFilterSelect")?.value || "all");\n        return globalCardData.filter(card => {\n            const status = String(card.status || "").trim();\n            const matchesStatus = statusFilter === "all" ? true : statusFilter === "strengthened" ? status.includes("強化") : statusFilter === "not-strengthened" ? !status.includes("強化") : statusFilter.startsWith("status:") ? status === statusFilter.slice(7) : true;\n            if (!matchesStatus) return false;\n            if (!query) return true;\n            return [card.name, card.type, card.group, card.status, card.price, card.aMinusPrice, card.productId].some(value => String(value || "").toLocaleLowerCase("ja").includes(query));\n        });\n    }\n\n    function renderSingleCardPicker''',
    "status filtering",
)

once(
    '''        const filteredCards = getFilteredSingleCards();\n        count.textContent =''',
    '''        refreshSingleStatusFilterOptions();\n        const filteredCards = getFilteredSingleCards();\n        count.textContent =''',
    "refresh filter options",
)

once(
    '''    document.getElementById("singleSearchInput")\n        .addEventListener("input", () => {\n            singlePickerPage = 1;\n            renderSingleCardPicker();\n        });''',
    '''    document.getElementById("singleSearchInput")\n        .addEventListener("input", () => {\n            singlePickerPage = 1;\n            renderSingleCardPicker();\n        });\n\n    document.getElementById("singleStatusFilterSelect")\n        .addEventListener("change", () => {\n            singlePickerPage = 1;\n            renderSingleCardPicker();\n        });''',
    "filter listener",
)

css = r'''

        /* ===== 単品告知：11〜30商品用 ===== */
        .single-ad.is-multi[data-density="ultra"] { padding:22px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-header { min-height:52px; padding-bottom:5px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-logo-box { width:190px; height:52px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-logo { max-height:50px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-date { font-size:11px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-heading { margin-top:6px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-products { margin-top:7px; padding:1px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card { padding:1px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-info { margin-top:3px; padding:3px 4px 4px; border-width:1px !important; border-radius:7px; box-shadow:0 2px 0 rgba(0,0,0,.16) !important; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-card-name { line-height:1.08; -webkit-line-clamp:1; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-grade { margin-top:2px; padding:1px 5px; font-size:8px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price-label { margin-top:2px; font-size:8px; letter-spacing:.03em; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price { min-height:32px; margin-top:2px; padding:2px 3px; border-width:1px; border-radius:5px; box-shadow:0 2px 0 rgba(0,0,0,.2); }
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price.is-dual { min-height:38px; padding:1px 2px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-price-row { gap:2px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-state-label { max-width:38px; font-size:8px; }
        .single-ad.is-multi[data-density="ultra"] .single-ad-price-label .price-change-badge { padding:2px 4px; font-size:8px; }
        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-price { min-height:38px; margin-top:3px; }
        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-price.is-dual { min-height:46px; }

        .single-ad.is-multi[data-density="micro"] { padding:14px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-header { min-height:42px; padding-bottom:3px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-logo-box { width:150px; height:42px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-logo { max-height:40px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-date { font-size:9px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-heading { margin-top:3px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-products { margin-top:4px; padding:0; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card { padding:0; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-image-stage { padding:0 1px 1px !important; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-info { margin-top:2px; padding:2px 2px 3px; border-width:1px !important; border-radius:5px; box-shadow:0 1px 0 rgba(0,0,0,.16) !important; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-card-name { line-height:1.02; -webkit-line-clamp:1; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-grade { margin-top:1px; padding:1px 3px; font-size:7px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price-label { margin-top:1px; font-size:7px; letter-spacing:0; }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price { min-height:24px; margin-top:1px; padding:1px 2px; border-width:1px; border-radius:4px; box-shadow:0 1px 0 rgba(0,0,0,.2); }
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price.is-dual { min-height:30px; padding:1px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-price-row { gap:1px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-state-label { max-width:30px; font-size:7px; }
        .single-ad.is-multi[data-density="micro"] .single-ad-price-label .price-change-badge { padding:1px 3px; font-size:7px; }
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-price { min-height:27px; margin-top:2px; }
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-price.is-dual { min-height:34px; }

        .single-maker .single-selection-toolbar { grid-template-columns:repeat(6,minmax(0,1fr)); }
        .single-maker #singleSearchInput { grid-column:1 / 5; }
        .single-maker #singleStatusFilterSelect { grid-column:5 / 7; width:100%; min-width:0; }
        .single-maker .single-selection-toolbar button { grid-column:span 2; width:100%; min-width:0; }
        @media (max-width:680px) {
            .single-maker #singleSearchInput,
            .single-maker #singleStatusFilterSelect,
            .single-maker .single-selection-toolbar button { grid-column:1 / -1; width:100%; }
        }
'''
once("\n    </style>\n</head>", css + "\n    </style>\n</head>", "dense CSS")

for needle in [
    "MAX_SINGLE_ITEMS_PER_IMAGE = 30",
    "<small>1〜30商品</small>",
    '<option value="30">30商品</option>',
    'id="singleStatusFilterSelect"',
    'data-density="micro"',
    'data-density="ultra"',
]:
    if needle not in text:
        raise SystemExit(f"validation missing: {needle}")

path.write_text(text, encoding="utf-8")
print("patched", len(text), "chars")
