# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored three contacts. I opened JOB-101, assigned HeatRight (Gas Safe 550123) for 13 Oct, sent the tenant written notice by email, SMS and letter, and asked Ben to approve the cost. Follow-up set for 12 Oct.

## Where the case stands
JOB-101 at visit stage, HeatRight assigned for 13 Oct 09:00-13:00. Waiting on tenant to confirm access and landlord to approve cost. Review 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas safety check 13 Oct 9am-1pm | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of visit by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | REPLY_TO_TENANT | Notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | REQUEST_LANDLORD_APPROVAL | Told Ben the deadline, booking and steps; asked cost approval up to £300 | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review tenant confirmation and landlord approval on 12 Oct; escalate before 16 Oct if no access agreed | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We have booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October, between 9am and 1pm. This is your written notice of the visit. It takes about 30-60 minutes and someone over 18 should be home. If that time doesn't suit, just reply or call with another time before 16 October and we'll rearrange. We won't enter without your agreement. You'll get a copy of the record within 28 days of the check. Please reply to confirm. We'll also send a letter and text.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-1pm, HeatRight Ltd. Please reply to confirm, or give us another time before 16 Oct. We won't enter without your agreement.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: your annual gas safety check is due before 16 October 2026. HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026 between 9am and 1pm. Someone over 18 should be present. To rearrange, please contact us before 16 October. We will not enter without your agreement. A copy of the record will be given to you within 28 days.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Gas safety certificate expires 16 Oct 2026. Tenant hasn't replied to emails (25 Sep, 2 Oct) or SMS. We booked HeatRight Ltd for Tue 13 Oct 9am-1pm and sent the tenant written notice by email, SMS and letter. The cost isn't yet confirmed; please confirm you're happy for it to go ahead (your limit on file is £300 inc VAT; we'll come back to you if it's higher). The deadline doesn't move. If the tenant doesn't agree access we can't enter; we'll update you by Monday 12 Oct.
> 
> Options: Approve HeatRight Ltd gas safety check up to £300 inc VAT (recommended); Arrange your own Gas Safe engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not guarantee access; no entry without tenant agreement
- Cost not yet known or approved
- Does not renew the certificate until the check is done

## Remaining work
- Confirm tenant access by 12 Oct (agency)
- Landlord approval (Ben)
- Record result and send tenant copy of CP12 within 28 days
- If no access, escalate to compliance/legal before 16 Oct

## Missing or unavailable information
- Tenant has not responded to any contact
- Cost of check unknown
- No property record in system

## Conflicts between sources
- get_property returned no record for P-230; relied on case inputs.
- Legacy note says cert renewed 2025; compliance record (trusted) gives dates.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, for now. The CP12 issued 2025-10-17 is valid until 2026-10-16 (compliance.json, current system record with engineer Gas Safe 550123). The legacy note 'gas cert renewed 2025, all good' is vague hearsay from the old agency; it is consistent but I did not rely on it. Compliance lapses after 16 Oct without a new check.

**2. What steps do you take to get access lawfully before expiry?**

Booked the contractor on file, HeatRight, for 13 Oct 9am-1pm, at least 24h ahead and with spare days before expiry. Gave written notice by email, SMS and letter, with a way to rearrange. No entry without the tenant's agreement. Follow-up on 12 Oct; if still no response, escalate to a human for further lawful steps (more contact attempts, rebooking).

**3. What do you tell the landlord?**

Told Ben the expiry date, the booking, the three notices sent to the tenant, that the deadline does not move, that we cannot enter without the tenant's agreement, and asked him to approve the cost (limit £300) with an update by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Gas safety certificate expires 16 Oct 2026. Tenant hasn't replied to ema… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Luca Bianchi / Ben Hartley","purpose":"Check tenant confirmation of 13 Oct gas visit … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
