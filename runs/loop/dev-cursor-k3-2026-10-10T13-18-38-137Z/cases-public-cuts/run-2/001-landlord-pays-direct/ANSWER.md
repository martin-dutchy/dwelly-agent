# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job. The landlord approved Riverside Services, their own contractor, on 5 Nov. I recorded that decision and asked the contractor for written completion evidence, photos and the invoice by 15 Dec. No human decision is needed yet.

## Where the case stands
Landlord approved works with their own contractor (Riverside Services, Freya); work reportedly under way/done per call on 11 Dec, but no written completion, photos or invoice yet. Ticket on hold waiting for provider; follow-up 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Freya for written completion confirmation, photos and invoice by 15 Dec | Freya, Riverside Services (landlord's contractor) | email | A2 ✅ |
| 2 | WAIT | Wait for provider confirmation; review 2025-12-15, then inform landlord and tenant and close without payment if landlord pays direct | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking with Leo on 11 December. To close the communal garden job at Flat 26, 46 Copperfield Walk, please confirm in writing by Monday 15 December: (1) the date the works were completed, including the hedge, weeds and the side-path strip, and whether the tree work is finished; (2) a few photos of the finished work; (3) the invoice, which we understand goes to the landlord directly. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that works are complete; the 11 Dec call summary is vague
- Does not establish who pays; landlord-direct payment is inferred from the case name and needs confirming
- The two attachments from event 004 were never seen

## Remaining work
- Written completion evidence from Riverside Services
- Confirm with landlord that they pay the contractor directly
- Update the tenant (promised updates in event 023/025) and ask them to confirm the garden is done
- Close without payment once checks pass

## Missing or unavailable information
- Written completion confirmation and photos
- Invoice or landlord confirmation of direct payment
- Contents of the unavailable attachments

## Conflicts between sources
- Ticket stage shows 'provider assigned' while the landlord is using their own contractor, and event 036 says no tenant contact is needed even though updates were promised to the tenant. I treated the landlord's own-contractor decision as current.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the works with Riverside Services. The work was started around 20 Nov, delayed by a pigeon nest, and discussed with Freya on 11 Dec. Written confirmation of completion, photos, the invoice and tenant confirmation are still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya at Riverside Services asking for written confirmation of completion, photos and the invoice by 15 Dec (A2). Follow-up set for 15 Dec (A3).

**3. Does anything need a human decision, and why?**

No. The remaining steps are routine chasing, updating the landlord and tenant, and closing without payment.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Could you please advise both T's, in the meantime… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Riverside Services","purpose":"Check written completion confirma… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
