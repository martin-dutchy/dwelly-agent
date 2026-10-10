import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from '../caseAgent.js';
import type { GuardContext } from '../harness/contracts.js';
import { parseHarnessFlags } from '../harness/flags.js';
import { createOpsToolset } from '../opsTools.js';
import { RULES, prohibitedContent } from './prohibited.js';
import { brief, bundle, ctx } from './testing.js';

const plain = ctx({ bundle: bundle({ 'inputs/email.eml': 'Tenant reports a dripping tap.' }) });
const claim = ctx({ bundle: bundle({ 'inputs/letter.eml': 'LETTER OF CLAIM under the pre-action protocol for personal injury.' }), brief: brief({ tags: ['legal_claim'] }) });
const send = (body: string, c: GuardContext = plain, role = 'tenant') => prohibitedContent.check({ tool: 'send_message', args: { recipient_name: 'Sam', recipient_role: role, channel: 'email', contact: 'x', body } }, c);

const cases: { rule: string; c?: GuardContext; blocked: string[]; allowed: string[] }[] = [
  {
    rule: 'prohibited.eviction_threat',
    blocked: ['If the rent is not paid by Friday you will be evicted.', 'The landlord is going to change the locks next week.', 'We are serving you a Section 21 notice today.', 'You must vacate the flat by the end of the month.'],
    allowed: [
      'We cannot evict you without a court order, and the landlord will not change the locks.',
      'Section 21 no-fault notices were abolished on 1 May 2026.',
      'Please leave the property now and call the gas emergency line on 0800 111 999.',
    ],
  },
  {
    rule: 'prohibited.entry_without_notice',
    blocked: ['The contractor will attend on Tuesday whether you are home or not.', 'We will use our spare key to let the plumber in tomorrow.', 'Our surveyor will enter the flat without notice to inspect the damp.'],
    allowed: [
      "We will give you at least 24 hours' written notice before anyone visits.",
      'The engineer can only come in if you are home, or we can use the agency key with your permission.',
      'If you are not home, please let us know and we will rebook.',
    ],
  },
  {
    rule: 'prohibited.withhold_rent',
    blocked: ['You can withhold your rent until the boiler is fixed.', "Don't pay your rent until the landlord sorts the mould."],
    allowed: ['Please keep paying your rent as normal while we arrange the repair.', 'You should not withhold rent; we will chase the landlord for you.', 'Do not pay rent into any new account from that email.'],
  },
  {
    rule: 'prohibited.liability_admission',
    c: claim,
    blocked: ['We accept full liability for the fall on the stairs.', 'The landlord is at fault for the broken handrail.', 'We will pay compensation for your injuries.', 'We are offering £500 in compensation to settle this.'],
    allowed: [
      'We do not accept liability and have passed your letter to the landlord and their insurer.',
      'We acknowledge receipt of your letter of claim and will respond within the pre-action protocol timescale.',
      'Any question of liability is for the landlord and their insurers to decide.',
    ],
  },
  {
    rule: 'prohibited.deposit_promise',
    blocked: ["We'll deduct the cleaning cost from your deposit.", 'Your deposit will be reduced to cover the carpet.', 'The cost of the repair will come out of your deposit.'],
    allowed: [
      'Any deductions from the deposit will be agreed with you or decided by the deposit scheme.',
      'Your deposit is protected with mydeposits.',
      'We cannot say yet whether anything will be deducted from the deposit.',
    ],
  },
  {
    rule: 'prohibited.bank_details_change',
    blocked: ["We've updated your bank details as requested.", 'Your payment details have been changed to the new account.', 'We will transfer this month’s rent to the new account.'],
    allowed: ['We never change bank details by email or phone.', 'We will keep paying the account we already hold on file.', 'Please call the number you have on file for us to confirm any change to your bank details.'],
  },
];

describe('prohibited content', () => {
  it('has a test for every rule', () => {
    expect(cases.map((c) => c.rule).sort()).toEqual(RULES.map((r) => r.id).sort());
  });

  for (const { rule, c, blocked, allowed } of cases) {
    it(`${rule}: blocks the unlawful sentence and passes 3 lawful ones on the same subject`, () => {
      for (const s of blocked) expect(send(s, c), s).toMatchObject({ rule });
      expect(allowed).toHaveLength(3);
      for (const s of allowed) expect(send(s, c), s).toBeUndefined();
    });
  }

  it('gives the sentence and the lawful route in the reason', () => {
    expect(send('Hi Sam. You can withhold your rent until it is fixed. Thanks.')!.reason).toMatch(/"You can withhold your rent until it is fixed\." — it tells the tenant to withhold rent.*keep paying/);
  });

  it('allows emergency entry and entry to a void property', () => {
    expect(send('There is water pouring through the ceiling, so the plumber will let himself in to stop the leak whether you are home or not.')).toBeUndefined();
    expect(send('The contractor will attend whether you are home or not.', ctx({ brief: brief({ tags: ['gas'] }) }))).toBeUndefined();
    expect(send('The contractor will attend whether you are home or not.', ctx({}, { properties: [{ address: 'x', tenanted: false }] }))).toBeUndefined();
  });

  it('blocks inside the agent loop only with guardsV2 on, logging the rule id', async () => {
    const decision = { case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [], outcome: 'action_taken', severity: 'routine', summary: 's', answers: [], actions_claimed: [], failed_actions: [], conflicts: [], assumptions: [] };
    const run = async (flags: string) => {
      const faux = fauxProvider();
      const models = createModels();
      models.setProvider(faux.provider);
      const message = { recipient_name: 'Sam', recipient_role: 'tenant', channel: 'email', contact: 'sam@example.test', body: 'You can withhold your rent until the boiler is fixed.' };
      faux.setResponses([fauxAssistantMessage([fauxToolCall('send_message', message)]), fauxAssistantMessage([fauxToolCall('submit_decision', decision)])]);
      return runCase({ caseId: 'g', prompt: 'case', systemPrompt: 's', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset: createOpsToolset([]), harness: { flags: parseHarnessFlags(flags), bundle: plain.bundle } });
    };
    const on = await run('guardsV2');
    expect(on.ledger).toHaveLength(0);
    expect(on.harnessLog.guardBlocks).toMatchObject([{ tool: 'send_message', rule: 'prohibited.withhold_rent' }]);
    const off = await run('');
    expect(off.ledger.map((e) => [e.tool, e.status])).toEqual([['send_message', 'verified']]);
    expect(off.harnessLog.guardBlocks).toEqual([]);
  });

  it('checks liability only on a legal claim, and every message tool', () => {
    expect(send('We accept full liability for the leak.')).toBeUndefined();
    expect(prohibitedContent.check({ tool: 'request_landlord_approval', args: { landlord: 'L', decision_needed: 'We will use our spare key to let the plumber in tomorrow', options: [] } }, plain)).toMatchObject({ rule: 'prohibited.entry_without_notice' });
    expect(prohibitedContent.check({ tool: 'request_information', args: { recipient_name: 'Sam', recipient_role: 'tenant', questions: ['Can you confirm a time?'], why: 'You must vacate the flat by Friday.' } }, plain)).toMatchObject({ rule: 'prohibited.eviction_threat' });
  });
});
