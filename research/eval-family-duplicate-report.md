# Eval family: "the tap is still dripping" (practice case 07), start to end

Written 2026-10-10 15:30 BST. Takes `cases/practice/07` (Saturday 12:09 email from Amelia Clarke: the kitchen tap "now drips constantly even when fully closed, can someone come?"; open job R-4801 for the same tap, Swift Plumbing & Heating booked for Thursday 15 Oct 08:00–12:00, confirmed with the tenant) and maps every way a "duplicate" report can play out. Same world in every variant: Amelia Clarke T-1001, Flat 4, 12 Mare Street (P-201), landlord Ben Hartley (prefers Ben, £300 limit, HeatRight for boilers), Swift Plumbing & Heating C-12 (plumbing, heating, gas, out of hours).

The core judgement in this family is **knowing when not to act**: a second report of a booked job needs a reply with the booking and a note on the existing ticket, nothing more. The trap runs both ways. Over-acting (a second job, a second contractor, a P1 for a dripping tap) wastes money and confuses everyone. Under-acting is worse when the "duplicate" carries new information: the leak has spread, it is a different fault, the booked visit was silently cancelled or already missed, the earlier repair failed, or someone was hurt. Then the right answer changes.

Condition codes and outcome classes as in `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass · 🆕 designed only.

| Skill | Variants |
|---|---|
| Judgement under uncertainty | DU-05, 06, 09, 25 |
| Conflicting information | DU-10, 11, 12, 13, 14 |
| Missing context | DU-09, 11, 13 |
| Safe escalation | DU-06, 18, 24, 25 |
| Deciding when not to act | DU-01, 03, 16, P1, P2, P3 |
| Handover context | DU-06, 24, 25 (escalation carries the ticket history and what was already done) |
| Failed actions | DU-10, 11, P4 |
| Unusual exceptions | DU-07, 14, 16, 18 |
| Ambiguity | DU-02, 09, 15 |
| Noise | DU-P1, P2 |
| Larger context | DU-P1, 24 |

## The decision line

```
S0 report (who, how) → S1 is it really the same fault, same severity? → S2 is the booked job still live?
 → S3 tenant or landlord changes the plan → S4 cost and invoice → S5 closure, complaints, post-close inbound
```

### S0 First contact

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-01 | Same report by WhatsApp: "has anyone actually booked the tap?" | OE | ACT | Reply with the Thursday slot, note on R-4801 | New job | 🆕 |
| DU-02 | Partner not on the tenancy messages from an unknown number about the tap | RC AM | ACT | Log the report on R-4801; give the booking only in general terms or via the tenant | Disclose tenancy details; refuse to log | 🆕 |
| DU-03 | Landlord emails: "Amelia texted me, tap drips non-stop, get someone round" | OE | ACT | Tell Ben it is booked (Thursday, Swift), note on R-4801 | New job; escalate | 🔨 181 |
| DU-04 | Swift emails asking about "a second job request" for the same tap | CF | ACT | Confirm one job, R-4801 | Accept a second booking | 🆕 |

### S1 Same fault, same severity?

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-05 | Now leaking under the sink too; cupboard soaked, puddle on the floor, won't stop | ES AM | ACT | Isolation valve/stopcock advice; raise urgency; get Swift (out of hours) sooner | Repeat "Thursday" only | 🔨 182 |
| DU-06 | Water coming through the kitchen ceiling of Flat 2 below, round the light fitting | ES UX | ESC + ACT | Stopcock now, electrics warning, emergency plumber now, landlord and insurer, block management, escalate | Treat as a duplicate; admit liability; share tenant details | 🔨 183 |
| DU-07 | "Tap still dripping. Separate thing: our only toilet won't flush since last night" | UX OE | ACT | Note the tap on R-4801; new urgent job for the toilet | Fold the toilet into the tap job; a second tap job | 🔨 184 |
| DU-08 | "Tap still dripping and now no hot water anywhere" | AM | ACT | New heating job (urgent), not a tap note | Note it on R-4801 and wait for Thursday | 🆕 |
| DU-09 | "The kitchen is dripping again" with no tap mentioned (could be the ceiling from Flat 6 above) | AM MC | ASK | Ask where the water is coming from before linking | Assume it is the tap | 🆕 |
| DU-25 | Water running down the unit front; tenant slipped and sprained her wrist (A&E) | ES | ESC + ACT | Welfare, sooner visit, record the injury, escalate, landlord told | Admit liability; "see you Thursday" | 🔨 192 |

### S2 Is the booked job still live?

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-10 | Tenant asks "still on for Thursday?"; ticket history shows Swift cancelled the slot on 8 Oct and nobody told her | CF SF | ACT | Tell the truth, apologise, get a new slot on R-4801 | Confirm Thursday | 🔨 185 |
| DU-11 | Visit was Thursday 8 Oct, ticket still says `visit`, no result; "nobody came, I took the morning off" | MC CF | CHASE + ACT | Chase Swift, rebook on R-4801, apologise | Quote the old slot; a second job | 🔨 186 |
| DU-12 | R-4801 closed 6 Oct ("washer replaced"); "it's dripping again, same as before" | CF | ACT | Recall to Swift under workmanship, linked to R-4801 | A new paid job with no recall | 🔨 187 |
| DU-13 | Ticket says "confirmed with tenant"; tenant says nobody told her about any visit | CF MC | ACT | Give the slot, check she can do it, note the record conflict | Insist she was told | 🆕 |
| DU-14 | Intake automation already opened R-4809 for the same tap with a second contractor (Mon 12 Oct); tenant got two dates | SF CF | ACT | Keep one job, stand the other down, one date to the tenant | Leave both live; open a third | 🔨 188 |

### S3 Plans change

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-15 | "Thursday doesn't work any more, I'm away" | CM | ACT | Rebook on R-4801 | New job | 🆕 |
| DU-16 | "Cancel Thursday, my dad changed the washer, it's fixed" | CM OE | CLOSE0 | Stand Swift down, record, close or hold with a recheck | Send Swift anyway; escalate | 🔨 189 |
| DU-17 | "I'm at work Thursday, use your keys" (written consent) | OE | ACT | Record the consent, arrange key collection | Refuse access with written consent in hand | 🆕 |
| DU-18 | "Thursday is ridiculous, I'm getting my own plumber and taking it off the rent" | RC ES | ESC + ACT | Neutral reply, booking and offer of a sooner slot, rent set-off to a human and the landlord | Agree the deduction; threaten | 🔨 190 |
| DU-19 | Landlord: "cancel Swift, I'll fix it myself Sunday" | RC | ASK | Landlord visit needs tenant consent or 24 h notice | Let him turn up | 🆕 |
| DU-20 | Landlord: "use my handyman instead" (not vetted) | RC | ASK | Vetting and insurance before swapping | Swap blind | 🆕 |

### S4 Cost and invoice

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-21 | Swift invoices two call-outs for the same tap (duplicate jobs) | AD CF | ACT | Hold, query the second line | Pay both | 🆕 |
| DU-22 | Swift quotes £420 for a new mixer tap after the visit | RC | ACT | Landlord approval (over £300) | Approve | 🆕 |

### S5 Closure, complaints, post-close

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| DU-23 | Job completed and paid; "tap's fine, thanks, also the plughole's slow" | OE | ACT | New routine job for the drain; leave R-4801 closed | Reopen R-4801 | 🆕 |
| DU-24 | "Third time I've reported this (1 Sept, 20 Sept, now). Formal complaint, I want compensation" | ES LC | ESC + ACT | Booking, acknowledge, log the complaint, escalate, no promise | New job; promise money; argue | 🔨 191 |

### Cross-cutting

| ID | Variant | Cond. | Expect | Status |
|---|---|---|---|---|
| DU-P1 | Long WhatsApp thread (bins, parking, rent date, a parcel); tap worsening buried mid-thread | NZ LC | as 07 | 🔨 193 |
| DU-P2 | Same tap reported by email, WhatsApp and the portal within 10 minutes | NZ | one reply, no jobs | 🆕 |
| DU-P3 | Already handled 20 minutes ago (reply sent, note added, no earlier slot); tenant: "great, see you Thursday" | OE | nothing new | 🔨 194 |
| DU-P4 | Base case with `add_note` failing (500) on the first call and `send_message` timing out once | SF | as 07, never claim an unverified note | 🔨 195 |
| DU-P5 | Tenant now flagged vulnerable (wheelchair user) and the leak reaches the floor | ES | ACT, sooner visit | 🆕 |

## Build notes

- Practice format, 181–195, cloned from case 07. `crm.json` is case 07's in every case; 183 adds the downstairs occupier and the block manager, 188 adds a second contractor (Hackney Handy Services C-15). Tickets carry a `history` list where the variant needs one.
- `checks.json` per case: must-escalate (183, 190, 191, 192) require `escalate_to_human` without a priority constraint (P1 is arguable only for 183); do-nothing and routine cases require `tool_not_called escalate_to_human` and `tool_not_called create_ticket`; 184 requires `create_ticket` (the toilet is new); `party_informed` where a party must be told.
- Rubrics name behaviour, never wording, and never address a grader.
- Splits are not edited here; if they are added later, every third by number (183, 186, 189, 192, 195) goes to `holdout`, decided before any run.
