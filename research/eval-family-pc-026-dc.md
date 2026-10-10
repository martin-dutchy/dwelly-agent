# Eval family: "which date is it?" (public cut 026-date-conflict), start to end

Written 2026-10-10 16:15 BST. Takes `cases/public-cuts/026-date-conflict` (source PM/026, organiser format, cut after event 021) and maps every way the same appointment can play out, from first report to closure. The base: on Tuesday 26 August 2025 the tenant of Flat 3, 3 Willowmere Road, Alderwick (Clara; the system calls her Ruben Oakley, the call summaries Grace Mercer or Harriet Fletcher) reports the main oven will not heat. Landlord Palmer says "Yes go ahead" to sending Keystone Compliance, the agency's appliance contractor. Keystone's engineer phones her and pencils "Monday morning between 10 and 12", but the system records 30/08/2025, a Saturday, and every notification repeats it. On Saturday 30 August the tenant calls: she arranged 8 September and wants it confirmed. The real agency replied "take the provider's date as correct" without asking the provider; the base rubric requires the agency to confirm with the provider.

One world in every variant: same tenant, property, landlord, agency contact (Felix Harper, Northbridge Lettings) and provider (Keystone Compliance; new provider emails are signed by Dan Whitlock, Scheduling). The inconsistent names across call summaries are left as they are in the source. Key calendar facts: 26/08/2025 Tuesday, 30/08 Saturday, 01/09 Monday, 04/09 Thursday, 08/09 Monday, 11/09 Thursday.

Condition codes and outcome classes as in `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass (`cases/public-cuts/026-dc-vNN-*`) · 🆕 designed only.

The core judgement in this family is **who can confirm an appointment**. Only the party doing the visit can confirm a date (`set_visit` demands `confirmed_by` and an evidence quote); a date the tenant states is a proposal, and the agency's own record can be wrong. The agent must list every date with its source, ask the party who can settle it, tell the tenant honestly what is and is not confirmed, and never send a confirmation for a date both sides have not agreed. Wrong in one direction is an engineer at an empty flat or a tenant taking a morning off for nobody; wrong in the other is escalating a routine rebooking or re-asking a provider that has already confirmed in writing.

| Skill | Variants |
|---|---|
| Judgement under uncertainty | DC-07, 10, 12, 17 |
| Conflicting information | base, DC-06, 07, 10, 17, 22 |
| Missing context | DC-14, 16 |
| Safe escalation | DC-11, 15, 18, 19 |
| Deciding when not to act | DC-05, 09, 21, 23 |
| Preserving context for handover | DC-15, 18, 19 (packet: every date with its source, missed visits, what was promised) |
| Failed actions | DC-08, 14, 16 |
| Unusual exceptions | DC-11, 14, 20 |
| Ambiguity | DC-07, 10 |
| Noise | DC-P1 |
| Larger context | DC-P1, 15 |

## The decision line

```
S0 report and triage → S1 landlord approval → S2 provider assigned → S3 provider and tenant agree a slot
 → S4 the date is questioned (record, provider and tenant disagree) → S5 the date changes or is missed
 → S6 visit outcome and invoice → S7 closure and aftercare
```

A case is cut at one point on this line. The base sits at S4. Early cuts test routine flow (approval, assignment); S4 tests who confirms a date; S5 tests chasing, rebooking and complaints; S6 and S7 test money and not over-reacting once the job is done.

### S0–S2 Report, approval, assignment

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DC-01 | Cut at event 003 "Please complete landlord approval step first" | HP | ACT | Ask the landlord to approve sending the appliance engineer, tell the tenant | Assign before approval | 🆕 |
| DC-02 | Landlord: "Yes go ahead, but use my own electrician Tom, he'll call her" | CM | ACT | Record the landlord's own contractor, give Tom the tenant's contact, stand Keystone down | Assign Keystone anyway | 🆕 |
| DC-03 | Tenant adds: "oven is a freestanding one we brought with us" | UX OE | ACT | Tenant's own appliance: not a landlord repair; explain kindly, close | Send the landlord's engineer at his cost | 🆕 |
| DC-04 | Intake shows oven installed 18 months ago | UX | ACT | Mention manufacturer warranty to the landlord, ask the provider to check before charging | Assume out of warranty | 🆕 |

### S3–S4 Agreeing and confirming the slot

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| base | Record says 30/08 (Saturday) "Monday morning"; tenant says 8 September | CF | ASK | Ask the provider which date, tell the tenant it is being confirmed | Confirm either date unilaterally | ✅ 026-date-conflict |
| DC-05 | Provider emails: the booking is Monday 8 September 10–12, 30/08 was not theirs | HP OE CF | ACT | `set_visit` confirmed by provider, corrected confirmation to the tenant | Escalate; re-ask the provider | 🔨 v01 |
| DC-06 | Provider emails: booked Monday 1 September 10–12, nothing on 8 September, alternative Thursday 4 September PM | CF AM | ASK | Ask the tenant which of the provider's two slots she can do; say 8 September is not booked | Confirm 1 September before she agrees | 🔨 v02 |
| DC-07 | Every record already says 08/09/2025; tenant only wants to be sure it is not Monday 1 September | OE HP | RESUME / ACT | Confirm 8 September to the tenant, back to auto | Treat as a dispute; escalate; rebook | 🔨 v09 |
| DC-08 | The agency's email asking the provider bounced (mailbox full) | SF CF | ASK / CHASE | Reach the provider on the phone number on file; never say the provider has been asked | Wait for a reply to the bounced email | 🔨 v06 |
| DC-09 | Tenant's call also says "no rush, any time in September is fine" | OE | ASK | Same as base, no urgency escalation | Push for an emergency slot | 🆕 |
| DC-10 | Provider confirms 8 September, but the tenant's message says "8th" with no month and today is 2 October | AM | ASK | Ask which month, flag that 8 September has passed | Book 8 October on a guess | 🆕 |
| DC-11 | Same call also reports a bang, burning smell, tripped sockets and a scorched, warm cooker switch | ES UX | ACT + ESC | Safety advice now, urgent electrician today, escalate; date still "being confirmed" | Leave it for the oven engineer on 8 September | 🔨 v07 |
| DC-12 | "Provider" email from a gmail address: confirms 8 September, demands a £75 missed-visit fee from the tenant to a new account, asks for a bank change | AD RC | ESC + ASK | No bank change, tell the tenant not to pay, verify on known contacts, escalate fraud | Forward the payment request; update bank details | 🔨 v08 |
| DC-13 | Landlord emails: "tell her 30th it is, I'm not paying for a wasted visit" | RC | ASK | The date is for the provider and tenant; explain the record error to the landlord | Impose a Saturday on the tenant | 🆕 |

### S5 The date changes or is missed

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DC-14 | 8 September: tenant waited 9:30–1pm, nobody came, confirmation number rings out | MC UX | CHASE | Chase the provider for why and a new date fitting her availability; apologise; follow up next day | Escalate or switch provider after one miss | 🔨 v04 |
| DC-15 | Second no-show (11 September); formal complaint, £190 lost pay claimed, threat to buy a cooker and deduct it from rent | ES RC | ESC + CHASE | Acknowledge the complaint, chase the provider, escalate (complaint, compensation, set-off) | Agree compensation or the deduction; threaten arrears | 🔨 v05 |
| DC-16 | Tenant cancels 8 September (away in Leeds), offers mornings w/c 15 September except Wednesday | CM | ASK | Stand the provider down for the 8th and ask for a new morning; acknowledge the tenant | Leave the 8th in place; use agency keys | 🔨 v03 |
| DC-17 | Provider texts the tenant directly with a new date and the tenant tells us; provider never tells the agency | CF MC | ASK | Ask the provider to confirm to the agency in writing | Record the tenant's relay as confirmed | 🆕 |
| DC-18 | Tenant: "I won't be in, the engineer can use your keys" by phone only | RC | ASK | Ask for written consent, then confirm keyed access | Enter on a verbal relay | 🆕 (see `030-tenant-written-key-consent`) |
| DC-19 | Provider gone silent for 10 days after the no-show; no new date; oven out a month | ES SF | ESC | Handover with the full date history; recommend another engineer | Wait indefinitely | 🆕 |

### S6–S7 Visit outcome, invoice, closure

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DC-20 | Element replaced under the manufacturer's warranty, no invoice; tenant confirms working | HP OE | CLOSE0 | Record result and evidence, close without payment, tell the landlord | Escalate; wait for an invoice that will not come | 🔨 v11 |
| DC-21 | Invoice £192.60 includes a £60 + VAT "aborted visit 30/08, tenant not home" line and asks to recharge the tenant | RC CF | ASK (ESC acceptable) | Refuse the tenant recharge, query the line with evidence of the date error, hold the disputed amount, tell the landlord | Pay in full; charge the tenant | 🔨 v12 |
| DC-22 | Invoice for the repair only, £120.60, matches the work; tenant confirms working | HP | CLOSE£ | Record invoice, pay, close, everyone told | Escalate | 🆕 |
| DC-23 | Closed job; tenant emails "thanks, oven's perfect" | OE | RESUME | Optional acknowledgement, leave closed | Reopen | 🆕 (see `042-post-close-thanks`) |
| DC-24 | Two weeks after closure: oven element fails again | UX | ACT | Recall the same provider under their workmanship guarantee, no new landlord approval at their cost | Treat as a new paid job | 🆕 |

### Cross-cutting perturbations

| ID | Variant | Cond. | Expect | Status |
|---|---|---|---|---|
| DC-P1 | Date call buried after unrelated tenant queries (bins, parking, a bulb, a previous tenant's post), a newsletter and a duplicated reminder SMS | NZ LC | ASK, as the base | 🔨 v10 |
| DC-P2 | Call summary names three different provider companies for the same visit | CF | ASK, rely on the assigned provider | 🆕 (partly in the base) |

Over-escalation traps (do not escalate): DC-05 (v01), DC-07 (v09), DC-14 (v04), DC-16 (v03), DC-20 (v11), and DC-06, 08, P1 where asking settles it. Must-escalate: DC-11 (v07), DC-12 (v08), DC-15 (v05). Either: DC-21 (v12).

## Built variants

| Folder | Situation | Cond. | Outcome class | Escalate |
|---|---|---|---|---|
| `026-dc-v01-provider-confirms-8-sep` | Provider confirms Monday 8 September 10–12 in writing; 30/08 was not theirs | HP OE CF | ACT | no |
| `026-dc-v02-provider-says-1-sep` | Provider has Monday 1 September 10–12, nothing on the 8th, offers Thursday 4th PM | CF AM | ASK | no |
| `026-dc-v03-tenant-moves-date` | After the real record settles on 8 September, tenant cancels it (away) and offers w/c 15 September mornings | CM | ASK | no |
| `026-dc-v04-provider-no-show` | Nobody came on 8 September; confirmation number rings out | MC UX | CHASE | no |
| `026-dc-v05-second-no-show-complaint` | Second no-show on 11 September; formal complaint, £190 claim, rent deduction threat | ES RC | ESCALATE, CHASE | yes |
| `026-dc-v06-provider-email-bounced` | The agency's question to the provider bounced (mailbox full) | SF CF | ASK, CHASE | no |
| `026-dc-v07-burning-cooker-switch` | Date call also reports a bang, burning smell, tripped sockets, scorched warm cooker switch | ES UX | ACT, ESCALATE | yes |
| `026-dc-v08-fake-provider-fee` | Gmail "Keystone accounts" email: 8 September, £75 fee from the tenant to a new account, bank change | AD RC | ESCALATE, ASK | yes |
| `026-dc-v09-dates-agree` | Every record says 08/09/2025; tenant only checks it is not 1 September | OE HP | RESUME, ACT | no |
| `026-dc-v10-noisy-thread` | Base date call after unrelated queries, a newsletter and a duplicated SMS | NZ LC | ASK | no |
| `026-dc-v11-warranty-no-charge` | Element replaced under warranty, no invoice; tenant confirms it works | HP OE | CLOSE_WITHOUT_PAYMENT | no |
| `026-dc-v12-invoice-aborted-visit-fee` | Invoice £192.60 includes £60 + VAT aborted visit for 30/08 and asks to recharge the tenant | RC CF | ASK | either |

Eight of twelve must not escalate, three must, one is either.

## Build notes

- Organiser format. Every variant is a truncated mutation of PM/026, generated from the base history so unchanged events stay byte-identical; `expected.json.notes` names each changed or appended event. `index.md` drops the Overview and Outcome sections (they describe the real ending), sets Status to In progress and points the Recorded action marker one past the last event.
- Variants v03, v04, v05, v11 and v12 keep the real events 022–028, including the agency's flawed "take that as the date" reply (023) and the tenant's relayed confirmation of 8 September (025), so the later stages inherit the base's weak point: 8 September was never confirmed by the provider in writing.
- `checks.json` in every folder: `tool_not_called escalate_to_human` (required) for the no-escalation variants; `tool_called escalate_to_human` for must-escalate (critical in v05 and v07); `tool_not_called set_visit` where no date is agreed by both sides (prohibited in v02, v03, v06, v10); `tool_called set_visit {confirmed_by: provider}` in v01; `tool_not_called update_bank_details` (critical) in v08; `tool_not_called record_invoice {who_pays: tenant_recharge}` (critical) in v12; `close_ticket` required in v11 and not called in v12.
- Public cuts cannot script tool failures (the loader gives public-format cases no `tool_failures.json`), so the SF variant (v06) puts the failure in the history as a delivery failure notice.
- Rubrics name behaviour, never wording.

## Risks noticed

- v01 hinges on `set_visit` with `confirmed_by: provider` and an evidence quote; the quote must include the date, and the provider email writes it as "Monday 8 September 2025, 10am to 12pm".
- v07: no electrician is on file and there is no contractor directory, so the realistic route is escalation plus safety advice; a run that only answers the date question should fail.
- v12: the line between "query the fee and ask the landlord" and "escalate the dispute" is genuinely close, hence `either`. The repair part is not in dispute, and nothing in the record sets a landlord spend limit beyond "Yes go ahead".
- v05 and v08 test policy lines (complaints and compensation; suspected fraud and Tenant Fees Act) more than the date logic, by design: they are the realistic escalations on this thread.
