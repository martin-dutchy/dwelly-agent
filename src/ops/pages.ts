import type { HumanTask, OpsCase, OpsEvent, OpsRun } from './store.js';

/**
 * Server-rendered operations portal. Three questions shape every page:
 *   - the person in the loop: what needs me, by when, and can I trust what I am told?
 *   - the supervisor: is anything going wrong? (exceptions, never totals)
 *   - the investigator: what happened on this case, in order, and why?
 * The page stays quiet unless something needs attention: amber = a person is needed, red = denied or failed.
 * Everything that came from a case, a call or a model goes through esc().
 */

export const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const LONDON = { timeZone: 'Europe/London' } as const;
const time = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { ...LONDON, hour: '2-digit', minute: '2-digit' });
const day = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { ...LONDON, weekday: 'short', day: 'numeric', month: 'short' });
const ago = (iso: string) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`;
};
/** Dates the agents write ("2026-10-17", "2026-10-12 09:00") as people say them. */
const humanDate = (s?: string | null) => {
  if (!s) return '';
  const m = s.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  if (!m) return s;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const date = d.toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' });
  return m[4] ? `${date}, ${m[4]}:${m[5]}` : date;
};
const firstSentence = (s: string, max = 140) => {
  const t = s.split(/(?<=[.;])\s/)[0];
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

const TEAM: Record<string, string> = { fraud: 'Fraud', legal: 'Legal', safeguarding: 'Safeguarding', accounts: 'Accounts', compliance: 'Compliance', maintenance: 'Maintenance', management: 'Management' };
const URGENCY: Record<string, string> = { P1: 'Now', P2: 'Today', P3: 'Next working day' };

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap" rel="stylesheet">`;

const STYLE = `
:root {
  --paper:#f2f4f1; --surface:#ffffff; --ink:#1d2320; --soft:#5f6862; --faint:#8b938d; --rule:#dfe3dd;
  --link:#1f4f73; --attn:#a8650f; --attn-bg:#fbf1e1; --alert:#b3261e; --alert-bg:#fbe9e7; --ok:#2e6b4f;
  --serif:"Newsreader", Georgia, serif; --sans:"Instrument Sans", -apple-system, "Segoe UI", sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --paper:#161a18; --surface:#1d2220; --ink:#e7ebe7; --soft:#a5ada7; --faint:#7b847e; --rule:#2e3531;
  --link:#8cc0e6; --attn:#e5ac58; --attn-bg:#2e2516; --alert:#ff8f85; --alert-bg:#341c1a; --ok:#7cc6a0;
} }
* { box-sizing:border-box; }
html { -webkit-text-size-adjust:100%; }
body { margin:0; background:var(--paper); color:var(--ink); font:15px/1.55 var(--sans); font-variant-numeric:tabular-nums; }
a { color:var(--link); text-underline-offset:2px; }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible { outline:2px solid var(--link); outline-offset:2px; border-radius:4px; }
.top { display:flex; align-items:baseline; gap:24px; padding:18px 24px; max-width:1120px; margin:0 auto; }
.top .brand { font-family:var(--serif); font-size:20px; color:var(--ink); text-decoration:none; margin-right:auto; }
.top a.nav { color:var(--soft); text-decoration:none; font-size:14px; } .top a.nav:hover { color:var(--ink); }
.top .count { display:inline-block; min-width:20px; padding:0 6px; margin-left:4px; border-radius:10px; background:var(--attn); color:var(--surface); font-size:12px; font-weight:600; text-align:center; }
main { max-width:1120px; margin:0 auto; padding:8px 24px 64px; }
.measure { max-width:720px; }
h1, h2, h3 { font-weight:500; margin:0; }
.ball { font-family:var(--serif); font-size:30px; line-height:1.2; letter-spacing:-.01em; margin:6px 0 10px; max-width:24ch; }
.ball.wide { max-width:32ch; }
.lede { color:var(--soft); margin:0 0 4px; }
.section { margin-top:44px; }
.section > h2 { font-size:15px; font-weight:600; margin-bottom:12px; }
.quiet { color:var(--soft); } .faint { color:var(--faint); } .small { font-size:13px; }

/* Inbox: decisions */
.decision { display:grid; grid-template-columns:4px 1fr auto; gap:0 18px; align-items:center; background:var(--surface); border-radius:10px; padding:16px 18px 16px 0; margin-bottom:10px; text-decoration:none; color:inherit; }
.decision::before { content:''; align-self:stretch; border-radius:10px 0 0 10px; background:var(--attn); }
.decision.p1::before { background:var(--alert); } .decision.p3::before { background:var(--faint); }
.decision h3 { font-family:var(--serif); font-size:20px; line-height:1.3; }
.decision:hover h3 { text-decoration:underline; text-decoration-thickness:1px; text-underline-offset:3px; }
.decision .meta { color:var(--soft); font-size:13px; margin-top:4px; }
.decision .go { font-size:14px; font-weight:600; color:var(--link); white-space:nowrap; }
.empty { background:var(--surface); border-radius:10px; padding:22px; color:var(--soft); }

/* Inbox: cases in flight */
.cases { list-style:none; margin:0; padding:0; border-top:1px solid var(--rule); }
.cases li { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:4px 20px; padding:14px 2px; border-bottom:1px solid var(--rule); }
.cases .name { font-weight:500; }
.cases .name a { color:var(--ink); text-decoration:none; } .cases .name a:hover { text-decoration:underline; }
.cases .where { color:var(--soft); font-size:14px; grid-column:1; }
.cases .when { color:var(--faint); font-size:13px; text-align:right; grid-row:1; grid-column:2; }
.flags { grid-column:2; text-align:right; }
.flag { font-size:12px; font-weight:600; padding:1px 8px; border-radius:10px; margin-left:4px; white-space:nowrap; }
.flag.alert { color:var(--alert); background:var(--alert-bg); } .flag.attn { color:var(--attn); background:var(--attn-bg); }
.live { display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--link); margin-right:6px; vertical-align:1px; animation:pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 50% { opacity:.3; } }
@media (prefers-reduced-motion: reduce) { .live { animation:none; } }

/* Case page */
.crumbs { font-size:13px; color:var(--soft); margin-bottom:18px; } .crumbs a { color:var(--soft); }
.case-head { display:grid; grid-template-columns:minmax(0,1fr) 300px; gap:40px; align-items:start; }
.case-title { font-size:15px; color:var(--soft); margin:0; }
.trust { font-size:14px; color:var(--soft); margin:0; }
.trust b { color:var(--ink); font-weight:600; } .trust .bad { color:var(--alert); font-weight:600; }
.facts { background:var(--surface); border-radius:10px; padding:18px 20px; font-size:14px; }
.facts h3 { font-size:13px; font-weight:600; color:var(--soft); margin:14px 0 4px; } .facts h3:first-child { margin-top:0; }
.facts ul { margin:0; padding-left:18px; } .facts p { margin:0; }
.ask { display:block; background:var(--attn-bg); border-radius:10px; padding:16px 18px; margin:22px 0 0; color:inherit; text-decoration:none; }
.ask .k { color:var(--attn); font-weight:600; font-size:13px; } .ask h3 { font-family:var(--serif); font-size:19px; margin-top:2px; }
.ask:hover h3 { text-decoration:underline; text-decoration-thickness:1px; }

.turns { list-style:none; margin:0; padding:0; }
.turn { display:grid; grid-template-columns:76px minmax(0,1fr); gap:0 20px; padding:18px 0; border-top:1px solid var(--rule); }
.turn .t { color:var(--faint); font-size:13px; padding-top:2px; }
.turn h3 { font-size:15px; font-weight:600; }
.turn .who { color:var(--soft); font-weight:400; }
.turn.human h3 { color:var(--attn); }
.acts { list-style:none; margin:8px 0 0; padding:0; }
.acts li { position:relative; padding:3px 0 3px 22px; }
.acts li::before { position:absolute; left:0; top:3px; width:16px; text-align:center; font-size:13px; }
.acts li.ok::before { content:'✓'; color:var(--ok); }
.acts li.open::before { content:'○'; color:var(--faint); }
.acts li.bad::before { content:'✕'; color:var(--alert); font-weight:700; }
.acts li.bad { color:var(--alert); }
.acts li.asked::before { content:'?'; color:var(--attn); font-weight:700; }
.acts li .why { display:block; color:var(--soft); font-size:13px; }
.acts li.bad .why { color:var(--alert); opacity:.85; }
details > summary { cursor:pointer; color:var(--link); font-size:13px; list-style:none; display:inline; }
details > summary::-webkit-details-marker { display:none; }
details[open] > summary { color:var(--soft); }
.letter { margin:6px 0 4px; padding:12px 16px; background:var(--surface); border-radius:8px; white-space:pre-wrap; font-family:var(--serif); font-size:16px; line-height:1.5; max-width:62ch; }
.outcome { margin-top:10px; font-size:14px; color:var(--soft); max-width:68ch; }
.outcome b { color:var(--ink); font-weight:600; }
.said { margin-top:8px; font-family:var(--serif); font-size:17px; line-height:1.45; max-width:62ch; }
pre { white-space:pre-wrap; font:12.5px/1.5 ui-monospace, Menlo, monospace; background:var(--surface); padding:14px; border-radius:8px; max-height:460px; overflow:auto; margin:8px 0 0; }
.audit { margin-top:48px; border-top:1px solid var(--rule); padding-top:18px; font-size:14px; }
.audit table { border-collapse:collapse; width:100%; font-size:13px; margin-top:8px; }
.audit td, .audit th { text-align:left; padding:6px 8px 6px 0; border-bottom:1px solid var(--rule); font-weight:400; }
.audit th { color:var(--soft); }

/* Decision page */
.memo { display:grid; grid-template-columns:minmax(0,1fr) 380px; gap:48px; align-items:start; }
.memo .q { font-family:var(--serif); font-size:32px; line-height:1.2; letter-spacing:-.01em; margin:4px 0 12px; max-width:22ch; }
.memo .by { color:var(--soft); margin:0; }
.memo .by b { color:var(--ink); font-weight:600; }
.reco { margin:28px 0 0; padding-left:16px; border-left:3px solid var(--link); max-width:60ch; }
.reco .k { font-size:13px; font-weight:600; color:var(--link); } .reco p { margin:2px 0 0; font-family:var(--serif); font-size:18px; line-height:1.45; }
form.decide { margin-top:32px; max-width:60ch; }
form.decide fieldset { border:0; padding:0; margin:0; }
form.decide legend, form.decide label.field { font-size:14px; font-weight:600; display:block; margin:22px 0 8px; }
.choice { display:flex; gap:12px; align-items:flex-start; padding:12px 14px; border-radius:8px; background:var(--surface); margin-bottom:8px; cursor:pointer; border:1.5px solid transparent; }
.choice:has(input:checked) { border-color:var(--link); }
.choice input { margin-top:4px; accent-color:var(--link); }
.choice .tag { font-size:12px; font-weight:600; color:var(--link); margin-left:6px; white-space:nowrap; }
input[type=text], textarea { width:100%; padding:10px 12px; border:1px solid var(--rule); border-radius:8px; background:var(--surface); color:var(--ink); font:inherit; }
textarea { min-height:88px; resize:vertical; }
.send { margin-top:22px; display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
button.primary { font:inherit; font-weight:600; padding:10px 18px; border-radius:8px; border:0; background:var(--link); color:var(--surface); cursor:pointer; }
.brief { background:var(--surface); border-radius:12px; padding:22px 24px; font-size:14px; }
.brief h3 { font-size:13px; font-weight:600; color:var(--soft); margin:18px 0 6px; } .brief h3:first-child { margin-top:0; }
.brief p { margin:0; } .brief ul { margin:0; padding-left:18px; } .brief li { margin:2px 0; }
.brief .unknown { background:var(--attn-bg); border-radius:8px; padding:10px 12px; margin-top:6px; }
.brief .done { list-style:none; padding:0; } .brief .done li { padding-left:20px; position:relative; }
.brief .done li::before { position:absolute; left:0; } .brief .done li.ok::before { content:'✓'; color:var(--ok); } .brief .done li.open::before { content:'○'; color:var(--faint); } .brief .done li.bad::before { content:'✕'; color:var(--alert); }
.decided { background:var(--surface); border-radius:10px; padding:18px 20px; margin-top:28px; max-width:60ch; }
.new { margin-top:56px; font-size:14px; color:var(--soft); }
.new form { display:flex; gap:10px; align-items:center; margin-top:10px; flex-wrap:wrap; }
.new input[type=text] { width:160px; }
.new button { font:inherit; padding:9px 14px; border-radius:8px; border:1px solid var(--rule); background:var(--surface); color:var(--ink); cursor:pointer; }

@media (max-width: 900px) {
  .case-head, .memo { grid-template-columns:1fr; gap:24px; }
}
@media (max-width: 600px) {
  .top, main { padding-left:16px; padding-right:16px; }
  .top { gap:14px; } .top .brand { font-size:18px; } .top a { white-space:nowrap; }
  .ball, .memo .q { font-size:25px; }
  .turn { grid-template-columns:1fr; } .turn .t { padding:0 0 2px; }
  .decision { grid-template-columns:4px 1fr; } .decision .go { display:none; }
  .cases li { grid-template-columns:1fr; } .cases .when, .flags { grid-column:1; grid-row:auto; text-align:left; }
}
`;

function layout(title: string, body: string, o: { openTasks?: number; refresh?: boolean } = {}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>${o.refresh ? '<meta http-equiv="refresh" content="6">' : ''}${FONTS}<style>${STYLE}</style></head>
<body><nav class="top" aria-label="Main"><a class="brand" href="/ops">Dwelly operations</a><a class="nav" href="/ops">Decisions${o.openTasks ? `<span class="count">${o.openTasks}</span>` : ''}</a><a class="nav" href="/admin">Voice calls</a></nav>
<main>${body}</main></body></html>`;
}

// ---- What a case is waiting on ---------------------------------------------------------------------

type Summary = { ball: string; flags: { label: string; tone: 'alert' | 'attn' }[]; live: boolean; done: number; confirmed: number; denied: number };

const latest = (events: OpsEvent[], kind: OpsEvent['kind']) => [...events].reverse().find((e) => e.kind === kind);

/** One sentence: who has the ball on this case, and until when. The most useful fact on any page. */
export function summarise(c: OpsCase, events: OpsEvent[], openTasks: HumanTask[]): Summary {
  const acts = events.filter((e) => ['action', 'message', 'follow_up', 'escalation'].includes(e.kind) && e.actor === 'agent');
  const denied = events.filter((e) => e.kind === 'blocked').length;
  const failedActs = acts.filter((e) => e.status === 'failed').length;
  const flags: Summary['flags'] = [];
  if (denied) flags.push({ label: `${denied} denied`, tone: 'alert' });
  if (failedActs) flags.push({ label: `${failedActs} failed`, tone: 'alert' });
  const base = { flags, live: c.status === 'agent_working', done: acts.length, confirmed: acts.filter((e) => e.status === 'verified').length, denied };

  if (c.status === 'agent_working') return { ...base, ball: 'The case worker is on it.' };
  if (c.status === 'failed') return { ...base, flags: [{ label: 'agent failed', tone: 'alert' }, ...flags], ball: 'The case worker could not finish. Someone needs to pick this up.' };
  const task = openTasks[0];
  if (task) {
    const by = task.context.deadline ? ` before ${humanDate(task.context.deadline)}` : '';
    return { ...base, flags: [{ label: 'needs a decision', tone: 'attn' }, ...flags], ball: `Waiting on a decision from ${TEAM[task.team] ?? task.team}${by}.` };
  }
  const decision = latest(events, 'decision');
  if (c.status === 'closed') return { ...base, ball: `Closed. ${firstSentence(decision?.detail ?? '', 120)}` };
  // Waiting on a party: who the last next action went to, and when the agent will look again.
  const next = ((decision?.data?.next_actions as { type: string; recipient: string }[] | undefined) ?? []).find((n) => n.type !== 'WAIT' && n.recipient !== 'internal');
  const follow = latest(events, 'follow_up');
  const args = (follow?.data?.args ?? {}) as { due_on?: string; review_on?: string };
  const due = args.due_on ?? args.review_on;
  const who = next ? next.recipient.split(',').at(-1)!.trim().replace(/^the /i, '') : 'a reply';
  return { ...base, ball: `Waiting on ${next ? `the ${who}` : who}.${due ? ` The case worker follows up on ${humanDate(due)}.` : ''}` };
}

const flagHtml = (flags: Summary['flags']) => flags.map((f) => `<span class="flag ${f.tone}">${esc(f.label)}</span>`).join('');

// ---- Inbox -------------------------------------------------------------------------------------------

function decisionRow(t: HumanTask, c?: OpsCase) {
  const when = t.context.deadline ? `Decide by ${humanDate(t.context.deadline)}` : `${URGENCY[t.priority] ?? t.priority}`;
  return `<a class="decision ${esc(t.priority.toLowerCase())}" href="/ops/tasks/${esc(t.id)}">
  <div><h3>${esc(t.question)}</h3><div class="meta">${esc(when)}, for ${esc(TEAM[t.team] ?? t.team)}. ${c ? esc(c.title) : ''}. Raised ${esc(ago(t.created_at))}.</div></div>
  <span class="go">Review</span></a>`;
}

export function inboxPage(o: { tasks: HumanTask[]; cases: OpsCase[]; events: Record<string, OpsEvent[]> }) {
  const byId = new Map(o.cases.map((c) => [c.id, c]));
  const open = o.tasks.filter((t) => t.status === 'open');
  const inFlight = o.cases.filter((c) => c.status !== 'closed');
  const closed = o.cases.filter((c) => c.status === 'closed');
  const row = (c: OpsCase) => {
    const s = summarise(c, o.events[c.id] ?? [], open.filter((t) => t.case_id === c.id));
    return `<li><div class="name"><a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a></div><div class="when">${esc(ago(c.updated_at))}</div>
<div class="where">${s.live ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(s.ball)}</div><div class="flags">${flagHtml(s.flags)}</div></li>`;
  };
  const heading = open.length === 0 ? 'Nothing needs a decision.' : open.length === 1 ? 'One decision is waiting on you.' : `${open.length} decisions are waiting on you.`;
  return layout(
    'Decisions: Dwelly operations',
    `<h1 class="ball wide">${esc(heading)}</h1>
<p class="lede">${open.length ? 'The agents stopped on these because they need a person’s judgement or authority. Each one has what you need to decide.' : 'The agents are handling every open case. Anything that needs a person will appear here.'}</p>
<div style="margin-top:22px">${open.map((t) => decisionRow(t, byId.get(t.case_id))).join('')}</div>
<section class="section"><h2>Open cases</h2>${inFlight.length ? `<ul class="cases">${inFlight.map(row).join('')}</ul>` : '<p class="quiet">No open cases. Calls and cases appear here as the agents pick them up.</p>'}</section>
${closed.length ? `<section class="section"><details><summary>${closed.length} closed case${closed.length === 1 ? '' : 's'}</summary><ul class="cases" style="margin-top:12px">${closed.map(row).join('')}</ul></details></section>` : ''}
<div class="new"><details><summary>Open a case for a demo</summary>
<form method="post" action="/ops/api/public-case"><label class="small" for="case">Public case number, or P and a practice case</label>
<input id="case" type="text" name="case" placeholder="021 or P10" required><input type="text" name="after" placeholder="After event (optional)" aria-label="After event"><button type="submit">Give it to the case worker</button></form></details></div>`,
    { openTasks: open.length, refresh: o.cases.some((c) => c.status === 'agent_working') },
  );
}

// ---- Case page: the case as turns ------------------------------------------------------------------

type Turn = { at: string; heading: string; who: string; kind: 'agent' | 'call' | 'human' | 'system'; events: OpsEvent[] };

const RUN_HEADING = (title: string) => {
  const trigger = title.replace(/^Case worker started:\s*/, '');
  if (/^acting on (.+)'s decision$/.test(trigger)) return `Acted on ${trigger.match(/^acting on (.+)'s decision$/)![1]}'s decision`;
  if (/after the call/.test(trigger)) return 'Followed up after the call';
  if (trigger === 'new case') return 'Picked up the case';
  return trigger.charAt(0).toUpperCase() + trigger.slice(1);
};

export function turnsOf(events: OpsEvent[]): Turn[] {
  const turns: Turn[] = [];
  for (const e of events) {
    if (e.kind === 'human_task') continue; // shown as the escalation's "asked a person" line instead
    const cur = turns.at(-1);
    if (e.kind === 'case_opened') turns.push({ at: e.ts, heading: e.title, who: '', kind: 'system', events: [] });
    else if (e.kind === 'run_started') turns.push({ at: e.ts, heading: RUN_HEADING(e.title), who: 'Case worker', kind: 'agent', events: [] });
    else if (e.kind === 'human_decision') turns.push({ at: e.ts, heading: e.title.replace(/ decided: .*/, ' decided'), who: '', kind: 'human', events: [e] });
    else if (e.kind === 'call') turns.push({ at: e.ts, heading: e.title, who: 'Voice agent', kind: 'call', events: [e] });
    else if (cur) cur.events.push(e);
    else turns.push({ at: e.ts, heading: 'Earlier', who: '', kind: 'system', events: [e] });
  }
  return turns;
}

function actLine(e: OpsEvent, tasks: HumanTask[]) {
  const d = (e.data ?? {}) as Record<string, any>;
  if (e.kind === 'blocked') return `<li class="bad">${esc(e.title)}<span class="why">${esc(e.detail)}</span></li>`;
  if (e.kind === 'run_failed') return `<li class="bad">${esc(e.title)}<span class="why">${esc(e.detail)}</span></li>`;
  if (e.kind === 'escalation') {
    const t = tasks.find((x) => e.title.includes(x.question.slice(0, 40)));
    return `<li class="asked">Asked a person: ${esc(e.title.replace(/^Escalated \w+ (to \w+|on the call): /, ''))}${t ? ` <a href="/ops/tasks/${esc(t.id)}">${t.status === 'open' ? 'Decide' : 'See decision'}</a>` : ''}</li>`;
  }
  const cls = e.status === 'verified' ? 'ok' : e.status === 'failed' ? 'bad' : 'open';
  const note = e.status === 'verified' ? '' : e.status === 'failed' ? '<span class="why">Did not go through. The agent did not report it as done.</span>' : '<span class="why">Could not be confirmed by read-back.</span>';
  if (e.kind === 'message') return `<li class="${cls}"><details><summary style="color:inherit;font-size:inherit">${esc(e.title)}</summary><div class="letter">${esc(e.detail)}</div></details>${note}</li>`;
  const why = d.tool === 'record_landlord_decision' && d.args?.evidence_quote ? `“${d.args.evidence_quote}”` : d.tool === 'hold_payment' ? d.args?.reason : '';
  return `<li class="${cls}">${esc(e.title)}${why ? `<span class="why">${esc(why)}</span>` : ''}${note}</li>`;
}

function turnHtml(t: Turn, tasks: HumanTask[]) {
  const outcome = t.events.find((e) => e.kind === 'decision');
  const lines = t.events.filter((e) => e.kind !== 'decision' && e.kind !== 'call' && e.kind !== 'human_decision');
  let body = '';
  if (t.kind === 'call') {
    const call = t.events[0];
    const d = (call.data ?? {}) as Record<string, any>;
    body = `<p class="said">${esc(call.detail)}</p>${d.transcript ? `<details><summary>Read the transcript</summary><pre>${esc(d.transcript)}</pre></details>` : ''}`;
  }
  if (t.kind === 'human') {
    const h = t.events[0];
    body = `<p class="said">${esc(h.title.replace(/^.* decided: /, ''))}</p>${h.detail ? `<p class="outcome">${esc(h.detail)}</p>` : ''}`;
  }
  if (lines.length) body += `<ul class="acts">${lines.map((e) => actLine(e, tasks)).join('')}</ul>`;
  if (outcome) body += `<p class="outcome"><b>Outcome:</b> ${esc(outcome.detail)}</p>`;
  if (t.kind === 'agent' && !lines.length && !outcome) body += '<p class="outcome"><span class="live" aria-hidden="true"></span>Working…</p>';
  return `<li class="turn ${t.kind}"><div class="t">${esc(time(t.at))}<br>${esc(day(t.at))}</div><div><h3>${esc(t.heading)}${t.who ? ` <span class="who">${esc(t.who)}</span>` : ''}</h3>${body}</div></li>`;
}

export function casePage(o: { c: OpsCase; events: OpsEvent[]; tasks: HumanTask[]; runs: OpsRun[]; openTasks: number }) {
  const { c, events, tasks } = o;
  const open = tasks.filter((t) => t.status === 'open');
  const s = summarise(c, events, open);
  const d = (latest(events, 'decision')?.data ?? {}) as Record<string, any>;
  const list = (xs?: string[]) => (xs?.length ? `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
  const trust = s.done
    ? `${s.confirmed === s.done ? `All <b>${s.done}</b> actions were confirmed by read-back.` : `<b>${s.confirmed}</b> of ${s.done} actions were confirmed by read-back.`}${s.denied ? ` <span class="bad">${s.denied} ${s.denied === 1 ? 'action was' : 'actions were'} denied.</span>` : ''}`
    : '';
  const facts = [
    d.case_state ? `<h3>Where it stands</h3><p>${esc(d.case_state)}</p>` : '',
    d.remaining_work?.length ? `<h3>Still open</h3>${list(d.remaining_work)}` : '',
    d.missing_info?.length || d.conflicts?.length ? `<h3>Not established</h3>${list([...(d.missing_info ?? []), ...(d.conflicts ?? [])])}` : '',
    d.boundaries?.length ? `<h3>The last actions do not mean</h3>${list(d.boundaries)}` : '',
  ].join('');
  return layout(
    `${c.title}: Dwelly operations`,
    `<div class="crumbs"><a href="/ops">Decisions</a> / ${esc(c.title)}</div>
<div class="case-head"><div class="measure">
<p class="case-title">${esc(c.title)}${c.property ? `, ${esc(c.property)}` : ''}</p>
<h1 class="ball">${s.live ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(s.ball)}</h1>
${trust ? `<p class="trust">${trust}</p>` : ''}
${open.map((t) => `<a class="ask" href="/ops/tasks/${esc(t.id)}"><span class="k">Your decision is needed${t.context.deadline ? ` before ${esc(humanDate(t.context.deadline))}` : ''}</span><h3>${esc(t.question)}</h3></a>`).join('')}
<section class="section"><h2>What happened</h2><ol class="turns">${turnsOf(events).map((t) => turnHtml(t, tasks)).join('')}</ol></section>
</div>${facts ? `<aside class="facts" aria-label="Current state">${facts}</aside>` : '<div></div>'}</div>
<section class="audit"><details><summary>Audit trail: case history and agent reports</summary>
${o.runs.length ? `<table><tr><th>Run</th><th>Trigger</th><th>Outcome</th><th>Cost</th><th>Reports</th></tr>${o.runs.map((r) => `<tr><td>${esc(day(r.started_at))}, ${esc(time(r.started_at))}</td><td>${esc(r.trigger)}</td><td>${r.finished_at ? esc(r.outcome) : 'running'}</td><td>${r.cost == null ? '' : `$${r.cost.toFixed(3)}`}</td><td>${r.answer_md ? `<a href="/ops/runs/${esc(r.id)}/answer">Answer</a>, <a href="/ops/runs/${esc(r.id)}/reasoning">reasoning</a>` : ''}</td></tr>`).join('')}</table>` : ''}
<p class="small quiet" style="margin-top:14px">The case as the agent reads it:</p><pre>${esc(c.files ? Object.entries(c.files).map(([n, t]) => `=== ${n}\n${t}`).join('\n\n') : c.history_md)}</pre></details></section>`,
    { openTasks: o.openTasks, refresh: s.live },
  );
}

// ---- Decision page ---------------------------------------------------------------------------------

export function taskPage(o: { t: HumanTask; c: OpsCase; openTasks: number }) {
  const { t, c } = o;
  const x = t.context;
  // The agent's recommendation leads, pre-selected; its other options follow; a free answer is always possible.
  const reco = t.recommendation?.trim();
  const options = t.options.filter((op) => op.trim() && op.trim() !== reco);
  const choices = [...(reco ? [{ v: reco, label: 'Do what the agent recommends', tag: true }] : []), ...options.map((v) => ({ v, label: v, tag: false })), { v: 'Something else (see note)', label: 'Something else (say what in the note)', tag: false }];
  // The agent's "known" is often one dense paragraph: one fact per line reads faster.
  const facts = (x.known ?? '').split(/(?<=[.;])\s+(?=[A-Z0-9£])/).map((f) => f.trim()).filter(Boolean);
  const unknown = [...(x.missing ? [x.missing] : []), ...(x.missing_info ?? []).filter((m) => !x.missing?.includes(m)), ...(x.conflicts ?? [])];
  const done = (x.next_actions ?? []).filter((n) => n.type !== 'ESCALATE_TO_HUMAN');
  const cls = (st: string) => (st === 'verified' ? 'ok' : st === 'failed' ? 'bad' : 'open');
  const due = x.deadline ? `Decide before <b>${esc(humanDate(x.deadline))}</b>.` : `Needed: <b>${esc((URGENCY[t.priority] ?? t.priority).toLowerCase())}</b>.`;
  return layout(
    `Decide: ${t.question}`,
    `<div class="crumbs"><a href="/ops">Decisions</a> / <a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a></div>
<div class="memo"><div>
<h1 class="q">${esc(t.question)}</h1>
<p class="by">${due} For ${esc(TEAM[t.team] ?? t.team)}, raised ${esc(ago(t.created_at))} by the ${t.run_id?.startsWith('call:') ? 'voice agent during a call' : 'case worker'}.</p>
${
  t.status === 'open'
    ? `${reco ? `<div class="reco"><div class="k">The agent recommends</div><p>${esc(reco)}</p></div>` : ''}
<form class="decide" method="post" action="/ops/tasks/${esc(t.id)}/decide"><fieldset><legend>Your decision</legend>
${choices.map((ch, i) => `<label class="choice"><input type="radio" name="choice" value="${esc(ch.v)}" ${i === 0 ? 'checked' : ''}><span>${esc(ch.label)}${ch.tag ? '<span class="tag">Recommended</span>' : ''}</span></label>`).join('')}</fieldset>
<label class="field" for="note">Anything the agent should know</label><textarea id="note" name="note" placeholder="For example: approved up to £250; ask for photos when done."></textarea>
<label class="field" for="by">Your name</label><input id="by" type="text" name="by" required autocomplete="name">
<div class="send"><button class="primary" type="submit">Send decision</button><span class="small quiet">The case worker carries it out, tells the people involved and records it on the case.</span></div></form>`
    : `<div class="decided"><p class="small quiet">Decided by ${esc(t.decision?.by)}, ${esc(t.resolved_at ? ago(t.resolved_at) : '')}</p><p class="said" style="margin:6px 0 0">${esc(t.decision?.choice)}</p>${t.decision?.note ? `<p class="outcome">${esc(t.decision.note)}</p>` : ''}<p style="margin:14px 0 0"><a href="/ops/cases/${esc(c.id)}">See what the case worker did next</a></p></div>`
}
</div>
<aside class="brief" aria-label="What you need to know">
${x.case_state ? `<h3>Where the case stands</h3><p>${esc(x.case_state)}</p>` : ''}
${facts.length ? `<h3>Established</h3><ul>${facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
${unknown.length ? `<h3>Not established</h3><div class="unknown"><ul>${unknown.map((u) => `<li>${esc(u)}</li>`).join('')}</ul></div>` : ''}
${done.length ? `<h3>Already done</h3><ul class="done">${done.map((n) => `<li class="${cls(n.status)}">${esc(n.action)} <span class="quiet">(${esc(n.recipient)}, ${esc(n.channel)})</span></li>`).join('')}</ul>` : ''}
${x.blocked?.length ? `<h3>The agent was not allowed to</h3><ul>${x.blocked.map((b) => `<li>${esc(b.tool.replace(/_/g, ' '))}: <span class="quiet">${esc(b.reason)}</span></li>`).join('')}</ul>` : ''}
${x.boundaries?.length ? `<h3>Nothing so far means</h3><ul>${x.boundaries.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
${x.call?.summary ? `<h3>From the call</h3><p>${esc(x.call.summary)}</p>` : ''}
${x.call?.transcript ? `<p style="margin-top:6px"><details><summary>Read the transcript</summary><pre>${esc(x.call.transcript)}</pre></details></p>` : ''}
${x.recent_history ? `<h3>Source</h3><details><summary>The latest case events, word for word</summary><pre>${esc(x.recent_history)}</pre></details>` : ''}
</aside></div>`,
    { openTasks: o.openTasks },
  );
}

export const textPage = (title: string, text: string) => layout(title, `<div class="crumbs"><a href="/ops">Decisions</a></div><pre>${esc(text)}</pre>`);
