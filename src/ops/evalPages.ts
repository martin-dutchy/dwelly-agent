import type { BatchView, CaseRow, Group } from './batchView.js';
import { ago, esc, layout, stopTag } from './pages.js';
import { STOP, type StopReason } from './status.js';
import type { Batch } from './store.js';

/**
 * Eval runs, Braintrust-style: a few summary figures that each open a filtered table, one stop reason per case
 * that can be grouped and set against the judge score, and the case timeline one click away.
 */

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
const BAR: Record<StopReason, string> = {
  resolved: 'var(--ok-fg)',
  waiting: 'var(--fg-muted)',
  no_action: 'var(--border)',
  handed_over: 'var(--needs-border)',
  policy_stop: 'var(--policy-border)',
  unconfirmed: 'var(--danger-fg)',
  no_decision: 'var(--danger-border)',
  working: 'var(--info-fg)',
};
const toolName = (t: string) => t.replace(/_/g, ' ');
const caseNo = (c: { source_ref: string | null; id: string }) => c.source_ref?.split('@')[0] ?? c.id;
const shortTitle = (t: string) => t.replace(/^Case \d+:\s*/, '');
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const low = (r: CaseRow) => !!r.c.grade && (r.c.grade.score < 60 || r.c.grade.critical.length > 0);

const CSS = `
.figures { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:var(--s4); margin-top:var(--s6); }
.figure { display:block; padding:var(--s4); background:var(--surface); border:1px solid var(--border-subtle); border-radius:8px; color:inherit; text-decoration:none; }
a.figure:hover { background:var(--bg-hover); }
.figure .v { font-size:24px; line-height:32px; font-weight:600; font-variant-numeric:tabular-nums; }
.figure .v.bad { color:var(--danger-fg); } .figure .v.needs { color:var(--needs-fg); }
.figure .l { color:var(--fg-muted); font-size:13px; line-height:18px; }
.figure .d { font-size:12px; line-height:16px; font-weight:600; margin-left:6px; } .d.up { color:var(--ok-fg); } .d.down { color:var(--danger-fg); }
.stack { display:flex; height:12px; border-radius:6px; overflow:hidden; background:var(--border-subtle); max-width:720px; }
.stack span { display:block; height:100%; }
.legend { display:flex; gap:var(--s2) var(--s5); flex-wrap:wrap; margin-top:var(--s3); font-size:13px; line-height:18px; }
.legend a { color:var(--fg); text-decoration:none; } .legend a:hover { text-decoration:underline; }
.legend i { display:inline-block; width:10px; height:10px; border-radius:3px; margin-right:6px; vertical-align:-1px; }
.progress { display:flex; height:6px; border-radius:3px; overflow:hidden; background:var(--border-subtle); max-width:720px; margin-top:var(--s4); }
.progress span { display:block; height:100%; } .progress .done { background:var(--fg); } .progress .running { background:var(--info-fg); }
ul.groups { list-style:none; margin:0; padding:0; border-top:1px solid var(--border-subtle); }
ul.groups > li { padding:var(--s3) 0; border-bottom:1px solid var(--border-subtle); display:grid; grid-template-columns:150px minmax(0,1fr); gap:var(--s4); }
ul.groups .r { max-width:76ch; }
.chip { display:inline-block; font-size:12px; line-height:16px; padding:2px 8px; margin:var(--s1) var(--s1) 0 0; border-radius:10px; border:1px solid var(--border-subtle); color:var(--accent); text-decoration:none; font-variant-numeric:tabular-nums; }
.chip:hover { background:var(--bg-hover); }
.views { display:flex; flex-wrap:wrap; gap:var(--s1) var(--s4); margin-bottom:var(--s3); font-size:13px; }
.views a { color:var(--fg-muted); text-decoration:none; padding:2px 0; border-bottom:2px solid transparent; } .views a:hover { color:var(--fg); }
.views a[aria-current="true"] { color:var(--fg); font-weight:600; border-bottom-color:var(--fg); }
.views .n { font-variant-numeric:tabular-nums; color:var(--fg-muted); font-weight:400; margin-left:3px; }
table.cases { border-collapse:collapse; width:100%; }
table.cases th { position:sticky; top:0; background:var(--bg); text-align:left; font-size:12px; line-height:16px; font-weight:600; color:var(--fg-muted); padding:var(--s2) var(--s4) var(--s2) 0; border-bottom:1px solid var(--border); white-space:nowrap; }
table.cases td { padding:10px var(--s4) 10px 0; border-bottom:1px solid var(--border-subtle); vertical-align:top; }
table.cases tr[data-href] { cursor:pointer; } table.cases tr[data-href]:hover td { background:var(--bg-hover); }
table.cases .no { width:40px; color:var(--fg-muted); font-variant-numeric:tabular-nums; }
table.cases .r, table.cases th.r { text-align:right; font-variant-numeric:tabular-nums; }
table.cases a { color:var(--fg); text-decoration:none; }
.score { font-weight:600; } .score.bad { color:var(--danger-fg); }
.issue { color:var(--fg-muted); font-size:13px; line-height:18px; max-width:46ch; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
table.cases td.reason { white-space:nowrap; }
.paused .live { animation:none; opacity:.4; }
@media (max-width: 860px) { .figures { grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width: 640px) { ul.groups > li { grid-template-columns:1fr; gap:var(--s1); } table.cases .hide-s { display:none; } }
`;

export type BatchSummary = { b: Batch; done: number; needed: number; running: number };

export function evalsPage(o: { runs: BatchSummary[]; openTasks: number; sets: { id: string; name: string; count: number }[] }) {
  return layout(
    'Eval runs: Dwelly operations',
    `<h1 class="hero">Eval runs</h1>
<p class="sub">Each case is cut at its decision point and handed to the same AI case worker that runs in production, with the same tools and policy checks. Watch it run, then grade every answer against what the agency actually did next.</p>
${o.sets
  .map(
    (set) => `<form method="post" action="/ops/api/batches" class="actions-row"><input type="hidden" name="set" value="${esc(set.id)}"><button class="primary" type="submit">Run all ${set.count} ${esc(set.name.toLowerCase())}</button><span class="small muted">About 10 minutes, roughly $${(set.count * 0.06).toFixed(0)} in model calls, plus about $${(set.count * 0.07).toFixed(0)} to grade.</span></form>`,
  )
  .join('')}
${
  o.runs.length
    ? `<section><h2>Runs</h2><ul class="rows">${o.runs
        .map(
          (r) =>
            `<li><a class="row" href="/ops/evals/${esc(r.b.id)}"><div><div class="what" style="font-weight:400">${esc(r.b.name)}</div><div class="where">${r.done === r.b.total ? `${r.b.total} cases` : `${r.done} of ${r.b.total} done${r.running ? `, ${r.running} running` : ''}`}${r.needed ? `, ${plural(r.needed, 'case')} handed to a person` : ''}</div></div><div class="side">${r.b.grading === 'done' ? '<span class="plain">Graded</span>' : r.done < r.b.total ? '<span class="plain"><span class="live" aria-hidden="true"></span>Running</span>' : '<span class="plain">Not graded</span>'}<span class="caption">${esc(ago(r.b.created_at))}</span></div></a></li>`,
        )
        .join('')}</ul></section>`
    : ''
}
<section><details><summary class="small">Open results from a folder</summary><form method="post" action="/ops/api/import" class="actions-row" style="margin-top:var(--s3)"><label class="small" for="dir">A <code>pnpm cases</code> output folder over the public cases</label><input id="dir" type="text" name="dir" placeholder="runs/pm" required style="width:220px"><button class="secondary" type="submit">Open</button></form></details></section>`,
    { openTasks: o.openTasks, current: 'evals' },
  );
}

const caseChip = (c: { id: string; source_ref: string | null }) => `<a class="chip" href="/ops/cases/${esc(c.id)}">${esc(caseNo(c))}</a>`;
const groupRows = (groups: Group[], label: string) =>
  groups.map((g) => `<li><span>${label}</span><div><div class="r"><b>${esc(toolName(g.tool))}</b>: ${esc(g.reason)}</div><div>${g.cases.map(caseChip).join('')}</div></div></li>`).join('');

type View = { key: string; label: string; test: (r: CaseRow) => boolean };

export function evalRunPage(o: { b: Batch; v: BatchView; openTasks: number; prev?: { mean: number | null; scores: Record<string, number> } }) {
  const { b, v, prev } = o;
  const live = v.running + v.queued > 0;
  const failed = v.rows.filter((r) => r.state === 'failed').length;
  const pct = (n: number, of = b.total) => `${(100 * n) / Math.max(of, 1)}%`;
  const handed = v.rows.filter((r) => r.reason === 'handed_over').length;
  const unconfirmed = v.rows.filter((r) => r.reason === 'unconfirmed').length;
  const delta = v.meanScore !== null && prev?.mean != null ? v.meanScore - prev.mean : null;
  const views: View[] = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'low', label: 'Low score', test: low },
    { key: 'critical', label: 'Critical', test: (r) => !!r.c.grade?.critical.length },
    { key: 'handed_over', label: 'Handed to a person', test: (r) => r.reason === 'handed_over' },
    { key: 'unconfirmed', label: 'Not confirmed', test: (r) => r.reason === 'unconfirmed' || r.notThrough > 0 },
    { key: 'denied', label: 'Denied by policy', test: (r) => r.denied > 0 },
    { key: 'no_decision', label: 'Did not finish', test: (r) => r.reason === 'no_decision' },
  ];
  const counts = Object.fromEntries(views.map((w) => [w.key, v.rows.filter(w.test).length]));
  const figure = (href: string, value: string, label: string, tone = '', extra = '') =>
    `<a class="figure" href="${href}"><div class="v ${tone}">${value}${extra}</div><div class="l">${label}</div></a>`;
  const scoreHead = v.meanScore !== null ? `Score, mean ${v.meanScore}` : 'Score';
  const firstIssue = (r: CaseRow) => r.c.grade?.critical[0] ?? r.c.grade?.failed_required[0] ?? r.c.grade?.red_flags[0] ?? r.error ?? '';

  const row = (r: CaseRow) => {
    const no = caseNo(r.c);
    const p = prev?.scores[no];
    const d = r.c.grade && p !== undefined ? r.c.grade.score - p : null;
    const views_ = views.filter((w) => w.key !== 'all' && w.test(r)).map((w) => w.key).join(' ');
    return `<tr data-href="/ops/cases/${esc(r.c.id)}" data-v="${views_}"><td class="no">${esc(no)}</td><td><a href="/ops/cases/${esc(r.c.id)}">${esc(shortTitle(r.c.title))}</a></td>
<td class="reason">${r.state === 'queued' ? '<span class="plain">Queued</span>' : stopTag(r.reason)}</td>
<td class="r">${r.c.grade ? `<span class="score ${low(r) ? 'bad' : ''}">${r.c.grade.score}</span>` : ''}</td>
${prev ? `<td class="r hide-s">${d === null ? '' : `<span class="d ${d > 0 ? 'up' : d < 0 ? 'down' : ''}">${d > 0 ? '+' : ''}${d}</span>`}</td>` : ''}
<td class="hide-s"><div class="issue">${esc(firstIssue(r))}</div>${r.next && !firstIssue(r) ? `<div class="issue">${esc(STEP[r.next.type] ?? r.next.type)}, ${esc(r.next.recipient)}</div>` : ''}</td>
<td class="r hide-s small muted">${r.cost ? `$${r.cost.toFixed(2)}` : ''}</td></tr>`;
  };

  return layout(
    `${b.name}: eval run`,
    `<div class="crumbs"><a href="/ops/evals">Eval runs</a> / ${esc(b.name)}</div>
<h1 class="hero">${esc(b.name)}</h1>
<p class="sub meta" id="live-line" aria-live="polite">${live ? '<span class="live" aria-hidden="true"></span>' : ''}${v.done} of ${b.total} done${live ? `, ${v.running} running, ${v.queued} queued` : ''}. Model cost $${v.cost.toFixed(2)}.${live ? ' <button type="button" class="secondary" id="pause" style="margin-left:8px">Pause live updates</button>' : ''}</p>
${live ? `<div class="progress" aria-hidden="true"><span class="done" style="width:${pct(v.done)}"></span><span class="running" style="width:${pct(v.running)}"></span></div>` : ''}

<div class="figures">
${
  v.meanScore !== null
    ? figure('#low', String(v.meanScore), 'Mean judge score', '', delta !== null ? `<span class="d ${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} vs previous</span>` : '')
    : b.grading === 'running'
      ? `<div class="figure"><div class="v"><span class="live" aria-hidden="true"></span>Grading</div><div class="l">The judge is scoring every answer</div></div>`
      : `<form class="figure" method="post" action="/ops/evals/${esc(b.id)}/grade"><div class="l" style="margin-bottom:var(--s2)">Not graded yet</div><button class="primary" type="submit" ${live ? 'disabled title="Available when every case is done"' : ''}>Grade with the judge</button></form>`
}
${figure('#critical', String(v.critical), 'Critical failures', v.critical ? 'bad' : '')}
${figure('#handed_over', String(handed), 'Handed to a person', handed ? 'needs' : '')}
${figure('#unconfirmed', String(unconfirmed), 'Actions not confirmed', unconfirmed ? 'bad' : '')}
</div>

<section><h2>How cases ended</h2>
${v.byReason.length ? `<div class="stack" role="img" aria-label="${esc(v.byReason.map(([r, n]) => `${n} ${STOP[r].label}`).join(', '))}">${v.byReason.map(([r, n]) => `<span style="width:${pct(n, v.rows.length)};background:${BAR[r]}"></span>`).join('')}</div>
<div class="legend">${v.byReason.map(([r, n]) => `<a href="#${r === 'policy_stop' ? 'denied' : r}"><i style="background:${BAR[r]}"></i>${n} ${esc(STOP[r].label.toLowerCase())}</a>`).join('')}</div>` : '<p class="muted">Nothing finished yet.</p>'}
</section>

${
  v.needed.length || v.denials.length || v.notThrough.length || failed
    ? `<section><h2>Why cases stopped short</h2><ul class="groups">
${v.needed.map(({ c, t }) => `<li><span>${stopTag('handed_over')}</span><div><div class="r">${esc(t.question)}</div><div>${caseChip(c)}${t.status === 'open' ? `<a class="chip" href="/ops/tasks/${esc(t.id)}">Decide</a>` : ''}</div></div></li>`).join('')}
${groupRows(v.denials, stopTag('policy_stop'))}
${groupRows(v.notThrough, stopTag('unconfirmed'))}
${v.noDecision.map((r) => `<li><span>${stopTag('no_decision')}</span><div><div class="r">${esc(r.error ?? 'Stopped without a decision.')}</div><div>${caseChip(r.c)}</div></div></li>`).join('')}
</ul></section>`
    : ''
}

<section><h2>Every case</h2>
<nav class="views" aria-label="Views">${views.map((w) => `<a href="#${w.key}" data-view="${w.key}">${esc(w.label)}<span class="n">${counts[w.key]}</span></a>`).join('')}</nav>
<table class="cases"><thead><tr><th></th><th>Case</th><th>Stop reason</th><th class="r">${esc(scoreHead)}</th>${prev ? '<th class="r hide-s">Change</th>' : ''}<th class="hide-s">First issue, or next step</th><th class="r hide-s">Cost</th></tr></thead>
<tbody>${v.rows.map(row).join('')}</tbody></table></section>

<section><details><summary>Tool calls the agents asked for, and next steps chosen</summary>
<table class="log" style="margin-top:var(--s3)"><tr><th>Tool</th><th style="text-align:right">Asked</th><th style="text-align:right">Confirmed</th><th style="text-align:right">Not confirmed</th><th style="text-align:right">Denied by policy</th></tr>${v.tools
      .map((t) => `<tr><td>${esc(toolName(t.tool))}</td><td style="text-align:right">${t.requested}</td><td style="text-align:right">${t.confirmed}</td><td style="text-align:right;color:var(--danger-fg)">${t.notThrough || ''}</td><td style="text-align:right;color:var(--policy-fg)">${t.denied || ''}</td></tr>`)
      .join('')}</table>
<table class="log" style="margin-top:var(--s5)"><tr><th>Next step</th><th style="text-align:right">Cases</th></tr>${v.nextSteps.map(([k, n]) => `<tr><td>${esc(STEP[k] ?? k)}</td><td style="text-align:right">${n}</td></tr>`).join('')}</table>
</details></section>
<script>
(() => {
  const apply = () => {
    const k = location.hash.slice(1) || 'all';
    document.querySelectorAll('.views a').forEach((a) => a.setAttribute('aria-current', String(a.dataset.view === k)));
    document.querySelectorAll('table.cases tbody tr').forEach((tr) => { tr.hidden = k !== 'all' && !tr.dataset.v.split(' ').includes(k); });
  };
  addEventListener('hashchange', apply); apply();
  document.querySelectorAll('table.cases tr[data-href]').forEach((tr) => tr.addEventListener('click', (e) => { if (!e.target.closest('a')) location.href = tr.dataset.href; }));
  ${
    live || b.grading === 'running'
      ? `let paused = false; try { paused = sessionStorage.getItem('evalPaused') === '1'; const y = sessionStorage.getItem('evalScroll'); if (y) scrollTo(0, +y); } catch {}
  const btn = document.getElementById('pause');
  const sync = () => { document.body.classList.toggle('paused', paused); if (btn) btn.textContent = paused ? 'Resume live updates' : 'Pause live updates'; };
  btn?.addEventListener('click', () => { paused = !paused; try { sessionStorage.setItem('evalPaused', paused ? '1' : '0'); } catch {} sync(); });
  sync();
  setInterval(() => { if (!paused) { try { sessionStorage.setItem('evalScroll', String(scrollY)); } catch {} location.reload(); } }, 6000);`
      : "try { sessionStorage.removeItem('evalScroll'); } catch {}"
  }
})();
</script>`,
    { openTasks: o.openTasks, current: 'evals', wide: true, css: CSS },
  );
}
