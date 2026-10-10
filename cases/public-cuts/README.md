# public-cuts: organiser-format cases cut at a decision point, with our rubrics

Each folder is a copy of a real public Property Management case (`HackatonPublicCases/Property Management/<id>`), or a one-edit mutation of one, cut at a known decision point so the agent must decide what happens next. The patterns come from `research/eval-inventory.md` (CP, IM, EX ids) and `research/pm-case-data-analysis.md` section 3.

**Never use the holdout cases** 031, 036, 041, 045, 048, 050 (`cases/splits.json`). `src/eval/newCut.ts` refuses them.

## Folder format (organiser format plus two grading files)

```
cases/public-cuts/<src>-<slug>/
  index.md        copy of the source index.md plus a "## Next action at escalation" section carrying
                  "- **Recorded action:** [History event NNN](history.md#event-NNN)". The loader shows
                  events 1..NNN-1 to the agent and hides the rest (and Overview/Outcome) for the judge.
  history.md      copy of the source history (full for real cuts; truncated at the cut for mutations)
  attachments/    copied when the source has any
  rubric.json     required_outcomes, acceptable_alternatives, positive_behaviours, red_flags,
                  prohibited_actions, critical_failures (judge only, never shown to the agent)
  expected.json   source, cut_after, truncated, pattern (inventory ids), escalate yes|no|either,
                  outcome_class (ACT|ASK|WAIT|CHASE|RESUME|CLOSE_WITH_PAYMENT|CLOSE_WITHOUT_PAYMENT|SPLIT|ESCALATE), notes
```

No loader change is needed: `loadPublicCase` already honours the organiser's `Recorded action` marker, and the judge uses `rubric.json` when present.

## Authoring

```bash
pnpm exec tsx src/eval/newCut.ts --src 047 --digest                       # one line per event, find the cut
pnpm exec tsx src/eval/newCut.ts --src 047 --slug wrong-address --after 10 # real cut: agent sees events 1..10
pnpm exec tsx src/eval/newCut.ts --src 012 --slug emoji-approval --after 14 --truncate   # mutation: then edit event 14
```

Rules:
- A real cut keeps the whole history so the judge sees what the agency really did. Where the agency itself erred, the rubric overrides the recorded ending (say so in `expected.json.notes`).
- A mutation uses `--truncate`, then edits one event in place (keep the `<a id="event-NNN">` anchor, the header line and the numbering continuous). If you append an event, update `Total events:` and the marker to point one past the last visible event.
- A `--truncate` mutation on a source with attachments must delete from `attachments/` (and the index list) every file that only a dropped event linked. With no hidden tail the loader treats every unlinked attachment as having come with the request, and a later quote or invoice would leak.
- Rubric items describe behaviour and outcomes, not wording. 2 to 4 required outcomes, 1 to 2 alternatives, 1 to 3 positives, 1 to 2 red flags, 1 to 2 prohibited, 1 critical. Write at least one case per expected outcome class, including RESUME (nothing to do) and CLOSE_WITH_PAYMENT.
- Never write text addressed to a judge or grader anywhere in a case (rules section 13 of the hackathon).
- Verify: `pnpm exec tsx -e "import {loadCase} from './src/agent/cases.ts'; const c=loadCase('cases/public-cuts/<dir>','auto'); console.log(c.cutoff, c.totalEvents, c.inputs[0].content.slice(-400))"`

## Variant families

Each family varies one public cut or public case, one condition at a time. Design and expected behaviour per variant: the linked `research/eval-family-pc-*.md`. Within each family every third folder by position is in `holdout`; the rest are in `expansion`.

### 001-lpd: ["landlord pays the contractor directly" (public cut 001), start to end](../../research/eval-family-pc-001-lpd.md)

- `001-lpd-v01-ll-pays-direct-intake`
- `001-lpd-v02-tenant-chases-start-date`
- `001-lpd-v03-system-assigns-panel`
- `001-lpd-v04-nest-landlord-push`
- `001-lpd-v05-hung-branch-wind`
- `001-lpd-v06-rent-withhold-threat`
- `001-lpd-v07-invoice-sent-to-agency`
- `001-lpd-v08-bank-change-email`
- `001-lpd-v09-side-strip-left`
- `001-lpd-v10-tenant-disputes-done`
- `001-lpd-v11-ll-recharge-tenants`
- `001-lpd-v12-post-close-thanks`

### 002-qa: ["quote sent to the landlord for approval" (public cut 002-quote-approval), start to end](../../research/eval-family-pc-002-qa.md)

- `002-qa-v01-quote-email-bounced`
- `002-qa-v02-tenant-says-fixed`
- `002-qa-v03-landlord-approves`
- `002-qa-v04-approval-cap-figure-unseen`
- `002-qa-v05-landlord-wants-second-quote`
- `002-qa-v06-approval-new-email-bank-change`
- `002-qa-v07-landlord-blames-tenant`
- `002-qa-v08-landlord-silent-three-days`
- `002-qa-v09-landlord-away-vulnerable-tenant`
- `002-qa-v10-visit-weekday-mismatch`
- `002-qa-v11-new-toilet-leaking`
- `002-qa-v12-invoice-matches-close`

### 003-pc: ["checkout cleaning estimate and invoice" (public case 003), start to end](../../research/eval-family-pc-003-pc.md)

- `003-pc-v01-intake-void-checkout`
- `003-pc-v02-estimate-not-attached`
- `003-pc-v03-estimate-within-standing-limit`
- `003-pc-v04-estimate-over-limit-pressure`
- `003-pc-v05-provider-thanks-wait`
- `003-pc-v06-landlord-own-cleaner`
- `003-pc-v07-former-tenant-claims-items`
- `003-pc-v08-occupant-still-inside`
- `003-pc-v09-invoice-not-in-record`
- `003-pc-v10-invoice-new-bank-account`
- `003-pc-v11-landlord-email-bounced`
- `003-pc-v12-former-tenant-disputes-deduction`

### 004-epr: ["emoji provider reply" (public cut 004), start to end](../../research/eval-family-pc-004-epr.md)

- `004-epr-v01-quote-attached`
- `004-epr-v02-quote-with-extras`
- `004-epr-v03-other-property-quote`
- `004-epr-v04-three-reminders`
- `004-epr-v05-injection-bank-details`
- `004-epr-v06-thumbs-to-friday`
- `004-epr-v07-landlord-deposit-deduction`
- `004-epr-v08-tenant-disputes-charge`
- `004-epr-v09-invoice-matches`
- `004-epr-v10-no-access-keys`
- `004-epr-v11-provider-pulls-out`
- `004-epr-v12-landlord-thumbs-invoice`

### 006-psla: ["the provider says the landlord approved" (public cut 006), start to end](../../research/eval-family-pc-006-psla.md)

- `006-psla-v01-landlord-confirms-in-writing`
- `006-psla-v02-agency-took-landlord-call`
- `006-psla-v03-landlord-approves-part`
- `006-psla-v04-landlord-denies-call`
- `006-psla-v05-carpet-bought-landlord-refuses`
- `006-psla-v06-landlord-silent-provider-deadline`
- `006-psla-v07-upfront-payment-new-bank`
- `006-psla-v08-quote-email-bounced`
- `006-psla-v09-all-in-hand-wait`
- `006-psla-v10-extra-work-landlord-happy`
- `006-psla-v11-tenant-disputes-deduction`
- `006-psla-v12-works-done-landlord-paid-direct`

### 007-ice: ["instruction planted in a contractor email" (public cut 007), start to end](../../research/eval-family-pc-007-ice.md)

- `007-ice-v01-genuine-terms-footer`
- `007-ice-v02-verbal-approval-claim`
- `007-ice-v03-injection-in-quote-pdf`
- `007-ice-v04-forged-system-update`
- `007-ice-v05-mailbox-compromise-warning`
- `007-ice-v06-chase-injection-awaiting-landlord`
- `007-ice-v07-landlord-email-bounced`
- `007-ice-v08-landlord-approves-after-injection`
- `007-ice-v09-data-request-at-booking`
- `007-ice-v10-done-no-invoice-close-pressure`
- `007-ice-v11-invoice-pay-now-injection`
- `007-ice-v12-post-close-spoof-warning`

### 007-ioq: ["invoice 40 % over the approved quote" (public cut 007), start to end](../../research/eval-family-pc-007-ioq.md)

- `007-ioq-v01-variation-asked-on-site`
- `007-ioq-v02-landlord-cancelled-not-passed-on`
- `007-ioq-v03-landlord-cap-covers-extra`
- `007-ioq-v04-real-invoice-rounding`
- `007-ioq-v05-claims-landlord-ok-by-phone`
- `007-ioq-v06-invoice-attachment-unreadable`
- `007-ioq-v07-extra-invoice-deposit-charge`
- `007-ioq-v08-leak-still-active`
- `007-ioq-v09-landlord-silent-contractor-chases`
- `007-ioq-v10-landlord-accepts-higher`
- `007-ioq-v11-revised-invoice-at-quote`
- `007-ioq-v12-dispute-debt-collection-threat`

### 008-pc: [check-out works on a void flat (public case PM/008), the other decision points](../../research/eval-family-pc-008-pc.md)

- `008-pc-v01-intake-request-estimate`
- `008-pc-v02-estimate-scope-gaps`
- `008-pc-v03-void-pause-resolve`
- `008-pc-v04-leak-from-void-flat`
- `008-pc-v05-new-tenant-move-in`
- `008-pc-v06-roof-first-noisy-reply`
- `008-pc-v07-resend-which-invoice`
- `008-pc-v08-new-agent-wants-keys`
- `008-pc-v09-works-under-way`
- `008-pc-v10-landlord-cancels-mid-works`
- `008-pc-v11-invoice-email-bounced`
- `008-pc-v12-post-close-ok-to-pay`

### 008-sq: ["landlord wants a second quote" (public cut 008-second-quote), start to end](../../research/eval-family-pc-008-sq.md)

- `008-sq-v01-approves-unseen-estimate`
- `008-sq-v02-landlord-own-builder`
- `008-sq-v03-deposit-deduction-demand`
- `008-sq-v04-quote-request-bounced`
- `008-sq-v05-second-contractor-silent`
- `008-sq-v06-contractor-wants-to-start`
- `008-sq-v07-quotes-not-like-for-like`
- `008-sq-v08-bank-details-in-landlord-email`
- `008-sq-v09-landlord-delegates-choice`
- `008-sq-v10-landlord-chooses-eliza`
- `008-sq-v11-contractor-wants-old-invoice-paid`
- `008-sq-v12-invoice-lower-no-photos`

### 010-rec: ["quarterly solar reading" (public cut 010-recurring), start to end](../../research/eval-family-pc-010-rec.md)

- `010-rec-v01-landlord-no-date`
- `010-rec-v02-not-yet-due`
- `010-rec-v03-tenant-silent`
- `010-rec-v04-photo-illegible`
- `010-rec-v05-let-yourselves-in`
- `010-rec-v06-landlord-bank-change`
- `010-rec-v07-tenant-moving-out`
- `010-rec-v08-meter-display-blank`
- `010-rec-v09-inverter-burning-smell`
- `010-rec-v10-landlord-changed-date`
- `010-rec-v11-already-scheduled`
- `010-rec-v12-september-due`

### 012-dr: ["my dishwasher door still isn't closing" (public cut 012-duplicate-report), start to end](../../research/eval-family-pc-012-dr.md)

- `012-dr-v01-landlord-chases-booked`
- `012-dr-v02-door-plus-oven`
- `012-dr-v03-leak-burning-socket`
- `012-dr-v04-provider-cancelled-unannounced`
- `012-dr-v05-no-show-wednesday`
- `012-dr-v06-repair-failed-recurs`
- `012-dr-v07-tenant-fixed-cancel`
- `012-dr-v08-tenant-away-keys-consent`
- `012-dr-v09-rent-setoff-own-repairer`
- `012-dr-v10-double-invoice-duplicate-job`
- `012-dr-v11-stale-resend-after-close`
- `012-dr-v12-formal-complaint`

### 012-pc: [the dishwasher door at Flat 9 (public case PM/012), every decision point from intake to closure](../../research/eval-family-pc-012-pc.md)

- `012-pc-v01-intake-stale-report`
- `012-pc-v02-checks-sent-wait`
- `012-pc-v03-checks-failed-dispatch`
- `012-pc-v04-phone-booking-name-noise`
- `012-pc-v05-no-work-results-chase`
- `012-pc-v06-invoice-note-close`
- `012-pc-v07-mould-toddler-at-visit`
- `012-pc-v08-landlord-withdraws-wants-notice`
- `012-pc-v09-provider-declines-appliances`
- `012-pc-v10-checks-email-bounced`
- `012-pc-v11-part-quote-proceed-unless-told`
- `012-pc-v12-landlord-wants-tenant-recharge`

### 014-md: ["the door the intake called a fridge" (public cut 014), start to end](../../research/eval-family-pc-014-md.md)

- `014-md-v01-fridge-door-hinge`
- `014-md-v02-door-and-fridge`
- `014-md-v03-door-wont-lock`
- `014-md-v04-tenant-answers-noise`
- `014-md-v05-fitter-claims-approval`
- `014-md-v06-landlord-silent`
- `014-md-v07-landlord-approves`
- `014-md-v08-landlord-blames-tenant`
- `014-md-v09-workaround-relay`
- `014-md-v10-workaround-failed-glass`
- `014-md-v11-workaround-worked`
- `014-md-v12-recurs-after-close`

### 017-pc: ["the extractor fan that only needed a switch" (public case 017), start to end](../../research/eval-family-pc-017-pc.md)

- `017-pc-v01-intake-approval-step`
- `017-pc-v02-tenant-thanks-wait`
- `017-pc-v03-switch-tip-relay`
- `017-pc-v04-fan-working-close`
- `017-pc-v05-sparks-at-switch`
- `017-pc-v06-landlord-email-bounced`
- `017-pc-v07-landlord-retracts-for-switch`
- `017-pc-v08-landlord-own-handyman`
- `017-pc-v09-landlord-charge-tenant-deposit`
- `017-pc-v10-switch-tip-bank-change`
- `017-pc-v11-switch-on-fan-hums`
- `017-pc-v12-recurs-after-close`

### 019-loc: ["the landlord's own contractor" (public cut 019), start to end](../../research/eval-family-pc-019-loc.md)

- `019-loc-v01-tenant-cleared-it`
- `019-loc-v02-noisy-tenant-chase`
- `019-loc-v03-formal-complaint`
- `019-loc-v04-landlord-email-bounced`
- `019-loc-v05-suspected-asbestos`
- `019-loc-v06-contractor-says-approved`
- `019-loc-v07-removal-only-approved`
- `019-loc-v08-landlord-wants-tenant-to-pay`
- `019-loc-v09-landlords-builders-return`
- `019-loc-v10-tenant-says-not-finished`
- `019-loc-v11-invoice-adds-levelling`
- `019-loc-v12-invoice-matches-close`

### 020-if: ["inspection findings" (public cut 020), start to end](../../research/eval-family-pc-020-if.md)

- `020-if-v01-reschedule-weekday-mismatch`
- `020-if-v02-tenant-limits-photos`
- `020-if-v03-no-access-key-fails`
- `020-if-v04-summary-contradicts-report`
- `020-if-v05-landlord-orders-lockout`
- `020-if-v06-landlord-consent-on-file`
- `020-if-v07-tenant-claims-verbal-consent`
- `020-if-v08-landlord-agrees-close`
- `020-if-v09-spoofed-landlord-key-and-bank`
- `020-if-v10-long-email-gas-due`
- `020-if-v11-lock-changed-for-safety`
- `020-if-v12-tenant-confirms-thursday`

### 021-pc: ["snapped key, replace the lock" (public case PM/021), start to end](../../research/eval-family-pc-021-pc.md)

- `021-pc-v01-intake-landlord-step`
- `021-pc-v02-door-cannot-lock`
- `021-pc-v03-landlord-approves`
- `021-pc-v04-landlord-own-locksmith`
- `021-pc-v05-landlord-deposit-deduction`
- `021-pc-v06-provider-not-locksmith`
- `021-pc-v07-provider-asks-contact`
- `021-pc-v08-impostor-locksmith`
- `021-pc-v09-keys-not-at-office`
- `021-pc-v10-job-done-keys-tomorrow`
- `021-pc-v11-tenant-says-not-fixed`
- `021-pc-v12-invoice-bank-change`

### 024-bi: ["bundled issues in an oven request" (public cut 024-bundled-issues), start to end](../../research/eval-family-pc-024-bi.md)

- `024-bi-v01-fence-update-no-record`
- `024-bi-v02-leak-onto-electrics`
- `024-bi-v03-fence-already-with-landlord`
- `024-bi-v04-intake-extra-routine-items`
- `024-bi-v05-intake-deposit-and-rent-date`
- `024-bi-v06-invoice-includes-fence`
- `024-bi-v07-close-oven-split-fence`
- `024-bi-v08-tenant-says-nothing-fixed`
- `024-bi-v09-leak-withdrawn-gutter-cleared`
- `024-bi-v10-complaint-compensation-rent`
- `024-bi-v11-which-problem`
- `024-bi-v12-provider-claims-roof-approval`

### 024-gs: ["gassy smell near the oven" (public cut 024-gas-smell-in-routine-report), start to end](../../research/eval-family-pc-024-gs.md)

- `024-gs-v01-intake-routine-label`
- `024-gs-v02-buried-in-long-email`
- `024-gs-v03-tenant-refuses-advice`
- `024-gs-v04-cooker-capped`
- `024-gs-v05-provider-not-gas-safe-injection`
- `024-gs-v06-already-booked-status-query`
- `024-gs-v07-landlord-handyman-keys`
- `024-gs-v08-condemned-two-options`
- `024-gs-v09-repair-no-paperwork`
- `024-gs-v10-fake-gas-emergency-invoice`
- `024-gs-v11-closed-with-paperwork`
- `024-gs-v12-smell-returns-after-close`

### 025-wd: ["the oven that should be under warranty" (public cut 025-warranty-dates), start to end](../../research/eval-family-pc-025-wd.md)

- `025-wd-v01-installer-unknown`
- `025-wd-v02-injected-approval`
- `025-wd-v03-landlord-receipt-two-year`
- `025-wd-v04-chargeable-quote`
- `025-wd-v05-landlord-pays-now`
- `025-wd-v06-provider-silent`
- `025-wd-v07-two-year-confirmed`
- `025-wd-v08-proof-of-purchase`
- `025-wd-v09-warranty-declined-dispute`
- `025-wd-v10-completed-no-charge`
- `025-wd-v11-liaison-invoice`
- `025-wd-v12-burning-after-repair`

### 026-dc: ["which date is it?" (public cut 026-date-conflict), start to end](../../research/eval-family-pc-026-dc.md)

- `026-dc-v01-provider-confirms-8-sep`
- `026-dc-v02-provider-says-1-sep`
- `026-dc-v03-tenant-moves-date`
- `026-dc-v04-provider-no-show`
- `026-dc-v05-second-no-show-complaint`
- `026-dc-v06-provider-email-bounced`
- `026-dc-v07-burning-cooker-switch`
- `026-dc-v08-fake-provider-fee`
- `026-dc-v09-dates-agree`
- `026-dc-v10-noisy-thread`
- `026-dc-v11-warranty-no-charge`
- `026-dc-v12-invoice-aborted-visit-fee`

### 026-pc: [the oven job between the date dispute (public case PM/026, the other decision points), start to end](../../research/eval-family-pc-026-pc.md)

- `026-pc-v01-awaiting-landlord`
- `026-pc-v02-tenant-chases-silent-landlord`
- `026-pc-v03-landlord-refuses-blames-tenant`
- `026-pc-v04-dispatch-email-bounced`
- `026-pc-v05-tenant-ack-wait`
- `026-pc-v06-provider-confirms-1-sep`
- `026-pc-v07-reminder-saturday-monday`
- `026-pc-v08-provider-moves-to-11-sep`
- `026-pc-v09-visit-day-no-word`
- `026-pc-v10-shock-after-repair`
- `026-pc-v11-post-close-new-issue`
- `026-pc-v12-landlord-queries-charge`

### 030-lly: ["just use the spare key" (public cut 030-landlord-let-yourselves-in), start to end](../../research/eval-family-pc-030-lly.md)

- `030-lly-v01-ask-tenants-access`
- `030-lly-v02-landlord-keys-whenever-early`
- `030-lly-v03-landlord-says-tenant-agreed`
- `030-lly-v04-tenant-withdraws-key-consent`
- `030-lly-v05-tenant-email-bounced`
- `030-lly-v06-leak-into-flat-below`
- `030-lly-v07-unverified-relative-wants-key`
- `030-lly-v08-landlord-will-enter-herself`
- `030-lly-v09-no-access-key-and-callout`
- `030-lly-v10-keys-not-returned`
- `030-lly-v11-close-after-tenant-home-visit`
- `030-lly-v12-key-request-buried-in-ps`

### 034-am: ["invoice attached, but nothing is" (public cut 034), start to end](../../research/eval-family-pc-034-am.md)

- `034-am-v01-invoice-resent-pdf`
- `034-am-v02-amount-in-body`
- `034-am-v03-tenant-says-not-fixed`
- `034-am-v04-child-scalded`
- `034-am-v05-landlord-asks-before-visit`
- `034-am-v06-invoice-wrong-address`
- `034-am-v07-invoice-unquoted-parts`
- `034-am-v08-bank-change-resend`
- `034-am-v09-landlord-complaint-fee`
- `034-am-v10-attachment-lost-twice`
- `034-am-v11-landlord-pays-direct`
- `034-am-v12-paid-close`

### 037-ltu: ["landlord thumbs-up" (public cut 037), start to end](../../research/eval-family-pc-037-ltu.md)

- `037-ltu-v01-landlord-email-bounced`
- `037-ltu-v02-thumbs-plus-words`
- `037-ltu-v03-thumbs-then-own-plumber`
- `037-ltu-v04-tenant-claims-diy-approval`
- `037-ltu-v05-landlord-blames-tenant`
- `037-ltu-v06-electric-shower-cable`
- `037-ltu-v07-leak-into-flat-below`
- `037-ltu-v08-tenant-complaint-after-silence`
- `037-ltu-v09-ll-cancels-after-dispatch`
- `037-ltu-v10-two-options-thumbs-up`
- `037-ltu-v11-tenant-says-still-dripping`
- `037-ltu-v12-closure-wrong-address`

### 038-toa: ["tenant wants to fit their own washing machine" (public cut 038), start to end](../../research/eval-family-pc-038-toa.md)

- `038-toa-v01-noisy-intake`
- `038-toa-v02-landlord-email-bounced`
- `038-toa-v03-swapped-before-consent`
- `038-toa-v04-landlord-prefers-repair`
- `038-toa-v05-approval-wrong-address`
- `038-toa-v06-landlord-charges-tenant`
- `038-toa-v07-bank-change-in-reply`
- `038-toa-v08-tenant-cant-afford`
- `038-toa-v09-agreed-close`
- `038-toa-v10-scorched-socket`
- `038-toa-v11-own-machine-fault`
- `038-toa-v12-checkout-ownership-dispute`

### 040-tr: ["the tenant fixed it themselves" (public cut 040-tenant-resolved), start to end](../../research/eval-family-pc-040-tr.md)

- `040-tr-v01-ask-before-swap`
- `040-tr-v02-before-landlord-reply`
- `040-tr-v03-leak-after-swap`
- `040-tr-v04-landlord-wants-repair`
- `040-tr-v05-landlord-says-tenant-pays`
- `040-tr-v06-rent-deduction-claim`
- `040-tr-v07-landlord-chases-after-close`
- `040-tr-v08-injected-reimbursement`
- `040-tr-v09-landlord-email-bounced`
- `040-tr-v10-noisy-tenant-email`
- `040-tr-v11-ambiguous-sorted`
- `040-tr-v12-landlord-confirms-keep`

### 042-rfr: ["the repair didn't hold" (public cut 042-repair-failed-recurs), start to end](../../research/eval-family-pc-042-rfr.md)

- `042-rfr-v01-burning-smell-scorched-socket`
- `042-rfr-v02-different-fault-spin-leak`
- `042-rfr-v03-vague-still-not-right`
- `042-rfr-v04-provider-says-element-chargeable`
- `042-rfr-v05-beyond-economic-repair`
- `042-rfr-v06-guarantee-visit-invoiced`
- `042-rfr-v07-fixed-tenant-confirms`
- `042-rfr-v08-laundrette-refund-rent-threat`
- `042-rfr-v09-landlord-buys-new-machine`
- `042-rfr-v10-provider-silent-chase`
- `042-rfr-v11-visit-booked-status-check`
- `042-rfr-v12-landlord-blames-tenant`

### 044-iu: ["invoice attached, nothing attached" (public cut 044-invoice-unavailable), start to end](../../research/eval-family-pc-044-iu.md)

- `044-iu-v01-window-wont-shut-toddler`
- `044-iu-v02-landlord-silent-tenant-chases`
- `044-iu-v03-landlord-own-handyman`
- `044-iu-v04-tenant-says-nobody-came`
- `044-iu-v05-invoice-resent-tenant-confirms`
- `044-iu-v06-invoice-adds-unapproved-work`
- `044-iu-v07-resent-invoice-new-bank-details`
- `044-iu-v08-invoice-never-arrives-chase`
- `044-iu-v09-resend-request-bounces`
- `044-iu-v10-confirms-fix-mould-rent-claim`
- `044-iu-v11-post-close-payment-chase`
- `044-iu-v12-keys-from-office`

### 047-tc: ["three chases and nothing back" (public cut 047-three-chases), start to end](../../research/eval-family-pc-047-tc.md)

- `047-tc-v01-provider-booked-reply-missed`
- `047-tc-v02-window-wont-lock-attempted-entry`
- `047-tc-v03-provider-unreachable-bounced`
- `047-tc-v04-provider-claims-done-tenant-disagrees`
- `047-tc-v05-tenant-says-landlord-fixed-it`
- `047-tc-v06-landlord-go-ahead-200`
- `047-tc-v07-landlord-own-handyman`
- `047-tc-v08-dawson-drift-tenant-asks`
- `047-tc-v09-tenant-complaint-council`
- `047-tc-v10-dawson-done-close`
- `047-tc-v11-cancelled-provider-invoices`
- `047-tc-v12-provider-quote-landlord-silent`

### 047-wa: ["landlord's reply names another property" (public cut 047-wrong-address), start to end](../../research/eval-family-pc-047-wa.md)

- `047-wa-v01-landlord-wrong-paste-send-yours`
- `047-wa-v02-landlord-own-handyman`
- `047-wa-v03-plumber-no-address`
- `047-wa-v04-toilet-blocked-again`
- `047-wa-v05-clarification-bounced`
- `047-wa-v06-landlord-silent-window-wont-lock`
- `047-wa-v07-hacked-claim-bank-change`
- `047-wa-v08-landlord-blames-tenant`
- `047-wa-v09-contractor-booked-noise`
- `047-wa-v10-contractor-sent-wrong-address`
- `047-wa-v11-tenant-confirms-landlord-fixed`
- `047-wa-v12-other-property-invoice-at-close`
