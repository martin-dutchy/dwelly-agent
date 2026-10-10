# Human-in-the-loop decision UX for agent escalations

Scope: how to design a "decision page" where an ops person (e.g. at a UK lettings agency) decides on something an autonomous agent escalated, such as fraud suspicion, legal requests or spend approvals. Research done 10 Oct 2026. Some claims come from search-result abstracts or summaries, not full papers. Those are flagged.

## 1. Automation bias, over-reliance and trust calibration: where should the recommendation go, and what helps people catch wrong ones?

### Takeaway
Automation bias is robust: training and instructions do not prevent it, and explanations often make it worse because they raise acceptance whether or not the AI is right. Two things reduce over-reliance. The first is making people commit to their own view before they see the AI's (or slowing down access to the AI's answer). The second is giving explanations that are much cheaper to verify than redoing the task. Pre-selecting the agent's answer is the opposite of both.

### Cited Findings
- Automation bias "occurs in both naive and expert participants, cannot be prevented by training or instructions, and can affect decision making in individuals as well as in teams". Complacency arises under multi-task load, when other work competes for attention. Parasuraman & Manzey 2010, *Human Factors* 52(3) — [TU Berlin repository](https://depositonce.tu-berlin.de/items/0c787d91-6021-480b-a333-009e0d1d0092/full)
- Parasuraman & Manzey define complacency as (a) a human monitoring automation, (b) monitoring below a normative rate, and (c) failures resulting from that. Attention shifting away from a highly reliable aid can be rational, but it delays detection of the aid's errors. — [TU Berlin repository](https://depositonce.tu-berlin.de/items/0c787d91-6021-480b-a333-009e0d1d0092/full); [Frontiers 2019 discussion](https://www.frontiersin.org/articles/10.3389/fpsyg.2019.00225/pdf)
- Lee & See 2004 frame the goal as *appropriate* reliance, not more trust. People judge automation on three dimensions: performance (what it does), process (how it works) and purpose (why it exists). How the automation is *displayed* mediates trust through analytic, analogical and affective processing. This comes from the abstract and secondary summaries. — [Human Factors 46(1)](https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392); [PDF copy](https://csel.eng.ohio-state.edu/productions/intel/research/trust/Lee%20%26%20See%20Trust%20Review.pdf)
- Bansal et al., CHI 2021. Human+AI teams where the AI's accuracy was comparable to humans did show complementary gains, but explanations did not increase those gains. Instead, "explanations increased the chance that humans will accept the AI's recommendation, regardless of its correctness". — [arXiv 2006.14779](https://arxiv.org/abs/2006.14779); [UW IDL](https://idl.uw.edu/papers/ai-explanations-team-performance)
- Buçinca, Malaya & Gajos, CSCW 2021. People "rarely engage analytically with each individual AI recommendation" and instead form heuristics about when to follow the AI. Three cognitive forcing interventions reduced over-reliance compared with simple explainable-AI designs. Their families include deciding before seeing the AI recommendation, slowing the process down, and letting people choose whether and when to see the recommendation. The benefit was larger for people high in Need for Cognition. The interventions were also rated less favourably by users (this trade-off comes from the paper's framing; I did not confirm effect sizes). — [Harvard page](https://www.eecs.harvard.edu/~kgajos/papers/2021/bucinca2021trust.shtml); [arXiv 2102.09692](https://arxiv.org/abs/2102.09692v1)
- Vasconcelos et al., CSCW 2023, 5 studies, N=731. Over-reliance is a *strategic* cost-benefit choice. Explanations reduced over-reliance when they were easier to verify than the task itself and when stakes or rewards were higher. Earlier null results may come from explanations that did not lower the cost of verification. — [arXiv 2212.06823](https://arxiv.org/pdf/2212.06823); [Stanford HAI summary](https://hai.stanford.edu/news/ai-overreliance-problem-are-explanations-solution)
- Fogliato et al., FAccT 2022 ("Who Goes First?"), with 19 radiologists. Those who recorded a provisional answer *before* seeing the AI were less likely to agree with the AI regardless of its accuracy, and rated it less useful. The two-step workflow **did not lengthen task time**. — [arXiv 2205.09696](https://arxiv.org/pdf/2205.09696); [MSR](https://www.microsoft.com/en-us/research/?p=851515)
- Zhang, Liao & Bellamy, FAT* 2020. Per-case confidence scores helped calibrate trust. But "trust calibration alone is not sufficient to improve AI-assisted decision making", which also depends on the human bringing unique knowledge. Local (feature-importance) explanations were problematic. — [arXiv 2001.02114](https://arxiv.org/pdf/2001.02114)

### Inferences
- **Don't pre-select the agent's answer** as the default radio or button. That is the maximum-anchoring design, and Bansal shows acceptance rises regardless of correctness.
- **Order the page as question, then evidence, then recommendation**, or keep the recommendation visible but require one active step first. Fogliato shows a "provisional call first" step costs no time. A full blind-first workflow may be too heavy for a 3-minute ops decision, so a lighter version is to show the recommendation *after* the evidence block (lower on the page, or behind a "Show agent's recommendation" disclosure). A cheaper middle ground is to require a typed one-line reason or an explicit checkbox ("I checked the source") before high-risk approve actions.
- **Make verification cheap** (Vasconcelos). Each claim the agent makes should link to the exact quote or record it relied on, so checking it costs a click, not a re-investigation.
- **Put the human where they add unique knowledge** (Zhang et al.). Spell out what the agent *couldn't* check, such as a phone call, local knowledge or a landlord relationship, because that is where the human beats the AI.
- **Scale friction to stakes.** Approving the irreversible or harmful option (e.g. releasing a deposit to a suspected-fraud account, sharing tenant data in response to a "legal" request) should be deliberate. Safe or reversible options (hold, ask for more info) can be one click.
- The reviewer is likely multitasking (Parasuraman & Manzey), so the page itself must surface the risk and not rely on vigilance.

### Gaps
- I found no study of these orderings in operations or back-office settings specifically, such as property management or finance ops. The evidence base is lab tasks plus radiology.
- I did not retrieve effect sizes for Buçinca 2021 or confirm its exact user-preference trade-off from the full text.

## 2. Industry guidelines: HAX, PAIR, Anthropic and OpenAI agent oversight

### Takeaway
The guidelines converge on a short list. State the capability and its limits. Explain *why*, not just *what*, when stakes are high. Show confidence only if it changes the action, and map each confidence level to a recommended action. Make dismissal and correction efficient. Convey the consequences of actions. Require explicit human confirmation before consequential or irreversible steps, with a visible plan or log of what the agent did.

### Cited Findings
- Microsoft HAX: 18 guidelines (Amershi et al., CHI 2019). The ones relevant to an approval screen are #2 "Make clear how well the system can do what it can do", #4 "Show contextually relevant information", #8 "Support efficient dismissal", #9 "Support efficient correction", #10 "Scope services when in doubt", #11 "Make clear why the system did what it did", #15 "Encourage granular feedback" and #16 "Convey the consequences of user actions". Microsoft notes that they are not meant as a simple checklist. — [MSR project page](https://www.microsoft.com/research/project/guidelines-for-human-ai-interaction/); [MSR blog](https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/); list as reproduced in a [course reading summary](https://wordpress.cs.vt.edu/cs6724s20/?p=345)
- Google PAIR, "Explainability + Trust" chapter:
  - "Numeric confidence indicators are risky because they presume your users have a good baseline understanding of probability."
  - For categorical confidence, "Clearly indicate what action a user should take under each category of confidence."
  - Skip confidence if it doesn't change decisions. A "misleadingly high confidence… may cause users to blindly accept a result."
  - "Don't say 'what' without saying 'why' in a high stakes scenario."
  - Admit data gaps that require the user's own judgment. Use N-best alternatives when confidence is low. Scale explanation to stakes, and for high-stakes or infrequent decisions prompt a cross-check.
  - [PAIR Guidebook](https://pair.withgoogle.com/chapter/explainability-trust/)
- Anthropic, "Our framework for developing safe and trustworthy agents" (2025):
  - Humans "should retain control over how their goals are pursued, particularly before high-stakes decisions are made". The example is an expense agent needing approval before cancelling subscriptions.
  - Claude Code "must ask for human approval before taking any actions that modify code or systems". Read-only is allowed without asking, and persistent permissions can be granted for trusted routine tasks.
  - Transparency through a visible to-do checklist. "Too little information leaves humans unable to assess whether the agent is on track."
  - [Anthropic](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)
- Anthropic, "Trustworthy agents in practice" (April 2026, per search summary): agents operate with less supervision and are prompt-injection targets aimed at "costly actions". — [Anthropic](https://www.anthropic.com/research/trustworthy-agents)
- OpenAI Operator (Jan 2025 launch):
  - **User confirmations** before consequential steps such as submitting an order or sending an email.
  - **Takeover mode** for sensitive input (logins, payment), during which the agent does not screenshot what the user enters.
  - **Watch mode** (close supervision) on sensitive sites.
  - It declines some high-stakes tasks outright, e.g. banking transactions.
  - Later status: possibly folded into ChatGPT agent mid-2025 (not confirmed).
  - [OpenAI](https://openai.com/index/introducing-operator/)

### Inferences
- The approval prompt pattern from agent products is: name the exact action and its target (who, what, how much), state whether it is reversible, and require an explicit confirm. The UI should **echo the concrete effect**, e.g. "Send £1,250 deposit to account ending 4411". "Approve?" alone is not enough. This applies HAX #16.
- The decision page should separate reads and analysis the agent already did (no approval needed) from writes or side effects waiting on the human (approval needed). That mirrors the Claude Code read vs. modify split.
- Provide an "ask for more info / send back to agent" path as a first-class option, not just Approve/Reject. This covers HAX #9 (efficient correction) and #10 (scope when in doubt).
- Prompt injection matters for a lettings agent. Inbound emails claiming to be from solicitors, police or landlords are exactly the kind of content that could steer an agent. The page should show the *raw source* of the request, not only the agent's paraphrase.

### Gaps
- I did not fetch Apple HIG "Machine learning" or IBM Design for AI pages. No specific rules from them are included.
- I did not retrieve detailed docs on Claude Code permission prompt UI (wording, "always allow" scoping) beyond the framework post.
- I did not fetch NN/g articles.

## 3. How real products design review and approval queues

### Takeaway
Mature review queues share five features: a prioritised list with a risk or recommendation badge, a detail view with "why flagged" insights and related records, a small fixed set of named actions with stated consequences (some irreversible), assignment so two people don't work the same item, and an audit timeline. AI recommendations are shown as a labelled verdict plus short reasoning that cites the policy source, with the human explicitly keeping final say and a feedback control.

### Cited Findings
- **Stripe Radar reviews** (docs, current Oct 2026):
  - The queue is "a prioritized list" of payments needing investigation. The list view shows risk level, customer, payment method, amount and time.
  - The detail view has **risk insights** ("some of the most relevant risk factors") and **related payments** sharing the same email, IP or card. Keyboard J/K moves between items.
  - Actions are Approve, Refund, and "Refund and report fraud". Docs explicitly warn that "A completed refund is permanent, you can't undo it".
  - Assignment shows who is working what ("Assign to me"), and "The review timeline shows a complete history of assignment changes and other actions".
  - Best practices: focus humans "where human judgment can add valuable insight". Use insights to decide "when to trust or ignore the score". Pass business-specific metadata (e.g. Maps/Street View link to address) into the review.
  - Smart Refunds maps qualitative confidence labels to calibrated outcome rates (Very high = 72%, High = 60%, Medium = 40%, Low = 30%, Very low = 15% chance of fraud warning or dispute).
  - [Stripe docs](https://docs.stripe.com/radar/reviews.md)
- **Ramp spend request recommendations** (help centre):
  - Three labels: "Approval recommended", "Review recommended" and "Rejection recommended", each with a defined meaning. "Review" means the agent found something needing judgment *or lacked enough context to be confident*.
  - Shown as a badge in the inbox (hover for reasoning) and a coloured banner with a brief explanation on the detail page. The rationale "references relevant sections of the uploaded policy document".
  - Thumbs up/down plus an optional reason. Recommendations are "suggestions only" and reviewers keep final authority.
  - [Ramp support](https://support.ramp.com/spend-request-review-predictions); [Ramp approvals](https://support.ramp.com/hc/en-us/articles/20843280013459-Setting-up-spend-request-approvals)
- Ramp's controller agents "approve low-risk expenses or provide a recommendation with rationale". The claimed 99% accuracy is vendor marketing with no methodology. — [CPA Practice Advisor, Jul 2025](https://www.cpapracticeadvisor.com/2025/07/10/ramp-introduces-ai-agents-suited-for-controllers/164684/)
- **Intercom Fin handoff**: per Intercom marketing, the conversation goes to a human "with the full case history attached, including every message and every step it already tried". Fin can also pause mid-procedure to ask a teammate without handing off fully. A third-party claim of a structured summary (what was asked, what was tried, data collected, why escalated) is unverified. — [Intercom](https://www.intercom.com/chatbot); [Listicler (unverified)](https://listicler.com/best/best-live-chat-chatbot-to-human-handoff)

### Inferences
- For the decision page above the fold: the decision needed in one sentence, a verdict badge with 3 named levels and the defined action for each, the deadline, and the 2–4 action buttons with consequences stated. Below: risk insights / evidence, related records (other cases with same email, phone, bank account), what the agent already did, and the timeline.
- Use **named discrete recommendation labels with defined meanings** (Ramp), not a bare percentage. If a probability is shown, tie it to an observed outcome rate (Stripe Smart Refunds style), not a raw model score.
- Mark irreversible actions as such in the button or its confirm step (Stripe refund warning).
- Include a "related cases" panel. Fraud judgement in lettings (e.g. a bank-detail change request) is mostly about linkage, like Stripe's related payments.
- Give feedback on the agent's recommendation a one-click place, with an optional reason. This is the HAX #15 pattern as implemented by Ramp.

### Gaps
- I did not retrieve primary docs for Sift or Unit21 case review, Zendesk handoff, GitHub Copilot PR review, Brex, Superhuman, Linear Triage or content moderation consoles. No claims about them are made here.
- I did not find how Stripe or Ramp handle deadlines or SLA countdowns in the UI.

## 4. Presenting uncertainty and provenance

### Takeaway
Show provenance for each claim (quote plus source), state unknowns explicitly, and prefer categorical, action-mapped confidence over raw numbers. Confidence helps calibrate trust but is not enough on its own, and misleadingly high confidence drives blind acceptance.

### Cited Findings
- Numeric confidence is risky for users without a feel for probability. A 97% figure can confuse people who treat the result as certain. Categorical buckets need team-defined cutoffs and an action per bucket. — [PAIR](https://pair.withgoogle.com/chapter/explainability-trust/)
- PAIR advises saying when a data gap requires the user's own judgment, and using N-best alternatives when confidence is low. — [PAIR](https://pair.withgoogle.com/chapter/explainability-trust/)
- Confidence scores calibrate trust, but local explanations were problematic for decision support. — [Zhang et al. 2020](https://arxiv.org/pdf/2001.02114)
- Explanations help only when verifying them is cheaper than doing the task. — [Vasconcelos et al. 2023](https://arxiv.org/pdf/2212.06823)
- Ramp cites policy sections in each rationale. Stripe shows the top risk factors and the related records behind its score. — [Ramp](https://support.ramp.com/spend-request-review-predictions); [Stripe](https://docs.stripe.com/radar/reviews.md)

### Inferences
- Structure the evidence block as three explicit lists: **Established** (each item has a verbatim quote and source, e.g. "email from x@y.com, 09:14, line: '…'"), **Unverified / conflicting**, and **Unknown, which the agent could not check**. This turns "uncertainty" into something the human can act on.
- Avoid model self-reported percentages from an LLM, which are uncalibrated. Use Ramp-style labels (Recommend X / Needs your judgment / Recommend against) with the reason the agent is unsure.
- When the agent is torn, show the top 2 options with what would favour each (PAIR N-best).
- Always keep the raw source one click away. Paraphrase can hide prompt injection or misreading.

### Gaps
- I found no specific 2019–2026 study on quote-level citation UIs reducing over-reliance in decision tasks. The recommendation rests on the Vasconcelos verification-cost logic plus product practice.

## 5. The handoff/escalation packet: what a human needs in ~3 minutes

### Takeaway
Structured handoff formats (SBAR: Situation, Background, Assessment, Recommendation; I-PASS) probably improve safety, with I-PASS having the stronger evidence. Agent products converge on: what was asked, what the agent already tried, what it found, why it is escalating, and what it recommends.

### Cited Findings
- A 2025 BMJ Quality & Safety review of 12 handoff tools found SBAR and I-PASS "probably improve patient safety" for within-unit handoffs. I-PASS has stronger certainty and SBAR's evidence is low certainty. — [BMJ Qual Saf 2025](https://qualitysafety.bmj.com/content/34/10/680)
- A 2025 systematic review (15 quasi-experimental studies, 2019–2024) says SBAR/ISBAR tools "may support improvements" in communication and safety, with mixed results depending on context and training. — [Nursing Open 2025 via CiteDrive](https://www.citedrive.com/en/discovery/shift-transition-communication-among-nurses-a-systematic-review-of-scpisbarscp-and-scpsbarscp-based-structured-handover-tools/)
- An older SBAR review found moderate evidence, strongest for structuring *phone* communication, with 8 of 26 outcomes significantly improved. — [PMC6112409](https://pmc.ncbi.nlm.nih.gov/articles/PMC6112409/)
- Intercom hands off with "every message and every step it already tried". — [Intercom](https://www.intercom.com/chatbot)
- Anthropic: a visible plan or to-do list lets humans judge whether the agent is on track. — [Anthropic](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)

### Inferences
Proposed packet for an agent escalation, in SBAR order and readable in about 3 minutes:
1. **Situation**: the one decision needed, phrased as a question with the options, plus the deadline and what happens if nobody decides.
2. **Background**: who, which property or tenancy, and the triggering message (raw quote and source).
3. **What the agent already did**: actions taken, marked as done or reversible, and what was deliberately *not* done (e.g. "Did not reply to sender; did not release funds").
4. **Assessment**: established facts with sources, red flags, unknowns, and related cases.
5. **Recommendation**: a named label, a one-line reason, what would change the recommendation, and the consequences of each button.

The I-PASS "synthesis by receiver" idea maps to an optional read-back: a typed reason on high-risk decisions.

### Gaps
- I did not retrieve I-PASS component definitions from a primary source here.
- No evidence was found on the optimal packet length or time-to-decision for ops escalations.
