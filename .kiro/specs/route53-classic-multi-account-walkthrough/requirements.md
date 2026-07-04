# Requirements Document: Route53 Classic Multi-Account Walkthrough

## Overview

This specification defines a documentation website that teaches deployment and operation of the external Terraform demo:

- Source demo repository: `route53-multi-account-dns-demo`
- Source version baseline: `main`
- Pattern/style baseline: `aws-event-driven-serverless-walkthrough`

This repository is documentation-only. It must not become a second infrastructure implementation.

## Product Intent

The site exists to help an engineer:

1. Understand the classic Route 53 multi-account association model.
2. Deploy the source demo safely in the right order.
3. Verify expected DNS behavior.
4. Recover from common failure modes.
5. Tear down safely and avoid unnecessary costs.

## Scope

### In Scope

- Static docs site implementation and content organization.
- Architecture explanation and visuals.
- Phase-driven operational walkthrough.
- Verification, troubleshooting, teardown guidance.
- Contributor workflow (dev, validate, build, optional deploy).

### Out of Scope

- Terraform module/account-stack implementation in this repo.
- Terraform state management in this repo.
- Runtime automation/orchestration scripts executed by this repo.

## Audience and User Stories

### Primary Audience

- Platform engineers presenting or running the demo.
- Contributors maintaining walkthrough docs.

### Core User Stories

1. As a presenter, I want a clear execution order so I can run the demo live without guesswork.
2. As an operator, I want high-confidence recovery guidance so failed steps are easy to correct.
3. As a maintainer, I want source-version alignment rules so docs stay accurate over time.

## Glossary

- **Walkthrough Site**: This repository; docs and visualization only.
- **Source Demo Repo**: `route53-multi-account-dns-demo`, where Terraform implementation lives.
- **Architecture Reference**: Conceptual explanation page(s), no operational step detail.
- **Execution Walkthrough**: Step-by-step operational page(s), including commands.
- **Version Alignment**: Explicit source version that walkthrough content was validated against.
- **Guardrail**: Instruction that prevents common failure or destructive operator behavior.

## Functional Requirements

### R1: Site Identity and Boundary Clarity

**User Story:** As a reader, I want immediate clarity on what this repo is and is not, so I run commands in the correct repository.

#### Acceptance Criteria (R1)

1. Landing content SHALL explicitly state this is a walkthrough/docs project.
2. Landing content SHALL explicitly state Terraform implementation is in the source demo repo.
3. Landing content SHALL include a direct link to the source demo repository.
4. Landing content SHALL include a concise "What this is / What this is not" section.

### R2: Information Architecture and Navigation

**User Story:** As a reader, I want predictable information architecture, so I can move quickly from concept to execution.

#### Acceptance Criteria (R2)

1. The docs IA SHALL include two top-level content groupings:
   - Walkthrough
   - Architecture
2. Navigation SHALL expose both groups at top level.
3. The walkthrough content SHALL appear in operational order:
   - Overview
   - Why classic
   - Prerequisites
   - Pre-flight
   - Deployment phases
   - Verification
   - Troubleshooting
   - Teardown
   - Glossary
4. Architecture content SHALL be separate from walkthrough operations.

### R3: Architecture Reference Quality

**User Story:** As a platform engineer, I want a presenter-grade architecture reference, so I can explain the pattern before execution.

#### Acceptance Criteria (R3)

1. Architecture content SHALL explain three accounts (`network`, `dev`, `sandbox`).
2. Architecture content SHALL explain two regions (`ap-southeast-2`, `ap-southeast-6`).
3. Architecture content SHALL cover all four association scenarios:
   - Cross-account same-region
   - Cross-account cross-region
   - Same-account same-region
   - Same-account cross-region
4. Architecture content SHALL explain cross-account two-step ownership:
   - zone owner authorization
   - VPC owner association
5. Architecture content SHALL clarify that Route 53 Profiles/RAM are excluded from this specific pattern.
6. Architecture content SHALL include at least one maintained visual (Mermaid and/or SVG).

### R4: Walkthrough Operational Accuracy

**User Story:** As an operator, I want execution steps aligned to the real source repo, so I can run without improvisation.

#### Acceptance Criteria (R4)

1. Walkthrough SHALL present deployment in phase order with dependency rationale.
2. Command snippets SHALL target paths/files that exist in the source demo repo.
3. Walkthrough SHALL include account/profile context checks before apply commands.
4. Walkthrough SHALL include explicit handoff points for shared values (`vpc_id`, `zone_id`).
5. Walkthrough SHALL include a guardrail against partial re-applies that omit required values.

### R5: Verification Coverage and Expected Outcomes

**User Story:** As a presenter, I want verification that is repeatable and explicit, so success criteria are obvious.

#### Acceptance Criteria (R5)

1. Verification SHALL include seven test perspectives (owner + associated VPC perspectives).
2. Verification SHALL include expected `dig` output for `api.platform.demo.local`.
3. Verification SHALL include optional `db.platform.demo.local` checks.
4. Verification SHALL include a fallback path when interactive SSM sessions are limited in `ap-southeast-6`.
5. Verification SHALL include propagation timing guidance after new associations.

### R6: Troubleshooting and Teardown Safety

**User Story:** As an operator, I want known failure modes and safe teardown order, so I can recover quickly and avoid blocked deletes.

#### Acceptance Criteria (R6)

1. Troubleshooting SHALL include at minimum:
   - stale authorization inputs
   - missing/incorrect `zone_id`
   - region mismatch behavior
   - SSM connectivity caveats
2. Troubleshooting SHALL include `ec2messages` caveat for `ap-southeast-6`.
3. Teardown SHALL be documented in dependency-safe order.
4. Teardown SHALL explain hosted zone delete blocking when associations remain.
5. Teardown SHALL include a NAT-cost reminder when optional NAT was enabled.

### R7: Content UX and Formatting Standards

**User Story:** As a reader, I want high-quality docs UX, so I can execute reliably during demos.

#### Acceptance Criteria (R7)

1. Command snippets SHALL use fenced shell blocks.
2. Warnings/cautions SHALL use visible callouts/admonitions.
3. Every operational section SHALL include:
   - objective
   - command(s)
   - expected result
   - recovery hint
4. Page titles and metadata SHALL be present and meaningful.

### R8: Technology and Local Contributor Workflow

**User Story:** As a contributor, I want a stable docs toolchain and clear scripts, so local edits are fast to validate.

#### Acceptance Criteria (R8)

1. Site SHALL be implemented with Astro docs patterns.
2. Repo SHALL include local scripts for:
   - development
   - validation
   - build
3. Validation SHALL include formatting and markdown linting.
4. Build artifact SHALL be static and compatible with GitHub Pages hosting.

### R9: Pattern Consistency With Reference Walkthrough

**User Story:** As a maintainer, I want structure and behavior consistent with the reference walkthrough repo, so contributor expectations are aligned.

#### Acceptance Criteria (R9)

1. Repository SHALL include docs-site directories and config files comparable to the reference pattern.
2. README SHALL include quickstart, validate, and build instructions.
3. Documentation language SHALL consistently describe this project as a walkthrough.

### R10: Source-of-Truth and Version Alignment

**User Story:** As a maintainer, I want explicit source-version alignment, so content drift is visible and manageable.

#### Acceptance Criteria (R10)

1. Walkthrough SHALL declare the source demo reference version it documents.
2. Walkthrough SHALL include an update checklist for source-version changes.
3. Command snippets SHALL be reviewed and updated when source repo layout changes.

### R11: Non-Functional Quality Requirements

**User Story:** As a contributor and reader, I want predictable quality constraints, so the site remains reliable and easy to maintain.

#### Acceptance Criteria (R11)

1. Documentation structure SHALL favor single-purpose pages over oversized mixed pages.
2. Naming conventions SHALL be consistent across files, nav labels, and headings.
3. Build and lint steps SHALL complete without errors before merge-ready state.
4. Site content SHALL avoid ambiguous ownership language about where IaC lives.

### R12: Explicit Exclusion Guardrails

**User Story:** As a maintainer, I want explicit exclusion rules, so future changes do not regress scope.

#### Acceptance Criteria (R12)

1. This spec SHALL not require creating Terraform resource code in this repo.
2. This spec SHALL not require running demo deployment from CI in this repo.
3. This spec SHALL not require orchestration scripts that replace manual walkthrough operations.

## Release Readiness Criteria

The walkthrough spec is ready when all conditions are true:

1. Requirements R1-R12 are represented in design and tasks with traceability.
2. No requirement implies this repo owns Terraform implementation.
3. A new maintainer can infer exactly what to build from the requirements alone.
