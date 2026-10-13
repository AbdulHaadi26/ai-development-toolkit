## Developer workflow and prompts

Use these prompts from top to bottom as needed. Read the shared project files before implementation. Replace bracketed details with repository-specific values.

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
Ask the Manager to review [US-NNN], confirm scope, acceptance criteria, dependencies, owner,
and priority, then pass it through the ordered roles in work-flow/AGENT-ROLES.md. Do not
implement while any required gate is pending or rejected.
```

### 5. List and pick a task

```text
List tasks for [US-NNN] with status, dependencies, deliverables, and review gates. After I
select one, confirm prerequisites and ownership, create feature/US-NNN-short-name from the
latest main and open a PR targeting main. Never commit or push directly to main. Create a
DEBUG-LOG entry, then implement only that task. After development, obtain separate Designer,
Developer, and QA reviews of the completed feature, then stop for user review before the next
task.
```

### 6. Add or update a feature

```text
Define [feature/change] as a story or update [US-NNN]. Check duplicates, scope, dependencies,
acceptance criteria, design/data/security implications, and tests. Add new stories as Available
for Manager review; do not implement until picked. When picked, create feature/US-NNN-short-name
from the latest main and open a PR targeting main; never commit or push directly to main. Split
material scope growth into a linked story.
```

### 7. List and fix bugs

```text
List bugs by status/severity from work-flow/BUG-LOG.md. For [bug report], create a stable bug
record and linked DEBUG-LOG entry, reproduce it, create bug/BUG-YYYYMMDD-NNN-short-name from
the latest main, add a failing regression test, fix the cause, run full checks, complete all
specialist reviews on the same PR head even if a blocker is found, obtain Manager review, open a
PR targeting main, and stop for user verification before Done. Never
commit or push directly to main.
```

### 8. Review a change

```text
Review [US-NNN or BUG-ID] at the current PR head against its acceptance criteria,
design/coding standards, tests, dependencies, and DEBUG-LOG entry. Treat review as read-only;
do not edit or push to the author's branch. Have Designer, Developer, and QA each complete an
independent review of the same exact PR head, even when an earlier role found a blocker. Run
applicable full checks and report exact commands/results. Report findings on the PR, then have
the Manager consolidate the decision. Request changes and do not approve while a blocker
remains; formally approve only when all applicable gates are clean. Optional suggestions can
be non-blocking. Always add a summary comment with the reviewed commit, each role's decision,
findings or an explicit no-findings result, and exact check results/limitations. Do not mark
Done or merge based only on the comment; wait for user acceptance.
```

### 9. Resolve PR conflicts

```text
Resolve conflicts for [PR URL] on its existing feature/bug branch. Inspect current main, PR
head, and both sides. Preserve both intended changes; never choose ours/theirs wholesale. Check
scope, dependencies, design/coding standards, shared logic, tests, and change-log IDs; ask the
owner if unclear. Run diff checks, formatting, lint, typecheck, applicable full tests, build,
and relevant accessibility/security/SEO checks. Push only to the PR branch, review its complete
diff at the new head, and post exact evidence on the PR.
```
