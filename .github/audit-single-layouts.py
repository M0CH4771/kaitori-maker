from pathlib import Path
import json
import time
from playwright.sync_api import sync_playwright

ROOT = Path.cwd()
OUT = ROOT / "layout-audit.json"

SIZES = ["portrait", "square", "landscape"]
DESIGNS = ["cyber", "blackgold"]
SCENARIOS = [
    {"name":"common", "cardName":"hide", "grade":"hide", "dual":False},
    {"name":"stress", "cardName":"show", "grade":"show", "dual":True},
]

CARD_SVG = "data:image/svg+xml;charset=utf-8," + __import__('urllib.parse').parse.quote('''<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880" viewBox="0 0 630 880"><rect width="630" height="880" rx="22" fill="#d8d8d8"/><rect x="18" y="18" width="594" height="844" rx="15" fill="#fafafa" stroke="#333" stroke-width="8"/><rect x="45" y="85" width="540" height="470" fill="#8cc8ff"/><text x="315" y="650" text-anchor="middle" font-size="72" font-family="sans-serif" font-weight="700">CARD</text></svg>''')

JS_SETUP = r'''({count,size,design,scenario,img}) => {
    switchAppView('single');
    document.getElementById('singleSizeSelect').value = size;
    document.getElementById('singleDesignSelect').value = design;
    document.getElementById('singleItemsPerImageSelect').value = String(count);
    document.getElementById('singleCardNameDisplaySelect').value = scenario.cardName;
    document.getElementById('singleGradeDisplaySelect').value = scenario.grade;
    document.getElementById('singleHeadlineInput').value = '強化買取中！';
    document.getElementById('singlePriceLabelInput').value = '買取価格';

    globalCardData = Array.from({length:count}, (_,i) => ({
        id:i+1,
        originalIndex:i,
        name:'テストカード商品名 ' + String(i+1).padStart(2,'0') + ' 【SAR】{123/456}[TEST]',
        type:'SAR',
        group:'テスト',
        status:'強化',
        price:String(123400 + i * 100),
        aMinusPrice:scenario.dual ? String(112300 + i * 100) : '',
        imgUrl:'',
        resolvedImg:img,
        productId:'TEST-' + i,
        hidden:false
    }));
    selectedSingleCardIds.clear();
    singleSelectionOrder = [];
    globalCardData.forEach(c => selectedSingleCardIds.add(c.id));
    renderSingleAdPreviews();
}'''

JS_MEASURE = r'''() => {
    const areas = Array.from(document.querySelectorAll('#singlePreviewContainer .single-ad'));
    const tol = 3;
    const rectObj = r => ({left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height});
    const outside = (parent, child) => {
        if (!parent || !child) return false;
        const p = parent.getBoundingClientRect();
        const c = child.getBoundingClientRect();
        return c.left < p.left - tol || c.top < p.top - tol || c.right > p.right + tol || c.bottom > p.bottom + tol;
    };
    return areas.map((area, idx) => {
        const issues = typeof getSingleAdLayoutIssues === 'function' ? getSingleAdLayoutIssues(area) : [];
        const extra = [];
        const selectors = ['.single-ad-header','.single-ad-heading','.single-ad-products','.single-ad-products-row','.single-ad-product-card','.single-ad-image-stage','.single-ad-info','.single-ad-price'];
        selectors.forEach(sel => {
            area.querySelectorAll(sel).forEach((el,i) => {
                if (outside(area, el)) extra.push(`${sel}[${i}] outside area`);
            });
        });
        area.querySelectorAll('.single-ad-products-row').forEach((row,ri) => {
            row.querySelectorAll('.single-ad-product-card').forEach((card,ci) => {
                if (outside(row,card)) extra.push(`row${ri+1}/card${ci+1} outside row`);
            });
        });
        const products = area.querySelector('.single-ad-products');
        const cards = Array.from(area.querySelectorAll('.single-ad-product-card'));
        const imgs = Array.from(area.querySelectorAll('.single-ad-product-image'));
        const prices = Array.from(area.querySelectorAll('.single-ad-price'));
        const ar = area.getBoundingClientRect();
        return {
            index:idx,
            issues:[...new Set([...issues,...extra])],
            area:rectObj(ar),
            scrollOverflow: area.scrollWidth > area.clientWidth + 2 || area.scrollHeight > area.clientHeight + 2,
            products: products ? rectObj(products.getBoundingClientRect()) : null,
            cards: cards.map(x=>rectObj(x.getBoundingClientRect())),
            images: imgs.map(x=>rectObj(x.getBoundingClientRect())),
            prices: prices.map(x=>rectObj(x.getBoundingClientRect())),
            density: area.dataset.density || '',
            sizeClass: Array.from(area.classList).find(x=>x.startsWith('single-')) || ''
        };
    });
}'''

results=[]
failures=[]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={"width":1900,"height":1400}, device_scale_factor=1)
    page.goto('http://127.0.0.1:8765/index.html', wait_until='domcontentloaded', timeout=60000)
    page.wait_for_function("typeof renderSingleAdPreviews === 'function' && typeof getSingleAdLayoutIssues === 'function'", timeout=60000)
    page.evaluate("() => { window.alert=()=>{}; window.confirm=()=>true; }")

    for design in DESIGNS:
        for scenario in SCENARIOS:
            for size in SIZES:
                for count in range(1,31):
                    payload={"count":count,"size":size,"design":design,"scenario":scenario,"img":CARD_SVG}
                    page.evaluate(JS_SETUP, payload)
                    page.wait_for_timeout(60)
                    try:
                        page.evaluate("() => Promise.all(Array.from(document.querySelectorAll('#singlePreviewContainer img')).map(img => img.decode ? img.decode().catch(()=>{}) : Promise.resolve()))")
                    except Exception:
                        pass
                    page.wait_for_timeout(20)
                    measured=page.evaluate(JS_MEASURE)
                    record={"design":design,"scenario":scenario['name'],"size":size,"count":count,"areas":measured}
                    bad=[]
                    for area in measured:
                        if area['issues'] or area['scrollOverflow']:
                            bad.append({"issues":area['issues'],"scrollOverflow":area['scrollOverflow'],"density":area['density']})
                    if bad:
                        record['bad']=bad
                        failures.append(record)
                    results.append(record)

    browser.close()

summary={
    "tested":len(results),
    "failed":len(failures),
    "failures":[{"design":x['design'],"scenario":x['scenario'],"size":x['size'],"count":x['count'],"bad":x['bad']} for x in failures]
}
OUT.write_text(json.dumps({"summary":summary,"results":results},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
if failures:
    raise SystemExit(2)
