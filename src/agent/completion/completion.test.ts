import { describe, expect, it } from 'vitest';
import type { Decision } from '../caseAgent.js';
import { completionProblems } from '../harness/apply.js';
import type { CaseBrief, CaseBundle, Conflict, GuardContext } from '../harness/contracts.js';
import { NO_FLAGS } from '../harness/flags.js';
import type { LedgerEntry } from '../ledger.js';
import type { Ticket } from '../opsTools.js';
import { conflictsAcknowledged, escalationPacket, evidenceResolves, noProseOverclaim, reviewDatesValid, safetyAddressed } from './checks.js';
import { caseToday, parseDay } from './dates.js';
import { COMPLETION_CHECKS } from './index.js';

let seq = 0;
const entry = (tool: string, args: Record<string, unknown> = {}, status: LedgerEntry['status'] = 'verified'): LedgerEntry => {
  const id = `A${++seq}`;
  return { id, tool, args, key: id, attempts: 1, status, evidence: [] };
};
const brief = (b: Partial<CaseBrief> = {}): CaseBrief => ({ parties: [], facts: [], conflicts: [], deadlines: [], money: { quotes: [], approvals: [], invoices: [] }, questions: [], tags: [], notes: [], ...b });
const bundle = (b: Partial<CaseBundle> = {}): CaseBundle => ({
  id: 't',
  dir: '/tmp/t',
  format: 'practice',
  brief: '# Case\n\n- **Today:** Saturday 2026-10-10 11:30\n',
  documents: [
    { id: 'doc:inputs/email_tenant.eml', path: 'inputs/email_tenant.eml', kind: 'email', text: 'Hi, the boiler is leaking water onto the kitchen floor and the pilot light keeps going out.' },
    { id: 'doc:history.md', path: 'history.md', kind: 'markdown', text: '### 2026-08-07 11:48:38 UTC — event 003\n\nSpoke to landlord.' },
  ],
  events: [],
  parties: [],
  questions: [],
  seedTickets: [],
  failures: {} as CaseBundle['failures'],
  media: [],
  manifest: [],
  withheld: [],
  ...b,
});
const ctx = (c: Partial<GuardContext> = {}): GuardContext => ({ ledger: [], state: { tickets: [], records: [], properties: [] }, flags: NO_FLAGS, ...c });
const dec = (d: Partial<Decision> = {}): Partial<Decision> => d;

describe('dates', () => {
  it('parses ISO, UK day-first and written dates; rejects nonsense', () => {
    expect(parseDay('2026-10-12')).toBe('2026-10-12');
    expect(parseDay('2026-10-12 09:00')).toBe('2026-10-12');
    expect(parseDay('12/10/2026')).toBe('2026-10-12');
    expect(parseDay('Monday 12th October 2026')).toBe('2026-10-12');
    expect(parseDay('Oct 12, 2026')).toBe('2026-10-12');
    expect(parseDay('next week')).toBeUndefined();
    expect(parseDay('2026-02-30')).toBeUndefined();
  });

  it('takes today from the brief, then the bundle, then the case text', () => {
    expect(caseToday({ brief: brief({ now: '2026-10-09T10:00' }), bundle: bundle() })).toBe('2026-10-09');
    expect(caseToday({ bundle: bundle({ now: '2026-10-08' }) })).toBe('2026-10-08');
    expect(caseToday({ bundle: bundle() })).toBe('2026-10-10');
    expect(caseToday({})).toBeUndefined();
  });
});

describe('safety_addressed (F1)', () => {
  it('bounces a gas case with no verified emergency action', () => {
    const failedP1 = entry('escalate_to_human', { priority: 'P1' }, 'failed');
    const p = safetyAddressed.check(dec({ severity: 'urgent' }), ctx({ brief: brief({ tags: ['gas'] }), ledger: [failedP1, entry('add_note', { note: 'x' })] }));
    expect(p).toHaveLength(1);
    expect(p[0].message).toContain('gas');
    expect(p[0].message).toContain('priority P1');
  });

  it('bounces an emergency severity even without a brief', () => {
    expect(safetyAddressed.check(dec({ severity: 'emergency' }), ctx())).toHaveLength(1);
  });

  it('passes on a P1 escalation, tenant safety advice, an emergency dispatch or a stated reason', () => {
    const c = (ledger: LedgerEntry[], tickets: Ticket[] = []) => ctx({ brief: brief({ tags: ['co'] }), ledger, state: { tickets, records: [], properties: [] } });
    expect(safetyAddressed.check(dec(), c([entry('escalate_to_human', { priority: 'P1' })]))).toEqual([]);
    expect(safetyAddressed.check(dec(), c([entry('send_message', { recipient_role: 'tenant', body: 'Please open the windows and leave the flat, then call 0800 111 999.' })]))).toEqual([]);
    expect(safetyAddressed.check(dec(), c([entry('assign_contractor', { ticket_ref: 'J-1', contractor: 'Gas Co', visit_window: '2026-10-10 14:00' })], [{ ref: 'J-1', stage: 'init', severity: 'emergency' }]))).toEqual([]);
    expect(safetyAddressed.check(dec({ assumptions: ['The meter was capped by the emergency service yesterday, so there is no live risk.'] }), c([]))).toEqual([]);
  });

  it('does not count a routine message to the tenant or a P2 escalation', () => {
    const ledger = [entry('send_message', { recipient_role: 'tenant', body: 'We will be in touch next week about the boiler.' }), entry('escalate_to_human', { priority: 'P2' })];
    expect(safetyAddressed.check(dec(), ctx({ brief: brief({ tags: ['water'] }), ledger }))).toHaveLength(1);
  });

  it('is a no-op with no safety tag and no emergency', () => {
    expect(safetyAddressed.check(dec({ severity: 'routine' }), ctx({ brief: brief({ tags: ['quote_invoice'] }) }))).toEqual([]);
    expect(safetyAddressed.check(dec({ severity: 'routine' }), ctx())).toEqual([]);
  });
});

describe('review_dates_valid (F2)', () => {
  it('bounces a past follow-up cited by WAIT and a non-date review_on', () => {
    const fup = entry('schedule_follow_up', { due_on: '2026-10-01', purpose: 'chase' });
    const d = dec({
      next_actions: [{ type: 'WAIT', action: 'wait for landlord', recipient: 'internal', channel: 'internal', ledger_id: fup.id }],
      follow_ups: [{ party: 'landlord', purpose: 'chase', review_on: 'next week', ledger_id: fup.id }],
    });
    const p = reviewDatesValid.check(d, ctx({ bundle: bundle(), ledger: [fup] }));
    expect(p.map((x) => x.message)).toEqual([expect.stringContaining('2026-10-01 is before today (2026-10-10)'), expect.stringContaining('"next week" is not a date')]);
  });

  it('bounces an uncited past hold in the ledger and a follow-up citing nothing verified', () => {
    const hold = entry('put_on_hold', { ticket_ref: 'R-1', review_on: '2026-10-09' });
    const p = reviewDatesValid.check(dec({ follow_ups: [{ party: 'tenant', purpose: 'x', review_on: '2026-10-12', ledger_id: 'A999' }] }), ctx({ brief: brief({ now: '2026-10-10' }), ledger: [hold] }));
    expect(p.map((x) => x.message)).toEqual([expect.stringContaining('A999'), expect.stringContaining(`${hold.id} (put_on_hold on R-1)`)]);
  });

  it('passes future and same-day dates, and a bad hold replaced by a later valid one', () => {
    const old = entry('put_on_hold', { ticket_ref: 'R-1', review_on: '2026-10-01' });
    const hold = entry('put_on_hold', { ticket_ref: 'R-1', review_on: '2026-10-10' });
    const fup = entry('schedule_follow_up', { due_on: '2026-10-14' });
    const d = dec({
      next_actions: [{ type: 'WAIT', action: 'wait', recipient: 'internal', channel: 'internal', ledger_id: hold.id }],
      follow_ups: [{ party: 'contractor', purpose: 'chase quote', review_on: '2026-10-14', ledger_id: fup.id }],
    });
    expect(reviewDatesValid.check(d, ctx({ bundle: bundle(), ledger: [old, hold, fup] }))).toEqual([]);
  });

  it('only checks that dates parse when today is unknown', () => {
    const fup = entry('schedule_follow_up', { due_on: '2020-01-01' });
    expect(reviewDatesValid.check(dec(), ctx({ ledger: [fup] }))).toEqual([]);
    expect(reviewDatesValid.check(dec(), ctx({ ledger: [entry('schedule_follow_up', { due_on: 'Tuesday' })] }))).toHaveLength(1);
  });
});

describe('escalation_packet (F3)', () => {
  const esc = entry('escalate_to_human', { priority: 'P2', team: 'maintenance' });
  const send = entry('send_message', { recipient_role: 'tenant', body: 'x' });
  const packet = {
    to: 'Maintenance manager',
    decision_needed: 'Approve the £640 boiler repair above the £500 limit?',
    options: ['Approve the quote', 'Get a second quote'],
    recommendation: 'Approve: the boiler is leaking water',
    deadline: '2026-10-11 12:00',
    evidence: ['inputs/email_tenant.eml'],
    already_done: [`${send.id} told the tenant`],
    ledger_id: esc.id,
  };

  it('passes a complete packet whose evidence resolves by path, event number or quote', () => {
    const c = ctx({ bundle: bundle(), ledger: [send, esc] });
    expect(escalationPacket.check(dec({ escalations: [packet] }), c)).toEqual([]);
    expect(escalationPacket.check(dec({ escalations: [{ ...packet, evidence: ['event 3: spoke to landlord'] }] }), c)).toEqual([]);
    expect(escalationPacket.check(dec({ escalations: [{ ...packet, evidence: ['"the pilot light keeps going out"'] }] }), c)).toEqual([]);
  });

  it('names every gap in a thin packet', () => {
    const thin = { to: 'Maintenance', decision_needed: '', options: ['Approve'], recommendation: '', deadline: '', evidence: ['the tenant said it was fine'], already_done: [], ledger_id: send.id };
    const p = escalationPacket.check(dec({ escalations: [thin] }), ctx({ bundle: bundle(), ledger: [send, esc] }));
    expect(p).toHaveLength(1);
    for (const gap of ['decision_needed', 'options: at least 2', 'recommendation', 'deadline', 'evidence: none of', 'already_done', `ledger_id: ${send.id} is not a verified escalate_to_human`]) expect(p[0].message).toContain(gap);
  });

  it('does not resolve evidence for a withheld file or an event past the cut', () => {
    const b = bundle({ manifest: [{ path: 'index.md', kind: 'markdown', parse: 'withheld', included: false }] });
    expect(evidenceResolves('index.md', b)).toBe(false);
    expect(evidenceResolves('event 041', b)).toBe(false);
    expect(evidenceResolves('history.md, event 003', b)).toBe(true);
  });

  it('only requires non-empty evidence when there is no bundle, and is a no-op without escalations', () => {
    expect(escalationPacket.check(dec({ escalations: [{ ...packet, evidence: ['anything'] }] }), ctx({ ledger: [send, esc] }))).toEqual([]);
    expect(escalationPacket.check(dec({ outcome: 'escalated' }), ctx({ ledger: [esc] }))).toEqual([]);
  });
});

describe('no_prose_overclaim (F4)', () => {
  it('catches a claimed email to the landlord with no verified message (fixture over-claim)', () => {
    const p = noProseOverclaim.check(dec({ summary: 'The boiler is leaking. I have emailed the landlord and asked for approval.' }), ctx({ ledger: [entry('send_message', { recipient_role: 'landlord' }, 'failed')] }));
    expect(p).toHaveLength(1);
    expect(p[0].message).toContain('summary says "I have emailed the landlord');
  });

  it('catches a claim to the wrong party and claims in answers', () => {
    const ledger = [entry('send_message', { recipient_role: 'tenant', body: 'x' })];
    const d = dec({ summary: "We've emailed the landlord.", answers: [{ question: 'q', answer: 'I have approved the quote. I booked the visit for Monday.' }] });
    expect(noProseOverclaim.check(d, ctx({ ledger })).map((x) => x.message.split(' says')[0])).toEqual(['summary', 'answers[0]', 'answers[0]']);
  });

  it('passes claims backed by a verified entry of the right family', () => {
    const ledger = [
      entry('request_landlord_approval', { landlord: 'Ava' }),
      entry('assign_contractor', { ticket_ref: 'R-1' }),
      entry('update_ticket', { ref: 'R-1', stage: 'cancelled' }),
      entry('escalate_to_human', { priority: 'P2' }),
    ];
    const d = dec({ summary: 'I have asked the landlord to approve. I have now assigned Leo and cancelled the duplicate. We have escalated it. I have sent an engineer.' });
    expect(noProseOverclaim.check(d, ctx({ ledger }))).toEqual([]);
  });

  it('ignores negations, intentions, conditionals, quotes and history', () => {
    const d = dec({
      summary: [
        'I have not sent the quote to the landlord.',
        'The job can be closed once approved.',
        'We will book the visit when the tenant confirms.',
        'Once I have approved the quote, the contractor can start.',
        'The tenant wrote "I have paid the deposit".',
        'We told the tenant last week that the visit was booked.',
        'The landlord has approved the quote.',
        "I haven't emailed anyone yet.",
        'I need to cancel the old job.',
      ].join(' '),
    });
    expect(noProseOverclaim.check(d, ctx())).toEqual([]);
  });
});

describe('conflicts_acknowledged (F5)', () => {
  const spend: Conflict = { kind: 'spend_limit', detail: 'Quote £640.00 from Clearflow is above the landlord spend limit of £500', sources: ['doc:inputs/quote.md', 'crm:property.spend_limit'], severity: 'warn' };
  const addr: Conflict = { kind: 'address', detail: 'Message names 12 Mare Street but the job is at 3 Amhurst Road', sources: ['ev:4'], severity: 'block' };

  it('bounces each warn/block conflict that the decision does not mention', () => {
    const p = conflictsAcknowledged.check(dec({ conflicts: ['The tenant name is spelt two ways.'] }), ctx({ brief: brief({ conflicts: [spend, addr] }) }));
    expect(p).toHaveLength(2);
    expect(p[0].message).toContain('spend limit conflict');
    expect(p[0].message).toContain('crm:property.spend_limit');
  });

  it('passes when conflicts or assumptions mention the kind and a key token', () => {
    const d = dec({ conflicts: ['Quote of £640 exceeds the £500 spend limit, so I asked the landlord.'], assumptions: ['The address on the message (Mare Street) is wrong; trusted the job record.'] });
    expect(conflictsAcknowledged.check(d, ctx({ brief: brief({ conflicts: [spend, addr] }) }))).toEqual([]);
  });

  it('ignores info conflicts and is a no-op without a brief', () => {
    expect(conflictsAcknowledged.check(dec(), ctx({ brief: brief({ conflicts: [{ ...spend, severity: 'info' }] }) }))).toEqual([]);
    expect(conflictsAcknowledged.check(dec(), ctx())).toEqual([]);
  });
});

describe('COMPLETION_CHECKS (F6)', () => {
  it('registers every check once', () => {
    expect(COMPLETION_CHECKS.map((c) => c.id)).toEqual(['safety_addressed', 'review_dates_valid', 'escalation_packet', 'no_prose_overclaim', 'conflicts_acknowledged']);
  });

  it('never throws and finds nothing on an empty decision without case data', () => {
    expect(COMPLETION_CHECKS.flatMap((c) => c.check({}, ctx()))).toEqual([]);
    expect(() => COMPLETION_CHECKS.forEach((c) => c.check({ next_actions: [null as never], follow_ups: [{} as never], escalations: [{} as never], answers: [{} as never] }, ctx({ bundle: bundle(), brief: brief() })))).not.toThrow();
  });

  it('bounces each failing check at most twice, then keeps it as capped', () => {
    const d = dec({ severity: 'emergency', summary: 'I have emailed the landlord.' });
    const c = ctx({ brief: brief({ tags: ['gas'] }) });
    const counts = new Map<string, number>();
    const runs = [1, 2, 3].map(() => completionProblems(COMPLETION_CHECKS, d, c, counts));
    expect(runs.map((r) => r.bounce.map((p) => p.check))).toEqual([
      ['safety_addressed', 'no_prose_overclaim'],
      ['safety_addressed', 'no_prose_overclaim'],
      [],
    ]);
    expect(runs[2].capped.map((p) => p.check)).toEqual(['safety_addressed', 'no_prose_overclaim']);
    expect(counts.get('safety_addressed')).toBe(2);
  });

  it('a fixed check stops bouncing while another keeps its own count', () => {
    const c = ctx({ brief: brief({ tags: ['gas'] }) });
    const counts = new Map<string, number>();
    completionProblems(COMPLETION_CHECKS, dec({ summary: 'I have emailed the landlord.' }), c, counts);
    const fixed = completionProblems(COMPLETION_CHECKS, dec({ assumptions: ['No live gas risk: the supply was isolated by the engineer.'], summary: 'I have emailed the landlord.' }), c, counts);
    expect(fixed.bounce.map((p) => p.check)).toEqual(['no_prose_overclaim']);
    expect(counts.get('safety_addressed')).toBe(1);
  });
});
