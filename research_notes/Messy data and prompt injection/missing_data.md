# Handling missing, incomplete or unavailable information in LLM agents (ask / infer / abstain / wait / escalate)

Context: UK property-management ops agent, evaluated on unseen "Reality Test" cases where doing nothing or escalating can be correct; judged on required outcomes, red flags, prohibited actions, critical failures. Missing-data patterns: attachments "unavailable", "[Text/transcription unavailable]", unparseable provider emails, no landlord reply after 3 days, no tenant confirmation before closing, no visit date, invoice never received, unknown payer, ambiguous replies ("👍").

## 1. Research on abstention and clarification: do frontier models over-ask or under-ask, and what improves it?

### Takeaway
The 2024-2026 evidence says frontier models mostly **under-ask and under-abstain**: they answer or act on incomplete inputs instead of resolving what is missing. Reasoning fine-tuning makes this worse. Prompting helps only partly. The reliable fix in a product is structural: explicit rubrics or checklists of required items, plus code-level gates. Models trained to ask more then tend to **over-ask**, so redundant questions need their own metric.

### Cited Findings
- "Know Your Limits: A Survey of Abstention in LLMs" (Wen et al., arXiv 2407.18418; first posted 25 Jul 2024, v3 12 Feb 2025; TACL). It frames abstention from three perspectives: the **query** (underspecified or unanswerable), the **model** (its knowledge and confidence), and **human values** (should not answer). It organizes methods, benchmarks and metrics, and lists open questions: abstention as a cross-domain "meta-capability" and context-specific optimization. — [arXiv 2407.18418](https://arxiv.org/abs/2407.18418)
- **AbstentionBench** (Kirichenko et al., FAIR/Meta; arXiv 2506.09038, June 2025; NeurIPS 2025) spans 20 datasets: unknown answers, **underspecified prompts**, false premises, subjective questions and outdated info. Across 20 frontier models, abstention is "an unsolved problem, and one where scaling models is of little use". **Reasoning fine-tuning degrades abstention by 24% on average.** A carefully crafted system prompt boosts abstention but does not fix the underlying inability to reason about uncertainty. Code: github.com/facebookresearch/AbstentionBench. — [arXiv 2506.09038](https://arxiv.org/abs/2506.09038v1); [NeurIPS 2025 listing](https://mlanthology.org/neurips/2025/kirichenko2025neurips-abstentionbench)
- **AskBench** (arXiv 2602.11199, Feb 2026, preprint) turns QA pairs into multi-turn tasks with hidden "checkpoints" (rubric items) that the model must ask about. It has two parts: AskMind (missing info) and AskOverconfidence (misleading premises). **Frontier models under-ask.** On AskMind, Gemini-2.5-Pro reached 0.567 accuracy with only 0.124 checkpoint coverage, and GPT-4.1 reached 0.495 accuracy with 0.118 coverage. Under a strict 2-turn protocol, Gemini answered on the first turn in 387 of 400 AskOverconfidence cases (0.010 accuracy). — [AskBench HTML](https://arxiv.org/html/2602.11199v1)
- AskBench: a "Self-Alert" cautionary system prompt scored 0.00 accuracy and 0.14 coverage on AskOverconfidence (Hard). The FATA prompting approach raised AskMind coverage to 0.503 but accuracy only to 0.491. The authors argue that asking per se is insufficient, and that accuracy gains track **checkpoint coverage, not more aggressive questioning**. — [AskBench HTML](https://arxiv.org/html/2602.11199v1)
- AskBench: RL-trained models **over-ask**. The redundant-question rate was 0.463 for the AskOverconfidence-trained model on that set. On IN3's *clear* tasks, the direct-answer rate fell to 0.50-0.625, against 1.0 for the base model. Reducing redundant follow-ups "remains a challenge". — [AskBench HTML](https://arxiv.org/html/2602.11199v1)
- Related benchmarks named in AskBench and a search summary:
  - **QuestBench** (2025): single missing variable; pick the one minimal clarifying question from multiple choice.
  - **IN3** (Qian et al., 2024): vague instructions for tool agents, with missing details annotated by importance.
  - **Noisy ToolBench / "Learning to Ask"**: ambiguous tool queries; measures the redundant-questions and steps count.
  - **Tri-agent framework** (Amazon, KDD'25 Industry): scores ambiguity handling, question quality, dialogue efficiency and intent alignment.
  — [AskBench](https://arxiv.org/pdf/2602.11199); [Tri-agent framework PDF](https://assets.amazon.science/8a/fe/f6945aab470a947f838c0dc104ab/a-tri-agent-framework-for-evaluating-and-aligning-question-clarification-capabilities-of-large-language-models.pdf); [Learning to Ask review](https://www.themoonlight.io/en/review/learning-to-ask-when-llm-agents-meet-unclear-instruction)
- **τ-bench** (Yao et al., arXiv 2406.12045, Jun 2024): tool-agent-user conversations with domain policy rules and an LLM-simulated user. GPT-4o succeeded on fewer than 50% of tasks, and **pass^8 in retail was below 25%** (pass^k = all k trials succeed). Agents need methods to act consistently and follow rules reliably. — [arXiv 2406.12045](https://arxiv.org/abs/2406.12045)
- **τ²-bench** (Barres et al., June 2025; ICML 2026 oral) adds a **dual-control** Telecom domain, where both user and agent act on a shared environment (Dec-POMDP). It has a compositional task generator and a user simulator coupled to the environment. Performance drops significantly when moving from no-user to dual-control, and ablations separate reasoning errors from communication and coordination errors. A third-party summary cites about a 20-point drop; I could not verify that figure. — [ICML 2026 oral](https://icml.cc/virtual/2026/oral/71171); [summary](https://tldr.takara.ai/p/2506.07982)
- Verbalized confidence is poorly calibrated and skews **overconfident**:
  - Xiong et al. (2023): average ECE above 0.377 for GPT-3/3.5/Vicuna. GPT-4 had an AUROC of only 62.7% for separating right from wrong answers.
  - Leng et al. (ICLR 2025): RLHF causes verbalized overconfidence, because reward models favour high-confidence responses regardless of quality.
  - DINCO (arXiv 2509.25532, Sep 2025): ties overconfidence to suggestibility on claims the model knows little about.
  — [Xiong et al. 2306.13063](https://arxiv.org/pdf/2306.13063); [Leng et al. ICLR 2025](https://profiles.wustl.edu/en/publications/taming-overconfidence-in-llms-reward-calibration-in-rlhf/); [DINCO](https://arxiv.org/abs/2509.25532v1)
- Anthropic's docs: "Allow Claude to say 'I don't know'": "Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information." The example gives a fixed fallback phrase: "I don't have enough information to confidently assess this." — [Claude docs: Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

### Inferences
- For the Reality Test, the bigger risk is **under-asking and acting on incomplete inputs**: closing a job without tenant confirmation, booking without a visit date, or assigning cost with an unknown payer. Over-asking is the smaller risk. Graders typically penalize "prohibited actions / critical failures" harder than an extra hold or escalation.
- AskBench's central lesson maps directly onto a property-ops agent: **coverage of a rubric of required items** drives correctness, not generic caution. Encode per-action required-field rubrics (see section 2) instead of relying on "be careful" prompts. The "Self-Alert" style of cautionary prompt did poorly.
- If Claude is run with extended thinking, AbstentionBench suggests reasoning modes can *reduce* abstention. Put the "do I have enough information" decision in an explicit structured step or in code, not only in free-form thinking.
- Treat "👍" and similar replies as an **ambiguous premise** (an AskOverconfidence-style trap). Map it to "acknowledged" only when the preceding question was a single yes/no. Otherwise treat it as unresolved.

### Gaps
- I did not retrieve primary details for ClarQ, CLAMBER or AmbigQA in this session. Their numbers should not be cited from these notes.
- I found no study measuring Claude-family over- or under-asking rates specifically. AskBench tested Gemini-2.5-Pro and GPT-4.1.
- I could not confirm exact τ²-bench dual-control numbers from the paper's tables.

## 2. Agent design patterns: deterministic preconditions, sufficiency checks, risk tiers, human-in-the-loop, timeouts

### Takeaway
Anthropic's guidance and SDK give the building blocks:
- human checkpoints "when encountering blockers";
- stopping conditions;
- "poka-yoke" tool design;
- `PreToolUse` hooks that run before every tool call and can deny it;
- `canUseTool` / `AskUserQuestion` for approvals and clarification;
- a `defer` hook decision so the process never blocks waiting on a human.

The practical pattern is code-enforced preconditions per action, risk-tiered by reversibility, with a request → hold-with-review-date → escalate state machine.

### Cited Findings
- Anthropic, "Building effective agents" (19 Dec 2024):
  - agents may "pause for human feedback at checkpoints or when encountering blockers";
  - include "stopping conditions (such as a maximum number of iterations)";
  - get "ground truth" from the environment at each step;
  - "Poka-yoke your tools. Change the arguments so that it is harder to make mistakes";
  - evaluator-optimizer is best "when there are clear evaluation criteria";
  - test "extensively in sandboxed environments, along with the appropriate guardrails".
  — [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Agent SDK permission evaluation order: **Hooks → deny rules → ask rules → permission mode → allow rules → canUseTool**.
  - A hook deny applies even in `bypassPermissions`.
  - "For checks that must run on every tool call, use a PreToolUse hook."
  - Auto-approved tools never reach `canUseTool`.
  - `dontAsk` mode turns any would-be prompt into a denial, which suits headless agents.
  — [Claude Agent SDK: Configure permissions](https://code.claude.com/docs/en/agent-sdk/permissions)
- `canUseTool` (TypeScript) returns `{behavior:"allow", updatedInput}` or `{behavior:"deny", message}`, and Claude sees the deny message and adapts. `AskUserQuestion` carries 1-4 questions with 2-4 options each and is not available in subagents. Critically: "The callback can stay pending indefinitely… register a PreToolUse hook that returns the **defer** decision instead of waiting… so the process can exit and resume later from the persisted session." A `PermissionRequest` hook can send Slack, email or push notifications while waiting. — [Agent SDK: Handle approvals and user input](https://code.claude.com/docs/en/agent-sdk/user-input)
- Inspect AI approval policies (Python) give a reference model for tiered approval:
  - approvers are chained by glob tool patterns and can match on arguments;
  - decisions are **approve / modify / reject / escalate / terminate**;
  - "escalate" passes the call to the next approver;
  - three consecutive rejected responses terminate the sample.
  — [Inspect AI: Tool Approval](https://inspect.aisi.org.uk/approval.html)
- Claude docs anti-hallucination techniques that apply to unavailable attachments and transcripts:
  - **external knowledge restriction** ("only use information from provided documents");
  - **quote-first grounding**;
  - **verify with citations**: "If it can't find a quote, it must retract the claim."
  — [Claude docs: Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

### Inferences (implementation recipe for one hackathon day, TypeScript + Claude)
1. **Deterministic precondition table per action**, checked in a `PreToolUse` hook or in the tool's own handler (poka-yoke). Return a structured `missing: [...]` instead of executing. Examples:
   - `close_job` requires `tenant_confirmation=true` *or* an `escalation_reason`.
   - `book_visit` requires `visit_date` and `access_confirmed`.
   - `approve_invoice` requires an `invoice_document_id` that resolved, not "unavailable".
   - `assign_cost` requires `payer ∈ {landlord, tenant, agency}` with evidence.
   - `send_payment` / `instruct_contractor` require all of the above.
   - The deny message tells Claude exactly which fields are missing, and the SDK feeds that back.
2. **Missing-data detector (programmatic, before the LLM).** Regex and flags for `[Text/transcription unavailable]`, "attachment unavailable", empty bodies, MIME parse failures, and emoji-only or under-3-token replies. Tag the context with `data_quality` flags, so the model sees "ATTACHMENT_UNAVAILABLE: invoice.pdf" explicitly instead of silently missing content.
3. **Risk tiers by reversibility.**
   - T0 (read, note, draft): always allowed.
   - T1 (send message or request info): allowed.
   - T2 (schedule or commit a third party): needs complete preconditions.
   - T3 (money, closing a case, legal notices): complete preconditions plus human approval through `canUseTool` or an escalation queue.
   - In ops cases, "doing nothing" means choosing T0/T1 actions only.
4. **Decision enum in structured output.** Each turn emits `{decision: "proceed" | "ask" | "hold" | "escalate" | "no_action", missing_info: string[], evidence_quotes: string[], next_review_at?: ISODate, handover?: {...}}`. A code validator rejects "proceed" when `missing_info` is non-empty for T2/T3.
5. **Never block on a human.** Use a request → hold-with-review-date → escalate ladder. Example: landlord silent for 3 days → chase once and set `next_review_at` +48h → on expiry, escalate to the property manager with a handover packet (facts, what is missing, what was asked and when, the recommended action, the deadline or risk). Implement this with SDK `defer`, or simply persist state plus a timer.
6. **Ambiguity resolution.** "👍" closes only a binary question. Otherwise ask a targeted question naming the exact missing item. AskBench shows targeted coverage beats generic questions.

### Gaps
- I did not find a public, peer-reviewed study comparing risk-tiered action policies against flat policies for LLM agents. The recipe above is a synthesis.
- I did not retrieve the Claude Agent SDK hooks page that documents the exact `defer` payload shape; check it at code.claude.com/docs/en/hooks.

## 3. Uncertainty quantification usable via the API

### Takeaway
Through an API without logprobs, the practical options are:
- **sampling agreement** (best-of-N / self-consistency): robust but N× the cost, and it misses consistent errors;
- **LLM-as-judge or verifier passes**;
- **verbalized confidence fields**: cheap but overconfident, so use them for ranking and gating, never as a probability.

For a hackathon, deterministic missing-field checks beat any UQ method on these cases. UQ is a secondary signal for ambiguous classification, such as who pays or whether a reply is a confirmation.

### Cited Findings
- Claude docs list **best-of-N verification** ("Run Claude through the same prompt multiple times… Inconsistencies… could indicate hallucinations") and **iterative refinement** as advanced techniques, while noting they "don't eliminate" hallucinations. — [Claude docs: Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- Semantic entropy (cluster sampled answers by meaning, then take the entropy over clusters) is a principled confabulation detector. It costs **5-10× naive generation**. Semantic Entropy Probes cut that cost but need white-box hidden states, which API users don't have. — [Semantic Entropy Probes, arXiv 2406.15927](https://arxiv.org/html/2406.15927v1)
- Single-model self-consistency fails when the model **consistently** repeats the same wrong answer. 2025 work proposes cross-model aggregation, and SINdex reports a 60× speedup over SOTA sampling detectors at large N. — [search summary of 2025 papers incl. arXiv 2503.05980](https://export.arxiv.org/pdf/2503.05980); [SAC3, EMNLP Findings 2023](https://preview.aclanthology.org/watermark/2023.findings-emnlp.1032)
- Verbalized confidence: ECE above 0.377 for older models, and GPT-4 AUROC of only 62.7% (Xiong et al. 2023). RLHF induces verbalized overconfidence (ICLR 2025). A third-party summary reports that combined prompting techniques reach ECE ≈ 0.07 for large models; that figure is unverified. — [Xiong et al.](https://arxiv.org/pdf/2306.13063); [Leng et al.](https://profiles.wustl.edu/en/publications/taming-overconfidence-in-llms-reward-calibration-in-rlhf/)

### Inferences
- Cheap pattern: run the classification step (e.g. `payer`, `is_confirmation`, `decision`) **3× at temperature > 0**, using Haiku or Sonnet for cost. Act only on unanimity. Any disagreement → `ask` / `escalate`. That costs 3× on one small call, not the whole agent loop.
- Make the confidence field categorical (`"explicit_in_source" | "inferred" | "unknown"`) plus a required `evidence_quote`. That turns calibration into a checkable grounding question, in line with Anthropic's "retract if no quote" guidance.
- An LLM-judge "sufficiency check" before T3 actions ("Given the precondition list and the evidence quotes, is anything missing?") is a cheap evaluator-optimizer instance. Keep the hard gate in code.

### Gaps
- I found no published reliability or cost data for Claude-specific verbalized confidence or self-consistency on agentic ops tasks.

## 4. Evaluation: perturbation and metamorphic testing of agents for missing data

### Takeaway
Build the eval set by **metamorphic perturbation of known-good cases**:
- remove a field;
- replace an attachment with "unavailable";
- replace a transcript with "[Text/transcription unavailable]";
- swap a clear reply for "👍";
- advance the clock 3 days with no reply.

Then assert the *decision class* changes from proceed to ask/hold/escalate and that prohibited tools are not called. Promptfoo is TS-native and has trajectory/tool-call assertions. ReliabilityBench supplies the metamorphic-relation and fault-injection framing, and τ-bench supplies pass^k.

### Cited Findings
- promptfoo assertion types useful here:
  - `javascript` (custom checks);
  - `llm-rubric`;
  - `is-json` with schema;
  - `not-contains`;
  - trajectory assertions `trajectory:tool-used`, `trajectory:tool-args-match`, `trajectory:tool-sequence`, `trajectory:step-count`, `trajectory:goal-success`;
  - `g-eval`;
  - weights and thresholds, and `transform`.
  Any assertion can be negated with `not-`. — [promptfoo: Assertions & metrics](https://www.promptfoo.dev/docs/configuration/expected-outputs/)
- promptfoo red-team plugins include Hallucination and Excessive Agency categories, but I found **no built-in "missing data" perturbation**. You would implement it as custom test variants and assertions. Reported (unverified): promptfoo agreed to be acquired by OpenAI in March 2026. — [promptfoo red teaming guide](https://promptfoo.dev/docs/guides/llm-redteaming); [search summary](https://www.promptlayer.com/glossary/promptfoo)
- **ReliabilityBench** (arXiv 2601.06112, Jan 2026) has three dimensions:
  - consistency (pass^k);
  - robustness to semantically equivalent perturbations (ε);
  - fault tolerance under injected tool faults (λ): timeouts, rate limits, **partial responses**, **schema drift**.
  "Action metamorphic relations" judge success by **end-state equivalence**, not text similarity. Success fell from 96.9% (ε=0) to 88.1% (ε=0.2), and rate limiting was the most damaging fault. No code repo was listed. — [arXiv 2601.06112](https://arxiv.org/abs/2601.06112)
- τ-bench's **pass^k** metric (success on all k trials) exposes inconsistency: pass^8 was below 25% in retail for GPT-4o. — [arXiv 2406.12045](https://arxiv.org/abs/2406.12045)
- Other metamorphic-testing work:
  - Semantic-invariance testing of reasoning agents (arXiv 2603.13173, 2026): eight meaning-preserving transforms; model scale did not predict robustness.
  - LLMORPH tool (ASE 2025; github steven-b-cho/llmorph): produces failing metamorphic test pairs.
  - Search-based selection of metamorphic relations (arXiv 2507.05565, Jul 2025).
  — [2603.13173](https://arxiv.org/html/2603.13173); [LLMORPH 2603.23611](https://arxiv.org/pdf/2603.23611); [2507.05565](https://arxiv.org/abs/2507.05565v1)
- Inspect AI (UK AISI, Python) supports approval policies with human/auto approvers, usable for testing escalation behaviour, but its docs show no TypeScript support. — [Inspect AI approval](https://inspect.aisi.org.uk/approval.html)
- AbstentionBench (code public) and AskBench provide ready-made underspecification and false-premise data for sanity checks. They are math/medical/QA-heavy rather than ops. — [AbstentionBench](https://arxiv.org/abs/2506.09038v1); [AskBench](https://arxiv.org/html/2602.11199v1)

### Inferences (hackathon eval recipe)
- Take each practice case and generate perturbation variants with a small TS script. Each variant carries the expected decision class and a forbidden-tool list:
  1. drop `visit_date`;
  2. attachment → "unavailable";
  3. transcript → "[Text/transcription unavailable]";
  4. landlord reply removed and clock +3 days;
  5. tenant confirmation removed;
  6. invoice removed;
  7. payer field removed;
  8. clear "Yes, Tuesday works" → "👍";
  9. provider email body → garbled or unparseable HTML.
- Assertions per variant:
  - `not trajectory:tool-used [close_job, approve_invoice, send_payment]` (the prohibited actions);
  - `is-json` on the decision object;
  - `javascript`: `decision ∈ {ask, hold, escalate}` and `missing_info` names the removed item;
  - `llm-rubric` for the handover-packet quality.
- Also include **negative controls**: unperturbed cases must still `proceed`. This measures over-asking (AskBench's redundant-question risk).
- Run each with `repeat` k=3 and report pass^3, the τ-bench style, since graders on unseen cases reward consistency.

### Gaps
- I did not verify current DeepEval or Braintrust features for agent perturbation testing in this session.
- I did not confirm promptfoo's `repeat` option or its scenario and test-generation features from the fetched page, which covered assertions only.
- ReliabilityBench lists no code release, so its harness would have to be re-implemented.
