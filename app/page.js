"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // If user is already signed in, redirect to dashboard
  useEffect(() => {
    const email = localStorage.getItem("solo_email");
    if (email) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight">
            habit<span className="text-primary">space</span>
            <span className="text-xs opacity-30 ml-1.5">solo</span>
          </h1>
          <Link
            href="/start"
            className="btn btn-ghost btn-sm rounded-xl text-sm opacity-60 hover:opacity-100"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-lg text-center animate-slide-in">
          {/* Big visual */}
          <div className="text-7xl md:text-8xl mb-8 animate-flame">
            {"\u{1F525}"}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            One habit.
            <br />
            <span className="text-primary">Built to last.</span>
          </h2>

          <p className="text-lg md:text-xl opacity-50 mb-4 max-w-md mx-auto leading-relaxed">
            Most habit apps let you track everything. That's why they fail.
          </p>
          <p className="opacity-40 mb-10 max-w-sm mx-auto leading-relaxed">
            Solo enforces one habit at a time. You start impossibly small,
            prove consistency, and the difficulty scales automatically.
            When you master it, it graduates — and you pick the next one.
          </p>

          {/* CTA */}
          <Link
            href="/start"
            className="btn btn-primary rounded-2xl h-14 px-10 text-base font-semibold
              shadow-lg shadow-primary/25 hover:shadow-primary/40
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start your first habit
          </Link>

          {/* How it works */}
          <div className="mt-20 text-left">
            <h3 className="text-sm font-semibold opacity-30 uppercase tracking-wider mb-6 text-center">
              How it works
            </h3>
            <div className="flex flex-col gap-6">
              {[
                {
                  step: "1",
                  title: "Pick one habit",
                  desc: "Choose from templates or create your own. Just one. That's the whole point.",
                },
                {
                  step: "2",
                  title: "Start impossibly small",
                  desc: "Want to meditate? Start with 60 seconds. Want to read? Start with 1 page. No excuses, no friction.",
                },
                {
                  step: "3",
                  title: "Show up daily",
                  desc: "Check in each day. We'll email you a reminder. Your streak grows. One tap is all it takes.",
                },
                {
                  step: "4",
                  title: "Auto-level up",
                  desc: "After 7 days of consistency, the difficulty nudges up. You've earned it. 5 levels per habit.",
                },
                {
                  step: "5",
                  title: "Graduate and stack",
                  desc: "Complete all levels and the habit graduates. Pick the next one. Your stack of conquered habits grows.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-0.5">{item.title}</h4>
                    <p className="text-sm opacity-40 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pb-8">
            <Link
              href="/start"
              className="btn btn-primary rounded-2xl h-14 px-10 text-base font-semibold
                shadow-lg shadow-primary/25 hover:shadow-primary/40
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start building
            </Link>
            <p className="text-xs opacity-20 mt-4">
              Free. No account needed beyond your email.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
