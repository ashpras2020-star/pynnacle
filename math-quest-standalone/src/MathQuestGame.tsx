import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FLOORS,
  POINTS_PER_FLOOR,
  TIME_BONUS_MAX,
  TIME_LIMIT_SECONDS,
  COMBO_MULTIPLIERS,
  STARTING_LIVES,
  HINT_PENALTY,
  type Floor,
} from './gameData';

// ─── Evaluate a math expression safely ───
function evaluateExpression(expr: string): { value: number | null; error: string | null } {
  try {
    // Only allow safe math characters: digits, operators, parens, dots, spaces, minus
    const sanitized = expr.trim();
    if (!sanitized) return { value: null, error: 'Empty expression' };

    // Block anything that isn't a math expression
    if (/[a-zA-Z_]/.test(sanitized)) {
      return { value: null, error: 'Only numbers and math operators allowed (+, -, *, /, //, %, **)' };
    }
    if (/[;{}\[\]`~!@#$&|^=<>?,:'"]/.test(sanitized)) {
      return { value: null, error: 'Invalid characters. Use only numbers and operators.' };
    }

    // Convert Python-style operators to JS
    let jsExpr = sanitized;
    // ** → Math.pow (handle before //)
    jsExpr = jsExpr.replace(/(\d+(?:\.\d+)?)\s*\*\*\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1,$2)');
    // Handle nested exponents by running replacement multiple times
    for (let i = 0; i < 5; i++) {
      jsExpr = jsExpr.replace(
        /((?:Math\.pow\([^)]+\)|\d+(?:\.\d+)?))\s*\*\*\s*((?:Math\.pow\([^)]+\)|\d+(?:\.\d+)?))/g,
        'Math.pow($1,$2)'
      );
    }
    // // → Math.floor division
    jsExpr = jsExpr.replace(
      /((?:Math\.pow\([^)]+\)|\([\d+\-*/%.() ]+\)|\d+(?:\.\d+)?))\s*\/\/\s*((?:Math\.pow\([^)]+\)|\([\d+\-*/%.() ]+\)|\d+(?:\.\d+)?))/g,
      'Math.floor($1/$2)'
    );

    // Evaluate
    const fn = new Function(`"use strict"; return (${jsExpr});`);
    const result = fn();

    if (typeof result !== 'number' || !isFinite(result)) {
      return { value: null, error: 'Expression did not produce a valid number' };
    }

    return { value: result, error: null };
  } catch {
    return { value: null, error: 'Invalid expression. Check your syntax.' };
  }
}

function checkForbidden(expr: string, forbidden?: number[]): boolean {
  if (!forbidden) return false;
  const sanitized = expr.trim();
  for (const num of forbidden) {
    // Check if the literal number appears in the expression
    const numStr = String(num);
    // Match as a standalone number (not part of a larger number)
    const regex = new RegExp(`(?<![\\d.])${numStr.replace('.', '\\.')}(?![\\d.])`, 'g');
    if (regex.test(sanitized)) return true;
  }
  return false;
}

// ─── Floor themed backgrounds ───
// Each floor gets unique SVG/CSS decorative elements
function FloorThemeBackground({ floorId }: { floorId: number }) {
  switch (floorId) {

    // Floor 1: The Entry Hall — stone walls, drawn torches, iron gate
    case 1:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Stone brick wall pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.12]">
            {Array.from({ length: 14 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => {
                const offset = row % 2 === 0 ? 0 : 50;
                return (
                  <rect
                    key={`brick-${row}-${col}`}
                    x={col * 100 + offset}
                    y={row * 40}
                    width="96"
                    height="36"
                    rx="2"
                    fill="none"
                    stroke="rgba(168,162,158,0.6)"
                    strokeWidth="1.5"
                  />
                );
              })
            )}
          </svg>
          {/* Left torch - SVG drawn */}
          <svg className="absolute top-16 left-4 w-12 h-32" viewBox="0 0 48 128">
            {/* Bracket */}
            <rect x="20" y="50" width="8" height="60" rx="2" fill="rgba(120,113,108,0.5)" />
            <rect x="12" y="48" width="24" height="8" rx="2" fill="rgba(120,113,108,0.6)" />
            {/* Flame */}
            <ellipse cx="24" cy="38" rx="14" ry="18" fill="rgba(251,146,60,0.3)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
            <ellipse cx="24" cy="34" rx="9" ry="14" fill="rgba(251,191,36,0.35)" className="animate-pulse" style={{ animationDuration: '1.2s' }} />
            <ellipse cx="24" cy="30" rx="5" ry="9" fill="rgba(254,240,138,0.4)" className="animate-pulse" style={{ animationDuration: '0.9s' }} />
          </svg>
          {/* Right torch */}
          <svg className="absolute top-16 right-4 w-12 h-32" viewBox="0 0 48 128">
            <rect x="20" y="50" width="8" height="60" rx="2" fill="rgba(120,113,108,0.5)" />
            <rect x="12" y="48" width="24" height="8" rx="2" fill="rgba(120,113,108,0.6)" />
            <ellipse cx="24" cy="38" rx="14" ry="18" fill="rgba(251,146,60,0.3)" className="animate-pulse" style={{ animationDuration: '1.7s' }} />
            <ellipse cx="24" cy="34" rx="9" ry="14" fill="rgba(251,191,36,0.35)" className="animate-pulse" style={{ animationDuration: '1.3s' }} />
            <ellipse cx="24" cy="30" rx="5" ry="9" fill="rgba(254,240,138,0.4)" className="animate-pulse" style={{ animationDuration: '1s' }} />
          </svg>
          {/* Torch glow */}
          <div className="absolute top-12 left-2 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute top-12 right-2 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2.3s' }} />
          {/* Stone arch at top center */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20" viewBox="0 0 320 80">
            <path d="M0 80 Q160 0 320 80" fill="none" stroke="rgba(120,113,108,0.3)" strokeWidth="6" />
            <path d="M20 80 Q160 10 300 80" fill="none" stroke="rgba(120,113,108,0.2)" strokeWidth="4" />
            {/* Keystone */}
            <rect x="148" y="2" width="24" height="18" rx="3" fill="rgba(120,113,108,0.25)" stroke="rgba(120,113,108,0.3)" strokeWidth="1" />
          </svg>
          {/* Cobblestone floor */}
          <svg className="absolute bottom-0 left-0 w-full h-16 opacity-30">
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse
                key={`cobble-${i}`}
                cx={i * 70 + (i % 2 ? 30 : 0) + 20}
                cy={40 + (i % 3) * 8}
                rx={28 + (i % 3) * 5}
                ry={14 + (i % 2) * 4}
                fill="none"
                stroke="rgba(168,162,158,0.5)"
                strokeWidth="1.5"
              />
            ))}
          </svg>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-stone-900/40 to-transparent" />
        </div>
      );

    // Floor 2: The Potion Room — drawn shelves, flasks, cauldron, bubbles
    case 2:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left shelf with bottles */}
          <svg className="absolute top-12 left-0 w-24 h-[70%]" viewBox="0 0 96 400">
            {/* Shelf boards */}
            {[60, 150, 240, 330].map((y, i) => (
              <g key={`shelf-l-${i}`}>
                <rect x="0" y={y} width="90" height="6" rx="1" fill="rgba(120,77,20,0.4)" />
                {/* Bottles on shelf */}
                {[15, 38, 62].map((bx, j) => {
                  const h = 30 + ((i + j) % 3) * 12;
                  const colors = ['rgba(34,197,94,0.35)', 'rgba(168,85,247,0.35)', 'rgba(59,130,246,0.35)', 'rgba(239,68,68,0.35)', 'rgba(234,179,8,0.35)'];
                  return (
                    <g key={`bottle-l-${i}-${j}`}>
                      <rect x={bx - 6} y={y - h} width="12" height={h - 2} rx="3" fill={colors[(i + j) % 5]} />
                      <rect x={bx - 3} y={y - h - 6} width="6" height="8" rx="2" fill="rgba(168,162,158,0.3)" />
                      {/* Liquid level */}
                      <rect x={bx - 5} y={y - h * 0.6} width="10" height={h * 0.5} rx="2" fill={colors[(i + j) % 5]} opacity="0.5" />
                    </g>
                  );
                })}
              </g>
            ))}
          </svg>
          {/* Right shelf with bottles */}
          <svg className="absolute top-12 right-0 w-24 h-[70%]" viewBox="0 0 96 400" style={{ transform: 'scaleX(-1)' }}>
            {[60, 150, 240, 330].map((y, i) => (
              <g key={`shelf-r-${i}`}>
                <rect x="0" y={y} width="90" height="6" rx="1" fill="rgba(120,77,20,0.4)" />
                {[15, 38, 62].map((bx, j) => {
                  const h = 25 + ((i + j + 1) % 3) * 14;
                  const colors = ['rgba(239,68,68,0.35)', 'rgba(234,179,8,0.35)', 'rgba(34,197,94,0.35)', 'rgba(59,130,246,0.35)', 'rgba(168,85,247,0.35)'];
                  return (
                    <g key={`bottle-r-${i}-${j}`}>
                      <rect x={bx - 6} y={y - h} width="12" height={h - 2} rx="3" fill={colors[(i + j) % 5]} />
                      <rect x={bx - 3} y={y - h - 6} width="6" height="8" rx="2" fill="rgba(168,162,158,0.3)" />
                      <rect x={bx - 5} y={y - h * 0.5} width="10" height={h * 0.4} rx="2" fill={colors[(i + j) % 5]} opacity="0.5" />
                    </g>
                  );
                })}
              </g>
            ))}
          </svg>
          {/* Central cauldron */}
          <svg className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-28" viewBox="0 0 128 112">
            {/* Cauldron body */}
            <ellipse cx="64" cy="80" rx="50" ry="24" fill="rgba(68,64,60,0.5)" />
            <path d="M18 65 Q14 80 18 95 Q40 110 88 110 Q112 110 110 95 Q114 80 110 65 Z" fill="rgba(68,64,60,0.4)" stroke="rgba(120,113,108,0.3)" strokeWidth="2" />
            {/* Bubbling liquid */}
            <ellipse cx="64" cy="65" rx="42" ry="14" fill="rgba(34,197,94,0.25)" />
            {/* Bubbles */}
            {[
              { cx: 50, cy: 55, r: 4 }, { cx: 72, cy: 50, r: 3 }, { cx: 60, cy: 45, r: 5 },
              { cx: 80, cy: 42, r: 3 }, { cx: 45, cy: 38, r: 4 }, { cx: 68, cy: 32, r: 3 },
            ].map((b, i) => (
              <circle key={`cb-${i}`} cx={b.cx} cy={b.cy} r={b.r} fill="rgba(74,222,128,0.3)" stroke="rgba(74,222,128,0.2)" strokeWidth="1" className="animate-bounce" style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${1.5 + (i % 3) * 0.4}s` }} />
            ))}
            {/* Handles */}
            <path d="M18 70 Q6 60 10 50" fill="none" stroke="rgba(120,113,108,0.4)" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 70 Q122 60 118 50" fill="none" stroke="rgba(120,113,108,0.4)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {/* Rising vapor */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`vapor-${i}`}
              className="absolute rounded-full animate-float-up"
              style={{
                left: `${44 + Math.sin(i * 1.5) * 8}%`,
                bottom: `${100 + i * 50}px`,
                width: `${20 + i * 6}px`,
                height: `${10 + i * 3}px`,
                background: `radial-gradient(ellipse, rgba(74,222,128,${0.12 - i * 0.015}) 0%, transparent 70%)`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
          {/* Green mist */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-emerald-900/25 to-transparent" />
          <div className="absolute bottom-8 left-1/4 w-48 h-20 bg-emerald-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-8 right-1/4 w-48 h-20 bg-emerald-500/6 rounded-full blur-3xl" />
        </div>
      );

    // Floor 3: The Crystal Chamber — SVG crystals, light refractions, sparkles
    case 3:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large center crystal */}
          <svg className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-36 animate-float" viewBox="0 0 96 144">
            <defs>
              <linearGradient id="crystal-main" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
              </linearGradient>
            </defs>
            <polygon points="48,8 72,50 68,110 48,130 28,110 24,50" fill="url(#crystal-main)" stroke="rgba(186,230,253,0.4)" strokeWidth="1.5" />
            <polygon points="48,8 72,50 48,60 24,50" fill="rgba(186,230,253,0.15)" />
            <line x1="48" y1="8" x2="48" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </svg>
          {/* Smaller crystals around edges */}
          {[
            { x: '8%', y: '30%', w: 36, h: 60, rot: -15, color: 'rgba(236,72,153,0.35)' },
            { x: '85%', y: '25%', w: 30, h: 50, rot: 20, color: 'rgba(34,211,238,0.35)' },
            { x: '12%', y: '65%', w: 28, h: 45, rot: -25, color: 'rgba(168,85,247,0.35)' },
            { x: '88%', y: '55%', w: 32, h: 55, rot: 15, color: 'rgba(74,222,128,0.3)' },
            { x: '5%', y: '80%', w: 24, h: 40, rot: -10, color: 'rgba(251,191,36,0.3)' },
            { x: '92%', y: '75%', w: 26, h: 42, rot: 25, color: 'rgba(59,130,246,0.35)' },
          ].map((c, i) => (
            <svg
              key={`sc-${i}`}
              className="absolute animate-pulse"
              style={{ left: c.x, top: c.y, width: c.w, height: c.h, transform: `rotate(${c.rot}deg)`, animationDelay: `${i * 0.4}s`, animationDuration: '3s' }}
              viewBox="0 0 32 55"
            >
              <polygon points="16,2 26,18 24,42 16,50 8,42 6,18" fill={c.color} stroke="rgba(186,230,253,0.2)" strokeWidth="1" />
              <polygon points="16,2 26,18 16,22 6,18" fill="rgba(255,255,255,0.08)" />
            </svg>
          ))}
          {/* Prismatic light beams from center crystal */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.15 }}>
            <line x1="50%" y1="15%" x2="10%" y2="85%" stroke="rgba(34,211,238,0.6)" strokeWidth="1" />
            <line x1="50%" y1="15%" x2="30%" y2="90%" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
            <line x1="50%" y1="15%" x2="70%" y2="90%" stroke="rgba(236,72,153,0.5)" strokeWidth="1" />
            <line x1="50%" y1="15%" x2="90%" y2="85%" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
            <line x1="50%" y1="15%" x2="5%" y2="50%" stroke="rgba(74,222,128,0.4)" strokeWidth="0.8" />
            <line x1="50%" y1="15%" x2="95%" y2="50%" stroke="rgba(59,130,246,0.4)" strokeWidth="0.8" />
          </svg>
          {/* Sparkle particles */}
          {Array.from({ length: 16 }, (_, i) => (
            <svg
              key={`sparkle-${i}`}
              className="absolute animate-ping"
              style={{
                top: `${10 + (i * 37 + 13) % 80}%`,
                left: `${5 + (i * 53 + 7) % 88}%`,
                width: '8px',
                height: '8px',
                animationDelay: `${i * 0.35}s`,
                animationDuration: `${2.5 + (i % 4) * 0.5}s`,
              }}
              viewBox="0 0 16 16"
            >
              <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="0" y1="8" x2="16" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="2" y1="2" x2="14" y2="14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            </svg>
          ))}
          {/* Ground glow */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cyan-900/15 via-purple-900/10 to-transparent" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl" />
        </div>
      );

    // Floor 4: The Library — tall bookshelves, hanging lantern, scroll
    case 4:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left bookshelf - full SVG */}
          <svg className="absolute top-10 left-0 w-20 h-[85%]" viewBox="0 0 80 500">
            {/* Shelf frame */}
            <rect x="2" y="0" width="74" height="498" rx="3" fill="rgba(120,77,20,0.2)" stroke="rgba(120,77,20,0.3)" strokeWidth="2" />
            {/* Shelf boards and books */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => {
              const shelfY = 10 + row * 54;
              const colors = ['rgba(220,38,38,0.4)', 'rgba(37,99,235,0.4)', 'rgba(22,163,74,0.4)', 'rgba(168,85,247,0.4)', 'rgba(234,179,8,0.4)', 'rgba(236,72,153,0.35)', 'rgba(14,165,233,0.4)'];
              return (
                <g key={`lshelf-${row}`}>
                  <rect x="4" y={shelfY + 44} width="70" height="4" rx="1" fill="rgba(120,77,20,0.5)" />
                  {Array.from({ length: 5 + (row % 2) }, (_, bi) => {
                    const bw = 8 + (bi % 3) * 2;
                    const bh = 30 + ((row + bi) % 4) * 5;
                    const bx = 6 + bi * 12;
                    return (
                      <g key={`lb-${row}-${bi}`}>
                        <rect x={bx} y={shelfY + 44 - bh} width={bw} height={bh} rx="1" fill={colors[(row + bi) % 7]} />
                        {/* Spine detail */}
                        <line x1={bx + bw / 2} y1={shelfY + 44 - bh + 4} x2={bx + bw / 2} y2={shelfY + 44 - bh + 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
          {/* Right bookshelf */}
          <svg className="absolute top-10 right-0 w-20 h-[85%]" viewBox="0 0 80 500">
            <rect x="2" y="0" width="74" height="498" rx="3" fill="rgba(120,77,20,0.2)" stroke="rgba(120,77,20,0.3)" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => {
              const shelfY = 10 + row * 54;
              const colors = ['rgba(168,85,247,0.4)', 'rgba(234,179,8,0.4)', 'rgba(220,38,38,0.4)', 'rgba(22,163,74,0.4)', 'rgba(37,99,235,0.4)', 'rgba(14,165,233,0.4)', 'rgba(236,72,153,0.35)'];
              return (
                <g key={`rshelf-${row}`}>
                  <rect x="4" y={shelfY + 44} width="70" height="4" rx="1" fill="rgba(120,77,20,0.5)" />
                  {Array.from({ length: 5 + ((row + 1) % 2) }, (_, bi) => {
                    const bw = 8 + ((bi + 1) % 3) * 2;
                    const bh = 28 + ((row + bi + 2) % 4) * 6;
                    const bx = 6 + bi * 12;
                    return (
                      <g key={`rb-${row}-${bi}`}>
                        <rect x={bx} y={shelfY + 44 - bh} width={bw} height={bh} rx="1" fill={colors[(row + bi) % 7]} />
                        <line x1={bx + bw / 2} y1={shelfY + 44 - bh + 4} x2={bx + bw / 2} y2={shelfY + 44 - bh + 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
          {/* Hanging lantern */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-24 animate-float" viewBox="0 0 64 96">
            <line x1="32" y1="0" x2="32" y2="30" stroke="rgba(120,113,108,0.4)" strokeWidth="1.5" />
            <path d="M20 30 L44 30 L40 65 Q32 72 24 65 Z" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.3)" strokeWidth="1" />
            <rect x="22" y="28" width="20" height="5" rx="2" fill="rgba(120,113,108,0.4)" />
            <ellipse cx="32" cy="48" rx="6" ry="8" fill="rgba(251,191,36,0.3)" className="animate-pulse" />
          </svg>
          {/* Lantern glow */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/6 rounded-full blur-3xl" />
          {/* Floating dust particles */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full animate-float-slow"
              style={{
                top: `${8 + (i * 41 + 17) % 82}%`,
                left: `${18 + (i * 47 + 11) % 64}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                backgroundColor: `rgba(251,191,36,${0.15 + (i % 4) * 0.05})`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${6 + (i % 5) * 2}s`,
              }}
            />
          ))}
          {/* Warm floor glow */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-amber-900/15 to-transparent" />
        </div>
      );

    // Floor 5: The Alchemy Lab — drawn beakers, pipettes, formula board, grid
    case 5:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Grid paper background */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          {/* Lab bench */}
          <svg className="absolute bottom-0 left-0 w-full h-28" viewBox="0 0 800 112">
            <rect x="40" y="20" width="720" height="8" rx="2" fill="rgba(120,113,108,0.35)" />
            {/* Legs */}
            <rect x="60" y="28" width="8" height="80" fill="rgba(120,113,108,0.3)" />
            <rect x="732" y="28" width="8" height="80" fill="rgba(120,113,108,0.3)" />
            {/* Beaker 1 - tall */}
            <path d="M120 18 L120 -20 L100 -20 L100 -5 Q100 10 110 15 L110 18" fill="none" stroke="rgba(186,230,253,0.3)" strokeWidth="1.5" />
            <rect x="102" y="-8" width="16" height="20" rx="1" fill="rgba(59,130,246,0.2)" />
            {/* Erlenmeyer flask */}
            <path d="M250 18 L260 -10 L270 -30 L290 -30 L300 -10 L310 18" fill="rgba(34,197,94,0.15)" stroke="rgba(186,230,253,0.25)" strokeWidth="1.5" />
            <rect x="272" y="-36" width="16" height="8" rx="2" fill="rgba(186,230,253,0.2)" />
            {/* Test tubes */}
            {[420, 440, 460].map((x, i) => (
              <g key={`tube-${i}`}>
                <rect x={x} y={-15 - i * 3} width="8" height="30 " rx="4" fill="none" stroke="rgba(186,230,253,0.25)" strokeWidth="1" />
                <rect x={x + 1} y={-2 - i * 3} width="6" height="14" rx="3" fill={['rgba(168,85,247,0.25)', 'rgba(251,146,60,0.25)', 'rgba(236,72,153,0.25)'][i]} />
              </g>
            ))}
            {/* Burner */}
            <rect x="580" y="8" width="30" height="12" rx="2" fill="rgba(120,113,108,0.3)" />
            <rect x="590" y="2" width="10" height="8" rx="1" fill="rgba(120,113,108,0.35)" />
            <ellipse cx="595" cy="-2" rx="6" ry="8" fill="rgba(59,130,246,0.2)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
          </svg>
          {/* Formula board on right */}
          <svg className="absolute top-14 right-2 w-20 h-40" viewBox="0 0 80 160">
            <rect x="4" y="4" width="72" height="152" rx="4" fill="rgba(30,41,59,0.4)" stroke="rgba(100,116,139,0.3)" strokeWidth="2" />
            {/* Formula text */}
            <text x="10" y="30" fill="rgba(74,222,128,0.5)" fontSize="9" fontFamily="monospace">E=mc²</text>
            <text x="10" y="50" fill="rgba(96,165,250,0.4)" fontSize="8" fontFamily="monospace">F=ma</text>
            <text x="10" y="70" fill="rgba(251,191,36,0.4)" fontSize="8" fontFamily="monospace">π≈3.14</text>
            <text x="10" y="90" fill="rgba(248,113,113,0.4)" fontSize="8" fontFamily="monospace">a²+b²</text>
            <text x="10" y="105" fill="rgba(248,113,113,0.4)" fontSize="8" fontFamily="monospace"> =c²</text>
            <line x1="10" y1="115" x2="65" y2="115" stroke="rgba(100,116,139,0.2)" strokeWidth="0.5" />
            <text x="10" y="132" fill="rgba(192,132,252,0.4)" fontSize="8" fontFamily="monospace">∫ f(x)dx</text>
          </svg>
          {/* Measurement ruler on left */}
          <svg className="absolute top-20 left-3 w-6 h-48" viewBox="0 0 24 192">
            <rect x="4" y="0" width="16" height="192" rx="2" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.25)" strokeWidth="1" />
            {Array.from({ length: 10 }, (_, i) => (
              <g key={`tick-${i}`}>
                <line x1={i % 2 === 0 ? 6 : 10} y1={i * 20} x2="18" y2={i * 20} stroke="rgba(234,179,8,0.4)" strokeWidth="0.8" />
                {i % 2 === 0 && <text x="1" y={i * 20 + 4} fill="rgba(234,179,8,0.4)" fontSize="6" fontFamily="monospace">{10 - i}</text>}
              </g>
            ))}
          </svg>
        </div>
      );

    // Floor 6: The Rune Workshop — carved runes, glowing circles, stone
    case 6:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Central rune circle */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 animate-pulse" style={{ animationDuration: '4s' }} viewBox="0 0 288 288">
            <circle cx="144" cy="144" r="130" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="2" />
            <circle cx="144" cy="144" r="110" fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="1.5" strokeDasharray="8 6" />
            <circle cx="144" cy="144" r="90" fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="1" />
            {/* Rune symbols around circle */}
            {['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'].map((rune, i) => {
              const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
              const r = 118;
              return (
                <text
                  key={`rune-${i}`}
                  x={144 + Math.cos(angle) * r}
                  y={144 + Math.sin(angle) * r + 5}
                  fill="rgba(192,132,252,0.3)"
                  fontSize="16"
                  fontFamily="serif"
                  textAnchor="middle"
                >
                  {rune}
                </text>
              );
            })}
            {/* Inner pentagram */}
            <polygon
              points={Array.from({ length: 5 }, (_, i) => {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                return `${144 + Math.cos(angle) * 70},${144 + Math.sin(angle) * 70}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(168,85,247,0.1)"
              strokeWidth="1"
            />
          </svg>
          {/* Stone tablets on walls */}
          {[
            { x: '3%', y: '18%', w: 50, h: 70 },
            { x: '90%', y: '22%', w: 45, h: 65 },
            { x: '5%', y: '70%', w: 48, h: 68 },
            { x: '88%', y: '68%', w: 46, h: 66 },
          ].map((tab, i) => (
            <svg key={`tablet-${i}`} className="absolute" style={{ left: tab.x, top: tab.y, width: tab.w, height: tab.h }} viewBox="0 0 50 70">
              <rect x="2" y="2" width="46" height="66" rx="4" fill="rgba(87,83,78,0.25)" stroke="rgba(120,113,108,0.2)" strokeWidth="1.5" />
              {/* Carved rune lines */}
              <line x1="10" y1="15" x2="40" y2="15" stroke="rgba(168,85,247,0.15)" strokeWidth="1" />
              <line x1="10" y1="25" x2="35" y2="25" stroke="rgba(168,85,247,0.12)" strokeWidth="1" />
              <line x1="10" y1="35" x2="38" y2="35" stroke="rgba(168,85,247,0.1)" strokeWidth="1" />
              <text x="25" y="55" fill="rgba(192,132,252,0.25)" fontSize="14" fontFamily="serif" textAnchor="middle">
                {['ᛟ', 'ᛏ', 'ᛊ', 'ᛉ'][i]}
              </text>
            </svg>
          ))}
          {/* Glowing particles along rune paths */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 38;
            return (
              <div
                key={`glow-${i}`}
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  top: `${50 + Math.sin(angle) * r}%`,
                  left: `${50 + Math.cos(angle) * r}%`,
                  backgroundColor: 'rgba(192,132,252,0.3)',
                  boxShadow: '0 0 8px rgba(192,132,252,0.3)',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2.5s',
                }}
              />
            );
          })}
          {/* Purple mist */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl" />
        </div>
      );

    // Floor 7: The Treasure Vault — gold piles, chests, gem clusters, shimmer
    case 7:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gold pile shapes at bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 800 128" preserveAspectRatio="none">
            <path d="M0 128 L0 90 Q100 50 200 80 Q300 40 400 70 Q500 30 600 65 Q700 45 800 80 L800 128 Z" fill="rgba(234,179,8,0.1)" />
            <path d="M0 128 L0 100 Q150 70 300 95 Q450 65 600 85 Q700 70 800 90 L800 128 Z" fill="rgba(234,179,8,0.08)" />
            {/* Coins scattered on pile */}
            {Array.from({ length: 25 }, (_, i) => (
              <ellipse
                key={`coin-${i}`}
                cx={30 + (i * 31) % 740}
                cy={85 + (i * 17) % 35}
                rx={5 + (i % 3) * 2}
                ry={3 + (i % 2) * 2}
                fill={`rgba(251,191,36,${0.2 + (i % 4) * 0.05})`}
                stroke="rgba(234,179,8,0.3)"
                strokeWidth="0.5"
              />
            ))}
          </svg>
          {/* Treasure chest - left */}
          <svg className="absolute bottom-16 left-[8%] w-20 h-16" viewBox="0 0 80 64">
            <rect x="4" y="20" width="72" height="40" rx="4" fill="rgba(120,77,20,0.4)" stroke="rgba(161,98,7,0.4)" strokeWidth="2" />
            <path d="M4 20 Q40 0 76 20" fill="rgba(120,77,20,0.35)" stroke="rgba(161,98,7,0.4)" strokeWidth="2" />
            <rect x="34" y="30" width="12" height="10" rx="2" fill="rgba(234,179,8,0.5)" />
            <circle cx="40" cy="35" r="3" fill="rgba(251,191,36,0.6)" />
            {/* Metallic bands */}
            <line x1="4" y1="35" x2="76" y2="35" stroke="rgba(161,98,7,0.3)" strokeWidth="2" />
          </svg>
          {/* Treasure chest - right */}
          <svg className="absolute bottom-20 right-[10%] w-16 h-14" viewBox="0 0 80 64">
            <rect x="4" y="20" width="72" height="40" rx="4" fill="rgba(120,77,20,0.35)" stroke="rgba(161,98,7,0.35)" strokeWidth="2" />
            <path d="M4 20 Q40 2 76 20" fill="rgba(120,77,20,0.3)" stroke="rgba(161,98,7,0.35)" strokeWidth="2" />
            <rect x="34" y="30" width="12" height="10" rx="2" fill="rgba(234,179,8,0.45)" />
            <line x1="4" y1="35" x2="76" y2="35" stroke="rgba(161,98,7,0.25)" strokeWidth="2" />
          </svg>
          {/* Gem clusters */}
          {[
            { x: '15%', y: '25%', colors: ['rgba(239,68,68,0.35)', 'rgba(236,72,153,0.3)', 'rgba(220,38,38,0.3)'] },
            { x: '82%', y: '35%', colors: ['rgba(34,211,238,0.35)', 'rgba(59,130,246,0.3)', 'rgba(99,102,241,0.3)'] },
            { x: '75%', y: '15%', colors: ['rgba(74,222,128,0.3)', 'rgba(34,197,94,0.3)', 'rgba(16,185,129,0.25)'] },
          ].map((gem, gi) => (
            <svg key={`gem-${gi}`} className="absolute w-10 h-10 animate-pulse" style={{ left: gem.x, top: gem.y, animationDelay: `${gi * 0.6}s`, animationDuration: '3s' }} viewBox="0 0 40 40">
              <polygon points="20,2 28,14 24,30 16,30 12,14" fill={gem.colors[0]} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <polygon points="10,18 6,28 14,34 18,24" fill={gem.colors[1]} />
              <polygon points="30,18 34,28 26,34 22,24" fill={gem.colors[2]} />
            </svg>
          ))}
          {/* Gold shimmer */}
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={`shimmer-${i}`}
              className="absolute animate-ping"
              style={{
                top: `${15 + (i * 43 + 11) % 70}%`,
                left: `${8 + (i * 53 + 19) % 84}%`,
                width: '3px',
                height: '3px',
                backgroundColor: 'rgba(251,191,36,0.3)',
                borderRadius: '50%',
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2.5 + (i % 3) * 0.8}s`,
              }}
            />
          ))}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-t from-yellow-600/10 to-transparent" />
        </div>
      );

    // Floor 8: The Star Observatory — drawn telescope, star field, nebula, planets
    case 8:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Dense star field */}
          {Array.from({ length: 50 }, (_, i) => {
            const size = 0.8 + (i % 5) * 0.5;
            return (
              <div
                key={`star-${i}`}
                className="absolute rounded-full animate-pulse"
                style={{
                  top: `${3 + (i * 37 + 13) % 55}%`,
                  left: `${2 + (i * 53 + 7) % 96}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: `rgba(255,255,255,${0.15 + (i % 6) * 0.08})`,
                  animationDelay: `${(i * 0.17) % 5}s`,
                  animationDuration: `${2 + (i % 5) * 1.2}s`,
                }}
              />
            );
          })}
          {/* Nebula cloud */}
          <div className="absolute top-[10%] left-[15%] w-48 h-32 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-[8%] left-[20%] w-36 h-24 bg-blue-500/4 rounded-full blur-2xl" />
          <div className="absolute top-[15%] right-[20%] w-40 h-28 bg-pink-500/4 rounded-full blur-3xl" />
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
            {/* Ursa Major-like */}
            <polyline points="120,80 180,60 220,90 260,70 280,110 240,130 200,120" fill="none" stroke="rgba(147,197,253,0.8)" strokeWidth="1" />
            {[120, 180, 220, 260, 280, 240, 200].map((x, i) => (
              <circle key={`cs-${i}`} cx={x} cy={[80, 60, 90, 70, 110, 130, 120][i]} r="2.5" fill="rgba(219,234,254,0.6)" />
            ))}
            {/* Orion-like */}
            <polyline points="550,50 580,90 600,130 570,160 530,160 560,130 540,90" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="0.8" />
            {[550, 580, 600, 570, 530, 560, 540].map((x, i) => (
              <circle key={`cs2-${i}`} cx={x} cy={[50, 90, 130, 160, 160, 130, 90][i]} r="2" fill="rgba(219,234,254,0.5)" />
            ))}
          </svg>
          {/* Planet with ring */}
          <svg className="absolute top-[12%] right-[12%] w-16 h-16 animate-pulse" style={{ animationDuration: '5s' }} viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="14" fill="rgba(234,179,8,0.2)" />
            <ellipse cx="32" cy="32" rx="28" ry="8" fill="none" stroke="rgba(234,179,8,0.15)" strokeWidth="1.5" transform="rotate(-20 32 32)" />
          </svg>
          {/* Moon */}
          <svg className="absolute top-[8%] left-[10%] w-12 h-12" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="16" fill="rgba(226,232,240,0.12)" />
            <circle cx="30" cy="20" r="12" fill="rgba(15,23,42,0.3)" /> {/* Crescent cutout effect */}
          </svg>
          {/* Telescope */}
          <svg className="absolute bottom-8 right-8 w-20 h-28" viewBox="0 0 80 112">
            {/* Tripod */}
            <line x1="40" y1="60" x2="15" y2="110" stroke="rgba(120,113,108,0.4)" strokeWidth="2.5" />
            <line x1="40" y1="60" x2="65" y2="110" stroke="rgba(120,113,108,0.4)" strokeWidth="2.5" />
            <line x1="40" y1="60" x2="40" y2="112" stroke="rgba(120,113,108,0.4)" strokeWidth="2.5" />
            {/* Tube */}
            <rect x="20" y="20" width="40" height="14" rx="7" fill="rgba(120,113,108,0.35)" stroke="rgba(120,113,108,0.3)" strokeWidth="1" transform="rotate(-35 40 27)" />
            <circle cx="58" cy="12" r="10" fill="none" stroke="rgba(147,197,253,0.2)" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-950/20 to-transparent" />
        </div>
      );

    // Floor 9: The Dragon's Lair — SVG flames, lava, dragon shadow, smoke
    case 9:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Lava flow at bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-28" viewBox="0 0 800 112" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lava" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(239,68,68,0.2)" />
                <stop offset="40%" stopColor="rgba(234,88,12,0.25)" />
                <stop offset="100%" stopColor="rgba(154,52,18,0.3)" />
              </linearGradient>
            </defs>
            <path d="M0 112 L0 50 Q100 30 200 55 Q300 20 400 45 Q500 25 600 50 Q700 35 800 60 L800 112 Z" fill="url(#lava)" />
            {/* Lava cracks */}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`crack-${i}`} x1={60 + i * 110} y1="112" x2={60 + i * 110 + (i % 2 ? 15 : -15)} y2={70 + (i % 3) * 10} stroke="rgba(251,146,60,0.3)" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </svg>
          {/* SVG flames */}
          <svg className="absolute bottom-12 left-0 w-full h-24" viewBox="0 0 800 96">
            {[80, 200, 350, 500, 620, 740].map((x, i) => (
              <g key={`flame-${i}`} className="animate-flicker" style={{ animationDelay: `${i * 0.2}s` }}>
                <ellipse cx={x} cy="70" rx={16 + (i % 3) * 4} ry={30 + (i % 3) * 8} fill="rgba(239,68,68,0.15)" />
                <ellipse cx={x} cy="60" rx={10 + (i % 2) * 4} ry={22 + (i % 3) * 5} fill="rgba(251,146,60,0.18)" />
                <ellipse cx={x} cy="52" rx={6 + (i % 2) * 2} ry={14 + (i % 2) * 4} fill="rgba(251,191,36,0.15)" />
              </g>
            ))}
          </svg>
          {/* Dragon silhouette — SVG */}
          <svg className="absolute top-6 right-4 w-36 h-28 opacity-20" viewBox="0 0 144 112">
            {/* Dragon body */}
            <path d="M20 80 Q30 50 50 40 Q60 30 80 35 Q100 25 110 30 L120 20 L115 30 Q125 35 130 45 Q135 55 125 65 Q110 75 90 70 Q70 80 50 75 Q35 85 20 80 Z" fill="rgba(239,68,68,0.4)" />
            {/* Wing */}
            <path d="M70 40 Q90 10 120 15 Q105 25 95 35 Z" fill="rgba(220,38,38,0.3)" />
            {/* Eye */}
            <circle cx="110" cy="35" r="2.5" fill="rgba(251,191,36,0.6)" />
            {/* Tail */}
            <path d="M20 80 Q10 90 5 85 Q8 95 15 90" fill="rgba(239,68,68,0.3)" />
          </svg>
          {/* Smoke columns */}
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={`smoke-${i}`}
              className="absolute rounded-full animate-float-up"
              style={{
                bottom: `${80 + i * 60}px`,
                left: `${15 + i * 18}%`,
                width: `${30 + i * 8}px`,
                height: `${15 + i * 4}px`,
                background: `radial-gradient(ellipse, rgba(120,113,108,${0.08 - i * 0.01}) 0%, transparent 70%)`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${4 + i * 1.5}s`,
              }}
            />
          ))}
          {/* Heat haze */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-red-900/20 via-orange-900/10 to-transparent" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-96 h-20 bg-orange-500/6 rounded-full blur-3xl" />
        </div>
      );

    // Floor 10: The Wizard's Summit — arcane circles, lightning, energy, sky
    case 10:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Swirling sky gradient */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-violet-900/20 via-indigo-900/10 to-transparent" />
          {/* Spinning arcane circle — SVG */}
          <svg
            className="absolute top-1/2 left-1/2 w-[320px] h-[320px]"
            style={{ animation: 'spin 25s linear infinite', transformOrigin: 'center' }}
            viewBox="0 0 320 320"
          >
            <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(253,224,71,0.12)" strokeWidth="2" />
            <circle cx="160" cy="160" r="130" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="1.5" strokeDasharray="12 8" />
            <circle cx="160" cy="160" r="110" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
            {/* Hexagram */}
            <polygon
              points={Array.from({ length: 6 }, (_, i) => {
                const a = (i * Math.PI) / 3 - Math.PI / 2;
                return `${160 + Math.cos(a) * 95},${160 + Math.sin(a) * 95}`;
              }).join(' ')}
              fill="none" stroke="rgba(253,224,71,0.08)" strokeWidth="1"
            />
            <polygon
              points={Array.from({ length: 6 }, (_, i) => {
                const a = (i * Math.PI) / 3 - Math.PI / 6;
                return `${160 + Math.cos(a) * 95},${160 + Math.sin(a) * 95}`;
              }).join(' ')}
              fill="none" stroke="rgba(253,224,71,0.08)" strokeWidth="1"
            />
            {/* Rune letters on circle */}
            {['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'].map((r, i) => {
              const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
              return (
                <text key={`r-${i}`} x={160 + Math.cos(a) * 140} y={160 + Math.sin(a) * 140 + 5} fill="rgba(253,224,71,0.2)" fontSize="12" fontFamily="serif" textAnchor="middle">{r}</text>
              );
            })}
          </svg>
          {/* Lightning bolts — SVG drawn */}
          <svg className="absolute top-0 left-[12%] w-12 h-32 animate-ping" style={{ animationDuration: '3s' }} viewBox="0 0 48 128">
            <polyline points="24,0 18,35 28,40 14,75 26,78 8,128" fill="none" stroke="rgba(253,224,71,0.25)" strokeWidth="2" strokeLinejoin="round" />
            <polyline points="24,0 18,35 28,40 14,75 26,78 8,128" fill="none" stroke="rgba(253,224,71,0.1)" strokeWidth="5" strokeLinejoin="round" />
          </svg>
          <svg className="absolute top-4 right-[15%] w-10 h-28 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }} viewBox="0 0 40 112">
            <polyline points="20,0 14,30 24,34 10,65 22,68 6,112" fill="none" stroke="rgba(253,224,71,0.2)" strokeWidth="2" strokeLinejoin="round" />
            <polyline points="20,0 14,30 24,34 10,65 22,68 6,112" fill="none" stroke="rgba(253,224,71,0.08)" strokeWidth="5" strokeLinejoin="round" />
          </svg>
          {/* Energy orbs orbiting */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 38;
            const colors = ['rgba(253,224,71,0.35)', 'rgba(168,85,247,0.35)', 'rgba(34,211,238,0.35)', 'rgba(74,222,128,0.3)'];
            return (
              <div
                key={`orb-${i}`}
                className="absolute w-3 h-3 rounded-full animate-pulse"
                style={{
                  top: `${50 + Math.sin(angle) * r}%`,
                  left: `${50 + Math.cos(angle) * r}%`,
                  backgroundColor: colors[i % 4],
                  boxShadow: `0 0 12px ${colors[i % 4]}`,
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: '2s',
                }}
              />
            );
          })}
          {/* Crown glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-yellow-400/6 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
        </div>
      );

    default:
      return null;
  }
}

// ─── Particle effects ───
function StarParticles({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 0.8 + Math.random() * 0.6,
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-yellow-300 animate-ping"
          style={{
            left: `${p.left}%`,
            top: '50%',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}

// ─── Tower visualization ───
function TowerProgress({ currentFloor, totalFloors }: { currentFloor: number; totalFloors: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {Array.from({ length: totalFloors }, (_, i) => {
        const floor = totalFloors - i;
        const isActive = floor === currentFloor;
        const isCompleted = floor < currentFloor;
        const emoji = FLOORS[floor - 1]?.emoji || '🏠';

        return (
          <div
            key={floor}
            className={`
              w-10 h-7 flex items-center justify-center rounded text-xs font-bold transition-all duration-300
              ${isActive ? 'bg-purple-500 text-white scale-125 shadow-lg shadow-purple-500/50 ring-2 ring-yellow-400' : ''}
              ${isCompleted ? 'bg-emerald-500/80 text-white' : ''}
              ${!isActive && !isCompleted ? 'bg-indigo-900/60 text-indigo-400/60' : ''}
            `}
            title={`Floor ${floor}: ${FLOORS[floor - 1]?.challenge.floorName}`}
          >
            {isCompleted ? '✓' : isActive ? emoji : floor}
          </div>
        );
      })}
      <div className="w-12 h-3 bg-stone-600 rounded-b text-center text-[8px] text-stone-400">BASE</div>
    </div>
  );
}

// ─── Lives display ───
function LivesDisplay({ lives }: { lives: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: STARTING_LIVES }, (_, i) => (
        <span
          key={i}
          className={`text-2xl transition-all duration-300 ${i < lives ? 'scale-100' : 'scale-75 opacity-30 grayscale'}`}
        >
          {i < lives ? '💜' : '🖤'}
        </span>
      ))}
    </div>
  );
}

// ─── Main Game ───
type GameState = 'intro' | 'playing' | 'success' | 'fail' | 'gameover' | 'victory';

export function MathQuestGame() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [expression, setExpression] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [timer, setTimer] = useState(TIME_LIMIT_SECONDS);
  const [showParticles, setShowParticles] = useState(false);
  const [floorTransition, setFloorTransition] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentFloor: Floor | undefined = FLOORS[currentFloorIdx];
  const totalFloors = FLOORS.length;

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) return 0;
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentFloorIdx]);

  // Focus input when playing
  useEffect(() => {
    if (gameState === 'playing') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [gameState, currentFloorIdx]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentFloorIdx(0);
    setLives(STARTING_LIVES);
    setScore(0);
    setCombo(0);
    setExpression('');
    setFeedback(null);
    setShowHint(false);
    setHintUsed(false);
    setTimer(TIME_LIMIT_SECONDS);
  }, []);

  const nextFloor = useCallback(() => {
    setFloorTransition(true);
    setTimeout(() => {
      const nextIdx = currentFloorIdx + 1;
      if (nextIdx >= totalFloors) {
        setGameState('victory');
      } else {
        setCurrentFloorIdx(nextIdx);
        setExpression('');
        setFeedback(null);
        setShowHint(false);
        setHintUsed(false);
        setTimer(TIME_LIMIT_SECONDS);
        setGameState('playing');
      }
      setFloorTransition(false);
    }, 800);
  }, [currentFloorIdx, totalFloors]);

  const submitAnswer = useCallback(() => {
    if (!currentFloor) return;
    const challenge = currentFloor.challenge;

    // Check forbidden literals
    if (checkForbidden(expression, challenge.forbiddenLiterals)) {
      setFeedback({ message: "You can't just type the answer! Use math operators.", type: 'error' });
      return;
    }

    const { value, error } = evaluateExpression(expression);

    if (error) {
      setFeedback({ message: error, type: 'error' });
      return;
    }

    if (value === null) {
      setFeedback({ message: 'Could not evaluate expression.', type: 'error' });
      return;
    }

    // Check if close enough (floating point tolerance)
    const target = challenge.targetValue;
    const isCorrect = Math.abs(value - target) < 0.001;

    if (isCorrect) {
      // Calculate score
      const timeBonus = Math.round((timer / TIME_LIMIT_SECONDS) * TIME_BONUS_MAX);
      const comboMultiplier = COMBO_MULTIPLIERS[Math.min(combo, COMBO_MULTIPLIERS.length - 1)];
      const hintDeduction = hintUsed ? HINT_PENALTY : 0;
      const floorPoints = Math.round((POINTS_PER_FLOOR + timeBonus - hintDeduction) * comboMultiplier);

      setScore((s) => s + Math.max(floorPoints, 10));
      setCombo((c) => c + 1);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);

      setFeedback({
        message: `Correct! ${value} = ${target} ✨ (+${floorPoints} pts${combo > 0 ? ` | ${comboMultiplier}x combo!` : ''})`,
        type: 'success',
      });
      setGameState('success');
    } else {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setTimeout(() => setGameState('gameover'), 500);
        }
        return newLives;
      });
      setCombo(0);
      setFeedback({
        message: `Your expression equals ${value}, but the target is ${target}. Try again!`,
        type: 'error',
      });
    }
  }, [expression, currentFloor, timer, combo, hintUsed]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      submitAnswer();
    }
    if (e.key === 'Enter' && gameState === 'success') {
      nextFloor();
    }
  };

  // ─── Intro Screen ───
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          {/* Tower silhouette */}
          <div className="text-8xl mb-4 animate-bounce">🏰</div>
          <h1 className="font-wizard text-5xl text-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">
            Math Quest
          </h1>
          <h2 className="font-wizard text-2xl text-purple-300 mb-6">Wizard's Tower</h2>

          <div className="bg-indigo-900/50 backdrop-blur rounded-xl p-6 mb-6 border border-purple-500/30">
            <p className="text-purple-200 mb-4">
              Climb the Wizard's Tower by solving math challenges on each floor!
              Write Python math expressions to unlock doors, solve puzzles, and
              reach the summit.
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">🔢</div>
                <div className="text-purple-300">10 Floors</div>
              </div>
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">💜</div>
                <div className="text-purple-300">3 Lives</div>
              </div>
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-purple-300">Combos!</div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/30 rounded-lg p-4 mb-6 border border-indigo-500/20 text-left">
            <h3 className="text-yellow-300 font-wizard text-lg mb-2">Operators You Can Use:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-purple-200">
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">+</code> Addition</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">-</code> Subtraction</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">*</code> Multiplication</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">/</code> Division</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">//</code> Floor Division</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">%</code> Modulo</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">**</code> Exponent</div>
              <div><code className="text-yellow-200 bg-indigo-800/60 px-1 rounded">( )</code> Parentheses</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-wizard text-2xl py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95"
          >
            Begin the Ascent ✨
          </button>
        </div>
      </div>
    );
  }

  // ─── Game Over Screen ───
  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-slate-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-4">💀</div>
          <h1 className="font-wizard text-4xl text-red-400 mb-2">Tower Collapsed!</h1>
          <p className="text-slate-400 mb-6">
            You fell at Floor {currentFloorIdx + 1}: {currentFloor?.challenge.floorName}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-yellow-400 font-wizard">{score}</div>
              <div className="text-sm text-slate-400">Final Score</div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 font-wizard">
                {currentFloorIdx}/{totalFloors}
              </div>
              <div className="text-sm text-slate-400">Floors Cleared</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-wizard text-xl py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    );
  }

  // ─── Victory Screen ───
  if (gameState === 'victory') {
    const maxScore = totalFloors * (POINTS_PER_FLOOR + TIME_BONUS_MAX) * COMBO_MULTIPLIERS[COMBO_MULTIPLIERS.length - 1];
    const percentage = Math.round((score / maxScore) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 60 ? 2 : 1;

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900/30 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center relative">
          <StarParticles active={true} />

          <div className="text-8xl mb-4">👑</div>
          <h1 className="font-wizard text-5xl text-yellow-300 mb-2 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]">
            Tower Conquered!
          </h1>
          <p className="text-purple-300 mb-6 font-wizard text-xl">
            The Wizard's power is yours!
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={`text-4xl ${i < stars ? 'animate-pulse' : 'opacity-20'}`}>
                ⭐
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-yellow-400 font-wizard">{score}</div>
              <div className="text-sm text-purple-300">Score</div>
            </div>
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-emerald-400 font-wizard">{lives}/{STARTING_LIVES}</div>
              <div className="text-sm text-purple-300">Lives Left</div>
            </div>
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400 font-wizard">{percentage}%</div>
              <div className="text-sm text-purple-300">Perfection</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-indigo-950 font-wizard text-xl py-4 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95"
          >
            Play Again ✨
          </button>
        </div>
      </div>
    );
  }

  // ─── Playing / Success Screen ───
  if (!currentFloor) return null;

  const timerColor = timer > 30 ? 'text-emerald-400' : timer > 10 ? 'text-yellow-400' : 'text-red-400';
  const timerBarWidth = (timer / TIME_LIMIT_SECONDS) * 100;

  // Per-floor background gradients
  const floorGradients: Record<number, string> = {
    1: 'from-stone-950 via-stone-900 to-indigo-950',        // Entry Hall — stone
    2: 'from-emerald-950 via-indigo-950 to-purple-950',     // Potion Room — green mist
    3: 'from-cyan-950 via-indigo-950 to-purple-950',        // Crystal Chamber — prismatic
    4: 'from-amber-950 via-stone-900 to-indigo-950',        // Library — warm wood
    5: 'from-slate-950 via-indigo-950 to-purple-950',       // Alchemy Lab — sterile
    6: 'from-violet-950 via-purple-950 to-indigo-950',      // Rune Workshop — arcane purple
    7: 'from-yellow-950 via-amber-950 to-indigo-950',       // Treasure Vault — gold
    8: 'from-blue-950 via-indigo-950 to-slate-950',         // Star Observatory — deep night
    9: 'from-red-950 via-orange-950 to-slate-950',          // Dragon's Lair — fiery
    10: 'from-violet-950 via-indigo-950 to-yellow-950/30',  // Wizard's Summit — arcane
  };

  const bgGradient = floorGradients[currentFloor.challenge.id] || 'from-indigo-950 via-purple-950 to-slate-950';

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgGradient} flex flex-col transition-all duration-700 relative ${floorTransition ? 'opacity-0' : 'opacity-100'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Themed background decorations */}
      <FloorThemeBackground floorId={currentFloor.challenge.id} />

      <StarParticles active={showParticles} />

      {/* Header bar */}
      <div className="bg-indigo-900/60 backdrop-blur border-b border-purple-500/30 px-4 py-2 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LivesDisplay lives={lives} />
            <div className="text-yellow-400 font-wizard text-lg">
              ⚡ {score}
            </div>
          </div>

          <div className="text-center">
            <div className="text-purple-300 text-sm font-wizard">
              Floor {currentFloorIdx + 1} of {totalFloors}
            </div>
            {combo > 1 && (
              <div className="text-yellow-300 text-xs font-bold animate-pulse">
                {COMBO_MULTIPLIERS[Math.min(combo - 1, COMBO_MULTIPLIERS.length - 1)]}x COMBO 🔥
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold text-lg ${timerColor}`}>
              {timer}s
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="max-w-4xl mx-auto mt-1">
          <div className="h-1 bg-indigo-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                timer > 30 ? 'bg-emerald-400' : timer > 10 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${timerBarWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full flex gap-6">
          {/* Tower sidebar */}
          <div className="hidden md:flex flex-col items-center">
            <TowerProgress currentFloor={currentFloorIdx + 1} totalFloors={totalFloors} />
          </div>

          {/* Challenge area */}
          <div className="flex-1 max-w-2xl">
            {/* Flavor text */}
            <div className="text-purple-400/80 italic text-sm mb-3 text-center">
              {currentFloor.flavorText}
            </div>

            {/* Floor card */}
            <div className="bg-indigo-900/40 backdrop-blur rounded-2xl border border-purple-500/30 p-6 shadow-2xl shadow-purple-900/30">
              {/* Floor header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{currentFloor.emoji}</span>
                <div>
                  <h2 className="font-wizard text-2xl text-yellow-300">
                    {currentFloor.challenge.floorName}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    currentFloor.challenge.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                    currentFloor.challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {currentFloor.challenge.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Challenge description */}
              <div className="bg-indigo-950/60 rounded-xl p-4 mb-4 border border-indigo-500/20">
                <p className="text-purple-100 leading-relaxed">
                  {currentFloor.challenge.description}
                </p>
              </div>

              {/* Input area */}
              <div className="mb-4">
                <label className="text-purple-400 text-sm mb-1 block font-wizard">
                  Your Python Expression:
                </label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={expression}
                    onChange={(e) => {
                      setExpression(e.target.value);
                      setFeedback(null);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={gameState === 'success'}
                    placeholder="e.g., 6 * 7"
                    className="flex-1 bg-indigo-950/80 border-2 border-purple-500/40 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(253,224,71,0.2)] transition-all placeholder:text-indigo-600 disabled:opacity-50"
                  />
                  {gameState === 'playing' && (
                    <button
                      onClick={submitAnswer}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-wizard text-lg hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                      Cast ✨
                    </button>
                  )}
                  {gameState === 'success' && (
                    <button
                      onClick={nextFloor}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-wizard text-lg hover:from-emerald-500 hover:to-teal-500 transition-all hover:scale-105 active:scale-95 shadow-lg animate-pulse"
                    >
                      Next ⬆️
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`rounded-lg p-3 mb-4 text-sm font-medium transition-all ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : feedback.type === 'error'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              {/* Hint button */}
              {gameState === 'playing' && (
                <div className="flex justify-center">
                  {!showHint ? (
                    <button
                      onClick={() => {
                        setShowHint(true);
                        setHintUsed(true);
                      }}
                      className="text-purple-400 hover:text-yellow-400 text-sm transition-colors"
                    >
                      💡 Show Hint (-{HINT_PENALTY} pts)
                    </button>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 text-yellow-300 text-sm">
                      💡 {currentFloor.challenge.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
