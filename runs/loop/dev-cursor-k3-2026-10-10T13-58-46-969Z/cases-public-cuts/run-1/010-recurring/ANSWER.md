# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar reading was sent to the landlord, who replied that the next one is needed by 15 September. I scheduled a follow-up for 1 Sept 2025, noted the conflicting records, and updated the landlord and tenant. No human decision is needed.

## Where the case stands
Reading sent to landlord on 17 Jan 2025; landlord replied that the next one is needed by 15 September. Recurring job stays open; follow-up set for 1 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up on 2025-09-01 to ask tenant for the next meter photo, due to landlord by 15 September | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant nothing more is needed now and that we will ask again in early September | Miles Fletcher, tenant | email | A4 ✅ |
| 3 | OTHER | Acknowledged the landlord's 15 September date and asked whether they also want a reading before then, given the original 3-monthly note | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Dear Ava, thank you, noted that you next need the solar panel reading by 15 September. We will ask the tenant for it in early September and send it on. Our original note said readings every 3 months, so please tell us if you also want one before then. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for getting back to us about the solar panel reading. Nothing more is needed now. We will email you in early September to ask for a clear photo of the meter display for the landlord. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm who took the photo or that the reading is accurate
- Does not close the recurring job
- Does not settle whether readings are 3-monthly or only on 15 September

## Remaining work
- Agency: request next reading from tenant around 1 Sept 2025 and forward it to the landlord by 15 Sept
- Landlord to say whether they want a reading before September

## Missing or unavailable information
- Source of the photo: the tenant email (event 012) has no attachment
- Who the Oakfield Compliance caller (event 008) is
- Whether the landlord wants 3-monthly readings or only 15 Sept

## Conflicts between sources
- Original request said every 3 months, next mid June; the landlord's latest email says 15 September. I treated the landlord's email as current.
- Tenant email (event 012) has no attachment, yet the agency sent a photo to the landlord; the photo source is unclear.
- Event 008 names an Oakfield Compliance caller agreeing to send the photo, which does not match the tenant being the sender.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The reading was sent to the landlord, who has replied with the next date, 15 September. Nothing is outstanding now. The next reading is outstanding for September.

**2. What is the next action, who is it for, and through which channel?**

Ask the tenant for the next meter photo on 1 Sept 2025 (follow-up FUP-101, email). The landlord and tenant were updated by email today.

**3. Does anything need a human decision, and why?**

No. This is routine. Only the provenance gaps and the cadence conflict are noted, and I asked the landlord about the cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Ask tenant (Miles Fletcher) for clear photo of solar panel meter reading; landlord needs it by 15 Septembe… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (event 013); landlord replied nex… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Dear Ava, thank … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
