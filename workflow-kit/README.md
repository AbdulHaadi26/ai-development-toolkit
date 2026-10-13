# Project Workflow Kit

This folder is the canonical, product-neutral source for reusable workflow templates and AI-tool adapters. The current version is recorded in [`VERSION`](VERSION). Each adopting repository keeps its own application logic, product requirements, and project-specific workflow documents outside this kit.

To adopt the kit in another repository, follow [`ADOPTION.md`](ADOPTION.md). These are starter templates: adapt them to the target product before use, and track the adopted kit version in that repository.

Adopting repositories can track this folder as a `workflow-kit/` Git submodule. At the start of each task, run `node workflow-kit/scripts/workflow-kit.mjs check` (or `npm run workflow:check`) to compare the pinned commit with its configured branch (normally toolkit `main`); report a behind pointer and do not silently update it. Ahead or diverged pointers are reported and never merged automatically. Run `node workflow-kit/scripts/workflow-kit.mjs update` (or `npm run workflow:update`) to advance a behind pointer. Review that pointer change and selectively merge relevant templates into the project's tailored files through its normal feature branch and PR; never overwrite product decisions or history. See [`ADOPTION.md`](ADOPTION.md) for setup and update steps.

Before use, rename the `*.template.md` core files to their documented names without `.template`; create `user-stories/` and copy/rename `user-story.template.md` there. Put selected tool adapters in their tool-specific expected locations. Then replace:

- `[PROJECT_NAME]` with the website/product name.
- `[APP_ROOT]` with the repository-relative application source folder.
- `[DATA_ROOT]` with the repository-relative product-data folder, or remove it if not applicable.
- `[TEST_COMMAND]`, `[LINT_COMMAND]`, `[TYPECHECK_COMMAND]`, and `[BUILD_COMMAND]` with commands that actually exist in the target repository.

Add project-specific design, coding, technology, and test documents; create the story registry and first story; and update root `README.md`/`AGENTS.md` links. Do not copy another product's backlog, design choices, or technical stack as default requirements. [`ADOPTION.md`](ADOPTION.md) provides the adaptation and update checklist.

Copy `.github/pull_request_template.md` from this kit to the target repository's root `.github/pull_request_template.md` so GitHub applies the PR checklist automatically.

Contents:

- `VERSION` — current portable kit version for adopting repositories to record.
- `scripts/workflow-kit.mjs` — portable check/update commands for the adopted Git submodule pointer.
- `ADOPTION.md` — portable/product-specific boundary, installation mapping, and multi-repository update process.
- `AGENT-ROLES.template.md` — sequential Manager, Designer, Developer, and QA reviews.
- `DEVELOPMENT-WORKFLOW.template.md` — portable feature/bug lifecycle.
- `DEBUG-LOG.template.md` and `BUG-LOG.template.md` — traceability ledgers.
- `FUTURE-SCOPES.template.md` and `user-story.template.md` — status board and story starter.
- `AGENTS.template.md` and `CONTRIBUTING.template.md` — repository entry points and prompts.
- `CODING-STANDARDS.template.md` — portable baseline for constants, formatting, async code, and bounded data access; adapt its commands and stack details.
- `.github/pull_request_template.md` — consistent review and merge checklist for every pull request.
- `README-workflow-section.template.md` — process-first explanation and ordered prompts to include in the target repository root README.
- `tool-adapters/` — optional pointers for supported AI tools.
