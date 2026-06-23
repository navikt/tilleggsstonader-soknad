# Copilot Instructions for tilleggsstonader-soknad

<!-- This file captures repository-specific context.
     Nav-wide language and framework conventions are provided by installed Copilot instructions. -->

## Repository Overview

<!-- TODO: Describe what this application does, who uses it, and key architecture decisions -->

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

## Minimal Editing

When fixing a bug or implementing a feature, change only what is necessary.
Do not rename variables, restructure working code, or refactor beyond the task at hand.
Keep diffs small and focused so they are easy to review.
