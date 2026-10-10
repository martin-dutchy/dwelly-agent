# Gas record and boiler visit: ANSWER

**Decision:** escalated · **Severity:** urgent

The 9 Oct gas visit is marked satisfactory in Flintmere's job app, but no signed record has been issued. Flintmere's quality desk paused it over an appliance installation query, and the portal shows the document as "Processing". The tenant reports repeated boiler lockouts with no gas smell, and the landlord has not authorised a diagnostic. I escalated to compliance, asked the landlord for a yes/no on a diagnostic, chased Flintmere with a 21 Oct deadline, updated the tenant and set a follow-up.

## Where the case stands
Ticket NBL-002 at init. We are waiting on Flintmere (query detail and record date) and on the landlord (diagnostic decision). Compliance has the escalation. Review is due 21 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Chase Flintmere for the installation query detail and a signed record date by 21 Oct | Riva Morn, Flintmere | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether to authorise a lockout diagnostic (yes/no by 21 Oct) | Nessa Wold, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the record is not yet issued, give safety advice and the next update date | Iona Pell, tenant | portal | A5 ✅ |
| 4 | ESCALATE_TO_HUMAN | Compliance to own the gas record query | compliance team | internal | A1 ✅ |
| 5 | WAIT | Review on 21 Oct | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Nessa Wold (landlord)** (verified)

> Do you authorise a separate Gas Safe diagnostic of the boiler lockouts (cost to be quoted to you before any work)? Please reply yes or no by 21 October.
> 
> Options: Yes - arrange a diagnostic, quote to you first (recommended: four lockouts reported since 1 Oct); No - wait for Flintmere's paperwork first
> 
> Update: Outstanding from Flintmere: the signed gas safety record. Their portal shows the 9 Oct visit as complete and satisfactory but the document is still 'Processing'; their quality desk paused it over an appliance installation detail and gave no date. We are chasing them and have referred it internally. The previous record dated 16 Oct 2024 has reached its anniversary, so we want the new one issued soon; the tenant must receive a copy within 28 days of the check (by 6 Nov). The tenant reports a further lockout, no gas smell, and can give access after 21 Oct. No extra spend has been committed.

**A4 · send_message → Riva Morn (contractor) via email, existing thread (event 019 email)** (verified)

> Hello Riva, thanks for your update. Please tell us by Tuesday 21 October: (1) what the appliance installation detail query is and whether it raises any safety concern on the boiler or cooker; (2) the date the signed gas safety record for the 9 October visit will be issued. The tenant needs a copy within 28 days of the check, so by 6 November. Please also confirm whether the boiler lockouts reported since 1 October could be related. No additional work is authorised at this point.

**A5 · send_message → Iona Pell (tenant) via email, existing thread (event 022 portal)** (verified)

> Hi Iona, thanks for your updates. The item on file is only a portal screen showing the 9 October visit as complete and satisfactory; the signed gas safety record has not been issued yet because Flintmere is checking an appliance detail. We have asked them for the reason and a date by 21 October, and you must get your copy within 28 days of the visit (by 6 November). The boiler lockouts were not covered by that visit; we have asked your landlord whether a separate check can go ahead and will use your access after 21 October once agreed. Until then, if the boiler locks out, resetting it is fine, but please stop using it and ring 0800 111 999 straight away if you smell gas; if the lockouts continue, leave it off. Also make sure any carbon monoxide alarm works; if it sounds or anyone has a headache, dizziness or nausea, leave, open windows and call 0800 111 999 (999 if unwell). We'll update you by 21 October.

## Escalations
### 1. How to press Flintmere for the signed gas record and the installation query, and whether to bring in a second Gas Safe engineer → Compliance team
- Escalation: A1 ✅ verified · P2 → compliance: No signed gas safety record held; previous record (16 Oct 2024) has reached its anniversary; Flintmere has paused paperwork over an appliance installation query
- Known: Flintmere visit 9 Oct 2025 marked satisfactory in job app (events 009, 015, 019); portal export (gas-portal-record.pdf) shows customer document "Processing" so it is not a signed certificate. Flintmere quality desk paused issuing paperwork reconciling an appliance installation detail (event 019), no date given. Tenant reports 4 boiler lockouts since 1 Oct (events 003, 017, 022), no gas smell. Landlord has not authorised a diagnostic or extra spend (events 016, 023). Tenant must receive a copy within 28 days of the check (by 6 Nov 2025). Tenant can give access after 21 Oct.
- Missing: What the installation detail query is and whether it affects safety; whether the boiler lockout is linked; date the signed record will issue; landlord decision on diagnostic.
- Options: Press Flintmere formally by 21 Oct; Landlord authorises a diagnostic; Second Gas Safe engineer
- Recommendation: Chase Flintmere management and get landlord approval for a diagnostic in parallel
- Deadline: 2025-10-21
- Evidence: event 019; event 023; gas-portal-record.pdf
- Done before handover:
  - Chased Flintmere _(no ledger entry cited)_
  - Asked landlord for a decision _(no ledger entry cited)_
  - Updated tenant _(no ledger entry cited)_
  - Scheduled follow-up _(no ledger entry cited)_

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Flintmere / landlord | Review reply and decision | 2025-10-21 | A6 ✅ verified |

## What this does not establish
- The portal screenshot does not establish a valid signed gas safety record.
- 'Satisfactory' in the job app does not mean the installation query is resolved or that the lockouts are explained.
- Nothing has been booked or authorised; no spend is committed and no diagnostic is arranged.

## Remaining work
- Compliance: resolve the Flintmere query and obtain the signed record, with the tenant's copy due by 6 Nov.
- Landlord decision on a diagnostic; then book it with a Gas Safe engineer, with access after 21 Oct.
- Follow up on 21 Oct.

## Missing or unavailable information
- Nature of the installation detail query
- Date the signed record will issue
- Landlord decision on a diagnostic

## Conflicts between sources
- The portal record says Complete/Satisfactory but the customer document is Processing and Flintmere has paused the paperwork. I treated the record as not issued.
- The tenant's 21 Oct offer is access for a possible future visit, not a booked appointment; 9 Oct was the original visit.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The visit happened on 9 Oct and the job card is complete and satisfactory. The signed gas safety record has not been issued and is paused by Flintmere with no date. The portal screenshot is not a signed certificate. The previous record dated 16 Oct 2024 has reached its anniversary. The boiler lockouts are uninvestigated and the landlord has not approved a diagnostic. The tenant's copy is due by 6 Nov.

**2. What is the next action, for whom, and by which channel?**

Three actions were taken. (1) Flintmere (Riva Morn) was chased by email for the query detail and a record date by 21 Oct. (2) The landlord was asked by request_landlord_approval for a yes/no on a diagnostic by 21 Oct. (3) The tenant was updated on the existing portal thread with safety advice.

**3. Does anything need a human decision, and why?**

Yes. The compliance team has escalation ESC-101 (P2). The gas record is outstanding with an unexplained installation-detail query that could be a safety matter, and the landlord has restricted spend. Whether to press Flintmere hard or use a second Gas Safe engineer needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"compliance","reason":"No signed gas safety record held; previous record (16 Oct 2024) has reached its anniversary; … | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A2 | `update_ticket` | {"ref":"NBL-002","note":"Gas record not yet issued (portal shows Processing; Flintmere query paused paperwork). Lockout diagnostic not autho… | 1 | ✅ verified | Ticket NBL-002 read back at stage init |
| A3 | `request_landlord_approval` | {"landlord":"Nessa Wold","ticket_ref":"NBL-002","decision_needed":"Do you authorise a separate Gas Safe diagnostic of the boiler lockouts (c… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Riva Morn","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Iona Pell","recipient_role":"tenant","channel":"email","contact":"existing thread (event 022 portal)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"due_on":"2025-10-21","purpose":"Review Flintmere reply (query + record date) and landlord decision on diagnostic; update tenant","ticket_r… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
