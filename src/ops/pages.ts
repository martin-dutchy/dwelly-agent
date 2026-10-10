import type { HumanTask, OpsCase, OpsEvent, OpsRun } from './store.js';

// Server-rendered operations portal. Everything that came from a case, a call or a model goes through esc().

export const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'short', timeStyle: 'short' }) : '');
const ago = (iso: string) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`;
};

const STYLE = `
  :root { --bg:#f6f5f2; --panel:#fff; --ink:#1c1b19; --muted:#6b6860; --line:#e4e1da; --accent:#2f5d50; --ok:#1f7a4a; --bad:#b3261e; --warn:#9a6700; --chip:#eef3f1; --human:#5b4bb5; --voice:#0b6e99; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#151514; --panel:#1f1e1c; --ink:#ecebe7; --muted:#a29f96; --line:#33312d; --accent:#7fb8a4; --ok:#5cc48b; --bad:#ff8a80; --warn:#e3b341; --chip:#26302c; --human:#b3a6ff; --voice:#6cc4ea; } }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  header { display:flex; gap:18px; align-items:center; padding:12px 20px; border-bottom:1px solid var(--line); background:var(--panel); flex-wrap:wrap; position:sticky; top:0; z-index:2; }
  header h1 { font-size:16px; margin:0; } header a { color:var(--ink); text-decoration:none; font-weight:600; } header a.dim { color:var(--muted); font-weight:500; }
  main { padding:16px 20px 40px; max-width:1180px; margin:0 auto; }
  .panel { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:14px 16px; margin-bottom:16px; overflow-x:auto; }
  .panel h2 { font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); margin:0 0 10px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:16px; }
  table { border-collapse:collapse; width:100%; } th, td { text-align:left; padding:6px 8px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { font-size:12px; color:var(--muted); font-weight:600; }
  a { color:var(--accent); }
  .muted { color:var(--muted); } .small { font-size:12px; }
  .pill { display:inline-block; padding:1px 8px; border-radius:999px; font-size:12px; font-weight:600; background:var(--chip); white-space:nowrap; }
  .pill.ok { color:var(--ok); } .pill.bad { color:var(--bad); } .pill.warn { color:var(--warn); } .pill.human { color:var(--human); } .pill.voice { color:var(--voice); }
  .p1 { background:var(--bad); color:var(--panel); } .p2 { background:var(--warn); color:var(--panel); } .p3 { background:var(--muted); color:var(--panel); }
  .task { border:1px solid var(--line); border-left:4px solid var(--human); border-radius:8px; padding:10px 12px; margin:8px 0; background:var(--panel); }
  .task h3 { margin:2px 0 4px; font-size:15px; }
  .stat { display:inline-block; margin-right:18px; } .stat b { font-size:18px; display:block; }
  .tl { list-style:none; margin:0; padding:0; border-left:2px solid var(--line); }
  .tl li { position:relative; margin:0 0 10px 0; padding:2px 0 2px 16px; }
  .tl li::before { content:''; position:absolute; left:-7px; top:9px; width:12px; height:12px; border-radius:50%; background:var(--panel); border:2px solid var(--muted); }
  .tl li.k-blocked::before, .tl li.k-run_failed::before { border-color:var(--bad); background:var(--bad); }
  .tl li.k-escalation::before, .tl li.k-human_task::before, .tl li.k-human_decision::before { border-color:var(--human); background:var(--human); }
  .tl li.k-call::before { border-color:var(--voice); background:var(--voice); }
  .tl li.k-message::before, .tl li.k-action::before { border-color:var(--accent); }
  .tl li.k-follow_up::before { border-color:var(--warn); }
  .tl .when { color:var(--muted); font-size:12px; margin-right:6px; }
  .tl .title { font-weight:600; }
  .tl .detail { margin:4px 0 0; white-space:pre-wrap; color:var(--ink); }
  .quote { border-left:3px solid var(--line); padding:4px 10px; margin:6px 0; white-space:pre-wrap; background:var(--chip); border-radius:0 6px 6px 0; }
  details summary { cursor:pointer; color:var(--accent); font-size:12px; }
  pre { white-space:pre-wrap; font:12px/1.45 ui-monospace, Menlo, monospace; background:var(--chip); padding:10px; border-radius:6px; max-height:420px; overflow:auto; }
  .filters { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
  .filters button { font:inherit; font-size:12px; padding:3px 10px; border-radius:999px; border:1px solid var(--line); background:var(--panel); color:var(--ink); cursor:pointer; }
  .filters button.on { background:var(--accent); color:var(--panel); border-color:var(--accent); }
  input, textarea, button, select { font:inherit; }
  input[type=text], textarea, select { width:100%; padding:7px 9px; border:1px solid var(--line); border-radius:6px; background:var(--panel); color:var(--ink); }
  textarea { min-height:80px; }
  .btn { padding:8px 14px; border-radius:6px; border:1px solid var(--accent); background:var(--accent); color:var(--panel); cursor:pointer; font-weight:600; }
  .opt { display:block; padding:8px 10px; border:1px solid var(--line); border-radius:6px; margin:6px 0; cursor:pointer; }
  .opt:has(input:checked) { border-color:var(--accent); background:var(--chip); }
  .reco { border:1px solid var(--accent); border-radius:8px; padding:10px 12px; background:var(--chip); margin:8px 0; }
  ul.tight { margin:4px 0; padding-left:18px; }
  @media (max-width: 640px) { main { padding:12px 16px 32px; } header { padding:10px 16px; } }
`;

const STATUS_LABEL: Record<OpsCase['status'], [string, string]> = {
  agent_working: ['Agent working', 'voice'],
  waiting_on_human: ['Needs a person', 'human'],
  waiting_on_party: ['Waiting on a party', 'warn'],
  closed: ['Closed', 'ok'],
  failed: ['Agent failed', 'bad'],
};
export const statusPill = (s: OpsCase['status']) => `<span class="pill ${STATUS_LABEL[s][1]}">${STATUS_LABEL[s][0]}</span>`;
const ACTOR: Record<string, string> = { agent: 'Case worker', voice_agent: 'Voice agent', human: 'Person', system: 'System', tenant: 'Tenant', landlord: 'Landlord', contractor: 'Contractor' };
const KIND_LABEL: Record<string, string> = {
  case_opened: 'Opened',
  call: 'Call',
  action: 'Action',
  message: 'Message',
  blocked: 'Denied',
  escalation: 'Escalation',
  follow_up: 'Follow-up',
  decision: 'Decision',
  human_task: 'Needs a person',
  human_decision: 'Human decision',
  run_started: 'Run',
  run_failed: 'Failure',
};
const statusClass = (s: string | null) => (!s ? '' : /verified|resolved|passed|ok/.test(s) ? 'ok' : /fail|denied|held|bad/.test(s) ? 'bad' : /unverified|open|P1|P2/.test(s) ? 'warn' : '');
const prio = (p: string) => `<span class="pill ${p.toLowerCase()}">${esc(p)}</span>`;
const list = (xs?: string[] | null, none = '<span class="muted">None</span>') => (xs?.length ? `<ul class="tight">${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : none);

function layout(title: string, body: string, opts: { openTasks?: number; refresh?: boolean } = {}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>${opts.refresh ? '<meta http-equiv="refresh" content="8">' : ''}<style>${STYLE}</style></head>
<body><header><h1>Dwelly Ops</h1><a href="/ops">Inbox${opts.openTasks ? ` <span class="pill p2">${opts.openTasks}</span>` : ''}</a><a class="dim" href="/admin">Voice calls</a></header>
<main>${body}</main></body></html>`;
}

function taskCard(t: HumanTask, c?: OpsCase) {
  return `<div class="task">
  <div class="small muted">${prio(t.priority)} ${esc(t.team)} · ${esc(ago(t.created_at))}${c ? ` · <a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a>` : ''}</div>
  <h3>${esc(t.question)}</h3>
  ${t.recommendation ? `<div class="small"><b>Agent recommends:</b> ${esc(t.recommendation)}</div>` : ''}
  ${t.status === 'open' ? `<p><a class="btn" href="/ops/tasks/${esc(t.id)}" style="text-decoration:none">Review and decide</a></p>` : `<div class="small"><span class="pill ok">Decided</span> ${esc(t.decision?.choice)} <span class="muted">by ${esc(t.decision?.by)}, ${esc(when(t.resolved_at))}</span></div>`}
</div>`;
}

export function inboxPage(o: { tasks: HumanTask[]; cases: OpsCase[]; counts: Record<string, Record<string, number>> }) {
  const byId = new Map(o.cases.map((c) => [c.id, c]));
  const open = o.tasks.filter((t) => t.status === 'open');
  const working = o.cases.some((c) => c.status === 'agent_working');
  const tally = (k: OpsCase['status']) => o.cases.filter((c) => c.status === k).length;
  return layout(
    'Dwelly Ops: inbox',
    `<div class="panel"><span class="stat"><b>${open.length}</b>need a person</span><span class="stat"><b>${tally('agent_working')}</b>agent working</span><span class="stat"><b>${tally('waiting_on_party')}</b>waiting on a party</span><span class="stat"><b>${tally('closed')}</b>closed</span><span class="stat"><b>${tally('failed')}</b>failed</span></div>
<div class="panel"><h2>Needs a person</h2>${open.length ? open.map((t) => taskCard(t, byId.get(t.case_id))).join('') : '<p class="muted">Nothing is waiting on a person. The agents are handling everything in flight.</p>'}</div>
<div class="panel"><h2>Cases</h2><table><tr><th>Case</th><th>Source</th><th>Status</th><th>Actions</th><th>Messages</th><th>Denied</th><th>Escalations</th><th>Last activity</th></tr>
${o.cases
  .map((c) => {
    const n = o.counts[c.id] ?? {};
    return `<tr><td><a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a><div class="small muted">${esc(c.property ?? '')}</div></td><td>${esc(c.source)}</td><td>${statusPill(c.status)}</td><td>${n.action ?? 0}</td><td>${n.message ?? 0}</td><td>${n.blocked ? `<span class="pill bad">${n.blocked}</span>` : 0}</td><td>${n.escalation ?? 0}</td><td class="small muted">${esc(ago(c.updated_at))}</td></tr>`;
  })
  .join('')}</table>${o.cases.length ? '' : '<p class="muted">No cases yet. Place a call from the voice admin, or open a public case below.</p>'}</div>
<div class="panel"><h2>Hand a case to the case worker</h2><form method="post" action="/ops/api/public-case" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end">
<label>Public case, or P + practice case<br><input type="text" name="case" placeholder="021, or P10" required style="width:120px"></label>
<label>After event (optional)<br><input type="text" name="after" placeholder="auto" style="width:120px"></label>
<button class="btn" type="submit">Hand it to the case worker</button></form></div>`,
    { openTasks: open.length, refresh: working },
  );
}

function eventItem(e: OpsEvent) {
  const d = (e.data ?? {}) as Record<string, any>;
  const body =
    e.kind === 'message'
      ? `<div class="quote">${esc(e.detail)}</div>`
      : e.kind === 'call'
        ? `<div class="detail">${esc(e.detail)}</div>${d.transcript ? `<details><summary>Transcript</summary><pre>${esc(d.transcript)}</pre></details>` : ''}${(d.flags as string[] | undefined)?.length ? `<div class="small muted">Flags: ${esc((d.flags as string[]).join('; '))}</div>` : ''}`
        : e.kind === 'decision'
          ? `<div class="detail">${esc(e.detail)}</div>${d.next_actions?.length ? `<table class="small"><tr><th>Next action</th><th>To</th><th>Channel</th></tr>${(d.next_actions as any[]).map((n) => `<tr><td><b>${esc(n.type)}</b> ${esc(n.action)}</td><td>${esc(n.recipient)}</td><td>${esc(n.channel)}</td></tr>`).join('')}</table>` : ''}`
          : e.detail
            ? `<div class="detail ${e.kind === 'action' ? 'small muted' : ''}">${esc(e.detail)}</div>`
            : '';
  return `<li class="k-${esc(e.kind)}" data-kind="${esc(e.kind)}"><span class="when">${esc(when(e.ts))}</span><span class="pill">${esc(KIND_LABEL[e.kind] ?? e.kind)}</span> <span class="small muted">${esc(ACTOR[e.actor] ?? e.actor)}</span>${e.status ? ` <span class="pill ${statusClass(e.status)}">${esc(e.status)}</span>` : ''}
  <div class="title">${esc(e.title)}</div>${body}</li>`;
}

const FILTERS: [string, string[]][] = [
  ['All', []],
  ['Calls', ['call']],
  ['Actions & messages', ['action', 'message']],
  ['Follow-ups', ['follow_up']],
  ['Denied', ['blocked', 'run_failed']],
  ['Escalations & people', ['escalation', 'human_task', 'human_decision']],
  ['Decisions', ['decision']],
];

export function casePage(o: { c: OpsCase; events: OpsEvent[]; tasks: HumanTask[]; runs: OpsRun[]; openTasks: number }) {
  const { c, events } = o;
  const latest = [...events].reverse().find((e) => e.kind === 'decision');
  const ld = (latest?.data ?? {}) as Record<string, any>;
  const count = (k: string) => events.filter((e) => e.kind === k).length;
  return layout(
    `${c.title}: Dwelly Ops`,
    `<div class="panel"><div class="small muted">${esc(c.source)} · ${esc(c.source_ref ?? '')}</div><h2 style="font-size:18px;text-transform:none;letter-spacing:0;color:var(--ink);margin:4px 0">${esc(c.title)}</h2>
<div>${statusPill(c.status)} <span class="muted">${esc(c.property ?? '')}</span></div>
<p><span class="stat"><b>${count('action') + count('message')}</b>actions</span><span class="stat"><b>${count('message')}</b>messages sent</span><span class="stat"><b>${count('follow_up')}</b>follow-ups</span><span class="stat"><b>${count('blocked')}</b>denied</span><span class="stat"><b>${count('escalation')}</b>escalations</span><span class="stat"><b>${o.runs.length}</b>agent runs</span></p></div>
${o.tasks.length ? `<div class="panel"><h2>People in the loop</h2>${o.tasks.map((t) => taskCard(t)).join('')}</div>` : ''}
${
  latest
    ? `<div class="grid"><div class="panel"><h2>Where the case stands</h2><p>${esc(ld.case_state)}</p><h2>Remaining work</h2>${list(ld.remaining_work)}</div>
<div class="panel"><h2>What the last actions do not establish</h2>${list(ld.boundaries)}<h2 style="margin-top:12px">Missing information</h2>${list(ld.missing_info)}<h2 style="margin-top:12px">Conflicts</h2>${list(ld.conflicts)}</div></div>`
    : ''
}
<div class="panel"><h2>Timeline</h2><div class="filters">${FILTERS.map(([label, kinds], i) => `<button type="button" data-kinds="${esc(kinds.join(','))}" class="${i ? '' : 'on'}">${esc(label)}</button>`).join('')}</div>
<ol class="tl">${events.map(eventItem).join('')}</ol></div>
<div class="panel"><h2>Agent runs</h2><table><tr><th>Started</th><th>Trigger</th><th>Outcome</th><th>Cost</th><th>Files</th></tr>${o.runs
      .map(
        (r) =>
          `<tr><td class="small">${esc(when(r.started_at))}</td><td>${esc(r.trigger)}</td><td>${r.finished_at ? esc(r.outcome) : '<span class="pill voice">running</span>'}</td><td class="small">${r.cost == null ? '' : `$${r.cost.toFixed(3)}`}</td><td class="small">${r.answer_md ? `<a href="/ops/runs/${esc(r.id)}/answer">ANSWER.md</a> · <a href="/ops/runs/${esc(r.id)}/reasoning">REASONING.md</a>` : ''}</td></tr>`,
      )
      .join('')}</table></div>
<details class="panel"><summary>Case history as the agent sees it</summary><pre>${esc(c.history_md)}</pre></details>
<script>
document.querySelectorAll('.filters button').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach((x) => x.classList.toggle('on', x === b));
  const kinds = b.dataset.kinds ? b.dataset.kinds.split(',') : [];
  document.querySelectorAll('.tl li').forEach((li) => { li.style.display = !kinds.length || kinds.includes(li.dataset.kind) ? '' : 'none'; });
}));
</script>`,
    { openTasks: o.openTasks, refresh: c.status === 'agent_working' },
  );
}

export function taskPage(o: { t: HumanTask; c: OpsCase; openTasks: number }) {
  const { t, c } = o;
  const x = t.context;
  const options = [...t.options, 'Something else (explain in the note)'];
  return layout(
    `Decide: ${t.question}`,
    `<div class="small muted"><a href="/ops/cases/${esc(c.id)}">${esc(c.title)}</a> · ${esc(c.property ?? '')}</div>
<div class="grid" style="grid-template-columns:minmax(300px,1.1fr) minmax(300px,1fr)">
<div>
<div class="panel"><div>${prio(t.priority)} <span class="pill">${esc(t.team)}</span> <span class="small muted">raised ${esc(ago(t.created_at))}${x.deadline ? ` · deadline <b>${esc(x.deadline)}</b>` : ''}</span></div>
<h2 style="font-size:18px;text-transform:none;letter-spacing:0;color:var(--ink);margin:8px 0">${esc(t.question)}</h2>
${t.recommendation ? `<div class="reco"><b>The agent recommends</b><br>${esc(t.recommendation)}</div>` : ''}
${
  t.status === 'open'
    ? `<form method="post" action="/ops/tasks/${esc(t.id)}/decide">
<h2 style="margin-top:14px">Your decision</h2>
${options.map((op, i) => `<label class="opt"><input type="radio" name="choice" value="${esc(op)}" ${i === 0 ? 'checked' : ''}> ${esc(op)}</label>`).join('')}
<h2 style="margin-top:14px">Note for the agent (optional)</h2><textarea name="note" placeholder="Anything the agent should know or do, e.g. 'Approved up to £250, ask for photos after'"></textarea>
<h2 style="margin-top:14px">Your name</h2><input type="text" name="by" required placeholder="e.g. Iona Quill">
<p class="small muted">The agent will carry out your decision, tell the people who need to know, and log it on the case.</p>
<button class="btn" type="submit">Send decision to the agent</button></form>`
    : `<p><span class="pill ok">Decided</span> <b>${esc(t.decision?.choice)}</b> by ${esc(t.decision?.by)}, ${esc(when(t.resolved_at))}</p>${t.decision?.note ? `<div class="quote">${esc(t.decision.note)}</div>` : ''}<p><a href="/ops/cases/${esc(c.id)}">See what the agent did next</a></p>`
}
</div></div>
<div>
<div class="panel"><h2>Where the case stands</h2><p>${esc(x.case_state ?? '')}</p>
<h2>What is known</h2><p style="white-space:pre-wrap">${esc(x.known ?? '')}</p>
<h2>What is missing or uncertain</h2><p style="white-space:pre-wrap">${esc(x.missing ?? '')}</p>${list(x.missing_info, '')}
<h2>Conflicts between sources</h2>${list(x.conflicts)}</div>
<div class="panel"><h2>What the agent already did</h2>${
      x.next_actions?.length
        ? `<table class="small"><tr><th>Action</th><th>To</th><th>Status</th></tr>${x.next_actions.map((n) => `<tr><td><b>${esc(n.type)}</b> ${esc(n.action)}</td><td>${esc(n.recipient)} · ${esc(n.channel)}</td><td><span class="pill ${statusClass(n.status)}">${esc(n.status)}</span></td></tr>`).join('')}</table>`
        : '<span class="muted">Nothing yet.</span>'
    }
<h2 style="margin-top:12px">What it was not allowed to do</h2>${x.blocked?.length ? `<ul class="tight">${x.blocked.map((b) => `<li><b>${esc(b.tool)}</b>: ${esc(b.reason)}</li>`).join('')}</ul>` : '<span class="muted">Nothing was denied.</span>'}
<h2 style="margin-top:12px">What its actions do not establish</h2>${list(x.boundaries)}</div>
${x.call?.summary || x.call?.transcript ? `<div class="panel"><h2>The call</h2>${x.call.summary ? `<p>${esc(x.call.summary)}</p>` : ''}${x.call.transcript ? `<details><summary>Transcript</summary><pre>${esc(x.call.transcript)}</pre></details>` : ''}</div>` : ''}
${x.recent_history ? `<div class="panel"><h2>Latest case events</h2><details open><summary>Verbatim</summary><pre>${esc(x.recent_history)}</pre></details></div>` : ''}
</div></div>`,
    { openTasks: o.openTasks },
  );
}

export const textPage = (title: string, text: string) => layout(title, `<div class="panel"><pre>${esc(text)}</pre></div>`);
