import { describe, expect, it } from 'vitest';
import type { CaseBundle, ConflictKind } from '../harness/contracts.js';
import { ingest } from '../ingest/index.js';
import { compileBrief } from './index.js';
import { bundleOf, crmJson, fixture } from './testing.js';

const kinds = (b: CaseBundle, kind: ConflictKind) => compileBrief(b).conflicts.filter((c) => c.kind === kind);
/** An organiser-format bundle whose history is the given [channel, from, to, body] events, one day apart. */
const history = (events: [string, string, string, string][]) =>
  bundleOf(
    {
      'history.md': `# Case history\n\n${events.map(([ch, from, to, body], i) => `### 2024-02-${String(21 + i).padStart(2, '0')} 10:00:00 UTC — event ${String(i + 1).padStart(3, '0')}\n\n- **Channel:** ${ch}\n- **From:** ${from}\n- **To:** ${to}\n\n${body}\n`).join('\n')}`,
    },
    { format: 'organiser', brief: '# Case 999: Test\n\n- **Today:** 2024-03-01 10:00:00 UTC\n- **Property:** Flat 1, 2 Test Road, Testville, ZZ1 1ZZ\n\n## Initial request\n\nWindow broken.\n' },
  );
const tickets = (o: Record<string, unknown>) => JSON.stringify([{ ref: 'R-1', tenant_id: 'T-1', category: 'general', stage: 'visit', description: 'Extractor fan', ...o }]);
const invoice = (issuer: string, total: string, date = '14/10/2026') => `${issuer}\nInvoice: INV-77        Date: ${date}\nJob ref: R-1\n\nLabour  £100.00\nTOTAL  ${total}\n`;
const email = (from: string, body: string, extra = '') => `From: ${from}\nTo: lettings@mareandco.example\nDate: Sat, 10 Oct 2026 10:00:00 +0100\n${extra}Subject: hello\n\n${body}\n`;

describe('spend_limit', () => {
  it('flags a quote above the CRM limit, citing the quote and the CRM (practice 05)', () => {
    const [c] = kinds(fixture('practice-05'), 'spend_limit');
    expect(c).toMatchObject({ severity: 'block' });
    expect(c.detail).toMatch(/£640.*£300/);
    expect(c.sources).toEqual(expect.arrayContaining(['doc:inputs/quote_CBF-2291.md', 'doc:inputs/crm.json']));
  });
  it('stays quiet under the limit, and when an approval covers the amount', () => {
    expect(kinds(bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/quote_Q1.md': '# Quote Q1 (Capital Boiler Fix)\n\nTotal £250.00\n' }), 'spend_limit')).toEqual([]);
    const approved = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/quote_Q1.md': '# Quote Q1 (Capital Boiler Fix)\n\nTotal £640.00\n', 'inputs/tickets.json': tickets({ quote_approved_gbp: 640 }) });
    expect(kinds(approved, 'spend_limit')).toEqual([]);
  });
});

describe('amount', () => {
  it('flags an invoice above the approved amount', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/tickets.json': tickets({ quote_approved_gbp: 238.04, assigned_contractor: 'C-21' }), 'inputs/invoice_INV-77.txt': invoice('QUICKFIX HANDYMAN SERVICES', '£240.00') });
    const [c] = kinds(b, 'amount');
    expect(c).toMatchObject({ severity: 'block' });
    expect(c.detail).toMatch(/£240 .*above the approved £238\.04/);
    expect(c.sources).toEqual(expect.arrayContaining(['doc:inputs/invoice_INV-77.txt', 'doc:inputs/tickets.json']));
  });
  it('accepts an invoice at the approved amount', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/tickets.json': tickets({ quote_approved_gbp: 240, assigned_contractor: 'C-21' }), 'inputs/invoice_INV-77.txt': invoice('QUICKFIX HANDYMAN SERVICES', '£240.00') });
    expect(kinds(b, 'amount')).toEqual([]);
  });
  it('organiser history: invoice above the quote the landlord approved (public cut 007)', () => {
    const [c] = kinds(ingest('cases/public-cuts/007-invoice-40pct-over-quote', { at: 'auto' }), 'amount');
    expect(c).toMatchObject({ severity: 'block' });
    expect(c.detail).toMatch(/Invoice £277\.72 .* above the approved £198\.37/);
  });
});

describe('company', () => {
  it('flags an invoice issued by someone other than the assigned contractor', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/tickets.json': tickets({ assigned_contractor: 'C-21' }), 'inputs/invoice_INV-77.txt': invoice('BODGE BUILDERS LTD', '£120.00') });
    const [c] = kinds(b, 'company');
    expect(c).toMatchObject({ severity: 'block' });
    expect(c.detail).toMatch(/BODGE BUILDERS LTD.*C-21 QuickFix Handyman Services/);
  });
  it('accepts the assigned contractor under a different casing and suffix (practice 17)', () => {
    expect(kinds(fixture('practice-17'), 'company')).toEqual([]);
    expect(kinds(fixture('practice-05'), 'company')).toEqual([]);
  });
});

describe('gate_order', () => {
  it('flags an invoice dated before the visit (practice 17)', () => {
    const [c] = kinds(fixture('practice-17'), 'gate_order');
    expect(c.detail).toMatch(/dated 2026-10-09, before the visit on job R-4823 \(2026-10-13\)/);
    expect(c.sources).toEqual(['doc:inputs/invoice_QF-0931_extracted.txt', 'doc:inputs/tickets.json']);
  });
  it('flags a provider assigned while waiting on the landlord (public 047)', () => {
    expect(kinds(fixture('public-047'), 'gate_order')[0].detail).toMatch(/Provider assigned at event 016 while the case was on hold waiting for the landlord \(event 014/);
  });
  it('accepts an invoice dated after the visit', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/tickets.json': tickets({ assigned_contractor: 'C-21', visit: { date: '2026-10-08' } }), 'inputs/invoice_INV-77.txt': invoice('QUICKFIX HANDYMAN SERVICES', '£120.00', '09/10/2026') });
    expect(kinds(b, 'gate_order')).toEqual([]);
  });
});

describe('name', () => {
  it('flags one record id carrying two names (practice 23)', () => {
    const [c] = kinds(fixture('practice-23'), 'name');
    expect(c.detail).toMatch(/T-1001 is "Jonah Okafor" .* but "Amelia Clarke"/);
    expect(c.detail).toMatch(/Jonah Okafor is T-1002/);
    expect(c.sources).toEqual(expect.arrayContaining(['doc:inputs/ai_phone_line_actions.json', 'doc:inputs/crm_record_T-1001.json', 'doc:inputs/crm.json']));
  });
  it('flags an email signed by someone else from a known address, and accepts preferred names', () => {
    const other = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Sam Jones <ben.hartley@hartleyhomes.co.uk>', 'Hi') });
    expect(kinds(other, 'name')).toHaveLength(1);
    const ben = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Ben Hartley <ben.hartley@hartleyhomes.co.uk>', 'Hi') });
    expect(kinds(ben, 'name')).toEqual([]);
  });
  it('flags the tenant named two ways in an organiser history, and not when names agree', () => {
    const two = history([
      ['Email', 'Agency / system', 'Tenant', 'Dear Ruben Oakley,\n\nWe have booked the visit.'],
      ['Email', 'Agency / system', 'Tenant', 'Dear Clara Mendes,\n\nThe engineer is on the way.'],
    ]);
    expect(kinds(two, 'name')[0].detail).toMatch(/"Ruben Oakley" \(event 001\) vs "Clara Mendes" \(event 002\)/);
    expect(kinds(fixture('public-047'), 'name')).toEqual([]);
  });
});

describe('crm_vs_history', () => {
  it('flags a look-alike sender domain with a foreign Reply-To as a block', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Benjamin Hartley <ben.hartley@hartleyhomess.co.uk>', 'New bank details', 'Reply-To: ben@protonmail.example\n') });
    const [c] = kinds(b, 'crm_vs_history');
    expect(c).toMatchObject({ severity: 'block' });
    expect(c.detail).toMatch(/look-alike domain/);
    expect(c.sources).toEqual(['doc:inputs/email.eml', 'doc:inputs/crm.json']);
  });
  it('flags a legacy export with another phone for the tenant, and an unknown caller number', () => {
    const b = bundleOf({
      'inputs/crm.json': crmJson(),
      'inputs/legacy_export.csv': 'property,unit,tenant_name,tenant_phone\n3 Amhurst Road,Flat 9,P. Shah,+447700900166\n',
      'inputs/caller_metadata.json': '{"caller_id": "+447700900177"}',
    });
    const cs = kinds(b, 'crm_vs_history');
    expect(cs.map((c) => c.detail).join('\n')).toMatch(/07700900166 \(records: 07700900103\)/);
    expect(cs.map((c) => c.detail).join('\n')).toMatch(/07700900177, a number not on file/);
  });
  it('accepts mail from the address on file and a caller on a known number', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Benjamin Hartley <ben.hartley@hartleyhomes.co.uk>', 'Fine'), 'inputs/call_transcript.txt': 'Call from +447700900103\nCALLER: hi' });
    expect(kinds(b, 'crm_vs_history')).toEqual([]);
  });
});

describe('address', () => {
  it('flags a document naming another postcode, citing it and the CRM', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Benjamin Hartley <ben.hartley@hartleyhomes.co.uk>', 'I sent a plumber to Flat 18, 88 Alder Lane, London N1 5ZZ') });
    const [c] = kinds(b, 'address');
    expect(c.detail).toMatch(/N1 5ZZ.*E8 2AU/);
    expect(c.sources).toEqual(['doc:inputs/email.eml', 'doc:inputs/crm.json']);
  });
  it('ignores the property itself and business addresses', () => {
    const b = bundleOf({ 'inputs/crm.json': crmJson(), 'inputs/email.eml': email('Benjamin Hartley <ben.hartley@hartleyhomes.co.uk>', 'Flat 9, 3 Amhurst Road, London E8 2AU\nAcme Ltd, 1 Trade Park, London N1 5ZZ') });
    expect(kinds(b, 'address')).toEqual([]);
  });
  it('organiser history: public 047 still reports the landlord naming another property', () => {
    const [c] = kinds(fixture('public-047'), 'address');
    expect(c.detail).toMatch(/event 010 mentions ZZ3 5ZZ, not the case property's ZZ3 7ZZ/);
    expect(c.sources).toEqual(['ev:10']);
  });
});

describe('date_past', () => {
  it('flags a booked visit whose date has passed', () => {
    const b = bundleOf({ 'inputs/tickets.json': tickets({ visit: { date: '2026-10-08' } }) });
    expect(kinds(b, 'date_past')[0].detail).toMatch(/visit date 2026-10-08 is before today \(2026-10-10\)/);
  });
  it('accepts a visit still ahead', () => {
    expect(kinds(bundleOf({ 'inputs/tickets.json': tickets({ visit: { date: '2026-10-13' } }) }), 'date_past')).toEqual([]);
  });
  it('organiser history: an appointment set for a date already past (public 025)', () => {
    expect(kinds(fixture('public-025'), 'date_past')[0].detail).toMatch(/event 027 says set an appointment for 22\/05\/2024, already past/);
  });
});

describe('weekday', () => {
  it('flags a weekday that does not match its date, citing the document', () => {
    const b = bundleOf({ 'inputs/email.eml': email('Kieran <k@fix.example>', 'I can attend Tuesday 12/10/2026 at 9am.') });
    const [c] = kinds(b, 'weekday');
    expect(c.detail).toMatch(/inputs\/email\.eml says "Tuesday 12\/10\/2026" but 12\/10\/2026 is a Monday/);
    expect(c.sources).toEqual(['doc:inputs/email.eml']);
  });
  it('accepts a matching weekday', () => {
    expect(kinds(bundleOf({ 'inputs/email.eml': email('Kieran <k@fix.example>', 'I can attend Monday 12/10/2026 at 9am.') }), 'weekday')).toEqual([]);
  });
});

describe('attachment_missing', () => {
  it('flags an email pointing at a photo that is not in the files, and an unreadable file', () => {
    const b = bundleOf({ 'inputs/email.eml': email('Priya Shah <priya.shah@mailbox.example>', 'Photo attached of the leak.') });
    b.documents.push({ id: 'doc:inputs/quote.docx', path: 'inputs/quote.docx', kind: 'unknown', text: '', flagged: 'binary file, not parsed' });
    const cs = kinds(b, 'attachment_missing');
    expect(cs.map((c) => c.sources[0]).sort()).toEqual(['doc:inputs/email.eml', 'doc:inputs/quote.docx']);
  });
  it('accepts an attachment that is present', () => {
    const b = bundleOf({ 'inputs/email.eml': email('Priya Shah <priya.shah@mailbox.example>', 'Photo attached of the leak.'), 'inputs/photo_leak.png': '' });
    expect(kinds(b, 'attachment_missing')).toEqual([]);
    expect(kinds(fixture('practice-12'), 'attachment_missing')).toEqual([]);
  });
  it('organiser history: attachments referenced but unavailable (public 002)', () => {
    expect(kinds(fixture('public-002'), 'attachment_missing')[0].detail).toMatch(/event 017 refers to "attachment-04-document"/);
  });
});

describe('other: arrears steps inside a Breathing Space, and a short notice period', () => {
  it('flags scheduled arrears steps inside the moratorium (practice 12)', () => {
    const cs = kinds(fixture('practice-12'), 'other');
    expect(cs.map((c) => c.detail).join('\n')).toMatch(/section8_notice_draft_review.*2026-10-14, inside the Breathing Space that started 2026-10-01/);
    expect(cs[0].sources).toEqual(['doc:inputs/attachment_breathing_space.md', 'doc:inputs/crm.json']);
  });
  it('accepts arrears steps after the moratorium ends', () => {
    const b = fixture('practice-12');
    const crm = b.documents.find((d) => d.id === 'doc:inputs/crm.json')!;
    crm.text = crm.text.replace('2026-10-12', '2026-12-12').replace('2026-10-14', '2026-12-14');
    expect(kinds(b, 'other')).toEqual([]);
  });
  it("flags a tenant's notice shorter than 2 months, and accepts a long enough one", () => {
    const short = bundleOf({ 'inputs/email.eml': email('Tom <tom@mailbox.example>', "Please take this as my one month's notice. I'll be moving out on 10 November.") });
    expect(kinds(short, 'other')[0].detail).toMatch(/names 2026-11-10 as the end, but 2 months' notice runs to 2026-12-10/);
    const ok = bundleOf({ 'inputs/email.eml': email('Tom <tom@mailbox.example>', "Please take this as my notice. I'll be moving out on 12 December.") });
    expect(kinds(ok, 'other')).toEqual([]);
  });
});
