"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import TabBar from "@/app/components/TabBar";
import SectionHeader from "@/app/components/SectionHeader";

const members = [
  { name: "Sarah", color: "#FF3B30", habits: 3, completed: [true, true, true] },
  { name: "Marcus", color: "#3B82F6", habits: 2, completed: [true, true] },
  { name: "Jordan", color: "#22C55E", habits: 3, completed: [true, false, true] },
  { name: "Alex", color: "#F59E0B", habits: 2, completed: [true, true] },
  { name: "You", color: "#8B5CF6", habits: 3, completed: [true, true, true] },
];

export default function Groups() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("habitspace_email");
    if (!email) {
      router.push("/start");
    }
  }, [router]);

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 pb-24" style={{ padding: "0 24px 96px" }}>
        {/* Title + Badge */}
        <div style={{ marginTop: 20, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <h1 className="font-display" style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}>
            Groups
          </h1>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#666",
              background: "#F5F5F5",
              padding: "4px 10px",
              borderRadius: 0,
              letterSpacing: 0.5,
            }}
          >
            Morning Crew
          </span>
        </div>

        {/* Divider */}
        <div className="divider-line" style={{ marginBottom: 24 }} />

        {/* 01 GROUP STREAK */}
        <SectionHeader number="01" label="GROUP STREAK" />
        <div style={{ marginTop: 16, marginBottom: 4 }}>
          <span style={{ fontSize: 52, fontWeight: 700, color: "#000", lineHeight: 1 }}>23 days</span>
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#666", marginBottom: 4 }}>
          Everyone checked in today
        </p>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#999" }}>
          {members.length} members
        </p>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 02 TODAY'S CHECK-INS */}
        <SectionHeader number="02" label="TODAY'S CHECK-INS" />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
          {members.map((member, i) => (
            <div
              key={member.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: i < members.length - 1 ? "1px solid #E5E5E5" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar circle */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: member.color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                    {member.name}
                  </span>
                  <span style={{ fontSize: 12, color: "#999", marginLeft: 8 }}>
                    {member.habits} habits
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {member.completed.map((done, j) => (
                  <div
                    key={j}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: done ? "#22C55E" : "#FF3B30",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Invite button */}
        <button
          style={{
            width: "100%",
            height: 52,
            background: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: 0,
            fontSize: 15,
            fontWeight: 600,
            color: "#000",
            cursor: "pointer",
            marginTop: 16,
          }}
        >
          Invite a member
        </button>

        {/* Divider */}
        <div className="divider-line" style={{ margin: "24px 0" }} />

        {/* 03 DISCOVER HABITS */}
        <SectionHeader number="03" label="DISCOVER HABITS" />
        <div style={{ marginTop: 16 }}>
          <input
            type="text"
            placeholder="Search habits..."
            style={{
              width: "100%",
              height: 52,
              background: "#FFFFFF",
              border: "1px solid #E5E5E5",
              borderRadius: 0,
              padding: "0 16px",
              fontSize: 15,
              fontWeight: 400,
              color: "#000",
              outline: "none",
            }}
          />
        </div>
      </main>

      <TabBar activeTab="Groups" />
    </div>
  );
}
