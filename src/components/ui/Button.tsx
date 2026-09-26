"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-semibold hover:from-cyan-300 hover:to-sky-400 shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_-2px_rgba(6,182,212,0.7)] active:scale-[0.98]",
      secondary:
        "bg-slate-800/80 text-white font-medium hover:bg-slate-700/80 border border-slate-700/80 backdrop-blur-sm active:scale-[0.98]",
      outline:
        "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 font-medium active:scale-[0.98]",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium",
      glow:
        "relative overflow-hidden bg-slate-900 border border-slate-700 text-white font-medium group hover:border-cyan-500/50 active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {variant === "glow" && (
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transition-transform ease-in-out" />
        )}
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
