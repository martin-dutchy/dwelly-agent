# Case 030: Plumbing request: slow-filling toilet and bathroom tap: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked us to let the contractor in with the office key without the tenants. We refused: no right of entry from holding keys, and 24h written notice is needed. We asked the tenants for access and contact details, asked the contractor to confirm the date and company, and set a review for 16 Oct.

## Where the case stands
Provider assigned, visit not booked. Contractor says "Monday 20th PM" (20 Oct is a Sunday), unconfirmed. Tenants not yet reached. Landlord asked us to enter with the spare key without the tenants; declined.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenants for best contact number/times and access preference; tell them the date is unconfirmed and we won't enter without agreement | Amelia Ingram & Amelia Dawson, tenants | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask contractor to confirm exact date/window and which company is attending; no entry without tenant agreement | Sawyer, contractor | email | A3 ✅ |
| 3 | OTHER | Decline the landlord's request to enter with the office key without notice or consent, and explain next steps | Freya, landlord | email | A1 ✅ |
| 4 | WAIT | Review on 2024-10-16 for tenant reply and contractor confirmation, then set_visit and give 24h written notice | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Freya (landlord) via email, existing thread (event 021 email)** (verified)

> Hi Freya, thanks for your note. I'm sorry, but we can't let the contractor in with the office key without the tenants' agreement. Holding a key doesn't give us a right of entry, and we must give 24 hours' written notice for a routine visit. Entering without that could be unlawful for both of us. Nothing is urgent here (slow-filling toilet and a basin cold tap, with the toilet still flushing). What we're doing: asking the tenants in writing to confirm access, and asking the contractor to confirm the visit date and who is attending. We'll update you by Thursday 17 October.

**A2 · send_message → Amelia Ingram & Amelia Dawson (tenant) via email, existing thread (event 007 email to tenants)** (verified)

> Hello Amelia and Amelia, the plumber has tried to reach you about the slow-filling toilet and basin cold tap and left a voicemail. They've told us they hope to visit on the afternoon of the 20th, but that date isn't confirmed yet and we're checking it with them. Please could you reply with the best phone number and times to reach you, and whether you'll be home for the visit or would like us to arrange access another way. We will not enter without your agreement and written notice. Please also tell the plumber about your pets. You'll hear from us again by Thursday 17 October.

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 020 email)** (verified)

> Hi Sawyer, thanks for the update. Please can you confirm the exact date and time window? You wrote "Monday 20th", but 20 October 2024 is a Sunday (Monday is the 21st). Also please confirm which company is attending, as our records show Riverside Works / Willow Services and a call came in from Keystone Solutions. We haven't yet agreed access with the tenants and have asked them to confirm. Please don't enter without their agreement; we'll tell you once they've replied. Tenants have pets. We'll confirm the visit once you've confirmed the date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no date is confirmed
- Messages do not give access or notice of entry
- Nothing here establishes the cause of the fault or who pays

## Remaining work
- Tenant access reply (agency, review 16 Oct)
- Contractor to confirm date and company (agency chasing)
- set_visit and 24h written notice once confirmed
- Result, invoice and close after the visit

## Missing or unavailable information
- Tenants' reply and best contact number
- Contractor's confirmed date and company identity
- Landlord's earlier approval was only a thumbs-up emoji; the system line recorded approval

## Conflicts between sources
- Contractor's 'Monday 20th' vs calendar (20 Oct 2024 is a Sunday)
- Contractor named as Riverside Works, Willow Services and Keystone Solutions
- Two different tenant contact numbers in events 008 and 012
- Landlord says tenant isn't answering; contractor left a voicemail and the tenants have not been written to since 2 Oct

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine plumbing job with a provider assigned but no confirmed visit. Outstanding: tenant contact and access agreement, contractor's confirmed date and company, then notice.

**2. What is the next action, who is it for, and through which channel?**

Emails to the tenants (access/contact), the contractor (confirm date/company), and the landlord (declining entry without consent), plus a follow-up on 16 Oct.

**3. Does anything need a human decision, and why?**

No. The landlord's request is unlawful and was declined by process. A human is needed only if the tenants refuse access repeatedly or stay silent after chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"030","bo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Amelia Ingram & Amelia Dawson","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email to… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"030",… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"030","due_on":"2024-10-16","party":"Tenant and contractor","purpose":"Check tenant access reply and contractor's confirmed da… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
