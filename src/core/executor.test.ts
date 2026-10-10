import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { ActionLedger, failureNote } from '../agent/ledger.js';
import { executeWith } from './executor.js';
import { FailureInjector, classifyFailure } from './failures.js';
import type { ToolContext, ToolDef } from './tools.js';

const tool = (name: string, run: ToolDef['run'] = () => ({ ok: true })): ToolDef => ({ name, description: name, parameters: z.object({ ref: z.string().optional() }), requiresVerification: false, kind: 'write', run });
const ctxWith = (plan: ConstructorParameters<typeof FailureInjector>[0] = {}): ToolContext => ({ conversationId: 'executor-test', channel: 'text', failures: new FailureInjector(plan) });

describe('failure classes', () => {
  it('retries a transient failure once, then switches route or escalates', () => {
    expect(classifyFailure('update_ticket', 1, 'Error: HTTP 500 Internal Server Error').failureClass).toBe('retry');
    expect(classifyFailure('update_ticket', 1, 'Error: Request timed out after 10000ms').nextStep).toMatch(/check the read-back/);
    expect(classifyFailure('update_ticket', 2, 'Error: HTTP 500 Internal Server Error').failureClass).toBe('record_and_escalate');
    expect(classifyFailure('send_message', 2, 'Error: HTTP 500 Internal Server Error')).toMatchObject({ failureClass: 'alternative_route', nextStep: expect.stringMatching(/another channel.*log_call/) });
    expect(classifyFailure('assign_contractor', 2).nextStep).toMatch(/another contractor/);
    expect(classifyFailure('escalate_to_human', 2).nextStep).toMatch(/add_note with the full handover packet/);
  });

  it('does not retry a request the system refused', () => {
    expect(classifyFailure('update_ticket', 1, 'not_found').failureClass).toBe('record_and_escalate');
    expect(classifyFailure('send_message', 1, 'recipient rejected').failureClass).toBe('alternative_route');
  });
});

describe('executor', () => {
  it('names the class and next step on a scripted error, and counts repeats of the same call', async () => {
    const tools = [tool('send_message')];
    const ctx = ctxWith({ send_message: [{ call: 1, mode: 'error' }, { call: 2, mode: 'error' }] });
    const first = await executeWith({ tools, state: {} }, 'send_message', { ref: 'a' }, ctx);
    expect(first).toMatchObject({ ok: false, error: 'tool_failed', failure_class: 'retry', next_step: expect.stringMatching(/retry once/) });
    const second = await executeWith({ tools, state: {} }, 'send_message', { ref: 'a' }, ctx);
    expect(second).toMatchObject({ failure_class: 'alternative_route' });
  });

  it('classifies a timeout as a retry that must check the read-back first', async () => {
    const r = await executeWith({ tools: [tool('update_ticket')], state: {} }, 'update_ticket', {}, ctxWith({ update_ticket: [{ call: 1, mode: 'timeout' }] }));
    expect(r).toMatchObject({ failure_class: 'retry', next_step: expect.stringMatching(/may be in place/) });
  });

  it('classifies a not-found result, and leaves successes, redirects and invalid arguments untyped', async () => {
    const tools = [tool('get'), tool('missing', () => ({ ok: false, error: 'not_found' })), tool('redirect', () => ({ ok: false, say: 'Use escalate_to_human instead.' }))];
    const ctx = ctxWith();
    expect(await executeWith({ tools, state: {} }, 'missing', {}, ctx)).toMatchObject({ failure_class: 'record_and_escalate' });
    expect(await executeWith({ tools, state: {} }, 'get', {}, ctx)).not.toHaveProperty('failure_class');
    expect(await executeWith({ tools, state: {} }, 'redirect', {}, ctx)).not.toHaveProperty('failure_class');
    expect(await executeWith({ tools, state: {} }, 'get', { ref: 1 }, ctx)).not.toHaveProperty('failure_class');
  });

  it('keeps counts per conversation', async () => {
    const tools = [tool('update_ticket')];
    const plan = { update_ticket: [{ call: 1, mode: 'error' as const }] };
    for (const ctx of [ctxWith(plan), ctxWith(plan)]) expect(await executeWith({ tools, state: {} }, 'update_ticket', {}, ctx)).toMatchObject({ failure_class: 'retry' });
  });
});

describe('ledger failure classes', () => {
  it('stores the class on a failed entry, escalates it on the repeat, and clears it once verified', () => {
    const ledger = new ActionLedger();
    const a = ledger.record('update_ticket', { ref: 'J' }, undefined, { status: 'not_applied', evidence: 'silent drop' });
    expect(a).toMatchObject({ status: 'failed', failureClass: 'retry' });
    expect(failureNote(a)).toMatch(/^ Failure class: retry\. Next: /);
    ledger.record('update_ticket', { ref: 'J' }, 'Error: HTTP 500', { status: 'not_applied', evidence: 'still missing' });
    expect(a).toMatchObject({ attempts: 2, failureClass: 'record_and_escalate' });
    ledger.record('update_ticket', { ref: 'J' }, undefined, { status: 'verified', evidence: 'there' });
    expect(a.failureClass).toBeUndefined();
    expect(failureNote(a)).toBe('');
  });

  it('leaves verified and unverifiable entries without a class', () => {
    const ledger = new ActionLedger();
    expect(ledger.record('add_note', {}, undefined, { status: 'verified', evidence: 'ok' })).not.toHaveProperty('failureClass');
    expect(ledger.record('log', {}, undefined, { status: 'unverifiable', evidence: 'no read-back' })).not.toHaveProperty('failureClass');
  });
});
