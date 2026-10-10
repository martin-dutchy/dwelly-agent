# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works are being done by the landlord's contractor. We asked the contractor and landlord for written completion confirmation, updated the tenant, and set a follow-up for 15 Dec. No human decision is needed.

## Where the case stands
Landlord's own contractor (Riverside Services, Freya) is doing the communal garden works, landlord approved 3 Nov and pays direct. Job on hold waiting for provider to confirm completion. The 11 Dec call mentioned completion and invoicing, but nothing is in writing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside for written completion confirmation, photos and invoice routing | Freya, Riverside Services, contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm works finished and that they pay direct | Rowan, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant that works are awaiting written completion confirmation | Henry, tenant | email | A3 ✅ |
| 4 | WAIT | Review 15 Dec; close without payment once completion confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Freya (Riverside Services) (contractor) via email, existing thread (event 042 call)** (verified)

> - Please confirm in writing that the communal garden, hedge and side-path works at 46 Copperfield Walk are fully complete, and the date finished.
> - Please send photos of the finished work.
> - Please confirm the invoice is going to the landlord directly.
> 
> Why: Our call on 11 Dec discussed completion and invoicing but we have nothing in writing to close the job.

**A2 · request_landlord_approval → Rowan (landlord) (landlord)** (verified)

> Please confirm that Riverside Services have finished the communal garden works and that you will pay them directly, so we can close our job.
> 
> Options: Yes, works finished and I pay Riverside directly; Not finished yet / other

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's contractor, Riverside Services, has been working on them and we are waiting for written confirmation that they are finished. Please let us know if anything still looks untidy. We will update you by 15 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the works are complete or satisfactory
- The ticket is not closed
- Not a decision on who pays; landlord paying direct is still to be confirmed

## Remaining work
- Written completion from Riverside or landlord (owner: agency chase)
- Close without payment after the 15 Dec review
- Tenant to confirm the result

## Missing or unavailable information
- Written completion confirmation
- Summary of the 11 Dec call is vague
- Attachments at event 004 unavailable

## Conflicts between sources
- Ticket stage is mp_time with 'provider assigned', but the history shows the landlord's own contractor doing the work.
- Event 036 says no tenant contact needed, but the tenant was promised updates at event 023.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord contractor Riverside has done or is finishing the works. Written completion confirmation, the landlord's confirmation that they pay direct, and tenant confirmation are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya at Riverside asking for written completion and photos, and an email to the landlord asking them to confirm completion and direct payment. The tenant has been updated by email. Review 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. Close without payment once completion is confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Freya (Riverside Services)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)",… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Rowan (landlord)","decision_needed":"Please confirm that Riverside Services have finished the communal garden works and that yo… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"due_on":"2025-12-15","purpose":"Check Riverside/landlord confirmation of completion; then close without payment if landlord pays direct","… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
