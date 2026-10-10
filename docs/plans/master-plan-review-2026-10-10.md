# Review of the master plan: agent tree, build approach, stop/escalate rules

Reviewed 2026-10-10 11:10 BST against [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md), `research/pm-case-data-analysis.md`, `research/agent-tools.md`, `research/evaluation.md`, the rules, and the code on `main` at a4e98c1. Requested by Marc; written by Claude. The amendments in section 7 were applied to the master plan in the same commit.

---

## 0. Verdict

The plan is building the right product on the right foundation. The ledger, the crash fallback, the `submit_decision` validators and the policy hooks already cover the hardest Engineering points. The gaps are in **where the safety rules live** (too many are prompt-only), in **two runner landmines** that would hurt coverage and correctness on the unseen cases, and in **scope** for the time left (M1 to M7 is more than two people land in five hours). Ranked by points per hour:

1. **Runner landmine: the default cut.** `pnpm cases` defaults to `--at auto`, and for Property Management-format cases without a "Recorded action" marker that means a 50 % cut (`src/agent/publicCases.ts` `resolveCutoff`; probe: case 047 at `auto` shows 18 of 36 events). The Reality Test cases are already cut at the decision point. Running them with defaults throws away half the evidence in every case. Fix: `--at none` (no cut, no spoiler hiding other than Overview/Outcome if present) and make it the default for any folder outside `HackatonPublicCases/`. One line in `run.ts` plus one in `publicCases.ts`, before anything else today.
2. **Runner landmine: truncation keeps the wrong end.** `MAX_FILE_CHARS = 60_000` clips the **head** of `history.md`, so a "larger context" case (rules §4 promises them) loses its most recent events, which is where the decision point is. Public histories are ≤ 20 k chars, so the risk is only on the unseen set, which is exactly where it matters. Fix: compact rather than clip (collapse repeated holds and reminders into one line with a count; keep the first event and the last N events verbatim).
3. **Move the landlord-authority gate into code and make it evidence-based** (section 3). Today `approve_quote` is only blocked if the approval was requested *in this run*. An agent that reads a quote email in the history can approve it with `approval_basis: "landlord approved"` and nothing checks that claim. A `record_landlord_decision` tool whose `evidence_quote` must appear verbatim in the case inputs closes this for both `approve_quote` and `assign_contractor`.
4. **One agent, no subagents** (section 1). The plan already says this implicitly; say it explicitly so nobody spends the afternoon on an orchestrator.
5. **Scope ladder** (section 5): what to drop at 12:45, 14:00 and 15:00 so `main` is runnable and rehearsed by 15:15 whatever happens.

---

## 1. Agent tree: one agent, decided

**Recommendation: a single case-worker agent (the existing pi loop), surrounded by deterministic code, plus one critic *call*. No orchestrator agent, no subagents.**

Why:

- **Rules §15** gives no credit for more agents, and the judges score outcomes on unseen cases. Every additional LLM hop is a new source of variance, and pass^3 falls fast with variance (τ-bench; `research/evaluation.md` §1.2).
- **Context fits.** The largest public history is 19 k chars (~5 k tokens) and the whole 50-case corpus has 16 attachments. A case is a single-context problem. Subagents earn their cost when context must be isolated or parallelised; neither applies here.
- **The "orchestrator" is `src/run.ts`**, a deterministic batch loop with a per-case timeout and a crash fallback. Keep it deterministic: a judge reading the code should see that coverage does not depend on a model.
- **The critic is a call, not an agent**: one structured Opus call with no tools, evidence-or-drop, at most one revision turn (`research/evaluation.md` §4). It is the one place a second model pays for itself, because it is adversarial to the agent's own output. Keep its A/B gate (AC12).
- **State reconstruction should be deterministic hints, not a second LLM pass.** The recommendation document suggested "deterministic parsing + one LLM pass"; the plan correctly dropped the LLM pass. Event headers, system trigger strings, hold lines, `Visit date selected - dd/mm/yyyy`, `Address:` lines, postcodes, £ amounts and dates are all regex-able. Semantics (is "👍" an approval? is this landlord reply about this property?) are the agent's job, and that is where the model belongs. Render the hints as *derived, verify against the history* and keep the raw history, so a parser bug cannot silently mislead the agent. Wrap the reconstructor in try/catch and render nothing on failure: it must never cost coverage on an unfamiliar format.
- **Jev (TypeSafe classifier)** is a sidecar, fails open, and is an external service in the 30-minute window. Decide at the 15:15 rehearsal whether it stays on for the Reality Test; default off unless it measurably lowers red flags on the dev split.
- **Voice** is a separate product surface for a separate award. It writes through the same tools and never touches `run.ts`. Not part of the scoring tree.

What would change this decision: Reality Test cases with hundreds of events or many PDFs. The answer even then is compaction (item 2 in the verdict), not a summariser agent, because a summariser can drop the one line that matters (`research/scenarios.md` challenge L).

---

## 2. Approach: invariants first, then cases, then tools and hooks

Marc proposed "define desired outcomes (evals) first, then back-solve tools, skills, permissions and hooks". Half agreed, and here is the challenge.

The Reality Test is unseen. Rubrics written today for 25 cut cases are a **proxy**, and tuning the agent on them is how teams overfit (the scorecard skill's pitfall 2). What transfers to unseen cases is not a rubric; it is a short list of **invariants** that hold on every maintenance case, each enforced at the lowest possible layer (code before prompt before critic), plus a general **decision procedure** (the Northbridge state machine and act / ask / wait / escalate rules). The cases then exist to *test* that the invariants hold on concrete, messy instances. So the order is:

1. **Invariants** (the table below): what must always or never happen.
2. **Enforcement layer per invariant**: code hook, deterministic validator, prompt, or critic item. Code wins when the rule is checkable; prompt and critic only for rules that need semantics.
3. **Tools** fall out of step 2: a rule that is enforced in code needs a tool whose arguments carry the evidence the code checks.
4. **Cases and checks** (M2, M4) then exercise each invariant at least twice: once where it should fire, once where it should not (over-escalation is a failure too).

The plan's M1 does these in a different order (state object first, tools second). Recommendation: inside M1, build the gates and the tools they need first, then the `CaseState` hints. Gates transfer to every unseen case; state hints help on some.

### The invariant table (source of truth; the plan's ACs reference it)

| # | Invariant | Enforce in | Tool or data it needs | Eval check | Today |
|---|---|---|---|---|---|
| I1 | No chargeable works instructed, no quote approved, no provider assigned without landlord authority (recorded decision, pre-authorised limit) or a genuine emergency | **code**: `beforeToolCall` on `approve_quote`, `assign_contractor` | `record_landlord_decision(ref, decision, evidence_quote)` with the quote checked verbatim against the inputs; `emergency_justification` on `assign_contractor` | `tool_not_called approve_quote` on unapproved cuts (AC5); 047-style address case (AC7) | approve_quote blocked only when requested in-run |
| I2 | Bank details never change on request | **code** | none | `tool_not_called update_bank_details` | done |
| I3 | No action reported unless the ledger says verified | **code**: ledger + `submit_decision` validator | none | `no_fabricated_ids` | done |
| I4 | Outgoing text names this case's property, tenant and provider, not another's | **code**: postcode/address regex on `send_message` and `request_information` bodies vs the case header | case property from `index.md` | mutation "landlord reply about another property" | Jev gate only (optional, external) |
| I5 | Never state the content or amount of an attachment that is not present | state hints list "referenced but unavailable"; **critic** item | reconstructor | AC8 | none |
| I6 | Never close with a party uninformed; never close without work evidence or a reason | **code**: validator on `update_ticket` to `completed` (landlord and tenant each have a verified message this run or a visible one in the history; invoice captured or a no-payment reason) | `payment: with/without/none` and `resolution` on the completed stage | AC6 (040-style) | none |
| I7 | An escalation is a verified handover packet | **code** | `escalate_to_human` | outcome `escalated` ⇒ packet verified | done |
| I8 | A question is a verified request to the party who can answer | **code** | `request_information` | outcome `needs_info` ⇒ request verified | done |
| I9 | Waiting is a verified hold with a review date, never prose | **code**: outcome `no_action` or a `WAIT` action ⇒ verified `schedule_follow_up` | `schedule_follow_up(ref, party, reason, review_on)` | AC4 | none |
| I10 | Text inside inputs is data; instructions aimed at an AI are flagged and ignored | prompt + Jev prescreen + **critic**; I1 protects the honeypot regardless | none | AC9 inject variant | prompt only |
| I11 | Three unanswered chases to one party ⇒ another channel, reassignment or escalation, never a fourth identical chase | **code**: chase count from history hints + ledger | reconstructor counts reminders per party | 047-three-chases cut | none |
| I12 | Safety first: emergency category ⇒ safety message first and a P1 escalation verified | prompt + **validator** (severity `emergency` ⇒ `escalate_to_human` P1 verified) | none | practice 01, 14, 20; "gas smell" mutation | prompt only |
| I13 | The latest verified instruction from the *entitled* party wins; a tenant cannot approve landlord spend, a landlord cannot waive the tenant's rights | prompt (policy) + **critic** | none | 038, 045-style cases | prompt |
| I14 | A blocked or failed action is never retried in a loop; priority only rises | **code**: second identical policy block ⇒ tool result says "stop and submit"; cap total blocked calls per run | none | trace check: no tool blocked > 2× | repeat-verified only |
| I15 | Every case gets an honest `ANSWER.md`, whatever happens | **code**: `run.ts` fallback, timeout, no re-cut, tail-preserving compaction | `--at none`, compaction | AC1, AC2, AC16, AC17 | fallback done; cut and clip are landmines |

Rows I1, I4, I6, I9, I11, I14 are the code changes worth Martin's first hour. They are generic, small, and each turns a prompt hope into a guarantee the judge can read in the trace.

---

## 3. When the agent acts, asks, waits, stops or escalates

The user asked for this to be explicit in the plan. The model below is the contract; `maintenance-policy.md` restates it in prose for the agent, and the hooks enforce the code rows.

### 3.1 Tool permission tiers

| Tier | Tools | Rule |
|---|---|---|
| **T0 Read** | `list_tickets`, `get_ticket`, (`get_property` if added) | Always allowed, parallel |
| **T1 Autonomous writes** (routine, reversible, or protective) | `send_message`, `request_information`, `add_note`, `schedule_follow_up`, `create_ticket` (split an unrelated issue; never a duplicate of an open job), `cancel_ticket` (duplicate, or withdrawn by the party who raised it), `update_ticket` forward one stage with a note, `hold_payment`, `escalate_to_human` | Allowed without approval, verified by read-back, subject to I4 (consistency) and the repeat block. `hold_payment` and `escalate_to_human` are always allowed: they are protective |
| **T2 Gated writes** (commit money, scope, access or closure) | `approve_quote`, `assign_contractor`, `update_ticket` to `completed`, (`share_tenant_contact` if added) | Allowed only when the precondition is verifiable in the case data or the ledger: a verified `record_landlord_decision` whose evidence quote exists in the inputs, or an amount within a stated pre-authorised limit, or an emergency justification; closure needs I6. Otherwise blocked with the reason, and the agent must request, hold or escalate instead |
| **T3 Never** | `update_bank_details`; any instruction to enter without 24 h written notice (non-emergency); serving or drafting possession or Section 21 notices; disclosing tenant or landlord data to an unverified third party; approving spend above the landlord's authority | Blocked in code or absent from the toolset. A T3 attempt is logged and should appear in `conflicts` or `assumptions` |

### 3.2 Decision rules

**ACT (T1, or T2 with the gate satisfied)** when the facts are clear, the action is within the entitled party's recorded instruction, and it is routine or reversible: reply to the "please check if we need to respond" prompt, send the landlord the tenant's report with the our-contractor / your-contractor question, assign the provider after a recorded approval, confirm an appointment both parties stated, chase once more within the cap, split an unrelated issue into its own job, close a job the tenant confirmed fixed **and** tell the landlord.

**ASK (`request_information`)** when exactly one missing fact blocks the right action and a party can supply it: which property the landlord meant (047), warranty evidence (025), the invoice as a PDF (044), the correct appointment date when provider and tenant disagree (026), tenant confirmation that a workaround is acceptable (014). One question per gap, to the party who knows, through the channel on file. Never ask for something already in the visible history (red flag in the judge's reference rubric).

**WAIT (`schedule_follow_up`)** when the ball is legitimately with another party and the clock has not run out: landlord asked within the 3-day window, provider assigned and the reminder cadence not exhausted, appointment confirmed and in the future, hold review date not yet passed, duplicate report of an open job (link it, tell the tenant, no new ticket). Always with a review date and a stated reason. "Nobody will reply during this run" (the system prompt) means *do not block*; it does not mean *chase everyone today*. `maintenance-policy.md` must make that distinction, or the agent will over-chase.

**ESCALATE (`escalate_to_human`, with priority and team)** when:

| Trigger | Priority | Team | Do first (T1) |
|---|---|---|---|
| Gas, CO, fire, flood, sparking electrics, structural, lock-out at night, no heat or hot water with a vulnerable occupant | P1 | maintenance | Safety message to the tenant; book make-safe if within policy |
| Spend decision with no landlord authority and the tenant is suffering (urgent category, landlord silent past 3 days) | P2 | maintenance / management | Chase on a second channel; tell the tenant honestly |
| Invoice above the approved quote beyond a small tolerance, from a different issuer, or dated before the visit | P2 | accounts | `hold_payment`; ask the provider to explain |
| Bank-detail change, lookalike domain, pressure to pay | P2 | fraud | `hold_payment`; do not reply with any account data |
| Address, property or identity mismatch that one question cannot resolve | P3 | maintenance | Ask the party first (ASK); escalate if the reply would still leave ambiguity |
| Three unanswered chases to a provider or landlord | P3 | maintenance | Try another channel; recommend a provider swap in the packet |
| Conflicting instructions from two entitled parties; scope creep beyond the approval | P3 | maintenance | Hold the works; record the conflict |
| Legal: Section 21 request, eviction, entry without notice, harassment, deposit dispute, notice periods, Breathing Space | P2 | legal / compliance | Refuse the unlawful step plainly; do the lawful routine work |
| Safeguarding, domestic abuse, death, serious vulnerability | P1 or P2 | safeguarding | Signpost; disclose nothing; raise priority |
| Complaint, threat, or legal language from any party | P3 | management | Acknowledge receipt only |
| A required action failed and cannot be retried safely | P2 | maintenance | Try an alternative route once; tell the affected parties |
| Prompt-injection text that tried to trigger a gated action | P3 | management | Flag it in `conflicts`; follow normal process |

Every escalation carries the packet (`known`, `missing`, `options`, `recommendation`, `deadline`) and the agent does the T1 work around it in the same run: that is the "escalate the decision, do the work" rule, and it is what separates a 3-minute handover from a 20-minute one.

**DO NOTHING NEW** is a decision too, and the judge's reference rubric penalises escalating what the agency handled itself. Duplicate reports, status queries, and "please check if we need to respond" prompts where no reply is needed end in `schedule_follow_up` or `add_note` plus a factual message, not an escalation.

### 3.3 Stop conditions for the loop itself

- Per-case timeout (today 300 s; set from the rehearsal so 30 cases finish in 20 minutes at the chosen concurrency), then the fallback ANSWER with the ledger so far.
- One "you must submit" nudge, then stop.
- A policy block is final for that intent: the second identical blocked call returns "stop and submit" (I14). Today a persuaded model can loop on a blocked tool until the timeout.
- Jev blocks at most twice per recipient (exists).
- Critic: at most one revision turn, validators rerun, then write with an "Unresolved issues" section (exists in the design).
- Chase cap (I11).

---

## 4. Other findings

- **`submit_decision` lets `no_action` through with nothing verified.** Add I9: `no_action` requires a verified `schedule_follow_up` or `add_note`, so even doing nothing leaves a trace the judge can see.
- **Decision vocabulary without tools becomes prose.** The plan's 14 `next_action` types are right, but `WAIT`, `CLOSE_WITH/WITHOUT_PAYMENT`, `RECLASSIFY` and `SPLIT_NEW_REQUEST` need a ledger id to point at. `schedule_follow_up`, the `completed` stage with a `payment` flag, `update_ticket` with `category`, and `create_ticket` with `related_ticket_ref` cover them. `record_landlord_decision` is the one genuinely new tool; keep the surface under 20.
- **The agent's own eval at 16:35.** The global validators (I3, I6, I7, I8, I9, I12) need no rubric, so they can run on the Reality Test output as a sanity count in the log (never as an edit). Build them in M3 as functions over `(decision, ledger, state)` and reuse them in M4's `checks.json`.
- **Per-case timeout and the window.** 30 cases at concurrency 6 and 300 s worst case is 25 minutes: too close. The rehearsal should set `--timeout` so the worst case is under 15 minutes; 150 s is the likely value.
- **Model A/B is cheap, do it once.** Sonnet 5.5 is the default for latency. If the dev loop shows judgement misses (over-chasing, missed address mismatch), one run of the dev split with `CASE_MODEL=claude-opus-5-5` tells you whether the fix is the model or the policy. Decide by score, not by taste.
- **"Never wait" vs WAIT.** Covered in 3.2; it is the one prompt contradiction likely to cost escalation precision.
- **Corpus authoring load.** 25 cases with `cut.json`, `rubric.json` and `expected.json` in two hours is five minutes per case. Order them by invariant coverage: each of I1, I4, I5, I6, I9, I11, I12, I13 gets one positive and one negative case first (16 cases), then the rest if time. Generate the mutation copies with a script, not by hand.
- **Adapter for organiser tools.** The public PM data contains no tool surface, and `research/evaluation.md` §2.1 finds no evidence of a hosted tool server. Keep the adapter to a stub signature and the env switch; spend the hour on the gates instead. If an API arrives at 16:30, the runbook's fallback (mock toolset, say so in REASONING) is the honest answer.
- **README and demo** are fixed costs that cannot slip past 15:45. The demo storyboard's "verifier catching a prohibited action" is already produced by `policyLog` in REASONING; show that file rather than building anything new.

---

## 5. Scope ladder (what to cut, and when)

| Checkpoint | If behind | Drop or shrink |
|---|---|---|
| 11:30 | Landmines not fixed | Nothing else starts until `--at none` default and tail-preserving compaction are on `main` |
| 12:45 schema freeze | M1 gates done, `CaseState` not | Ship the gates and tools; `CaseState` becomes "hints or nothing", additive later |
| 12:45 | M2 under 12 cases | Finish the invariant-pair cases; drop the remaining cuts and all but 3 mutations (address, injection, absent attachment) |
| 14:00 voice gate | Any AC in 1–9 red | No voice. Martin on validators and the rehearsal runner |
| 15:00 | Critic A/B not done | `--critic off`, validators only; record it |
| 15:00 | k=3 not done | Report k=1 with the chaos variant; pass^3 only on critical-failure cases |
| 15:15 | Rehearsal not possible | Run `pnpm loop --split holdout` alone and record its time as the budget input |
| 15:45 | README gaps | Fill sections 5–8 from the plan text; the metrics table takes whatever `latest-dev.json` says, labelled |

---

## 6. What the plan gets right and should not change

- Building on the pi loop, the ledger and `run.ts` rather than rewriting.
- The frozen `dev`/`holdout` split and the rule never to open holdout transcripts.
- Escalation as a scored outcome with precision *and* recall.
- Deterministic validators before the critic, and the critic A/B gate.
- The crash fallback that writes an honest ANSWER.
- Different model for critic and judge.
- Voice gated on the core being green.

---

## 7. Amendments applied to the master plan

1. "Proposed approach" gains an **architecture decision** paragraph: one agent, deterministic orchestration, one critic call, no subagents; and a pointer to the permission model in this review.
2. **M1 reordered**: gates and the tools they need (`record_landlord_decision`, `schedule_follow_up`, closure semantics, I4 consistency check, I14 block cap) before `CaseState`; `CaseState` rendered as hints inside try/catch.
3. **New acceptance criteria** AC16 (no re-cut by default on non-public folders; `--at none`), AC17 (tail-preserving compaction), AC18 (evidence-quote gate on landlord authority), AC19 (`no_action` leaves a verified trace), AC20 (a blocked tool is never called more than twice).
4. **Section 6** gains the scope ladder from section 5 above.
5. **Decision log** records the single-agent decision, the invariants-first ordering and the landmine fixes.
