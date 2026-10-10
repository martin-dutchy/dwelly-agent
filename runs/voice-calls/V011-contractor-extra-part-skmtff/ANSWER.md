# Case V011-contractor-extra-part-skmtff: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oakfield Homes tightened a loose heater connection and the dishwasher ran on retest. They found a missing control dial and quoted £95 inc VAT. The landlord approved only the inspection, so I recorded the quote, kept the approval request with the landlord, put the job on hold to 10 Dec and updated the tenant. The contractor's request to approve the spend on the phone was declined.

## Where the case stands
Stage: result (needs_quote). Heater connection fixed on the visit. £95 inc VAT dial quote sent to landlord (event 020), awaiting their reply. Ticket on hold, review 2026-12-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord approval of the £95 dial quote; chase on a second channel on 2026-12-10, then tell Oakfield Homes and the tenant. | Landlord (Turner) | internal | A5 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the connection is fixed, the dial needs landlord approval, and when they will next hear from us. | Amelia Nolan, tenant | email | A4 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Amelia, thanks for letting the engineer in. He tightened a loose connection and says the dishwasher now runs properly. He also found a control dial is missing; replacing it needs the landlord's approval, which we've asked for. Please let us know if the dishwasher still won't finish a cycle. We'll update you by Thursday 10 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it. No part has been ordered and Oakfield Homes has not been told to proceed.
- The dishwasher fix rests on the contractor's word only; the tenant has not confirmed it.
- The landlord's earlier 'Yes please go ahead' covered the inspection, not the £95.

## Remaining work
- Landlord decision on £95 (agency chases 2026-12-10)
- Then tell Oakfield Homes to order the part, or not
- Tenant to confirm the dishwasher works
- Invoice and closing checks

## Missing or unavailable information
- Landlord reply
- Tenant confirmation that the dishwasher now completes cycles
- Whether the dial is needed for the dishwasher to work properly

## Conflicts between sources
- Provider calls and notes name different companies (Cedar, Alder, Juniper Surveying) from the assigned Oakfield Homes. Treated as the assigned provider's contacts, since the property and dishwasher details match.
- Event 019 is addressed to 'Juniper Surveying' rather than the agency.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is done and the connection is fixed. The £95 dial quote is awaiting landlord approval. The tenant's confirmation, the invoice and closing are still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply to the event 020 email and chase by SMS or phone on 2026-12-10. The tenant has been updated by email.

**3. Does anything need a human decision, and why?**

No. The decision belongs to the landlord, who has been asked, so there is nothing to escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-V011-contractor-extra-part-skmtff","provider":"Oakfield Homes","amount_gbp":95,"vat":"included","items":["Replacement con… | 1 | ✅ verified | Ticket NBL-V011-contractor-extra-part-skmtff read back after record_quote |
| A2 | `record_work_result` | {"ticket_ref":"NBL-V011-contractor-extra-part-skmtff","outcome":"needs_quote","evidence":"Provider (Ashford) note event 019 and call event 0… | 1 | ✅ verified | Ticket NBL-V011-contractor-extra-part-skmtff read back after record_work_result |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-V011-contractor-extra-part-skmtff","reason":"Waiting for Landlord","comment":"Waiting for landlord to approve £95 inc VAT… | 1 | ✅ verified | Ticket NBL-V011-contractor-extra-part-skmtff read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-V011-contractor-extra-part-skmtff","due_on":"2026-12-10","party":"Landlord","purpose":"Chase landlord on second channel (… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
