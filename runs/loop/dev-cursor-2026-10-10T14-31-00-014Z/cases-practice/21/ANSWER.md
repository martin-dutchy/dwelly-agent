# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Told Jonah the boiler job is waiting on a second quote after the landlord asked for one, with Swift P&H due 14 Oct. Pointed him to the council for the missed bin collection. Set a follow-up for 14 Oct.

## Where the case stands
R-4799 at double_quotation: £780 expansion vessel quote with landlord, second quote awaited from Swift P&H (visit 14 Oct per record). Follow-up set 14 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update, bin signposting and heating check | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Review on 14 Oct for second quote | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your messages on the portal, and sorry it has felt slow. Boiler (R-4799): the engineer visited and found the part that is probably causing the pressure drop (the expansion vessel). The repair quote has gone to your landlord, who has asked for a second quote before deciding. Swift P&H are down to visit on 14 October to give it; we are confirming that date with them and will tell you if it changes. Until the repair is approved, please keep topping up the pressure as you have been doing. If you lose heating or hot water, or see leaking or smell gas, tell us straight away (gas smell: leave the property and call 0800 111 999). We will update you again by Wednesday 14 October. Bins: we don't manage collections, so I can't give you a date. Tower Hamlets Council runs them, and you can report a missed collection on their website. If it is a shared bin store problem, tell us and we will look into it. Is your heating and hot water working at the moment?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not approve the repair or confirm the Swift visit with the provider
- No promise of repair date or cost

## Remaining work
- Confirm Swift P&H 14 Oct visit; get second quote to landlord (Margaret Ellison, overseas, email) for decision

## Missing or unavailable information
- Whether heating/hot water currently works (asked tenant)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

The job is at double_quotation. The £780 expansion vessel quote is with the landlord, who asked for a second quote. Swift P&H are due 14 Oct. The repair is not yet approved, so he keeps repressurising the boiler meanwhile and should report any loss of heating or hot water. He is vulnerable, so I asked whether heating and hot water are working.

**2. How do you handle the bin question?**

It is not a maintenance matter. Collections are run by Tower Hamlets Council, so I gave no date and pointed him to the council's missed-collection report.

**3. Do you create any new tickets?**

No. The boiler job already exists and the bin issue is not a repair.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Check Swift P&H visit happened/second quote received; update Jonah and landlord","ticket_ref":"R-4799"} | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
