// Records the /ops/show autoplay to a video with the real call audio laid in where the page played it.
// Usage: node scripts/record-demo.mjs [baseUrl] [outDir]
// Needs a running portal (pnpm voice:serve), system Chrome, ffmpeg, and playwright-core (PLAYWRIGHT_CORE=path, else from node_modules).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:3100';
const out = resolve(process.argv[3] ?? 'demo-video');
mkdirSync(out, { recursive: true });

let t0, tStart, tEnd, log, audioUrl;
if (process.env.MUX_ONLY) ({ t0, tStart, tEnd, log, audioUrl } = JSON.parse(readFileSync(join(out, 'calllog.json'), 'utf8')));
else {
  const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core');
  for (const f of readdirSync(out)) if (f.endsWith('.webm')) rmSync(join(out, f));
  // Fresh demo: reopen the decision.
  await fetch(`${base}/ops/show/reset`, { method: 'POST', redirect: 'manual' });
  
  const W = 1440, H = 900;
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--force-dark-mode'] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: 'dark', recordVideo: { dir: out, size: { width: W, height: H } } });
  const page = await ctx.newPage();
  t0 = Date.now(); // video starts with the page
  log = [];
  page.on('console', (m) => { const t = m.text(); if (t.startsWith('[calllog]')) log.push(JSON.parse(t.slice(10))); });
  page.on('request', (r) => { if (r.url().includes('/ops/show/audio/')) audioUrl = r.url(); });
  
  await page.goto(`${base}/ops/show?auto=1`);
  await page.waitForTimeout(400);
  await page.mouse.click(24, H / 2); // the click the browser needs before sound; starts the autoplay
  tStart = Date.now();
  // Wait for the closing subtitle, then hold it on screen.
  await page.waitForFunction(() => /23 new test cases/.test(document.getElementById('dc-sub')?.textContent ?? '') && location.hash === '#fastforward', null, { timeout: 180_000, polling: 250 });
  await page.waitForTimeout(4500);
  tEnd = Date.now();
  await ctx.close();
  await browser.close();
  
  const webm = readdirSync(out).filter((f) => f.endsWith('.webm')).map((f) => join(out, f)).at(-1);
  renameSync(webm, join(out, 'raw.webm'));
  writeFileSync(join(out, 'calllog.json'), JSON.stringify({ t0, tStart, tEnd, log, audioUrl }, null, 2));
  console.log('call log', log);
}

// Audio: each clip [from, to] of the recording, delayed to when it played in the video.
const mp3 = join(out, 'call.mp3');
if (audioUrl && !(process.env.MUX_ONLY && existsSync(mp3))) writeFileSync(mp3, Buffer.from(await (await fetch(audioUrl)).arrayBuffer()));
const plays = log.filter((e) => e.ev === 'play').map((p) => ({ ...p, to: log.find((q) => q.ev === 'pause' && q.at > p.at)?.to }));
const trimStart = Math.max(0, (tStart - t0) / 1000 + 0.3); // drop the "click to start" moment
const dur = (tEnd - t0) / 1000 - trimStart;
const parts = plays.map((p, i) => `[1:a]atrim=start=${p.from.toFixed(3)}:end=${p.to.toFixed(3)},asetpts=PTS-STARTPTS,adelay=${Math.max(0, Math.round(p.at - t0 - trimStart * 1000))}:all=1[a${i}]`);
const wav = join(out, 'audio.wav');
const mix = plays.length ? `${parts.join(';')};${plays.map((_, i) => `[a${i}]`).join('')}amix=inputs=${plays.length}:normalize=0,apad=whole_dur=${dur.toFixed(2)}[aout]` : `anullsrc=r=44100:cl=mono,atrim=duration=${dur.toFixed(2)}[aout]`;
execFileSync('ffmpeg', ['-v', 'error', '-y', ...(plays.length ? ['-i', mp3] : []), '-filter_complex', plays.length ? mix.replaceAll('[1:a]', '[0:a]') : mix, '-map', '[aout]', '-ar', '44100', wav], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', trimStart.toFixed(2), '-i', join(out, 'raw.webm'), '-i', wav, '-map', '0:v', '-map', '1:a', '-t', dur.toFixed(2), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', join(out, 'dwelly-demo.mp4')], { stdio: 'inherit' });
console.log(`Wrote ${join(out, 'dwelly-demo.mp4')} (${dur.toFixed(1)}s)`);
