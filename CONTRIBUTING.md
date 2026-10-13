# Contributing

Keep this repository focused on reusable, product-neutral workflow templates and AI-tool adapters. Do not copy an adopting project's app source, product data, backlog, or project-specific decisions into `workflow-kit/`.

## Change process

1. Create a feature or fix branch from the latest `main` and make one focused change.
2. For portable behavior changes, update the relevant template or adapter and revise `workflow-kit/README.md` or `workflow-kit/ADOPTION.md` when its guidance changes.
3. Update `workflow-kit/VERSION` according to `workflow-kit/ADOPTION.md`: patch for corrections, minor for backward-compatible additions, and major for incompatible changes.
4. Run `npx --yes prettier@3.6.2 --check .` and verify changed relative links and template destination paths.
5. Open a pull request against `main`. Include the change purpose, affected templates, version update, verification results, and any adoption impact. Merge only after required reviews and checks pass.

Do not commit or push directly to `main`. Separate tool adapters remain optional; update only adapters affected by a process change.
