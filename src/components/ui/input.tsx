import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-line bg-surface px-3 font-sans text-base text-ink placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}
