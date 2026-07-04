# Design Document: Route53 Classic Multi-Account Walkthrough

## Overview

This design defines a documentation site that explains and operationalizes the external demo repository `route53-multi-account-dns-demo` at baseline `main`.

The solution is intentionally docs-only:

1. It organizes architecture and operational knowledge.
2. It provides guardrailed, copy-pasteable execution guidance.
3. It does not implement Terraform resources in this repository.

The structure and quality target mirrors the style used in `aws-event-driven-serverless-walkthrough`.

## Design Decisions

1. **Astro docs architecture** for static build and GitHub Pages compatibility.
2. **Directory-per-content-domain** to keep operational flow and architecture references separate.
3. **Single-purpose pages** to reduce maintenance risk and improve navigation scanning.
4. **Source-version declaration** in docs to control drift against the external demo.
5. **Callout-driven safety UX** for risky or easy-to-misapply commands.

## System Architecture

The site is a static content system with validated build and optional CI/CD deploy.

```text
┌───────────────────────────────────────────────────────┐
│  Authoring Layer                                      │
│  - src/content/docs/**/*.mdx                          │
│  - public/images/*                                    │
└───────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────┐
│  Composition Layer                                    │
│  - astro.config.mjs (sidebar/nav/site metadata)       │
│  - src/content.config.ts (docs schema)                │
│  - layout/components for callouts and commands        │
└───────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────┐
│  Validation + Build Layer                             │
│  - npm run validate                                   │
│  - npm run build                                      │
│  - optional CI and Pages deployment workflows         │
└───────────────────────────────────────────────────────┘
```

## Repository Structure (Target State)

```text
.
├── .kiro/specs/route53-classic-multi-account-walkthrough/
│   ├── .config.kiro
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── architecture-overview.svg
│       ├── association-scenarios.svg
│       └── dns-resolution-path.svg
├── src/
│   ├── components/
│   │   ├── Callout.astro
│   │   └── CommandBlock.astro
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx
│   │       ├── walkthrough/
│   │       │   ├── 01-overview.mdx
│   │       │   ├── 02-why-classic.mdx
│   │       │   ├── 03-prerequisites.mdx
│   │       │   ├── 04-preflight.mdx
│   │       │   ├── 05-phases.mdx
│   │       │   ├── 06-verification.mdx
│   │       │   ├── 07-troubleshooting.mdx
│   │       │   ├── 08-teardown.mdx
│   │       │   └── 09-glossary.mdx
│   │       └── architecture/
│   │           ├── 01-system-overview.mdx
│   │           ├── 02-association-scenarios.mdx
│   │           ├── 03-dns-resolution-path.mdx
│   │           └── 04-security-boundaries.mdx
│   ├── content.config.ts
│   ├── env.d.ts
│   ├── layouts/
│   │   └── DocsLayout.astro
│   └── pages/
│       └── index.astro
├── .gitignore
├── .markdownlint.json
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── LICENSE
├── package.json
├── package-lock.json
├── astro.config.mjs
├── tsconfig.json
└── README.md
```

## Components and Interfaces

### Root Configuration Contracts

| File                 | Contract                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| `package.json`       | Defines scripts: `dev`, `validate`, `build`, and optional `test` alias for build |
| `astro.config.mjs`   | Defines site metadata, base path, and sidebar structure                          |
| `tsconfig.json`      | Uses strict Astro config and includes docs sources                               |
| `.markdownlint.json` | Enforces markdown quality for MDX docs                                           |
| `.prettierrc`        | Enforces formatting consistency across docs and config files                     |
| `.nvmrc`             | Pins local Node major version for contributor consistency                        |

### Content Collection Contract

`src/content.config.ts` SHALL define a docs collection requiring at minimum:

1. `title` (non-empty)
2. `description` (non-empty)

Optional fields can include tags or section metadata, but required fields must remain minimal and stable.

### Sidebar Contract (`astro.config.mjs`)

Target sidebar structure:

1. `Home` (link `/`)
2. `Walkthrough` group:
   - overview, why classic, prerequisites, preflight, phases, verification, troubleshooting, teardown, glossary
3. `Architecture` group:
   - system overview, association scenarios, DNS resolution path, security boundaries

Sidebar labels must map one-to-one to files in `src/content/docs`.

## Content Design

### Page Responsibilities

| Page             | Responsibility                                         |
| ---------------- | ------------------------------------------------------ |
| `index.mdx`      | Identity and start points for readers                  |
| `walkthrough/*`  | Operational execution flow and safety guidance         |
| `architecture/*` | Conceptual explanation and presenter-facing references |

### Walkthrough Page Contract

Every walkthrough page SHOULD include:

1. A one-paragraph objective.
2. A prerequisite/context note if commands are present.
3. Command block(s) with shell fences.
4. Expected result signals.
5. At least one recovery hint when failure is likely.

### Command Block Contract

Command blocks should be modeled as:

```shell
# Context: expected profile/account/region
export AWS_PROFILE=...
aws sts get-caller-identity

# Action
terraform ...
```

Each command block must be accompanied by:

1. Why this step exists.
2. What success looks like.
3. What to check first when it fails.

### Safety Callout Taxonomy

Use consistent callout types:

1. **Warning**: possible destructive or misleading operation.
2. **Caution**: non-destructive but error-prone sequencing risk.
3. **Note**: contextual clarification (for example, regional caveat).

## Source-of-Truth and Drift Control

### Source Alignment Rule

Every operational instruction in walkthrough pages must trace back to the external demo repository baseline (`main`) unless explicitly marked as a post-baseline update.

### Version Alignment Section

Walkthrough content SHALL include a short section:

1. current source baseline,
2. what changed since baseline (if any),
3. how to revalidate command snippets when source structure changes.

## Build, Validation, and Deployment Design

### Local Build Pipeline

```bash
npm run validate
npm run build
```

`validate` covers formatting and markdown lint checks; `build` confirms static site generation and navigation/content wiring.

### CI and Deployment Workflows

| Workflow     | Trigger                        | Expected behavior                                  |
| ------------ | ------------------------------ | -------------------------------------------------- |
| `ci.yml`     | Pull requests                  | Runs validate + build and blocks merge on failure  |
| `deploy.yml` | Push to main / manual dispatch | Runs validation/build then publishes static output |

CI must validate docs quality and build health; it must not run external demo deployment commands.

## Error Handling and Risk Mitigation

| Risk                                  | Mitigation                                                      |
| ------------------------------------- | --------------------------------------------------------------- |
| Repo identity confusion (docs vs IaC) | Landing-page boundary messaging + repeated source links         |
| Command drift from source repo        | Version-alignment section + update checklist                    |
| Incorrect operator sequencing         | Phase ordering plus pre-flight and guardrail callouts           |
| Regional SSM caveat confusion         | Explicit troubleshooting section and fallback verification path |
| Unsafe teardown attempts              | Ordered teardown with hosted-zone association warning           |

## Validation Strategy

### Documentation Quality Validation

1. Lint and formatting pass.
2. Static build pass.
3. Manual content review for phase order and command readability.

### Walkthrough Integrity Validation

1. All required sections exist in order.
2. Commands reference the source demo repository, not local Terraform in this repo.
3. Troubleshooting includes required failure modes.
4. Teardown ordering is explicit and dependency-safe.

## Requirement Traceability

| Requirement | Design Coverage                                   |
| ----------- | ------------------------------------------------- |
| R1          | Landing identity and repo boundary messaging      |
| R2          | IA, file structure, sidebar contract              |
| R3          | Architecture pages and visuals                    |
| R4          | Walkthrough command contract and phase sequencing |
| R5          | Verification section/page contract                |
| R6          | Troubleshooting + teardown design patterns        |
| R7          | Callout taxonomy and command formatting rules     |
| R8          | Tooling and build pipeline contracts              |
| R9          | Repo structure parity and naming conventions      |
| R10         | Source-of-truth alignment and drift control       |
| R11         | Quality and maintainability constraints           |
| R12         | Explicit CI and scope guardrails                  |
