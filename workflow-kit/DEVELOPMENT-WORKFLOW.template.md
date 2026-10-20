# [PROJECT_NAME] — Shared Development Workflow

This process is shared by every human and AI tool. The Markdown records in `work-flow/` are canonical; issues and tool-specific instructions must not create competing scope or status.

## Source of truth

- `FUTURE-SCOPES.md` owns feature story statuses and stable IDs.
- `user-stories/` contains user outcomes, dependencies, non-goals, acceptance criteria, and the one-time story and completed-feature review record.
- `BUG-LOG.md` owns defect status and reproduction details.
- `DEBUG-LOG.md` records implementation changes, changed paths, verification, and links to the story's review record.
- `AGENT-ROLES.md` defines responsibilities and review gates. Read project `DESIGN.md`, `CODING-STANDARDS.md`, and `TEST-CASES.md` before implementation.

## Statuses

Use `Available`, `Picked`, `In progress`, `Review`, `Done`, `Blocked`, or `Deferred`. Stable IDs are never reused. Before work starts, the Manager checks dependencies and the Manager and Lead Designer each review the story once. Mark Done only after acceptance criteria, local checks, completed-feature reviews, and user acceptance pass.

## Trunk-based development

- `main` is the only long-lived integration trunk. Do not commit or push directly to it.
- Create one short-lived branch from the latest `main` and one PR per story/feature. Implement the story's tasks on that branch so reviewers can assess the whole feature once. Use `feature/US-NNN-short-name`; use `bug/BUG-YYYYMMDD-NNN-short-name` for a bug fix.
- Keep each feature small enough to review and integrate promptly; aim to merge within one working day. Before requesting review, bring the branch up to date with `main`, resolve conflicts, and run applicable local checks. Delete the branch after merge.
- Do not add GitHub Actions workflows. Remove existing GitHub Actions workflows when adopting this process. Run checks locally and record exact commands and results in the PR and change log.
- Keep every merged feature compatible with the current release. Parallel contributors use separate branches and do not edit the same working tree concurrently.

## Feature process

1. Check for duplicate stories, define scope, dependencies, acceptance criteria, owner, and priority.
2. Before implementation, the Manager reviews the story for scope, priority, dependencies, and readiness exactly once. The Lead Designer reviews the story for design impact exactly once (record N/A with a reason when there is no design impact). Record both decisions in the story. Do not request these story reviews again for task breakdowns or implementation changes.
3. Create one feature branch and one PR for the story. Add the change-log entry before editing. Implement all story tasks on this branch; update the story and log as work progresses.
4. Run the repository's required test, lint, type, build, accessibility, security, and other quality checks locally once for the completed feature. Record exact commands, results, and limitations. Never claim an unrun check passed.
5. When the complete feature is ready, the Lead Developer, Lead Designer, and Lead QA each review it once, independently and in parallel, against the same completed-feature PR head. Designer checks the rendered feature against approved design and accessibility needs; Developer checks the full diff against architecture, standards, reuse, configuration, and security; QA checks acceptance coverage, audits the recorded test results, and runs only additional targeted checks needed for independent confidence. Record each role's decision, reviewed head, findings, and evidence in the story. A role does not repeat its review after changes.
6. Resolve blocking findings in one consolidated pass where possible, document how each was addressed, and run only the affected local checks. The author records resolution and evidence; do not request another role review. No blocking finding may remain open at acceptance.
7. Present the completed feature, review record, and check evidence to the user. Merge the PR only after all one-time reviews, findings resolution, and user acceptance are recorded. Update story status and link the PR and change log.

## Review record and merge gate

Each story has two review moments: one combined story-intake handoff where the Manager and Lead Designer each review once; then one completed-feature handoff where Lead Developer, Lead Designer, and Lead QA review in parallel once. Run the complete required check suite once before feature review; QA may run targeted checks when needed. Record reviewer, date, decision, reviewed PR head where applicable, findings, and disposition. A review is never repeated. Changes after a review are handled by the author with affected local checks and a written disposition of findings.

Merge only when scope and acceptance criteria pass; all required reviews are recorded once; every blocking finding is resolved with evidence; applicable local checks pass; records and conflicts are current; and the user accepts the completed feature. User acceptance remains a separate gate.

## Bugs

1. Record a stable bug ID, severity, environment, reproduction steps, expected/actual behavior, and affected story in `BUG-LOG.md`; create a bug branch.
2. If the bug cannot be reproduced, mark it Blocked with the missing evidence/action. Create a linked `DEBUG-LOG.md` entry before code edits and add a regression test.
3. Fix the cause and run applicable local checks. For a UI bug, include its impact in the single completed-change Designer review; record N/A with a reason otherwise. Lead Developer and Lead QA each review the completed fix once. Record and resolve findings without repeating reviews.
4. Open one PR for the fix. Ask the user to verify before marking Done; merge only after required reviews, finding resolution, local checks, and acceptance.

Do not add GitHub Actions workflows or require hosted CI checks. PR comments and approvals do not replace the review records, local evidence, or user acceptance. If a review is blocked by unavailable access, report the limitation and provide its prepared review summary without claiming it completed.
