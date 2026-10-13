# [PROJECT_NAME] — Agent Roles and Review Gates

Use these roles across human and AI contributors. Record each decision in the change ledger. A role may be combined only when staffing requires it; an implementer must not be the sole approver of their own work.

| Role           | Responsibility                                                                                          | Review output                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manager        | Story intake, priority, scope, dependencies, assignment, and delivery decision. Reviews every story.    | Approves scope/readiness at intake and checks all specialist decisions, evidence, status, and links before completion.                                            |
| Lead Designer  | User journeys, visual/interaction design, accessibility, responsiveness, and design-system consistency. | Design approval before implementation and review of the completed rendered feature against `DESIGN.md`; record Approve, Changes requested, or N/A with rationale. |
| Lead Developer | Architecture, implementation plan, shared logic, security, and maintainability.                         | Technical approval before implementation and a separate post-implementation review of the completed diff. The implementer cannot be the sole approver.            |
| Lead QA        | Test strategy, regression risk, and independent verification.                                           | Acceptance-to-test review plus independent post-implementation verification with exact test commands/results and approval.                                        |

## Ordered gates

1. Manager reviews the story, acceptance criteria, dependencies, priority, and owner.
2. Lead Designer reviews design impact before UI work; record N/A with a reason when there is no UI impact.
3. Lead Developer reviews technical scope and dependencies and creates the change-ledger entry.
4. Lead QA reviews the acceptance-to-test mapping before implementation where practical.
5. Lead Developer implements one approved task with tests and completes applicable checks.
6. After implementation, all three specialist roles complete a review of the same PR head: Lead Designer checks the rendered feature; Lead Developer checks the completed diff against architecture, coding standards, reuse, and security; Lead QA independently runs the complete applicable suite and quality checks and records exact evidence. Do not stop the review cycle after the first role finds a blocker. Each role records a separate decision and actionable findings.
7. Manager reviews every story/task after all specialist reviews are recorded. The Manager confirms scope, records, tests, and all findings. Any blocker from any role means the PR is not approved and cannot merge. Send the complete findings to the author together, then repeat every affected review against the updated head; record the new head SHA and decision each time.
8. Present the task to the user and stop for the user's review/verification before starting the next task.

Do not mark work Done or merge while a required gate is pending, rejected, or blocked. Reviewers should still finish their own independent assessment of the same head when another role has found a blocker, so the author gets a complete review in one cycle. Role reviews do not replace user approval. Record sign-offs, handoff artifact, reviewed head SHA, date, decision, and findings in the change ledger.
