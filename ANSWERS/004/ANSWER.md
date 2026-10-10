# Front entrance lock report: ANSWER

**Decision:** action_taken · **Severity:** urgent

The lock repair is with the landlord's own contractor and the agency is waiting. I recorded that route, asked the tenant whether the door secures, and asked the landlord for the visit status. I also split the tenant's other concerns into JOB-102 and JOB-103.

## Where the case stands
NBL-004 on landlord's own-contractor route (Dorian Wren). Awaiting confirmation of today's visit and lock replacement. Door security unknown. Follow-up 18 Sep.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant whether the door can be secured and to report outcome of today's visit; update on other jobs | Nessa Vale, tenant | email | A5 ✅ |
| 2 | CHASE_LANDLORD | Ask landlord whether Dorian attended/when, lock status, spare key, and who handles the new jobs, reply by 18 Sep | Tomas Elde, landlord | email | A6 ✅ |
| 3 | WAIT | Review 18 Sep | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Nessa Vale (tenant) via email, existing thread (event 023 email)** (verified)

> Hi Nessa, thanks for letting us know. The landlord is arranging his own contractor (Dorian Wren) for the lock, so we have not booked anyone ourselves and we can't confirm today's time. Please tell us once he has been and what he did. Two quick questions: can you lock the front door securely right now, and is it safe to leave the property? If it cannot be secured, tell us today and we will act. Please also let us know if you get a spare key working. I've logged your other concerns as separate jobs: hot water that's too hot (please be careful with taps, and tell us if anyone in the home is a young child or vulnerable), and the bedroom blind and door glazing (photos would help, and tell us if any glass is cracked or broken). We'll update you by Thursday 18 September.

**A6 · send_message → Tomas Elde (landlord) via email, agency landlord record** (verified)

> Dear Tomas, as you asked, we are waiting for your contractor Dorian Wren on the front-door lock. The tenant says he visited around 9 September, said a new lock was needed and left without a return date, and the lock is now worse. She says he is due today after 10:00. Please could you confirm by Thursday 18 September: has Dorian attended or when will he, and has the lock been replaced? We'd also like a spare key sent to the agency once it is done. Separately, the tenant has raised hot water that is too hot, a broken bedroom blind and door glazing you previously mentioned. I've logged these as new jobs. Do you want us to arrange them with our contractors, or will you? The hot water may be a scald risk, so a prompt reply would help.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Tomas Elde / Dorian Wren | Confirm lock replaced and door secure | 2025-09-18 | A7 ✅ verified |

## What this does not establish
- No visit is confirmed; today's attendance is only the tenant's statement
- Nothing establishes the lock is repaired or that the door is secure
- New jobs are logged only, with no approval or contractor

## Remaining work
- Confirm lock replacement and spare key (landlord/Dorian)
- Landlord decision on JOB-102 and JOB-103
- If the tenant says the door cannot be secured, escalate as a security matter

## Missing or unavailable information
- Whether Dorian attended on 16 Sep
- Whether the door currently secures
- Ownership of hot water, blind and glazing items

## Conflicts between sources
- Event 006 note records landlord approval for the agency to proceed, but event 011 and event 012 say to use his contractor. I treated the later instruction as current.
- Landlord's Saturday visit report versus the tenant's report of a later visit: treated as two separate visits.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The landlord told us to wait for his contractor, Dorian Wren. Dorian visited around 9 Sep and said a new lock was needed, and the tenant says the lock is now worse. He is reportedly due 16 Sep after 10:00. Nothing confirms he has attended, and no replacement or spare key is confirmed. The tenant's other concerns were never owned by anyone.

**2. What is the next action, for whom, and through which channel?**

Emails to the tenant (A5) and the landlord (A6), plus a follow-up on 18 Sep (A7).

**3. Does anything need a human decision?**

Not yet. I would escalate if the tenant reports the door cannot be secured, or if the landlord stays silent after 18 Sep.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-004","decision":"own_contractor","evidence_quote":"The landlord says not to instruct another contractor and asks Northbri… | 1 | ✅ verified | Ticket NBL-004 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-004","note":"Route: landlord's own contractor (Dorian Wren); Peregrine Keyworks stood down (event 017). Tenant says Dorian vi… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `create_ticket` | {"property":"18 Larkspur Quay, Morrowfen, ZZ1 1ZZ","category":"plumbing","severity":"urgent","description":"Tenant reports hot water is too … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A4 | `create_ticket` | {"property":"18 Larkspur Quay, Morrowfen, ZZ1 1ZZ","category":"other","severity":"routine","description":"Tenant reports broken bedroom blin… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A5 | `send_message` | {"recipient_name":"Nessa Vale","recipient_role":"tenant","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Tomas Elde","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-004","body… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-004","due_on":"2025-09-18","party":"Tomas Elde / Dorian Wren","purpose":"Confirm lock replaced, door secure, spare key to… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
