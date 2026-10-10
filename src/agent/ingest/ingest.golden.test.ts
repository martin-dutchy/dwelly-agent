import { basename, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCase, walk } from '../cases.js';
import type { CaseBundle } from '../harness/contracts.js';
import { goldenFolders } from './golden.js';
import { ingest, toLoadedCase } from './index.js';

const GENERIC = 'src/agent/ingest/fixtures/generic-case';
const folders = [...goldenFolders(), GENERIC];
const bundles = new Map<string, CaseBundle>(folders.map((d) => [d, ingest(d)]));
const visibleFiles = (dir: string) =>
  walk(dir)
    .map((p) => relative(dir, p))
    .filter((p) => !p.split('/').some((s) => s.startsWith('.')));

describe('ingest over every non-holdout case folder', () => {
  it('covers the four case roots and none of the holdout ids', () => {
    expect(folders.length).toBeGreaterThan(100);
    for (const root of ['cases/practice/', 'cases/public-cuts/', 'cases/walks/', 'HackatonPublicCases/Property Management/']) expect(folders.some((f) => f.startsWith(root))).toBe(true);
    const ids = folders.map((f) => `${f.split('/').slice(0, -1).join('/')}|${basename(f).split('-')[0]}`);
    for (const id of ['04', '09', '14', '19', '22']) expect(ids).not.toContain(`cases/practice|${id}`);
    for (const id of ['031', '036', '041', '045', '048', '050']) expect(ids.filter((x) => x.endsWith(`|${id}`))).toEqual([]);
  });

  it.each(folders)('%s: every file is in the manifest, nothing dropped', (dir) => {
    const b = bundles.get(dir)!;
    const listed = new Set(b.manifest.map((m) => m.path));
    expect(visibleFiles(dir).filter((f) => !listed.has(f))).toEqual([]);
    const docs = new Set(b.documents.map((d) => d.path));
    for (const d of b.documents) expect(b.manifest.some((m) => m.path === d.path && m.parse !== 'withheld'), d.path).toBe(true);
    for (const m of b.manifest.filter((m) => m.included && m.parse !== 'brief' && !m.path.startsWith('('))) expect(docs.has(m.path), m.path).toBe(true);
  });

  it.each(folders)('%s: every source id resolves', (dir) => {
    const b = bundles.get(dir)!;
    const docs = new Set(b.documents.map((d) => d.id));
    const events = new Set(b.events.map((e) => e.id));
    expect(docs.size).toBe(b.documents.length);
    expect(events.size).toBe(b.events.length);
    for (const e of b.events) expect(docs.has(e.doc), `${e.id} → ${e.doc}`).toBe(true);
    for (const p of b.parties) for (const s of p.sources) expect(docs.has(s) || events.has(s), `${p.name ?? p.role} → ${s}`).toBe(true);
    for (const d of b.documents) expect(d.id).toBe(`doc:${d.path}`);
  });

  it.each(folders)('%s: no unreadable bytes reach the prompt', (dir) => {
    for (const d of bundles.get(dir)!.documents) expect(d.text, d.path).not.toMatch(/[\u0000\ufffd]/);
  });
});

describe('ingest v2 against loadCase (flags-off path)', () => {
  // Expected differences with ingestV2 on, all additive: decoded MIME email text, flagged unreadable files with a
  // placeholder instead of garbage, extra files next to an organiser index.md, grading files there withheld,
  // dotfiles skipped, and a synthesised brief for folders without one. None occurs in the golden folders except
  // the withheld grading files (expected.json in public cuts and walks).
  it.each(goldenFolders())('%s: same LoadedCase apart from withheld grading files', (dir) => {
    const legacy = loadCase(dir);
    const v2 = toLoadedCase(bundles.get(dir)!);
    expect({ ...v2, withheld: [] }).toEqual({ ...legacy, withheld: [] });
    const extra = v2.withheld!.filter((w) => !legacy.withheld!.some((l) => l.name === w.name && l.reason === w.reason));
    expect(v2.withheld!.slice(0, legacy.withheld!.length)).toEqual(legacy.withheld);
    for (const w of extra) expect(w.name).toMatch(/^(expected|rubric|checks|answers?|reference|solution|grades?)\.(json|md|txt)$/);
  });

  it('lists the expected differences on the generic fixture', () => {
    const legacy = loadCase(GENERIC);
    const v2 = toLoadedCase(bundles.get(GENERIC)!);
    expect(legacy.brief).toBe('(no case brief provided)');
    expect(v2.brief).toContain('without a case brief');
    expect(legacy.inputs.find((i) => i.name === 'email_contractor.eml')!.content).toContain('Content-Transfer-Encoding: base64');
    expect(v2.inputs.find((i) => i.name === 'email_contractor.eml')!.content).toContain('Quote attached: £180 inc VAT');
    expect(legacy.inputs.find((i) => i.name === 'inventory_2025.docx')!.content).toMatch(/\ufffd|\u0000/);
    expect(v2.inputs.find((i) => i.name === 'inventory_2025.docx')!.content).toMatch(/could not be read/);
    expect(v2.inputs.map((i) => i.name).filter((n) => !legacy.inputs.some((l) => l.name === n))).toEqual(['email_contractor.eml#QT-5521.pdf']);
  });
});

describe('practice bundles (B3)', () => {
  it('practice 23 has now, parties with sources and events from two documents', () => {
    const b = bundles.get('cases/practice/23')!;
    expect(b.format).toBe('practice');
    expect(b.now).toBe('2026-10-10T12:52');
    expect(b.parties.filter((p) => p.sources.length).length).toBeGreaterThanOrEqual(2);
    expect(b.parties.find((p) => p.role === 'tenant')).toMatchObject({ name: 'Jonah Okafor', sources: ['doc:inputs/crm.json'] });
    expect(new Set(b.events.map((e) => e.doc))).toEqual(new Set(['doc:inputs/call_transcript.txt', 'doc:inputs/ai_phone_line_actions.json']));
    expect(b.events.find((e) => e.text.includes('E-4902 created'))).toMatchObject({ at: '2026-10-10T12:48:11', doc: 'doc:inputs/ai_phone_line_actions.json' });
    expect(b.events.find((e) => e.text.includes('strong smell of gas'))).toMatchObject({ at: '2026-10-10T12:47:57', from: 'CALLER', channel: 'call' });
  });

  it('practice 05 has the landlord, the contractor and the quote email as an event', () => {
    const b = bundles.get('cases/practice/05')!;
    const quote = b.events.find((e) => e.doc === 'doc:inputs/email_quote.eml' && e.text.includes('£640'))!;
    expect(quote).toMatchObject({ channel: 'email', at: '2026-10-10T11:02:40+01:00', from: 'Kieran Doyle <office@capitalboilerfix.example>' });
    expect(b.parties.find((p) => p.role === 'landlord')).toMatchObject({ name: 'Benjamin Hartley' });
    const contractor = b.parties.find((p) => p.name === 'Capital Boiler Fix')!;
    expect(contractor.role).toBe('provider');
    expect(contractor.sources).toEqual(expect.arrayContaining(['doc:inputs/crm.json', quote.id]));
    expect(contractor.contacts).toContain('office@capitalboilerfix.example');
  });

  it('organiser bundles take events from the visible history only', () => {
    const b = bundles.get('HackatonPublicCases/Property Management/047')!;
    expect(b.format).toBe('organiser');
    expect(b.events.map((e) => e.id)).toEqual(Array.from({ length: b.cutoff! }, (_, i) => `ev:${i + 1}`));
    expect(b.events.every((e) => e.doc === 'doc:history.md' && e.at?.endsWith('Z'))).toBe(true);
    expect(b.now).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(b.parties.map((p) => p.role)).toEqual(expect.arrayContaining(['agency', 'tenant', 'landlord']));
  });
});
