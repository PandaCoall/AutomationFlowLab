export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="3" y="6" width="26" height="3.5" rx="1" fill="currentColor" />
      <rect x="3" y="14.25" width="18" height="3.5" rx="1" fill="currentColor" />
      <rect x="3" y="22.5" width="11" height="3.5" rx="1" fill="currentColor" />
    </svg>
  );
}
