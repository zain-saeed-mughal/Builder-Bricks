/**
 * Generates the Builder Bricks app icons from a single geometry definition:
 *   app/icon.svg        — crisp vector favicon for modern browsers
 *   app/favicon.ico     — 16/32/48 raster fallback (legacy browsers, bookmarks)
 *   app/apple-icon.png  — 180x180 iOS home-screen icon
 *
 * Run from the frontend directory: node scripts/generate-icons.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const APP_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../app");

const palette = {
  obsidian: "#0b0d0e",
  brick: "#c96a45",
  concrete: "#b8b3aa",
  sage: "#a7b29c"
};

/**
 * Running-bond wall geometry on a 64x64 canvas. Mortar gaps and brick heights are
 * deliberately chunky so the three courses survive rasterisation down to 16px.
 */
const CANVAS = 64;
const GAP = 4.8;
const BRICK_H = 11.5;
const WALL_X = 7;
const WALL_W = CANVAS - 2 * WALL_X;
const FULL_W = (WALL_W - GAP) / 2;
const HALF_W = (WALL_W - 2 * GAP - FULL_W) / 2;
const ROW_Y = [0, 1, 2].map(
  (row) => (CANVAS - (3 * BRICK_H + 2 * GAP)) / 2 + row * (BRICK_H + GAP)
);

const bricks = [
  { x: WALL_X, y: ROW_Y[0], w: FULL_W, fill: palette.brick },
  { x: WALL_X + FULL_W + GAP, y: ROW_Y[0], w: FULL_W, fill: palette.concrete },

  { x: WALL_X, y: ROW_Y[1], w: HALF_W, fill: palette.brick, opacity: 0.72 },
  { x: WALL_X + HALF_W + GAP, y: ROW_Y[1], w: FULL_W, fill: palette.brick },
  { x: WALL_X + WALL_W - HALF_W, y: ROW_Y[1], w: HALF_W, fill: palette.brick, opacity: 0.72 },

  { x: WALL_X, y: ROW_Y[2], w: FULL_W, fill: palette.sage },
  { x: WALL_X + FULL_W + GAP, y: ROW_Y[2], w: FULL_W, fill: palette.brick }
];

const round = (value) => Number(value.toFixed(2));

function wallMarkup() {
  return bricks
    .map(({ x, y, w, fill, opacity }) => {
      const alpha = opacity === undefined ? "" : ` opacity="${opacity}"`;
      return `  <rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${BRICK_H}" rx="1" fill="${fill}"${alpha}/>`;
    })
    .join("\n");
}

/** iOS applies its own squircle mask, so the apple icon ships with square corners. */
function buildSvg({ radius }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" width="${CANVAS}" height="${CANVAS}" role="img" aria-label="Builder Bricks">
  <rect width="${CANVAS}" height="${CANVAS}" rx="${radius}" fill="${palette.obsidian}"/>
${wallMarkup()}
</svg>
`;
}

async function rasterize(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Minimal ICO container holding PNG-encoded frames (supported by all current browsers). */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = header.length + frames.length * 16;
  const directory = frames.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...directory, ...frames.map((frame) => frame.data)]);
}

async function main() {
  const faviconSvg = buildSvg({ radius: 13 });
  const appleSvg = buildSvg({ radius: 0 });

  const icoFrames = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await rasterize(faviconSvg, size) }))
  );

  await writeFile(path.join(APP_DIR, "icon.svg"), faviconSvg, "utf8");
  await writeFile(path.join(APP_DIR, "favicon.ico"), buildIco(icoFrames));
  await writeFile(path.join(APP_DIR, "apple-icon.png"), await rasterize(appleSvg, 180));

  console.log("Generated icon.svg, favicon.ico (16/32/48) and apple-icon.png (180)");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
