import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { isComplete, resumedRow } from './resume.js';

const dirs: string[] = [];
function folder(files: Record<string, string>) {
  const d = mkdtempSync(join(tmpdir(), 'resume-'));
  dirs.push(d);
  for (const [name, body] of Object.entries(files)) writeFileSync(join(d, name), body);
  return d;
}
const result = (r: object) => JSON.stringify(r);
const decided = { id: 'X1', decision: { outcome: 'escalated' }, ledger: [{ status: 'verified' }, { status: 'failed' }] };
const complete = { 'ANSWER.md': 'a', 'REASONING.md': 'r', 'result.json': result(decided) };

afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })));

describe('isComplete', () => {
  it('accepts a complete decided folder', () => expect(isComplete(folder(complete))).toBe(true));
  it('rejects a missing REASONING.md', () => {
    const { 'REASONING.md': _, ...rest } = complete;
    expect(isComplete(folder(rest))).toBe(false);
  });
  it('rejects decision: null', () => expect(isComplete(folder({ ...complete, 'result.json': result({ ...decided, decision: null }) }))).toBe(false));
  it('rejects crashed', () => expect(isComplete(folder({ ...complete, 'result.json': result({ ...decided, crashed: true }) }))).toBe(false));
  it('rejects budget-skipped', () => expect(isComplete(folder({ ...complete, 'result.json': result({ ...decided, skipped: 'budget' }) }))).toBe(false));
  it('rejects an unparsable result.json', () => expect(isComplete(folder({ ...complete, 'result.json': '{oops' }))).toBe(false));
  it('rejects a missing result.json', () => {
    const { 'result.json': _, ...rest } = complete;
    expect(isComplete(folder(rest))).toBe(false);
  });
  it('rejects a folder that does not exist', () => expect(isComplete(join(tmpdir(), 'no-such-case-folder-xyz'))).toBe(false));
});

describe('resumedRow', () => {
  it('reads the outcome and ledger counts from result.json', () => {
    expect(resumedRow(folder(complete), 'fallback')).toMatchObject({ id: 'X1', outcome: 'escalated', actions: 2, failed: 1, note: 'resumed' });
  });
});
