"use client";

import React from "react";

interface TechDecoProps {
  theme?: "dark" | "light";
  className?: string;
  showDots?: boolean;
  showSlashes?: boolean;
}

export function TechDeco({
  theme = "dark",
  className = "",
  showDots = true,
  showSlashes = true,
}: TechDecoProps) {
  const isLight = theme === "light";

  const primaryColor = isLight ? "#0c325c" : "#00F0FF";
  const secondaryColor = isLight ? "#1e6091" : "#38BDF8";
  const darkNavy = isLight ? "#071c35" : "#0c1b30";
  const slashColor = isLight ? "#52796f" : "#00F0FF";
  const dotColor = isLight ? "bg-slate-400/40" : "bg-cyan-400/30";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* --- TOP LEFT HUD CORNER --- */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col items-start opacity-70 sm:opacity-85">
        <svg
          width="130"
          height="70"
          viewBox="0 0 130 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 sm:w-32 h-auto"
        >
          {/* Main Angled Block */}
          <polygon
            points="0,0 85,0 70,18 0,18"
            fill={darkNavy}
          />
          {/* Accent Blue Shape */}
          <polygon
            points="2,2 75,2 65,14 2,14"
            fill={isLight ? "#134074" : "#0077b6"}
          />
          {/* Small Top Notch */}
          <rect x="0" y="0" width="12" height="4" fill={primaryColor} />

          {/* Slashes (Tech Stripes) */}
          {showSlashes && (
            <g transform="translate(82, 6)">
              <polygon points="4,0 7,0 3,10 0,10" fill={secondaryColor} opacity="0.9" />
              <polygon points="10,0 13,0 9,10 6,10" fill={secondaryColor} opacity="0.8" />
              <polygon points="16,0 19,0 15,10 12,10" fill={secondaryColor} opacity="0.6" />
              <polygon points="22,0 25,0 21,10 18,10" fill={secondaryColor} opacity="0.4" />
            </g>
          )}

          {/* Connected Thin Guide Line */}
          <line
            x1="0"
            y1="18"
            x2="0"
            y2="70"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeOpacity={isLight ? "0.4" : "0.5"}
          />
          <line
            x1="85"
            y1="8"
            x2="130"
            y2="8"
            stroke={primaryColor}
            strokeWidth="1"
            strokeOpacity={isLight ? "0.3" : "0.4"}
          />
        </svg>
      </div>

      {/* --- TOP RIGHT HUD WING --- */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end opacity-70 sm:opacity-85">
        <svg
          width="70"
          height="140"
          viewBox="0 0 70 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 sm:w-20 h-auto"
        >
          {/* Top Square Cap */}
          <rect x="40" y="0" width="16" height="12" fill={primaryColor} />
          {/* Vertical Angled Blade */}
          <polygon
            points="50,12 70,12 70,110 50,110"
            fill={darkNavy}
          />
          <polygon
            points="38,20 60,20 60,140 38,110"
            fill={isLight ? "#0f4c81" : "#0096c7"}
          />
          {/* Micro Slits */}
          <rect x="62" y="30" width="4" height="6" fill={primaryColor} />
          <rect x="62" y="42" width="4" height="6" fill={primaryColor} />
          <rect x="62" y="54" width="4" height="6" fill={primaryColor} />
          {/* Guide Line Down */}
          <line
            x1="58"
            y1="140"
            x2="58"
            y2="200"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeOpacity={isLight ? "0.4" : "0.5"}
          />
        </svg>
      </div>

      {/* --- BOTTOM LEFT HUD WING --- */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex flex-col items-start opacity-70 sm:opacity-85">
        <svg
          width="70"
          height="140"
          viewBox="0 0 70 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 sm:w-20 h-auto"
        >
          {/* Guide Line Up */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="30"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeOpacity={isLight ? "0.4" : "0.5"}
          />
          {/* Angled Ascending Blade */}
          <polygon
            points="10,30 32,0 32,120 10,120"
            fill={isLight ? "#0f4c81" : "#0096c7"}
          />
          <polygon
            points="0,60 20,60 20,135 0,135"
            fill={darkNavy}
          />
          {/* Micro Slashes on bottom-left */}
          <polygon points="0,40 4,40 1,48 0,48" fill={secondaryColor} />
          <polygon points="0,50 4,50 1,58 0,58" fill={secondaryColor} />
          {/* Bottom Cap */}
          <rect x="22" y="125" width="8" height="12" fill={primaryColor} />
        </svg>
      </div>

      {/* --- BOTTOM RIGHT HUD CORNER --- */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col items-end opacity-70 sm:opacity-85">
        <svg
          width="150"
          height="60"
          viewBox="0 0 150 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 sm:w-36 h-auto"
        >
          {/* Connecting Thin Line */}
          <line
            x1="0"
            y1="50"
            x2="60"
            y2="50"
            stroke={primaryColor}
            strokeWidth="1"
            strokeOpacity={isLight ? "0.3" : "0.4"}
          />

          {/* Slashes */}
          {showSlashes && (
            <g transform="translate(45, 38)">
              <polygon points="4,0 7,0 3,10 0,10" fill={secondaryColor} opacity="0.5" />
              <polygon points="10,0 13,0 9,10 6,10" fill={secondaryColor} opacity="0.7" />
              <polygon points="16,0 19,0 15,10 12,10" fill={secondaryColor} opacity="0.9" />
              <polygon points="22,0 25,0 21,10 18,10" fill={primaryColor} />
            </g>
          )}

          {/* Main Corner Block */}
          <polygon
            points="70,58 150,58 150,40 85,40"
            fill={darkNavy}
          />
          <polygon
            points="74,56 148,56 148,43 88,43"
            fill={isLight ? "#134074" : "#0077b6"}
          />
          <rect x="140" y="56" width="10" height="4" fill={primaryColor} />

          {/* Guide Line Up */}
          <line
            x1="150"
            y1="40"
            x2="150"
            y2="0"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeOpacity={isLight ? "0.4" : "0.5"}
          />
        </svg>
      </div>

      {/* --- 3x3 TECH DOT MATRIX (Left & Right Flanks) --- */}
      {showDots && (
        <>
          {/* 3x3 Matrix Left */}
          <div className="absolute top-1/2 left-6 sm:left-12 -translate-y-1/2 grid grid-cols-3 gap-2 opacity-50 sm:opacity-70">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={`dot-left-${i}`}
                className={`h-1.5 w-1.5 rounded-full ${dotColor} ${
                  i === 4 ? "scale-125 ring-1 ring-cyan-500/40" : ""
                }`}
              />
            ))}
          </div>

          {/* 3x3 Matrix Right */}
          <div className="absolute top-1/2 right-6 sm:right-12 -translate-y-1/2 grid grid-cols-3 gap-2 opacity-50 sm:opacity-70">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={`dot-right-${i}`}
                className={`h-1.5 w-1.5 rounded-full ${dotColor} ${
                  i === 4 ? "scale-125 ring-1 ring-cyan-500/40" : ""
                }`}
              />
            ))}
          </div>

          {/* Plus Crosshairs (+) */}
          <div
            className={`absolute top-16 right-1/4 font-mono text-[10px] font-bold ${
              isLight ? "text-slate-400" : "text-cyan-500/40"
            }`}
          >
            +
          </div>
          <div
            className={`absolute bottom-16 left-1/4 font-mono text-[10px] font-bold ${
              isLight ? "text-slate-400" : "text-cyan-500/40"
            }`}
          >
            +
          </div>
        </>
      )}
    </div>
  );
}
