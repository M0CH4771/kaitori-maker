from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')

style_id = 'single-portrait-tight-product-stack'
if style_id in text:
    raise SystemExit('style already exists')

style = r'''
    <style id="single-portrait-tight-product-stack">
        /* 単品告知：縦長の低枚数はカード画像の直下に価格を置く */
        .single-ad.single-portrait:not(.is-multi) .single-ad-product {
            gap: 0 !important;
        }

        .single-ad.single-portrait:not(.is-multi) .single-ad-image-stage {
            align-items: flex-end !important;
            padding-bottom: 0 !important;
        }

        .single-ad.is-multi.single-portrait[data-density="comfortable"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi.single-portrait[data-density="compact"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi.single-portrait[data-density="dense"] .single-ad-product-card .single-ad-image-stage {
            align-items: flex-end !important;
            padding-bottom: 0 !important;
        }

        .single-ad.is-multi.single-portrait[data-density="comfortable"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi.single-portrait[data-density="compact"] .single-ad-product-card .single-ad-info,
        .single-ad.is-multi.single-portrait[data-density="dense"] .single-ad-product-card .single-ad-info {
            margin-top: 0 !important;
        }

        .single-ad.is-multi.single-portrait.hide-card-name[data-density="comfortable"] .single-ad-product-card .single-ad-price,
        .single-ad.is-multi.single-portrait.hide-card-name[data-density="compact"] .single-ad-product-card .single-ad-price,
        .single-ad.is-multi.single-portrait.hide-card-name[data-density="dense"] .single-ad-product-card .single-ad-price {
            margin-top: 0 !important;
        }
    </style>
'''

marker = '</head>'
if text.count(marker) != 1:
    raise SystemExit(f'head marker count={text.count(marker)}')
text = text.replace(marker, style + marker, 1)
path.write_text(text, encoding='utf-8')
print('tightened portrait low-count image/price stack')
