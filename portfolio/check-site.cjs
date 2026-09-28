const { chromium } = require('C:/Users/nagdy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.locator('.project-card').count(),7);
 assert.equal(await page.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0),true);
 await page.screenshot({path:'qa-desktop.png',fullPage:false});
 for(const lang of ['en','ar']){
  if(lang==='ar')await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:900});
   await page.waitForTimeout(150);
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   assert.ok(size.scroll<=size.client+1,`${lang} ${width} overflow: ${JSON.stringify(size)}`);
   if(width===390){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`qa-mobile-${lang}.png`,fullPage:true});}
  }
  await page.locator('[data-project="0"]').click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
  assert.equal(await page.locator('#dialog-title').textContent(),'Rigow');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
 }
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'ar');
 await page.locator('#motion').click();assert.equal(await page.locator('#motion').getAttribute('aria-pressed'),'true');
 await page.locator('#language').click();
 await page.setViewportSize({width:1440,height:1000});
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:'qa-full.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: EN/AR, 4 viewport widths, no horizontal overflow, all 7 projects, modal/Escape, preferences, portrait, and JavaScript errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
