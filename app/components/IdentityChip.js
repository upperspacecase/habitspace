"use client";

export default function IdentityChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`identity-chip ${selected ? "selected" : ""}`}
      style={{ borderRadius: 0 }}
    >
      {label}
    </button>
  );
}
