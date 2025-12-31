"use client";

import { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative w-full lg:w-[480px]">
      <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
          style={{ color: "var(--foreground)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search for a country..."
        className="w-full pl-20 pr-8 py-4 rounded-md shadow-md text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--foreground)"
        style={{
          backgroundColor: "var(--element-bg)",
          color: "var(--foreground)",
          boxShadow: "0 2px 9px var(--shadow)",
        }}
        aria-label="Search for a country"
      />
    </div>
  );
}
