import type { Verse } from "../data/verses";
import { daysBetween, nextDueDate, stageOf, STAGES, todayISO, type Progress } from "../lib/srs";
import { Close } from "../components/Icons";
import { ShapeGlyph } from "../components/Shape";

export function VerseSheet({
  verse,
  progress,
  onClose,
  onRecite,
  onReset,
}: {
  verse: Verse;
  progress: Record<string, Progress>;
  onClose: () => void;
  onRecite: () => void;
  onReset: () => void;
}) {
  const p = progress[verse.id];
  const stage = stageOf(p);
  const due = p ? daysBetween(todayISO(), p.due) : null;

  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label={verse.ref}>
      <button className="scrim" onClick={onClose} aria-label="Close" />
      <div className="sheet-panel">
        <div className="sheet-grab" aria-hidden="true" />
        <div className="sheet-top">
          <span className={`state stage-${stage}`}>
            <ShapeGlyph stage={stage} size={11} />
          </span>
          <span className="sheet-state">
            {STAGES.find((s) => s.id === stage)?.label}
            {p && (
              <em>
                {p.interval} day interval · {p.lapses === 0 ? "no lapses" : `${p.lapses} lapse${p.lapses > 1 ? "s" : ""}`}
              </em>
            )}
          </span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <h2 className="verse-ref big">{verse.ref}</h2>
        <p className="verse-topic">
          {verse.series} · {verse.seriesName} · {verse.topic}
        </p>

        <div className={`verse read poem-${verse.poem}`}>
          {verse.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <p className="sheet-schedule">
          {p
            ? due !== null && due <= 0
              ? `Due now${due < 0 ? ` (${-due} days late)` : ""}`
              : `Next review ${nextDueDate(progress, todayISO()) === p.due ? "scheduled" : `${p.due}`} · ${p.due}`
            : "Not started. It joins the daily set in course order."}
        </p>

        <div className="sheet-actions">
          <button className="primary" onClick={onRecite}>
            Recite this verse
          </button>
          {p && (
            <button className="ghost" onClick={onReset}>
              Return to new
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
