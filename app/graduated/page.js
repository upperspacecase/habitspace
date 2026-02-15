"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GraduatedPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("solo_email");
    if (!email) {
      router.push("/start");
      return;
    }

    fetch(`/api/users?email=${encodeURIComponent(email)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/start");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  const graduated = user.graduatedHabits || [];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 py-5">
        <Link
          href="/dashboard"
          className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm opacity-70 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-6 py-8">
        <div className="animate-slide-in">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Your habit stack
          </h2>
          <p className="opacity-50 mb-8 text-sm">
            Every habit here is one you've fully built. They compound.
          </p>

          {graduated.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 opacity-20">{"\u{1F393}"}</div>
              <p className="opacity-40">No graduated habits yet.</p>
              <p className="opacity-30 text-sm mt-1">
                Complete all 5 levels of your current habit to graduate it.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {graduated
                .slice()
                .reverse()
                .map((habit, i) => (
                  <div
                    key={i}
                    className="bg-base-200/60 backdrop-blur-xl border border-white/10
                      rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{habit.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{habit.name}</h3>
                        <p className="text-sm opacity-40 mt-0.5">
                          {habit.finalLevel}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs opacity-30">
                            {habit.totalDays} days
                          </span>
                          <span className="text-xs opacity-20">
                            {"\u{2022}"}
                          </span>
                          <span className="text-xs opacity-30">
                            Graduated {habit.completedAt}
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl opacity-60">{"\u{2705}"}</div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
