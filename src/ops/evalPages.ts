import type { BatchView, CaseRow, Group } from './batchView.js';
import { ago, esc, layout } from './pages.js';
import type { Batch } from './store.js';

/** Eval runs: the list of runs, and one run watched live then graded. Same language as the rest of the portal. */

const OUTCOME: Record<string, [string, string]> = {
  action_taken: ['Acted', 'o-acted'],
  resolved: ['Resolved', 'o-resolved'],
  needs_info: ['Asked for information', 'o-info'],
  no_action: ['No action needed', 'o-none'],
  escalated: ['Handed to a person', 'o-person'],
  'no decision': ['No decision', 'o-fail'],
};
const STEP: Record<string, string> = {
  REQUEST_LANDLORD_APPROVAL: 'Ask the landlord to approve',
  ASSIGN_PROVIDER: 'Assign a contractor',
  BOOK_OR_CONFIRM_APPOINTMENT: 'Book or confirm a visit',
  CHASE_PROVIDER: 'Chase the contractor',
  CHASE_LANDLORD: 'Chase the landlord',
  CHASE_TENANT: 'Chase the tenant',
  SEND_QUOTE_FOR_APPROVAL: 'Send a quote for approval',
  APPROVE_INVOICE_FOR_PAYMENT: 'Approve an invoice',
  REPLY_TO_TENANT: 'Reply to the tenant',
  REQUEST_INFORMATION: 'Ask for information',
  SPLIT_NEW_REQUEST: 'Split off a new request',
  RECLASSIFY: 'Reclassify the job',
  WAIT: 'Wait, with a follow-up date',
  CLOSE_WITH_PAYMENT: 'Close, with payment',
  CLOSE_WITHOUT_PAYMENT: 'Close, no payment',
  ESCALATE_TO_HUMAN: 'Hand to a person',
  OTHER: 'Something else',
};
const toolName = (t: string) => t.replace(/_/g, ' ');
const caseNo = (r: { c: { source_ref: string | null; id: string } }) => r.c.source_ref?.split('@')[0] ?? r.c.id;
const shortTitle = (t: string) => t.replace(/^Case \d+:\s*/, '');
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

const STYLE = `
.bar { display:flex; height:10px; border-radius:6px; overflow:hidden; background:var(--rule); margin:18px 0 8px; max-width:720px; }
.bar span { display:block; height:100%; }
.bar .done { background:var(--ink); } .bar .running { background:var(--link); } .bar .failed { background:var(--alert); }
.legend { display:flex; gap:18px; flex-wrap:wrap; font-size:13px; color:var(--soft); }
.legend i { display:inline-block; width:10px; height:10px; border-radius:3px; margin-right:6px; vertical-align:-1px; }
.o-acted { background:var(--ink); } .o-resolved { background:var(--ok); } .o-info { background:#7d8a82; } .o-none { background:#b7c0b9; } .o-person { background:var(--attn); } .o-fail { background:var(--alert); }
.split { display:grid; grid-template-columns:minmax(0,1fr) 320px; gap:40px; align-items:start; }
.gradebox { background:var(--surface); border-radius:12px; padding:20px 22px; }
.gradebox .score { font-family:var(--serif); font-size:44px; line-height:1; }
.gradebox p { margin:6px 0 0; font-size:14px; color:var(--soft); }
.gradebox button { margin-top:14px; }
button.primary[disabled] { opacity:.45; cursor:not-allowed; }
.reasons { list-style:none; margin:0; padding:0; }
.reasons > li { padding:14px 0; border-top:1px solid var(--rule); }
.reasons .r { max-width:72ch; }
.reasons .r b { font-weight:600; }
.reasons .n { color:var(--soft); font-size:13px; margin-top:4px; }
.chip { display:inline-block; font-size:12px; padding:1px 8px; border-radius:10px; background:var(--surface); color:var(--link); text-decoration:none; margin:4px 4px 0 0; }
.chip:hover { text-decoration:underline; }
.reasons.denied > li .r::before { content:'✕ '; color:var(--alert); font-weight:700; }
.reasons.person > li .r::before { content:'? '; color:var(--attn); font-weight:700; }
.reasons.fail > li .r::before { content:'○ '; color:var(--faint); }
table.grid { border-collapse:collapse; width:100%; font-size:14px; }
table.grid th { text-align:left; font-weight:600; font-size:13px; color:var(--soft); padding:8px 10px 8px 0; border-bottom:1px solid var(--rule); }
table.grid td { padding:9px 10px 9px 0; border-bottom:1px solid var(--rule); vertical-align:top; }
table.grid td.num, table.grid th.num { text-align:right; }
table.grid .mini { display:inline-block; height:6px; border-radius:3px; background:var(--ink); vertical-align:1px; margin-right:6px; }
table.grid .mini.bad { background:var(--alert); } table.grid .mini.soft { background:var(--faint); }
table.cases a { color:var(--ink); text-decoration:none; } table.cases a:hover { text-decoration:underline; }
table.cases .no { color:var(--faint); font-size:13px; width:44px; }
.state { font-size:13px; white-space:nowrap; }
.state.queued { color:var(--faint); } .state.running { color:var(--link); } .state.failed { color:var(--alert); font-weight:600; }
.tag { font-size:12px; font-weight:600; padding:1px 8px; border-radius:10px; white-space:nowrap; }
.tag.attn { color:var(--attn); background:var(--attn-bg); } .tag.alert { color:var(--alert); background:var(--alert-bg); }
.score-cell { font-variant-numeric:tabular-nums; font-weight:600; } .score-cell.low { color:var(--alert); }
.filters { display:flex; gap:6px; flex-wrap:wrap; margin:0 0 12px; }
.filters button { font:inherit; font-size:13px; padding:4px 12px; border-radius:16px; border:1px solid var(--rule); background:transparent; color:var(--ink); cursor:pointer; }
.filters button[aria-pressed="true"] { background:var(--ink); color:var(--paper); border-color:var(--ink); }
.runs { list-style:none; margin:0; padding:0; border-top:1px solid var(--rule); }
.runs li { padding:14px 0; border-bottom:1px solid var(--rule); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:4px 20px; }
.runs a { color:var(--ink); font-weight:500; text-decoration:none; } .runs a:hover { text-decoration:underline; }
.start { background:var(--surface); border-radius:12px; padding:20px 22px; max-width:720px; margin-top:24px; }
.start p { margin:0 0 12px; color:var(--soft); font-size:14px; }
@media (max-width: 900px) { .split { grid-template-columns:1fr; } }
@media (max-width: 600px) { table.cases .hide-s { display:none; } }
`;

export type BatchSummary = { b: Batch; done: number; needed: number; running: number };

export function evalsPage(o: { runs: BatchSummary[]; openTasks: number; sets: { id: string; name: string; count: number }[] }) {
  return layout(
    'Eval runs: Dwelly operations',
    `<style>${STYLE}</style><h1 class="ball wide">${o.runs.length ? 'Eval runs' : 'Run the case set through the agents.'}</h1>
<p class="lede">Each case is cut at its decision point and handed to the same case worker that runs in production, with the same tools and the same policy checks. Watch it live, then grade it with the judge.</p>
${o.sets.map((set) => `<form class="start" method="post" action="/ops/api/batches"><input type="hidden" name="set" value="${esc(set.id)}"><p>${esc(set.name)}: ${set.count} cases. Takes about ten minutes and roughly $${(set.count * 0.08).toFixed(0)} in model calls.</p><button class="primary" type="submit">Run all ${set.count} cases</button></form>`).join('')}
${o.runs.length ? `<section class="section"><h2>Earlier runs</h2><ul class="runs">${o.runs.map((r) => `<li><a href="/ops/evals/${esc(r.b.id)}">${esc(r.b.name)}</a><span class="faint small">${esc(ago(r.b.created_at))}</span><span class="quiet small">${r.done === r.b.total ? `All ${r.b.total} done` : `${r.done} of ${r.b.total} done${r.running ? `, ${r.running} running` : ''}`}. ${r.needed ? `${plural(r.needed, 'case')} needed a person.` : 'None needed a person.'}${r.b.grading === 'done' ? ' Graded.' : ''}</span></li>`).join('')}</ul></section>` : ''}`,
    { openTasks: o.openTasks },
  );
}

const caseLink = (c: { id: string; source_ref: string | null }) => `<a class="chip" href="/ops/cases/${esc(c.id)}">${esc(c.source_ref?.split('@')[0] ?? c.id)}</a>`;

function groupList(groups: Group[], cls: string, title: (g: Group) => string) {
  return `<ul class="reasons ${cls}">${groups
    .map((g) => `<li><div class="r">${title(g)}</div><div class="n">${plural(g.cases.length, 'case')}: ${g.cases.map(caseLink).join('')}</div></li>`)
    .join('')}</ul>`;
}

function row(r: CaseRow) {
  const tags = [r.task ? '<span class="tag attn">needed a person</span>' : '', r.denied ? `<span class="tag alert">${r.denied} denied</span>` : '', r.notThrough ? `<span class="tag alert">${r.notThrough} did not go through</span>` : ''].join(' ');
  const state =
    r.state === 'queued' ? '<span class="state queued">Queued</span>' : r.state === 'running' ? '<span class="state running"><span class="live" aria-hidden="true"></span>Running</span>' : r.state === 'failed' ? '<span class="state failed">No decision</span>' : `<span class="state">${esc(OUTCOME[r.outcome ?? '']?.[0] ?? r.outcome ?? '')}</span>`;
  const score = r.c.grade ? `<span class="score-cell ${r.c.grade.score < 60 || r.c.grade.critical.length ? 'low' : ''}">${r.c.grade.score}</span>` : '';
  const filters = [r.task ? 'person' : '', r.denied ? 'denied' : '', r.notThrough || r.state === 'failed' ? 'failed' : '', r.c.grade && (r.c.grade.score < 60 || r.c.grade.critical.length) ? 'low' : ''].join(' ');
  return `<tr data-f="${filters}"><td class="no">${esc(caseNo(r))}</td><td><a href="/ops/cases/${esc(r.c.id)}">${esc(shortTitle(r.c.title))}</a>${tags ? `<div style="margin-top:3px">${tags}</div>` : ''}</td>
<td>${state}</td><td class="hide-s">${r.next ? `${esc(STEP[r.next.type] ?? r.next.type)}<div class="small quiet">${esc(r.next.recipient)}, ${esc(r.next.channel)}</div>` : '<span class="faint">None</span>'}</td>
<td class="num hide-s">${r.confirmed || r.notThrough || r.denied ? `${r.confirmed}${r.notThrough + r.denied ? ` <span class="small" style="color:var(--alert)">+${r.notThrough + r.denied}</span>` : ''}` : ''}</td>
<td class="num">${score}</td><td class="num small quiet hide-s">${r.cost ? `$${r.cost.toFixed(2)}` : ''}</td></tr>`;
}

export function evalRunPage(o: { b: Batch; v: BatchView; openTasks: number }) {
  const { b, v } = o;
  const total = b.total;
  const live = v.running + v.queued > 0;
  const headline = live
    ? `${v.done} of ${total} cases done. ${v.running} running now.`
    : `All ${total} cases are done. ${v.needed.length ? `${plural(v.needed.length, 'case')} needed a person.` : 'None needed a person.'}`;
  const exceptions = [
    v.denials.length ? `${plural(v.denials.reduce((a, g) => a + g.cases.length, 0), 'denial')} by policy` : '',
    v.notThrough.length ? `${plural(v.notThrough.reduce((a, g) => a + g.cases.length, 0), 'action')} that did not go through` : '',
    v.noDecision.length ? `${plural(v.noDecision.length, 'case')} without a decision` : '',
  ].filter(Boolean);
  const pct = (n: number) => `${(100 * n) / Math.max(total, 1)}%`;
  const maxTool = Math.max(1, ...v.tools.map((t) => t.requested));
  const maxStep = Math.max(1, ...v.nextSteps.map(([, n]) => n));
  const failed = v.rows.filter((r) => r.state === 'failed').length;
  const lowest = v.rows.filter((r) => r.c.grade).sort((a, b) => a.c.grade!.score - b.c.grade!.score).slice(0, 5);

  return layout(
    `${b.name}: eval run`,
    `<style>${STYLE}</style><div class="crumbs"><a href="/ops/evals">Eval runs</a> / ${esc(b.name)}</div>
<h1 class="ball wide">${live ? '<span class="live" aria-hidden="true"></span>' : ''}${esc(headline)}</h1>
<p class="lede">${exceptions.length ? `Worth a look: ${esc(exceptions.join(', '))}.` : v.done ? 'No denials, no failed actions, every case reached a decision.' : 'Cases appear below as the case worker finishes them.'} ${v.cost ? `Model cost so far $${v.cost.toFixed(2)}.` : ''}</p>
<div class="bar" role="img" aria-label="${v.done} done, ${v.running} running, ${v.queued} queued"><span class="done" style="width:${pct(v.done - failed)}"></span><span class="failed" style="width:${pct(failed)}"></span><span class="running" style="width:${pct(v.running)}"></span></div>
<div class="legend"><span><i style="background:var(--ink)"></i>${v.done - failed} done</span>${failed ? `<span><i style="background:var(--alert)"></i>${failed} no decision</span>` : ''}<span><i style="background:var(--link)"></i>${v.running} running</span><span><i style="background:var(--rule)"></i>${v.queued} queued</span></div>

<div class="split section"><div>
<h2 style="font-size:15px;font-weight:600;margin:0 0 12px">How the cases ended</h2>
${v.outcomes.length ? `<div class="bar" style="margin-top:0">${v.outcomes.map(([k, n]) => `<span class="${OUTCOME[k]?.[1] ?? 'o-none'}" style="width:${(100 * n) / Math.max(v.done, 1)}%"></span>`).join('')}</div><div class="legend">${v.outcomes.map(([k, n]) => `<span><i class="${OUTCOME[k]?.[1] ?? 'o-none'}"></i>${n} ${esc((OUTCOME[k]?.[0] ?? k).toLowerCase())}</span>`).join('')}</div>` : '<p class="quiet">Nothing finished yet.</p>'}
</div>
<div class="gradebox">${
      b.grading === 'done' && v.meanScore !== null
        ? `<div class="score">${v.meanScore}</div><p>Average judge score over ${v.graded} cases. ${v.critical ? `<b style="color:var(--alert)">${plural(v.critical, 'case')} with a critical failure.</b>` : 'No critical failures.'}</p>`
        : b.grading === 'running'
          ? `<p style="margin:0"><span class="live" aria-hidden="true"></span>The judge is grading every case against what the agency actually did next.</p>`
          : `<p style="margin:0">${b.grading === 'failed' ? 'Grading stopped part-way. Scores that were written are shown below.' : 'Grade each answer against what the agency actually did next, with the same judge as <code>pnpm eval</code>.'}</p>
<form method="post" action="/ops/evals/${esc(b.id)}/grade"><button class="primary" type="submit" ${live ? 'disabled title="Available when every case is done"' : ''}>Grade with the judge</button></form>`
    }</div></div>

${
  v.needed.length || v.denials.length || v.notThrough.length || v.noDecision.length || lowest.some((r) => r.c.grade!.score < 60)
    ? `<section class="section"><h2>Why cases stopped short</h2>
${v.needed.length ? `<h3 class="small quiet" style="margin:18px 0 0;font-weight:600">Needed a person</h3><ul class="reasons person">${v.needed.map(({ c, t }) => `<li><div class="r">${esc(t.question)}</div><div class="n">${esc(t.team)}, ${esc(t.priority)}: ${caseLink(c)}${t.status === 'open' ? ` <a class="chip" href="/ops/tasks/${esc(t.id)}">Decide</a>` : ''}</div></li>`).join('')}</ul>` : ''}
${v.denials.length ? `<h3 class="small quiet" style="margin:22px 0 0;font-weight:600">Denied by policy</h3>${groupList(v.denials, 'denied', (g) => `<b>${esc(toolName(g.tool))}</b>: ${esc(g.reason)}`)}` : ''}
${v.notThrough.length ? `<h3 class="small quiet" style="margin:22px 0 0;font-weight:600">Did not go through</h3>${groupList(v.notThrough, 'fail', (g) => `<b>${esc(toolName(g.tool))}</b>: ${esc(g.reason)}`)}` : ''}
${v.noDecision.length ? `<h3 class="small quiet" style="margin:22px 0 0;font-weight:600">No decision</h3><ul class="reasons denied">${v.noDecision.map((r) => `<li><div class="r">${esc(r.error ?? 'The case worker stopped without a decision.')}</div><div class="n">${caseLink(r.c)}</div></li>`).join('')}</ul>` : ''}
${lowest.some((r) => r.c.grade!.score < 60) ? `<h3 class="small quiet" style="margin:22px 0 0;font-weight:600">Lowest judge scores</h3><ul class="reasons fail">${lowest.filter((r) => r.c.grade!.score < 60).map((r) => `<li><div class="r"><b>${r.c.grade!.score}</b>: ${esc(r.c.grade!.critical[0] ?? r.c.grade!.failed_required[0] ?? r.c.grade!.red_flags[0] ?? r.c.grade!.note)}</div><div class="n">${caseLink(r.c)}</div></li>`).join('')}</ul>` : ''}
</section>`
    : ''
}

<div class="split section"><div>
<h2 style="font-size:15px;font-weight:600;margin:0 0 12px">Tool calls the agents asked for</h2>
${v.tools.length ? `<table class="grid"><tr><th>Tool</th><th class="num">Asked</th><th class="num">Confirmed</th><th class="num">Did not go through</th><th class="num">Denied</th></tr>${v.tools.map((t) => `<tr><td><span class="mini" style="width:${Math.round((60 * t.requested) / maxTool)}px"></span>${esc(toolName(t.tool))}</td><td class="num">${t.requested}</td><td class="num">${t.confirmed}</td><td class="num">${t.notThrough || ''}</td><td class="num" style="color:var(--alert)">${t.denied || ''}</td></tr>`).join('')}</table>` : '<p class="quiet">None yet.</p>'}
</div><div>
<h2 style="font-size:15px;font-weight:600;margin:0 0 12px">Next steps chosen</h2>
${v.nextSteps.length ? `<table class="grid">${v.nextSteps.map(([k, n]) => `<tr><td>${esc(STEP[k] ?? k)}</td><td class="num"><span class="mini soft" style="width:${Math.round((80 * n) / maxStep)}px"></span>${n}</td></tr>`).join('')}</table>` : '<p class="quiet">None yet.</p>'}
</div></div>

<section class="section"><h2>Every case</h2>
<div class="filters" role="group" aria-label="Filter cases">${[
      ['all', 'All'],
      ['person', 'Needed a person'],
      ['denied', 'Denied'],
      ['failed', 'Did not go through'],
      ...(v.graded ? [['low', 'Low score']] : []),
    ]
      .map(([k, l]) => `<button type="button" data-filter="${k}" aria-pressed="false">${l}</button>`)
      .join('')}</div>
<table class="grid cases"><tr><th></th><th>Case</th><th>Ended</th><th class="hide-s">Next step</th><th class="num hide-s">Actions</th><th class="num">Score</th><th class="num hide-s">Cost</th></tr>${v.rows.map(row).join('')}</table></section>
<script>
(() => {
  const apply = (f) => {
    document.querySelectorAll('.filters button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    document.querySelectorAll('table.cases tr[data-f]').forEach((tr) => { tr.style.display = f === 'all' || tr.dataset.f.split(' ').includes(f) ? '' : 'none'; });
  };
  const current = () => location.hash.slice(1) || 'all';
  document.querySelectorAll('.filters button').forEach((b) => b.addEventListener('click', () => { history.replaceState(null, '', '#' + b.dataset.filter); apply(b.dataset.filter); }));
  apply(current());
  ${live || b.grading === 'running' ? "try { const y = sessionStorage.getItem('evalScroll'); if (y) scrollTo(0, +y); } catch {} setTimeout(() => { try { sessionStorage.setItem('evalScroll', String(scrollY)); } catch {} location.reload(); }, 5000);" : "try { sessionStorage.removeItem('evalScroll'); } catch {}"}
})();
</script>`,
    { openTasks: o.openTasks },
  );
}
