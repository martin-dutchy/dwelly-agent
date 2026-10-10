import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from './caseAgent.js';
import { loadCase } from './cases.js';
import { foreignAddresses, invoiceFlags, mentionsDate, quoteAppears, quoteSpeakers, quoteTotal, tooThinForApproval, visitProblems } from './opsChecks.js';
import { seedFromCase } from './opsSeed.js';
import { createOpsToolset, landlordInformedProblem } from './opsTools.js';

const ctx = { conversationId: 'test', channel: 'text' as const };
const ADDRESS = 'Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ';
const job = (over: Record<string, unknown> = {}) => ({ ref: 'NBL-1', stage: 'init', property: ADDRESS, ...over });
const ops = (over: Record<string, unknown> = {}, extra: Record<string, unknown> = {}) =>
  createOpsToolset({ tickets: [job(over)], properties: [{ address: ADDRESS, landlord: { spend_limit_gbp: 300 } }], today: '2026-10-10 11:30', ...extra });

describe('ops checks', () => {
  it('spots an address that is not the job property', () => {
    expect(foreignAddresses('Your repair at Flat 17, 77 Harbour View is booked.', [ADDRESS])).toEqual(['Flat 17, 77 Harbour View']);
    expect(foreignAddresses('Your repair at Flat 30, 30 Harbour View is booked.', [ADDRESS])).toEqual([]);
  });

  it('rejects past visits and weekday mismatches', () => {
    expect(visitProblems('2026-10-09 10:00', 'Friday AM', '2026-10-10 11:30')[0]).toMatch(/before today/);
    expect(visitProblems('2025-09-13 12:00', 'Monday 12 till 2')[0]).toMatch(/saturday/);
    expect(visitProblems('2026-10-12 14:00', 'Monday 2-5pm', '2026-10-10')).toEqual([]);
  });

  it('flags invoices above the approval or from another company', () => {
    expect(invoiceFlags({ amount_gbp: 240, issuer: 'Keystone', contractor: 'Keystone', approved_gbp: quoteTotal(198.37, 'plus_vat') })).toHaveLength(1);
    expect(invoiceFlags({ amount_gbp: 90, issuer: 'Cedar Solutions', contractor: 'Stonebridge Works', approved_gbp: 108 })[0]).toMatch(/assigned to/);
    expect(invoiceFlags({ amount_gbp: 75.11, issuer: 'Lantern Services', contractor: 'Lantern Services', approved_gbp: 90 })).toEqual([]);
  });

  it('treats an emoji as no approval', () => {
    expect(tooThinForApproval('👍')).toBe(true);
    expect(tooThinForApproval('Yes please go ahead')).toBe(false);
  });

  it('finds a quote copied from the case, whatever the quotes, case, spacing or annotation', () => {
    const history = '#### event-019\n- **From:** Landlord\n\n> Please approve this  quote for works.\n> I don’t want the old toilet back.';
    expect(quoteAppears('please approve this quote for works', history)).toBe(true);
    expect(quoteAppears('“Please approve this quote for works.”', history)).toBe(true);
    expect(quoteAppears("I don't want the old toilet back", history)).toBe(true);
    expect(quoteAppears('Please approve this quote for works. I don’t want', history)).toBe(true);
    expect(quoteAppears('Please approve … old toilet back', history)).toBe(true);
    expect(quoteAppears('Email 12/10: "Please approve this quote for works."', history)).toBe(true);
    expect(quoteAppears('Please approve this quote for works (email, event 019)', history)).toBe(true);
    expect(quoteAppears('Please approve this quote for works - email 12/10', history)).toBe(true);
    expect(quoteAppears('Yes, go ahead with the repair', history)).toBe(false);
    expect(quoteAppears('Please approve this quote', 'Please approve this quoted figure')).toBe(false);
    expect(quoteAppears('old toilet back … Please approve', history)).toBe(false);
    expect(quoteAppears('', history)).toBe(false);
  });
});

describe('visit confirmation', () => {
  const history = [
    '### 2025-08-26 20:21 UTC — event 016',
    '- **From:** Contractor',
    'Visit tentatively planned for Monday morning between 10 and 12. Confirmed for 1st September, 10am.',
    '### 2025-08-30 14:02 UTC — event 021',
    '- **From:** Tenant',
    'She previously arranged the repair for the 8 September 2025.',
  ].join('\n');

  it('recognises a named calendar date, not a weekday alone', () => {
    expect(mentionsDate('arranged the repair for the 8 September 2025', '2025-09-08 10:00')).toBe(true);
    expect(mentionsDate('see you Sept 8th', '2025-09-08 10:00')).toBe(true);
    expect(mentionsDate('booked 08/09 am', '2025-09-08 10:00')).toBe(true);
    expect(mentionsDate('booked 18/09 am', '2025-09-08 10:00')).toBe(false);
    expect(mentionsDate('Monday morning between 10 and 12', '2025-09-08 10:00')).toBe(false);
    expect(mentionsDate('I can come tomorrow at 10', '2025-09-08 10:00', '2025-09-07 15:00')).toBe(true);
  });

  it('says who wrote the words in an organiser history, and nothing for other formats', () => {
    expect(quoteSpeakers('arranged the repair for the 8 September 2025', history)).toEqual(['Tenant']);
    expect(quoteSpeakers('Confirmed for 1st September, 10am', history)).toEqual(['Contractor']);
    expect(quoteSpeakers('anything', '{"crm": true}')).toBeUndefined();
  });

  it("will not book a date only the tenant stated, and books one the provider confirmed", () => {
    const t = ops({}, { evidence: history, today: '2025-08-30 14:10' });
    const visit = (datetime: string, over: Record<string, unknown>) => t.guard!('set_visit', { ticket_ref: 'NBL-1', datetime, slot_text: 'Monday 10-12', access: 'tenant_home', ...over }, []);
    expect(visit('2025-09-08 10:00', { confirmed_by: 'provider', evidence_quote: 'arranged the repair for the 8 September 2025' })).toMatch(/come from Tenant.*ask the provider to confirm/);
    expect(visit('2025-09-08 10:00', { confirmed_by: 'provider', evidence_quote: 'Monday morning between 10 and 12' })).toMatch(/does not name 2025-09-08/);
    expect(visit('2025-09-08 10:00', { confirmed_by: 'provider' })).toMatch(/No confirmation/);
    expect(visit('2025-09-08 10:00', { confirmed_by: 'assigned_this_run' })).toMatch(/no assign_contractor/);
    expect(visit('2025-09-01 10:00', { confirmed_by: 'provider', evidence_quote: 'Confirmed for 1st September, 10am' })).toBeUndefined();
  });

  it('accepts a visit the agent itself assigned this run, and is off with no case text', () => {
    const assigned = [{ id: 'A1', tool: 'assign_contractor', args: { ticket_ref: 'NBL-1' }, key: 'k', attempts: 1, status: 'verified' as const, evidence: [] }];
    const t = ops({}, { evidence: history });
    expect(t.guard!('set_visit', { ticket_ref: 'NBL-1', datetime: '2026-10-12 14:00', slot_text: 'Monday 2-5pm', access: 'tenant_home', confirmed_by: 'assigned_this_run' }, assigned)).toBeUndefined();
    expect(ops().guard!('set_visit', { ticket_ref: 'NBL-1', datetime: '2026-10-12 14:00', slot_text: 'Monday 2-5pm', access: 'tenant_home', confirmed_by: 'provider' })).toBeUndefined();
  });

  it('blocks the tenant-stated date on the real date-conflict cut', () => {
    const t = createOpsToolset(seedFromCase(loadCase('cases/public-cuts/026-date-conflict')));
    const ref = t.state.tickets[0].ref;
    const r = t.guard!('set_visit', { ticket_ref: ref, datetime: '2025-09-08 10:00', slot_text: 'Monday 8 September, 10-12', access: 'tenant_home', confirmed_by: 'provider', evidence_quote: 'she previously arranged the repair for the 8 September 2025' }, []);
    expect(r).toMatch(/not the provider/);
  });
});

describe('landlord_informed on close', () => {
  const entry = (id: string, tool: string, args: Record<string, unknown>, status: 'verified' | 'failed' = 'verified') => ({ id, tool, args, key: id, attempts: 1, status, evidence: [] });
  const ledger = [
    entry('A1', 'send_message', { recipient_role: 'tenant' }),
    entry('A2', 'send_message', { recipient_role: 'landlord' }),
    entry('A3', 'send_message', { recipient_role: 'landlord' }, 'failed'),
    entry('A4', 'request_landlord_approval', { landlord: 'L' }),
  ];
  it('accepts a verified landlord message, a history quote or a reason', () => {
    expect(landlordInformedProblem('A2', ledger)).toBeUndefined();
    expect(landlordInformedProblem('emailed them, A2', ledger)).toBeUndefined();
    expect(landlordInformedProblem('A4', ledger)).toBeUndefined();
    expect(landlordInformedProblem('history: "I will pay the contractor directly" (event 021)', ledger)).toBeUndefined();
    expect(landlordInformedProblem('not_applicable: agency-owned block, no landlord', ledger)).toBeUndefined();
  });
  it('rejects empty, free text, a tenant message or an unverified one', () => {
    expect(landlordInformedProblem('  ', ledger)).toMatch(/empty/);
    expect(landlordInformedProblem('they know', ledger)).toMatch(/must be/);
    expect(landlordInformedProblem('A1', ledger)).toMatch(/not a verified message to the landlord/);
    expect(landlordInformedProblem('A3', ledger)).toMatch(/not a verified message to the landlord/);
    expect(landlordInformedProblem('A9', ledger)).toMatch(/A9/);
  });
  it('accepts a ledger id unchecked when the ledger is not known', () => {
    expect(landlordInformedProblem('A3')).toBeUndefined();
  });
});

describe('ops guards', () => {
  it('blocks assigning before the landlord approval step', () => {
    expect(ops({ landlord_approval: 'required' }).guard!('assign_contractor', { ticket_ref: 'NBL-1', contractor: 'X', visit_window: 'x' })).toMatch(/landlord approval/i);
    expect(ops({ landlord_approval: 'confirmed' }).guard!('assign_contractor', { ticket_ref: 'NBL-1', contractor: 'X', visit_window: 'x' })).toBeUndefined();
    expect(ops({ landlord_decision: { decision: 'own_contractor' } }).guard!('assign_contractor', { ticket_ref: 'NBL-1', contractor: 'X', visit_window: 'x' })).toMatch(/own_contractor/);
  });

  it('allows quote approval only within the limit or a recorded approval', () => {
    const t = ops();
    expect(t.guard!('approve_quote', { ticket_ref: 'NBL-1', amount_gbp: 640 })).toMatch(/spend limit/);
    expect(t.guard!('approve_quote', { ticket_ref: 'NBL-1', amount_gbp: 250 })).toBeUndefined();
    expect(ops({ landlord_decision: { decision: 'approved', cap_gbp: 700 } }).guard!('approve_quote', { ticket_ref: 'NBL-1', amount_gbp: 640 })).toBeUndefined();
  });

  it('never changes bank details', () => {
    expect(ops().guard!('update_bank_details', {})).toMatch(/never changed/);
  });

  it('blocks messages naming another property, and tenant messages for a void property', () => {
    expect(ops().guard!('send_message', { recipient_role: 'landlord', body: 'Done at Flat 21, 161 Meadow Row.' })).toMatch(/Meadow Row/);
    const empty = createOpsToolset({ tickets: [job()], properties: [{ address: ADDRESS, tenanted: false }] });
    expect(empty.guard!('send_message', { ticket_ref: 'NBL-1', recipient_role: 'tenant', body: 'Hello' })).toMatch(/NOT TENANTED/);
  });

  it('will not close without the closing checks, and closes once they are met', async () => {
    const t = ops({ contractor: 'Lantern Services', approved_gbp: 90 });
    const close = { ticket_ref: 'NBL-1', mode: 'final_checks', resolution: 'fixed', tenant_confirmation: 'tenant emailed 12/10', landlord_informed: 'A3' };
    expect(t.guard!('close_ticket', close)).toMatch(/no completed work result.*no invoice/);
    await t.execute('record_work_result', { ticket_ref: 'NBL-1', outcome: 'completed', evidence: 'provider email' }, ctx);
    const inv = await t.execute('record_invoice', { ticket_ref: 'NBL-1', issuer: 'Other Co', amount_gbp: 150, who_pays: 'landlord_direct', source: 'email' }, ctx);
    expect(inv.flags).toHaveLength(2);
    expect(t.guard!('close_ticket', close)).toMatch(/invoice flags are unhandled/);
    await t.execute('hold_payment', { payee: 'Other Co', reason: 'invoice mismatch' }, ctx);
    expect(t.guard!('close_ticket', close)).toBeUndefined();
    await t.execute('close_ticket', close, ctx);
    expect(t.verify('close_ticket', close, undefined, ctx).status).toBe('verified');
  });

  it('checks the invoice against the quote the landlord approved', async () => {
    const t = ops({ contractor: 'Keystone' });
    await t.execute('record_quote', { ticket_ref: 'NBL-1', provider: 'Keystone', amount_gbp: 198.37, vat: 'plus_vat', items: ['spotlights'], source: 'email' }, ctx);
    await t.execute('record_landlord_decision', { ticket_ref: 'NBL-1', decision: 'approved', evidence_quote: 'Pls go ahead (email 28/09)' }, ctx);
    const inv = await t.execute('record_invoice', { ticket_ref: 'NBL-1', issuer: 'Keystone', amount_gbp: 240, who_pays: 'landlord_direct', source: 'email' }, ctx);
    expect(inv.flags).toEqual(['Invoice £240.00 is above the approved £238.04.']);
  });

  it('records a landlord decision only when the quote is in the case', () => {
    const t = ops({}, { evidence: 'Landlord email 12/10:\n> Yes, please send your contractor. Keep it under £200.' });
    const rec = (decision: string, evidence_quote: string, source?: string) => t.guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision, evidence_quote, source });
    expect(rec('approved', 'Yes, please send your contractor.')).toBeUndefined();
    expect(rec('approved', 'Yes please send your contractor (email 12/10)')).toBeUndefined();
    expect(rec('approved', 'Landlord approved the works by phone')).toMatch(/not in the case.*unclear/);
    expect(rec('declined', 'I will not pay for this')).toMatch(/not in the case/);
    expect(rec('unclear', 'landlord replied with a thumbs up')).toBeUndefined();
    expect(ops().guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision: 'approved', evidence_quote: 'Landlord approved by phone' })).toBeUndefined();
    const scanned = ops({}, { evidence: 'no text', mediaNames: ['attachments/letter.jpg'] });
    expect(scanned.guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision: 'approved', evidence_quote: 'Go ahead', source: 'letter.jpg' })).toBeUndefined();
    expect(scanned.guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision: 'approved', evidence_quote: 'Go ahead' })).toMatch(/image or scanned attachment/);
  });

  it('will not close until the landlord is shown to know', () => {
    const t = ops({ work_result: { outcome: 'completed' } });
    const close = (landlord_informed: string) => t.guard!('close_ticket', { ticket_ref: 'NBL-1', mode: 'without_payment', resolution: 'tenant fixed it', tenant_confirmation: 'tenant SMS 12/10', landlord_informed }, []);
    expect(close('')).toMatch(/landlord_informed is empty/);
    expect(close('A1')).toMatch(/not a verified message to the landlord/);
    expect(close('not_applicable: the landlord raised the job and closed it themselves')).toBeUndefined();
  });

  it('reads back holds and catches a dropped one', async () => {
    const t = ops();
    const args = { ticket_ref: 'NBL-1', reason: 'Waiting for Landlord', comment: 'approval', review_on: '2026-10-13' };
    expect(t.verify('put_on_hold', args, undefined, ctx).status).toBe('not_applied');
    await t.execute('put_on_hold', args, ctx);
    expect(t.verify('put_on_hold', args, undefined, ctx).status).toBe('verified');
    await t.execute('resume_auto', { ticket_ref: 'NBL-1' }, ctx);
    expect(t.state.tickets[0]).toMatchObject({ mode: 'auto' });
    expect(t.state.tickets[0].hold).toBeUndefined();
  });
});

describe('case seeding', () => {
  it('rebuilds the public job at the decision point', () => {
    const c = loadCase('HackatonPublicCases/Property Management/021', '3');
    const seed = seedFromCase(c);
    expect(seed.today).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(seed.tickets![0]).toMatchObject({ landlord_approval: 'required' });
    expect(seed.properties![0].address).toBeTruthy();
  });

  it('carries the visible case text as evidence, never the hidden ending', () => {
    const seed = seedFromCase(loadCase('cases/public-cuts/002-quote-approval'));
    expect(quoteAppears('Spoke to landlord who approved for me to instruct a contractor to attend', seed.evidence!)).toBe(true);
    expect(quoteAppears('Please approve this quote for works.', seed.evidence!)).toBe(false);
  });

  it('reads the property and spend limit from a practice CRM', () => {
    const seed = seedFromCase(loadCase('cases/practice/05'));
    expect(seed.properties![0]).toMatchObject({ id: 'P-203', landlord: { spend_limit_gbp: 300 } });
    expect(seed.today).toBe('2026-10-10 11:30');
  });
});

describe('guards inside the agent loop', () => {
  it('blocks the call before it runs, so it never reaches the ledger', async () => {
    const faux = fauxProvider();
    const models = createModels();
    models.setProvider(faux.provider);
    faux.setResponses([
      fauxAssistantMessage([fauxToolCall('update_bank_details', { party: 'L-01', sort_code: '00-00-00', account_number: '1', verification_done: 'email' })]),
      fauxAssistantMessage([
        fauxToolCall('submit_decision', { case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [], outcome: 'action_taken', severity: 'routine', summary: 's', answers: [], actions_claimed: [], failed_actions: [], conflicts: [], assumptions: [] }),
      ]),
    ]);
    const run = await runCase({ caseId: 'guard', prompt: 'p', systemPrompt: 's', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset: ops() });
    const results = run.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text);
    expect(results[0]).toMatch(/Blocked by policy/);
    expect(run.ledger).toHaveLength(0);
    expect(run.decision?.outcome).toBe('action_taken');
  });
});
