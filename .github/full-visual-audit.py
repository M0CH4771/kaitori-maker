from pathlib import Path
import json
import math
import urllib.parse
from playwright.sync_api import sync_playwright
from PIL import Image, ImageOps, ImageDraw

ROOT = Path.cwd()
OUT = ROOT / "visual-audit"
SHOT = OUT / "shots"
OUT.mkdir(exist_ok=True)
SHOT.mkdir(exist_ok=True)

THEMES = [
    "signal", "trust", "market", "alert", "editorial",
    "wa", "cyber", "soft", "ticket", "scoreboard",
    "luxury", "fire", "royal", "clean", "neon",
    "sakura", "forest", "pop", "retro", "hologram",
    "mono", "ocean", "sunset", "mint", "lavender",
    "ice", "chocolate", "japan", "galaxy", "lime"
]
BUY_LAYOUTS = {
    "portrait_10x6": 60,
    "landscape_15x4": 60,
    "portrait_6x5": 30,
    "landscape_10x3": 30,
}
SINGLE_DESIGNS = [
    "blackgold", "redimpact", "royal", "clean", "cyber",
    "sakura", "retro", "pop", "emerald", "mono"
]
SINGLE_SIZES = ["portrait", "square", "landscape"]
SINGLE_COUNTS = [1, 2, 4, 6, 12, 22, 30]

svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880" viewBox="0 0 630 880">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe47a"/><stop offset=".5" stop-color="#53b8ff"/><stop offset="1" stop-color="#7b4dff"/></linearGradient></defs>
<rect width="630" height="880" rx="24" fill="#e9eef7"/><rect x="16" y="16" width="598" height="848" rx="18" fill="#fff" stroke="#222" stroke-width="8"/>
<rect x="42" y="78" width="546" height="480" rx="10" fill="url(#g)"/><circle cx="315" cy="318" r="150" fill="#fff" opacity=".34"/>
<text x="315" y="330" text-anchor="middle" font-size="84" font-family="Arial" font-weight="900" fill="#151515">CARD</text>
<text x="54" y="63" font-size="34" font-family="Arial" font-weight="900" fill="#222">TRAINER</text>
<text x="315" y="655" text-anchor="middle" font-size="46" font-family="Arial" font-weight="900" fill="#222">SAMPLE</text>
<text x="315" y="720" text-anchor="middle" font-size="28" font-family="Arial" fill="#555">123/456 SAR</text></svg>'''
CARD_IMG = "data:image/svg+xml;charset=utf-8," + urllib.parse.quote(svg)

JS_BUY_SETUP = r'''({count,theme,layout,cardName,dual,img}) => {
    switchAppView('buylist');
    document.getElementById('themeSelect').value = theme;
    document.getElementById('layoutSelect').value = layout;
    document.getElementById('cardNameDisplaySelect').value = cardName;
    document.getElementById('titleInput').value = 'PSA10 高価買取';
    document.getElementById('dateInput').value = '2026-09-03';
    document.getElementById('disclaimerInput').value = '※相場や在庫状況、状態等により価格が変動する場合がございます。\n※上限到達時は減額または返却となります。';
    globalCardData = Array.from({length:count}, (_,i) => ({
        id:i+1,
        originalIndex:i,
        name:'サンプルカード ' + String(i+1).padStart(2,'0') + ' 【SAR】{123/456}[TEST]',
        type: i % 4 === 0 ? 'SAR' : (i % 4 === 1 ? 'AR' : 'SR'),
        group: i < Math.ceil(count/2) ? '強化' : '掲載',
        status: i % 5 === 0 ? '超強化' : (i % 2 === 0 ? '強化' : '掲載'),
        price:String([300,350,700,1200,1800,2500,3100,6300,15000,24000,55000][i%11]),
        aMinusPrice: dual && i % 3 === 0 ? String([250,300,600,1000,1500,2200,2800,5800,13000,22000,50000][i%11]) : '',
        imgUrl:'', resolvedImg:img, productId:'TEST-'+i, hidden:false,
        priceChangeType: i % 7 === 0 ? 'up' : 'same', priceDelta: i % 7 === 0 ? 500 : 0,
        previousPrice: i % 7 === 0 ? 1000 : 0, previousPriceDate:'2026-09-02'
    }));
    if (typeof computeOfficialPriceDifferences === 'function') {
        try { computeOfficialPriceDifferences(globalCardData, {autoSelect:false}); } catch(e) {}
    }
    renderPages();
}'''

JS_SINGLE_SETUP = r'''({count,size,design,cardName,grade,dual,img}) => {
    switchAppView('single');
    document.getElementById('singleSizeSelect').value = size;
    document.getElementById('singleDesignSelect').value = design;
    document.getElementById('singleItemsPerImageSelect').value = String(count);
    document.getElementById('singleCardNameDisplaySelect').value = cardName;
    document.getElementById('singleGradeDisplaySelect').value = grade;
    document.getElementById('singleHeadlineInput').value = '強化買取中！';
    document.getElementById('singlePriceLabelInput').value = '買取価格';
    globalCardData = Array.from({length:count}, (_,i) => ({
        id:i+1, originalIndex:i,
        name:'サンプルカード ' + String(i+1).padStart(2,'0') + ' 【SAR】{123/456}[TEST]',
        type:i%3===0?'SAR':(i%3===1?'AR':'SR'), group:'強化', status:'強化',
        price:String([300,350,700,1200,1800,2500,3100,6300,15000,24000,55000][i%11]),
        aMinusPrice:dual && i%3===0 ? String([250,300,600,1000,1500,2200,2800,5800,13000,22000,50000][i%11]) : '',
        imgUrl:'', resolvedImg:img, productId:'TEST-'+i, hidden:false,
        priceChangeType:i%7===0?'up':'same', priceDelta:i%7===0?500:0,
        previousPrice:i%7===0?1000:0, previousPriceDate:'2026-09-02'
    }));
    selectedSingleCardIds.clear();
    singleSelectionOrder = [];
    globalCardData.forEach(c => { selectedSingleCardIds.add(c.id); singleSelectionOrder.push(c.id); });
    renderSingleAdPreviews();
}'''

JS_MEASURE = r'''({kind}) => {
    const roots = kind === 'buy'
        ? Array.from(document.querySelectorAll('#pagesContainer .exportArea'))
        : Array.from(document.querySelectorAll('#singlePreviewContainer .single-ad'));
    const tol = 2;
    const out = [];
    const rect = el => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};
    };
    const outside = (root, el) => {
        const a=root.getBoundingClientRect(), b=el.getBoundingClientRect();
        return b.left<a.left-tol || b.top<a.top-tol || b.right>a.right+tol || b.bottom>a.bottom+tol;
    };
    for (const root of roots) {
        const rr = root.getBoundingClientRect();
        const issues=[];
        if (root.scrollWidth > root.clientWidth + 2 || root.scrollHeight > root.clientHeight + 2) issues.push('scroll-overflow');
        const selectors = kind === 'buy'
            ? ['.header-area','.cards-grid','.card','.card-item','.card-img-container','.card-price-stack','.card-price-row','.card-name','.footer-area','.disclaimer-area']
            : ['.single-ad-header','.single-ad-heading','.single-ad-products','.single-ad-products-row','.single-ad-product-card','.single-ad-image-stage','.single-ad-info','.single-ad-price'];
        selectors.forEach(sel => root.querySelectorAll(sel).forEach((el,i)=>{
            if (el.getBoundingClientRect().width && el.getBoundingClientRect().height && outside(root,el)) issues.push(`${sel}[${i}]-outside`);
        }));
        if (kind === 'single' && typeof getSingleAdLayoutIssues === 'function') {
            try { issues.push(...getSingleAdLayoutIssues(root)); } catch(e) {}
        }
        const imgs=Array.from(root.querySelectorAll('img')).filter(x=>x.getBoundingClientRect().width>1);
        const prices=Array.from(root.querySelectorAll(kind==='buy'?'.card-price-text':'.single-ad-price')).filter(x=>x.getBoundingClientRect().width>1);
        const textEls=Array.from(root.querySelectorAll(kind==='buy'?'.card-name,.card-price-text,.page-title,.title-text':'.single-ad-card-name,.single-ad-price,.single-ad-heading h2'));
        const clippedText=textEls.filter(el=>el.scrollWidth>el.clientWidth+2 || el.scrollHeight>el.clientHeight+2).length;
        const imageHeights=imgs.map(x=>x.getBoundingClientRect().height).filter(Boolean);
        const priceFonts=prices.map(x=>parseFloat(getComputedStyle(x).fontSize)||0).filter(Boolean);
        const header = root.querySelector(kind==='buy'?'.header-area':'.single-ad-header');
        const products = root.querySelector(kind==='buy'?'.cards-grid':'.single-ad-products');
        const margin = products ? Math.min(products.getBoundingClientRect().left-rr.left, rr.right-products.getBoundingClientRect().right, products.getBoundingClientRect().top-rr.top, rr.bottom-products.getBoundingClientRect().bottom) : null;
        out.push({
            issues:[...new Set(issues)], clippedText,
            root:rect(root), header:rect(header), products:rect(products),
            minImageH:imageHeights.length?Math.min(...imageHeights):0,
            maxImageH:imageHeights.length?Math.max(...imageHeights):0,
            avgImageH:imageHeights.length?imageHeights.reduce((a,b)=>a+b,0)/imageHeights.length:0,
            minPriceFont:priceFonts.length?Math.min(...priceFonts):0,
            maxPriceFont:priceFonts.length?Math.max(...priceFonts):0,
            innerMargin:margin
        });
    }
    return out;
}'''

def wait_images(page, selector):
    try:
        page.eval_on_selector_all(selector, "els => Promise.all(els.map(img => img.decode ? img.decode().catch(()=>{}) : Promise.resolve()))")
    except Exception:
        pass
    page.wait_for_timeout(30)


def make_sheet(items, output, cols, thumb_w=250, label_h=24):
    thumbs=[]
    for label, path in items:
        im=Image.open(path).convert('RGB')
        ratio=thumb_w/im.width
        th=max(1,int(im.height*ratio))
        im=im.resize((thumb_w,th),Image.Resampling.LANCZOS)
        canvas=Image.new('RGB',(thumb_w,th+label_h),'white')
        canvas.paste(im,(0,label_h))
        d=ImageDraw.Draw(canvas)
        d.text((5,5),label,fill='black')
        thumbs.append(canvas)
    rows=math.ceil(len(thumbs)/cols)
    cell_h=max(im.height for im in thumbs)
    sheet=Image.new('RGB',(cols*thumb_w,rows*cell_h),(230,230,230))
    for i,im in enumerate(thumbs):
        x=(i%cols)*thumb_w; y=(i//cols)*cell_h
        sheet.paste(im,(x,y))
    sheet.save(output,quality=90)

results={"buy":[],"single":[]}
contact={}

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={"width":2200,"height":1800},device_scale_factor=1)
    page.goto('http://127.0.0.1:8765/index.html',wait_until='domcontentloaded',timeout=60000)
    page.wait_for_function("typeof renderPages==='function' && typeof renderSingleAdPreviews==='function'",timeout=60000)
    page.evaluate("() => { window.alert=()=>{}; window.confirm=()=>true; }")
    try: page.evaluate("() => document.fonts.ready")
    except Exception: pass

    # Exhaustive geometry for buylist: 30 themes x 4 layouts x show/hide x standard/dual
    for theme in THEMES:
        for layout,count in BUY_LAYOUTS.items():
            for cardName in ['show','hide']:
                for dual in [False,True]:
                    page.evaluate(JS_BUY_SETUP,{"count":count,"theme":theme,"layout":layout,"cardName":cardName,"dual":dual,"img":CARD_IMG})
                    wait_images(page,'#pagesContainer img')
                    m=page.evaluate(JS_MEASURE,{"kind":"buy"})
                    results['buy'].append({"theme":theme,"layout":layout,"cardName":cardName,"dual":dual,"measure":m})

    # Buylist contact sheets, representative no-name/common mode
    for layout,count in BUY_LAYOUTS.items():
        items=[]
        for theme in THEMES:
            page.evaluate(JS_BUY_SETUP,{"count":count,"theme":theme,"layout":layout,"cardName":"hide","dual":False,"img":CARD_IMG})
            wait_images(page,'#pagesContainer img')
            target=page.locator('#pagesContainer .exportArea').first
            path=SHOT/f'buy-{layout}-{theme}.png'
            target.screenshot(path=str(path))
            items.append((theme,path))
        sheet=OUT/f'buy-{layout}-contact.jpg'
        make_sheet(items,sheet,5,220)
        contact[f'buy-{layout}']=str(sheet.relative_to(ROOT))

    # Exhaustive geometry single: 10 designs x 3 sizes x 1..30 x common/stress
    scenarios=[('common','hide','hide',False),('stress','show','show',True)]
    for design in SINGLE_DESIGNS:
        for size in SINGLE_SIZES:
            for count in range(1,31):
                for name,cardName,grade,dual in scenarios:
                    page.evaluate(JS_SINGLE_SETUP,{"count":count,"size":size,"design":design,"cardName":cardName,"grade":grade,"dual":dual,"img":CARD_IMG})
                    wait_images(page,'#singlePreviewContainer img')
                    m=page.evaluate(JS_MEASURE,{"kind":"single"})
                    results['single'].append({"design":design,"size":size,"count":count,"scenario":name,"measure":m})

    # Single contact sheets: each size, all 10 designs x representative counts
    for size in SINGLE_SIZES:
        items=[]
        for design in SINGLE_DESIGNS:
            for count in SINGLE_COUNTS:
                page.evaluate(JS_SINGLE_SETUP,{"count":count,"size":size,"design":design,"cardName":"hide","grade":"hide","dual":False,"img":CARD_IMG})
                wait_images(page,'#singlePreviewContainer img')
                target=page.locator('#singlePreviewContainer .single-ad').first
                path=SHOT/f'single-{size}-{design}-{count}.png'
                target.screenshot(path=str(path))
                items.append((f'{design} / {count}',path))
        sheet=OUT/f'single-{size}-contact.jpg'
        make_sheet(items,sheet,7,190)
        contact[f'single-{size}']=str(sheet.relative_to(ROOT))

    browser.close()

# summarize hard failures and suspicious metrics
summary={"buy":{"tested":len(results['buy']),"failed":[],"suspicious":[]},"single":{"tested":len(results['single']),"failed":[],"suspicious":[]},"contactSheets":contact}
for rec in results['buy']:
    bad=[]
    susp=[]
    for m in rec['measure']:
        if m['issues'] or m['clippedText']: bad.append({"issues":m['issues'],"clippedText":m['clippedText']})
        if m['minPriceFont'] and m['minPriceFont'] < 9: susp.append('price-font-under-9')
        if m['header'] and m['root'] and m['header']['h']/m['root']['h'] > .22: susp.append('header-over-22pct')
    if bad: summary['buy']['failed'].append({k:rec[k] for k in ['theme','layout','cardName','dual']}|{"bad":bad})
    if susp: summary['buy']['suspicious'].append({k:rec[k] for k in ['theme','layout','cardName','dual']}|{"flags":sorted(set(susp))})
for rec in results['single']:
    bad=[]; susp=[]
    for m in rec['measure']:
        if m['issues'] or m['clippedText']: bad.append({"issues":m['issues'],"clippedText":m['clippedText']})
        if m['minPriceFont'] and m['minPriceFont'] < 9: susp.append('price-font-under-9')
        if m['header'] and m['root'] and m['header']['h']/m['root']['h'] > .20: susp.append('header-over-20pct')
    if bad: summary['single']['failed'].append({k:rec[k] for k in ['design','size','count','scenario']}|{"bad":bad})
    if susp: summary['single']['suspicious'].append({k:rec[k] for k in ['design','size','count','scenario']}|{"flags":sorted(set(susp))})

(OUT/'audit-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'audit-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({"buyTested":summary['buy']['tested'],"buyFailed":len(summary['buy']['failed']),"singleTested":summary['single']['tested'],"singleFailed":len(summary['single']['failed']),"contacts":contact},ensure_ascii=False,indent=2))
