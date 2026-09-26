import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "cyan" | "indigo" | "emerald" | "default";
  pulse?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "cyan",
  pulse = false,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]",
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]",
    default: "border-slate-700/60 bg-slate-800/60 text-slate-300",
  };

  const dotStyles = {
    cyan: "bg-cyan-400",
    indigo: "bg-indigo-400",
    emerald: "bg-emerald-400",
    default: "bg-slate-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium backdrop-blur-md transition-all duration-300",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotStyles[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              dotStyles[variant]
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}
