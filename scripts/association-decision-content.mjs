/** Shared association decision flowchart markup */

export const decisionWidth = 580;
export const decisionHeight = 380;

export const associationDecisionInner = `
  <rect class="node" x="190" y="20" width="200" height="36" rx="6"/>
  <text class="node-label" x="290" y="42" text-anchor="middle">Associate VPC with PHZ</text>

  <path class="link cross" d="M 290 56 L 290 68" marker-end="url(#decision-arrow)"/>

  <polygon class="diamond" points="290,68 365,108 290,148 215,108"/>
  <text class="node-label" x="290" y="104" text-anchor="middle">Same account</text>
  <text class="node-label" x="290" y="118" text-anchor="middle">as zone owner?</text>

  <path class="link cross" d="M 215 108 L 80 108 L 80 198" marker-end="url(#decision-arrow)"/>
  <text class="edge-label" x="140" y="100" text-anchor="middle">Yes</text>

  <rect class="node ok" x="20" y="198" width="120" height="56" rx="6"/>
  <text class="node-label" x="80" y="220" text-anchor="middle">AssociateVPC</text>
  <text class="node-label" x="80" y="234" text-anchor="middle">WithHostedZone</text>
  <text class="detail" x="80" y="248" text-anchor="middle">no auth</text>

  <path class="link cross" d="M 365 108 L 450 108 L 450 158" marker-end="url(#decision-arrow)"/>
  <text class="edge-label" x="400" y="100" text-anchor="middle">No</text>

  <polygon class="diamond" points="450,158 545,213 450,268 355,213"/>
  <text class="node-label small" x="450" y="204" text-anchor="middle">Auth exists</text>
  <text class="node-label small" x="450" y="217" text-anchor="middle">for vpc_id +</text>
  <text class="node-label small" x="450" y="230" text-anchor="middle">region?</text>

  <path class="link cross" d="M 355 213 L 280 213 L 280 298" marker-end="url(#decision-arrow)"/>
  <text class="edge-label" x="310" y="205" text-anchor="middle">No</text>

  <rect class="node fail" x="220" y="298" width="120" height="40" rx="6"/>
  <text class="node-label" x="280" y="322" text-anchor="middle">AccessDenied</text>

  <path class="link cross" d="M 450 268 L 450 298" marker-end="url(#decision-arrow)"/>
  <text class="edge-label" x="462" y="286" text-anchor="start">Yes</text>

  <rect class="node ok" x="390" y="298" width="120" height="52" rx="6"/>
  <text class="node-label" x="450" y="320" text-anchor="middle">AssociateVPC</text>
  <text class="node-label" x="450" y="334" text-anchor="middle">in workload acct</text>
`;
