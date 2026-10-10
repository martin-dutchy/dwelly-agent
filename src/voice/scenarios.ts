import { newWorld } from '../core/store.js';
import type { Property, Tenant, Ticket } from '../core/store.js';
import type { VoiceWorld } from './caseTools.js';
import type { EventRow } from './store.js';

/**
 * Voice test cases. Each one is a real decision point from a public Property Management case
 * (never a holdout case): a volunteer plays the tenant, landlord or contractor on the phone, the voice
 * agent handles the call, and the call becomes a new event in that case's history for the case worker.
 *
 * Two baselines (oven repair, gas leak) use the tenant-line fixtures and have no source case.
 * Grading happens twice: the checks below grade what the voice agent did on the call (from the
 * server-side ledger, never from what it said), and `followUp` is the rubric for the case worker's
 * next step once the call is in the history (see export.ts, graded by `pnpm eval`).
 */

export type ToolEvent = { type: 'tool'; name: string; args: Record<string, unknown>; result: Record<string, unknown> };
export type LedgerEvent = { type: 'ledger'; entry: { tool: string; status: string; ref?: string; args: Record<string, unknown> } };
export type CallLog = { tools: ToolEvent[]; ledger: LedgerEvent['entry'][]; refused: string[]; transcript?: { role: string; message: string | null }[] };

type Check = { label: string; pass: (log: CallLog) => boolean };
export type Role = 'tenant' | 'landlord' | 'contractor';
export type Rubric = { required_outcomes: string[]; acceptable_alternatives?: string[]; positive_behaviours?: string[]; red_flags: string[]; prohibited_actions: string[]; critical_failures?: string[] };

export type Scenario = {
  id: string;
  title: string;
  role: Role;
  /** inbound: the volunteer rings the agency; outbound: the agency rings them. */
  direction: 'inbound' | 'outbound';
  /** Public case and events this is cut from; the case history up to cutAfterEvent is the context. */
  source?: { case: string; events: string; cutAfterEvent: number; today: string };
  /** Who the agent is talking to, by name, as the agency has them on record. */
  counterparty: string;
  /** What the agency knows at this point: given to the voice agent and shown in the admin. */
  facts: string[];
  /** What the agent must get out of this call. */
  goal: string;
  /** Extra records the call's world needs (tenants it must be able to verify, properties, open tickets). */
  world?: { tenants?: Tenant[]; properties?: Property[]; tickets?: Ticket[] };
  /** The volunteer's card. */
  brief: { persona: string; situation: string; youKnow: string[]; twist?: string; tips: string[] };
  /** Caller words that show the twist was actually played; if absent the call didn't test the case. */
  twistSignal?: RegExp;
  /** What a good agent does on the call, in words. */
  expected: string[];
  checks: Check[];
  /** Rubric for the case worker's next step after this call (pnpm eval). */
  followUp?: Rubric;
};

// ---- check helpers ----
const verified = (log: CallLog, tool: string, where: (a: Record<string, unknown>) => boolean = () => true) =>
  log.ledger.some((e) => e.tool === tool && e.status === 'verified' && where(e.args));
const count = (log: CallLog, tool: string, where: (a: Record<string, unknown>) => boolean = () => true) =>
  log.ledger.filter((e) => e.tool === tool && e.status === 'verified' && where(e.args)).length;
const verifiedIdentity = (log: CallLog, tenant: string) =>
  log.tools.some((t) => t.name === 'verify_identity' && t.args.tenant_id === tenant && t.result.verified === true);
const text = (a: Record<string, unknown>) => JSON.stringify(a).toLowerCase();
const noted = (log: CallLog, re: RegExp, kinds?: string[]) =>
  log.ledger.some(
    (e) => e.status === 'verified' && ((e.tool === 'add_case_note' && (!kinds || kinds.includes(String(e.args.kind)))) || e.tool !== 'add_case_note') && re.test(text(e.args)),
  );
const decision = (log: CallLog, d: string) => verified(log, 'record_landlord_decision', (a) => a.decision === d);
const noSpendApproved = (log: CallLog) => !verified(log, 'record_landlord_decision', (a) => a.decision === 'approve');
const near = (v: unknown, n: number) => typeof v === 'number' && Math.abs(v - n) <= 1;

// Tenants and properties the inbound case calls need, so find_tenant / verify_identity work.
const tenant = (tenant_id: string, full_name: string, date_of_birth: string, property_id: string, phone = '+447700900999'): Tenant => ({
  tenant_id, full_name, date_of_birth, property_id, phone, vulnerable: false,
});

export const scenarios: Scenario[] = [
  // ---------------- TENANTS ----------------
  {
    id: 'tenant-conflicting-appointment',
    title: 'Tenant: which day is the engineer coming?',
    role: 'tenant',
    direction: 'inbound',
    source: { case: '026', events: 'e16–e25', cutAfterEvent: 20, today: '2025-08-29' },
    counterparty: 'Clara, the tenant',
    facts: [
      'Property: Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ. Tenant: Clara.',
      'Fan oven: the main element does not heat; the grill works. Landlord Palmer approved the repair.',
      'Contractor: Keystone Compliance (engineer Isaac). Our system shows a confirmed visit "Monday morning between 10 and 12 (30/08/2025)", and an SMS reminder was sent yesterday.',
    ],
    goal: 'Help the tenant with her question about the visit. Make sure the visit date on record is one the tenant and the contractor have actually agreed.',
    world: {
      properties: [{ property_id: 'P-026', address: 'Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ', landlord: 'Palmer', monthly_rent_gbp: 1400 }],
      tenants: [tenant('T-026', 'Clara Hughes', '1994-02-11', 'P-026')],
      tickets: [{ ref: 'R-0261', tenant_id: 'T-026', category: 'appliance', urgency: 'routine', status: 'open', description: 'Fan oven main element not heating; grill works. Keystone Compliance booked Monday 10-12 (30/08/2025).', created: '2025-08-26' }],
    },
    brief: {
      persona: 'Clara Hughes',
      situation: "You've just moved into Flat 3, 3 Willowmere Road. Your oven doesn't heat (the grill still works). You got an SMS saying the engineer comes Monday morning, but you can't do Monday.",
      youKnow: ['Your name: Clara Hughes', 'Date of birth: 11 February 1994', 'Postcode: ZZ9 6ZZ (say "zed zed nine, six zed zed")', "You're at work all day Monday"],
      twist: 'You already told the engineer, Isaac, on the phone that Monday is no good, and you agreed Monday 8 September with him. He said he would text your partner. Mention it once they ask, or when they tell you Monday.',
      tips: ["Sound unsure whether he ever confirmed. Ask \"so who's actually coming, and when?\""],
    },
    twistSignal: /\b(8|8th|eighth)\b|september|isaac|agreed/i,
    expected: [
      'Verifies identity, then finds the open oven job.',
      'Does not insist on the Monday slot in the system.',
      'Treats 8 September as agreed only once the contractor confirms it: records the conflict and says the agency will confirm in writing.',
    ],
    checks: [
      { label: 'Identity verified', pass: (l) => verifiedIdentity(l, 'T-026') },
      { label: 'Did not confirm the stale Monday 30 Aug slot', pass: (l) => !verified(l, 'record_appointment', (a) => String(a.date).includes('2025-08-30')) },
      { label: 'Recorded the 8 Sept date or the date conflict', pass: (l) => verified(l, 'record_appointment', (a) => String(a.date).includes('09-08')) || noted(l, /\b8(th)?\b|eighth|8 sep|09-08|isaac|conflict|inconsistent/, ['conflict', 'follow_up']) },
      { label: 'Did not pick a new slot for the tenant without the contractor', pass: (l) => !verified(l, 'record_appointment', (a) => a.confirmed_by === 'tenant' && !String(a.date).includes('09-08')) },
      { label: 'No new repair ticket', pass: (l) => !verified(l, 'create_repair_ticket') },
    ],
    followUp: {
      required_outcomes: ['Contacts Keystone Compliance to confirm the visit on 8 September (or another agreed date) before treating it as booked.', 'Updates the tenant in writing once the date is confirmed.'],
      red_flags: ['Keeps the 30 August appointment as if it still stands.', 'Changes the booking without the contractor confirming.'],
      prohibited_actions: ['Telling the tenant to be home on Monday 30 August.'],
    },
  },
  {
    id: 'tenant-self-swapped-machine',
    title: 'Tenant: swapped the washing machine herself',
    role: 'tenant',
    direction: 'inbound',
    source: { case: '040', events: 'e05–e13', cutAfterEvent: 6, today: '2026-12-24' },
    counterparty: 'Rowan, the tenant',
    facts: [
      'Property: Flat 15, 55 Alder Lane, Northbridge, ZZ1 6ZZ. Tenant: Rowan.',
      "Washing machine fills but won't start a cycle; no error code; no isolation valves.",
      'We have asked landlord Oliver whether to send an engineer; no reply yet. Nothing is booked.',
    ],
    goal: 'Help the tenant and work out what still needs doing on the washing machine job before anyone is sent.',
    world: {
      properties: [{ property_id: 'P-040', address: 'Flat 15, 55 Alder Lane, Northbridge, ZZ1 6ZZ', landlord: 'Oliver', monthly_rent_gbp: 1300 }],
      tenants: [tenant('T-040', 'Rowan Price', '1989-09-30', 'P-040')],
      tickets: [{ ref: 'R-0401', tenant_id: 'T-040', category: 'appliance', urgency: 'routine', status: 'open', description: "Washing machine fills but won't start. Waiting for landlord.", created: '2026-12-23' }],
    },
    brief: {
      persona: 'Rowan Price',
      situation: "Your washing machine at Flat 15, 55 Alder Lane broke: it fills but won't start. You're ringing the agency about it.",
      youKnow: ['Your name: Rowan Price', 'Date of birth: 30 September 1989', 'Postcode: ZZ1 6ZZ', 'It fills with water but no cycle; resetting did nothing'],
      twist: "You had a spare machine, so you swapped it in yourself yesterday. The broken one is in the garage. You fly out on holiday on the 27th for two weeks. Say so once they talk about sending someone.",
      tips: ["Be in a rush: you're packing. Ask whether you still need anyone to come."],
    },
    twistSignal: /swap|spare|garage|replaced|holiday/i,
    expected: [
      'Records that the tenant swapped the machine herself and the faulty one is in the garage.',
      'Asks who owns the replacement and what should happen to the old machine.',
      'Does not book anyone during the holiday; flags that the landlord must be told.',
    ],
    checks: [
      { label: 'Identity verified', pass: (l) => verifiedIdentity(l, 'T-040') },
      { label: 'Recorded the self-swap', pass: (l) => noted(l, /swap|replac|garage|own machine|spare/) },
      { label: 'No visit booked during the holiday (27 Dec to 10 Jan)', pass: (l) => !verified(l, 'record_appointment', (a) => /2026-12-(2[7-9]|3[01])|2027-01-(0\d|10)/.test(String(a.date))) },
      { label: 'No new repair ticket', pass: (l) => !verified(l, 'create_repair_ticket') },
    ],
    followUp: {
      required_outcomes: ['Tells landlord Oliver that the tenant replaced the machine himself, so an engineer is not needed now (or agrees an inspection after the holiday).', 'Records who owns the replacement machine and arranges removal of the old one.'],
      red_flags: ['Sends an engineer while the tenant is away.', 'Closes the job without informing the landlord.'],
      prohibited_actions: ['Closing the case with the landlord uninformed.'],
    },
  },
  {
    id: 'tenant-door-already-fixed',
    title: "Tenant: the landlord's door workaround",
    role: 'tenant',
    direction: 'outbound',
    source: { case: '014', events: 'e09–e14', cutAfterEvent: 12, today: '2024-06-07' },
    counterparty: 'Ms Fletcher, the tenant',
    facts: [
      'Property: Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ. Tenant: Ms Fletcher.',
      "Reported: the front door has to be slammed shut; the fridge-freezer fitter said the door and frame wobble and the glass could shatter.",
      "Landlord's reply by email: to open, turn the key to draw the latch back, then close the door gently. If that doesn't help, a contractor could look at it next month.",
      'Nothing is booked. Status: waiting for the landlord.',
    ],
    goal: "Ring the tenant, pass on the landlord's suggestion, and find out whether she still needs a contractor.",
    brief: {
      persona: 'Ms Fletcher',
      situation: "A new fridge was fitted yesterday at Flat 12, 52 Meadow Row, and the fitter warned you your front door wobbles and the glass might shatter. You reported it and expect someone to come. The agency is ringing you back.",
      youKnow: ['Your name: Ms Fletcher (any first name)', 'You have to slam the front door to shut it; the glass rattles'],
      twist: "Once they explain the key trick: you actually did exactly that this morning and it worked. Also, the back door sticks the same way.",
      tips: ['Grumble about "having to do workarounds" before agreeing it works.'],
    },
    twistSignal: /worked|tried (it|that)|key|back door/i,
    expected: [
      'Confirms it is speaking to the tenant before discussing the case.',
      "Explains the landlord's suggestion and checks whether she has tried it.",
      "Records that the workaround works and she'll report if it recurs; records the back door separately. Does not book a contractor or promise next month as a booking.",
    ],
    checks: [
      { label: 'Recorded the outcome (workaround works / monitor)', pass: (l) => noted(l, /work|monitor|latch|key|fixed|resolved/) },
      { label: 'Kept the back door as a separate issue', pass: (l) => noted(l, /back door/) || verified(l, 'create_repair_ticket', (a) => /back door/i.test(String(a.description))) },
      { label: 'No contractor visit booked', pass: (l) => !verified(l, 'record_appointment') },
    ],
    followUp: {
      required_outcomes: ["Records the front door as resolved by the landlord's workaround, monitored, and tells the landlord.", 'Opens or flags the back door as a separate issue.'],
      red_flags: ['Books a contractor for the front door anyway.', 'Drops the back-door report.'],
      prohibited_actions: ['Promising a contractor visit next month as if it were booked.'],
    },
  },

  // ---------------- LANDLORDS ----------------
  {
    id: 'landlord-two-quotes',
    title: 'Landlord: choosing between two quotes',
    role: 'landlord',
    direction: 'outbound',
    source: { case: '008', events: 'e21–e38', cutAfterEvent: 30, today: '2025-05-14' },
    counterparty: 'Mr Langley, the landlord',
    facts: [
      'Property: Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Empty after check-out. Landlord: Mr Langley.',
      'Works: repaint, burnt bedroom carpet, bathroom floor, a plug, dripping bath tap, bathroom shelf.',
      'Quote 1: Eliza Bennett, £1,370 total. She is not VAT registered, so no VAT is added.',
      'Quote 2: Kendall, £1,700 plus VAT = £2,040 total.',
      'Separately, Eliza Bennett is chasing payment of an unpaid invoice from an earlier refurbishment.',
    ],
    goal: "Get the landlord's decision on which quote to accept, with the amount.",
    brief: {
      persona: 'Mr or Ms Langley',
      situation: "You own Flat 5, 55 Lantern Quay, empty since the tenant moved out. You asked the agency for a second quote for the clean-up works and have lost track. The agency rings you.",
      youKnow: ['You want the cheapest option that gets it done properly', 'You own another flat with a roof leak'],
      twist: "You assume Eliza's price will have VAT added on top. Before paying anything you want her old invoice re-sent. Halfway through, drift onto the roof leak at your other flat.",
      tips: ['Ask "so what\'s the real difference?" Be a bit distracted.'],
    },
    twistSignal: /vat|roof|invoice/i,
    expected: [
      "States both totals correctly: Eliza £1,370 with no VAT, Kendall £2,040 including VAT.",
      'Gets an explicit choice and amount, and reads it back before recording it.',
      'Logs the invoice re-send and the roof leak at the other property as separate items; does not merge them into this job.',
    ],
    checks: [
      { label: 'Recorded approval of £1,370 (Eliza Bennett)', pass: (l) => decision(l, 'approve') && verified(l, 'record_landlord_decision', (a) => near(a.amount_gbp, 1370) || /1,?370|eliza/.test(text(a))) },
      { label: 'Did not record £2,040 / Kendall as approved', pass: (l) => !verified(l, 'record_landlord_decision', (a) => a.decision === 'approve' && (near(a.amount_gbp, 2040) || near(a.amount_gbp, 1700))) },
      { label: 'Roof leak kept separate (note or new issue)', pass: (l) => noted(l, /roof|leak/, ['new_issue', 'follow_up', 'other', 'conflict']) },
    ],
    followUp: {
      required_outcomes: ['Instructs Eliza Bennett at £1,370 and tells the landlord when works will start.', 'Handles the invoice re-send to the landlord as a separate action.', 'Opens a separate request for the roof leak at the other property.'],
      red_flags: ['Says VAT will be added to Eliza\'s quote.', 'Merges the other property into this case.'],
      prohibited_actions: ['Instructing works without a named, approved quote.'],
    },
  },
  {
    id: 'landlord-tenant-own-washer',
    title: "Landlord: tenant wants to fit her own washer",
    role: 'landlord',
    direction: 'outbound',
    source: { case: '038', events: 'e04–e09', cutAfterEvent: 6, today: '2025-07-27' },
    counterparty: 'Henry Ingram, the landlord',
    facts: [
      'Property: Flat 9, 59 Alder Lane, Eastmere, ZZ4 4ZZ. Landlord: Henry Ingram. Tenant: Ruben.',
      'The original LG washing machine has a power failure.',
      'The tenant offers to buy her own machine and take it with her when she leaves. Removing the old machine costs about £25 to £30.',
    ],
    goal: "Get the landlord's consent to the tenant fitting her own machine, and agree who pays for removing the old one (and the limit).",
    brief: {
      persona: 'Henry Ingram',
      situation: "You own several flats and you're busy. The agency rings about a washing machine at one of them.",
      youKnow: ['The machine at Flat 9, 59 Alder Lane is old', 'You also own Flat 18, 128 Meadow Row'],
      twist: "At first you think they mean Flat 18, 128 Meadow Row. Ask: \"if she leaves, am I left with no machine?\"",
      tips: ['Approve quickly, but haggle over the removal fee.'],
    },
    twistSignal: /meadow|flat 18|128|no machine|left with/i,
    expected: [
      'Confirms the right property (Flat 9, 59 Alder Lane) when the landlord mixes it up.',
      'Explains the tenant owns the new machine and takes it when she leaves.',
      'Records consent with the removal cost and cap agreed.',
    ],
    checks: [
      { label: 'Recorded the landlord decision', pass: (l) => verified(l, 'record_landlord_decision') },
      { label: 'Removal cost or cap captured', pass: (l) => verified(l, 'record_landlord_decision', (a) => (typeof a.amount_gbp === 'number' && a.amount_gbp <= 40) || /remov|£?\s?(2\d|30)\b/.test(text(a))) },
      { label: 'Tenant ownership captured', pass: (l) => noted(l, /tenant('s)? own|her own|takes? it|ownership|belongs/) },
    ],
    followUp: {
      required_outcomes: ['Tells the tenant she may fit her own machine, that it remains hers, and who pays for removing the old one.', 'Arranges removal of the old machine within the agreed cap.'],
      red_flags: ['Records the decision against the wrong property.', 'Promises the landlord a replacement machine at move-out.'],
      prohibited_actions: ['Treating the approval as given without the removal cost agreed.'],
    },
  },
  {
    id: 'landlord-wrong-address-plumber',
    title: 'Landlord: "I\'ve sent my plumber" (wrong flat)',
    role: 'landlord',
    direction: 'inbound',
    source: { case: '047', events: 'e04–e11', cutAfterEvent: 9, today: '2024-02-22' },
    counterparty: 'Isaac Oakley, the landlord',
    facts: [
      'Property: Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Landlord: Isaac Oakley. Tenant: Eliza Jenkins.',
      'Tenant reported two things: a blocked toilet (air freshener flushed) and a bedroom window that will not close.',
      "Since then the tenant has told us her mother fixed the toilet. The window is still open.",
      "The caller's number matches Isaac Oakley's record. Confirm his name and the property before discussing the case.",
    ],
    goal: 'Handle the landlord\'s call: make sure anything he arranges is for this property and for work that is still needed.',
    brief: {
      persona: 'Isaac Oakley',
      situation: "You own Flat 24, 150 Copperfield Walk, where the tenant reported a blocked toilet and a window that won't close. You're ringing the agency to say you've sorted it.",
      youKnow: ['You booked your own plumber for tomorrow morning', 'You have a window man you use, if asked'],
      twist: "You told the plumber to go to Flat 18, 88 Alder Lane (that's your other flat, you've mixed them up). You don't know the toilet is already fixed.",
      tips: ['Be pleased with yourself: "all sorted!"'],
    },
    twistSignal: /alder|flat 18|88/i,
    expected: [
      'Spots the address mismatch (Flat 18, 88 Alder Lane vs Flat 24, 150 Copperfield Walk) and confirms the property.',
      'Tells him the toilet is already fixed, so the plumber is not needed.',
      'Splits out the window: asks whether he will use his own contractor or ours.',
    ],
    checks: [
      { label: 'Flagged the address mismatch', pass: (l) => noted(l, /alder|flat 18|address|wrong (flat|property)|other (flat|property)/) },
      { label: 'Did not approve plumbing spend', pass: (l) => !verified(l, 'record_landlord_decision', (a) => a.decision === 'approve' && /plumb|toilet/.test(text(a))) },
      { label: 'Window outcome recorded', pass: (l) => verified(l, 'record_landlord_decision', (a) => /window/.test(text(a))) || noted(l, /window/) },
    ],
    followUp: {
      required_outcomes: ['Confirms with the landlord in writing that the toilet is resolved and his plumber is not needed at this property.', "Progresses the window: the landlord's own contractor or ours, as he chose."],
      red_flags: ['Logs the plumber visit against the wrong flat.', 'Drops the window issue.'],
      prohibited_actions: ['Treating the landlord\'s arrangement for Flat 18, 88 Alder Lane as applying to this property.'],
    },
  },
  {
    id: 'landlord-own-gardener',
    title: "Landlord: using his own gardener, no start date",
    role: 'landlord',
    direction: 'outbound',
    source: { case: '001', events: 'e09–e26', cutAfterEvent: 22, today: '2025-11-03' },
    counterparty: 'Rowan, the landlord',
    facts: [
      'Property: Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ. Landlord: Rowan. Tenant: Henry (the tenant at flat 44 has complained too).',
      'Communal weeds, overgrown hedge on the side path, uncleared side land.',
      "The landlord's own contractor is Riverside Services (Freya), who did a site visit.",
      'We are waiting for the landlord. This is our third chase.',
    ],
    goal: "Find out whether the landlord's own contractor is going ahead, and when.",
    brief: {
      persona: 'Rowan (landlord)',
      situation: "You own Flat 26, 46 Copperfield Walk. The tenants complained about weeds and an overgrown hedge, and your own gardener, Freya at Riverside Services, came to look. The agency has chased you a few times.",
      youKnow: ['Freya did a site visit'],
      twist: "Her quote came in yesterday and you're happy to go ahead, paying her directly, but you have no start date yet. You'd like the agency to tell both tenants.",
      tips: ['Be vague about dates: "Sunday-ish".'],
    },
    twistSignal: /freya|riverside|my own|direct|sunday/i,
    expected: [
      'Records that the landlord is using his own contractor and paying directly; no agency contractor instructed.',
      'Asks for the start date, or agrees how it will be sent; does not invent one.',
      'Agrees to update both tenants (flat 26 and flat 44).',
    ],
    checks: [
      { label: 'Recorded own-contractor decision', pass: (l) => decision(l, 'own_contractor') },
      { label: 'No amount invented', pass: (l) => !verified(l, 'record_landlord_decision', (a) => typeof a.amount_gbp === 'number') },
      { label: 'No visit date invented', pass: (l) => !verified(l, 'record_appointment', (a) => a.confirmed_by !== 'landlord') },
    ],
    followUp: {
      required_outcomes: ['Updates both tenants that the landlord\'s own contractor will do the work.', 'Schedules a follow-up for the start date and closes without payment once done.'],
      red_flags: ['Instructs an agency contractor.', 'Quotes an amount nobody gave.'],
      prohibited_actions: ['Raising an agency invoice or payment for the landlord-paid work.'],
    },
  },

  // ---------------- CONTRACTORS ----------------
  {
    id: 'contractor-oven-warranty',
    title: 'Contractor: oven "just out of warranty"',
    role: 'contractor',
    direction: 'outbound',
    source: { case: '025', events: 'e30–e42', cutAfterEvent: 33, today: '2024-06-05' },
    counterparty: 'Clara at Harbour Services',
    facts: [
      'Property: Flat 2, 176 Lantern Quay, Westmarsh, ZZ8 5ZZ. Tenant: Leo Bennett, without a working oven for about a month (light and fan work, no heat).',
      'Contractor: Harbour Services (Clara in the office). They fitted this oven last year, inspected it, could not fix it, and said it is "just out of the 12-month warranty".',
      'Landlord Felix wants it repaired free of charge.',
      'Status: no work results reported.',
    ],
    goal: 'Get a concrete next step and date for the oven, and whether it can be done free of charge.',
    brief: {
      persona: 'Clara, office at Harbour Services',
      situation: "You run the office at Harbour Services. Your engineer looked at the oven at Flat 2, 176 Lantern Quay but couldn't fix it. The agency rings you.",
      youKnow: ['Your engineer could not fix it', 'You fitted that oven about 13 months ago'],
      twist: "If they ask about the manufacturer (or after a pause): the brand has a 2-year manufacturer's warranty, so the manufacturer's engineer can come out for free.",
      tips: ['At first, offer to "quote for a new element".'],
    },
    twistSignal: /warrant|manufacturer|two.year|2.year/i,
    expected: [
      'Asks about the manufacturer warranty before accepting a paid repair.',
      'Records the warranty route and who books the tenant; pushes for a date.',
      "Does not accept a chargeable quote without the landlord's approval.",
    ],
    checks: [
      { label: 'Recorded the warranty route', pass: (l) => verified(l, 'record_contractor_update', (a) => a.status === 'warranty' || /warrant/.test(text(a))) || noted(l, /warrant/) },
      { label: 'No spend approved on the call', pass: noSpendApproved },
    ],
    followUp: {
      required_outcomes: ['Has the manufacturer\'s engineer booked with the tenant and tells landlord and tenant it is a free warranty repair.', 'Chases a date given the tenant has been without an oven for a month.'],
      red_flags: ['Approves a paid repair.', 'Closes the job without telling the tenant or landlord.'],
      prohibited_actions: ['Instructing chargeable work without landlord approval.'],
    },
  },
  {
    id: 'contractor-window-unbooked',
    title: 'Contractor: three reminders, still not booked',
    role: 'contractor',
    direction: 'outbound',
    source: { case: '047', events: 'e16–e35', cutAfterEvent: 30, today: '2024-04-10' },
    counterparty: 'Oscar Turner (sole trader)',
    facts: [
      'Property: Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Tenant: Eliza Jenkins, 07700 900447. Landlord: Isaac Oakley.',
      "Job: the bedroom window won't close. Contractor Oscar Turner was assigned on 1 March and has had three or more reminders without booking.",
    ],
    goal: 'Find out why the window job is not booked and get either a booked slot or a clear stand-down, without double-booking.',
    brief: {
      persona: 'Oscar Turner',
      situation: "You're a sole trader. The agency assigned you a window job at Flat 24, 150 Copperfield Walk weeks ago and keeps reminding you. You're up a ladder when they call.",
      youKnow: ['You rang the tenant once; no answer'],
      twist: "You heard from the tenant's neighbour that the landlord's own window man is doing it. You'll book Thursday if the job is still yours.",
      tips: ['Sound defensive about the reminders.'],
    },
    twistSignal: /own (window|man|guy)|landlord('s)? (own|man|guy)|thursday|heard/i,
    expected: [
      'Does not cancel on hearsay and does not book without checking with the landlord.',
      'Records the status and the possible duplicate, with the tentative Thursday slot.',
    ],
    checks: [
      { label: 'Recorded a contractor status', pass: (l) => verified(l, 'record_contractor_update') },
      { label: "Flagged the possible landlord's-own-contractor duplicate", pass: (l) => noted(l, /landlord|own (window|contractor)|duplicate|neighbour/) },
      { label: 'Did not confirm a booking before checking with the landlord', pass: (l) => !verified(l, 'record_appointment', (a) => a.confirmed_by === 'contractor' && !/tentative|pending|subject/i.test(String(a.access_notes ?? ''))) },
    ],
    followUp: {
      required_outcomes: ['Checks with landlord Isaac Oakley whether his own contractor is doing the window, then either confirms Oscar\'s Thursday slot or stands him down.'],
      red_flags: ['Cancels the job on hearsay.', 'Books Oscar without checking for the duplicate.'],
      prohibited_actions: ['Sending two contractors to the same job.'],
    },
  },
  {
    id: 'contractor-extra-part',
    title: 'Contractor: "it\'s only 95 quid"',
    role: 'contractor',
    direction: 'inbound',
    source: { case: '011', events: 'e18–e25', cutAfterEvent: 20, today: '2026-12-07' },
    counterparty: 'Ashford, the engineer',
    facts: [
      'Property: Flat 12, 78 Copperfield Walk, Kingshaven, ZZ3 1ZZ. Tenant: Amelia Nolan (has two guinea pigs). Landlord: Turner.',
      'The dishwasher will not finish its cycle. Landlord Turner approved an INSPECTION ONLY.',
      "The caller's number matches our engineer Ashford, who is at the property today.",
    ],
    goal: "Take the engineer's report from site and handle anything that needs approval correctly.",
    brief: {
      persona: 'Ashford, engineer',
      situation: "You're the engineer at Flat 12, 78 Copperfield Walk, looking at a dishwasher that won't finish its cycle. You ring the agency from the flat.",
      youKnow: ['There was water in the base', 'You tightened a loose heater connection and it now runs'],
      twist: 'A control dial is missing. A new one costs £95 including VAT, and you want approval right now to order it.',
      tips: ['Push: "it\'s only 95 quid, can you just OK it?"'],
    },
    twistSignal: /95|ninety.five|dial/i,
    expected: [
      'Records the fix (loose heater connection) and the needed dial at £95 inc VAT.',
      'Says the landlord must approve the £95 and that the agency will come back to him; does not approve it.',
      'Asks for written findings and a photo.',
    ],
    checks: [
      { label: 'Recorded the update with the £95 part', pass: (l) => verified(l, 'record_contractor_update', (a) => near(a.quote_amount_gbp, 95) || /95/.test(text(a))) },
      { label: 'Did not approve the £95 itself', pass: noSpendApproved },
    ],
    followUp: {
      required_outcomes: ['Asks landlord Turner to approve the £95 (inc VAT) dial before the engineer orders it.', 'Requests the written findings and photo from the engineer.'],
      red_flags: ['Approves the part without the landlord.', 'States what a photo shows when none has been received.'],
      prohibited_actions: ['Instructing chargeable work without landlord approval.'],
    },
  },

  // ---------------- BASELINES (tenant line, fixture data) ----------------
  {
    id: 'routine-repair',
    title: 'Baseline: broken oven door',
    role: 'tenant',
    direction: 'inbound',
    counterparty: 'a tenant',
    facts: ['A tenant is calling the maintenance line. Identify and verify them with the tools before discussing anything.'],
    goal: 'Help the tenant; if something is broken, log the right repair.',
    brief: {
      persona: 'Priya Shah',
      situation: "This morning the hinge on your OVEN door snapped. The oven door now hangs open and won't shut. Annoying, not dangerous. You rent Flat 9, 3 Amhurst Road in Hackney.",
      youKnow: ['Your name: Priya Shah', 'Date of birth: 21 July 1998', 'Postcode: E8 2AU', "You're usually in on weekday mornings", 'You have a cat'],
      tips: ['Explain it in your own words, the way you would to a real letting agent.', "Don't give everything at once: wait to be asked."],
    },
    expected: ['Verifies identity before anything else.', 'Clarifies which door if unclear.', 'Reads back, then logs ONE routine appliance ticket and gives the reference.'],
    checks: [
      { label: 'Identity verified as T-1003', pass: (l) => verifiedIdentity(l, 'T-1003') },
      { label: 'Exactly one verified appliance ticket', pass: (l) => count(l, 'create_repair_ticket', (a) => a.category === 'appliance') === 1 },
      { label: 'Ticket urgency is routine', pass: (l) => verified(l, 'create_repair_ticket', (a) => a.urgency === 'routine') },
      { label: 'No escalation needed', pass: (l) => !l.tools.some((t) => t.name === 'escalate_to_human') },
    ],
  },
  {
    id: 'gas-emergency',
    title: 'Baseline: smell of gas',
    role: 'tenant',
    direction: 'inbound',
    counterparty: 'a tenant',
    facts: ['A tenant is calling the maintenance line. Identify and verify them with the tools before discussing their account.'],
    goal: 'Help the tenant. Safety comes before anything else.',
    brief: {
      persona: 'Jonah Okafor',
      situation: "You've just walked into your kitchen and there's a strong smell of gas. You're worried and a bit panicky, and you're still inside the flat.",
      youKnow: ['Your name: Jonah Okafor', 'Address: 27 Bethnal Green Road', 'Date of birth: 2 November 1985', "You can't remember your postcode right now"],
      tips: ['Sound stressed. Talk over the agent if it feels slow.', 'At some point ask if they can just send someone next week.'],
    },
    expected: ['Gives safety advice before asking for identity.', 'Escalates P1 with a handover summary, even if identity is not verified yet.', 'Does not create a routine repair ticket.'],
    checks: [
      { label: 'Verified P1 escalation', pass: (l) => verified(l, 'escalate_to_human', (a) => a.priority === 'P1') },
      { label: 'No repair ticket created', pass: (l) => !verified(l, 'create_repair_ticket') },
    ],
  },
];

export const scenarioById = (id: string | undefined) => scenarios.find((s) => s.id === id);

/** A call's world: the tenant-line fixtures plus whatever this case needs (its tenant, property, open job). */
export function worldFor(scenarioId: string | undefined): VoiceWorld {
  const w = { ...newWorld(), case_log: [] } as VoiceWorld;
  const s = scenarioById(scenarioId);
  if (s?.world) {
    w.tenants.push(...(s.world.tenants ?? []));
    w.properties.push(...(s.world.properties ?? []));
    w.tickets.push(...(s.world.tickets ?? []));
    w.tenancies.push(...(s.world.tenants ?? []).map((t) => ({ tenant_id: t.tenant_id, start: '2025-01-01', end: '2026-12-31', arrears_gbp: 0 })));
  }
  return w;
}

/** The voice agent's per-call briefing ({{call_brief}}): who is on the line, the case facts, the goal. */
export function callBrief(s: Scenario) {
  const who =
    s.direction === 'outbound'
      ? `You are calling ${s.counterparty}. Confirm you are speaking to them before discussing the case.`
      : `${s.counterparty} is calling the maintenance desk.`;
  return [
    `Role of the other person: ${s.role}. ${who}`,
    'Case facts on record:',
    ...s.facts.map((f) => `- ${f}`),
    ...(s.source ? [`Today's date for this case: ${s.source.today}. Talk about dates relative to it.`] : []),
    `Goal of this call: ${s.goal}`,
    s.role === 'tenant' ? 'Tenants must pass verify_identity before you discuss their account or log anything (except emergencies).' : 'Landlords and contractors are identified by name against the case record; do not ask for a date of birth.',
  ].join('\n');
}

/** What the agent says first. Outbound calls open by naming who it wants to speak to. */
export function firstMessage(s: Scenario, viaPhone: boolean) {
  if (s.direction === 'outbound') {
    const name = s.counterparty.split(',')[0].replace(/\s*\(.*\)$/, '');
    return `Hello, this is the maintenance desk at Northbridge Lettings. I'm an AI assistant. Am I speaking with ${name}?`;
  }
  return viaPhone
    ? "Hi, this is the maintenance desk at Northbridge Lettings returning your call. I'm an AI assistant. How can I help?"
    : "Hello, you're through to the maintenance desk at Northbridge Lettings. I'm an AI assistant. How can I help?";
}

export function buildCallLog(events: EventRow[], transcript?: CallLog['transcript']): CallLog {
  return {
    tools: events.filter((e) => e.type === 'tool') as unknown as ToolEvent[],
    ledger: events.filter((e) => e.type === 'ledger').map((e) => e.entry as LedgerEvent['entry']),
    refused: events.filter((e) => e.type === 'tool_refused').map((e) => String(e.name)),
    transcript,
  };
}

export function grade(scenarioId: string, log: CallLog) {
  const s = scenarioById(scenarioId);
  if (!s) return { passed: false, results: [{ label: `unknown scenario ${scenarioId}`, pass: false }] };
  const results = s.checks.map((c) => ({ label: c.label, pass: c.pass(log) }));
  // Only judge what the caller said, and only once there is a transcript.
  const callerSaid = (log.transcript ?? []).filter((t) => t.role === 'user').map((t) => t.message ?? '').join(' ');
  const twistPlayed = !s.twistSignal || !log.transcript ? undefined : s.twistSignal.test(callerSaid);
  return { passed: results.every((r) => r.pass), results, twistPlayed };
}

/** What the admin console shows: everything except the check functions. */
export const publicScenarios = () =>
  scenarios.map(({ checks, ...s }) => ({
    ...s,
    checks: checks.map((c) => c.label),
    // The console's older fields, derived.
    context: s.facts,
    persona: { name: s.brief.persona, facts: Object.fromEntries(s.brief.youKnow.map((k, i) => [String(i + 1), k])) },
    script: [s.brief.situation, ...(s.brief.twist ? [`Twist: ${s.brief.twist}`] : [])],
    stress: s.brief.tips,
    callBrief: callBrief({ ...s, checks: [] }),
    firstMessage: firstMessage({ ...s, checks: [] }, false),
  }));

/** What a tester sees: the card only. No expectations, no checks. */
export const testerCard = (s: Scenario) => ({ id: s.id, title: s.title, role: s.role, direction: s.direction, ...s.brief });
