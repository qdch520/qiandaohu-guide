export function LakeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="48" height="48" rx="14" fill="currentColor" opacity="0.16" />
      <path
        d="M4 36c5-5 10-6 16-5s8 5 13 2 9-6 15-5v16H4z"
        fill="currentColor"
        opacity="0.28"
      />
      <ellipse cx="15" cy="29" rx="8" ry="5" fill="currentColor" />
      <ellipse cx="31" cy="31" rx="5.5" ry="3.4" fill="currentColor" />
      <ellipse cx="41" cy="32.5" rx="3" ry="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
