# Spec document structure

Each specification file (e.g. `*-spec.md`) should follow a consistent internal structure so that contracts are easy to find and compare. Adapt section depth and emphasis by artifact type (component, page, hook, router, service, repository).

## Recommended sections

1. **Title and one-line purpose**
   - A single H1 title and a short paragraph stating what this artifact is and its role in the system (e.g. "parent page that renders sections and passes through view model from hook"). Optionally: **Referenced from:** link to the README or parent spec.

2. **Role / contract**
   - What this artifact is responsible for and what it is **not** responsible for. For a page: "Render sections in order; call hook; pass view model through. Does not fetch data or implement handlers." For a hook: "Return view model; fetch via tRPC; own billing interval state." For a router: "Expose procedures X, Y; delegate to service."

3. **Structure / composition**
   - For UI: render order, nesting (e.g. which sub-components), file paths if relevant. For hooks: composition (e.g. data hook + actions hook). For backend: which procedures, which service methods. Use a table or list; link to sub-specs for nested pieces.

4. **Props / inputs / API**
   - **Components**: All props with types and semantics (e.g. `variant`, `onAction`, `usageItems`). **Page**: What it receives from the hook (view model shape). **Hook**: Return type (view model). **Routers**: Procedure names, input and output types. **Services**: Method signatures and parameters. **Repositories**: Method signatures and return shapes. Prefer tables for clarity.

5. **Data and behavior**
   - Where data comes from (e.g. "from subscription and trial state"), how it is derived (e.g. "banner variant from trial/subscription flags"), and key behaviors (e.g. "onCheckout(planId) creates Stripe Checkout session and redirects"). For backend: what each procedure/method does and any side effects.

6. **Handlers / actions** (when applicable)
   - For UI and hooks: callback semantics (e.g. "onManageSubscription opens Billing Portal"). For routers: what each mutation does from the caller’s perspective. Use a table (handler name | behavior) when there are several.

7. **Edge cases and special behavior**
   - Empty states, optional props, conditional rendering (e.g. "banner only when variant is defined"), errors, loading. For backend: validation rules, not-found behavior, idempotency if relevant.

8. **Links**
   - **Sub-specs**: Links to specs for child components, sub-hooks, or related procedures. **Testing**: Link to the test plan, e.g. `**Testing (TDD):** [<shortname>-test-plan.md](./<shortname>-test-plan.md)`.

9. **Out of scope / remaining specs** (optional)
   - What is explicitly not covered in this spec or deferred (e.g. "Exact loading UI to be specified in remaining specs").

## Minimal viable spec

For a small artifact, the minimum is:

- Title and one-line purpose
- Role / contract
- Props or API (inputs/outputs)
- Link to test plan when it exists

Add structure, behavior, handlers, and edge cases as the artifact grows.

## Conventions

- Use **tables** for props, handlers, and procedure I/O so contracts are scannable.
- Use **bullets** for responsibilities and derivation rules.
- Keep the spec as the **single source of truth** for behavior, props, and types; avoid duplicating long copy—reference constants or a copy doc when needed.
- If the project uses a **docs/** or **plans/** path in places, prefer **plans/** and mirror implementation layout as per the organization reference.
