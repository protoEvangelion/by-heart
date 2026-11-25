// Generates every raster icon from the authored SVG mark.
// Source: assets/logo-mark.svg (heart + typographic caret, drawn by hand).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const INK = "#0A0E1A";
const mark = fs.readFileSync("assets/logo-mark.svg", "utf8")
  .trim()
  .replace(/^<svg[\s\S]*?>/, "")
  .replace(/<\/svg>$/, "");

// iOS app icons use a 22.37% corner radius before the mask is applied.
const tile = (scale, radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="${radius}" fill="${INK}"/>
  <g transform="translate(512 512) scale(${scale}) translate(-512 -512)">${mark}</g>
</svg>`;

const out = "public/icons";
fs.mkdirSync(out, { recursive: true });

const sizes = [
  ["icon-32.png", 32, 0.82, 228],
  ["icon-192.png", 192, 0.82, 228],
  ["icon-512.png", 512, 0.82, 228],
  ["maskable-512.png", 512, 0.64, 0],
  ["apple-touch-icon.png", 180, 0.82, 0],
  ["icon-1024.png", 1024, 0.82, 228],
];

for (const [file, size, scale, radius] of sizes) {
  await sharp(Buffer.from(tile(scale, radius)))
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, file));
  console.log("wrote", path.join(out, file));
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="228" fill="${INK}"/>
  <g transform="translate(512 512) scale(0.82) translate(-512 -512)">${mark}</g>
</svg>
`;
fs.writeFileSync("public/favicon.svg", favicon);
console.log("wrote public/favicon.svg");
