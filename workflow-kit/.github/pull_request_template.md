## Change

- Story or bug ID:
- Scope:
- Branch: `feature/US-NNN-TNN-short-name` for one task, `feature/US-NNN-short-name` for a single-task story, or `bug/BUG-YYYYMMDD-NNN-short-name`

## Verification

- [ ] Applicable tests, lint, formatting, typecheck, build, and quality checks were run locally; exact results are recorded
- [ ] `DEBUG-LOG.md` and story/bug status records are current
- [ ] Required role reviews are recorded
- [ ] Reviewer comments are resolved or accepted as non-blocking; approve only if no blocking finding remains
- [ ] Manager and Lead Designer each reviewed the story once before implementation
- [ ] Lead Developer, Lead Designer, and Lead QA each reviewed the completed feature once against the same PR head
- [ ] Review findings are resolved and their dispositions and verification are recorded; no repeat reviews were requested
- [ ] User accepted the completed feature before merge

## Merge gate

- [ ] This pull request targets `main`
- [ ] This is a short-lived branch based on the latest `main` with one independently deliverable task; `main` remains buildable and releasable
- [ ] Required local checks and one-time reviews are complete, with user acceptance
- [ ] Acceptance criteria, dependencies, and scope are verified
- [ ] Design, responsive states, accessibility, keyboard/focus, and motion are reviewed (or N/A reason recorded)
- [ ] Coding standards, reusable components/shared logic, central configuration, and security/secrets checks pass
- [ ] Formatting, lint, typecheck, full applicable tests, build, and applicable quality checks pass
- [ ] Conflicts preserve both sides; the complete diff was reviewed at this head
- [ ] No blocking review findings remain; there is no Manager completion review
- [ ] Story review record names the reviewers, decisions, findings, reviewed head, and local verification evidence

Direct commits and pushes to `main` are prohibited. Merge only through this approved pull request.
Do not add GitHub Actions workflows; remove existing workflows when adopting this process.
