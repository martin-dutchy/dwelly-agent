# Organization: plans/ directory and file naming

## Where plans/ lives

- Put **plans/** **next to the parent directory** that will contain the implementation.
- **Workspace-scoped**: the plans directory belongs to the **workspace** where the code will live, not to the "feature" in a product sense.

**Examples:**

- Feature in web app: implementation under `apps/web/src/features/settings/subscriptions/` (e.g. page, components, hooks under that tree).  
  → Plans live in **`apps/web/src/features/settings/subscriptions/plans/`**.

- Backend (tRPC procedures, services, repositories): implementation under `packages/backend/`.  
  → Plans for those routers, services, and repos live in **`packages/backend/plans/`** (or under a subpath like `packages/backend/plans/subscription/` if you group by domain), **not** under `apps/web/.../subscriptions/plans/`, because the code lives in the backend workspace.

So: **same workspace as the code that will be implemented.**

## Structure inside plans/

- **README** (or equivalent) at the root of **plans/** acts as the **entry point**: it outlines the overarching architecture (e.g. page, sections, hooks, tRPC, services, repos) and links to the specific spec/plan files. It is the orchestrator; it does not duplicate full content.
- **Mirror the implementation layout** so that navigating plans/ feels like navigating the future code:
  - **page/** — spec(s) for the page component.
  - **components/** — one directory per UI component (or per section that groups components). Each can contain:
    - `<shortname>-spec.md`
    - `<shortname>-test-plan.md`
    - Optional: `<shortname>-refactor-plan.md` or similar, if scoped to that component.
  - **hooks/** — one directory per hook (or one dir for a composed hook with sub-specs). Same file naming pattern.
  - **utils/**, **constants/** — only if the implementation will have dedicated utils/constants dirs and the specs warrant separate files; otherwise a single parent spec (e.g. component spec) can cover small local utils/constants.
- **Do not over-nest.** If a component is implemented as one component file plus a constants file and a small utils file in the same directory, one **plans/components/<component-name>/** with one **`<component-name>-spec.md`** is enough. Add subdirectories or extra files when the implementation has clear, separate concerns (e.g. multiple sub-components, multiple hooks).

## File naming convention

- **Directories**: **kebab-case**, descriptive of the artifact (e.g. `subscription-notification-banner`, `current-plan`, `use-subscription-page`).
- **Files**: **kebab-case** with a **shortname** (usually matching the directory) and a **suffix** by doc type:

| Doc type            | Pattern                              | Example                                         |
| ------------------- | ------------------------------------ | ----------------------------------------------- |
| Specification       | `<shortname>-spec.md`                | `subscription-notification-banner-spec.md`      |
| Test plan           | `<shortname>-test-plan.md`           | `subscription-notification-banner-test-plan.md` |
| Refactor plan       | `<shortname>-refactor-plan.md`       | `subscription-plan-options-refactor-plan.md`    |
| Implementation plan | `<shortname>-implementation-plan.md` | `subscriptions-page-implementation-plan.md`     |
| Feature-level plan  | `<topic-in-kebab-case>-plan.md`      | `stripe-subscriptions-implementation-guide.md`  |

Use these suffixes consistently so that file purpose is clear and globbing (e.g. `*-spec.md`, `*-test-plan.md`) works.

## Summary

- **plans/** next to implementation root; **workspace-scoped** (web feature → feature’s plans/; backend → backend’s plans/).
- **README** at root of plans/ as entry point; rest of **plans/** mirrors implementation (page/, components/, hooks/, utils/, constants/ as needed).
- **One directory per logical artifact**; one spec (and optionally test-plan or other plan) per directory when that’s enough; add nesting only when implementation structure justifies it.
- **File names**: kebab-case, `<shortname>-spec.md` | `-test-plan.md` | `-refactor-plan.md` | `-implementation-plan.md` (or `<topic>-plan.md` at feature level).
