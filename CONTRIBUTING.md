# Contributing

Keep this repository focused on reusable, product-neutral workflow templates and AI-tool adapters. Do not copy an adopting project's app source, product data, backlog, or project-specific decisions into `workflow-kit/`.

## Change process

1. Follow trunk-based development: `main` is the single long-lived integration trunk. Create a short-lived branch from the latest `main` for one focused, independently deliverable change; aim to merge it within one working day and do not keep a feature branch open across multiple tasks.
2. For portable behavior changes, update the relevant template or adapter and revise `workflow-kit/README.md` or `workflow-kit/ADOPTION.md` when its guidance changes.
3. Update `workflow-kit/VERSION` according to `workflow-kit/ADOPTION.md`: patch for corrections, minor for backward-compatible additions, and major for incompatible changes.
4. Run `npx --yes prettier@3.6.2 --check .` and verify changed relative links and template destination paths.
5. Open a pull request against `main`. Include the change purpose, affected templates, version update, verification results, and any adoption impact. Merge promptly after required reviews and checks pass, keeping `main` buildable and releasable.

Do not commit or push directly to `main`; all integration goes through a reviewed PR. Separate tool adapters remain optional; update only adapters affected by a process change.
