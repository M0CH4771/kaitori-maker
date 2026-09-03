from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

pattern = re.compile(
    r'\n\s*<style id="single-portrait-tight-product-stack">.*?</style>',
    re.S,
)

replacement = r'''
    <style id="single-portrait-tight-product-stack">
        /* 単品告知：縦長の低枚数は画像を下げず、価格を画像直下へ持ち上げる */
        .single-ad.single-portrait:not(.is-multi) .single-ad-product {
            grid-template-rows: auto auto !important;
            align-content: center !important;
            gap: 0 !important;
        }

        .single-ad.single-portrait:not(.is-multi) .single-ad-image-stage {
            height: auto !important;
            min-height: 0 !important;
            align-items: center !important;
            padding-bottom: 0 !important;
        }

        .single-ad.single-portrait:not(.is-multi) .single-ad-info {
            margin-top: 0 !important;
        }

        .single-ad.is-multi.single-portrait[data-density="comfortable"] .single-ad-products-row,
        .single-ad.is-multi.single-portrait[data-density="compact"] .single-ad-products-row,
        .single-ad.is-multi.single-portrait[data-density="dense"] .single-ad-products-row {
            align-items: center !important;
        }

        .single-ad.is-multi.single-portrait[data-density="comfortable"] .single-ad-product-card,
        .single-ad.is-multi.single-portrait[data-density="compact"] .single-ad-product-card,
        .single-ad.is-multi.single-portrait[data-density="dense"] .single-ad-product-card {
            height: auto !important;
            align-self: center !important;
            grid-template-rows: auto auto !important;
        }

        .single-ad.is-multi.single-portrait[data-density="comfortable"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi.single-portrait[data-density="compact"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi.single-portrait[data-density="dense"] .single-ad-product-card .single-ad-image-stage {
            height: auto !important;
            min-height: 0 !important;
            align-items: center !important;
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
    </style>'''

text, count = pattern.subn(replacement, text, count=1)
if count != 1:
    raise SystemExit(f'portrait tight style replacement count={count}')

path.write_text(text, encoding='utf-8')
print('reworked portrait low-count stack: price moves up to image')
