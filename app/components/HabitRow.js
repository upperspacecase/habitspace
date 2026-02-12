"use client";

import { useState } from "react";

export default function HabitRow({ habit, rank, onVote }) {
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(habit.votes);
    const [animating, setAnimating] = useState(false);

    const handleVote = async () => {
        if (voted) return;
        setAnimating(true);
        setVoted(true);
        setVotes((v) => v + 1);

        try {
            await fetch(`/api/habits/${habit.id}/vote`, { method: "POST" });
        } catch (err) {
            console.error("Failed to vote:", err);
            setVoted(false);
            setVotes((v) => v - 1);
        }

        setTimeout(() => setAnimating(false), 600);
    };

    // Pick an emoji based on the habit content (deterministic hash)
    const emojis = ["🌱", "💧", "🧘", "🌞", "📖", "🎵", "🏃", "💤", "🍳", "✨", "🧹", "📞", "🌿", "😌", "🫁", "🚶", "🙏", "🌅", "💪", "🎯"];
    const emojiIndex = habit.id ? parseInt(habit.id.replace(/\D/g, ""), 10) % emojis.length : 0;
    const emoji = emojis[emojiIndex];

    return (
        <div
            className={`
        group flex items-center gap-4 px-5 py-4 md:px-6 md:py-5
        rounded-2xl transition-all duration-200
        hover:bg-base-200/50 cursor-default
        ${animating ? "animate-vote-pulse" : ""}
      `}
        >
            {/* Rank number */}
            <span className="text-sm font-mono opacity-25 w-5 text-right shrink-0 hidden sm:block">
                {rank}
            </span>

            {/* Emoji icon */}
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-base-200 flex items-center justify-center text-xl shrink-0">
                {emoji}
            </div>

            {/* Habit content */}
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-base md:text-lg leading-snug tracking-tight">
                    {habit.text}
                </p>
                <p className="text-xs opacity-40 mt-1">
                    shared {habit.createdAt}
                </p>
            </div>

            {/* Upvote button — PH style */}
            <button
                onClick={handleVote}
                disabled={voted}
                className={`
          flex flex-col items-center justify-center shrink-0
          w-16 h-16 md:w-18 md:h-18 rounded-xl
          border-2 transition-all duration-200
          ${voted
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-base-300 hover:border-primary/60 text-base-content/60 hover:text-primary"
                    }
          active:scale-95
        `}
            >
                {/* Chevron up */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 transition-transform duration-200 ${voted ? "scale-110" : "group-hover:scale-110"}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className={`text-sm font-bold ${voted ? "text-primary" : ""}`}>
                    {votes}
                </span>
            </button>
        </div>
    );
}
