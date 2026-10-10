# Operational dashboards, work queues and case views (exception-based design, alert fatigue)

Research date: 10 Oct 2026. Most sources are secondary summaries. The primary texts (Few's book, ISA-101/18.2, EEMUA 191, Endsley's book) are paywalled and I did not read them directly. Where the figures depend on these summaries, I say so.

## Q1. Dashboard and information-design canon (Few, Tufte, ISA-101 HMI, Endsley SA): specific rules

### Takeaway
The canon agrees on one point. A monitoring view should be quiet by default, and attention-grabbing encodings (saturated colour, motion, position at the top left) should be reserved for abnormal states. It should fit on one screen, give context for every number, and follow a hierarchy that runs from overview to detail.

### Cited Findings
- Few defines a dashboard as a single-screen display for repeated monitoring that shows key information at a glance. He separates it from reports, exploratory tools, portals and scorecards. — [UXmatters review of Information Dashboard Design (2007)](https://uxmatters.com/mt/archives/2007/04/book-review-information-dashboard-design.php)
- Few's common dashboard errors are going beyond one screen, giving too little context for the data, showing too much detail or precision, choosing a weak measure, clutter, and misusing colour. — [UXmatters review](https://uxmatters.com/mt/archives/2007/04/book-review-information-dashboard-design.php)
- Few's layout rule is to make the starting point obvious, with the most important information at the top left and the least important at the bottom right. He advises against pie charts, dials and gauges and recommends sparklines and bullet graphs instead. Second edition published 2013. — [Speckyboy summary](https://speckyboy.com/designing-information-dashboards/); [UXmatters](https://uxmatters.com/mt/archives/2007/04/book-review-information-dashboard-design.php)
- Pre-attentive attributes (Few, relying on iconic memory) fall into two groups. For quantity: length, width, colour intensity and size. For quality or category: hue, shape, orientation, position, curvature and enclosure. — [WellSky engineering blog](https://engineering.wellsky.com/post/how-to-use-pre-attentive-attributes-to-communicate-data-visually)
- Few (blog, 7 Aug 2006) says monitoring dashboards must support "situation awareness" across three levels: perceive, comprehend and project. He points to Endsley, Bolte and Jones, *Designing for Situation Awareness* (2003), which distils research into "50 principles", and says nothing in it conflicts with his dashboard principles. — [Perceptual Edge blog](https://www.perceptualedge.com/blog/?p=45)
- Endsley's SA levels are: L1 perception of the status and dynamics of relevant elements, L2 comprehension of what they mean, and L3 projection of future states. Each level depends on the ones below it. — [NZ CAA situational awareness guidance](https://www.aviation.govt.nz/assets/safety/human-factors/situational-awareness-guidance.pdf); [NASA NTRS](https://ntrs.nasa.gov/api/citations/20020030334/downloads/20020030334.pdf)
- ISA-101 (HMI standard, published 2015) uses a neutral, often grey base and keeps foreground colours to a minimum, using them sparingly for abnormal situations. A widely used demo states the rule as "a gray screen signifies a healthy process", with colour, motion and blinking reserved for abnormal situations. — [Control Engineering](https://www.controleng.com/high-performance-hmis-designs-to-improve-operator-effectiveness/); [ProcessOnline](https://processonline.com.au/content/process-control-systems/sponsored/best-design-practices-creating-a-high-performance-hmi-1374659233); [GoJS HMI sample](https://gojs.net/latest/samples/hmiOperatorScreen)
- Caveat from practitioners: "grey-scale is mandatory" is a misconception. The real goal is enough contrast plus colour that adds meaning. The suggested test for any colour is "Does this color help call attention to the abnormal situation?" — [Control Engineering](https://www.controleng.com/high-performance-hmis-designs-to-improve-operator-effectiveness/)
- ISA-101 display hierarchy has four levels. L1 is the plant-wide overview, L2 the unit control display, L3 equipment detail, and L4 diagnostics. — [Control Engineering](https://www.controleng.com/high-performance-hmis-designs-to-improve-operator-effectiveness/)
- Tufte (*Beautiful Evidence*, 2006, pp. 46-63) defines sparklines as "data-intense, design-simple, word-sized graphics" that can go anywhere a word or number can, including a table cell or a headline. — [Wikipedia: Sparkline](https://en.wikipedia.org/wiki/Sparkline); [Tufte, Sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)

### Inferences
- For the agent console, the case list should be visually neutral when the agent is handling things normally. Colour (red or amber) should be used only for states that need a human: overdue, escalated, an agent error, or a decision pending. If every status chip is coloured, colour stops signalling anything.
- Mapping to the ISA-101 hierarchy: L1 is counts per state ("3 need you, 41 agent-handling, 2 stuck"), L2 is the queue or list, L3 is the case page, and L4 is the raw log or tool calls.
- Mapping to Endsley: L1 = what state the case is in, L2 = why it matters (a one-line reason a human is needed), L3 = what happens next and when (the next agent step, the deadline or SLA countdown). Most consoles show only L1, so the next-step and deadline fields are worth adding.
- Per Few, show context with every number (for example "2 overdue (vs 0 yesterday)") and avoid gauges and pies.

### Gaps
- I did not read Endsley's 50 SA principles directly. The ISA-101 colour specifics come from vendor or practitioner summaries, not the standard's own text.

## Q2. Alarm and alert fatigue evidence (ISA-18.2/EEMUA 191, EHR alerts, SRE paging): prioritising, grouping, rate-limiting, and when something needs a human

### Takeaway
Across industries, the evidence says that when most alerts need no action, people stop responding to all of them. Repeats and unactionable alerts drive this effect more than raw workload does. The standard remedies are: page only when an action is needed, deduplicate and group, tier alerts (page vs ticket vs log), tailor them by role, and cap the rate at roughly one item per operator per ten minutes.

### Cited Findings
- ISA-18.2/EEMUA 191 benchmarks (from secondary sources): steady-state target is at most about 1 alarm per operator per 10 minutes. A "flood" starts when more than 10 new alarms arrive in 10 minutes and ends when a 10-minute period has fewer than 5. Under 1% of 10-minute periods should be floods, and over 5% means action is needed. Emerson's table gives 1-2 per 10 minutes as the target and more than 3 as the action limit. — [Emerson "Alarm management by numbers"](https://d1-live.emerson.com/documents/automation/article-alarm-management-by-numbers-deltav-en-38292.pdf); [Chemical Engineering](https://www.chemengonline.com/alarm-management-numbers/); [IChemE practical guide (2021)](https://www.icheme.org/media/16019/icheme-alarm-management-practical-guide-06_05_2021.pdf)
- Standing (stale) alarms: the summaries give ISA-18.2 at fewer than 5 per console and EEMUA 191 at fewer than 10. Sources differ, so treat these as approximate. — [Chemical Engineering](https://www.chemengonline.com/alarm-management-numbers/)
- One practitioner summary says operators stop reading alarms above about 12 per hour. This is a secondary claim. — [epcland alarm management guide](https://epcland.com/alarm-management-oil-gas-guide/)
- EHR (2025 preprint, 44 studies): the pooled drug-drug interaction alert override rate was 79.8% (95% CI 73.0-86.7%), with a range of 55.4-95.7%. Only 12% of the studies assessed clinical outcomes. — [JMIR preprint 88578](https://preprints.jmir.org/preprint/88578)
- EHR (Li et al., JMIR Med Inform 2020, 23 articles): average override rates ranged from 46.2% to 96.2%. — [JMIR Med Inform 2020;8(7):e15653](https://medinform.jmir.org/2020/7/e15653/PDF)
- Ancker et al. 2017 (BMC Med Inform Decis Mak 17:36; 112 clinicians, 2010-2013): the likelihood of accepting a reminder fell by 30% for each additional reminder per encounter, and by 10% for each 5-point rise in the share of repeated reminders. Acceptance was linked to work complexity and repeats, not to the amount of work. A quarter of drug alerts and a third of reminders were repeats for the same patient. The authors recommend cutting within-patient repeats. — [AHRQ PSNet summary](https://psnet.ahrq.gov/issue/effects-workload-work-complexity-and-repeated-alerts-alert-fatigue-clinical-decision-support); [BMC PDF](https://bmcmedinformdecismak.biomedcentral.com/track/pdf/10.1186/s12911-017-0430-8)
- Role tailoring, meaning different alerts for prescribers and pharmacists, was the most successful way to reduce alert fatigue (Hussain et al., JAMIA 2019, as summarised). — [JMIR Med Inform 2020 review context](https://medinform.jmir.org/2020/7/e15653/PDF) (secondary; not verified in the original)
- Google SRE book, ch. 6: "Every page should be actionable." Alert on symptoms ("what's broken") rather than causes ("why"). Humans can respond urgently only a few times a day before fatigue sets in. Use three tiers: pages for immediate action, tickets for later action, and logs that need no action. — [Rabenstein SRECon16 slides summarising the SRE book](https://www.usenix.net/sites/default/files/conference/protected-files/srecon16europe_slides_rabenstein.pdf); [O'Reilly excerpt "Monitoring distributed systems"](https://www.oreilly.com/radar/monitoring-distributed-systems)
- PagerDuty groups alerts into incidents with ML and rule-based grouping (by content, time and other criteria) and offers a preview before enabling it. Its marketing claims "up to 98%" noise reduction. A customer quote reports 58% on average and about 86% on some services. — [PagerDuty Event Intelligence](https://www.pagerduty.com/platform/aiops/event-intelligence/); [PagerDuty Noise Reduction docs](https://support.pagerduty.com/main/docs/noise-reduction)

### Inferences
- "Needs a human" should mean the agent cannot or must not act and a person must decide or act. It should not mean "something happened". Everything else becomes a ticket (visible in the overview, no badge) or a log entry (only on the case timeline). That gives a three-tier model: needs-you, watch, and log.
- Deduplicate per case. A case with five agent events should appear once in the inbox, with its reason updated, not five times. Ancker's finding suggests repeats in particular erode response.
- Rate check: if the console routinely has more than about 10 new needs-you items per hour per person, the escalation threshold is probably too loose. That figure comes from the ISA benchmark scaled to an hour; it is my extrapolation, not a validated number for office work.
- Symptom-first: label an escalation by its user or tenant-visible consequence ("tenant still has no heating, 26h") rather than by internal cause ("tool call failed").
- Treat any escalation reason that operators repeatedly dismiss as a tuning target. This is the alarm-rationalisation loop from ISA-18.2.

### Gaps
- I found no primary ISA-18.2 or EEMUA text. I found no studies on alert fatigue in office or back-office case work, or on AI-agent oversight specifically.

## Q3. Queue/inbox UX in real products (Linear, Zendesk, Front, GitHub, PagerDuty/incident.io): ordering, status, keyboard triage, who has the ball

### Takeaway
Mature queues share five traits. They have a small set of explicit triage verbs, each with a single key. Snooze makes an item disappear until a time and resurfaces it automatically, and new activity cancels the snooze. They sort by time-to-breach rather than by creation time. Each item carries an explicit reason ("why is this in my inbox"). Ownership and state (open, waiting, snoozed, resolved) are shared across the team.

### Cited Findings
- Linear Triage collects issues from integrations and people outside the team before they enter the team's workflow. The keys are 1 to accept, 2 to mark as duplicate, 3 to decline and H to snooze, and Cmd/Ctrl-K opens the command menu. — [Linear docs: Triage](https://linear.app/docs/triage)
- Linear Snooze hides an item until a set time, when it reappears as a new unread notification. New activity before that time brings it back early and cancels the snooze. Presets include an hour, tomorrow, next week and next cycle, and a custom date can be typed in natural language. — [Linear docs: Snooze](https://linear.app/docs/snooze)
- Linear Inbox shortcuts: G then I opens the inbox, H snoozes, U toggles read or unread, and Backspace deletes (this cannot be undone). — [Linear docs: Inbox](https://linear.app/docs/inbox)
- GitHub notifications show a reason label for each item (mention, review requested, assigned, subscribed, and so on) that can be filtered (`reason:review-requested`). The triage verbs are Done (leaves the inbox but stays retrievable with `is:done`), Save (kept indefinitely), Unsubscribe, and mark read or unread. — [GitHub Docs: About notifications](https://docs.github.com/en/subscriptions-and-notifications/concepts/about-notifications)
- Zendesk views can be sorted ascending by an SLA column so items nearest breach come first. Once a ticket breaches, its countdown disappears, so breached tickets can be hard to surface. Guides recommend separate "approaching breach (next 2-4h)" and "breached" views. Zendesk staff describe the SLA badge as helping agents prioritise in real time. — [eesel guide (third-party)](https://www.eesel.ai/blog/zendesk-sla-view-column-sort-by-breach); [Zendesk community](https://support.zendesk.com/hc/fr/community/posts/4659864993946-Please-include-SLA-in-View-Conditions)
- In a Front shared inbox, archiving, snoozing or other status changes made from the shared inbox or by the assignee affect everyone viewing it, moving the item to the Open/Snoozed/Waiting/Resolved tabs. Followers keep their own copy. — [Front help: change conversation status](https://help.front.com/en/articles/2134)
- Front offers collision detection, which warns when someone else is viewing or replying. This is a secondary source only. — [parse.gl aggregator](https://www.parse.gl/prompts/p/how-can-my-team-collaborate-on-customer-emails-and-avoid-sending-duplicate-replies-from-a-shared-info-address--4d6bc719-0e83-4459-9bdb-43d460fb94cb)

### Inferences
- Order the needs-you queue by time-to-deadline ascending, and pin breached items above it in their own group, so the countdown-disappears problem from Zendesk cannot occur. Break ties by severity, then by age.
- Each row should carry a one-line reason, as GitHub does ("Agent needs approval: quote €640 exceeds €500 limit"), plus a "ball with" field: agent, agency staff, tenant, owner or contractor. Front's Open/Waiting/Snoozed states map directly onto this. "Waiting on tenant" is not "needs you".
- Use a small set of verbs with single-key shortcuts (approve, edit/override, take over, snooze until, dismiss/done) and route everything else through a command palette. Snooze should wake on new case activity, as Linear's does.
- Done should be reversible and findable (GitHub `is:done`). Avoid irreversible deletes in triage.

### Gaps
- I did not fetch the docs for Superhuman, Intercom or the PagerDuty/incident.io incident page. These products' ordering heuristics beyond those described above are unverified.

## Q4. Case history and timeline patterns (incident timelines, CRM activity feeds, audit logs): grouping, narrative vs log, bot vs human actor

### Takeaway
Leading tools keep two layers. The first is a short curated narrative timeline of key moments: state changes, decisions, and the messages that mattered. The second is a full, filterable activity or audit log underneath, with items promotable from the log to the narrative. Upcoming and overdue items are separated from history, and the actor type (human, bot, AI agent) is a first-class field.

### Cited Findings
- incident.io (2024 changelog) narrowed the default timeline to incident updates (severity or status changes) and pinned messages, so that it "reads like a story rather than a log of events". — [incident.io changelog](https://incident.io/changelog/tell-the-full-story-with-your-incident-timeline)
- incident.io's API docs describe the timeline as "the curated narrative ... the handful of moments that explain what happened", as distinct from the activity log, "which records everything that did". Promoted items keep a link back to their activity-log entry. Auto-detected events include role changes, summary updates, actions, PRs and commits, Sentry errors and images. — [incident.io API docs: timeline items](https://docs.incident.io/api-reference/incident-timeline-items-v2.md); [docs: timeline](https://docs.incident.io/post-incident/timeline)
- incident.io pinned items are stamped with the time the event actually occurred, which can be edited, rather than when it was recorded. Custom events can capture things that happened outside the channel. — [incident.io docs](https://docs.incident.io/post-incident/timeline); [custom timeline events changelog](https://incident.io/changelog/custom-timeline-events)
- The Salesforce Lightning activity timeline splits into "Upcoming & Overdue" at the top, then past months as collapsible groups. — [Trailhead: manage tasks, events and email](https://trailhead.salesforce.com/content/learn/modules/lightning-experience-productivity/manage-your-tasks-events-and-email)
- GitHub audit log events carry `actor_is_bot` and, in newer versions (GHES 3.19/3.20), a separate `actor_is_agent` field, alongside `programmatic_access_type`. So humans, bots and AI agents are distinguished at the data level. — [GitHub Enterprise Server 3.20 audit log events](https://docs.github.com/en/enterprise-server@3.20/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization)

### Inferences
- Case page layout:
  1. A header showing the current state, who has the ball, and the next step with its due time (Endsley L1-L3).
  2. "Upcoming & overdue" (scheduled follow-ups, deadlines).
  3. A narrative timeline limited to state changes, human decisions, outbound and inbound messages, and escalations.
  4. A collapsed "all agent activity" log (tool calls, retries) with filters.
- Collapse runs of similar agent events ("Agent made 6 lookups, 2 min"), as PagerDuty does when grouping alerts into incidents. Expand on demand.
- Make the actor explicit on every entry (human staff / AI agent / system / external party) with distinct icons or labels. GitHub separating `actor_is_agent` from `actor_is_bot` is a useful precedent.
- Timestamp events by when they occurred (for example, a call time), not by when they were ingested.

### Gaps
- I did not read HubSpot or Stripe activity and audit-log docs directly. I found no empirical studies comparing narrative and log timelines.

## Q5. Progressive disclosure and "overview first, zoom and filter, details on demand" in practice

### Takeaway
Show the overview and the primary actions by default, and defer secondary detail to a deeper level. The hard design decision is choosing what goes in the first layer. The mantra is widely cited but has little empirical validation, so treat it as a heuristic.

### Cited Findings
- Shneiderman (IEEE Symposium on Visual Languages, 1996), "The Eyes Have It": "Overview first, zoom and filter, then details-on-demand", offered as a starting point, along with a taxonomy of 7 data types × 7 tasks. — [Shneiderman 1996 PDF](https://webspace.science.uu.nl/~telea001/uploads/VACourse/Shneiderman96.pdf); [UMD DRUM record](https://drum.lib.umd.edu/items/155a868e-fb83-4115-9899-9187ea8c0498/full)
- Craft and Cairns found the mantra is cited often but lacks empirical validation. — [Craft & Cairns PDF](https://www-users.york.ac.uk/~pc530/pubs/craft_cairns.pdf)
- NN/g defines progressive disclosure as deferring advanced or rarely used features to a secondary screen, which makes applications easier to learn and less error-prone. The key is getting the split between initial and secondary features right. — [NN/g: Progressive Disclosure](https://nngroup.com/articles/progressive-disclosure/)

### Inferences
- Applying this to the console: overview (state counts and the needs-you queue) → filter (by state, property, deadline, ball-holder) → case page (narrative) → details on demand (raw agent log, transcript, tool I/O).
- Only the information needed to make the decision belongs in the first layer of a needs-you row: the reason, the deadline, the proposed agent action, and the approve/override controls. Evidence and history belong one click away.

### Gaps
- I found no NN/g dashboard-specific article with quantified findings within the search budget.
