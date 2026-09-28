const { chromium } = require('C:/Users/nagdy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
require('node:fs').mkdirSync('qa-nagah', {recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.locator('.project-card').count(),8);
 assert.equal(await page.locator('.portrait-frame img').evaluate(img=>img.complete&&img.naturalWidth>0),true);
 assert.equal(await page.locator('.star-icon').count(),12);
 assert.equal(await page.locator('body').evaluate(el=>/[✳⌘◎↗→←↓↑]/u.test(el.innerText)),false);
 await page.screenshot({path:'qa-nagah/qa-desktop.png',fullPage:false});
 for(const lang of ['en','ar']){
  if(lang==='ar')await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:900});
   await page.waitForTimeout(150);
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   assert.ok(size.scroll<=size.client+1,`${lang} ${width} overflow: ${JSON.stringify(size)}`);
   if(width===390){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`qa-nagah/qa-mobile-${lang}.png`});}
  }
  await page.getByRole('button',{name:lang==='en'?'View details for Rigow':'عرض تفاصيل Rigow',exact:true}).click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
  assert.equal(await page.locator('#dialog-title').textContent(),'Rigow');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
  await page.setViewportSize({width:390,height:900});
  await page.getByRole('button',{name:lang==='en'?'View details for Nagah':'عرض تفاصيل Nagah',exact:true}).click();
  assert.equal(await page.locator('#dialog-title').textContent(),'Nagah');
  assert.equal(await page.locator('[data-screen]').count(),2);
  await page.locator('#gallery-image').evaluate(img=>img.decode());
  assert.equal(await page.locator('#gallery-image').evaluate(img=>img.naturalWidth),1536);
  await page.locator('[data-gallery-next]').click();
  assert.match(await page.locator('#gallery-image').getAttribute('src'),/nagah-reports/);
  await page.locator('#gallery-image').evaluate(img=>img.decode());
  await page.locator('[data-gallery-zoom]').click();
  assert.equal(await page.locator('[data-gallery-zoom]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-gallery-zoom]').click();
  await page.screenshot({path:`qa-nagah/qa-nagah-${lang}.png`});
  const bounds=await page.locator('dialog').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));
  assert.ok(bounds.scroll<=bounds.width+1,`${lang} gallery overflow`);
  await page.locator('[data-gallery-next]').click();
  assert.match(await page.locator('#gallery-image').getAttribute('src'),/nagah-map/);
  await page.locator('.gallery-stage').focus();
  await page.keyboard.press(lang==='en'?'ArrowRight':'ArrowLeft');
  assert.match(await page.locator('#gallery-image').getAttribute('src'),/nagah-reports/);
  await page.locator('.dialog-close').click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
 }
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'ar');
 await page.locator('#motion').click();assert.equal(await page.locator('#motion').getAttribute('aria-pressed'),'true');
 await page.locator('#language').click();
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.nagah-presentation').scrollIntoViewIfNeeded();
 assert.equal(await page.locator('.nagah-presentation').evaluate(el=>el.offsetHeight),530);
 await page.waitForTimeout(800);
 await page.locator('.project-card').filter({has:page.locator('.nagah-presentation')}).screenshot({path:'qa-nagah/qa-nagah-card-final.png'});
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:'qa-nagah/qa-full.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: EN/AR, 4 viewport widths, no horizontal overflow, all 8 projects, SVG decorations, Nagah images/gallery/zoom/keyboard/wraparound, modal/Escape, preferences, portrait, and no JavaScript errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
