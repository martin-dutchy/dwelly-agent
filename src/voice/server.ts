// Voice gateway, one process: ElevenLabs webhook tools (native brain), the Custom LLM endpoint (pi brain),
// post-call webhooks, the tester pages (/t/<token>) and the admin (/admin). `pnpm voice:serve`.
// Plain node:http so the batch runner gains no web framework. Deployed to Fly (fly.toml).
import 'dotenv/config';
import { timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { claude, streamFn } from '../agent/models.js';
import { onAudit } from '../core/audit.js';
import { verifySignature } from './elevenlabs/postCall.js';
import { fetchAudio, finalizeCall } from './finalize.js';
import { adminCallPage, adminHomePage } from './http/adminPages.js';
import { type ChatRequest, createPiBrain } from './pi/brain.js';
import { buildCallLog, callBrief, firstMessage, grade, publicScenarios, scenarioById, scenarios, testerCard, worldFor } from './scenarios.js';
import { type VoiceStore, createStore } from './store.js';
import { handleVoiceToolCall, registerScenario, setEventLoader, setWorldSeeder } from './toolCall.js';

type Env = NodeJS.ProcessEnv;

let piBrain: ReturnType<typeof createPiBrain> | undefined;
const brain = () => (piBrain ??= createPiBrain(claude(process.env.VOICE_PI_MODEL || 'claude-haiku-4-5'), streamFn));
const brainName = (env: Env) => (env.VOICE_BRAIN === 'pi' ? 'pi' : 'native');

/** OpenAI chat-completions SSE, the format ElevenLabs Custom LLM expects. */
async function chatCompletions(res: ServerResponse, body: ChatRequest) {
  const id = `chatcmpl-${Date.now()}`;
  const chunk = (delta: Record<string, unknown>, finish: string | null = null) =>
    res.write(`data: ${JSON.stringify({ id, object: 'chat.completion.chunk', created: Math.floor(Date.now() / 1000), model: 'dwelly-pi', choices: [{ index: 0, delta, finish_reason: finish }] })}\n\n`);
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' });
  chunk({ role: 'assistant' });
  // ElevenLabs hangs up on us when the caller barges in: stop thinking and stop spending.
  const abort = new AbortController();
  res.on('close', () => abort.abort());
  let calls = 0;
  const { toolCalls } = await brain()(
    body,
    {
      text: (delta) => chunk({ content: delta }),
      toolCall: (callId, name, args) => chunk({ tool_calls: [{ index: calls++, id: callId, type: 'function', function: { name, arguments: args } }] }),
    },
    abort.signal,
  );
  chunk({}, toolCalls ? 'tool_calls' : 'stop');
  res.end('data: [DONE]\n\n');
}

const MAX_BODY = 1_000_000;
const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let s = '';
    req
      .on('data', (c) => {
        s += c;
        if (s.length > MAX_BODY) req.destroy(new Error('body too large'));
      })
      .on('end', () => resolve(s))
      .on('error', reject);
  });
const readJson = async (req: IncomingMessage) => {
  const raw = await readBody(req);
  return raw ? JSON.parse(raw) : {};
};

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }).end(JSON.stringify(body));
};
const html = (res: ServerResponse, body: string | Buffer) =>
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }).end(body);

const sameSecret = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

const isLocal = (req: IncomingMessage) =>
  !req.headers['x-forwarded-for'] && !req.headers['fly-client-ip'] && ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress ?? '');

/** Admin: HTTP Basic auth with ADMIN_PASSWORD (any username). Without a password, localhost only. */
function isAdmin(req: IncomingMessage, env: Env) {
  if (!env.ADMIN_PASSWORD) return isLocal(req);
  const [scheme, value] = (req.headers.authorization ?? '').split(' ');
  if (scheme !== 'Basic' || !value) return false;
  const password = Buffer.from(value, 'base64').toString().split(':').slice(1).join(':');
  return sameSecret(password, env.ADMIN_PASSWORD);
}

const page = (name: string) => readFileSync(fileURLToPath(new URL(`./console/${name}`, import.meta.url)));

const elevenlabs = async (path: string, env: Env) => {
  const r = await fetch(`https://api.elevenlabs.io${path}`, { headers: { 'xi-api-key': env.ELEVENLABS_API_KEY || env.ELEVEN_API_KEY || '' } });
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json() as Promise<Record<string, string>>;
};
// The number friends will see ringing, for the WhatsApp heads-up. Looked up once.
let callerIdCache: string | undefined;
async function callerId(env: Env) {
  if (callerIdCache || !env.ELEVENLABS_PHONE_NUMBER_ID) return callerIdCache ?? '';
  try {
    callerIdCache = (await elevenlabs(`/v1/convai/phone-numbers/${env.ELEVENLABS_PHONE_NUMBER_ID}`, env)).phone_number;
  } catch {}
  return callerIdCache ?? '';
}
const conversationToken = (env: Env) => elevenlabs(`/v1/convai/conversation/token?agent_id=${env.ELEVENLABS_AGENT_ID}`, env).then((r) => r.token);

// Cost guard. Calls are only registered after they start, so tokens are counted when minted.
const minted = new Map<string, { day: string; n: number }>();
function mint(key: string, cap: number) {
  const day = new Date().toISOString().slice(0, 10);
  const m = minted.get(key)?.day === day ? minted.get(key)! : { day, n: 0 };
  if (m.n >= cap) return false;
  minted.set(key, { day, n: m.n + 1 });
  return true;
}

const E164 = /^\+[1-9]\d{7,14}$/;
/** Normalise "+44 7877 094577" / "07877094577" to E.164; UK numbers assumed without a country code. */
export const toE164 = (raw: unknown) => {
  if (typeof raw !== 'string') return undefined;
  // "+44 (0)7700 900123": drop the trunk zero written after the country code.
  const digits = raw.replace(/\(0\)/g, '').replace(/[^\d+]/g, '');
  const n = digits.startsWith('+') ? digits : digits.startsWith('00') ? `+${digits.slice(2)}` : digits.startsWith('0') ? `+44${digits.slice(1)}` : `+${digits}`;
  return E164.test(n) ? n : undefined;
};

// One call per number at a time: two quick dials race, and the person answers a different case than their card.
const DIAL_GAP_MS = 3 * 60_000;
const lastDial = new Map<string, { at: number; scenarioId: string }>();
export class BusyNumber extends Error {}

/** Ring a number with the agent from our Twilio number, register the call, and grade it when it ends. */
async function placePhoneCall(env: Env, store: VoiceStore, o: { to: string; scenarioId: string; testerId: string | null }) {
  if (!env.ELEVENLABS_PHONE_NUMBER_ID) throw new Error('ELEVENLABS_PHONE_NUMBER_ID is not set');
  const prev = lastDial.get(o.to);
  if (prev && Date.now() - prev.at < DIAL_GAP_MS)
    throw new BusyNumber(`a call to this number (${scenarioById(prev.scenarioId)?.title ?? prev.scenarioId}) started ${Math.round((Date.now() - prev.at) / 1000)}s ago; wait until it has ended`);
  lastDial.set(o.to, { at: Date.now(), scenarioId: o.scenarioId });
  const r = await fetch('https://api.elevenlabs.io/v1/convai/twilio/outbound-call', {
    method: 'POST',
    headers: { 'xi-api-key': env.ELEVENLABS_API_KEY || env.ELEVEN_API_KEY || '', 'content-type': 'application/json' },
    body: JSON.stringify({
      agent_id: env.ELEVENLABS_AGENT_ID,
      agent_phone_number_id: env.ELEVENLABS_PHONE_NUMBER_ID,
      to_number: o.to,
      conversation_initiation_client_data: {
        dynamic_variables: { call_brief: callBrief(scenarioById(o.scenarioId)!, true), scenario_id: o.scenarioId },
        conversation_config_override: { agent: { first_message: firstMessage(scenarioById(o.scenarioId)!, true) } },
      },
    }),
  });
  const out = (await r.json().catch(() => ({}))) as { conversation_id?: string; detail?: unknown };
  if (!r.ok || !out.conversation_id) throw new Error(`ElevenLabs: ${JSON.stringify(out.detail ?? out).slice(0, 300)}`);
  registerScenario(out.conversation_id, o.scenarioId);
  await store.registerCall({ conversationId: out.conversation_id, testerId: o.testerId, scenarioId: o.scenarioId, brain: brainName(env) });
  // Phone calls run longer than browser ones: keep checking for up to 20 minutes.
  void finalizeCall(store, out.conversation_id, { attempts: 120, delayMs: 10_000 });
  return out.conversation_id;
}

const PHONE_DAILY_CAP = 3;
// Twilio dialling is only enabled for UK numbers; others get a browser-call invite instead.
const DIALLABLE = /^\+44/;

/** Public sign-up (/join/<code>): rate-limited per client IP, in memory. */
const joins = new Map<string, number[]>();
function allowJoin(ip: string) {
  const now = Date.now();
  const recent = (joins.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= 10) return false;
  joins.set(ip, [...recent, now]);
  return true;
}

/** The case with the fewest calls and invites so far, so public sign-ups balance the dataset. */
async function leastCoveredScenario(store: VoiceStore) {
  const [calls, testers] = await Promise.all([store.listCalls(1000), store.listTesters()]);
  const load = (id: string) => calls.filter((c) => c.scenario_id === id).length + testers.filter((t) => !t.revoked && t.scenario_id === id).length;
  const pool = scenarios.filter((s) => s.source); // case-grounded scenarios only
  const min = Math.min(...pool.map((s) => load(s.id)));
  const best = pool.filter((s) => load(s.id) === min);
  return best[Math.floor(Math.random() * best.length)];
}

async function joinRoutes(code: string, rest: string, req: IncomingMessage, res: ServerResponse, store: VoiceStore, env: Env) {
  if (!env.PUBLIC_JOIN_CODE || !sameSecret(code, env.PUBLIC_JOIN_CODE)) return html(res, page('closed.html'));
  if (!rest) return html(res, page('join.html'));
  if (rest === 'api' && req.method === 'POST') {
    const ip = String(req.headers['fly-client-ip'] ?? req.socket.remoteAddress ?? '');
    if (!allowJoin(ip)) return send(res, 429, { error: 'Too many sign-ups from here. Try again in an hour.' });
    const { phone, consent } = await readJson(req);
    if (consent !== true) return send(res, 400, { error: 'Please tick the box to agree to the recorded test call.' });
    const number = phone ? toE164(phone) : null;
    if (phone && !number) return send(res, 400, { error: 'That phone number doesn\'t look right. Try the format +44 7700 900123, or leave it blank to use your browser.' });
    const dialable = number && DIALLABLE.test(number) ? number : null;
    // Same number again: hand back that invite (it can only ever ring this number) rather than piling up duplicates.
    if (dialable) {
      const existing = (await store.activeByPhone(dialable))[0];
      if (existing) return send(res, 200, { link: `/t/${existing.token}`, existing: true });
    }
    const s = await leastCoveredScenario(store);
    // No name asked: label public sign-ups by the last digits of their number in the admin.
    const label = dialable ? `Public ·${dialable.slice(-4)}` : `Public · browser ${Math.random().toString(36).slice(2, 6)}`;
    const t = await store.createTester({ name: label, dailyCap: PHONE_DAILY_CAP, phone: dialable, scenarioId: s.id });
    return send(res, 200, { link: `/t/${t.token}`, browserOnly: !dialable, foreign: !!number && !dialable });
  }
  return send(res, 404, { error: 'not found' });
}

/** The scenario this tester has done least, skipping one they asked to swap. */
async function nextScenario(store: VoiceStore, testerId: string, skip?: string) {
  const counts = await store.scenarioCounts(testerId);
  const pool = scenarios.filter((s) => s.id !== skip);
  const least = Math.min(...pool.map((s) => counts[s.id] ?? 0));
  const candidates = pool.filter((s) => (counts[s.id] ?? 0) === least);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

async function testerRoutes(token: string, rest: string, req: IncomingMessage, res: ServerResponse, store: VoiceStore, env: Env) {
  const tester = await store.testerByToken(token);
  if (!tester || tester.revoked) return rest ? send(res, 403, { error: 'This link is no longer active.' }) : html(res, page('closed.html'));
  if (!rest) return html(res, page('tester.html'));

  if (rest === 'api/card' && req.method === 'GET') {
    const url = new URL(req.url ?? '/', 'http://local');
    const fixed = scenarios.find((x) => x.id === tester.scenario_id);
    const s = fixed ?? (await nextScenario(store, tester.id, url.searchParams.get('skip') ?? undefined));
    // Only the last digits, so a forwarded link doesn't reveal the whole number.
    const phone = tester.phone && env.ELEVENLABS_PHONE_NUMBER_ID ? `•••• ${tester.phone.slice(-4)}` : null;
    // Browser calls open the same way as phone calls (the agency "rings back"), so the card is true either way.
    return send(res, 200, { name: tester.name, card: testerCard(s), phone, fixed: !!fixed, agent: { callBrief: callBrief(s, true), firstMessage: firstMessage(s, true) } });
  }
  if (rest === 'api/phone-call' && req.method === 'POST') {
    const { scenarioId } = await readJson(req);
    if (!tester.phone || !env.ELEVENLABS_PHONE_NUMBER_ID) return send(res, 400, { error: 'Phone calls are not set up for this link.' });
    if (!scenarios.some((x) => x.id === scenarioId) || (tester.scenario_id && tester.scenario_id !== scenarioId)) return send(res, 400, { error: 'bad request' });
    const used = await store.callsToday(tester.id);
    // Per number as well as per invite: a public sign-up must never be usable to pester someone else's phone.
    if (used >= tester.daily_cap || !mint(tester.id, tester.daily_cap) || !mint(`phone:${tester.phone}`, PHONE_DAILY_CAP) || !mint('all', Number(env.VOICE_DAILY_CALL_CAP ?? 200)))
      return send(res, 429, { error: "That's the limit for today. Thank you! Try again tomorrow." });
    let conversationId: string;
    try {
      conversationId = await placePhoneCall(env, store, { to: tester.phone, scenarioId, testerId: tester.id });
    } catch (e) {
      console.error('[voice] call-me', e);
      if (e instanceof BusyNumber) return send(res, 429, { error: "We're already calling you: pick up that call, or wait three minutes and try again." });
      return send(res, 502, { error: "Sorry, we couldn't ring your phone just now. Try again in a minute, or use the browser option." });
    }
    return send(res, 200, { ok: true, conversationId });
  }
  if (rest === 'api/start' && req.method === 'POST') {
    const used = await store.callsToday(tester.id);
    if (used >= tester.daily_cap || !mint(tester.id, tester.daily_cap) || !mint('all', Number(env.VOICE_DAILY_CALL_CAP ?? 200)))
      return send(res, 429, { error: "That's the limit for today. Thank you! Try again tomorrow." });
    return send(res, 200, { token: await conversationToken(env) });
  }
  if (rest === 'api/calls' && req.method === 'POST') {
    const { conversationId, scenarioId } = await readJson(req);
    if (typeof conversationId !== 'string' || !scenarios.some((s) => s.id === scenarioId)) return send(res, 400, { error: 'bad request' });
    registerScenario(conversationId, scenarioId);
    await store.registerCall({ conversationId, testerId: tester.id, scenarioId, brain: brainName(env) });
    return send(res, 200, { ok: true });
  }
  const feedbackFor = rest.match(/^api\/calls\/([\w-]+)\/feedback$/)?.[1];
  if (feedbackFor && req.method === 'POST') {
    const call = await store.getCall(feedbackFor);
    if (call?.tester_id !== tester.id) return send(res, 404, { error: 'not found' });
    const { rating, comment } = await readJson(req);
    const r = Number(rating);
    await store.saveFeedback(feedbackFor, { rating: r >= 1 && r <= 5 ? Math.round(r) : null, comment: String(comment ?? '').slice(0, 2000) });
    return send(res, 200, { ok: true });
  }
  const ended = rest.match(/^api\/calls\/([\w-]+)\/end$/)?.[1];
  if (ended && req.method === 'POST') {
    const call = await store.getCall(ended);
    if (call?.tester_id !== tester.id) return send(res, 404, { error: 'not found' });
    void finalizeCall(store, ended);
    return send(res, 200, { ok: true });
  }
  return send(res, 404, { error: 'not found' });
}

async function adminRoutes(path: string, req: IncomingMessage, res: ServerResponse, store: VoiceStore, env: Env) {
  if (path === '/admin' || path === '/admin/')
    return html(res, adminHomePage(await store.listTesters(), await store.listCalls(), publicBase(req, env), scenarios.map(testerCard), !!env.ELEVENLABS_PHONE_NUMBER_ID, await callerId(env)));
  if (path === '/admin/console') return html(res, page('index.html'));
  const callPage = path.match(/^\/admin\/calls\/([\w-]+)$/)?.[1];
  if (callPage) {
    const call = await store.getCall(callPage);
    if (!call) return send(res, 404, { error: 'not found' });
    return html(res, adminCallPage(call, buildCallLog(await store.events(callPage)), scenarios.find((s) => s.id === call.scenario_id)));
  }

  const api = path.slice('/admin/api/'.length);
  if (api === 'testers' && req.method === 'POST') {
    const { name, dailyCap, phone, scenarioId, replace } = await readJson(req);
    if (typeof name !== 'string' || !name.trim()) return send(res, 400, { error: 'name required' });
    const number = phone ? toE164(phone) : null;
    if (phone && !number) return send(res, 400, { error: 'phone must look like +447700900123 or 07700900123' });
    // One active invite per number: duplicates sent people to the wrong case, and a typo rang someone else.
    if (number) {
      const existing = await store.activeByPhone(number);
      const sameName = (t: { name: string }) => t.name.trim().toLowerCase().split(/\s+/)[0] === name.trim().toLowerCase().split(/\s+/)[0];
      const other = existing.find((t) => !sameName(t));
      if (other) return send(res, 409, { error: `${number} already belongs to ${other.name}'s invite. Check the number, or revoke that invite first.` });
      if (existing.length && replace !== true) {
        const cases = existing.map((t) => scenarioById(t.scenario_id ?? undefined)?.title ?? 'rotating cases').join(', ');
        return send(res, 409, { error: `${existing[0].name} already has an active invite (${cases}).`, canReplace: true });
      }
      for (const t of existing) await store.setRevoked(t.id, true);
    }
    const fixed = scenarios.some((x) => x.id === scenarioId) ? (scenarioId as string) : null;
    return send(res, 200, await store.createTester({ name: name.trim().slice(0, 60), dailyCap: Math.max(1, Math.min(50, Number(dailyCap) || 10)), phone: number, scenarioId: fixed }));
  }
  const revoke = api.match(/^testers\/([\w-]+)\/revoke$/)?.[1];
  if (revoke && req.method === 'POST') {
    const { revoked } = await readJson(req);
    await store.setRevoked(revoke, revoked !== false);
    return send(res, 200, { ok: true });
  }
  const audio = api.match(/^calls\/([\w-]+)\/audio$/)?.[1];
  if (audio) {
    const r = await fetchAudio(audio);
    if (!r.ok || !r.body) return send(res, 404, { error: 'no audio yet' });
    res.writeHead(200, { 'content-type': r.headers.get('content-type') ?? 'audio/mpeg' });
    for await (const chunk of r.body) res.write(chunk);
    return res.end();
  }
  if (api === 'phone-call' && req.method === 'POST') {
    const { scenarioId, to } = await readJson(req);
    const s = scenarios.find((x) => x.id === scenarioId);
    const number = toE164(to);
    if (!s || !number) return send(res, 400, { error: 'pick a scenario and a number like +447700900123' });
    if (!env.ELEVENLABS_PHONE_NUMBER_ID) return send(res, 400, { error: 'ELEVENLABS_PHONE_NUMBER_ID is not set' });
    try {
      const conversationId = await placePhoneCall(env, store, { to: number, scenarioId: s.id, testerId: null });
      return send(res, 200, { conversationId, card: testerCard(s), to: number });
    } catch (e) {
      return send(res, 502, { error: `Could not call ${number}: ${(e as Error).message.slice(0, 300)}` });
    }
  }
  const regrade = api.match(/^calls\/([\w-]+)\/regrade$/)?.[1];
  if (regrade && req.method === 'POST') {
    await finalizeCall(store, regrade, { attempts: 1, delayMs: 0 });
    return send(res, 200, { ok: true });
  }

  // The full test console (script, live log, grade), for you and teammates.
  if (api === 'scenarios') return send(res, 200, publicScenarios());
  if (api === 'status')
    return send(res, 200, { brain: brainName(env), agentId: !!env.ELEVENLABS_AGENT_ID, publicBaseUrl: env.PUBLIC_BASE_URL ?? '', database: !!env.DATABASE_URL });
  if (api === 'token') return send(res, 200, { token: await conversationToken(env) });
  if (api === 'signed-url') return send(res, 200, await elevenlabs(`/v1/convai/conversation/get-signed-url?agent_id=${env.ELEVENLABS_AGENT_ID}`, env));
  if (api === 'calls' && req.method === 'POST') {
    const { conversationId, scenarioId } = await readJson(req);
    registerScenario(conversationId, scenarioId);
    await store.registerCall({ conversationId, testerId: null, scenarioId, brain: brainName(env) });
    return send(res, 200, { ok: true });
  }
  const live = api.match(/^calls\/([\w-]+)$/)?.[1];
  if (live) return send(res, 200, buildCallLog(await store.events(live)));
  if (api === 'grade') {
    const url = new URL(req.url ?? '/', 'http://local');
    const id = url.searchParams.get('conversation') ?? '';
    const log = buildCallLog(await store.events(id));
    void finalizeCall(store, id);
    return send(res, 200, { ...grade(url.searchParams.get('scenario') ?? '', log), log });
  }
  return send(res, 404, { error: 'not found' });
}

const publicBase = (req: IncomingMessage, env: Env) => env.PUBLIC_BASE_URL || `http://${req.headers.host}`;

export function createVoiceServer(env: Env = process.env, store: VoiceStore = createStore(env.DATABASE_URL)) {
  // Each call's tools work on a copy of its case: tenant, property, open job.
  setWorldSeeder(worldFor);
  // After a restart, a live call's identity state is rebuilt from the durable event log.
  setEventLoader((id) => store.events(id) as never);
  // Every tool event also goes to the durable event log.
  onAudit((id, e) => void store.appendEvent(id, e as never).catch((err) => console.error('[voice] event', err)));

  return createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://local');
    const path = url.pathname;
    try {
      if (req.method === 'GET' && (path === '/voice/health' || path === '/health')) return send(res, 200, { ok: true });
      if (path === '/' || path === '/favicon.ico') return send(res, 404, { ok: false });

      const join = path.match(/^\/join\/([\w-]{4,64})(?:\/(.*))?$/);
      if (join) return await joinRoutes(join[1], join[2] ?? '', req, res, store, env);

      const tester = path.match(/^\/t\/([\w-]{6,40})(?:\/(.*))?$/);
      if (tester) return await testerRoutes(tester[1], tester[2] ?? '', req, res, store, env);

      if (path === '/admin' || path.startsWith('/admin/')) {
        if (!isAdmin(req, env)) {
          res.writeHead(401, { 'www-authenticate': 'Basic realm="voice admin"' }).end('Admin password required');
          return;
        }
        return await adminRoutes(path, req, res, store, env);
      }

      if (req.method === 'POST' && /^(\/v1)?\/chat\/completions$/.test(path)) {
        if (!env.VOICE_TOOL_SECRET || !sameSecret(req.headers.authorization ?? '', `Bearer ${env.VOICE_TOOL_SECRET}`)) return send(res, 401, { ok: false });
        return await chatCompletions(res, await readJson(req));
      }

      const tool = path.match(/^\/voice\/tools\/([a-z_]+)$/)?.[1];
      if (req.method === 'POST' && tool) {
        if (!env.VOICE_TOOL_SECRET || !sameSecret(req.headers.authorization ?? '', `Bearer ${env.VOICE_TOOL_SECRET}`)) return send(res, 401, { ok: false });
        return send(res, 200, await handleVoiceToolCall(tool, await readJson(req)));
      }

      if (req.method === 'POST' && path === '/voice/webhooks/elevenlabs') {
        const raw = await readBody(req);
        const secret = env.ELEVENLABS_WEBHOOK_SECRET;
        if (!secret || !verifySignature(raw, req.headers['elevenlabs-signature'] as string | undefined, secret)) return send(res, 401, { ok: false });
        const event = JSON.parse(raw);
        // Answer fast (ElevenLabs disables webhooks that keep failing), then do the work.
        send(res, 200, { ok: true });
        if (event.type === 'post_call_transcription') void finalizeCall(store, event.data.conversation_id, { attempts: 3, delayMs: 5_000 });
        return;
      }
      send(res, 404, { ok: false });
    } catch (e) {
      console.error('[voice]', e);
      // A tool must still answer something speakable rather than a timeout.
      if (res.headersSent) res.end();
      else send(res, 200, { ok: false, error: 'server_error', say: 'Our system had a problem. Tell the caller plainly and escalate.' });
    }
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const port = Number(process.env.PORT ?? 3000);
  const store = createStore();
  await store.init();
  // Grading waits in memory, so a restart or deploy would drop it: pick up calls from the last day.
  const unfinished = (await store.listCalls(200)).filter((c) => (c.status === 'live' || c.status === 'ended') && Date.now() - Date.parse(c.started_at) < 86_400_000);
  for (const c of unfinished) void finalizeCall(store, c.conversation_id, { attempts: 120, delayMs: 10_000 });
  if (unfinished.length) console.log(`[voice] resuming grading for ${unfinished.length} call(s)`);
  createVoiceServer(process.env, store).listen(port, () =>
    console.log(`[voice] listening on :${port} (${process.env.DATABASE_URL ? 'postgres' : 'in-memory'} store). Admin: /admin`),
  );
}
