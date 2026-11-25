import fs from "node:fs";

const verses = JSON.parse(fs.readFileSync("/tmp/lsb/verses.json", "utf8"));

const series = [
  { letter: "A", name: "Live the New Life", topics: ["Christ the Center", "Obedience to Christ", "The Word", "Prayer", "Fellowship", "Witnessing"] },
  { letter: "B", name: "Proclaim Christ", topics: ["All Have Sinned", "Sin's Penalty", "Christ Paid the Penalty", "Salvation Is Not by Works", "Must Receive Christ", "Assurance of Salvation"] },
  { letter: "C", name: "Rely on God's Resources", topics: ["His Spirit", "His Strength", "His Faithfulness", "His Peace", "His Provision", "His Help in Temptation"] },
  { letter: "D", name: "Be Christ's Disciple", topics: ["Put Christ First", "Separate from the World", "Be Steadfast", "Serve Others", "Give Generously", "Develop World Vision"] },
  { letter: "E", name: "Grow in Christlikeness", topics: ["Love", "Humility", "Purity", "Honesty", "Faith", "Good Works"] },
];

if (verses.length !== 60) throw new Error("expected 60 verses, got " + verses.length);

const rows = verses.map((v, i) => {
  const s = series[Math.floor(i / 12)];
  const topic = s.topics[Math.floor((i % 12) / 2)];
  const id = `${s.letter}${i % 12 + 1}`;
  return {
    id,
    ref: v.ref,
    book: v.b,
    series: s.letter,
    seriesName: s.name,
    topic,
    poem: !!v.poem,
    lines: v.lines,
    text: v.lines.join(" "),
  };
});

const header = `// The Navigators Topical Memory System: 60 verses in five series of twelve.
// Scripture text: Legacy Standard Bible (LSB), fetched verse by verse from the
// official LSB reader (read.lsbible.org) and stored verbatim, including poetry
// line breaks. Reference strings follow the published TMS card list.

export type SeriesLetter = "A" | "B" | "C" | "D" | "E";

export type Verse = {
  id: string;
  ref: string;
  book: string;
  series: SeriesLetter;
  seriesName: string;
  topic: string;
  poem: boolean;
  lines: string[];
  text: string;
};

export const SERIES: { letter: SeriesLetter; name: string }[] = ${JSON.stringify(
  series.map((s) => ({ letter: s.letter, name: s.name })),
  null,
  2
)};

export const VERSES: Verse[] = `;

fs.writeFileSync(
  "src/data/verses.ts",
  header + JSON.stringify(rows, null, 2) + ";\n\nexport const BY_ID = new Map(VERSES.map((v) => [v.id, v]));\n"
);
console.log("wrote", rows.length, "verses");
