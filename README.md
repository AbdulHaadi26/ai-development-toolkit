# AI Development Toolkit

This repository maintains a reusable, versioned workflow kit for teams using human and AI developers. The portable source lives in [`workflow-kit/`](workflow-kit/); product code, product-specific stories, and app decisions belong in each adopting repository.

## Get started

- Read the [kit overview](workflow-kit/README.md) to see what it contains.
- Follow the [adoption guide](workflow-kit/ADOPTION.md) to install or update the kit in another repository.
- Check [`workflow-kit/VERSION`](workflow-kit/VERSION) to see the current version.

At the start of each task in an adopting repository, run `npm run workflow:check` (or `node workflow-kit/scripts/workflow-kit.mjs check`) to compare the pinned submodule commit with its configured branch (normally `main`). If it reports an outdated pointer, tell the user and continue against the pinned version until they choose to update it. The check distinguishes a pin behind the branch from an ahead or diverged pin; it never updates the latter automatically. To update a behind pin, use `npm run workflow:update` (or `node workflow-kit/scripts/workflow-kit.mjs update`); inspect the resulting Git submodule pointer change, selectively merge relevant templates into the project's tailored files, update its version record, and commit through the normal feature branch and PR. The check fetches the configured branch but does not change the worktree or pointer. The update advances only the submodule pointer and does not overwrite project files. See the [setup and update process](workflow-kit/ADOPTION.md#track-and-update-the-toolkit-as-a-git-submodule).

The kit provides templates for story and bug workflows, review roles, coding standards, change tracking, repository instructions, pull-request checklists, and AI-tool adapters. Customize the templates for the target repository; keep that repository's own product requirements and history there.

## Maintain the toolkit

Make portable process changes in `workflow-kit/`, review them through a pull request, and update `workflow-kit/VERSION` using the versioning guidance in the adoption guide. Run the repository's formatting check before requesting review. Do not add any adopting project's app implementation, catalog, or product-specific backlog to this repository.
