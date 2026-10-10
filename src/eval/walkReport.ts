// Timeline report for case walks: for every step of every walk, what arrived, what the agency did next,
// what the agent did, and the judge's verdict. Reads the folders a run (or pnpm loop --split walks) wrote.
// Usage: pnpm walk-report --answers runs/loop/<run>/cases-walks [--cases cases/walks]
// Writes <answers>/WALKS.md and prints it. Pass = no critical, no red flag and every required outcome met (as pnpm loop).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { listCases } from '../agent/cases.js';

const { values } = parseArgs({ options: { cases: { type: 'string', default: 'cases/walks' }, answers: { type: 'string' } } });
if (!values.answers) throw new Error('--answers <dir> is required');

const readJson = (p: string) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : undefined);
const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');

type Step = { id: string; walk: string; step: number; steps: number; cut: number; trigger: string; agency: string; agent: string; score: number | null; pass: boolean | null; misses: string[] };

const steps: Step[] = listCases(values.cases!).flatMap((dir) => {
  const exp = readJson(join(dir, 'expected.json'));
  if (!exp?.walk) return [];
  const id = dir.split('/').at(-1)!;
  const out = join(values.answers!, id);
  const result = readJson(join(out, 'result.json'));
  const g = readJson(join(out, 'grades.json'));
  const d = result?.decision;
  const agent = d
    ? `**${d.outcome}**: ${(d.next_actions ?? []).map((n: { type: string; recipient: string; channel: string }) => `${n.type} → ${n.recipient} (${n.channel})`).join('; ')}`
    : result?.error
      ? `error: ${result.error}`
      : existsSync(out)
        ? 'no decision'
        : 'not run';
  const verdict = (itemId: string) => g?.grades?.items?.find((i: { id: string }) => i.id === itemId)?.verdict ?? 'unclear';
  const misses = (g?.items ?? [])
    .filter((it: { id: string }) => (it.id.startsWith('R') ? verdict(it.id) !== 'true' : /^[FXC]/.test(it.id) && verdict(it.id) !== 'false'))
    .map((it: { id: string; text: string }) => `${it.id} ${verdict(it.id)}: ${it.text.slice(0, 90)}${it.text.length > 90 ? '…' : ''}`);
  const judged = typeof g?.score === 'number';
  return [
    {
      id,
      walk: exp.walk,
      step: exp.step,
      steps: exp.steps,
      cut: exp.cut_after,
      trigger: exp.trigger,
      agency: exp.agency_next,
      agent,
      score: judged ? g.score : null,
      pass: judged ? !g.critical?.length && !g.redFlags?.length && g.required === 1 : null,
      misses,
    },
  ];
});

const walks = [...new Set(steps.map((s) => s.walk))].sort();
const lines = [`# Case walks: ${values.answers}`, ''];
lines.push('| Walk | Steps run | Passed | Mean score | First failed step |', '|---|---|---|---|---|');
for (const w of walks) {
  const ws = steps.filter((s) => s.walk === w).sort((a, b) => a.step - b.step);
  const judged = ws.filter((s) => s.score !== null);
  const mean = judged.length ? (judged.reduce((a, s) => a + s.score!, 0) / judged.length).toFixed(1) : '-';
  const firstFail = ws.find((s) => s.pass === false);
  lines.push(`| ${w} | ${judged.length}/${ws[0].steps} | ${ws.filter((s) => s.pass).length} | ${mean} | ${firstFail ? `step ${firstFail.step} (after event ${firstFail.cut})` : '-'} |`);
}
for (const w of walks) {
  lines.push('', `## ${w}`, '', '| Step | Arrived (last event the agent saw) | Agency did next | Agent did | Score |', '|---|---|---|---|---|');
  for (const s of steps.filter((s) => s.walk === w).sort((a, b) => a.step - b.step)) {
    const mark = s.pass === null ? '' : s.pass ? ' ✓' : ' ✗';
    lines.push(`| ${s.step}/${s.steps} | ${cell(s.trigger)} | ${cell(s.agency)} | ${cell(s.agent)} | ${s.score ?? '-'}${mark}${s.misses.length ? `<br>${s.misses.map(cell).join('<br>')}` : ''} |`);
  }
}
const md = `${lines.join('\n')}\n`;
writeFileSync(join(values.answers!, 'WALKS.md'), md);
console.log(md);
