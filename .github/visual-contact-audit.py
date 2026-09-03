from pathlib import Path
import math, urllib.parse
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw

ROOT=Path.cwd(); OUT=ROOT/'visual-contact'; SHOT=OUT/'shots'; OUT.mkdir(exist_ok=True); SHOT.mkdir(exist_ok=True)
THEMES=['signal','trust','market','alert','editorial','wa','cyber','soft','ticket','scoreboard','luxury','fire','royal','clean','neon','sakura','forest','pop','retro','hologram','mono','ocean','sunset','mint','lavender','ice','chocolate','japan','galaxy','lime']
DESIGNS=['blackgold','redimpact','royal','clean','cyber','sakura','retro','pop','emerald','mono']
SIZES=['portrait','square','landscape']; COUNTS=[2,4,12,22,30]
svg='<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880"><defs><linearGradient id="g"><stop stop-color="#ffd957"/><stop offset=".5" stop-color="#59bfff"/><stop offset="1" stop-color="#8055ef"/></linearGradient></defs><rect width="630" height="880" rx="24" fill="#fff"/><rect x="16" y="16" width="598" height="848" rx="18" fill="#fafafa" stroke="#222" stroke-width="8"/><rect x="44" y="80" width="542" height="480" fill="url(#g)"/><text x="315" y="340" text-anchor="middle" font-size="90" font-family="Arial" font-weight="900">CARD</text><text x="315" y="680" text-anchor="middle" font-size="46" font-family="Arial" font-weight="900">SAMPLE</text></svg>'
IMG='data:image/svg+xml;charset=utf-8,'+urllib.parse.quote(svg)
BUY=r'''({theme,layout,count,img})=>{switchAppView('buylist');themeSelect.value=theme;layoutSelect.value=layout;cardNameDisplaySelect.value='hide';titleInput.value='PSA10 高価買取';dateInput.value='2026-09-03';globalCardData=Array.from({length:count},(_,i)=>({id:i+1,originalIndex:i,name:'サンプルカード '+(i+1)+' 【SAR】{123/456}[TEST]',type:'SAR',group:'強化',status:i%5===0?'超強化':'強化',price:String([300,350,700,1200,1800,2500,3100,6300,15000,24000,55000][i%11]),aMinusPrice:'',resolvedImg:img,imgUrl:'',productId:'T'+i,hidden:false}));renderPages();}'''
SINGLE=r'''({design,size,count,img})=>{switchAppView('single');singleDesignSelect.value=design;singleSizeSelect.value=size;singleItemsPerImageSelect.value=String(count);singleCardNameDisplaySelect.value='hide';singleGradeDisplaySelect.value='hide';singleHeadlineInput.value='強化買取中！';globalCardData=Array.from({length:count},(_,i)=>({id:i+1,originalIndex:i,name:'サンプルカード '+(i+1),type:'SAR',group:'強化',status:'強化',price:String([300,350,700,1200,1800,2500,3100,6300,15000,24000,55000][i%11]),aMinusPrice:'',resolvedImg:img,imgUrl:'',productId:'T'+i,hidden:false}));selectedSingleCardIds.clear();singleSelectionOrder=[];globalCardData.forEach(c=>{selectedSingleCardIds.add(c.id);singleSelectionOrder.push(c.id)});renderSingleAdPreviews();}'''

def sheet(items,out,cols,w=210,label_h=22):
    cells=[]
    for label,path in items:
        im=Image.open(path).convert('RGB'); h=max(1,int(im.height*w/im.width)); im=im.resize((w,h),Image.Resampling.LANCZOS)
        cell=Image.new('RGB',(w,h+label_h),'white'); cell.paste(im,(0,label_h)); ImageDraw.Draw(cell).text((4,4),label,fill='black'); cells.append(cell)
    ch=max(x.height for x in cells); rows=math.ceil(len(cells)/cols); canvas=Image.new('RGB',(cols*w,rows*ch),(220,220,220))
    for i,c in enumerate(cells): canvas.paste(c,((i%cols)*w,(i//cols)*ch))
    canvas.save(out,quality=88)

def capture(page, selector, path):
    box=page.locator(selector).first.bounding_box()
    if not box or box['width'] < 2 or box['height'] < 2:
        raise RuntimeError(f'no capture box for {selector}')
    clip={
        'x':max(0,box['x']), 'y':max(0,box['y']),
        'width':box['width'], 'height':box['height']
    }
    page.screenshot(path=str(path),clip=clip,animations='disabled',timeout=10000)

with sync_playwright() as p:
    b=p.chromium.launch(headless=True,args=['--no-sandbox']); page=b.new_page(viewport={'width':2400,'height':2000})
    page.goto('http://127.0.0.1:8765/index.html',wait_until='domcontentloaded',timeout=60000); page.wait_for_function("typeof renderPages==='function' && typeof renderSingleAdPreviews==='function'")
    page.evaluate("()=>{window.alert=()=>{};window.confirm=()=>true;}"); page.add_style_tag(content='*,*::before,*::after{animation:none!important;transition:none!important;}'); page.wait_for_timeout(250)
    for layout,count in [('portrait_6x5',30),('landscape_10x3',30),('portrait_10x6',60),('landscape_15x4',60)]:
        items=[]
        for theme in THEMES:
            page.evaluate(BUY,{'theme':theme,'layout':layout,'count':count,'img':IMG}); page.wait_for_timeout(8)
            path=SHOT/f'buy-{layout}-{theme}.png'; capture(page,'#pagesContainer .exportArea',path); items.append((theme,path))
        sheet(items,OUT/f'buy-{layout}.jpg',5,210)
    for size in SIZES:
        items=[]
        for design in DESIGNS:
            for count in COUNTS:
                page.evaluate(SINGLE,{'design':design,'size':size,'count':count,'img':IMG}); page.wait_for_timeout(8)
                path=SHOT/f'single-{size}-{design}-{count}.png'; capture(page,'#singlePreviewContainer .single-ad',path); items.append((f'{design}/{count}',path))
        sheet(items,OUT/f'single-{size}.jpg',5,190)
    b.close()
print('contact sheets ready')
