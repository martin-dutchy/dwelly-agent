import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from './caseAgent.js';
import { loadCase } from './cases.js';
import { foreignAddresses, invoiceFlags, quoteTotal, tooThinForApproval, visitProblems } from './opsChecks.js';
import { seedFromCase } from './opsSeed.js';
import { createOpsToolset } from './opsTools.js';

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
        fauxToolCall('submit_decision', { case_state: 'open', next_actions: [{ type: 'WAIT', action: 'wait', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [], outcome: 'no_action', severity: 'routine', summary: 's', answers: [], actions_claimed: [], failed_actions: [], conflicts: [], assumptions: [] }),
      ]),
    ]);
    const run = await runCase({ caseId: 'guard', prompt: 'p', systemPrompt: 's', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset: ops() });
    const results = run.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text);
    expect(results[0]).toMatch(/Blocked by policy/);
    expect(run.ledger).toHaveLength(0);
    expect(run.decision?.outcome).toBe('no_action');
  });
});
