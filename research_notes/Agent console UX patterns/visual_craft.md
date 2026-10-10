# Visual and interaction craft for a calm, data-dense ops console

Scope: concrete specs (type, spacing, tables, colour/status, writing, motion, accessibility) from respected design systems, for a server-rendered HTML+CSS ops console with light/dark mode, desktop-first with occasional phone use. All sources fetched 10 Oct 2026 unless noted; most system docs are living pages without a publication date.

## Typography for data UIs (sizes, line-heights, tabular numerals, families, headings, case)

### Takeaway
Product design systems converge on a 14px body / 20-21px line-height for app UI, 12px for secondary/caption text, 16px for "comfortable" body, and a small number of semibold/bold heading steps (16, 20, 24, 32). Data cells use 14px. Use one sans family (optionally a "display" cut for headings) plus a mono, sentence case everywhere, and tabular lining numerals for any column of figures.

### Cited Findings
- GitHub Primer type tokens (px at 16px root): Display 40/1.375/500; Title large 32/1.5/600; Title medium 20/1.625/600; Title small 16/1.5/600; Subtitle 20/1.625/400; Body large 16/1.5; Body medium 14/1.5; Body small 12/1.625; Caption 12/1.25/400; Code block 13/1.5/400; inline code 0.9285em — [Primer typography primitives](https://primer.style/product/primitives/typography/)
- Primer: tokens in rem for accessible zoom; unitless line-heights aligned to a 4px grid; use weight variables, not arbitrary 700; don't change heading tag order for visual effect; avoid colour as the primary means of emphasis; keep lines around 80 characters or less; text left-aligned, ragged right — [Primer typography foundations](https://primer.style/foundations/typography)
- Atlassian tokens: headings (all bold) 32/36, 28/32, 24/28, 20/24, 16/20, 14/20, 12/16; body large 16/24 (para spacing 16), body 14/20 (para spacing 12), body small 12/16 (para spacing 8); "metric" (big-number) tokens bold 28/32, 24/28, 16/20. App UI uses Atlassian Sans + Atlassian Mono; brand font kept for marketing only — [Atlassian typography](https://atlassian.design/foundations/typography)
- IBM Carbon data table type: table title 20px Regular 400 (`$heading-03`); column header 14px SemiBold 600 (`$heading-compact-01`); row text 14px Regular 400 (`$body-compact-01`) — [Carbon data table style](https://carbondesignsystem.com/components/data-table/style/)
- Vercel Geist separates single-line "label" styles (generous line-height to sit beside icons) from multi-line "copy" styles. Label 14 is "the most common" (menus); Label 16 for titles; Label 13 for secondary lines beside labels and "use the tabular variant for numbers"; Label 12 for tertiary text in busy views; Copy 14 is the most commonly used paragraph style; Copy 13 for secondary/space-constrained; mono variants at 12/13/14. Exact px/line-height values are not published on the page — [Geist typography](https://vercel.com/geist/typography)
- Linear (redesign, 28 Mar 2024): Inter Display for headings, regular Inter for everything else (one family, two optical cuts) — [Linear: How we redesigned the Linear UI, part II](https://linear.app/now/how-we-redesigned-the-linear-ui)
- GOV.UK type scale (large / small screens, size/line-height px): heading-xl 48/50 → 32/35; heading-l 36/40 → 27/30; heading-m & body-l 24/30 → 21/25; heading-s & body 19/25 (both); body-s 16/20 (both). Body is 19px — larger than product dashboards because GOV.UK serves the general public — [GOV.UK Design System type scale](https://design-system.service.gov.uk/styles/type-scale/)
- GOV.UK: "Always use sentence case, even in page titles and service names"; no block capitals for large amounts of text — [GOV.UK A to Z style guide](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/)
- GOV.UK tags switched (Dec 2023, Frontend v5.0.0) from uppercase bold to sentence case, regular weight and larger size because research found uppercase harder to read — [GOV.UK Tag](https://design-system.service.gov.uk/components/tag/)
- `font-variant-numeric: tabular-nums` gives all figures equal width so columns align and live counters/timers don't jitter; `proportional-nums` is better in prose; `lining-nums` suits tables/headings; `slashed-zero` disambiguates 0/O in IDs; Baseline widely available since Jan 2020; only works if the font has the OpenType feature — [MDN font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
- Line length: average 45–90 characters per line including spaces — [Butterick's Practical Typography, Line length](https://practicaltypography.com/line-length.html)

### Inferences
- Recommended console scale (rem at 16px root): 12/16 caption & meta; 13/18 secondary/mono IDs; 14/20 body and table cells (default); 16/24 comfortable body / summary prose; headings 14/20 semibold (section label), 16/24 semibold (card/panel title), 20/28 semibold (page title), 24/32 only for one hero number/title per page. Weights: 400 and 600 only (maybe 500 for labels). Five sizes total is enough; every product system above uses 14px as its workhorse.
- Use a single sans (system-ui stack or Inter) plus one mono for IDs, phone numbers, timestamps-in-logs. A serif+sans pairing is not used by any of the product systems reviewed for in-app UI (Atlassian reserves its expressive font for marketing); if a serif is wanted for voice, restrict it to the page title.
- Apply `font-variant-numeric: tabular-nums` globally on tables, timers, counters, durations and money; add `slashed-zero` on mono IDs.
- Labels vs values: put field labels at 12–13px in a secondary text colour (not uppercase), values at 14px primary colour — follows Geist label/copy split and GOV.UK's move away from uppercase.
- Constrain prose blocks (agent reasoning, transcripts, notes) to `max-width: 70ch` (inside both Primer's ~80 and Butterick's 45–90 ranges); tables may run full width.

### Gaps
- Stripe Dashboard and Linear do not publish numeric type scales; Geist page omits px values; Polaris typography page failed to load (socket error) so its scale is not cited here.
- Shopify Polaris/Primer explicit statements on sentence case for headings were not retrieved; sentence-case evidence here is from GOV.UK.

## Spacing, grids, density, whitespace vs borders

### Takeaway
Use a 4px base with an 8px rhythm (2/4/8/12/16/24/32/40/48/64). Group with proximity (tight inside a group, larger between groups) rather than boxes; reserve borders for where they add reading support (table rows, magnified reading). Offer density through row height, not by shrinking type.

### Cited Findings
- Carbon spacing tokens: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160px; built on multiples of 2/4/8; small steps for intra-component detail, large steps set page density; more surrounding space = more importance; "spacing can group related content and create sections without lines or other graphic dividers"; dense sections are fine but the overall page shouldn't feel crowded — [Carbon spacing](https://carbondesignsystem.com/elements/spacing/overview/)
- Primer line-heights are aligned to a 4px grid — [Primer typography](https://primer.style/foundations/typography)
- Atlassian paragraph spacing scales with body size: 16px after 16px body, 12px after 14px body, 8px after 12px body — [Atlassian typography](https://atlassian.design/foundations/typography)
- Linear 2024 redesign goal: "reduce visual noise, maintain visual alignment, and increase the hierarchy and density of navigation elements"; labels, icons and buttons aligned on both axes; blue "chrome" reduced for a neutral look — [Linear redesign part II (28 Mar 2024)](https://linear.app/now/how-we-redesigned-the-linear-ui)
- GOV.UK summary list: no-border variant exists, but "consider carefully" because borders help users read rows, especially people zooming or using magnification — [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/)
- GOV.UK summary cards: use only to show several lists describing the same type of thing or when actions apply to the whole list; "don't use cards for small amounts of information"; short unique title; max 2–3 short actions per card header — [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/)

### Inferences
- Spacing tokens: `--s1:4px --s2:8px --s3:12px --s4:16px --s5:24px --s6:32px --s7:48px`. Inside a key/value row 4–8px; between rows 8–12px; between sections 32–48px; page gutter 16px on phone, 24–32px desktop.
- Anti "card soup": one surface level for the page, sections separated by a heading + 32–48px space or a single 1px hairline, cards only for repeated same-type objects (e.g. one card per case/job), never cards inside cards.
- Density modes: compact = 32px rows, default = 40px rows, comfortable = 48px rows (Carbon sizes); keep type at 14px in all three.

### Gaps
- No primary source found with quantitative evidence (studies) against card-heavy layouts; the argument rests on design-system guidance (Carbon, GOV.UK) rather than research.
- Polaris density/spacing page not retrieved.

## Tables

### Takeaway
14px text, 600-weight headers, 40px default rows (32px compact, 48px comfortable), 16px cell padding, sticky header and a frozen human-readable first column on overflow, light rules or zebra plus hover to keep place, clear active-filter indication, and inline status as text+icon tags.

### Cited Findings
- Carbon row heights: xs 24, sm 32, md 40, lg 48, xl 64px; header row matches row size; column padding 16px; sort icon padding 8px; checkbox 20px with 16px side padding; chevron target 32px; pagination height matches row height; text vertically centred (xl offset 16px top); zebra uses `$layer-accent` — [Carbon data table style](https://carbondesignsystem.com/components/data-table/style/)
- NN/g (3 Apr 2022): borders, zebra striping and hover highlighting help users keep their place scanning across a row; freeze header rows (a subtle drop shadow helps orientation) and freeze the first column, which should be a human-readable record identifier; filters should be discoverable and show a clear visual indication when active — [NN/g Data Tables: Four Major User Tasks](https://www.nngroup.com/articles/data-tables/)
- GOV.UK tag guidance shows status columns in tables with one or more tags per row; tags must not be links or buttons — [GOV.UK Tag](https://design-system.service.gov.uk/components/tag/)
- GOV.UK: don't use summary lists for tabular data; use a table — [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/)
- Primer empty states: title explains the empty space's purpose; optional short description that doesn't repeat it; one primary action; for errors use the alert icon, serious tone, no obscure codes; border hidden by default unless sharing a page with other content — [Primer empty states](https://primer.style/product/ui-patterns/empty-states/)

### Inferences
- CSS spec: `th { font: 600 14px/20px; color: var(--fg-muted); text-align:left; position: sticky; top:0; background: var(--bg) }` with a 1px bottom border; `td { padding: 0 16px; height: 40px; border-bottom: 1px solid var(--border-subtle) }`; `tr:hover { background: var(--bg-hover) }`. Choose hairline rules OR zebra, not both.
- Right-align numeric columns and their headers, left-align text, use tabular-nums (standard typographic practice; not directly sourced in the pages fetched — see Gaps).
- Truncate long text with ellipsis + full value in `title`/expand; never truncate IDs or the primary identifier.
- On phone (<640px), collapse rows to stacked key/value blocks (summary-list style) instead of horizontal scroll, keeping the identifier and status on the first line.

### Gaps
- Polaris DataTable page failed twice (socket closed); its guidance on numeric alignment, totals row and truncation is not cited.
- No fetched source explicitly states "right-align numbers"; this is a widely held convention that should be verified (e.g. Polaris, Material) before quoting.
- Carbon's style page doesn't cover sticky headers or truncation.

## Colour and status

### Takeaway
Keep a neutral base, one accent, and a small fixed set of semantic roles (accent/info, success, warning, danger, neutral, plus optionally "done"). Each role needs fg, muted bg and border tokens per theme. Status must never be colour alone: pair colour with a text label and ideally an icon/shape; non-text contrast ≥3:1, text ≥4.5:1. Start with the fewest statuses; make "done" quiet and "needs action" stand out.

### Cited Findings
- Carbon status colours: red = danger/error; orange = serious warning; yellow = regular warning; green = normal/success; blue = passive info or workflow progress; gray = drafts / not yet started; purple = outliers/undefined — [Carbon status indicators](https://carbondesignsystem.com/patterns/status-indicator-pattern/)
- Carbon: indicators combine symbol, shape, colour and type; colour alone insufficient (page states at least three elements for WCAG in one place and at least two of colour/shape/symbol in another — conflicting within the same page); icon indicator sizes 20px icon with 16pt type, 16px icon with 14pt type; shape indicators 16px with 12–14pt label, label required, shape before label; don't reuse the same shape in different colours; outline light orange/yellow in light theme; ≥3:1 contrast between status colours and vs background; dot badges clear once acknowledged — [Carbon status indicators](https://carbondesignsystem.com/patterns/status-indicator-pattern/)
- GOV.UK tags: 9 colours (grey, green, teal, blue, purple, magenta, red, orange, yellow); adjectives not verbs; start with the smallest number of statuses, "The more you add, the harder it is for users to remember them"; one status can be enough (absence implies incomplete); keep the same colour for the same tag across pages; don't use colour alone (WCAG 1.4.1); red for "Urgent" — [GOV.UK Tag](https://design-system.service.gov.uk/components/tag/)
- GOV.UK task list statuses: "Completed" as plain black text, no background, "so tasks that still need action stand out"; "Incomplete"/"Not yet started" blue tag; "In progress" teal; "Cannot start yet" grey plain text, row not linked; "There is a problem" red tag; red backgrounds reserved for errors only — [GOV.UK Complete multiple tasks](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/)
- Primer semantic roles: accent (links, selection, focus, neutral info), success, attention (warnings and active processes like running tests/queued), danger, open, closed, done, sponsors; tokens split into `fgColor-{role}`, and bg/border in "muted" (subtle) and "emphasis" (strong, always with `fgColor-onEmphasis`); neutral scale inverted between light and dark so functional tokens are shared; high-contrast themes aim for ≥7:1 for most text — [Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/)
- Radix 12-step scale: 1–2 app/subtle backgrounds (incl. striped tables), 3–5 component bg normal/hover/pressed, 6–8 borders (subtle non-interactive / interactive / strong & focus), 9–10 solid bg and hover, 11 low-contrast text, 12 high-contrast text; steps 11 and 12 guaranteed APCA Lc 60 and Lc 90 on step 2 of the same scale; dark mode via a mutable `AppBg` alias (white in light, step 1–2 in dark) — [Radix Colors: understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- Linear (Mar 2024) reduced each theme from 98 variables to 3 inputs (base, accent, contrast) generated in LCH (perceptually uniform), enabling automatic high-contrast themes — [Linear redesign part II](https://linear.app/now/how-we-redesigned-the-linear-ui)
- WCAG 2.2 SC 1.4.11: visual info identifying controls/states and required graphics ≥3:1 vs adjacent colours; strict threshold (2.999:1 fails); focus indicators ≥3:1 vs adjacent colours; hover effects needn't meet 3:1 but mustn't reduce contrast — [W3C Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- WCAG 2.2 SC 2.5.8: pointer targets ≥24×24 CSS px, or spaced so a 24px circle centred on each doesn't intersect others — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

### Inferences
- Token set per theme (light and dark under `prefers-color-scheme` + `[data-theme]`): `--bg, --bg-subtle, --bg-hover, --border-subtle, --border, --fg, --fg-muted, --accent`, and for each of `info, success, warning, danger, neutral`: `--{role}-fg, --{role}-bg (muted), --{role}-border`. Map Radix-style: bg=step 3, border=step 6–7, fg=step 11.
- Ops status vocabulary (≤5): Needs you (warning/orange, the only loud one), Working (info/blue, with live indicator), Waiting on other party (neutral grey), Done (plain text, no tag — GOV.UK pattern), Failed / Problem (danger/red, reserved). Every tag = icon/shape + sentence-case adjective label.
- Avoid red/green as the only distinction (colour-blind safety): differentiate by icon shape (check, clock, alert triangle, x) as Carbon requires.
- Verify every fg-on-muted-bg pair at ≥4.5:1 in both themes; tag borders/dots ≥3:1 vs page.

### Gaps
- WCAG 1.4.3 thresholds (4.5:1 normal, 3:1 large = 18pt or 14pt bold) were not on the fetched page; they are well-established but cite the [1.4.3 Understanding page](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (not fetched) before quoting. SC 2.4.11 not retrieved.
- No source found specifying colour-blind-safe status palettes with numbers; Primer's colourblind themes exist but were not covered in the fetched content.

## Plain-language UI writing

### Takeaway
Sentence case; numerals; specific, short, adjective status labels; headings and banners that state the point; one notification at a time; empty states that say why it is empty and the one thing to do next.

### Cited Findings
- GOV.UK style: numerals for numbers including 2–9; commas over 999; % sign; dates "2 June" not "2nd June", no comma before year; ranges with "to" not dashes; times 12-hour "5:30pm", "midday", "midnight"; explain abbreviations on first use, no full stops; avoid negative contractions ("cannot", not "can't"); "and" not "&"; use "select" not "click" — [GOV.UK A to Z style guide](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/)
- GOV.UK notification banner: use sparingly (banners are often missed and more make it worse); one per page, combine or show only the highest-priority; place immediately before the h1, same width as content; not for validation errors; success variant only to confirm an expected outcome, removed on next page, with a text heading so meaning isn't colour-only; `role="region"` + `aria-labelledby`, success adds `role="alert"`; example copy "You have 7 days left to send your application." — [GOV.UK Notification banner](https://design-system.service.gov.uk/components/notification-banner/)
- GOV.UK summary list: missing value shows an action link in the value cell ("Enter contact details") rather than a blank; row action links carry visually hidden context ("Change name"); card actions usually two words, 2–3 max, confirm hard-to-undo actions — [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/)
- Primer empty states: plain, non-technical, specific ("avoid vague 'There was a problem'"); if the user can't fix it, say where to get help — [Primer empty states](https://primer.style/product/ui-patterns/empty-states/)

### Inferences
- Button labels: verb + object, ≤3 words ("Approve quote", "Call tenant", "Escalate"). Headings state the point ("2 cases need a decision") rather than naming the widget ("Dashboard").
- Empty states for an ops queue should be calm confirmation, e.g. "Nothing needs you right now" + when it was last checked.

### Gaps
- Mailchimp and Shopify voice guides were not fetched within the tool budget; GOV.UK tone-of-voice page (25-word sentence guidance, reading age) was redirected and not retrieved.

## Motion and live updates

### Takeaway
Live progress should be quiet: update text/state in place, use a small inline indicator for "working", skeletons only on first load and only for seconds, and provide a pause/stop for auto-updating feeds (WCAG 2.2.2 has no 5-second exception for auto-updating content). Respect `prefers-reduced-motion`.

### Cited Findings
- WCAG 2.2.2: moving/scrolling content that starts automatically, lasts >5s and sits alongside other content needs pause/stop/hide; auto-updating content needs pause/stop/hide or frequency control with "no five second exception for auto-updating"; when resuming real-time info, jump to current state; best practice is one control that pauses all updating elements — [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- Carbon loading: skeletons only for initial page load of containers/data components, for a few seconds; inline loading for a single component's action; switch from an indeterminate indicator to a progress indicator if longer than "a moment or two"; full-screen loading only when the app is disabled; notify if processing takes more than a few minutes; progressive loading for dashboards pulling from multiple sources; screen readers should be told when loading, busy, stuck or failed — [Carbon loading pattern](https://carbondesignsystem.com/patterns/loading-pattern/)
- Primer treats "attention" (yellow) as the colour for active processes like queued PRs or running tests — i.e. running state is a semantic colour, not an animation — [Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/)
- Vercel build logs show progress as the build runs, with warnings yellow and errors red — [Vercel logs docs](https://vercel.com/docs/deployments/logs)
- Third-party (non-Vercel) analysis describes Vercel status as green deployed / red failed / amber building / blue queued with an animated favicon while building — treat as unverified — [Blake Crosley Vercel design guide](https://blakecrosley.com/de/guides/design/vercel)

### Inferences
- Live indicator: 8px dot with a slow (≥1.5s) opacity pulse only on the item that is actively running; everything else static. Under `@media (prefers-reduced-motion: reduce)` drop the pulse and keep the static dot + "Working" label.
- Server-rendered page: poll/refresh only the changed region; announce state changes via a single `aria-live="polite"` region; never auto-scroll a log while the user has scrolled up; provide a "Pause live updates" control.
- Show elapsed time with tabular-nums ("Running · 1m 42s") rather than a spinner for anything >2s.

### Gaps
- No official Vercel, GitHub Actions or Linear write-up on live-progress motion or reduced motion was found; Linear sync and GitHub Actions run-page design rationale remain unsourced.
