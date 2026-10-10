import { describe, expect, it } from 'vitest';
import type { CaseBrief, CaseBundle, Conflict } from '../harness/contracts.js';
import { MAX_BRIEF_CHARS, compileBrief, renderBrief } from './index.js';
import { FIXTURES, citedSources, fixture } from './testing.js';

const emptyBrief = (o: Partial<CaseBrief> = {}): CaseBrief => ({ parties: [], facts: [], conflicts: [], deadlines: [], money: { quotes: [], approvals: [], invoices: [] }, questions: [], tags: [], notes: [], ...o });
const conflict = (i: number, severity: Conflict['severity'] = 'warn'): Conflict => ({ kind: 'other', severity, detail: `conflict number ${i} ${'x'.repeat(60)}`, sources: [`doc:inputs/f${i}.txt`] });

describe('renderBrief (C5)', () => {
  it('orders questions, conflicts, deadlines, money, parties, stage, and shows source ids on conflicts', () => {
    const text = renderBrief(compileBrief(fixture('practice-17')));
    const at = ['### Questions to answer', '### Conflicts and checks', '### Deadlines', '### Money', '### Parties', '### Stage'].map((h) => text.indexOf(h));
    expect(at.every((x) => x >= 0)).toBe(true);
    expect([...at].sort((a, b) => a - b)).toEqual(at);
    expect(text).toMatch(/- \[block\] gate_order: .*\(sources: doc:inputs\/invoice_QF-0931_extracted\.txt, doc:inputs\/tickets\.json\)/);
    expect(text).toMatch(/^Now: Saturday 2026-10-10 12:00$/m);
  });

  it('every fixture renders within the cap', () => {
    for (const name of FIXTURES) expect(renderBrief(compileBrief(fixture(name))).length).toBeLessThanOrEqual(MAX_BRIEF_CHARS);
  });

  it('truncates lower sections first and keeps every conflict', () => {
    const brief = emptyBrief({
      questions: ['Q1?', 'Q2?'],
      conflicts: Array.from({ length: 30 }, (_, i) => conflict(i)),
      facts: Array.from({ length: 400 }, (_, i) => ({ id: `f${i}`, kind: 'note', value: `fact ${i} ${'y'.repeat(80)}`, sources: ['doc:a'] })),
      notes: Array.from({ length: 100 }, (_, i) => `- note ${i} ${'z'.repeat(80)}`),
    });
    const text = renderBrief(brief);
    expect(text.length).toBeLessThanOrEqual(MAX_BRIEF_CHARS);
    for (let i = 0; i < 30; i++) expect(text).toContain(`conflict number ${i} `);
    expect(text).toContain('1. Q1?');
    expect(text).toMatch(/more omitted/);
    expect(text).not.toContain('### Other derived notes');
  });

  it('with more conflicts than fit, keeps the questions and the most severe conflicts', () => {
    const brief = emptyBrief({ questions: ['What now?'], conflicts: [...Array.from({ length: 300 }, (_, i) => conflict(i, 'info')), conflict(999, 'block')] });
    const text = renderBrief(brief);
    expect(text.length).toBeLessThanOrEqual(MAX_BRIEF_CHARS);
    expect(text).toContain('1. What now?');
    expect(text).toContain('conflict number 999');
    expect(text).toMatch(/more omitted/);
  });

  it('never throws on malformed briefs', () => {
    for (const bad of [undefined, null, {}, { questions: 'x' }, { conflicts: [null], money: null }, emptyBrief({ now: 'garbage', deadlines: [{} as never] })])
      expect(typeof renderBrief(bad as unknown as CaseBrief)).toBe('string');
  });
});

/** Deterministic PRNG so a failing case can be replayed. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

function mutate(base: CaseBundle, r: () => number): CaseBundle {
  const pick = <T>(xs: T[]) => xs[Math.floor(r() * xs.length)];
  const garbage = () => pick(['', '{', '[]', 'null', '£', '£££ 12/13/2026 Monday 31/02/2026', '\u0000\uFFFD', 'x'.repeat(5000), '{"tenant":{"full_name":5}}', 'From: <>\n\n', '### 2024 — event 001\n- **Channel:** Hold']);
  const b = structuredClone(base) as unknown as Record<string, unknown>;
  const docs = (b.documents as CaseBundle['documents']).filter(() => r() > 0.3).map((d) => {
    const roll = r();
    return roll < 0.2 ? { ...d, text: d.text.slice(0, Math.floor(r() * d.text.length)) } : roll < 0.35 ? { ...d, text: garbage() } : roll < 0.4 ? { ...d, text: undefined as unknown as string } : d;
  });
  if (r() < 0.3) docs.push({ id: `doc:extra${Math.floor(r() * 9)}.json`, path: 'extra.json', kind: 'json', text: garbage() });
  b.documents = docs;
  if (r() < 0.3) b.events = Array.from({ length: Math.floor(r() * 5) }, (_, i) => ({ id: `ev:${i + 1}`, channel: 'other', text: garbage(), doc: pick(docs.map((d) => d.id).concat('doc:none')) }));
  if (r() < 0.3) b.parties = [{ role: 'tenant', name: garbage(), contacts: [], sources: ['doc:missing'] }];
  for (const key of ['brief', 'questions', 'events', 'parties', 'now', 'dir', 'format', 'seedTickets', 'manifest']) if (r() < 0.15) delete b[key];
  if (r() < 0.1) b.brief = garbage();
  if (r() < 0.1) b.now = garbage();
  return b as unknown as CaseBundle;
}

describe('fuzz: 200 random partial bundles', () => {
  it('compileBrief and renderBrief never throw, stay within the cap, and cite only resolvable sources', () => {
    const r = rng(20261010);
    for (let i = 0; i < 200; i++) {
      const b = mutate(fixture(FIXTURES[i % FIXTURES.length]), r);
      let text = '';
      expect(() => {
        const brief = compileBrief(b);
        text = renderBrief(brief);
        const known = new Set([...(b.documents ?? []).map((d) => d.id), ...(b.events ?? []).map((e) => e.id)]);
        const bad = citedSources(brief).filter((s) => !known.has(s));
        if (bad.length) throw new Error(`case ${i}: unresolved ${bad.join(', ')}`);
      }, `fuzz case ${i}`).not.toThrow();
      expect(text.length).toBeLessThanOrEqual(MAX_BRIEF_CHARS);
    }
  });
});
