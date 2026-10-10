# Bedroom Window Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord is arranging his own contractor for the window. The tenant says "all jobs was done" but nothing from the contractor or landlord confirms it. The forwarded gas record is for a different property, so it was not filed. I asked the landlord and the tenant to confirm, and set a follow-up for 15 Sept. The ticket stays open.

## Where the case stands
Ticket NBL-009 is still at init. The landlord's own contractor route is in play. Completion is reported only by the tenant and is unverified. Waiting on the landlord (contractor details and completion), the tenant (confirmation the window seals) and Richard's report. Review 2025-09-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord which property the gas record was for, and to confirm window completion and contractor details by 12 Sept | Dorian Pike, landlord | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the window now closes and seals | Elena Voss, tenant | email | A3 ✅ |
| 3 | WAIT | Review replies on 15 Sept, then close or chase | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Dorian Pike (landlord) via email, agency landlord record** (verified)

> Hi Dorian, thanks for your email of 10 Sept. The gas safety record you forwarded is for a different address (8 Thistledown Mews), not 24 Bramblewick Lane, so we haven't filed it against this job. Could you tell us which property you meant? On the bedroom window at 24 Bramblewick Lane: the tenant says a contractor (Richard) has done the work after parts were ordered, and will send a report. Could you confirm by Friday 12 Sept that your contractor has finished, their company name, and whether they'll send the report and invoice to you or to us? We'll check with the tenant that the window now closes properly and update you.

**A3 · send_message → Elena Voss (tenant) via email, existing thread (event 020 email)** (verified)

> Hi Elena, thanks for letting us know, and sorry for the long wait. Just to be sure we close this properly: does the bedroom window now close fully and seal with no draught? And was it fixed by Richard, the contractor the landlord arranged? If it still doesn't close, tell us and we'll chase it straight away. We're also checking with the landlord and will update you by Monday 15 Sept.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages sent do not confirm the window is fixed.
- Nothing was filed, approved, paid or closed.
- No landlord decision was recorded, because he never gave one in words that could be quoted.

## Remaining work
- Landlord to confirm completion, contractor and report/invoice route, and which property the gas record meant (agency to chase by 15 Sept).
- Tenant to confirm the window seals.
- Obtain the contractor's report; settle who pays; then close.
- Event 011 EICR attachment not seen; its property is unchecked.

## Missing or unavailable information
- Contractor name, company and report
- Confirmation the window now closes and seals
- Which property the gas record was meant for

## Conflicts between sources
- Event 019 gas safety record is for 8 Thistledown Mews, Vellumby, not 24 Bramblewick Lane. I did not treat it as relevant to this job.
- Tenant says all jobs done (event 020) while the earlier tenant report (event 018) said parts still had to be ordered. No contractor or landlord confirmation.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The landlord is arranging his own inspection and contractor. The tenant was told parts were being ordered (event 018) and now says all jobs were done (event 020). Still unverified: that the window closes and seals, the contractor's identity and report, any invoice, and the EICR from event 011 (not seen). The gas record in event 019 is for 8 Thistledown Mews, not this property.

**2. What is the next action, who for, and through which channel?**

I emailed the landlord (MSG-102) asking which property the gas record meant, and to confirm completion, contractor name and report/invoice route by 12 Sept. I emailed the tenant (MSG-103) asking her to confirm the window now closes and seals. Follow-up set for 15 Sept.

**3. Does anything need a human decision?**

No. This is routine follow-up, and the property mismatch can be settled by asking the landlord. If there is no reply by 15 Sept, chase the landlord on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-009","note":"Route: landlord arranging own contractor/inspection (events 004, 014, 018). Tenant event 018: contractor said pa… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Dorian Pike","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-009","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Elena Voss","recipient_role":"tenant","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-009","due_on":"2025-09-15","party":"Dorian Pike / Elena Voss","purpose":"Check landlord confirmation of completed window … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
