// --resume: which case folders already hold a finished, decided run.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Row } from './types.js';

function readResult(outDir: string): any {
  try {
    return JSON.parse(readFileSync(join(outDir, 'result.json'), 'utf8'));
  } catch {
    return undefined;
  }
}

/** Complete = ANSWER.md, REASONING.md and a parseable result.json with a decision, not crashed, not skipped. */
export function isComplete(outDir: string): boolean {
  if (!existsSync(join(outDir, 'ANSWER.md')) || !existsSync(join(outDir, 'REASONING.md'))) return false;
  const r = readResult(outDir);
  return !!r && typeof r === 'object' && r.decision != null && !r.crashed && !r.skipped;
}

/** The summary row for a case kept from an earlier run. Only call when `isComplete(outDir)`. */
export function resumedRow(outDir: string, fallbackId: string): Row {
  const r = readResult(outDir) ?? {};
  const ledger: { status?: string }[] = Array.isArray(r.ledger) ? r.ledger : [];
  return {
    id: r.id ?? fallbackId,
    outcome: r.decision?.outcome ?? 'NO DECISION',
    actions: ledger.length,
    failed: ledger.filter((e) => e.status !== 'verified').length,
    cost: 0,
    secs: 0,
    retries: 0,
    note: 'resumed',
  };
}
