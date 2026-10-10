import { statSync } from 'node:fs';
import { parseHistory } from '../agent/publicCases.js';
import { batchView } from './batchView.js';
import { DEMO_CASE, recordedTranscript } from './demo.js';
import type { ShowCard, ShowData } from './showPage.js';
import { lastRun } from './status.js';
import type { OpsEvent, OpsStore } from './store.js';

/**
 * Subtitles: each turn cut into pieces of at most ~12 words (on sentence and comma breaks), each timed across the
 * turn in proportion to its words, so captions follow the speech instead of dumping a whole paragraph.
 */
function subtitles(turns: { role: string; text: string; t?: number }[]) {
  const out: { who: 'agent' | 'them'; text: string; t?: number }[] = [];
  turns.forEach((x, k) => {
    const who = (x.role === 'agent' ? 'agent' : 'them') as 'agent' | 'them';
    const parts: string[] = [];
    for (const sentence of x.text.split(/(?<=[.?!])\s+/)) {
      let cur: string[] = [];
      for (const w of sentence.split(/\s+/)) {
        cur.push(w);
        if (cur.length >= 12 || (cur.length >= 6 && /,$/.test(w))) (parts.push(cur.join(' ')), (cur = []));
      }
      if (cur.length) parts.push(cur.join(' '));
    }
    const start = x.t, end = turns[k + 1]?.t ?? (x.t !== undefined ? x.t + parts.length * 3 : undefined);
    const words = parts.map((p) => p.split(/\s+/).length), total = words.reduce((a, n) => a + n, 0);
    let acc = 0;
    parts.forEach((p, i) => {
      const t = start !== undefined && end !== undefined ? start + ((end - start) * acc) / Math.max(total, 1) : start;
      out.push({ who, text: p, t });
      acc += words[i];
    });
  });
  return out;
}

/** Real calls we can feature (data/private/calls), in order of preference, with the moments to play. */
const CALLS: Record<string, { name: string; context: string; result: string; ask: string; clips?: { from: number; to: number }[] }> = {
  conv_3701m4jznz2sejdtm7t74r99vdh8: {
    name: 'Mr Ingram',
    context: 'The tenant wants to fit her own washing machine. Who pays to fit it and to remove the old one?',
    result: '✓ Landlord approved: the tenant fits her own machine and pays to fit and remove. Read back and confirmed.',
    ask: 'Goal: the landlord’s decision, read back and recorded.',
    clips: [{ from: 175, to: 184 }, { from: 208, to: 214 }],
  },
  conv_3201m4k0h0f0f8k8x455asj8ywqj: {
    name: 'Mr Langley',
    context: 'Two quotes in: Eliza Bennett £1,370 (no VAT) or Kendall £2,040 inc VAT.',
    result: '✓ Landlord chose Eliza Bennett, £1,370. Read back and confirmed.',
    ask: 'Goal: get the landlord’s choice between two contractor quotes, read back and recorded.',
  },
};

/** Builds the show from real data: the latest graded eval run plus the Flat 9 case. */

/** The person's reply in the demo (their words, pre-filled so a 60-second video needn't wait on typing). */
const DRAFT = 'Hi, thanks for asking. Garage spaces are allocated by the building’s management company, so yes, you do need to register. I’ve asked them to send you the form today.';

const STEP: Record<string, string> = {
  REQUEST_LANDLORD_APPROVAL: 'asked the landlord to approve',
  ASSIGN_PROVIDER: 'contractor assigned',
  BOOK_OR_CONFIRM_APPOINTMENT: 'visit booked',
  CHASE_PROVIDER: 'contractor chased',
  CHASE_LANDLORD: 'landlord chased',
  CHASE_TENANT: 'tenant chased',
  SEND_QUOTE_FOR_APPROVAL: 'quote sent for approval',
  REPLY_TO_TENANT: 'tenant answered',
  REQUEST_INFORMATION: 'missing details requested',
  WAIT: 'follow-up set',
  CLOSE_WITH_PAYMENT: 'closed',
  CLOSE_WITHOUT_PAYMENT: 'closed',
};
const short = (t: string, n = 70) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const confirmed = (es: OpsEvent[]) =>
  es.filter((e) => ['action', 'message', 'follow_up'].includes(e.kind) && e.actor === 'agent' && e.status === 'verified').map((e) => short(e.title.replace(/^Whatsapp/, 'WhatsApp'), 64));

/** The last event before the agent took over: what the case was stuck on, in the workflow's own words. */
function stuckOn(historyMd: string) {
  const last = parseHistory(historyMd).events.at(-1);
  if (!last) return { when: '', text: '' };
  const line = last.body.split('\n').find((l) => l.trim() && !l.startsWith('- **')) ?? '';
  const channel = last.body.match(/^- \*\*Channel:\*\* (.*)$/m)?.[1] ?? '';
  const d = new Date(last.header.split(' — ')[0].replace(' UTC', 'Z').replace(' ', 'T'));
  const when = Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  return { when: `${channel || 'Update'}, ${when}`, text: short(line.trim(), 110) };
}

export async function showData(store: OpsStore): Promise<ShowData | undefined> {
  // The run to show: OPS_SHOW_RUN, else the graded run whose results on disk are newest (imports all look new).
  const age = (dir: string) => {
    try {
      return statSync(dir).mtimeMs;
    } catch {
      return 0;
    }
  };
  const batches = (await store.listBatches()).sort((x, y) => age(y.answers_dir) - age(x.answers_dir));
  const b = batches.find((x) => x.id === process.env.OPS_SHOW_RUN) ?? batches.find((x) => x.grading === 'done') ?? batches[0];
  if (!b) return undefined;
  const cs = await store.batchCases(b.id);
  const events: Record<string, OpsEvent[]> = {};
  for (const c of cs) events[c.id] = await store.events(c.id);
  const tasks = (await store.listTasks()).filter((t) => cs.some((c) => c.id === t.case_id));
  const runs: Record<string, Awaited<ReturnType<OpsStore['runs']>>> = {};
  for (const c of cs) runs[c.id] = await store.runs(c.id);
  const v = batchView(cs, events, tasks, runs);

  const asCard = (r: (typeof v.rows)[number]): ShowCard => {
    const s = stuckOn(r.c.history_md);
    return {
      id: r.c.id,
      no: r.c.source_ref?.split('@')[0] ?? r.c.id,
      title: r.c.title.replace(/^Case \d+:\s*/, ''),
      property: r.c.property ?? '',
      stuck: s.text,
      stuckWhen: s.when,
      done: confirmed(lastRun(events[r.c.id] ?? [])).slice(0, 3),
      next: r.next ? (STEP[r.next.type] ?? '') : '',
    };
  };
  const person = v.rows.find((r) => r.task);
  const clean = v.rows.filter((r) => !r.task && ['waiting', 'resolved'].includes(r.reason) && r.confirmed >= 2).slice(0, 10);
  const cards = clean.map(asCard);
  if (person) cards.splice(Math.min(5, cards.length), 0, { ...asCard(person), person: { question: short(person.task!.question, 90), href: `/ops/tasks/${person.task!.id}?from=show&draft=${encodeURIComponent(DRAFT)}` } });

  // Preferred: a real call with a real person (a voice case), its real recording and the case worker's real follow-ups.
  // Which real call to feature, best first (OPS_SHOW_CALL overrides): the positive landlord approval, then the VAT one.
  const prefer = [process.env.OPS_SHOW_CALL, ...Object.keys(CALLS)].filter(Boolean) as string[];
  const rank = (ref?: string | null) => { const i = prefer.indexOf(ref ?? ''); return i < 0 ? 99 : i; };
  const voice = (await store.listCases(200)).filter((c) => c.source === 'voice' && c.source_ref?.startsWith('conv_')).sort((a, b) => rank(a.source_ref) - rank(b.source_ref));
  for (const vc of voice) {
    const ve = await store.events(vc.id);
    const callEv = ve.find((e) => e.kind === 'call');
    const turns = (callEv?.data?.turns as { role: string; text: string; t?: number }[] | undefined) ?? [];
    if (!callEv || !turns.length || vc.status === 'agent_working' || vc.status === 'queued') continue;
    const no = vc.id.match(/^V(\d{3})/)?.[1] ?? '';
    const i = cards.findIndex((c) => c.no === no);
    if (i >= 0) cards.splice(i, 1);
    const before = parseHistory(vc.history_md).events.filter((e) => !/Channel:\*\* (Call|Update)/.test(e.body) || !e.body.includes('by phone'));
    const s = stuckOn(vc.history_md.split(/<a id="event-\d+"><\/a>\n## [^\n]*\n\n- \*\*Channel:\*\* Call/)[0]);
    const after = lastRun(ve);
    cards.splice(Math.min(2, cards.length), 0, {
      id: vc.id,
      no,
      title: vc.title.replace(/^Case [\w-]+:\s*/, ''),
      property: vc.property ?? '',
      stuck: s.text || 'Two quotes in; the landlord has to choose.',
      stuckWhen: s.when || `${before.length} events so far`,
      done: [...confirmed(after), ...after.filter((e) => e.kind === 'blocked').map((e) => `⊘ ${short(e.title.replace('Denied by policy: ', 'Not allowed yet: '), 60)}`)].slice(0, 6),
      next: 'follow-ups done',
      call: true,
    });
    const at = new Date(callEv.ts).toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const conv = vc.source_ref!;
    // The moments that tell the story: the two quotes, the doubt about VAT, the decision read back.
    const find = (re: RegExp) => turns.find((x) => re.test(x.text))?.t;
    const q = find(/We have a quote from/), dodgy = find(/sounds dodgy/), choose = find(/choose Eliza/), recorded = find(/That's recorded|I'll record that/);
    const yes = find(/Yes, of course/);
    const env = process.env.OPS_SHOW_CLIPS?.split(',').map((p) => p.split('-').map(Number)).filter((p) => p.length === 2 && p.every(Number.isFinite)).map(([from, to]) => ({ from, to }));
    const cfg = CALLS[vc.source_ref!];
    // One short window per call, chosen for the video; the VAT call falls back to its "That sounds dodgy" moment.
    const clips = env?.length ? env : cfg?.clips ?? (dodgy !== undefined ? [{ from: dodgy - 0.5, to: dodgy + 12 }] : undefined);
    void yes; void recorded;
    void q; void choose;
    const call = {
      name: cfg?.name ?? 'Mr Langley',
      role: 'Landlord (volunteer)',
      ask: cfg?.ask ?? 'Goal: get the landlord’s choice between two contractor quotes, read back and recorded.',
      lines: subtitles(turns),
      context: cfg?.context ?? 'Two quotes in: Eliza Bennett £1,370 (no VAT) or Kendall £2,040 inc VAT.',
      result: cfg?.result ?? '✓ Landlord chose Eliza Bennett, £1,370. Read back and confirmed.',
      audioUrl: `/ops/show/audio/${conv}`,
      clips,
      real: { who: 'Real call with a real person, trimmed', note: 'A random person who joined from my LinkedIn post played the landlord.', when: `Recorded ${at}` },
    };
    return finish(call);
  }
  return finish(undefined);

  async function finish(realCall: ShowData['call'] | undefined): Promise<ShowData> {
  if (realCall) {
    const auto = v.rows.filter((r) => !r.task && r.state === 'done').length;
    return { cards, more: cs.length - (cards.length - 1), totals: { cases: cs.length, auto, people: new Set(tasks.map((t) => t.case_id)).size, cost: v.cost, mean: v.meanScore }, call: realCall, runName: b!.name };
  }
  // Flat 9: what the case worker really did after the landlord call (falls back to the recorded run's steps).
  const demo = await store.getCase(DEMO_CASE);
  const de = demo ? lastRun(await store.events(DEMO_CASE)) : [];
  const after = de.some((e) => e.title.includes('after the call'))
    ? [...confirmed(de), ...de.filter((e) => e.kind === 'blocked').map((e) => `⊘ ${short(e.title.replace('Denied by policy: ', 'Not allowed yet: '), 60)}`)]
    : ['Recorded landlord decision: approved £700', 'Approved quote £640 for HeatRight Ltd', 'Assigned HeatRight Ltd, Monday 8am–12pm', 'WhatsApp to Priya Shah (tenant)', '⊘ Not allowed yet: set visit before HeatRight confirms'];
  cards.splice(Math.min(2, cards.length), 0, {
    id: DEMO_CASE,
    no: 'Flat 9',
    title: 'No hot water at Flat 9',
    property: 'Flat 9, 3 Amhurst Road',
    stuck: 'HeatRight quote £640 is over the landlord’s £300 limit. Landlord approval needed.',
    stuckWhen: 'Email, today',
    done: after.slice(0, 6),
    next: 'repair booked',
    call: true,
  });

  const auto = v.rows.filter((r) => !r.task && r.state === 'done').length + 1;
  const people = new Set(tasks.map((t) => t.case_id)).size;
  return {
    cards,
    more: cs.length + 1 - cards.length,
    totals: { cases: cs.length + 1, auto, people, cost: v.cost, mean: v.meanScore },
    call: {
      name: 'Ben Hartley',
      role: 'Landlord',
      ask: 'Goal: get the landlord’s decision on HeatRight’s £640 quote, read back and recorded.',
      lines: recordedTranscript(false).map((l) => ({ who: l.role === 'agent' ? 'agent' : 'them', text: l.message })),
    },
    runName: b!.name,
  };
  }
}
