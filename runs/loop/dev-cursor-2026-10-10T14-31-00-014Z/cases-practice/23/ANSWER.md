# Case 23: Gas smell after a failed identity check (AI phone line): ANSWER

**Decision:** escalated · **Severity:** emergency

Jonah Okafor (T-1002, vulnerable) reported a gas smell and says he left the flat. The identity failure was an AI-line error: it checked him against T-1001 (Amelia Clarke) and never ran find_tenant. I raised an emergency gas job, assigned Bow Gas & Heating, messaged the tenant and landlord, and escalated P1 with a follow-up today.

## Where the case stands
JOB-101 emergency gas job at visit stage; Bow Gas & Heating assigned for 14:00-18:00 today (window set by us, provider ETA not yet confirmed). Waiting on tenant welfare reply, NGES attendance confirmation and contractor ETA. R-4766 lock job still at init.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Emergency Gas Safe engineer assigned to JOB-101 for today | Bow Gas & Heating, contractor | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, apology for ID error, welfare/symptom question sent by email (preferred) and SMS | Jonah Okafor, tenant | email | A4 ✅ |
| 3 | OTHER | Told landlord of gas emergency same day | Margaret Ellison, landlord | email | A5 ✅ |
| 4 | ESCALATE_TO_HUMAN | P1 handover: phone tenant and contractor, confirm NGES attended, close E-4901 as invalid, flag AI-line defect | internal, maintenance | internal | A7 ✅ |
| 5 | WAIT | Follow-up today to confirm safety, attendance and heating/hot water | internal | internal | A9 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Northbridge. Sorry about the identity mix-up on the call, that was our error, not yours. Please stay outside the flat and don't use switches, flames or the cooker. If you haven't yet, call the National Gas Emergency line on 0800 111 999 (999 if anyone feels unwell). We've asked our Gas Safe engineer (Bow Gas & Heating) to attend today to find and fix the fault once the gas is made safe; target is today, we'll confirm the time. Are you ok, and any headache, dizziness or nausea? Please reply. We'll also look at your front door lock and other worries separately. We'll update you by email this afternoon.

**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry about the identity check problem on today's call: our phone line looked you up wrongly, and that was our fault. Safety first: please stay out of the flat, don't use switches, flames or the cooker, and call the National Gas Emergency line on 0800 111 999 if you haven't already (999 if anyone feels unwell). The National Gas Emergency service makes the supply safe but doesn't repair appliances. We have asked Bow Gas & Heating, a Gas Safe registered firm, to attend today to find and fix the fault; our target is same day and we'll confirm the time. If the gas is capped you may be without hot water or heating, so tell us and we'll look at temporary options. Please reply to say you're safe and whether anyone has headaches, dizziness or nausea. We'll also arrange someone to look at your stiff front door lock (already logged) and any other concerns: reply with what you think is broken. We'll update you again this afternoon.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, gas emergency at 27 Bethnal Green Road: the tenant reported a strong gas smell in the kitchen today (10 Oct, 12:46) and has left the flat and been told to call the National Gas Emergency line. Per your standing instruction for emergencies, we have asked Bow Gas & Heating (Gas Safe registered) to attend today to find and repair the fault. The tenant has anxiety so we are checking on his welfare and temporary heating/hot water if the supply is capped. We'll update you once the engineer reports; any repair cost will come back to you if it goes beyond emergency make-safe.

**A6 · send_message → Bow Gas & Heating (contractor) via sms, +447700900321** (verified)

> EMERGENCY gas call-out, 27 Bethnal Green Road, London E1 6LA (JOB-101). Tenant reported strong gas smell in kitchen at 12:46 today and has left the flat; he is a vulnerable occupant (anxiety). Please attend today (window 14:00-18:00 or sooner), make safe, find and repair the fault. Landlord approves emergency make-safe; any repair above that needs a quote to us first. Please confirm ETA by reply. Tenant's phone is on the job record.

## Escalation
- **P1 → maintenance** (verified): Gas smell at 27 Bethnal Green Road, vulnerable tenant; E-4902 valid. Also E-4901 is a false identity failure caused by AI line.
  - Known: 12:46 call-back: Jonah Okafor (T-1002, P-202) reports strong gas smell in kitchen; he told us he has left the property; advised 0800 111 999 by AI line (no confirmation he actually called NGES). Tenant vulnerable (anxiety, prefers email). Done by me: JOB-101 emergency gas ticket; Bow Gas & Heating (Gas Safe, out-of-hours) assigned 14:00-18:00 today, SMS sent; tenant messaged by SMS and email with safety advice and welfare/symptom question; landlord emailed. E-4901 cause: AI line verified against T-1001 (Amelia Clarke, other property) because find_tenant was never called; Jonah's details match T-1002 record. Open ticket R-4766 (stiff front door lock, init since 22 Sep) unrelated.
  - Missing: Whether NGES has attended / gas capped; tenant's welfare reply; Bow Gas ETA; where tenant is waiting; tenant's other repair concerns (he asked for a visit 'next week').
  - Options: Phone tenant and Bow Gas now to confirm attendance; If no response by 14:00, call NGES on tenant's behalf / consider 999 welfare check; Close E-4901 as invalid (system error); log AI-line defect
  - Recommendation: Human to phone tenant and Bow Gas (I cannot phone), confirm NGES attended and arrange temporary heating/hot water if capped. Close E-4901 as invalid; flag the AI line defect (wrong record lookup, repeated verification, no find_tenant) to management and review whether T-1001 data was exposed (it was not disclosed to caller).
  - Deadline: Today 14:00

## What this does not establish
- Assigning the engineer does not confirm the cause, NGES attendance or cost
- No confirmation yet the tenant called NGES or is safe
- Visit window is ours; the contractor has not yet confirmed it
- I could not phone anyone from this run
- E-4901 not closed by me: no tool; human to close

## Remaining work
- Human: phone tenant and Bow Gas, confirm NGES and capping, arrange temporary heating/hot water if needed (today)
- Human: close E-4901 as invalid and report AI line fault to management
- Triage R-4766 lock and tenant's other concerns after gas (routine/security)
- Gas Safe repair quote to landlord if above emergency make-safe

## Missing or unavailable information
- Tenant welfare/symptoms
- Whether NGES attended and capped supply
- Bow Gas ETA
- Tenant's other suspected faults

## Conflicts between sources
- AI line verified caller against T-1001 (Amelia Clarke, P-201) but the caller is T-1002; trusted the CRM T-1002 record, which matches name, DOB and the call-back number
- Tenant asked for a visit 'next week'; gas is same day, other concerns handled separately

## Answers to the case questions
**1. 1. What is the situation right now, and what is the most urgent thing to do?**

A vulnerable tenant reports a strong gas smell in the kitchen of 27 Bethnal Green Road and says he is outside. Most urgent: make sure he is safe and NGES (0800 111 999) is called, and get a Gas Safe engineer out the same day. No gas job existed; I created one.

**2. 2. Are E-4901 and E-4902 both valid? What do you do with each, and why?**

E-4902 (P1 gas) is valid and acted on. E-4901 (P3 identity failure) is not valid: the AI line verified against T-1001 (Amelia Clarke) instead of T-1002; his name and DOB 1985-11-02 match T-1002. It should be closed as a system error, with the defect flagged. Safety advice is never withheld for identity reasons, and no other tenant's data was disclosed.

**3. 3. What actions do you take in the next hour, and who do you tell?**

Created emergency job JOB-101, assigned Bow Gas & Heating (Gas Safe, out of hours), messaged the contractor, messaged the tenant by SMS and email with safety advice and an apology, emailed landlord Margaret Ellison, escalated P1 to maintenance with a handover, noted R-4766, and set a follow-up today.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"gas","severity":"emergency","description":"Tenant Jonah Okafor reported a strong smell of gas in the kitchen… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Bow Gas & Heating","visit_window":"2026-10-10 14:00-18:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"JOB-101","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Bow Gas & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900321","ticket_ref":"JOB-101","body":… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell at 27 Bethnal Green Road, vulnerable tenant; E-4902 valid. Also E-4901 is a false … | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |
| A8 | `add_note` | {"entity":"R-4766","note":"Gas emergency JOB-101 raised 10 Oct at same property. This lock job still at init since 22 Sep, no contractor; te… | 1 | ✅ verified | NOTE-107 found in the add_note log |
| A9 | `schedule_follow_up` | {"due_on":"2026-10-10","purpose":"Gas emergency JOB-101: confirm tenant is safe, NGES attended, Bow Gas ETA/attendance; arrange temporary he… | 1 | ✅ verified | FUP-108 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
