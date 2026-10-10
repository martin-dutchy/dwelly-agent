import { describe, expect, it } from 'vitest';
import type { LedgerEntry } from '../ledger.js';
import { loopDetector } from './loop.js';
import { ctx, entry } from './testing.js';

const msg = { recipient_name: 'Sam Lee', recipient_role: 'tenant', channel: 'email', contact: 'sam@example.test', body: 'The plumber is booked.' };

describe('loop detector', () => {
  it('blocks a write that has failed twice, ignoring case and spacing', () => {
    const twice = ctx({ ledger: [entry('A1', 'send_message', msg, 'failed', 2)] });
    expect(loopDetector.check({ tool: 'send_message', args: { ...msg, body: '  the plumber   is BOOKED.' } }, twice)).toMatchObject({ rule: 'loop.repeated_failure' });
    const split = ctx({ ledger: [entry('A1', 'send_message', msg, 'failed'), entry('A2', 'send_message', { ...msg, body: 'The plumber is booked. ' }, 'failed')] });
    expect(loopDetector.check({ tool: 'send_message', args: msg }, split)!.reason).toMatch(/failed 2 times \(A1, A2\).*Change approach or submit/);
  });

  it('allows a first retry, a different message, and a write that later verified', () => {
    expect(loopDetector.check({ tool: 'send_message', args: msg }, ctx({ ledger: [entry('A1', 'send_message', msg, 'failed')] }))).toBeUndefined();
    expect(loopDetector.check({ tool: 'send_message', args: { ...msg, channel: 'sms' } }, ctx({ ledger: [entry('A1', 'send_message', msg, 'failed', 2)] }))).toBeUndefined();
    expect(loopDetector.check({ tool: 'send_message', args: msg }, ctx({ ledger: [entry('A1', 'send_message', msg, 'verified', 2)] }))).toBeUndefined();
  });

  it('blocks the same read a third time with nothing changed in between', () => {
    const c = ctx();
    const read = () => loopDetector.check({ tool: 'get_ticket', args: { ref: 'JOB-101' } }, c);
    expect([read(), read()]).toEqual([undefined, undefined]);
    expect(read()).toMatchObject({ rule: 'loop.repeated_read' });
    expect(loopDetector.check({ tool: 'get_ticket', args: { ref: 'JOB-102' } }, c)).toBeUndefined();
  });

  it('starts the read count again after a write, and counts each run on its own', () => {
    const ledger: LedgerEntry[] = [];
    const c = ctx({ ledger });
    const read = () => loopDetector.check({ tool: 'list_tickets', args: {} }, c);
    read();
    read();
    ledger.push(entry('A1', 'update_ticket', { ref: 'JOB-101', note: 'x' }));
    expect(read()).toBeUndefined();
    const other = ctx();
    expect([1, 2].map(() => loopDetector.check({ tool: 'list_tickets', args: {} }, other))).toEqual([undefined, undefined]);
  });
});
