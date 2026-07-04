import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { wrapSvg } from "./diagram-styles.mjs";
import {
  topologyWidth,
  topologyHeight,
  topologyDiagramInner,
} from "./topology-diagram-content.mjs";
import {
  decisionWidth,
  decisionHeight,
  associationDecisionInner,
} from "./association-decision-content.mjs";
import {
  verificationWidth,
  verificationHeight,
  verificationDiagramInner,
} from "./verification-diagram-content.mjs";

const publicDir = join(process.cwd(), "public");

const topologyExtraCss = `
  .section-label { fill: #94a3b8; font-family: sans-serif; font-size: 11px; font-weight: 600; }
  .legend-line { stroke: #64748b; stroke-width: 1.5; }
  .legend-line.cross { stroke: #7B68EE; }
  .legend-line.dashed { stroke: #94a3b8; stroke-dasharray: 5 4; }
  .legend-text { fill: #94a3b8; font-family: sans-serif; font-size: 10px; }
  @media (prefers-color-scheme: light) {
    .section-label, .legend-text { fill: #4b5563; }
    .legend-line { stroke: #9ca3af; }
    .legend-line.cross { stroke: #6d5f95; }
    .legend-line.dashed { stroke: #6b7280; }
  }
`;

const topology = wrapSvg({
  width: topologyWidth,
  height: topologyHeight,
  ariaLabel:
    "Network account Platform_Zone with same-account VPC associations and cross-account authorizations to dev and sandbox VPCs",
  extraCss: topologyExtraCss,
  body: topologyDiagramInner
    .replaceAll("url(#topology-arrow-solid)", "url(#arrow-solid)")
    .replaceAll("url(#topology-arrow-dashed)", "url(#arrow-dashed)"),
});

const moduleMap = wrapSvg({
  width: 560,
  height: 310,
  ariaLabel:
    "Terraform directory layout: modules and account stacks in the source demo repository",
  body: `
  <text class="dir" x="24" y="36">terraform/</text>
  <path class="tree" d="M 24 44 L 24 58 L 48 58"/>
  <text class="dir" x="48" y="62">modules/</text>
  <path class="tree" d="M 48 70 L 48 84 L 72 84"/>
  <text class="file" x="72" y="88">vpc/</text>
  <text class="comment" x="130" y="88">DNS-enabled VPC, subnets, SSM, NAT</text>
  <path class="tree" d="M 48 98 L 48 112 L 72 112"/>
  <text class="file" x="72" y="116">private-hosted-zone/</text>
  <text class="comment" x="220" y="116">PHZ, records, primary association</text>
  <path class="tree" d="M 48 126 L 48 140 L 72 140"/>
  <text class="file" x="72" y="144">cross-account-auth/</text>
  <text class="comment" x="220" y="144">VPC association authorizations</text>
  <path class="tree" d="M 48 154 L 48 168 L 72 168"/>
  <text class="file" x="72" y="172">workload-stack/</text>
  <text class="comment" x="200" y="172">VPC + association + test-ec2</text>
  <path class="tree" d="M 48 182 L 48 196 L 72 196"/>
  <text class="file" x="72" y="200">test-ec2/</text>
  <text class="comment" x="150" y="200">Minimal EC2 with SSM profile</text>
  <path class="tree" d="M 24 214 L 24 228 L 48 228"/>
  <text class="dir" x="48" y="232">accounts/</text>
  <path class="tree" d="M 48 240 L 48 254 L 72 254"/>
  <text class="file" x="72" y="258">network/</text>
  <text class="comment" x="150" y="258">PHZ, auth, secondary assoc, test-ec2</text>
  <path class="tree" d="M 48 268 L 48 282 L 72 282"/>
  <text class="file" x="72" y="286">network-apse6/</text>
  <text class="comment" x="190" y="286">Same-account cross-region</text>
  <path class="tree" d="M 48 296 L 48 296 L 72 296"/>
  <text class="file" x="72" y="300">dev-*, sandbox-*</text>
  <text class="comment" x="210" y="300">Cross-account stacks</text>`,
});

const decision = wrapSvg({
  width: decisionWidth,
  height: decisionHeight,
  ariaLabel:
    "Decision flow for VPC association authorization: same-account skips auth, cross-account requires authorization",
  body: associationDecisionInner.replaceAll(
    "url(#decision-arrow)",
    "url(#arrow-solid)",
  ),
});

const dns = wrapSvg({
  width: 780,
  height: 120,
  ariaLabel:
    "DNS resolution path from Test_EC2 through VPC resolver and Route 53 to Platform_Zone A records",
  body: `
  <rect class="node" x="20" y="36" width="118" height="48" rx="6"/>
  <text class="node-label" x="79" y="58" text-anchor="middle">Test_EC2</text>
  <text class="detail" x="79" y="72" text-anchor="middle">any VPC</text>
  <rect class="node" x="168" y="36" width="132" height="48" rx="6"/>
  <text class="node-label" x="234" y="58" text-anchor="middle">VPC DNS Resolver</text>
  <text class="detail" x="234" y="72" text-anchor="middle">AmazonProvidedDNS</text>
  <rect class="node" x="330" y="36" width="118" height="48" rx="6"/>
  <text class="node-label" x="389" y="64" text-anchor="middle">Route 53 Resolver</text>
  <rect class="node accent" x="478" y="36" width="132" height="48" rx="6"/>
  <text class="node-label" x="544" y="58" text-anchor="middle">Platform_Zone</text>
  <text class="detail" x="544" y="72" text-anchor="middle">platform.demo.local</text>
  <rect class="node" x="640" y="36" width="120" height="48" rx="6"/>
  <text class="node-label" x="700" y="58" text-anchor="middle">A records</text>
  <text class="detail" x="700" y="72" text-anchor="middle">api / db → 10.0.x.x</text>
  <path class="link cross" d="M 138 60 L 168 60" marker-end="url(#arrow-solid)"/>
  <path class="link cross" d="M 300 60 L 330 60" marker-end="url(#arrow-solid)"/>
  <path class="link cross" d="M 448 60 L 478 60" marker-end="url(#arrow-solid)"/>
  <path class="link cross" d="M 610 60 L 640 60" marker-end="url(#arrow-solid)"/>
  <text class="edge-label" x="153" y="52" text-anchor="middle">dig query</text>`,
});

const verificationExtraCss = `
  .region-label { fill: #94a3b8; font-family: sans-serif; font-size: 10px; font-weight: 600; }
  .node.ec2 { stroke: #7B68EE; stroke-opacity: 0.55; }
  .record { fill: #94a3b8; font-family: ui-monospace, monospace; font-size: 9px; }
  .link.query { stroke: #7B68EE; stroke-opacity: 0.65; stroke-dasharray: 4 3; }
  .test-badge { fill: #7B68EE; }
  .test-num { fill: #0f172a; font-family: sans-serif; font-size: 9px; font-weight: 700; }
  .result-bar { fill: #243040; stroke: #7B68EE; stroke-opacity: 0.45; stroke-width: 1.5; }
  .result-title { fill: #94a3b8; font-family: sans-serif; font-size: 11px; font-weight: 600; }
  .result-query { fill: #f4f1f8; font-family: ui-monospace, monospace; font-size: 12px; }
  .result-arrow { fill: #7B68EE; font-family: sans-serif; font-size: 14px; font-weight: 600; }
  .result-ip { fill: #b8a9e8; font-family: ui-monospace, monospace; font-size: 13px; font-weight: 600; }
  @media (prefers-color-scheme: light) {
    .region-label, .result-title, .record { fill: #4b5563; }
    .node.ec2 { stroke: #6d5f95; }
    .link.query { stroke: #6d5f95; }
    .test-badge { fill: #6d5f95; }
    .test-num { fill: #f8fafc; }
    .result-bar { fill: #eef1f5; stroke: #6d5f95; }
    .result-query { fill: #1f2937; }
    .result-arrow { fill: #6d5f95; }
    .result-ip { fill: #5b4d8a; }
  }
`;

const verification = wrapSvg({
  width: verificationWidth,
  height: verificationHeight,
  ariaLabel:
    "Seven Test EC2 instances across three accounts and two regions all resolve api.platform.demo.local to 10.0.1.10",
  extraCss: verificationExtraCss,
  body: verificationDiagramInner.replaceAll(
    "url(#verification-arrow)",
    "url(#arrow-solid)",
  ),
});

for (const [name, svg] of [
  ["topology-diagram.svg", topology],
  ["terraform-module-map-diagram.svg", moduleMap],
  ["association-decision-diagram.svg", decision],
  ["dns-resolution-diagram.svg", dns],
  ["verification-diagram.svg", verification],
]) {
  const out = join(publicDir, name);
  writeFileSync(out, svg);
  console.log(`Wrote ${out}`);
}
