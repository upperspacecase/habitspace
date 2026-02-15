"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { habitTemplates } from "@/lib/templates";

export default function NextHabitPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customHabit, setCustomHabit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        if (data.activeHabit) {
          router.push("/dashboard");
          return;
        }
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/start");
      });
  }, [router]);

  // Filter out already-graduated templates
  const graduatedIds = (user?.graduatedHabits || []).map((h) => {
    const template = habitTemplates.find((t) => t.name === h.name);
    return template?.id;
  });
  const availableTemplates = habitTemplates.filter(
    (t) => !graduatedIds.includes(t.id)
  );

  const handleStart = async () => {
    setSubmitting(true);
    setError("");

    try {
      const email = localStorage.getItem("solo_email");
      const res = await fetch("/api/users/start-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          templateId:
            selectedTemplate === "custom" ? "custom" : selectedTemplate,
          customHabitName:
            selectedTemplate === "custom" ? customHabit : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start habit");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
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
          Back
        </Link>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-6 py-8">
        <div className="animate-slide-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{"\u{1F31F}"}</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Fresh start
            </h2>
            <p className="opacity-50 text-sm">
              {user.graduatedHabits.length > 0
                ? `You've conquered ${user.graduatedHabits.length}. Pick the next one.`
                : "Pick your next habit to build."}
            </p>
          </div>

          <div className="flex flex-col gap-2 mb-6 max-h-[45vh] overflow-y-auto pr-1">
            {availableTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`
                  text-left px-4 py-4 rounded-xl transition-all duration-200
                  border hover:bg-base-200/50
                  ${
                    selectedTemplate === template.id
                      ? "border-primary/50 bg-primary/5"
                      : "border-white/5 hover:border-primary/30"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div>
                    <p className="font-semibold">{template.name}</p>
                    <p className="text-xs opacity-40 mt-0.5">
                      Start: {template.levels[0].task}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            <button
              onClick={() => setSelectedTemplate("custom")}
              className={`
                text-left px-4 py-4 rounded-xl transition-all duration-200
                border hover:bg-base-200/50
                ${
                  selectedTemplate === "custom"
                    ? "border-primary/50 bg-primary/5"
                    : "border-white/5 hover:border-primary/30"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{"\u{1F3AF}"}</span>
                <div>
                  <p className="font-semibold">Custom habit</p>
                  <p className="text-xs opacity-40 mt-0.5">
                    Define your own
                  </p>
                </div>
              </div>
            </button>
          </div>

          {selectedTemplate === "custom" && (
            <input
              type="text"
              value={customHabit}
              onChange={(e) => setCustomHabit(e.target.value)}
              placeholder="e.g. Practice guitar"
              maxLength={100}
              className="input w-full rounded-2xl bg-base-200/60 backdrop-blur-xl
                border border-white/10 text-lg p-5 h-14 mb-4
                placeholder:opacity-30 focus:outline-none focus:border-primary/50
                transition-all duration-200"
              autoFocus
            />
          )}

          {error && (
            <div className="alert alert-error mb-4 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={
              submitting ||
              !selectedTemplate ||
              (selectedTemplate === "custom" && !customHabit.trim())
            }
            className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
              shadow-lg shadow-primary/25 hover:shadow-primary/40
              transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
              disabled:opacity-30 disabled:shadow-none"
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Begin this habit"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
