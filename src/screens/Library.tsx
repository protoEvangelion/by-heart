import { useEffect, useRef } from "react";
import { SERIES, VERSES, type Verse } from "../data/verses";
import { stageOf, daysBetween, todayISO, STAGES, type Progress } from "../lib/srs";
import { ChevronDown } from "../components/Icons";
import { ShapeGlyph, ShapeLegend } from "../components/Shape";

function dueLabel(verse: Verse, progress: Record<string, Progress>) {
  const p = progress[verse.id];
  if (!p || p.reps === 0) return { text: "new", late: false };
  const diff = daysBetween(todayISO(), p.due);
  if (diff < 0) return { text: `${-diff}d late`, late: true };
  if (diff === 0) return { text: "due", late: true };
  if (diff === 1) return { text: "tomorrow", late: false };
  return { text: `in ${diff}d`, late: false };
}

const preview = (verse: Verse) => verse.text.split(" ").slice(0, 6).join(" ");

export function Library({
  progress,
  focusSeries,
  onOpenVerse,
  openSeries,
  onToggleSeries,
}: {
  progress: Record<string, Progress>;
  focusSeries: string | null;
  onOpenVerse: (id: string) => void;
  openSeries: string[];
  onToggleSeries: (letter: string) => void;
}) {
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!focusSeries) return;
    const el = refs.current[focusSeries];
    if (el) window.setTimeout(() => el.scrollIntoView({ block: "start", behavior: "smooth" }), 60);
  }, [focusSeries]);

  return (
    <div className="screen">
      <div className="page-head">
        <h1>The sixty</h1>
        <p className="sub">
          Topical Memory System
          <span className="dot" aria-hidden="true" />
          Legacy Standard Bible
        </p>
      </div>

      <ShapeLegend />

      <div className="series-list">
        {SERIES.map((s) => {
          const verses = VERSES.filter((v) => v.series === s.letter);
          const open = openSeries.includes(s.letter);
          const sealed = verses.filter((v) => stageOf(progress[v.id]) === "fa").length;
          const topics = [...new Set(verses.map((v) => v.topic))];
          return (
            <section
              key={s.letter}
              className={`series ${open ? "is-open" : ""}`}
              ref={(el) => {
                refs.current[s.letter] = el;
              }}
            >
              <h2>
                <button
                  className="series-head"
                  onClick={() => onToggleSeries(s.letter)}
                  aria-expanded={open}
                >
                  <span className="series-letter">{s.letter}</span>
                  <span className="series-main">
                    <span className="series-name">{s.name}</span>
                    <span className="series-meta tnum">
                      {sealed} of 12 sealed
                      <span className="dot" aria-hidden="true" />
                      {verses.length} verses
                    </span>
                  </span>
                  <span className="sheet-marks compact" aria-hidden="true">
                    {verses.map((v) => {
                      const stage = stageOf(progress[v.id]);
                      return (
                        <span key={v.id} className={`mark-cell stage-${stage}`}>
                          <ShapeGlyph stage={stage} size={9} />
                        </span>
                      );
                    })}
                  </span>
                  <ChevronDown className={`chev ${open ? "is-open" : ""}`} width={18} height={18} />
                </button>
              </h2>

              {open && (
                <div className="series-body">
                  {topics.map((topic) => (
                    <div key={topic} className="topic">
                      <p className="topic-name">{topic}</p>
                      <ul className="rows tight">
                        {verses
                          .filter((v) => v.topic === topic)
                          .map((verse) => {
                            const stage = stageOf(progress[verse.id]);
                            const due = dueLabel(verse, progress);
                            return (
                              <li key={verse.id}>
                                <button className="row" onClick={() => onOpenVerse(verse.id)}>
                                  <span className={`state stage-${stage}`}>
                                    <ShapeGlyph stage={stage} size={11} />
                                  </span>
                                  <span className="row-main">
                                    <span className="row-ref">{verse.ref}</span>
                                    <span className="row-preview">{preview(verse)}</span>
                                  </span>
                                  <span className={`row-due ${due.late ? "is-late" : ""}`}>{due.text}</span>
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="footnote">
        Scripture quotations are from the Legacy Standard Bible, copyright 2021 by The Lockman Foundation. All rights reserved.
        Verse groupings follow The Navigators Topical Memory System. This is an independent study tool, not affiliated with The
        Navigators, NavPress or The Lockman Foundation.
      </p>
    </div>
  );
}

export function StageName({ progress, id }: { progress: Record<string, Progress>; id: string }) {
  const stage = stageOf(progress[id]);
  return <>{STAGES.find((s) => s.id === stage)?.label}</>;
}
