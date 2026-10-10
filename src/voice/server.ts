// Voice gateway: ElevenLabs webhook tools (native brain), the Custom LLM endpoint (pi brain) and
// post-call webhooks all land here. `pnpm voice:serve`.
// Plain node:http so the batch runner gains no dependencies. Expose it with `ngrok http $PORT`.
import 'dotenv/config';
import { timingSafeEqual } from 'node:crypto';
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { recordCall, verifySignature } from './elevenlabs/postCall.js';
import { claude, streamFn } from '../agent/models.js';
import { type ChatRequest, createPiBrain } from './pi/brain.js';
import { resetDb } from '../core/store.js';
import { grade, publicScenarios, readCallLog } from './scenarios.js';
import { handleVoiceToolCall } from './toolCall.js';

let piBrain: ReturnType<typeof createPiBrain> | undefined;
const brain = () => (piBrain ??= createPiBrain(claude(process.env.VOICE_PI_MODEL || 'claude-haiku-4-5'), streamFn));

/** OpenAI chat-completions SSE, the format ElevenLabs Custom LLM expects. */
async function chatCompletions(req: IncomingMessage, res: ServerResponse, body: ChatRequest) {
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

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let s = '';
    req.on('data', (c) => (s += c)).on('end', () => resolve(s)).on('error', reject);
  });

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { 'content-type': 'application/json' }).end(JSON.stringify(body));
};

/** The test console is for whoever runs the server, never for the tunnel (ngrok adds x-forwarded-for). */
const isLocal = (req: IncomingMessage) =>
  !req.headers['x-forwarded-for'] && ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress ?? '');

const consoleHtml = fileURLToPath(new URL('./console/index.html', import.meta.url));

async function consoleApi(route: string, url: URL, req: IncomingMessage, res: ServerResponse, env: NodeJS.ProcessEnv) {
  if (route === 'scenarios') return send(res, 200, publicScenarios());
  if (route === 'status')
    return send(res, 200, {
      brain: env.VOICE_BRAIN === 'pi' ? 'pi' : 'native',
      agentId: !!env.ELEVENLABS_AGENT_ID,
      publicBaseUrl: env.PUBLIC_BASE_URL ?? '',
      webhookSecret: !!env.ELEVENLABS_WEBHOOK_SECRET,
    });
  if (route === 'token') {
    // WebRTC conversation token, minted server-side so the API key never reaches the browser.
    const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${env.ELEVENLABS_AGENT_ID}`, { headers: { 'xi-api-key': env.ELEVENLABS_API_KEY || env.ELEVEN_API_KEY || '' } });
    return r.ok ? send(res, 200, await r.json()) : send(res, 502, { error: `ElevenLabs token: ${r.status} ${(await r.text()).slice(0, 300)}` });
  }
  if (route === 'signed-url') {
    // Text-only sessions run over WebSocket, which needs a signed URL rather than a WebRTC token.
    const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${env.ELEVENLABS_AGENT_ID}`, { headers: { 'xi-api-key': env.ELEVENLABS_API_KEY || env.ELEVEN_API_KEY || '' } });
    return r.ok ? send(res, 200, await r.json()) : send(res, 502, { error: `ElevenLabs signed URL: ${r.status} ${(await r.text()).slice(0, 300)}` });
  }
  if (route === 'reset' && req.method === 'POST') return (resetDb(), send(res, 200, { ok: true }));
  if (route.startsWith('calls/')) return send(res, 200, readCallLog(decodeURIComponent(route.slice(6))));
  if (route === 'grade') return send(res, 200, grade(url.searchParams.get('scenario') ?? '', url.searchParams.get('conversation') ?? ''));
  return send(res, 404, { ok: false });
}

const sameSecret = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export function createVoiceServer(env = process.env) {
  return createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://local');
    try {
      if (req.method === 'GET' && url.pathname === '/voice/health') return send(res, 200, { ok: true });

      if (url.pathname === '/voice/console' || url.pathname.startsWith('/voice/api/')) {
        if (!isLocal(req)) return send(res, 403, { ok: false });
        if (url.pathname === '/voice/console') return void res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(readFileSync(consoleHtml));
        return await consoleApi(url.pathname.slice('/voice/api/'.length), url, req, res, env);
      }

      if (req.method === 'POST' && /^(\/v1)?\/chat\/completions$/.test(url.pathname)) {
        if (!env.VOICE_TOOL_SECRET || !sameSecret(req.headers.authorization ?? '', `Bearer ${env.VOICE_TOOL_SECRET}`)) return send(res, 401, { ok: false });
        return await chatCompletions(req, res, JSON.parse(await readBody(req)));
      }

      const tool = url.pathname.match(/^\/voice\/tools\/([a-z_]+)$/)?.[1];
      if (req.method === 'POST' && tool) {
        if (!env.VOICE_TOOL_SECRET || !sameSecret(req.headers.authorization ?? '', `Bearer ${env.VOICE_TOOL_SECRET}`)) return send(res, 401, { ok: false });
        const raw = await readBody(req);
        const body = raw ? JSON.parse(raw) : {};
        return send(res, 200, await handleVoiceToolCall(tool, body));
      }

      if (req.method === 'POST' && url.pathname === '/voice/webhooks/elevenlabs') {
        const raw = await readBody(req);
        const secret = env.ELEVENLABS_WEBHOOK_SECRET;
        if (!secret || !verifySignature(raw, req.headers['elevenlabs-signature'] as string | undefined, secret)) return send(res, 401, { ok: false });
        const event = JSON.parse(raw);
        // Answer fast (ElevenLabs disables webhooks that keep failing), then do the work.
        send(res, 200, { ok: true });
        if (event.type === 'post_call_transcription') {
          const { dir, flags } = recordCall(event);
          console.log(`[voice] call ${event.data.conversation_id} -> ${dir}${flags.length ? ` (${flags.length} flags)` : ''}`);
        }
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
  createVoiceServer().listen(port, () => console.log(`[voice] listening on :${port}. Test console: http://localhost:${port}/voice/console`));
}
