# [PROJECT_NAME] — Shared Development Workflow

This process is shared by every human and AI tool. The Markdown records in `work-flow/` are canonical; issues and tool-specific instructions are links/adapters and must not create competing scope or status.

## Source of truth

- `FUTURE-SCOPES.md` owns feature story statuses and stable IDs.
- `user-stories/` contains user outcomes, dependencies, non-goals, and testable acceptance criteria.
- `BUG-LOG.md` owns defect status and reproduction details.
- `DEBUG-LOG.md` records each implementation change, changed paths, verification, role reviews, and rollback notes.
- `AGENT-ROLES.md` defines ordered reviews. Read project `DESIGN.md`, `CODING-STANDARDS.md`, and `TEST-CASES.md` before implementation.

## Statuses

Use `Available`, `Picked`, `In progress`, `Review`, `Done`, `Blocked`, or `Deferred`. Stable IDs are never reused. The Manager checks dependencies before work starts. A dependency that is not complete must be explicitly accepted as a parallel prerequisite; do not silently bypass it. Mark Done only after all acceptance criteria, checks, role reviews, and user approval pass.

## Feature process

1. Ask the Manager to check for duplicates, review the story, confirm dependencies, and assign an owner.
2. Read the story and shared standards. Clarify scope and split large work into independently deliverable tasks.
3. Obtain the Lead Designer and Lead Developer reviews required by `AGENT-ROLES.md`; agree on tests before implementation.
4. Start one feature branch per picked story from the latest `main`, named `feature/US-NNN-short-name`; keep its sequential tasks on that branch. Use `bug/BUG-YYYYMMDD-NNN-short-name` for each bug. Never commit to or push directly to `main`. Do not have contributors edit the same working tree concurrently.
5. Create a `DEBUG-LOG.md` change entry before implementation edits. Implement one task with tests; keep application code under `[APP_ROOT]` and product data under `[DATA_ROOT]` when these placeholders apply.
6. Run `[TEST_COMMAND]`, `[LINT_COMMAND]`, `[TYPECHECK_COMMAND]`, and `[BUILD_COMMAND]`, plus applicable accessibility, security, SEO, and performance checks. Record exact commands/results.
7. After implementation, complete separate Lead Designer, Lead Developer, and Lead QA reviews of the feature in that order. Designer reviews the rendered feature against the approved design; Developer reviews the completed diff and technical standards; QA independently verifies the completed feature and records exact evidence. The implementer cannot be the sole approver. Fix requested changes and repeat affected reviews.
8. Have the Manager confirm all post-implementation specialist decisions, then show the deliverable and evidence to the user. Stop for user review before the next task.
9. Open a pull request targeting `main` for every feature/story or bug. Keep it draft while required tasks, post-implementation reviews, or user checkpoints remain. Merge only through the reviewed PR after checks, role reviews, and user acceptance pass. Update statuses and link the merged PR in story, bug, and change records.

## PR review and comments

A PR review is an independent, evidence-based check of a specific head commit against story/bug acceptance criteria, dependencies, design and coding standards, tests, and quality requirements. Inspect the complete diff, reusable components/shared logic, centralized configuration, security/secrets, and regression coverage. For UI, inspect responsive rendering, accessibility, keyboard/focus, contrast, and motion or record why N/A. Run formatting, lint, typecheck, applicable full tests, build, and relevant accessibility/security/SEO/performance checks yourself; report exact commands and outcomes. Do not edit, commit to, or push changes onto the author's branch while reviewing. Put actionable findings on the PR and distinguish blockers from suggestions. If there are no findings, state that explicitly.

Merge gates: scope/acceptance and dependencies pass; design/accessibility pass or have a reasoned N/A; coding standards, reuse, and security pass; required tests/checks pass; conflicts and records are current; no blocking comments remain; and separate Designer, Developer, QA, Manager, and user review gates are recorded. Any failed or unevidenced applicable gate blocks approval and merge.

At the end of every review, report the result on the PR. For each finding, add a clear comment—preferably inline on the relevant changed line—with its impact and requested action. If the review is clean, submit an `Approve` review; do not approve while a blocking finding remains. Optional suggestions may be left as non-blocking comments while approving if they do not require changes before merge. In all cases, leave a summary comment identifying the reviewed commit, decision, findings or explicit no-findings result, checks with exact outcomes, and limitations. A PR comment or approval does not by itself mark work Done, replace user acceptance, or authorize merging. If comment or approval access is unavailable, tell the repository owner and provide the prepared summary.

## Resolving conflicts

Resolve on the PR feature/bug branch after inspecting current main, PR head, and both sides of each conflict. Preserve compatible intent; do not choose ours/theirs wholesale. Check scope, standards, reusable logic, tests, and record IDs; ask the owner if intent is ambiguous. Run diff checks and all applicable formatting/lint/typecheck/tests/build/accessibility/security/SEO checks, push only to the PR branch, then review the complete updated diff at its new head and update the PR summary. Approval applies to the reviewed commit.

## Bug process

1. Record a stable bug ID, severity, environment, reproduction steps, expected/actual behavior, and affected story in `BUG-LOG.md`; create its `bug/BUG-YYYYMMDD-NNN-short-name` branch from the latest `main`.
2. Manager and QA triage it. Mark Blocked with the missing evidence/action if it cannot be reproduced.
3. Before code edits, add a linked `DEBUG-LOG.md` entry. Add a regression test that fails before the fix.
4. Developer fixes the cause. After implementation, Designer reviews UI impact or records N/A, a developer reviews the completed diff, and QA independently runs the regression and complete applicable suite. The implementer cannot be the sole approver.
5. Open a pull request targeting `main`; direct commits and pushes to `main` are prohibited. Manager checks both logs and all applicable post-implementation role decisions. Ask the user to verify before marking Done and merge only after acceptance.

For cross-tool coordination, every contributor reads the same files, claims work before editing, and records handoffs. Require PRs and passing checks for `main` in the host repository settings. Re-run integrated checks after merges.
