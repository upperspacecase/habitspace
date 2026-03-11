"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "../../components/StatusBar";

const EXISTING_HABITS = [
  "Brush my teeth",
  "Make coffee",
  "Eat breakfast",
  "Take a shower",
  "Get dressed",
];

export default function StackingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [habit, setHabit] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("habitspace_habit");
    if (stored) setHabit(stored);
  }, []);

  const handleContinue = () => {
    if (selected !== null) {
      localStorage.setItem("habitspace_stackedOn", EXISTING_HABITS[selected]);
    }
    router.push("/setup/environment");
  };

  const handleSkip = () => {
    router.push("/setup/environment");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-6">
        {/* Step indicator */}
        <p style={{ fontSize: 13, fontWeight: 500, color: "#999", marginBottom: 8 }}>
          Step 3 of 4
        </p>

        <div className="divider-line mb-6" />

        <h1
          className="font-display"
          style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}
        >
          Stack it on
          <br />
          another habit
        </h1>

        <p className="mt-3 mb-8" style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
          Pair your new habit with something you already do every day.
        </p>

        {/* Existing habits list */}
        <div className="flex flex-col gap-2 mb-8">
          {EXISTING_HABITS.map((existingHabit, i) => (
            <button
              key={existingHabit}
              onClick={() => setSelected(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                width: "100%",
                padding: "14px 16px",
                background: "#FFFFFF",
                border: selected === i ? "2px solid #FF3B30" : "1px solid #E5E5E5",
                borderRadius: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* Green dot for existing habit / red outline for selected */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: selected === i ? "#FF3B30" : "#22C55E",
                  border: selected === i ? "none" : "none",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 15, fontWeight: 500, color: "#000" }}>
                {existingHabit}
              </span>
            </button>
          ))}
        </div>

        {/* Habit stack card */}
        {selected !== null && (
          <div className="intention-card mb-8">
            <div className="intention-label">Your habit stack</div>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: "#000" }}>
              After I <strong>{EXISTING_HABITS[selected].toLowerCase()}</strong>, I will <strong>{habit || "___"}</strong>.
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* Buttons */}
        <div className="pb-10">
          <button
            onClick={handleContinue}
            style={{
              width: "100%",
              height: 52,
              background: "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
          <button
            onClick={handleSkip}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "12px 0",
              background: "transparent",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#999",
              cursor: "pointer",
            }}
          >
            Skip this step &rarr;
          </button>
        </div>
      </main>
    </div>
  );
}
