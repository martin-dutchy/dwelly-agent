# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: the record says 30/08, which is a Saturday though labelled Monday, and the tenant says 8 Sept. I asked the provider to confirm the real date, replied to the tenant that 8 Sept is unconfirmed, updated the landlord, and put the job on hold until 2 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance (event 009). Visit date disputed: record says 30/08/2025 10-12 (labelled Monday, but a Saturday); tenant says 8 Sept. Provider has not confirmed either. On hold waiting for provider, review 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm whether they attended 30/08 and the actual agreed date, by 1 Sept | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is unconfirmed, ask if anyone came and whether 8 Sept is acceptable; next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | OTHER | Update landlord that the visit date is unconfirmed and no cost yet | Palmer, landlord | email | A3 ✅ |
| 4 | WAIT | Hold until provider confirms; review 2 Sept | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email to contractor)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on 30/08/2025, 10am-12 (described as "Monday", but 30/08 is a Saturday). The tenant has now called to say she arranged 8 September 2025 with you instead. Please reply by end of Monday 1 September to tell us: (1) did you attend this morning, and (2) what date and time is actually agreed? We will not treat 8 September as booked until you confirm it. If you can offer an earlier slot, please say. Please also confirm the company name on this job, as we have seen different names used.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling, and sorry for the confusion over dates. Our record holds a visit on 30/08/2025, 10am-12 (it was described as a Monday, but the 30th is a Saturday, so that was our error to flag). You've told us you arranged 8 September with the contractor. That date isn't confirmed on our side yet; we've asked the contractor to confirm the actual date and whether anyone attended this morning. Please don't expect anyone on 8 September until we confirm it. Could you also tell us whether anyone came this morning? As the oven is out of use, is 8 September acceptable to you? We can ask for a sooner slot. We'll update you by Tuesday 2 September.

**A3 · send_message → Palmer (landlord) via email, agency landlord record** (verified)

> Hello, an update on the oven repair at Flat 3, 3 Willowmere Road. Keystone Compliance is assigned following your approval. The visit date is unconfirmed: our record says 30/08, but the tenant says 8 September was agreed. We've asked the contractor to confirm and will update the tenant by 2 September. No quote or cost has been received yet; nothing further is needed from you now.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or confirmed; 8 Sept is only the tenant's statement
- No work result recorded; unknown whether the contractor attended 30/08
- No quote, cost or fault diagnosis established

## Remaining work
- Provider to confirm date and attendance (owner: provider, then agency)
- Tenant to say whether anyone came and whether 8 Sept is OK
- If confirmed, set_visit; if missed, record the result and rebook

## Missing or unavailable information
- Provider's confirmed visit date
- Whether anyone attended on 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- Visit 30/08 (events 017-020) vs 8 Sept (tenant call, event 021)
- Provider named Keystone Compliance / Riverside Works / Lantern Utilities / Keystone Utilities; tenant named Clara / Ruben Oakley / Grace Mercer / Harriet Fletcher; treated as the same job and parties

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; Keystone Compliance assigned; visit date disputed (30/08 per record vs 8 Sept per tenant). Provider confirmation and attendance outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm the actual date and attendance; email the tenant that 8 Sept is unconfirmed; update the landlord by email. Hold until 2 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation that the provider can settle, so I did not escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email to contr… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hi Clara, thanks … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Palmer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hello, an update on the … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: 30/08/2025 10-12 (events 017-020, labelled \"Monday\" but is a Saturday) vs 08/09/2025 (tenant call, … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm actual visit date (30/08 vs 08/09)… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm actual visit dat… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A5: First hold attempt used the wrong ticket ref; retried with NBL-026-date-conflict and verified as A6. The note A4 was filed under the entity '026'; it verified.
