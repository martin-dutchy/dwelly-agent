# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says oven is out of warranty and gave conflicting visit dates. I asked the provider to confirm the date and warranty basis, asked the landlord to approve inspect-and-quote or choose their own contractor, updated the tenant, and set a follow-up for 23 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time, on hold waiting for provider. Visit date unconfirmed (22/05 per call vs "21 June" in emails). Provider says oven out of warranty; landlord only authorised a charge-free warranty service, so no spend is authorised. Landlord approval for chargeable work requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect and quote at landlord cost (quote returned for approval first), or whether they will use their own contractor | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time and warranty basis; inspect and quote only, no chargeable work yet | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not yet confirmed and the warranty/approval position is being checked; next update by 23 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Follow-up on 23 May to confirm date and chase landlord | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their statement, not yet checked). You asked for a charge-free warranty service. Do you want Harbour Services to inspect and quote for the repair at your cost (we would send you the quote before any work), or will you arrange your own contractor?
> 
> Options: Yes, Harbour Services to inspect and quote; send me the quote before any work; I will arrange my own contractor

**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Your two emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May, and the call summary says tomorrow at 2:30pm. Please confirm the exact date and time of the visit. Also, please confirm on what basis the oven is out of warranty (the landlord's records show it was replaced last year, and your note gave March 2025). For now please inspect and send a quote with photos only; do not start any chargeable work until we confirm landlord approval in writing.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services tell us they have arranged a visit with you for tomorrow afternoon, but their written confirmation gives a different date, so we are checking it with them and will confirm once they reply. They have also said the oven is no longer under warranty, so we are checking with your landlord how to proceed on any repair. We will update you by Thursday 23 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked by me; the date is unverified
- Provider's no-warranty claim is theirs, not verified
- No spend or quote approved
- Nothing establishes the fault cause

## Remaining work
- Provider to confirm visit date and warranty basis
- Landlord to decide on chargeable repair or own contractor
- Quote loop if needed
- Review 2024-05-23

## Missing or unavailable information
- Confirmed visit date
- Warranty documents/terms and who actually fitted oven (Keystone Works vs Harbour Services; March 2025 date is after today)
- Landlord decision on cost
- Attachments unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (event 018 call) vs 21/06/2024 (events 019, 020); neither confirmed
- Landlord named Keystone Works as the replacing contractor; agency note says Harbour Services
- Replacement date March 2025 (event 014) is after today (2024-05-21) and conflicts with tenant's 'last year'

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit date unconfirmed (22/05 vs 21/06), warranty claimed void by provider, landlord authorisation covers only a free warranty service; landlord decision on chargeable work outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, Felix); provider date/warranty confirmation (email, Harbour Services); tenant update (email, Leo Bennett).

**3. Does anything need a human decision, and why?**

No escalation; the decision is the landlord's and has been requested. Routine routes are in progress.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-23","party":"Harbour Services / landlord","purpose":"Confirm visit date with provid… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
