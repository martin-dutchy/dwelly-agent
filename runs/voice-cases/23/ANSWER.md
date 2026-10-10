# Case 23: Gas smell after a failed identity check (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** emergency

A gas smell was reported by Jonah Okafor (T-1002, vulnerable). The AI line failed ID because it checked the wrong record (T-1001, Amelia Clarke) and never ran find_tenant; his DOB matches T-1002. I opened emergency job JOB-101 and told the tenant, the landlord and Bow Gas (Gas Safe). E-4901 is invalid; E-4902 is valid and stays open.

## Where the case stands
Emergency gas job JOB-101 open at intake. Tenant told to stay out and call NGES; Bow Gas asked to confirm attendance after NGES. Waiting on tenant welfare reply and Bow Gas confirmation; follow-up today. E-4902 stays open; E-4901 invalid.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety advice, apology, welfare check request sent by SMS and email | Jonah Okafor, tenant | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Same message by email (his preferred channel) | Jonah Okafor, tenant | email | A3 ✅ |
| 3 | OTHER | Told landlord of gas emergency same day | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | CHASE_PROVIDER | Asked Gas Safe contractor to confirm out-of-hours attendance after NGES | Bow Gas & Heating | sms | A5 ✅ |
| 5 | WAIT | Same-day follow-up on welfare, NGES attendance and engineer booking | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, Northbridge here. Sorry about the identity check trouble on the call, that was our error, not yours. Please stay out of the flat, don't use switches or flames, and call the National Gas Emergency line on 0800 111 999 now if you haven't (999 if in immediate danger). We've opened an emergency job and are arranging a Gas Safe engineer to find and fix the fault once the gas service has made it safe. Please reply to tell us you're OK and when the gas service has been. We'll update you again today. Your other worries (e.g. the stiff front door lock, R-4766) we'll follow up separately; tell us what else you've noticed.

**A3 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry about the identity check problem on today's call, it was our mistake (the system checked the wrong record). Please stay out of the flat, avoid switches and flames, and call the National Gas Emergency line on 0800 111 999 if you haven't yet (999 if in immediate danger). We've opened an emergency job, JOB-101, and are arranging a Gas Safe registered engineer to find and repair the fault once the gas service has made things safe. If the supply is capped we'll look at temporary heating and hot water. Please reply to confirm you're safe and when the gas service attended. We'll update you again today. Tell us what else you think is broken and we'll log it; the stiff front door lock is already open as R-4766.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, today (10 Oct) your tenant at 27 Bethnal Green Road reported a strong smell of gas in the kitchen. He has left the flat and was told to call the National Gas Emergency line. Under your standing emergency approval we are arranging a Gas Safe registered engineer (Bow Gas & Heating) to find and repair the fault once the gas service has made it safe. The tenant is noted as vulnerable, so we are checking on his welfare. We'll update you when the engineer has attended.

**A5 · send_message → Bow Gas & Heating (contractor) via sms, +447700900321** (verified)

> Northbridge emergency: reported gas smell in kitchen, 27 Bethnal Green Road E1 6LA (JOB-101). Tenant has left and was told to call NGES. Landlord's emergency approval applies. Please confirm today whether you can attend out of hours as soon as NGES has made safe, and your arrival time. Tenant is vulnerable.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No engineer visit is booked yet; nothing confirms NGES has attended.
- Cause of the gas smell is unknown.
- The next-week general check is not booked; no other faults identified yet.

## Remaining work
- Maintenance: confirm Bow Gas slot via assign_contractor/set_visit once they confirm and NGES has attended; keep E-4902 open until then.
- Check welfare today and consider temporary heating/hot water if supply capped.
- Log other faults tenant lists; lock job R-4766 still at init.
- Close E-4901 as invalid; AI phone line should use find_tenant first (process feedback).

## Missing or unavailable information
- Whether the tenant called NGES and whether NGES has attended
- Bow Gas availability
- Which other faults the tenant is worried about

## Conflicts between sources
- AI line verified against T-1001 (Amelia Clarke, DOB 1991-03-14) but the caller is T-1002 Jonah Okafor, DOB 1985-11-02 in CRM; trusted the CRM tenant record.

## Answers to the case questions
**1. What is the situation and most urgent thing?**

Possible gas leak at 27 Bethnal Green Road with a vulnerable tenant. Most urgent: make sure he is outside and has called NGES 0800 111 999, then get a Gas Safe engineer. Safety advice was given on the call; I re-sent it and asked him to confirm he is safe.

**2. Are E-4901 and E-4902 both valid?**

No. E-4901 is invalid: the check ran against the wrong record (T-1001), the caller is T-1002 and his DOB matches. E-4902 is valid P1 and stays open until the gas job is progressed.

**3. Actions in next hour and who is told?**

Created JOB-101; messaged tenant by SMS and email; emailed landlord (same-day, emergency pre-approved); messaged Bow Gas to confirm attendance after NGES; noted E-4901 invalid; scheduled a same-day follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"gas","severity":"emergency","tenant":"T-1002","description":"Tenant Jonah Okafor reported a strong smell of … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"JOB-101","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Bow Gas & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900321","ticket_ref":"JOB-101","body":… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `update_ticket` | {"ref":"E-4901","note":"Invalid: AI line verified against T-1001 (Amelia Clarke) without find_tenant. Caller's DOB matches T-1002 Jonah Okaf… | 1 | ❌ failed | Ticket E-4901 not found on read-back |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-10","purpose":"Same-day welfare check and confirm NGES attended and Bow Gas booked; escalate if no… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A8 | `add_note` | {"entity":"E-4901","note":"Invalid: AI line verified against T-1001 (Amelia Clarke) without find_tenant. Caller's name/DOB match T-1002 Jona… | 1 | ✅ verified | NOTE-107 found in the add_note log |

## Failed or unverified actions
- A6: update_ticket on E-4901 not found (it is an escalation, not a ticket); recorded the note via add_note instead (A8).
