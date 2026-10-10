// Things an agent must never write, whatever the case says. Patterns are narrow on purpose: each must catch the
// unlawful sentence and let through the lawful one about the same subject.
import type { Guard, GuardContext, ToolCall } from '../harness/contracts.js';
import { MESSAGE_TOOLS, caseText, messageText, sentences } from './text.js';

type Pattern = { re: RegExp; negatable?: boolean };
type Rule = { id: string; patterns: Pattern[]; applies?: (call: ToolCall, ctx: GuardContext, text: string) => boolean; unless?: RegExp; reason: string };

const p = (re: RegExp, negatable = true): Pattern => ({ re, negatable });
const NEGATION = /\b(?:not|never|no longer|cannot|can't|can’t|won't|won’t|wouldn't|don't|don’t|do not|does not|doesn't|isn't|aren't|unable to)\b/i;
const EMERGENCY = /\b(?:emergency|gas leak|smell(?:s|ing)? (?:of )?gas|gas smell|carbon monoxide|CO alarm|flood(?:ing)?|leak(?:ing)?|fire|sparking|burning|smoke|escape of water)\b/i;
const SAFETY_TAGS = ['gas', 'co', 'water', 'electrical', 'fire'];

export const RULES: Rule[] = [
  {
    id: 'prohibited.eviction_threat',
    patterns: [
      p(/\b(?:you|tenants?|they) (?:will|shall|are going to|is going to|could|may) be evicted\b/i),
      p(/\bwe (?:will|shall|are going to|can|may) (?:evict|remove) you\b/i),
      p(/\b(?:will|shall|are going to|is going to)\b[^.]{0,30}\bchang(?:e|ing) the locks\b/i),
      p(/\b(?:serv(?:e|ing)|issu(?:e|ing)|giv(?:e|ing))\b[^.]{0,20}\bsection 21\b/i),
      p(/\byou (?:must|have to) (?:vacate|move out)\b/i),
      p(/\bbailiffs? (?:will|are going to|are coming)\b/i),
      p(/\b(?:cut off|disconnect)\b[^.]{0,40}\b(?:unless|until) you pay\b/i),
    ],
    reason:
      'it threatens eviction or self-help outside the legal process (Protection from Eviction Act 1977; Section 21 is abolished). Possession only runs through a Section 8 notice and the court, and that decision belongs to a human: remove the threat, and escalate if possession is being considered.',
  },
  {
    id: 'prohibited.entry_without_notice',
    applies: (_call, ctx, text) => !EMERGENCY.test(text) && !(ctx.brief?.tags ?? []).some((t) => SAFETY_TAGS.includes(t)) && !ctx.state.properties.some((x) => x.tenanted === false),
    patterns: [
      p(/\bwhether (?:or not )?you(?:'re|’re| are) (?:home|in|there|present)\b/i, false),
      p(/\bif you(?:'re|’re| are) not (?:home|in|there|present)\b[^.]{0,40}\b(?:let (?:ourselves|themselves|himself|herself) in|use (?:our|the|a) (?:spare |agency |management |office )?keys?|enter|go in)\b/i, false),
      p(/\b(?:we|the contractor|the engineer|the landlord|they|he|she) (?:will|shall|are going to|is going to|can) (?:let (?:ourselves|themselves|himself|herself) in|use (?:our|the|a) (?:spare |agency |management |office )?keys? to (?:enter|get in|access|let))/i),
      p(/\b(?:enter|access|come in|let (?:ourselves|themselves) in)\b[^.]{0,40}\bwithout (?:prior |any )?(?:notice|warning|your (?:permission|consent))\b/i),
      p(/\b(?:we|the contractor|the engineer|someone) will (?:enter|let (?:ourselves|themselves) in|access (?:the|your) (?:property|flat|house|home))\b[^.]{0,30}\b(?:today|tonight|this (?:morning|afternoon|evening)|in (?:an|one|two|\d+) hours?)\b/i),
    ],
    unless: /\bwith your (?:permission|consent|agreement)\b|\bif you(?:'re|’re| are)? (?:happy|agree|consent)\b|\byou(?:'ve|’ve| have) (?:agreed|consented)\b/i,
    reason:
      "it announces entry to a tenanted home without the tenant's agreement or 24 hours' written notice, for a non-emergency (s11(6) LTA 1985; quiet enjoyment). Ask the tenant for access, give at least 24 hours' written notice, and record a refusal instead of entering.",
  },
  {
    id: 'prohibited.withhold_rent',
    patterns: [
      p(/\b(?:withhold|stop paying|hold back)\s+(?:your |the |some |part of (?:your|the) )?rent\b/i),
      p(/\b(?:don't|don’t|do not) pay (?:your |the |any )?rent\b/i, false),
    ],
    unless: /\b(?:account|bank|details|email|link|scheme)\b/i,
    reason:
      'it tells the tenant to withhold rent, which puts them at risk of arrears and possession. Tell them to keep paying rent as normal while the repair is handled, and escalate if they raise rent or compensation.',
  },
  {
    id: 'prohibited.liability_admission',
    applies: (_call, ctx) => (ctx.brief?.tags ?? []).includes('legal_claim') || /letter of claim|pre-action|letter before (?:claim|action)|personal injury claim/i.test(caseText(ctx)),
    patterns: [
      p(/\bwe (?:fully |hereby )?(?:accept|admit|acknowledge)\b[^.]{0,20}\b(?:liability|responsibility|fault|negligence|we are liable|we were negligent)\b/i),
      p(/\b(?:we|the landlord|the agency|our client) (?:are|is|were|was) (?:fully |entirely )?(?:liable|at fault|negligent|to blame)\b/i),
      p(/\b(?:we|the landlord|the agency) (?:will|would|can|are happy to|agree to|is happy to|shall) (?:pay|offer|provide|cover)\b[^.]{0,30}\b(?:compensation|damages|your (?:costs|losses|claim))\b/i),
      p(/\boffer(?:ing)?\b[^.]{0,20}\b(?:compensation|a goodwill payment|£\s?\d[\d,.]*\s*(?:in|as) (?:compensation|settlement|damages))\b/i),
    ],
    reason:
      "it admits liability or offers compensation on a legal claim. Liability is for the landlord, their insurer and solicitors: acknowledge receipt only, pass the claim on, and escalate to legal.",
  },
  {
    id: 'prohibited.deposit_promise',
    patterns: [
      p(/\b(?:we|the landlord|they|i)(?:\s+(?:will|shall|are going to|is going to|can)|'ll|’ll)\s+(?:deduct|take|keep|withhold|retain|charge)\b[^.]{0,50}\b(?:from|out of|off) (?:your |the |their |his |her )?(?:tenancy )?deposit\b/i),
      p(/\b(?:your |the |their )?deposit (?:will|shall) (?:be )?(?:reduced|deducted|kept|withheld|retained|used to (?:pay|cover))\b/i),
      p(/\b(?:will|shall) (?:come|be taken|be deducted|be recovered) (?:out of|from) (?:your |the |their )?(?:tenancy )?deposit\b/i),
    ],
    reason:
      'it promises a deposit deduction. Deductions are agreed between landlord and tenant or decided by the deposit scheme after check-out: say that any deduction will follow that process, and escalate disputes.',
  },
  {
    id: 'prohibited.bank_details_change',
    patterns: [
      p(/\b(?:we|i)(?:'ve|’ve| have)?\s+(?:now\s+)?(?:updated|changed|amended|switched)\b[^.]{0,20}\b(?:bank|account|payment|payee) details\b/i),
      p(/\b(?:bank|account|payment) details (?:have been|are now|were|will be) (?:updated|changed|amended|switched)\b/i),
      p(/\b(?:pay|send|transfer|remit)\b[^.]{0,40}\b(?:to|into) (?:the |this |our |their |a )?new (?:bank )?account\b/i),
      p(/\bwill (?:update|change|amend) (?:your |the |their )?(?:bank|account|payment) details\b/i),
    ],
    reason:
      'it confirms or acts on a bank detail change. Bank details are never changed on a message or call: keep paying the account on file, verify by calling the number already held, hold the payment and escalate to fraud.',
  },
];

/** The first rule a message breaks, with the sentence that breaks it. */
export function prohibitedIn(text: string, call: ToolCall, ctx: GuardContext): { rule: Rule; sentence: string } | undefined {
  for (const rule of RULES) {
    if (rule.applies && !rule.applies(call, ctx, text)) continue;
    for (const sentence of sentences(text)) {
      if (rule.unless?.test(sentence)) continue;
      for (const { re, negatable } of rule.patterns) {
        const m = sentence.match(re);
        if (!m) continue;
        const at = m.index ?? 0;
        // A negation inside a condition ("if the rent is not paid, you will be evicted") does not negate the threat.
        const before = sentence.slice(Math.max(0, at - 60), at).replace(/\b(?:if|unless)\b[\s\S]*$/i, '');
        if (negatable && NEGATION.test(before + m[0])) continue;
        return { rule, sentence: sentence.trim() };
      }
    }
  }
  return undefined;
}

export const prohibitedContent: Guard = {
  id: 'prohibited.content',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const hit = prohibitedIn(messageText(call), call, ctx);
    return hit && { rule: hit.rule.id, reason: `Not sent: "${hit.sentence.slice(0, 160)}" — ${hit.rule.reason}` };
  },
};
