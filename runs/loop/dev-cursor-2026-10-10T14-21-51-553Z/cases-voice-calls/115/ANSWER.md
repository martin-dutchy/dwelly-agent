# Case 115: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is approved by the landlord, but the visit date is unreliable: it is labelled Monday yet dated Saturday 30/08, the provider never firmly confirmed it, and the tenant can't do Monday. I told Keystone not to attend that date and asked for a real one, asked Clara for her availability, and set a follow-up for 1 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance. The visit date is unconfirmed and unreliable (labelled Monday but dated Saturday 30/08). The tenant can't do Monday. Waiting on the provider for a real date and the tenant for availability.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Tell Keystone not to attend the ambiguous date; ask for an actual available date and confirmation of company identity | Keystone Compliance, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Explain the date is unconfirmed, ask for her availability, and say when she will next hear from us (by 2 Sept) | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up 1 Sept; set_visit only once the provider confirms a date | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our earlier emails said "Monday morning (30/08/2025)", but 30/08/2025 is a Saturday, so the date is unclear. The tenant has also told us she cannot do Monday morning as she is at work. Please do not attend on the date in our earlier emails. Please reply with the date and time you can actually offer, and we will agree it with the tenant before it is confirmed. Please also confirm which company you are, as the call notes mention Riverside Works.

**A3 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, sorry we lost you on the call. Our earlier messages gave the visit as "Monday morning (30/08/2025)", but 30/08 is a Saturday, so that date isn't reliable, and it was never firmly confirmed by the engineer. Please don't plan around it. We've asked Keystone Compliance for a date they can really do. Could you tell us which days and times suit you best, including any weekday early mornings, evenings or Saturdays? We'll get a firm date agreed with the engineer and confirm it to you, and we'll update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or confirmed by these actions
- Landlord approval covers sending Keystone only; it sets no spend cap and agrees no quote
- Cause of the oven fault and who pays are not established

## Remaining work
- Provider to reply with a real date (agency, by 1 Sept)
- Tenant to give availability
- set_visit after provider confirmation
- Visit result, quote or invoice if needed
- Tell the landlord the outcome

## Missing or unavailable information
- Provider-confirmed visit date
- Tenant availability
- Oven make and model
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but events say Monday
- Provider named Keystone Compliance, Riverside Works and Lantern Utilities
- Tenant named Clara Hughes, Ruben Oakley, Grace Mercer and Harriet Fletcher
- Two different contact numbers for the tenant/provider
- Hold 'Waiting for Landlord' remains although the landlord replied; approval is treated as current
- Tenant failed one DOB check on the call before passing; identity was not otherwise needed for this action

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Landlord approved ('Yes go ahead'). The visit is not properly confirmed: the date is inconsistent and the tenant can't attend. Outstanding: a provider-confirmed date that suits the tenant.

**2. What is the next action, for whom, by which channel?**

Email Keystone Compliance for a real date (sent) and email Clara for her availability (sent). Follow-up on 1 Sept.

**3. Does anything need a human decision?**

No. This is routine rescheduling. If the provider identity mismatch stays unresolved, revisit then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-115","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08, reply to request to send Key… | 1 | ✅ verified | Ticket NBL-115 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","ticket… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `update_ticket` | {"ref":"NBL-115","note":"Visit not firmly confirmed by provider: event 016 tentative \"Monday 10-12\" (tenant to confirm); events 017-020 sa… | 1 | ✅ verified | Ticket NBL-115 read back at stage visit |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-115","due_on":"2025-09-01","party":"Keystone Compliance / Clara","purpose":"Check provider has replied with a real date a… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
