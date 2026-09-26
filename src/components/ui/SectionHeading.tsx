import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "cyan" | "indigo" | "emerald" | "default";
  title: string;
  gradientText?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "cyan",
  title,
  gradientText,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignStyles[align],
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} pulse className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}{" "}
        {gradientText && (
          <span className="text-gradient-cyan inline-block">{gradientText}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
