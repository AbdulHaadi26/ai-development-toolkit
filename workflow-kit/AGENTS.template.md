# Shared project instructions

- At the start of each task, check the adopted `workflow-kit/` pointer against toolkit `main` using `node workflow-kit/scripts/workflow-kit.mjs check` (or `npm run workflow:check`). If it is outdated, inform the user and do not silently update it. Update only when asked, through a feature branch and PR.
- Read `work-flow/DEVELOPMENT-WORKFLOW.md`, `work-flow/AGENT-ROLES.md`, and the selected story before editing.
- The story board and story file are the scope/status source of truth. Do not implement unpicked future scope.
- Create/update `work-flow/DEBUG-LOG.md` before implementation edits. For bugs, also update `work-flow/BUG-LOG.md`.
- Follow project `DESIGN.md`, `CODING-STANDARDS.md`, and `TEST-CASES.md`; keep source under `[APP_ROOT]` and product data under `[DATA_ROOT]` when applicable.
- Use the Manager intake and pre-implementation review gates, then require separate post-implementation Designer, Developer, and QA reviews before Manager completion and user acceptance. Record approvals and stop at the user review checkpoint after each task.
- Run the full current test suite and project quality scripts. Never claim checks that were not run.
