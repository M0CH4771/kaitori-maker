import json, urllib.parse
from playwright.sync_api import sync_playwright

SIZES=["portrait","square","landscape"]
COUNTS=list(range(1,31))
DESIGNS=["blackgold","cyber","mono"]

svgs = [
    (630, 880),
    (744, 1039),
    (1000, 700),
]

def data_url(w,h):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}"><rect width="{w}" height="{h}" fill="white"/><rect x="4" y="4" width="{w-8}" height="{h-8}" fill="#7cc4ff" stroke="#111" stroke-width="8"/></svg>'
    return 'data:image/svg+xml;charset=utf-8,' + urllib.parse.quote(svg)

SETUP=r'''({count,size,design,img})=>{
  switchAppView('single');
  document.getElementById('singleSizeSelect').value=size;
  document.getElementById('singleDesignSelect').value=design;
  document.getElementById('singleItemsPerImageSelect').value=String(count);
  document.getElementById('singleCardNameDisplaySelect').value='hide';
  document.getElementById('singleGradeDisplaySelect').value='hide';
  globalCardData=Array.from({length:count},(_,i)=>({
    id:i+1,originalIndex:i,name:'比率テスト '+i,type:'SAR',
    group:'掲載',status:'掲載',price:String(1000+i*100),
    aMinusPrice:'',imgUrl:'',resolvedImg:img,productId:'R'+i,hidden:false
  }));
  selectedSingleCardIds.clear();singleSelectionOrder=[];
  globalCardData.forEach(c=>{selectedSingleCardIds.add(c.id);singleSelectionOrder.push(c.id);});
  renderSingleAdPreviews();
}'''

MEASURE=r'''()=>{
 const failures=[];
 document.querySelectorAll('#singlePreviewContainer .single-ad').forEach((area,ai)=>{
   const geometry = typeof getSingleAdLayoutIssues==='function' ? getSingleAdLayoutIssues(area) : [];
   if (geometry.length) failures.push({area:ai,type:'geometry',issues:geometry});
   area.querySelectorAll('.single-ad-product-image').forEach((img,ii)=>{
     const stage=img.closest('.single-ad-image-stage');
     const r=img.getBoundingClientRect(), s=stage.getBoundingClientRect();
     const cs=getComputedStyle(stage);
     const aw=s.width-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)-(parseFloat(cs.borderLeftWidth)||0)-(parseFloat(cs.borderRightWidth)||0);
     const ah=s.height-(parseFloat(cs.paddingTop)||0)-(parseFloat(cs.paddingBottom)||0)-(parseFloat(cs.borderTopWidth)||0)-(parseFloat(cs.borderBottomWidth)||0);
     const natural=img.naturalWidth/img.naturalHeight;
     const rendered=r.width/r.height;
     const ratioError=Math.abs(rendered-natural)/natural;
     const fits=r.width<=aw+1.25 && r.height<=ah+1.25;
     const hitsEdge=Math.abs(r.width-aw)<=1.5 || Math.abs(r.height-ah)<=1.5;
     if (!Number.isFinite(rendered)||ratioError>0.001||!fits||!hitsEdge) {
       failures.push({area:ai,img:ii,type:'fit',natural,rendered,ratioError,aw,ah,w:r.width,h:r.height,fits,hitsEdge});
     }
   });
 });
 return failures;
}'''

fails=[]
tested=0
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':2200,'height':1800})
    page.goto('http://127.0.0.1:8765/index.html',wait_until='domcontentloaded',timeout=60000)
    page.wait_for_function("typeof renderSingleAdPreviews==='function' && typeof switchAppView==='function'",timeout=60000)
    page.wait_for_timeout(5500)
    for w,h in svgs:
        img=data_url(w,h)
        for design in DESIGNS:
            for size in SIZES:
                for count in COUNTS:
                    tested+=1
                    page.evaluate(SETUP,{'count':count,'size':size,'design':design,'img':img})
                    page.wait_for_timeout(35)
                    page.evaluate("()=>window.fitSingleNaturalImages?.(document)")
                    page.wait_for_timeout(20)
                    issues=page.evaluate(MEASURE)
                    if issues:
                        fails.append({'source':[w,h],'design':design,'size':size,'count':count,'issues':issues[:8]})
    browser.close()

print(json.dumps({'tested':tested,'failures':len(fails),'samples':fails[:20]},ensure_ascii=False,indent=2))
if fails:
    raise SystemExit(2)
