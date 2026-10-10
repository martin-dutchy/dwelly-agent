import { DEMO_TENANT } from './demo.js';
import { ball, esc, layout, provTag, stopTag } from './pages.js';
import { stopReason } from './status.js';
import type { HumanTask, OpsCase, OpsEvent } from './store.js';
import type { Bubble } from './whatsapp.js';

/**
 * The demo, one screen: the tenant's WhatsApp on the left, the scenario on the right with what the agents are
 * doing right now. Every step runs the real case worker; nothing on this page is scripted output.
 */

const CSS = `
.demo { display:grid; grid-template-columns:360px minmax(0,1fr); gap:var(--s6); align-items:start; }
.phone { position:sticky; top:var(--s4); border:1px solid var(--border); border-radius:28px; background:#0b141a; overflow:hidden; height:640px; display:flex; flex-direction:column; color:#e9edef; }
.phone header { display:flex; align-items:center; gap:var(--s3); padding:var(--s3) var(--s4); background:#202c33; }
.phone .avatar { width:32px; height:32px; border-radius:50%; background:#2a3942; display:grid; place-items:center; font-weight:600; font-size:13px; }
.phone .who { font-weight:600; font-size:14px; } .phone .sub2 { font-size:12px; color:#8696a0; }
.chat { flex:1; overflow-y:auto; padding:var(--s4) var(--s3); display:flex; flex-direction:column; gap:6px; background:#0b141a; }
.b { max-width:82%; padding:6px 10px 4px; border-radius:8px; font-size:14px; line-height:19px; white-space:pre-wrap; word-wrap:break-word; }
.b.in { align-self:flex-end; background:#005c4b; border-top-right-radius:2px; }
.b.out { align-self:flex-start; background:#202c33; border-top-left-radius:2px; }
.b .t { display:block; text-align:right; font-size:11px; color:#8696a0; margin-top:2px; }
.typing { align-self:flex-start; background:#202c33; border-radius:8px; padding:8px 12px; font-size:13px; color:#8696a0; }
.compose { display:flex; gap:var(--s2); padding:var(--s2); background:#202c33; }
.compose input { flex:1; border:0; border-radius:20px; padding:9px 14px; background:#2a3942; color:#e9edef; font:inherit; }
.compose button { border:0; border-radius:50%; width:40px; height:40px; background:#00a884; color:#0b141a; font-weight:700; cursor:pointer; }
.suggest { display:flex; flex-wrap:wrap; gap:6px; padding:0 var(--s3) var(--s2); background:#0b141a; }
.suggest button { font:inherit; font-size:12px; border:1px solid #2a3942; background:transparent; color:#8696a0; border-radius:14px; padding:3px 10px; cursor:pointer; }
.empty-chat { margin:auto; text-align:center; color:#8696a0; font-size:13px; max-width:240px; }
ol.steps { list-style:none; margin:0; padding:0; counter-reset:step; }
ol.steps > li { counter-increment:step; display:grid; grid-template-columns:28px minmax(0,1fr); gap:var(--s3); padding:var(--s4) 0; border-top:1px solid var(--border-subtle); }
ol.steps > li::before { content:counter(step); width:24px; height:24px; border-radius:50%; border:1px solid var(--border); display:grid; place-items:center; font-size:12px; font-weight:600; color:var(--fg-muted); }
ol.steps > li.done::before { content:'✓'; color:var(--ok-fg); border-color:var(--ok-fg); }
ol.steps h3 { margin-bottom:2px; }
ol.steps p { color:var(--fg-muted); max-width:62ch; }
ol.steps form { margin-top:var(--s2); display:flex; gap:var(--s2); flex-wrap:wrap; align-items:center; }
.now { background:var(--surface); border:1px solid var(--border-subtle); border-radius:8px; padding:var(--s4); margin-bottom:var(--s5); }
.now .hero { font-size:18px; line-height:26px; }
ul.recent { list-style:none; margin:var(--s3) 0 0; padding:0; } ul.recent li { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:var(--s3); padding:3px 0; font-size:13px; line-height:18px; }
@media (max-width: 900px) { .demo { grid-template-columns:1fr; } .phone { position:static; height:520px; } }
`;

const hhmm = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });

export function demoPage(o: { c?: OpsCase; events: OpsEvent[]; tasks: HumanTask[]; bubbles: Bubble[]; canDial: boolean; openTasks: number }) {
  const { c, events, tasks } = o;
  const working = c?.status === 'agent_working';
  const has = (re: RegExp) => events.some((e) => re.test(e.title));
  const done = {
    msg: o.bubbles.some((b) => b.dir === 'in'),
    quote: has(/HeatRight Ltd: quote/),
    call: events.some((e) => e.kind === 'call'),
    human: events.some((e) => e.kind === 'human_decision'),
  };
  const open = tasks.filter((t) => t.status === 'open');
  const recent = events.filter((e) => ['action', 'message', 'follow_up', 'escalation', 'blocked'].includes(e.kind) && e.actor !== 'tenant' && e.actor !== 'contractor').slice(-6);
  const step = (cls: string, title: string, text: string, form = '') => `<li class="${cls}"><div><h3>${title}</h3><p>${text}</p>${form}</div></li>`;
  return layout(
    'Demo: no hot water at Flat 9',
    `<div class="crumbs"><a href="/ops">Decisions</a> / Demo</div>
<h1 class="hero">Friday 6pm: no hot water at Flat 9</h1>
<p class="sub">Every step runs the real AI case worker and voice agent with the same tools, policy checks and read-back as production. Staff only see what needs a person.</p>
<div class="demo" style="margin-top:var(--s5)">
<div class="phone" aria-label="Tenant's WhatsApp">
  <header><div class="avatar">NL</div><div><div class="who">Northbridge Lettings</div><div class="sub2">${working ? 'typing…' : 'WhatsApp Business'}</div></div></header>
  <div class="chat" id="chat">${
    o.bubbles.length
      ? o.bubbles.map((b) => `<div class="b ${b.dir}">${esc(b.text)}<span class="t">${esc(hhmm(b.ts))}${b.dir === 'in' ? ' ✓✓' : ''}</span></div>`).join('')
      : `<div class="empty-chat">You are ${esc(DEMO_TENANT.name)}, the tenant. Message the agency as you would on WhatsApp.</div>`
  }${working ? '<div class="typing">Northbridge Lettings is typing…</div>' : ''}</div>
  <div class="suggest">${['No hot water since this morning. Heating still works, no smell, nothing leaking.', 'Thanks! Monday morning is fine, I work from home.']
    .map((s) => `<button type="button" data-say="${esc(s)}">${esc(s.length > 34 ? `${s.slice(0, 32)}…` : s)}</button>`)
    .join('')}</div>
  <form class="compose" method="post" action="/ops/demo/whatsapp" id="compose"><input name="text" id="say" placeholder="Message" autocomplete="off" aria-label="Message as the tenant" required><button type="submit" aria-label="Send">➤</button></form>
</div>
<div>
${
  c
    ? `<div class="now"><div class="caption">Right now</div><div class="hero" style="margin-top:2px">${working ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(ball(c, events, open))}</div>
<div style="margin-top:var(--s2)">${stopTag(stopReason(c, events, tasks))} <a class="small" href="/ops/cases/${esc(c.id)}" style="margin-left:8px">Open the case timeline</a></div>
${recent.length ? `<ul class="recent">${recent.map((e) => `<li><span>${esc(e.title)}</span>${e.kind === 'blocked' || e.actor === 'agent' ? provTag(e) : ''}</li>`).join('')}</ul>` : ''}</div>`
    : ''
}
<ol class="steps">
${step(done.msg ? 'done' : '', 'The tenant messages on WhatsApp', 'The case worker checks for danger first (gas, CO, water near electrics), gives interim advice, and opens the job. It replies in the same WhatsApp thread.')}
${step(done.quote ? 'done' : '', 'HeatRight quotes £640', 'Over the landlord’s £300 limit. The agent is not allowed to approve it: a hard rule in code, not a prompt. It asks the landlord instead.', `<form method="post" action="/ops/demo/quote"><button class="secondary" type="submit" ${done.quote ? 'disabled' : ''}>Send HeatRight’s quote</button></form>`)}
${step(done.call ? 'done' : '', 'The voice agent calls the landlord', 'Ben approves HeatRight up to £700, read back and recorded with his words. Then he asks to change his payout bank account.', `<form method="post" action="/ops/demo/call">${o.canDial ? `<input type="text" name="to" placeholder="Ben's phone, +44…" style="width:180px"><button class="secondary" type="submit" name="mode" value="live">Call Ben now</button>` : ''}<button class="secondary" type="submit" name="mode" value="recorded">${o.canDial ? 'Or use the recorded call' : 'Play the recorded call'}</button></form>`)}
${step(done.human ? 'done' : open.length ? '' : '', 'A person decides the one thing that needs a person', 'Bank detail changes are never automated. The request lands in Decisions with a one-screen brief; everything else carried on without staff.', open.length ? `<form><a class="primary" style="display:inline-block;text-decoration:none;padding:8px 16px;border-radius:6px;background:var(--accent);color:var(--surface);font-weight:600" href="/ops/tasks/${esc(open[0].id)}">Open the decision</a></form>` : '')}
</ol>
<form method="post" action="/ops/demo/reset" style="margin-top:var(--s5)"><button class="secondary" type="submit">Start the demo again</button></form>
</div></div>
<script>
(() => {
  const chat = document.getElementById('chat'); chat.scrollTop = chat.scrollHeight;
  const say = document.getElementById('say');
  document.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => { say.value = b.dataset.say; say.focus(); }));
  ${working ? 'setTimeout(() => location.reload(), 2500);' : ''}
})();
</script>`,
    { openTasks: o.openTasks, wide: true, css: CSS },
  );
}
