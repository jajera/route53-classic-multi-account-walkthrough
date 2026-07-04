# route53-classic-multi-account-walkthrough

Step-by-step documentation site for deploying the [route53-multi-account-dns-demo](https://github.com/jajera/route53-multi-account-dns-demo) Terraform demo — classic Route 53 private DNS sharing across three AWS accounts and two regions.

Published at [jajera.github.io/route53-classic-multi-account-walkthrough](https://jajera.github.io/route53-classic-multi-account-walkthrough/).

## What this is / What this is not

| This repository                                       | Source demo repository                                                 |
| ----------------------------------------------------- | ---------------------------------------------------------------------- |
| Walkthrough documentation site (Astro + Starlight)    | Terraform implementation (`terraform/modules/`, `terraform/accounts/`) |
| Explains architecture, phases, verification, teardown | Where you run `terraform apply`                                        |
| Documents baseline `main`                             | Owns infrastructure state                                              |

**Run all Terraform commands from the [source demo repo](https://github.com/jajera/route53-multi-account-dns-demo) root**, not from this walkthrough repo.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run validate   # prettier + markdownlint
npm run build      # astro build (also npm test)
```

## Version alignment

This walkthrough documents source demo baseline **`main`**. When the demo repo changes stack layout, variables, or phase flow, update the matching walkthrough pages and bump the version note in [Overview](/route53-classic-multi-account-walkthrough/walkthrough/01-overview/).

## About

Classic Route 53 cross-account and multi-region private DNS using VPC association authorization — no Route 53 Profiles, AWS RAM, or orchestration scripts.
