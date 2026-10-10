# Case 019: Garden Maintenance Request: ANSWER

**Decision:** escalated · **Severity:** routine

Routine garden request open since 17 Jan; landlord has not replied despite repeated chasing, and notes conflict on whether the £500+VAT quote was approved. I sent a written approval request, updated the tenant, set a hold with review date and escalated to management for an alternative contact route.

## Where the case stands
Ticket at init, on hold (Waiting for Landlord, review 2025-03-20). No verified landlord decision; no contractor assigned or visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Jenkins for written decision: approve £500+VAT quote, own contractor, or decline | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, target update by 20 March, no date promised | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 20 March for landlord reply | internal | internal | A3 ✅ |
| 4 | ESCALATE_TO_HUMAN | Ask management to reach landlord by another route and resolve conflicting approval notes | internal management | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Tenant has asked for garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk. Please confirm in writing whether you approve the £500 + VAT quote (Harbour Compliance), will arrange your own contractor, or decline. (£600)
> 
> Options: Approve the £500 + VAT quote and we instruct the contractor (recommended); You arrange your own contractor and tell us the date for tenant access; Decline the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for calling today about the garden. We're sorry for the wait. We still need the landlord's written go-ahead before any work can be booked, and we haven't been able to reach them yet. We've just chased again in writing and have asked a colleague to look at other ways to reach them. We'll update you by 20 March, or sooner if we hear back. We can't promise a date for the work until the landlord has replied.

## Escalation
- **P3 → management** (verified): Landlord unreachable for ~8 weeks and approval status conflicting
  - Known: Tenant requested garden clearance/levelling/gravel 17 Jan. Note 31 Jan says £500+VAT quote approved by landlord (Harbour Compliance), yet later notes (6 Mar) say still waiting for Jenkins to call back; no landlord words recorded. Calls/emails 8 Feb unanswered. Property record has no landlord contact or spend limit. Tenant chased 13 Mar. Written approval chase sent today.
  - Missing: Verified landlord decision in their own words; landlord contact details; whether garden is in the tenancy demise; Harbour Compliance is a compliance firm so suitability for garden work is unclear; photos unavailable.
  - Options: Find alternative landlord contact (Maya/Oakley) and obtain written decision; Confirm whether the 31 Jan approval is valid and record it; Letter to landlord
  - Recommendation: Maya to reach landlord by another route and get a written decision; do not instruct contractor until then.

## What this does not establish
- Chasing does not establish landlord approval or that the garden is the landlord's responsibility
- No contractor is assigned and no spend committed
- Tenant message promises no date or outcome

## Remaining work
- Landlord written decision (Maya/management)
- If approved, assign contractor and book visit with 24h notice
- Review 20 March

## Missing or unavailable information
- Landlord's own-words decision
- Landlord contact details and spend limit not on property record
- Tenant photos unavailable

## Conflicts between sources
- Note 009 says landlord approved the quote; notes 017/018 say still awaiting landlord. Treated as unapproved because no landlord statement is recorded and the ticket shows approval required.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stuck at landlord approval stage since January; 31 Jan note claims £500+VAT approved but later notes say still awaiting the landlord's call, and no landlord words are recorded. Outstanding: verified landlord decision, then contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Written approval request to Jenkins (landlord) by email (APR-101); tenant update by email (MSG-102); hold to 20 March.

**3. Does anything need a human decision, and why?**

Yes, P3 management (ESC-103): landlord is unreachable and the approval record conflicts, so someone must reach the landlord another way and confirm approval; I cannot assign or spend without it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant has asked for garden clearance, levelling and… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Written landlord decision needed (approve £500+VA… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord unreachable for ~8 weeks and approval status conflicting","known":"Tenant requested … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
