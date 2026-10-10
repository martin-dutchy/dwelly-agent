# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved Keystone Compliance for the oven repair. The 'confirmed' visit was inconsistent: Saturday 30/08 against 'Monday', a different company named on the call, and no tenant confirmation. I recorded the approval, asked the contractor to confirm, told the tenant the slot is unconfirmed, and put the job on hold to 2025-08-28.

## Where the case stands
NBL-026 at visit stage, landlord approved Keystone Compliance. The visit is NOT confirmed. The tenant had not agreed the slot and the contractor identity and date conflict. On hold waiting for the provider, review 2025-08-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm who is attending (Keystone vs Riverside Works) and the exact date and slot (Saturday 30/08 vs Monday), and to agree it with the tenant | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the appointment is not yet confirmed, repair is approved, ask for best contact number and times | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Hold for provider confirmation, review 2025-08-28 | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please ignore the "confirmed" wording in our last email about the oven visit at Flat 3, 3 Willowmere Road. We need you to confirm a few things: 1) Our records show a call from "Isaac Palmer, Riverside Works" proposing Monday 10-12, but the job is assigned to Keystone Compliance. Please confirm who is attending. 2) The system holds 30/08/2025, which is a Saturday, while the call said Monday. Please confirm the exact date and slot you can attend. 3) The tenant had not yet confirmed the slot. Please confirm the date with them (the contact number in our email may be wrong, so we are checking it with the tenant). If the oven needs a quote, send it to us and do not proceed until we approve. Thank you.

**A3 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for your patience. The landlord has approved the oven repair. Please treat the appointment in our last email as not yet confirmed: it said Monday 10-12 but quoted 30/08/2025, which is a Saturday, and the contractor on the call named a different company. We are confirming the exact date and who is attending with the contractor and will update you. Could you also tell us the best phone number and times to reach you? In the meantime, please keep using the grill if you need to cook.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed
- Landlord approval covers sending the contractor only, not any quote or spend
- Nothing established about the cause of the oven fault

## Remaining work
- Provider to confirm identity and date; agency then books the visit with set_visit
- Result, any quote, invoice and closing checks
- Check the tenant's correct phone number

## Missing or unavailable information
- Provider confirmation of identity and date
- Tenant's best contact number
- Attachment at event 014 unavailable

## Conflicts between sources
- Tenant names differ: Clara / Ruben Oakley / Grace Mercer / Harriet Fletcher
- Contractor Keystone Compliance (assigned) vs Riverside Works (call)
- 30/08/2025 is a Saturday but the slot says Monday
- Two tenant contact numbers: 07700 900721 and 07700 900077

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved by the landlord and a provider is assigned, but the visit is unconfirmed. The date and the contractor's identity conflict. Outstanding: provider confirmation, the visit itself, the result, and any quote or invoice.

**2. What is the next action, who is it for, and through which channel?**

Contractor confirmation request sent to Keystone Compliance by email, and the tenant was told the slot is unconfirmed by email. The hold review is 2025-08-28.

**3. Does anything need a human decision, and why?**

No. This is routine and resolvable by asking the provider. If there is no answer by the review date, chase on another channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"case-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 ask… | 1 | ❌ failed | Ticket case-026 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"case-026",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"case-026","reason":"Waiting for Provider","comment":"Waiting for contractor to confirm identity (Keystone vs Riverside Works)… | 1 | ❌ failed | Ticket case-026 not found on read-back |
| A5 | `add_note` | {"entity":"case-026","note":"Conflicts: tenant named Clara / Ruben Oakley / Grace Mercer / Harriet Fletcher; contractor Keystone Compliance … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 aski… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-026","reason":"Waiting for Provider","comment":"Waiting for contractor to confirm identity (Keystone vs Riverside Works) … | 1 | ✅ verified | Ticket NBL-026 read back after put_on_hold |

## Failed or unverified actions
- A1: Wrong ticket ref (case-026); retried with NBL-026 as A6, verified
- A4: Wrong ticket ref; retried with NBL-026 as A7, verified
