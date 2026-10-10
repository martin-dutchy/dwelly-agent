# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval recorded. The booked date was inconsistent (Saturday vs Monday) and unconfirmed by the provider, and a different contractor name appeared. Asked the provider to confirm, told the tenant the date is unconfirmed, and set a follow-up for 27 Aug.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance (event 009). Visit date NOT confirmed: system recorded 30/08/2025 (a Saturday) while the text says Monday 10-12; the tenant only tentatively agreed and was to text back. Waiting on the provider to confirm date and identity.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm exact visit date/time (30/08 is a Saturday, not Monday) and whether Riverside Works/Isaac Palmer is attending | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Clara the date in our earlier email was wrong and is unconfirmed; next update by 27 Aug | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on provider confirmation 27 Aug, then set_visit and notify tenant | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please ignore the appointment in our last email as confirmed. It said "Monday morning (30/08/2025)", but 30/08/2025 is a Saturday, and the tenant has only agreed a tentative Monday 10-12 slot so far. Please reply with the exact date and time you can attend (Monday 1 September 10-12 if that works) so we can confirm it with the tenant. Also, our records show a call from Isaac Palmer of Riverside Works about this job, but the job was assigned to Keystone Compliance. Please confirm who is attending. The tenant's contact number on the job email was 07700 900721; the number in the last email was 07700 900077 (enter the code when calling). Any quote must come to us for landlord approval before work starts. Thank you.

**A3 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, the landlord has approved an engineer looking at the oven. Sorry, our last email gave a date that is wrong: it said Monday 30/08/2025, but that is a Saturday. So far only a tentative Monday morning 10-12 visit has been discussed, and it is not confirmed yet. We have asked the contractor to confirm the exact date and time, and we will update you once they do. If you have already texted them to agree or change a time, please tell us. We will be in touch by end of Wednesday 27 August at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; nothing confirms the date.
- Landlord's 'Yes go ahead' has no spend cap; it does not approve any quote.
- Does not establish the cause of the oven fault.

## Remaining work
- Provider confirms date and identity; then set_visit and tell tenant (agency)
- Visit result, any quote to landlord for approval
- Invoice and close

## Missing or unavailable information
- Provider-confirmed visit date
- Whether Riverside Works or Keystone attends
- Correct tenant name and phone number
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but events say Monday
- Contractor Riverside Works (Isaac Palmer) in call vs Keystone Compliance assigned
- Tenant named Ruben Oakley, Clara, Grace Mercer, Harriet Fletcher in different events
- Two tenant phone numbers (07700 900721 vs 07700 900077)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; provider assigned; the visit is tentative and the date is inconsistent. Provider confirmation, the visit and the result are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm the date and identity (A2); email to Clara saying the date is unconfirmed (A3); follow-up on 27 Aug (A4).

**3. Does anything need a human decision, and why?**

No. This is routine and can be resolved with the provider's confirmation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025","conditions":"Approval … | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"NBL-026","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026","due_on":"2025-08-27","party":"Keystone Compliance","purpose":"Check provider confirmed visit date (Monday 1 Sept?) … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
