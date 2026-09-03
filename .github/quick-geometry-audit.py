import json, urllib.parse
from playwright.sync_api import sync_playwright

THEMES=["signal","trust","market","alert","editorial","wa","cyber","soft","ticket","scoreboard","luxury","fire","royal","clean","neon","sakura","forest","pop","retro","hologram","mono","ocean","sunset","mint","lavender","ice","chocolate","japan","galaxy","lime"]
LAYOUTS={"portrait_10x6":60,"landscape_15x4":60,"portrait_6x5":30,"landscape_10x3":30}
DESIGNS=["blackgold","redimpact","royal","clean","cyber","sakura","retro","pop","emerald","mono"]
SIZES=["portrait","square","landscape"]
svg='<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880"><rect width="630" height="880" fill="#fff"/><rect x="20" y="20" width="590" height="840" fill="#87cefa" stroke="#111" stroke-width="8"/></svg>'
IMG='data:image/svg+xml;charset=utf-8,'+urllib.parse.quote(svg)

SET_DATA=r'''({count,img,dual})=>{globalCardData=Array.from({length:count},(_,i)=>({id:i+1,originalIndex:i,name:'テスト商品 '+i+' 【SAR】{123/456}[TEST]',type:'SAR',group:'強化',status:'強化',price:String(300+i*100),aMinusPrice:dual&&i%3===0?String(250+i*100):'',imgUrl:'',resolvedImg:img,productId:'T'+i,hidden:false}));selectedSingleCardIds.clear();singleSelectionOrder=[];globalCardData.forEach(c=>{selectedSingleCardIds.add(c.id);singleSelectionOrder.push(c.id);});}'''

CHECK_BUY=r'''()=>{const out=[];for(const p of document.querySelectorAll('#pagesContainer .exportArea')){const pr=p.getBoundingClientRect(),tol=3;const outside=e=>{const r=e.getBoundingClientRect();return r.left<pr.left-tol||r.top<pr.top-tol||r.right>pr.right+tol||r.bottom>pr.bottom+tol};const issues=[];if(p.scrollWidth>p.clientWidth+2||p.scrollHeight>p.clientHeight+2)issues.push('scroll');p.querySelectorAll('.header-area,.card-grid,.card-item,.footer-area').forEach((e,i)=>{if(e.getBoundingClientRect().width&&outside(e))issues.push(e.className+' outside')});out.push([...new Set(issues)])}return out}'''
CHECK_SINGLE=r'''()=>[...document.querySelectorAll('#singlePreviewContainer .single-ad')].map(a=>typeof getSingleAdLayoutIssues==='function'?getSingleAdLayoutIssues(a):[])'''

fails=[]
with sync_playwright() as p:
  b=p.chromium.launch(headless=True,args=['--no-sandbox']); page=b.new_page(viewport={'width':2200,'height':1800})
  page.goto('http://127.0.0.1:8765/index.html',wait_until='domcontentloaded',timeout=60000)
  page.wait_for_function("typeof renderPages==='function'&&typeof renderSingleAdPreviews==='function'",timeout=60000)
  page.evaluate("()=>{window.alert=()=>{};window.confirm=()=>true}")
  for theme in THEMES:
    for layout,count in LAYOUTS.items():
      for names in ['show','hide']:
        for dual in [False,True]:
          page.evaluate(SET_DATA,{'count':count,'img':IMG,'dual':dual});page.select_option('#themeSelect',theme);page.select_option('#layoutSelect',layout);page.select_option('#cardNameDisplaySelect',names);page.evaluate('renderPages()');page.wait_for_timeout(12)
          issues=page.evaluate(CHECK_BUY)
          if any(issues):fails.append({'kind':'buy','theme':theme,'layout':layout,'names':names,'dual':dual,'issues':issues})
  for design in DESIGNS:
    for size in SIZES:
      for count in range(1,31):
        for scenario in ['common','stress']:
          dual=scenario=='stress';page.evaluate(SET_DATA,{'count':count,'img':IMG,'dual':dual});page.select_option('#singleDesignSelect',design);page.select_option('#singleSizeSelect',size);page.select_option('#singleItemsPerImageSelect',str(count));page.select_option('#singleCardNameDisplaySelect','show' if dual else 'hide');page.select_option('#singleGradeDisplaySelect','show' if dual else 'hide');page.evaluate('renderSingleAdPreviews()');page.wait_for_timeout(12)
          issues=page.evaluate(CHECK_SINGLE)
          if any(issues):fails.append({'kind':'single','design':design,'size':size,'count':count,'scenario':scenario,'issues':issues})
  b.close()
print(json.dumps({'tested':480+1800,'failures':len(fails),'samples':fails[:30]},ensure_ascii=False,indent=2))
if fails: raise SystemExit(2)
