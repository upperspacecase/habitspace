"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { habitTemplates } from "@/lib/templates";

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: email, 2: pick habit, 3: reminder time
  const [email, setEmail] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customHabit, setCustomHabit] = useState("");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const body = {
        email,
        templateId: selectedTemplate === "custom" ? "custom" : selectedTemplate,
        customHabitName: selectedTemplate === "custom" ? customHabit : undefined,
        reminderTime,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.status === 409) {
        // User already exists — store email and go to dashboard
        localStorage.setItem("solo_email", email.toLowerCase().trim());
        router.push("/dashboard");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Store email in localStorage for session persistence
      localStorage.setItem("solo_email", email.toLowerCase().trim());
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 py-5">
        <Link
          href="/"
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

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 px-6 pb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-300 ${
              s <= step ? "bg-primary w-10" : "bg-base-300/30 w-6"
            }`}
          />
        ))}
      </div>

      <main className="flex-1 flex items-start justify-center px-6 pt-8 pb-10">
        {/* Step 1: Email */}
        {step === 1 && (
          <div className="w-full max-w-md animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Let's begin
            </h2>
            <p className="opacity-50 mb-8 text-sm">
              Enter your email so we can send you daily reminders.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input w-full rounded-2xl bg-base-200/60 backdrop-blur-xl
                border border-white/10 text-lg p-5 h-14
                placeholder:opacity-30 focus:outline-none focus:border-primary/50
                transition-all duration-200"
              autoFocus
            />

            {error && (
              <div className="alert alert-error mt-4 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <button
              onClick={() => {
                if (!email.includes("@")) {
                  setError("Enter a valid email");
                  return;
                }
                setError("");
                setStep(2);
              }}
              disabled={!email.trim()}
              className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
                shadow-lg shadow-primary/25 hover:shadow-primary/40
                transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
                disabled:opacity-30 disabled:shadow-none mt-6"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Pick a habit */}
        {step === 2 && (
          <div className="w-full max-w-md animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Pick one habit
            </h2>
            <p className="opacity-50 mb-6 text-sm">
              Just one. You'll start with a tiny version and build up.
            </p>

            <div className="flex flex-col gap-2 mb-6 max-h-[50vh] overflow-y-auto pr-1">
              {habitTemplates.map((template) => (
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

              {/* Custom option */}
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
                      Define your own habit and levels
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

            <button
              onClick={() => {
                if (
                  selectedTemplate === "custom" &&
                  !customHabit.trim()
                ) {
                  return;
                }
                setStep(3);
              }}
              disabled={
                !selectedTemplate ||
                (selectedTemplate === "custom" && !customHabit.trim())
              }
              className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
                shadow-lg shadow-primary/25 hover:shadow-primary/40
                transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
                disabled:opacity-30 disabled:shadow-none"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Reminder time */}
        {step === 3 && (
          <div className="w-full max-w-md animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              When should we remind you?
            </h2>
            <p className="opacity-50 mb-8 text-sm">
              We'll send a daily email at this time. Pick when you'll actually do
              it.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              {[
                { time: "06:00", label: "Early bird", desc: "6:00 AM" },
                { time: "08:00", label: "Morning", desc: "8:00 AM" },
                { time: "12:00", label: "Midday", desc: "12:00 PM" },
                { time: "18:00", label: "Evening", desc: "6:00 PM" },
                { time: "21:00", label: "Night owl", desc: "9:00 PM" },
              ].map((option) => (
                <button
                  key={option.time}
                  onClick={() => setReminderTime(option.time)}
                  className={`
                    text-left px-4 py-4 rounded-xl transition-all duration-200
                    border hover:bg-base-200/50
                    ${
                      reminderTime === option.time
                        ? "border-primary/50 bg-primary/5"
                        : "border-white/5 hover:border-primary/30"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{option.label}</span>
                    <span className="text-sm opacity-40 font-mono">
                      {option.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="alert alert-error mb-4 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
                shadow-lg shadow-primary/25 hover:shadow-primary/40
                transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
                disabled:opacity-30 disabled:shadow-none"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Begin my journey"
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
