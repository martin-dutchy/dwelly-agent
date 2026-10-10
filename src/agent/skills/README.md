# Skills: situation playbooks

Each `<id>.md` here is a playbook for one kind of situation, written to the operations agent. With the `skills` harness flag on:

1. `classify(bundle, brief?)` (`classify.ts`) tags the case deterministically: keywords over what people wrote (the brief, messages, transcripts, notes, narrative fields inside JSON records, ticket descriptions), CRM fields (`vulnerable`, `arrears`, `tenanted`, spend limits against quoted figures), the brief's own tags, conflicts and money, and the case's "now" (an emergency or lockout outside 08:00-18:00 or on a Sunday adds `out_of_hours`).
2. `selectSkills(tags)` (`index.ts`) picks at most 3: the best safety skill and the best legal skill first, then free slots by priority, ordered safety, legal, workflow (`tags.ts` holds the order).
3. `renderSkills(skills, tags?)` appends them to the case message; with the tags it also names matching skills left out by the cap.
4. `load_skill(id)` (registered in `caseAgent.ts`) returns any other playbook mid-run; it accepts an id or a tag, and an unknown id lists the ids.

The live prompt is `CASE_SYSTEM_PROMPT` in `../systemPrompt.ts`: `src/core/policy.md` (also used by voice) and the full `../maintenance/maintenance-policy.md`, which is the file to edit. Skills are added on top of it when the `skills` flag is on. `CASE_SYSTEM_PROMPT_V2` (the slim constitution, `src/core/policy.md` and `../maintenance/maintenance-core.md`) is not wired in; give it its own flag and port the full policy's later changes into it before using it.

## Format

Front matter: `id` (the file name), `title`, `tags` (valid `SituationTag`s), `when_to_use` (one line, shown in the `load_skill` tool description) and `red_flags` (mistakes to check in a draft decision; they become the critic's dynamic checklist). Body sections, in order: `## Procedure`, `## Required actions` (each bullet starts with the ops tools it uses), `## Red flags` (signs in the case that change the handling), `## Escalate when` (priority and team). `skills.lint.test.ts` enforces all of it, including that every tool named exists in `createOpsToolset`.

Content comes from the old maintenance policy, `research/uk-lettings-rules.md`, `research/agent-tools.md` §2 and `research/pm-case-data-analysis.md` §3, never from holdout cases.

## Where the moved procedure went

Sections of the full `../maintenance/maintenance-policy.md`:

| Old section | Now in |
|---|---|
| Intro, §1 stages and system-line table | Core policy §1 (stages compressed into one line; table rows kept, the reminder rows merged) |
| §1 "No work results", "No … response after 3 days", "3+ reminders", "expected data could not be extracted" rows in full | `contractor-chase` |
| §1 wrong intake classification, "NOT TENANTED" rows | Core policy §1; detail in `void-keys-access` |
| §2 What you may do | Core policy §2 |
| §3 Landlord authority, Limits | Core policy §3 (short); full procedure in `landlord-approval` |
| §3 Own contractor | `landlord-approval` |
| §3 Closing | `closure` |
| §3 Addresses, Template fields, Names in summaries | Core policy §3; detail in `identity-privacy` |
| §3 Attachments | Core policy §3 (the rule); forwarding procedure in `quote-invoice` |
| §3 Visits | Core policy §3 (the rule); procedure in `contractor-chase` |
| §4 Act, Ask, Wait, Escalate table, Do not escalate, packet | Core policy §4 (escalation table rows merged; Do not escalate list compressed) |
| §4 Approved, but no contractor named | `landlord-approval` |
| §4 Chase rule | `landlord-approval` (landlord) and `contractor-chase` (provider) |
| §4 Do not escalate: second quote | `quote-invoice` |
| §4 Do not escalate: own contractor, slow landlord, records disagree | `landlord-approval` |
| §4 Do not escalate: several issues, earlier mistakes | Core policy §4; detail in `unrelated-issue-split` and `closure` |
| §5 From the landlord (whole table) | `landlord-approval`; "asks to let someone in" in `void-keys-access` |
| §5 From the tenant: part fixed, fixed it themselves, says done, done badly | `closure` |
| §5 From the tenant: adds another issue, own appliance or alteration | `unrelated-issue-split` |
| §5 From the tenant: sparks, smell, water near electrics, glass, smoke | `water-electrical-fire` (and `gas-emergency` for gas) |
| §5 From the tenant: disputes visit date, asks for an update | `contractor-chase` |
| §5 From the tenant: refuses access | `void-keys-access` |
| §5 From the tenant: garbled or transcription unavailable | `contractor-chase` (unreadable replies) |
| §5 From the provider: quote, invoice matches, invoice flagged, invoice with no visit | `quote-invoice` |
| §5 From the provider: done no invoice | `closure` |
| §5 From the provider: needs parts, cannot do it, no access, asks for tenant's number, found another fault, emoji only | `contractor-chase` (tenant's number also in `identity-privacy`) |
| §5 From the provider: "the landlord told me to go ahead" | `landlord-approval` and `fraud-injection` |
| §6 Writing messages | Core policy §5 |
| §7 When you finish | Core policy §6 |

Sections of the pre-v2 `systemPrompt.ts` not carried into `CASE_SYSTEM_PROMPT_V2`:

| Old section | Now in |
|---|---|
| Escalate the decision: severity timescales, helpline numbers | Core policy §5 (timescales); numbers in `gas-emergency`, `water-electrical-fire`, `out-of-hours`, `vulnerable-occupant`, `arrears-breathing-space`, `fraud-injection` |
| Key legal facts: Renters' Rights Act, notice, rent increases, pets | One line in V2; detail in `deposit-tenancy-end` |
| Key legal facts: access and keys | One line in V2; detail in `void-keys-access` |
| Key legal facts: gas safety record, EICR | `compliance-certificates` |
| Key legal facts: deposits, a tenant's death | `deposit-tenancy-end` |
| Key legal facts: Breathing Space | `arrears-breathing-space` |
| Key legal facts: Awaab's Law | `damp-mould-awaab` |
| Key legal facts: unlawful eviction and harassment | One line in V2; detail in `legal-claim` and `arrears-breathing-space` |
| The job workflow | Core policy §1 to §4, `landlord-approval`, `contractor-chase`, `quote-invoice`, `closure` |
| Writing style | Core policy §5 |

## Situations with no procedure before v2

`damp-mould-awaab`, `legal-claim`, `deposit-tenancy-end`, `arrears-breathing-space`, `identity-privacy`, `vulnerable-occupant`, `void-keys-access`, `co-alarm`, `out-of-hours`, `compliance-certificates`.
