"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BuildContent() {
    const searchParams = useSearchParams();
    const prefilledHabit = searchParams.get("habit");

    const [text, setText] = useState(prefilledHabit || "");
    const [state, setState] = useState("idle"); // idle | committed
    const [habits, setHabits] = useState([]);
    const [showList, setShowList] = useState(!prefilledHabit);

    useEffect(() => {
        if (!prefilledHabit) {
            fetch("/api/habits")
                .then((res) => res.json())
                .then((data) => {
                    const sorted = data.sort((a, b) => b.votes - a.votes);
                    setHabits(sorted);
                })
                .catch(console.error);
        }
    }, [prefilledHabit]);

    const handleCommit = () => {
        if (!text.trim()) return;
        setState("committed");
    };

    const selectHabit = (habitText) => {
        setText(habitText);
        setShowList(false);
    };

    if (state === "committed") {
        return (
            <div className="min-h-[100dvh] flex flex-col">
                <header className="flex items-center px-6 py-5">
                    <Link
                        href="/"
                        className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-sm opacity-70 hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                        Back
                    </Link>
                </header>
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center animate-slide-in max-w-sm">
                        <div className="text-6xl mb-6">🌱</div>
                        <h2 className="text-2xl font-bold mb-3">You're building it</h2>
                        <div className="bg-base-200/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-6">
                            <p className="text-lg font-medium leading-snug">{text}</p>
                        </div>
                        <p className="opacity-50 text-sm mb-8">
                            Start small. Do it once today.<br />That's all it takes.
                        </p>
                        <Link href="/" className="btn btn-primary rounded-2xl px-8">
                            Back to habits
                        </Link>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                    </svg>
                    Back
                </Link>
            </header>

            {/* Main */}
            <main className="flex-1 max-w-lg mx-auto w-full px-6 py-8">
                <div className="animate-slide-in">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        Build a habit
                    </h2>
                    <p className="opacity-50 mb-8 text-sm">
                        Pick one from the community or write your own.
                    </p>

                    {/* Custom habit input */}
                    <div className="mb-6">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={2}
                            placeholder="Write your own habit..."
                            className="textarea w-full rounded-2xl bg-base-200/60 backdrop-blur-xl
                border border-white/10 text-lg p-5 leading-relaxed
                placeholder:opacity-30 focus:outline-none focus:border-primary/50
                resize-none transition-all duration-200"
                        />
                    </div>

                    {/* Commit button */}
                    <button
                        onClick={handleCommit}
                        disabled={!text.trim()}
                        className="btn btn-primary w-full rounded-2xl h-14 text-base font-semibold
              shadow-lg shadow-primary/25 hover:shadow-primary/40
              transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
              disabled:opacity-30 disabled:shadow-none mb-8"
                    >
                        Start building this habit
                    </button>

                    {/* Toggle list */}
                    {!prefilledHabit && (
                        <>
                            <button
                                onClick={() => setShowList(!showList)}
                                className="btn btn-ghost btn-sm w-full rounded-xl opacity-50 hover:opacity-100 mb-4"
                            >
                                {showList ? "Hide suggestions" : "Or pick from the community ↓"}
                            </button>

                            {/* Habit suggestions */}
                            {showList && habits.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    {habits.slice(0, 10).map((habit) => (
                                        <button
                                            key={habit.id}
                                            onClick={() => selectHabit(habit.text)}
                                            className={`
                        text-left px-4 py-3 rounded-xl transition-all duration-200
                        border border-white/5 hover:border-primary/30
                        hover:bg-base-200/50
                        ${text === habit.text ? "border-primary/50 bg-primary/5" : ""}
                      `}
                                        >
                                            <p className="text-sm font-medium leading-snug">{habit.text}</p>
                                            <p className="text-xs opacity-30 mt-1">{habit.votes} upvotes</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function BuildHabit() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[100dvh] flex items-center justify-center">
                    <span className="loading loading-ring loading-lg text-primary"></span>
                </div>
            }
        >
            <BuildContent />
        </Suspense>
    );
}
