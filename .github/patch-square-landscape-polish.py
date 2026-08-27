from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")

css = r'''
        /* ===== 単品告知：正方形・横長を縦長の完成形へ揃える ===== */
        .single-ad.single-square.is-multi[data-density="ultra"] {
            padding: 36px 40px 36px;
        }

        .single-ad.single-square.is-multi[data-density="micro"] {
            padding: 38px 42px 38px;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-header,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-header {
            min-height: 72px;
            padding-bottom: 8px;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-logo-box,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-logo-box {
            width: 262px;
            height: 70px;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-logo,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-logo {
            max-height: 68px;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-heading h2,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-heading h2 {
            font-size: calc(var(--single-headline-size) * 1.12) !important;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-heading,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-heading {
            margin-top: 10px;
        }

        .single-ad.single-square.is-multi[data-density="ultra"] .single-ad-products,
        .single-ad.single-square.is-multi[data-density="micro"] .single-ad-products {
            margin-top: 15px;
            padding: 0 7px 4px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"],
        .single-ad.single-landscape.is-multi[data-density="micro"] {
            padding: 30px 56px 32px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-header,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-header {
            min-height: 66px;
            padding-bottom: 7px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-logo-box,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-logo-box {
            width: 284px;
            height: 66px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-logo,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-logo {
            max-height: 64px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-date,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-date {
            font-size: 11px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-heading h2,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-heading h2 {
            font-size: calc(var(--single-headline-size) * 1.28) !important;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-heading,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-heading {
            margin-top: 7px;
        }

        .single-ad.single-landscape.is-multi[data-density="ultra"] .single-ad-products,
        .single-ad.single-landscape.is-multi[data-density="micro"] .single-ad-products {
            margin-top: 11px;
            padding: 0 9px 3px;
        }
'''

close_style = "    </style>\n</head>"
if text.count(close_style) != 1:
    raise SystemExit(f"closing style: expected 1 match, got {text.count(close_style)}")

text = text.replace(close_style, css + "\n    </style>\n</head>", 1)

required = [
    "単品告知：正方形・横長を縦長の完成形へ揃える",
    ".single-ad.single-square.is-multi[data-density=\"micro\"]",
    ".single-ad.single-landscape.is-multi[data-density=\"micro\"]",
    "calc(var(--single-headline-size) * 1.12)",
    "calc(var(--single-headline-size) * 1.28)",
    "padding: 30px 56px 32px;",
]
for item in required:
    if item not in text:
        raise SystemExit(f"missing validation marker: {item}")

path.write_text(text, encoding="utf-8")
