# Detecting and resolving conflicting data across sources in LLM agent pipelines

Context: UK property-management ops agent (Claude, TypeScript, zod). Sources: emails, call transcripts, CRM, legacy CSV exports, PDFs (invoices, quotes, inspection reports). Research date: 2026-10-10. Tool-call budget was limited (~16 calls), so some areas are thinner than others; see Gaps.

## 1. Knowledge-conflict research: how well do LLMs notice contradictions, and what helps?

### Takeaway
The literature names our problem "inter-context conflict" (sources in the context disagree with each other), as distinct from context-vs-memory conflict. Frontier models detect a contradiction fairly well when you explicitly ask them to look for one (GPT-4 about 88% on WikiContradict). They do much worse when they are just asked to answer: they tend to pick one value silently, adopt wrong context too readily, and over-report conflicts that are not there. Conflict detection should therefore be an explicit, separate step with structured output, not something we hope surfaces in a summary.

### Cited Findings
- "Knowledge Conflicts for LLMs: A Survey" (Xu et al., EMNLP 2024, arXiv 2403.08319) sorts conflicts into three types: context-memory, inter-context and intra-memory. Its causes include temporal misalignment and misinformation. Its mitigation goals include being faithful to context, discriminating misinformation and *disentangling sources*. — [arXiv 2403.08319](https://arxiv.org/html/2403.08319); [ACL Anthology](https://preview.aclanthology.org/setup/2024.emnlp-main.486)
- WikiContradict (IBM, NeurIPS 2024 Datasets track, arXiv 2406.13805) has 253 human-annotated real contradictions from Wikipedia. For one prompt template, *all* LLMs were better at detecting a contradiction in the context than at producing an answer that reflected it. — [arXiv 2406.13805](https://arxiv.org/pdf/2406.13805)
- WikiContradict: GPT-4 detected contradictions with reasonable explanations in about 88% of cases and Llama-3-70B-instruct in 77%. On conflict-free contexts, the same models confirmed "no conflict" only 44% and 48% of the time and *invented reasons for conflicts* in the remaining cases. Implicit conflicts that need reasoning were hardest. — [arXiv 2406.13805 html](https://arxiv.org/html/2406.13805v1); [NeurIPS proceedings](https://proceedings.neurips.cc/paper_files/paper/2024/hash/c63819755591ea972f8570beffca6b1b-Abstract.html)
- ClashEval (Wu, Wu & Zou, Stanford; arXiv 2404.10198, Apr 2024, rev. Feb 2025) uses more than 1,200 questions across 6 domains (drug dosages, records, locations...), with perturbed retrieved content. The 6 top LLMs tested, including GPT-4o, adopted incorrect retrieved content and overrode correct prior knowledge more than 60% of the time. Models were *less* likely to adopt content that deviated more from the truth. Low token-probability confidence predicted adoption. — [arXiv 2404.10198](https://arxiv.org/abs/2404.10198)
- FaithEval (arXiv 2410.03727, ICLR 2025) has about 4.9K problems covering unanswerable, *inconsistent* and counterfactual contexts. It separates faithfulness to context from factuality. — [arXiv 2410.03727](https://arxiv.org/abs/2410.03727); [ICLR 2025](https://mlanthology.org/iclr/2025/ming2025iclr-faitheval)
- ConflictBank (arXiv 2408.12076, Aug 2024) models three causes: misinformation conflict, temporal conflict (facts change over time) and semantic conflict (polysemy, e.g. same name for different entities). — [arXiv 2408.12076](https://www.arxiv.org/pdf/2408.12076)
- "Contradiction Detection in RAG Systems" (Gokul et al., Amazon, arXiv 2504.00180, Mar 2025) finds that context validation "remains a challenging task even for state-of-the-art LLMs". Performance varies a lot by contradiction type, larger models do better, and chain-of-thought helps some models while hurting others. — [arXiv 2504.00180](https://arxiv.org/abs/2504.00180)
- LegalWiz (arXiv 2510.03418, Oct 2025) compares an NLI detector, an LLM judge and a hybrid for self-contradictions and pairwise cross-document contradictions (gold set: 100 self pairs and 306 pairwise pairs). NLI lacked contextual depth. The LLM judge was prompt-sensitive and overconfident. The hybrid was best. — [arXiv 2510.03418](https://arxiv.org/pdf/2510.03418)
- Pairwise checking of all claims is O(N²). CaseFacts (arXiv 2601.17230) filtered candidate pairs by semantic similarity and ran the LLM judge only on the high-risk band. A Jan 2026 paper lists the costs: pairwise NLI/LLM-as-NLI is O(N²) and top-K neighbour pairing is O(NK). — [arXiv 2601.17230](https://arxiv.org/pdf/2601.17230); [arXiv 2601.13600](https://arxiv.org/pdf/2601.13600)
- Anthropic's "Reduce hallucinations" guide recommends the following. Allow "I don't know". Extract word-for-word quotes first for long documents (>20k tokens), then reason only from the quotes. Verify each claim by finding a supporting quote and retract it if none is found. Use best-of-N comparison, where inconsistent outputs signal hallucination. Restrict the model to the provided documents. It also states these techniques "don't eliminate them entirely. Always validate critical information". — [Anthropic docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- Anthropic Citations API. Supported types are plain text (sentence-chunked, char_location), PDF (sentence-chunked, page_location; scanned PDFs without a text layer cannot be cited) and custom content (your own blocks, content_block_location; recommended for transcripts and lists). Citations are "guaranteed to contain valid pointers to the provided documents". In Anthropic's evals they are "significantly more likely to cite the most relevant quotes" than prompt-based quoting. `cited_text` does not count toward output tokens. — [Anthropic Citations docs](https://platform.claude.com/docs/en/build-with-claude/citations)
- **Citations and structured outputs are incompatible.** Enabling citations on a document while also setting `output_config.format` returns HTTP 400. — [Anthropic Citations docs](https://platform.claude.com/docs/en/build-with-claude/citations)

### Inferences
- Run detection and answering as separate calls. Our failures (wrong address in an outgoing email, garbled names in summaries) happen when the model writes prose and has to resolve conflicts implicitly. A dedicated "list every field where sources disagree" step with structured output plays to the model's stronger mode (detection, per WikiContradict).
- Expect false positives. WikiContradict shows models invent conflicts in clean contexts, so LLM-flagged conflicts should be confirmed by a deterministic comparison of normalised values where possible (e.g. postcodes or amounts that match after normalisation are not a conflict).
- Because citations and structured outputs cannot be combined in one call, there are two practical patterns. (a) Use structured outputs or strict tool use with explicit `source_id` and `quote` fields in the zod schema, then verify deterministically that each `quote` is a substring of the cited source after whitespace and case normalisation. (b) Make a citations-enabled call for evidence, then a second structured call. Pattern (a) is cheaper and usable in a hackathon day.
- Wrap each source as its own document/XML block with id, type, timestamp and authority tier, so the model can do "disentangle sources" as the survey frames it. This also helps with the "message about another property" contamination case.

### Gaps
- No public benchmark numbers found for Claude specifically on WikiContradict or ClashEval (the ClashEval abstract does not list Claude results).
- No benchmark found that targets operational/business records (CRM vs email vs invoice). All benchmarks found are QA/Wikipedia/legal.

## 2. Data-fusion / truth-discovery principles

### Takeaway
Classic truth discovery resolves conflicting values by jointly estimating value truth and source reliability. Baselines are majority vote and quality-weighted vote. Known pitfalls are copying between sources (dependence) and multi-valued truths. With few sources and high stakes, a fixed authority/recency ranking plus explicit conflict logging and human escalation is more appropriate than learned reliability.

### Cited Findings
- Data fusion is "resolving conflicting values from different sources, and finding the underlying true values". Voting is the baseline and quality-based methods weight trustworthy sources. Method families are iterative, optimisation-based and probabilistic graphical models (Li et al., "A Survey on Truth Discovery", arXiv 1505.02463). — [arXiv 1505.02463](https://ar5iv.labs.arxiv.org/html/1505.02463)
- The CRH framework (Li et al., TKDE 2016) treats truths and source reliabilities as unknowns and minimises reliability-weighted deviation. It handles heterogeneous data types. — [TKDE 2016 PDF](https://cse.buffalo.edu/~lusu/papers/TKDE2016.pdf)
- Known difficulties are source dependence (copying), sensitivity to initialising reliability, and objects with more than one true value. — [arXiv 1505.02463](https://arxiv.org/abs/1505.02463); [USQ survey](https://research.usq.edu.au/download/0139ae81792a5393de4828ffbb80aa8d97319c6b921e9f06249b3004f9fcd000/2291991/A_Survey_on_Truth_Discovery_Concepts_Methods_Applications_and_Opportunities.pdf)
- An experimental evaluation compared 12 truth-discovery algorithms on synthetic and real data and studied initialisation, parameters, convergence and scalability. — [HAL](https://hal.archives-ouvertes.fr/hal-01856193)
- From data fusion to knowledge fusion (Dong et al., Google): fusion applied to extracted knowledge triples, where extraction errors and source errors compound. — [arXiv 1503.00302](https://arxiv.org/pdf/1503.00302)

### Inferences
- Copying applies directly to us. An AI summary or CRM note copied from an email is not independent corroboration. Track lineage (`derived_from`) so two agreeing records with the same origin count as one vote.
- Temporal conflict (ConflictBank) maps to legitimate change, e.g. a tenant's new phone number or a new tenancy. Resolution should prefer the most recent *authoritative* value, not just the most recent value, and record `valid_from`.
- A proposed authority ladder for this domain (our design, not from a source): signed/legal doc (tenancy agreement, approved quote PDF) > system of record (CRM) > structured third-party doc (invoice PDF) > direct first-party communication (tenant email/call) > legacy CSV export > AI-generated summary or hearsay. Tie-break by recency within a tier. Never auto-resolve money, identity or address conflicts. Log them and escalate.
- Conflict log entry shape: `{field, entityId, candidates:[{value, normalised, sourceId, sourceType, tier, observedAt, quote}], resolution: 'auto'|'escalated'|'unresolved', chosen?, rule, reason}`. Silent overwrite is the anti-pattern.

### Gaps
- No 2024–2026 truth-discovery papers specific to LLM agents found within budget. All core references are 2015–2016 (still the canonical ones).

## 3. Programmatic tools usable in TypeScript/Node today

### Takeaway
Everything needed for deterministic cross-checks exists on npm and is maintained. Use fuse.js / fastest-levenshtein / talisman (Jaro-Winkler, double metaphone) for names; libphonenumber-js for UK phones; postcodes.io (free, no key) plus a regex for postcodes; chrono-node + date-fns/luxon for dates and weekday checks; dinero.js v2 or integer pence for money/VAT; zod for schemas; json-rules-engine or plain TS predicates for rules. Avoid `string-similarity` (deprecated). Python Splink is the reference for probabilistic record linkage but is overkill for one day.

### Cited Findings
npm data pulled live from registry.npmjs.org and api.npmjs.org on 2026-10-10 (latest version, publish date of latest, weekly downloads):

| Package | Use | Latest (date) | Weekly DLs | Notes |
|---|---|---|---|---|
| zod | schemas/validation | — | ~326M | Anthropic TS SDK has `zodOutputFormat()` helper |
| fuse.js | fuzzy search over lists (find best contractor/tenant match) | 7.5.0 (2026-07-13) | ~14.4M | active |
| fastest-levenshtein | edit distance | 1.0.16 (2022-08-02) | ~25.9M | stable, not deprecated |
| talisman | Jaro-Winkler, metaphone, many metrics/phonetics | 1.1.4 (2021-01-21) | ~64K | unmaintained but not deprecated |
| double-metaphone | phonetic name keys | 2.0.1 (2022-11-02) | ~200K | |
| natural | NLP incl. JaroWinkler, Dice, metaphone | 8.1.1 (2026-02-27) | ~1.5M | active |
| string-similarity | Dice coefficient | 4.0.4 (2021) | ~2.6M | **deprecated on npm** |
| jaro-winkler | JW only | 0.2.8 (2016) | ~387K | stale |
| libphonenumber-js | parse/normalise to E.164, UK validity | 1.13.15 (2026-10-08) | ~27.5M | active |
| chrono-node | NL date parsing ("next Tuesday") with reference date | 2.10.2 (2026-10-03) | ~2.1M | active |
| date-fns / luxon | date maths, weekday, timezone (Europe/London) | — | ~98M / ~42M | |
| dinero.js | integer-minor-unit money | 2.0.2 (2026-03-13) | ~732K | v2 stable |
| currency.js | decimal money | 2.0.4 (2021) | ~721K | stale |
| json-rules-engine | declarative JSON rules | 7.3.1 (2025-02-20) | ~404K | |
| postcode | UK postcode parse/validate/normalise | 5.1.0 (2021) | ~38K | offline, stable |
| node-postal | libpostal bindings | 1.3.0 (2025-06-02) | ~22K | needs native libpostal (~2GB model), heavy for a hackathon |
| unpdf / pdf-parse / pdfjs-dist | PDF text extraction | unpdf 1.8.1 (2026-08-13); pdf-parse 2.4.5 (2025-10-20) | 5.4M / 9.1M / 32M | |
| papaparse / @fast-csv/parse | CSV legacy exports | papaparse 5.7.0 (2026-08-24) | ~16M / ~19M | |

— Sources: [npm registry](https://registry.npmjs.org/), [npm downloads API](https://api.npmjs.org/downloads/point/last-week/fuse.js) (queried 2026-10-10); deprecation of string-similarity from [registry](https://registry.npmjs.org/string-similarity/latest).

- postcodes.io: free, open-source (MIT) UK postcode API built on Ordnance Survey/ONS data. It validates postcodes and returns geography and admin data but **not street addresses**. Property-level/UPRN data is pointed to the paid Ideal Postcodes service. — [postcodes.io](https://postcodes.io/)
- Verified live on 2026-10-10: `GET https://api.postcodes.io/postcodes/SW1A1AA` returns normalised `"postcode":"SW1A 1AA"`, lat/long, admin_district etc. `GET /postcodes/{pc}/validate` returns `{"result":true}`. No API key was needed. — [api.postcodes.io](https://api.postcodes.io/postcodes/SW1A1AA)
- Splink (UK Ministry of Justice): Python probabilistic record linkage (Fellegi-Sunter, unsupervised, term-frequency adjustments) on DuckDB/Spark/Postgres. It claims about 1M records on a laptop in about a minute, was used by the ONS on 2021 Census data, has 2.5k GitHub stars, and Splink 5 is announced. — [GitHub splink](https://github.com/moj-analytical-services/splink)

### Inferences
- Name matching recipe (tenants/contractors): normalise (lowercase, strip titles "Mr/Mrs/Ms/Dr", company suffixes "Ltd/Limited/LLP/& Co", punctuation), then Jaro-Winkler ≥0.9 → same; 0.8–0.9 → flag "probable variant"; <0.8 → conflict. Add a double-metaphone key to catch transcript misspellings ("Siobhan"/"Shivon"). Thresholds are a starting heuristic and need tuning on our cases.
- Invoice issuer ≠ assigned provider is often a trading-name vs legal-name issue. Keep an alias list per contractor (and Companies House number if available) rather than relying only on fuzzy scores.
- Address check: extract the postcode with a UK regex/`postcode` lib, normalise, and compare to the property's postcode first (cheap, high signal). Then compare house number/flat. Validate the postcode via postcodes.io bulk/validate. Skip libpostal for a one-day build.
- Phone: `parsePhoneNumber(x, 'GB').number` gives E.164. Compare E.164 strings. A mismatch counts as a conflict, but "new number" may be a legitimate temporal change.
- Dates: parse with chrono-node using the message's sent timestamp as reference date (for "next Tuesday"). Then check `isPast(visitDate)` and that the stated weekday equals `format(date,'EEEE')` in Europe/London.
- Money/VAT: work in integer pence. UK standard VAT is 20%. Check `gross == net + vat`, `vat == round(net*0.2)` within ±1p per line, and invoice net vs approved quote net within a tolerance (see section 5). Common error: comparing a quote's net to an invoice's gross.

### Gaps
- No direct fetch of postcodes.io endpoint docs (404 on /docs). The bulk-lookup limit (historically 100 postcodes per POST) and rate limits are unverified here.
- No GitHub star counts collected for the npm libraries (download counts used as the popularity proxy instead).
- No UK-specific address normaliser in pure JS found. OS Places/AddressBase is paid and not investigated.

## 4. "Extract-then-validate" pattern and evidence on accuracy

### Takeaway
The production-standard architecture (IDP vendors, Anthropic guidance) is: constrained LLM extraction into a typed schema with per-field source evidence → deterministic validation (arithmetic, formats, cross-reference against master data, confidence thresholds) → route only failures to an LLM adjudicator and/or a human queue. Schema constraints guarantee shape, not truth, so the deterministic layer is the actual correctness control.

### Cited Findings
- Anthropic structured outputs: responses "always valid JSON that matches the schema", with exceptions for refusals and `max_tokens` truncation. TS: `zodOutputFormat()` from `@anthropic-ai/sdk/helpers/zod` with `client.messages.parse()` → `parsed_output`. Not supported: numeric min/max, string length, most array constraints, recursive schemas. The SDK helper can move unsupported constraints into descriptions and validate after. There is no factual-accuracy guarantee. — [Anthropic structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- Anthropic: have Claude find a supporting quote for each claim and retract unsupported claims. Best-of-N inconsistency is a hallucination signal. — [Anthropic reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- A vendor-described IDP pipeline: OCR/layout → LLM mapping onto a fixed schema of permitted fields/types/enums ("the model cannot invent a field") → business rules on every record (arithmetic checks, ID format checks, cross-reference with master data, per-field confidence thresholds) → only failing/low-confidence records go to human review, annotated with which check failed. No quantified accuracy given (vendor source). — [SmartDev case study](https://smartdev.com/case-studies/ai-powered-invoice-processing/)
- Hybrid NLI + LLM judge beat either alone for cross-document contradiction detection (legal domain). — [arXiv 2510.03418](https://arxiv.org/pdf/2510.03418)

### Inferences
Concrete pipeline for the hackathon (TypeScript):
1. **Ingest and tag**: each source gets `{sourceId, type: email|transcript|crm|csv|pdf_invoice|pdf_quote|inspection|ai_summary, tier, observedAt, propertyRef?}`.
2. **Extract**: one structured-output call per source into a zod `Fact[]`: `{entity: 'property'|'tenant'|'contractor'|'job'|'invoice', field, value, sourceId, quote, confidence}`. Afterwards, deterministically assert `quote` occurs in the source text (fuzzy, whitespace-normalised); drop or flag facts whose quote is not found. This catches garbled AI summaries.
3. **Normalise**: postcode, E.164 phone, ISO date + weekday, pence, canonical names/aliases.
4. **Cross-check (rules)**: group facts by `(entity, field)`. Rules include: same postcode across all outgoing-email drafts and the job's property; tenant name/phone equal to the CRM tenancy; invoice issuer in the contractor alias set; invoice net ≤ quote net × (1+tol) and VAT arithmetic; visit date ≥ today and weekday matches; CRM tenancy dates vs CSV (CRM wins, log the diff); messages whose postcode or address ≠ the case property are flagged as "foreign context" and excluded from summarisation. Implement as plain TS predicates or json-rules-engine (JSON rules are nice for showing a judge, but plain TS is faster to write).
5. **Adjudicate**: send only conflicts to Claude with the candidate values, quotes, tiers and timestamps. Ask for `{decision: 'pick'|'escalate', chosenSourceId?, rationale}`. Hard policy: money, identity and address conflicts always escalate or block outbound messages.
6. **Guard outbound**: before sending any email, re-run address/name/date rules on the *draft* against the canonical record. This directly targets the "wrong address in outgoing email" case.

### Gaps
- No independent (non-vendor) 2024–2026 benchmark found comparing LLM invoice extraction accuracy against rule-based/template IDP within budget.
- No published evidence quantifying how much quote-verification or claim-extraction-then-compare improves conflict detection for Claude specifically.

## 5. Production patterns from IDP / accounts payable (3-way match)

### Takeaway
AP three-way match (PO ↔ goods receipt ↔ invoice) is a clean template: compare at line level, apply explicit tolerances (zero, percentage or absolute), hold documents that arrive out of order, and send exceptions to humans with the reason. Our equivalent is approved quote ↔ job completion evidence (inspection/visit report, tenant confirmation) ↔ contractor invoice.

### Cited Findings
- Three-way match compares the vendor invoice against the PO and the proof of receipt before payment. It is primarily a fraud and overpayment control. — [Corpay](https://www.corpay.com/en-SG/resources/blog/three-way-matching)
- Tolerances can be zero, a percentage or a fixed amount. Too tight chokes on legitimate variances, too loose makes the control "theatrical". Exceptions go to AP, procurement and receiving to adjust, request a corrected invoice or approve the variance. — [Corpay](https://www.corpay.com/en-SG/resources/blog/three-way-matching); [Lightsource glossary](https://lightsource.ai/glossary/three-way-match)
- Good practice: match at line level rather than total, and hold invoices that arrive before their receipt. The receipt step fails most often. Two-way skips the receipt and four-way adds inspection. — [Tray.ai](https://tray.ai/automate/three-way-match/)

### Inferences
- Map onto our domain: PO = approved quote (net, VAT, scope lines, contractor), receipt = completion evidence (inspection report/photos/tenant sign-off, completion date), invoice = contractor invoice (issuer, net/VAT/gross, lines, property address). Four-way = add the landlord approval threshold.
- Suggested tolerances (our heuristic, to be confirmed with ops): issuer must match the alias set exactly. Property postcode must match exactly. Amount: net ≤ quote net + max(£5, 2%), and any excess goes to the human queue. VAT must be 20% of net ±1p, or 0 if the contractor is not VAT-registered (a VAT number should then be absent).
- Hold state: invoice received with no completion evidence → `awaiting_receipt`, not auto-approved.

### Gaps
- No authoritative standard (e.g. ACCA/ICAEW) source fetched for tolerance values. The figures above are illustrative, not sourced.
- UK property-management-specific invoice-matching practices (e.g. RICS/ARLA guidance) were not researched within budget.
