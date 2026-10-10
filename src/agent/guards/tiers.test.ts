import { describe, expect, it } from 'vitest';
import { createOpsToolset } from '../opsTools.js';
import { GUARDS, TOOL_TIERS, tierOf } from './index.js';
import { bundle, ctx, entry } from './testing.js';
import { citesSource, tierThreeBasis } from './tiers.js';

const DOCS = {
  'inputs/email_landlord.eml': 'From: Ava Kendall <ava@kendall.example>\nRef: QF-0931\n\nHappy for you to go ahead with the boiler repair, up to £400.',
  'inputs/crm.json': '{"landlord": {"name": "Ava Kendall", "spend_limit_gbp": 250}}',
};
const withCase = (over = {}, state = {}) => ctx({ bundle: bundle(DOCS), ...over }, { tickets: [{ ref: 'JOB-101', stage: 'visit' }], ...state });
const check = (tool: string, args: Record<string, unknown>, c = withCase()) => tierThreeBasis.check({ tool, args }, c);

describe('tool tiers', () => {
  it('gives every ops tool a tier', () => {
    const missing = createOpsToolset().tools.map((t) => t.name).filter((n) => TOOL_TIERS[n] === undefined);
    expect(missing).toEqual([]);
  });

  it('puts reads at 0, messages at 2, and money, closure and contact sharing at 3', () => {
    expect(createOpsToolset().tools.filter((t) => t.kind === 'read').every((t) => tierOf(t.name) === 0)).toBe(true);
    expect(['send_message', 'request_information', 'request_landlord_approval'].map(tierOf)).toEqual([2, 2, 2]);
    expect(['approve_quote', 'close_ticket', 'cancel_ticket', 'hold_payment', 'share_tenant_contact'].map(tierOf)).toEqual([3, 3, 3, 3, 3]);
    expect(tierOf('some_new_tool')).toBe(1);
  });

  it('registers the tier-3 basis guard', () => {
    expect(GUARDS.map((g) => g.id)).toContain('tier3.basis');
  });
});

describe('tier-3 basis', () => {
  it('blocks a tier-3 call whose basis cites nothing checkable, saying where to cite', () => {
    const v = check('cancel_ticket', { ref: 'JOB-101', reason: 'not needed any more' });
    expect(v).toMatchObject({ rule: 'tier3.basis' });
    expect(v!.reason).toMatch(/In reason, cite.*inputs\/email_landlord\.eml/);
    expect(check('close_ticket', { ticket_ref: 'JOB-101', mode: 'final_checks', resolution: 'fixed', tenant_confirmation: 'yes', landlord_informed: 'told them' })).toMatchObject({ rule: 'tier3.basis' });
    expect(check('approve_quote', { ticket_ref: 'JOB-101', amount_gbp: 380, approval_basis: 'landlord is fine with it' })).toMatchObject({ rule: 'tier3.basis' });
  });

  it('accepts a case file, an event, a job, a verified ledger id or the case words in quotes', () => {
    expect(check('cancel_ticket', { ref: 'JOB-101', reason: 'landlord withdrew it (email_landlord.eml)' })).toBeUndefined();
    expect(check('approve_quote', { ticket_ref: 'JOB-101', amount_gbp: 380, approval_basis: 'Landlord: "Happy for you to go ahead with the boiler repair"' })).toBeUndefined();
    expect(check('cancel_ticket', { ref: 'JOB-101', reason: 'duplicate of JOB-101' })).toBeUndefined();
    const c = withCase({ ledger: [entry('A2', 'send_message', { recipient_role: 'landlord' })] });
    expect(check('close_ticket', { ticket_ref: 'JOB-101', mode: 'final_checks', resolution: 'fixed', tenant_confirmation: 'yes', landlord_informed: 'A2' }, c)).toBeUndefined();
    const events = withCase({ bundle: bundle(DOCS, { events: [{ id: 'ev:27', channel: 'email', text: 'x', doc: 'doc:inputs/email_landlord.eml' }] }) });
    expect(check('hold_payment', { payee: 'Keystone', reason: 'invoice from another company, event 27' }, events)).toBeUndefined();
    expect(check('hold_payment', { payee: 'Keystone', reason: 'invoice from another company, event 28' }, events)).toMatchObject({ rule: 'tier3.basis' });
  });

  it('accepts what the job records already justify: a recorded approval, the spend limit, flagged invoices', () => {
    const records = { properties: [{ address: 'x', landlord: { spend_limit_gbp: 250 } }] };
    expect(check('approve_quote', { ticket_ref: 'JOB-101', amount_gbp: 200, approval_basis: 'within limit' }, withCase({}, records))).toBeUndefined();
    expect(check('approve_quote', { ticket_ref: 'JOB-101', amount_gbp: 300, approval_basis: 'within limit' }, withCase({}, records))).toMatchObject({ rule: 'tier3.basis' });
    const approved = { tickets: [{ ref: 'JOB-101', stage: 'init', landlord_decision: { decision: 'approved' } }] };
    expect(check('approve_quote', { ticket_ref: 'JOB-101', amount_gbp: 380, approval_basis: 'approved' }, withCase({}, approved))).toBeUndefined();
    const flagged = { tickets: [{ ref: 'JOB-101', stage: 'result', invoice: { flags: ['Invoice is from "X"'] } }] };
    expect(check('hold_payment', { payee: 'X', reason: 'mismatch' }, withCase({}, flagged))).toBeUndefined();
  });

  it('is a no-op without case text, and ignores tools below tier 3', () => {
    expect(check('cancel_ticket', { ref: 'JOB-101', reason: 'nothing' }, ctx())).toBeUndefined();
    expect(tierThreeBasis.tools).not.toContain('send_message');
  });

  it('accepts an address, domain, reference or amount copied from the case', () => {
    const c = withCase();
    expect(citesSource('reply-to does not match ava@kendall.example', c)).toBe(true);
    expect(citesSource('sent from kendall.example, not the domain on file', c)).toBe(true);
    expect(citesSource('quote QF-0931 is unsigned', c)).toBe(true);
    expect(citesSource('above the £400 the landlord agreed', c)).toBe(true);
    expect(citesSource('over the 250 limit', c)).toBe(true);
    expect(check('hold_payment', { payee: 'Ava Kendall (QF-0931)', reason: 'bank change request, call back first' })).toBeUndefined();
  });

  it('does not treat a short common phrase, an unverified ledger id, or a fact absent from the case as a source', () => {
    const c = withCase({ ledger: [entry('A1', 'send_message', {}, 'failed')] });
    expect(citesSource('A1', c)).toBe(false);
    expect(citesSource('go ahead', c)).toBe(false);
    expect(citesSource('lookalike domain kendal1.example', c)).toBe(false);
    expect(citesSource('quote QF-0932 and £401', c)).toBe(false);
    expect(citesSource('since 2025', c)).toBe(false);
  });
});
