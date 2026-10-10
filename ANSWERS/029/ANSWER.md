# Heating-system visit enquiry: ANSWER

**Decision:** action_taken · **Severity:** routine

No heating visit is confirmed. An unverified caller has repeatedly asked for a key to be left in a shared meter cabinet. I told the tenant not to do this and not to confirm by text, asked the contractor for verification details and withheld the tenant's number, and put the job on hold for the landlord's answer, with review on 15 May.

## Where the case stands
Open, on hold at landlord gate. Diagnostic visit authorised in principle (ev 014) but contractor identity and access unconfirmed; no appointment booked; no key-drop authorised. Waiting on landlord reply to ev 019 and on Bram's identity details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell tenant no visit is confirmed, don't leave key or confirm by text, number not shared, update by 15 May | Elowen Vey, tenant | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask Bram for business address, Gas Safe number, insurance and a confirmed time in 10:00-12:00 Saturday; no key drop; tenant number withheld | Bram Alder, contractor | email | A4 ✅ |
| 3 | WAIT | Hold for landlord reply on contractor and access, review 15 May | Orren Vale, landlord | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Elowen Vey (tenant) via email, existing thread (event 018 portal)** (verified)

> Hello Elowen, thank you for your messages. Where things stand: no heating visit is confirmed. Your landlord has approved a diagnostic visit for the intermittent pressure loss, but we haven't yet verified the contractor or agreed a time. Please don't leave your key in the meter cabinet, and please don't reply to the text from 07700 900683 confirming anything. Nobody has permission to enter while you're out, and your son shouldn't be asked to let anyone in. We haven't shared your number with the contractor. We're asking him for his company details and a time within your Saturday 17 May, 10:00-12:00 offer, and we'll only confirm once he's verified. You'll hear from us by 15 May. If the heating stops or you smell gas, call 0800 111 999.

**A4 · send_message → Bram Alder (contractor) via email, existing thread (event 016 email)** (verified)

> Hello Bram. No visit is confirmed yet. Please don't text the tenant to arrange access, and no key is to be left in the meter cabinet: that is not authorised. We can't share the tenant's number. The tenant can only do Saturday 17 May, 10:00-12:00, and only with the visitor and purpose confirmed in advance. Please send us by email, by 15 May: Hearthline Boiler Service's registered business address and landline, your Gas Safe registration number, insurance details, and a confirmed arrival time within 10:00-12:00 for an initial visual check and pressure reading. We'll confirm with the tenant once your details are verified and the landlord has confirmed the arrangements.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms Bram Alder's identity, a booking, or any access arrangement
- Messages do not authorise key-drop or entry while tenant is out
- Landlord's diagnostic authorisation does not cover an unverified contractor

## Remaining work
- Landlord to confirm contractor and access (review 15 May; chase on second channel if silent)
- Bram to supply verifiable company details and a time
- Then set_visit with 24h notice only once provider confirms and tenant agrees; Saturday 17 May 10:00-12:00

## Missing or unavailable information
- Verified identity/insurance/Gas Safe of Bram Alder / Hearthline
- Landlord answer to event 019
- Tenant consent to share her number

## Conflicts between sources
- Ticket ref NBL-029-01 in history vs NBL-029 in system; used NBL-029
- Appointment dates differ: 14 May (ev 001), 12/13 May in notes (ev 013, 017), Sat 17 May (ev 015, 018, 020); none confirmed
- Bram describes Wednesday as unbooked (ev 012) yet asked for key for it earlier

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

No confirmed appointment. Landlord authorised a diagnostic visit by a suitably identified contractor, but Bram Alder's identity and the access arrangement are unverified; the landlord has not replied to the 14 May query. Tenant can only do Sat 17 May 10:00-12:00.

**2. What is the next action, who is it for, and through which channel?**

Done: update to tenant (email) and verification request to Bram (email); hold for landlord with review 15 May. Next: chase landlord on a second channel if silent, then book only on provider-confirmed time.

**3. Does anything need a human decision, and why?**

Not yet. Routine steps cover it. Escalate if the contractor cannot be verified or the key-drop pressure continues after review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-029","reason":"Waiting for Landlord","comment":"Awaiting landlord reply to 14 May query: is Bram Alder (Hearthline Boiler… | 1 | ✅ verified | Ticket NBL-029 read back after put_on_hold |
| A2 | `add_note` | {"entity":"NBL-029","note":"Route: our diagnostic visit authorised by landlord (event 014) but contractor identity unconfirmed. No appointme… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Elowen Vey","recipient_role":"tenant","channel":"email","contact":"existing thread (event 018 portal)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Bram Alder","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
