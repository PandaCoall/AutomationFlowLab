import type { ToolStatus } from "@/lib/site-content";

export function StatusPill({ status }: { status: ToolStatus }) {
  if (status === "available") {
    return (
      <span className="inline-flex h-7 items-center rounded-sm bg-primary px-2 font-sans text-sm font-semibold text-primary-fg">
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 items-center rounded-sm border border-line bg-surface px-2 font-sans text-sm font-semibold text-ink">
      Coming soon
    </span>
  );
}
