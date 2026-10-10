import { PROVENANCE, STOP, type StopReason, lastRun, needsReason, provenanceOf, stopReason } from './status.js';
import type { HumanTask, OpsCase, OpsEvent, OpsRun } from './store.js';
import { type Brief, fallbackBrief } from './brief.js';
import { type PhoneMsg, WA_PHONE_CSS, WA_PHONE_JS, reallyDelivered, waPhone } from './waPhone.js';

/**
 * Server-rendered operations portal, built to `reports/Agent console UX patterns.md`:
 *   - colour only for states that need someone (needs you, problem, policy stop); everything else is plain text
 *   - one stop reason per case and four provenance labels per action, the same on every page
 *   - decisions in SBAR order with the agent's recommendation after the evidence and nothing pre-selected
 * Everything that came from a case, a call or a model goes through esc().
 */

export const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const LONDON = { timeZone: 'Europe/London' } as const;
export const time = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { ...LONDON, hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '').toLowerCase();
const day = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { ...LONDON, day: 'numeric', month: 'short' });
export const ago = (iso: string) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} days ago`;
};
const parseDate = (s?: string | null) => {
  const m = s?.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 23), +(m[5] ?? 59))) : undefined;
};
/** "2026-10-12 09:00" as people say it: "Mon 12 Oct, 9:00am". */
export const humanDate = (s?: string | null) => {
  const d = parseDate(s);
  if (!d) return s ?? '';
  const date = d.toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' });
  return /[ T]\d{2}:\d{2}/.test(s!) ? `${date}, ${d.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '').toLowerCase()}` : date;
};
const until = (s?: string | null) => {
  const d = parseDate(s);
  if (!d) return '';
  const h = Math.round((d.getTime() - Date.now()) / 3_600_000);
  if (h < 0) return h > -48 ? `${-h} h overdue` : `${Math.round(-h / 24)} days overdue`;
  return h < 48 ? `in ${h} h` : `in ${Math.round(h / 24)} days`;
};
const overdue = (s?: string | null) => (parseDate(s)?.getTime() ?? Infinity) < Date.now();
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

const TEAM: Record<string, string> = { fraud: 'Fraud', legal: 'Legal', safeguarding: 'Safeguarding', accounts: 'Accounts', compliance: 'Compliance', maintenance: 'Maintenance', management: 'Management' };
const PRIORITY: Record<string, string> = { P1: 'Urgent now', P2: 'Today', P3: 'Next working day' };

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&display=swap" rel="stylesheet">`;

const DARK = `--bg:#161a18; --surface:#1d2220; --bg-hover:#242a27;
  --fg:#e7ebe7; --fg-muted:#a5ada7; --border-subtle:#2b322e; --border:#3d4540; --accent:#8cc0e6;
  --needs-fg:#f0b766; --needs-bg:#33270f; --needs-border:#7a5520;
  --danger-fg:#ff8f85; --danger-bg:#361c1a; --danger-border:#7d3530;
  --policy-fg:#c7b2f0; --policy-bg:#251f33; --policy-border:#584a7a;
  --ok-fg:#7cc6a0; --info-fg:#8cc0e6; --info-bg:#17263a;`;

export const BASE_CSS = `
:root {
  --bg:#f6f7f5; --surface:#fff; --bg-hover:#eef0ec;
  --fg:#1d2320; --fg-muted:#566059; --border-subtle:#e3e6e1; --border:#c9cec7; --accent:#1f4f73;
  --needs-fg:#8a4b00; --needs-bg:#fdf0dc; --needs-border:#e2a85a;
  --danger-fg:#a3221a; --danger-bg:#fbe9e7; --danger-border:#e39a93;
  --policy-fg:#5b3f8c; --policy-bg:#f1ecf8; --policy-border:#bfaee0;
  --ok-fg:#2e6b4f; --info-fg:#1f4f73; --info-bg:#e7eff6;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:24px; --s6:32px; --s7:48px;
  --sans:"Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif; --mono:ui-monospace, SFMono-Regular, Menlo, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ${DARK} } }
:root[data-theme="dark"] { ${DARK} }
* { box-sizing:border-box; }
html { -webkit-text-size-adjust:100%; }
body { margin:0; background:var(--bg); color:var(--fg); font:400 14px/20px var(--sans); }
a { color:var(--accent); text-underline-offset:2px; }
:focus-visible { outline:2px solid var(--accent); outline-offset:2px; border-radius:4px; }
.num, table, time, .meta { font-variant-numeric:tabular-nums; }
h1, h2, h3, p { margin:0; }
.top { display:flex; align-items:center; gap:var(--s5); padding:var(--s4) var(--s6); border-bottom:1px solid var(--border-subtle); }
.top .brand { font-weight:600; color:var(--fg); text-decoration:none; margin-right:auto; }
.top a.nav { color:var(--fg-muted); text-decoration:none; white-space:nowrap; } .top a.nav:hover, .top a.nav[aria-current] { color:var(--fg); }
.top .count { margin-left:6px; padding:0 7px; border-radius:10px; background:var(--needs-bg); color:var(--needs-fg); border:1px solid var(--needs-border); font-size:12px; font-weight:600; }
main { max-width:960px; margin:0 auto; padding:var(--s6) var(--s6) var(--s7); }
main.wide { max-width:1200px; }
.crumbs { font-size:13px; line-height:18px; color:var(--fg-muted); margin-bottom:var(--s4); } .crumbs a { color:var(--fg-muted); }
.hero { font-size:24px; line-height:32px; font-weight:600; letter-spacing:-.005em; max-width:44ch; }
.sub { color:var(--fg-muted); margin-top:var(--s2); max-width:70ch; }
section { margin-top:var(--s7); }
section > h2, .h2 { font-size:16px; line-height:24px; font-weight:600; margin-bottom:var(--s3); }
h3 { font-size:14px; line-height:20px; font-weight:600; }
.muted { color:var(--fg-muted); } .small { font-size:13px; line-height:18px; } .caption { font-size:12px; line-height:16px; color:var(--fg-muted); }
.prose { font-size:16px; line-height:24px; max-width:70ch; }

.tag { display:inline-flex; align-items:center; gap:6px; font-size:12px; line-height:16px; font-weight:600; padding:2px 8px; border-radius:10px; border:1px solid transparent; white-space:nowrap; }
.tag.needs { color:var(--needs-fg); background:var(--needs-bg); border-color:var(--needs-border); }
.tag.danger { color:var(--danger-fg); background:var(--danger-bg); border-color:var(--danger-border); }
.tag.policy { color:var(--policy-fg); background:var(--policy-bg); border-color:var(--policy-border); }
.tag.info { color:var(--info-fg); background:var(--info-bg); }
.plain { color:var(--fg-muted); font-size:13px; }
.prov { font-size:12px; line-height:16px; font-weight:600; white-space:nowrap; }
.prov.ok { color:var(--ok-fg); } .prov.danger { color:var(--danger-fg); } .prov.policy { color:var(--policy-fg); }
.live { display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--info-fg); margin-right:8px; vertical-align:1px; animation:pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 50% { opacity:.3; } }
@media (prefers-reduced-motion: reduce) { .live { animation:none; } }

/* Rows: inbox, watch list */
.rows { list-style:none; margin:0; padding:0; border-top:1px solid var(--border-subtle); }
.rows > li { border-bottom:1px solid var(--border-subtle); }
.rows a.row { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:var(--s1) var(--s5); padding:var(--s3) var(--s2); color:inherit; text-decoration:none; }
.rows a.row:hover { background:var(--bg-hover); }
.row .what { font-weight:600; } .row .where { color:var(--fg-muted); font-size:13px; line-height:18px; }
.row .side { text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:var(--s1); }
.group-label { font-size:13px; line-height:18px; font-weight:600; color:var(--danger-fg); margin:var(--s4) 0 var(--s2); }
.card { display:block; background:var(--surface); border:1px solid var(--needs-border); border-radius:8px; padding:var(--s4); margin-top:var(--s5); color:inherit; text-decoration:none; }
.card:hover { background:var(--bg-hover); }
.card .caption { color:var(--needs-fg); font-weight:600; }

/* Summary list (facts) */
dl.facts { display:grid; grid-template-columns:max-content minmax(0,1fr); margin:var(--s5) 0 0; border-top:1px solid var(--border-subtle); }
dl.facts dt, dl.facts dd { padding:var(--s2) 0; border-bottom:1px solid var(--border-subtle); margin:0; }
dl.facts dt { color:var(--fg-muted); padding-right:var(--s5); }
dl.facts ul { margin:0; padding-left:18px; }

/* Timeline */
ol.turns { list-style:none; margin:0; padding:0; }
.turn { display:grid; grid-template-columns:88px minmax(0,1fr); gap:0 var(--s4); padding:var(--s4) 0; border-top:1px solid var(--border-subtle); }
.turn .when { color:var(--fg-muted); font-size:12px; line-height:16px; padding-top:2px; }
.turn .actor { color:var(--fg-muted); font-weight:400; }
ul.acts { list-style:none; margin:var(--s2) 0 0; padding:0; }
ul.acts li { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:var(--s4); padding:var(--s1) 0; }
ul.acts .why { display:block; color:var(--fg-muted); font-size:13px; line-height:18px; }
details > summary { cursor:pointer; list-style:none; color:var(--accent); }
details > summary::-webkit-details-marker { display:none; }
details > summary::before { content:'▸ '; color:var(--fg-muted); } details[open] > summary::before { content:'▾ '; }
.quote { margin:var(--s2) 0 0; padding:var(--s3) var(--s4); background:var(--surface); border-left:3px solid var(--border); border-radius:0 6px 6px 0; white-space:pre-wrap; font-size:14px; line-height:20px; max-width:70ch; }
.outcome { margin-top:var(--s2); color:var(--fg-muted); max-width:70ch; } .outcome b { color:var(--fg); font-weight:600; }
pre, .log { font:13px/18px var(--mono); }
pre { white-space:pre-wrap; background:var(--surface); border:1px solid var(--border-subtle); padding:var(--s3); border-radius:6px; max-height:460px; overflow:auto; margin:var(--s2) 0 0; }
table.log { border-collapse:collapse; width:100%; margin-top:var(--s2); }
table.log td, table.log th { text-align:left; vertical-align:top; padding:6px var(--s3) 6px 0; border-bottom:1px solid var(--border-subtle); font-weight:400; }
table.log th { color:var(--fg-muted); font-family:var(--sans); font-weight:600; font-size:12px; }

/* Decision page */
.decide-col { max-width:640px; }
ul.keyfacts { list-style:none; margin:var(--s4) 0 0; padding:0; }
ul.keyfacts li { padding:6px 0; border-bottom:1px solid var(--border-subtle); }
ul.keyfacts .src { font-size:12px; color:var(--fg-muted); white-space:nowrap; margin-left:6px; }
p.unknown { margin-top:var(--s3); padding:var(--s2) var(--s3); background:var(--needs-bg); border:1px solid var(--needs-border); border-radius:6px; }
p.unknown b { color:var(--needs-fg); }
p.suggest, p.why { margin-top:var(--s2); color:var(--fg-muted); max-width:70ch; } p.suggest b, p.why b { color:var(--fg); }
.block.tight { margin-top:var(--s5); }
.quote.asked { margin-top:var(--s4); }
ol.story { list-style:none; margin:0; padding:0; border-left:2px solid var(--border-subtle); }
ol.story li { display:grid; grid-template-columns:64px minmax(0,1fr); gap:var(--s3); padding:5px 0 5px var(--s3); position:relative; }
ol.story li::before { content:''; position:absolute; left:-5px; top:11px; width:8px; height:8px; border-radius:50%; background:var(--border); }
ol.story li:last-child::before { background:var(--needs-fg); }
ol.story .when { color:var(--fg-muted); font-size:13px; font-variant-numeric:tabular-nums; }
details.fullbrief > summary { font-size:14px; }
.block { margin-top:var(--s6); }
.block > h2 { font-size:16px; line-height:24px; font-weight:600; margin-bottom:var(--s2); }
ul.list { margin:0; padding-left:20px; max-width:70ch; } ul.list li { margin:2px 0; }
ul.marked { list-style:none; margin:0; padding:0; max-width:72ch; } ul.marked li { display:grid; grid-template-columns:130px minmax(0,1fr); gap:var(--s3); padding:var(--s1) 0; }
.evidence { display:grid; gap:var(--s4); }
.evidence h3 { font-size:13px; line-height:18px; color:var(--fg-muted); margin-bottom:var(--s1); }
.reco { margin-top:var(--s6); padding:var(--s4); background:var(--surface); border:1px solid var(--border-subtle); border-radius:8px; max-width:72ch; }
.reco .caption { font-weight:600; color:var(--fg); font-size:13px; }
fieldset { border:0; padding:0; margin:0; }
legend { font-size:16px; line-height:24px; font-weight:600; margin-bottom:var(--s2); padding:0; }
.option { display:grid; grid-template-columns:20px minmax(0,1fr); gap:var(--s3); align-items:start; padding:var(--s3) var(--s4); background:var(--surface); border:1px solid var(--border-subtle); border-radius:8px; margin-bottom:var(--s2); cursor:pointer; max-width:72ch; }
.option:hover { background:var(--bg-hover); } .option:has(input:checked) { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent) inset; }
.option input { margin:3px 0 0; accent-color:var(--accent); width:16px; height:16px; }
.option .conseq { display:block; font-size:13px; line-height:18px; color:var(--fg-muted); margin-top:2px; }
.option .conseq.hard { color:var(--danger-fg); }
label.field { display:block; font-weight:600; margin:var(--s5) 0 var(--s2); }
input[type=text], textarea { width:100%; max-width:72ch; padding:var(--s2) var(--s3); border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--fg); font:inherit; }
textarea { min-height:80px; resize:vertical; }
.reason-hint { font-size:13px; color:var(--danger-fg); margin-top:var(--s1); display:none; } .needs-reason .reason-hint { display:block; }
button.primary { font:inherit; font-weight:600; min-height:36px; padding:var(--s2) var(--s4); border-radius:6px; border:0; background:var(--accent); color:var(--surface); cursor:pointer; }
button.primary[disabled] { opacity:.45; cursor:not-allowed; }
button.secondary { font:inherit; min-height:32px; padding:6px var(--s3); border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--fg); cursor:pointer; }
.actions-row { display:flex; gap:var(--s4); align-items:center; flex-wrap:wrap; margin-top:var(--s5); }

@media (max-width: 640px) {
  .top { padding:var(--s3) var(--s4); gap:var(--s4); } main { padding:var(--s5) var(--s4) var(--s7); }
  .hero { font-size:20px; line-height:28px; }
  .turn { grid-template-columns:1fr; } .turn .when { padding-bottom:var(--s1); }
  .rows a.row { grid-template-columns:1fr; } .row .side { align-items:flex-start; text-align:left; flex-direction:row; flex-wrap:wrap; }
  dl.facts { grid-template-columns:1fr; } dl.facts dt { border-bottom:0; padding-bottom:0; }
  ul.marked li { grid-template-columns:1fr; gap:0; }
}
`;

export function layout(title: string, body: string, o: { openTasks?: number; refresh?: boolean; current?: 'decisions' | 'evals'; wide?: boolean; css?: string } = {}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>${o.refresh ? '<meta http-equiv="refresh" content="8">' : ''}${FONTS}<style>${BASE_CSS}${o.css ?? ''}</style></head>
<body><nav class="top" aria-label="Main"><a class="brand" href="/ops">Dwelly operations</a>
<a class="nav" href="/ops"${o.current === 'decisions' ? ' aria-current="page"' : ''}>Decisions${o.openTasks ? `<span class="count">${o.openTasks}</span>` : ''}</a>
<a class="nav" href="/ops/show">Demo</a><a class="nav" href="/ops/evals"${o.current === 'evals' ? ' aria-current="page"' : ''}>Eval runs</a><a class="nav" href="/admin">Voice calls</a></nav>
<main${o.wide ? ' class="wide"' : ''}>${body}</main></body></html>`;
}

export const stopTag = (r: StopReason, quietUnlessProblem = false) => {
  const s = STOP[r];
  if (!s.tone || (quietUnlessProblem && s.tone !== 'danger')) return `<span class="plain">${r === 'working' ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(s.label)}</span>`;
  return `<span class="tag ${s.tone}">${r === 'working' ? '<span class="live" aria-hidden="true" style="margin:0"></span>' : ''}${esc(s.label)}</span>`;
};
export const provTag = (e: OpsEvent) => {
  const p = PROVENANCE[provenanceOf(e)];
  return `<span class="prov ${p.tone}">${p.glyph} ${esc(p.label)}</span>`;
};

// ---- Who has the ball ---------------------------------------------------------------------------------

/** "{Who has the ball} until {when}: {why}", the hero line of a case. */
export function ball(c: OpsCase, events: OpsEvent[], open: HumanTask[]): string {
  if (c.status === 'queued') return 'Queued for the case worker.';
  if (c.status === 'agent_working') return 'The case worker has it now.';
  if (c.status === 'failed') return 'Nobody has it: the case worker did not finish. Someone needs to pick it up.';
  const t = open[0];
  if (t) return `You have it${t.context.deadline ? ` until ${humanDate(t.context.deadline)}` : ''}: ${TEAM[t.team] ?? t.team} needs to decide.`;
  if (c.status === 'closed') return 'Closed.';
  const run = lastRun(events);
  const decision = [...run].reverse().find((e) => e.kind === 'decision');
  const next = ((decision?.data?.next_actions as { type: string; recipient: string }[] | undefined) ?? []).find((n) => n.type !== 'WAIT' && n.recipient !== 'internal');
  const follow = [...run].reverse().find((e) => e.kind === 'follow_up');
  const args = (follow?.data?.args ?? {}) as { due_on?: string; review_on?: string };
  const due = args.due_on ?? args.review_on;
  const who = next ? `The ${next.recipient.split(',').at(-1)!.trim().replace(/^the /i, '')}` : 'Someone else';
  return `${who} has it${due ? ` until ${humanDate(due)}` : ''}: the case worker is waiting for a reply.`;
}

// ---- Inbox --------------------------------------------------------------------------------------------

const firstSentence = (s: string, max = 160) => {
  const t = s.split(/(?<=[.;])\s/)[0];
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

function needsRow(t: HumanTask, c?: OpsCase) {
  const d = t.context.deadline;
  return `<li><a class="row" href="/ops/tasks/${esc(t.id)}"><div><div class="what">${esc(t.question)}</div>
<div class="where">${esc([c?.property, c?.title].filter(Boolean).join(', '))}</div>${t.recommendation ? `<div class="where" style="margin-top:2px">Agent suggests: ${esc(firstSentence(t.recommendation, 120))}</div>` : ''}</div>
<div class="side"><span class="tag needs">${d ? esc(until(d)) : esc(PRIORITY[t.priority] ?? t.priority)}</span><span class="caption">${esc(TEAM[t.team] ?? t.team)}</span><span class="small" style="color:var(--accent);font-weight:600">Decide</span></div></a></li>`;
}

export function inboxPage(o: { tasks: HumanTask[]; cases: OpsCase[]; events: Record<string, OpsEvent[]> }) {
  const byId = new Map(o.cases.map((c) => [c.id, c]));
  const open = o.tasks.filter((t) => t.status === 'open' && byId.has(t.case_id));
  // Past deadline pinned first, then deadline, then priority, then age.
  const sorted = [...open].sort(
    (a, b) => (parseDate(a.context.deadline)?.getTime() ?? Infinity) - (parseDate(b.context.deadline)?.getTime() ?? Infinity) || a.priority.localeCompare(b.priority) || a.created_at.localeCompare(b.created_at),
  );
  const late = sorted.filter((t) => overdue(t.context.deadline));
  const onTime = sorted.filter((t) => !overdue(t.context.deadline));
  const watch = o.cases.filter((c) => c.status !== 'closed' && !open.some((t) => t.case_id === c.id));
  const done = o.cases.filter((c) => c.status === 'closed');
  const latest = o.cases.map((c) => c.updated_at).sort().at(-1);
  const heading = open.length ? `${plural(open.length, 'decision')} ${open.length === 1 ? 'needs' : 'need'} you` : 'Nothing needs you right now';
  const watchRow = (c: OpsCase) => {
    const ev = o.events[c.id] ?? [];
    return `<li><a class="row" href="/ops/cases/${esc(c.id)}"><div><div class="what" style="font-weight:400">${esc(c.title)}</div><div class="where">${esc(ball(c, ev, []))}</div></div>
<div class="side">${stopTag(stopReason(c, ev, []), true)}<span class="caption">${esc(ago(c.updated_at))}</span></div></a></li>`;
  };
  return layout(
    'Decisions: Dwelly operations',
    `<h1 class="hero">${esc(heading)}</h1>
<p class="sub">${open.length ? `${late.length ? `${late.length} past deadline. ` : ''}The agents stopped on these because they need a person’s judgement or authority.` : `The agents are handling every open case.${latest ? ` Last agent activity ${esc(time(latest))}.` : ''}`}</p>
${late.length ? `<div class="group-label">Past deadline</div><ul class="rows">${late.map((t) => needsRow(t, byId.get(t.case_id))).join('')}</ul>` : ''}
${onTime.length ? `<ul class="rows" style="margin-top:var(--s5)">${onTime.map((t) => needsRow(t, byId.get(t.case_id))).join('')}</ul>` : ''}
<section><h2>Watch</h2>${watch.length ? `<p class="small muted" style="margin:-6px 0 var(--s3)">Someone else has the ball. Only problems are marked.</p><ul class="rows">${watch.map(watchRow).join('')}</ul>` : '<p class="muted">No open cases.</p>'}</section>
${done.length ? `<section><details><summary>${plural(done.length, 'closed case')}</summary><ul class="rows" style="margin-top:var(--s3)">${done.map(watchRow).join('')}</ul></details></section>` : ''}
<section><details><summary class="small">Open a case for a demo</summary>
<form method="post" action="/ops/api/public-case" class="actions-row" style="margin-top:var(--s3)"><label class="small" for="case">Public case number, or P and a practice case</label>
<input id="case" type="text" name="case" placeholder="021 or P10" required style="width:140px"><input type="text" name="after" placeholder="After event (optional)" aria-label="After event" style="width:180px"><button class="secondary" type="submit">Hand it over</button></form></details></section>`,
    { openTasks: open.length, current: 'decisions', refresh: o.cases.some((c) => c.status === 'agent_working' || c.status === 'queued') },
  );
}

// ---- Case page --------------------------------------------------------------------------------------

type Turn = { at: string; heading: string; actor: string; kind: 'agent' | 'call' | 'human' | 'system'; events: OpsEvent[] };

export function turnsOf(events: OpsEvent[]): Turn[] {
  const turns: Turn[] = [];
  for (const e of events) {
    if (e.kind === 'human_task') continue;
    const cur = turns.at(-1);
    if (e.kind === 'case_opened') turns.push({ at: e.ts, heading: e.title, actor: 'System', kind: 'system', events: [] });
    else if (e.kind === 'run_started') {
      const trigger = e.title.replace(/^Case worker started:\s*/, '');
      const human = trigger.match(/^acting on (.+)'s decision$/)?.[1];
      turns.push({ at: e.ts, heading: human ? `Acted on ${human}’s decision` : trigger === 'new case' ? 'Picked up the case' : /after the call/.test(trigger) ? 'Followed up after the call' : trigger, actor: 'AI case worker', kind: 'agent', events: [] });
    } else if (e.kind === 'human_decision') turns.push({ at: e.ts, heading: 'Decided', actor: e.title.replace(/ decided: .*/, ''), kind: 'human', events: [e] });
    else if (e.kind === 'call') turns.push({ at: e.ts, heading: e.title, actor: 'AI voice agent', kind: 'call', events: [e] });
    else if (cur) cur.events.push(e);
    else turns.push({ at: e.ts, heading: 'Earlier', actor: 'System', kind: 'system', events: [e] });
  }
  return turns;
}

function actLine(e: OpsEvent, tasks: HumanTask[]) {
  const d = (e.data ?? {}) as Record<string, any>;
  if (e.kind === 'run_failed') return `<li><span>${esc(e.title)}<span class="why">${esc(e.detail)}</span></span><span class="prov danger">✕ Failed</span></li>`;
  if (e.kind === 'blocked') return `<li><span>Tried to ${esc(String(d.tool ?? 'act').replace(/_/g, ' '))}<span class="why">${esc(e.detail)}</span></span>${provTag(e)}</li>`;
  if (e.kind === 'escalation') {
    const t = tasks.find((x) => e.title.includes(x.question.slice(0, 40)));
    return `<li><span>Asked a person: ${esc(e.title.replace(/^Escalated \w+ (to \w+|on the call): /, ''))}${t ? ` <a href="/ops/tasks/${esc(t.id)}">${t.status === 'open' ? 'Decide' : 'See decision'}</a>` : ''}</span>${provTag(e)}</li>`;
  }
  const why = d.tool === 'record_landlord_decision' && d.args?.evidence_quote ? `“${d.args.evidence_quote}”` : d.tool === 'hold_payment' ? d.args?.reason : e.status !== 'verified' ? e.detail : '';
  if (e.kind === 'message') return `<li><details><summary style="color:var(--fg)">${esc(e.title)}</summary><div class="quote">${esc(e.detail)}</div></details>${provTag(e)}</li>`;
  return `<li><span>${esc(e.title)}${why ? `<span class="why">${esc(why)}</span>` : ''}</span>${provTag(e)}</li>`;
}

function turnHtml(t: Turn, tasks: HumanTask[]) {
  const outcome = t.events.find((e) => e.kind === 'decision');
  const lines = t.events.filter((e) => !['decision', 'call', 'human_decision'].includes(e.kind));
  let body = '';
  if (t.kind === 'call') {
    const d = (t.events[0].data ?? {}) as Record<string, any>;
    body = `<p class="prose" style="margin-top:var(--s2)">${esc(t.events[0].detail)}</p>${d.transcript ? `<details style="margin-top:var(--s2)"><summary class="small">Transcript</summary><pre>${esc(d.transcript)}</pre></details>` : ''}`;
  }
  if (t.kind === 'human') {
    const h = t.events[0];
    body = `<div class="quote">${esc(h.title.replace(/^.* decided: /, ''))}${h.detail ? `\n\n${esc(h.detail)}` : ''}</div>`;
  }
  if (lines.length) body += `<ul class="acts">${lines.map((e) => actLine(e, tasks)).join('')}</ul>`;
  if (outcome) body += `<p class="outcome"><b>Outcome.</b> ${esc(outcome.detail)}</p>`;
  if (t.kind === 'agent' && !lines.length && !outcome) body += '<p class="outcome"><span class="live" aria-hidden="true"></span>Working</p>';
  return `<li class="turn"><div class="when"><time>${esc(time(t.at))}</time><br>${esc(day(t.at))}</div><div><h3>${esc(t.heading)} <span class="actor">· ${esc(t.actor)}</span></h3>${body}</div></li>`;
}

export function casePage(o: { c: OpsCase; events: OpsEvent[]; tasks: HumanTask[]; runs: OpsRun[]; openTasks: number }) {
  const { c, events, tasks } = o;
  const open = tasks.filter((t) => t.status === 'open');
  const reason = stopReason(c, events, tasks);
  const decision = [...lastRun(events)].reverse().find((e) => e.kind === 'decision');
  const d = (decision?.data ?? {}) as Record<string, any>;
  const follow = events.filter((e) => e.kind === 'follow_up' && e.status === 'verified').map((e) => (e.data?.args ?? {}) as { due_on?: string; review_on?: string; purpose?: string; comment?: string; reason?: string });
  const coming = follow.map((a) => ({ when: a.due_on ?? a.review_on, what: a.purpose ?? a.comment ?? a.reason ?? '' })).filter((x) => x.when).sort((a, b) => String(a.when).localeCompare(String(b.when)));
  const li = (xs?: string[]) => (xs?.length ? `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<span class="muted">None</span>');
  return layout(
    `${c.title}: Dwelly operations`,
    `<div class="crumbs">${c.batch_id ? `<a href="/ops/evals/${esc(c.batch_id)}">Eval run</a>` : '<a href="/ops">Decisions</a>'} / ${esc(c.title)}</div>
<h1 class="hero">${c.status === 'agent_working' ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(ball(c, events, open))}</h1>
<div style="margin-top:var(--s3)">${stopTag(reason)}</div>
${open.map((t) => `<a class="card" href="/ops/tasks/${esc(t.id)}"><span class="caption">Your decision${t.context.deadline ? `, ${esc(until(t.context.deadline))}` : ''}</span><div class="what" style="margin-top:2px;font-weight:600">${esc(t.question)}</div></a>`).join('')}
<dl class="facts"><dt>Case</dt><dd>${esc(c.title)}</dd>${c.property ? `<dt>Property</dt><dd>${esc(c.property)}</dd>` : ''}<dt>Opened</dt><dd>${esc(day(c.created_at))}, ${esc(time(c.created_at))}, ${esc(c.source === 'voice' ? 'from a phone call' : c.source === 'practice' ? 'practice case' : 'public example')}</dd>
${d.case_state ? `<dt>Where it stands</dt><dd>${esc(d.case_state)}</dd>` : ''}${d.missing_info?.length || d.conflicts?.length ? `<dt>Not established</dt><dd>${li([...(d.missing_info ?? []), ...(d.conflicts ?? [])])}</dd>` : ''}${d.boundaries?.length ? `<dt>Does not mean</dt><dd>${li(d.boundaries)}</dd>` : ''}</dl>
${coming.length ? `<section><h2>Coming up</h2><ul class="marked">${coming.map((x) => `<li><span class="num">${esc(humanDate(x.when))}</span><span>${esc(x.what)}</span></li>`).join('')}</ul></section>` : ''}
<section><h2>What happened</h2><ol class="turns">${turnsOf(events).map((t) => turnHtml(t, tasks)).join('')}</ol></section>
<section><details><summary>Full agent log</summary>
<table class="log"><tr><th>Time</th><th>Kind</th><th>Tool</th><th>Status</th><th>Detail</th></tr>${events
      .map((e) => `<tr><td>${esc(time(e.ts))}</td><td>${esc(e.kind)}</td><td>${esc((e.data as { tool?: string } | null)?.tool ?? '')}</td><td>${esc(e.status ?? '')}</td><td>${esc(e.title)}${(e.data as { args?: unknown } | null)?.args ? `<br><span class="muted">${esc(JSON.stringify((e.data as { args: unknown }).args))}</span>` : ''}</td></tr>`)
      .join('')}</table>
${o.runs.length ? `<p class="small" style="margin-top:var(--s4)">Reports: ${o.runs.filter((r) => r.answer_md).map((r) => `<a href="/ops/runs/${esc(r.id)}/answer">answer</a> and <a href="/ops/runs/${esc(r.id)}/reasoning">reasoning</a> (${esc(r.trigger)})`).join('; ')}</p>` : ''}
<p class="small muted" style="margin-top:var(--s4)">The case as the agent reads it:</p><pre>${esc(c.files ? Object.entries(c.files).map(([n, t]) => `=== ${n}\n${t}`).join('\n\n') : c.history_md)}</pre></details></section>`,
    { openTasks: o.openTasks, refresh: c.status === 'agent_working' || c.status === 'queued' },
  );
}

// ---- Decision page, SBAR order -----------------------------------------------------------------------

/** The triggering event(s) from the recent history, quoted with who, channel and time. */
function triggers(recent?: string) {
  if (!recent) return [];
  return recent
    .split(/^### /m)
    .filter((b) => b.trim())
    .map((b) => {
      const [head, ...rest] = b.split('\n');
      const body = rest.join('\n');
      const f = (n: string) => body.match(new RegExp(`^- \\*\\*${n}:\\*\\* (.*)$`, 'm'))?.[1]?.trim();
      return { head: head.trim(), channel: f('Channel'), from: f('From'), text: body.replace(/^- \*\*\w+:\*\* .*$/gm, '').trim() };
    });
}

export function taskPage(o: { t: HumanTask; c: OpsCase; openTasks: number; error?: string; from?: string; brief?: Brief }) {
  const { t, c } = o;
  const x = t.context;
  const reco = t.recommendation?.trim();
  const evts = triggers(x.recent_history);
  // Organiser-format cases: the latest message that did not come from the agency. File-based cases have no
  // ordered history, so quote the case's own task instead of guessing which file triggered it.
  const task = c.files ? c.index_md.match(/## Task\s+([\s\S]*?)(\n## |$)/)?.[1]?.trim() : undefined;
  const trigger = task ? { head: 'The case', from: '', channel: '', text: task } : ([...evts].reverse().find((e) => e.text && !/^(Agency|.*system)/i.test(e.from ?? '')) ?? evts.at(-1));
  const facts = (x.known ?? '').split(/(?<=[.;])\s+(?=[A-Z0-9£])/).map((s) => s.trim()).filter(Boolean);
  const unverified = [...(x.missing ? [x.missing] : []), ...(x.conflicts ?? [])];
  const cannot = (x.missing_info ?? []).filter((m) => !x.missing?.includes(m));
  const done = (x.next_actions ?? []).filter((n) => n.type !== 'ESCALATE_TO_HUMAN');
  const PROV: Record<string, string> = { verified: '<span class="prov ok">✓ Confirmed</span>', failed: '<span class="prov danger">✕ Failed</span>' };
  const options = [
    ...(reco ? [reco] : []),
    ...t.options.filter((op) => op.trim() && op.trim() !== reco),
    'Ask the agent for more information first',
    'Hold, and come back to it on a date (say when in the reason)',
    'Something else (say what in the reason)',
  ];
  const consequence = (op: string) =>
    /^Ask the agent/.test(op)
      ? 'The case worker gathers what is missing and asks you again. Nothing changes meanwhile.'
      : /^Hold/.test(op)
        ? 'Nothing happens until the date you give. Safe to undo.'
        : /^Something else/.test(op)
          ? 'The case worker follows your written instruction.'
          : needsReason(op)
            ? 'May move money, change records or affect someone’s tenancy. Hard to undo: give a reason.'
            : 'The case worker carries this out and tells the people involved.';
  const show = o.from === 'show';
  const B = o.brief ?? fallbackBrief(t);
  const said = B.said ?? (trigger?.text && !task ? { text: trigger.text.slice(0, 300), source: [trigger.from, trigger.channel, trigger.head].filter(Boolean).join(', ') } : undefined);
  const simulated = !reallyDelivered(c.id);
  const name = show ? ' value="Iona"' : '';
  // The tenant's side of the thread as the page knows it; the phone's script replaces it with the case's real WhatsApp thread.
  const tenantSaid = trigger && !task && (/tenant/i.test(trigger.from ?? '') || /whatsapp/i.test(trigger.channel ?? '')) ? trigger : undefined;
  const phoneInitial: PhoneMsg[] = [
    ...(tenantSaid?.text ? [{ side: 'me' as const, text: tenantSaid.text.replace(/^[^\n]*\(\+?\d[\d\s]*\):\n/, '').slice(0, 600), via: undefined }] : []),
    ...(t.decision?.choice === 'Answered the tenant on WhatsApp' ? [{ side: 'them' as const, text: t.decision.note, ts: t.resolved_at ?? undefined }] : []),
  ];
  const decideForm = `<form class="block" method="post" action="/ops/tasks/${esc(t.id)}/decide" id="decide">
${o.error ? `<p class="tag danger" role="alert" style="margin-bottom:var(--s3)">${esc(o.error)}</p>` : ''}
<fieldset><legend>Your decision</legend>
${options
  .map((op, i) => `<label class="option"><input type="radio" name="choice" value="${esc(op)}" data-hard="${needsReason(op) ? '1' : ''}" required><span>${esc(op)}${i === 0 && reco ? ' <span class="caption">(agent’s recommendation)</span>' : ''}<span class="conseq${needsReason(op) ? ' hard' : ''}">${esc(consequence(op))}</span></span></label>`)
  .join('')}</fieldset>
<div id="reason-wrap"><label class="field" for="note">Reason, and anything the agent should know</label><textarea id="note" name="note" placeholder="For example: approved up to £250; ask for photos when done."></textarea><p class="reason-hint">This option is hard to undo. Write at least a sentence on why.</p></div>
<label class="field" for="by">Your name</label><input id="by" type="text" name="by" required autocomplete="name"${name} style="max-width:320px">
<div class="actions-row"><button class="primary" type="submit" id="send" disabled>Choose an option</button><span class="small muted">The case worker carries it out, tells the people involved and records it on the case.</span></div></form>`;
  const waForm = `<form class="block" id="wa-form" method="post" action="/ops/tasks/${esc(t.id)}/whatsapp${o.from ? `?from=${esc(encodeURIComponent(o.from))}` : ''}"><h2>Reply to the tenant on WhatsApp</h2>
<textarea id="wa" name="text" required placeholder="Hi, …" aria-label="Message to the tenant" style="margin-top:var(--s2)">${esc(B.reply ?? '')}</textarea>
${show ? `<input id="wa-by" type="hidden" name="by" value="Iona"><p class="small muted" style="margin-top:var(--s2)">Replying as Iona</p>` : `<label class="field" for="wa-by">Your name</label><input id="wa-by" type="text" name="by" required autocomplete="name"${name} style="max-width:320px">`}
<div class="actions-row"><button class="primary" type="submit">Send on WhatsApp</button></div></form>`;
  const decideJs = `<script>
(() => {
  const f = document.getElementById('decide'), send = document.getElementById('send'), note = document.getElementById('note'), wrap = document.getElementById('reason-wrap');
  const update = () => {
    const c = f.querySelector('input[name=choice]:checked');
    const hard = !!c && c.dataset.hard === '1';
    wrap.classList.toggle('needs-reason', hard);
    note.required = hard; note.minLength = hard ? 10 : 0;
    send.disabled = !c || (hard && note.value.trim().length < 10);
    send.textContent = !c ? 'Choose an option' : 'Send: ' + (c.value.length > 48 ? c.value.slice(0, 46) + '…' : c.value);
  };
  f.addEventListener('change', update); note.addEventListener('input', update); update();
})();
</script>`;
  return layout(
    `Decide: ${t.question}`,
    `<div class="crumbs"><a href="/ops">Decisions</a> / <a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a></div>
<div class="decide-col">
<h1 class="hero">${esc(B.question)}</h1>
<p class="sub meta">${esc(c.title.replace(/:.*$/, ''))}${c.property ? `, ${esc(c.property)}` : ''}. For ${esc(TEAM[t.team] ?? t.team)}, ${x.deadline ? `decide ${esc(until(x.deadline))}` : esc((PRIORITY[t.priority] ?? t.priority).toLowerCase())}.</p>
${said ? `<div class="quote asked"><span class="caption">${esc(said.source)}</span>\n${esc(said.text)}</div>` : ''}
${B.timeline.length ? `<div class="block tight"><h2>The case so far</h2><ol class="story">${B.timeline.map((e) => `<li><span class="when">${esc(e.when)}</span><span>${esc(e.what)}</span></li>`).join('')}</ol></div>` : ''}
<div class="block tight"><h2>What we know</h2><ul class="keyfacts">${B.facts.map((f) => `<li>${esc(f.text)} <span class="src">${esc(f.source)}</span></li>`).join('')}</ul>
<p class="unknown"><b>Not known yet:</b> ${esc(B.unknown)}</p>
<p class="why"><b>Why it needs you:</b> ${esc(B.why)}</p>
<p class="suggest"><b>Agent suggests:</b> ${esc(B.suggest)}</p></div>
${t.status === 'open' ? (B.reply || show ? waForm + `<details class="block"><summary>Other decisions</summary>${decideForm}</details>` : decideForm + `<details class="block"><summary>Reply to the tenant on WhatsApp instead</summary>${waForm}</details>`) + decideJs : t.decision?.choice === 'Answered the tenant on WhatsApp'
      ? `<div class="block"><h2>Answered on WhatsApp</h2><p class="muted">${esc(t.decision.by)} replied to the tenant ${esc(t.resolved_at ? ago(t.resolved_at) : '')}. ${c.batch_id ? 'Recorded on the case.' : 'Recorded on the case, and the agent has it again.'}</p>${show ? '<p style="margin-top:var(--s3)"><a class="primary" style="display:inline-block;text-decoration:none;padding:8px 16px;border-radius:6px;background:var(--accent);color:var(--surface);font-weight:600" href="/ops/show#fastforward">Back to the overview</a></p>' : `<p style="margin-top:var(--s3)"><a href="/ops/cases/${esc(c.id)}">See the case</a></p>`}</div>`
      : `<div class="block"><h2>Decided</h2><div class="quote"><span class="caption">${esc(t.decision?.by)}, ${esc(t.resolved_at ? ago(t.resolved_at) : '')}</span>\n${esc(t.decision?.choice)}${t.decision?.note ? `\n\n${esc(t.decision.note)}` : ''}</div><p style="margin-top:var(--s3)"><a href="/ops/cases/${esc(c.id)}">See what the case worker did next</a></p></div>`}
<details class="block fullbrief"><summary>Everything the agent saw</summary>
<div class="block"><h2>Why this came to you</h2>
${x.case_state ? `<p style="max-width:70ch">${esc(x.case_state)}</p>` : ''}
${trigger ? `<div class="quote"><span class="caption">${esc([trigger.from, trigger.channel, trigger.head].filter(Boolean).join(', '))}</span>\n${esc(trigger.text.slice(0, 1200))}</div>` : ''}
${x.call?.summary ? `<div class="quote"><span class="caption">From the phone call</span>\n${esc(x.call.summary)}</div>` : ''}
${evts.length > 1 || x.call?.transcript ? `<details style="margin-top:var(--s2)"><summary class="small">${x.call?.transcript ? 'Call transcript and ' : ''}latest case events, word for word</summary>${x.call?.transcript ? `<pre>${esc(x.call.transcript)}</pre>` : ''}<pre>${esc(x.recent_history ?? '')}</pre></details>` : ''}</div>

<div class="block"><h2>Already done, and deliberately not done</h2><ul class="marked">
${done.map((n) => `<li>${PROV[n.status] ?? '<span class="prov danger">◐ Not confirmed</span>'}<span>${esc(n.action)} <span class="muted">(${esc(n.recipient)}, ${esc(n.channel)})</span></span></li>`).join('')}
${(x.blocked ?? []).map((b) => `<li><span class="prov policy">⊘ Denied by policy</span><span>${esc(b.tool.replace(/_/g, ' '))}: <span class="muted">${esc(b.reason)}</span></span></li>`).join('')}
${(x.boundaries ?? []).map((b) => `<li><span class="caption" style="font-weight:600">Not done</span><span>${esc(b)}</span></li>`).join('')}
${!done.length && !x.blocked?.length && !x.boundaries?.length ? '<li><span></span><span class="muted">Nothing yet.</span></li>' : ''}</ul></div>

<div class="block"><h2>Evidence</h2><div class="evidence">
${facts.length ? `<div><h3>Established</h3><ul class="list">${facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
${unverified.length ? `<div><h3>Unverified or conflicting</h3><ul class="list">${unverified.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
${cannot.length ? `<div><h3>Could not check: your knowledge needed</h3><ul class="list">${cannot.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
</div></div>

${reco ? `<div class="reco"><div class="caption">Agent recommends</div><p style="margin-top:var(--s1)">${esc(reco)}</p><p class="small muted" style="margin-top:var(--s2)">The agent can be wrong. Check it against the evidence above before you choose.</p></div>` : `<div class="reco"><div class="caption">Needs your judgement</div><p class="small muted" style="margin-top:var(--s1)">The agent did not have enough to recommend an option.</p></div>`}

</details>
</div>
${waPhone({ taskId: t.id, initial: phoneInitial, simulated })}
<script>${WA_PHONE_JS}</script>`,
    { openTasks: o.openTasks, current: 'decisions', css: WA_PHONE_CSS },
  );
}

export const textPage = (title: string, text: string) => layout(title, `<div class="crumbs"><a href="/ops">Decisions</a></div><pre>${esc(text)}</pre>`);
