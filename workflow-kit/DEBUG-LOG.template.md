# [PROJECT_NAME] — Change and Debug Log

Record every independently reviewable story task or bug fix. This complements Git history; it does not replace commits, pull requests, story statuses, or `BUG-LOG.md`. Never record secrets, personal data, or large raw logs.

## Change index

| Change ID | Story/task or bug | Summary                | Status | Owner | Commit/PR |
| --------- | ----------------- | ---------------------- | ------ | ----- | --------- |
| —         | —                 | No changes logged yet. | —      | —     | —         |

## Entry template

```markdown
### CHG-YYYYMMDD-NNN — Short title

- **Status:** Picked
- **Story/task or bug:** US-NNN / task N or BUG-YYYYMMDD-NNN
- **Owner/tool:** unassigned
- **Started:** YYYY-MM-DD
- **Purpose:** user outcome or defect addressed
- **Affected paths:** update as implementation evolves
- **Before:** current behavior/state
- **After:** intended and delivered behavior/state
- **Dependencies:** completed, accepted, or blocking dependencies
- **Verification:** exact commands and results
- **Manager review:** Pending — reviewer, date, decision, notes
- **Lead Designer review:** Pending / N/A — reviewer, date, decision, notes
- **Lead Developer review:** Pending — reviewer, date, decision, notes
- **Lead QA review:** Pending — reviewer, date, decision, evidence
- **Rollback/recovery:** revert commit/PR and any data/configuration steps
- **Commit/PR:** pending
- **Notes:** risks or safe evidence links
```

Create the entry before implementation edits; update it at each handoff and at review. Use a unique stable change ID and never reuse it.
