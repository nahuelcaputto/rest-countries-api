"use client";

import { useModal } from "@/context/ModalContext";
import { useEffect } from "react";

export default function Modal() {
  const { isOpen, message, hideModal } = useModal();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        hideModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, hideModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={hideModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal content */}
      <div
        className="relative z-10 w-full max-w-md mx-4 p-6 rounded-lg shadow-2xl"
        style={{ backgroundColor: "var(--element-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Error
        </h2>
        <p className="mb-6 text-base leading-relaxed">{message}</p>
        <button
          onClick={hideModal}
          className="w-full px-4 py-2 rounded font-semibold transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
          autoFocus
        >
          Close
        </button>
      </div>
    </div>
  );
}
