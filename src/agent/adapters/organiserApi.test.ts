import { type IncomingMessage, type Server, type ServerResponse, createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ToolContext } from '../../core/tools.js';
import { runCase } from '../caseAgent.js';
import { createOpsToolset } from '../opsTools.js';
import { resetTrip, toolsetLine, withOrganiserApi, withToolsetLine } from './organiserApi.js';
import { readOrganiserEnv } from './toolMap.js';

type Seen = { method: string; url: string; auth?: string; body: any };
let server: Server;
let seen: Seen[];
let reply: (req: Seen, res: ServerResponse) => void;

beforeEach(async () => {
  resetTrip();
  seen = [];
  reply = (_req, res) => res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: true, id: 'ORG-1' }));
  server = createServer((req: IncomingMessage, res) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      const s = { method: req.method!, url: req.url!, auth: req.headers.authorization, body: raw ? JSON.parse(raw) : undefined };
      seen.push(s);
      reply(s, res);
    });
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
});
afterEach(async () => {
  server.closeAllConnections();
  await new Promise((r) => server.close(r));
});

const url = () => `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
const ctx: ToolContext = { conversationId: 'case-T', channel: 'text' };
const msg = { recipient_name: 'Sam Lee', recipient_role: 'tenant', channel: 'email', contact: 'sam@example.test', body: 'Engineer booked for Tuesday.' };
const sentMessages = (ts: { state: { records: { tool: string }[] } }) => ts.state.records.filter((r) => r.tool === 'send_message').length;
const cfgWith = (env: Record<string, string> = {}) => readOrganiserEnv({ ORGANISER_API_URL: url(), ...env }, () => {});

describe('organiser API adapter', () => {
  it('off by default: no URL returns the mock itself', () => {
    const mock = createOpsToolset();
    const a = withOrganiserApi(mock, readOrganiserEnv({}), 'T');
    expect(a.toolset).toBe(mock);
    expect(toolsetLine(a.report())).toBe('Toolset: local mock environment (no organiser API configured).');
  });

  it('mapped write: renamed args and bearer key reach the server, the mock mirrors it, verify cites the organiser', async () => {
    const mock = createOpsToolset();
    const { toolset, report } = withOrganiserApi(mock, cfgWith({ ORGANISER_API_KEY: 'sk-test-123', ORGANISER_TOOL_MAP: '{"send_message":{"args":{"body":"text"}}}' }), 'T');
    const result = await toolset.execute('send_message', msg, ctx);
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatchObject({ method: 'POST', url: '/tools/send_message', auth: 'Bearer sk-test-123', body: { text: msg.body } });
    expect(sentMessages(mock)).toBe(1);
    const v = toolset.verify('send_message', msg, result, ctx);
    expect(v.status).toBe('verified');
    expect(v.evidence).toMatch(/^organiser API accepted \(HTTP 200, id ORG-1\)/);
    expect(report()).toMatchObject({ mode: 'organiser', sent: { writes: 1, reads: 0 } });
  });

  it('trips on first failure: that call and every later one run on the mock, in this and later cases', async () => {
    reply = (_req, res) => res.writeHead(500).end('boom');
    const cfg = cfgWith();
    const first = withOrganiserApi(createOpsToolset(), cfg, '016');
    const r1 = await first.toolset.execute('send_message', msg, ctx);
    expect(r1.ok).toBe(true);
    await first.toolset.execute('send_message', msg, ctx);
    expect(seen).toHaveLength(1);
    expect(first.report().tripped).toMatchObject({ caseId: '016', call: 1, tool: 'send_message', reason: 'HTTP 500' });
    expect(toolsetLine(first.report())).toBe(
      `Toolset: organiser API at ${new URL(url()).host} failed on call 1 (send_message: HTTP 500); this and all later calls ran on the local mock environment.`,
    );
    const later = withOrganiserApi(createOpsToolset(), cfg, '017');
    await later.toolset.execute('send_message', msg, ctx);
    expect(seen).toHaveLength(1);
    expect(toolsetLine(later.report())).toBe('Toolset: local mock environment (organiser API disabled after a failure in case 016: HTTP 500).');
  });

  it('business refusal: a 200 with ok:false is a failed tool result, not a trip, and the mock is untouched', async () => {
    reply = (_req, res) => res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: false, error: 'unknown ticket' }));
    const mock = createOpsToolset();
    const { toolset, report } = withOrganiserApi(mock, cfgWith(), 'T');
    const r = await toolset.execute('send_message', msg, ctx);
    expect(r).toMatchObject({ ok: false, error: 'unknown ticket' });
    expect(sentMessages(mock)).toBe(0);
    expect(report().tripped).toBeUndefined();
  });

  it('a refused write is never read back as verified, even when the mirror already matches', async () => {
    reply = (_req, res) => res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: false, error: 'already sent' }));
    const mock = createOpsToolset();
    await mock.execute('send_message', msg, ctx);
    expect(mock.verify('send_message', msg, undefined, ctx).status).toBe('verified');
    const { toolset } = withOrganiserApi(mock, cfgWith(), 'T');
    await toolset.execute('send_message', msg, ctx);
    expect(toolset.verify('send_message', msg, undefined, ctx)).toMatchObject({ status: 'not_applied', evidence: expect.stringContaining('refused') });
  });

  it('unmapped tools never reach the server and are listed as local only', async () => {
    const { toolset, report } = withOrganiserApi(createOpsToolset(), cfgWith(), 'T');
    await toolset.execute('log_call', { party: 'tenant', summary: 'x' }, ctx);
    expect(seen).toHaveLength(0);
    expect(report().localOnly).toEqual(['log_call']);
  });

  it('a server that never answers trips with a timeout', async () => {
    reply = () => {};
    const cfg = { ...cfgWith()!, timeoutMs: 200 };
    const { toolset, report } = withOrganiserApi(createOpsToolset(), cfg, 'T');
    const r = await toolset.execute('send_message', msg, ctx);
    expect(r.ok).toBe(true);
    expect(report().tripped?.reason).toMatch(/timeout/);
  });

  it('key never written: report, REASONING line and error reasons hold no key', async () => {
    reply = (_req, res) => res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: false, error: 'bad key sk-test-123' }));
    const { toolset, report } = withOrganiserApi(createOpsToolset(), cfgWith({ ORGANISER_API_KEY: 'sk-test-123' }), 'T');
    const r = await toolset.execute('send_message', msg, ctx);
    const out = JSON.stringify(r) + JSON.stringify(report()) + toolsetLine(report());
    expect(out).not.toContain('sk-test-123');
  });

  it('reasoning line goes right under the title', () => {
    expect(withToolsetLine('# Case 1: REASONING\n\n## What the system received\n', 'Toolset: x.')).toBe('# Case 1: REASONING\n\nToolset: x.\n\n## What the system received\n');
  });

  it('runCase: a send_message through the adapter is verified and the decision accepted', async () => {
    const faux = fauxProvider();
    const models = createModels();
    models.setProvider(faux.provider);
    const { toolset } = withOrganiserApi(createOpsToolset(), cfgWith(), 'T');
    const decision = {
      case_state: 'open', next_actions: [{ type: 'REPLY_TO_TENANT', action: 'Told the tenant', recipient: 'Sam Lee, tenant', channel: 'email', ledger_id: 'A1' }], boundaries: [], remaining_work: [], missing_info: [], outcome: 'action_taken', severity: 'routine',
      summary: 'Told the tenant.', answers: [], actions_claimed: [{ ledger_id: 'A1', description: 'message' }], failed_actions: [], conflicts: [], assumptions: [],
    };
    faux.setResponses([fauxAssistantMessage([fauxToolCall('send_message', msg)]), fauxAssistantMessage([fauxToolCall('submit_decision', decision)])]);
    const run = await runCase({ caseId: 'T', prompt: 'Tell the tenant', systemPrompt: 'test', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset });
    expect(seen.map((s) => s.url)).toEqual(['/tools/send_message']);
    expect(run.ledger).toMatchObject([{ id: 'A1', tool: 'send_message', status: 'verified' }]);
    expect(run.decision?.outcome).toBe('action_taken');
  });
});
