## Developer workflow and prompts

Use these prompts from top to bottom as needed. Read the shared project files before implementation. Replace bracketed details with repository-specific values.

The repository follows trunk-based development: `main` is the only long-lived integration branch. Use one short-lived branch and PR per story/feature, with all story tasks on that branch. The Manager and Lead Designer review the story once before implementation. When the whole feature is complete, the Lead Developer, Lead Designer, and Lead QA each review it once, in parallel against the same PR head. Do not repeat reviews after revisions; authors resolve findings and record targeted local verification. Do not add GitHub Actions workflows; run checks locally. Never commit or push directly to `main`.

### 1. Explain the project process

```text
At the start of this task, run `npm run workflow:check` from the app directory. If the toolkit
pointer is behind, ahead, or diverged, tell the user; update it only when the user asks. Use the
repository's feature branch and PR process for pointer changes.

Before starting work, read the root README.md, AGENTS.md, work-flow/README.md,
work-flow/DEVELOPMENT-WORKFLOW.md, and work-flow/AGENT-ROLES.md. Explain repository structure,
source-of-truth files, roles, status lifecycle, dependency rules, quality checks, and ordered
review gates through user acceptance. Identify project-specific files and any portable kit.
Do not edit files, claim work, or start implementation; confirm your understanding first.
```

### 2. Project status

```text
Read work-flow/FUTURE-SCOPES.md, work-flow/user-stories/, work-flow/DEBUG-LOG.md, and
work-flow/BUG-LOG.md. Report completed and remaining work, statuses, dependencies, owners,
blocked items, open bugs, and recent changed paths. Flag conflicting records. Suggest the next
eligible action without claiming it. Do not edit files.
```

### 3. List stories and dependencies

```text
List every story grouped by status with ID, scope, and dependencies from its story file. Flag
missing dependencies and status conflicts. Do not edit files or infer statuses.
```

### 4. Pick a story

```text
Have the Manager and Lead Designer review [US-NNN] once each, together, to confirm scope,
acceptance criteria, dependencies, owner, priority, and design impact. Record both decisions in
the story before implementation; do not repeat these reviews.
```

### 5. List and pick a task

```text
List tasks for [US-NNN] with status, dependencies, and deliverables. After I select a story,
create one short-lived branch and PR for the whole story. Implement its tasks on that branch,
updating the change log as needed. Once the feature is complete, have Lead Developer, Lead
Designer, and Lead QA review it once each in parallel against the same PR head. Resolve findings
without repeat reviews, run targeted local checks, and stop for user acceptance before merge.
```

### 6. Add or update a feature

```text
Define [feature/change] as a story or update [US-NNN]. Check duplicates, scope, dependencies,
acceptance criteria, design/data/security implications, and tests. Add new stories as Available
for the one-time Manager and Lead Designer reviews; do not implement until both decisions are
recorded and the story is picked. Use one branch and PR per story, with tasks on that branch.
Do not add GitHub Actions workflows. Split material scope growth into a linked story.
```

### 7. List and fix bugs

```text
List bugs by status/severity from work-flow/BUG-LOG.md. For [bug report], create a stable bug
record and linked DEBUG-LOG entry, reproduce it, create a bug branch, add a regression test, fix
the cause, and run applicable checks locally. Lead Developer and Lead QA each review the fix
once; Lead Designer reviews once when there is design impact, otherwise record N/A. Resolve
findings without repeat reviews. Open one PR and stop for user verification before Done.
```

### 8. Review a change

```text
Use the applicable review slot once. For story intake, Manager and Lead Designer review the
story together. For a completed feature, Lead Developer, Lead Designer, and Lead QA review the
same PR head independently and in parallel. If the role already used that slot, do not repeat it.
Record the decision, findings, reviewed commit, and exact local checks in the story. Resolve
blockers and document author disposition and targeted verification. Do not mark Done or merge
until findings are resolved and the user accepts the feature.
```

### 9. Resolve PR conflicts

```text
Resolve conflicts for [PR URL] on its existing feature/bug branch. Inspect current main, PR
head, and both sides. Preserve both intended changes; never choose ours/theirs wholesale. Check
scope, dependencies, design/coding standards, shared logic, tests, and change-log IDs; ask the
owner if unclear. Run diff checks and the affected local checks, then record the updated head
and verification evidence in the story and PR. Do not repeat role reviews after conflict
resolution.
```
