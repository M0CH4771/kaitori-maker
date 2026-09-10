import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {filterProducts,validateDataset,exportCsv,datasetFromCsv,parseCsv,safeUrl} from '../dist/core.mjs';
import {parseAltRow,recordFromAlt} from './parse-alt.mjs';
const data=validateDataset(JSON.parse(await readFile(new URL('./fixtures/sample-data.json',import.meta.url),'utf8')));

test('日本語・英語・全角型番で検索できる',()=>{
  for(const query of ['ゆきわらし','Snorunt','２００１９３','200/193']) assert.ok(filterProducts(data.products,{query}).some(p=>p.name==='ユキワラシ'));
});
test('PSA8とPSA9の価格を混在させない',()=>{
  const p8=filterProducts(data.products,{query:'ユキワラシ',grade:'8'}),p9=filterProducts(data.products,{query:'ユキワラシ',grade:'9'});
  assert.equal(p8[0].latest.price,7);assert.equal(p9[0].latest.price,10);
});
test('取引元を絞ってから直近価格を決定する',()=>{
  const products=[{...data.products[0],sales:[{id:'a',date:'2026-09-09',price:50,currency:'USD',source:'eBay'},{id:'b',date:'2026-09-01',price:11,currency:'USD',source:'ALT'}]}];
  assert.equal(filterProducts(products,{source:'ALT'})[0].latest.price,11);
});
test('履歴CSVを出力・再読込して価格と件数を維持する',()=>{
  const round=datasetFromCsv(exportCsv(data.products));
  assert.deepEqual(round.products,data.products);
  assert.deepEqual(parseCsv('a,b\r\n"日本語,名前","1"\r\n'),[['a','b'],['日本語,名前','1']]);
});
test('空・負数・不正日付・別通貨を成約価格にしない',()=>{
  for(const override of [{price:''},{price:0},{price:-1},{date:'2026-02-30'},{currency:'JPY'}]){
    const copy=structuredClone(data);copy.products[0].sales[0]={...copy.products[0].sales[0],...override};assert.throws(()=>validateDataset(copy));
  }
});
test('同じCSV商品IDに異なるグレードを混ぜたら拒否する',()=>{
  const a=structuredClone(data.products[0]),b=structuredClone(a);b.grade=a.grade==='8'?'9':'8';b.sales=b.sales.map(s=>({...s,id:'other-'+s.id}));
  assert.throws(()=>datasetFromCsv(exportCsv([a,b])),/混在/);
});
test('危険なURLとCSVの数式をそのまま出力しない',()=>{
  assert.equal(safeUrl('javascript:alert(1)'), '');assert.equal(safeUrl('https://attacker.test/',{altOnly:true}),'');
  const p=structuredClone(data.products[0]);p.name='=1+1';assert.ok(exportCsv([p]).includes("'=1+1"));
});
test('公開ページの取引行を解析し、出品価格は拒否する',()=>{
  const s=parseAltRow({text:'Auction\nJul 31, 2026\n$7',source:'eBay',url:'https://www.ebay.com/itm/800413143241'},0);
  assert.equal(s.date,'2026-07-31');assert.equal(s.price,7);assert.equal(s.type,'オークション');
  assert.throws(()=>parseAltRow({text:'Fixed price\n$45',source:'eBay'},0));
});
test('SARや型番違いの商品をARとして取り込まない',()=>{
  const target={name:'ユキワラシ',nameEn:'Snorunt',number:'200/193',rarity:'AR',url:'https://alt.xyz/itm/eb74c4d7-1c23-4773-8f7c-883a50b0c504/external'};
  assert.throws(()=>recordFromAlt({title:'Special Art Rare Snorunt #200',rows:[]},target,'8','2026-09-10'));
  assert.throws(()=>recordFromAlt({title:'Art Rare Snorunt #201',rows:[]},target,'8','2026-09-10'));
});
