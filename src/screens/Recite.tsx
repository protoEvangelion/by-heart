import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Verse } from "../data/verses";
import { nextLabel, STAGES, stageOf, type Grade, type Progress } from "../lib/srs";
import { Bulb, Close, Eye, Key, Rotate } from "../components/Icons";
import { ShapeGlyph } from "../components/Shape";

const isLetter = (ch: string) => /[\p{L}\p{N}]/u.test(ch);
const onlyLetters = (s: string) => s.replace(/[^\p{L}\p{N}]/gu, "");

type Char = { ch: string; letterIdx: number };
type Word = { chars: Char[]; firstLetter: number; letterCount: number; letters: string[] };
type Token = { kind: "word" | "sep"; word?: Word; plain: string };

function tokenize(lines: string[]) {
  const tokens: Token[] = [];
  let letter = 0;
  for (const [lineIndex, line] of lines.entries()) {
    if (lineIndex > 0) tokens.push({ kind: "sep", plain: "\n" });
    for (const part of line.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        tokens.push({ kind: "sep", plain: " " });
        continue;
      }
      const firstLetter = letter;
      const letters: string[] = [];
      const chars = [...part].map((ch) => {
        if (!isLetter(ch)) return { ch, letterIdx: -1 };
        letters.push(ch.toLowerCase());
        return { ch, letterIdx: letter++ };
      });
      tokens.push({ kind: "word", plain: part, word: { chars, firstLetter, letterCount: letters.length, letters } });
    }
  }
  const words = tokens.flatMap((t) => (t.word ? [t.word] : []));
  const typedWords = words.filter((w) => w.letterCount > 0);
  return { tokens, words, typedWords, totalLetters: letter };
}

/** One word of the verse. Memoised on primitives so typing only repaints the active word. */
const WordSpan = memo(function WordSpan({
  word,
  visible,
  hinted,
  firstLetters,
  caretLetter,
}: {
  word: Word;
  visible: number;
  hinted: boolean;
  firstLetters: boolean;
  caretLetter: number;
}) {
  const nodes: React.ReactNode[] = [];
  let masked: Char[] = [];
  const flush = (key: string) => {
    if (!masked.length) return;
    nodes.push(
      <span className="blank" key={`b${key}`}>
        <span className="void-text">{masked.map((c) => c.ch).join("")}</span>
      </span>
    );
    masked = [];
  };

  word.chars.forEach((char, i) => {
    if (!isLetter(char.ch)) {
      flush(`${i}`);
      nodes.push(
        <span className="punct" key={`p${i}`}>
          {char.ch}
        </span>
      );
      return;
    }
    const local = char.letterIdx - word.firstLetter;
    const isFirst = firstLetters && local === 0;
    if (caretLetter < 0 && local === 0 && word.firstLetter === 0) {
      nodes.push(<span className="caret" key="lead" />);
    }
    if (local < visible || hinted || isFirst) {
      flush(`${i}`);
      nodes.push(
        <span key={`v${i}`} className={local < visible || hinted ? "typed" : "first"}>
          {char.ch}
        </span>
      );
    } else {
      masked.push(char);
    }
    if (char.letterIdx === caretLetter) nodes.push(<span className="caret" key={`c${i}`} />);
  });
  flush("end");

  return <span className="word">{nodes}</span>;
});

const Meter = memo(function Meter({ startedAt, done, revealed, target, unit }: {
  startedAt: number | null;
  done: boolean;
  revealed: number;
  target: number;
  unit: string;
}) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (done || !startedAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [done, startedAt]);
  const elapsed = startedAt ? Math.max(1, (done ? now || Date.now() : now || Date.now()) - startedAt) : 0;
  const wpm = elapsed ? Math.min(240, Math.round(revealed / 5 / (elapsed / 60000))) : 0;
  return (
    <div className="recite-meter">
      <span className="tnum">
        {revealed} / {target} {unit}
      </span>
      <span className="dot" aria-hidden="true" />
      <span className="tnum">{wpm} wpm</span>
    </div>
  );
});

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
  const { tokens, typedWords, totalLetters } = useMemo(() => tokenize(verse.lines), [verse]);
  const targets = useMemo(
    () => (firstLetters ? typedWords.map((w) => w.chars.find((c) => c.letterIdx >= 0)!.ch.toLowerCase()) : [...onlyLetters(verse.text).toLowerCase()]),
    [firstLetters, typedWords, verse.text]
  );

  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [hintedUntil, setHintedUntil] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [peeked, setPeeked] = useState(false);
  const [hit, setHit] = useState(false);
  const [focused, setFocused] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hitTimer = useRef<number | null>(null);
  const extra = useRef(0);

  const done = typed.length >= targets.length;

  /** Letters revealed by typing: a whole word per keystroke in first-letter mode. */
  const revealed = useMemo(() => {
    if (!firstLetters) return typed.length;
    let count = 0;
    for (let i = 0; i < typed.length; i += 1) count += typedWords[i]?.letterCount ?? 0;
    return count;
  }, [firstLetters, typed.length, typedWords]);

  /** First word not yet revealed; hints light up the words after it. */
  const frontier = useMemo(() => {
    const found = typedWords.findIndex((w) => w.firstLetter + w.letterCount > revealed);
    return found === -1 ? typedWords.length : found;
  }, [revealed, typedWords]);

  const caretLetter = done ? -1 : revealed - 1;

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 240);
    return () => window.clearTimeout(id);
  }, [verse.id]);

  useEffect(() => () => {
    if (hitTimer.current) window.clearTimeout(hitTimer.current);
  }, []);

  const focus = useCallback(() => inputRef.current?.focus({ preventScroll: true }), []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const incoming = onlyLetters(event.target.value);
      if (incoming.length <= typed.length) {
        setTyped(incoming);
        return;
      }
      let accepted = typed;
      let missed = false;
      for (let i = typed.length; i < incoming.length; i += 1) {
        const expected = targets[accepted.length];
        if (!expected) break;
        const ch = incoming[i].toLowerCase();
        if (ch === expected) {
          accepted += incoming[i];
          extra.current = 0;
          continue;
        }
        // Tolerance: someone spelling the whole word out in first-letter mode is
        // not wrong, so the extra letters of the word just opened are absorbed.
        const opened = firstLetters ? typedWords[accepted.length - 1] : undefined;
        if (opened && extra.current + 1 < opened.letters.length && opened.letters[extra.current + 1] === ch) {
          extra.current += 1;
          continue;
        }
        missed = true;
        break;
      }
      if (!startedAt) setStartedAt(Date.now());
      if (missed) {
        setErrors((n) => n + 1);
        setHit(true);
        if (hitTimer.current) window.clearTimeout(hitTimer.current);
        hitTimer.current = window.setTimeout(() => setHit(false), 340);
        if (navigator.vibrate) navigator.vibrate(8);
      }
      setTyped(accepted);
      if (accepted.length >= targets.length) {
        setFocused(false);
        inputRef.current?.blur();
      }
    },
    [firstLetters, startedAt, targets, typed, typedWords]
  );

  const accuracy = typed.length + errors === 0 ? 100 : Math.round((typed.length / (typed.length + errors)) * 100);
  const assisted = usedHint || peeked;
  const suggested: Grade = errors === 0 && !assisted ? "easy" : errors <= 2 && !peeked ? "good" : "again";
  const stage = stageOf(progress);

  return (
    <section className="recite" aria-label={`Recite ${verse.ref}`}>
      <header className="recite-head">
        <button className="icon-btn" onClick={onClose} aria-label="Leave recitation">
          <Close />
        </button>
        <div className="recite-progress">
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
            focus();
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
          <div className="verse">
            {tokens.map((token, i) => {
              if (token.kind === "sep") return token.plain === "\n" ? <br key={`br${i}`} /> : " ";
              const word = token.word!;
              return (
                <WordSpan
                  key={`w${word.firstLetter}`}
                  word={word}
                  visible={Math.max(0, Math.min(revealed - word.firstLetter, word.letterCount))}
                  hinted={typedWords.indexOf(word) > -1 && typedWords.indexOf(word) < hintedUntil}
                  firstLetters={firstLetters}
                  caretLetter={caretLetter}
                />
              );
            })}
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
            enterKeyHint="next"
            aria-label={`Type the first letter of each word of ${verse.ref}`}
          />
        </div>

        {!done && (
          <button
            className={`tap-hint ${focused ? "is-dim" : ""}`}
            onClick={focus}
            tabIndex={focused ? -1 : 0}
            aria-hidden={focused}
          >
            <Key width={18} height={18} /> Tap here, then type the first letter of each word.
          </button>
        )}

        <p className="sr-only" role="status">
          {done ? "Verse complete. Choose a grade." : ""}
        </p>

        <Meter
          startedAt={startedAt}
          done={done}
          revealed={firstLetters ? typed.length : revealed}
          target={firstLetters ? typedWords.length : totalLetters}
          unit={firstLetters ? "words" : "letters"}
        />
      </div>

      <footer className="recite-foot">
        {done ? (
          <div className="grades">
            <p className="grades-label">
              How did that feel? <span className="tnum">{accuracy}% accurate</span>
              {assisted && <span className="grades-note"> · you used a hint</span>}
            </p>
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
                setUsedHint(true);
                setHintedUntil((u) => Math.max(u, frontier) + 1);
                focus();
              }}
            >
              <Bulb width={19} height={19} /> Hint a word
            </button>
            <button
              className="tool"
              onClick={() => {
                setPeeked(true);
                setUsedHint(true);
                setHintedUntil(typedWords.length);
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
                setHintedUntil(0);
                setUsedHint(false);
                setPeeked(false);
                setStartedAt(null);
                extra.current = 0;
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
