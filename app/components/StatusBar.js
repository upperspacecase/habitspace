export default function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-6"
      style={{ height: 44, color: "#000" }}
    >
      {/* Time */}
      <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>

      {/* Icons */}
      <div className="flex items-center gap-1">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="9" width="3" height="3" />
          <rect x="4" y="6" width="3" height="6" />
          <rect x="8" y="3" width="3" height="9" />
          <rect x="12" y="0" width="3" height="12" />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
          <path d="M4.5 8.5C5.4 7.6 6.6 7 8 7s2.6.6 3.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 6C3.5 4.3 5.6 3.2 8 3.2S12.5 4.3 14 6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 3.5C2 1.3 4.8 0 8 0s6 1.3 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>

        {/* Battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0" y="0" width="23" height="12" rx="0" stroke="currentColor" strokeWidth="1" />
          <rect x="2" y="2" width="19" height="8" fill="currentColor" />
          <rect x="24" y="3.5" width="3" height="5" rx="0" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
