# [PROJECT_NAME] — Contributor Guide

Read the root `README.md`, `AGENTS.md`, `work-flow/DEVELOPMENT-WORKFLOW.md`, and `work-flow/AGENT-ROLES.md` before work. Create one short-lived `feature/US-NNN-short-name` branch and PR per story/feature; use a `bug/BUG-YYYYMMDD-NNN-short-name` branch and PR for a bug. Never commit or push directly to `main`. The Manager and Lead Designer each review the story once before implementation. After the whole feature is complete, Lead Developer, Lead Designer, and Lead QA each review it once against the same PR head. Do not repeat reviews after revisions; resolve blockers, record dispositions, run applicable checks locally, and stop for user acceptance before merge. Do not add GitHub Actions workflows; remove existing workflows when adopting this process. Create a `DEBUG-LOG.md` entry before implementation edits.

## Prompt: project status

```text
Read work-flow/FUTURE-SCOPES.md, work-flow/user-stories/, work-flow/DEBUG-LOG.md, and
work-flow/BUG-LOG.md. Report statuses, dependencies, active/blocked work, and next actions.
Flag inconsistencies. Do not edit files or claim work.
```

## Prompt: pick a story and task

```text
Pick [US-NNN] after the Manager and Lead Designer have each reviewed the story once and scope,
priority, ownership, and dependencies are recorded. Create one story branch and PR; implement
all its tasks there and record the change in work-flow/DEBUG-LOG.md before edits. Once the whole
feature is complete, obtain one Lead Developer, one Lead Designer, and one Lead QA review of the
same PR head. Do not repeat reviews after revisions. Resolve and document findings, run local
checks, then stop for user acceptance.
```

## Prompt: propose a feature

```text
Add this user need as a story: [describe]. Check for duplicates, assign the next unused
US-NNN, define scope/non-goals, dependencies, acceptance criteria, design/data/security impact,
tasks, tests, and success measure. Add it as Available for the one-time Manager and Lead Designer
story reviews. Do not implement it until both decisions are recorded and it is picked.
```

## Prompt: fix a bug

```text
Triage [reproduction, expected, actual, environment]. Record the next BUG ID in
work-flow/BUG-LOG.md, then create a linked CHG entry in work-flow/DEBUG-LOG.md before code
edits. Create bug/BUG-YYYYMMDD-NNN-short-name from the latest main. Add a failing regression
test, fix the cause, run applicable checks locally, and obtain one completed-fix review each from
Lead Developer and Lead QA. Have Lead Designer review once when there is design impact; otherwise
record N/A. Resolve findings without repeat reviews, open one PR targeting main, and stop for user
verification before marking Done. Never commit or push directly to main.
```

## Prompt: update a feature

```text
Update [US-NNN] for [change]. Inspect implementation and acceptance criteria, determine
dependencies and shared design/code/test impact, and update the story/test plan. If scope grows
materially, propose a linked story. Keep implementation tasks on the story's branch and PR. Do
not repeat the story's Manager and Designer reviews. Once the whole feature is complete, obtain
the single completed-feature reviews from Developer, Designer, and QA, then stop for user review.
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
Use only the applicable one-time review slot: Manager and Lead Designer review the story before
implementation; Lead Developer, Lead Designer, and Lead QA review the completed feature once at
the same PR head. If that role already reviewed, do not repeat the review. Record the reviewed
commit, decision, findings or no findings, and exact local check results in the story. Resolve
blockers and document author disposition and verification without another role review. Do not
mark Done or merge until findings are resolved and the user accepts the feature.
```

## Prompt: resolve PR conflicts

```text
Resolve conflicts for [PR URL] on its existing feature/bug branch. Inspect current main, PR
head, and both sides of each conflict. Preserve intended work from both sides; do not choose
ours/theirs wholesale. Check scope, dependencies, design/coding standards, shared logic, tests,
and change-log IDs. Ask the owner when intent is unclear. Never push to main or modify another
author's branch unless assigned. Run diff checks, formatting, lint, typecheck, full applicable
tests, build, and relevant accessibility/security/SEO checks locally. Do not request repeat role
reviews after conflict resolution; document the updated head and verification evidence in the
story and PR.
```
