"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StartPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await res.json();

      localStorage.setItem("habitspace_email", email.toLowerCase().trim());

      if (res.status === 409 || data.existing) {
        // Existing user — go to dashboard
        router.push("/dashboard");
      } else {
        // New user — start setup flow
        router.push("/setup/identity");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "#FAFAFA" }}>
      {/* Logo */}
      <header className="px-6 pt-12 pb-4">
        <Link href="/" className="font-display" style={{ fontSize: 28, lineHeight: 0.95, color: "#000", textDecoration: "none" }}>
          habit
          <br />
          space
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-6 pt-12">
        <h1
          className="font-display"
          style={{ fontSize: 36, lineHeight: 1.1, color: "#000" }}
        >
          Welcome back
        </h1>

        <p className="mt-3 mb-10" style={{ fontSize: 15, color: "#666" }}>
          Enter your email to sign in or create an account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
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

          {error && (
            <p style={{ fontSize: 13, color: "#FF3B30" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={!email.trim() || loading}
            style={{
              width: "100%",
              height: 52,
              background: !email.trim() || loading ? "#FFB3B0" : "#FF3B30",
              color: "#FFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 0,
              border: "none",
              cursor: !email.trim() || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </form>
      </main>
    </div>
  );
}
