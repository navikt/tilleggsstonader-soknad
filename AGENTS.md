# AGENTS.md — tilleggsstonader-soknad

Frontend-app for tilleggstønader-søknader og kjørelister fore daglige reiser.   

## Tech Stack

- Node.js/TypeScript
- Nais (Kubernetes on GCP)

## Commands

```bash
# Playwright (E2E)
PLAYWRIGHT_PARALLEL=false yarn playwright test      # Kjør alle tester
yarn playwright test -g "testnavn"                  # Kjør én enkelt test
```

## Key Patterns

- Tekster rendres med `LocaleTekst`-komponenten og relaterte Locale-komponenter (`LocaleRadioGroup`,
  `LocaleCheckboxGroup`, `LocaleReadMore`, etc.) fra `components/Teksthåndtering/`.
- **Aksel Design System** (`@navikt/ds-react`) – alle UI-komponenter
- **Design tokens** fra `@navikt/ds-tokens/js` – farger, breakpoints, spacing


## Code Style

### Minimal Editing

When fixing a bug or implementing a feature, change only what is necessary.
Do not rename variables, restructure working code, or refactor beyond the task at hand.
Keep diffs small and focused so they are easy to review.

## Git Workflow

<!-- TODO: Document your branching and merge strategy -->

## Boundaries

### ✅ Always

- Follow existing code patterns in the project
- Preserve existing code structure — do not reorganize or refactor beyond the task
- Validate all external input

### ⚠️ Ask First

- Changing authentication mechanisms
- Adding new dependencies
- Modifying database schema

### 🚫 Never

- Commit secrets or credentials
- Skip input validation on external boundaries
