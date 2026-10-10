import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { CaseBundle } from '../harness/contracts.js';
import { DEADLINE_RULES, EXPIRY_RULES } from './deadlines.js';
import { compileBrief } from './index.js';
import { FIXTURES, bundleOf, citedSources, crmJson, fixture } from './testing.js';

const resolvable = (b: CaseBundle) => new Set([...b.documents.map((d) => d.id), ...b.events.map((e) => e.id)]);

describe('compileBrief on practice, organiser and generic bundles (C1)', () => {
  it('practice 05: spend_limit conflict citing the quote and the CRM', () => {
    const brief = compileBrief(fixture('practice-05'));
    const c = brief.conflicts.find((x) => x.kind === 'spend_limit');
    expect(c?.sources).toEqual(expect.arrayContaining(['doc:inputs/quote_CBF-2291.md', 'doc:inputs/crm.json']));
    expect(brief.now).toBe('2026-10-10T11:30');
    expect(brief.questions).toHaveLength(3);
    expect(brief.stage).toMatch(/R-4815.*result/);
  });

  it('practice 20: the reported water leak and the parties from crm.json', () => {
    const brief = compileBrief(fixture('practice-20'));
    expect(brief.facts).toContainEqual(expect.objectContaining({ kind: 'reported_issue', value: expect.stringMatching(/Water is coming through my kitchen ceiling/), sources: ['doc:inputs/call_transcript.txt'] }));
    const crm = brief.parties.filter((p) => p.sources.includes('doc:inputs/crm.json'));
    expect(crm.map((p) => [p.role, p.name])).toEqual([
      ['tenant', 'Amelia Clarke'],
      ['landlord', 'Benjamin Hartley (Ben)'],
      ['provider', 'Swift Plumbing & Heating'],
    ]);
    expect(crm[0].contacts).toEqual(expect.arrayContaining(['07700900101', 'amelia.clarke@mailbox.example']));
    expect(brief.parties).toContainEqual(expect.objectContaining({ role: 'other', name: 'Olu Adeyemi' }));
  });

  it('public 047: the address mismatch, the stage and the remaining hints as notes', () => {
    const brief = compileBrief(fixture('public-047'));
    expect(brief.conflicts).toContainEqual(expect.objectContaining({ kind: 'address', detail: expect.stringMatching(/event 010 mentions ZZ3 5ZZ/) }));
    expect(brief.stage).toMatch(/^provider assigned, visit not yet booked.*event 016/);
    expect(brief.notes.join('\n')).toMatch(/Last contact per party/);
    expect(brief.parties.map((p) => p.name)).toEqual(expect.arrayContaining(['Eliza Jenkins', 'Isaac Oakley']));
  });

  it('organiser bundles work from the bundle alone when the case folder is gone', () => {
    for (const name of FIXTURES.filter((f) => f.startsWith('public-'))) {
      const b = fixture(name);
      const fromDir = compileBrief(b).conflicts.map((c) => `${c.kind}: ${c.detail}`);
      const fromDoc = compileBrief({ ...b, dir: 'nowhere/gone' }).conflicts.map((c) => `${c.kind}: ${c.detail}`);
      expect(fromDoc).toEqual(fromDir);
    }
  });

  it('organiser events from ingest are cited by event id', () => {
    const b = fixture('public-047');
    const withEvents = { ...b, events: Array.from({ length: 18 }, (_, i) => ({ id: `ev:${i + 1}`, channel: 'other' as const, text: '', doc: 'doc:history.md' })) };
    expect(compileBrief(withEvents).conflicts.find((c) => c.kind === 'address')?.sources).toEqual(['ev:10']);
  });

  it('generic bundles: no brief, no CRM, still facts with sources and no throw', () => {
    const b = bundleOf(
      { 'notes.txt': 'Tenant says the boiler is leaking water onto the floor.\nLandlord quote £450 from Acme Ltd.', 'email.eml': 'From: Sam <sam@example.com>\nDate: Fri, 09 Oct 2026 09:00:00 +0100\nSubject: leak\n\nThere is water coming through the ceiling.' },
      { format: 'generic', brief: '' },
    );
    const brief = compileBrief(b);
    expect(brief.now).toBeUndefined();
    expect(brief.facts.some((f) => f.kind === 'reported_issue')).toBe(true);
    expect(brief.money.quotes.map((q) => q.value)).toEqual([expect.stringMatching(/^£450/)]);
    expect(brief.deadlines.some((d) => d.basis === 'sla')).toBe(true);
  });

  it('a bundle with nothing in it gives an empty brief', () => {
    const brief = compileBrief({} as CaseBundle);
    expect(brief).toMatchObject({ conflicts: [], facts: [], deadlines: [], parties: [], questions: [] });
  });
});

describe('money reconciliation (C3)', () => {
  it('practice 05: one quote from two documents, the CRM limit, no approval', () => {
    const { money } = compileBrief(fixture('practice-05'));
    expect(money.quotes).toEqual([expect.objectContaining({ value: expect.stringMatching(/^£640: quote CBF-2291, from Capital Boiler Fix/), sources: ['doc:inputs/email_quote.eml', 'doc:inputs/quote_CBF-2291.md'] })]);
    expect(money.spendLimit).toMatchObject({ value: '£300 (Benjamin Hartley)', sources: ['doc:inputs/crm.json'] });
    expect(money.approvals).toEqual([]);
    expect(money.invoices).toEqual([]);
  });

  it('practice 17: the invoice with its date and job, no approval on the ticket', () => {
    const { money } = compileBrief(fixture('practice-17'));
    expect(money.invoices).toEqual([expect.objectContaining({ value: expect.stringMatching(/^£380: invoice QF-0931, from QUICKFIX HANDYMAN SERVICES.*dated 2026-10-09, job R-4823/), sources: ['doc:inputs/invoice_QF-0931_extracted.txt'] })]);
    expect(money.approvals).toEqual([]);
    expect(money.spendLimit?.value).toBe('£300 (Benjamin Hartley)');
  });

  it('an approval on the ticket and a landlord email approving an amount', () => {
    const b = bundleOf({
      'inputs/crm.json': crmJson(),
      'inputs/tickets.json': JSON.stringify([{ ref: 'R-1', stage: 'quote', quote_approved_gbp: 200 }]),
      'inputs/email.eml': 'From: Ben Hartley <ben.hartley@hartleyhomes.co.uk>\nDate: Sat, 10 Oct 2026 10:00:00 +0100\nSubject: ok\n\nYes, approved up to £450 for the boiler.',
    });
    const { money } = compileBrief(b);
    expect(money.approvals.map((a) => [a.value.split(':')[0], a.sources])).toEqual([
      ['£200', ['doc:inputs/tickets.json']],
      ['£450', ['doc:inputs/email.eml']],
    ]);
  });
});

describe('deadlines (C4)', () => {
  const research = readFileSync('research/uk-lettings-rules.md', 'utf8');
  const sections = new Set([...research.matchAll(/^#{2,3} (\d+(?:\.\d+)?)\.? /gm)].map((m) => `§${m[1]}`));

  it('every statutory or SLA rule cites a section that exists in research/uk-lettings-rules.md', () => {
    for (const r of [...DEADLINE_RULES, ...EXPIRY_RULES]) expect(sections, `${r.id} cites ${r.cite}`).toContain(r.cite);
  });

  it('statutory: Breathing Space end (practice 12) and a gas safety record expiry', () => {
    expect(compileBrief(fixture('practice-12')).deadlines).toContainEqual(expect.objectContaining({ basis: 'statutory', due: '2026-11-30', sources: ['doc:inputs/attachment_breathing_space.md'] }));
    const cp12 = bundleOf({ 'inputs/compliance.json': JSON.stringify({ property_id: 'P-1', address: '19 Victoria Park Road, London E9 7HD', records: [{ type: 'gas_safety_record', expires: '2026-10-16' }] }) });
    expect(compileBrief(cp12).deadlines).toEqual([expect.objectContaining({ basis: 'statutory', due: '2026-10-16', what: expect.stringMatching(/Gas safety record/) })]);
  });

  it('SLA from "now" for an emergency call, promised from a booked visit', () => {
    expect(compileBrief(fixture('practice-20')).deadlines).toContainEqual(expect.objectContaining({ basis: 'sla', due: '2026-10-11T19:35', what: expect.stringMatching(/make safe within 24 hours/) }));
    expect(compileBrief(fixture('practice-17')).deadlines).toContainEqual(expect.objectContaining({ basis: 'promised', due: '2026-10-13', sources: ['doc:inputs/tickets.json'] }));
  });

  it('review dates on records, and nothing invented for a routine case', () => {
    const held = bundleOf({ 'inputs/tickets.json': JSON.stringify([{ ref: 'R-1', stage: 'hold', description: 'Fence panel', review_on: '2026-10-20' }]) });
    expect(compileBrief(held).deadlines).toEqual([expect.objectContaining({ basis: 'hold_review', due: '2026-10-20' })]);
    expect(compileBrief(fixture('practice-12')).deadlines.filter((d) => d.basis === 'sla')).toEqual([]);
    expect(compileBrief(bundleOf({ 'inputs/email.eml': 'From: A <a@b.example>\nSubject: hi\n\nThe garden gate squeaks.' })).deadlines).toEqual([]);
  });
});

describe('sources resolve (C6)', () => {
  it.each(FIXTURES)('%s: every SourceId is a document or event of the bundle', (name) => {
    const b = fixture(name);
    const brief = compileBrief(b);
    const known = resolvable(b);
    const cited = citedSources(brief);
    expect(cited.length).toBeGreaterThan(0);
    expect(cited.filter((s) => !known.has(s))).toEqual([]);
    for (const x of [...brief.facts, ...brief.conflicts, ...brief.deadlines, ...brief.parties]) expect(x.sources.length).toBeGreaterThan(0);
  });
});
