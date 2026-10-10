# Heating maintenance at 7 Larkspur Fold: ANSWER

**Decision:** escalated · **Severity:** urgent

Heating repair awaits landlord authority; contractor invoices (£138 and £372) overlap and the £372 is unauthorised and unevidenced. I held payment, escalated to accounts, updated the tenant and scheduled a chase for 14 Feb.

## Where the case stands
Diagnosis done 5 Feb (£138 within authority). £372 actuator repair not authorised; landlord undecided and asked again on 12 Feb (event 023). Two overlapping invoices held. Heating still intermittent; child in the home.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Escalate invoice conflict to accounts, P2 | Accounts team | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, give heater safety advice, ask about return-visit access | Tessa Vane, tenant | sms | A4 ✅ |
| 3 | WAIT | Follow up with landlord by SMS/phone and chase provider on 14 Feb | Soren Dallow, landlord / Copper Finch | internal | A2 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Tessa Vane (tenant) via sms, existing thread (event 011 SMS)** (verified)

> Hi Tessa, thanks for your update. The contractor found a fault with the heating valve actuator on 5 Feb. The repair needs the landlord's approval, which we're still waiting on, so I can't give a repair date yet. We're also checking with the contractor what was done at the visit. Meanwhile please keep the portable heater plugged directly into the wall (not an extension lead), clear of curtains and bedding, and never leave it on unattended or overnight. If you smell gas, see a leak, or get a boiler warning or no hot water, tell us straight away; for gas smells call 0800 111 999. Would a return visit after 14:00 on a weekday suit you? We'll update you again by 14 Feb.

## Escalation
- **P2 → accounts** (verified): Contractor invoices conflict with approval and record; provider reply does not settle it
  - Known: Landlord authorised diagnosis only up to £180 inc VAT (event 005). Copper Finch quoted £138 diagnosis (007), attended 5 Feb (008). £372 estimate sent after the visit (009); landlord undecided (012). Invoices A £138 and B £372, both dated 10 Feb, service date 5 Feb, overlapping scope (017/018); B claims actuator replaced but no completion record. Tenant unsure of replacement and has seen no contractor since 5 Feb (020). Provider could not confirm which is valid (022). Payment hold HOLD-101 placed. Landlord asked for direction on 12 Feb (023), no reply. Tenant has a child, heating still intermittent.
  - Missing: Whether the actuator was replaced; whether A is credited within B or both payable; landlord's decision.
  - Options: Pay invoice A £138 only (within authority), reject B until evidence; Hold both until provider evidences work; Dispute B as unauthorised and request credit note
  - Recommendation: Keep both held; pay A only once provider confirms B does not duplicate it; do not pay B without landlord authority and completion evidence. Also get the heating repaired promptly given the child in the property.
  - Deadline: 2025-02-14

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Soren Dallow / Copper Finch Mechanical | Chase landlord decision and provider evidence | 2025-02-14 | A2 ✅ verified |

## What this does not establish
- Payment hold does not decide which invoice is valid
- Nothing establishes that the actuator was replaced
- No repair is authorised or booked; tenant given no repair date

## Remaining work
- Landlord decision on repair route and invoices (landlord)
- Provider evidence: job notes, parts record, clarification (Copper Finch)
- Accounts decision on invoices A and B
- Heating repair still unresolved

## Missing or unavailable information
- Whether the actuator was replaced
- Whether invoice A is credited within B
- Landlord's answer to his own questions on repair option and price breakdown

## Conflicts between sources
- Invoice B says the actuator was replaced on 5 Feb, but the estimate was sent after the visit, the 7 Feb parts check was still open, and the tenant is unsure. I trusted the file and tenant over the invoice.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Diagnosis completed 5 Feb. Actuator repair (£372 estimate) not authorised; landlord has not replied since 6 Feb and was asked again on 12 Feb. Two overlapping invoices are unresolved and held. Heating is still intermittent.

**2. What is the next action, who is it for, and through which channel?**

Tenant updated by SMS (existing thread); accounts escalated internally; follow-up on 14 Feb to chase the landlord on a second channel and the provider for evidence.

**3. Does anything need a human decision, and why?**

Yes: accounts must decide how to treat invoices A and B, because B exceeds the landlord's authority and the provider cannot confirm the work or the overlap. The landlord must decide on the repair.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Copper Finch Mechanical","reason":"Invoices NBL-CFM-250210-A (£138) and -B (£372) both dated 10 Feb for service 5 Feb with overlap… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `schedule_follow_up` | {"due_on":"2025-02-14","purpose":"Chase landlord Soren Dallow by SMS/phone for decision on repair route and unresolved invoices; chase Coppe… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"accounts","reason":"Contractor invoices conflict with approval and record; provider reply does not settle it","know… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `send_message` | {"recipient_name":"Tessa Vane","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 011 SMS)","body":"Hi Tessa, thank… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
- n/a: First tenant message via portal was rejected as an invalid channel and was not sent; resent by SMS, verified as A4.
