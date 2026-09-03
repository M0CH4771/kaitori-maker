from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

style_id = 'visual-polish-v5'
if style_id in text:
    raise SystemExit('visual polish v5 already exists')

# 1) Buylist price sizing: make 30-card layouts clearly more readable,
# while keeping 60-card layouts dense enough to fit safely.
old = '''    function getBuylistPriceBaseSize(page) {
        const theme = normalizeTheme(page?.dataset?.theme);
        return page?.classList?.contains("portrait") &&
            LARGE_PRICE_THEMES.has(theme)
            ? 23
            : 21;
    }
'''
new = '''    function getBuylistPriceBaseSize(page) {
        const theme = normalizeTheme(page?.dataset?.theme);
        const layout = String(page?.dataset?.layout || "");
        if (layout === "portrait_6x5") return 28;
        if (layout === "landscape_10x3") return 26;
        if (layout === "portrait_10x6") {
            return LARGE_PRICE_THEMES.has(theme) ? 23 : 22;
        }
        if (layout === "landscape_15x4") return 20;
        return page?.classList?.contains("portrait") &&
            LARGE_PRICE_THEMES.has(theme)
            ? 23
            : 21;
    }
'''
if old not in text:
    raise SystemExit('getBuylistPriceBaseSize block not found')
text = text.replace(old, new, 1)

# 2) Single-ad typography: keep portrait as the baseline the user already liked,
# and give square/landscape extra presence where there is more horizontal room.
pat = re.compile(r'''    function getSingleHeadlineSize\(settings, isMulti, density\) \{\n        let baseSize = settings\.design === "mono" \? 64 : 57;\n        if \(isMulti\) baseSize = density === "micro" \? 38 : density === "ultra" \? 36 : density === "dense" \? 34 : density === "compact" \? 38 : 42;\n        const scale = clampTitleNumber\(settings\.headlineScale, 60, 160, DEFAULT_SINGLE_HEADLINE_SCALE\);\n        return Math\.round\(baseSize \* scale\) / 100;\n    \}\n''')
rep = '''    function getSingleHeadlineSize(settings, isMulti, density) {
        let baseSize = settings.design === "mono" ? 64 : 57;
        if (isMulti) {
            baseSize = density === "micro" ? 38 : density === "ultra" ? 36 : density === "dense" ? 34 : density === "compact" ? 38 : 42;
            const isDenseLayout = ["dense", "ultra", "micro"].includes(density);
            if (isDenseLayout && settings.size === "square") baseSize *= 1.06;
            if (isDenseLayout && settings.size === "landscape") baseSize *= 1.12;
        }
        const scale = clampTitleNumber(settings.headlineScale, 60, 160, DEFAULT_SINGLE_HEADLINE_SCALE);
        return Math.round(baseSize * scale) / 100;
    }
'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit(f'headline function replacement count={n}')

pat = re.compile(r'''    function getSingleProductNameSize\(settings, isMulti, density, size\) \{\n        let baseSize = size === "portrait" \? 34 : 39;\n        if \(isMulti\) baseSize = density === "micro" \? 10 : density === "ultra" \? 13 : density === "dense" \? 16 : density === "compact" \? 18 : 21;\n        const scale = clampTitleNumber\(settings\.nameScale, 60, 160, DEFAULT_SINGLE_NAME_SCALE\);\n        return Math\.round\(baseSize \* scale\) / 100;\n    \}\n''')
rep = '''    function getSingleProductNameSize(settings, isMulti, density, size) {
        let baseSize = size === "portrait" ? 34 : 39;
        if (isMulti) {
            baseSize = density === "micro" ? 10 : density === "ultra" ? 13 : density === "dense" ? 16 : density === "compact" ? 18 : 21;
            if (size === "square" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.03;
            if (size === "landscape" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.05;
        }
        const scale = clampTitleNumber(settings.nameScale, 60, 160, DEFAULT_SINGLE_NAME_SCALE);
        return Math.round(baseSize * scale) / 100;
    }
'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit(f'name function replacement count={n}')

pat = re.compile(r'''    function getSinglePriceSize\(settings, isMulti, density, size\) \{\n        let baseSize = size === "portrait" \? 61 : settings\.design === "redimpact" \? 78 : 72;\n        if \(isMulti\) baseSize = density === "micro" \? 19 : density === "ultra" \? 22 : density === "dense" \? 24 : density === "compact" \? 27 : 31;\n        const scale = clampTitleNumber\(settings\.priceScale, 60, 160, DEFAULT_SINGLE_PRICE_SCALE\);\n        const hiddenNameBoost = settings\.nameDisplay === "hide" \? \(isMulti \? \(density === "micro" \? 1\.16 : density === "ultra" \? 1\.18 : density === "dense" \? 1\.22 : density === "compact" \? 1\.28 : 1\.34\) : 1\.4\) : 1;\n        return Math\.round\(baseSize \* scale \* hiddenNameBoost\) / 100;\n    \}\n''')
rep = '''    function getSinglePriceSize(settings, isMulti, density, size) {
        let baseSize = size === "portrait" ? 61 : settings.design === "redimpact" ? 78 : 72;
        if (isMulti) {
            baseSize = density === "micro" ? 19 : density === "ultra" ? 22 : density === "dense" ? 24 : density === "compact" ? 27 : 31;
            if (size === "square" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.04;
            if (size === "landscape" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.08;
        }
        const scale = clampTitleNumber(settings.priceScale, 60, 160, DEFAULT_SINGLE_PRICE_SCALE);
        const hiddenNameBoost = settings.nameDisplay === "hide" ? (isMulti ? (density === "micro" ? 1.16 : density === "ultra" ? 1.18 : density === "dense" ? 1.22 : density === "compact" ? 1.28 : 1.34) : 1.4) : 1;
        return Math.round(baseSize * scale * hiddenNameBoost) / 100;
    }
'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit(f'price function replacement count={n}')

style = r'''
    <style id="visual-polish-v5">
        /* =========================================================
           FULL VISUAL POLISH V5
           画像を主役、価格を第二主役に。装飾より読みやすさを優先。
           ========================================================= */

        /* ----- 普通の買取表：レイアウト別に紙面効率を最適化 ----- */
        .exportArea[data-layout="portrait_10x6"] {
            padding: 26px 30px 24px;
        }
        .exportArea[data-layout="portrait_10x6"] .header-area {
            min-height: 140px;
            margin-bottom: 13px;
            padding: 14px 20px;
        }
        .exportArea[data-layout="portrait_10x6"] .logo-container {
            width: 318px;
            height: 106px;
            flex-basis: 318px;
        }
        .exportArea[data-layout="portrait_10x6"] .logo-container img { max-height: 104px; }
        .exportArea[data-layout="portrait_10x6"] .page-emblem {
            width: 82px;
            height: 82px;
        }
        .exportArea[data-layout="portrait_10x6"] .card-grid {
            gap: 7px;
            margin-bottom: 11px;
            padding: 3px;
        }
        .exportArea[data-layout="portrait_10x6"] .card-item {
            padding: 4px 4px 5px;
            border-radius: 6px;
            box-shadow: 0 2px 0 var(--v4-border, #9a7a3c), 0 4px 8px rgba(0,0,0,.14);
        }
        .exportArea[data-layout="portrait_10x6"] .card-img-container { margin-bottom: 2px; }
        .exportArea[data-layout="portrait_10x6"] .card-price-container { height: 32px; }

        .exportArea[data-layout="landscape_15x4"] {
            padding: 22px 28px 20px;
        }
        .exportArea[data-layout="landscape_15x4"] .header-area {
            min-height: 118px;
            margin-bottom: 10px;
            padding: 10px 18px;
        }
        .exportArea[data-layout="landscape_15x4"] .logo-container {
            width: 280px;
            height: 88px;
            flex-basis: 280px;
        }
        .exportArea[data-layout="landscape_15x4"] .logo-container img { max-height: 86px; }
        .exportArea[data-layout="landscape_15x4"] .page-emblem {
            width: 70px;
            height: 70px;
        }
        .exportArea[data-layout="landscape_15x4"] .card-grid {
            gap: 6px;
            margin-bottom: 9px;
            padding: 2px;
        }
        .exportArea[data-layout="landscape_15x4"] .card-item {
            padding: 3px 3px 4px;
            border-radius: 5px;
            box-shadow: 0 2px 0 var(--v4-border, #9a7a3c), 0 3px 6px rgba(0,0,0,.13);
        }
        .exportArea[data-layout="landscape_15x4"] .card-img-container { margin-bottom: 2px; }
        .exportArea[data-layout="landscape_15x4"] .card-price-container { height: 29px; }

        .exportArea[data-layout="portrait_6x5"] {
            padding: 28px 32px 25px;
        }
        .exportArea[data-layout="portrait_6x5"] .header-area {
            min-height: 148px;
            margin-bottom: 14px;
        }
        .exportArea[data-layout="portrait_6x5"] .card-grid {
            gap: 9px;
            margin-bottom: 12px;
            padding: 3px;
        }
        .exportArea[data-layout="portrait_6x5"] .card-item {
            padding: 5px 5px 6px;
        }
        .exportArea[data-layout="portrait_6x5"] .card-img-container { margin-bottom: 3px; }
        .exportArea[data-layout="portrait_6x5"] .card-price-container {
            height: 42px;
            padding-inline: 6px;
        }

        .exportArea[data-layout="landscape_10x3"] {
            padding: 24px 30px 22px;
        }
        .exportArea[data-layout="landscape_10x3"] .header-area {
            min-height: 128px;
            margin-bottom: 11px;
            padding: 12px 20px;
        }
        .exportArea[data-layout="landscape_10x3"] .logo-container {
            width: 305px;
            height: 96px;
            flex-basis: 305px;
        }
        .exportArea[data-layout="landscape_10x3"] .logo-container img { max-height: 94px; }
        .exportArea[data-layout="landscape_10x3"] .page-emblem {
            width: 78px;
            height: 78px;
        }
        .exportArea[data-layout="landscape_10x3"] .card-grid {
            gap: 8px;
            margin-bottom: 10px;
            padding: 3px;
        }
        .exportArea[data-layout="landscape_10x3"] .card-item {
            padding: 5px 5px 6px;
        }
        .exportArea[data-layout="landscape_10x3"] .card-img-container { margin-bottom: 3px; }
        .exportArea[data-layout="landscape_10x3"] .card-price-container {
            height: 40px;
            padding-inline: 6px;
        }

        /* カード名を隠す実運用では、画像→価格の距離をさらに短くする */
        .exportArea.hide-card-names .card-img-container {
            margin-bottom: 2px !important;
        }
        .exportArea.hide-card-names:is(
            [data-layout="portrait_6x5"],
            [data-layout="landscape_10x3"]
        ):not(.has-dual-price-page) .card-price-container {
            height: 44px;
        }

        /* ----- 単品告知：低枚数縦長の大空白を減らす ----- */
        .single-ad.single-portrait.is-multi[data-count="2"] .single-ad-products,
        .single-ad.single-portrait.is-multi[data-count="3"] .single-ad-products {
            transform: translateY(-5%);
        }
        .single-ad.single-portrait.is-multi[data-count="4"] .single-ad-products {
            transform: translateY(-2.5%);
        }

        /* 高密度でもカード画像と価格を一続きに見せる */
        .single-ad.is-multi:is([data-density="dense"],[data-density="ultra"],[data-density="micro"])
        .single-ad-product-card {
            padding-bottom: 2px;
        }
        .single-ad.is-multi:is([data-density="dense"],[data-density="ultra"],[data-density="micro"])
        .single-ad-product-card .single-ad-image-stage {
            padding-bottom: 0 !important;
        }
        .single-ad.is-multi:is([data-density="dense"],[data-density="ultra"],[data-density="micro"])
        .single-ad-product-card .single-ad-info {
            margin-top: 0 !important;
        }

        /* 横長は横幅に余裕があるので価格帯を少し太くして遠目の可読性を上げる */
        .single-ad.single-landscape.is-multi[data-density="dense"] .single-ad-price { min-height: 34px; }
        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-price { min-height: 30px; }
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-price { min-height: 27px; }

        /* 正方形・横長の高密度ロゴを少しだけ強くする。縦長は完成形を維持。 */
        .single-ad.single-square.is-multi:is([data-density="ultra"],[data-density="micro"]) .single-ad-logo-box {
            transform: scale(1.06);
            transform-origin: left center;
        }
        .single-ad.single-landscape.is-multi:is([data-density="ultra"],[data-density="micro"]) .single-ad-logo-box {
            transform: scale(1.08);
            transform-origin: left center;
        }
    </style>
'''

marker = '</head>'
if text.count(marker) != 1:
    raise SystemExit(f'unexpected head marker count={text.count(marker)}')
text = text.replace(marker, style + marker, 1)
path.write_text(text, encoding='utf-8')
print('applied visual polish v5')
