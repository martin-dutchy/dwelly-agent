# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

CP12 is valid until 16 Oct 2026 but the tenant hasn't responded to two contacts. I opened JOB-101, assigned HeatRight (the gas contractor on file) for 14 Oct, gave the tenant written notice on all three channels, and asked the landlord to approve cost and informed him of the deadline.

## Where the case stands
JOB-101 at visit stage: HeatRight booked Wed 14 Oct 9-12 (agency-assigned window, not yet provider-confirmed). Tenant notified by email, SMS, letter; no reply yet. Landlord approval of cost requested. Follow-up 13 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked HeatRight for 14 Oct 9am-12pm | HeatRight Ltd, contractor | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Written 24h+ notice by email of the visit and how to rearrange | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Same notice by SMS | Luca Bianchi, tenant | sms | A5 ✅ |
| 4 | REPLY_TO_TENANT | Same notice by letter | Luca Bianchi, tenant | letter | A6 ✅ |
| 5 | REQUEST_LANDLORD_APPROVAL | Told Ben the deadline, date booked, steps taken; asked cost approval up to £300 | Ben Hartley, landlord | email | A7 ✅ |
| 6 | WAIT | Review tenant access on 13 Oct | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is due before 16 October. This is written notice that a Gas Safe engineer from HeatRight Ltd plans to visit on Wednesday 14 October, 9am-12pm. Please be home or tell us if someone else can let them in. If that time doesn't suit, reply or call us with another time before 16 Oct and we'll rearrange; we won't enter without your agreement. Doing the check now keeps the same yearly renewal date, and you'll get a copy of the record within 28 days. We'll also send this by text and letter.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, written notice: a Gas Safe engineer (HeatRight Ltd) will visit for your gas safety check on Wed 14 Oct, 9am-12pm. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check is due before 16 October. This is written notice that a Gas Safe engineer from HeatRight Ltd plans to visit on Wednesday 14 October, 9am-12pm. Please be home or arrange for someone to let them in. If the time doesn't suit, contact us before 16 October and we'll rearrange. You'll receive a copy of the record within 28 days.

**A7 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Gas safety check by HeatRight Ltd booked Wed 14 Oct 9am-12pm (certificate expires 16 Oct). We don't hold a price; please approve the cost up to your £300 limit, or tell us if you'd rather use another engineer. The deadline doesn't move. Tenant hasn't replied to emails/SMS of 25 Sep and 2 Oct; we've sent written notice by email, SMS and letter. Booking early keeps the anniversary date; tenant gets a copy within 28 days. Entry only with tenant's agreement; if access fails we'll update you straight away. (£300)
> 
> Options: Approve HeatRight Ltd up to £300 inc VAT (recommended); Use your own Gas Safe engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not give right of entry; no entry without tenant agreement.
- Does not renew the certificate until the check is done and a new CP12 issued.
- Cost not yet approved or known.

## Remaining work
- Agency: review 13 Oct; if tenant silent, try other contact and tell landlord; escalate P2 if access can't be agreed before 16 Oct.
- Landlord: approve cost.
- HeatRight: confirm the slot and price.

## Missing or unavailable information
- Tenant agreement to the date
- HeatRight price and confirmation of the slot
- No property record available via get_property

## Conflicts between sources
- Legacy note 'gas cert renewed 2025' agrees broadly with the CP12 issue date but carries no detail; compliance.json trusted.
- get_property found no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, currently compliant: the CP12 issued 2025-10-17 expires 2026-10-16 (Gas Safe 550123, matching HeatRight). I trust the compliance record (structured, dated, with file) over the legacy note 'renewed 2025, all good', which is vague hearsay and gives no dates. Compliance lapses after 16 Oct if not renewed.

**2. What steps do you take to get access lawfully before expiry?**

Prior email and SMS got no reply, so I booked HeatRight for Wed 14 Oct 9-12 (more than 24h away, before expiry) and gave written notice by email, SMS and letter explaining how to rearrange. No entry without the tenant's agreement. Follow-up 13 Oct; further contact and escalation if still silent.

**3. What do you tell the landlord?**

Addressed to Ben: certificate expires 16 Oct, tenant unresponsive, HeatRight booked 14 Oct, notices sent on three channels, cost approval requested up to his £300 limit (or his own engineer), early booking keeps anniversary date, tenant gets a copy within 28 days, and we'll update him if access fails.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-14 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-14 09:00","slot_text":"Wednesday 14 Oct, 9am-12pm","access":"tenant_home","confirmed_by":"assign… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Gas safety check by HeatRight Ltd booked Wed 14 Oct 9am-12pm (certificat… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-13","purpose":"Check tenant reply/access for 14 Oct gas check; if none, try alternative contact an… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
