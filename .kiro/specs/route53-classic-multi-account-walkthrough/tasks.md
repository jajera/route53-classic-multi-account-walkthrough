# Implementation Plan: Route53 Classic Multi-Account Walkthrough

## Overview

This plan implements a documentation site for `route53-multi-account-dns-demo` baseline `main`, following the structural quality bar of `aws-event-driven-serverless-walkthrough`.

The plan is deliberately docs-only. No Terraform implementation tasks are included in this repository.

## Workstream 1: Project Foundation

- [ ] 1. Create baseline docs-site structure
  - [ ] 1.1 Create directories: `src/`, `src/content/docs/`, `src/pages/`, `public/`, `public/images/`
  - [ ] 1.2 Add root config files: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/content.config.ts`, `src/env.d.ts`
  - [ ] 1.3 Add quality configs: `.prettierrc`, `.prettierignore`, `.markdownlint.json`, `.gitignore`, `.nvmrc`
  - _Requirements: R8, R9, R11_

- [ ] 2. Add script contracts
  - [ ] 2.1 Define `npm run dev`
  - [ ] 2.2 Define `npm run validate` (format + markdown lint)
  - [ ] 2.3 Define `npm run build` (static build)
  - [ ] 2.4 Optionally define `npm run test` alias to build for CI parity
  - _Requirements: R8, R11_

## Workstream 2: Navigation and Content Topology

- [ ] 3. Implement sidebar and nav model
  - [ ] 3.1 Configure top-level `Home`, `Walkthrough`, `Architecture`
  - [ ] 3.2 Ensure each sidebar entry resolves to one file
  - [ ] 3.3 Confirm labels match filenames and intent
  - _Requirements: R2, R11_

- [ ] 4. Create docs content skeleton
  - [ ] 4.1 Add `src/content/docs/index.mdx`
  - [ ] 4.2 Add `walkthrough/01-overview.mdx` through `walkthrough/09-glossary.mdx`
  - [ ] 4.3 Add `architecture/01-system-overview.mdx` through `architecture/04-security-boundaries.mdx`
  - _Requirements: R2, R3, R4, R5, R6_

## Workstream 3: Identity and Boundary Content

- [ ] 5. Author landing page identity content
  - [ ] 5.1 Add clear statement: "walkthrough/docs site"
  - [ ] 5.2 Add clear statement: "Terraform implementation is in source demo repo"
  - [ ] 5.3 Add source repo link and version baseline (`main`)
  - [ ] 5.4 Add "What this is / What this is not" section
  - _Requirements: R1, R10, R12_

## Workstream 4: Architecture Content

- [ ] 6. Author architecture narrative
  - [ ] 6.1 Document account model (`network`, `dev`, `sandbox`)
  - [ ] 6.2 Document region model (`ap-southeast-2`, `ap-southeast-6`)
  - [ ] 6.3 Document four association scenarios
  - [ ] 6.4 Document cross-account two-step operations
  - [ ] 6.5 Document boundary: no Profiles/RAM in this pattern
  - _Requirements: R3_

- [ ] 7. Add architecture visuals
  - [ ] 7.1 Add at least one overview visual (Mermaid or SVG)
  - [ ] 7.2 Add scenario-level visual for association patterns
  - [ ] 7.3 Add DNS resolution path visual
  - _Requirements: R3, R7_

## Workstream 5: Walkthrough Operational Content

- [ ] 8. Author operational walkthrough sections
  - [ ] 8.1 Overview and why-classic narrative
  - [ ] 8.2 Prerequisites and pre-flight checks
  - [ ] 8.3 Deployment phases with explicit ordering and dependencies
  - [ ] 8.4 Verification workflow with expected outputs
  - [ ] 8.5 Troubleshooting matrix
  - [ ] 8.6 Teardown with dependency-safe sequence
  - [ ] 8.7 Glossary
  - _Requirements: R2, R4, R5, R6_

- [ ] 9. Add command and guardrail quality
  - [ ] 9.1 Ensure all command snippets are fenced shell blocks
  - [ ] 9.2 Ensure snippets reference source demo paths, not local Terraform paths in this repo
  - [ ] 9.3 Add account/profile context checks before action commands
  - [ ] 9.4 Add `vpc_id` and `zone_id` handoff guidance
  - [ ] 9.5 Add explicit warning against partial re-apply patterns
  - _Requirements: R4, R7, R10, R12_

- [ ] 10. Complete verification and regional caveat guidance
  - [ ] 10.1 Document seven verification perspectives
  - [ ] 10.2 Add expected `dig` result for `api.platform.demo.local`
  - [ ] 10.3 Add optional `db.platform.demo.local` checks
  - [ ] 10.4 Add `ap-southeast-6` fallback path for limited interactive SSM
  - [ ] 10.5 Add propagation delay expectation note
  - _Requirements: R5, R6_

## Workstream 6: UX and Consistency Hardening

- [ ] 11. Apply callout taxonomy across pages
  - [ ] 11.1 Warnings for destructive/risky actions
  - [ ] 11.2 Cautions for sequencing pitfalls
  - [ ] 11.3 Notes for contextual caveats
  - _Requirements: R7_

- [ ] 12. Normalize naming and wording
  - [ ] 12.1 Ensure "walkthrough" terminology is consistent
  - [ ] 12.2 Remove any wording implying this repo owns IaC
  - [ ] 12.3 Ensure headings and file names are consistent and scannable
  - _Requirements: R1, R9, R11_

## Workstream 7: Contributor and Release Readiness

- [ ] 13. Update README
  - [ ] 13.1 Add project identity and boundary statement
  - [ ] 13.2 Add local `dev`, `validate`, `build` commands
  - [ ] 13.3 Add links to walkthrough and architecture docs
  - [ ] 13.4 Add source-version alignment note
  - _Requirements: R1, R8, R9, R10_

- [ ] 14. Add CI/CD workflows
  - [ ] 14.1 Add `ci.yml` for validate + build on PR
  - [ ] 14.2 Add `deploy.yml` for build and publish on main/manual trigger
  - [ ] 14.3 Ensure CI excludes external demo deployment execution
  - _Requirements: R8, R11, R12_

- [ ] 15. Final acceptance checklist
  - [ ] 15.1 `npm run validate` passes
  - [ ] 15.2 `npm run build` passes
  - [ ] 15.3 Manual content QA against R1-R12
  - [ ] 15.4 Confirm no Terraform implementation files were added to this repo
  - _Requirements: R1-R12_

## Checkpoints

- [ ] Checkpoint A (after Task 4): topology and navigation complete.
- [ ] Checkpoint B (after Task 10): content-complete walkthrough and architecture.
- [ ] Checkpoint C (after Task 15): release-ready docs quality and boundary compliance.

## Notes

1. This implementation plan intentionally excludes building Terraform resources.
2. All runnable infrastructure commands in docs target the external source repo.
3. If the source repo changes, update content and version-alignment notes before release.

## Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2"] },
    { "id": 1, "tasks": ["3", "4", "5"] },
    { "id": 2, "tasks": ["6", "7"] },
    { "id": 3, "tasks": ["8", "9", "10"] },
    { "id": 4, "tasks": ["11", "12", "13"] },
    { "id": 5, "tasks": ["14", "15"] }
  ]
}
```
