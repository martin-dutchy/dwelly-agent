import { describe, expect, it } from 'vitest';
import type { GuardContext } from '../harness/contracts.js';
import { datesIn, pastVisitDate, tenantContactToProvider, unknownAmount, unknownJobRef, unknownPerson, weekdayMismatch } from './message.js';
import { brief, bundle, ctx, entry, party } from './testing.js';

const DOCS = {
  'inputs/crm.json': '{"tenant": {"full_name": "Sara Okafor", "phone": "+44 7700 900123", "email": "sara.o@mail.example"}, "landlord": {"name": "Ava Kendall"}}',
  'inputs/email_contractor.eml': 'From: Keystone Plumbing\n\nQuote for the leak under the sink: £150 + VAT. Old job ref JOB-088 was the same tap.',
};
const PARTIES = [party('tenant', 'Sara Okafor', ['+44 7700 900123', 'sara.o@mail.example']), party('landlord', 'Ava Kendall'), party('provider', 'Keystone Plumbing')];
const money = { quotes: [{ id: 'q1', kind: 'quote', value: '£150 + VAT (Keystone Plumbing)', sources: ['doc:inputs/email_contractor.eml'] }], approvals: [], invoices: [] };
const full = (over: Partial<GuardContext> = {}) =>
  ctx({ bundle: bundle(DOCS), brief: brief({ parties: PARTIES, money, now: '2026-10-10 11:30' }), ...over }, { tickets: [{ ref: 'JOB-101', stage: 'visit', contractor: 'Keystone Plumbing' }] });
const msg = (body: string, over: Record<string, unknown> = {}) => ({ tool: 'send_message', args: { recipient_name: 'Sara Okafor', recipient_role: 'tenant', channel: 'email', contact: 'sara.o@mail.example', body, ...over } });

describe('message.unknown_person', () => {
  it('blocks a greeting or recipient name that appears nowhere in the case', () => {
    expect(unknownPerson.check(msg('Hi Sarah, the plumber is booked.'), full())).toMatchObject({ rule: 'message.unknown_person' });
    expect(unknownPerson.check(msg('Hello,', { recipient_name: 'Mr Patel', recipient_role: 'landlord' }), full())!.reason).toMatch(/Patel.*Ava Kendall \(landlord\)/);
    expect(unknownPerson.check({ tool: 'request_landlord_approval', args: { landlord: 'Eva Kendal', decision_needed: 'x', options: [] } }, full())).toMatchObject({ rule: 'message.unknown_person' });
  });

  it('passes names from the records, titles, roles and neutral greetings', () => {
    expect(unknownPerson.check(msg('Hi Sara, the plumber is booked.'), full())).toBeUndefined();
    expect(unknownPerson.check(msg('Dear Ms Okafor, thank you.'), full())).toBeUndefined();
    expect(unknownPerson.check(msg('Hello, I have an update.', { recipient_name: 'Keystone Plumbing engineer', recipient_role: 'contractor' }), full())).toBeUndefined();
    expect(unknownPerson.check(msg('Hi there, quick update.', { recipient_name: 'National Gas Emergency Service', recipient_role: 'third_party' }), full())).toBeUndefined();
    const heatRight = full({ bundle: bundle({ ...DOCS, 'inputs/email_heatright.eml': 'From: HeatRight Ltd' }) });
    expect(unknownPerson.check(msg('Hello HeatRight, update below.', { recipient_name: 'HeatRight Ltd', recipient_role: 'contractor' }), heatRight)).toBeUndefined();
  });

  it('is a no-op without named parties or case text', () => {
    expect(unknownPerson.check(msg('Hi Sarah'), full({ brief: brief() }))).toBeUndefined();
    expect(unknownPerson.check(msg('Hi Sarah'), ctx({ brief: brief({ parties: PARTIES }) }))).toBeUndefined();
  });
});

describe('message.unknown_job_ref', () => {
  it('blocks a job ref in the message that is neither on file nor in the case', () => {
    expect(unknownJobRef.check(msg('Update on JOB-110: booked.'), full())!.reason).toMatch(/JOB-110.*jobs: JOB-101/);
    expect(unknownJobRef.check({ tool: 'request_landlord_approval', args: { landlord: 'Ava Kendall', decision_needed: 'Approve the quote on JOB-999', options: [] } }, full())).toMatchObject({ rule: 'message.unknown_job_ref' });
  });

  it('passes jobs on file (or a shortened ref), refs from the case history, other kinds of reference, and ticket_ref metadata', () => {
    expect(unknownJobRef.check(msg('Update on JOB-101: booked.'), full())).toBeUndefined();
    expect(unknownJobRef.check(msg('Same tap as JOB-088.'), full())).toBeUndefined();
    expect(unknownJobRef.check(msg('Your escalation E-4901 and property P-203.'), full())).toBeUndefined();
    expect(unknownJobRef.check(msg('Update: booked.', { ticket_ref: 'case-021' }), full())).toBeUndefined();
    const long = ctx({ bundle: bundle(DOCS) }, { tickets: [{ ref: 'NBL-030-2766', stage: 'init' }] });
    expect(unknownJobRef.check(msg('Re NBL-030: update.'), long)).toBeUndefined();
    expect(unknownJobRef.check(msg('Update on JOB-110'), ctx({ bundle: bundle(DOCS) }))).toBeUndefined();
  });
});

describe('message.unknown_amount', () => {
  it('blocks an amount that matches no quote, approval, invoice, limit or case figure', () => {
    expect(unknownAmount.check(msg('The quote is £165.'), full())).toMatchObject({ rule: 'message.unknown_amount' });
    expect(unknownAmount.check({ tool: 'request_landlord_approval', args: { landlord: 'Ava Kendall', decision_needed: 'Approve the leak repair', amount_gbp: 200, options: [] } }, full())!.reason).toMatch(/£200\.00.*quote £150 \+ VAT/);
  });

  it('passes the quoted figure with or without VAT, and figures from the case or the job record', () => {
    expect(unknownAmount.check(msg('The quote is £150 + VAT (£180 including VAT).'), full())).toBeUndefined();
    expect(unknownAmount.check(msg('Within the £1,000 cap.'), full({}))).toBeDefined();
    const recorded = ctx({ bundle: bundle(DOCS), brief: brief({ money }) }, { tickets: [{ ref: 'JOB-101', stage: 'result', approved_gbp: 1000 }] });
    expect(unknownAmount.check(msg('Within the £1,000 cap.'), recorded)).toBeUndefined();
  });

  it('is a no-op when the brief has no money facts', () => {
    expect(unknownAmount.check(msg('The quote is £165.'), full({ brief: brief({ parties: PARTIES }) }))).toBeUndefined();
    expect(unknownAmount.check(msg('The quote is £165.'), ctx({ bundle: bundle(DOCS) }))).toBeUndefined();
  });
});

describe('message dates', () => {
  it('reads dates with and without weekdays and years', () => {
    const now = new Date(Date.UTC(2026, 9, 10, 11, 30));
    expect(datesIn('Monday 12 October', now).map((d) => [d.weekday, d.date.toISOString().slice(0, 10)])).toEqual([['monday', '2026-10-12']]);
    expect(datesIn('Tues, Oct 13th 2026 and 24/7 support', now).map((d) => [d.weekday, d.date.toISOString().slice(0, 10)])).toEqual([['tuesday', '2026-10-13']]);
    expect(datesIn('on 2 January', now)[0].date.toISOString().slice(0, 10)).toBe('2027-01-02');
    expect(datesIn('on 2 January')).toEqual([]);
  });

  it('message.weekday_mismatch: blocks a weekday that does not match its date', () => {
    expect(weekdayMismatch.check(msg('The engineer will attend on Tuesday 12 October, 10-12.'), full())!.reason).toMatch(/2026-10-12 is a monday/);
    expect(weekdayMismatch.check(msg('Booked for Saturday 2025-09-13.'), ctx())).toBeUndefined();
    expect(weekdayMismatch.check(msg('Booked for Monday 2025-09-13.'), ctx())).toMatchObject({ rule: 'message.weekday_mismatch' });
  });

  it('message.weekday_mismatch: passes matching weekdays and dates with no weekday', () => {
    expect(weekdayMismatch.check(msg('The engineer will attend on Monday 12 October, 10-12.'), full())).toBeUndefined();
    expect(weekdayMismatch.check(msg('The engineer will attend on 12 October.'), full())).toBeUndefined();
    expect(weekdayMismatch.check(msg('See you Monday 12 October.'), ctx())).toBeUndefined();
    expect(weekdayMismatch.check(msg('Your confirmation said Tuesday 12 October, but 12 October is a Monday.'), full())).toBeUndefined();
  });

  it('message.visit_date_past: blocks a visit announced for a date before today', () => {
    expect(pastVisitDate.check(msg('The engineer is booked for Thursday 8 October.'), full())).toMatchObject({ rule: 'message.visit_date_past' });
    expect(pastVisitDate.check(msg('Keystone will attend on 2026-10-09 at 10am.'), full())).toMatchObject({ rule: 'message.visit_date_past' });
  });

  it('message.visit_date_past: passes future visits, past dates that are not the visit, and runs without today', () => {
    expect(pastVisitDate.check(msg('The engineer is booked for Monday 12 October.'), full())).toBeUndefined();
    expect(pastVisitDate.check(msg('Thanks for your email of 8 October. The engineer is booked for 12 October.'), full())).toBeUndefined();
    expect(pastVisitDate.check(msg('The engineer will attend on Monday 12 October, as you asked on 8 October.'), full())).toBeUndefined();
    expect(pastVisitDate.check(msg('The engineer is booked for 8 October.'), ctx())).toBeUndefined();
    expect(pastVisitDate.check(msg('A visit on 3 October found a worn washer; the repair is booked for 12 October.'), full())).toBeUndefined();
  });
});

describe('message.tenant_contact_to_provider', () => {
  const toProvider = (body: string) => ({ tool: 'send_message', args: { recipient_name: 'Keystone Plumbing', recipient_role: 'contractor', channel: 'email', contact: 'jobs@keystone.example', body } });

  const noShare = (over: Partial<GuardContext> = {}) =>
    full({ bundle: bundle({ ...DOCS, 'inputs/tenant_note.json': '{"contact_sharing": "No consent recorded to share phone number or email with contractors."}' }), ...over });

  it('passes the tenant contact on file to the assigned contractor when nothing says not to share', () => {
    expect(tenantContactToProvider.check(toProvider('Please call the tenant on 07700 900123 to book.'), full())).toBeUndefined();
    expect(tenantContactToProvider.check(toProvider('Email the tenant at Sara.O@mail.example.'), full())).toBeUndefined();
  });

  it("blocks the tenant's phone or email going to a contractor when the record says not to share", () => {
    expect(tenantContactToProvider.check(toProvider('Please call the tenant on 07700 900123 to book.'), noShare())).toMatchObject({ rule: 'message.tenant_contact_to_provider' });
    expect(tenantContactToProvider.check(toProvider('Email the tenant at Sara.O@mail.example.'), noShare())!.reason).toMatch(/say not to share/);
    expect(tenantContactToProvider.check(toProvider('Please call the tenant on 07700 900123.'), noShare({ ledger: [entry('A1', 'share_tenant_contact', {}, 'failed')] }))).toBeDefined();
  });

  it('passes once agreement is recorded, messages without contact details, and messages to the tenant', () => {
    expect(tenantContactToProvider.check(toProvider('Please call the tenant on 07700 900123.'), noShare({ ledger: [entry('A1', 'share_tenant_contact', { provider: 'Keystone Plumbing' })] }))).toBeUndefined();
    expect(tenantContactToProvider.check(toProvider('Please arrange access through our office on 020 7946 0000.'), noShare())).toBeUndefined();
    expect(tenantContactToProvider.check(msg('We have your number as 07700 900123.'), noShare())).toBeUndefined();
  });

  it('passes contact details sent for an emergency attendance', () => {
    expect(tenantContactToProvider.check(toProvider('EMERGENCY: rotten-egg smell. Tenant on 07700 900123.'), full())).toBeUndefined();
    expect(tenantContactToProvider.check(toProvider('Tenant on 07700 900123.'), full({ brief: brief({ parties: PARTIES, tags: ['gas'] }) }))).toBeUndefined();
    const p1 = ctx({ bundle: bundle(DOCS), brief: brief({ parties: PARTIES }) }, { tickets: [{ ref: 'JOB-101', stage: 'visit', priority: 'emergency' }] });
    expect(tenantContactToProvider.check(toProvider('Tenant on 07700 900123.'), p1)).toBeUndefined();
  });

  it('is a no-op when no tenant contact is known', () => {
    expect(tenantContactToProvider.check(toProvider('Call 07700 900123.'), ctx({ bundle: bundle(DOCS) }))).toBeUndefined();
  });
});
