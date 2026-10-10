import { batchView } from './batchView.js';
import { esc, layout } from './pages.js';
import { STEP, confirmed, short, stuckOn } from './showData.js';
import { lastRun } from './status.js';
import type { Batch, OpsEvent, OpsRun, OpsStore } from './store.js';

/**
 * The live page: the same grid as the demo, but nothing is replayed. "Import cases" ingests every case in a
 * case folder, the case worker runs on each one for real, and the cards update as each case finishes:
 * done with its next step, handed to a person with the question, or failed. Each card opens the case,
 * its ANSWER.md and its REASONING.md.
 */

export type LiveCard = {
  id: string;
  no: string;
  title: string;
  stuck: string;
  stuckWhen: string;
  state: 'queued' | 'working' | 'done' | 'person' | 'failed';
  next: string;
  done: string[];
  denied: number;
  question?: string;
  taskId?: string;
  runId?: string;
  error?: string;
};
export type LiveData = {
  batch: { id: string; name: string; answers_dir: string } | null;
  cards: LiveCard[];
  totals: { cases: number; queued: number; working: number; handled: number; people: number; failed: number; cost: number };
};

export async function liveData(store: OpsStore, b: Batch | undefined): Promise<LiveData> {
  if (!b) return { batch: null, cards: [], totals: { cases: 0, queued: 0, working: 0, handled: 0, people: 0, failed: 0, cost: 0 } };
  const cs = await store.batchCases(b.id);
  const events: Record<string, OpsEvent[]> = {};
  const runs: Record<string, OpsRun[]> = {};
  for (const c of cs) {
    events[c.id] = await store.events(c.id);
    runs[c.id] = await store.runs(c.id);
  }
  const ids = new Set(cs.map((c) => c.id));
  const v = batchView(cs, events, (await store.listTasks()).filter((t) => ids.has(t.case_id)), runs);
  const cards: LiveCard[] = v.rows
    .map((r) => {
      const s = stuckOn(r.c.history_md);
      const state: LiveCard['state'] = r.state === 'queued' ? 'queued' : r.state === 'running' ? 'working' : r.state === 'failed' ? 'failed' : r.task ? 'person' : 'done';
      const withAnswer = (runs[r.c.id] ?? []).filter((x) => x.answer_md).at(-1);
      const label = r.next ? STEP[r.next.type] : undefined;
      const nextText = !r.next ? '' : r.next.action ? `${label ? `${label}: ` : ''}${short(r.next.action, 90)}` : (label ?? '');
      return {
        id: r.c.id,
        no: r.c.source_ref?.split('@')[0] ?? r.c.id,
        title: r.c.title.replace(/^Case \d+:\s*/, ''),
        stuck: s.text,
        stuckWhen: s.when,
        state,
        next: nextText,
        done: state === 'queued' || state === 'working' ? [] : confirmed(lastRun(events[r.c.id] ?? [])).slice(0, 3),
        denied: r.denied,
        question: r.task ? short(r.task.question, 140) : undefined,
        taskId: r.task?.id,
        runId: withAnswer?.id,
        error: r.error ? short(r.error, 120) : undefined,
      };
    })
    .sort((a, b) => a.no.localeCompare(b.no, undefined, { numeric: true }));
  const n = (s: LiveCard['state']) => cards.filter((c) => c.state === s).length;
  return {
    batch: { id: b.id, name: b.name, answers_dir: b.answers_dir },
    cards,
    totals: { cases: cards.length, queued: n('queued'), working: n('working'), handled: n('done'), people: n('person'), failed: n('failed'), cost: v.cost },
  };
}

const CSS = `
main.wide { max-width:1320px; }
.stagebar { display:flex; align-items:baseline; gap:var(--s6); flex-wrap:wrap; }
.clock { font-size:32px; line-height:40px; font-weight:600; font-variant-numeric:tabular-nums; }
.clock small { font-size:14px; font-weight:400; color:var(--fg-muted); margin-left:8px; }
.counters { display:flex; gap:var(--s6); margin-left:auto; flex-wrap:wrap; }
.counter b { display:block; font-size:24px; line-height:32px; font-weight:600; font-variant-numeric:tabular-nums; }
.counter span { font-size:13px; color:var(--fg-muted); }
.counter.needs b { color:var(--needs-fg); } .counter.ok b { color:var(--ok-fg); } .counter.work b { color:var(--info-fg); } .counter.bad b { color:var(--danger-fg); }
.bar { display:flex; align-items:center; gap:var(--s4); flex-wrap:wrap; margin:var(--s5) 0 var(--s4); }
.headline { font-size:20px; line-height:28px; font-weight:600; margin-right:auto; }
.bar form { display:flex; gap:var(--s2); align-items:center; }
.bar select { font:inherit; padding:7px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--fg); }
.progress { height:4px; border-radius:2px; background:var(--border-subtle); overflow:hidden; margin-bottom:var(--s4); }
.progress i { display:block; height:100%; width:0; background:var(--ok-fg); transition:width .6s ease; }
.grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:var(--s3); }
.c { position:relative; background:var(--surface); border:1px solid var(--border-subtle); border-radius:10px; padding:var(--s3) var(--s4); transition:border-color .3s, box-shadow .3s; animation:c-in .35s ease both; }
@keyframes c-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
.c .no { font-size:12px; color:var(--fg-muted); font-variant-numeric:tabular-nums; display:flex; justify-content:space-between; gap:var(--s2); }
.c .no a { color:var(--fg-muted); }
.c h3 { font-size:14px; line-height:20px; margin:2px 0 6px; } .c h3 a { color:inherit; text-decoration:none; } .c h3 a:hover { text-decoration:underline; }
.c .stuck { font-size:12px; line-height:16px; color:var(--fg-muted); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.c .state { margin-top:var(--s2); font-size:13px; line-height:18px; font-weight:600; color:var(--fg-muted); }
.c.working .state { color:var(--info-fg); }
.c.working { border-color:color-mix(in srgb, var(--info-fg) 45%, var(--border-subtle)); }
.c.done { border-color:color-mix(in srgb, var(--ok-fg) 40%, var(--border-subtle)); } .c.done .state { color:var(--ok-fg); }
.c.person { border-color:var(--needs-border); box-shadow:0 0 0 3px color-mix(in srgb, var(--needs-border) 30%, transparent); } .c.person .state { color:var(--needs-fg); }
.c.failed { border-color:var(--danger-border); } .c.failed .state { color:var(--danger-fg); }
.c .q { margin-top:4px; font-size:13px; line-height:18px; }
.c ul { list-style:none; margin:var(--s2) 0 0; padding:0; font-size:12px; line-height:17px; }
.c ul li::before { content:'✓ '; color:var(--ok-fg); font-weight:600; }
.c ul li.deny::before { content:'⊘ '; color:var(--policy-fg); }
.c .links { margin-top:var(--s2); font-size:13px; display:flex; gap:var(--s3); flex-wrap:wrap; } .c .links a { font-weight:600; }
.c .live { display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--info-fg); margin-right:6px; animation:pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 50% { opacity:.3; } }
.empty { margin-top:var(--s6); padding:var(--s6); border:1px dashed var(--border); border-radius:12px; text-align:center; color:var(--fg-muted); }
.empty p { max-width:60ch; margin:var(--s2) auto 0; }
.note { margin-top:var(--s5); font-size:13px; line-height:18px; color:var(--fg-muted); }
button.primary { font:inherit; font-weight:600; min-height:36px; padding:var(--s2) var(--s4); border-radius:6px; border:0; background:var(--accent); color:var(--surface); cursor:pointer; }
button.primary[disabled] { opacity:.5; cursor:progress; }
@media (max-width: 1100px) { .grid { grid-template-columns:repeat(3, minmax(0,1fr)); } }
@media (max-width: 760px) { .grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width: 520px) { .grid { grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce) { .c, .progress i { animation:none; transition:none; } .c .live { animation:none; } }
`;

export function livePage(o: { d: LiveData; sets: { id: string; name: string; count: number }[]; openTasks: number }) {
  const { d } = o;
  const importForm = (label: string) =>
    `<form method="post" action="/ops/live/import" id="import">${
      o.sets.length > 1 ? `<select name="set" aria-label="Case folder">${o.sets.map((s) => `<option value="${esc(s.id)}">${esc(s.name)} (${s.count})</option>`).join('')}</select>` : `<input type="hidden" name="set" value="${esc(o.sets[0]?.id ?? '')}">`
    }<button class="primary" type="submit"${o.sets.length ? '' : ' disabled'}>${esc(label)}</button></form>`;
  const body = `<div class="stagebar"><div class="clock" id="clock">&nbsp;</div>
<div class="counters"><div class="counter"><b id="k-cases">0</b><span>imported</span></div><div class="counter work"><b id="k-working">0</b><span>agent working</span></div><div class="counter ok"><b id="k-handled">0</b><span>handled, no staff time</span></div><div class="counter needs"><b id="k-people">0</b><span>need a person</span></div><div class="counter bad"><b id="k-failed">0</b><span>failed</span></div><div class="counter"><b id="k-cost">$0.00</b><span>model cost</span></div></div></div>
<div class="bar"><div class="headline" id="headline" aria-live="polite"></div>${importForm(d.batch ? 'Import again' : 'Import cases')}</div>
<div class="progress" aria-hidden="true"><i id="progress"></i></div>
<div class="grid" id="grid"></div>
${
  d.batch
    ? `<p class="note">Live run <a href="/ops/evals/${esc(d.batch.id)}">${esc(d.batch.name)}</a>. Every card is the real case worker on the real case; answers are written to <code>${esc(d.batch.answers_dir.replace(`${process.cwd()}/`, ''))}/&lt;case&gt;/ANSWER.md</code>.</p>`
    : `<div class="empty" id="empty"><b>No cases imported yet.</b><p>${o.sets.length ? `Import pulls in every case from ${esc(o.sets.map((s) => `${s.name} (${s.count})`).join(', '))}, runs the case worker on each one, and shows what it did, the next step, or the question for a person.` : 'No case folder found. Add cases under HackatonPublicCases/Property Management or set OPS_IMPORT_DIR.'}</p></div>`
}
<script>
const BATCH = ${JSON.stringify(d.batch?.id ?? null)};
let D = ${JSON.stringify(d).replace(/</g, '\\u003c')};
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const clock = () => { $('clock').innerHTML = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', '') + '<small>Dwelly operations, live</small>'; };
  clock(); setInterval(clock, 15000);
  const STATE = { queued: 'Queued', working: 'Agent working', done: 'Done', person: 'Needs a person', failed: 'Failed' };
  const cardHtml = (c) => {
    const state = c.state === 'working' ? '<span class="live" aria-hidden="true"></span>Agent working'
      : c.state === 'done' ? 'Done' + (c.next ? ': ' + esc(c.next) : ', no staff time')
      : c.state === 'person' ? 'Needs a person'
      : c.state === 'failed' ? 'Failed' + (c.error ? ': ' + esc(c.error) : '')
      : 'Queued';
    const list = c.done.map((t) => '<li>' + esc(t) + '</li>').join('') + (c.denied ? '<li class="deny">' + c.denied + ' action' + (c.denied > 1 ? 's' : '') + ' stopped by policy</li>' : '');
    const links = [c.taskId ? '<a href="/ops/tasks/' + esc(c.taskId) + '">Open in Decisions</a>' : '', c.runId ? '<a href="/ops/runs/' + esc(c.runId) + '/answer">Answer</a><a href="/ops/runs/' + esc(c.runId) + '/reasoning">Reasoning</a>' : ''].filter(Boolean).join('');
    return '<div class="no"><span>Case ' + esc(c.no) + '</span></div><h3><a href="/ops/cases/' + esc(c.id) + '">' + esc(c.title) + '</a></h3>'
      + '<div class="stuck">' + esc(c.stuckWhen) + (c.stuck ? ': ' + esc(c.stuck) : '') + '</div>'
      + '<div class="state">' + state + '</div>'
      + (c.question ? '<div class="q">' + esc(c.question) + '</div>' : '')
      + (list ? '<ul>' + list + '</ul>' : '') + (links ? '<div class="links">' + links + '</div>' : '');
  };
  const seen = {};
  const render = () => {
    const t = D.totals;
    $('k-cases').textContent = t.cases; $('k-working').textContent = t.working; $('k-handled').textContent = t.handled; $('k-people').textContent = t.people; $('k-failed').textContent = t.failed; $('k-cost').textContent = '$' + t.cost.toFixed(2);
    const finished = t.handled + t.people + t.failed;
    $('progress').style.width = t.cases ? (100 * finished / t.cases).toFixed(1) + '%' : '0';
    $('headline').textContent = !D.batch ? 'Import your open cases to start.'
      : t.queued + t.working ? finished + ' of ' + t.cases + ' cases done. ' + t.working + ' being worked on now.'
      : 'All ' + t.cases + ' cases worked: ' + t.handled + ' handled with no staff time, ' + t.people + ' need a person' + (t.failed ? ', ' + t.failed + ' failed' : '') + '.';
    const grid = $('grid');
    for (const c of D.cards) {
      let el = document.getElementById('c-' + c.id);
      if (!el) { el = document.createElement('article'); el.id = 'c-' + c.id; grid.appendChild(el); }
      const key = c.state + '|' + c.next + '|' + c.done.length + '|' + (c.taskId || '') + '|' + (c.runId || '');
      if (seen[c.id] === key) continue;
      seen[c.id] = key; el.className = 'c ' + c.state; el.innerHTML = cardHtml(c);
    }
  };
  render();
  const f = $('import'); if (f) f.addEventListener('submit', () => { const b = f.querySelector('button'); b.disabled = true; b.textContent = 'Importing…'; });
  if (!BATCH) return;
  let busy = false;
  const poll = async () => {
    if (busy) return; busy = true;
    try { const r = await fetch('/ops/api/live/' + encodeURIComponent(BATCH), { headers: { accept: 'application/json' } }); if (r.ok) { D = await r.json(); render(); } } catch {} finally { busy = false; }
    if (D.totals.queued + D.totals.working > 0) setTimeout(poll, 1500); else setTimeout(poll, 10000);
  };
  setTimeout(poll, 800);
})();
</script>`;
  return layout('Dwelly operations: live cases', body, { openTasks: o.openTasks, wide: true, css: CSS, current: 'live' });
}
