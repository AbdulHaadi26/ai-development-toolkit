# [PROJECT_NAME] — Contributor Guide

Read the root `README.md`, `AGENTS.md`, `work-flow/DEVELOPMENT-WORKFLOW.md`, and `work-flow/AGENT-ROLES.md` before work. Create one `feature/US-NNN-short-name` branch per feature/story and one `bug/BUG-YYYYMMDD-NNN-short-name` branch per bug, based on the latest `main`. Open a pull request targeting `main` for every feature or bug. Never commit or push directly to `main`; merge only after checks, separate post-implementation Designer, Developer, and QA reviews of the same PR head, Manager review, and user acceptance. Every specialist completes their assessment even if an earlier review found a blocker; blockers still prevent approval and merge. Create a `DEBUG-LOG.md` entry before implementation edits. After each task, run the full current checks, record evidence, complete role reviews, and stop for user review.

## Prompt: project status

```text
Read work-flow/FUTURE-SCOPES.md, work-flow/user-stories/, work-flow/DEBUG-LOG.md, and
work-flow/BUG-LOG.md. Report statuses, dependencies, active/blocked work, and next actions.
Flag inconsistencies. Do not edit files or claim work.
```

## Prompt: pick a story and task

```text
Pick [US-NNN] and task [ID] after the Manager confirms scope, priority, ownership, and
dependencies. Follow work-flow/AGENT-ROLES.md: pre-implementation design, technical, and test-plan
reviews, implementation, complete post-implementation Designer/Developer/QA reviews of the same
PR head, Manager review, then user review. Complete each specialist's assessment even if another
role found a blocker; do not approve or merge until all blockers are resolved. Record the change
in work-flow/DEBUG-LOG.md before implementation edits.
```

## Prompt: propose a feature

```text
Add this user need as a story: [describe]. Check for duplicates, assign the next unused
US-NNN, define scope/non-goals, dependencies, acceptance criteria, design/data/security impact,
tasks, tests, and success measure. Add it as Available for Manager review. Do not implement it
until it is picked.
```

## Prompt: fix a bug

```text
Triage [reproduction, expected, actual, environment]. Record the next BUG ID in
work-flow/BUG-LOG.md, then create a linked CHG entry in work-flow/DEBUG-LOG.md before code
edits. Create bug/BUG-YYYYMMDD-NNN-short-name from the latest main. Add a failing regression
test, fix the cause, run full checks, pass post-implementation Designer, Developer, and QA
reviews, open a PR targeting main, and
stop for user verification before marking Done. Never commit or push directly to main.
```

## Prompt: update a feature

```text
Update [US-NNN] for [change]. Inspect implementation and acceptance criteria, determine
dependencies and shared design/code/test impact, and update the story/test plan. If scope grows
materially, propose a linked story. Implement one approved task with a change-log entry and
pre-implementation reviews, then post-implementation Designer, Developer, and QA reviews, then
stop for user review.
```

## Prompt: review or verify a PR

```text
Review [US-NNN or BUG-ID] at the current PR head against acceptance criteria, dependencies,
DESIGN.md, CODING-STANDARDS.md, TEST-CASES.md, and the change-log entry. Inspect scope, reusable
components/shared logic, centralized configuration, secrets/env exposure, and regression
coverage. For UI, inspect responsive rendering, accessibility, keyboard/focus, contrast, and
motion (or record why N/A). Treat review as read-only; do not edit or push to the author's
branch. Run formatting, lint, typecheck, applicable full tests, build, and relevant
accessibility/security/SEO/performance checks; report exact outcomes.
At the end, report the result on the PR. Add comments for findings with file/line references.
Request changes and do not approve while a blocking finding remains; formally approve if the
review is clean. Optional suggestions can be non-blocking. In all cases, add a summary comment
with the reviewed commit, decision, findings or an explicit no-findings result, and exact
check results/limitations. Do not mark Done or merge based only on a review comment; wait for
the required approvals and user acceptance.
```

## Prompt: resolve PR conflicts

```text
Resolve conflicts for [PR URL] on its existing feature/bug branch. Inspect current main, PR
head, and both sides of each conflict. Preserve intended work from both sides; do not choose
ours/theirs wholesale. Check scope, dependencies, design/coding standards, shared logic, tests,
and change-log IDs. Ask the owner when intent is unclear. Never push to main or modify another
author's branch unless assigned. Run diff checks, formatting, lint, typecheck, full applicable
tests, build, and relevant accessibility/security/SEO checks. Push only to the PR branch, review
the complete diff again, and report the new head and evidence on the PR.
```
