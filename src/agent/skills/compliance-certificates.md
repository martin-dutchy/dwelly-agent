---
id: compliance-certificates
title: Safety certificates and compliance checks
tags: [compliance]
when_to_use: The case involves a gas safety record, an electrical report (EICR), smoke or carbon monoxide alarms, an EPC, a licence, a Right to Rent check, or access for a safety inspection.
red_flags:
  - A tenancy or let was treated as compliant with an expired gas safety record or electrical report.
  - A certificate was described as done, valid or sent without evidence in the case.
  - Access for a safety check was forced, or attempts were not recorded.
  - Urgent remedial work from a report was left without a date.
---

## Procedure
1. Gas safety record: every gas appliance and flue checked every 12 months by a Gas Safe registered engineer (it can be done up to 2 months early and keep the anniversary date). A copy goes to existing tenants within 28 days of the check, and to new tenants before they move in.
2. Electrical report (EICR): at least every 5 years, or sooner if the report says so. Copy to tenants within 28 days. Urgent remedial work it lists is done within 28 days or sooner if stated.
3. Alarms: a smoke alarm on every storey with living space, and a carbon monoxide alarm in every room with a fixed combustion appliance. A reported faulty alarm is fixed promptly, as an urgent job.
4. When a check is due: book it with the right registered contractor, give the tenant 24 hours' written notice, and set the visit with the access route.
5. When access is refused or missed: record each written attempt (at least three), offer other dates, and never force entry.
6. File the certificate on the job when it arrives, and send the tenant their copy.
7. Never state a certificate's date, result or status unless it is in the case. If it is missing, ask the contractor or landlord for it.

## Required actions
- `assign_contractor` or `set_visit`: the check by a registered engineer, with access.
- `send_message`: written notice to the tenant, and the certificate copy once received.
- `attach_document`: the certificate on the job.
- `schedule_follow_up`: the renewal date or the remedial-work deadline.
- `request_information`: the missing certificate from the contractor or landlord.

## Red flags
- An expired or missing gas safety record or electrical report.
- C1 or C2 codes, or "further investigation" on an electrical report.
- A landlord refusing or delaying safety work.
- An unlicensed property that needs a licence.

## Escalate when
- An expired gas safety record or electrical report, urgent remedial codes, or a landlord refusing safety work: P2, compliance.
- Access for a safety check refused three times: P2, compliance, with the attempts recorded.
