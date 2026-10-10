import { createHmac } from 'node:crypto';
import type { Agent } from '@earendil-works/pi-agent-core';
import { describe, expect, it } from 'vitest';
import { resetDb } from '../core/store.js';
import { tools } from '../core/tools.js';
import { agentConfig, webhookTool } from './elevenlabs/config.js';
import { recordCall, verifySignature } from './elevenlabs/postCall.js';
import { conversationIdOf, syncInterruption } from './pi/brain.js';
import { grade } from './scenarios.js';
import { normaliseDate, normalisePostcode } from './spoken.js';
import { READBACK_FIELD, handleVoiceToolCall } from './toolCall.js';

const conv = (id: string) => `conv-${id}-${Date.now()}`;
const tool = (name: string) => tools.find((t) => t.name === name)!;

describe('spoken-form normalisation (bad ASR)', () => {
  it.each([
    ['1991-03-14', '1991-03-14'],
    ['14/03/1991', '1991-03-14'],
    ['14-3-91', '1991-03-14'],
    ['14th of March 1991', '1991-03-14'],
    ['March 14th, 1991', '1991-03-14'],
    ['2 nov 85', '1985-11-02'],
  ])('reads date %s', (spoken, iso) => expect(normaliseDate(spoken)).toBe(iso));

  it('leaves unreadable dates alone so verification fails closed', () => {
    expect(normaliseDate('sometime in spring')).toBe('sometime in spring');
    expect(normaliseDate('31/13/1990')).toBe('31/13/1990');
  });

  it.each([
    ['e8 1hl', 'E8 1HL'],
    ['E81HL', 'E8 1HL'],
    ['e eight one h l', 'E8 1HL'],
    ['not a postcode', 'not a postcode'],
  ])('reads postcode %s', (spoken, pc) => expect(normalisePostcode(spoken)).toBe(pc));
});

describe('voice tool calls', () => {
  it('verifies identity from a spoken date of birth', async () => {
    const id = conv('dob');
    const res = await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-1001', full_name: 'Amelia Clark', date_of_birth: '14th of March 1991' });
    expect(res).toMatchObject({ verified: true });
  });

  it('refuses a write until the caller confirmed the read-back', async () => {
    const id = conv('readback');
    await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '1998-07-21' });
    const args = { conversation_id: id, tenant_id: 'T-1003', category: 'appliance', urgency: 'routine', description: 'Oven door hinge broken' };
    expect(await handleVoiceToolCall('create_repair_ticket', args)).toMatchObject({ ok: false, error: 'readback_required' });
    const res = await handleVoiceToolCall('create_repair_ticket', { ...args, [READBACK_FIELD]: true });
    expect(res).toMatchObject({ ok: true, verified: true });
    expect(res.ref).toBe(res.ticket_ref);
  });

  it('still enforces identity verification server-side', async () => {
    const res = await handleVoiceToolCall('get_tenancy', { conversation_id: conv('unverified'), tenant_id: 'T-1002' });
    expect(res).toMatchObject({ ok: false, error: 'not_verified' });
  });
});

describe('ElevenLabs agent config', () => {
  it('fills conversation_id from the platform, not the LLM, and gates writes on read-back', () => {
    const w = webhookTool(tool('create_repair_ticket'), 'https://x.test/', 'Bearer s');
    const body = w.api_schema.request_body_schema;
    expect(body.properties.conversation_id).toEqual({ type: 'string', dynamic_variable: 'system__conversation_id' });
    expect(body.required).toContain(READBACK_FIELD);
    expect(w.api_schema.url).toBe('https://x.test/voice/tools/create_repair_ticket');
    expect(w.interruption_mode).toBe('disable_during_tool');
    expect(webhookTool(tool('find_tenant'), 'https://x.test', 'Bearer s').interruption_mode).toBe('allow');
  });

  it('swaps the brain without changing the conversation settings', () => {
    const native = agentConfig({ name: 'a', brain: { kind: 'native', llm: 'claude-haiku-4-5', toolIds: ['t1'] } });
    const pi = agentConfig({ name: 'a', brain: { kind: 'pi', url: 'https://x.test/v1', apiKey: 'k' } });
    expect(native.conversation_config.agent.prompt).toMatchObject({ llm: 'claude-haiku-4-5', tool_ids: ['t1'] });
    expect(pi.conversation_config.agent.prompt).toMatchObject({ llm: 'custom-llm', tool_ids: [], custom_llm: { url: 'https://x.test/v1' } });
    expect(pi.conversation_config.agent.prompt.prompt).toContain('{{system__conversation_id}}');
    expect(pi.conversation_config.turn).toEqual(native.conversation_config.turn);
    expect(pi.conversation_config.asr).toEqual(native.conversation_config.asr);
  });
});

describe('post-call webhook', () => {
  const secret = 'whsec_test';
  const sign = (body: string, t = Math.floor(Date.now() / 1000)) => `t=${t},v0=${createHmac('sha256', secret).update(`${t}.${body}`).digest('hex')}`;

  it('accepts a valid signature and rejects tampering or replay', () => {
    const body = '{"type":"post_call_transcription"}';
    expect(verifySignature(body, sign(body), secret)).toBe(true);
    expect(verifySignature(body + ' ', sign(body), secret)).toBe(false);
    expect(verifySignature(body, sign(body, Math.floor(Date.now() / 1000) - 3600), secret)).toBe(false);
    expect(verifySignature(body, undefined, secret)).toBe(false);
  });

  it('flags a described safety issue with no verified P1 escalation', () => {
    const { flags } = recordCall({
      type: 'post_call_transcription',
      data: {
        conversation_id: conv('postcall'),
        transcript: [{ role: 'user', message: 'I can smell gas' }],
        analysis: { data_collection_results: { safety_issue: { value: true }, unclear_audio: { value: true } } },
      },
    });
    expect(flags.join('\n')).toMatch(/no verified P1 escalation/);
    expect(flags.join('\n')).toMatch(/audio was unclear/);
  });
});

describe('pi brain plumbing', () => {
  it('keys the session on the conversation id ElevenLabs puts in the prompt', () => {
    expect(conversationIdOf({ messages: [{ role: 'system', content: 'Rules...\nConversation id: conv_abc123' }] })).toBe('conv_abc123');
    const a = conversationIdOf({ messages: [{ role: 'system', content: 'x' }, { role: 'assistant', content: 'Hello' }, { role: 'user', content: 'hi' }] });
    const b = conversationIdOf({ messages: [{ role: 'system', content: 'x' }, { role: 'assistant', content: 'Hello' }, { role: 'user', content: 'hi' }, { role: 'assistant', content: 'more' }] });
    expect(a).toBe(b);
  });

  it('rewrites an interrupted turn to what the caller actually heard, across tool-call turns', () => {
    const say = (text: string) => ({ role: 'assistant', content: [{ type: 'text', text }, { type: 'toolCall', name: 'x' }] });
    const before = say('Let me check.');
    const after = say('Your reference is R four nine zero one and a plumber will call within a day.');
    const agent = { state: { messages: [{ role: 'user', content: 'hi' }, before, { role: 'toolResult' }, after] } } as unknown as Agent;
    expect(syncInterruption(agent, 'Let me check. Your reference is R four nine')).toBe(true);
    expect(before.content).toHaveLength(2);
    expect(after.content[0]).toMatchObject({ text: 'Your reference is R four nine [the caller interrupted here and did not hear the rest]' });
    expect(after.content.some((c) => c.type === 'toolCall')).toBe(true);
    expect(syncInterruption(agent, 'something else entirely')).toBe(false);
  });
});

describe('test console grading', () => {
  const flush = () => new Promise((r) => setTimeout(r, 50)); // audit appends are async
  const call = (id: string) => (name: string, args: Record<string, unknown>) => handleVoiceToolCall(name, { conversation_id: id, ...args });

  it('passes a call that does the right thing', async () => {
    resetDb();
    const id = conv('grade-pass');
    const t = call(id);
    await t('find_tenant', { name: 'Priya Shah' });
    await t('verify_identity', { tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '21st of July 1998' });
    await t('create_repair_ticket', { tenant_id: 'T-1003', category: 'appliance', urgency: 'routine', description: 'Oven door hinge snapped', [READBACK_FIELD]: true });
    await flush();
    const g = grade('routine-repair', id);
    expect(g.results.filter((r) => !r.pass)).toEqual([]);
    expect(g.passed).toBe(true);
  });

  it('fails a call that logged a routine ticket for a gas leak', async () => {
    resetDb();
    const id = conv('grade-fail');
    await call(id)('create_repair_ticket', { tenant_id: 'T-1002', category: 'heating', urgency: 'routine', description: 'Boiler check', [READBACK_FIELD]: true });
    await flush();
    const g = grade('gas-emergency', id);
    expect(g.passed).toBe(false);
    expect(g.results.find((r) => r.label === 'Verified P1 escalation')?.pass).toBe(false);
  });
});
