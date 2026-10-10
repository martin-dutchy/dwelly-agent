import type { Decision } from './caseAgent.js';
import type { LoadedCase } from './cases.js';
import type { GateResult, Screen } from './jev.js';
import type { LedgerEntry } from './ledger.js';

export type Usage = { input: number; output: number; cost: number; turns: number; durationMs: number };

const cell = (s: unknown) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const short = (v: unknown, n = 160) => {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  return s.length > n ? `${s.slice(0, n)}…` : s;
};

/** Action table rendered from the verified ledger, never from model prose. */
function actionTable(ledger: LedgerEntry[]) {
  if (!ledger.length) return '_No state-changing actions were taken._';
  return [
    '| # | Action | Key arguments | Attempts | Status | Evidence |',
    '|---|---|---|---|---|---|',
    ...ledger.map(
      (e) =>
        `| ${e.id} | \`${e.tool}\` | ${cell(short(e.args, 140))} | ${e.attempts} | ${e.status === 'verified' ? '✅ verified' : e.status === 'failed' ? '❌ failed' : '⚠️ unverified'} | ${cell(e.evidence.at(-1))} |`,
    ),
  ].join('\n');
}

export function renderAnswer(c: LoadedCase, d: Decision | undefined, ledger: LedgerEntry[], error?: string) {
  if (!d) {
    return `# Case ${c.id}: ANSWER

**Outcome:** escalated (system fallback)

The agent did not produce a decision${error ? ` (error: ${error})` : ''}. The case is handed to a human with everything below.

## Actions taken
${actionTable(ledger)}
`;
  }
  const escalations = ledger.filter((e) => e.tool === 'escalate_to_human');
  return `# Case ${c.id}: ANSWER

**Outcome:** ${d.outcome} · **Severity:** ${d.severity}

${d.summary}

## Answers
${d.answers.map((a, i) => `**${i + 1}. ${a.question}**\n\n${a.answer}`).join('\n\n') || '_No explicit questions._'}

## Actions taken (from the verified action ledger)
${actionTable(ledger)}

## Escalations
${
  escalations.length
    ? escalations
        .map((e) => {
          const a = e.args as Record<string, any>;
          return `- **${a.priority} → ${a.team}** (${e.status}): ${a.reason}\n  - Known: ${a.known}\n  - Missing: ${a.missing}\n  - Options: ${(a.options ?? []).join('; ')}\n  - Recommendation: ${a.recommendation}${a.deadline ? `\n  - Deadline: ${a.deadline}` : ''}`;
        })
        .join('\n')
    : '_None._'
}

## Failed or unverified actions
${d.failed_actions.map((f) => `- ${f.ledger_id}: ${f.handling}`).join('\n') || '_None._'}
`;
}

export function renderReasoning(
  c: LoadedCase,
  d: Decision | undefined,
  ledger: LedgerEntry[],
  messages: any[],
  usage: Usage,
  error?: string,
  checks?: { screen?: Screen; gateLog?: (GateResult & { tool: string; attempt: number })[]; policyLog?: { tool: string; reason: string }[]; chaos?: Record<string, unknown> },
) {
  const steps: string[] = [];
  let n = 0;
  for (const m of messages) {
    if (m.role === 'assistant') {
      for (const b of m.content ?? []) {
        if (b.type === 'thinking' && b.thinking.trim()) steps.push(`${++n}. 💭 **Thinking:** ${short(b.thinking.trim().replace(/\n+/g, ' '), 1200)}`);
        if (b.type === 'text' && b.text.trim()) steps.push(`${++n}. **Agent:** ${b.text.trim()}`);
        if (b.type === 'toolCall') steps.push(`${++n}. **Tool call** \`${b.name}\` ${short(b.arguments, 400)}`);
      }
    } else if (m.role === 'toolResult') {
      const t = (m.content ?? []).map((b: any) => b.text ?? '').join(' ').replace(/\n+/g, ' ');
      steps.push(`   - ${m.isError ? '⚠️ ' : ''}Result: ${short(t, 400)}`);
    }
  }
  return `# Case ${c.id}: REASONING

## What the system received
${inputTable(c)}

${
  checks?.screen
    ? `## Pre-screen (Jev classifier)\n${checks.screen.error ? `Unavailable: ${checks.screen.error}` : `- Severity: ${checks.screen.severity} (p=${checks.screen.severityProb.toFixed(2)})\n${Object.entries(checks.screen.flags).map(([k, p]) => `- ${k}: ${p.toFixed(2)}`).join('\n')}`}\n\n`
    : ''
}${
  checks?.gateLog?.length
    ? `## Pre-send message checks (Jev classifier)\n${checks.gateLog.map((g) => `- ${g.tool} attempt ${g.attempt}: ${g.error ? `unavailable (${g.error})` : g.block ? `held: ${g.reasons.join('; ')}` : 'passed'}`).join('\n')}\n\n`
    : ''
}${
  checks?.policyLog?.length ? `## Actions blocked by hard policy rules\n${checks.policyLog.map((p) => `- \`${p.tool}\`: ${p.reason}`).join('\n')}\n\n` : ''
}${
  checks?.chaos && Object.keys(checks.chaos).length ? `## Injected tool failures (robustness test, --chaos)\n\`\`\`json\n${JSON.stringify(checks.chaos)}\n\`\`\`\n\n` : ''
}## Conflicts between sources
${d?.conflicts.map((x) => `- ${x}`).join('\n') || '_None identified._'}

## Assumptions
${d?.assumptions.map((x) => `- ${x}`).join('\n') || '_None._'}

## Action ledger (every state change, read back after execution)
${actionTable(ledger)}

## Trace
${steps.join('\n')}
${error ? `\n**Run error:** ${error}\n` : ''}
## Run
- Model turns: ${usage.turns} · Tokens in/out: ${usage.input}/${usage.output} · Cost: $${usage.cost.toFixed(4)} · Duration: ${(usage.durationMs / 1000).toFixed(1)}s
- Full untruncated transcript (prompts, model thinking, every tool call and result): \`TRANSCRIPT.md\` · Raw timestamped events: \`trace.jsonl\` · Machine-readable result: \`result.json\`
`;
}

const PARSE_LABEL: Record<string, string> = {
  text: 'read as text',
  pdftotext: 'PDF text layer extracted with pdftotext',
  'native-image': 'image sent to the model natively',
  'native-pdf': 'scanned PDF (no text layer) sent to the model natively',
  'too-large': 'too large to attach: model only told it exists',
  derived: 'built by the loader',
};

/** How every case file became model input, and what was deliberately withheld. */
function inputTable(c: LoadedCase) {
  const rows = c.inputs.map((i) => {
    const p = i.parse;
    const how = p ? [PARSE_LABEL[p.method] ?? p.method, p.note, p.truncatedChars ? `**truncated** (${p.truncatedChars} chars dropped)` : ''].filter(Boolean).join('; ') : '';
    return `| \`${cell(i.name)}\` | ${p ? p.bytes.toLocaleString('en-GB') : ''} | ${(p?.chars ?? i.content.length).toLocaleString('en-GB')} | ${cell(how)} |`;
  });
  const cut = c.cutoff !== undefined ? `\nDecision point: after event ${c.cutoff} of ${c.totalEvents} in the case history.\n` : '';
  const withheld = c.withheld?.length ? `\n**Withheld from the agent:**\n${c.withheld.map((w) => `- \`${w.name}\`: ${w.reason}`).join('\n')}\n` : '';
  return `The case brief plus these files, exactly as parsed (full prompt text in \`TRANSCRIPT.md\`).
${cut}
| File | Bytes | Chars parsed | How it was parsed |
|---|---|---|---|
${rows.join('\n')}
${withheld}`;
}

const fence = (s: string, lang = '') => {
  const ticks = '`'.repeat(Math.max(3, ...[...s.matchAll(/`+/g)].map((m) => m[0].length + 1)));
  return `${ticks}${lang}\n${s}\n${ticks}`;
};
const pretty = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v, null, 2));
const clock = (ms?: number) => (ms ? new Date(ms).toISOString().slice(11, 19) : '');

/**
 * Everything the model saw and did, nothing truncated: system prompt, the exact case prompt,
 * then each turn with its (summarised) thinking, text, tool calls and raw tool results.
 */
export function renderTranscript(c: LoadedCase, run: { model: string; thinking: string; systemPrompt: string; messages: any[]; trace: any[]; error?: string }) {
  const out: string[] = [
    `# Case ${c.id}: TRANSCRIPT`,
    '',
    `Model \`${run.model}\` · thinking \`${run.thinking}\` (Claude returns a summary of its thinking, shown as 💭 below).`,
    '',
    '## System prompt',
    fence(run.systemPrompt),
  ];
  let turn = 0;
  for (const m of run.messages) {
    if (m.role === 'user') {
      const blocks = typeof m.content === 'string' ? [{ type: 'text', text: m.content }] : (m.content ?? []);
      out.push('', `## User ${clock(m.timestamp)}`);
      for (const b of blocks) out.push(b.type === 'text' ? fence(b.text) : `_[${b.mimeType ?? b.type} attachment, ${Math.round(((b.data?.length ?? 0) * 3) / 4).toLocaleString('en-GB')} bytes, sent natively]_`);
    } else if (m.role === 'assistant') {
      const u = m.usage ?? {};
      out.push(
        '',
        `## Turn ${++turn} · assistant ${clock(m.timestamp)}`,
        `_stop: ${m.stopReason ?? '?'} · tokens in ${u.input ?? 0} (+${u.cacheRead ?? 0} cached) / out ${u.output ?? 0}${u.reasoning ? ` (thinking ${u.reasoning})` : ''} · $${(u.cost?.total ?? 0).toFixed(4)}${m.errorMessage ? ` · **error:** ${m.errorMessage}` : ''}_`,
      );
      for (const b of m.content ?? []) {
        if (b.type === 'thinking') out.push('', `### 💭 Thinking${b.redacted ? ' (redacted)' : ''}`, b.thinking.trim() ? fence(b.thinking.trim()) : '_(empty: thinking omitted by the API)_');
        else if (b.type === 'text' && b.text.trim()) out.push('', '### Text', b.text.trim());
        else if (b.type === 'toolCall') out.push('', `### 🔧 Tool call \`${b.name}\` (${b.id})`, fence(pretty(b.arguments), 'json'));
      }
    } else if (m.role === 'toolResult') {
      const t = (m.content ?? []).map((b: any) => (b.type === 'text' ? b.text : `[${b.type}]`)).join('\n');
      out.push('', `### ${m.isError ? '⚠️ ' : '↩️ '}Result \`${m.toolName}\` (${m.toolCallId}) ${clock(m.timestamp)}`, fence(t));
    }
  }
  const retries = run.trace.filter((e) => e.type === 'retry');
  if (retries.length) out.push('', '## Provider retries', ...retries.map((r) => `- ${r.ts ?? ''} attempt ${r.attempt} after ${r.delayMs}ms: ${r.error}`));
  if (run.error) out.push('', `## Run error`, run.error);
  return out.join('\n') + '\n';
}
