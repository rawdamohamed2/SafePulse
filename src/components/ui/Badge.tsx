import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        {
          "border-transparent bg-primary-600 text-white": variant === "default",
          "border-transparent bg-slate-100 text-slate-900": variant === "secondary",
          "border-transparent bg-success-500/15 text-success-600": variant === "success",
          "border-transparent bg-warning-500/15 text-warning-600": variant === "warning",
          "border-transparent bg-danger-500/15 text-danger-600": variant === "danger",
          "text-slate-950": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
