import { CURSOR_CSS, CURSOR_JS } from './cursor.js';
import { DEMO_CASE } from './demo.js';
import type { OpsEvent } from './store.js';
import { whatsappConfigured } from './whatsapp.js';

/** Replies reach a real phone only for the demo case with Twilio configured; everywhere else the phone is a simulation. */
export const reallyDelivered = (caseId: string) => caseId === DEMO_CASE && whatsappConfigured();
export const SIMULATED = 'Simulated delivery';

/**
 * The tenant's own WhatsApp, drawn as a phone floating over the decision page. It only ever shows messages
 * that exist: the tenant's messages from the case, and agency messages that were actually sent (a person's
 * reply recorded as 'sent', or the agent's verified WhatsApp messages). Server data is escaped in markup and
 * set with textContent in the script.
 */

/** One message as the tenant sees it: `me` = the tenant (green, right), `them` = the agency (grey, left). */
export type PhoneMsg = { side: 'me' | 'them'; text: string; ts?: string; via?: string };

const LONDON = { timeZone: 'Europe/London' } as const;
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const clock = (iso?: string) => {
  const d = iso ? new Date(iso) : new Date();
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString('en-GB', { ...LONDON, hour: '2-digit', minute: '2-digit', hour12: false });
};

/** The WhatsApp thread for a case from its ops events, truthful by construction. */
export function threadOf(events: OpsEvent[]): PhoneMsg[] {
  const isWa = (e: OpsEvent) => e.data?.channel === 'whatsapp' || (e.data?.args as { channel?: string } | undefined)?.channel === 'whatsapp';
  return events
    .filter((e) => e.kind === 'message' && isWa(e) && e.detail)
    .filter((e) => e.actor === 'tenant' || (e.actor === 'human' && e.status === 'sent') || (e.actor === 'agent' && e.status === 'verified'))
    .map((e) => ({ side: e.actor === 'tenant' ? 'me' : 'them', text: e.detail ?? '', ts: e.ts }) as PhoneMsg);
}

const TICKS = `<svg class="wa-ticks" viewBox="0 0 16 11" width="16" height="11" aria-label="Read"><path fill="currentColor" d="M11.07.65 10.4.1a.37.37 0 0 0-.52.06L4.6 6.66 2.12 4.4a.37.37 0 0 0-.52.03l-.6.63a.37.37 0 0 0 .02.53l3.3 3.06c.16.15.4.13.54-.04l6.27-7.44a.37.37 0 0 0-.06-.52Zm4 0L14.4.1a.37.37 0 0 0-.52.06L8.6 6.66l-.75-.7-.97 1.15 1.62 1.5c.16.15.4.13.54-.04l6.27-7.44a.37.37 0 0 0-.06-.52Z"/></svg>`;

const TICK1 = `<svg class="wa-tick1" viewBox="0 0 12 11" width="12" height="11" aria-label="Sent"><path fill="currentColor" d="M11.07.65 10.4.1a.37.37 0 0 0-.52.06L4.6 6.66 2.12 4.4a.37.37 0 0 0-.52.03l-.6.63a.37.37 0 0 0 .02.53l3.3 3.06c.16.15.4.13.54-.04l6.27-7.44a.37.37 0 0 0-.06-.52Z"/></svg>`;
export function bubbleHtml(m: PhoneMsg, simulated = false) {
  const via = m.via ?? (simulated && m.side === 'them' ? SIMULATED : '');
  return `<div class="wa-b ${m.side}"><span class="wa-txt">${esc(m.text)}</span>${via ? `<span class="wa-via">${esc(via)}</span>` : ''}<span class="wa-meta">${esc(clock(m.ts))}${m.side === 'me' ? (simulated ? TICK1 : TICKS) : ''}</span></div>`;
}

const ICON = {
  back: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z"/></svg>`,
  call: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>`,
  emoji: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.2a8.2 8.2 0 1 1 0-16.4 8.2 8.2 0 0 1 0 16.4zM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 17.5c2.3 0 4.3-1.4 5-3.5H7c.7 2.1 2.7 3.5 5 3.5z"/></svg>`,
  attach: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16.5 6.5v10a4.5 4.5 0 0 1-9 0V5a3 3 0 0 1 6 0v10.5a1.5 1.5 0 0 1-3 0V6.5H9V15.5a3 3 0 0 0 6 0V5a4.5 4.5 0 0 0-9 0v11.5a6 6 0 0 0 12 0v-10z" transform="rotate(45 12 12)"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 8.8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM20 6h-3.2l-1.8-2H9L7.2 6H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-8 13a6.2 6.2 0 1 1 0-12.4A6.2 6.2 0 0 1 12 19z"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 15a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v7a3 3 0 0 0 3 3zm5.3-3a5.3 5.3 0 0 1-10.6 0H5a7 7 0 0 0 6 6.9V22h2v-3.1a7 7 0 0 0 6-6.9z"/></svg>`,
  verified: `<svg viewBox="0 0 24 24" width="15" height="15" aria-label="Verified business"><path fill="#25d366" d="M12 1l2.6 2.1 3.3-.4 1 3.2 3 1.5-.9 3.2 1.6 2.9-2.5 2.2-.2 3.3-3.3.5L14.6 22 12 20.1 9.4 22l-1.9-2.5-3.3-.5-.2-3.3L1.5 13.5l1.6-2.9-.9-3.2 3-1.5 1-3.2 3.3.4z"/><path fill="#0b141a" d="M10.5 15.6 7 12.1l1.4-1.4 2.1 2.1 5-5 1.4 1.4z"/></svg>`,
};

/** The phone: status bar, WhatsApp Business header, the thread and the (inert) input bar. */
export function waPhone(o: { taskId: string; initial: PhoneMsg[]; simulated: boolean }) {
  return `<aside class="wa-device" id="wa-device" aria-label="The tenant's WhatsApp, as they see it" data-task="${esc(o.taskId)}" data-simulated="${o.simulated ? '1' : ''}">
<div class="wa-screen">
  <div class="wa-status"><span class="wa-clock" id="wa-clock">${esc(clock())}</span><span class="wa-island"></span><span class="wa-sys"><svg viewBox="0 0 18 12" width="17" height="11"><path fill="currentColor" d="M1 9h2v3H1zm4-2h2v5H5zm4-2h2v7H9zm4-3h2v10h-2z"/></svg><svg viewBox="0 0 16 12" width="15" height="11"><path fill="currentColor" d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .9 3.4L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.1-1.2a6.9 6.9 0 0 0-9.4 0l1.1 1.2c1-.9 2.2-1.4 3.6-1.4zM8 9a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 8 9z"/></svg><span class="wa-batt"><i></i></span></span></div>
  <header class="wa-head">${ICON.back}<div class="wa-ava" aria-hidden="true">NL</div><div class="wa-who"><b>Northbridge Lettings ${ICON.verified}</b><span id="wa-presence">online</span></div><span class="wa-acts">${ICON.video}${ICON.call}</span></header>
  <div class="wa-chat" id="wa-chat" role="log" aria-live="polite"><div class="wa-day">Today</div>${o.initial.map((m) => bubbleHtml(m, o.simulated)).join('')}</div>
  <div class="wa-input" aria-hidden="true"><div class="wa-pill">${ICON.emoji}<span class="wa-ph">Message</span>${ICON.attach}${ICON.camera}</div><span class="wa-mic">${ICON.mic}</span></div>
  <div class="wa-home"></div>
</div></aside>`;
}

export const WA_PHONE_CSS = `${CURSOR_CSS}
@media (min-width:860px){ main{ max-width:1180px; padding-right:calc(var(--s6) + 340px); } }
.wa-device{position:fixed;right:40px;bottom:32px;z-index:20;width:300px;height:min(620px,calc(100vh - 64px));padding:11px;border-radius:52px;
  background:linear-gradient(145deg,#3a3d40,#16181a 40%,#2b2e31);box-shadow:0 0 0 1.5px #55595d inset,0 0 0 4px #0c0d0e inset,0 40px 80px -20px rgba(8,12,10,.55),0 18px 36px -18px rgba(8,12,10,.5);
  transform:perspective(1400px) rotateY(-9deg) rotateX(3deg) rotateZ(.6deg);transform-origin:right bottom;transition:transform .5s cubic-bezier(.2,.8,.2,1);animation:wa-enter .9s cubic-bezier(.16,1,.3,1) both;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.wa-device:hover{transform:perspective(1400px) rotateY(0) rotateX(0)}
.wa-screen{position:relative;height:100%;border-radius:42px;overflow:hidden;display:flex;flex-direction:column;background:#0b141a;color:#e9edef}
.wa-status{display:flex;align-items:center;justify-content:space-between;height:40px;padding:6px 24px 0 30px;background:#1f2c34;font-size:14px;font-weight:600;flex:none}
.wa-island{position:absolute;left:50%;top:10px;width:92px;height:26px;margin-left:-46px;border-radius:20px;background:#000}
.wa-sys{display:flex;gap:5px;align-items:center}
.wa-batt{position:relative;width:23px;height:11px;border:1.5px solid rgba(233,237,239,.55);border-radius:3.5px;padding:1px}.wa-batt i{display:block;height:100%;width:78%;background:#e9edef;border-radius:1.5px}
.wa-batt::after{content:"";position:absolute;right:-4px;top:2.5px;width:2px;height:4px;border-radius:0 2px 2px 0;background:rgba(233,237,239,.55)}
.wa-head{display:flex;align-items:center;gap:8px;padding:6px 10px 10px 4px;background:#1f2c34;color:#aebac1;flex:none}
.wa-ava{width:36px;height:36px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:13px;font-weight:700;letter-spacing:.5px;color:#fff;background:linear-gradient(135deg,#1f6f5c,#0f4c3f)}
.wa-who{display:flex;flex-direction:column;min-width:0;flex:1;line-height:1.2}.wa-who b{display:flex;align-items:center;gap:4px;color:#e9edef;font-size:14.5px;font-weight:600;white-space:nowrap;letter-spacing:-.2px;min-width:0}.wa-who b svg{flex:none}
.wa-who span{font-size:12.5px;color:#8696a0;transition:color .2s}.wa-who span.typing{color:#25d366}
.wa-acts{display:flex;gap:10px;margin-left:2px;color:#aebac1;flex:none}.wa-acts svg{width:18px;height:18px}.wa-head>svg{flex:none}
.wa-chat{flex:1;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;gap:3px;padding:10px 12px 12px;
  background-color:#0b141a;background-image:radial-gradient(rgba(134,150,160,.07) 1.2px,transparent 1.6px),radial-gradient(circle at 70% 30%,rgba(134,150,160,.05) 2.5px,transparent 3px),linear-gradient(45deg,transparent 47%,rgba(134,150,160,.035) 48%,rgba(134,150,160,.035) 52%,transparent 53%);background-size:18px 18px,44px 44px,30px 30px;background-position:0 0,11px 7px,0 0}
.wa-chat::-webkit-scrollbar{display:none}
.wa-day{align-self:center;margin:4px 0 8px;padding:5px 12px;border-radius:8px;background:#182229;color:#8696a0;font-size:12px;box-shadow:0 1px .5px rgba(11,20,26,.13)}
.wa-b{position:relative;max-width:82%;padding:6px 8px 8px 9px;border-radius:8px;font-size:14.2px;line-height:19px;white-space:pre-wrap;overflow-wrap:anywhere;box-shadow:0 1px .5px rgba(11,20,26,.13);margin-top:6px}
.wa-b.them{align-self:flex-start;background:#202c33;border-top-left-radius:0}
.wa-b.me{align-self:flex-end;background:#005c4b;border-top-right-radius:0}
.wa-b.them::before,.wa-b.me::before{content:"";position:absolute;top:0;width:8px;height:13px}
.wa-b.them::before{left:-8px;background:#202c33;clip-path:polygon(0 0,100% 0,100% 100%)}
.wa-b.me::before{right:-8px;background:#005c4b;clip-path:polygon(0 0,100% 0,0 100%)}
.wa-meta{float:right;display:inline-flex;align-items:center;gap:3px;margin:8px 0 -5px 10px;font-size:11px;line-height:15px;color:rgba(233,237,239,.6)}
.wa-b.them .wa-meta{color:#8696a0}
.wa-ticks{color:#53bdeb}
.wa-via{display:block;margin-top:5px;padding-top:4px;border-top:1px solid rgba(134,150,160,.25);font-size:11.5px;line-height:15px;color:#ffd279}
.wa-tick1{color:rgba(233,237,239,.6)}
.wa-b.new{animation:wa-pop .35s cubic-bezier(.2,.9,.3,1.2) both;transform-origin:left top}
.wa-typing{align-self:flex-start;display:inline-flex;gap:4px;padding:11px 12px;background:#202c33;border-radius:8px;border-top-left-radius:0;margin-top:6px}
.wa-typing i{width:7px;height:7px;border-radius:50%;background:#8696a0;animation:wa-dot 1.1s infinite}.wa-typing i:nth-child(2){animation-delay:.15s}.wa-typing i:nth-child(3){animation-delay:.3s}
.wa-input{display:flex;align-items:center;gap:6px;padding:6px 8px 4px;background:#0b141a;flex:none}
.wa-pill{flex:1;display:flex;align-items:center;gap:10px;height:42px;padding:0 12px;border-radius:21px;background:#1f2c34;color:#8696a0}
.wa-ph{flex:1;font-size:15px}
.wa-mic{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#00a884;color:#0b141a;flex:none}
.wa-home{height:22px;flex:none;background:#0b141a;position:relative}.wa-home::after{content:"";position:absolute;left:50%;bottom:7px;width:110px;height:4px;margin-left:-55px;border-radius:3px;background:#e9edef;opacity:.85}
@keyframes wa-enter{from{opacity:0;transform:perspective(1400px) rotateY(-9deg) rotateX(3deg) translate(40px,120px)}to{opacity:1}}
@keyframes wa-pop{from{opacity:0;transform:scale(.85) translateY(8px)}to{opacity:1;transform:none}}
@keyframes wa-dot{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
.wa-sent{display:flex;gap:var(--s2);align-items:baseline;flex-wrap:wrap;padding:var(--s3) var(--s4);border:1px solid var(--border-subtle);border-radius:8px;background:var(--surface)}
.wa-chip{display:inline-block;margin:0 0 var(--s2);padding:4px 12px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--fg);font:inherit;font-size:13px;cursor:pointer}
.wa-chip:hover{background:var(--bg-hover)}
@media (prefers-reduced-motion:reduce){.wa-device,.wa-b.new,.wa-typing i{animation:none}.wa-device,.wa-device:hover{transform:none;transition:none}}
@media (max-width:640px){.wa-device{position:static;transform:none;width:300px;height:600px;margin:var(--s6) auto 0;animation:none}main{padding-right:var(--s4)}}
@media (max-width:859px) and (min-width:641px){.wa-device{position:static;transform:none;margin:var(--s6) auto 0;animation:none}}
`;

/**
 * Client side: keeps the clock, loads the case's real WhatsApp thread, pre-fills a suggested draft from
 * `?draft=`, and sends the page's WhatsApp form with fetch so the reply lands on the phone without a reload.
 * Without JavaScript the form posts normally and the server redirects back.
 */
export const WA_PHONE_JS = `${CURSOR_JS}
(() => {
  const dev = document.getElementById('wa-device'); if (!dev) return;
  const chat = document.getElementById('wa-chat'), presence = document.getElementById('wa-presence'), clk = document.getElementById('wa-clock');
  const fmt = (iso) => { const d = iso ? new Date(iso) : new Date(); return isNaN(d) ? '' : d.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }); };
  setInterval(() => { clk.textContent = fmt(); }, 15000);
  const sim = dev.dataset.simulated === '1';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ticks = () => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', sim ? '0 0 12 11' : '0 0 16 11'); s.setAttribute('width', sim ? '12' : '16'); s.setAttribute('height', '11'); s.setAttribute('class', sim ? 'wa-tick1' : 'wa-ticks'); const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('fill', 'currentColor'); p.setAttribute('d', 'M11.07.65 10.4.1a.37.37 0 0 0-.52.06L4.6 6.66 2.12 4.4a.37.37 0 0 0-.52.03l-.6.63a.37.37 0 0 0 .02.53l3.3 3.06c.16.15.4.13.54-.04l6.27-7.44a.37.37 0 0 0-.06-.52Z' + (sim ? '' : 'm4 0L14.4.1a.37.37 0 0 0-.52.06L8.6 6.66l-.75-.7-.97 1.15 1.62 1.5c.16.15.4.13.54-.04l6.27-7.44a.37.37 0 0 0-.06-.52Z')); s.appendChild(p); return s; };
  const bubble = (m, animate) => {
    const b = document.createElement('div'); b.className = 'wa-b ' + (m.side === 'me' ? 'me' : 'them') + (animate && !reduce ? ' new' : '');
    const t = document.createElement('span'); t.className = 'wa-txt'; t.textContent = m.text; b.appendChild(t);
    if (sim && m.side !== 'me') { const v = document.createElement('span'); v.className = 'wa-via'; v.textContent = 'Simulated delivery'; b.appendChild(v); }
    const meta = document.createElement('span'); meta.className = 'wa-meta'; meta.textContent = fmt(m.ts); if (m.side === 'me') meta.appendChild(ticks()); b.appendChild(meta);
    return b;
  };
  const toBottom = () => { chat.scrollTop = chat.scrollHeight; };
  toBottom();
  // The real thread from the case's events. The server-rendered tenant message stays when the case has no
  // WhatsApp messages from the tenant (for example a case that started on another channel).
  fetch('/ops/api/tasks/' + encodeURIComponent(dev.dataset.task) + '/thread', { headers: { accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (!d || !Array.isArray(d.thread) || !d.thread.length) return;
      const hasMine = d.thread.some((m) => m.side === 'me');
      const keep = hasMine ? [] : [...chat.querySelectorAll('.wa-b')];
      chat.querySelectorAll('.wa-b').forEach((b) => { if (!keep.includes(b)) b.remove(); });
      d.thread.forEach((m) => chat.appendChild(bubble(m, false)));
      toBottom();
    }).catch(() => {});

  const form = document.getElementById('wa-form'); if (!form) return;
  const ta = form.querySelector('textarea');
  const draft = new URLSearchParams(location.search).get('draft');
  const fromShow = new URLSearchParams(location.search).get('from') === 'show';
  if (draft) {
    ta.value = draft;

  }
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const btn = form.querySelector('button[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const r = await fetch(form.action, { method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || 'Not sent');
      presence.textContent = 'typing…'; presence.classList.add('typing');
      const dots = document.createElement('div'); dots.className = 'wa-typing'; dots.innerHTML = '<i></i><i></i><i></i>'; chat.appendChild(dots); toBottom();
      await wait(800);
      dots.remove(); presence.textContent = 'online'; presence.classList.remove('typing');
      chat.appendChild(bubble({ side: 'them', text: d.message.text, ts: d.message.ts }, true)); toBottom();
      await wait(350);
      const done = document.createElement('div'); done.className = 'block wa-sent'; done.setAttribute('role', 'status');
      const p = document.createElement('span'); p.textContent = 'Sent. Recorded on the case.'; done.appendChild(p);
      const a = document.createElement('a'); const show = new URLSearchParams(location.search).get('from') === 'show';
      a.href = show ? '/ops/show#fastforward' : d.caseUrl; a.textContent = show ? 'Back to the overview' : 'See the case'; done.appendChild(a);
      const decide = document.getElementById('decide'); if (decide) (decide.closest('details') || decide).remove();
      form.replaceWith(done); a.focus({ preventScroll: true });
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Send on WhatsApp';
      let err = form.querySelector('.wa-err'); if (!err) { err = document.createElement('p'); err.className = 'tag danger wa-err'; err.setAttribute('role', 'alert'); form.appendChild(err); }
      err.textContent = (e && e.message) || 'Not sent. Try again.';
    }
  });
})();
// Demo autoplay (?auto=1, reached from the show page): read the question, then the cursor sends the drafted
// reply through the real form (same submit handler as a click) and returns to the overview.
(() => {
  const DC = window.DemoCursor; if (!DC || !DC.AUTO) return;
  const back = '/ops/show?auto=1#fastforward';
  const waitFor = async (fn, ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = fn(); if (v) return v; await DC.sleep(100); } return null; };
  (async () => {
    await DC.sleep(1200);
    const form = document.getElementById('wa-form');
    DC.enter();
    if (form) {
      const ta = form.querySelector('textarea'), btn = form.querySelector('button[type=submit]');
      if (ta) { await DC.moveTo(ta, 'start'); ta.focus({ preventScroll: true }); try { ta.setSelectionRange(ta.value.length, ta.value.length); } catch {} await DC.sleep(650); }
      await DC.moveTo(btn); await DC.hover(btn); await DC.click(btn);
      if (form.requestSubmit) form.requestSubmit(btn); else btn.click();
      const link = await waitFor(() => document.querySelector('.wa-sent a'), 20000);
      if (!link) return; // the error stays on screen; nothing is faked
      await DC.sleep(1200);
      await DC.moveTo(link); await DC.hover(link); await DC.click(link); DC.go(back);
    } else {
      // Already answered (demo not reset): the page shows its own way back.
      const link = document.querySelector('a[href="/ops/show#fastforward"]'); if (!link) return;
      await DC.moveTo(link); await DC.hover(link); await DC.click(link); DC.go(back);
    }
  })();
})();
`;
