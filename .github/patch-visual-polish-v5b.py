from pathlib import Path
import runpy

# Apply the main polish first.
runpy.run_path('.github/patch-visual-polish-v5.py', run_name='__main__')

path = Path('index.html')
text = path.read_text(encoding='utf-8')
style = r'''
    <style id="visual-polish-v5b-safety">
        /* 2〜4商品の縦長は、上方向移動すると見出しへ接触するため位置を維持する。 */
        .single-ad.single-portrait.is-multi:is(
            [data-count="2"], [data-count="3"], [data-count="4"]
        ) .single-ad-products {
            transform: none !important;
        }
    </style>
'''
marker='</head>'
if text.count(marker) != 1:
    raise SystemExit('unexpected head marker count')
text=text.replace(marker, style+marker, 1)
path.write_text(text, encoding='utf-8')
print('applied visual polish v5b safety override')
