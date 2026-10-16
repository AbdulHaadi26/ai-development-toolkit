## Change

- Story or bug ID:
- Scope:
- Branch: `feature/US-NNN-TNN-short-name` for one task, `feature/US-NNN-short-name` for a single-task story, or `bug/BUG-YYYYMMDD-NNN-short-name`

## Verification

- [ ] Full applicable test suite passed
- [ ] Lint, formatting, typecheck, and production build passed
- [ ] Applicable accessibility, security, and other project checks passed
- [ ] `DEBUG-LOG.md` and story/bug status records are current
- [ ] Required role reviews are recorded
- [ ] Reviewer comments are resolved or accepted as non-blocking; approve only if no blocking finding remains
- [ ] Reviewer summary comment is posted with decision and exact check outcomes
- [ ] User accepted the final review checkpoint before merge

## Merge gate

- [ ] This pull request targets `main`
- [ ] This is a short-lived branch based on the latest `main` with one independently deliverable task; `main` remains buildable and releasable
- [ ] Required CI checks passed
- [ ] Reviews and user acceptance are complete
- [ ] Acceptance criteria, dependencies, and scope are verified
- [ ] Design, responsive states, accessibility, keyboard/focus, and motion are reviewed (or N/A reason recorded)
- [ ] Coding standards, reusable components/shared logic, central configuration, and security/secrets checks pass
- [ ] Formatting, lint, typecheck, full applicable tests, build, and applicable quality checks pass
- [ ] Conflicts preserve both sides; the complete diff was reviewed at this head
- [ ] No blocking review comments remain; Manager completion review is recorded
- [ ] Review summary names the exact head commit, decision, findings, and verification evidence

Direct commits and pushes to `main` are prohibited. Merge only through this approved pull request.
