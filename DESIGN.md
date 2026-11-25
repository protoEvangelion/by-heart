---
name: by heart
description: A scripture memory trainer for the 60-verse Topical Memory System, set in the notation language of a night-edition shape-note hymnal.
colors:
  ink: "#0A0E1A"
  ink-raised: "#0E1424"
  ink-hover: "#141B2E"
  bone: "#EDE7DA"
  dim: "#A6ACBB"
  faint: "#767D90"
  brass: "#E5B665"
  sage: "#8FC3AC"
  rubric: "#E6857A"
  hairline: "#1F2739"
typography:
  display:
    fontFamily: "Besley Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.05rem, 8vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Besley Variable, Iowan Old Style, Georgia, serif"
    fontSize: "1.06rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  scripture:
    fontFamily: "Literata Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.16rem, 4.9vw, 1.42rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "0.002em"
  title:
    fontFamily: "Literata Variable, Iowan Old Style, Georgia, serif"
    fontSize: "15.5px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.11em"
rounded:
  sm: "5px"
  md: "11px"
  lg: "14px"
  xl: "18px"
  sheet: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  section: "30px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "#FFFAF0"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  chip-state:
    backgroundColor: "transparent"
    textColor: "{colors.sage}"
    rounded: "{rounded.pill}"
    padding: "4px 9px 4px 7px"
  row-verse:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "0px"
    padding: "12px 0"
    height: "58px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.faint}"
    rounded: "{rounded.md}"
    padding: "8px 0 6px"
---

# Design System: by heart

## Overview

**Creative North Star: "The Night Hymnal"**

The app is a hymnal read under one lamp. Its ground is the ink of a night-edition binding, its text is bone, and its only bright substance is brass: the metal of the caret, the blank, the mark that fills in. Nothing else glows. Where a hymnbook sets syllables under shaped notes, this app sets verses under blanks, and the four shapes that carry the notation carry the product's state as well. The interface is not decorated with that world; the notation is doing the work the interface needs.

Density follows the hymnal, not the dashboard: short ruled lines, tight measures, small tracked labels, and one large voice (the verse reference) doing the announcing. Everything is aligned to a hairline system, so a screen with eleven rows still reads as set type rather than as a list of cards.

**Key Characteristics:**
- One ink ground, one bone text, one brass accent, two state colors borrowed from the notation.
- Ruled blanks instead of input boxes; the missing text is a 1px brass line.
- Four geometric shapes as the entire state alphabet; no icon substitutes.
- Display type for references and section names only; the working UI stays in the grotesk.
- Motion is a single rise and a single caret blink, never a scatter of hovers.

## Colors

A committed two-value world (ink and bone) with brass as the one metal and two notation colors doing state duty; it is not a neutral screen with an accent bolted on, because the blanks, the marks, and the caret all carry brass.

### Primary
- **Lamp Brass** (#E5B665): the caret, the ruled blank under a missing word, the "learning" mark, the suggested grade, and the series letter in every list. It is the color of the thing that needs attention, so it never fills a large surface except the one recommended grade button.

### Secondary
- **Verdigris** (#8FC3AC): "holding", the state where a verse is recalled within weeks. Also the confirmation message after a backup or restore.
- **Rubric Red** (#E6857A): lateness and erasure only. Overdue rows, the destructive reset control. Never used for emphasis or decoration.

### Neutral
- **Night Ink** (#0A0E1A): the ground of every screen and the recitation cover; also the text color inside brass and bone fills.
- **Ink Raised** (#0E1424): the one elevated surface in the app (the begin card, settings groups, verse sheet).
- **Hover Ink** (#141B2E): row hover, pressed states, disabled fills.
- **Bone** (#EDE7DA): verse text, references, primary button fill, "sealed" mark.
- **Dim** (#A6ACBB): secondary copy, metadata, inactive tabs. 8:1 on ink.
- **Faint** (#767D90): 11px uppercase labels and the empty-state paragraph. 4.5:1 on ink, so it never carries body copy.
- **Hairline** (rgba(237,231,218,0.10)): every rule in the system.

### Named Rules
**The One Bright Object Rule.** Exactly one bone-filled control appears per screen: Begin on Today, the recommended grade in recitation. If a second filled control appears, one of them is wrong.

**The Metal Rule.** Brass marks what is incomplete, due, or suggested. It never marks decoration, never fills a card, and never appears as a gradient.

## Typography

**Display Font:** Besley Variable (with Iowan Old Style, Georgia)
**Body Font:** Hanken Grotesk Variable (with system-ui)
**Scripture Font:** Literata Variable (with Iowan Old Style, Georgia)

**Character:** Besley is a Clarendon-flavored face from the hymnbook and letterpress shelf: sturdy, slightly mechanical, unmistakably set rather than written. Literata is the reading voice underneath it, built for long text on screens. Hanken Grotesk is the quiet clerk that takes the small working labels so neither serif has to shout. Two serifs are safe here only because they never appear at the same size or in the same job.

### Hierarchy
- **Display** (600, clamp(2.05rem, 8vw, 2.5rem), 1.02, -0.028em): screen titles ("Daily set", "The sixty") and verse references in the recitation cover.
- **Headline** (600, 1.06rem, 1.2): section heads ("The sixty", "Due today").
- **Scripture** (400, clamp(1.16rem, 4.9vw, 1.42rem), 1.62): the verse itself, measured to 34ch so a line breaks at a phrase.
- **Title** (600, 15.5px, 1.3): verse references in lists and sheets.
- **Body** (400, 15px, 1.45): all UI copy and settings prose.
- **Label** (700, 11px, 0.11em uppercase): topic names, group titles, and the legend.

### Named Rules
**The Tune-Name Rule.** Display type belongs to the thing being memorized and the section that holds it. A button, a tab, a note, or a settings row never sets in Besley.

**The Measure Rule.** Scripture never exceeds 34ch in the recitation cover and 40ch in a sheet. Wider is a page, not a verse.

## Layout

A single column at 780px max on phones and tablets, with 20px gutters and a bottom tab bar that becomes a 236px left rail at 780px. On desktop the column stays 820px and centers in the remaining space, so the reading measure never stretches.

Vertical rhythm is 30px between sections, 16px inside a card, 12px between a heading and its content, and one hairline between every list row. Lists are ruled, not carded: rows sit directly on the ground with 1px separators and no containers, which keeps eleven rows from reading as eleven cards. Touch targets are 44px minimum; rows are 58px so the whole row is the target.

Safe areas are honored on all four sides (`env(safe-area-inset-*)`), the tab bar pads its own bottom inset, and the recitation cover uses `100dvh` so the iOS keyboard cannot push the grade row off screen.

## Elevation & Depth

Depth is tonal, not shadowed. The ground, the raised surface (one step lighter), and the hairline do all of it, because a hymnal page has no drop shadows and the app should not either. The single exception is the bottom sheet, which lifts 48px over a scrim: `0 -18px 48px -20px rgba(0,0,0,0.72)`, offset upward and blurred, so it reads as a page laid on top rather than a card hovering.

### Shadow Vocabulary
- **sheet-lift** (`box-shadow: 0 -18px 48px -20px rgba(0,0,0,0.72)`): the verse sheet and the session-complete sheet only.

### Named Rules
**The Border-Or-Shadow Rule.** A surface gets a hairline or the sheet lift, never both.

## Shapes

Radius language is borrowed from a printed card and a phone: 11px for tools and segmented controls, 12–14px for buttons, 18px for the begin card, 20px on the top corners of a sheet, and full pills only for state chips and the streak counter. Rows have no radius at all; they are ruled lines.

The recurring geometry is the four solfege shapes, always drawn as solid geometry in the current color at 9–15px: diamond (new), square (learning), oval (holding), triangle (sealed). "New" is the only hollow one, stroked at 2.6 units so it reads as an outline at 9px.

## Components

### Buttons
- **Shape:** 14px radius, 52px tall for primary, 48px for ghost, 44px for icon buttons.
- **Primary:** bone fill, ink text, 22px horizontal padding, label plus a 19px arrow on the opposite end. This is the One Bright Object.
- **Hover / Focus:** hover lightens the fill to #FFFAF0; focus is a 2px brass outline at 2px offset, never a glow.
- **Ghost:** transparent with a 20% bone border; used for "Return to new".
- **Tool buttons:** 44px, hairline border, 13px dim label with a 19px icon; they read as tools, not actions.

### Chips
- **Style:** 1px border in the current state color, transparent fill, pill radius, 11.5px uppercase-ish label preceded by a 9px shape.
- **State:** the chip carries the shape and the word together so color is never the only cue.

### Cards / Containers
- **Corner Style:** 18px on the begin card, 14px on settings groups, 20px on sheets.
- **Background:** Ink Raised on Ink.
- **Border:** one hairline, nothing else.
- **Internal Padding:** 22px in the begin card, 16px in settings rows, 20px in a sheet.
- Settings use a grouped inset list, not stacked cards.

### Inputs / Fields
- **Style:** the recitation field is invisible. The verse itself is the input surface: the first letter of each word is the only keystroke required, and the word completes when that letter lands. Tapping the text focuses a transparent 16px input laid over it, so no box, border, or placeholder appears inside the measure.
- **Focus:** the only visible focus signal is the brass caret, which blinks at the insertion point.
- **Error:** a wrong letter never inserts itself; the caret shakes 3px for 320ms and the accuracy figure drops. There is no red state inside the verse, because the text is not the error.

### Navigation
- **Style:** bottom tab bar (Today, The sixty, Settings) with 10.5px labels and 22px authored icons over a blurred ink wash; at 780px it becomes a left rail with 13.5px labels and the current item on Ink Raised. Current item takes bone text and a brass icon.

### Signature Component: The Shape Sheet
Five ruled rows, one per TMS series, each holding twelve solfege marks in course order. The mark's geometry is the verse's stage and its color is the same stage, so the sheet is readable at a glance and countable at 9px. It is the only progress visual in the product: no bars, no rings, no percentages beyond "0 of 60 sealed".

## Do's and Don'ts

### Do:
- **Do** keep every missing letter a 1px brass rule at 22% opacity, set on the baseline, ending exactly where the word ends.
- **Do** pair a shape with its word in any chip or legend; the shape is the state, the word is the fallback.
- **Do** let one element per screen be filled; everything else is bordered, ruled, or quiet.
- **Do** keep the verse measure at 34ch in the cover and 40ch in a sheet.
- **Do** honor `prefers-reduced-motion` by collapsing the sheet rise and the caret blink to a single frame.

### Don't:
- **Don't** introduce a fifth state glyph, a progress ring, a streak flame, or a percentage badge; the shape alphabet and the sealed count are complete.
- **Don't** put display type in buttons, tabs, chips, or settings rows.
- **Don't** add a second accent hue for "success" or "brand"; sage and rubric already own those jobs.
- **Don't** box a list row in a card, and don't nest a card in a card.
- **Don't** use gradient text, glass, sparkles, or emoji anywhere in the interface.
