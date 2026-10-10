// Create or update the ElevenLabs agent and its webhook tools from our code: `pnpm voice:sync`.
// Idempotent: tools are matched by name, the agent by ELEVENLABS_AGENT_ID. Prints the agent id to put in .env.
import 'dotenv/config';
import { voiceTools as tools } from '../toolCall.js';
import { type Brain, agentConfig, webhookTool } from './config.js';

const API = process.env.ELEVENLABS_API_BASE ?? 'https://api.elevenlabs.io';
const key = process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_API_KEY;
const baseUrl = process.env.PUBLIC_BASE_URL;
const toolSecret = process.env.VOICE_TOOL_SECRET;
if (!key || !baseUrl || !toolSecret) {
  console.error('Set ELEVENLABS_API_KEY, PUBLIC_BASE_URL (your tunnel or deploy URL) and VOICE_TOOL_SECRET in .env');
  process.exit(1);
}

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'xi-api-key': key!, 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 2000)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

// Secrets are per target server: a local (ngrok) agent and the production agent must never share one.
const secretSuffix = new URL(baseUrl!).host.replace(/[^a-z0-9]+/gi, '_').toLowerCase();

/** Keep tokens in workspace secrets when the API allows it, else inline (dashboard-visible). */
async function secret(name: string, value: string): Promise<string | { secret_id: string }> {
  try {
    const list = await call<{ secrets?: { secret_id: string; name: string }[] }>('GET', '/v1/convai/secrets');
    const existing = list.secrets?.find((s) => s.name === name);
    if (existing) {
      await call('PATCH', `/v1/convai/secrets/${existing.secret_id}`, { type: 'update', name, value });
      return { secret_id: existing.secret_id };
    }
    const created = await call<{ secret_id: string }>('POST', '/v1/convai/secrets', { type: 'new', name, value });
    return { secret_id: created.secret_id };
  } catch (e) {
    console.warn(`[sync] workspace secret unavailable, sending ${name} inline: ${(e as Error).message.slice(0, 200)}`);
    return value;
  }
}

/**
 * Tools are updated only if they already belong to THIS agent, so syncing a local agent (ngrok URL)
 * can never repoint the production agent's tools, and vice versa.
 */
async function syncWebhookTools(auth: string | { secret_id: string }, agentId: string | undefined) {
  const owned = agentId
    ? ((await call<{ conversation_config: { agent: { prompt: { tool_ids?: string[] } } } }>('GET', `/v1/convai/agents/${agentId}`)).conversation_config.agent.prompt.tool_ids ?? [])
    : [];
  const existing = await call<{ tools?: { id: string; tool_config: { name: string } }[] }>('GET', '/v1/convai/tools');
  const toolIds: string[] = [];
  for (const t of tools) {
    const tool_config = webhookTool(t, baseUrl!, auth);
    const found = existing.tools?.find((x) => x.tool_config.name === t.name && owned.includes(x.id));
    const res = found
      ? await call<{ id: string }>('PATCH', `/v1/convai/tools/${found.id}`, { tool_config })
      : await call<{ id: string }>('POST', '/v1/convai/tools', { tool_config });
    toolIds.push(res.id);
    console.log(`[sync] tool ${t.name} ${found ? 'updated' : 'created'} (${res.id})`);
  }
  return toolIds;
}

async function main() {
  const kind = process.env.VOICE_BRAIN === 'pi' ? 'pi' : 'native';
  const toolAuth = await secret(`dwelly_voice_tool_auth_${secretSuffix}`, `Bearer ${toolSecret}`);
  const brain: Brain =
    kind === 'pi'
      ? // ElevenLabs appends /chat/completions to this URL and sends the key as "Bearer <key>".
        { kind, url: `${baseUrl!.replace(/\/$/, '')}/v1`, apiKey: await secret(`dwelly_voice_llm_key_${secretSuffix}`, toolSecret!) }
      : {
          kind,
          llm: process.env.ELEVENLABS_LLM || 'claude-haiku-4-5',
          toolIds: await syncWebhookTools(toolAuth, process.env.ELEVENLABS_AGENT_ID),
        };

  const config = agentConfig({
    name: process.env.ELEVENLABS_AGENT_NAME || 'Dwelly tenant line',
    brain,
    voiceId: process.env.ELEVENLABS_VOICE_ID || undefined,
    initiationWebhook: { url: `${baseUrl!.replace(/\/$/, '')}/voice/webhooks/initiation`, auth: toolAuth },
  });
  console.log(`[sync] brain: ${kind}`);
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (agentId) {
    await call('PATCH', `/v1/convai/agents/${agentId}`, config);
    console.log(`[sync] agent ${agentId} updated`);
  } else {
    const { agent_id } = await call<{ agent_id: string }>('POST', '/v1/convai/agents/create', config);
    console.log(`[sync] agent created. Add to .env:\nELEVENLABS_AGENT_ID=${agent_id}`);
  }
}

main().catch((e) => {
  console.error(`[sync] failed: ${(e as Error).message}`);
  process.exit(1);
});
