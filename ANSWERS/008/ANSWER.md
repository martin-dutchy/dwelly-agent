# Water ingress affecting two flats: ANSWER

**Decision:** escalated · **Severity:** emergency

Water is dripping onto a light fitting in Flat 2 and the ceiling bulge is growing. The source is probably Flat 3, but Yara refuses entry and no emergency-entry authority is verified. I raised a separate emergency ticket (JOB-102) and assigned the electrician. I updated both tenants, the landlord and the plumber, and escalated P1 for the access decision.

## Where the case stands
NBL-008 at init, reclassified emergency. Flat 2 leak active, electrics not confirmed safe; Vellum Electrical assigned on JOB-102 (12:30-13:15). Source in Flat 3 not found; Yara refuses entry until after 17:30; landlord has not authorised entry; no verified emergency-entry authority. P1 escalation ESC-101 raised.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation for a director decision on emergency access to Flat 3 | Maintenance / agency director | internal | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned Vellum Electrical to the Flat 2 emergency electrical job in the 12:30-13:15 window | Vellum Electrical | internal | A4 ✅ |
| 3 | REPLY_TO_TENANT | Safety advice and electrician timing to Bevin Orlo | Bevin Orlo, tenant Flat 2 | sms | A5 ✅ |
| 4 | REPLY_TO_TENANT | Written plan and request for earlier consent to Yara Mallow | Yara Mallow, tenant Flat 3 | email | A6 ✅ |
| 5 | OTHER | Updated landlord and asked for signed agreement | Niko Pell, landlord | email | A7 ✅ |
| 6 | WAIT | Same-day follow-up on electrician result, consent and ESC-101 | internal | internal | A9 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Bevin Orlo (tenant) via sms, existing thread (event 023 SMS)** (verified)

> Hi Bevin, thanks for the update. Please keep out of the bedroom and away from the light, switches and ceiling. Vellum Electrical is booked for 12:30-13:15 today to check and make the fitting safe; please let them in. If you see sparks, smoke, or the ceiling starts to fall, leave the flat and call 999. Please don't use the consumer unit. We are still working on finding the source and will keep your details within the maintenance team. We'll update you again once the electrician has attended.

**A6 · send_message → Yara Mallow (tenant) via email, existing thread (event 001 portal)** (verified)

> Hi Yara, thank you for speaking with us. As you asked, here is the plan in writing. The flat below still has water dripping through a ceiling light, and the ceiling is bulging more. The electrician is making that flat safe today. The plumber is Daro Fen of Brindle Flow Plumbing. He would only trace the leak and find a safe place to isolate the water, starting in your bathroom. We will not enter Flat 3 without your agreement. Could you tell us whether you can agree to a short, accompanied visit earlier than 17:30, for example with a person you trust there, or by phone at your break around noon? If you can't, please tell us what time after you return suits you. Until then, if it is safe, please turn off your stopcock if someone can reach it. We'll contact you again today.

**A7 · send_message → Niko Pell (landlord) via email, existing thread (event 019 email)** (verified)

> Hi Niko, an update. The leak in Flat 2 is still active and the ceiling bulge is growing beside a wet light fitting. An electrician (Vellum Electrical) is due 12:30-13:15 to make it safe. The plumber and building manager found no source or isolation point; Flat 3 has not been entered, as Yara has not consented and you have not authorised entry. We are not entering without her agreement. This has gone to our duty team and director, who will check the full tenancy wording on emergency access. Please send us the signed agreement if you have it. We are still asking Yara for earlier consent and will update you before any non-routine access.

**A8 · send_message → Daro Fen (contractor) via email, existing thread (event 016 call)** (verified)

> Hi Daro, thanks for attending. Flat 3 access is still not agreed and we are not entering without the tenant's consent. Please stay on standby to attend Flat 3 the moment consent is given; we will tell you as soon as it is. The Flat 2 ceiling is getting worse, so please tell us if you have any other way to limit the water.

## Escalation
- **P1 → maintenance** (verified): Active water ingress onto a light fitting in Flat 2, bulge enlarging; source likely Flat 3 but tenant refuses entry; no verified emergency-entry authority
  - Known: Flat 2 (Bevin Orlo): continuous dripping at ceiling light, brown patch, ceiling bulge growing (events 002-023); no sparks/smoke/falling material; bedroom evacuated. Vellum Electrical due 12:30-13:15 (event 014/018). Brindle Flow and Selka Venn found no source or isolation point (016, 021). Flat 3 tenant Yara Mallow refuses entry until after 17:30 (009, 020). Landlord Niko Pell has not authorised entry; tenancy wording unchecked (011, 019). Duty manager found no delegated authority to override refusal (022).
  - Missing: Full tenancy agreement wording on emergency access; director decision; whether electrical supply to the Flat 2 fitting is isolated; actual source; whether Yara can be reached around noon break / arrange someone she trusts to attend.
  - Options: Director obtains full tenancy agreement and decides on lawful emergency access to Flat 3, with Yara and Niko told; Call 999/fire service if ceiling collapse risk or electrical danger arises, follow their direction; Keep trying to get Yara's consent (call at her noon break, offer her to attend by phone/video or nominate someone), Daro attends Flat 3 once agreed; Electrician isolates Flat 2 circuit at consumer unit on arrival
  - Recommendation: Director decision now on the tenancy wording and emergency-access authority; meanwhile the electrician makes Flat 2 safe and we keep seeking Yara's consent. No entry without consent unless the director/emergency services authorise it.
  - Deadline: Today 2025-06-18, before 17:30 or sooner if the ceiling worsens

## What this does not establish
- None of this establishes the leak source or that Flat 2 electrics are safe.
- Nothing authorises entry to Flat 3; consent has not been given.
- Electrician assignment is for inspection and make-safe only; the window is the contractor's offer, not yet attended.

## Remaining work
- Director decision on access authority (ESC-101)
- Electrician result for Flat 2
- Source trace and isolation in Flat 3 once consent is given
- Update Bevin after the electrician visit

## Missing or unavailable information
- Full tenancy agreement wording
- Source of the leak
- Electrical isolation status of the Flat 2 fitting

## Conflicts between sources
- Ticket NBL-008 is logged under Flat 3 but the urgent hazard is in Flat 2, so a separate ticket JOB-102 was raised.
- Bevin asked for details to stay within the maintenance team, so Flat 2 details were not shared with Yara beyond the fact of a leak below.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Active emergency in Flat 2. Electrician due 12:30-13:15. Source unfound, and Flat 3 is inaccessible because the tenant has not consented. Outstanding: electrical make-safe, access authority and source trace.

**2. What is the next action, who is it for, through which channel?**

P1 escalation to the maintenance/director team (internal). Messages sent to Bevin by SMS, to Yara by email, to Niko by email and to Daro Fen by email. Vellum Electrical assigned.

**3. Does anything need a human decision?**

Yes. Whether emergency access to Flat 3 can lawfully be taken without consent needs the director and the full tenancy wording. Staff have no delegated authority to override refusal, and the landlord has not authorised entry.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active water ingress onto a light fitting in Flat 2, bulge enlarging; source likely Flat 3 b… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A2 | `create_ticket` | {"property":"Flat 2, 8 Tallowmere Row, Ossin Vale, ZZ1 1ZZ","category":"electrical","severity":"emergency","description":"Water dripping thr… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `update_ticket` | {"ref":"NBL-008","note":"Reclassified emergency: water ingress onto electrics in Flat 2. Source in Flat 3 unconfirmed; tenant refuses entry;… | 1 | ✅ verified | Ticket NBL-008 read back at stage init |
| A4 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Vellum Electrical","visit_window":"2025-06-18 12:30-13:15"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Bevin Orlo","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 023 SMS)","ticket_ref":"JOB-102",… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Yara Mallow","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 portal)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Niko Pell","recipient_role":"landlord","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `send_message` | {"recipient_name":"Daro Fen","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 call)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-106 found in the send_message log |
| A9 | `schedule_follow_up` | {"due_on":"2025-06-18","purpose":"Check Vellum result for Flat 2, call Yara at noon break/after 17:30 for consent, review ESC-101 decision",… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
