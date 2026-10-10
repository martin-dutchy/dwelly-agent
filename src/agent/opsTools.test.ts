import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from './caseAgent.js';
import { loadCase } from './cases.js';
import { foreignAddresses, hearsaySpeaker, invoiceFlags, mentionsDate, namesAttachment, quoteAppears, quoteSpeakers, quoteTotal, tooThinForApproval, visitProblems } from './opsChecks.js';
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
    expect(mentionsDate('They agree on a visit time for the next day after 10:30 AM.', '2025-09-08 10:30', '2025-09-07 05:03')).toBe(true);
    expect(mentionsDate('They agree on a visit time for the next day after 10:30 AM.', '2025-09-09 10:30', '2025-09-07 05:03')).toBe(false);
  });

  it('reads "tomorrow" from the day the provider said it, not from today', () => {
    const said = ['### 2025-09-02 18:00 UTC — event 030', '- **From:** Contractor', 'I can come tomorrow at 10.'].join('\n');
    const t = ops({}, { evidence: said, today: '2025-09-03 07:00' });
    const visit = (datetime: string) => t.guard!('set_visit', { ticket_ref: 'NBL-1', datetime, slot_text: '10am', access: 'tenant_home', confirmed_by: 'provider', evidence_quote: 'I can come tomorrow at 10' }, []);
    expect(visit('2025-09-03 10:00')).toBeUndefined();
    expect(visit('2025-09-04 10:00')).toMatch(/does not name/);
  });

  it('says who wrote the words in an organiser history, and nothing for other formats', () => {
    expect(quoteSpeakers('arranged the repair for the 8 September 2025', history)).toEqual(['Tenant']);
    expect(quoteSpeakers('Confirmed for 1st September, 10am', history)).toEqual(['Contractor']);
    expect(quoteSpeakers('anything', '{"crm": true}')).toBeUndefined();
  });

  it('treats only the tenant and contractors as hearsay about the landlord', () => {
    expect(['Tenant', 'Contractor', 'Maintenance provider'].every(hearsaySpeaker)).toBe(true);
    expect(['Landlord', 'Agency / system', 'Northbridge Lettings', 'Northbridge Lettings system', 'Cedar Homes', 'unknown'].some(hearsaySpeaker)).toBe(false);
  });

  it('matches an attachment by its whole file name only', () => {
    expect(namesAttachment('attachments/quote.pdf', ['attachments/quote.pdf'])).toBe(true);
    expect(namesAttachment('see quote.pdf.', ['attachments/quote.pdf'])).toBe(true);
    expect(namesAttachment('oldquote.pdf', ['attachments/quote.pdf'])).toBe(false);
    expect(namesAttachment('quote.pdf.bak', ['attachments/quote.pdf'])).toBe(false);
    expect(namesAttachment('quote.pdf', [])).toBe(false);
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

  it('assigns on an emergency ticket before the landlord approval step, and not on a routine one', () => {
    const assign = { ticket_ref: 'NBL-1', contractor: 'X', visit_window: 'x' };
    expect(ops({ landlord_approval: 'required', severity: 'emergency' }).guard!('assign_contractor', assign)).toBeUndefined();
    expect(ops({ landlord_approval: 'required', severity: 'routine' }).guard!('assign_contractor', assign)).toMatch(/landlord approval/i);
  });

  describe('emergency quote approval without the landlord', () => {
    const evidence = 'Tenant email 12/10:\n> Water is pouring through the kitchen ceiling onto the fuse box.';
    const why = 'Live leak onto electrics: "Water is pouring through the kitchen ceiling onto the fuse box" (email 12/10)';
    const approve = (over: Record<string, unknown>, extra: Record<string, unknown>) =>
      ops({ severity: 'emergency', ...over }, { evidence }).guard!('approve_quote', { ticket_ref: 'NBL-1', amount_gbp: 640, contractor: 'X', approval_basis: 'emergency', ...extra });

    it('allows an emergency ticket with a justification quoting the case, and records it on the ticket', async () => {
      expect(approve({}, { emergency_justification: why })).toBeUndefined();
      const t = ops({ severity: 'emergency' }, { evidence });
      const args = { ticket_ref: 'NBL-1', amount_gbp: 640, contractor: 'X', approval_basis: 'emergency make-safe', emergency_justification: why };
      const res = await t.execute('approve_quote', args, ctx);
      expect(t.verify('approve_quote', args, res, ctx).status).toBe('verified');
      expect(t.state.tickets[0]).toMatchObject({ stage: 'quote_approved', approved_gbp: 640, emergency_approval: why });
      expect(t.state.records.find((r) => r.tool === 'approve_quote')?.args.emergency_justification).toBe(why);
    });

    it('blocks an emergency ticket without a justification, pointing at the emergency route', () => {
      expect(approve({}, {})).toMatch(/spend limit.*emergency_justification/);
      expect(approve({}, { emergency_justification: '  ' })).toMatch(/emergency_justification/);
    });

    it('blocks a justification that does not quote the case', () => {
      expect(approve({}, { emergency_justification: 'Ceiling about to collapse' })).toMatch(/does not quote the case/);
    });

    it('blocks a routine or urgent ticket even with a justification, without offering the emergency route', () => {
      for (const severity of ['routine', 'urgent', undefined]) {
        const r = approve({ severity }, { emergency_justification: why });
        expect(r).toMatch(/No recorded landlord approval/);
        expect(r).not.toMatch(/emergency_justification/);
      }
    });

    it('does not override a landlord who declined or is arranging their own contractor', () => {
      for (const decision of ['declined', 'own_contractor']) expect(approve({ landlord_decision: { decision } }, { emergency_justification: why })).toMatch(/No recorded landlord approval/);
    });
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

  it('skips the text check only for an attachment that exists, named in full', () => {
    const t = ops({}, { evidence: 'no text', mediaNames: ['attachments/1.png', 'attachments/Landlord reply.jpg'] });
    const rec = (source: string) => t.guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision: 'approved', evidence_quote: 'Go ahead', source });
    expect(rec('attachments/1.png')).toBeUndefined();
    expect(rec('image "Landlord reply.jpg", 12/10')).toBeUndefined();
    expect(rec('scan (1.PNG).')).toBeUndefined();
    expect(rec('event 21.png')).toMatch(/not in the case/);
    expect(rec('attachments/other.jpg')).toMatch(/not in the case/);
    expect(rec('photo')).toMatch(/not in the case/);
  });

  describe('who wrote the landlord decision', () => {
    const history = [
      '## 2026-08-07 11:49 UTC — event 003',
      '- **From:** Agency / system',
      'Spoke to landlord who approved for me to instruct a contractor to attend.',
      '## 2026-08-08 09:00 UTC — event 004',
      '- **From:** Tenant',
      'The landlord told me he is happy for you to send someone.',
      '## 2026-08-09 09:00 UTC — event 005',
      '- **From:** Contractor',
      'Spoke to the landlord on the phone, he said go ahead.',
      '## 2026-08-10 09:00 UTC — event 006',
      '- **From:** Maintenance provider',
      'Landlord has given the go ahead for the boiler.',
      '## 2026-08-11 09:00 UTC — event 007',
      '- **From:** Landlord',
      'Yes please go ahead with the boiler.',
      '## 2026-08-12 09:00 UTC — event 008',
      '- **From:** Northbridge Lettings system',
      'Landlord approved the quote of £605.',
    ].join('\n');
    const rec = (decision: string, evidence_quote: string, evidence = history) =>
      ops({}, { evidence }).guard!('record_landlord_decision', { ticket_ref: 'NBL-1', decision, evidence_quote, source: 'history' });

    it('blocks an approval the tenant or a contractor reports', () => {
      expect(rec('approved', 'he is happy for you to send someone')).toMatch(/written by Tenant.*hearsay.*unclear.*request_landlord_approval/);
      expect(rec('approved', 'Spoke to the landlord on the phone, he said go ahead')).toMatch(/written by Contractor.*hearsay/);
      expect(rec('approved', 'Landlord has given the go ahead for the boiler')).toMatch(/Maintenance provider/);
      expect(rec('declined', 'he said go ahead')).toMatch(/hearsay/);
    });

    it("allows the landlord's own words and agency or system records", () => {
      expect(rec('approved', 'Yes please go ahead with the boiler')).toBeUndefined();
      expect(rec('approved', 'Spoke to landlord who approved for me to instruct a contractor')).toBeUndefined();
      expect(rec('approved', 'Landlord approved the quote of £605')).toBeUndefined();
    });

    it('allows a quote that a landlord or agency event also contains', () => {
      expect(rec('approved', 'go ahead')).toBeUndefined();
    });

    it('does not block when the case has no event structure, or the decision is unclear', () => {
      expect(rec('approved', 'Spoke to the landlord on the phone, he said go ahead', 'Contractor email 09/08:\n> Spoke to the landlord on the phone, he said go ahead.')).toBeUndefined();
      expect(rec('unclear', 'Spoke to the landlord on the phone, he said go ahead')).toBeUndefined();
    });

    it('blocks the provider-reported approval on the real public cut', () => {
      const t = createOpsToolset(seedFromCase(loadCase('cases/public-cuts/006-provider-says-landlord-approved')));
      const r = t.guard!('record_landlord_decision', { ticket_ref: t.state.tickets[0].ref, decision: 'approved', evidence_quote: 'Spoke to the landlord on the phone, he said go ahead', source: 'event 015' });
      expect(r).toMatch(/written by Contractor/);
    });
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

  it('sends an approved job with no contractor to provider selection on resume_auto', async () => {
    const approved = ops({ stage: 'init', landlord_approval: 'confirmed' });
    expect(await approved.execute('resume_auto', { ticket_ref: 'NBL-1' }, ctx)).toMatchObject({ ok: true, next: expect.stringMatching(/provider selection/) });
    expect(approved.state.tickets[0]).toMatchObject({ mode: 'auto', provider_selection: 'requested' });

    for (const fields of [{ stage: 'init', landlord_approval: 'required' }, { stage: 'visit', landlord_approval: 'confirmed', contractor: 'Riverside Works' }]) {
      const t = ops(fields);
      expect(await t.execute('resume_auto', { ticket_ref: 'NBL-1' }, ctx)).not.toHaveProperty('next');
      expect(t.state.tickets[0].provider_selection).toBeUndefined();
    }
  });
});

describe('identity, consent and priority', () => {
  const evidence = [
    '### 2026-10-09 09:14 UTC — event 004',
    '- **From:** Tenant',
    'Yes, happy for the plumber to have my number to arrange the visit.',
    '### 2026-10-09 10:02 UTC — event 005',
    '- **From:** Contractor',
    'Landlord said I can have the tenant number.',
    'CRM: authorised contact Jonah Reid, son, added 2026-03-01.',
  ].join('\n');

  it('verify_identity needs words from the case, and is read back from the log', async () => {
    const t = ops({}, { evidence });
    const args = { party: 'Jonah Reid', role: 'third_party', evidence_quote: 'authorised contact Jonah Reid, son', source: 'crm' };
    expect(t.guard!('verify_identity', args)).toBeUndefined();
    expect(t.guard!('verify_identity', { ...args, evidence_quote: 'He knew his date of birth' })).toMatch(/not in the case.*treat Jonah Reid as unverified/);
    expect(t.guard!('verify_identity', { ...args, evidence_quote: 'ok' })).toMatch(/too short/);
    expect(ops().guard!('verify_identity', { ...args, evidence_quote: 'He knew his date of birth' })).toBeUndefined();
    const res = await t.execute('verify_identity', args, ctx);
    expect(res).toMatchObject({ ok: true, verification_id: expect.stringMatching(/^IDV-/) });
    expect(t.verify('verify_identity', args, res, ctx)).toMatchObject({ status: 'verified' });
  });

  it("share_tenant_contact needs the tenant's own consent in the case, and is read back on the ticket", async () => {
    const t = ops({}, { evidence });
    const args = { ticket_ref: 'NBL-1', provider: 'Keystone Plumbing', consent_quote: 'happy for the plumber to have my number', source: 'event 004' };
    expect(t.guard!('share_tenant_contact', args)).toBeUndefined();
    expect(t.guard!('share_tenant_contact', { ...args, consent_quote: 'Tenant agreed by phone' })).toMatch(/not in the case.*request_information/);
    expect(t.guard!('share_tenant_contact', { ...args, consent_quote: 'Landlord said I can have the tenant number' })).toMatch(/written by Contractor, not the tenant/);
    expect(t.verify('share_tenant_contact', args, undefined, ctx).status).toBe('not_applied');
    await t.execute('share_tenant_contact', args, ctx);
    expect(t.verify('share_tenant_contact', args, undefined, ctx).status).toBe('verified');
    expect(t.state.tickets[0].contact_shared).toEqual([{ provider: 'Keystone Plumbing', consent_quote: args.consent_quote, source: 'event 004' }]);
  });

  it('update_ticket raises the priority, never lowers it, and reads it back', async () => {
    const t = ops({ severity: 'urgent' });
    expect(t.guard!('update_ticket', { ref: 'NBL-1', priority: 'routine' })).toMatch(/is urgent and can only go up; routine would lower it/);
    expect(t.guard!('update_ticket', { ref: 'NBL-1', priority: 'urgent' })).toBeUndefined();
    expect(t.guard!('update_ticket', { ref: 'NBL-1', priority: 'emergency' })).toBeUndefined();
    expect(ops({ priority: 'P1' }).guard!('update_ticket', { ref: 'NBL-1', priority: 'urgent' })).toMatch(/is P1/);
    expect(ops().guard!('update_ticket', { ref: 'NBL-1', priority: 'routine' })).toBeUndefined();
    expect(t.guard!('update_ticket', { ref: 'NBL-1', note: 'tenant changed the window' })).toBeUndefined();
    const args = { ref: 'NBL-1', priority: 'emergency' };
    expect(await t.execute('update_ticket', args, ctx)).toMatchObject({ ok: true, priority: 'emergency' });
    expect(t.verify('update_ticket', args, undefined, ctx).status).toBe('verified');
    expect(t.verify('update_ticket', { ref: 'NBL-1', priority: 'urgent' }, undefined, ctx)).toMatchObject({ status: 'not_applied', evidence: expect.stringMatching(/priority is emergency/) });
    expect(await t.execute('update_ticket', { ref: 'NBL-1', note: 'x' }, ctx)).not.toHaveProperty('priority');
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

  it('gives public cases a landlord reachable through the agency record, citing only visible landlord events', () => {
    const seed = seedFromCase(loadCase('cases/public-cuts/002-quote-approval'));
    const landlord = seed.properties![0].landlord!;
    expect(landlord.contact).toBe('agency landlord record');
    expect(landlord.email).toBeUndefined();
    expect(landlord.notes!.join(' ')).toMatch(/event 0\d\d \(\w+, to landlord\)/);

    const early = seedFromCase(loadCase('cases/public-cuts/038-tenant-own-appliance'));
    expect(early.properties![0].landlord!.notes!.join(' ')).toMatch(/No landlord message is visible/);
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
