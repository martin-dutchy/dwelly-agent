import { createHmac } from 'node:crypto';
import type { Agent } from '@earendil-works/pi-agent-core';
import { describe, expect, it } from 'vitest';
import { tools } from '../core/tools.js';
import { agentConfig, webhookTool } from './elevenlabs/config.js';
import { callFlags, verifySignature } from './elevenlabs/postCall.js';
import { conversationIdOf, syncInterruption } from './pi/brain.js';
import type { AddressInfo } from 'node:net';
import { onAudit } from '../core/audit.js';
import { buildCallLog, grade, scenarios } from './scenarios.js';
import { createVoiceServer, toE164 } from './server.js';
import { whatsappLink, whatsappMessage } from './campaign.js';
import { testerCard } from './scenarios.js';
import { memoryStore } from './store.js';
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
  it('refuses to verify against a tenant id the call never looked up', async () => {
    const id = conv('guess');
    expect(await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-1001', full_name: 'Jonah Okafor', date_of_birth: '1985-11-02' })).toMatchObject({ ok: false, error: 'unknown_tenant_id' });
    await handleVoiceToolCall('find_tenant', { conversation_id: id, name: 'Jonah Okafor' });
    expect(await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-1002', full_name: 'Jonah Okafor', date_of_birth: '1985-11-02' })).toMatchObject({ verified: true });
  });

  it('verifies identity from a spoken date of birth', async () => {
    const id = conv('dob');
    await handleVoiceToolCall('find_tenant', { conversation_id: id, name: 'Amelia Clarke' });
    const res = await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-1001', full_name: 'Amelia Clark', date_of_birth: '14th of March 1991' });
    expect(res).toMatchObject({ verified: true });
  });

  it('refuses a write until the caller confirmed the read-back', async () => {
    const id = conv('readback');
    await handleVoiceToolCall('find_tenant', { conversation_id: id, name: 'Priya Shah' });
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
    const flags = callFlags([], { data_collection_results: { safety_issue: { value: true }, unclear_audio: { value: true } } });
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

describe('grading from the event log', () => {
  const store = memoryStore();
  onAudit((id, e) => void store.appendEvent(id, e as never));
  const call = (id: string) => (name: string, args: Record<string, unknown>) => handleVoiceToolCall(name, { conversation_id: id, ...args });
  const logOf = async (id: string) => buildCallLog(await store.events(id));

  it('passes a call that does the right thing', async () => {
    const id = conv('grade-pass');
    const t = call(id);
    await t('find_tenant', { name: 'Priya Shah' });
    await t('verify_identity', { tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '21st of July 1998' });
    await t('create_repair_ticket', { tenant_id: 'T-1003', category: 'appliance', urgency: 'routine', description: 'Oven door hinge snapped', [READBACK_FIELD]: true });
    const g = grade('routine-repair', await logOf(id));
    expect(g.results.filter((r) => !r.pass)).toEqual([]);
    expect(g.passed).toBe(true);
  });

  it('fails a call that logged a routine ticket for a gas leak', async () => {
    const id = conv('grade-fail');
    await call(id)('create_repair_ticket', { tenant_id: 'T-1002', category: 'heating', urgency: 'routine', description: 'Boiler check', [READBACK_FIELD]: true });
    const g = grade('gas-emergency', await logOf(id));
    expect(g.passed).toBe(false);
    expect(g.results.find((r) => r.label === 'Verified P1 escalation')?.pass).toBe(false);
  });

  it('gives every call its own world, so concurrent testers do not collide', async () => {
    const [a, b] = [conv('world-a'), conv('world-b')];
    for (const id of [a, b]) {
      await call(id)('find_tenant', { name: 'Priya Shah' });
      await call(id)('verify_identity', { tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '1998-07-21' });
      const r = await call(id)('create_repair_ticket', { tenant_id: 'T-1003', category: 'appliance', urgency: 'routine', description: 'Oven door', [READBACK_FIELD]: true });
      expect(r).toMatchObject({ verified: true });
      expect(r.duplicate).toBeUndefined();
    }
  });

  it('gives every scenario a tester card without the script or checks', () => {
    for (const s of scenarios) {
      expect(s.brief.situation.length).toBeGreaterThan(20);
      expect(s.brief.facts.length).toBeGreaterThan(0);
      expect(s.brief.facts[0][0]).toBe('Your name');
      expect(s.brief.beats.length).toBeGreaterThan(1);
      if (s.brief.twist) expect(s.brief.beats.some((b) => b.startsWith('🤫'))).toBe(true);
    }
  });
});

describe('tester and admin routes', () => {
  const env = { ADMIN_PASSWORD: 'pw', VOICE_TOOL_SECRET: 's' } as NodeJS.ProcessEnv;
  const withServer = async (fn: (base: string, store: ReturnType<typeof memoryStore>) => Promise<void>) => {
    const store = memoryStore();
    const server = createVoiceServer(env, store).listen(0);
    await new Promise((r) => server.once('listening', r));
    try {
      await fn(`http://127.0.0.1:${(server.address() as AddressInfo).port}`, store);
    } finally {
      server.close();
    }
  };
  const basic = (pw: string) => ({ authorization: `Basic ${Buffer.from(`admin:${pw}`).toString('base64')}` });

  it('requires the admin password', async () => {
    await withServer(async (base) => {
      expect((await fetch(`${base}/admin`)).status).toBe(401);
      expect((await fetch(`${base}/admin`, { headers: basic('wrong') })).status).toBe(401);
      expect((await fetch(`${base}/admin`, { headers: basic('pw') })).status).toBe(200);
    });
  });

  it('serves a card to a valid invite, hides the script, and blocks revoked links', async () => {
    await withServer(async (base, store) => {
      const t = await store.createTester({ name: 'Mum', dailyCap: 2 });
      const res = await (await fetch(`${base}/t/${t.token}/api/card`)).json();
      expect(res.name).toBe('Mum');
      expect(res.card.situation).toBeTruthy();
      expect(res.card.script).toBeUndefined();
      expect(res.card.checks).toBeUndefined();
      expect((await fetch(`${base}/t/nonexistent-token/api/card`)).status).toBe(403);
      await store.setRevoked(t.id, true);
      expect((await fetch(`${base}/t/${t.token}/api/card`)).status).toBe(403);
    });
  });

  it('enforces the daily call cap per invite', async () => {
    await withServer(async (base, store) => {
      const t = await store.createTester({ name: 'Dad', dailyCap: 1 });
      await store.registerCall({ conversationId: conv('cap'), testerId: t.id, scenarioId: 'routine-repair', brain: 'native' });
      const r = await fetch(`${base}/t/${t.token}/api/start`, { method: 'POST' });
      expect(r.status).toBe(429);
    });
  });

  it('keeps one active invite per number: replace for the same person, refuse for someone else', async () => {
    await withServer(async (base) => {
      const make = (body: Record<string, unknown>) => fetch(`${base}/admin/api/testers`, { method: 'POST', headers: { ...basic('pw'), 'content-type': 'application/json' }, body: JSON.stringify({ dailyCap: 5, ...body }) });
      expect((await make({ name: 'Jayna', phone: '+447700900555', scenarioId: 'gas-emergency' })).status).toBe(200);
      const dup = await make({ name: 'Jayna', phone: '07700 900555', scenarioId: 'routine-repair' });
      expect(dup.status).toBe(409);
      expect((await dup.json()).canReplace).toBe(true);
      expect((await make({ name: 'Narcis', phone: '+447700900555' })).status).toBe(409);
      expect((await make({ name: 'Jayna', phone: '+447700900555', scenarioId: 'routine-repair', replace: true })).status).toBe(200);
    });
  });

  it('validates outbound test calls before dialling', async () => {
    await withServer(async (base) => {
      const post = (body: unknown) => fetch(`${base}/admin/api/phone-call`, { method: 'POST', headers: { ...basic('pw'), 'content-type': 'application/json' }, body: JSON.stringify(body) });
      expect((await post({ scenarioId: 'routine-repair', to: '07700 900123' })).status).toBe(400);
      expect((await post({ scenarioId: 'nope', to: '+447700900123' })).status).toBe(400);
      expect((await post({ scenarioId: 'routine-repair', to: '+447700900123' })).status).toBe(400); // no phone number id configured
    });
  });

  it('keeps a fixed case on the invite and refuses phone calls without a number', async () => {
    await withServer(async (base, store) => {
      const t = await store.createTester({ name: 'Marc', dailyCap: 5, phone: '+447700900123', scenarioId: 'gas-emergency' });
      const res = await (await fetch(`${base}/t/${t.token}/api/card`)).json();
      expect(res.card.id).toBe('gas-emergency');
      expect(res.fixed).toBe(true);
      expect(res.phone).toBeNull(); // no ELEVENLABS_PHONE_NUMBER_ID in this env, so no call-me button
      const r = await fetch(`${base}/t/${t.token}/api/phone-call`, { method: 'POST', body: JSON.stringify({ scenarioId: 'gas-emergency' }) });
      expect(r.status).toBe(400);
    });
  });

  it('stores a tester\'s rating and comment on their own call only', async () => {
    await withServer(async (base, store) => {
      const a = await store.createTester({ name: 'A', dailyCap: 5 });
      const b = await store.createTester({ name: 'B', dailyCap: 5 });
      const id = conv('fb');
      await store.registerCall({ conversationId: id, testerId: a.id, scenarioId: 'routine-repair', brain: 'native' });
      const post = (t: string, body: unknown) => fetch(`${base}/t/${t}/api/calls/${id}/feedback`, { method: 'POST', body: JSON.stringify(body) });
      expect((await post(b.token, { rating: 1 })).status).toBe(404);
      expect((await post(a.token, { rating: 4, comment: 'misheard my postcode' })).status).toBe(200);
      expect((await store.getCall(id))?.feedback).toMatchObject({ rating: 4, comment: 'misheard my postcode' });
    });
  });

  it('only lets a tester end their own calls', async () => {
    await withServer(async (base, store) => {
      const a = await store.createTester({ name: 'A', dailyCap: 5 });
      const b = await store.createTester({ name: 'B', dailyCap: 5 });
      const id = conv('own');
      await store.registerCall({ conversationId: id, testerId: a.id, scenarioId: 'routine-repair', brain: 'native' });
      expect((await fetch(`${base}/t/${b.token}/api/calls/${id}/end`, { method: 'POST' })).status).toBe(404);
    });
  });
});

describe('WhatsApp heads-up', () => {
  it('normalises UK numbers to E.164', () => {
    expect(toE164('+44 7877 094577')).toBe('+447877094577');
    expect(toE164('07877 094577')).toBe('+447877094577');
    expect(toE164('0044 7877 094577')).toBe('+447877094577');
    expect(toE164('+44 (0)7877 094577')).toBe('+447877094577');
    expect(toE164('hello')).toBeUndefined();
  });

  it('includes the call-me link and the card, and opens the right chat', () => {
    const card = testerCard(scenarios[0]);
    const m = whatsappMessage(card, { name: 'Marc', from: '+16813346993', link: 'https://x.test/t/abc', phone: true });
    expect(m).toContain('Hi Marc!');
    expect(m).toContain('Call me now');
    expect(m).toContain('https://x.test/t/abc');
    expect(m).toContain(card.beats[0]);
    expect(m).toContain(`YOU'RE PLAYING: ${card.persona.toUpperCase()}`);
    expect(m).toContain('When the call starts');
    expect(m).toContain('What to do on the call');
    expect(whatsappLink(m, '+44 7877 094577')).toMatch(/^https:\/\/wa\.me\/447877094577\?text=/);
  });
});

describe('case-grounded scenarios', () => {
  const store = memoryStore();
  onAudit((id, e) => void store.appendEvent(id, e as never));
  const holdout = new Set(['031', '036', '041', '045', '048', '050']);

  it('never draws on a holdout case', () => {
    for (const s of scenarios) if (s.source) expect(holdout.has(s.source.case)).toBe(false);
  });

  it('seeds the call world from its case so inbound tenants can be verified', async () => {
    const { setWorldSeeder, registerScenario } = await import('./toolCall.js');
    const { worldFor } = await import('./scenarios.js');
    setWorldSeeder(worldFor);
    const id = conv('seed');
    registerScenario(id, 'tenant-conflicting-appointment');
    await handleVoiceToolCall('find_tenant', { conversation_id: id, name: 'Clara Hughes' });
    const r = await handleVoiceToolCall('verify_identity', { conversation_id: id, tenant_id: 'T-026', full_name: 'Clara Hughes', date_of_birth: '11th of February 1994' });
    expect(r).toMatchObject({ verified: true });
  });

  it('grades a landlord call that records the right quote and splits the roof leak', async () => {
    const id = conv('landlord');
    const t = (name: string, args: Record<string, unknown>) => handleVoiceToolCall(name, { conversation_id: id, scenario_id: 'landlord-two-quotes', [READBACK_FIELD]: true, ...args });
    expect(await t('record_landlord_decision', { decision: 'approve', amount_gbp: 1370, notes: 'Eliza Bennett, no VAT' })).toMatchObject({ verified: true });
    expect(await t('add_case_note', { kind: 'new_issue', note: 'Roof leak at the landlord\'s other flat: separate request.' })).toMatchObject({ verified: true });
    const g = grade('landlord-two-quotes', buildCallLog(await store.events(id)));
    expect(g.results.filter((r) => !r.pass)).toEqual([]);
  });

  it('refuses a case write without read-back, like every other write', async () => {
    const r = await handleVoiceToolCall('record_landlord_decision', { conversation_id: conv('nrb'), decision: 'approve', amount_gbp: 95 });
    expect(r).toMatchObject({ ok: false, error: 'readback_required' });
  });

  it('briefs the agent with facts, goal and the case date, and opens outbound calls by name', async () => {
    const { callBrief, firstMessage, scenarioById } = await import('./scenarios.js');
    const s = scenarioById('landlord-two-quotes')!;
    expect(callBrief(s)).toMatch(/Mr Langley[\s\S]*£1,370[\s\S]*2025-05-14[\s\S]*Goal of this call/);
    expect(firstMessage(s, true)).toContain('Am I speaking with Mr Langley?');
  });
});

describe('greetings when we ring someone', () => {
  it('opens every phone call by name, and inbound cases as a call-back about their topic', async () => {
    const { firstMessage, callBrief, scenarioById } = await import('./scenarios.js');
    const engineer = scenarioById('contractor-extra-part')!;
    expect(firstMessage(engineer, true)).toBe(
      "Hello, is that Ashford? This is the maintenance desk at Northbridge Lettings, I'm an AI assistant, returning your call about the dishwasher at Flat 12, 78 Copperfield Walk. How can I help?",
    );
    expect(callBrief(engineer, true)).toMatch(/ringing them back/);
    expect(firstMessage(scenarioById('routine-repair')!, true)).toContain('is that Priya Shah?');
    expect(firstMessage(scenarioById('contractor-window-unbooked')!, true)).toContain('Am I speaking with Oscar Turner?');
  });
});

describe('admin pages', () => {
  it('ship scripts that parse (a syntax error silently kills every button)', async () => {
    const { adminHomePage, adminCallPage } = await import('./http/adminPages.js');
    const { scenarios, testerCard, buildCallLog } = await import('./scenarios.js');
    const tester = { id: 't1', name: "O'Brien", token: 'tok', daily_cap: 5, revoked: false, created_at: new Date().toISOString(), phone: '+447700900123', scenario_id: 'contractor-extra-part' };
    const pages = [
      adminHomePage([tester], [], 'https://x.test', scenarios.map(testerCard), true, '+16813346993'),
      adminCallPage({ conversation_id: 'c1', tester_id: null, scenario_id: 'routine-repair', brain: 'native', status: 'graded', started_at: new Date().toISOString(), ended_at: null, duration_secs: 30, passed: true, grade: [], flags: [], transcript: [], analysis: null }, buildCallLog([]), scenarios[0]),
    ];
    for (const html of pages) {
      const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];
      expect(() => new Function(script)).not.toThrow();
    }
  });
});
