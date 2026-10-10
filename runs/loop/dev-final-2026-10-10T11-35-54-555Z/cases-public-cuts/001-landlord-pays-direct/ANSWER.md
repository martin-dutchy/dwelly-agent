# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden job is being done by the landlord's own contractor. The 11 Dec call suggested completion but there is no written confirmation. I asked the landlord to confirm, updated the tenant, and set a hold with review on 15 Dec.

## Where the case stands
Landlord approved and uses own contractor (Riverside/Freya), who started 20 Nov. Latest call 11 Dec mentioned completion and invoicing but no written confirmation of completion. Job on hold awaiting landlord/provider confirmation, review 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing that all works are complete and that they pay the contractor direct | Rowan, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that works are underway and we are awaiting written completion confirmation | Henry, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-12-15 for confirmation, then close without payment | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Rowan (landlord) via email, existing thread (event 027 email)** (verified)

> Hi Rowan, our call with Freya on 11 Dec touched on the garden and tree works and invoicing, but we don't yet have a clear written confirmation that everything at Flat 26, 46 Copperfield Walk is finished. Could you or Freya confirm by email that all the works (weeds, hedge along the side path, tree trim) are complete, and that you'll pay Freya direct? Once we have that we'll close the job. Thanks.

**A2 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord's contractor has been working on them, and we spoke to them on 11 December. We're now waiting for written confirmation that everything is finished. If anything still looks untidy, please let us know and we'll pass it on. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish that the works are complete
- Not closed: no completed work result recorded
- No spend approved or paid by the agency

## Remaining work
- Obtain written completion confirmation and confirm landlord pays direct, then close without payment (agency, after 2025-12-15 review)
- Tenant confirmation of the finish if possible

## Missing or unavailable information
- Written completion confirmation
- Content of the 11 Dec call (summary vague)
- Attachments at event 004 unavailable

## Conflicts between sources
- Ticket stage mp_time/provider assigned vs history showing landlord's own contractor; treated as landlord's own contractor
- Landlord email names vary (Rowan/Leo/Felix); treated as same landlord thread

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord-approved, landlord's own contractor working since 20 Nov; completion not yet confirmed in writing; invoice paid direct by landlord (to be confirmed).

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for written completion confirmation and direct payment; email update to the tenant; hold to 15 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on confirmation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"existing thread (event 027 email)","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Awaiting written confirmation of completion and land… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
_None._
