"use client";

export default function HabitCard({ habit, isActive, isCheckedIn, checkinTime, onCheckIn }) {
  return (
    <div
      className={`bg-white border border-[#E5E5E5] p-4 ${isActive ? "habit-card-active" : ""}`}
      style={{ borderRadius: 0 }}
    >
      {/* Name + Streak */}
      <div className="flex items-center justify-between mb-1">
        <span style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>
          {habit.name}
        </span>
        <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1C7 1 3 4.5 3 7.5C3 9.5 4.8 11.5 7 13C9.2 11.5 11 9.5 11 7.5C11 4.5 7 1 7 1Z"
              fill="#FF3B30"
              opacity="0.8"
            />
          </svg>
          {habit.currentDay}/{habit.totalDays || 66} days
        </span>
      </div>

      {/* Identity statement */}
      <p style={{ fontSize: 12, fontStyle: "italic", color: "#999", marginBottom: 8 }}>
        {habit.identityStatement}
      </p>

      {/* Schedule */}
      <p style={{ fontSize: 12, fontWeight: 400, color: "#999", marginBottom: 12 }}>
        Every day at {habit.time} &middot; {habit.location}
      </p>

      {/* Status */}
      {isCheckedIn ? (
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="#22C55E" />
            <path d="M4 8l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="square" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#22C55E" }}>
            Done — checked in at {checkinTime}
          </span>
        </div>
      ) : (
        <button
          onClick={onCheckIn}
          className="flex items-center gap-2 cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <div
            className="habit-checkbox"
            style={{ borderRadius: 0 }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#FF3B30" }}>
            Tap to check in
          </span>
        </button>
      )}
    </div>
  );
}
