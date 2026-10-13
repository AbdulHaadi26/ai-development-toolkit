# Adopt and Update the Workflow Kit

The `workflow-kit/` directory is the canonical product-neutral source. It contains reusable process templates, contributor prompts, the pull-request checklist, and optional AI-tool adapters. Product requirements and application behavior belong in the adopting repository.

## Keep the boundary clear

| Portable source                       | Destination when adopted             | Customize for the target repository                                     |
| ------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `AGENTS.template.md`                  | Root `AGENTS.md`                     | App paths, test commands, standards links, and product constraints      |
| `AGENT-ROLES.template.md`             | `work-flow/AGENT-ROLES.md`           | Role availability and product-specific review evidence                  |
| `DEVELOPMENT-WORKFLOW.template.md`    | `work-flow/DEVELOPMENT-WORKFLOW.md`  | Branch rules, commands, scope locations, and required product checks    |
| `DEBUG-LOG.template.md`               | `work-flow/DEBUG-LOG.md`             | Preserve each repository's own change history                           |
| `BUG-LOG.template.md`                 | `work-flow/BUG-LOG.md`               | Preserve each repository's bug records and IDs                          |
| `FUTURE-SCOPES.template.md`           | `work-flow/FUTURE-SCOPES.md`         | Create a new backlog; never copy another product's story statuses       |
| `user-story.template.md`              | `work-flow/user-stories/`            | Create new product-specific stories and stable IDs                      |
| `CODING-STANDARDS.template.md`        | `work-flow/CODING-STANDARDS.md`      | Add actual stack, data, security, and codebase requirements             |
| `CONTRIBUTING.template.md`            | Root `CONTRIBUTING.md`               | Commands, paths, scope, and product-specific prompts                    |
| `README-workflow-section.template.md` | Root `README.md`                     | Add project-specific workflow commands and links                        |
| `.github/pull_request_template.md`    | `.github/pull_request_template.md`   | Add required checks and repository-specific merge conditions            |
| `tool-adapters/`                      | Corresponding root/tool config paths | Install only tools used by the team and point to canonical project docs |

`DESIGN.md`, `TEST-CASES.md`, `TECHNOLOGY.md`, app source, catalog/data, story contents, and deployment instructions are product-specific. Keep them in the adopting repository; do not move them into this kit.

## Install or update

1. Read the source and target repository's instructions and identify its current workflow files.
2. Copy or compare only the portable templates listed above. Merge changes into existing records; never overwrite product history, backlog status, design decisions, or local commands wholesale.
3. Replace placeholders, remove unused adapters, and verify every referenced path and command.
4. Set `work-flow/WORKFLOW-KIT-VERSION` to the value in this source's `VERSION`. If the target uses another version, document the merged changes and the adopted version there.
5. Run the target repository's formatting, lint, typecheck, test, build, and security checks. Review the complete diff with the target repository's required roles and merge through its normal PR process.

### Track and update the toolkit as a Git submodule

Add the toolkit once at the repository root:

```sh
git submodule add -b main https://github.com/AbdulHaadi26/ai-development-toolkit.git workflow-kit
git submodule update --init --recursive
```

Commit `.gitmodules` and the `workflow-kit` submodule pointer in the adopting repository's feature branch and PR. On subsequent clones, use `git clone --recurse-submodules` or run `git submodule update --init --recursive` from the repository root.

At the start of every task, check whether the adopted commit is behind toolkit `main`:

```sh
node workflow-kit/scripts/workflow-kit.mjs check
```

The check reads the intended branch from `.gitmodules`, verifies the initialized submodule's local branch setting matches it, and compares the pinned commit SHA and version with that remote branch. The setup above configures `main`. A behind pointer is reported for the user; an ahead or diverged pointer is reported without offering an automatic update. Repositories with a `package.json` should expose this as `npm run workflow:check`.

When the user chooses to update, run:

```sh
node workflow-kit/scripts/workflow-kit.mjs update
```

This invokes `git submodule update --init --remote --merge workflow-kit` only when the pin is behind the configured branch. Repositories with a `package.json` should expose this as `npm run workflow:update`:

```json
{
  "scripts": {
    "workflow:check": "node workflow-kit/scripts/workflow-kit.mjs check",
    "workflow:update": "node workflow-kit/scripts/workflow-kit.mjs update"
  }
}
```

The update command advances the submodule checkout to the latest commit on its configured branch. Review the submodule diff, copy or merge only relevant template changes into the adopting repository's tailored files, update `work-flow/WORKFLOW-KIT-VERSION` to the toolkit `VERSION` and exact submodule commit, run the repository checks and reviews, then commit the pointer and any adaptations through a feature branch and PR. The check never changes the working tree or pointer; neither command overwrites adapted workflow files, product history, or local standards.

## Updating multiple repositories

Make a portable process improvement once in this source folder, review it here, and increment `VERSION` according to the change: patch for corrections, minor for backward-compatible workflow additions, major for incompatible changes. After release, each adopting repository runs the submodule update command, reviews the pointer and template changes, selectively updates its local adaptations, and opens its own PR. Keep a consumer's installed version and any deliberate local adaptation visible; do not silently replace custom rules.
