export default function Loader() {
  return (
    <div
      className="flex items-center justify-center min-h-[400px]"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"
          style={{
            borderColor: "var(--foreground)",
            borderTopColor: "transparent",
          }}
        ></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
