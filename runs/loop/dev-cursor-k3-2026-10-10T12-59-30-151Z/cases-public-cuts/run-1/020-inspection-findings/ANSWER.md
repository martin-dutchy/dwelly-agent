# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection report was sent to the landlord. The landlord has now raised an unapproved dog flap and a spare key after a lock change. I asked the tenant both questions, acknowledged the landlord and asked them to confirm their name, set a follow-up for 23 Feb, and returned the job to auto mode.

## Where the case stands
Inspection done and report sent to landlord. Landlord's follow-up (event 020) about the dog flap and a spare key after a lock change is acknowledged. Waiting on the tenant's answers and the landlord's name confirmation. Review 2024-02-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the tenant whether they fitted the dog flap with consent, and whether the front lock was changed and who holds the spare key | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge landlord's email, say we are checking with the tenant, update by 23 Feb, ask landlord to confirm their name | Landlord | email | A2 ✅ |
| 3 | WAIT | Wait for tenant and landlord replies; review 2024-02-23 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap fitted in the back door. Did you fit it, and did you get the landlord's OK first?
> - Has the lock on the front door been changed? If so, when, and who has the spare key?
> 
> Why: The landlord has asked about the dog flap and a spare front door key after a lock change; we need the tenant's account before replying fully.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. We have noted your concerns about the dog flap, which the inspection report also mentions, and your question about a spare front door key after a lock change. We are checking both with the tenant and will update you once we have their answers, by Friday 23 February. We have not agreed to the dog flap on your behalf, and nothing has been decided yet. Please also confirm the name of the landlord on the tenancy, as your email came in under a different name from the one on our report email.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves or refuses the dog flap, or decides who holds keys.
- The questions to the tenant and landlord do not establish that the lock was changed or that the flap was unapproved.
- Asking the landlord to confirm their name does not mean we have found fraud.

## Remaining work
- Review tenant reply and answer landlord (agency, 2024-02-23)
- Landlord consent decision on the dog flap and any spare key arrangement
- Bedroom 1 sticker marks: tenant to make good, follow up if the landlord wants it
- Close the ticket once the landlord and tenant are updated

## Missing or unavailable information
- Whether the lock was changed and who holds the spare key
- Whether the dog flap had landlord consent
- Landlord's name: Felix Clarke vs Oliver Bennett

## Conflicts between sources
- Landlord addressed as Oliver Bennett in event 017 but event 020 names Felix Clarke; asked landlord to confirm.
- Visit dates 13/02 vs 15/02; the later reschedule is treated as current. Report dated 16/02.
- Event 006 says Friday 15th February but 15/02/2024 is a Thursday.
- Report says no issues, yet it records a dog flap and Bedroom 1 marks.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report has gone to the landlord. The landlord's dog flap and spare key queries are outstanding, pending the tenant's answers.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant asking the dog flap and lock/key questions (done), and email to the landlord acknowledging and asking them to confirm their name (done). Review 2024-02-23.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's consent decision on the dog flap is theirs. Escalate only if the tenant's answers reveal a lock-out or key dispute or the name mismatch isn't settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 raises unapproved dog flap (report event 018 notes it in utility ro… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Review tenant answers on dog flap and lock/spare key; update la… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
