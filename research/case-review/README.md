# Maintenance case review (10 Oct 2026)

A read of all 50 public Property Management cases (1,505 events) to find where time, human effort and errors go, and what to build first.

- `report.html`: the findings, the ranked recommendations and the return model. Published copy: https://claude.ai/artifact/NxJ2mc1pmjHHstLhrZWMCH (private, share from the page).
- `case-analysis.json`: per-case analysis (human touches and whether an agent could take them, delay drivers, errors, money, best intervention) plus cross-case patterns. Written by five analyst agents working from one template, so it contains estimates.
- `timing.py`, `reply_latency.py`: the scripted numbers (days open, silent gaps, reply times, system prompts). Run with `python3 -I research/case-review/timing.py "HackatonPublicCases/Property Management" /tmp/out.json`.

Headline findings: 73% of case lifetime is silent gaps of 3+ days. 79% of 353 human touches are mechanical. 11 of 50 cases sent the wrong property, address or document.

Top recommendation: give every case a next-move owner with a chase clock, a pre-send guard, and decision cards in place of escalations.
