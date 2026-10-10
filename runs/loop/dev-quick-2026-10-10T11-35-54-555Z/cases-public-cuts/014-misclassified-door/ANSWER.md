# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The intake misclassified a front door that slams and may crack its glass as a routine appliance issue. I reclassified it as an urgent door repair with a note, messaged the tenant with safety advice and next steps, and put the job on hold for landlord approval until 2024-06-07. Nothing was booked or approved, because the landlord is not identified on the property record.

## Where the case stands
Intake (stage init). The request is a tenant report that the front door slams shut and that a fridge engineer warned it could shatter the glass. The AI intake misclassified it as an appliance issue, routine. The job is on hold waiting for landlord approval, with a review date of 2024-06-07. No landlord contact or spend limit is on the property record.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Reclassify the job as a door repair (not appliance) with URGENT severity because of the glass-breakage risk; record this on the ticket. | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the job is logged as an urgent door repair, to avoid slamming the door, to report any cracked or loose glass, to call 999 if glass breaks and someone is at risk, and to suggest a visit time; say the landlord is being asked to approve. | Tenant, Flat 12, 52 Meadow Row | email | A2 ✅ |
| 3 | WAIT | Hold the job awaiting landlord approval, with a review date of 2024-06-07. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 12, 52 Meadow Row (tenant) via email, existing thread (event 001 note)** (verified)

> Thank you for reporting the front door. We have logged it as a door repair, not an appliance issue, and have treated it as urgent because of the risk to the glass. Until someone has looked at it, please avoid slamming the door and close it gently. If you notice a crack, chip or any glass coming loose, keep clear of the door and let us know straight away. If the glass breaks and anyone is at risk, call 999. We are asking the landlord to approve the repair now, and we will confirm the next steps with you once they reply. Please reply with a good time to visit, and tell us if anything about the door has changed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification is a note only; the ticket category and severity fields were not changed by a tool.
- Telling the tenant the job is urgent does not confirm any visit, contractor, cost, or cause.
- No contractor has been assigned and no spend approved.
- Nothing establishes whether the glass is actually cracked or the door is unsafe.

## Remaining work
- Identify the landlord for this property (no contact on the property record) and ask them to approve a contractor visit for the front door (owner: ops, landlord approval needed, due 2024-06-07).
- Ask the tenant whether the glass is cracked or loose, and for visit times (owner: ops, when the tenant replies).
- Once approved, assign a contractor, book the visit with the provider's confirmation, and then complete the job.

## Missing or unavailable information
- Landlord name and contact details for Flat 12, 52 Meadow Row.
- Landlord spend limit or preferred contractor.
- Whether the glass is cracked, and whether the door is currently safe to use.
- Tenant's visit availability and contact channel.

## Conflicts between sources
- The intake classified the issue as Appliances/routine. The tenant's report is about the front door itself, and the fridge engineer's comment is a warning, so I trusted the tenant's description over the intake label.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

It is at intake, with no provider or spend approved. It is on hold waiting for the landlord, who is not identified on the record. Outstanding: landlord identity and approval, the glass condition, and a visit time.

**2. 2. What is the next action, who is it for, and through which channel?**

Reclassify as an urgent door repair (internal note, verified A1). Message the tenant by email on the existing thread with safety advice and next steps (verified A2). Hold for landlord approval with a review date of 2024-06-07 (verified A3). The landlord still needs to be identified and asked, by email or phone, once their contact is found.

**3. 3. Does anything need a human decision, and why?**

Not yet. The routine steps are done. A human is needed only if the landlord cannot be identified or does not answer, or if the glass is found to be cracked and the door is unsafe. Those cases would then need a P1/P2 maintenance escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-014-misclassified-door","note":"Reclassified by ops agent: the AI intake labelled this 'Appliances / routine', but the fault … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12, 52 Meadow Row","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord approval needed before a contractor is booked… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
