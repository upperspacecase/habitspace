"use client";

export default function StreakFlame({ streak }) {
  // Flame intensity scales with streak
  const intensity = Math.min(streak / 30, 1); // Max intensity at 30 days
  const size = 32 + intensity * 32; // 32px to 64px

  if (streak === 0) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div
          className="opacity-20 text-center"
          style={{ fontSize: `${size}px`, lineHeight: 1 }}
        >
          {"\u{1F525}"}
        </div>
        <span className="text-xs opacity-30 font-mono">0 days</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="animate-flame text-center"
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
          filter: `brightness(${1 + intensity * 0.3})`,
        }}
      >
        {streak >= 21 ? "\u{1F525}" : streak >= 7 ? "\u{1F525}" : "\u{1F525}"}
      </div>
      <span className="text-sm font-bold font-mono tracking-tight">
        {streak} {streak === 1 ? "day" : "days"}
      </span>
    </div>
  );
}
