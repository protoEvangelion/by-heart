<img src="assets/logo-mark.svg" width="56" height="56" alt="">

# by heart

A scripture memory trainer for the 60 verses of **The Navigators Topical Memory System**, recited word for word in the **Legacy Standard Bible**. Installable, offline, and dark by default, built for iPhone and iPad.

Recitation is not multiple choice. The verse appears as a proof: first letters in place, the rest ruled out. You type the missing letters. The app checks every one against the LSB text, counts your misses, and grades the review into a spaced schedule.

```bash
npm install
npm run dev      # http://localhost:5199
npm run build    # static build in dist/
```

## What ships

- **The sixty, preloaded.** Five series (A-E), six topics each, two verses per topic, in TMS course order: A1 through E12. Verse text is the LSB, verbatim, with poetry line breaks preserved.
- **A daily set.** The schedule decides what you review today. If nothing is due, the next two new verses in course order appear instead. There is no blank slate to configure.
- **Three ways to recite.** First-letter typing (default), full-text typing with first letters off, and reveal-and-self-grade.
- **Spaced repetition.** Intervals grow 1 -> 3 -> 7 -> 21 -> ... days by grade, capped at a year. A miss returns the verse to one day and re-queues it in the same session.
- **The shape sheet.** Four solfege shapes are the only state vocabulary: diamond (new), square (learning), oval (holding), triangle (sealed). One row per series, twelve marks per row, readable at a glance.
- **Local only.** Progress lives in `localStorage` under `by-heart:v1`. No account, no network calls at runtime, no analytics. Export and restore JSON from Settings.

## Verse accuracy

The corpus is not typed by hand and not paraphrased. Every reference was fetched individually from the official LSB reader (`read.lsbible.org`), normalized from its verse HTML, and stored in `src/data/verses.ts` with line breaks intact.

```bash
npm run verify:verses
```

This re-fetches all sixty references live and diffs them, line by line, against what ships. It is the accuracy guarantee: it prints `verified 60 verses, no drift` only when the shipped text matches the source word for word. Run it before any release.

`npm run build:verses` regenerates `src/data/verses.ts` from the same source if the corpus ever needs rebuilding.

## Stack

Vite 8 + React 19 + TypeScript. Hand-authored CSS (no framework) with three self-hosted variable typefaces: Besley, Literata, Hanken Grotesk. PWA via `vite-plugin-pwa` (Workbox precache, auto-updating service worker). Deployed as a static site on Vercel; `vercel.json` rewrites non-asset paths to `index.html`.

```
src/
  data/verses.ts        the 60 verses, TMS groupings, LSB text
  lib/srs.ts            intervals, stages, the daily set
  lib/store.ts          localStorage state, export/import
  screens/Today.tsx     the daily set and the shape sheet
  screens/Recite.tsx    the typing engine and grading
  screens/Library.tsx   all sixty, by series and topic
  screens/Settings.tsx  limits, backup, install, attribution
  components/           authored icons and the solfege shapes
public/icons/           generated from assets/logo-mark.svg (npm run icons)
```

The design system is documented in [DESIGN.md](DESIGN.md); product truth is in [PRODUCT.md](PRODUCT.md).

## Icon

`assets/logo-mark.svg` is the source of truth: a bone heart with a brass typographic caret where a word should be. `npm run icons` rasterizes every shipping size (192, 512, maskable 512, apple-touch 180, 1024, favicon) from that one file with `sharp`.

## Attribution

- Verse groupings: The Navigators Topical Memory System (NavPress). This is an independent study tool, not affiliated with or endorsed by The Navigators or NavPress.
- Scripture: Legacy Standard Bible, copyright 2021 by The Lockman Foundation. Quotations are reproduced for personal memorization in a non-commercial tool; the LSB text remains the property of The Lockman Foundation.
- Code: MIT (see [LICENSE](LICENSE)).
