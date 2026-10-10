# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has been stuck at landlord approval for two months with conflicting notes about approval of £500+VAT and an own-contractor route. I sent the landlord a one-question SMS, updated the tenant, noted the conflict and held to 17 March.

## Where the case stands
Landlord approval gate (stage init). No landlord reply since 17 Jan; no recorded decision. Held waiting for landlord, review 17 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking landlord A/B (our contractor up to £500+VAT vs own contractor) by 17 March, and whether their contractor has visited | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no date yet, next update by 18 March | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 17 March review | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk. Our notes conflict: one says you approved £500+VAT with Harbour Compliance, others suggest you are using your own contractor. Please reply by Mon 17 March: (A) yes, use our contractor up to £500+VAT, or (B) you are arranging your own (name and date please). Has your contractor already visited? Thanks, Maya

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, sorry for the wait on the garden. We are still waiting for the landlord to confirm how the work will be arranged, and have just texted them for a clear answer by 17 March. We can't yet give a date for the work. We will update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved
- The SMS does not establish landlord approval
- Tenant update gives no work date

## Remaining work
- Landlord answer needed; owner: property manager Maya
- If no reply by 17 March, escalate P3 maintenance for landlord contact via alternative route
- Garden photos unavailable, may need to be requested from tenant

## Missing or unavailable information
- Landlord decision
- Whether landlord's own contractor (Oakley's) attended
- Garden photos

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but later holds say still waiting for landlord and refer to Oakley's contractor. Treated as unapproved because there is no landlord words on file.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval gate; landlord has never replied. Notes conflict (event 009 approval claim vs holds). Landlord decision outstanding; nothing assigned.

**2. What is the next action, who is it for, and through which channel?**

SMS to landlord Jenkins with A/B question and 17 March deadline; email update to tenant; hold to 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Escalate P3 only if the landlord is still silent after 17 March.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 says landlord approved £500+VAT Harbour Compliance; holds (01… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's A/B answer (our contractor up… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
