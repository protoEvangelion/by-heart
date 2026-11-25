import { useCallback, useEffect, useMemo, useState } from "react";
import { todayISO, type Progress } from "./srs";

export type Prefs = {
  limit: number;
  firstLetters: boolean;
  goalPercent: number;
};

export type AppState = {
  progress: Record<string, Progress>;
  prefs: Prefs;
  history: string[];
  installedAt: string;
  schema: 1;
};

const KEY = "by-heart:v1";

export const defaultState = (): AppState => ({
  progress: {},
  prefs: { limit: 10, firstLetters: true, goalPercent: 90 },
  history: [],
  installedAt: todayISO(),
  schema: 1,
});

function read(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState(),
      ...parsed,
      prefs: { ...defaultState().prefs, ...(parsed.prefs ?? {}) },
      progress: parsed.progress ?? {},
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return defaultState();
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(() => read());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked: the app keeps working for this session */
    }
  }, [state]);

  const record = useCallback((verseId: string, next: Progress) => {
    setState((s) => {
      const today = todayISO();
      return {
        ...s,
        progress: { ...s.progress, [verseId]: next },
        history: s.history.includes(today) ? s.history : [...s.history, today],
      };
    });
  }, []);

  const setPrefs = useCallback((patch: Partial<Prefs>) => {
    setState((s) => ({ ...s, prefs: { ...s.prefs, ...patch } }));
  }, []);

  const reset = useCallback(() => setState(defaultState()), []);

  const replace = useCallback((incoming: unknown) => {
    const data = incoming as Partial<AppState>;
    if (!data || typeof data !== "object" || !data.progress) throw new Error("Not a by heart backup");
    setState({
      ...defaultState(),
      ...data,
      prefs: { ...defaultState().prefs, ...(data.prefs ?? {}) },
      progress: data.progress,
      history: Array.isArray(data.history) ? data.history : [],
    });
  }, []);

  const backup = useMemo(() => JSON.stringify(state, null, 2), [state]);

  return { state, record, setPrefs, reset, replace, backup };
}
