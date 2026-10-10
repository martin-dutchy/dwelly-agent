import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { afterEach, describe, expect, it } from 'vitest';
import { runCase } from '../caseAgent.js';
import { loadCase } from '../cases.js';
import { COMPLETION_CHECKS } from '../completion/index.js';
import { GUARDS } from '../guards/index.js';
import { fromLoadedCase, ingest, toLoadedCase } from '../ingest/index.js';
import { createOpsToolset } from '../opsTools.js';
import type { FailurePlan } from '../../core/failures.js';
import { completionProblems, firstGuardBlock } from './apply.js';
import type { CompletionCheck, Guard, GuardContext } from './contracts.js';
import { NO_FLAGS, parseHarnessFlags } from './flags.js';

const ctx: GuardContext = { ledger: [], state: { tickets: [], records: [], properties: [] }, flags: NO_FLAGS };
const blockMessages: Guard = { id: 'test.no_messages', tools: ['send_message'], check: () => ({ rule: 'test.no_messages', reason: 'no messages in this test' }) };
const alwaysProblem: CompletionCheck = { id: 'test.always', check: () => [{ check: 'test.always', message: 'always wrong' }] };

describe('guard and completion helpers', () => {
  it('apply a guard only to its tools, never to submit_decision, and survive a throwing guard', () => {
    const throws: Guard = { id: 'throws', tools: '*', check: () => { throw new Error('bug'); } };
    const star: Guard = { id: 'star', tools: '*', check: () => ({ rule: 'star', reason: 'r' }) };
    expect(firstGuardBlock([blockMessages], { tool: 'add_note', args: {} }, ctx)).toBeUndefined();
    expect(firstGuardBlock([throws, blockMessages], { tool: 'send_message', args: {} }, ctx)).toMatchObject({ rule: 'test.no_messages', guard: 'test.no_messages' });
    expect(firstGuardBlock([star], { tool: 'submit_decision', args: {} }, ctx)).toBeUndefined();
  });

  it('cap each completion check at two bounces', () => {
    const counts = new Map<string, number>();
    const runs = [1, 2, 3].map(() => completionProblems([alwaysProblem], {}, ctx, counts));
    expect(runs.map((r) => r.bounce.length)).toEqual([1, 1, 0]);
    expect(runs[2].capped).toHaveLength(1);
  });
});

describe('ingest stub', () => {
  it.each(['cases/practice/05', 'cases/practice/20', 'HackatonPublicCases/Property Management/002'])('round-trips %s to the same LoadedCase', (dir) => {
    const legacy = loadCase(dir);
    expect(toLoadedCase(fromLoadedCase(legacy))).toEqual(legacy);
    const b = ingest(dir);
    expect(b.manifest.filter((m) => m.included).map((m) => m.path)).toEqual(legacy.inputs.map((i) => i.name));
  });
});

const decision = {
  case_state: 'open',
  next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }],
  boundaries: [],
  remaining_work: [],
  missing_info: [],
  outcome: 'action_taken',
  severity: 'routine',
  summary: 's',
  answers: [],
  actions_claimed: [],
  failed_actions: [],
  conflicts: [],
  assumptions: [],
};
const message = { recipient_name: 'Sam', recipient_role: 'tenant', channel: 'email', contact: 'sam@example.com', body: 'Hello' };

async function run(flags: string, failures?: FailurePlan) {
  const faux = fauxProvider();
  const models = createModels();
  models.setProvider(faux.provider);
  faux.setResponses([fauxAssistantMessage([fauxToolCall('send_message', message)]), fauxAssistantMessage([fauxToolCall('submit_decision', decision)]), fauxAssistantMessage([fauxToolCall('submit_decision', decision)])]);
  return runCase({ caseId: 't', prompt: 'case', systemPrompt: 'test', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset: createOpsToolset([]), failures, harness: { flags: parseHarnessFlags(flags) } });
}

describe('runCase harness wiring', () => {
  afterEach(() => {
    GUARDS.length = 0;
    COMPLETION_CHECKS.length = 0;
  });

  it('ignores registered guards and checks while their flags are off', async () => {
    GUARDS.push(blockMessages);
    COMPLETION_CHECKS.push(alwaysProblem);
    const r = await run('');
    expect(r.ledger.map((e) => e.tool)).toEqual(['send_message']);
    expect(r.harnessLog.guardBlocks).toHaveLength(0);
    expect(r.harnessLog.completion).toHaveLength(0);
    expect(r.decision).toBeDefined();
  });

  it('blocks through a v2 guard and bounces a completion problem when on', async () => {
    GUARDS.push(blockMessages);
    COMPLETION_CHECKS.push(alwaysProblem);
    const r = await run('guardsV2,completionV2');
    expect(r.ledger).toHaveLength(0);
    expect(r.policyLog[0].reason).toContain('[test.no_messages]');
    expect(r.harnessLog.guardBlocks).toMatchObject([{ tool: 'send_message', rule: 'test.no_messages' }]);
    expect(r.harnessLog.completion[0]).toMatchObject({ check: 'test.always', capped: false });
  });

  it('shows failure classes to the model only with guardsV2 on', async () => {
    const failures: FailurePlan = { send_message: [{ call: 1, mode: 'error' }] };
    const toolText = (r: Awaited<ReturnType<typeof run>>) => JSON.stringify(r.messages.filter((m) => m.role === 'toolResult'));
    const off = await run('', failures);
    expect(off.ledger[0]).toMatchObject({ status: 'failed' });
    expect(off.ledger[0].failureClass).toBeUndefined();
    expect(toolText(off)).not.toMatch(/failure_class|Failure class/);
    const on = await run('guardsV2', failures);
    expect(on.ledger[0].failureClass).toBeDefined();
    expect(toolText(on)).toMatch(/Failure class: /);
  });
});
