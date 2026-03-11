"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "../../components/StatusBar";

export default function ImplementationPage() {
  const router = useRouter();
  const [habit, setHabit] = useState("");
  const [time, setTime] = useState("7:00 AM");
  const [location, setLocation] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("habitspace_identity");
    if (stored) setIdentity(stored);
  }, []);

  const handleContinue = () => {
    if (!habit.trim()) return;
    localStorage.setItem("habitspace_habit", habit.trim());
    localStorage.setItem("habitspace_time", time.trim());
    localStorage.setItem("habitspace_location", location.trim());
    router.push("/setup/stacking");
  };

  const previewHabit = habit || "___";
  const previewTime = time || "___";
  const previewLocation = location || "___";

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-6">
        {/* Step indicator */}
        <p style={{ fontSize: 13, fontWeight: 500, color: "#999", marginBottom: 8 }}>
          Step 2 of 4
        </p>

        <div className="divider-line mb-6" />

        <h1
          className="font-display"
          style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}
        >
          When and where?
        </h1>

        <p className="mt-3 mb-8" style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
          Specific plans are more likely to stick. Define your implementation intention.
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#000", marginBottom: 8, display: "block" }}>
              I will
            </label>
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="meditate for 2 minutes"
              autoFocus
              style={{
                width: "100%",
                height: 52,
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: 0,
                padding: "0 16px",
                fontSize: 15,
                color: "#000",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#000", marginBottom: 8, display: "block" }}>
              At this time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="7:00 AM"
              style={{
                width: "100%",
                height: 52,
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: 0,
                padding: "0 16px",
                fontSize: 15,
                color: "#000",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#000", marginBottom: 8, display: "block" }}>
              In this location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="my bedroom"
              style={{
                width: "100%",
                height: 52,
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: 0,
                padding: "0 16px",
                fontSize: 15,
                color: "#000",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Implementation intention card */}
        <div className="intention-card">
          <div className="intention-label">Your implementation intention</div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: "#000" }}>
            I will <strong>{previewHabit}</strong> at <strong>{previewTime}</strong> in <strong>{previewLocation}</strong>.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* Continue button */}
        <div className="pb-10">
          <button
            onClick={handleContinue}
            disabled={!habit.trim()}
            style={{
              width: "100%",
              height: 52,
              background: !habit.trim() ? "#FFB3B0" : "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
              border: "none",
              cursor: !habit.trim() ? "not-allowed" : "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}
