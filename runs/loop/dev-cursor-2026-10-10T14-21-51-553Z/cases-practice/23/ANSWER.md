# Case 23: Gas smell after a failed identity check (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** emergency

Tenant Jonah Okafor (T-1002) reported a gas smell. The AI line checked him against the wrong record (T-1001, Amelia Clarke), so verification failed, and then escalated twice. I opened emergency JOB-101, assigned Gas Safe firm Bow Gas & Heating for today, messaged the tenant by SMS and email, told the landlord, and noted E-4901 as our error.

## Where the case stands
JOB-101 emergency gas ticket at visit stage, Bow Gas & Heating assigned for 14:00-18:00 today. Awaiting tenant's confirmation he is outside and well, NGES attendance, and engineer attendance. R-4766 still open at init.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Gas Safe engineer Bow Gas & Heating for today's emergency visit on JOB-101 | Bow Gas & Heating, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Sent safety advice, apology for ID error and timescale by SMS and email, asked him to confirm he is out and well | Jonah Okafor, tenant | email | A4 ✅ |
| 3 | OTHER | Told landlord of the gas emergency and the same-day Gas Safe instruction | Margaret Ellison, landlord | email | A5 ✅ |
| 4 | WAIT | Evening follow-up on welfare, NGES and engineer attendance | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Northbridge Lettings. Sorry about the identity mix-up on the call - that was our error, we had the wrong record and have now fixed it. Please stay out of the flat, don't use switches or flames, and if you haven't yet, call the National Gas Emergency line on 0800 111 999 (999 if anyone feels unwell). We have asked a Gas Safe engineer (Bow Gas & Heating) to attend today; we aim to get this made safe within 24 hours. Please reply to confirm you are outside and well, and tell us if you have a headache, dizziness or nausea. We'll also look at your stiff front door lock and anything else you're worried about. We'll update you by email later today.

**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry about the identity problem on today's call - our system checked the wrong record, which was our mistake, and it's now corrected. Safety first: please stay out of the flat, don't use switches, flames or the cooker, and call the National Gas Emergency line on 0800 111 999 if you haven't (999 if anyone feels unwell). We've asked Bow Gas & Heating, a Gas Safe registered firm, to attend today to find and fix the cause once the gas supply is made safe; our target is within 24 hours. If the gas is capped you may have no hot water or heating - tell us and we'll look at temporary options. Please reply to say you're outside and well. Your stiff front lock (R-4766) is already logged, and we'll ask about the other things you're worried about once the gas is sorted. We'll email again this evening.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, at 12:46 today your tenant at 27 Bethnal Green Road reported a strong smell of gas in the kitchen. He has left the property and was told to call the National Gas Emergency line. Per your standing instruction for emergencies, we've instructed Bow Gas & Heating (Gas Safe registered) to attend today to find and repair the fault; no approval is needed from you now, and we'll report cost and findings. The tenant has a disclosed vulnerability, so we are checking his welfare and temporary heating/hot water if the supply is capped. We'll update you once the engineer has attended.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Assigning the engineer does not mean the visit time is confirmed by the contractor or that NGES has attended
- Cause of the gas smell and cost are unknown
- E-4901 note does not itself close the escalation; a human should close it
- Lock ticket R-4766 not progressed

## Remaining work
- Confirm tenant safe and NGES attended (agency)
- Bow Gas to report findings and quote; update landlord and tenant
- Arrange temporary heating/hot water if gas capped (vulnerable tenant)
- Progress R-4766 lock and ask about other worries
- Human to close E-4901; E-4902 P1 stays open until gas made safe
- Fix AI line: call find_tenant before verifying

## Missing or unavailable information
- Whether tenant has called NGES and is well
- Bow Gas confirmation of visit window
- Whether a CO alarm or symptoms are present

## Conflicts between sources
- AI line verified against T-1001 (Amelia Clarke, P-201) but caller is T-1002 (P-202); current CRM matches name, DOB and callback number to T-1002, which I trusted
- Transcript shows the caller giving several DOB variants but settling on 2 Nov 1985, which matches T-1002

## Answers to the case questions
**1. What is the situation right now, and what is the most urgent thing to do?**

A vulnerable tenant has a strong gas smell in the kitchen and says he has left. The most urgent thing is to make sure he is out and has called NGES, and to get a Gas Safe engineer out today.

**2. Are E-4901 and E-4902 both valid?**

E-4902 (P1 gas) is valid and stays open until the supply is safe. E-4901 (P3 identity) is not valid: the AI line never called find_tenant and checked him against T-1001 (Amelia Clarke), while his name, DOB and number match T-1002. There is no identity problem, so it should be closed. Safety advice was rightly not withheld.

**3. What actions do you take in the next hour, and who do you tell?**

Created JOB-101 (emergency), assigned Bow Gas & Heating for 14:00-18:00, messaged the tenant by SMS and email with safety advice and an apology, emailed the landlord (emergencies pre-approved), noted E-4901 and R-4766, and set an evening follow-up. Also still to do: welfare check, temporary heating if capped, and the lock job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"gas","severity":"emergency","tenant":"T-1002","description":"Tenant reports strong smell of gas in kitchen (… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Bow Gas & Heating","visit_window":"2026-10-10 14:00-18:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"JOB-101","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `add_note` | {"entity":"E-4901","note":"Invalid/our error: AI line verified against T-1001 (another tenant, different property) without find_tenant. Call… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A7 | `add_note` | {"entity":"R-4766","note":"Open since 22 Sep at init, unassigned. Tenant on 10 Oct call asked for a visit next week and is worried other thi… | 1 | ✅ verified | NOTE-106 found in the add_note log |
| A8 | `schedule_follow_up` | {"due_on":"2026-10-10","purpose":"Evening check: tenant confirmed outside and well; NGES attended; Bow Gas engineer attended; temporary heat… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
