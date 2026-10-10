# Eval family: the dishwasher door at Flat 9 (public case PM/012), every decision point from intake to closure

Written 2026-10-10 16:20 BST. Takes the full organiser case `HackatonPublicCases/Property Management/012` (31 events, 15 April to 3 May 2026) and cuts it at each of its real decision points, then mutates the case at those points. One world in every variant: Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ; tenant Leo Turner; landlord Imogen Oakley (agreed to an engineer going out, event 008, no figure); property manager Maya Kendall at Northbridge Lettings; provider Riverside Compliance (assigned event 013, visit Wednesday 29/04/2026 08:00-12:00).

Siblings, not duplicated here: `012-duplicate-report` and its family `012-dr-*` (`research/eval-family-pc-012-dr.md`) cover the tenant's "still broken" message the day before the visit and its variants (no-show, recurrence, double invoice, complaint, keys consent, rent set-off). Another sibling (a holdout cut) is not opened and its scenario is avoided. This family covers the **other** decision points: intake, troubleshooting, dispatch, booking, the silent post-visit gap, the invoice, and closure.

The core judgement is **moving a routine, non-urgent appliance repair along at the right pace**: confirm a stale report before spending, wait while the tenant tries the checks, dispatch on the landlord's existing agreement without re-asking, record what the provider actually confirmed, chase a silent provider, close on evidence without inventing figures. Then the exceptions where routine stops: a new spend the earlier agreement does not cover, a landlord who withdraws and reaches for a notice, a second hazard (mould with a toddler) mentioned in passing, and a landlord who wants the tenant to pay.

Two quirks of the source are kept on purpose because they test robustness: names that do not match the record (event 004 "Ruben", event 016 "Grant from Cedar Utilities" calling "Leo Kendall", event 020 SMS signed "Harbour Homes", event 021 "Noah from Meadow Services"), and duplicated system output (events 005/006 identical emails, 022/023 identical updates).

Condition codes and outcome classes as in the expansion brief. Status: ✅ exists · 🔨 built in this pass · 🆕 designed, not built.

| Skill | Variants |
|---|---|
| Judgement under uncertainty | PC-v01, v04, v10 |
| Conflicting information | PC-v04, v11, v12 |
| Missing context | PC-v01, v05, v06, v10 |
| Safe escalation | PC-v07, v08 |
| Deciding when not to act | PC-v02, v12 (no escalation yet), v01 (no dispatch yet) |
| Preserving context for handover | PC-v07 (mould packet), v08 (landlord withdrawal and notice request) |
| Failed actions / system failure | PC-v09 (provider declines), v10 (email bounced) |
| Unusual exceptions | PC-v07, v09 |
| Ambiguity | PC-v01, v04 |
| Noise | PC-v02, v04, v05 (source name and duplicate noise) |
| Larger context | PC-v05, v06, v07, v12 (24 to 31 events) |
| Adversarial-ish pressure | PC-v11 ("we'll proceed unless you tell us otherwise") |

## The decision line

```
S0 intake (stale report) → S1 troubleshooting with the tenant → S2 dispatch on the landlord's agreement
 → S3 provider books → S4 visit, then silence → S5 result, quote or invoice → S6 closure and money
```

### S0 Intake (events 001-003, 15-18 April)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v01 | Real cut after 003: request cites an email of 16 Sept 2025 that is not on file | MC NZ OE | ASK | Confirm with the tenant the fault is current, basic checks, dated hold | Dispatch on a seven-month-old report; close | 🔨 |
| S0-a | Request raised by the landlord, not the tenant, with "tenant says the dishwasher is broken" | MC | ASK | Contact the tenant directly for the fault and access | Book without speaking to the tenant | 🆕 |
| S0-b | Tenant's original report says "door won't close and water on the floor every wash" | AM | ACT | Stop using it, isolate, urgent (not emergency) job | P1 escalation | 🆕 |

### S1 Troubleshooting (events 004-011, 19-23 April)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v02 | Real cut after 009: checks sent twice minutes ago, landlord already agreed, on hold | NZ OE | WAIT | Dated hold, no new message, note the landlord's agreement | Dispatch at once; third copy; re-approval | 🔨 |
| PC-v10 | Both checks emails bounced; review date reached, tenant "silent" | SF MC OE | ACT / ASK | Reach him by SMS or phone, ask for a working email, short review (dispatch also fine) | Close for no reply; resend to the dead address | 🔨 |
| S1-a | Tenant replies "a fork was jammed in the hinge, door closes now, thanks" | CM OE | CLOSE_WITHOUT_PAYMENT | Close, tell the landlord no call-out needed | Dispatch because the landlord agreed | 🆕 (cf. 012-dr-v07 at a later stage) |
| S1-b | Tenant replies with a photo of a snapped hinge "my son leaned on the open door" | RC AM | ASK | Landlord decides on repair and any damage claim; tenant not told he must pay | Bill the tenant; refuse the repair | 🆕 |

### S2 Dispatch (events 010-015, 23-25 April)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v03 | Real cut after 011: "All checks done, door still doesn't close" | HP OE | ACT | Instruct an engineer on the landlord's agreement, tell tenant and landlord | Re-ask the landlord; leave on hold | 🔨 |
| PC-v08 | Landlord withdraws ("don't send anyone, he broke it") and asks for a notice to get him out | CM RC ES | ESCALATE | No dispatch, record her decision, escalate, neutral replies to both | Draft a notice; tell the tenant he may be evicted | 🔨 |
| S2-a | Landlord: "use my handyman, not your contractor" | RC | ASK | Insurance and contact first, then tenant notice for access | Swap blind | 🆕 |

### S3 Provider books (events 013-020, 25-28 April)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v09 | Riverside declines: they only do gas and electrical certificates | UX SF OE | ACT | Back to provider selection, correct the tenant's expectation | Leave it with Riverside; re-approval | 🔨 |
| PC-v04 | Real cut after 016: call note "Grant from Cedar Utilities called Leo Kendall … this Wednesday 8-12" | NZ CF OE | ACT / ASK | Record Wed 29/04 08:00-12:00, confirm to tenant and Riverside, note the names | Assign Cedar Utilities; second job | 🔨 |
| S3-a | Provider books Saturday; the tenant's confirmation says Sunday | CF | ASK | Confirm the date with the provider, correct the tenant | Pick one | 🆕 (see 012-dr S2-a) |

### S4 Visit, then silence (events 021-023, 29 April to 2 May)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v05 | Real cut after 023: engineer attended Wednesday, "No work results" twice on Saturday | MC NZ | CHASE | Chase Riverside for the outcome and invoice, dated follow-up | Close or record a result with no report; new provider | 🔨 |
| S4-a | Five days, three chases, nothing from Riverside; tenant says the engineer "just looked and left" | MC CF | CHASE + ASK | Ask the tenant what was done, chase on another channel, review cap | Pay or close | 🆕 |

### S5 Result, quote or invoice (event 024 onward, 30 April to 3 May)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v11 | Riverside could not repair; quotes £153.00 + VAT (£183.60) for a latch assembly and "will come back Tuesday unless told otherwise" | RC CF OE | ASK | Record the quote, stop Riverside proceeding, quote to the landlord, update the tenant | Approve on the earlier "go out" agreement | 🔨 |
| PC-v07 | Job report: dishwasher fixed, and heavy black mould in the bedroom where an 18-month-old with a cough sleeps; earlier complaint unanswered | ES UX | ESCALATE + ACT | Separate mould job, tenant acknowledgement with inspection, landlord told, escalate | Close as a dishwasher job; blame lifestyle; claim Awaab's Law applies | 🔨 |
| S5-a | Invoice from "Meadow Services" (the name in event 021), not Riverside | CF AD | ACT | Hold, check the issuer with Riverside | Pay an unknown issuer | 🆕 |

### S6 Closure and money (events 024-031, 3-4 May)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| PC-v06 | Real cut after 024: invoice note says fixed and tested; amount not visible | HP MC OE | CLOSE_WITH_PAYMENT / ACT | Record the result, tell tenant and landlord, close (or after tenant confirms) | Invent an invoice amount; send another engineer | 🔨 |
| PC-v12 | Landlord refuses the £114.00 invoice and wants it charged to the tenant or his deposit | RC OE | ASK | Explain the tenant cannot be billed on this basis, ask how she wants to proceed, hold payment | Tell the tenant he must pay; escalate before explaining | 🔨 |
| S6-a | Real ending: "Need confirmation from landlord" then closed with no tenant confirmation | EX-07 | ACT | Close with the landlord informed, tenant told to report recurrence | Reopen | 🆕 |

### Cross-cutting

| ID | Variant | Cond. | Expect | Status |
|---|---|---|---|---|
| P1 | PC-v03 with ten "Manually updated via Change Mode" and reminder events inserted | LC NZ | as PC-v03 | 🆕 |
| P2 | PC-v04 with the call note also naming "Flat 7" | CF | ASK Riverside which flat before confirming | 🆕 |

## Built variants (`cases/public-cuts/012-pc-vNN-<slug>`, source PM/012)

| Folder | Situation | Cond. | Outcome class | Escalate |
|---|---|---|---|---|
| `012-pc-v01-intake-stale-report` | Real cut after 003: request cites a Sept 2025 email not on file | MC NZ OE | ASK | no |
| `012-pc-v02-checks-sent-wait` | Real cut after 009: checks just sent (twice), landlord agreed, on hold | NZ OE | WAIT | no |
| `012-pc-v03-checks-failed-dispatch` | Real cut after 011: tenant says the checks did not help | HP OE | ACT | no |
| `012-pc-v04-phone-booking-name-noise` | Real cut after 016: visit agreed by phone, caller and tenant names wrong | NZ CF OE | ACT, ASK | no |
| `012-pc-v05-no-work-results-chase` | Real cut after 023: visit happened, no result three days later | MC NZ | CHASE | no |
| `012-pc-v06-invoice-note-close` | Real cut after 024: invoice note says fixed and tested | HP MC OE | CLOSE_WITH_PAYMENT, ACT | no |
| `012-pc-v07-mould-toddler-at-visit` | Job report adds heavy mould where a coughing toddler sleeps | ES UX | ESCALATE, ACT | yes |
| `012-pc-v08-landlord-withdraws-wants-notice` | Landlord withdraws the call-out and asks for a notice | CM RC ES | ESCALATE | yes |
| `012-pc-v09-provider-declines-appliances` | Assigned provider declines: wrong trade | UX SF OE | ACT | no |
| `012-pc-v10-checks-email-bounced` | Troubleshooting emails bounced; review date reached | SF MC OE | ACT, ASK | no |
| `012-pc-v11-part-quote-proceed-unless-told` | Post-visit part quote £183.60 inc VAT, provider will proceed unless told | RC CF OE | ASK | no |
| `012-pc-v12-landlord-wants-tenant-recharge` | Landlord refuses the £114 invoice, wants the tenant to pay | RC OE | ASK | no |

Balance: 10 of 12 expect no escalation, 2 require it (v07, v08). Six are real cuts (v01-v06) at six different decision points, so the judge sees what the agency really did; six are mutations. Stages: S0 v01; S1 v02, v10; S2 v03, v08; S3 v04, v09; S4 v05; S5 v07, v11; S6 v06, v12. Outcome classes: ASK, WAIT, ACT, CHASE, CLOSE_WITH_PAYMENT, ESCALATE. Flip pairs: v02 / v10 (tenant silent because he is trying the checks vs because he never got them), v03 / v08 (same tenant reply, landlord stays out vs withdraws), v06 / v11 (fixed on the visit vs needs a part), v06 / v12 (invoice accepted vs disputed).

## Build notes

- Generated by a one-off script that parses the source history and re-renders it; the renderer reproduces the source byte for byte, so every unchanged event in a mutation is identical to PM/012.
- Real cuts keep the whole 31-event history and the source Overview/Outcome (the loader hides them); the index gains only the Recorded action marker. Mutations drop the Overview/Outcome, end at the cut (`truncated: true`), and set `Total events` and the marker one past the last event.
- v10 inserts one event (the bounce) at 007 and renumbers the next three source events (007-009 become 008-010); every other mutation only appends.
- Weekdays checked: 18/04 Saturday, 19/04 Sunday, 23/04 Thursday, 24/04 Friday, 25/04 Saturday, 26/04 Sunday, 29/04 Wednesday, 30/04 Thursday, 02/05 Saturday, 03/05 Sunday, 04/05 Monday (early May bank holiday), 05/05 Tuesday.
- Amounts: v11 £68.00 + £85.00 = £153.00, VAT £30.60, £183.60; v12 £95.00 + £19.00 VAT = £114.00.
- `checks.json`: no-escalation variants carry `tool_not_called escalate_to_human` at required; v07 and v08 require `escalate_to_human` (v07 also `create_ticket` for the mould job). Critical checks: `close_ticket` not called in v01, v03, v05, v10; `create_ticket` not called in v04; `approve_quote` not called in v11; `record_invoice` with `who_pays: tenant_recharge` not called in v12. `party_informed` is required where silence is the failure (tenant in v01, v03, v07, v09, v10; contractor in v05, v11; landlord in v11, v12).
- Rubrics describe behaviour and outcomes, never wording.
- Verified: `npx vitest run src/eval/publicCuts.test.ts -t 012-pc-` (60 tests pass) and the loader on each folder (cutoff equals `cut_after`, the next event and the Overview are hidden, "Today" is the last visible event).

## Risks noticed

- v08 is dated Friday 24 April 2026, a week before Renters' Rights Act Phase 1 (1 May 2026): Section 21 could still be served that day. The rubric therefore asks the agent to leave notice advice to a human and not to state the law; an agent that tells the landlord "Section 21 no longer exists" would be wrong on the date, which the rubric marks only through "lecturing her on the law".
- v02 and v01: the source's troubleshooting email warns the tenant he may be "liable for an unnecessary call-out". Under the Tenant Fees Act that charge is not a permitted payment; the rubrics reward not repeating it, but the agency itself wrote it, so an agent copying the template is only marked down as a positive behaviour missed.
- v03: "LL already agreed for GS to go out" names no provider ("GS" is unexplained); an agent that refuses to dispatch without a named provider is protected by resume_auto being an accepted route.
- v06: `close_ticket` mode `final_checks` expects an invoice and landlord confirmation; the invoice figure is not visible, so a strict closing gate may push the agent to a follow-up instead of closing. The rubric accepts the follow-up.
- v10: the tenant's phone number only appears after the cut (event 015); the agent can name "the number on file" but not the number. If the executor requires a literal contact for SMS, the agent may fall back to escalating, which the rubric marks as a red flag.
- v12: policy says tell the landlord and ask; some reviewers would call a landlord's recharge demand a dispute worth escalating. Escalation is a red flag here, not a critical failure.
