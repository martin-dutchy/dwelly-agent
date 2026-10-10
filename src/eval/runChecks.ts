// Deterministic checks alone, no API key: pnpm checks --cases <dir> --answers <dir> [--only 01,06] [--write]
// Reads <answers>/<id>/{result.json,ANSWER.md,trace.jsonl}. Read-only unless --write (then it writes checks-result.json
// next to each answer). Exits 1 on a malformed checks.json (before anything else) or on any failed critical/prohibited check.
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { listCases } from '../agent/cases.js';
import { type ChecksFile, CheckSpecError, loadChecks, runCaseChecks } from './checks.js';

/** Loads every case's checks.json; returns the load errors instead of throwing so all of them are reported at once. */
export function loadAllChecks(caseDirs: string[]) {
  const specs = new Map<string, ChecksFile | undefined>();
  const errors: string[] = [];
  for (const dir of caseDirs) {
    try {
      specs.set(dir, loadChecks(dir));
    } catch (e) {
      if (!(e instanceof CheckSpecError)) throw e;
      errors.push(e.message);
    }
  }
  return { specs, errors };
}

export const specErrorLine = (msg: string) => `✗ CHECK SPEC ${msg}`;

if (process.argv[1] && /runChecks\.ts$/.test(process.argv[1])) {
  const { values } = parseArgs({
    options: { cases: { type: 'string', default: 'cases/practice' }, answers: { type: 'string', default: 'ANSWERS' }, only: { type: 'string' }, write: { type: 'boolean', default: false } },
  });
  const only = values.only?.split(',').map((s) => s.trim());
  const dirs = listCases(values.cases!).filter((d) => !only || only.some((o) => d.endsWith(`/${o}`)));
  const { specs, errors } = loadAllChecks(dirs);
  for (const e of errors) console.log(specErrorLine(e));
  if (errors.length) process.exit(1);

  let criticalFailed = 0;
  let evaluated = 0;
  for (const dir of dirs) {
    const id = dir.split('/').at(-1)!;
    const answersDir = join(values.answers!, id);
    if (!existsSync(answersDir)) {
      console.log(`  - ${id}: no answers folder`);
      continue;
    }
    const r = runCaseChecks(dir, answersDir, specs.get(dir));
    evaluated++;
    if (values.write) writeFileSync(join(answersDir, 'checks-result.json'), JSON.stringify(r, null, 2));
    const passed = r.results.filter((x) => x.pass).length;
    console.log(`  ${r.critical.length ? '✗' : '✓'} ${id} checks ${passed}/${r.results.length}${r.failed.length ? ` failed: ${r.failed.join(',')}` : ''}`);
    for (const f of r.results.filter((x) => !x.pass)) {
      const crit = f.severity === 'critical' || f.severity === 'prohibited';
      if (crit) criticalFailed++;
      console.log(`${crit ? '✗ CHECK FAILED' : '    ·'} ${id} ${f.id} [${f.severity}]: ${f.detail}`);
    }
  }
  console.log(`Checks: ${evaluated} case(s) evaluated · ${criticalFailed} critical/prohibited failure(s)`);
  if (criticalFailed) process.exitCode = 1;
}
