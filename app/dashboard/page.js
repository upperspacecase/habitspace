"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StreakFlame from "../components/StreakFlame";
import LevelProgress from "../components/LevelProgress";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [event, setEvent] = useState(null); // level_up | graduated
  const [error, setError] = useState("");

  const fetchUser = useCallback(async () => {
    const email = localStorage.getItem("solo_email");
    if (!email) {
      router.push("/start");
      return;
    }

    try {
      const res = await fetch(
        `/api/users?email=${encodeURIComponent(email)}`
      );
      if (res.status === 404) {
        localStorage.removeItem("solo_email");
        router.push("/start");
        return;
      }
      const data = await res.json();
      setUser(data);

      // Calculate streak client-side (approximate — server is source of truth)
      // The real streak comes from check-in response
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("Failed to load your data");
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleCheckIn = async () => {
    if (checkingIn || checkedInToday) return;
    setCheckingIn(true);
    setError("");

    try {
      const email = localStorage.getItem("solo_email");
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setCheckedInToday(true);
        setCheckingIn(false);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Check-in failed");
      }

      setUser(data.user);
      setStreak(data.streak);
      setCheckedInToday(true);

      // Handle events
      if (data.events && data.events.length > 0) {
        setEvent(data.events[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCheckingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("solo_email");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  // Graduation event screen
  if (event && event.type === "graduated") {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
        <div className="text-center animate-slide-in max-w-sm">
          <div className="text-7xl mb-6">{"\u{1F393}"}</div>
          <h2 className="text-3xl font-bold mb-3">Habit Graduated</h2>
          <p className="text-lg opacity-70 mb-2">
            <strong>{event.habitName}</strong> is now part of who you are.
          </p>
          <p className="opacity-40 text-sm mb-8">
            {event.totalDays} days of showing up. That's extraordinary.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/next-habit"
              className="btn btn-primary rounded-2xl px-8 h-14 text-base font-semibold
                shadow-lg shadow-primary/25"
            >
              Pick your next habit
            </Link>
            <Link
              href="/graduated"
              className="btn btn-ghost btn-sm rounded-xl opacity-60"
            >
              View your stack
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Level up event screen
  if (event && event.type === "level_up") {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
        <div className="text-center animate-slide-in max-w-sm">
          <div className="text-7xl mb-6">{"\u{2B06}\u{FE0F}"}</div>
          <h2 className="text-3xl font-bold mb-3">Level Up!</h2>
          <p className="opacity-70 mb-4">
            You've proven consistency. Time to grow.
          </p>
          <div className="bg-base-200/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 mb-8">
            <p className="text-xs opacity-40 mb-2 uppercase tracking-wider">
              New daily task
            </p>
            <p className="text-xl font-semibold">{event.newTask}</p>
            <p className="text-sm opacity-40 mt-2">Level {event.newLevel} of 5</p>
          </div>
          <button
            onClick={() => setEvent(null)}
            className="btn btn-primary rounded-2xl px-8 h-14 text-base font-semibold
              shadow-lg shadow-primary/25"
          >
            Got it, let's go
          </button>
        </div>
      </div>
    );
  }

  // No active habit — prompt to pick next one
  if (!user.activeHabit) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-white/5">
          <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-lg font-bold tracking-tight">
              habit<span className="text-primary">space</span>
              <span className="text-xs opacity-30 ml-1.5">solo</span>
            </h1>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm rounded-xl text-xs opacity-40"
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center animate-slide-in max-w-sm">
            <div className="text-6xl mb-6">{"\u{1F389}"}</div>
            <h2 className="text-2xl font-bold mb-3">Ready for the next one?</h2>
            {user.graduatedHabits.length > 0 && (
              <p className="opacity-50 text-sm mb-2">
                You've graduated {user.graduatedHabits.length}{" "}
                {user.graduatedHabits.length === 1 ? "habit" : "habits"} so far.
              </p>
            )}
            <p className="opacity-40 text-sm mb-8">
              Pick your next habit and keep building your stack.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/next-habit"
                className="btn btn-primary rounded-2xl px-8 h-14 text-base font-semibold
                  shadow-lg shadow-primary/25"
              >
                Pick next habit
              </Link>
              {user.graduatedHabits.length > 0 && (
                <Link
                  href="/graduated"
                  className="btn btn-ghost btn-sm rounded-xl opacity-60"
                >
                  View graduated stack
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main dashboard
  const habit = user.activeHabit;
  const currentLevelData = habit.levels[habit.currentLevel - 1];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight">
            habit<span className="text-primary">space</span>
            <span className="text-xs opacity-30 ml-1.5">solo</span>
          </h1>
          <div className="flex items-center gap-2">
            {user.graduatedHabits.length > 0 && (
              <Link
                href="/graduated"
                className="btn btn-ghost btn-sm rounded-xl text-xs opacity-40 gap-1"
              >
                {"\u{1F393}"} {user.graduatedHabits.length}
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm rounded-xl text-xs opacity-40"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col items-center">
        <div className="w-full animate-slide-in">
          {/* Streak */}
          <div className="flex justify-center mb-8">
            <StreakFlame streak={streak} />
          </div>

          {/* Habit card */}
          <div className="bg-base-200/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6 text-center">
            <div className="text-4xl mb-4">{habit.emoji}</div>
            <h2 className="text-sm font-semibold opacity-40 uppercase tracking-wider mb-2">
              {habit.name}
            </h2>

            {/* Today's task */}
            <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-6">
              {currentLevelData.task}
            </p>

            {/* Check-in button */}
            {checkedInToday ? (
              <div className="animate-slide-in">
                <div className="text-4xl mb-3">{"\u{2705}"}</div>
                <p className="font-semibold text-primary">Done for today</p>
                <p className="text-sm opacity-40 mt-1">See you tomorrow</p>
              </div>
            ) : (
              <button
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="btn btn-primary w-full rounded-2xl h-16 text-lg font-semibold
                  shadow-lg shadow-primary/25 hover:shadow-primary/40
                  transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]
                  disabled:opacity-50"
              >
                {checkingIn ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "I did it"
                )}
              </button>
            )}

            {error && (
              <div className="alert alert-error mt-4 rounded-2xl text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Level progress */}
          <div className="px-4">
            <LevelProgress
              currentLevel={habit.currentLevel}
              totalLevels={habit.levels.length}
              completionsAtLevel={habit.completionsAtLevel}
              daysRequired={currentLevelData.daysRequired}
            />
          </div>

          {/* Started date */}
          <p className="text-center text-xs opacity-25 mt-6">
            Started {habit.startedAt}
          </p>
        </div>
      </main>
    </div>
  );
}
