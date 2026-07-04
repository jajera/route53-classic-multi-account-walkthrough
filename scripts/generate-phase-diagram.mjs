import { writeFileSync } from "node:fs";
import { join } from "node:path";

const svgOut = join(process.cwd(), "public/phase-diagram.svg");

const width = 880;
const bottomPad = 20;
const height = 200 + bottomPad;
const frameHeight = height - 2;

const phases = [
  {
    id: "p1",
    x: 24,
    y: 82,
    w: 200,
    h: 70,
    title: "Phase 1",
    desc: "All 6 stacks: VPC only",
  },
  {
    id: "p2a",
    x: 244,
    y: 82,
    w: 200,
    h: 70,
    title: "Phase 2a",
    desc: "network: PHZ + auth + EC2",
  },
  {
    id: "p2b",
    x: 660,
    y: 24,
    w: 200,
    h: 70,
    title: "Phase 2b",
    desc: "network-apse6: association",
  },
  {
    id: "p3",
    x: 660,
    y: 130,
    w: 200,
    h: 70,
    title: "Phase 3",
    desc: "4 workload stacks",
  },
];

function box(p) {
  const titleY = p.y + 30;
  const descY = p.y + 50;
  return `<rect class="phase-box" x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="8"/>
  <text class="phase-title" x="${p.x + p.w / 2}" y="${titleY}" text-anchor="middle">${p.title}</text>
  <text class="phase-desc" x="${p.x + p.w / 2}" y="${descY}" text-anchor="middle">${p.desc}</text>`;
}

function arrow(d) {
  return `<path class="phase-arrow" d="${d}" marker-end="url(#phase-arrowhead)"/>`;
}

const p1 = phases[0];
const p2a = phases[1];
const p2b = phases[2];
const p3 = phases[3];

const p1Out = p1.x + p1.w;
const p2aIn = p2a.x;
const p2aOut = p2a.x + p2a.w;
const busX = 540;
const p2aMidY = p2a.y + p2a.h / 2;
const p2bIn = p2b.x;
const p2bMidY = p2b.y + p2b.h / 2;
const p3In = p3.x;
const p3MidY = p3.y + p3.h / 2;

const arrows = [
  arrow(`M ${p1Out} ${p1.y + p1.h / 2} L ${p2aIn} ${p2aMidY}`),
  arrow(
    `M ${p2aOut} ${p2aMidY} L ${busX} ${p2aMidY} L ${busX} ${p2bMidY} L ${p2bIn} ${p2bMidY}`,
  ),
  arrow(`M ${busX} ${p2aMidY} L ${busX} ${p3MidY} L ${p3In} ${p3MidY}`),
].join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="Phased deployment: Phase 1 to Phase 2a, then Phase 2b and Phase 3 in parallel">
  <defs>
    <marker id="phase-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <polygon class="phase-arrow-head" points="0 0, 8 4, 0 8"/>
    </marker>
    <style>
      .diagram-frame { fill: #1e2836; stroke: #3d4f63; stroke-width: 1.5; }
      .phase-box { fill: #243040; stroke: #3d4f63; stroke-width: 1.5; }
      .phase-title { fill: #f4f1f8; font-family: sans-serif; font-size: 14px; font-weight: 600; }
      .phase-desc { fill: #94a3b8; font-family: sans-serif; font-size: 12px; }
      .phase-arrow { stroke: #7B68EE; stroke-width: 1.5; fill: none; }
      .phase-arrow-head { fill: #7B68EE; }
      @media (prefers-color-scheme: light) {
        .diagram-frame { fill: #f8fafc; stroke: #c5cdd6; }
        .phase-box { fill: #eef1f5; stroke: #c5cdd6; }
        .phase-title { fill: #1f2937; }
        .phase-desc { fill: #4b5563; }
        .phase-arrow { stroke: #6d5f95; }
        .phase-arrow-head { fill: #6d5f95; }
      }
    </style>
  </defs>
  <rect class="diagram-frame" x="1" y="1" width="878" height="${frameHeight}" rx="10"/>
  ${arrows}
  ${phases.map(box).join("\n")}
</svg>`;

writeFileSync(svgOut, svg);
console.log(`Wrote ${svgOut}`);
