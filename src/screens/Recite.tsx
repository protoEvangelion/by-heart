import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Verse } from "../data/verses";
import type { Grade, Progress } from "../lib/srs";
import { nextLabel, STAGES, stageOf } from "../lib/srs";
import { Bulb, Close, Eye, Key, Rotate } from "../components/Icons";
import { ShapeGlyph } from "../components/Shape";

const isLetter = (ch: string) => /[\p{L}\p{N}]/u.test(ch);

type Char = { ch: string; letterIdx: number };
type Token = { kind: "word" | "sep"; chars: Char[]; plain: string; firstLetter: number; letterCount: number };

function tokenize(lines: string[]): { tokens: Token[]; totalLetters: number } {
  const tokens: Token[] = [];
  let letter = 0;
  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) tokens.push({ kind: "sep", chars: [], plain: "\n", firstLetter: -1, letterCount: 0 });
    for (const part of line.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        tokens.push({ kind: "sep", chars: [], plain: " ", firstLetter: -1, letterCount: 0 });
        continue;
      }
      const first = letter;
      let count = 0;
      const chars = [...part].map((ch) => {
        if (isLetter(ch)) {
          count += 1;
          return { ch, letterIdx: letter++ };
        }
        return { ch, letterIdx: -1 };
      });
      tokens.push({ kind: "word", chars, plain: part, firstLetter: first, letterCount: count });
    }
  });
  return { tokens, totalLetters: letter };
}

export function Recite({
  verse,
  progress,
  firstLetters,
  index,
  total,
  onGrade,
  onClose,
}: {
  verse: Verse;
  progress: Progress | undefined;
  firstLetters: boolean;
  index: number;
  total: number;
  onGrade: (grade: Grade) => void;
  onClose: () => void;
}) {
  const { tokens, totalLetters } = useMemo(() => tokenize(verse.lines), [verse]);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [hinted, setHinted] = useState(0);
  const [peeked, setPeeked] = useState(false);
  const [hit, setHit] = useState(false);
  const [focused, setFocused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const letters = useMemo(() => [...verse.text.replace(/[^\p{L}\p{N}]/gu, "")], [verse.text]);
  const inputRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef<number | null>(null);

  const done = typed.length >= totalLetters;
  const stage = stageOf(progress);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (startedAt.current && !done) setElapsed(Date.now() - startedAt.current);
    }, 400);
    return () => window.clearInterval(id);
  }, [done]);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => window.clearTimeout(id);
  }, [verse.id]);

  const focus = useCallback(() => inputRef.current?.focus(), []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      if (!startedAt.current) startedAt.current = Date.now();
      if (raw.length <= typed.length) {
        setTyped(raw);
        return;
      }
      let accepted = typed;
      let missed = 0;
      for (let i = typed.length; i < raw.length; i += 1) {
        const expected = letters[accepted.length];
        if (!expected) break;
        if (raw[i].toLowerCase() === expected.toLowerCase()) accepted += raw[i];
        else {
          missed += 1;
          break;
        }
      }
      if (missed) {
        setErrors((n) => n + 1);
        setHit(true);
        window.setTimeout(() => setHit(false), 340);
        if (navigator.vibrate) navigator.vibrate(8);
      }
      setTyped(accepted);
      if (accepted.length >= totalLetters) {
        setElapsed(startedAt.current ? Date.now() - startedAt.current : 0);
        setFocused(false);
        inputRef.current?.blur();
      }
    },
    [typed, totalLetters, letters]
  );

  const wpm = useMemo(() => {
    if (!elapsed) return 0;
    return Math.round(typed.length / 5 / (elapsed / 60000));
  }, [elapsed, typed.length]);

  const accuracy = typed.length + errors === 0 ? 100 : Math.round((typed.length / (typed.length + errors)) * 100);
  const suggested: Grade = errors === 0 && !peeked && hinted === 0 ? "easy" : errors <= 2 && hinted <= 1 ? "good" : "again";

  const words = tokens.filter((t) => t.kind === "word");
  const wordOrdinal = new Map<Token, number>(words.map((t, i) => [t, i]));

  const renderToken = (token: Token, tokenIndex: number) => {
    if (token.kind === "sep") {
      return token.plain === "\n" ? <br key={`br${tokenIndex}`} /> : " ";
    }
    const typedInWord = Math.max(0, Math.min(typed.length - token.firstLetter, token.letterCount));
    const hintedWord = (wordOrdinal.get(token) ?? 0) < hinted;
    const nodes: React.ReactNode[] = [];
    let masked: Char[] = [];

    const flushMasked = (key: string) => {
      if (masked.length === 0) return;
      nodes.push(
        <span className="blank" key={`b${key}`}>
          <span className="void-text">{masked.map((c) => c.ch).join("")}</span>
        </span>
      );
      masked = [];
    };

    token.chars.forEach((char, i) => {
      if (!isLetter(char.ch)) {
        flushMasked(`${token.firstLetter}-${i}`);
        nodes.push(
          <span className="punct" key={`p${token.firstLetter}-${i}`}>
            {char.ch}
          </span>
        );
        return;
      }
      const local = char.letterIdx - token.firstLetter;
      const isVisible = local < typedInWord || hintedWord;
      const isFirst = firstLetters && local === 0;
      if (isVisible || isFirst) {
        flushMasked(`${token.firstLetter}-${i}`);
        const isCaret = !done && local === typedInWord - 1;
        nodes.push(
          <span key={`v${char.letterIdx}`} className={isVisible ? "typed" : "first"}>
            {char.ch}
            {isCaret && <span className="caret" />}
          </span>
        );
      } else {
        masked.push(char);
      }
    });
    flushMasked(`end-${token.firstLetter}`);

    if (!done && typedInWord === 0 && token.letterCount > 0 && typed.length === token.firstLetter) {
      nodes.unshift(<span className="caret" key={`c${token.firstLetter}`} />);
    }
    return <span key={`w${token.firstLetter}`}>{nodes}</span>;
  };

  return (
    <section className="recite" aria-label={`Recite ${verse.ref}`}>
      <header className="recite-head">
        <button className="icon-btn" onClick={onClose} aria-label="Leave recitation">
          <Close />
        </button>
        <div className="recite-progress" aria-label={`Verse ${index} of ${total}`}>
          <span className="tnum">
            {index} / {total}
          </span>
          <span className="rail" aria-hidden="true">
            <span style={{ width: `${(index / total) * 100}%` }} />
          </span>
        </div>
        <button
          className={`text-btn ${peeked ? "is-on" : ""}`}
          onClick={() => {
            setPeeked((v) => !v);
            if (!peeked) focus();
          }}
          aria-pressed={peeked}
        >
          <Eye width={19} height={19} />
          {peeked ? "Hide" : "Peek"}
        </button>
      </header>

      <div className="recite-body">
        <div className="verse-meta">
          <h2 className="verse-ref">{verse.ref}</h2>
          <span className="tag">LSB</span>
          <span className={`state-chip stage-${stage}`}>
            <ShapeGlyph stage={stage} size={9} />
            {STAGES.find((s) => s.id === stage)?.label}
          </span>
        </div>
        <p className="verse-topic">
          {verse.series} · {verse.topic}
        </p>

        <div className={`verse-wrap ${hit ? "hit" : ""}`} onPointerDown={focus}>
          <div className={`verse ${peeked ? "is-peeked" : ""}`}>
            {tokens.map(renderToken)}
          </div>
          <input
            ref={inputRef}
            className="ghost-input"
            value={typed}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            aria-label={`Type ${verse.ref} from memory`}
          />
        </div>

        {!focused && !done && (
          <button className="tap-hint" onClick={focus}>
            <Key width={18} height={18} /> Tap here, then type the verse. Punctuation is already in place.
          </button>
        )}

        <p className="sr-only" role="status">
          {done ? "Verse complete. Choose a grade." : `${typed.length} of ${letters.length} letters typed`}
        </p>

        <div className="recite-meter">
          <span className="tnum">{accuracy}% accurate</span>
          <span className="dot" aria-hidden="true" />
          <span className="tnum">{wpm} wpm</span>
          <span className="dot" aria-hidden="true" />
          <span className="tnum">
            {typed.length} / {letters.length} letters
          </span>
        </div>
      </div>

      <footer className="recite-foot">
        {done ? (
          <div className="grades">
            <p className="grades-label">How did that feel?</p>
            <div className="grade-row">
              {(
                [
                  ["again", "Again", "missed it"],
                  ["hard", "Hard", "came slowly"],
                  ["good", "Good", "steady"],
                  ["easy", "Easy", "without effort"],
                ] as const
              ).map(([grade, label, note]) => (
                <button
                  key={grade}
                  className={`grade ${grade === suggested ? "is-suggested" : ""}`}
                  onClick={() => onGrade(grade)}
                >
                  <b>{label}</b>
                  <em>{nextLabel(progress, grade)}</em>
                  <span>{note}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="tools">
            <button
              className="tool"
              onClick={() => {
                setHinted((n) => Math.min(n + 1, words.length));
                focus();
              }}
            >
              <Bulb width={19} height={19} /> Hint a word
            </button>
            <button
              className="tool"
              onClick={() => {
                setPeeked(true);
                setHinted(words.length);
                focus();
              }}
            >
              <Eye width={19} height={19} /> Show it
            </button>
            <button
              className="tool"
              onClick={() => {
                setTyped("");
                setErrors(0);
                setHinted(0);
                setPeeked(false);
                startedAt.current = Date.now();
                focus();
              }}
            >
              <Rotate width={19} height={19} /> Start over
            </button>
          </div>
        )}
      </footer>
    </section>
  );
}
