# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord answered the approval request with only a 👍. I recorded it as unclear and emailed a yes/no question. The ticket is on hold until 2024-03-29. No contractor has been assigned.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord replied only with 👍, which is not valid approval. Waiting on landlord's yes/no; tenant photos also outstanding. Hold review 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no: instruct our contractor, or their own? | Freya, landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2024-03-29 for landlord answer | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> Hi Freya, thanks for your reply. We want to be sure we've understood it. Can you confirm with a yes or no: do you want us to send our contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? If you'd rather arrange your own contractor, please tell us who and when. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve work or assign a contractor
- Nothing is booked; no timescale promised to tenant

## Remaining work
- Landlord to answer yes/no
- Tenant photos outstanding
- Then assign contractor and book visit
- Chase on a second channel if no answer by 2024-03-29

## Missing or unavailable information
- Clear landlord approval
- Photos of damaged cable from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Awaiting landlord approval; 👍 is not valid authority. No contractor assigned. Tenant photos are also outstanding.

**2. What is the next action, who is it for, and through which channel?**

A yes/no clarification email to the landlord, Freya (sent, A2). Then wait on hold to 2024-03-29.

**3. Does anything need a human decision, and why?**

No. The landlord's clarification is routine. Escalate only if they stay silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-037-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only; asked yes/no whether we… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
