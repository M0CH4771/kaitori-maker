// Read only the public, rendered Recent transactions section. No sign-in, cookies, private APIs, or stealth settings.
import {readFile, writeFile, rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {chromium} from 'playwright';
import {recordFromAlt} from './parse-alt.mjs';
import {validateDataset, safeUrl} from '../dist/core.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const targetData=JSON.parse(await readFile(path.join(root,'scripts/targets.json'),'utf8'));
const asOf=new Date().toISOString();
const browser=await chromium.launch();
const context=await browser.newContext({locale:'en-US'});
const page=await context.newPage();page.setDefaultTimeout(45000);
const products=[];
const getRows=()=>page.getByRole('heading',{name:'Recent transactions',exact:true}).locator('..').locator('..');
async function snapshot(){return page.evaluate(()=>{
  const main=document.querySelector('main');
  const heading=Array.from(main?.querySelectorAll('h3')||[]).find(el=>el.textContent.trim()==='Recent transactions');
  const section=heading?.parentElement.parentElement;
  return {title:main?.querySelector('h2')?.textContent,grade:main?.innerText.match(/\bPSA\s+(\d+(?:\.\d+)?)/)?.[1],imageUrl:main?.querySelector('button[aria-label="Open image modal"] img')?.src,rows:Array.from(section?.querySelectorAll('a')||[]).map(a=>({text:a.innerText,source:a.querySelector('img')?.alt,url:a.href})),empty:section?.textContent.includes('There are no recent transactions for this asset.')};
});}
async function waitForRows(){await page.waitForFunction(()=>{
  const h=Array.from(document.querySelectorAll('main h3')).find(el=>el.textContent.trim()==='Recent transactions');
  const s=h?.parentElement.parentElement;
  return s&&(Array.from(s.querySelectorAll('a')).some(a=>/\$[\d,.]+/.test(a.innerText))||s.textContent.includes('There are no recent transactions for this asset.'));
},undefined,{timeout:45000});}

try{
  for(const target of targetData.products){
    if(!safeUrl(target.url,{altOnly:true})||!/^\/itm\/[a-zA-Z0-9-]+(?:\/external)?$/.test(new URL(target.url).pathname))throw new Error('Target must be a public ALT product URL.');
    // A low-rate sequential request for each explicit target, with no automatic challenge retries.
    await page.goto(target.url,{waitUntil:'domcontentloaded',timeout:60000});
    const visible=await page.locator('body').innerText();
    if(/verify you are human|checking your browser|unusual traffic|automated traffic/i.test(visible)||new URL(page.url()).pathname==='/login')throw new Error('ALT requires sign-in or verification; data retained without bypass.');
    await page.getByRole('heading',{name:'Recent transactions',exact:true}).waitFor({state:'visible'});
    await waitForRows();
    let selectedGrade=(await snapshot()).grade;
    for(const grade of target.grades){
      if(selectedGrade!==grade){
        const before=await getRows().innerText();
        const population=page.getByText('PSA population',{exact:true}).locator('..');
        const choice=population.getByRole('button',{name:new RegExp('^'+grade.replace('.','\\.')+'\\s+[\\d,]+$')});
        if(await choice.count()!==1)throw new Error('Could not identify exactly one PSA grade button.');
        await choice.click();
        // Fail closed when a switch cannot be distinguished from the prior history.
        await page.waitForFunction(previous=>{
          const h=Array.from(document.querySelectorAll('main h3')).find(el=>el.textContent.trim()==='Recent transactions');
          const s=h?.parentElement.parentElement;return s&&s.innerText!==previous;
        },before,{timeout:30000});
        await waitForRows();selectedGrade=grade;
      }
      const raw=await snapshot();
      if(!raw.rows.length&&!raw.empty)throw new Error('History did not finish loading.');
      const p=recordFromAlt(raw,target,grade,asOf);
      products.push(p);console.log(`${p.name} PSA${p.grade}: ${p.sales.length} transactions`);
    }
    await page.waitForTimeout(2000);
  }
  if(!products.length)throw new Error('No target products collected; keeping the previous file.');
  const count=products.reduce((n,p)=>n+p.sales.length,0);
  const data=validateDataset({schemaVersion:1,mode:'public-pages',asOf,notice:`ALT公開ページから取得：${products.length}商品・${count}件の履歴。最終取得：${asOf.replace('T',' ').slice(0,16)} UTC。登録商品のみが対象です。`,products});
  const output=path.join(root,'dist/data.json'),temporary=output+'.tmp';
  await writeFile(temporary,JSON.stringify(data,null,2)+'\n');await rename(temporary,output);
}catch(error){
  console.error('Collection failed. Existing data.json has not been overwritten. '+error.message);
  console.error('Page URL:',page.url());
  console.error('Visible public content:',await page.getByRole('main').innerText({timeout:3000}).then(t=>t.slice(0,4500)).catch(()=>'(unavailable)'));
  process.exitCode=1;
}
finally{await context.close();await browser.close();}
