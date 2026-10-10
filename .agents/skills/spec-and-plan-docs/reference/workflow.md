# Workflow: architecture-first, then frontend→backend

## Principle

Always **align on the overarching architecture first**, then define specs in **frontend→backend** order. The top-level contract (README) is the single place that describes how the page, components, hooks, tRPC, services, repositories, and (if needed) DB schema fit together. Sub-specs then detail each piece without redefining the big picture.

## Step 1: Overarching architecture (README)

- **Goal**: Agree on the top-level contract before writing any sub-spec. The README in **plans/** should outline:
  - The **top parent** (e.g. the page component) and what it renders (which UI components, in what order).
  - That the page (or equivalent) **calls a hook** (or hooks) for data and actions.
  - That those hooks **call tRPC** procedures (queries/mutations) that live in the backend.
  - That the backend exposes **routers** that use **services**, which use **repositories**, and that **database schemas** may need to be created or updated.
- **Interaction**: During this phase, **stay interactive**. Ask clarifying questions (e.g. which sections are on the page, which data comes from which procedure, whether a new table is needed). Refine the README until the user is satisfied with the high-level contract. Do not move on to detailed sub-specs until this is stable.
- **Output**: A README that lists the moving parts and **links** to the spec files for each (page, components, hooks, and—when plans for backend live in the same repo/workspace—routers, services, repositories, schema). The README does not duplicate the content of those files.

## Step 2: Define specs in frontend→backend order

After the architecture is fixed, write or extend specs in this order. Each layer defines the **contract** that the next layer will implement or consume.

1. **UI component specs** — For every UI component (or section) that the page will render. Define props, layout, behavior, and edge cases. No backend or hook details yet; only what the component receives and how it behaves.
2. **Page spec** — The page that renders those components in order and passes data/handlers. Define what data and callbacks it needs. That implicitly defines the **shape of the view model** (or equivalent) that the hook must return.
3. **Hook spec(s)** — The hook(s) the page calls. Define the returned view model (data + handlers) and, at a high level, that it fetches via tRPC or runs mutations. That defines the **tRPC procedures** (and their input/output shapes) the hook will call.
4. **tRPC router spec(s)** — Procedures (queries/mutations) that the hooks call. Define procedure names, input and output types, and semantics. That defines what **services** (and methods) the router will use.
5. **Service spec(s)** — Service methods called by the router. Define method signatures, business rules, and what they read/write. That defines what **repository** methods are needed.
6. **Repository spec(s)** — Repository methods (DB access). Define queries, updates, and transactions. That defines or refines the **database schema** (tables, columns, indexes).
7. **Schema changes** — New or modified tables/columns as implied by the repository layer.

**Rule**: Do not write a backend spec (router, service, repository) before the **consumer** of that layer is specified. For example: hook spec before router spec; router spec before service spec; service spec before repository spec. This keeps contracts driven by actual usage.

## Summary

- **First**: README = overarching architecture; stay interactive until the top-level contract is agreed.
- **Then**: Specs in strict order — UI components → page → hooks → tRPC routers → services → repositories → schema. Each step defines the contract for the next.
