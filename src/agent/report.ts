import type { Decision } from './caseAgent.js';
import type { LoadedCase } from './cases.js';
import type { CriticResult } from './critic/critic.js';
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
    return `# ${title(c)}: ANSWER

**Decision:** escalated (system fallback)

The agent did not produce a decision${error ? ` (error: ${error})` : ''}. The case is handed to a human with everything below.

## Actions taken
${actionTable(ledger)}
`;
  }
  const escalations = ledger.filter((e) => e.tool === 'escalate_to_human');
  const status = (id?: string) => {
    const e = id ? ledger.find((x) => x.id === id) : undefined;
    return !id ? '—' : !e ? `${id} (not in ledger)` : `${id} ${e.status === 'verified' ? '✅' : e.status === 'failed' ? '❌' : '⚠️'}`;
  };
  const list = (xs: string[], none = '_None._') => xs.map((x) => `- ${x}`).join('\n') || none;
  return `# ${title(c)}: ANSWER

**Decision:** ${d.outcome} · **Severity:** ${d.severity}

${d.summary}

## Where the case stands
${d.case_state}

## Next action${d.next_actions.length === 1 ? '' : 's'}
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
${d.next_actions.map((a, i) => `| ${i + 1} | ${a.type} | ${cell(a.action)} | ${cell(a.recipient)} | ${a.channel} | ${status(a.ledger_id)} |`).join('\n')}

## Messages sent (verbatim)
${messages(ledger)}

## Escalation
${
  escalations.length
    ? escalations
        .map((e) => {
          const a = e.args as Record<string, any>;
          return `- **${a.priority} → ${a.team}** (${e.status}): ${a.reason}\n  - Known: ${a.known}\n  - Missing: ${a.missing}\n  - Options: ${(a.options ?? []).join('; ')}\n  - Recommendation: ${a.recommendation}${a.deadline ? `\n  - Deadline: ${a.deadline}` : ''}`;
        })
        .join('\n')
    : '_None: no decision here needs a human._'
}

## What this does not establish
${list(d.boundaries)}

## Remaining work
${list(d.remaining_work)}

## Missing or unavailable information
${list(d.missing_info)}

## Conflicts between sources
${list(d.conflicts, '_None identified._')}

## Answers to the case questions
${d.answers.map((a, i) => `**${i + 1}. ${a.question}**\n\n${a.answer}`).join('\n\n') || '_No explicit questions._'}

## Actions taken (from the verified action ledger)
${actionTable(ledger)}

## Failed or unverified actions
${d.failed_actions.map((f) => `- ${f.ledger_id}: ${f.handling}`).join('\n') || '_None._'}
`;
}

/** The case title as the organisers wrote it, e.g. "Case 003: Checkout Cleaning Estimate and Invoice". */
const title = (c: LoadedCase) => c.brief.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? `Case ${c.id}`;

const MESSAGE_TOOLS = ['send_message', 'request_information', 'request_landlord_approval'];

/** Every outgoing communication exactly as sent, so the drafted wording can be judged, not just the intent. */
function messages(ledger: LedgerEntry[]) {
  const sent = ledger.filter((e) => MESSAGE_TOOLS.includes(e.tool));
  if (!sent.length) return '_None._';
  return sent
    .map((e) => {
      const a = e.args as Record<string, any>;
      const to = a.recipient_name ? `${a.recipient_name} (${a.recipient_role}) via ${a.channel}${a.contact ? `, ${a.contact}` : ''}` : `${a.landlord ?? 'landlord'} (landlord)`;
      const body = a.body ?? (a.questions ? `${(a.questions as string[]).map((q) => `- ${q}`).join('\n')}\n\nWhy: ${a.why}` : `${a.decision_needed}${a.amount_gbp ? ` (£${a.amount_gbp})` : ''}\n\nOptions: ${(a.options ?? []).join('; ')}`);
      const quoted = String(body).split('\n').map((l) => `> ${l}`).join('\n');
      return `**${e.id} · ${e.tool} → ${to}** (${e.status})\n\n${quoted}`;
    })
    .join('\n\n');
}

/** One factual line on the pre-submit review, plus any findings the revision left unchanged. */
export function criticLine(r: CriticResult) {
  if (r.status === 'skipped') return `- Pre-submit critic: skipped (${r.reason === 'low_time' ? 'less than 60 s of the case time left' : r.reason}).`;
  if (r.status === 'error') return `- Pre-submit critic: unavailable (${r.reason}); decision submitted without it.`;
  const kept = r.kept.length;
  const revision = !kept ? '' : r.unaddressed === undefined ? ', no resubmission after revision' : ` (${kept - r.unaddressed.length} addressed in revision)`;
  return `- Pre-submit critic (${r.model}, ${Math.round(r.ms / 1000)} s): ${r.items.length} items checked, ${kept} finding${kept === 1 ? '' : 's'} with evidence${revision}, ${r.dropped.length} dropped without evidence.${(r.unaddressed ?? []).map((u) => `\n  - Not changed after revision: ${u}`).join('')}`;
}

/** Everything the agent was given, from the loaded case only. */
function received(c: LoadedCase) {
  const publicFormat = c.totalEvents !== undefined;
  const lines = [
    publicFormat
      ? `- Case details from \`index.md\`, with the task and questions (${c.brief.length} chars)`
      : c.brief === '(no case brief provided)'
        ? '- Case brief: none provided'
        : `- Case brief (${c.brief.length} chars)`,
  ];
  if (c.cutoff !== undefined && c.totalEvents !== undefined) {
    const withheld = c.cutoff < c.totalEvents ? ` (events ${c.cutoff + 1}–${c.totalEvents} withheld)` : ' (the full history)';
    lines.push(`- Cut point: history events 1–${c.cutoff} of ${c.totalEvents}${withheld}`);
  }
  lines.push(...c.inputs.map((i) => `- \`${i.name}\` (${c.media?.some((m) => m.name === i.name) ? 'sent to the model natively' : `${i.content.length} chars`})`));
  if (c.missingAttachments) lines.push(`- Referenced in the history but not provided: ${c.missingAttachments.map((a) => `\`${a}\``).join(', ') || 'none'}`);
  return lines.join('\n');
}

export function renderReasoning(
  c: LoadedCase,
  d: Decision | undefined,
  ledger: LedgerEntry[],
  messages: any[],
  usage: Usage,
  error?: string,
  checks?: { screen?: Screen; gateLog?: (GateResult & { tool: string; attempt: number })[]; policyLog?: { tool: string; reason: string }[]; chaos?: Record<string, unknown>; critic?: CriticResult },
) {
  // Parallel calls return in completion order, so results are placed by toolCallId, not by arrival.
  const callIds = new Set(messages.filter((m) => m.role === 'assistant').flatMap((m) => (m.content ?? []).filter((b: any) => b.type === 'toolCall').map((b: any) => b.id)));
  const resultLine = (m: any, orphan = false) => {
    const t = (m.content ?? []).map((b: any) => b.text ?? '').join(' ');
    return `   - ${m.isError ? '⚠️ ' : ''}\`${m.toolName ?? 'tool'}\` result${orphan ? ' (no matching call in the trace)' : ''}: ${short(t, 400)}`;
  };
  const steps: string[] = [];
  let n = 0;
  for (const m of messages) {
    if (m.role === 'assistant') {
      for (const b of m.content ?? []) {
        if (b.type === 'text' && b.text.trim()) steps.push(`${++n}. **Agent:** ${b.text.trim()}`);
        if (b.type === 'toolCall') {
          steps.push(`${++n}. **Tool call** \`${b.name}\` ${short(b.arguments, 400)}`);
          steps.push(...messages.filter((r) => r.role === 'toolResult' && r.toolCallId === b.id).map((r) => resultLine(r)));
        }
      }
    } else if (m.role === 'toolResult' && !callIds.has(m.toolCallId)) {
      steps.push(resultLine(m, true));
    }
  }
  return `# Case ${c.id}: REASONING

## What the system received
${received(c)}

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
}${checks?.critic ? `## Checks performed\n${criticLine(checks.critic)}\n\n` : ''}## Conflicts between sources
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
- Raw event trace: \`trace.jsonl\`
`;
}
