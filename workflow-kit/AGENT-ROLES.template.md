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
6. After implementation, Lead Designer reviews the completed rendered feature; Lead Developer separately reviews the completed diff (with an independent reviewer if the implementer held the role); Lead QA independently verifies the feature and records exact evidence. Record each decision separately and in this order.
7. Manager reviews every story/task and confirms all three post-implementation specialist decisions. Rejections return to the responsible role; repeat affected downstream reviews.
8. Present the task to the user and stop for the user's review/verification before starting the next task.

No role may advance work while its gate is pending, rejected, or blocked. Role reviews do not replace user approval. Record sign-offs, handoff artifact, date, decision, and findings in the change ledger.
