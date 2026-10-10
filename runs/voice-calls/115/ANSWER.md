# Case 115: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant can't attend the Monday slot, and the recorded date (30/08) is a Saturday and was never provider-confirmed. I asked the tenant for availability, asked Keystone to confirm a valid date and rebook, noted the record conflicts, and put the job on hold until 1 Sept.

## Where the case stands
Ticket NBL-115 at visit stage, landlord approved Keystone Compliance. The existing visit slot is unreliable: Monday vs 30/08 (a Saturday), never confirmed by the provider, and the tenant can't do Monday. On hold waiting for the tenant's availability and provider confirmation, review 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked the tenant for suitable days/times and best number; told her the date is unconfirmed and when she will next hear from us (2 Sept) | Clara, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Asked Keystone to treat the slot as unconfirmed, confirm a valid date and agree a new time with the tenant by 1 Sept | Keystone Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-09-01 for tenant times and provider confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, thanks for calling today, sorry we got cut off. Monday doesn't work for you, so we're asking Keystone Compliance to rearrange. Please note our records show the visit as "Monday morning" but with the date 30/08, which is a Saturday, so the date is unclear. Nobody should be expected until the engineer confirms a new time with you. Could you reply with a few days and times (or a time window) that suit you, and the best number to reach you on? We'll pass these to the engineer and update you by Tuesday 2 September.

**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record shows "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday, and the tenant says she cannot do Monday because of work. Please treat this slot as not confirmed and let us know by Monday 1 September what date you can actually attend. We have asked the tenant for suitable times and will pass them on. Please agree the new time with her and confirm it to us in writing. Also, the earlier call note names Riverside Works; please confirm you are the attending firm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new visit is booked; set_visit not used because no provider-confirmed date exists
- Does not establish the oven fault cause, cost, or that Keystone is the attending firm
- Landlord approval 'Yes go ahead' covers sending the contractor only, no quote approved

## Remaining work
- Tenant to supply availability; Keystone to confirm a valid date; agency to then set_visit
- Review on 2025-09-01; chase on another channel if no reply
- Attendance, result, quote/invoice and close-out

## Missing or unavailable information
- Tenant's available times
- Provider-confirmed date
- Clarity on which firm attends and tenant's correct number

## Conflicts between sources
- Monday vs 30/08/2025 (Saturday)
- Provider named Keystone Compliance vs Riverside Works vs Lantern Utilities
- Tenant named Ruben Oakley / Clara Hughes / Grace Mercer / Harriet Fletcher
- Two phone numbers (07700 900721 and 07700 900077)
- Trusted: tenant's verified statement on the call and the system record, with the date treated as unconfirmed

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned, but the visit needs rearranging: the tenant can't do Monday, the date is inconsistent, and the provider never confirmed. Outstanding: new confirmed visit, then result and invoice.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (ask availability) and to Keystone (confirm date and rebook); hold set to 2025-09-01.

**3. Does anything need a human decision, and why?**

No. This is routine rescheduling; the record conflicts are noted and can be resolved by the tenant and provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"115","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"115","reason":"Waiting for Tenant","comment":"Tenant can't do Monday visit; waiting for her available times and for Keystone … | 1 | ❌ failed | Ticket 115 not found on read-back |
| A4 | `add_note` | {"entity":"ticket 115","note":"Conflicts: visit \"Monday\" vs date 30/08/2025 (Saturday); provider named Keystone Compliance vs Riverside Wo… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-115","reason":"Waiting for Tenant","comment":"Tenant can't do Monday visit; waiting for her available times and for Keyst… | 1 | ✅ verified | Ticket NBL-115 read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold failed because I used the wrong ticket ref '115'; retried with NBL-115 and it verified (A5).
