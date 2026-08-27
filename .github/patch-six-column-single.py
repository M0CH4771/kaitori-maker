from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")

# 11〜30商品は6列固定。既存の1〜10商品レイアウトはそのまま残す。
needle = '''        const density = safeCount >= 21 ? "micro" : safeCount >= 13 ? "ultra" : safeCount >= 9 ? "dense" : safeCount >= 7 || (normalizedSize === "landscape" && safeCount >= 4) ? "compact" : "comfortable";'''
if text.count(needle) != 1:
    raise SystemExit(f"density marker: expected 1 match, got {text.count(needle)}")
text = text.replace(
    needle,
    '''        if (safeCount >= 11) {
            columns = 6;
            rows = Math.ceil(safeCount / 6);
        }
        const density = safeCount >= 21 ? "micro" : safeCount >= 13 ? "ultra" : safeCount >= 9 ? "dense" : safeCount >= 7 || (normalizedSize === "landscape" && safeCount >= 4) ? "compact" : "comfortable";''',
    1,
)

css = r'''
        /* ===== 単品告知：11〜30商品 6列・画像優先 ===== */
        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-image-stage {
            width: 100% !important;
            margin-inline: auto;
            padding: 0 1px 2px !important;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-info {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price {
            width: 86%;
            margin-left: auto;
            margin-right: auto;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-price.is-dual,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-price.is-dual {
            width: 94%;
        }

        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-info {
            width: 100%;
        }

        .single-ad.is-multi.hide-card-name[data-density="ultra"] .single-ad-product-card .single-ad-price,
        .single-ad.is-multi.hide-card-name[data-density="micro"] .single-ad-product-card .single-ad-price {
            width: 86%;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card {
            padding-left: 0;
            padding-right: 0;
        }
'''

close_style = "    </style>\n</head>"
if text.count(close_style) != 1:
    raise SystemExit(f"closing style: expected 1 match, got {text.count(close_style)}")
text = text.replace(close_style, css + "\n    </style>\n</head>", 1)

required = [
    "columns = 6;",
    "rows = Math.ceil(safeCount / 6);",
    "単品告知：11〜30商品 6列・画像優先",
    "width: 86%;",
]
for item in required:
    if item not in text:
        raise SystemExit(f"missing validation marker: {item}")

path.write_text(text, encoding="utf-8")
