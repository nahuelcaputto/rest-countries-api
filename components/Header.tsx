"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      className="shadow-md"
      style={{
        backgroundColor: "var(--element-bg)",
        boxShadow: "0 2px 4px var(--shadow)",
      }}
    >
      <div className="mx-auto px-4 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-extrabold">
          Where in the world?
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
