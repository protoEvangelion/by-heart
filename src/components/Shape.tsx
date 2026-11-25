import type { Stage } from "../lib/srs";

const SHAPES: Record<Stage, string> = {
  // fa - triangle
  fa: "M12 2.6 22 21.4H2Z",
  // la - square
  la: "M3.4 3.4h17.2v17.2H3.4z",
  // mi - diamond
  mi: "M12 1.8 22.2 12 12 22.2 1.8 12z",
  // sol - oval
  sol: "",
};

export function ShapeGlyph({ stage, size = 12 }: { stage: Stage; size?: number }) {
  if (stage === "sol") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="glyph">
        <ellipse cx="12" cy="12" rx="9.4" ry="9.4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="glyph">
      <path d={SHAPES[stage]} fill="currentColor" />
    </svg>
  );
}

export function ShapeSheetRow({ stages }: { stages: Stage[] }) {
  return (
    <div className="shape-row" aria-hidden="true">
      {stages.map((stage, i) => (
        <span key={i} className={`shape-cell stage-${stage}`}>
          <ShapeGlyph stage={stage} size={11} />
        </span>
      ))}
    </div>
  );
}

export function ShapeLegend() {
  return (
    <ul className="legend">
      {(
        [
          ["mi", "New", "not begun"],
          ["la", "Learning", "days"],
          ["sol", "Holding", "weeks"],
          ["fa", "Sealed", "month or more"],
        ] as const
      ).map(([stage, label, note]) => (
        <li key={stage} className={`legend-item stage-${stage}`}>
          <ShapeGlyph stage={stage} size={11} />
          <span>
            <b>{label}</b>
            <em>{note}</em>
          </span>
        </li>
      ))}
    </ul>
  );
}
