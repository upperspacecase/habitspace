"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "../../components/StatusBar";

const POPULAR_IDENTITIES = [
  "a reader",
  "an athlete",
  "a meditator",
  "a writer",
  "a healthy eater",
  "an early riser",
];

export default function IdentityPage() {
  const router = useRouter();
  const [identity, setIdentity] = useState("");

  const handleChipClick = (chip) => {
    setIdentity(chip);
  };

  const handleContinue = () => {
    if (!identity.trim()) return;
    localStorage.setItem("habitspace_identity", identity.trim());
    router.push("/setup/implementation");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 flex flex-col px-6 pt-6">
        {/* Step indicator */}
        <p style={{ fontSize: 13, fontWeight: 500, color: "#999", marginBottom: 8 }}>
          Step 1 of 4
        </p>

        <div className="divider-line mb-6" />

        <h1
          className="font-display"
          style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}
        >
          Who do you want
          <br />
          to become?
        </h1>

        <p className="mt-3 mb-8" style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
          Identity drives behavior. Start with who you want to be.
        </p>

        {/* Identity input */}
        <div className="flex items-center mb-6" style={{ gap: 0 }}>
          <span
            style={{
              height: 52,
              padding: "0 14px",
              background: "#F5F5F5",
              border: "1px solid #E5E5E5",
              borderRight: "none",
              borderRadius: 0,
              fontSize: 15,
              color: "#666",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            I am a person who...
          </span>
          <input
            type="text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="reads every day"
            autoFocus
            style={{
              flex: 1,
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

        {/* Popular identity chips */}
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#000", marginBottom: 12 }}>
          Popular
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {POPULAR_IDENTITIES.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`identity-chip ${identity === chip ? "selected" : ""}`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* Continue button */}
        <div className="pb-10">
          <button
            onClick={handleContinue}
            disabled={!identity.trim()}
            style={{
              width: "100%",
              height: 52,
              background: !identity.trim() ? "#FFB3B0" : "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
              border: "none",
              cursor: !identity.trim() ? "not-allowed" : "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}
