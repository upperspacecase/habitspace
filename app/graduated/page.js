"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StatusBar from "@/app/components/StatusBar";

const mockData = {
  groupName: "Morning Crew",
  habitName: "Drinking 8 glasses of water",
  daysCompleted: 66,
  consistency: 94,
  totalCheckins: 66,
};

export default function GraduatedPage() {
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

      <main className="flex-1" style={{ padding: "0 24px" }}>
        {/* Group notification banner */}
        <div
          style={{
            background: "#F5F5F5",
            padding: "12px 16px",
            marginTop: 16,
            marginBottom: 32,
            fontSize: 13,
            fontWeight: 500,
            color: "#666",
            borderRadius: 0,
          }}
        >
          {mockData.groupName} cheered you on!
        </div>

        {/* Section label */}
        <div style={{ marginBottom: 12 }}>
          <span className="section-label">GRADUATED</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display"
          style={{ fontSize: 40, lineHeight: 1.05, color: "#000", marginBottom: 16 }}
        >
          You graduated!
        </h1>

        {/* Identity copy */}
        <p style={{ fontSize: 15, color: "#000", lineHeight: 1.6, marginBottom: 8 }}>
          {mockData.habitName} is now part of your identity.
        </p>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 40 }}>
          You showed up for {mockData.daysCompleted} days straight. That level of consistency
          changes who you are, not just what you do.
        </p>

        {/* Divider */}
        <div className="divider-line" style={{ marginBottom: 24 }} />

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 0, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
              {mockData.daysCompleted}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>days completed</div>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 0, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
              {mockData.consistency}%
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>consistency</div>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 0, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#000", lineHeight: 1, marginBottom: 4 }}>
              {mockData.totalCheckins}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>total check-ins</div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/setup/identity"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 52,
            background: "#FF3B30",
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 0,
            textDecoration: "none",
          }}
        >
          Stack your next habit
        </Link>
      </main>
    </div>
  );
}
