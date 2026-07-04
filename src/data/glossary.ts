export const glossary: Record<string, string> = {
  route53:
    "Amazon Route 53 — hosts the shared Platform_Zone; classic VPC association authorization lets workload VPCs resolve the same private records.",
  phz: "Private Hosted Zone — resolves DNS only from associated VPCs. This demo uses one authoritative PHZ in the network account.",
  "platform-zone":
    "Shared private hosted zone `platform.demo.local` in the Network_Account — the only place `api` and `db` records are defined.",
  "network-account":
    "AWS account that owns Platform_Zone, DNS records, and cross-account VPC_Association_Authorization resources.",
  "workload-account":
    "Dev or sandbox AWS account — creates VPC_Association to the shared zone after network authorization.",
  "demo-domain":
    "Base domain (`demo.local`); all shared records live only in the Network_Account PHZ.",
  "vpc-association-authorization":
    "CreateVPCAssociationAuthorization — network account permits a specific VPC (id + region) in another account to associate with the PHZ.",
  "vpc-association":
    "AssociateVPCWithHostedZone — workload account links its VPC to an authorized private hosted zone so the VPC resolver can query shared records.",
  "authorization-specificity":
    "Each authorization binds to exact `vpc_id` and `vpc_region` — recreated VPCs need re-authorization in Phase 2a.",
  "cross-account-sharing":
    "Dev and sandbox VPCs in separate AWS accounts associate with one network-owned PHZ after explicit authorization.",
  "cross-region-sharing":
    "VPCs in ap-southeast-6 associate with a PHZ in ap-southeast-2 — Route 53 resolves shared records across regions from one zone.",
  "cross-stack-handoff":
    "Manual passing of Phase 1 `vpc_id` outputs and Phase 2a `zone_id` into later stacks via `terraform.tfvars`.",
  "association-scenario":
    "One of four demo paths: cross-account same-region, cross-account cross-region, same-account cross-region, or same-account same-region.",
  "feature-flag":
    "Boolean variables (`enable_phz`, `enable_zone_association`, etc.) that gate phased deploy steps in each stack.",
  "test-ec2":
    "One minimal EC2 per stack (seven total) for in-VPC DNS checks via SSM Session Manager and `dig`.",
  "ssm-vpc-endpoints":
    "Interface endpoints for `ssm`, `ssmmessages`, and `ec2messages` — required for Session Manager in private subnets.",
  "nat-gateway":
    "Optional internet egress for private subnets on `*-apse6` stacks when full SSM shell access is needed.",
  "regional-service-gap":
    "A region lacks a service for full verification — e.g. `ec2messages` may be unavailable in ap-southeast-6.",
  "route53-profiles":
    "Centralised Route 53 association lifecycle — alternative to classic authorization; not used in this walkthrough.",
  "aws-ram":
    "AWS Resource Access Manager — can share hosted zones; not part of this classic pattern.",
  terraform:
    "HashiCorp Terraform — six account stacks in the source demo repo. Phased apply creates authorizations before workload associations.",
  "demo-repo":
    "route53-multi-account-dns-demo — Terraform implementation for this walkthrough.",
};
