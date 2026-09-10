import {syncConfig} from './sync-config.mjs';
import {validateDataset, filterProducts, exportCsv, datasetFromCsv, safeUrl} from './core.mjs';

const $=id=>document.getElementById(id);
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$'+new Intl.NumberFormat('en-US',{minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2}).format(n);
const date=d=>d.replaceAll('-','/');
let dataset={products:[]}, selectedId='', visible=[], loadSequence=0, imported=false;
let latestRun=null, remoteAvailable=false, watchUntil=0, runStatusKnown=false;
const controls=['grade','rarity','source','sort'];
const params=new URLSearchParams(location.search);
$('search').value=params.get('q')||'';
for(const key of controls){const v=params.get(key);if(v&&[...$(key).options].some(o=>o.value===v))$(key).value=v;}
const filters=()=>({query:$('search').value,grade:$('grade').value,rarity:$('rarity').value,source:$('source').value,sort:$('sort').value});
let toastTimer;
function toast(text){$('toast').textContent=text;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,4000);}
function updateUrl(){const f=filters(),p=new URLSearchParams();if(f.query)p.set('q',f.query);for(const k of controls)if(f[k]!== ({grade:'8',rarity:'AR',source:'all',sort:'recent'}[k]))p.set(k,f[k]);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():'')+location.hash);}
function populateOptions(){for(const [id,values] of [['grade',dataset.products.map(p=>p.grade)],['rarity',dataset.products.map(p=>p.rarity)],['source',dataset.products.flatMap(p=>p.sales.map(s=>s.source))]]){for(const value of [...new Set(values)])if(![...$(id).options].some(o=>o.value===value)){const option=document.createElement('option');option.value=value;option.textContent=id==='grade'?'PSA '+value:value;$(id).append(option);}}}

function render(){
  visible=filterProducts(dataset.products,filters());
  if(!visible.some(p=>p.id===selectedId))selectedId=visible[0]?.id||'';
  $('count').textContent=`${visible.length.toLocaleString()}件`;$('export').disabled=!visible.length;
  document.querySelectorAll('[data-preset]').forEach(b=>{const active=$('grade').value===b.dataset.preset&&$('rarity').value==='AR';b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  if(!visible.length){
    const hasData=dataset.products.length>0;
    $('results').innerHTML=`<div class="empty"><h3>${hasData?'該当する成約履歴がありません':'成約データがありません'}</h3><p>${hasData?'登録済みのデータに、この条件の履歴はありません。未収録の商品や取引もあります。':'データを読み込んで再度お試しください。'}</p>${hasData?'<button class="button" id="empty-clear">条件を解除して表示</button>':''}</div>`;
    $('detail').innerHTML='<div class="empty-detail">条件に合うカードを選ぶと、最近の取引を確認できます。</div>';
    $('empty-clear')?.addEventListener('click',clearFilters);updateUrl();return;
  }
  $('results').innerHTML=visible.map(p=>`<button class="result-card ${p.id===selectedId?'selected':''}" data-id="${escapeHtml(p.id)}" aria-pressed="${p.id===selectedId}"><span class="card-top"><span class="tag grade">PSA ${escapeHtml(p.grade)}</span><span class="tag rarity">${escapeHtml(p.rarity)}</span></span><div class="card-name">${escapeHtml(p.name)}</div><p class="card-subtitle">${escapeHtml(p.number)}${p.number?' · ':''}${escapeHtml(p.set||p.nameEn)}</p><div class="card-bottom"><div class="card-price">${money(p.latest.price)}<small>USD</small></div><div class="card-date">${date(p.latest.date)}<span>${escapeHtml(p.latest.source)} · 直近の取引</span></div></div></button>`).join('')+'<p class="result-note">登録済みの履歴から、条件に合う直近の金額を表示しています。</p>';
  $('results').querySelectorAll('[data-id]').forEach(b=>b.addEventListener('click',()=>{selectedId=b.dataset.id;render();}));
  renderDetail(visible.find(p=>p.id===selectedId));updateUrl();
}

function renderDetail(p){
  const latest=p.sales[0], oldest=p.sales.at(-1), image=safeUrl(p.imageUrl), url=safeUrl(p.url,{altOnly:true});
  const subtitle=[p.nameEn,p.number?'#'+p.number:'',p.set,p.setCode].filter(Boolean).join(' / ');
  $('detail').innerHTML=`<div class="detail-head"><div class="detail-topline"><div class="detail-tags"><span class="tag grade">PSA ${escapeHtml(p.grade)}</span><span class="tag rarity">${escapeHtml(p.rarity)}</span>${p.language?`<span class="tag">${escapeHtml(p.language)}</span>`:''}</div>${url?`<a class="source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">ALTで見る ↗</a>`:''}</div><h2>${escapeHtml(p.name)}</h2><p class="detail-subtitle">${escapeHtml(subtitle)}</p><div class="overview"><div class="product-image">${image?`<img id="card-image" src="${escapeHtml(image)}" alt="${escapeHtml(p.name)} PSA ${escapeHtml(p.grade)}" referrerpolicy="no-referrer">`:`<div class="no-image"><strong>PSA ${escapeHtml(p.grade)}</strong>商品画像未登録</div>`}</div><div class="latest"><div class="latest-label">直近の成約価格 <span class="tag">LATEST SALE</span></div><div class="big-price">${money(latest.price)}<span>USD</span></div><div class="latest-meta"><time datetime="${latest.date}">${date(latest.date)}</time><span class="source-badge">${escapeHtml(latest.source)}</span><span>${escapeHtml(latest.type)}</span></div></div></div><dl class="detail-facts"><div><dt>鑑定グレード</dt><dd>PSA ${escapeHtml(p.grade)}</dd></div><div><dt>収録した取引</dt><dd>${p.sales.length.toLocaleString()}件</dd></div><div><dt>収録期間</dt><dd>${date(oldest.date)}〜</dd></div></dl></div><section class="history-section"><div class="history-title"><h3>最近の取引</h3><span>TRANSACTION HISTORY</span></div><div class="table-wrap"><table><thead><tr><th scope="col">成約日</th><th scope="col">取引元</th><th scope="col">取引方法</th><th scope="col">価格（USD）</th></tr></thead><tbody>${p.sales.map((s,i)=>`<tr><td><time datetime="${s.date}">${date(s.date)}</time>${i===0?'<span class="new-tag">最新</span>':''}</td><td><span class="source-badge">${escapeHtml(s.source)}</span></td><td>${escapeHtml(s.type)}</td><td class="price">${money(s.price)}</td></tr>`).join('')}</tbody></table></div><div class="provenance">データの出典：${escapeHtml(p.provenance)}<br>収録範囲内の履歴です。同日取引の時間・順序、送料・税の内訳は確認できていません。</div></section>`;
  $('card-image')?.addEventListener('error',e=>{e.target.parentElement.innerHTML='<div class="no-image">画像を表示できません</div>';});
}

function clearFilters(){ $('search').value='';$('grade').value='all';$('rarity').value='all';$('source').value='all';render();}
const formatAsOf=value=>{const d=new Date(value);return Number.isNaN(d.valueOf())?'未確認':new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(d);};
function showSyncState(){
  $('sync-schedule').textContent='自動取得：'+syncConfig.scheduleLabel;
  const status=$('sync-state');status.className='';
  const last='最終取得 '+formatAsOf(dataset.asOf)+'（日本時間）';
  if(!remoteAvailable){status.textContent='最新データを確認できません / '+last;status.className='failed';}
  else if(!runStatusKnown){status.textContent=last+' / 実行状況は未確認';}
  else if(latestRun&&latestRun.status!=='completed'){status.textContent='ALTから取得中 / '+last;status.className='running';}
  else if(latestRun&&latestRun.conclusion!=='success'){status.textContent='直近の取得に失敗 / '+last;status.className='failed';}
  else if(latestRun&&Date.parse(dataset.asOf)<Date.parse(latestRun.run_started_at||latestRun.created_at)){status.textContent='取得完了・データ反映待ち / '+last;status.className='running';}
  else{status.textContent=last+(latestRun?' / 更新完了':'');status.className=latestRun?'complete':'';}
  $('sync-modal-status').textContent=status.textContent;
}
async function checkRun(){
  try{const response=await fetch(syncConfig.statusUrl,{cache:'no-store',headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('Status unavailable');const value=await response.json();latestRun=value.workflow_runs?.[0]||null;runStatusKnown=true;showSyncState();}catch{runStatusKnown=false;showSyncState();}
}
function showDataNotice(){
  const count=dataset.products.reduce((n,p)=>n+p.sales.length,0);
  $('notice').textContent=`${dataset.products.length}商品・${count}件の成約履歴。登録商品のRecent transactions欄が対象です。`;
  $('notice').className='notice';
}
async function loadData({silent=false}={}){
  const seq=++loadSequence;$('reload').disabled=true;
  try {
    const endpoint=new URL(syncConfig.dataUrl);endpoint.searchParams.set('v',String(Math.floor(Date.now()/60000)));
    const response=await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error('共通データを読み込めません。');
    const next=validateDataset(await response.json());if(!Number.isFinite(Date.parse(next.asOf)))throw new Error('取得時刻が不明です。');if(seq!==loadSequence)return;
    remoteAvailable=true;
    if(!dataset.asOf||Date.parse(next.asOf)>=Date.parse(dataset.asOf)||imported)dataset=next;
    imported=false;populateOptions();showDataNotice();render();showSyncState();
    if(!silent)toast('取得済みの最新データを表示しました');
    await checkRun();
  }catch(error){if(seq!==loadSequence)return;remoteAvailable=false;$('notice').className='notice error';$('notice').textContent=dataset.products.length?'最新データを確認できません。保存済みの成約履歴を表示しています。':'データを読み込めませんでした。しばらくして再試行してください。';if(!dataset.products.length)render();showSyncState();}
  finally{if(seq===loadSequence)$('reload').disabled=false;}
}
async function boot(){
  try{const response=await fetch('./data.json',{cache:'no-store'});if(response.ok){dataset=validateDataset(await response.json());populateOptions();render();$('notice').textContent='保存済みデータを表示し、最新の取得結果を確認しています。';}}
  catch{}
  await loadData({silent:true});
}
$('sync-execute').href=syncConfig.workflowUrl;
$('sync-open').addEventListener('click',()=>{$('sync-dialog').showModal();checkRun();});
$('sync-execute').addEventListener('click',()=>{watchUntil=Date.now()+10*60*1000;$('sync-modal-status').textContent='GitHubで実行後、この画面に戻ってください。';});
setInterval(()=>{if(Date.now()<watchUntil&&!document.hidden&&!imported)loadData({silent:true});},30000);

$('search-form').addEventListener('submit',e=>e.preventDefault());$('search').addEventListener('input',render);
for(const id of controls)$(id).addEventListener('change',render);
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{$('grade').value=b.dataset.preset;$('rarity').value='AR';render();}));
$('clear').addEventListener('click',clearFilters);$('reload').addEventListener('click',()=>loadData());
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('import-dialog').open&&!$('sync-dialog').open){e.preventDefault();$('search').focus();}});
$('export').addEventListener('click',()=>{const blob=new Blob([exportCsv(visible)],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='alt-sales-'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(`${visible.length}商品の履歴を書き出しました`);});
$('import-open').addEventListener('click',()=>{$('import-error').textContent='';$('import-file').value='';$('import-dialog').showModal();});
$('import-file').addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try{if(file.size>20*1024*1024)throw new Error('ファイルは20MB以下にしてください。');const text=await file.text();const next=file.name.toLowerCase().endsWith('.csv')?datasetFromCsv(text):validateDataset(JSON.parse(text));loadSequence++;$('reload').disabled=false;dataset=next;imported=true;populateOptions();selectedId='';$('notice').className='notice';$('notice').textContent='この画面に読み込んだデータを表示しています。再読込すると共通データに戻ります。';render();$('import-dialog').close();toast(`${dataset.products.length}商品を読み込みました`);}catch(error){$('import-error').textContent=error.message;}
});
setInterval(()=>{if(!document.hidden&&!imported)loadData({silent:true});},5*60*1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!imported)loadData({silent:true});});

if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  Promise.resolve(document.modelContext.registerTool({name:'search_recorded_card_sales',title:'登録済み成約履歴を検索',description:'登録済み商品の検索条件を変更して画面に反映する。ALTへの新規取得は行わない。',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:300},grade:{type:'string'},rarity:{type:'string'},source:{type:'string'}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('検索条件を指定してください。');for(const key of Object.keys(input))if(!['query','grade','rarity','source'].includes(key)||typeof input[key]!=='string')throw new Error('無効な検索条件です。');if((input.query?.length||0)>300)throw new Error('検索語が長すぎます。');for(const id of ['grade','rarity','source'])if(input[id]&&!([...$(id).options].some(o=>o.value===input[id])))throw new Error('選択できない条件です：'+id);if(input.query!==undefined)$('search').value=input.query;for(const id of ['grade','rarity','source'])if(input[id]!==undefined)$(id).value=input[id];render();return{count:visible.length,products:visible.slice(0,50).map(p=>({id:p.id,name:p.name,number:p.number,grade:p.grade,rarity:p.rarity,latest:p.latest})),truncated:visible.length>50};}},{signal:lifecycle.signal})).catch(()=>{});
  addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
boot();
