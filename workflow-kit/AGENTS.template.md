# Shared project instructions

- At the start of each task, check the adopted `workflow-kit/` pointer against its configured branch (normally toolkit `main`) using `node workflow-kit/scripts/workflow-kit.mjs check` (or `npm run workflow:check`). If it is outdated, inform the user and do not silently update it. Update only when asked, through a feature branch and PR.
- Follow trunk-based development: `main` is the only long-lived integration branch; create one short-lived branch and one PR per story/feature from the latest `main`. Keep `main` releasable and never commit or push directly to it.
- Read `work-flow/DEVELOPMENT-WORKFLOW.md`, `work-flow/AGENT-ROLES.md`, and the selected story before editing.
- The story board and story file are the scope/status source of truth. Do not implement unpicked future scope.
- Create/update `work-flow/DEBUG-LOG.md` before implementation edits. For bugs, also update `work-flow/BUG-LOG.md`.
- Follow project `DESIGN.md`, `CODING-STANDARDS.md`, and `TEST-CASES.md`; keep source under `[APP_ROOT]` and product data under `[DATA_ROOT]` when applicable.
- Obtain exactly one Manager review and one Lead Designer review of the story before implementation. When the complete feature is ready, obtain exactly one Lead Developer, one Lead Designer, and one Lead QA review. Do not repeat role reviews after revisions; address findings before final acceptance and record their disposition.
- Run applicable checks locally and record exact results. Do not add GitHub Actions workflows; remove existing workflows when adopting this process. Never claim checks that were not run.
