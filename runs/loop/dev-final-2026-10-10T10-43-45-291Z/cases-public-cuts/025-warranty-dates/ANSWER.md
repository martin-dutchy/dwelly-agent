# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; landlord approved and Harbour Services was assigned. The contractor has now said the oven is out of warranty, and a visit is set for 22 May 2:30pm. I booked the visit, told the landlord about the warranty and that any quote needs his approval, and asked the contractor to confirm the date and install date. Nothing needs a human yet.

## Where the case stands
Visit stage. Landlord approval to proceed confirmed; Harbour Services assigned; inspection booked for 22 May 2024 2:30pm with tenant at home. Contractor says oven is out of warranty. Waiting on the visit result and any quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked the visit for 22 May 2:30pm (tenant at home) per the tenant–contractor call | Leo Bennett, tenant / Harbour Services | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord the oven is out of warranty, the visit is tomorrow, and any quote will come to him for approval | Felix, landlord | email | A2 ✅ |
| 3 | CHASE_PROVIDER | Asked contractor to confirm the visit date (22 May vs '21st June') and the real install date, and not to proceed to chargeable work without an approved quote | Harbour Services, contractor | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Felix (landlord) via email, existing thread (event 014 email)** (verified)

> Hi Felix, Harbour Services have checked and say the oven is no longer under warranty, so a free repair isn't available. They are visiting the tenant tomorrow (22 May, 2:30pm) to inspect it. If a repair needs a quote, we will send it to you for approval before any work goes ahead. Please let us know if you would rather arrange your own contractor instead. Kind regards

**A3 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for confirming the oven is out of warranty. Please confirm the visit date: your call with the tenant set it for tomorrow, 22 May at 2:30pm, but your emails say "21st June". We have booked 22 May 2:30pm. Please do not start any chargeable repair without sending a quote (with photos and estimated time) for our approval first. Also, our records show the oven was replaced in March 2025, which can't be right, so please confirm the actual installation date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking the visit does not approve any repair spend or decide who pays
- The out-of-warranty statement is the contractor's word only; no warranty paperwork has been seen
- The visit date is not confirmed in writing by the contractor

## Remaining work
- Harbour Services to attend 22 May and report; record work result
- If a quote is needed: record it and ask Felix to approve (no spend limit on file)
- Landlord to say whether he wants his own contractor
- Invoice, tenant confirmation and landlord update before closing

## Missing or unavailable information
- Property spend limit not on file
- Actual oven installation date and warranty paperwork
- Written confirmation of visit date

## Conflicts between sources
- Contractor emails say the visit is 'tomorrow, 21st June', but today is 21 May and the call says tomorrow 2:30pm; I trusted the call and booked 22 May, and asked for confirmation.
- Event 014 says the oven was replaced March 2025, which is after today's date; the tenant says last year. Asked the contractor to confirm.
- Event 018 says 'the agent's oven' though it is the tenant's; treated as a transcription slip.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Assigned and at visit stage. Inspection is booked for 22 May 2:30pm. The contractor says the oven is out of warranty, so the landlord's free-repair request cannot happen. Outstanding: visit result, any quote and its approval, invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Done now: email to landlord Felix on warranty outcome and quote process; email to Harbour Services to confirm the date and install date and to quote before chargeable work; visit set. Next: wait for the visit on 22 May, then record the result.

**3. Does anything need a human decision, and why?**

Not now. Any quote goes to the landlord for approval. Escalate only if the date or warranty conflict stays unresolved or the landlord disputes it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `set_visit` | {"ticket_ref":"NBL-025-warranty-dates","datetime":"2024-05-22 14:30","slot_text":"Wednesday 22 May, 2:30pm (as agreed by phone between Harbo… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after set_visit |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"existing thread (event 014 email)","body":"Hi Felix, Harb… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-025-warranty-dates"} | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after resume_auto |

## Failed or unverified actions
_None._
