# Case 030: Plumbing request: slow-filling toilet and bathroom tap: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked us to let the contractor in with the office key tomorrow without tenant notice; we declined because holding a key gives no right of entry and 24h written notice is required. We asked the provider to confirm a date (20th is a Sunday) and company, asked tenants to call back and confirm access, and set a follow-up for 16 Oct.

## Where the case stands
Provider assigned, visit not booked. Contractor (Sawyer) says "Monday 20th PM", but the 20th is a Sunday. Tenants have not replied. Landlord asked us to use the office key tomorrow without involving the tenants.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenants to call the plumber back and confirm access; say the date is not yet confirmed and that 24h written notice will be given | Amelia Ingram & Amelia Dawson, tenants | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask provider to confirm exact date/slot (20th vs Monday 21st) and the company name | Sawyer, contractor | email | A3 ✅ |
| 3 | OTHER | Decline entering with the spare key without tenant notice and explain the 24h notice rule | Freya, landlord | email | A1 ✅ |
| 4 | WAIT | Review on 2024-10-16 for provider date and tenant access reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Freya (landlord) via email, existing thread (event 021 email)** (verified)

> Hi Freya, thanks for your note. We can't let the contractor in with the office key tomorrow without the tenants knowing: holding a key doesn't give us the right to enter, and we must give them at least 24 hours' written notice. The contractor has also told us they are looking at a later date, not tomorrow. We are now emailing the tenants and asking them to confirm access, and we are asking the contractor to confirm the exact date. If the tenants agree, or after proper written notice, we will use the key and let you know. We'll keep you updated.

**A2 · send_message → Amelia Ingram & Amelia Dawson (tenant) via email, existing thread (event 007 email)** (verified)

> Hello, the plumber has tried to reach you about the slow-filling toilet and bathroom tap and left a voicemail. Please call them back, or reply here with the best number and times to reach you. They are looking at the afternoon of Sunday/Monday 20th/21st, but this is not confirmed yet; we're checking the exact date with them and will confirm it in writing. Please also tell us whether you will be home for the visit or would like us to use our spare key. We will not enter without giving you at least 24 hours' written notice. Thank you.

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 020 email)** (verified)

> Hi Sawyer, thanks. Please confirm in writing the exact date and time slot: "Monday 20th" doesn't match the calendar (20th is a Sunday, Monday is the 21st). Please also confirm which company you are with, as our records show Riverside Works / Willow Services, and a Keystone Solutions caller also asked for a tenant callback. We are asking the tenants about access and will write to them with 24 hours' notice once the date is confirmed. Please don't enter without that confirmation.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; nothing here confirms a date, cause or cost.
- Messages do not constitute the formal 24h access notice; that follows once the provider confirms a date.
- The landlord's 👍 (event 010) was not treated as an approval decision.

## Remaining work
- Provider to confirm date and company; then set_visit and send 24h written notice to tenants (agency)
- Tenants to confirm access method
- Result, invoice and final checks after visit

## Missing or unavailable information
- Confirmed visit date/slot from provider
- Which company is attending (Riverside Works, Willow Services or Keystone Solutions)
- Tenant access preference and best contact times

## Conflicts between sources
- Contractor's 'Monday 20th' conflicts with the calendar (20th is a Sunday).
- Landlord wants entry 'tomorrow'; the contractor mentions the 20th.
- Contractor names differ: Riverside Works, Willow Services, Keystone Solutions.
- Two different tenant contact numbers in events 008 and 012.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, no confirmed visit. Outstanding: a provider-confirmed date, company name clarification, tenant access agreement and 24h written notice.

**2. What is the next action, who is it for, and through which channel?**

Emails sent: to the provider to confirm date and company, to the tenants to confirm access and call back, and to the landlord declining entry without notice. Follow-up set for 2024-10-16.

**3. Does anything need a human decision, and why?**

No. The landlord's request is declined under the access rules and the rest is routine chasing. Escalate only if the tenants stay unreachable after repeated attempts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"030","bo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Amelia Ingram & Amelia Dawson","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"030",… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"030","due_on":"2024-10-16","party":"Provider and tenant","purpose":"Check provider has confirmed visit date and company name,… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
