"use client";

import { Region } from "@/lib/types";

interface RegionFilterProps {
  value: Region;
  onChange: (value: Region) => void;
}

const regions: Region[] = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

export default function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <div className="relative w-full lg:w-[200px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Region)}
        className="w-full px-6 py-4 rounded-md shadow-md text-sm appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--foreground)"
        style={{
          backgroundColor: "var(--element-bg)",
          color: "var(--foreground)",
          boxShadow: "0 2px 9px var(--shadow)",
        }}
        aria-label="Filter by region"
      >
        <option value="All">Filter by Region</option>
        {regions.slice(1).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
          style={{ color: "var(--foreground)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
