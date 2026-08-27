from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, got {count}")
    text = text.replace(old, new, 1)


# 13〜30商品の見出しを、商品数が多くても主役として見えるサイズへ。
replace_once(
    'if (isMulti) baseSize = density === "micro" ? 28 : density === "ultra" ? 32 : density === "dense" ? 34 : density === "compact" ? 38 : 42;',
    'if (isMulti) baseSize = density === "micro" ? 38 : density === "ultra" ? 36 : density === "dense" ? 34 : density === "compact" ? 38 : 42;',
    "headline size",
)

css = r'''
        /* ===== 単品告知：6列時のヘッダー・外周余白調整 ===== */
        .single-ad.is-multi[data-density="ultra"] {
            padding: 30px 32px 30px;
        }

        .single-ad.is-multi[data-density="micro"] {
            padding: 32px 34px 32px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-header {
            min-height: 64px;
            padding-bottom: 7px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-header {
            min-height: 70px;
            padding-bottom: 8px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-logo-box {
            width: 232px;
            height: 62px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-logo-box {
            width: 248px;
            height: 66px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-logo {
            max-height: 60px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-logo {
            max-height: 64px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-date {
            font-size: 11px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-heading {
            margin-top: 9px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-heading {
            margin-top: 9px;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-products {
            margin-top: 13px;
            padding: 0 5px 3px;
        }

        .single-ad.is-multi[data-density="micro"] .single-ad-products {
            margin-top: 14px;
            padding: 0 5px 3px;
        }
'''

close_style = "    </style>\n</head>"
if text.count(close_style) != 1:
    raise SystemExit(f"closing style: expected 1 match, got {text.count(close_style)}")
text = text.replace(close_style, css + "\n    </style>\n</head>", 1)

required = [
    'density === "micro" ? 38 : density === "ultra" ? 36',
    "単品告知：6列時のヘッダー・外周余白調整",
    "padding: 32px 34px 32px;",
    "width: 248px;",
    "max-height: 64px;",
    "margin-top: 14px;",
]
for item in required:
    if item not in text:
        raise SystemExit(f"missing validation marker: {item}")

path.write_text(text, encoding="utf-8")
