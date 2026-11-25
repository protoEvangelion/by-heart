import { VERSES, type Verse } from "../data/verses";

export type Stage = "mi" | "la" | "sol" | "fa";

export type Progress = {
  interval: number;
  due: string;
  last: string | null;
  reps: number;
  lapses: number;
};

export type Grade = "again" | "hard" | "good" | "easy";

export const STAGES: { id: Stage; label: string; note: string }[] = [
  { id: "mi", label: "New", note: "Never recited" },
  { id: "la", label: "Learning", note: "Recalled within days" },
  { id: "sol", label: "Holding", note: "Recalled within weeks" },
  { id: "fa", label: "Sealed", note: "Recalled after a month or more" },
];

export const dayNumber = (iso: string) => Date.parse(`${iso}T12:00:00Z`) / 86400000;

export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, "0");
  const d = `${now.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  return Math.round(dayNumber(to) - dayNumber(from));
}

export function stageOf(p: Progress | undefined): Stage {
  if (!p || p.reps === 0) return "mi";
  if (p.interval >= 45) return "fa";
  if (p.interval >= 7) return "sol";
  return "la";
}

const clamp = (n: number) => Math.max(1, Math.min(365, Math.round(n)));

export function gradeProgress(p: Progress | undefined, grade: Grade, today = todayISO()): Progress {
  const base = p?.interval ?? 0;
  const reps = p?.reps ?? 0;
  let interval: number;
  switch (grade) {
    case "again":
      interval = 1;
      break;
    case "hard":
      interval = base === 0 ? 1 : clamp(base * 1.4);
      break;
    case "good":
      interval = base === 0 ? 3 : clamp(base * 2.4);
      break;
    case "easy":
      interval = base === 0 ? 7 : clamp(base * 3.6);
      break;
  }
  return {
    interval,
    due: addDays(today, interval),
    last: today,
    reps: reps + 1,
    lapses: (p?.lapses ?? 0) + (grade === "again" ? 1 : 0),
  };
}

export function nextLabel(p: Progress | undefined, grade: Grade): string {
  const next = gradeProgress(p, grade).interval;
  return next === 1 ? "tomorrow" : `in ${next} days`;
}

export type DueEntry = { verse: Verse; progress: Progress | undefined; overdue: number };

/** Verses with a live schedule whose due date has arrived, most overdue first. */
export function dueEntries(progress: Record<string, Progress>, today = todayISO()): DueEntry[] {
  return VERSES.flatMap((verse) => {
    const p = progress[verse.id];
    if (!p || p.reps === 0 || p.due > today) return [];
    return [{ verse, progress: p, overdue: daysBetween(p.due, today) }];
  }).sort((a, b) => b.overdue - a.overdue || a.verse.id.localeCompare(b.verse.id));
}

export function newEntries(progress: Record<string, Progress>): Verse[] {
  return VERSES.filter((v) => !progress[v.id] || progress[v.id].reps === 0);
}

export function buildDailySet(progress: Record<string, Progress>, limit: number, today = todayISO()): DueEntry[] {
  const due = dueEntries(progress, today);
  if (due.length > 0) return due.slice(0, limit);
  return newEntries(progress)
    .slice(0, Math.min(2, limit))
    .map((verse) => ({ verse, progress: progress[verse.id], overdue: 0 }));
}

export function nextDueDate(progress: Record<string, Progress>, today = todayISO()): string | null {
  const dates = VERSES.map((v) => progress[v.id]?.due).filter((d): d is string => !!d && d > today);
  if (dates.length === 0) return null;
  return dates.sort()[0];
}

export function countsByStage(progress: Record<string, Progress>) {
  const out: Record<Stage, number> = { mi: 0, la: 0, sol: 0, fa: 0 };
  for (const verse of VERSES) out[stageOf(progress[verse.id])] += 1;
  return out;
}

export function streakFrom(history: string[]): number {
  if (history.length === 0) return 0;
  const set = new Set(history);
  let streak = 0;
  let cursor = todayISO();
  if (!set.has(cursor)) cursor = addDays(cursor, -1);
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** When nothing is due: the five verses touched longest ago, so a session still exists. */
export function reviewExtra(progress: Record<string, Progress>, n = 5): DueEntry[] {
  return VERSES.map((verse) => ({ verse, progress: progress[verse.id] }))
    .filter((entry): entry is { verse: Verse; progress: Progress } => !!entry.progress && entry.progress.reps > 0)
    .sort((a, b) => (a.progress.last ?? "").localeCompare(b.progress.last ?? ""))
    .slice(0, n)
    .map((entry) => ({ ...entry, overdue: 0 }));
}
