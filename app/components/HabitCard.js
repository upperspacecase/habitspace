"use client";

import { useState } from "react";

export default function HabitCard({ habit, onVote, onSkip }) {
    const [state, setState] = useState("idle"); // idle | voting | exiting
    const [exitDirection, setExitDirection] = useState(null);

    const handleVote = async () => {
        setState("voting");
        setExitDirection("left");
        await onVote(habit.id);
        setTimeout(() => {
            setState("idle");
            setExitDirection(null);
        }, 100);
    };

    const handleSkip = () => {
        setState("exiting");
        setExitDirection("right");
        setTimeout(() => {
            onSkip();
            setState("idle");
            setExitDirection(null);
        }, 300);
    };

    const cardClasses = [
        "relative w-full max-w-md mx-auto",
        "bg-base-200/60 backdrop-blur-xl",
        "border border-white/10",
        "rounded-3xl p-8 md:p-10",
        "shadow-2xl shadow-black/20",
        "transition-all duration-300 ease-out",
        exitDirection === "left" && "animate-slide-out-left",
        exitDirection === "right" && "animate-slide-out-right",
        !exitDirection && "animate-slide-in",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={cardClasses}>
            {/* Vote count badge */}
            <div className="flex items-center gap-1.5 mb-6 opacity-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                >
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.765-2.033C3.736 12.454 2 10.28 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.78-1.736 4.954-3.702 6.687a22.045 22.045 0 01-3.927 2.715l-.019.01-.005.003-.002.001a.752.752 0 01-.69 0l-.003-.002z" />
                </svg>
                <span className="text-xs font-medium tracking-wide">
                    {habit.votes} {habit.votes === 1 ? "person" : "people"} would try
                    this
                </span>
            </div>

            {/* Habit text */}
            <p className="text-2xl md:text-3xl font-semibold leading-snug tracking-tight mb-10">
                {habit.text}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleVote}
                    disabled={state === "voting"}
                    className="btn btn-primary flex-1 rounded-2xl h-14 text-base font-semibold
            shadow-lg shadow-primary/25 hover:shadow-primary/40
            transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {state === "voting" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M10 3.75a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 3.75z" />
                            </svg>
                            I'd try this
                        </>
                    )}
                </button>

                <button
                    onClick={handleSkip}
                    className="btn btn-ghost rounded-2xl h-14 px-6 text-base opacity-60
            hover:opacity-100 transition-all duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
