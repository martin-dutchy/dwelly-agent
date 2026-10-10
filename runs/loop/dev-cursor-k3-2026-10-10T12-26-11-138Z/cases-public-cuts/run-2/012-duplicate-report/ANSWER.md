# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's 28/04 email asking for someone to come out duplicates an existing booking for 29/04 8am-12pm. I did not open a new job. I told the tenant the booking stands, asked the provider to confirm attendance and company, noted the record conflicts, and set a follow-up for 30/04.

## Where the case stands
Visit booked for Wed 29/04/2026 08:00-12:00 (events 017-020). Tenant's 28/04 email is a duplicate chase. Waiting on the provider to confirm attendance and identity; follow-up set for 30/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing visit on 29/04 8am-12pm stands and how to reschedule | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Asked provider to confirm attendance on 29/04 and which company is attending | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Review after the visit date for the result or quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. Someone is already booked to look at the dishwasher door: our records show a visit on Wednesday 29 April 2026, between 8am and 12pm. If you need to change it, please call the provider on 07700 900410. We are double-checking the provider's details with them today, and will be in touch if anything changes. If the visit doesn't happen, let us know and we'll follow it up.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm you are attending Flat 9, 89 Juniper Mews on Wednesday 29/04/2026 between 8am and 12pm for the dishwasher door inspection. Our call note for the booking names the caller as Grant from Cedar Utilities, so please confirm which company is attending. As before, please send a quote with photos if work is needed, and do not proceed until we approve it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the provider attended or fixed anything
- No quote or spend approved
- The provider's identity is not yet confirmed

## Remaining work
- Provider to confirm attendance and identity (agency ops)
- Record the result or quote after 29/04; the landlord approves any quote
- Ticket reference not found by the system: resume_auto not applied; check the ticket's mode manually

## Missing or unavailable information
- Whether the provider is Riverside Compliance or Cedar Utilities
- Tenant's surname (Turner vs Kendall)
- The system ticket reference for this case

## Conflicts between sources
- Provider is Riverside Compliance in the assignment, but the call note says Grant from Cedar Utilities
- Tenant is Leo Turner in most records but Leo Kendall in the call note
- SMS was signed Harbour Homes, not Northbridge Lettings

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 08:00-12:00. The tenant has chased again, which is a duplicate. Outstanding: the visit result or quote, the landlord's approval of any quote, and confirmation of the provider's identity.

**2. What is the next action, who is it for, and through which channel?**

I emailed the tenant to say the booking stands, and emailed the provider to confirm attendance and company. The follow-up is set for 30/04.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate. Only the system ticket reference is not found and needs checking by staff.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"012",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"012","note":"Tenant email 28/04 (event 021) is a duplicate chase; visit already booked 29/04 08:00-12:00 (events 017-020). Record… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"012","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happened and obtain result… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"012"} | 1 | ❌ failed | Ticket 012 not found on read-back |

## Failed or unverified actions
- A5: resume_auto failed because ticket '012' was not found. It was not retried, since I have no other reference. Noted for manual check.
