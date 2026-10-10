# Case 019-landlord-own-contractor: ANSWER

**Outcome:** escalated · **Severity:** routine

Garden request has been on hold since January because the landlord isn't responding. Records disagree on whether approval was given. I updated the tenant, chased the landlord by phone, and escalated to management. No contractor was booked.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

On hold. A £500+VAT quote exists (Harbour Compliance), and a note says the landlord approved it. Later notes say we are still waiting on the landlord, who must call back and provide funds up front. Oakley's contractor was also mentioned. Outstanding: confirmed landlord approval, contractor choice, funds, and a date. The tenant chased on 13 Mar.

**2. What is the next action, who is it for, and through which channel?**

Done: update to the tenant by email (MSG-101), and a call to the landlord (MSG-102) asking for approval, contractor and funds. Next: Maya Palmer to get the landlord's answer, then book the work.

**3. Does anything need a human decision, and why?**

Yes, escalated as ESC-103 (P3, management). Approval and contractor records conflict, spend needs landlord funding, and the landlord has been unreachable for weeks.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","body":"Hello, thank you for chasing about the back garden. Sorry for… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"phone_call","body":"Hello Jenkins, it's Northbridge Lettings about the ba… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Garden job stalled 8 weeks; landlord unreachable and records conflict on approval and contrac… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Escalations
- **P3 → management** (verified): Garden job stalled 8 weeks; landlord unreachable and records conflict on approval and contractor
  - Known: Tenant asked 17 Jan for garden clearance, levelling and gravel (photos unavailable). Event 009 (31 Jan): quote £500+VAT, landlord approved, Harbour Compliance to go ahead. Then held repeatedly by Maya Palmer: funds up front needed, landlord not calling back (events 010-017). Event 016 mentions Oakley's contractor quoting. Tenant chased 13 Mar. No tickets exist in the system. Tenant and landlord both contacted today.
  - Missing: Whether approval was truly given and recorded; who the contractor is (Harbour Compliance vs Oakley's contractor); whether landlord will fund up front; the garden's status in the tenancy.
  - Options: Maya Palmer reaches landlord by phone/letter, confirms approval, contractor and funds, then books work; If landlord stays silent, decide whether to close or proceed under existing authority
  - Recommendation: Option 1: Maya to get a confirmed landlord decision on contractor and up-front funds, then book the contractor and tell the tenant.

## Failed or unverified actions
_None._
