/** Shared topology diagram markup — used by Astro component and static SVG generator */

export const topologyWidth = 980;
export const topologyHeight = 480;

/** Inner SVG content (no outer frame — added by consumer) */
export const topologyDiagramInner = `
  <rect class="panel network" x="20" y="20" width="340" height="440" rx="8"/>
  <text class="panel-title" x="190" y="44" text-anchor="middle">Network Account</text>
  <rect class="panel" x="380" y="20" width="280" height="440" rx="8"/>
  <text class="panel-title" x="520" y="44" text-anchor="middle">Dev Account</text>
  <rect class="panel" x="680" y="20" width="280" height="440" rx="8"/>
  <text class="panel-title" x="820" y="44" text-anchor="middle">Sandbox Account</text>

  <path class="link" d="M 190 98 L 190 108 L 78 108 L 78 124"/>
  <path class="link" d="M 190 98 L 190 108 L 292 108 L 292 124"/>
  <path class="link" d="M 190 98 L 194 124"/>

  <path class="link cross" d="M 432 137 L 402 137 L 402 68 L 292 68" marker-end="url(#topology-arrow-solid)"/>
  <path class="link cross" d="M 432 277 L 392 277 L 392 82 L 292 82" marker-end="url(#topology-arrow-solid)"/>
  <path class="link cross" d="M 732 137 L 702 137 L 702 68 L 292 68" marker-end="url(#topology-arrow-solid)"/>
  <path class="link cross" d="M 732 277 L 692 277 L 692 82 L 292 82" marker-end="url(#topology-arrow-solid)"/>

  <path class="link dashed" d="M 200 304 L 362 304 L 362 137 L 432 137" marker-end="url(#topology-arrow-dashed)"/>
  <path class="link dashed" d="M 380 304 L 384 304 L 384 277 L 432 277" marker-end="url(#topology-arrow-dashed)"/>
  <path class="link dashed" d="M 200 354 L 662 354 L 662 137 L 732 137" marker-end="url(#topology-arrow-dashed)"/>
  <path class="link dashed" d="M 380 354 L 672 354 L 672 277 L 732 277" marker-end="url(#topology-arrow-dashed)"/>

  <rect class="node accent" x="90" y="58" width="200" height="40" rx="6"/>
  <text class="node-label" x="190" y="82" text-anchor="middle">platform.demo.local PHZ</text>

  <rect class="node" x="32" y="124" width="92" height="34" rx="6"/>
  <text class="node-label small" x="78" y="144" text-anchor="middle">apse2 primary</text>

  <rect class="node" x="246" y="124" width="92" height="34" rx="6"/>
  <text class="node-label small" x="292" y="144" text-anchor="middle">apse2 secondary</text>

  <rect class="node" x="139" y="188" width="110" height="34" rx="6"/>
  <text class="node-label small" x="194" y="208" text-anchor="middle">ap-southeast-6</text>

  <text class="section-label" x="32" y="248">Authorizations (Phase 2a)</text>

  <rect class="node auth" x="32" y="290" width="168" height="28" rx="6"/>
  <text class="node-label small" x="116" y="308" text-anchor="middle">Auth dev apse2</text>

  <rect class="node auth" x="212" y="290" width="168" height="28" rx="6"/>
  <text class="node-label small" x="296" y="308" text-anchor="middle">Auth dev apse6</text>

  <rect class="node auth" x="32" y="340" width="168" height="28" rx="6"/>
  <text class="node-label small" x="116" y="358" text-anchor="middle">Auth sandbox apse2</text>

  <rect class="node auth" x="212" y="340" width="168" height="28" rx="6"/>
  <text class="node-label small" x="296" y="358" text-anchor="middle">Auth sandbox apse6</text>

  <rect class="node" x="432" y="120" width="176" height="34" rx="6"/>
  <text class="node-label" x="520" y="141" text-anchor="middle">VPC ap-southeast-2</text>

  <rect class="node" x="432" y="260" width="176" height="34" rx="6"/>
  <text class="node-label" x="520" y="281" text-anchor="middle">VPC ap-southeast-6</text>

  <rect class="node" x="732" y="120" width="176" height="34" rx="6"/>
  <text class="node-label" x="820" y="141" text-anchor="middle">VPC ap-southeast-2</text>

  <rect class="node" x="732" y="260" width="176" height="34" rx="6"/>
  <text class="node-label" x="820" y="281" text-anchor="middle">VPC ap-southeast-6</text>

  <text class="edge-label" x="118" y="118" text-anchor="middle">same-account</text>

  <g class="legend-item" transform="translate(190, 458)">
    <line class="legend-line" x1="-24" y1="-4" x2="24" y2="-4"/>
    <text class="legend-text" x="0" y="12" text-anchor="middle">same-account association</text>
  </g>
  <g class="legend-item" transform="translate(520, 458)">
    <line class="legend-line cross" x1="-24" y1="-4" x2="24" y2="-4" marker-end="url(#topology-arrow-solid)"/>
    <text class="legend-text" x="0" y="12" text-anchor="middle">cross-account associate (Phase 3)</text>
  </g>
  <g class="legend-item" transform="translate(820, 458)">
    <line class="legend-line dashed" x1="-24" y1="-4" x2="24" y2="-4" marker-end="url(#topology-arrow-dashed)"/>
    <text class="legend-text" x="0" y="12" text-anchor="middle">authorization (Phase 2a)</text>
  </g>
`;
