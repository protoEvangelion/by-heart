import { VERSES, SERIES } from "../data/verses";import {
  countsByStage,
  dueEntries,
  formatDate,
  newEntries,
  nextDueDate,
  stageOf,
  todayISO,
  type DueEntry,
  type Progress,
} from "../lib/srs";
import { ArrowRight, Share } from "../components/Icons";
import { ShapeGlyph } from "../components/Shape";

const maskLine = (line: string, firstLetters: boolean) => {
  const words = line.split(" ").slice(0, 8);
  return words.map((word, wi) => (
    <span key={wi}>
      <span className="mask-word">
        <span className="mask-first">{word.slice(0, firstLetters ? 1 : 0)}</span>
        <span className="mask-rest">
          <span className="void-text">{word.slice(firstLetters ? 1 : 0)}</span>
        </span>
      </span>
      {wi < words.length - 1 ? " " : null}
    </span>
  ));
};

export function Today({
  progress,
  queue,
  onBegin,
  onResume,
  onOpenSeries,
  onOpenVerse,
  streak,
  canInstall,
  onInstall,
  firstLetters,
}: {
  progress: Record<string, Progress>;
  queue: DueEntry[];
  onBegin: () => void;
  onResume: () => void;
  onOpenSeries: (letter: string) => void;
  onOpenVerse: (id: string) => void;
  streak: number;
  canInstall: boolean;
  onInstall: () => void;
  firstLetters: boolean;
}) {
  const today = todayISO();
  const due = dueEntries(progress, today);
  const fresh = newEntries(progress);
  const counts = countsByStage(progress);
  const next = nextDueDate(progress, today);
  const sessionLeft = queue.length;
  const minutes = Math.max(1, Math.round((sessionLeft * 38) / 60));
  const sealed = counts.fa;
  const first = queue[0]?.verse;

  return (
    <div className="screen">
      <header className="topbar">
        <div className="wordmark">
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width={21} height={21}>
              <path
                d="M12 21C12 21 2.2 15.2 2.2 9 2.2 5.8 4.7 3.4 7.7 3.4c2 0 3.7 1.2 4.3 2.9.6-1.7 2.3-2.9 4.3-2.9 3 0 5.5 2.4 5.5 5.6C21.8 15.2 12 21 12 21Z"
                fill="var(--bone)"
              />
              <path d="M9.2 13 12 9.4 14.8 13" fill="none" stroke="var(--brass)" strokeWidth="1.8" strokeLinejoin="miter" />
            </svg>
          </span>
          by heart
        </div>
        {canInstall ? (
          <button className="icon-btn" onClick={onInstall} aria-label="Install by heart">
            <Share width={19} height={19} />
          </button>
        ) : (
          streak > 1 && (
            <span className="streak" title="Days recited in a row">
              <span className="tnum">{streak}</span> day streak
            </span>
          )
        )}
      </header>

      <div className="today-head">
        <h1>Daily set</h1>
        <p className="sub">
          {formatDate(today)}
          <span className="dot" aria-hidden="true" />
          {due.length > 0 ? `${due.length} due` : fresh.length > 0 ? "nothing due" : "all reviewed"}
        </p>
      </div>

      <section className="begin" aria-label="Start today's recitation">
        <div className="begin-copy">
          <p className="begin-line">
            {sessionLeft > 0 ? (
              <>
                <span className="tnum">{sessionLeft}</span> {sessionLeft === 1 ? "verse" : "verses"} to recite
              </>
            ) : (
              <>Nothing is due today</>
            )}
          </p>
          <p className="begin-meta">
            {sessionLeft > 0
              ? `About ${minutes} min · ${fresh.length > 0 && due.length === 0 ? "two new verses first" : "most overdue first"}`
              : next
                ? `Next review ${formatDate(next)}`
                : "Come back tomorrow"}
          </p>
        </div>

        {first && (
          <div className="begin-sample">
            <div className="sample-head">
              <span className="preview-ref">{first.ref}</span>
              <span className="tag">LSB</span>
              <span className="preview-note">every missing letter is yours to type</span>
            </div>
            <p className="preview-verse">
              {maskLine(first.lines[0], firstLetters)}
              <span className="preview-rest">…</span>
            </p>
          </div>
        )}

        <button className="primary" onClick={sessionLeft > 0 ? onBegin : onResume} disabled={sessionLeft === 0 && !next}>
          {sessionLeft > 0 ? "Begin" : next ? "Review once more" : "Done for today"}
          <ArrowRight width={19} height={19} />
        </button>
      </section>

      <section className="sixty" aria-label="Progress across the sixty verses">
        <div className="section-head">
          <h2>The sixty</h2>
          <p className="section-note tnum">
            {sealed} of 60 sealed
          </p>
        </div>
        <div className="sheet">
          {SERIES.map((s) => {
            const rows = VERSES.filter((v) => v.series === s.letter);
            return (
              <button key={s.letter} className="sheet-row" onClick={() => onOpenSeries(s.letter)}>
                <span className="sheet-letter">{s.letter}</span>
                <span className="sheet-name">{s.name}</span>
                <span className="sheet-marks">
                  {rows.map((v) => {
                    const stage = stageOf(progress[v.id]);
                    return (
                      <span key={v.id} className={`mark-cell stage-${stage}`}>
                        <ShapeGlyph stage={stage} size={12} />
                      </span>
                    );
                  })}
                </span>
              </button>
            );
          })}
        </div>
        <p className="sheet-legend">
          <span className="stage-mi">
            <ShapeGlyph stage="mi" size={9} /> new
          </span>
          <span className="stage-la">
            <ShapeGlyph stage="la" size={9} /> learning
          </span>
          <span className="stage-sol">
            <ShapeGlyph stage="sol" size={9} /> holding
          </span>
          <span className="stage-fa">
            <ShapeGlyph stage="fa" size={9} /> sealed
          </span>
        </p>
      </section>

      {due.length > 0 && (
        <section className="due" aria-label="Verses due today">
          <div className="section-head">
            <h2>Due today</h2>
            <p className="section-note tnum">{due.length} waiting</p>
          </div>
          <ul className="rows">
            {due.slice(0, 12).map((entry) => {
              const stage = stageOf(entry.progress);
              return (
                <li key={entry.verse.id}>
                  <button className="row" onClick={() => onOpenVerse(entry.verse.id)}>
                    <span className={`state stage-${stage}`}>
                      <ShapeGlyph stage={stage} size={11} />
                    </span>
                    <span className="row-main">
                      <span className="row-ref">{entry.verse.ref}</span>
                      <span className="row-preview">{entry.verse.topic}</span>
                    </span>
                    <span className={`row-due ${entry.overdue > 0 ? "is-late" : ""}`}>
                      {entry.overdue === 0 ? "today" : entry.overdue === 1 ? "1 day late" : `${entry.overdue} days late`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
