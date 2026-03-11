"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import TabBar from "@/app/components/TabBar";
import SectionHeader from "@/app/components/SectionHeader";

const mockProfile = {
  name: "Tay Pattison",
  memberSince: "January 2026",
  streak: 47,
  color: "#FF3B30",
  identityStatements: [
    "I am a person who meditates daily",
    "I am a person who drinks 8 glasses of water",
    "I am a person who reads before bed",
  ],
  activeHabits: [
    { name: "Meditate for 2 minutes", currentDay: 47 },
    { name: "Drink 8 glasses of water", currentDay: 23 },
    { name: "Read 1 page", currentDay: 12 },
  ],
  lifetimeStats: {
    totalCheckins: 284,
    consistency: 92,
  },
  graduatedHabits: [
    { name: "Journal for 1 minute", completedAt: "Dec 2025" },
  ],
};

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("habitspace_email");
    if (!email) {
      router.push("/start");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("habitspace_email");
    router.push("/");
  };

  const profile = mockProfile;

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 pb-24" style={{ padding: "0 24px 96px" }}>
        {/* Title + Settings */}
        <div style={{ marginTop: 20, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="font-display" style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}>
            Profile
          </h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" style={{ cursor: "pointer" }}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>

        {/* User info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: profile.color,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>{profile.name}</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
              Member since {profile.memberSince}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FF3B30",
              border: "1px solid #FF3B30",
              padding: "4px 10px",
              borderRadius: 0,
              letterSpacing: 0.5,
            }}
          >
            {profile.streak} day streak
          </span>
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ marginBottom: 24 }} />

        {/* 01 IDENTITY STATEMENTS */}
        <SectionHeader number="01" label="IDENTITY STATEMENTS" />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {profile.identityStatements.map((statement, i) => (
            <p key={i} style={{ fontSize: 14, fontStyle: "italic", color: "#000", lineHeight: 1.5 }}>
              &ldquo;{statement}&rdquo;
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 02 ACTIVE HABITS */}
        <SectionHeader number="02" label="ACTIVE HABITS" />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
          {profile.activeHabits.map((habit, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: i < profile.activeHabits.length - 1 ? "1px solid #E5E5E5" : "none",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: "#000" }}>{habit.name}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>
                {habit.currentDay}/66
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 03 LIFETIME STATS */}
        <SectionHeader number="03" label="LIFETIME STATS" />
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 0, padding: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
              {profile.lifetimeStats.totalCheckins}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>total check-ins</div>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 0, padding: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
              {profile.lifetimeStats.consistency}%
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>consistency</div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 04 GRADUATED HABITS */}
        <SectionHeader number="04" label="GRADUATED HABITS" />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
          {profile.graduatedHabits.length === 0 ? (
            <p style={{ fontSize: 13, color: "#999" }}>No graduated habits yet.</p>
          ) : (
            profile.graduatedHabits.map((habit, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: i < profile.graduatedHabits.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#000" }}>{habit.name}</span>
                  <span style={{ fontSize: 12, color: "#999", marginLeft: 8 }}>{habit.completedAt}</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#22C55E",
                    border: "1px solid #22C55E",
                    padding: "3px 8px",
                    borderRadius: 0,
                  }}
                >
                  66 days
                </span>
              </div>
            ))
          )}
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{
            background: "none",
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            color: "#999",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Sign out
        </button>
      </main>

      <TabBar activeTab="Profile" />
    </div>
  );
}
