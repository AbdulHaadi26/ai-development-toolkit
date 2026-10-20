# [PROJECT_NAME] — Agent Roles and Review Gates

Use these roles across human and AI contributors. Record each review once in the story. A role may be combined only when staffing requires it; an implementer must not be the sole approver of their own completed work.

| Role           | Responsibility                                                                                          | One-time review                                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manager        | Story intake, priority, scope, dependencies, assignment, and delivery decision.                         | Reviews each story once before implementation for scope, priority, dependencies, and readiness. No completion review.                                                                         |
| Lead Designer  | User journeys, visual/interaction design, accessibility, responsiveness, and design-system consistency. | Reviews the story once before implementation for design impact; then reviews the completed feature once against the approved design. Record N/A with a reason when there is no design impact. |
| Lead Developer | Architecture, implementation, shared logic, security, and maintainability.                              | Reviews the completed feature once against architecture, standards, reuse, configuration, and security.                                                                                       |
| Lead QA        | Test strategy, regression risk, and independent verification.                                           | Reviews the completed feature once by independently verifying acceptance coverage and applicable checks; records exact evidence.                                                              |

## Review sequence

1. The Manager and Lead Designer each review the story exactly once before implementation. Record the decisions in the story and do not repeat these reviews during implementation.
2. Complete implementation and local checks for the whole feature.
3. The Lead Developer, Lead Designer, and Lead QA each review the completed feature exactly once against the same PR head. Each records a separate decision, reviewed head, findings, and evidence.
4. The author resolves blockers, records each finding's disposition and relevant local verification, and does not request another role review. No blocker may remain open at user acceptance or merge.
5. Present the review record and evidence to the user. Role reviews do not replace user acceptance.

Do not create extra review rounds after fixes or changes. The review ledger should make each role's single review and the author's finding resolution clear.
