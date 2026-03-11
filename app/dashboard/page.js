"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import TabBar from "@/app/components/TabBar";
import SectionHeader from "@/app/components/SectionHeader";
import HabitCard from "@/app/components/HabitCard";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [habits, setHabits] = useState([]);
  const [checkedIn, setCheckedIn] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHabits = useCallback(async () => {
    const email = localStorage.getItem("habitspace_email");
    if (!email) {
      router.push("/start");
      return;
    }

    try {
      const userRes = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      if (userRes.status === 404) {
        localStorage.removeItem("habitspace_email");
        router.push("/start");
        return;
      }
      const userData = await userRes.json();
      setUserName(userData.name || email.split("@")[0]);

      const habitsRes = await fetch(`/api/habits?userId=${userData.id}`);
      if (habitsRes.ok) {
        const habitsData = await habitsRes.json();
        setHabits(habitsData);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load your data");
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleCheckIn = async (habitId) => {
    try {
      const email = localStorage.getItem("habitspace_email");
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, habitId }),
      });

      if (res.status === 409) {
        setCheckedIn((prev) => ({ ...prev, [habitId]: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }));
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Check-in failed");
      }

      const data = await res.json();
      setCheckedIn((prev) => ({ ...prev, [habitId]: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }));

      if (data.events?.some((e) => e.type === "graduated")) {
        router.push("/graduated");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: "#FAFAFA" }}>
        <div style={{ fontSize: 14, color: "#999" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      <StatusBar />

      <main className="flex-1 pb-24" style={{ padding: "0 24px 96px" }}>
        {/* Greeting */}
        <div style={{ marginTop: 20, marginBottom: 4 }}>
          <h1 className="font-display" style={{ fontSize: 32, lineHeight: 1.1, color: "#000" }}>
            {getGreeting()}, {userName}
          </h1>
        </div>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>
          You&apos;re becoming someone who shows up daily
        </p>

        {/* Divider */}
        <div className="divider-line" style={{ marginBottom: 24 }} />

        {/* Habits section */}
        <SectionHeader number="01" label="YOUR HABITS" />

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {habits.length === 0 && (
            <div style={{ padding: 32, textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "#999" }}>No habits yet.</p>
              <p style={{ fontSize: 13, color: "#CCC", marginTop: 4 }}>
                Start building your first habit.
              </p>
            </div>
          )}

          {habits.map((habit, i) => (
            <div key={habit.id || i} className="animate-slide-in" style={{ animationDelay: `${i * 60}ms` }}>
              <HabitCard
                habit={habit}
                isActive={i === 0}
                isCheckedIn={!!checkedIn[habit.id]}
                checkinTime={checkedIn[habit.id] || null}
                onCheckIn={() => handleCheckIn(habit.id)}
              />
            </div>
          ))}
        </div>

        {error && (
          <div style={{ marginTop: 16, padding: 12, background: "#FF3B3015", fontSize: 13, color: "#FF3B30" }}>
            {error}
          </div>
        )}
      </main>

      <TabBar activeTab="Dashboard" />
    </div>
  );
}
