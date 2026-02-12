"use client";

import { useState, useEffect, useCallback } from "react";
import HabitCard from "./components/HabitCard";
import Link from "next/link";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(0); // forces re-mount for animation

  const fetchHabits = useCallback(async () => {
    try {
      const res = await fetch("/api/habits");
      const data = await res.json();
      // Shuffle the habits for a random order each session
      const shuffled = data.sort(() => Math.random() - 0.5);
      setHabits(shuffled);
      setCurrentIndex(0);
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
    try {
      await fetch(`/api/habits/${id}/vote`, { method: "POST" });
      // Update local state
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, votes: h.votes + 1 } : h))
      );
    } catch (err) {
      console.error("Failed to vote:", err);
    }
    goNext();
  };

  const handleSkip = () => {
    goNext();
  };

  const goNext = () => {
    if (currentIndex < habits.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowKey((prev) => prev + 1);
    } else {
      // Loop back — reshuffle
      const reshuffled = [...habits].sort(() => Math.random() - 0.5);
      setHabits(reshuffled);
      setCurrentIndex(0);
      setShowKey((prev) => prev + 1);
    }
  };

  const currentHabit = habits[currentIndex];
  const progress =
    habits.length > 0
      ? Math.round(((currentIndex + 1) / habits.length) * 100)
      : 0;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <h1 className="text-lg font-bold tracking-tight">
          habit<span className="text-primary">space</span>
        </h1>
        <Link
          href="/submit"
          className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm opacity-70 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10 3.75a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 3.75z" />
          </svg>
          Share a habit
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        ) : currentHabit ? (
          <div className="w-full max-w-md">
            <div key={showKey}>
              <HabitCard
                habit={currentHabit}
                onVote={handleVote}
                onSkip={handleSkip}
              />
            </div>

            {/* Progress indicator */}
            <div className="mt-8 flex items-center justify-center gap-3 opacity-40">
              <span className="text-xs font-medium tracking-wide">
                {currentIndex + 1} / {habits.length}
              </span>
              <progress
                className="progress progress-primary w-24 h-1"
                value={progress}
                max="100"
              ></progress>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg opacity-60">No habits yet.</p>
            <Link href="/submit" className="btn btn-primary mt-4 rounded-2xl">
              Be the first to share one
            </Link>
          </div>
        )}
      </main>

      {/* Subtle footer */}
      <footer className="text-center pb-6 opacity-30">
        <p className="text-xs">One positive habit at a time</p>
      </footer>
    </div>
  );
}
