import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const iconsDir = join(root, "public/diagram-icons");
const svgOut = join(root, "public/architecture-diagram.svg");
const pngOut = join(root, "public/architecture-diagram.png");
const ogSvgOut = join(root, "public/og-image.svg");
const ogPngOut = join(root, "public/og-image.png");

/** AWS Architecture Icons — https://github.com/jajera/aws-icons */
const AWS_ICONS_BASE =
  "https://raw.githubusercontent.com/jajera/aws-icons/main";

const diagramWidth = 1200;
const ACCOUNT_WIDTH = 352;
const ACCOUNT_GAP = 36;
const ACCOUNTS_SPAN = 3 * ACCOUNT_WIDTH + 2 * ACCOUNT_GAP;
const ACCOUNTS_LEFT = (diagramWidth - ACCOUNTS_SPAN) / 2;
const GUTTER_DEV = ACCOUNTS_LEFT + ACCOUNT_WIDTH + ACCOUNT_GAP / 2;
const GUTTER_SBX =
  ACCOUNTS_LEFT + 2 * (ACCOUNT_WIDTH + ACCOUNT_GAP) + ACCOUNT_GAP / 2;

const ACCOUNT_TOP = 66;
const ACCOUNT_TITLE_Y = ACCOUNT_TOP + 28;
const CONTENT_BOTTOM = 488;
const ACCOUNT_PANEL_HEIGHT = CONTENT_BOTTOM - ACCOUNT_TOP;
const LEGEND_Y = CONTENT_BOTTOM + 22;
const diagramHeight = LEGEND_Y + 32;

/** Diagram typography — keep spacing in sync when adjusting sizes */
const FONT = {
  headerTitle: 18,
  headerSubtitle: 13,
  accountTitle: 15,
  regionLabel: 12,
  nodeLabel: 13,
  nodeSublabel: 11,
  legend: 12,
  r53Badge: 42,
};
const LABEL_GAP = { phz: 20, default: 16 };
const SUBLABEL_OFFSET = 15;

/** Inner region boxes — fill account panel; keep a small inset from borders */
const REGION_PAD_BELOW_TITLE = 14;
const REGION_PAD_ABOVE_BOTTOM = 2;
const REGION_GAP = 8;
const REGION_INSET = 4;
const APSE2_BAND_RATIO = 0.5;

function applyRegionLayout() {
  const panelBottom = ACCOUNT_TOP + ACCOUNT_PANEL_HEIGHT;
  const regionAreaTop = ACCOUNT_TITLE_Y + REGION_PAD_BELOW_TITLE;
  const regionAreaBottom = panelBottom - REGION_PAD_ABOVE_BOTTOM;
  const totalBandSpace = regionAreaBottom - regionAreaTop - REGION_GAP;
  const apse2BandH = Math.round(totalBandSpace * APSE2_BAND_RATIO);
  const apse6BandH = totalBandSpace - apse2BandH;
  const apse6Y = regionAreaTop + apse2BandH + REGION_GAP;

  for (const account of accounts) {
    const [apse2, apse6] = account.regions;
    apse2.y = regionAreaTop;
    apse2.bandH = apse2BandH;
    apse6.y = apse6Y;
    apse6.bandH = apse6BandH;

    if (account.id === "network") {
      apse2.nodes.find((n) => n.id === "phz").cy = Math.round(
        apse2BandH * 0.22,
      );
      const vpcRowCy = Math.round(apse2BandH * 0.78);
      for (const node of apse2.nodes) {
        if (node.id.startsWith("vpc")) node.cy = vpcRowCy;
      }
      apse6.nodes[0].cy = Math.round(apse6BandH * 0.52);
    } else {
      apse2.nodes[0].cy = Math.round(apse2BandH * 0.52);
      apse6.nodes[0].cy = Math.round(apse6BandH * 0.52);
    }
  }
}

const accounts = [
  {
    id: "network",
    label: "Network Account",
    tint: "#FF9900",
    regions: [
      {
        label: "ap-southeast-2",
        nodes: [
          {
            id: "phz",
            label: "Platform_Zone",
            sublabel: "platform.demo.local",
            path: "icons/resource/networking/Res_Amazon-Route-53-Hosted-Zone_48.svg",
            size: 46,
            cx: 176,
            cy: 44,
          },
          {
            id: "vpc-net-primary",
            label: "VPC primary",
            sublabel: "10.0.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 88,
            cy: 138,
          },
          {
            id: "vpc-net-secondary",
            label: "VPC secondary",
            sublabel: "10.3.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 264,
            cy: 138,
          },
        ],
      },
      {
        label: "ap-southeast-6",
        nodes: [
          {
            id: "vpc-net-apse6",
            label: "VPC network",
            sublabel: "10.10.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 176,
            cy: 96,
          },
        ],
      },
    ],
  },
  {
    id: "dev",
    label: "Dev Account",
    tint: "#7B68EE",
    regions: [
      {
        label: "ap-southeast-2",
        nodes: [
          {
            id: "vpc-dev-apse2",
            label: "VPC dev",
            sublabel: "10.1.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 176,
            cy: 118,
          },
        ],
      },
      {
        label: "ap-southeast-6",
        nodes: [
          {
            id: "vpc-dev-apse6",
            label: "VPC dev",
            sublabel: "10.11.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 176,
            cy: 96,
          },
        ],
      },
    ],
  },
  {
    id: "sandbox",
    label: "Sandbox Account",
    tint: "#48A9A6",
    regions: [
      {
        label: "ap-southeast-2",
        nodes: [
          {
            id: "vpc-sbx-apse2",
            label: "VPC sandbox",
            sublabel: "10.2.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 176,
            cy: 118,
          },
        ],
      },
      {
        label: "ap-southeast-6",
        nodes: [
          {
            id: "vpc-sbx-apse6",
            label: "VPC sandbox",
            sublabel: "10.12.0.0/16",
            path: "icons/service/networking/Arch_Amazon-Virtual-Private-Cloud_64.svg",
            size: 40,
            cx: 176,
            cy: 96,
          },
        ],
      },
    ],
  },
];

for (const [index, account] of accounts.entries()) {
  account.x = ACCOUNTS_LEFT + index * (ACCOUNT_WIDTH + ACCOUNT_GAP);
  account.width = ACCOUNT_WIDTH;
}

applyRegionLayout();

const crossAccountTargets = [
  { id: "vpc-dev-apse2", sandbox: false },
  { id: "vpc-dev-apse6", sandbox: false },
  { id: "vpc-sbx-apse2", sandbox: true, bypassY: -36 },
  { id: "vpc-sbx-apse6", sandbox: true, bypassY: 36 },
];

const sameAccountLinks = [
  { from: "phz", to: "vpc-net-primary" },
  { from: "phz", to: "vpc-net-secondary" },
  { from: "phz", to: "vpc-net-apse6" },
];

mkdirSync(iconsDir, { recursive: true });

function stripSvg(svgText) {
  return svgText
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .trim();
}

function extractInnerSvg(svgText) {
  const stripped = stripSvg(svgText);
  const match = stripped.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!match) throw new Error("Invalid SVG content");
  return match[1];
}

function getViewBox(svgText) {
  const stripped = stripSvg(svgText);
  const match = stripped.match(/viewBox="([^"]+)"/i);
  if (match) return match[1];
  const w = Number(stripped.match(/width="(\d+)/i)?.[1] ?? 64);
  const h = Number(stripped.match(/height="(\d+)/i)?.[1] ?? 64);
  return `0 0 ${w} ${h}`;
}

function parseViewBox(viewBox) {
  const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
  return { x, y, w, h };
}

async function fetchIcon(node) {
  const url = `${AWS_ICONS_BASE}/${node.path}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const svgText = await response.text();
  writeFileSync(join(iconsDir, `${node.id}.svg`), svgText);
  return {
    svgText,
    viewBox: getViewBox(svgText),
    inner: extractInnerSvg(svgText),
  };
}

const iconCache = new Map();
async function getIconData(node) {
  if (!iconCache.has(node.id)) {
    iconCache.set(node.id, { node, ...(await fetchIcon(node)) });
  }
  return iconCache.get(node.id);
}

const nodePositions = new Map();

function placeNode(account, region, node, iconData) {
  const absX = account.x + node.cx;
  const absY = region.y + node.cy;
  const viewBox = parseViewBox(iconData.viewBox);
  const scale = node.size / Math.max(viewBox.w, viewBox.h);
  const renderedW = viewBox.w * scale;
  const renderedH = viewBox.h * scale;
  const iconX = absX - renderedW / 2 - viewBox.x * scale;
  const iconY = absY - renderedH / 2 - viewBox.y * scale;

  nodePositions.set(node.id, {
    cx: absX,
    cy: absY,
    rx: renderedW / 2,
    ry: renderedH / 2,
  });

  const tint = node.tint ?? account.tint;
  const tinted = `<g fill="${tint}">${iconData.inner}</g>`;
  const labelGap = node.id === "phz" ? LABEL_GAP.phz : LABEL_GAP.default;

  return {
    icon: `<g transform="translate(${iconX} ${iconY}) scale(${scale})">${tinted}</g>`,
    label: `<text x="${absX}" y="${absY + node.size / 2 + labelGap}" text-anchor="middle" fill="#f4f1f8" font-family="sans-serif" font-size="${FONT.nodeLabel}" font-weight="600">${node.label}</text>`,
    sublabel: node.sublabel
      ? `<text x="${absX}" y="${absY + node.size / 2 + labelGap + SUBLABEL_OFFSET}" text-anchor="middle" fill="#9b92b0" font-family="sans-serif" font-size="${FONT.nodeSublabel}">${node.sublabel}</text>`
      : "",
  };
}

function accountPanel(account) {
  return `<rect x="${account.x}" y="${ACCOUNT_TOP}" width="${account.width}" height="${ACCOUNT_PANEL_HEIGHT}" rx="10" fill="#1e2936" stroke="${account.tint}" stroke-width="1.5" opacity="0.95"/>
  <text x="${account.x + account.width / 2}" y="${ACCOUNT_TITLE_Y}" text-anchor="middle" fill="${account.tint}" font-family="sans-serif" font-size="${FONT.accountTitle}" font-weight="700">${account.label}</text>`;
}

function regionBand(account, region) {
  return `<rect x="${account.x + REGION_INSET}" y="${region.y - 6}" width="${account.width - REGION_INSET * 2}" height="${region.bandH}" rx="6" fill="#243040" stroke="#3d4f63" stroke-width="1"/>
  <text x="${account.x + REGION_INSET + 10}" y="${region.y + 11}" fill="#94a3b8" font-family="sans-serif" font-size="${FONT.regionLabel}" font-weight="600">${region.label}</text>`;
}

function arrowHead(x, y, dir = "right") {
  const s = 5;
  if (dir === "right")
    return `<polygon points="${x - s},${y - s} ${x},${y} ${x - s},${y + s}" fill="currentColor"/>`;
  if (dir === "down")
    return `<polygon points="${x - s},${y - s} ${x},${y} ${x + s},${y - s}" fill="currentColor"/>`;
  return "";
}

function pathLine(
  d,
  { dashed = false, color = "#7B68EE", arrowAt = "end" } = {},
) {
  const dash = dashed ? ' stroke-dasharray="7 5"' : "";
  const parts = d.trim().split(/\s+/);
  const last = parts[parts.length - 1].split(",");
  const endX = Number(last[0]);
  const endY = Number(last[1]);
  const arrow =
    arrowAt === "end"
      ? `<g fill="${color}">${arrowHead(endX, endY, "right")}</g>`
      : "";
  return `<path d="${d}" stroke="${color}" stroke-width="1.5" fill="none"${dash}/>${arrow}`;
}

function sameAccountLink(fromId, toId) {
  const from = nodePositions.get(fromId);
  const to = nodePositions.get(toId);
  if (!from || !to) return "";

  const color = "#FF9900";

  if (toId === "vpc-net-apse6") {
    const laneX = from.cx - 24;
    const endY = to.cy - to.ry - 6;
    return `<path d="M ${from.cx} ${from.cy + from.ry + 4} L ${from.cx} ${from.cy + from.ry + 20} L ${laneX} ${from.cy + from.ry + 20} L ${laneX} ${endY} L ${to.cx} ${endY}" stroke="${color}" stroke-width="1.5" fill="none"/>
  <g fill="${color}"><polygon points="${to.cx - 5},${endY - 5} ${to.cx},${endY} ${to.cx + 5},${endY - 5}"/></g>`;
  }

  const splitY = from.cy + from.ry + 22;
  const endX = to.cx;
  const endY = to.cy - to.ry - 6;
  return `<path d="M ${from.cx} ${from.cy + from.ry + 4} L ${from.cx} ${splitY} L ${endX} ${splitY} L ${endX} ${endY}" stroke="${color}" stroke-width="1.5" fill="none"/>
  <g fill="${color}"><polygon points="${endX - 5},${endY - 5} ${endX},${endY} ${endX + 5},${endY - 5}"/></g>`;
}

function buildCrossAccountLinks() {
  const phz = nodePositions.get("phz");
  if (!phz) return "";

  const color = "#7B68EE";
  const startX = phz.cx + phz.rx + 6;
  const startY = phz.cy;
  const targets = crossAccountTargets.map(({ id }) => nodePositions.get(id));
  const bypassExtent = crossAccountTargets
    .filter((t) => t.sandbox)
    .map(({ id, bypassY = 0 }) => nodePositions.get(id).cy + bypassY);
  const busBottom = Math.max(...targets.map((t) => t.cy), ...bypassExtent) + 24;

  const trunk = `M ${startX} ${startY} L ${GUTTER_DEV} ${startY} L ${GUTTER_DEV} ${busBottom}`;
  const branches = crossAccountTargets
    .map(({ id, sandbox, bypassY = 0 }) => {
      const to = nodePositions.get(id);
      const endX = to.cx - to.rx - 8;
      if (!sandbox) {
        return pathLine(`M ${GUTTER_DEV} ${to.cy} L ${endX} ${to.cy}`, {
          dashed: true,
          color,
        });
      }
      const laneY = to.cy + bypassY;
      return pathLine(
        `M ${GUTTER_DEV} ${laneY} L ${GUTTER_SBX} ${laneY} L ${GUTTER_SBX} ${to.cy} L ${endX} ${to.cy}`,
        { dashed: true, color },
      );
    })
    .join("\n");

  return `${pathLine(trunk, { dashed: true, color, arrowAt: "none" })}\n${branches}`;
}

function routingGutters() {
  const gutterTop = ACCOUNT_TITLE_Y + REGION_PAD_BELOW_TITLE - 6;
  const gutterH =
    ACCOUNT_TOP +
    ACCOUNT_PANEL_HEIGHT -
    REGION_PAD_ABOVE_BOTTOM -
    gutterTop +
    6;
  return `<rect x="${GUTTER_DEV - 10}" y="${gutterTop}" width="20" height="${gutterH}" rx="4" fill="#7B68EE" opacity="0.06"/>
  <rect x="${GUTTER_SBX - 10}" y="${gutterTop}" width="20" height="${gutterH}" rx="4" fill="#7B68EE" opacity="0.06"/>`;
}

function linkLegend() {
  const y = LEGEND_Y;
  const lineW = 50;
  const lineTextGap = 12;
  const itemGap = 28;
  const charW = 7;
  const items = [
    {
      color: "#FF9900",
      dash: "",
      label: "associate (same account)",
    },
    {
      color: "#7B68EE",
      dash: ' stroke-dasharray="7 5"',
      label: "auth + associate (cross-account)",
    },
  ];

  const itemWidths = items.map(
    (item) => lineW + lineTextGap + item.label.length * charW,
  );
  const totalW = itemWidths[0] + itemGap + itemWidths[1];
  let x = (diagramWidth - totalW) / 2;

  return items
    .map((item, i) => {
      const lineX1 = x;
      const lineX2 = x + lineW;
      const textX = lineX2 + lineTextGap;
      const markup = `<line x1="${lineX1}" y1="${y}" x2="${lineX2}" y2="${y}" stroke="${item.color}" stroke-width="2"${item.dash}/>
  <text x="${textX}" y="${y + 5}" fill="#94a3b8" font-family="sans-serif" font-size="${FONT.legend}">${item.label}</text>`;
      x += itemWidths[i] + (i === 0 ? itemGap : 0);
      return markup;
    })
    .join("\n");
}

function bgGradient(id) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop stop-color="#232F3E"/>
      <stop offset="1" stop-color="#131a22"/>
    </linearGradient>`;
}

function framedRect(width, height, rx = 12) {
  return `<rect width="${width}" height="${height}" rx="${rx}" fill="url(#bg)"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx - 1}" stroke="#FF9900" stroke-width="1" fill="none" opacity="0.35"/>`;
}

function buildOgImage(diagramCore) {
  const width = 1200;
  const height = 630;
  const padX = 48;
  const headerBottom = 206;
  const footerReserve = 82;
  const availW = width - padX * 2;
  const availH = height - headerBottom - footerReserve;
  const scale = Math.min(availW / diagramWidth, availH / diagramHeight);
  const scaledW = diagramWidth * scale;
  const scaledH = diagramHeight * scale;
  const diagramX = (width - scaledW) / 2;
  const diagramY = headerBottom + (availH - scaledH) / 2;
  const frameY = diagramY - 12;
  const frameH = scaledH + 24;

  const pills = ["3 accounts", "2 regions", "1 shared PHZ"];
  let pillX = width / 2 - 280;
  const pillY = 136;
  const pillMarkup = pills
    .map((label) => {
      const w = label.length * 12 + 40;
      const markup = `<rect x="${pillX}" y="${pillY}" width="${w}" height="34" rx="17" fill="#243040" stroke="#7B68EE" stroke-width="1"/>
  <text x="${pillX + w / 2}" y="${pillY + 22}" text-anchor="middle" fill="#e8e0f4" font-family="sans-serif" font-size="16" font-weight="600">${label}</text>`;
      pillX += w + 12;
      return markup;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>${bgGradient("ogBg")}
    <clipPath id="diagramClip"><rect x="${padX}" y="${frameY}" width="${availW}" height="${frameH}" rx="12"/></clipPath>
  </defs>
  <rect width="${width}" height="${height}" rx="12" fill="url(#ogBg)"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="11" stroke="#FF9900" stroke-width="1" fill="none" opacity="0.35"/>
  <text x="${width / 2}" y="64" text-anchor="middle" fill="#f4f1f8" font-family="sans-serif" font-size="42" font-weight="700">Route 53 Classic Multi-Account Walkthrough</text>
  <text x="${width / 2}" y="104" text-anchor="middle" fill="#b8afc8" font-family="sans-serif" font-size="22">Share one private hosted zone across accounts and regions</text>
  ${pillMarkup}
  <rect x="${padX}" y="${frameY}" width="${availW}" height="${frameH}" rx="12" fill="#1a2332" stroke="#7B68EE" stroke-width="1" opacity="0.7"/>
  <g clip-path="url(#diagramClip)"><g transform="translate(${diagramX} ${diagramY}) scale(${scale})">${diagramCore}</g></g>
  <text x="${width / 2}" y="${height - 46}" text-anchor="middle" fill="#9b92b0" font-family="sans-serif" font-size="20">Classic VPC association authorization · no Profiles or RAM</text>
  <text x="${width / 2}" y="${height - 22}" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="18">jajera.github.io/route53-classic-multi-account-walkthrough</text>
</svg>`;
}

const r53Badge = await getIconData({
  id: "route53-badge",
  path: "icons/service/networking/Arch_Amazon-Route-53_64.svg",
  size: FONT.r53Badge,
});
const r53ViewBox = parseViewBox(r53Badge.viewBox);
const r53Scale = FONT.r53Badge / Math.max(r53ViewBox.w, r53ViewBox.h);
const r53Icon = `<g transform="translate(${ACCOUNTS_LEFT} ${16}) scale(${r53Scale})"><g fill="#7B68EE">${r53Badge.inner}</g></g>`;

const panels = accounts.map(accountPanel).join("\n");
const bands = accounts
  .flatMap((a) => a.regions.map((r) => regionBand(a, r)))
  .join("\n");

const placed = [];
for (const account of accounts) {
  for (const region of account.regions) {
    for (const node of region.nodes) {
      const iconData = await getIconData(node);
      const p = placeNode(account, region, node, iconData);
      placed.push(p.icon, p.label, p.sublabel);
    }
  }
}

const links = [
  ...sameAccountLinks.map((l) => sameAccountLink(l.from, l.to)),
  buildCrossAccountLinks(),
].join("\n");

const header = `<text x="${ACCOUNTS_LEFT + 50}" y="44" fill="#f4f1f8" font-family="sans-serif" font-size="${FONT.headerTitle}" font-weight="600">Route 53 private DNS sharing</text>
<text x="${diagramWidth / 2}" y="44" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="${FONT.headerSubtitle}">Network owns PHZ · workload VPCs associate · shared resolution</text>`;

const diagramCore = `${panels}\n${bands}\n${routingGutters()}\n${links}\n${placed.join("\n")}\n${linkLegend()}`;
const flowContent = `${r53Icon}\n${header}\n${diagramCore}`;

const architectureSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${diagramWidth}" height="${diagramHeight}" viewBox="0 0 ${diagramWidth} ${diagramHeight}" fill="none">
  <defs>${bgGradient("bg")}</defs>
  ${framedRect(diagramWidth, diagramHeight)}
  ${flowContent}
</svg>`;

const ogSvg = buildOgImage(diagramCore);

writeFileSync(svgOut, architectureSvg);
writeFileSync(ogSvgOut, ogSvg);
await sharp(Buffer.from(architectureSvg)).png().toFile(pngOut);
await sharp(Buffer.from(ogSvg)).png().toFile(ogPngOut);

console.log(`Wrote ${svgOut}`);
console.log(`Wrote ${pngOut}`);
console.log(`Wrote ${ogSvgOut}`);
console.log(`Wrote ${ogPngOut}`);
