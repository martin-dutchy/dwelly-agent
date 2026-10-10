import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { loadCase } from '../cases.js';
import { hintsFor, reconstructState, renderHints, stateInputFromDir } from './stateReconstruct.js';

const PM = 'HackatonPublicCases/Property Management';
const stateAt = (id: string, at: number) => {
  const c = loadCase(`${PM}/${id}`, String(at));
  expect(c.cutoff).toBe(at);
  return reconstructState(stateInputFromDir(c.dir, c.cutoff)!);
};

describe('case-state hints (AC3)', () => {
  it('047 at cut 10: flags the landlord naming another property', () => {
    const s = stateAt('047', 10);
    expect(s.property?.postcode).toBe('ZZ3 7ZZ');
    expect(s.addressMismatches).toEqual([expect.objectContaining({ event: 10, postcode: 'ZZ3 5ZZ', expected: 'ZZ3 7ZZ' })]);
    const text = hintsFor(loadCase(`${PM}/047`, '10')).text;
    expect(text).toMatch(/event 010 mentions ZZ3 5ZZ, not the case property's ZZ3 7ZZ/);
  });

  it('047 at cut 7: no mismatch yet, but the tenant-added toilet is a candidate separate issue', () => {
    const s = stateAt('047', 7);
    expect(s.addressMismatches).toEqual([]);
    expect(s.unrelatedIssues).toEqual([expect.objectContaining({ event: 6, noun: 'toilet', from: 'tenant' })]);
    expect(s.holds.at(-1)).toMatchObject({ event: 7, party: 'landlord' });
  });

  it('025 at cut 30: lists conflicting appointment dates with their events', () => {
    const s = stateAt('025', 30);
    const disagree = s.appointmentConflicts.find((c) => c.startsWith('appointment dates disagree'));
    expect(disagree).toBeDefined();
    expect(disagree).toContain('22/05/2024');
    expect(disagree).toContain('21/06/2024');
    expect(disagree).toMatch(/event 027/);
    expect(disagree).toMatch(/event 028/);
    expect(s.latestPrompt?.text).toMatch(/No work results/);
    expect(renderHints(s)).toMatch(/Date check: appointment dates disagree/);
  });

  it('002 at cut 18: quote sent to the landlord, awaiting approval', () => {
    const s = stateAt('002', 18);
    expect(s.stage).toMatchObject({ name: 'quote_awaiting_landlord', event: 17 });
    expect(s.approvals.at(-1)).toMatchObject({ event: 17, topic: 'quote' });
    expect(s.approvals.at(-1)?.reply).toBeUndefined();
    expect(s.holds.at(-1)).toMatchObject({ event: 18, party: 'landlord' });
    expect(s.holds.at(-1)?.resumedBy).toBeUndefined();
    expect(renderHints(s)).toMatch(/Open approval: asked the landlord \(quote\) at event 017/);
  });

  it("002 at cut 19: the landlord's reply answers the open approval", () => {
    const s = stateAt('002', 19);
    expect(s.stage?.name).toBe('quote_reply_received');
    expect(s.approvals.at(-1)?.reply).toMatchObject({ event: 19, text: 'Please approve this quote for works.' });
    expect(s.holds.at(-1)?.resumedBy?.event).toBe(19);
    expect(renderHints(s)).toContain('landlord replied at event 019, 2026-08-12: "Please approve this quote for works."');
  });
});

describe('case-state hints: unfamiliar input', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'hints-'));
  afterAll(() => rmSync(tmp, { recursive: true, force: true }));

  it('practice-format cases render nothing and report no error', () => {
    expect(hintsFor(loadCase('cases/practice/01'))).toEqual({ text: '' });
  });

  it('a history without event anchors renders nothing and reports why', () => {
    writeFileSync(join(tmp, 'index.md'), '# Case X\n\n- **Property:** 1 Test Road, ZZ1 1ZZ\n');
    writeFileSync(join(tmp, 'history.md'), '# Case X history\n\n2024-01-01 the tenant emailed about a leak.\n');
    const r = hintsFor({ dir: tmp });
    expect(r.text).toBe('');
    expect(r.hintsError).toMatch(/no event anchors/);
  });

  it('errors inside the parse never escape hintsFor', () => {
    expect(renderHints(reconstructState({ events: [] }))).toBe('');
    writeFileSync(join(tmp, 'history.md'), '<a id="event-001"></a>\n');
    expect(() => hintsFor({ dir: tmp })).not.toThrow();
    const broken = mkdtempSync(join(tmpdir(), 'hints-broken-'));
    writeFileSync(join(broken, 'index.md'), '# Case Y\n');
    mkdirSync(join(broken, 'history.md'));
    const r = hintsFor({ dir: broken });
    rmSync(broken, { recursive: true, force: true });
    expect(r.text).toBe('');
    expect(r.hintsError).toBeTruthy();
  });
});
