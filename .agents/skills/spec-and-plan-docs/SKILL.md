---
name: spec-and-plan-docs
description: Organizes and writes specification and plan documents (specs, test plans, implementation/refactor plans) that define contracts for components, hooks, pages, and backend. Use when creating or extending specs or plans; when completing or filling in missing specs, test plans, or remaining specifications for a feature; when defining what a component/hook/router/service will do; or when the user mentions plans directory, spec-driven workflow, or TDD spec step.
---

# Spec and Plan Documentation

This skill ensures specs and plans live in a **plans/** directory, mirror implementation structure, follow consistent naming, and are written in **architecture-first then frontend→backend** order.

## When to apply

- User is defining or extending specs, test plans, or implementation/refactor plans for a feature or component.
- User is completing, filling in, or adding missing specs, test plans, or remaining specifications (e.g. hook spec, page test plan, loading/error behavior) when some specs or plans already exist.
- User asks to "pick up where we left off," "continue defining specs," or "add the missing specs" for a feature.
- User mentions "plans directory," "spec for X," "architecture for this feature," or TDD spec step.
- User wants to align on overarching architecture before drilling into sub-components.

## Core rules (summary)

1. **Placement**: All spec and plan documents live in a **plans/** directory placed **next to the parent directory** that will contain the implementation. Placement is **workspace-scoped**: plans for code in `apps/web/src/features/settings/subscriptions/` live in that feature’s **plans/**; plans for code in `packages/backend/` live in **packages/backend/plans/** (not under the web feature).
2. **Structure**: Inside **plans/**, replicate the **final implementation structure** (e.g. **page/**, **components/** with one dir per component, **hooks/**, **utils/**, **constants/**). Use a **README** as the entry point that outlines the top-level architecture and links to sub-specs. Avoid unnecessary depth—one spec per component dir can cover component + local constants/utils when they are small.
3. **Naming**: Use **kebab-case** for directories and files. Files: **`<shortname>-spec.md`**, **`<shortname>-test-plan.md`**, **`<shortname>-refactor-plan.md`**, **`<shortname>-implementation-plan.md`** (or **`<topic>-plan.md`** at feature scope). Shortname usually matches the directory (e.g. `subscription-notification-banner-spec.md`).
4. **Workflow**: Always **align on overarching architecture first** (README: page, UI sections, hooks, tRPC, services, repos, DB). Stay **interactive**—ask questions until the top-level contract is clear. Then define specs in **frontend→backend** order: UI component specs → page spec → hook specs → tRPC router specs → service specs → repository specs → DB schema. Do not skip to backend specs before the consuming frontend contract is defined.
5. **Spec document structure**: Each spec file has a consistent internal structure (overview, role/contract, props/data, behavior, edge cases, links to sub-specs or test plan). See reference for the template.

## Quick workflow checklist

- [ ] Confirm **workspace** (web feature vs backend) and create or use **plans/** next to the implementation root.
- [ ] **README first**: Outline top-level architecture (page, components, hooks, tRPC, services, repos). Stay interactive until aligned.
- [ ] Define specs **frontend → backend**: UI components → page → hooks → routers → services → repositories → schema.
- [ ] Use **plans/** structure that mirrors implementation; name files with `<shortname>-spec.md` / `-test-plan.md` / `-*-plan.md`.
- [ ] For each spec file, follow the standard sections in [reference/spec-document-structure.md](reference/spec-document-structure.md).

## Additional resources

- **Implementation plans (acceptance + verification first; ExecPlan for long-running):** [docs/plans/README.md](../../../docs/plans/README.md). Specs define contracts; implementation plans steer execution and must include checks the agent can run. Interview the user until acceptance/verification are painfully specific.
- **Organization** (where plans live, directory layout, file naming, when to nest): [reference/organization.md](reference/organization.md)
- **Workflow** (architecture-first, frontend→backend order, interactive alignment): [reference/workflow.md](reference/workflow.md)
- **Spec file structure** (required sections and how to write each): [reference/spec-document-structure.md](reference/spec-document-structure.md)
