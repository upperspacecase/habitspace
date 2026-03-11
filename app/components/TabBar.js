"use client";

import Link from "next/link";

const tabs = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Groups",
    href: "/groups",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M16 3.13a4 4 0 010 7.75" />
        <path d="M21 21v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
  },
  {
    name: "Scorecard",
    href: "/scorecard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 4 5-8" />
      </svg>
    ),
  },
  {
    name: "Profile",
    href: "/profile",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="5" />
        <path d="M3 21v-2a7 7 0 0114 0v2" />
      </svg>
    ),
  },
];

export default function TabBar({ activeTab }) {
  return (
    <nav className="tab-bar fixed bottom-0 left-0 right-0 bg-white z-50">
      <div className="flex justify-around items-center pt-2 pb-1 max-w-[430px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`tab-bar-item flex flex-col items-center gap-1 ${isActive ? "active" : ""}`}
            >
              <span style={{ color: isActive ? "#FF3B30" : "#999999" }}>
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  color: isActive ? "#FF3B30" : "#999999",
                }}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
