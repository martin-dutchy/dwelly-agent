# Case 08: Landlord: "just let yourself in": ANSWER

**Decision:** escalated · **Severity:** routine

Landlord asked us to enter today and change locks over suspected subletting. We refused: no emergency, 24h written notice is required, and a lock change risks unlawful eviction. Landlord informed, legal escalated, follow-up set.

## Where the case stands
Landlord told no entry or lock change. Legal escalated. Waiting on landlord to confirm an inspection notice; review 13 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Reply to landlord refusing entry and lock change, offering a proper 24h-notice inspection | Margaret Ellison, landlord | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate subletting suspicion to legal | internal | internal | A2 ✅ |
| 3 | WAIT | Await landlord confirmation; follow up 13 Oct | Margaret Ellison, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> Thank you for your email. I'm sorry to be the bearer of bad news, but we can't enter 27 Bethnal Green Road today, and we can't change the locks.
> 
> - Jonah is a current tenant and the flat is his home. Holding a spare key gives us no right to enter. The tenancy (clause 7.1) requires at least 24 hours' written notice for an inspection, unless there is a genuine emergency. Suspected subletting is not an emergency.
> - Changing the locks or excluding a tenant without a court order could be unlawful eviction, which is a criminal offence for landlords and agents alike. We won't do it, even if strangers are there.
> 
> What we can do: with your agreement, we will send Jonah proper written notice of an inspection at a reasonable time, with at least 24 hours' notice, and take photos of the condition only. Please reply to confirm. If you have anything in writing from your neighbour (dates, descriptions), or any Airbnb listing link, please send it. Clause 9.3 does prohibit subletting without your written consent. Any action on that is a decision for our compliance and legal team, and I've passed it to them today. Please don't take action yourself, such as entering or changing locks.
> 
> If anyone is in danger, call 999.
> 
> We will update you by Tuesday 13 October.
> 
> Kind regards,
> Mare & Co

## Escalation
- **P2 → legal** (verified): Landlord asked for entry without notice and lock change over suspected subletting (clause 9.3); unlawful eviction risk
  - Known: Landlord email 10 Oct 13:31: neighbour reports different people and suitcases at 27 Bethnal Green Road; Jonah Okafor (T-1002, vulnerable, anxiety, prefers email) not answering her calls. Wants agency to enter today with spare key (office key safe), take photos, change locks if strangers. Tenancy cl 7.1 needs 24h written notice; cl 9.3 bans subletting without consent. No emergency. I refused entry and lock change and told landlord; no ticket exists.
  - Missing: Evidence of subletting (only hearsay); landlord confirmation to inspect; whether the tenant is reachable.
  - Options: Serve 24h+ written inspection notice to tenant by email, photos of condition only; Ask tenant in writing about occupancy and subletting; Landlord pursues breach of cl 9.3 via legal route
  - Recommendation: Option 1 and 2 once the landlord confirms; no entry or lock change; legal to advise on any breach action.
  - Deadline: 2026-10-13

## What this does not establish
- Nothing establishes that subletting is happening
- No notice has been served on the tenant
- No entry has happened

## Remaining work
- Landlord to confirm inspection
- Legal to advise on cl 9.3
- Serve written notice to tenant by email once confirmed

## Missing or unavailable information
- Evidence of subletting
- Tenant's response

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Can the agency enter today?**

No. Clause 7.1 requires 24h written notice, suspected subletting is not an emergency, and holding a key gives no right of entry. Changing locks risks unlawful eviction.

**2. What do you reply to the landlord?**

Sent MSG-101: explained why we can't enter or change locks, offered a notice-based inspection with photos of condition, asked for her confirmation and any evidence, and said legal has the matter.

**3. What about the subletting suspicion?**

Treated as unproven hearsay. Escalated to legal as ESC-102. Recommended a written inspection notice and a written query to the tenant. Follow-up set for 13 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Landlord asked for entry without notice and lock change over suspected subletting (clause 9.3); un… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-13","purpose":"Chase landlord for confirmation of inspection notice; check legal response on subletting","party":"Margare… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
