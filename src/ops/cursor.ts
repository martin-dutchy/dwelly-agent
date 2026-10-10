/**
 * Demo autoplay helpers shared by the show page and the decision page: a fake, animated macOS-style pointer
 * that glides to an element, hovers, "clicks" it (ripple + pressed state) and navigates with a short fade.
 * Only active with `?auto=1` (or when a page calls `DemoCursor.enable()`); otherwise nothing is drawn and the
 * pages behave exactly as before. Exposed as `window.DemoCursor`.
 */

export const CURSOR_CSS = `
.dc-cursor{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;opacity:0;transition:opacity .3s ease;will-change:transform,opacity}
.dc-cursor.on{opacity:1}
.dc-cursor svg{display:block;margin:-2px 0 0 -4px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.32)) drop-shadow(0 0 1px rgba(0,0,0,.25));transform-origin:4px 2px;transition:transform .12s ease}
.dc-cursor.press svg{transform:scale(.86)}
.dc-ripple{position:fixed;z-index:2147483646;pointer-events:none;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;border:2px solid var(--accent,#1f4f73);background:color-mix(in srgb,var(--accent,#1f4f73) 14%,transparent);animation:dc-ripple .5s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes dc-ripple{from{opacity:.75;transform:scale(.25)}to{opacity:0;transform:scale(1.5)}}
.dc-hover{filter:brightness(.94);transition:filter .15s ease,transform .1s ease}
a.dc-hover{text-decoration:underline}
.dc-active{transform:translateY(1px) scale(.97)}
body.dc-in{animation:dc-fade .35s ease both}
body.dc-out{opacity:0;transition:opacity .2s ease}
body.dc-auto .controls{opacity:0}
body.dc-auto .controls:hover{opacity:1}
@keyframes dc-fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.dc-cursor,.dc-cursor svg,body.dc-out{transition:none}.dc-ripple,body.dc-in{animation:none}}
`;

export const CURSOR_JS = `
(() => {
  if (window.DemoCursor) return;
  const q = new URLSearchParams(location.search);
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const SVG = '<svg width="22" height="30" viewBox="0 0 22 30" aria-hidden="true"><path d="M4 2v21.5l5.1-4.9 3.3 7.6 3.6-1.6-3.3-7.4H20z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  let el = null, x = innerWidth / 2, y = innerHeight + 40;
  const ensure = () => {
    if (el) return el;
    el = document.createElement('div'); el.className = 'dc-cursor'; el.innerHTML = SVG; document.body.appendChild(el);
    place(x, y, 0); return el;
  };
  const place = (nx, ny, ms) => {
    el.style.transition = ms ? 'transform ' + ms + 'ms cubic-bezier(.45,.05,.25,1), opacity .3s ease' : 'opacity .3s ease';
    el.style.transform = 'translate3d(' + nx.toFixed(1) + 'px,' + ny.toFixed(1) + 'px,0)';
    x = nx; y = ny;
  };
  const save = () => { try { sessionStorage.setItem('dc-pos', JSON.stringify({ x: x / innerWidth, y: y / innerHeight })); } catch {} };
  const DC = {
    AUTO: q.get('auto') === '1', REDUCE, sleep,
    enable() { DC.AUTO = true; document.body.classList.add('dc-auto'); },
    // Start position: where the previous page left the cursor, else just below the bottom edge.
    restore() { ensure(); try { const p = JSON.parse(sessionStorage.getItem('dc-pos') || 'null'); if (p) place(p.x * innerWidth, p.y * innerHeight, 0); } catch {} void el.offsetWidth; el.classList.add('on'); },
    enter(fx, fy) { ensure(); place(fx != null ? fx : innerWidth * 0.62, fy != null ? fy : innerHeight + 30, 0); void el.offsetWidth; el.classList.add('on'); },
    async moveTo(target, at) {
      ensure(); el.classList.add('on');
      let r = target.getBoundingClientRect();
      if (r.top < 60 || r.bottom > innerHeight - 40) { target.scrollIntoView({ block: 'center', behavior: REDUCE ? 'auto' : 'smooth' }); await sleep(REDUCE ? 50 : 550); r = target.getBoundingClientRect(); }
      const tx = at === 'start' ? r.left + Math.min(28, r.width / 2) : r.left + r.width / 2;
      const ty = at === 'start' ? r.top + Math.min(22, r.height / 2) : r.top + r.height / 2;
      const d = Math.hypot(tx - x, ty - y);
      const ms = REDUCE ? 0 : Math.round(Math.min(720, Math.max(520, 380 + d * 0.35)));
      place(tx, ty, ms); await sleep(ms + 40);
    },
    async hover(target) { target.classList.add('dc-hover'); await sleep(250); },
    async click(target) {
      ensure(); el.classList.add('press'); target.classList.add('dc-active');
      if (!REDUCE) { const rp = document.createElement('div'); rp.className = 'dc-ripple'; rp.style.left = x + 'px'; rp.style.top = y + 'px'; document.body.appendChild(rp); setTimeout(() => rp.remove(), 600); }
      await sleep(150); el.classList.remove('press'); target.classList.remove('dc-active'); await sleep(90);
      target.classList.remove('dc-hover');
    },
    async go(href) {
      save(); const b = document.body; b.classList.remove('dc-in'); void b.offsetWidth; b.classList.add('dc-out');
      await sleep(REDUCE ? 0 : 200); location.href = href;
    },
    hide() { if (el) el.classList.remove('on'); },
    withAuto(href) { const i = href.indexOf('#'); const base = i < 0 ? href : href.slice(0, i), hash = i < 0 ? '' : href.slice(i); return base + (base.includes('?') ? '&' : '?') + 'auto=1' + hash; },
  };
  window.DemoCursor = DC;
  if (DC.AUTO) { document.body.classList.add('dc-auto'); if (!REDUCE) document.body.classList.add('dc-in'); }
  addEventListener('pageshow', () => document.body.classList.remove('dc-out'));
})();
`;
