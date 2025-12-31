"use client";

import { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { showModal } = useModal();

  useEffect(() => {
    // Show error in modal instead of console
    showModal(error.message || "An unexpected error occurred");
  }, [error, showModal]);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-md font-semibold transition-all hover:opacity-80"
        style={{
          backgroundColor: "var(--element-bg)",
          boxShadow: "0 2px 9px var(--shadow)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
