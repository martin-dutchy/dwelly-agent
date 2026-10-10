# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant chased a dishwasher door fault that already has a visit booked for 29/04 8-12. I linked it to the existing job and opened no new one. I replied to the tenant, asked the provider to reconfirm, and set a follow-up for 29/04.

## Where the case stands
Stage: visit. Visit booked for 29/04/2026 08:00-12:00 with Riverside Compliance. The tenant's latest email is a repeat chase. Waiting on the provider to reconfirm and attend.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant the existing 29/04 8-12 visit stands and no new job was opened | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Asked the provider to confirm attendance on 29/04 and to confirm the engineer's identity | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Follow up on 29/04 to check attendance and record the result | Riverside Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer visit for the dishwasher is already booked on our record for Wednesday 29/04/2026, between 8am and 12. You don't need to do anything else, and we haven't opened a second job. The provider is Riverside Compliance (contact 07700 900410). We're confirming the slot with them today, and we'll email you tomorrow morning if anything changes. If you can't be home on Wednesday, please tell us and we'll rearrange.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, please could you confirm by reply that you are attending Flat 9, 89 Juniper Mews on Wednesday 29/04/2026 between 8am and 12 to inspect the dishwasher door, which still won't close. The call log names the caller as Grant from Cedar Utilities, so please confirm that is your engineer. If you need a quote before repairing, send it with photos and don't proceed until we approve it. Please reply by end of today.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply and chase do not confirm the provider's attendance or the cause of the fault.
- No repair or spend is approved. Any quote goes to the landlord first.
- The 29/04 date was agreed by a provider call, but the provider's name in that call differs from the record.

## Remaining work
- Provider to confirm the visit (agency)
- Record the visit result after 29/04
- If a quote is needed, send it to the landlord for approval

## Missing or unavailable information
- Provider written confirmation of the 29/04 slot and the engineer's identity

## Conflicts between sources
- Provider named as Riverside Compliance (record), Cedar Utilities (call log) and Harbour Homes (SMS). I trusted the system record and asked the provider to confirm.
- Tenant named as Leo Turner (record) and Leo Kendall (call log). I used the record name.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The troubleshooting failed and the landlord side agreed an engineer. A visit is booked for 29/04/2026 8-12. Still outstanding: the provider's reconfirmation, the visit result, and any quote.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant to say the visit stands (sent). Email Riverside Compliance to reconfirm (sent). Follow up on 29/04.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate chase. The name mismatches are being checked with the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-29","party":"Riverside Compliance","purpose":"Check provider confirmed the 29/04 … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 chases the same fault; visit 29/04 08:00-12:00 already booked. Treated a… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
