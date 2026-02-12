"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmitHabit() {
    const [text, setText] = useState("");
    const [state, setState] = useState("idle"); // idle | submitting | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const maxLength = 200;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setState("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text.trim() }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            setState("success");
            setText("");
        } catch (err) {
            setState("error");
            setErrorMsg(err.message);
        }
    };

    if (state === "success") {
        return (
            <div className="min-h-[100dvh] flex flex-col">
                <header className="flex items-center px-6 py-5">
                    <Link
                        href="/"
                        className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm opacity-70 hover:opacity-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back
                    </Link>
                </header>

                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center animate-slide-in">
                        <div className="text-6xl mb-6">✨</div>
                        <h2 className="text-2xl font-bold mb-3">Habit shared</h2>
                        <p className="opacity-60 mb-8">
                            Others will discover it and maybe try it too.
                        </p>
                        <div className="flex flex-col gap-3 items-center">
                            <Link href="/" className="btn btn-primary rounded-2xl px-8">
                                Discover habits
                            </Link>
                            <button
                                onClick={() => setState("idle")}
                                className="btn btn-ghost btn-sm rounded-xl opacity-60"
                            >
                                Share another
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] flex flex-col">
            {/* Header */}
            <header className="flex items-center px-6 py-5">
                <Link
                    href="/"
                    className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm opacity-70 hover:opacity-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back
                </Link>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-6 pb-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md animate-slide-in"
                >
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        Share a habit
                    </h2>
                    <p className="opacity-50 mb-8 text-sm">
                        What's a positive habit worth sharing with others?
                    </p>

                    <div className="relative mb-6">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={maxLength}
                            rows={3}
                            placeholder="e.g. Take a 10-minute walk after lunch"
                            className="textarea w-full rounded-2xl bg-base-200/60 backdrop-blur-xl
                border border-white/10 text-lg p-5 leading-relaxed
                placeholder:opacity-30 focus:outline-none focus:border-primary/50
                resize-none transition-all duration-200"
                            autoFocus
                        />
                        <span
                            className={`absolute bottom-3 right-4 text-xs transition-colors ${text.length > maxLength * 0.9
                                    ? "text-warning"
                                    : "opacity-30"
                                }`}
                        >
                            {text.length}/{maxLength}
                        </span>
                    </div>

                    {errorMsg && (
                        <div className="alert alert-error mb-4 rounded-2xl text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!text.trim() || state === "submitting"}
                        className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
              shadow-lg shadow-primary/25 hover:shadow-primary/40
              transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
              disabled:opacity-30 disabled:shadow-none"
                    >
                        {state === "submitting" ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Share this habit"
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
