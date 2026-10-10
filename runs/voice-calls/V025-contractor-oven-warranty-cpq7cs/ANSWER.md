# Case V025-contractor-oven-warranty-cpq7cs: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The first visit did not fix the oven. On a call that cut out, Harbour Services changed their position from "out of warranty" to "covered by a two-year manufacturer's warranty", with only a vague "maybe two weeks". I asked the contractor for written confirmation and a firm date, updated the landlord and tenant, and put the job on hold with a review on 2024-06-07.

## Where the case stands
Stage "visit"; on hold waiting for Harbour Services (review 2024-06-07). First visit happened but oven not fixed. Warranty status and next visit date unconfirmed. No spend approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Email Harbour Services asking for written warranty confirmation, a firm date, and a quote if any charge, reply by 2024-06-07 | Clara, Harbour Services (contractor) | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked yet, ignore the 21 June date, next update by 2024-06-10 | Leo Bennett, tenant | email | A3 ✅ |
| 3 | OTHER | Update landlord that the warranty claim is the contractor's and unconfirmed, no spend approved, next update by 2024-06-10 | Felix, landlord | email | A2 ✅ |
| 4 | WAIT | Hold for provider reply, review 2024-06-07 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 022 email / event 034 call)** (verified)

> Hi Clara, thanks for speaking earlier; the line dropped before we finished. For the oven at Flat 2, 176 Lantern Quay, please confirm in writing by reply: (1) whether the heating element replacement is covered free of charge under the manufacturer's two-year warranty (your earlier emails said the warranty had just expired, so we need this clear); (2) a firm visit date and time window; (3) the brand/model and any warranty reference. If there is any cost to the landlord, please send a quote and do not start work until we approve it. Please also disregard the earlier "21 June" appointment wording unless you confirm it. We need your reply by 2024-06-07.

**A2 · send_message → Felix (landlord) via email, existing thread (event 024 email)** (verified)

> Hi Felix, update on the oven. On a call today Harbour Services said the engineer could not fix it, and that a two-year manufacturer's warranty may cover a free heating element replacement. This is their claim and is not yet confirmed in writing, and they gave only a rough "maybe in two weeks" for a visit. I have asked them to confirm warranty cover, a firm date, and to quote before any work if there is a charge. No spend has been approved. I will update you by 2024-06-10.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Hi Leo, sorry your oven is still not working. The engineer could not fix it on the first visit. Harbour Services now say the repair (a new heating element) may be covered by the manufacturer's warranty, and we are getting a firm date and written confirmation from them. No new visit is booked yet, so please don't expect anyone until we confirm a date with you. Please ignore the "21 June" date in our earlier email. We will update you by 2024-06-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm warranty cover, a visit date or who pays.
- No visit was booked with set_visit; no contractor spend approved.
- The landlord's email only asked us to pursue a warranty service; it is not spend approval.

## Remaining work
- Harbour Services to confirm warranty cover in writing and give a firm date (owner: agency chasing provider)
- If a charge arises, quote to landlord for approval
- Record work result after the repair and close
- Review 2024-06-07; update tenant and landlord by 2024-06-10

## Missing or unavailable information
- Written confirmation of manufacturer warranty
- Firm visit date
- Attachments at events 003 and 013 not seen

## Conflicts between sources
- Warranty: contractor said 'just out of 12-month warranty' (events 020, 022, 034) vs two-year manufacturer's warranty (event 034); treated as unconfirmed.
- Visit dates 22/05/2024 vs 21/06/2024 and 'tomorrow' wording; no valid booking trusted.
- Fitting date March 2025 (event 014) is later than the case dates in 2024; legacy record inconsistency.
- Landlord email named Keystone Works but the installer was Harbour Services.
- Tenant contact numbers differ between events 013 and 028/029.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is at the visit stage and on hold for the provider. The engineer inspected but could not fix the oven. Warranty cover is disputed or unclear: the contractor said both 12 months (expired) and a two-year manufacturer's warranty. No firm repair date exists, and the record has conflicting visit dates.

**2. What is the next action, who is it for, and through which channel?**

Email to Clara at Harbour Services asking for written warranty confirmation, a firm date, and a quote if any charge. Tenant and landlord have also been updated by email.

**3. Does anything need a human decision, and why?**

No. It is routine, and a dated hold is in place. It would need the landlord's approval only if the contractor quotes a charge.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 email / ev… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"existing thread (event 024 email)","ticket_ref":"V025-con… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"V025… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"V025-contractor-oven-warranty-cpq7cs","reason":"Waiting for Provider","comment":"Waiting for Harbour Services to confirm in w… | 1 | ❌ failed | Ticket V025-contractor-oven-warranty-cpq7cs not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-V025-contractor-oven-warranty-cpq7cs","reason":"Waiting for Provider","comment":"Waiting for Harbour Services to confirm … | 1 | ✅ verified | Ticket NBL-V025-contractor-oven-warranty-cpq7cs read back after put_on_hold |

## Failed or unverified actions
- A4: First put_on_hold used the wrong ticket ref; retried with NBL-V025-contractor-oven-warranty-cpq7cs and verified (A5).
