# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a charge-free warranty service, but Harbour now says the oven is out of warranty. I asked the landlord whether Harbour may attend and quote, asked Harbour to confirm the date and warranty facts, and told the tenant the date is unconfirmed. The ticket is on hold until 24 May.

## Where the case stands
Provider (Harbour Services) assigned; visit not confirmed (22 May by phone vs 21 June by email). Provider says out of warranty. On hold waiting for landlord (review 2024-05-24) and provider's date and warranty details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour may attend and quote now the oven is reported out of warranty; any cost returns to him | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour to confirm the actual visit date, the install date and warranty term, and to quote before chargeable work | Harbour Services, provider | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit date is unconfirmed and next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-05-24 for landlord and provider replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, which we are checking). Do you approve them attending to diagnose and quote, with any repair cost coming back to you for approval first? Please reply yes or no by 2024-05-24.
> 
> Options: Yes, Harbour Services may attend and quote; no work without your approval of the quote; No, you will arrange your own contractor (please give name and date)
> 
> Update: Apology: my earlier email said the oven was replaced in March 2025. That date was wrong, as it is in the future. Your note names Keystone Works and our record says Harbour Services, and the replacement date is unconfirmed, so I am asking Harbour for the install date and invoice. Visit: Harbour told the tenant tomorrow at 2:30pm by phone, but their emails say 21 June, so it is not confirmed yet. I am asking them for the actual date.

**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello Clara, thanks for your emails. Two questions. 1) Your emails say "tomorrow, 21st June" but the call with the tenant booked tomorrow 22 May at 2:30pm. Which is the actual date and time? 2) Please send the date you fitted the oven and the warranty term you checked, as the landlord believes it is still covered. The landlord has not yet approved any charge, so please attend only to diagnose and send us a quote with photos before doing any chargeable work. Thank you.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Leo, Harbour Services have said they will visit about the oven, and you spoke to them about tomorrow at 2:30pm. Their emails give a different date (21 June), so I am confirming the right one with them and it is not confirmed yet. Please don't plan around it until you hear from us. They also say the oven may not be under warranty, and I'm checking that with the landlord, so any repair cost needs their approval first. We'll update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; set_visit not used because the provider's dates conflict.
- The warranty status is the provider's claim, not verified.
- No spend is approved; the landlord only asked for a charge-free warranty service.

## Remaining work
- Landlord decision on attending/quoting (agency, by 24 May)
- Provider to confirm the visit date and the install and warranty facts
- Quote approval if any repair is needed

## Missing or unavailable information
- Actual visit date
- Oven install date and warranty term
- Whether Keystone Works or Harbour Services fitted the oven
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22 May (call, event 018) vs 21 June (emails 019/020), both described as 'tomorrow'
- Installer: Keystone Works (landlord) vs Harbour Services (note); replacement date 'March 2025' in event 014 is in the future relative to today, so it is an error
- Warranty: landlord says in warranty, provider says not

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour is assigned, but the visit date is unconfirmed and the warranty claim is unverified. The landlord has not approved any charge. Outstanding: landlord decision, provider date and warranty facts.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (Felix), provider date and warranty query by email, tenant update by email; hold until 24 May.

**3. Does anything need a human decision, and why?**

No escalation. The landlord can decide on spend, and it is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"025","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, which we a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"025"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"025","reason":"Waiting for Landlord","comment":"Provider says oven out of warranty; waiting for landlord decision on attend/q… | 1 | ❌ failed | Ticket 025 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Provider says oven out of warranty; waiting for landlord d… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A4: First hold used the wrong ticket ref; retried with NBL-025-warranty-dates and it verified as A5.
