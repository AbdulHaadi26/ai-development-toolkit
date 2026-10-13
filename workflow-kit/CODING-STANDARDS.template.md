# [PROJECT_NAME] — Coding Standards

Adapt this baseline to the target repository's actual language, framework, formatter, data sources, and scripts. The checked-in project-specific standards and CI are authoritative after adaptation.

## Fixed values and strings

- Do not scatter fixed strings through application logic. Define reusable values once as named constants or typed enums/constant objects for route paths, state/type identifiers, feature keys, storage keys, and repeated labels.
- Keep editorial/user-authored content in the approved content source. Put shared user-facing copy in a central copy/config module when reused; avoid creating constants or enums for arbitrary one-off values when they do not centralize a real invariant.
- Use typed unions/enums for finite domain values and validate external input at boundaries. Do not compare against duplicated string literals or use stringly typed flags when a type can express the allowed choices.

## Language and asynchronous work

- Use the repository's current modern JavaScript/TypeScript baseline (ES2015+ where supported) and strict type checking where the language supports it. Prefer standard platform APIs and existing project dependencies.
- Prefer `async`/`await` for asynchronous control flow. Use `Promise.all` for independent operations that should run concurrently. Handle failures explicitly; do not leave floating promises, create unnecessary nested promise chains, or silently swallow rejections.
- Follow the framework's documented lifecycle and server/client boundaries. Keep secrets and private environment values out of client code and rendered output.

## Formatting

- Use one repository formatter and shared configuration for every supported file type, including source, styles, tests, JSON, and Markdown.
- Format every changed file before review. Ensure local staged-file hooks and CI both check changed files, including repository-level workflow Markdown, alongside the application's full formatter check. Avoid ad hoc exclusions and per-file formatter overrides.
- Keep lint and type-check commands consistent between local development, hooks, and CI.

## Data access and query efficiency

- Avoid N+1 access patterns: do not issue one database/API/repository query per record while iterating a collection. Batch related reads, join/eager-load where supported, or use an explicit bounded query strategy.
- Reuse the shared typed repository/data-access layer; do not add component- or route-specific fetch loops that duplicate data policies.
- Add regression coverage for query/request counts as the collection grows. If the project uses only static in-memory data for a path, record why N+1 does not apply and test the shared lookup behavior.

## Reuse and verification

- Prefer existing shared components, domain functions, schemas, and configuration. Add abstractions only when they centralize a real invariant or remove repeated logic.
- Add or update tests for behavior changes. Run the complete applicable test suite, formatter, lint, type check, build, and relevant security/accessibility checks before review. Report exact commands and results.
