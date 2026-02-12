"use client";

import { useState, useEffect, useCallback } from "react";
import HabitRow from "./components/HabitRow";
import Link from "next/link";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = useCallback(async () => {
    try {
      const res = await fetch("/api/habits");
      const data = await res.json();
      // Sort by votes descending (like PH's "top" view)
      const sorted = data.sort((a, b) => b.votes - a.votes);
      setHabits(sorted);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleVote = async (id) => {
    // Optimistic update — re-sort after voting
    setHabits((prev) => {
      const updated = prev.map((h) =>
        h.id === id ? { ...h, votes: h.votes + 1 } : h
      );
      return updated.sort((a, b) => b.votes - a.votes);
    });
  };

  // Group by date label
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight">
            habit<span className="text-primary">space</span>
          </h1>
          <div className="flex items-center gap-2">
            <Link
              href="/build"
              className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm h-9"
            >
              🌱 Build a habit
            </Link>
            <Link
              href="/submit"
              className="btn btn-primary btn-sm rounded-xl gap-1.5 text-sm h-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10 3.75a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 3.75z" />
              </svg>
              Submit
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 md:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        ) : habits.length > 0 ? (
          <>
            {/* Section header */}
            <div className="mb-4 px-2">
              <h2 className="text-sm font-semibold opacity-50 uppercase tracking-wider">
                Top habits today
              </h2>
            </div>

            {/* Habit list */}
            <div className="flex flex-col divide-y divide-white/5">
              {habits.map((habit, index) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  rank={index + 1}
                  onVote={handleVote}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12 pb-8 flex flex-col items-center gap-3">
              <Link
                href="/build"
                className="btn btn-ghost btn-sm rounded-xl opacity-60 hover:opacity-100"
              >
                🌱 Help me build a habit
              </Link>
              <Link
                href="/submit"
                className="btn btn-ghost btn-sm rounded-xl opacity-40 hover:opacity-80"
              >
                or submit a new one →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg opacity-60">No habits yet.</p>
            <Link href="/submit" className="btn btn-primary mt-4 rounded-2xl">
              Be the first to share one
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
