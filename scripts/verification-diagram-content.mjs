/** Shared verification diagram — seven Test EC2 instances, one PHZ answer */

export const verificationWidth = 980;
export const verificationHeight = 520;

export const verificationDiagramInner = `
  <rect class="panel network" x="20" y="20" width="340" height="400" rx="8"/>
  <text class="panel-title" x="190" y="44" text-anchor="middle">Network Account</text>
  <rect class="panel" x="380" y="20" width="280" height="400" rx="8"/>
  <text class="panel-title" x="520" y="44" text-anchor="middle">Dev Account</text>
  <rect class="panel" x="680" y="20" width="280" height="400" rx="8"/>
  <text class="panel-title" x="820" y="44" text-anchor="middle">Sandbox Account</text>

  <path class="link query" d="M 92 148 L 92 112 L 190 112 L 190 100" marker-end="url(#verification-arrow)"/>
  <path class="link query" d="M 260 148 L 260 112 L 190 112"/>
  <path class="link query" d="M 180 308 L 180 104 L 190 104"/>
  <path class="link query" d="M 400 152 L 368 152 L 368 98 L 292 98 L 292 100" marker-end="url(#verification-arrow)"/>
  <path class="link query" d="M 400 312 L 362 312 L 362 96 L 292 96"/>
  <path class="link query" d="M 700 152 L 668 152 L 668 94 L 292 94"/>
  <path class="link query" d="M 700 312 L 662 312 L 662 92 L 292 92"/>

  <rect class="node accent" x="90" y="56" width="200" height="44" rx="6"/>
  <text class="node-label" x="190" y="76" text-anchor="middle">Platform_Zone</text>
  <text class="record" x="190" y="92" text-anchor="middle">api.platform.demo.local → 10.0.1.10</text>

  <text class="region-label" x="32" y="132">ap-southeast-2</text>
  <text class="region-label" x="32" y="292">ap-southeast-6</text>
  <text class="region-label" x="392" y="116">ap-southeast-2</text>
  <text class="region-label" x="392" y="276">ap-southeast-6</text>
  <text class="region-label" x="692" y="116">ap-southeast-2</text>
  <text class="region-label" x="692" y="276">ap-southeast-6</text>

  <rect class="node ec2" x="32" y="148" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="46" cy="162" r="10"/>
  <text class="test-num" x="46" y="166" text-anchor="middle">1</text>
  <text class="node-label small" x="92" y="170" text-anchor="middle">Test EC2</text>
  <text class="detail" x="92" y="184" text-anchor="middle">network primary</text>

  <rect class="node ec2" x="200" y="148" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="214" cy="162" r="10"/>
  <text class="test-num" x="214" y="166" text-anchor="middle">2</text>
  <text class="node-label small" x="260" y="170" text-anchor="middle">Test EC2</text>
  <text class="detail" x="260" y="184" text-anchor="middle">network secondary</text>

  <rect class="node ec2" x="120" y="308" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="134" cy="322" r="10"/>
  <text class="test-num" x="134" y="326" text-anchor="middle">3</text>
  <text class="node-label small" x="180" y="330" text-anchor="middle">Test EC2</text>
  <text class="detail" x="180" y="344" text-anchor="middle">network-apse6</text>

  <rect class="node ec2" x="400" y="128" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="414" cy="142" r="10"/>
  <text class="test-num" x="414" y="146" text-anchor="middle">4</text>
  <text class="node-label small" x="460" y="150" text-anchor="middle">Test EC2</text>
  <text class="detail" x="460" y="164" text-anchor="middle">dev-apse2</text>

  <rect class="node ec2" x="400" y="288" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="414" cy="302" r="10"/>
  <text class="test-num" x="414" y="306" text-anchor="middle">5</text>
  <text class="node-label small" x="460" y="310" text-anchor="middle">Test EC2</text>
  <text class="detail" x="460" y="324" text-anchor="middle">dev-apse6</text>

  <rect class="node ec2" x="700" y="128" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="714" cy="142" r="10"/>
  <text class="test-num" x="714" y="146" text-anchor="middle">6</text>
  <text class="node-label small" x="760" y="150" text-anchor="middle">Test EC2</text>
  <text class="detail" x="760" y="164" text-anchor="middle">sandbox-apse2</text>

  <rect class="node ec2" x="700" y="288" width="120" height="48" rx="6"/>
  <circle class="test-badge" cx="714" cy="302" r="10"/>
  <text class="test-num" x="714" y="306" text-anchor="middle">7</text>
  <text class="node-label small" x="760" y="310" text-anchor="middle">Test EC2</text>
  <text class="detail" x="760" y="324" text-anchor="middle">sandbox-apse6</text>

  <rect class="result-bar" x="32" y="432" width="916" height="72" rx="8"/>
  <text class="result-title" x="490" y="456" text-anchor="middle">Expected from every Test EC2 (Tests 1–7)</text>
  <text x="490" y="482" text-anchor="middle">
    <tspan class="result-query">dig +short api.platform.demo.local</tspan>
    <tspan class="result-arrow"> → </tspan>
    <tspan class="result-ip">10.0.1.10</tspan>
  </text>
`;
