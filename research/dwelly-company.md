# Dwelly (Dwelly Group): company research for the hackathon

Researched 2026-10-09, the day before the hackathon (Sat 10 Oct 2026). All dates are publication dates unless stated otherwise.
Labels: **[V]** means verified from a primary source (Dwelly site, job ads, Companies House, Luma, Dwelly's own portal code). **[P]** means reported by trade or tech press. **[U]** means unverified or inferred.

---

## 0. TL;DR for the Property Management track

- Dwelly's flagship agent workflow is **maintenance**. They also automate **payment recognition** (rent reconciliation). Their 2026-09-03 blog gives the exact metrics they care about: human minutes per task, escalations per task, accuracy, reopenings, speed and customer outcomes. Expect the judges' rubric to look like this. [V]
- Dwelly's escalation philosophy, quoted from their blog: "When the system cannot safely determine the next step, it asks our human agent for help and continues with the new decision or context... We optimize for the right escalation at the right moment, with enough context for a person to decide quickly." [V]
- The tenant portal is Dwelly's own product (tenant.dwelly.group). Its public JS bundle shows a real **AI maintenance intake schema**. Fields: category, subcategory, severity (emergency, urgent or routine), severity_reason, intake_confidence, key_assumptions, self_resolvable, containment_steps, tenant_responsibility (with tenancy clause numbers), clarifying_questions and photos_required. It also contains hard-coded **emergency fast paths** (gas leak, CO, fire, electrical fire, structural collapse, major flooding) and **job stages** (init, mp_time, visit, work, result, certificate, double_quotation, quote_approved, documents, confirmation, completed, cancelled). This is the closest public preview of what the synthetic data may look like. [V] (see section 2.4)
- Their real-world mess comes from acquisitions. Each acquired agency brings legacy CRMs (Fixflo, Alto and so on), 5+ years of emails and inconsistent records. Dwelly's hackathon blog says: "information arrives in pieces, and old records might disagree." [V]

---

## 1. Company facts

### Legal entity [V]
- Trading name of **PROSPIRE TECHNOLOGIES LTD**, company no. **14991567**, incorporated **10 Jul 2023**. Registered office: 105 High Street, Worcester WR1 2HW. SIC 62090. Last accounts were made up to 31 Dec 2025. https://find-and-update.company-information.service.gov.uk/company/14991567
- Directors: Ilia Drozdov (since 10 Jul 2023); Dmitry Khanukov and Dan Lifshits (both since 26 Jun 2025); Nils Petter Nygaard (since 10 Apr 2026); Zeynep Yavuz (since 17 Jul 2026). Jeannette Furstenberg was appointed 1 Jul 2025 and has since resigned. The new directors are probably investor board seats, but that is [U].
- PSC: **General Catalyst XII Creation, L.P.** holds 25–50%, notified 1 Jul 2025. Before that, the founders were PSCs, ceasing 1 Jul 2025. So General Catalyst's "Creation" (AI roll-up incubation) strategy had control-level ownership from mid-2025, well before the public Feb 2026 round. https://find-and-update.company-information.service.gov.uk/company/14991567/persons-with-significant-control
- Other UK companies called "Dwelly Ltd" (for example 15055007, Slough) appear unrelated. [U]

### Founders [V] / [P]
| Name | Role | Background |
|---|---|---|
| Ilia (Ilya) Drozdov | Co-founder, CEO | Former GM at Uber. Previously co-founded a tech-enabled rental agency in Russia that scaled to about 10k apartments (Fortune, 2026-02-25) [P]. Kyrgyz nationality per Companies House [V]. |
| Dan Lifshits | Co-founder, CPO | Former GM and global VP at Gett (Fortune) [P]. Israeli nationality [V]. |
| Dmitry Khanukov | Co-founder, CTO | Co-founder and CTO of **PIK Rent** (2018–2021, 10k+ properties, exited 2021). Earlier an engineering contractor at Uber EMEA (driver recruitment, onboarding, CRM). Master's in Applied Informatics/AI (2013). Built an "SQL Expert" GPT featured in WIRED. Based in Miami and London. Hackathon co-host on Luma. Source: https://khanukov.me/ [V, self-published] |

- The three have worked together for 15+ years (ProptechConnect, 2024-09-25) [P].
- **Sam Humphreys** was formerly MD of Lime Property, the first acquisition, and is now **Head of M&A** [P].
- **Paul Jardine** (ex-M&A director at LSL, ex-COO at Purplebricks) was hired around Dec 2024 [P]. https://proptechconnect.com/proptech-dwelly-acquires-its-second-estate-agency-this-year/
- Dwelly's own line: "We built, ran and sold a tech-enabled lettings agency before starting Dwelly" (https://www.dwelly.group/about) [V].

### Funding
| Date | Round | Amount | Investors | Source |
|---|---|---|---|---|
| ~Jul 2025 (inferred from PSC) | Undisclosed (GC Creation) | ? | General Catalyst XII Creation | Companies House [V]; amount [U] |
| Feb 2026 (Fortune 2026-02-25) | "Series A" package | £69m / $93m: £32m equity led by **General Catalyst** with Begin Capital and S16VC, plus a £37m debt facility from **Trinity Capital** | General Catalyst, Begin Capital, S16VC, Trinity Capital | https://www.fortune.com/2026/02/25/dwelly-ai-roll-up-uk-lettings-agencies-real-estate-brokerages-93-million-new-venture-captial-funding-to-fuel-expansion [P] |
| 28 Jul 2026 | Series B | **$170m**: $95m equity led by **EQT Growth** with GC, s16vc, Begin Capital and DVC, plus a $75m debt facility from Trinity Capital | Angels: CEOs of **Legora** (Max Junestrand), **Synthesia** (Victor Riparbelli) and **ElevenLabs** (Mati Staniszewski); Philipp Freise (KKR) | https://www.dwelly.group/blog/dwelly-raises-170m-series-b [V]; https://thenextweb.com/news/dwelly-raises-170m-to-turn-uk-lettings-agencies-into-software [P] |

- Job ads (Sep–Oct 2026) say Dwelly has raised **$263m** in total [V].
- Goodwin Law advised on the Series B: https://www.goodwinlaw.com/en/news-and-events/news/2026/07/announcements-technology-goodwin-advises-dwelly-raising-170-million-series-b [P]
- General Catalyst's thesis: a $1.5bn AI roll-up "Creation" strategy led by Marc Bhargava. It targets fragmented services businesses where agentic AI can automate 30–70% of workflows and lift EBITDA margins from 5–10% to 30–40% [P]. https://the-ai-native-cfo.beehiiv.com/p/the-general-catalyst-behind-15-billion

### Scale and headcount
- **15,000+ properties, £350m rent roll, "$470m GMV", top-10 UK lettings operator.** Sources: Series B blog and job ads [V].
- Hall of Fame page: **16,500 properties, 20 agencies, 18 regions, "2,000+ tenant enquiries every day"** [V]. https://www.dwelly.group/hall-of-fame. Khanukov's site says **25 branches** [V].
- Headcount: about 300 in Feb 2026, targeting 1,500+ by year-end. About 40 HQ staff in engineering, product and analytics (Fortune) [P].
- From the Senior Product Designer ad (2026-10-05): "Our current development team is a team of 5, a few analysts, and one product designer". Products are described as "hyper-functional but quite basic — an MVP" [V].
- Productivity claim: one property manager handles **300+ units, up from about 100** [V].
- Payments ops: the Ops Manager Payments ad requires line management of 30+ people across sites [V].
- Property Specialists (field staff) number 25+ now, scaling to 100+ [V].

### Acquisitions (chronological)
| # | Date (announced) | Agency | Location | Properties | Source |
|---|---|---|---|---|---|
| 1 | 2024-09-25 | Lime Property | Hull | ~1,000 (15 staff, £1.2m revenue) | https://proptechconnect.com/?p=20905 [P] |
| 2 | Dec 2024 | Gallant Richardson | Colchester, Essex | 420–450 (£800k revenue) | proptechconnect (above) [P] |
| 3–6 | 2025 | Pennington(s) (Ipswich, Suffolk); Parks Letting (Brighton) [U location]; Number 1 Letting (Pontefract, W. Yorks, ~775–850); HC Lettings (Nottingham, HoldenCopley's lettings arm, 850; 2025-09-03) | | | https://www.eastmidlandsbusinesslink.co.uk/mag/featured/dwelly-expands-national-footprint-with-acquisition-of-nottingham-lettings-business/ ; https://propertyindustryeye.com/fast-growing-proptech-platform-acquires-fifth-letting-agency/ [P] |
| 7 | 2025-12-03 | SBK Lettings (Sheldon Bosley Knight lettings arm) | 13 Midlands branches | 4,600 (£25m rent book) | https://propertyindustryeye.com/fast-growing-agency-acquires-sheldon-bosley-knight-letting-arm/ [P]; count from Hall of Fame [V] |
| 2026 #1 | 2026-01-20 | Brookdale Property Management | Peterborough | ~1,100 | https://propertyindustryeye.com/fast-growing-agency-completes-first-strategic-acquisition-of-2026/ [P] |
| 2026 #2 | 2026-03-04 | Goodwin Property Services | Stamford | ~330 | https://www.propertywire.com/news/dwelly-acquires-stamford-lettings-firm-in-second-2026-deal/ [P] |
| 2026 #3 | ~2026-04-14 | Eden Harper | SW London (Brixton, Battersea) | ~250 | https://bebeez.eu/2026/04/14/fast-growing-agency-enters-london-market-with-third-acquisition-of-year/ [P] |
| 2026 #4 | 2026-05-28 | Albery Tyson | Market Harborough (folded into SBK) | ~250 | https://proptechconnect.com/dwelly-acquires-east-midlands-lettings-firm-albery-tyson/ [P] |
| 2026 #5 | 2026-06-04 | Elliot Oliver | Cheltenham | ~870–900 | https://propertyindustryeye.com/agency-growth-gathers-pace-with-second-acquisition-in-days/ [P] |
| 2026 #6 | 2026-06-11 | Move | Cheltenham, Gloucester, Worcester | ~1,100–1,150 | https://businesscloud.co.uk/news/proptech-announces-sixth-deal-of-2026/ [P] |
| 2026 #7 | Jun–Jul 2026 | Settio | Manchester, Birmingham, London, Singapore (first overseas deal; clients in 17 countries; £600m assets) | ~2,061 | https://www.accountancytoday.co.uk/2026/07/10/uhy-williamson-croft-advises-settio-on-landmark-sale-to-dwelly/ [P] |
| 2026 #8 | Jul 2026 | AP Morgan (lettings only) | Redditch, Bromsgrove, Longbridge, Stourbridge, Shirley | ~447 | https://partridge-homes.co.uk/landlords/dwelly-ap-morgan-lettings-acquisition-landlords/ [P] |
| 2026 #9 | 2026-08-06 | Shaws | Kensington and Hammersmith | ~250 | https://propertyindustryeye.com/fast-growing-group-completes-ninth-acquisition-of-the-year/ [P] |
| 2026 #10 | 2026-09-01 | Paramount Properties | West Hampstead, London (30 staff) | ~1,100 | https://propertyindustryeye.com/fast-growing-estate-agency-completes-tenth-acquisition-of-2026/ [P] |
| ? | ? | Helen Breeze Property Management | Sevenoaks (block management, ~50 blocks under 18 m) | ? | Job ad 4995239101 [V]; date [U] |
| ? | ? | Agencies in Barnt Green and Redditch | West Midlands | ? | Job ads [V]; possibly AP Morgan or SBK branches [U] |

- Head of Launch ad (2026-09-24): "currently acquiring 1 to 3 lettings agencies every month, ranging from £100k tuck-in businesses through to companies with purchase prices of £20–30M". They plan a **platform-as-a-service** offering for partner agencies on a profit-share basis, described as "the single biggest growth opportunity" [V].
- Note that britbrief and PIE's 2026-10-08 "10 acquisitions in a year" list includes Lime, which was a 2024 deal. Treat that list as sloppy [P].

### Business model and thesis [V]
- "AI-native services, not SaaS". Dwelly buys the agency, keeps the local brand and staff, migrates it onto Dwelly's OS, and captures 100% of the P&L rather than the 1.5–2% a software vendor would (Fortune).
- Series B blog: "Dwelly is automating the transactional layer. Every tenant and landlord communication runs through our platform, which keeps a continuously updated context for each customer and property. AI agents handle work end to end... The relationship layer stays with people." Agency staff "supervise the AI agents and act as advisors".
- Data moat: on acquisition Dwelly inherits "five or more years of emails and workflow history". Its examples: "the landlord who prefers to be called Ben rather than Benjamin, the contractor who is fastest for urgent plumbing jobs, the owner who wants a call before repairs above a certain threshold." **These are exactly the kinds of preference and threshold facts that hackathon cases may hide in CRM notes.**
- Roadmap: deeper automation across lettings, PM, rent collection, compliance and maintenance "with clear handoffs between AI agents and staff". Also planned are legal protection, rent guarantees, financing and a **contractor marketplace**, plus expansion into Europe.
- Pitched to sellers as acquisition and succession planning (https://www.dwelly.group/acquisitions). They also claim "integrates AI within two months" and "time to rent reduced 75–80%".

---

## 2. Operations

### 2.1 Org structure (from job ads, Sep–Oct 2026) [V]
- There are three front-line domains: **Tenant Find, Property Management and Payments**. Property Specialists form a shared field layer. Separate central functions cover Launch (post-M&A integration), Compliance (General Counsel, MLRO and DPO) and a Talent team. In ops there are "four Run Operations Managers, 4 Heads, and the UK GM".
- Property Manager (Birmingham/Barnt Green, 2026-10-02) covers "the four key areas of property management: **maintenance, compliance, move-outs and inspections**". The role also involves negotiating deposit deductions and referring disputes to **TDS** (Tenancy Deposit Scheme). The PM is the main contact for tenants, landlords and contractors. "Regular user of ChatGPT / Claude / Gemini" is a nice-to-have. https://job-boards.eu.greenhouse.io/dwelly/jobs/4996784101
- Lettings Negotiator: runs Tenant Find end to end, covering applications, **holding deposits, referencing, scheduling inventory, contracts and move-ins**. Must keep the "move-out > move-in" handoff in sync with PM and Payments. https://job-boards.eu.greenhouse.io/dwelly/jobs/4987656101
- Property Specialist (Battersea/Nottingham): check-ins and check-outs, mid-term inspections, inventories and schedules of condition, pre-leaving inspections, "inspection and compliance reports in line with **deposit service requirements**", H&S, fire and gas compliance, viewings and feedback, and marketing photos, video and floor plans. Tools: Slack, Google Meet and Docs, CRMs, portals, Giraffe360 cameras and inventory software. https://job-boards.eu.greenhouse.io/dwelly/jobs/4980898101
- Operations Manager – Payments: SLAs, accuracy, **arrears** processes, QA and exception tracking. Escalations include "landlord/tenant disputes and bank discrepancies". The environment is "regulated client-money". RPA and low-code are a plus. There is a **Head of Payments** driving automation. https://job-boards.eu.greenhouse.io/dwelly/jobs/4858477101
- Operations Associate: owns "the feedback loop for our **maintenance provider platform and mobile app**", relays feedback, "vibe-codes fixes". Also covers ancillary-services revenue. https://job-boards.eu.greenhouse.io/dwelly/jobs/4889411101. The website has a "Become a Service Provider" link (/contact?site=provider), so Dwelly runs **its own contractor network and app**.
- Senior Block Manager at Helen Breeze: service-charge budgets, **Section 20** major works, leasehold law, **Building Safety Act** and contractor management. https://job-boards.eu.greenhouse.io/dwelly/jobs/4995239101
- Compliance Manager: AML (MLRO, sanctions screening, SARs to NCA, HMRC registration), GDPR (DPO, DSARs, breaches), **client money protection, redress schemes, fee transparency, property standards** and diligence on acquisition targets. https://job-boards.eu.greenhouse.io/dwelly/jobs/4913634101
- Product personas: **Tenant, Landlord, Maintenance Contractor, Dwelly Agent**. The products are Tenant Find, Property Management, Payments, CRM and a "communications/portal layer" (Senior Product Designer ad). https://job-boards.eu.greenhouse.io/dwelly/jobs/4939185101

### 2.2 Workflow automation status
| Workflow | Status | Evidence |
|---|---|---|
| Maintenance and repairs | **Live, agentic.** 1,000+ tasks in Aug 2026. Human time fell from about 3h (30 actions × 6–7 min) to 15–20 min per task. That is about 5 escalations per task at about 3 min each. | https://www.dwelly.group/blog/ai-operations (2026-09-03) [V] |
| Payment recognition and reconciliation | **Live.** >80% auto-recognised, saving 2–3 h/day. A partnership will take it to 98%. | same [V] |
| Rent collection | **GoCardless Direct Debit.** Arrears are "automatically managed" (marketing claim). | Platform page; tenant portal JS [V] |
| Tenant Find (enquiries, viewings, offers, referencing, KYC, Right to Rent) | Live. Self-service chat, about 8–10 verified offers per property, virtual viewings. | https://www.dwelly.group/platform [V]; Fortune [P] |
| Tenant and landlord comms | Centralised: "every tenant and landlord communication runs through our platform" | Series B blog [V] |
| Compliance certificates (Gas, EPC, EICR) | Tracked in the landlord and tenant portals. "renewed one month before they expire". Marketed as "100% compliance". | Portal JS; platform page [V] |
| Deposits | Holding deposit and security deposit shown in the portal. Disputes go to TDS. | Portal JS; PM ad [V] |
| Check-in/out, inventories, inspections | Done in person by Property Specialists | Ads [V] |
| Move-out notice | Tenant portal "Move Out request" uses Renters' Rights Act 2025 copy: "at least 2 months written notice" | Portal JS [V] |
| Contract changes | A £50 (incl. VAT) admin fee to update the Tenancy Agreement | Portal JS [V] |
| Accounting and client money | Ops team; automation planned. No accounting vendor is named (Xero etc. not found). | [U] |

### 2.3 Systems and stack
- **In-house platform**, written by the dev team: TypeScript, Node.js, React, **tRPC, Drizzle**, MySQL/Postgres, "LLM orchestration" (Staff SWE and Applied AI ads) [V].
  - Tenant and landlord portals are **Nuxt/Vue** SPAs (tenant.dwelly.group, landlord.dwelly.group), with Sentry error tracking [V].
  - The marketing site runs Nuxt with the Storyblok CMS [V].
- **Telephony and messaging** (Telecommunication Engineer ad, 2026-09-10) [V]:
  - Providers: **Voximplant, Vonage, Twilio**, IP telephony, SMS/RCS, email and **WhatsApp Business API (WABA)**.
  - Call flows include voicemail, business-hours schedules, transfers, call recordings and CLI logic. The telecom components are integrated into the CRM.
  - Number porting from acquired agencies is part of the job. Integrations use APIs, webhooks and WebSockets, "and AI-powered solutions".
  - No Aircall or Intercom found. No public evidence that ElevenLabs runs Dwelly's own voice line (the ElevenLabs CEO is an angel investor and a hackathon partner) [U].
- **Legacy systems at acquired agencies:** Goodwin (Stamford) and AP Morgan still link tenants to **Fixflo** (goodwin.fixflo.com, ap-morgan.fixflo.com). Integrated agencies (HC Lettings, Gallant Richardson, Eden Harper, Number 1 Letting) link to **tenant.dwelly.group / landlord.dwelly.group** [V, site scan 2026-10-09]. Reapit, Alto, Arthur, Goodlord, Xero and Aircall were not found in any public source [U].
- Internal tools: Slack, Google Workspace, Notion (integration playbooks), Greenhouse ATS. HubSpot/Mailchimp-type tools are used for marketing [V].

### 2.4 Tenant maintenance intake: what Dwelly's own production code shows [V]
Source: the public JS bundle of https://tenant.dwelly.group (fetched 2026-10-09).
- **Streaming LLM intake** (SSE events: `questions_ready`, `chunk`, `retry`, `error`, `done`). Each issue object has these fields:
  `category, subcategory, severity (emergency|urgent|routine), severity_reason, intake_confidence, key_assumptions, self_resolvable, self_resolve_steps, self_resolve_caveat, containment_steps, containment_caveat, tenant_responsibility, tenant_responsibility_reason, clarifying_questions, photos_applicable, photos_required, photos_guidance, summary`.
- One message can contain **multiple issues**, and the highest severity wins.
- Guardrail blocks use reason_codes `off_topic` (redirect to General Request form) and `status_enquiry` (redirect to status). The general request form covers "Questions, parking, neighbours, anything else not a repair".
- **Regex emergency fast path, checked before the LLM:** gas_leak, carbon_monoxide, fire, electrical_fire, structural_collapse, major_flooding. Each shows safety actions and phone numbers: 999; National Gas Emergency 0800 111 999; power 105; water 0800 316 9800 (Thames Water). It then auto-logs with the office. On failure it shows: "We couldn't auto-log this with our office — please call the office once you're safe."
- **Tenant-responsibility rules tied to tenancy clauses:**
  - Lockout (lost key): collect a master key from the office during hours with a deposit, otherwise a locksmith at the tenant's cost. A broken lock or entry system stays the landlord's responsibility.
  - 12.18: bulbs and tubes.
  - 12.8/12.9: smoke, CO and burglar alarm batteries.
  - 12.6: glass broken by the tenant.
  - 12.2: condensation or mould from poor ventilation. Structural damp is the landlord's responsibility.
  - 12.4: garden maintenance only. Fences, gates, sheds and so on are the landlord's.
  - 12.5: window cleaning only. Failed double glazing is the landlord's.
  - 12.11: drains blocked by misuse. Structural drains are the landlord's.
  - 12.17: avoidable or non-emergency out-of-hours call-outs.
- Access question: "Are there any access considerations... entry codes or alarms and security systems that would need to be disarmed?"
- **Job lifecycle stages** (tenant label / landlord label):
  - init, initcall, initchat, start, mp_time, mp_time_force: "We are arranging a visit" / "Job assigned"
  - visit, work: "Visit Arranged"
  - result: "Agency checks quote/proof of work"
  - certificate: "Agency checks quote"
  - double_quotation: "Requested Second Quote"
  - quote_approved: "Quote Approved"
  - documents: "Agency checks work results"
  - confirmation, completed: "Job completed"
  - cancelled: "Job cancelled"

  `mp` probably means "maintenance provider" [U]. The initcall and initchat stages imply that jobs start from a phone call or a chat.
- Payments UI: "Postpone Next Payment", "Move Payment Date" and "Change Bank Account" (GoCardless). Rule: the payment can't be amended if it is due within 10 days.
- Landlord portal sections: Maintenance Requests, Compliance, Statements, Management Fees.

---

## 3. AI agents, evals and what Dwelly says is hard
- Applied AI Engineer ad (updated 2026-09-09): https://job-boards.eu.greenhouse.io/dwelly/jobs/4954106101 [V]
  - "We already have successful AI-driven flows running in Tenant Find and Property Management... built quickly and as separate systems."
  - The next goal is "reusable agentic infrastructure... memory, context management, tool-calling, orchestration, and feedback loops" and "a robust **evaluation and observability layer**... testing, tracing, debugging, and evaluating AI systems as fundamental... as unit testing". Also to "confidently assess an agentic workflow before deploying it into production".
  - "Design systems where specialized agents, tools, deterministic software, and humans work together... when a problem should be solved with an LLM, when traditional software is the better solution".
  - Lists real-world challenges as "reliability, latency, context management, failure modes, evaluation, and observability". Coding agents and subagents are used internally.
- 2026-09-03 blog, on **escalation analytics**: "For every escalation, we can examine the information the agent lacked, the tool or policy that blocked it, the judgment the case required, the time spent by the person, and whether the task continued successfully afterward. Repeated, low-judgment escalations point to capabilities we can add. High-stakes and relationship-sensitive escalations help us define where people should remain involved." [V]
- Eval metrics they publish: human minutes per task, escalation frequency, accuracy, reopenings, speed and customer outcomes, all measured "through complete operating workflows" [V].
- Hackathon blog: "information arrives in pieces, and old records might disagree. An agent has to recognize what happened and decide how to proceed." [V]
- Platform page: "AI intervenes only when necessary (e.g., repair cost disputes)" and "AI-powered automation with human control" [V].
- Series B blog: AI "cannot replace the trust that comes from inspecting a property, understanding its value as an investment, or helping a landlord make a judgment call" [V].
- Ops Team Lead ad: "escalating to the Operations Manager only what genuinely needs senior judgement" [V].
- No named Head of AI was found publicly. The CTO (Khanukov) is the AI lead and hosts the hackathon [V/U].
- Talk: "How Dwelly is building AI that runs a real-world service business" by Drozdov and Lifshits at FBC Clerkenwell. It was in Russian, hosted with Perfect Strangers, and covered "end-to-end AI workflow capabilities and automation limitations". https://luma.com/adxvw49i [V]. Date not captured [U].

---

## 4. Previous hackathons, datasets and GitHub
- This is **Dwelly's first hackathon** per its own blog (2026-09-11) [V]. No earlier Dwelly challenges were found.
- No official Dwelly GitHub org was confirmed. GitHub has a user "dwelly" and orgs like DwellyOrg and Dwelly-Homes, but none are linked from dwelly.group. The GitHub API was rate-limited during this check [U]. Khanukov's site links a personal "Formalisation notes · GitHub" (P vs NP / LLM reasoning experiments) [V].
- No public datasets from Dwelly were found.

---

## 5. The hackathon
- **The official name on Luma and the blog is "London AI Hackathon: AI Transformation of Services"**: https://luma.com/ja5x0m76 and https://www.dwelly.group/blog/london-ai-hackathon (2026-09-11) [V]. The name "Real-World Agents Hackathon" was not found publicly [U].
- Date: Sat 10 Oct 2026, 09:00–19:00 London (08:00–18:00Z). Schedule:
  - 9:00 meet and greet
  - 9:30 onboarding
  - 10:00–17:00 building
  - 17:00–19:00 demos, judging and winners

  The exact venue is shown only after registration. It is invite only, with **20 teams** of 2–5 people [V].
- Hosts on Luma: Dwelly Group, **Sagar Gupta ("Startups at Anthropic")**, Sarah Martin (no bio), **EQT Partners** (EQT Ventures page) and **Dmitry Khanukov** [V]. Partners: Anthropic, ElevenLabs, General Catalyst and EQT. **No judges are named publicly** [U].
- Format (Luma text) [V]:
  - Teams get a "synthetic operating environment... calls, emails, documents, CRM records, and more" and 4.5 h to build an agent "that can process it autonomously".
  - The test data includes "calls, emails, documents, CRM records, **maintenance tickets, and compliance cases**".
  - "Each team picks a track, takes a case **from first contact to a verified outcome**."
  - 30 min before the deadline come "new escalation cases you've never seen: conflicting information, failed actions, missing context. There's no time to review manually, your agent has to handle this Reality Test alone."
  - At the deadline teams submit results and code, then have 30 min to record a **60-second demo video**.
- **Judging weights** (most of the score comes from the unseen Reality Test) [V]:
  - 35% Correct outcomes
  - 20% Coverage (how many final cases completed)
  - 20% Judgement & safety (ambiguity, conflicting info, escalation)
  - 15% Engineering quality ("genuinely autonomous, robust, and reproducible")
  - 10% Real-world applicability
- Awards [V]:
  - Grand Prize (Best Real-World AI Agent): £5,000
  - Best Exception Handling: £1,500
  - Best Voice Agent: £1,500, plus ElevenLabs Scale tier
  - Best Engineering: £1,500
  - People's Choice: £500
  - Every winner also gets 3 months of ElevenLabs Pro and Claude credits. All participants get 1 month of ElevenLabs Creator.
  - "The strongest teams may go on to a real pilot with Dwelly."
- The user's brief says Claude-based judging agents will grade against required outcomes, acceptable alternatives, red flags, prohibited actions and critical failures, and that cases may feed Dwelly's "operational AI benchmarking work". **I could not find either of these in public sources.** They probably come from participant communications [U].

---

## 6. Implications for case design (inference, [U])
Likely Property Management Reality Test patterns, based on the evidence above:
1. **Emergency vs routine triage** with a misleading description. For example, "smell" plus "boiler" means gas: safety advice first, then the 0800 111 999 line, then logging. Or a CO alarm "beeping", which could be a low battery (tenant responsibility, clause 12.8/9) or a real CO alarm (emergency). Expect wrong severity calls to be critical failures.
2. **Tenant vs landlord responsibility** traps: a lockout vs a broken lock, mould from ventilation vs a leak, garden upkeep vs a broken fence, a bulb vs an electrical fault.
3. **Landlord approval thresholds and preferences** buried in CRM notes or old emails. Examples: "call before repairs over £X", a preferred contractor, a name preference (Ben, not Benjamin). The likely prohibited action is booking works above the threshold without approval.
4. **Failed actions**: a contractor no-shows or is unavailable (mp_time_force), a quote is too high (double_quotation), or the log/API write fails. The agent must retry or reroute and tell all parties.
5. **Conflicting records**: legacy Fixflo or old-CRM data vs the Dwelly record. Examples: a tenant who has moved out, a wrong phone number, an expired gas certificate vs a "renewed" note.
6. **Compliance**: an expired or near-expiry Gas Safety, EICR or EPC; Renters' Rights Act notice periods (2 months for tenants); deposit disputes going to TDS; Awaab's-law-style damp and mould urgency. The last one is [U], so check uk-lettings-rules.md.
7. **Payments**: an unmatched payment, partial rent or arrears; a request to move the payment date within 10 days of collection; a bank-detail change, which could be fraud or social engineering and should be escalated rather than actioned.
8. **Scope guards**: off-topic or status enquiries should be routed, not answered as repairs. Don't promise outcomes, costs or legal advice.
9. Escalate with a **concise decision packet**: what is known, what is missing, the options, the recommendation. This mirrors Dwelly's "enough context for a person to decide quickly".
