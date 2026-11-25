# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React + TypeScript single-page app, hand-authored CSS design system, installable PWA, no backend. Reason: the whole product runs client-side against a fixed 60-verse corpus, so a static build deploys to Vercel with zero cold-start, works offline from the first install, and costs nothing to host.

## Users

One person memorizing Scripture, usually alone: at a desk with an iPad in landscape, on a phone in a dark room before sleep, on a phone standing in a kitchen. They are working through a structured course (The Navigators Topical Memory System), not browsing a Bible. They are often 4-12 verses deep and worried about losing the early ones, so "what do I review today" matters more than "what can I read".

## Product Purpose

A scripture memory trainer for the 60-verse Topical Memory System, in the Legacy Standard Bible. It answers one question on open - which verses are due for review today - and walks the user through reciting them accurately, then schedules the next review. Success: the user finishes a daily set in under five minutes without deciding anything, and verses stay retrievable months later.

## Positioning

The TMS itself is the product content, not a user-created set: the 60 verses, their five series and their 6 x 2 topical groupings ship pre-loaded, word-for-word in the LSB, verified verse by verse. Competing apps offer blank-slate verse entry and a general library. This one is opinionated about which verses, in which order, and grades recall against the exact wording rather than a fuzzy match.

## Operating Context

- Spaced repetition sessions, once or twice a day, 1-5 minutes, often offline (subway, airplane, rural).
- The user installs it to the iOS/iPadOS home screen and expects it to behave like an app: no browser chrome, no scroll bounce surprises, dark by default, works with no network.
- Progress lives on the device. No account, no sync, no server. Losing progress means clearing site data, so export/import is a first-class control.
- Recitation happens by typing (first-letter and full-word modes) and by silent self-test with reveal.

## Capabilities and Constraints

- Corpus: 60 verses, fixed, ordered A1-E12, each with reference, topic, series, and LSB text including poetry line breaks.
- Review scheduling: per-verse interval in days, next-due date, stage. Grades map to interval changes; a miss resets to 1 day.
- Session: a daily set built from due verses (plus new verses when nothing is due), deterministic per day.
- Recall modes: first-letter typing, full-text typing, and reveal-and-self-grade.
- Local persistence in the browser; no analytics, no third-party trackers.
- Installable PWA, offline-capable, iOS/iPadOS first with safe-area and standalone-mode handling.
- Not in scope: accounts, cloud sync, audio recitation, multiple translations, user-authored verses, push notifications.

## Brand Commitments

- Name: "by heart". Lowercase in running text.
- The Scripture text is the LSB (Legacy Standard Bible) and must never be paraphrased, trimmed, or "corrected" for length. Where the LSB leaves a quotation open, it stays open.
- The Navigators Topical Memory System naming (series letters A-E, topic names) is content truth and is not reworded.

## Evidence on Hand

- All 60 LSB verses, fetched verse by verse from the official LSB reader (read.lsbible.org) and stored in `src/data/verses.ts`. No synthetic verse text anywhere.
- TMS structure and topic names from The Navigators' published TMS list.
- No testimonials, user counts, pricing, or benchmark claims exist, and none may be invented.

## Product Principles

1. The due list is the front door. Never make the user choose what to study.
2. Verify exact wording. Recall is graded against the LSB text, not a summary.
3. Zero decisions per session: one tap to start, one grade per verse.
4. Progress is the user's, on their device, exportable at any time.
5. Offline is the default state, not a degraded one.

## Accessibility & Inclusion

Body text contrast at or above 4.5:1 in the shipped dark theme; every control reachable at 44pt on touch; keyboard-operable recitation with visible focus; motion honors `prefers-reduced-motion`.
