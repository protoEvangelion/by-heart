// Re-fetches all sixty references from the official LSB reader and diffs them
// against src/data/verses.ts. Any drift fails the run.
import fs from "node:fs";
import { parseHTML } from "linkedom";

const BASE = "https://read.lsbible.org";
const src = fs.readFileSync("src/data/verses.ts", "utf8");
const marker = "export const VERSES: Verse[] = ";
const json = src.slice(src.indexOf(marker) + marker.length, src.indexOf(";\n\nexport const BY_ID"));
const verses = JSON.parse(json);

const slug = (b) => b.toLowerCase().replace(/\s+/g, "-");

const html = await (await fetch(`${BASE}/`)).text();
const buildId = html.match(/"buildId":"([^"]+)"/)?.[1];
if (!buildId) throw new Error("Could not read the LSB build id");

const clean = (passageHtml) => {
  const { document } = parseHTML(`<div id="r">${passageHtml}</div>`);
  const root = document.getElementById("r");
  const verse = root.querySelector("span.v");
  for (const n of verse.querySelectorAll("sup.note, sup.vn")) n.remove();
  const lns = [...verse.querySelectorAll(".ln")];
  return (lns.length ? lns : [verse]).map((el) => el.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
};

let failures = 0;
for (const verse of verses) {
  const [bookPart, rest] = verse.ref.split(/(?= \d+:)/);
  const [chapter, versePart] = rest.trim().split(":");
  const numbers = versePart.split("-").map(Number);
  const range = numbers.length > 2 ? numbers : numbers.length === 2 ? Array.from({ length: numbers[1] - numbers[0] + 1 }, (_, i) => numbers[0] + i) : [numbers[0]];
  const lines = [];
  for (const v of range) {
    const res = await fetch(`${BASE}/_next/data/${buildId}/${slug(bookPart)}/${chapter}/${v}.json`, { headers: { accept: "application/json" } });
    const data = await res.json();
    lines.push(...clean(data.pageProps.passages[0].passageHtml));
  }
  const fetched = lines.join("\n");
  const stored = verse.lines.join("\n");
  if (fetched !== stored) {
    failures += 1;
    console.error(`MISMATCH ${verse.id} ${verse.ref}\n  stored:   ${stored}\n  fetched:  ${fetched}`);
  }
  await new Promise((r) => setTimeout(r, 120));
}

console.log(failures === 0 ? `verified ${verses.length} verses, no drift` : `${failures} mismatches`);
process.exit(failures === 0 ? 0 : 1);
