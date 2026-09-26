import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-sm border border-line bg-surface px-3 py-3 font-sans text-base text-ink placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}
