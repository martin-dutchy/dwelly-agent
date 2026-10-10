import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import type { CaseBrief, CaseBundle, SituationTag } from '../harness/contracts.js';
import { classify, listSkills, loadSkill, MAX_SKILLS, renderSkills, selectSkills } from './index.js';
import { EMERGENCY_TAGS, TAG_GROUPS } from './tags.js';

const fixture = (id: string): CaseBundle =>
  JSON.parse(readFileSync(fileURLToPath(new URL(`../fixtures/bundles/${id}.json`, import.meta.url)), 'utf8')) as CaseBundle;

const bundle = (brief: string, docs: { path: string; text: string; kind?: string }[] = [], extra: Partial<CaseBundle> = {}): CaseBundle =>
  ({
    id: 't',
    dir: '/tmp/t',
    format: 'practice',
    brief,
    documents: docs.map((d) => ({ id: `doc:${d.path}`, path: d.path, kind: d.kind ?? (d.path.endsWith('.json') ? 'json' : 'text'), text: d.text })),
    events: [],
    parties: [],
    questions: [],
    seedTickets: [],
    failures: {},
    media: [],
    manifest: [],
    withheld: [],
    ...extra,
  }) as CaseBundle;

const brief = (b: Partial<CaseBrief>): CaseBrief => ({ parties: [], facts: [], conflicts: [], deadlines: [], money: { quotes: [], approvals: [], invoices: [] }, questions: [], tags: [], notes: [], ...b });

describe('classify on the dev fixture bundles', () => {
  const expected: [string, SituationTag[]][] = [
    ['practice-23', ['gas', 'identity_privacy']],
    ['practice-20', ['water']],
    ['practice-12', ['arrears']],
    ['practice-17', ['quote_invoice', 'fraud_injection']],
    ['practice-05', ['quote_invoice', 'landlord_approval']],
    ['practice-03', ['access_entry']],
    ['public-047', ['landlord_approval']],
  ];
  for (const [id, tags] of expected)
    it(`${id} gets ${tags.join(' and ')}`, () => {
      expect(classify(fixture(id))).toEqual(expect.arrayContaining(tags));
    });

  it('public-002, a routine quote approval, gets no emergency tag', () => {
    const tags = classify(fixture('public-002'));
    expect(tags.filter((t) => EMERGENCY_TAGS.includes(t) || t === 'out_of_hours')).toEqual([]);
    expect(tags).toEqual(expect.arrayContaining(['landlord_approval', 'quote_invoice']));
  });

  it('public-025 (oven, warranty, no work results) gets no emergency tag', () => {
    expect(classify(fixture('public-025')).filter((t) => EMERGENCY_TAGS.includes(t))).toEqual([]);
  });

  it('is deterministic and returns tags in priority order without duplicates', () => {
    for (const id of ['practice-03', 'practice-05', 'practice-12', 'practice-17', 'practice-20', 'practice-23', 'public-002', 'public-025', 'public-047']) {
      const a = classify(fixture(id));
      expect(classify(fixture(id))).toEqual(a);
      expect(new Set(a).size).toBe(a.length);
    }
  });
});

describe('classify precision', () => {
  it('does not read contractor trades, ids or Gas Safe numbers as a gas emergency', () => {
    const crm = JSON.stringify({ contractors: [{ name: 'Bow Gas & Heating', trades: ['gas', 'heating'], gas_safe_no: '558812' }] });
    expect(classify(bundle('Boiler quote', [{ path: 'inputs/crm.json', text: crm }, { path: 'inputs/quote.md', text: 'Total £640. Gas Safe 558812.' }]))).not.toContain('gas');
  });

  it('reads a gas leak as gas, not water, and safety advice about flames as no fire', () => {
    const tags = classify(bundle('Call', [{ path: 'inputs/call.txt', text: 'There is a gas leak. Leave now, do not use any switches or flames.' }]));
    expect(tags).toContain('gas');
    expect(tags).not.toContain('water');
    expect(tags).not.toContain('fire');
  });

  it('reads narrative fields inside JSON records, but not names', () => {
    const log = JSON.stringify([{ from: 'Flood Street Plumbing', body: 'The kitchen ceiling has damp patches and black mould.' }]);
    const tags = classify(bundle('Messages', [{ path: 'inputs/message_log.json', text: log }]));
    expect(tags).toContain('damp_mould');
    expect(tags).not.toContain('water');
  });

  it('does not read checklist lines in inspection reports or agreements as live situations', () => {
    const report = 'Check-out inspection report\nSmoke and carbon monoxide detectors: tested — Yes. Damp: none. At the end of the tenancy the deposit is returned.';
    const tags = classify(bundle('Second quote for the bathroom', [{ path: 'attachments/attachment-01-check-out-inspection-report.pdf', text: report, kind: 'pdf' }]));
    expect(tags.filter((t) => ['co', 'deposit', 'tenancy_lifecycle', 'damp_mould'].includes(t))).toEqual([]);
    const cert = classify(bundle('Case', [{ path: 'inputs/gas_safety_record.md', text: 'Gas safety record (CP12) expired on 01/09/2026.' }]));
    expect(cert).toContain('compliance');
    expect(classify(bundle('Case', [{ path: 'inputs/tickets.json', text: JSON.stringify([{ description: 'Inspection found a CO alarm sounding.' }]) }]))).toContain('co');
  });

  it('reads a hypothetical move-out as no tenancy change', () => {
    expect(classify(bundle('The washing machine is mine; if I ever was to move out I would take it with me.'))).not.toContain('tenancy_lifecycle');
    expect(classify(bundle('We are moving out at the end of next month.'))).toContain('tenancy_lifecycle');
  });

  it('takes vulnerability, arrears and void status from CRM fields', () => {
    const crm = JSON.stringify({ tenant: { vulnerable: true }, arrears: { balance_gbp: 1200 }, property: { tenanted: false } });
    expect(classify(bundle('Case', [{ path: 'inputs/crm.json', text: crm }]))).toEqual(expect.arrayContaining(['vulnerable', 'arrears', 'void_keys']));
  });

  it('flags landlord approval when a quoted figure is above the spend limit on file, not from a standing note alone', () => {
    const crm = JSON.stringify({ landlord: { spend_limit_gbp: 300, notes: ['Call before anything over £300.'] } });
    expect(classify(bundle('Case', [{ path: 'inputs/crm.json', text: crm }]))).not.toContain('landlord_approval');
    expect(classify(bundle('Case', [{ path: 'inputs/crm.json', text: crm }, { path: 'inputs/email.eml', text: 'Our quote is £450 inc VAT.' }]))).toContain('landlord_approval');
  });

  it('adds tags from the brief: its own tags, conflicts and money', () => {
    const b = bundle('Case');
    expect(classify(b, brief({ tags: ['deposit'] }))).toContain('deposit');
    expect(classify(b, brief({ conflicts: [{ kind: 'spend_limit', detail: 'quote above limit', sources: [], severity: 'warn' }] }))).toEqual(
      expect.arrayContaining(['landlord_approval', 'quote_invoice']),
    );
    expect(classify(b, brief({ conflicts: [{ kind: 'name', detail: 'tenant name differs', sources: [], severity: 'warn' }] }))).toContain('identity_privacy');
    expect(classify(b, brief({ money: { quotes: [{ id: 'q', kind: 'quote', value: '120', sources: [] }], approvals: [], invoices: [] } }))).toContain('quote_invoice');
  });
});

describe('classify out of hours', () => {
  const leak = [{ path: 'inputs/call.txt', text: 'Water is pouring through the ceiling.' }];

  it('tags an emergency at night, on a Sunday, or in UTC after 18:00 UK time', () => {
    expect(classify(bundle('- **Today:** Saturday 2026-10-10 21:15', leak))).toContain('out_of_hours');
    expect(classify(bundle('- **Today:** Sunday 2026-10-11 14:00', leak))).toContain('out_of_hours');
    expect(classify(bundle('- **Today:** 2024-03-01 20:49:24 UTC (time of the latest event you can see)', leak))).toContain('out_of_hours');
    expect(classify(bundle('Case', leak, { now: '2026-07-01T17:30:00Z' }))).toContain('out_of_hours');
  });

  it('does not tag Saturday daytime, or a routine job at night', () => {
    expect(classify(bundle('- **Today:** Saturday 2026-10-10 12:52', leak))).not.toContain('out_of_hours');
    expect(classify(bundle('Case', leak, { now: '2026-07-01T16:30:00Z' }))).not.toContain('out_of_hours');
    expect(classify(bundle('- **Today:** Saturday 2026-10-10 23:00', [{ path: 'inputs/e.txt', text: 'The kitchen drawer sticks.' }]))).not.toContain('out_of_hours');
  });

  it('tags a case that says it is out of hours, whatever the job', () => {
    expect(classify(bundle('- **Today:** Saturday 2026-10-10 11:00 (out of hours, office closed)'))).toContain('out_of_hours');
  });
});

describe('selectSkills', () => {
  const ids = (tags: SituationTag[]) => selectSkills(tags).map((s) => s.id);

  it(`caps at ${MAX_SKILLS} and orders safety, then legal, then workflow`, () => {
    const all = selectSkills(Object.keys(TAG_GROUPS) as SituationTag[]);
    expect(all).toHaveLength(MAX_SKILLS);
    const order = { safety: 0, legal: 1, workflow: 2 };
    const groups = all.map((s) => order[TAG_GROUPS[s.tags[0]]]);
    expect(groups).toEqual([...groups].sort());
  });

  it('keeps a legal skill when several safety tags compete', () => {
    expect(ids(['gas', 'vulnerable', 'out_of_hours', 'identity_privacy', 'landlord_approval'])).toEqual(['gas-emergency', 'vulnerable-occupant', 'identity-privacy']);
  });

  it('fills free slots by priority and loads a multi-tag skill once', () => {
    expect(ids(['quote_invoice', 'fraud_injection', 'landlord_approval', 'closure'])).toEqual(['fraud-injection', 'landlord-approval', 'quote-invoice']);
    expect(ids(['water', 'electrical', 'fire'])).toEqual(['water-electrical-fire']);
    expect(ids([])).toEqual([]);
  });

  it('picks the expected playbooks for the gas and identity fixture', () => {
    expect(selectSkills(classify(fixture('practice-23'))).map((s) => s.id)).toEqual(expect.arrayContaining(['gas-emergency', 'identity-privacy']));
  });
});

describe('loadSkill and renderSkills', () => {
  it('returns the body for an id or a tag', () => {
    expect(loadSkill('gas-emergency')).toContain('0800 111 999');
    expect(loadSkill('damp_mould')).toContain('## Procedure');
    expect(loadSkill(' Closure ')).toContain('close_ticket');
  });

  it('lists every id for an unknown one', () => {
    const out = loadSkill('plumbing');
    expect(out).toMatch(/^No skill "plumbing"\. Available: /);
    for (const s of listSkills()) expect(out).toContain(s.id);
  });

  it('renders the selected skills, names the ones left out by the cap, and is empty for none', () => {
    const tags: SituationTag[] = ['gas', 'vulnerable', 'out_of_hours', 'identity_privacy'];
    const text = renderSkills(selectSkills(tags), tags);
    expect(text).toContain('<skill id="gas-emergency"');
    expect(text).toMatch(/Also relevant, not attached: out-of-hours\./);
    expect(renderSkills([])).toBe('');
    expect(renderSkills(selectSkills(['gas']))).not.toMatch(/Also relevant/);
  });
});
