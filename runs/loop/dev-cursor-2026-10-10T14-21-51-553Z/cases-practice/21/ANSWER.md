# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Jonah asked for a boiler update and about bins. I explained the job is waiting on a second quote (Swift P&H, noted 14 Oct) after the £780 quote, that nothing is approved, and gave safety advice because he is vulnerable. Bins were redirected to Tower Hamlets council. No new tickets.

## Where the case stands
R-4799 at double_quotation: first quote £780 (expansion vessel) held; landlord wants a second quote; Swift P&H visit noted 2026-10-14, unconfirmed by provider in my records. Waiting on provider and landlord; tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told Jonah the job status, that nothing is approved yet, to report loss of heating/hot water, and gave the bin answer | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Short pointer on the portal/messaging thread to the email | Jonah Okafor, tenant | whatsapp | A2 ✅ |
| 3 | WAIT | Follow up on 14 Oct to confirm Swift visit and second quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry for the wait on your boiler (R-4799). Where it stands: the first engineer visited and quoted £780 to replace a part called an expansion vessel, which is likely why the pressure keeps dropping. Your landlord asked for a second quote before agreeing to that spend, and a second company (Swift P&H) is noted to visit on 14 October. We're confirming that date with them and will tell you as soon as it's confirmed. Until then, no repair has been approved. If the boiler is still working, you can carry on topping up the pressure as before. If you lose heating or hot water, or see leaks or smells, tell us straight away. We'll update you again by Wednesday 14 October. On bins: collections are run by Tower Hamlets council, not us, so please check or report a missed collection on their website. I can't see your collection day from here. Anything else, just reply here.

**A2 · send_message → Jonah Okafor (tenant) via whatsapp, existing thread (portal chat 2026-10-10 13:11)** (verified)

> Hi Jonah, sorry for the wait. Your boiler job is waiting on a second quote the landlord asked for (Swift P&H, noted for 14 Oct, being confirmed). The first quote was £780 and nothing is approved yet. If you lose heating or hot water, tell us straight away. We'll update you by 14 Oct. Bins are handled by Tower Hamlets council, so please check or report the missed collection on their website. I've also emailed you the details.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not approve the £780 quote or confirm the 14 Oct visit
- Not a promise of repair date
- Bin collection dates are not known to us; council responsibility

## Remaining work
- Confirm Swift P&H 14 Oct visit with provider (agency ops)
- Get second quote, send to landlord Margaret Ellison (email, overseas) for decision (agency ops)

## Missing or unavailable information
- Provider confirmation of the 14 Oct date
- Whether heating currently works (tenant told to report any loss)

## Conflicts between sources
- Tenant says 'ages' but ticket is only 12 days old; the job is moving. Tenant prefers email but wrote via portal, so I replied by email plus a short message.

## Answers to the case questions
**1. 1. What is the current status of his boiler job and what does it mean for him?**

R-4799 is at double_quotation: £780 quote for an expansion vessel, landlord requested a second quote, Swift P&H visit noted for 14 Oct. No repair is approved yet; he keeps topping up pressure and must report loss of heating/hot water. Next update by 14 Oct.

**2. 2. How do you handle the bin question?**

It is a council matter, not a maintenance job. I told him collections are run by Tower Hamlets council and to check or report the missed collection there; I did not invent a date.

**3. 3. Do you create any new tickets?**

No. Bins are not a repair and the boiler issue already has an open ticket.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"whatsapp","contact":"existing thread (portal chat 2026-10-10 13:11)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Confirm Swift P&H visit and second quote for R-4799; update Jonah Okafor and landlord","ticket_ref":"R-479… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
