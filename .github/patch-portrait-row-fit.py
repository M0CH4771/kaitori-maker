from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')
style_id = 'single-portrait-row-fit-fix'
if style_id in text:
    raise SystemExit('style already exists')

style = r'''
    <style id="single-portrait-row-fit-fix">
        /*
         * 縦長4〜12商品付近の複数行レイアウト：
         * 商品カードを行高へ収め、画像は価格の直上へ寄せる。
         * 1行だけの2〜3商品は従来の中央寄せを維持する。
         */
        .single-ad.single-portrait.is-multi:is(
            [data-density="comfortable"],
            [data-density="compact"],
            [data-density="dense"]
        ) .single-ad-products:has(.single-ad-products-row:nth-child(2)) .single-ad-products-row {
            align-items: stretch !important;
        }

        .single-ad.single-portrait.is-multi:is(
            [data-density="comfortable"],
            [data-density="compact"],
            [data-density="dense"]
        ) .single-ad-products:has(.single-ad-products-row:nth-child(2)) .single-ad-product-card {
            height: auto !important;
            min-height: 0 !important;
            align-self: stretch !important;
            grid-template-rows: minmax(0, 1fr) auto !important;
        }

        .single-ad.single-portrait.is-multi:is(
            [data-density="comfortable"],
            [data-density="compact"],
            [data-density="dense"]
        ) .single-ad-products:has(.single-ad-products-row:nth-child(2)) .single-ad-product-card .single-ad-image-stage {
            height: 100% !important;
            min-height: 0 !important;
            align-items: flex-end !important;
            padding-bottom: 0 !important;
        }

        .single-ad.single-portrait.is-multi:is(
            [data-density="comfortable"],
            [data-density="compact"],
            [data-density="dense"]
        ) .single-ad-products:has(.single-ad-products-row:nth-child(2)) .single-ad-product-card .single-ad-info,
        .single-ad.single-portrait.is-multi.hide-card-name:is(
            [data-density="comfortable"],
            [data-density="compact"],
            [data-density="dense"]
        ) .single-ad-products:has(.single-ad-products-row:nth-child(2)) .single-ad-product-card .single-ad-price {
            margin-top: 0 !important;
        }
    </style>
'''

marker='</head>'
if text.count(marker) != 1:
    raise SystemExit('unexpected head marker count')
text=text.replace(marker, style+marker, 1)
path.write_text(text, encoding='utf-8')
print('added portrait multi-row fit fix')
