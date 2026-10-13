# AI Development Toolkit

This repository maintains a reusable, versioned workflow kit for teams using human and AI developers. The portable source lives in [`workflow-kit/`](workflow-kit/); product code, product-specific stories, and app decisions belong in each adopting repository.

## Get started

- Read the [kit overview](workflow-kit/README.md) to see what it contains.
- Follow the [adoption guide](workflow-kit/ADOPTION.md) to install or update the kit in another repository.
- Check [`workflow-kit/VERSION`](workflow-kit/VERSION) to see the current version.

The kit provides templates for story and bug workflows, review roles, coding standards, change tracking, repository instructions, pull-request checklists, and AI-tool adapters. Customize the templates for the target repository; keep that repository's own product requirements and history there.

## Maintain the toolkit

Make portable process changes in `workflow-kit/`, review them through a pull request, and update `workflow-kit/VERSION` using the versioning guidance in the adoption guide. Run the repository's formatting check before requesting review. Do not add any adopting project's app implementation, catalog, or product-specific backlog to this repository.
