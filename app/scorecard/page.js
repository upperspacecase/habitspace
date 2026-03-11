"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import TabBar from "@/app/components/TabBar";
import SectionHeader from "@/app/components/SectionHeader";
import HeatmapGrid from "@/app/components/HeatmapGrid";

// Mock heatmap data for the current month
function generateMockHeatmap() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const data = [];
  for (let day = 1; day <= today; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    data.push({ date: dateStr, completed: Math.random() > 0.15 });
  }
  return { data, month, year };
}

const stats = [
  { value: "92%", label: "completion" },
  { value: "47", label: "best streak" },
  { value: "284", label: "total completions" },
  { value: "5.2", label: "avg/day" },
];

const leaderboard = [
  { name: "Sarah", score: 96 },
  { name: "Marcus", score: 94 },
  { name: "You", score: 92, isYou: true },
  { name: "Jordan", score: 88 },
  { name: "Alex", score: 85 },
];

export default function Scorecard() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("habitspace_email");
    if (!email) {
      router.push("/start");
    }
  }, [router]);

  const heatmap = generateMockHeatmap();

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 pb-24" style={{ padding: "0 24px 96px" }}>
        {/* Title + Badge */}
        <div style={{ marginTop: 20, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <h1 className="font-display" style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}>
            Scorecard
          </h1>
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
            47 of 66 days
          </span>
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ marginBottom: 24 }} />

        {/* 01 HABIT SCORE */}
        <SectionHeader number="01" label="HABIT SCORE" />
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <span style={{ fontSize: 52, fontWeight: 700, color: "#000", lineHeight: 1 }}>92%</span>
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#666", marginBottom: 4 }}>overall consistency</p>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#22C55E" }}>+5% vs last week</p>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 02 THIS MONTH */}
        <SectionHeader number="02" label="THIS MONTH" />
        <div style={{ marginTop: 16 }}>
          <HeatmapGrid data={heatmap.data} month={heatmap.month} year={heatmap.year} />
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 03 STATS */}
        <SectionHeader number="03" label="STATS" />
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: 0,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 04 GROUP LEADERBOARD */}
        <SectionHeader number="04" label="GROUP LEADERBOARD" />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
          {leaderboard.map((member, i) => (
            <div
              key={member.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < leaderboard.length - 1 ? "1px solid #E5E5E5" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#999", width: 20 }}>{i + 1}</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: member.isYou ? 700 : 500,
                    color: member.isYou ? "#FF3B30" : "#000",
                  }}
                >
                  {member.name}
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>{member.score}%</span>
            </div>
          ))}
        </div>
      </main>

      <TabBar activeTab="Scorecard" />
    </div>
  );
}
