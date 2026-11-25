import { useEffect, useMemo, useState } from "react";
import { BY_ID } from "./data/verses";
import { useAppState } from "./lib/store";
import {
  buildDailySet,
  stageOf,
  gradeProgress,
  reviewExtra,
  streakFrom,
  todayISO,
  type DueEntry,
  type Grade,
} from "./lib/srs";
import { Today } from "./screens/Today";
import { Library } from "./screens/Library";
import { Settings } from "./screens/Settings";
import { Recite } from "./screens/Recite";
import { VerseSheet } from "./screens/VerseSheet";
import { Library as LibraryIcon, Sliders, Today as TodayIcon } from "./components/Icons";
import { ShapeGlyph } from "./components/Shape";

type View = "today" | "library" | "settings";

type Session = { ids: string[]; index: number; againLeft: number };

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (window.navigator as unknown as { standalone?: boolean }).standalone === true;

export default function App() {
  const { state, record, setPrefs, reset, replace, backup } = useAppState();
  const [view, setView] = useState<View>(() => {
    const hash = window.location.hash.replace("#", "");
    return hash === "library" || hash === "settings" ? hash : "today";
  });
  const [openSeries, setOpenSeries] = useState<string[]>(["A"]);
  const [focusSeries, setFocusSeries] = useState<string | null>(null);
  const [openVerse, setOpenVerse] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [finished, setFinished] = useState<{ count: number; stages: string[] } | null>(null);
  const [standalone] = useState(isStandalone);
  const [installEvent, setInstallEvent] = useState<Event | null>(null);

  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    document.addEventListener("visibilitychange", bump);
    return () => document.removeEventListener("visibilitychange", bump);
  }, []);
  const today = todayISO();
  const queue = useMemo<DueEntry[]>(
    () => buildDailySet(state.progress, state.prefs.limit, today),
    [state.progress, state.prefs.limit, today]
  );
  const streak = streakFrom(state.history);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      setView(hash === "library" || hash === "settings" ? hash : "today");
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const hash = view === "today" ? "" : `#${view}`;
    if (window.location.hash !== hash) history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [view]);

  const begin = (ids: string[]) => {
    if (ids.length === 0) return;
    setSession({ ids, index: 0, againLeft: 2 });
    setOpenVerse(null);
  };

  const currentId = session ? session.ids[session.index] : null;
  const currentVerse = currentId ? BY_ID.get(currentId) : undefined;

  const handleGrade = (grade: Grade) => {
    if (!session || !currentVerse) return;
    const gradedProgress = gradeProgress(state.progress[currentVerse.id], grade, today);
    record(currentVerse.id, gradedProgress);
    const ids = [...session.ids];
    let againLeft = session.againLeft;
    if (grade === "again" && againLeft > 0) {
      ids.push(currentVerse.id);
      againLeft -= 1;
    }
    const next = session.index + 1;
    if (next >= ids.length) {
      const stages = ids
        .slice(0, session.index + 1)
        .map((id) => (id === currentVerse.id ? stageOf(gradedProgress) : stageOf(state.progress[id])));
      setFinished({ count: session.index + 1, stages });
      setSession(null);
      return;
    }
    setSession({ ids, index: next, againLeft });
  };

  const handleInstall = async () => {
    if (installEvent && "prompt" in installEvent) {
      await (installEvent as unknown as { prompt: () => Promise<void> }).prompt();
      setInstallEvent(null);
      return;
    }
    setView("settings");
  };

  return (
    <div className="app">
      <nav className="tabbar" aria-label="Sections">
        {!standalone && (
          <div className="rail-brand">
            <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
              <path
                d="M12 21C12 21 2.2 15.2 2.2 9 2.2 5.8 4.7 3.4 7.7 3.4c2 0 3.7 1.2 4.3 2.9.6-1.7 2.3-2.9 4.3-2.9 3 0 5.5 2.4 5.5 5.6C21.8 15.2 12 21 12 21Z"
                fill="var(--bone)"
              />
              <path d="M9.2 13 12 9.4 14.8 13" fill="none" stroke="var(--brass)" strokeWidth="1.8" strokeLinejoin="miter" />
            </svg>
            by heart
          </div>
        )}
        <button className="tab" aria-current={view === "today" ? "page" : undefined} onClick={() => setView("today")}>
          <TodayIcon />
          Today
        </button>
        <button
          className="tab"
          aria-current={view === "library" ? "page" : undefined}
          onClick={() => setView("library")}
        >
          <LibraryIcon />
          The sixty
        </button>
        <button
          className="tab"
          aria-current={view === "settings" ? "page" : undefined}
          onClick={() => setView("settings")}
        >
          <Sliders />
          Settings
        </button>
      </nav>

      <main id="main">
      {view === "today" && (
        <Today
          progress={state.progress}
          queue={queue}
          streak={streak}
          canInstall={!standalone}
          onInstall={handleInstall}
          firstLetters={state.prefs.firstLetters}
          onBegin={() => begin(queue.map((entry) => entry.verse.id))}
          onResume={() => {
            const extra = reviewExtra(state.progress, 5);
            begin(extra.map((entry) => entry.verse.id));
          }}
          onOpenSeries={(letter) => {
            setOpenSeries((current) => (current.includes(letter) ? current : [...current, letter]));
            setFocusSeries(letter);
            setView("library");
          }}
          onOpenVerse={(id) => setOpenVerse(id)}
        />
      )}

      {view === "library" && (
        <Library
          progress={state.progress}
          focusSeries={focusSeries}
          openSeries={openSeries}
          onToggleSeries={(letter) =>
            setOpenSeries((current) =>
              current.includes(letter) ? current.filter((l) => l !== letter) : [...current, letter]
            )
          }
          onOpenVerse={(id) => setOpenVerse(id)}
        />
      )}

      {view === "settings" && (
        <Settings
          progress={state.progress}
          prefs={state.prefs}
          setPrefs={setPrefs}
          backup={backup}
          onImport={replace}
          onReset={reset}
          standalone={standalone}
        />
      )}
      </main>

      {openVerse && BY_ID.get(openVerse) && (
        <VerseSheet
          verse={BY_ID.get(openVerse)!}
          progress={state.progress}
          onClose={() => setOpenVerse(null)}
          onRecite={() => begin([openVerse])}
          onReset={() => {
            record(openVerse, { interval: 0, due: today, last: null, reps: 0, lapses: 0 });
            setOpenVerse(null);
          }}
        />
      )}

      {session && currentVerse && (
        <Recite
          key={`${currentVerse.id}-${session.index}`}
          verse={currentVerse}
          progress={state.progress[currentVerse.id]}
          firstLetters={state.prefs.firstLetters}
          index={session.index + 1}
          total={session.ids.length}
          onGrade={handleGrade}
          onClose={() => {
            if (session.index > 0) {
              setFinished({
                count: session.index,
                stages: session.ids.slice(0, session.index).map((id) => stageOf(state.progress[id])),
              });
            }
            setSession(null);
          }}
        />
      )}

      {finished && (
        <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label="Session complete">
          <button className="scrim" onClick={() => setFinished(null)} aria-label="Close" />
          <div className="sheet-panel">
            <div className="sheet-grab" aria-hidden="true" />
            <div className="done-panel">
              <h2>
                {finished.count} {finished.count === 1 ? "verse" : "verses"} recited
              </h2>
              <p>Graded and scheduled. The next review lands on the day it is due, and not before.</p>
              <div className="done-marks" aria-hidden="true">
                {finished.stages.slice(0, 12).map((stage, i) => (
                  <span key={i} className={`mark-cell stage-${stage}`}>
                    <ShapeGlyph stage={stage as "fa"} size={15} />
                  </span>
                ))}
              </div>
              <button className="primary" style={{ width: "100%" }} onClick={() => setFinished(null)}>
                Done for today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
