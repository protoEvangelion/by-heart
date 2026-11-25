import { useRef, useState } from "react";
import { VERSES } from "../data/verses";
import { countsByStage, type Progress } from "../lib/srs";
import type { Prefs } from "../lib/store";
import { Check, Download, Rotate, Upload } from "../components/Icons";

export function Settings({
  progress,
  prefs,
  setPrefs,
  backup,
  onImport,
  onReset,
  standalone,
}: {
  progress: Record<string, Progress>;
  prefs: Prefs;
  setPrefs: (patch: Partial<Prefs>) => void;
  backup: string;
  onImport: (data: unknown) => void;
  onReset: () => void;
  standalone: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const download = () => {
    const blob = new Blob([backup], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `by-heart-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Backup saved.");
  };

  const readFile = async (file: File) => {
    try {
      onImport(JSON.parse(await file.text()));
      setMessage("Progress restored.");
    } catch {
      setMessage("That file is not a by heart backup.");
    }
  };

  const sealed = countsByStage(progress).fa;

  return (
    <div className="screen">
      <div className="page-head">
        <h1>Settings</h1>
        <p className="sub">
          {VERSES.length} verses
          <span className="dot" aria-hidden="true" />
          {sealed} sealed
        </p>
      </div>

      <section className="group">
        <h2 className="group-title">Recitation</h2>
        <div className="group-body">
          <div className="setting-row">
            <div>
              <p className="setting-label">Daily limit</p>
              <p className="setting-note">The most verses a single day will ask for.</p>
            </div>
            <div className="segmented" role="group" aria-label="Daily limit">
              {[5, 10, 15].map((n) => (
                <button
                  key={n}
                  className={prefs.limit === n ? "is-on" : ""}
                  aria-pressed={prefs.limit === n}
                  onClick={() => setPrefs({ limit: n })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-row">
            <div>
              <p className="setting-label">First letters</p>
              <p className="setting-note">Type only the first letter of each word and the word fills in. Off means typing every letter.</p>
            </div>
            <button
              className={`switch ${prefs.firstLetters ? "is-on" : ""}`}
              role="switch"
              aria-checked={prefs.firstLetters}
              onClick={() => setPrefs({ firstLetters: !prefs.firstLetters })}
            >
              <span />
            </button>
          </div>
        </div>
      </section>

      <section className="group">
        <h2 className="group-title">Your progress</h2>
        <div className="group-body">
          <button className="link-row" onClick={download}>
            <Download width={19} height={19} />
            <span>Export a backup</span>
          </button>
          <button className="link-row" onClick={() => fileRef.current?.click()}>
            <Upload width={19} height={19} />
            <span>Restore from a backup</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void readFile(file);
              e.target.value = "";
            }}
          />
          <button
            className="link-row danger"
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              onReset();
              setConfirmReset(false);
              setMessage("Schedule reset. Every verse is new again.");
            }}
          >
            <Rotate width={19} height={19} />
            <span>{confirmReset ? "Tap again to erase the schedule" : "Reset the schedule"}</span>
          </button>
        </div>
        {message && (
          <p className="inline-message" role="status">
            <Check width={15} height={15} />
            {message}
          </p>
        )}
      </section>

      <section className="group">
        <h2 className="group-title">On your home screen</h2>
        <div className="group-body">
          {standalone ? (
            <p className="setting-note padded">
              Running as an installed app. It works with no network, and nothing leaves this device.
            </p>
          ) : (
            <ol className="steps">
              <li>Open this page in Safari on iPhone or iPad.</li>
              <li>
                Tap the Share button, then <b>Add to Home Screen</b>.
              </li>
              <li>Launch it from the icon. It runs full screen and offline.</li>
            </ol>
          )}
        </div>
      </section>

      <section className="group">
        <h2 className="group-title">About</h2>
        <div className="group-body">
          <p className="setting-note padded">
            Verse text is the Legacy Standard Bible, copyright 2021 by The Lockman Foundation. Groupings are The Navigators
            Topical Memory System, 60 verses in five series of twelve. Progress lives only in this browser; export a backup
            before clearing site data.
          </p>
          <p className="setting-note padded tnum">by heart · version 1.0</p>
        </div>
      </section>
    </div>
  );
}
