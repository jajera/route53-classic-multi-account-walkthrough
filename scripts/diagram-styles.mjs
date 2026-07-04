/** Shared SVG diagram styles for static exports — dark default, light via prefers-color-scheme */
export const diagramFrameCss = `
  .diagram-frame { fill: #1e2836; stroke: #3d4f63; stroke-width: 1.5; }
  @media (prefers-color-scheme: light) {
    .diagram-frame { fill: #f8fafc; stroke: #c5cdd6; }
  }
`;

export const docDiagramCss = `
  ${diagramFrameCss}
  .panel { fill: #243040; stroke: #3d4f63; stroke-width: 1; }
  .panel.network { stroke: #7B68EE; stroke-opacity: 0.45; }
  .panel-title { fill: #f4f1f8; font-family: sans-serif; font-size: 13px; font-weight: 600; }
  .node { fill: #243040; stroke: #3d4f63; stroke-width: 1.5; }
  .node.accent, .node.ok { stroke: #7B68EE; }
  .node.auth { stroke: #64748b; stroke-dasharray: 4 3; }
  .node.fail { stroke: #e57373; }
  .node-label { fill: #f4f1f8; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 500; }
  .node-label.small { font-size: 10px; }
  .detail, .edge-label { fill: #94a3b8; font-family: sans-serif; font-size: 10px; }
  .edge-label { font-size: 9px; }
  .link { stroke: #64748b; stroke-width: 1.5; fill: none; }
  .link.cross { stroke: #7B68EE; }
  .link.dashed { stroke: #94a3b8; stroke-dasharray: 5 4; }
  .arrow-head { fill: #7B68EE; }
  .arrow-head-dashed { fill: #94a3b8; }
  .diamond { fill: #243040; stroke: #7B68EE; stroke-width: 1.5; }
  .dir, .file { fill: #f4f1f8; font-family: ui-monospace, monospace; font-size: 12px; }
  .file { fill: #b8a9e8; }
  .comment { fill: #94a3b8; font-family: sans-serif; font-size: 11px; }
  .tree { stroke: #64748b; stroke-width: 1.5; fill: none; }
  @media (prefers-color-scheme: light) {
    .panel { fill: #eef1f5; stroke: #c5cdd6; }
    .panel.network { stroke: #6d5f95; }
    .panel-title, .node-label, .dir { fill: #1f2937; }
    .node { fill: #eef1f5; stroke: #c5cdd6; }
    .node.accent, .node.ok { stroke: #6d5f95; }
    .node.auth { stroke: #9ca3af; }
    .detail, .edge-label, .comment { fill: #4b5563; }
    .link { stroke: #9ca3af; }
    .link.cross { stroke: #6d5f95; }
    .link.dashed { stroke: #6b7280; }
    .arrow-head { fill: #6d5f95; }
    .arrow-head-dashed { fill: #6b7280; }
    .diamond { fill: #eef1f5; stroke: #6d5f95; }
    .file { fill: #5b4d8a; }
    .tree { stroke: #9ca3af; }
  }
`;

export function wrapSvg({ width, height, ariaLabel, body, extraCss = "" }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="${ariaLabel}">
  <defs>
    <marker id="arrow-solid" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon class="arrow-head" points="0 0, 8 4, 0 8"/></marker>
    <marker id="arrow-dashed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon class="arrow-head-dashed" points="0 0, 8 4, 0 8"/></marker>
    <style>${docDiagramCss}${extraCss}</style>
  </defs>
  <rect class="diagram-frame" x="1" y="1" width="${width - 2}" height="${height - 2}" rx="10"/>
  ${body}
</svg>`;
}
