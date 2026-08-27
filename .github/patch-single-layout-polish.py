from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, got {count}")
    text = text.replace(old, new, 1)


replace_once(
    'if (isMulti) baseSize = density === "micro" ? 22 : density === "ultra" ? 28 : density === "dense" ? 34 : density === "compact" ? 38 : 42;',
    'if (isMulti) baseSize = density === "micro" ? 28 : density === "ultra" ? 32 : density === "dense" ? 34 : density === "compact" ? 38 : 42;',
    "headline size",
)

replace_once(
    'if (isMulti) baseSize = density === "micro" ? 14 : density === "ultra" ? 18 : density === "dense" ? 24 : density === "compact" ? 27 : 31;',
    'if (isMulti) baseSize = density === "micro" ? 19 : density === "ultra" ? 22 : density === "dense" ? 24 : density === "compact" ? 27 : 31;',
    "price base size",
)

replace_once(
    'const hiddenNameBoost = settings.nameDisplay === "hide" ? (isMulti ? (density === "micro" ? 1.06 : density === "ultra" ? 1.12 : density === "dense" ? 1.22 : density === "compact" ? 1.28 : 1.34) : 1.4) : 1;',
    'const hiddenNameBoost = settings.nameDisplay === "hide" ? (isMulti ? (density === "micro" ? 1.16 : density === "ultra" ? 1.18 : density === "dense" ? 1.22 : density === "compact" ? 1.28 : 1.34) : 1.4) : 1;',
    "hidden name price boost",
)

replace_once(
    'const gap = density === "micro" ? 5 : density === "ultra" ? 8 : density === "dense" ? 12 : density === "compact" ? 14 : 18;\n        const totalColumnGap = Math.max(0, columns - 1) * gap;\n        return { columns, rows, density, gap, rowGap: gap, cardWidth: `calc((100% - ${totalColumnGap}px) / ${columns})` };',
    'const gap = density === "micro" ? 10 : density === "ultra" ? 11 : density === "dense" ? 12 : density === "compact" ? 14 : 18;\n        const rowGap = density === "micro" ? 7 : density === "ultra" ? 9 : gap;\n        const totalColumnGap = Math.max(0, columns - 1) * gap;\n        return { columns, rows, density, gap, rowGap, cardWidth: `calc((100% - ${totalColumnGap}px) / ${columns})` };',
    "high density gaps",
)

polish_css = r'''
        /* ===== 単品告知：高密度レイアウト ブラッシュアップ ===== */
        .single-ad.is-multi[data-density="ultra"] .single-ad-products,
        .single-ad.is-multi[data-density="micro"] .single-ad-products {
            align-content: stretch;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-products-row,
        .single-ad.is-multi[data-density="micro"] .single-ad-products-row {
            justify-content: center;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card {
            padding: 1px 2px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-image-stage {
            width: calc(100% - 8px);
            margin-inline: auto;
            padding: 0 4px 2px !important;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-product-image,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-product-image {
            filter: drop-shadow(0 6px 7px rgba(0,0,0,.26));
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-info {
            width: calc(100% - 8px);
            margin-left: auto;
            margin-right: auto;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 950;
            font-variant-numeric: tabular-nums;
            line-height: 1;
            letter-spacing: -.045em;
            text-shadow: 0 2px 2px rgba(0,0,0,.28);
        }

        .single-ad.is-multi[data-density="ultra"] {
            padding: 24px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-header {
            min-height: 56px;
            padding-bottom: 6px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-logo-box {
            width: 205px;
            height: 54px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-logo {
            max-height: 52px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-heading {
            margin-top: 7px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-products {
            margin-top: 10px;
            padding: 1px 4px 2px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-info {
            margin-top: 5px;
            padding: 4px 5px 5px;
            border-width: 2px !important;
            border-radius: 8px;
            box-shadow: 0 3px 0 rgba(0,0,0,.18) !important;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price {
            min-height: 39px;
            margin-top: 3px;
            padding: 4px 5px;
            border-width: 2px;
            border-radius: 7px;
            box-shadow: 0 3px 0 rgba(0,0,0,.22);
        }

        .single-ad.is-multi[data-density="micro"] {
            padding: 18px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-header {
            min-height: 48px;
            padding-bottom: 4px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-logo-box {
            width: 174px;
            height: 47px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-logo {
            max-height: 45px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-date {
            font-size: 10px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-heading {
            margin-top: 5px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-products {
            margin-top: 8px;
            padding: 0 4px 2px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-info {
            margin-top: 4px;
            padding: 3px 4px 4px;
            border-width: 2px !important;
            border-radius: 7px;
            box-shadow: 0 3px 0 rgba(0,0,0,.17) !important;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price {
            min-height: 38px;
            margin-top: 2px;
            padding: 4px 4px;
            border-width: 2px;
            border-radius: 7px;
            box-shadow: 0 3px 0 rgba(0,0,0,.22);
        }

        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-info {
            width: calc(100% - 10px);
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
        }

        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-price {
            min-height: 45px;
            margin-top: 4px;
            padding: 5px 6px;
            border-width: 2px;
        }

        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-price {
            min-height: 43px;
            margin-top: 3px;
            padding: 5px 5px;
            border-width: 2px;
        }

        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-price.is-dual,
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-price.is-dual {
            min-height: 50px;
        }
'''

close_style = "    </style>\n</head>"
if text.count(close_style) != 1:
    raise SystemExit(f"closing style: expected 1 match, got {text.count(close_style)}")
text = text.replace(close_style, polish_css + "\n    </style>\n</head>", 1)

required = [
    "単品告知：高密度レイアウト ブラッシュアップ",
    'density === "micro" ? 19 : density === "ultra" ? 22',
    'density === "micro" ? 10 : density === "ultra" ? 11',
    'const rowGap = density === "micro" ? 7',
    "min-height: 43px;",
]
for needle in required:
    if needle not in text:
        raise SystemExit(f"missing validation marker: {needle}")

path.write_text(text, encoding="utf-8")
