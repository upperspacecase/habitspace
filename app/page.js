"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AVATAR_COLORS = ["#FF3B30", "#FF6B6B", "#FFB347", "#4ECDC4", "#45B7D1", "#96CEB4", "#DDA0DD", "#F7DC6F"];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("habitspace_email");
    if (email) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      {/* Logo */}
      <header className="px-6 pt-12 pb-4">
        <div className="font-display" style={{ fontSize: 28, lineHeight: 0.95 }}>
          habit
          <br />
          space
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col px-6 pt-8">
        <h1
          className="font-display"
          style={{ fontSize: 38, lineHeight: 1.08, color: "#000" }}
        >
          Build the identity
          <br />
          you want. One habit
          <br />
          at a time.
        </h1>

        <p
          className="mt-5"
          style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}
        >
          Based on Atomic Habits. Start impossibly small.
          <br />
          Stack habits. Do it with friends.
        </p>

        {/* Social proof */}
        <div className="mt-10">
          <div className="flex items-center gap-3">
            {/* Overlapping avatars */}
            <div className="flex items-center">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 32,
                    height: 32,
                    background: color,
                    border: "2px solid #FAFAFA",
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: AVATAR_COLORS.length - i,
                    position: "relative",
                  }}
                />
              ))}
            </div>
          </div>
          <p className="mt-3" style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
            12,847 people building habits together
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-12" />

        {/* CTA */}
        <div className="pb-10">
          <Link
            href="/start"
            className="flex items-center justify-center w-full"
            style={{
              height: 52,
              background: "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
            }}
          >
            Start your first habit — free
          </Link>
          <p
            className="text-center mt-4"
            style={{ fontSize: 13, color: "#999" }}
          >
            Free to start. Social accountability built in.
          </p>
        </div>
      </main>
    </div>
  );
}
