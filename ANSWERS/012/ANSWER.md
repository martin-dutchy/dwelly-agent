# Lock Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider Keypath says work was done on 19 Sept, but there is no appointment, attendance evidence or invoice, and the history contradicts it (no keys collected, tenant not found). I asked the contractor and tenant for evidence and confirmation, logged the unlogged bathroom mould as JOB-101, told the landlord, and set a 26 Sept follow-up.

## Where the case stands
NBL-012 still at init stage. Landlord authorised the agency provider (event 003). Work is claimed complete verbally only. The agency is waiting on Keypath (invoice, attendance details, photos) and on the tenant (confirmation). Follow-up is set for 2025-09-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Keypath for the invoice (PDF plus figures in the body), the attendance date, how access was gained, photos and key status, by 26 Sept | Edrin Moss, contractor | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant to confirm whether anyone attended and whether the locks work, whether the bedroom is secure, and for mould photos | Perrin Dall, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the landlord that completion is unverified and nothing will be paid or closed yet, and mention the mould job | Sella Marr, landlord | email | A6 ✅ |
| 4 | WAIT | Review on 26 Sept; if there is no evidence, escalate to maintenance/accounts and hold any payment | internal | internal | A5 ✅ |
| 5 | SPLIT_NEW_REQUEST | Log the bathroom mould as its own job | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Edrin Moss (contractor) via email, existing thread (event 021 email to Edrin Moss, Keypath Repairs)** (verified)

> - Please send the invoice by email as a PDF, with the amount and date typed in the message body, by end of Friday 26 September.
> - On what date and time did you attend Unit 2, 18 Brindlewick Mews, and how did you get in? On 17 Sept you said you had not collected management keys.
> - Which locks did you work on (bedroom sash, bathroom sash and buttons, kitchen sash key) and were keys supplied? Please send photos of the finished work and who holds the keys now.
> - Please confirm no further work or quote is needed.
> 
> Why: Work is reported complete only verbally; there is no recorded visit, attendance evidence or invoice, and dates conflict (18, 19, 25, 26 Sept). Nothing can be closed or paid without evidence.

**A3 · request_information → Perrin Dall (tenant) via email, existing thread (event 019 email from Perrin Dall)** (verified)

> - Has anyone attended your flat to work on the window locks (the contractor says on Friday 19 September), and do the bedroom, bathroom and kitchen windows now lock and open properly with keys?
> - Is your bedroom window secure right now? If not, please tell us and we will treat it as a priority.
> - About the bathroom mould you mentioned: please send a photo if you can, and tell us whether any children or anyone vulnerable lives there.
> 
> Why: Contractor claims completion without evidence; tenant confirmation and security status needed. Mould also now logged as its own job.

**A6 · send_message → Sella Marr (landlord) via email, agency landlord record** (verified)

> Update on the window lock job at Unit 2, 18 Brindlewick Mews. The contractor (Keypath Repairs) says by phone that the work was finished on 19 September, but we have no appointment record, visit notes or invoice, and they earlier said they hadn't collected keys. So we have not treated it as complete. We've asked them for the invoice, the attendance date and photos, and asked the tenant to confirm the locks work. We will not pay or close anything until that is checked, and will update you after 26 September. Separately, the tenant mentioned bathroom mould; we've logged it as its own job and are asking for photos.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done, who attended or when.
- No payment approved and the ticket is not closed.
- The mould job is only logged; its cause and landlord approval are not established.

## Remaining work
- Obtain the invoice, attendance evidence and photos from Keypath.
- Get tenant confirmation that the locks work and keys are supplied.
- Triage mould job JOB-101 with the tenant's answers.
- Escalate if there is no evidence by 26 Sept.

## Missing or unavailable information
- Actual visit date and how access was gained
- Invoice
- Tenant confirmation
- Mould extent and occupants

## Conflicts between sources
- Dates conflict: 18 Sept (tenant offer, event 017), 19 Sept (claimed completion, event 023), 25 and 26 Sept (invoice promises).
- Edrin said on 17 Sept that no keys were collected and the tenant was not in, yet claims completion on 19 Sept.
- Hearthline (Tarin) said a time was agreed after the job was reassigned to Keypath.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord authorised our provider. The contractor claims verbally that the work was done on 19 Sept. There is no appointment, attendance record, invoice or tenant confirmation, and the history contradicts the claim. Mould was never logged.

**2. What is the next action, who is it for, and through which channel?**

Request evidence from Edrin Moss by email, request tenant confirmation from Perrin Dall by email, and update the landlord Sella Marr by email. Follow-up on 26 Sept.

**3. Does anything need a human decision, and why?**

Not yet. Escalate to maintenance/accounts if no invoice or evidence arrives by the 26 Sept review, or if the invoice does not match.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ","category":"damp_mould","severity":"routine","description":"Tenant Perrin Dall me… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_information` | {"recipient_name":"Edrin Moss","recipient_role":"contractor","channel":"email","contact":"existing thread (event 021 email to Edrin Moss, Ke… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Perrin Dall","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email from Perrin Dall)","… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A4 | `add_note` | {"entity":"NBL-012","note":"Route: landlord authorised agency provider (event 003, no limit). Provider changed from Hearthline to Keypath (E… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2025-09-26","party":"Edrin Moss / Perrin Dall","purpose":"Check invoice, attendance evidence and tenant co… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A6 | `send_message` | {"recipient_name":"Sella Marr","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-012","body… | 1 | ✅ verified | MSG-106 found in the send_message log |

## Failed or unverified actions
_None._
