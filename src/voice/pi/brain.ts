import { createHash } from 'node:crypto';
import { Agent, type AgentTool, type StreamFn } from '@earendil-works/pi-agent-core';
import type { Api, AssistantMessage, Model, TSchema } from '@earendil-works/pi-ai';
import { audit } from '../../core/audit.js';
import { tools } from '../../core/tools.js';
import { handleVoiceToolCall } from '../toolCall.js';
import { voiceToolSchema } from '../voiceTools.js';

/**
 * The pi brain behind ElevenLabs "Custom LLM": an OpenAI-compatible chat-completions endpoint.
 * ElevenLabs owns audio, turn-taking and interruptions; we own the reasoning and the tools, which run
 * in-process through the same handler as the native brain's webhooks.
 *
 * ElevenLabs resends the spoken history every turn but never sees our tool calls, so each call keeps one
 * long-lived pi Agent, and the history ElevenLabs sends is only used to learn what the caller actually heard.
 */

type ChatMessage = { role: 'system' | 'user' | 'assistant' | 'tool'; content?: string | { type: string; text?: string }[] | null };
type ChatTool = { type: 'function'; function: { name: string; description?: string; parameters?: unknown } };
export type ChatRequest = { messages: ChatMessage[]; tools?: ChatTool[]; user_id?: string; model?: string };

/** Streams OpenAI-style deltas back to ElevenLabs. */
export type ChatSink = { text: (delta: string) => void; toolCall: (id: string, name: string, args: string) => void };

const textOf = (c: ChatMessage['content']) => (typeof c === 'string' ? c : (c ?? []).map((p) => p.text ?? '').join(''));
const assistantText = (m: AssistantMessage) => m.content.filter((c) => c.type === 'text').map((c) => c.text).join('');
const asSchema = (s: unknown) => s as TSchema;

/**
 * Interrupted turns: ElevenLabs sends back only what the caller heard of everything we said since they
 * last spoke (possibly across several model turns around tool calls). Cut our memory at the same point,
 * keeping tool calls (they did run), so the agent never believes the caller heard the rest.
 */
export function syncInterruption(agent: Agent, heard: string | undefined) {
  if (heard === undefined) return false;
  const msgs = agent.state.messages;
  const lastUser = msgs.findLastIndex((m) => m.role === 'user');
  const spoken = msgs.slice(lastUser + 1).filter((m): m is AssistantMessage => m.role === 'assistant' && assistantText(m) !== '');
  const norm = (t: string) => t.replace(/\s+/g, ' ').trim();
  const full = norm(spoken.map(assistantText).join(' '));
  const cut = norm(heard);
  if (!full || full === cut || cut.length >= full.length || !full.startsWith(cut.slice(0, 20))) return false;
  let budget = cut.length;
  let marked = false;
  for (const m of spoken) {
    const text = norm(assistantText(m));
    const keep = marked ? '' : budget >= text.length ? text : `${text.slice(0, budget).trim()} [the caller interrupted here and did not hear the rest]`;
    if (!marked && budget < text.length) marked = true;
    budget -= text.length + 1;
    const first = m.content.find((c) => c.type === 'text');
    m.content = m.content.filter((c) => c.type !== 'text' || (c === first && keep));
    if (first && keep) first.text = keep;
  }
  return marked;
}

export function conversationIdOf(req: ChatRequest) {
  const system = req.messages.filter((m) => m.role === 'system').map((m) => textOf(m.content)).join('\n');
  const fromPrompt = system.match(/Conversation id: ([\w-]+)/)?.[1];
  if (fromPrompt && !fromPrompt.startsWith('{{')) return fromPrompt;
  if (req.user_id) return `pi-${req.user_id}`;
  // Last resort: the opening of the call is stable for its whole length.
  const opening = req.messages.slice(0, 3).map((m) => `${m.role}:${textOf(m.content)}`).join('|');
  return `pi-${createHash('sha256').update(opening).digest('hex').slice(0, 16)}`;
}

type Session = { agent: Agent; pending: { id: string; name: string; args: string }[]; sink?: ChatSink; spoke: boolean };
const sessions = new Map<string, Session>();

export function createPiBrain(model: Model<Api>, streamFn: StreamFn) {
  function session(conversationId: string, systemPrompt: string): Session {
    const existing = sessions.get(conversationId);
    if (existing) return existing;
    const s: Session = { agent: undefined as unknown as Agent, pending: [], spoke: false };
    const domainTools: AgentTool[] = tools.map((t) => ({
      name: t.name,
      label: t.name,
      description: t.description,
      parameters: asSchema(voiceToolSchema(t)),
      executionMode: t.kind === 'write' ? 'sequential' : 'parallel',
      execute: async (_id, params) => {
        const result = await handleVoiceToolCall(t.name, { ...(params as object), conversation_id: conversationId }, 'voice:elevenlabs');
        return { content: [{ type: 'text', text: JSON.stringify(result) }], details: result, isError: result.ok === false };
      },
    }));
    s.agent = new Agent({
      initialState: { systemPrompt, model, thinkingLevel: 'off', tools: domainTools },
      streamFn,
      sessionId: conversationId,
    });
    // Text from successive model turns (before and after a tool) must not run together in TTS.
    let gap = false;
    s.agent.subscribe((e) => {
      if (e.type === 'message_start' && e.message.role === 'assistant') gap = s.spoke;
      if (e.type === 'message_update' && e.assistantMessageEvent.type === 'text_delta') {
        s.sink?.text(`${gap ? ' ' : ''}${e.assistantMessageEvent.delta}`);
        gap = false;
      }
    });
    sessions.set(conversationId, s);
    return s;
  }

  /** ElevenLabs' own tools (end_call, skip_turn…) are handed back to it as tool_calls, never run here. */
  function platformTools(s: Session, req: ChatRequest): AgentTool[] {
    const ours = new Set(tools.map((t) => t.name));
    return (req.tools ?? [])
      .filter((t) => !ours.has(t.function.name))
      .map((t) => ({
        name: t.function.name,
        label: t.function.name,
        description: t.function.description ?? t.function.name,
        parameters: asSchema(t.function.parameters ?? { type: 'object', properties: {} }),
        executionMode: 'sequential',
        execute: async (id, params) => {
          s.pending.push({ id, name: t.function.name, args: JSON.stringify(params ?? {}) });
          return { content: [{ type: 'text', text: 'Handed to the voice platform.' }], details: {}, terminate: true };
        },
      }));
  }

  return async function respond(req: ChatRequest, sink: ChatSink, signal: AbortSignal) {
    const conversationId = conversationIdOf(req);
    const systemPrompt = req.messages.filter((m) => m.role === 'system').map((m) => textOf(m.content)).join('\n\n');
    const s = session(conversationId, systemPrompt);

    // A new request while the last one still streams means ElevenLabs gave up on it (barge-in).
    if (s.agent.state.isStreaming) {
      s.agent.abort();
      await s.agent.waitForIdle();
    }
    const lastAssistant = req.messages.findLastIndex((m) => m.role === 'assistant');
    const interrupted = syncInterruption(s.agent, lastAssistant >= 0 ? textOf(req.messages[lastAssistant].content) : undefined);
    let said = req.messages
      .slice(lastAssistant + 1)
      .filter((m) => m.role === 'user')
      .map((m) => textOf(m.content))
      .join(' ')
      .trim();
    if (!s.agent.state.messages.some((m) => m.role !== 'system') && lastAssistant >= 0) {
      // First turn we see: give the agent what was already said (e.g. the greeting) as context.
      const before = req.messages.slice(0, lastAssistant + 1).filter((m) => m.role !== 'system');
      said = `(Earlier in this call:\n${before.map((m) => `${m.role === 'user' ? 'caller' : 'you'}: ${textOf(m.content)}`).join('\n')})\n\n${said}`;
    }
    audit(conversationId, { type: 'pi_turn', interrupted, said });

    s.pending = [];
    s.spoke = false;
    s.sink = { ...sink, text: (d) => ((s.spoke = true), sink.text(d)) };
    s.agent.state.tools = [...s.agent.state.tools.filter((t) => tools.some((x) => x.name === t.name)), ...platformTools(s, req)];
    const onAbort = () => s.agent.abort();
    signal.addEventListener('abort', onAbort);
    try {
      await s.agent.prompt(said || '(the caller said nothing audible)');
    } finally {
      signal.removeEventListener('abort', onAbort);
      s.sink = undefined;
    }
    const last = s.agent.state.messages.at(-1) as AssistantMessage | undefined;
    if (last?.role === 'assistant' && last.stopReason === 'error') {
      // No native LLM fallback in Custom LLM mode: drop the failed turn and never leave the caller in silence.
      s.agent.state.messages = s.agent.state.messages.slice(0, -1);
      audit(conversationId, { type: 'pi_error', error: last.errorMessage });
      if (!s.spoke) sink.text("Sorry, I'm having trouble with our system. Could you say that again?");
    }
    for (const p of s.pending) sink.toolCall(p.id, p.name, p.args);
    return { conversationId, toolCalls: s.pending.length };
  };
}
