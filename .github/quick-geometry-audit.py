import json, urllib.parse
from playwright.sync_api import sync_playwright

THEMES=["signal","trust","market","alert","editorial","wa","cyber","soft","ticket","scoreboard","luxury","fire","royal","clean","neon","sakura","forest","pop","retro","hologram","mono","ocean","sunset","mint","lavender","ice","chocolate","japan","galaxy","lime"]
LAYOUTS={"portrait_10x6":60,"landscape_15x4":60,"portrait_6x5":30,"landscape_10x3":30}
DESIGNS=["blackgold","redimpact","royal","clean","cyber","sakura","retro","pop","emerald","mono"]
SIZES=["portrait","square","landscape"]
CSV_PROFILE={"rows":640,"max_name_len":39,"max_price":130000,"super_boost":22,"five_digit_plus":51}

svg='<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880"><rect width="630" height="880" fill="#fff"/><rect x="20" y="20" width="590" height="840" fill="#87cefa" stroke="#111" stroke-width="8"/></svg>'
IMG='data:image/svg+xml;charset=utf-8,'+urllib.parse.quote(svg)

JS_BUY_SETUP=r'''({count,theme,layout,cardName,dual,img})=>{
  switchAppView('buylist');
  document.getElementById('themeSelect').value=theme;
  document.getElementById('layoutSelect').value=layout;
  document.getElementById('cardNameDisplaySelect').value=cardName;
  document.getElementById('titleInput').value='PSA10 高価買取';
  document.getElementById('dateInput').value='2026-09-03';
  globalCardData=Array.from({length:count},(_,i)=>({
    id:i+1,originalIndex:i,
    name:i%6===0?'超強化テストカード商品名ABCDEFGHIJKLMN 【SAR】{123/456}[TEST]'.slice(0,39):'実CSV相当商品名テスト '+String(i+1).padStart(2,'0')+' 【SAR】{123/456}[TEST]',
    type:i%5===0?'SAR':(i%3===0?'SR':'AR'),
    group:i%7===0?'超強化':'掲載',status:i%7===0?'超強化':'掲載',
    price:String(i%11===0?130000:(i%5===0?15000:1000+i*100)),
    aMinusPrice:dual&&i%3===0?String(Math.max(100,12000+i*100)):'',
    imgUrl:'',resolvedImg:img,productId:'CSV-'+i,hidden:false,
    priceChangeType:i%9===0?'up':'same',priceDelta:i%9===0?500:0,
    previousPrice:i%9===0?1000:0,previousPriceDate:'2026-09-02'
  }));
  renderPages();
}'''

JS_SINGLE_SETUP=r'''({count,size,design,dual,img})=>{
  switchAppView('single');
  document.getElementById('singleSizeSelect').value=size;
  document.getElementById('singleDesignSelect').value=design;
  document.getElementById('singleItemsPerImageSelect').value=String(count);
  document.getElementById('singleCardNameDisplaySelect').value=dual?'show':'hide';
  document.getElementById('singleGradeDisplaySelect').value=dual?'show':'hide';
  document.getElementById('singleHeadlineInput').value=dual?'超強化買取中！':'強化買取中！';
  globalCardData=Array.from({length:count},(_,i)=>({
    id:i+1,originalIndex:i,
    name:dual&&i%4===0?'超強化テストカード商品名ABCDEFGHIJKLMN 【SAR】{123/456}[TEST]'.slice(0,39):'実CSV相当商品名テスト '+String(i+1).padStart(2,'0')+' 【SAR】{123/456}[TEST]',
    type:i%5===0?'SAR':(i%3===0?'SR':'AR'),
    group:dual&&i%7===0?'超強化':'強化',status:dual&&i%7===0?'超強化':'掲載',
    price:String(dual?(i%9===0?130000:(i%4===0?15000:1000+i*100)):(300+i*100)),
    aMinusPrice:dual&&i%3===0?String(Math.max(100,12000+i*100)):'',
    imgUrl:'',resolvedImg:img,productId:'CSV-'+i,hidden:false,
    priceChangeType:i%9===0?'up':'same',priceDelta:i%9===0?500:0,
    previousPrice:i%9===0?1000:0,previousPriceDate:'2026-09-02'
  }));
  selectedSingleCardIds.clear();singleSelectionOrder=[];
  globalCardData.forEach(c=>{selectedSingleCardIds.add(c.id);singleSelectionOrder.push(c.id);});
  renderSingleAdPreviews();
}'''

CHECK_BUY=r'''()=>{const out=[];for(const p of document.querySelectorAll('#pagesContainer .exportArea')){const pr=p.getBoundingClientRect(),tol=3;const outside=e=>{const r=e.getBoundingClientRect();return r.left<pr.left-tol||r.top<pr.top-tol||r.right>pr.right+tol||r.bottom>pr.bottom+tol};const issues=[];if(p.scrollWidth>p.clientWidth+2||p.scrollHeight>p.clientHeight+2)issues.push('scroll');p.querySelectorAll('.header-area,.card-grid,.card-item,.footer-area').forEach(e=>{if(e.getBoundingClientRect().width&&outside(e))issues.push(e.className+' outside')});out.push([...new Set(issues)])}return out}'''
CHECK_SINGLE=r'''()=>[...document.querySelectorAll('#singlePreviewContainer .single-ad')].map(a=>typeof getSingleAdLayoutIssues==='function'?getSingleAdLayoutIssues(a):[])'''

fails=[]
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
  page=browser.new_page(viewport={'width':2200,'height':1800})
  page.goto('http://127.0.0.1:8765/index.html',wait_until='domcontentloaded',timeout=60000)
  page.wait_for_function("typeof renderPages==='function'&&typeof renderSingleAdPreviews==='function'&&typeof switchAppView==='function'",timeout=60000)
  page.evaluate("()=>{window.alert=()=>{};window.confirm=()=>true}")
  page.wait_for_timeout(500)

  for theme in THEMES:
    for layout,count in LAYOUTS.items():
      for names in ['show','hide']:
        for dual in [False,True]:
          page.evaluate(JS_BUY_SETUP,{'count':count,'theme':theme,'layout':layout,'cardName':names,'dual':dual,'img':IMG})
          page.wait_for_timeout(15)
          issues=page.evaluate(CHECK_BUY)
          if any(issues):
            fails.append({'kind':'buy','theme':theme,'layout':layout,'names':names,'dual':dual,'issues':issues})

  for design in DESIGNS:
    for size in SIZES:
      for count in range(1,31):
        for scenario in ['common','stress']:
          dual=scenario=='stress'
          page.evaluate(JS_SINGLE_SETUP,{'count':count,'size':size,'design':design,'dual':dual,'img':IMG})
          page.wait_for_timeout(15)
          issues=page.evaluate(CHECK_SINGLE)
          if any(issues):
            fails.append({'kind':'single','design':design,'size':size,'count':count,'scenario':scenario,'issues':issues})
  browser.close()

print(json.dumps({'tested':2280,'csvProfile':CSV_PROFILE,'failures':len(fails),'samples':fails[:50]},ensure_ascii=False,indent=2))
if fails:
  raise SystemExit(2)
