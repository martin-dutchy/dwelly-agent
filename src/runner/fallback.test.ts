import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { CaseBundle } from '../agent/harness/contracts.js';
import { crashFiles, rawManifest } from './fallback.js';

const FIXTURE = resolve(import.meta.dirname, '../agent/fixtures/bundles/practice-05.json');
const fixture = (): CaseBundle => JSON.parse(readFileSync(FIXTURE, 'utf8'));

const tmps: string[] = [];
const tmp = () => {
  const d = mkdtempSync(join(tmpdir(), 'fallback-'));
  tmps.push(d);
  return d;
};
afterEach(() => {
  for (const d of tmps.splice(0)) {
    chmodSync(d, 0o755);
    rmSync(d, { recursive: true, force: true });
  }
});

describe('crashFiles', () => {
  it('from a bundle: outcome, manifest, parties, the last 5 events and every question answered "not processed"', () => {
    const b: CaseBundle = {
      ...fixture(),
      parties: [
        { role: 'tenant', name: 'Priya Shah', contacts: ['07700 900123'], sources: ['crm:tenant'] },
        { role: 'landlord', name: 'Mr Okafor', contacts: [], sources: ['crm:landlord'] },
      ],
      events: Array.from({ length: 7 }, (_, i) => ({ id: `ev:${i + 1}`, at: `2026-10-0${i + 1}`, channel: 'email' as const, from: 'tenant', text: `event number ${i + 1}`, doc: 'doc:inputs/email_quote.eml' })),
    };
    const { answer, result } = crashFiles('05', 'boom', { bundle: b });
    expect(answer).toContain('**Outcome:** escalated (system failure)');
    expect(answer).toContain('Failure: boom');
    for (const m of b.manifest) expect(answer).toContain(`| ${m.path} |`);
    expect(answer).toContain('From the ingested case.');
    expect(answer).toContain('- tenant: Priya Shah (07700 900123)');
    expect(answer).toContain('- landlord: Mr Okafor');
    for (const n of [3, 4, 5, 6, 7]) expect(answer).toContain(`event number ${n}`);
    for (const n of [1, 2]) expect(answer).not.toContain(`event number ${n}`);
    b.questions.forEach((q, i) => expect(answer).toContain(`${i + 1}. ${q}\n   - not processed`));
    expect(answer.match(/not processed/g)).toHaveLength(b.questions.length);
    expect(result).toMatchObject({ id: '05', crashed: true, decision: null, error: 'boom', manifest: b.manifest });
  });

  it('is deterministic: the same inputs give byte-identical files', () => {
    const a = crashFiles('05', 'boom', { bundle: fixture() });
    const b = crashFiles('05', 'boom', { bundle: fixture() });
    expect(b.answer).toBe(a.answer);
    expect(b.reasoning).toBe(a.reasoning);
  });

  it('without a bundle: a raw listing of the folder, harness files marked, questions read from the brief', () => {
    const d = tmp();
    mkdirSync(join(d, 'inputs'));
    writeFileSync(join(d, 'case.md'), '# Leak\n\n## Questions\n1. Who pays?\n2. What next?\n');
    writeFileSync(join(d, 'inputs/email.eml'), 'x');
    writeFileSync(join(d, 'tool_failures.json'), '{nope');
    const { answer, reasoning } = crashFiles('X', 'ingest exploded', { dir: d });
    expect(answer).toContain('From a raw listing of the case folder (ingest did not finish).');
    expect(answer).toContain('| case.md | markdown | not read | no |');
    expect(answer).toContain('| inputs/email.eml | email | not read | no | 1 bytes |');
    expect(answer).toMatch(/\| tool_failures\.json \| json \| not read \| no \| 5 bytes, grading or test-harness file \|/);
    expect(answer).toContain('1. Who pays?\n   - not processed');
    expect(answer).toContain('2. What next?\n   - not processed');
    expect(answer).toContain('None identified before the failure.');
    expect(answer).toContain('None extracted before the failure.');
    expect(reasoning).toContain('No tool was called.');
  });

  it('a folder that cannot be listed still gives an answer', () => {
    const d = tmp();
    chmodSync(d, 0o000);
    expect(rawManifest(d)[0]).toMatchObject({ path: '.', included: false });
    expect(crashFiles('Y', 'gone', { dir: d }).answer).toContain('escalated (system failure)');
  });

  it('lists the tool calls made before the failure, none as verified', () => {
    const { answer, reasoning } = crashFiles('Z', 'stopped', {
      bundle: fixture(),
      toolCalls: [
        { at: '2026-10-10T10:00:00Z', tool: 'send_message', status: 'ok' },
        { at: '2026-10-10T10:00:01Z', tool: 'add_note', status: 'running' },
        { at: '2026-10-10T10:00:02Z', tool: 'close_ticket', status: 'refused' },
      ],
    });
    expect(answer).toContain('- `send_message`: completed, not verified');
    expect(answer).toContain('- `add_note`: still running when the case was stopped');
    expect(answer).toContain('- `close_ticket`: refused, the case had been stopped');
    expect(reasoning).toContain('3 tool call(s) were seen before the failure; none is reported as verified.');
  });
});
