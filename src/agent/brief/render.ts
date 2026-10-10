// The brief as prompt text: questions, conflicts, deadlines, money, parties, stage, then facts and notes.
// Bounded: lower sections give way first, conflicts last and never before every other section is gone.
import type { CaseBrief, Conflict, Fact } from '../harness/contracts.js';
import { weekdayOf } from './model.js';

export const MAX_BRIEF_CHARS = 8000;

type Section = { title: string; lines: string[]; /** Lower gives way first. */ rank: number };

const src = (ids: readonly string[] | undefined) => (ids?.length ? ` (sources: ${ids.join(', ')})` : '');
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const SEVERITY: Record<Conflict['severity'], number> = { block: 0, warn: 1, info: 2 };
const factLine = (f: Fact) => `- ${f.value}${src(f.sources)}`;

function sections(b: CaseBrief): Section[] {
  const out: Section[] = [];
  const list = <T>(xs: T[] | undefined) => (Array.isArray(xs) ? xs : []);
  const questions = list(b.questions).filter((q) => typeof q === 'string' && q.trim());
  if (questions.length) out.push({ title: '### Questions to answer (answer each, in its own wording)', lines: questions.map((q, i) => `${i + 1}. ${q}`), rank: 100 });
  const conflicts = [...list(b.conflicts)].sort((x, y) => (SEVERITY[x.severity] ?? 3) - (SEVERITY[y.severity] ?? 3));
  out.push({
    title: `### Conflicts and checks (${conflicts.length}): acknowledge each in \`conflicts\` or \`assumptions\`, or act on it`,
    lines: conflicts.length ? conflicts.map((c) => `- [${c.severity}] ${c.kind}: ${c.detail}${src(c.sources)}`) : ['- none found by code; still read the files for contradictions'],
    rank: 90,
  });
  const deadlines = list(b.deadlines);
  if (deadlines.length) out.push({ title: '### Deadlines', lines: deadlines.map((d) => `- ${d.due}${b.now && d.due < b.now.slice(0, d.due.length) ? ' (passed)' : ''} [${d.basis}] ${d.what}${src(d.sources)}`), rank: 60 });
  const money = b.money ?? { quotes: [], approvals: [], invoices: [] };
  const mlines = [
    money.spendLimit ? `- Spend limit: ${money.spendLimit.value}${src(money.spendLimit.sources)}` : undefined,
    ...list(money.quotes).map((f) => `- Quote: ${f.value}${src(f.sources)}`),
    ...(list(money.approvals).length ? list(money.approvals).map((f) => `- Approval: ${f.value}${src(f.sources)}`) : list(money.quotes).length || list(money.invoices).length ? ['- Approvals: none recorded in the files'] : []),
    ...list(money.invoices).map((f) => `- Invoice: ${f.value}${src(f.sources)}`),
  ].filter((l): l is string => !!l);
  if (mlines.length) out.push({ title: '### Money', lines: mlines, rank: 70 });
  const parties = list(b.parties);
  if (parties.length) out.push({ title: '### Parties', lines: parties.map((p) => `- ${p.role}: ${p.name ?? '(name not given)'}${list(p.contacts).length ? `; ${p.contacts.join(', ')}` : ''}${src(p.sources)}`), rank: 50 });
  if (b.stage) out.push({ title: '### Stage', lines: [`- ${b.stage}`], rank: 80 });
  const facts = list(b.facts);
  if (facts.length) out.push({ title: '### Facts', lines: facts.map((f) => factLine({ ...f, value: `[${f.kind}] ${f.value}` })), rank: 40 });
  const notes = list(b.notes).filter((n) => typeof n === 'string' && n.trim());
  if (notes.length) out.push({ title: '### Other derived notes', lines: notes, rank: 30 });
  return out;
}

function assemble(b: CaseBrief, secs: Section[]): string {
  const now = typeof b.now === 'string' && /^\d{4}-\d{2}-\d{2}/.test(b.now) ? `Now: ${weekdayOf(b.now)} ${b.now.replace('T', ' ')}` : undefined;
  return [
    '<case_brief>',
    '## Case brief (derived by code from the case files; check each line against its sources before relying on it)',
    ...(now ? [now] : []),
    ...secs.filter((s) => s.lines.length).flatMap((s) => ['', s.title, ...s.lines]),
    '</case_brief>',
  ].join('\n');
}

/** Drops lines from the lowest-ranked sections until the text fits, then shortens what is left. */
function fit(b: CaseBrief, secs: Section[], max: number): string {
  let text = assemble(b, secs);
  const byRank = [...secs].sort((x, y) => x.rank - y.rank);
  for (const s of byRank) {
    if (s.rank >= 90) break;
    const total = s.lines.length;
    while (text.length > max && s.lines.length) {
      s.lines.pop();
      const omitted = total - s.lines.length;
      text = assemble(b, secs.map((x) => (x === s ? { ...x, lines: s.lines.length ? [...s.lines, `- (${omitted} more omitted)`] : [] } : x)));
    }
    if (s.lines.length < total && s.lines.length) s.lines.push(`- (${total - s.lines.length} more omitted)`);
    if (text.length <= max) return text;
  }
  for (const n of [400, 240, 160]) {
    for (const s of secs) s.lines = s.lines.map((l) => clip(l, n));
    text = assemble(b, secs);
    if (text.length <= max) return text;
  }
  for (const s of byRank) {
    const total = s.lines.length;
    while (text.length > max && s.lines.length > 1) {
      s.lines.pop();
      text = assemble(b, secs.map((x) => (x === s ? { ...x, lines: [...s.lines, `- (${total - s.lines.length} more omitted)`] } : x)));
    }
    if (s.lines.length < total) s.lines.push(`- (${total - s.lines.length} more omitted)`);
    text = assemble(b, secs);
    if (text.length <= max) return text;
  }
  return `${text.slice(0, max - 20)}\n…\n</case_brief>`;
}

/** The brief as prompt text, at most `max` characters. Never throws. */
export function renderBrief(brief: CaseBrief, max = MAX_BRIEF_CHARS): string {
  try {
    if (!brief || typeof brief !== 'object') return '';
    return fit(brief, sections(brief), max);
  } catch {
    try {
      const qs = Array.isArray(brief?.questions) ? brief.questions.filter((q) => typeof q === 'string') : [];
      return qs.length ? clip(['<case_brief>', '### Questions to answer', ...qs.map((q, i) => `${i + 1}. ${q}`), '</case_brief>'].join('\n'), max) : '';
    } catch {
      return '';
    }
  }
}
