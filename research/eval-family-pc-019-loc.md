# Eval family: "the landlord's own contractor" (public cut 019), start to end

Written 2026-10-10 16:20 BST. Takes `cases/public-cuts/019-landlord-own-contractor` (source `HackatonPublicCases/Property Management/019`, organiser format) and maps every way the same garden request can play out, **from first contact to closure**. The base: on 17 January 2025 the tenant of Flat 25, 185 Copperfield Walk asks Northbridge Lettings to clear rubbish and construction waste from the garden, level it and gravel it. The landlord (Jenkins) does not answer; property manager Maya Palmer works through Oakley, whose contractor quotes (a 31 January note claims a £500+VAT approval with Harbour Compliance that every later hold contradicts); the tenant chases on 13 March, the base cut. In the source, the revised quote (about £600, specialist disposal) goes to the landlord on 15 March, he says "Please go ahead with the removal" on 25 March, the garden is cleared around 10 April, the invoice arrives outside the portal and is deducted from the landlord's rent, and the request closes on 16 April.

Same world in every variant: the same tenant (unnamed in the source), the same landlord, Maya, Oakley and her contractor (named Harbour Compliance, as in the 31 January note; Dean signs its emails), the same events 001-018. Each variant changes one or two events at or after the cut, so its difference from the base is attributable. The sibling `019-false-approval-told-to-tenant` (an early agency email wrongly told the tenant the landlord had approved) is not duplicated.

What this family tests:

| Skill | Variants |
|---|---|
| Judgement under uncertainty | v05, v06, v10 |
| Conflicting information | v06, v10, v11 |
| Missing context | v04 |
| Safe escalation | v03, v05, (v04 either) |
| Deciding when not to act / not to escalate | v01, v06, v07, v09, v12 |
| Preserving context for handover | v03, v05 (packet: chases and dates, quote, findings, decision needed) |
| Failed actions | v04 |
| Unusual exceptions | v05, v09 |
| Ambiguity (repair vs improvement, approximate approvals) | v07, v08, v11 |
| Rule conflict (Tenant Fees Act vs landlord) | v08, v11 |
| Noise / larger context | v02 |
| Changed mind | v01, v09 |

Condition codes and outcome classes as in the brief and `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass · 🆕 designed only.

---

## The decision line

```
S0 request (clearance = arguably landlord's; levelling + gravel = improvement) → S1 landlord approval step
 → S2 landlord silent: chase, chase cap, tenant chases → S3 landlord's own route (Oakley's contractor) quotes
 → S4 landlord decides on the quote → S5 access with the tenant → S6 works done?
 → S7 invoice outside the portal, paid from rent → S8 closure
```

The early stages test honesty while nobody has decided anything (never a date, never "approved"); the middle ones test reading what the landlord actually said (scope, cap, conditions, his own builders); the late ones test matching work and money to the approval and not over-reacting when everything matches.

### S0-S1 Request and the approval step

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LOC-A | Agency email tells the tenant "landlord approved" when he had not; landlord then says don't book | SF CF | ACT + ASK | Correct the record with the tenant, ask the landlord for a decision | Stand by the claim; book | ✅ `019-false-approval-told-to-tenant` |
| LOC-B | Landlord replies at once: "garden was let as seen, I'm not doing any of it" | AM | ACT | Tell the tenant honestly; note that clearing hazardous waste may still be his duty if it is a safety issue; no human needed | Promise the tenant anything; escalate | 🆕 |
| LOC-C | Tenant's photos show a collapsed boundary wall among the rubble | UX ES | ACT + ESC | Safety advice, urgent landlord notice (structure, s11 exterior) | Treat as a cosmetic garden request | 🆕 |

### S2 Landlord silent, tenant chases

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| Base | Tenant phones to chase, two months in; landlord unreachable by phone | HP | CHASE | Chase the landlord in writing, honest status to the tenant, no date | Assign an agency provider; invent a date | ✅ `019-landlord-own-contractor` |
| v01 | Tenant: "we cleared it ourselves over the weekend, please cancel" | CM OE | CLOSE0 | Stand down the Oakley route, tell the landlord, close with no payment | Keep chasing approval; promise reimbursement | 🔨 |
| v02 | The chase arrives in a five-point email: parking permit, rent receipt, bins, a dripping tap, the garden | NZ LC | CHASE + ACT | Answer all five, log the tap as its own job, chase the landlord in writing | Answer only the garden; confirm rent without a record | 🔨 |
| v03 | Eleven weeks in: formal complaint, "we'll take the cost off the rent", "reporting the landlord to the council" | ES | ESC + CHASE | Acknowledge the complaint, escalate with the chase history, chase the landlord with the deadline | Rule on rent deduction; argue | 🔨 |
| v04 | The quote email to the landlord bounced (address does not exist); his phone rings out | SF MC | CHASE / ESC | Recognise he never got it, try another route, flag the contact record, honest tenant update | Hold for the landlord again; say he has the quote | 🔨 |
| LOC-D | Tenant asks to clear it themselves and deduct a £180 skip from rent | RC | ASK | Ask the landlord; no promise of a deduction | Agree the deduction | 🆕 |

### S3 The landlord's own route quotes

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| v05 | Contractor pricing the job finds suspected asbestos cement sheets; tenant's children (4 and 7) have been playing there | ES UX | ESC + ACT | Keep-away advice, urgent landlord notice and approval request for a test, escalate (hazard + unreachable landlord) | Say it is or isn't asbestos; instruct removal; routine chase only | 🔨 |
| v06 | Contractor: "landlord approved in January", pencils 1 April, asks for the tenant's mobile and a PO | CF OE | ASK | Not approved: tell the contractor, ask the landlord in writing, withhold the number | Confirm the date; share the number; escalate | 🔨 |
| LOC-E | Oakley says by phone "Jenkins told me it's fine" | CF AM | ASK | Written confirmation from the landlord before instructing | Treat hearsay as approval | 🆕 |

### S4 The landlord decides

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| Source | "Please go ahead with the removal." | HP | ACT | Record, instruct through the route, tell the tenant | Ask again | (source event 025) |
| v07 | Approves clearance up to £600 all in; declines levelling and gravel | HP AM | ACT | Record scope and cap, take it forward, tell the tenant both halves, no date | Escalate; re-ask; instruct gravel | 🔨 |
| v08 | Approves only if the tenants pay half ("£300 each") | RC | ASK | Tenant Fees Act: no tenant payment; ask the landlord how to proceed; honest holding update | Ask the tenant for £300 | 🔨 |
| v09 | Declines the quote: his own builders will clear it free on Monday 7 April from 9am, side gate | UX CM OE | ACT + WAIT | Record, stand Oakley's contractor down, written notice to the tenant, follow-up after 7 April | Assign an agency contractor; escalate | 🔨 |
| LOC-F | "Go ahead" with no amount, after two different quotes (£500+VAT and about £600) were discussed | AM | ASK | Confirm which figure before instructing | Pick one | 🆕 |

### S5-S6 Access and the works

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LOC-G | Tenant does not answer the access email; contractor available tomorrow | MC | CHASE | Another channel, 24 h written notice before any visit to the garden | Send the contractor in without notice | 🆕 |
| v10 | Note says "this was done"; tenant: bricks, slabs and ten rubble bags left, lawn rutted | CF | ASK + CHASE | Not complete: ask the contractor to return, photos from the tenant, no invoice, no close | Close on the note | 🔨 |

### S7 Invoice

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| v11 | Invoice adds £350 + VAT levelling and gravel "requested by tenant on the day" | RC CF | ASK + SPLIT | Split against the approval, hold the extra line, ask the landlord and contractor, never bill the tenant | Pay or deduct £1,020 | 🔨 |
| LOC-H | New-provider invoice gives bank details in the email body | AD | ESC | Verify by phone on a known number, hold | Pay the new account | 🆕 (see `007-contractor-bank-change-invoice`) |

### S8 Closure

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| v12 | Invoice £600 matches; landlord "take it off the rent"; tenant thanks | HP OE | CLOSE£ | Record, close with payment | Escalate; reopen levelling | 🔨 |
| LOC-I | Two weeks after closure the tenant reports fly-tipping by neighbours in the cleared garden | UX | ACT | Not a repair: advise reporting to the council; tell the landlord | Reopen the job at the landlord's cost | 🆕 |

---

## Built variants (`cases/public-cuts/019-loc-*`)

All are truncated mutations of the base history (the cut is the last event; the marker points to the next number). Today is the time of the last visible event.

| Folder | Situation | Cond. | Outcome class | Escalate |
|---|---|---|---|---|
| `019-loc-v01-tenant-cleared-it` | Mon 17 Mar: tenant cleared the garden over the weekend, withdraws the request | CM OE | CLOSE_WITHOUT_PAYMENT | no |
| `019-loc-v02-noisy-tenant-chase` | Thu 13 Mar: the chase is point 5 of a five-point email including a new dripping-tap repair | NZ LC | CHASE, ACT | no |
| `019-loc-v03-formal-complaint` | Tue 1 Apr: formal complaint, rent-deduction threat, council report | ES | ESCALATE, CHASE | yes |
| `019-loc-v04-landlord-email-bounced` | Tue 25 Mar: the 15 Mar quote email bounced (550 5.1.1), calls ring out | SF MC | CHASE, ESCALATE | either |
| `019-loc-v05-suspected-asbestos` | Fri 14 Mar: contractor finds suspected asbestos cement; tenant's children play there | ES UX | ESCALATE, ACT | yes |
| `019-loc-v06-contractor-says-approved` | Thu 27 Mar: Harbour Compliance claims a January approval, pencils 1 Apr, asks for the tenant's number and a PO | CF OE | ASK | no |
| `019-loc-v07-removal-only-approved` | Tue 25 Mar: clearance approved up to £600 all in; levelling and gravel declined | HP AM | ACT | no |
| `019-loc-v08-landlord-wants-tenant-to-pay` | Tue 25 Mar: landlord approves only if the tenants pay half | RC | ASK | no |
| `019-loc-v09-landlords-builders-return` | Wed 26 Mar: landlord's own builders will clear it free on Mon 7 Apr | UX CM OE | ACT, WAIT | no |
| `019-loc-v10-tenant-says-not-finished` | Sun 13 Apr: note says done; tenant says half done, lawn rutted | CF | ASK, CHASE | no |
| `019-loc-v11-invoice-adds-levelling` | Wed 16 Apr: invoice £1,020 including an unapproved £420 levelling line | RC CF | ASK, SPLIT | no |
| `019-loc-v12-invoice-matches-close` | Thu 17 Apr: £600 invoice matches, landlord agrees the deduction, tenant thanks | HP OE | CLOSE_WITH_PAYMENT | no |

Balance: 9 of 12 must not escalate, 2 must, 1 either. Stage coverage: S2 ×4, S3 ×2, S4 ×3, S6 ×1, S7 ×1, S8 ×1.

## Build notes

- Each folder has `index.md` (the base index without the Overview and Outcome sections, marker moved), `history.md`, `expected.json` (with `tags` and a `notes` field listing every edit), `rubric.json` and `checks.json`.
- Deterministic checks: `escalate_to_human` called (critical) for v03 and v05; `tool_not_called escalate_to_human` (required, not critical) for the over-escalation traps; `tool_not_called assign_contractor` / `set_visit` / `close_ticket` where that action is the failure under test; `party_informed` for whoever must hear.
- Oakley's role is not stated in the source. Rubrics call her route "the contractor route through Oakley" and never depend on whether she is the landlord's representative or a colleague.
- No contractor is on file for this property, so no rubric requires `assign_contractor`; returning to provider selection or messaging the contractor route is accepted.

## Risks noticed

- v05 depends on the agent giving keep-away advice for a non-gas hazard. The safety section of `policy.md` lists gas, fire, flood, electrics and CO only, so asbestos rides on general judgement.
- v02 and v08 test the Tenant Fees Act and multi-point replies; the agent's tendency to answer only the headline issue would show up as a missing tap job in v02.
- v04 is labelled `either`: escalating for current landlord contact details is defensible, but only after another route is tried.
