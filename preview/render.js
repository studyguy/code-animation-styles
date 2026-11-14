// 批量渲染：node render.js [id ...]
// 输出 preview/out/<ID>.jpg（1280×720, JPEG q82）
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9351;
const W = 1280, H = 720, Q = 82;
const ALL = ['V1', 'V2', 'X14', 'X1', 'Z5', 'K22', 'M1', 'H2'];
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

const OUT = path.join(__dirname, 'out');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const pageURL = 'file:///' + encodeURI(path.join(__dirname, 'stage.html').replace(/\\/g, '/'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=C:/Users/Admin/AppData/Local/Temp/preview-profile', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let ver = null;
  for (let i = 0; i < 80; i++) {
    try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(200); }
  }
  if (!ver) throw new Error('Chrome 没起来');

  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = list.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let id = 0; const pend = new Map();
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise(res => {
    const mid = ++id; pend.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });

  const report = [];
  for (const one of ids) {
    const t0 = Date.now();
    await send('Page.navigate', { url: `${pageURL}?id=${encodeURIComponent(one)}&t=2` });
    let ready = false;
    for (let i = 0; i < 60; i++) {
      await sleep(80);
      const r = await send('Runtime.evaluate', { expression: 'window.__ready === true', returnByValue: true });
      if (r.result && r.result.result && r.result.result.value === true) { ready = true; break; }
    }
    if (!ready) { console.log(`✗ ${one}: 未就绪`); report.push({ one, ok: false, why: 'not ready' }); continue; }
    const err = await send('Runtime.evaluate', { expression: 'window.__error || ""', returnByValue: true });
    const errText = err.result && err.result.result ? err.result.result.value : '';
    if (errText) { console.log(`✗ ${one}: ${errText.split('\n')[0]}`); report.push({ one, ok: false, why: errText.split('\n')[0] }); continue; }

    await sleep(120);
    const shot = await send('Page.captureScreenshot', {
      format: 'jpeg', quality: Q, captureBeyondViewport: false,
      clip: { x: 0, y: 0, width: W, height: H, scale: 1 }
    });
    if (!shot.result || !shot.result.data) { console.log(`✗ ${one}: 截图失败`); continue; }
    const file = path.join(OUT, one + '.jpg');
    fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
    const kb = Math.round(fs.statSync(file).size / 1024);
    console.log(`✓ ${one}  ${kb}KB  ${Date.now() - t0}ms`);
    report.push({ one, ok: true, kb });
  }

  fs.writeFileSync(path.join(OUT, 'render-report.json'), JSON.stringify(report, null, 1));
  ws.close(); chrome.kill();
})().catch(e => { console.error(e); chrome.kill(); process.exit(1); });
