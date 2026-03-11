"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "../../components/StatusBar";

const TIPS = [
  {
    title: "Make it visible",
    description: "Put your cue where you can't miss it",
  },
  {
    title: "Reduce friction",
    description: "Prepare everything the night before",
  },
  {
    title: "Prime the environment",
    description: "Set up your space for success",
  },
];

export default function EnvironmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Gather all setup data from localStorage
    const email = localStorage.getItem("habitspace_email") || "";
    const identity = localStorage.getItem("habitspace_identity") || "";
    const habit = localStorage.getItem("habitspace_habit") || "";
    const time = localStorage.getItem("habitspace_time") || "";
    const location = localStorage.getItem("habitspace_location") || "";
    const stackedOn = localStorage.getItem("habitspace_stackedOn") || "";

    try {
      await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          identityStatement: `I am a person who ${identity}`,
          habit,
          time,
          location,
          stackedOn,
          implementationIntention: `I will ${habit} at ${time} in ${location}`,
        }),
      });
    } catch (err) {
      // Continue to dashboard even if API fails
      console.error("Failed to save habit:", err);
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-6">
        {/* Step indicator */}
        <p style={{ fontSize: 13, fontWeight: 500, color: "#999", marginBottom: 8 }}>
          Step 4 of 4
        </p>

        <div className="divider-line mb-6" />

        <h1
          className="font-display"
          style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}
        >
          Design your
          <br />
          environment
        </h1>

        <p className="mt-3 mb-10" style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
          Your environment shapes your behavior more than motivation ever will.
        </p>

        {/* Tips */}
        <div className="flex flex-col gap-0">
          {TIPS.map((tip, i) => (
            <div key={tip.title}>
              <div className="flex items-start gap-4 py-5">
                {/* Red accent bullet */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: "#FF3B30",
                    borderRadius: 0,
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#000", marginBottom: 4 }}>
                    {tip.title}
                  </p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                    {tip.description}
                  </p>
                </div>
              </div>
              {i < TIPS.length - 1 && <div className="divider-line" />}
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-12" />

        {/* CTA */}
        <div className="pb-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              height: 52,
              background: loading ? "#FFB3B0" : "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Setting up..." : "Let's go"}
          </button>
        </div>
      </main>
    </div>
  );
}
