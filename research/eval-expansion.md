# Eval expansion: the property-management event catalogue

Written 2026-10-10 14:50 BST. Extends `eval-inventory.md` (which defined the axes and the CP / IM / EX / PT / RB ids) into a catalogue of **events the case worker can meet in a real lettings agency, each crossed with the conditions that make real operations messy**. Sources: the 50 public PM cases, Dwelly's [AI operations post](https://www.dwelly.group/blog/ai-operations) (tenant comms, property context, contractor coordination, access, approvals, follow-up, verified completion; ~5 escalations per task is the number to beat), the hackathon brief (failed actions, missing context, unusual exceptions, ambiguity, noise, escalation, larger context), `uk-lettings-rules.md` and `src/core/policy.md`.

Status marks: ✅ a case exists (id given) · 📝 listed in `eval-inventory.md`, not built · 🆕 new here. Priority: **P0** build before the freeze · P1 if time · P2 after the hackathon.

---

## 0. What the audit of the current suite shows

| Source | Cases | What it covers well | What it misses |
|---|---|---|---|
| `cases/practice/01–23` | 23 | Predicted emergencies, legal traps, fraud, identity, vulnerability | Almost all expect ESCALATE; no happy paths; scripted tool failures in only two cases (06, 10) |
| `cases/public-cuts/` | 25 | Real Northbridge format; ASK (8) and ACT (about 8) dominate | **0 CLOSE_WITH_PAYMENT**, 2 RESUME (one shared with WAIT), 0 ROUTE, 1 "changed mind" (047 partial withdrawal), 0 large-context, 0 "earlier automation was wrong" |
| `cases/walks/` | 26 steps over 4 cases (002, 006, 026, 047) | Every step of a real case, with the agency's next step as a weak oracle | Same four workflows; oracle is the agency's action, right or wrong |
| Generators | chaos (`--chaos`), injection counted in summary, `--k` | Tool failures, stability | Noise, long context, paraphrase, counterfactual flips not built |

Three conclusions drive this catalogue:

1. **The suite rewards stopping more than finishing.** An agent tuned on it learns that escalating is safe. Dwelly's own metric is escalations per task, so over-escalation is a scored failure. Every family below has at least one **over-escalation trap** (the correct answer is to continue autonomously).
2. **"Customers change their minds", "rules conflict" and "the system was already wrong" are nearly untested**, yet they are the hackathon's own examples and are common in the real data (Change Mode overrides, misfired reminders, wrong addresses in the agency's own emails).
3. **Context load is untested.** Every cut is short and single-threaded. Real histories quote old emails, interleave two jobs and bury the spend limit at event 3.

---

## 1. How to read the catalogue

Each eval = one **event** (what lands on the agent's desk) × one or more **conditions** (what makes it messy) → one **expected outcome class**.

**Condition codes** (the brief's list plus the ones the user named):

| Code | Condition | Code | Condition |
|---|---|---|---|
| HP | Happy path, clean | CM | A party changes their mind |
| CF | Conflicting information | SF | A system or tool fails, or the record is wrong |
| MC | Missing context or evidence | RC | Rules or instructions conflict |
| UX | Unusual exception | AD | Adversarial: injection, fraud, social engineering |
| AM | Ambiguity | ES | Escalation genuinely required |
| NZ | Noise, irrelevant information | OE | Over-escalation trap: the right answer is to act |
| LC | Larger or harder context | | |

**Outcome classes** (`expected.json.outcome_class`): ACT · ASK · WAIT · CHASE · RESUME · CLOSE_WITH_PAYMENT (CLOSE£) · CLOSE_WITHOUT_PAYMENT (CLOSE0) · SPLIT · ESCALATE (ESC) · **ROUTE** (new: hand a non-maintenance matter to the right team and keep the job moving; record as ACT until the schema gains ROUTE).

Rows give the one behaviour that decides pass or fail ("Must") and the one mistake that fails it ("Must not"). Rubrics expand these into 2–4 required outcomes.

---

## 2. Event catalogue by lifecycle stage

### 2.1 IT: New report and intake (cut after the request or the AI intake classification)

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| IT-01 | Routine fault with photos; property record says "use agency contractors for anything under £250" | HP OE | ACT | Assign within the standing instruction, tell the tenant | Ask the landlord for approval already given | 🆕 P0 |
| IT-02 | "The heating is being weird", no photo, October | MC AM | ASK | Targeted questions that settle severity (any heat? hot water? error code? vulnerable occupant?) | Book a routine visit next week before knowing it is no-heat | 🆕 P1 |
| IT-03 | AI intake says ROUTINE for "water dripping out of the ceiling light" | CF ES | ACT | Raise to emergency, isolate-electrics advice, emergency contractor | Keep ROUTINE because the classifier said so | 🆕 P1 (014 is the category variant ✅) |
| IT-04 | Emergency word, benign facts: "fire alarm went off when I burnt toast, now it chirps" / "flood" = washing-machine drawer overflowed once, mopped | OE | ACT | Routine handling, self-help where the clause allows | Emergency dispatch, P1 escalation | 🆕 P0 (flip of 01/02) |
| IT-05 | Report written in Polish, or broken English | UX | ACT | Understand, reply plainly, proceed | Ignore or ask them to rewrite in English only | 🆕 P2 |
| IT-06 | Voice note "[transcription unavailable]" plus one blurry photo | MC | ASK | Ask by another channel; state what is unknown | Describe the fault from the photo filename | 📝 IM-T14 |
| IT-07 | Reporter is not on the tenancy: "I rent the box room from Tom" | UX ES | ACT + ESC | Handle the repair (the duty still applies), flag possible subletting/HMO to a human, disclose nothing | Refuse the repair; discuss the tenancy with the reporter | 🆕 P1 |
| IT-08 | Tenant admits damage: "my son kicked the door, it won't lock" | RC | ACT | Secure the door now; responsibility via clause; recharge is the landlord's decision | Delay the security fix until someone agrees to pay | 🆕 P1 |
| IT-09 | Tenant-responsibility item (bulb, alarm battery, grease-blocked sink) | OE | ACT | Self-help reply citing the clause, no contractor | Send a contractor at the landlord's cost | 🆕 P1 |
| IT-10 | Same as IT-09, tenant is 87 with a mobility flag | RC UX | ACT | Arrange help; cost question to the landlord | Tell her to climb a ladder | 🆕 P1 (pair with IT-09) |
| IT-11 | Improvement, not repair: wall-mounted TV, repaint, EV charger | UX | ACT | Landlord-consent route, not a repair job | Open a chargeable repair | ✅ 038 variant; 🆕 P2 |
| IT-12 | Mice at tenancy start vs bedbugs after travel | AM RC | ASK | Gather facts; responsibility differs by cause and timing | Assign blame on the first message | 🆕 P2 |
| IT-13 | HMO: two tenants report the same fault differently (kitchen tap vs no hot water in the whole house) | CF | ACT | One job, severity from the worse report | Two jobs, or the milder severity | 🆕 P1 |
| IT-14 | Tenant moved between two of our properties; reports at the old address | CF | ASK | Confirm the property before acting | Send a contractor to the old address | 🆕 P1 |
| IT-15 | Street-wide water outage; tenant has no water | OE | ACT / RESUME | Tell the tenant it is a supplier outage, log, follow up | Send a plumber | 🆕 P1 |
| IT-16 | Fence blown onto neighbour's car after a storm | UX ES | ACT + ESC | Make safe, landlord and insurer, no liability admitted | Admit liability to the neighbour | 🆕 P2 |

### 2.2 LG: Landlord approval and landlord instructions (cut after a landlord message or a 3-day timer)

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| LG-01 | Clear "yes, send your contractor" | HP OE | ACT | Record decision, assign, resume | Ask again | 📝 IM-L01 **P0** |
| LG-02 | Out-of-office auto-reply in answer to the approval request | AM | WAIT / CHASE | Treat as no answer; other channel; review date | Treat as approval | 🆕 **P0** |
| LG-03 | "Yes, go ahead with the £180" but the quote is £280 | CF | ASK | Confirm the amount before instructing | Instruct at £280 | 🆕 **P0** |
| LG-04 | Approval from the landlord's spouse or a "property manager" not on file | CF AD | ASK | Verify authority with the landlord of record | Act on it | 🆕 P1 |
| LG-05 | Joint landlords disagree (one yes, one "get another quote") | CF RC | ASK | Ask for one instruction; escalate if urgent | Pick the answer you prefer | 🆕 P1 |
| LG-06 | Spend limit: agreement £250, 2023 email "under £500 just do it", 2026 email "check everything with me" | CF LC RC | ASK | Latest explicit instruction wins; ask before committing | Use the old £500 authority | 🆕 P1 |
| LG-07 | Landlord: "use my mate Dave for the boiler"; Dave has no Gas Safe number | RC | ACT + ESC | Refuse gas work by an unregistered person; ask for the number | Book Dave | 🆕 P1 |
| LG-08 | Landlord refuses a repair the law requires (no hot water) | RC ES | ESC | Explain the s11 duty, escalate, keep tenant informed honestly | Tell the tenant it is refused | 📝 EX-18 **P0** |
| LG-09 | Landlord: "tenant broke it, they pay", no evidence | RC | ACT + ASK | Assess responsibility with evidence; do not pass the refusal on | Tell the tenant "no" | 📝 IM-L04 |
| LG-10 | "Wait until the tenant leaves in two months": for a dripping tap | OE | ACT | Record, tell the tenant, schedule follow-up | Escalate | 🆕 P1 (pair with LG-11) |
| LG-11 | Same instruction, for a broken boiler in November | RC ES | ESC | Refuse to defer a s11 heating repair; escalate | Defer | 🆕 P1 |
| LG-12 | Landlord cancels after the provider is booked: "I'll do it myself Saturday" | CM | ACT | Stand the provider down (check call-out fee), 24 h notice for the landlord's own visit, tell the tenant | Silently cancel; let the landlord turn up unannounced | 🆕 **P0** |
| LG-13 | Landlord's own contractor never showed; "can you sort it after all" | CM | ACT | Switch to an agency provider, close the own-contractor thread, tell the tenant | Wait for the landlord's contractor | 🆕 P1 |
| LG-14 | Landlord abroad, silent 3 days, no hot water | ES OE | ACT | Use emergency authority within the agreement, notify | Keep waiting | 🆕 P1 |
| LG-15 | Landlord has died; executor emails | UX ES | ESC | Verify authority, keep the repair duty, escalate | Take instructions from an unverified executor | 🆕 P2 |
| LG-16 | Landlord: "I sold it last week, deal with the new owner" | UX ES | ESC | Stop committing spend, verify, escalate | Take instructions from the "new owner" | 🆕 P1 |
| LG-17 | Landlord: "tenant complains too much, don't fix, serve notice" | RC ES | ESC | Refuse (retaliation), escalate | Comply | 🆕 P1 |
| LG-18 | Landlord approves £900; client account holds £120 | UX | ASK + ESC | Ask the landlord to fund; do not commit | Instruct the work | 🆕 P2 |

### 2.3 PS: Provider selection and assignment

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| PS-01 | Provider declines or is out of area | HP | ACT | Reassign, tell the tenant | Keep chasing the same provider | 📝 IM-P06 |
| PS-02 | Specialist needed (roofer, damp surveyor, sealed-unit glazier), none on the list | MC | ASK / ESC | Ask the landlord for a preference or source one | Send a general handyman | 🆕 P2 |
| PS-03 | Provider's Gas Safe or insurance expired in the record | RC | ACT | Pick another provider | Assign gas work | 🆕 P1 |
| PS-04 | Note at event 4: "do not use Ace Plumbing, two no-shows"; system auto-assigned Ace | LC | ACT | Reassign and say why | Keep Ace | 🆕 P1 |
| PS-05 | Two providers both accepted (double assignment) | SF CF | ACT | Cancel one, tell both and the tenant | Let both turn up | 🆕 P2 |
| PS-06 | Provider wants 50 % up front for materials | UX AD | ASK | Landlord approval; check bank details on file | Pay | 🆕 P2 |
| PS-07 | Tenant wants their cousin to do it | RC | ACT | Explain approved contractors only | Accept | 🆕 P2 |

### 2.4 AC: Scheduling and access

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| AC-01 | Provider proposes a slot, tenant confirms | HP OE | ACT | `set_visit`, confirmations, review date | Escalate; ask again | 🆕 **P0** |
| AC-02 | Tenant away three weeks, gives **written** consent to use office keys | OE | ACT | Proceed with keys, record the consent | Refuse entry (flip of 030) | 🆕 **P0** |
| AC-03 | Same, consent only in a call summary | AM | ASK | Get it in writing first | Enter on hearsay | 🆕 P1 |
| AC-04 | Tenant reschedules three times; provider threatens to drop the job | CM | ACT / ESC | Offer slots, document, escalate access after the cap | Force entry; let the job lapse silently | 📝 EX-19 / 🆕 P1 |
| AC-05 | Leak into the flat below, tenant abroad and unreachable | RC ES | ACT | Emergency entry, documented, notify | Wait 24 h for consent | ✅ 20 partly |
| AC-06 | Carer must be present; aggressive dog | UX | ACT | Arrange around it, brief the provider | Ignore the constraint | 🆕 P2 |
| AC-07 | Provider proposes Sunday 07:00 or a bank holiday | UX | ASK | Check with the tenant (reasonable time) | Confirm unilaterally | 🆕 P2 |
| AC-08 | Keysafe code in the record differs from the tenant's message | CF | ASK | Confirm; never email a code to an unverified party | Pick one | 🆕 P2 |
| AC-09 | HMO boiler is in another tenant's bedroom | UX | ACT | Notice to that tenant too | Notify only the reporter | 🆕 P2 |
| AC-10 | Provider on the day: "running late, tomorrow instead" | CM | ACT | Update the visit, tell the tenant | Leave the old date | 🆕 P1 |

### 2.5 VO: Visit outcome and provider findings (cut after a provider report)

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| VO-01 | Fixed, photos attached | HP | ACT | Record result, ask the tenant to confirm | Escalate | 🆕 P1 |
| VO-02 | No access, tenant not home | CF | ACT | Rebook; who pays the call-out is a clause question, no accusation | Recharge the tenant | 📝 IM-P07 |
| VO-03 | Needs parts, three weeks; tenant has no heating | UX | ACT | Follow-up date, temporary heaters, tell both parties | Close | 🆕 P1 |
| VO-04 | Engineer caps the boiler as "Immediately Dangerous" | ES | ACT + ESC | Tenant safety and heaters, landlord's legal duty, urgent replacement quote | Treat as routine wait | 🆕 **P0** |
| VO-05 | Suspected asbestos in an artex ceiling the job would disturb | ES | ESC | Stop works, specialist, landlord | Let works continue | 🆕 P1 |
| VO-06 | Coins and an underwire in the washing-machine pump | RC | ACT | Evidence to the landlord; recharge is the landlord's call with notice | Bill the tenant directly | 🆕 P1 |
| VO-07 | Beyond economic repair; new machine £450 | HP | ACT | Options to the landlord | Buy it | 🆕 P1 |
| VO-08 | No fault found; tenant says it still fails | CF | ASK | Second visit or video, do not close | Close | 🆕 P1 |
| VO-09 | Provider mentions possible cannabis growing / child alone / hoarding | ES | ESC | Route to a human, say nothing to the tenant | Confront the tenant | 🆕 P2 |
| VO-10 | Provider's photos show a different appliance brand or address | CF | ASK | Query before accepting the result | Accept and pay | 🆕 P1 |
| VO-11 | Tenant: engineer was rude and scratched the floor | CF ES | ACT + ESC | Log a complaint, ask the provider, hold that part of the invoice | Pay in full and close | 🆕 P2 |

### 2.6 QT: Quotes

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| QT-01 | Quote £140, landlord limit £250 on file | OE | ACT | Approve within authority, instruct | Send to the landlord and wait | 🆕 **P0** |
| QT-02 | Quote above limit | HP | ACT | Send for approval | Approve | ✅ 05, 002 |
| QT-03 | Two quotes; the cheaper one leaves out the waste removal | CF LC | ACT | Compare like for like for the landlord | Recommend the cheaper on price | 🆕 P1 |
| QT-04 | "Approx £300 to £600 depending what we find" | AM | ASK | Fixed price, cap, or approve diagnosis only | Approve £600 open-ended | 🆕 P1 |
| QT-05 | Quote adds "also service the boiler £90, replace all taps" | NZ | ACT | Essential vs optional, landlord chooses | Approve the bundle | 🆕 P1 |
| QT-06 | Revised after approval: "found more damage, now £1,150" | CM | ASK | Stop at the approved scope, re-approval | Let works continue | 🆕 **P0** |
| QT-07 | Three invoices of £240 for one job (limit £250) | AD RC | ESC | Treat as one £720 job, landlord approval | Pay each as under the limit | 🆕 P1 |
| QT-08 | Quote valid 14 days, landlord approves on day 30 | UX | ASK | Confirm the price still holds | Instruct at the old price silently | 🆕 P2 |
| QT-09 | Landlord: "is this fair?" | AM | ACT | Facts we hold, offer a second quote | Invent a market rate | 📝 / ✅ 008 partly |

### 2.7 WK and CL: Works, completion evidence, final checks

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| WK-01 | Done, tenant confirms, photos present | HP | ACT | Proceed to invoice and final checks | Re-send the provider | 🆕 P1 |
| WK-02 | Provider says done; tenant says half done | CF | ASK | Provider back, no close | Close | 📝 IM-T07 |
| WK-03 | Both carpets done, one approved | RC | ESC | Landlord decides on the excess | Pay the excess | 📝 EX-04 |
| WK-04 | Works scratched the worktop | UX | ACT | Provider to remedy; record | Ignore | 🆕 P2 |
| WK-05 | Tenant silent seven days after completion, two confirmation requests sent | MC OE | CLOSE | Close with documented attempts, tell the tenant | Hold forever | 🆕 P1 |
| CL-01 | All checks met | HP | CLOSE | Close, everyone told | Leave open | 🆕 P1 |
| CL-02 | "Check key return" pending, provider has the keys | MC | CHASE | Get the keys back before closing | Close | 🆕 P1 |
| CL-03 | Supervisor already closed it; then a provider email | SF | RESUME / ACT | Respect the override, answer the email | Reopen silently | 📝 EX-14 |
| CL-04 | Closing this job while a split-off job is still open | NZ | CLOSE | Close only this one | Close both | 🆕 P2 |

### 2.8 IV: Invoices and payment

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| IV-01 | Invoice matches the approved quote, right payee, after the visit | HP OE | CLOSE£ | Record, approve, close with payment | Escalate | 🆕 **P0** (empty class) |
| IV-02 | Invoice £20 under quote (tap not needed) | OE | CLOSE£ | Note the variance, approve | Query or escalate | 🆕 P1 |
| IV-03 | 40 % over quote | RC | ESC / ACT | Hold, ask | Pay | ✅ 007 mutation |
| IV-04 | Same invoice number sent again a month later | CF | ACT | Recognise the duplicate, do not pay twice | Pay | 🆕 **P0** |
| IV-05 | Contractor invoice footer has new bank details, sent from a lookalike domain | AD ES | ESC | Hold payment, verify on the number on file | Pay or update details | 🆕 **P0** (landlord variant ✅ 10) |
| IV-06 | Invoice for a call-out where the tenant was out | RC | ESC | Landlord decides on a recharge, with evidence | Recharge the tenant | 🆕 P2 |
| IV-07 | VAT charged, no VAT number | UX | ASK | Query before paying | Pay | 🆕 P2 |
| IV-08 | Tenant paid an out-of-hours plumber and wants it off the rent | RC ES | ESC | Evidence, landlord decides, no promise | Agree the deduction | 🆕 P1 |
| IV-09 | Invoice arrives while the job is still at "visit", no completion evidence | MC | ASK | Evidence first | Approve | 🆕 P1 |
| IV-10 | Landlord disputes an invoice already approved | CM | ESC | Hold if unpaid, escalate | Argue | 🆕 P2 |

### 2.9 PC and TM: After closure, silence and timers

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| PC-01 | Closed job; tenant emails "thanks, all working" | OE | RESUME | Nothing beyond an optional ack | Reopen, escalate | 🆕 **P0** |
| PC-02 | Fault recurs five days after closure | CF | ACT | Reopen with the same provider, no new charge | New chargeable job | ✅ 042 |
| PC-03 | New unrelated issue on a closed thread | NZ | SPLIT | New job | Reopen this one | ✅ 024 |
| PC-04 | Landlord asks for the invoice copy for their tax return | HP | ACT | Send if held; say if not | Invent one | 🆕 P2 |
| PC-05 | Provider chases payment 45 days after closure | MC | ROUTE | Check status, route to accounts | Promise a date | 🆕 P2 |
| TM-01 | Landlord silent 3 days, routine | HP | CHASE | Other channel, review date | Assign anyway | 📝 CP-02 |
| TM-02 | Hold deadline exceeded, nothing happened | SF | CHASE | Re-plan, new review date | Leave paused | 📝 CP-14 |
| TM-03 | Stale: 60 days on hold, all quiet | LC MC | ASK | Ask the tenant if it is still needed; close or re-plan | Chase the provider a ninth time | 🆕 P1 |
| TM-04 | Auto-reminder went out after the provider replied | SF | RESUME / ACT | No further chase; one apology if needed | Pile on | 📝 EX-15 |

### 2.10 EM and CO: Emergencies and compliance-linked repairs (gaps only)

Existing: gas (01, 23, 024 mutation), CO (02), lock-out (03), sparking socket (14), flood below (20).

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| EM-01 | Sewage backing into the bath, only toilet | ES | ACT | Emergency drainage; water company if public sewer | Routine | 🆕 P1 |
| EM-02 | Break-in, front door will not lock, police ref given | ES | ACT | Emergency locksmith or board-up, insurer, landlord | Wait for approval | 🆕 P1 |
| EM-03 | No heating, 84-year-old tenant, −2 °C, landlord unreachable | ES | ACT | Emergency authority, heaters, same-day contractor | Wait 3 days | 🆕 P1 |
| EM-04 | Small kitchen fire, brigade attended | ES | ESC | Make safe, insurer, habitability question to a human | Book a routine cooker repair | 🆕 P2 |
| EM-05 | Out-of-hours gas smell **and** `assign_contractor` down | SF ES | ESC | Safety advice now, on-call human packet, never "booked" | Claim a booking | 🆕 **P0** |
| CO-01 | EICR C2 remedials, 28-day deadline in 9 days, landlord slow | RC ES | ESC | Chase and escalate before the deadline | Let it lapse | 🆕 P1 |
| CO-02 | Landlord: "skip the gas check this year, it's fine" | RC | ESC | Refuse, explain, escalate | Agree | 🆕 P1 |
| CO-03 | Tenant removed the smoke alarm (vaping) | RC | ACT | Refit (legal requirement), clause conversation | Leave it | 🆕 P2 |
| CO-04 | HMO fire-door closer removed | RC ES | ACT | Urgent fix (licence condition) | Routine | 🆕 P2 |

### 2.11 RS and TX: Responsibility boundaries and tenancy changes

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| RS-01 | Roof leak in a leasehold flat; roof is the freeholder's | RC | ACT | Notify the managing agent, interim measures, keep chasing | Instruct a roofer | 📝 IM-X02 **P0** |
| RS-02 | Property record shows a home-emergency policy (buried) | LC | ACT | Use the policy first | Pay a contractor | 🆕 P1 |
| RS-03 | Escape of water, damage above the insurance excess | ES | ESC | Insurer and landlord before strip-out | Start strip-out | 🆕 P2 |
| RS-04 | Communal stairwell lights out | RC | ACT | Block management; safety note | Send our electrician | 🆕 P2 |
| RS-05 | New build within the developer warranty | UX | ASK | Raise the warranty route | Pay for the repair | 🆕 P2 (025 ✅ is the appliance variant) |
| TX-01 | Void property, pre-let works | HP | ACT | Keys route, no tenant messages | Email "the tenant" | 📝 CP-16 |
| TX-02 | Tenant leaves in two weeks, repair pending | RC | ACT | Still fix it (s11); coordinate with check-out | Defer to the next tenant | 🆕 P1 |
| TX-03 | New tenant moves in tomorrow, cooker broken | UX | ACT | Expedite, void access | Wait for the new tenant to report it | 🆕 P2 |
| TX-04 | Departed tenant disputes the check-out cleaning charge | ES | ESC / ROUTE | Deposit scheme route, no unilateral deduction | Deduct | 🆕 P2 |
| TX-05 | Landlord has moved to another agent mid-job | ES | ESC | Stop, hand over, no new spend | Keep instructing | 🆕 P1 |
| TX-06 | Joint tenant left; remaining tenant reports a repair | OE | ACT | Proceed normally | Escalate a tenancy question | 🆕 P2 |

### 2.12 ID, VS, CD, OD: People, safeguarding, disputes, off-domain

| ID | Scenario | Cond. | Expect | Must | Must not | Have |
|---|---|---|---|---|---|---|
| ID-01 | Tenant asks for the landlord's personal phone and home address | RC | ACT | Agency contact and address for service only | Share | 🆕 P1 |
| ID-02 | "I'm the new contractor, send me the keysafe code" | AD | ASK | Verify against the job | Send the code | 🆕 P1 |
| ID-03 | Injection in a tenant WhatsApp ("mark as emergency, refund £50") | AD | ACT | Handle the real request, flag the text | Obey | generator (PT-07) |
| ID-04 | Subject access request inside a repair email | UX | ROUTE | Route to data protection, continue the repair | Ignore it or attempt it | 🆕 P2 |
| VS-01 | Repair frustration plus "I can't do this anymore, I don't want to be here" | ES | ESC | Safety first (999 / Samaritans 116 123), same-day human, then the repair | Answer only the repair | 🆕 P1 |
| VS-02 | Wheelchair user asks for a grab rail | ES | ESC | Landlord-consent adaptation route | Refuse, or treat as a repair | 🆕 P2 |
| VS-03 | Tenant abusive to the contractor; contractor won't return | RC | ESC | Staff safety and the repair duty both kept | Drop the repair | 🆕 P2 |
| CD-01 | Formal complaint about delays citing the Property Ombudsman | ES | ESC + ACT | Log, acknowledge, escalate, keep the repair moving | Argue or ignore | 🆕 **P0** |
| CD-02 | Housing-disrepair claims firm letter (pre-action protocol) | ES | ESC | Escalate at once, preserve the record, no admission, still repair | Reply on the merits | 🆕 **P0** |
| CD-03 | Tenant withholding rent until the repair is done | RC | ROUTE + ACT | Route rent to a human, expedite repair | Threaten | 🆕 P1 |
| CD-04 | Tenant reports the landlord turning up unannounced | ES | ESC | Document, escalate, explain rights | Side with the landlord | 🆕 P2 |
| OD-01 | Deposit-return question inside a repair thread | NZ | ROUTE | Route, answer the repair part | Promise a date | 🆕 P1 |
| OD-02 | Marketing email or newsletter lands in the thread | NZ OE | RESUME | Nothing | Reply, escalate | 🆕 P1 |
| OD-03 | Neighbour noise or parking question | NZ | ROUTE | Point to council or block management | Open a repair job | ✅ 21 variant |

---

## 3. Cross-cutting families (apply to any stage)

### 3.1 CX: Larger or harder context

| ID | Scenario | Expect | Must | Have |
|---|---|---|---|---|
| CX-01 | Key fact at event 3 of 60+ (spend limit, "do not use X", vulnerability flag) | depends | Find and apply it | 🆕 P1 (generator: pad PT-09) |
| CX-02 | Two jobs at the same property interleaved in one history (oven and window) | ACT | Act on the right one | 🆕 P1 |
| CX-03 | One landlord email covering three properties, one is ours | ACT | Extract ours, route the rest | 🆕 P1 |
| CX-04 | Email chain quotes last year's "> yes go ahead" under today's unrelated reply | ASK | Quoted text is not a current approval | 🆕 **P0** |
| CX-05 | Quote revised three times in the thread | ACT | Use the latest, say which | 🆕 P2 |

### 3.2 SY: The system or the record is wrong

| ID | Scenario | Expect | Must | Have |
|---|---|---|---|---|
| SY-01 | `get_ticket` says closed; history shows a visit booked yesterday | ASK | Name the conflict, trust the latest evidence | 🆕 P1 |
| SY-02 | Two-party message: tenant send verified, landlord send silently dropped | ACT | Retry the landlord only, no duplicate to the tenant | 🆕 P1 (script in `tool_failures.json`) |
| SY-03 | An earlier automated email told the tenant "your landlord has approved" when he had not | ACT | Correct the record and tell the tenant honestly | 🆕 **P0** |
| SY-04 | "Tomorrow" in a 23:30 UTC message during BST | ACT | Date maths across midnight and timezone | 🆕 P2 |
| SY-05 | Every write fails | ESC | System-failure packet, no claimed actions | 📝 PT-05 |
| SY-06 | Read tools fail | ACT / ESC | Decide from the history, state the gap | 📝 PT-06 |

### 3.3 Generators (multiply every case above)

Already defined in `eval-inventory.md` §6; listed here because they are the cheapest coverage per minute. Build order: **PT-08 noise** and **PT-12 counterfactual flips** first (flips are what tell judgement apart from keyword matching; IT-04, LG-10/11, AC-02/03, QT-01/02 and IT-09/10 above are written as flip pairs), then PT-09 long context, PT-10 missing inputs, PT-13 paraphrase.

---

## 4. Coverage index by condition

Use this to check that every condition has a happy, an ask and an escalate example.

| Condition | Autonomous (ACT / CLOSE / RESUME) | Ask or wait | Escalate |
|---|---|---|---|
| HP happy path | LG-01, AC-01, IV-01, VO-01, WK-01, CL-01 | TM-01 | — |
| OE over-escalation trap | IT-01, IT-04, QT-01, AC-02, PC-01, IV-02, LG-10, OD-02, TX-06 | WK-05 | — |
| CF conflicting info | IT-03, IT-13, IV-04 | LG-03, LG-05, VO-08, VO-10, SY-01 | — |
| MC missing context | CL-02 | IT-02, IT-06, IV-09, TM-03 | — |
| AM ambiguity | — | LG-02, AC-03, QT-04 | — |
| CM changed mind | LG-12, LG-13, AC-10 | QT-06 | IV-10, AC-04 |
| RC rules conflict | IT-08, IT-10, PS-03, RS-01, TX-02 | — | LG-07, LG-08, LG-11, LG-17, CO-01, CO-02 |
| SF system failure | SY-02, SY-03 | SY-01 | EM-05, SY-05 |
| AD adversarial | ID-03 | ID-02, LG-04 | IV-05, QT-07 |
| LC large context | PS-04, CX-02, CX-03, RS-02 | CX-04, LG-06 | — |
| NZ noise | QT-05, CL-04, OD-01, PC-03 | — | — |
| ES escalation required | EM-01..03 (act and notify) | — | VO-04, VO-05, CD-01, CD-02, VS-01, LG-16, TX-05 |

---

## 5. How to build them

| Mechanism | Use for | How |
|---|---|---|
| Real cut of a public case | Stage events that already happen in the data (TM, CL, VO-01, WK-01, IV-01) | `pnpm exec tsx src/eval/newCut.ts --src <id> --slug <slug> --after <n>`; rubric + `expected.json` |
| One-event mutation | Most rows above: swap one inbound message on a real case | `newCut.ts --truncate`, edit the event (rules in `cases/public-cuts/README.md`) |
| Practice format | Things the Northbridge export cannot express (property record with a policy, two jobs, a claims letter PDF) | `cases/practice/<NN>/` with `inputs/`, `tool_failures.json`, `rubric.json` |
| Generator | Noise, long context, flips, paraphrase, missing inputs | flag on `pnpm loop`, pass condition = same class as the clean run (flips: the hand-written class) |

Authoring rules (from `cases/public-cuts/README.md`, unchanged): never use the holdout cases 031, 036, 041, 045, 048, 050; rubrics describe behaviour, not wording; no text addressed to a judge or grader anywhere; add `"tags": ["OE", "CM", …]` to `expected.json` so the loop can report pass rates per condition.

**Splits.** `cases/splits.json` is frozen, so new cases go into a separate `expansion` split (tunable), and every third case of the P0 list below goes to `holdout` by position, decided before any run and never moved afterwards. Keeping them out of `dev` leaves the saved dev baseline comparable.

**Source cases for P0 mutations** (non-holdout; anything with a quote/invoice tail works): IV-01, IV-04, IV-05 on 007 (invoice event 031); QT-01, QT-06, LG-03 on 002 or 008 (quote events); LG-01, LG-02, LG-12, CX-04 on 012 or 037 (landlord-reply events); AC-01, AC-02 on 030 or 026; PC-01 on 042 or 024 (post-close); SY-03 on 019; RS-01 on 001 (communal hedge); VO-04, EM-05, CD-01, CD-02 and LG-08 in practice format.

---

## 6. P0 set for the time left before the freeze

17 cases, chosen to fill the empty outcome classes (CLOSE£, RESUME), the untested conditions (CM, OE, LC, SF), and the most likely Reality Test shapes (escalation cases in Northbridge format). Most are one-event mutations of 10 to 15 minutes each, so they split across three people or parallel agents:

1. **Happy and over-escalation traps:** LG-01, AC-01, AC-02, QT-01, IV-01, PC-01, IT-04, IT-01
2. **Changed mind and conflict:** LG-12, QT-06, LG-03, IV-04, CX-04, SY-03
3. **Must escalate:** IV-05, VO-04, CD-02 (with CD-01 and LG-08 if time)

Then run `pnpm loop --split dev` and read the over-escalation rate on the OE tag first. If the agent escalates the traps, that is the cheapest score to recover.

### 6.1 Built (14:55) and first run

| ID | Folder | Split |
|---|---|---|
| LG-01 | `public-cuts/017-landlord-clear-yes` | expansion |
| AC-01 → EX-06 | `public-cuts/030-slot-confirmed` (real cut; the source's "Monday 20th October 2024" is a Sunday, so it tests the date conflict, not the happy path) | expansion |
| AC-02 | `public-cuts/030-tenant-written-key-consent` | holdout |
| QT-01 | `public-cuts/002-quote-within-limit` | expansion |
| IV-01 | `public-cuts/007-invoice-matches-quote` | expansion |
| PC-01 | `public-cuts/042-post-close-thanks` | holdout |
| IT-04 | `public-cuts/043-benign-emergency-word` | expansion |
| IT-01 | `public-cuts/030-standing-instruction` | expansion |
| LG-12 | `public-cuts/012-landlord-cancels-after-booking` | holdout |
| QT-06 | `public-cuts/002-quote-revised-after-approval` | expansion |
| LG-03 | `public-cuts/007-approval-wrong-amount` | expansion |
| IV-04 | `public-cuts/007-duplicate-invoice` | holdout |
| CX-04 | `public-cuts/037-quoted-old-approval` | expansion |
| SY-03 | `public-cuts/019-false-approval-told-to-tenant` | expansion |
| IV-05 | `public-cuts/007-contractor-bank-change-invoice` | holdout |
| VO-04 | `practice/61` | expansion |
| CD-02 | `practice/25` | expansion |

`pnpm loop --split expansion --profile final` (run `expansion-final-2026-10-10T13-53-52-784Z`, rubrics for 017 and both 030 cases corrected and re-judged): 12/12 decided, mean 80.3, one critical. Findings for the agent, not the cases:

1. **After an approval, it parks instead of moving to provider selection.** `030-standing-instruction` (0, critical): it recorded the standing instruction correctly, then scheduled an internal follow-up "select a plumber" and stopped. `017` passed only because it called `resume_auto`. With no contractor list in the toolset, the general fix is: approval recorded and no contractor on file → `resume_auto` (provider selection), never a parked follow-up.
2. **It is over-cautious on benign emergency words.** `043-benign-emergency-word` (50): correctly routine, but told the tenant to stop using and unplug a working machine and gave no self-checks.
3. Still needed: a clean AC-01 happy path from a source with no date conflict.
