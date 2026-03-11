import { useState, useEffect, useRef, useCallback } from 'react';
import type { MathQuestGame as MathQuestGameData, MathQuestFloor } from '@/types/game';

interface MathQuestGameProps {
  gameData: MathQuestGameData;
  onComplete: (score: number, xpEarned: number) => void;
}

// Evaluate a math expression safely
function evaluateExpression(expr: string): { value: number | null; error: string | null } {
  try {
    const sanitized = expr.trim();
    if (!sanitized) return { value: null, error: 'Empty expression' };

    if (/[a-zA-Z_]/.test(sanitized)) {
      return { value: null, error: 'Only numbers and math operators allowed (+, -, *, /, //, %, **)' };
    }
    if (/[;{}\[\]`~!@#$&|^=<>?,:'"]/.test(sanitized)) {
      return { value: null, error: 'Invalid characters. Use only numbers and operators.' };
    }

    let jsExpr = sanitized;
    jsExpr = jsExpr.replace(/(\d+(?:\.\d+)?)\s*\*\*\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1,$2)');
    for (let i = 0; i < 5; i++) {
      jsExpr = jsExpr.replace(
        /((?:Math\.pow\([^)]+\)|\d+(?:\.\d+)?))\s*\*\*\s*((?:Math\.pow\([^)]+\)|\d+(?:\.\d+)?))/g,
        'Math.pow($1,$2)'
      );
    }
    jsExpr = jsExpr.replace(
      /((?:Math\.pow\([^)]+\)|\([\d+\-*/%.() ]+\)|\d+(?:\.\d+)?))\s*\/\/\s*((?:Math\.pow\([^)]+\)|\([\d+\-*/%.() ]+\)|\d+(?:\.\d+)?))/g,
      'Math.floor($1/$2)'
    );

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
    const numStr = String(num);
    const regex = new RegExp(`(?<![\\d.])${numStr.replace('.', '\\.')}(?![\\d.])`, 'g');
    if (regex.test(sanitized)) return true;
  }
  return false;
}

// Floor themed backgrounds — CSS atmosphere + simplified SVG accents
function FloorThemeBackground({ floorId }: { floorId: number }) {
  switch (floorId) {
    // Floor 1 — Dungeon Entrance
    case 1:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Stone wall pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(168,162,158,0.6) 0px, rgba(168,162,158,0.6) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(168,162,158,0.4) 0px, rgba(168,162,158,0.4) 1px, transparent 1px, transparent 100px)',
            backgroundSize: '100px 40px',
          }} />
          {/* Torch glow — left */}
          <div className="absolute top-[15%] left-[3%] w-40 h-40 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, rgba(234,88,12,0.1) 50%, transparent 70%)', animationDuration: '2s' }} />
          <div className="absolute top-[12%] left-[5%] w-20 h-20 rounded-full blur-2xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(254,240,138,0.3) 0%, transparent 70%)', animationDuration: '1.5s' }} />
          {/* Torch glow — right */}
          <div className="absolute top-[15%] right-[3%] w-40 h-40 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, rgba(234,88,12,0.1) 50%, transparent 70%)', animationDuration: '2.3s' }} />
          <div className="absolute top-[12%] right-[5%] w-20 h-20 rounded-full blur-2xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(254,240,138,0.3) 0%, transparent 70%)', animationDuration: '1.7s' }} />
          {/* Torches */}
          <svg className="absolute top-[12%] left-[4%] w-10 h-28" viewBox="0 0 40 112">
            <rect x="16" y="45" width="8" height="65" rx="2" fill="rgba(120,113,108,0.5)" />
            <rect x="10" y="42" width="20" height="6" rx="2" fill="rgba(120,113,108,0.6)" />
            <ellipse cx="20" cy="32" rx="12" ry="16" fill="rgba(251,146,60,0.4)" filter="blur(2px)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
            <ellipse cx="20" cy="28" rx="7" ry="11" fill="rgba(251,191,36,0.5)" filter="blur(1px)" className="animate-pulse" style={{ animationDuration: '1.2s' }} />
            <ellipse cx="20" cy="24" rx="4" ry="7" fill="rgba(254,240,138,0.6)" filter="blur(1px)" />
          </svg>
          <svg className="absolute top-[12%] right-[4%] w-10 h-28" viewBox="0 0 40 112">
            <rect x="16" y="45" width="8" height="65" rx="2" fill="rgba(120,113,108,0.5)" />
            <rect x="10" y="42" width="20" height="6" rx="2" fill="rgba(120,113,108,0.6)" />
            <ellipse cx="20" cy="32" rx="12" ry="16" fill="rgba(251,146,60,0.4)" filter="blur(2px)" className="animate-pulse" style={{ animationDuration: '1.7s' }} />
            <ellipse cx="20" cy="28" rx="7" ry="11" fill="rgba(251,191,36,0.5)" filter="blur(1px)" className="animate-pulse" style={{ animationDuration: '1.3s' }} />
            <ellipse cx="20" cy="24" rx="4" ry="7" fill="rgba(254,240,138,0.6)" filter="blur(1px)" />
          </svg>
          {/* Stone archway */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-16 opacity-30" viewBox="0 0 320 64">
            <path d="M0 64 Q160 0 320 64" fill="none" stroke="rgba(168,162,158,0.8)" strokeWidth="8" />
            <rect x="150" y="4" width="20" height="14" rx="3" fill="rgba(168,162,158,0.4)" />
          </svg>
          {/* Floor shadow */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-950/60 via-stone-900/20 to-transparent" />
        </div>
      );

    // Floor 2 — Potion Lab
    case 2:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Cauldron glow */}
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-64 h-48 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.08) 50%, transparent 70%)', animationDuration: '3s' }} />
          {/* Shelf glow — sides */}
          <div className="absolute top-[20%] left-0 w-28 h-[60%] bg-purple-500/5 blur-2xl" />
          <div className="absolute top-[20%] right-0 w-28 h-[60%] bg-purple-500/5 blur-2xl" />
          {/* Left shelf */}
          <svg className="absolute top-[15%] left-0 w-20 h-[65%] opacity-40" viewBox="0 0 80 400">
            <rect x="0" y="0" width="75" height="400" rx="2" fill="rgba(120,77,20,0.3)" stroke="rgba(120,77,20,0.4)" strokeWidth="2" />
            {[50, 130, 210, 290, 370].map((y, i) => (
              <g key={`sl-${i}`}>
                <rect x="4" y={y} width="68" height="4" rx="1" fill="rgba(120,77,20,0.6)" />
                {[14, 34, 54].map((bx, j) => {
                  const h = 28 + ((i + j) % 3) * 10;
                  const colors = ['rgba(34,197,94,0.5)', 'rgba(168,85,247,0.45)', 'rgba(59,130,246,0.5)', 'rgba(239,68,68,0.45)', 'rgba(234,179,8,0.5)'];
                  return <rect key={`bl-${i}-${j}`} x={bx - 5} y={y - h} width="10" height={h - 2} rx="3" fill={colors[(i + j) % 5]} />;
                })}
              </g>
            ))}
          </svg>
          {/* Right shelf */}
          <svg className="absolute top-[15%] right-0 w-20 h-[65%] opacity-40" viewBox="0 0 80 400" style={{ transform: 'scaleX(-1)' }}>
            <rect x="0" y="0" width="75" height="400" rx="2" fill="rgba(120,77,20,0.3)" stroke="rgba(120,77,20,0.4)" strokeWidth="2" />
            {[50, 130, 210, 290, 370].map((y, i) => (
              <g key={`sr-${i}`}>
                <rect x="4" y={y} width="68" height="4" rx="1" fill="rgba(120,77,20,0.6)" />
                {[14, 34, 54].map((bx, j) => {
                  const h = 25 + ((i + j + 1) % 3) * 12;
                  const colors = ['rgba(239,68,68,0.45)', 'rgba(234,179,8,0.5)', 'rgba(34,197,94,0.5)', 'rgba(59,130,246,0.45)', 'rgba(168,85,247,0.5)'];
                  return <rect key={`br-${i}-${j}`} x={bx - 5} y={y - h} width="10" height={h - 2} rx="3" fill={colors[(i + j) % 5]} />;
                })}
              </g>
            ))}
          </svg>
          {/* Cauldron */}
          <svg className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-28 h-24" viewBox="0 0 112 96">
            <ellipse cx="56" cy="72" rx="44" ry="20" fill="rgba(68,64,60,0.5)" />
            <path d="M16 55 Q12 72 16 85 Q36 98 76 98 Q96 98 96 85 Q100 72 96 55 Z" fill="rgba(68,64,60,0.5)" stroke="rgba(120,113,108,0.3)" strokeWidth="2" />
            <ellipse cx="56" cy="55" rx="38" ry="12" fill="rgba(34,197,94,0.3)" />
            {/* Bubbles */}
            {[40, 56, 70, 48, 64].map((cx, i) => (
              <circle key={`b-${i}`} cx={cx} cy={45 - i * 6} r={3 + (i % 2)} fill="rgba(74,222,128,0.3)" className="mq-animate-float-up" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </svg>
          {/* Floating particles */}
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`p-${i}`} className="absolute rounded-full mq-animate-float-up" style={{ top: `${50 + (i * 29) % 40}%`, left: `${25 + (i * 37) % 50}%`, width: `${3 + (i % 2)}px`, height: `${3 + (i % 2)}px`, backgroundColor: `rgba(74,222,128,${0.2 + (i % 3) * 0.1})`, animationDelay: `${i * 0.5}s`, animationDuration: `${3 + (i % 4)}s` }} />
          ))}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-950/30 to-transparent" />
        </div>
      );

    // Floor 3 — Crystal Cavern
    case 3:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ambient glow orbs */}
          <div className="absolute top-[20%] left-[10%] w-48 h-48 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)' }} />
          <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[25%] left-[20%] w-36 h-36 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[20%] right-[10%] w-44 h-44 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)' }} />
          {/* Center crystal */}
          <svg className="absolute top-[8%] left-1/2 -translate-x-1/2 w-20 h-32 mq-animate-float opacity-60" viewBox="0 0 80 128">
            <defs>
              <linearGradient id="crys-main" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
                <stop offset="50%" stopColor="rgba(168,85,247,0.5)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.6)" />
              </linearGradient>
            </defs>
            <polygon points="40,4 60,40 56,95 40,112 24,95 20,40" fill="url(#crys-main)" stroke="rgba(186,230,253,0.5)" strokeWidth="1.5" />
            <polygon points="40,4 60,40 40,50 20,40" fill="rgba(186,230,253,0.2)" />
          </svg>
          {/* Side crystals */}
          {[
            { x: '6%', y: '35%', size: 32, rot: -20, color: 'rgba(236,72,153,0.4)' },
            { x: '88%', y: '28%', size: 28, rot: 15, color: 'rgba(34,211,238,0.4)' },
            { x: '10%', y: '68%', size: 24, rot: -30, color: 'rgba(168,85,247,0.4)' },
            { x: '90%', y: '60%', size: 30, rot: 20, color: 'rgba(74,222,128,0.35)' },
            { x: '15%', y: '50%', size: 20, rot: -10, color: 'rgba(59,130,246,0.35)' },
            { x: '85%', y: '45%', size: 22, rot: 25, color: 'rgba(236,72,153,0.3)' },
          ].map((c, i) => (
            <svg key={`sc-${i}`} className="absolute animate-pulse" style={{ left: c.x, top: c.y, width: c.size, height: c.size * 1.6, transform: `rotate(${c.rot}deg)`, animationDelay: `${i * 0.5}s`, animationDuration: '4s' }} viewBox="0 0 24 40">
              <polygon points="12,1 20,14 18,32 12,38 6,32 4,14" fill={c.color} stroke="rgba(186,230,253,0.25)" strokeWidth="0.8" />
            </svg>
          ))}
          {/* Sparkles */}
          {Array.from({ length: 16 }, (_, i) => (
            <div key={`sp-${i}`} className="absolute animate-ping" style={{
              top: `${8 + (i * 31 + 11) % 82}%`, left: `${5 + (i * 47 + 3) % 88}%`,
              width: '3px', height: '3px', borderRadius: '50%',
              backgroundColor: ['rgba(34,211,238,0.5)', 'rgba(168,85,247,0.4)', 'rgba(236,72,153,0.4)', 'rgba(255,255,255,0.4)'][i % 4],
              boxShadow: `0 0 6px ${['rgba(34,211,238,0.3)', 'rgba(168,85,247,0.3)', 'rgba(236,72,153,0.3)', 'rgba(255,255,255,0.3)'][i % 4]}`,
              animationDelay: `${i * 0.3}s`, animationDuration: `${2.5 + (i % 4) * 0.5}s`,
            }} />
          ))}
          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-cyan-950/20 via-purple-950/10 to-transparent" />
        </div>
      );

    // Floor 4 — Ancient Library
    case 4:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Warm lantern glow */}
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(234,179,8,0.05) 40%, transparent 70%)' }} />
          {/* Side glow */}
          <div className="absolute top-[30%] left-0 w-32 h-[50%] bg-amber-500/5 blur-3xl" />
          <div className="absolute top-[30%] right-0 w-32 h-[50%] bg-amber-500/5 blur-3xl" />
          {/* Left bookshelf */}
          <svg className="absolute top-[12%] left-0 w-16 h-[75%] opacity-50" viewBox="0 0 64 450">
            <rect x="0" y="0" width="60" height="450" rx="2" fill="rgba(120,77,20,0.25)" stroke="rgba(120,77,20,0.35)" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
              const y = 8 + row * 55;
              const colors = ['rgba(220,38,38,0.45)', 'rgba(37,99,235,0.45)', 'rgba(22,163,74,0.4)', 'rgba(168,85,247,0.45)', 'rgba(234,179,8,0.45)', 'rgba(236,72,153,0.4)', 'rgba(14,165,233,0.45)'];
              return (
                <g key={`ls-${row}`}>
                  <rect x="2" y={y + 42} width="56" height="4" rx="1" fill="rgba(120,77,20,0.6)" />
                  {Array.from({ length: 4 + (row % 2) }, (_, bi) => (
                    <rect key={`lb-${row}-${bi}`} x={4 + bi * 11} y={y + 42 - (28 + ((row + bi) % 3) * 6)} width={8 + (bi % 2) * 2} height={28 + ((row + bi) % 3) * 6 - 2} rx="1" fill={colors[(row + bi) % 7]} />
                  ))}
                </g>
              );
            })}
          </svg>
          {/* Right bookshelf */}
          <svg className="absolute top-[12%] right-0 w-16 h-[75%] opacity-50" viewBox="0 0 64 450" style={{ transform: 'scaleX(-1)' }}>
            <rect x="0" y="0" width="60" height="450" rx="2" fill="rgba(120,77,20,0.25)" stroke="rgba(120,77,20,0.35)" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
              const y = 8 + row * 55;
              const colors = ['rgba(168,85,247,0.45)', 'rgba(234,179,8,0.45)', 'rgba(220,38,38,0.45)', 'rgba(22,163,74,0.4)', 'rgba(37,99,235,0.45)', 'rgba(14,165,233,0.45)', 'rgba(236,72,153,0.4)'];
              return (
                <g key={`rs-${row}`}>
                  <rect x="2" y={y + 42} width="56" height="4" rx="1" fill="rgba(120,77,20,0.6)" />
                  {Array.from({ length: 4 + ((row + 1) % 2) }, (_, bi) => (
                    <rect key={`rb-${row}-${bi}`} x={4 + bi * 11} y={y + 42 - (26 + ((row + bi + 1) % 3) * 7)} width={8 + ((bi + 1) % 2) * 2} height={26 + ((row + bi + 1) % 3) * 7 - 2} rx="1" fill={colors[(row + bi) % 7]} />
                  ))}
                </g>
              );
            })}
          </svg>
          {/* Hanging lantern */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-20 mq-animate-float" viewBox="0 0 48 80">
            <line x1="24" y1="0" x2="24" y2="25" stroke="rgba(120,113,108,0.4)" strokeWidth="1.5" />
            <path d="M14 25 L34 25 L30 55 Q24 62 18 55 Z" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.35)" strokeWidth="1" />
            <rect x="16" y="23" width="16" height="4" rx="2" fill="rgba(120,113,108,0.45)" />
            <ellipse cx="24" cy="42" rx="5" ry="7" fill="rgba(251,191,36,0.35)" className="animate-pulse" style={{ animationDuration: '2s' }} />
          </svg>
          {/* Floating dust motes */}
          {Array.from({ length: 18 }, (_, i) => (
            <div key={`d-${i}`} className="absolute rounded-full mq-animate-float-slow" style={{
              top: `${6 + (i * 41 + 17) % 85}%`, left: `${15 + (i * 47 + 11) % 68}%`,
              width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
              backgroundColor: `rgba(251,191,36,${0.15 + (i % 4) * 0.06})`,
              animationDelay: `${i * 0.35}s`, animationDuration: `${6 + (i % 5) * 2}s`,
            }} />
          ))}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-amber-950/20 to-transparent" />
        </div>
      );

    // Floor 5 — Workshop
    case 5:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'linear-gradient(rgba(147,197,253,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          {/* Blackboard glow */}
          <div className="absolute top-[10%] right-[2%] w-40 h-48 bg-blue-400/4 rounded-2xl blur-xl" />
          {/* Blackboard */}
          <svg className="absolute top-[12%] right-[3%] w-24 h-44 opacity-60" viewBox="0 0 96 176">
            <rect x="2" y="2" width="92" height="172" rx="4" fill="rgba(30,41,59,0.5)" stroke="rgba(100,116,139,0.35)" strokeWidth="2" />
            <rect x="6" y="6" width="84" height="164" rx="2" fill="rgba(15,23,42,0.3)" />
            <text x="14" y="32" fill="rgba(74,222,128,0.5)" fontSize="10" fontFamily="monospace">E = mc²</text>
            <text x="14" y="56" fill="rgba(96,165,250,0.45)" fontSize="9" fontFamily="monospace">F = ma</text>
            <text x="14" y="78" fill="rgba(251,191,36,0.45)" fontSize="9" fontFamily="monospace">π ≈ 3.14</text>
            <text x="14" y="100" fill="rgba(248,113,113,0.45)" fontSize="9" fontFamily="monospace">a² + b²</text>
            <text x="14" y="118" fill="rgba(248,113,113,0.45)" fontSize="9" fontFamily="monospace"> = c²</text>
            <text x="14" y="146" fill="rgba(168,85,247,0.4)" fontSize="9" fontFamily="monospace">∑ n²</text>
          </svg>
          {/* Workbench at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-800/30 to-transparent" />
          <svg className="absolute bottom-0 left-0 w-full h-12 opacity-30" viewBox="0 0 800 48" preserveAspectRatio="none">
            <rect x="30" y="4" width="740" height="6" rx="2" fill="rgba(120,113,108,0.6)" />
            <rect x="50" y="10" width="6" height="38" fill="rgba(120,113,108,0.4)" />
            <rect x="744" y="10" width="6" height="38" fill="rgba(120,113,108,0.4)" />
          </svg>
          {/* Subtle tool glow on left */}
          <div className="absolute bottom-[8%] left-[5%] w-20 h-20 bg-cyan-400/6 rounded-full blur-2xl" />
        </div>
      );

    // Floor 6 — Ritual Chamber
    case 6:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Central purple glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)', animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 60%)' }} />
          {/* Magic circle */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-60 animate-pulse" style={{ animationDuration: '5s' }} viewBox="0 0 320 320">
            <circle cx="160" cy="160" r="145" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="2" />
            <circle cx="160" cy="160" r="125" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="1.5" strokeDasharray="10 8" />
            <circle cx="160" cy="160" r="105" fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="1" />
            {/* Pentagram */}
            <polygon
              points={Array.from({ length: 5 }, (_, i) => {
                const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                return `${160 + Math.cos(a) * 80},${160 + Math.sin(a) * 80}`;
              }).join(' ')}
              fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="1.5"
            />
            {/* Runes */}
            {['\u16A0', '\u16A2', '\u16A6', '\u16A8', '\u16B1', '\u16B2', '\u16B7', '\u16B9'].map((rune, i) => {
              const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
              return (
                <text key={`r-${i}`} x={160 + Math.cos(angle) * 132} y={160 + Math.sin(angle) * 132 + 5} fill="rgba(192,132,252,0.35)" fontSize="18" fontFamily="serif" textAnchor="middle">{rune}</text>
              );
            })}
          </svg>
          {/* Glow dots at cardinal points */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <div key={`g-${i}`} className="absolute w-2.5 h-2.5 rounded-full animate-pulse" style={{
                top: `${50 + Math.sin(angle) * 35}%`, left: `${50 + Math.cos(angle) * 35}%`,
                backgroundColor: 'rgba(192,132,252,0.4)',
                boxShadow: '0 0 12px rgba(192,132,252,0.4), 0 0 24px rgba(192,132,252,0.15)',
                animationDelay: `${i * 0.3}s`, animationDuration: '2.5s',
              }} />
            );
          })}
        </div>
      );

    // Floor 7 — Treasure Vault
    case 7:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Golden glow from bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-56 blur-3xl" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(234,179,8,0.15) 0%, rgba(161,98,7,0.06) 40%, transparent 70%)' }} />
          {/* Gold pile */}
          <svg className="absolute bottom-0 left-0 w-full h-28 opacity-70" viewBox="0 0 800 112" preserveAspectRatio="none">
            <path d="M0 112 L0 85 Q100 50 200 75 Q300 40 400 65 Q500 35 600 60 Q700 42 800 75 L800 112 Z" fill="rgba(234,179,8,0.12)" />
            <path d="M0 112 L0 95 Q150 68 300 90 Q450 62 600 82 Q700 68 800 88 L800 112 Z" fill="rgba(234,179,8,0.08)" />
            {/* Coins */}
            {Array.from({ length: 20 }, (_, i) => (
              <ellipse key={`c-${i}`} cx={35 + (i * 38) % 730} cy={82 + (i * 13) % 25} rx={4 + (i % 3) * 2} ry={2.5 + (i % 2) * 1.5} fill={`rgba(251,191,36,${0.25 + (i % 4) * 0.05})`} stroke="rgba(234,179,8,0.3)" strokeWidth="0.5" />
            ))}
          </svg>
          {/* Treasure chest */}
          <svg className="absolute bottom-[10%] left-[10%] w-20 h-16 opacity-60" viewBox="0 0 80 64">
            <rect x="4" y="22" width="72" height="38" rx="4" fill="rgba(120,77,20,0.5)" stroke="rgba(161,98,7,0.5)" strokeWidth="2" />
            <path d="M4 22 Q40 2 76 22" fill="rgba(120,77,20,0.45)" stroke="rgba(161,98,7,0.5)" strokeWidth="2" />
            <rect x="34" y="32" width="12" height="10" rx="2" fill="rgba(234,179,8,0.6)" />
            <circle cx="40" cy="37" r="3" fill="rgba(251,191,36,0.7)" />
          </svg>
          {/* Gems */}
          {[
            { x: '18%', y: '30%', color: 'rgba(239,68,68,0.4)', glow: 'rgba(239,68,68,0.2)' },
            { x: '80%', y: '35%', color: 'rgba(34,211,238,0.4)', glow: 'rgba(34,211,238,0.2)' },
            { x: '85%', y: '60%', color: 'rgba(168,85,247,0.35)', glow: 'rgba(168,85,247,0.2)' },
          ].map((gem, i) => (
            <div key={`gem-${i}`} className="absolute" style={{ left: gem.x, top: gem.y }}>
              <div className="w-8 h-8 rounded-full blur-xl animate-pulse" style={{ background: gem.glow, animationDelay: `${i * 0.5}s`, animationDuration: '3s' }} />
              <svg className="absolute inset-0 w-8 h-8" viewBox="0 0 32 32">
                <polygon points="16,2 24,12 20,26 12,26 8,12" fill={gem.color} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              </svg>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-yellow-900/15 to-transparent" />
        </div>
      );

    // Floor 8 — Observatory
    case 8:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Nebula glow */}
          <div className="absolute top-[8%] left-[12%] w-56 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
          <div className="absolute top-[12%] right-[18%] w-48 h-36 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-[25%] left-[40%] w-40 h-32 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
          {/* Stars (box-shadow crisp dots) */}
          <div className="absolute inset-0" style={{ width: '1px', height: '1px', borderRadius: '50%', background: 'transparent',
            boxShadow: Array.from({ length: 50 }, (_, i) => {
              const x = 3 + (i * 47 + 7) % 94;
              const y = 3 + (i * 31 + 13) % 55;
              const size = 0.5 + (i % 4) * 0.3;
              const alpha = 0.2 + (i % 5) * 0.1;
              return `${x}vw ${y}vh 0 ${size}px rgba(255,255,255,${alpha})`;
            }).join(', ')
          }} />
          {/* Planet with ring */}
          <svg className="absolute top-[10%] right-[10%] w-20 h-20 opacity-50 animate-pulse" style={{ animationDuration: '6s' }} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="16" fill="rgba(234,179,8,0.2)" />
            <circle cx="40" cy="40" r="16" fill="none" stroke="rgba(234,179,8,0.15)" strokeWidth="1" />
            <ellipse cx="40" cy="40" rx="32" ry="10" fill="none" stroke="rgba(234,179,8,0.15)" strokeWidth="1.5" transform="rotate(-20 40 40)" />
          </svg>
          {/* Telescope */}
          <svg className="absolute bottom-[6%] right-[6%] w-16 h-24 opacity-40" viewBox="0 0 64 96">
            <line x1="32" y1="48" x2="12" y2="92" stroke="rgba(148,163,184,0.5)" strokeWidth="2.5" />
            <line x1="32" y1="48" x2="52" y2="92" stroke="rgba(148,163,184,0.5)" strokeWidth="2.5" />
            <line x1="32" y1="48" x2="32" y2="94" stroke="rgba(148,163,184,0.5)" strokeWidth="2.5" />
            <rect x="14" y="16" width="36" height="12" rx="6" fill="rgba(148,163,184,0.4)" transform="rotate(-35 32 22)" />
            <circle cx="52" cy="8" r="8" fill="none" stroke="rgba(147,197,253,0.25)" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-950/25 to-transparent" />
        </div>
      );

    // Floor 9 — Dragon's Lair
    case 9:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Lava glow */}
          <div className="absolute bottom-0 left-0 w-full h-48 blur-3xl" style={{ background: 'linear-gradient(to top, rgba(239,68,68,0.15) 0%, rgba(234,88,12,0.08) 40%, transparent 100%)' }} />
          {[15, 35, 55, 75, 90].map((x, i) => (
            <div key={`lg-${i}`} className="absolute bottom-0 rounded-full blur-2xl mq-animate-flicker" style={{
              left: `${x}%`, width: '80px', height: '60px',
              background: 'radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 70%)',
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
          {/* Lava flow */}
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-80" viewBox="0 0 800 96" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lava9" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(239,68,68,0.2)" />
                <stop offset="40%" stopColor="rgba(234,88,12,0.25)" />
                <stop offset="100%" stopColor="rgba(154,52,18,0.3)" />
              </linearGradient>
            </defs>
            <path d="M0 96 L0 45 Q100 25 200 50 Q300 15 400 40 Q500 20 600 45 Q700 30 800 55 L800 96 Z" fill="url(#lava9)" />
          </svg>
          {/* Flames */}
          <svg className="absolute bottom-[8%] left-0 w-full h-20 opacity-70" viewBox="0 0 800 80">
            {[60, 180, 310, 450, 580, 700].map((x, i) => (
              <g key={`f-${i}`} className="mq-animate-flicker" style={{ animationDelay: `${i * 0.25}s` }}>
                <ellipse cx={x} cy="60" rx={14 + (i % 3) * 4} ry={26 + (i % 3) * 8} fill="rgba(239,68,68,0.18)" filter="blur(2px)" />
                <ellipse cx={x} cy="52" rx={9 + (i % 2) * 3} ry={18 + (i % 3) * 5} fill="rgba(251,146,60,0.2)" filter="blur(1px)" />
                <ellipse cx={x} cy="46" rx={5 + (i % 2) * 2} ry={12 + (i % 2) * 3} fill="rgba(254,240,138,0.15)" filter="blur(1px)" />
              </g>
            ))}
          </svg>
          {/* Dragon silhouette — eye glowing */}
          <svg className="absolute top-[8%] right-[5%] w-32 h-24 opacity-25" viewBox="0 0 128 96">
            <path d="M15 75 Q25 45 45 35 Q55 25 75 30 Q95 20 105 25 L115 15 L110 25 Q120 30 125 40 Q130 50 120 60 Q105 70 85 65 Q65 75 45 70 Q30 80 15 75 Z" fill="rgba(239,68,68,0.5)" />
            <path d="M65 35 Q85 8 115 12 Q100 22 90 32 Z" fill="rgba(220,38,38,0.4)" />
            <circle cx="105" cy="30" r="3" fill="rgba(251,191,36,0.8)" className="animate-pulse" style={{ animationDuration: '2s' }} />
            <circle cx="105" cy="30" r="6" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" className="animate-pulse" style={{ animationDuration: '2s' }} />
          </svg>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-950/30 via-orange-950/10 to-transparent" />
        </div>
      );

    // Floor 10 — Wizard's Summit
    case 10:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Golden light from above */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.1) 0%, transparent 70%)' }} />
          {/* Central magic glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(253,224,71,0.03) 40%, transparent 70%)', animationDuration: '4s' }} />
          {/* Spinning magic circle */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] mq-animate-spin opacity-50" viewBox="0 0 340 340">
            <circle cx="170" cy="170" r="160" fill="none" stroke="rgba(253,224,71,0.12)" strokeWidth="2" />
            <circle cx="170" cy="170" r="140" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="1.5" strokeDasharray="14 10" />
            <circle cx="170" cy="170" r="120" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
            {/* Hexagram (Star of David) */}
            <polygon points={Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI) / 3 - Math.PI / 2; return `${170 + Math.cos(a) * 100},${170 + Math.sin(a) * 100}`; }).join(' ')} fill="none" stroke="rgba(253,224,71,0.1)" strokeWidth="1.5" />
            <polygon points={Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI) / 3 - Math.PI / 6; return `${170 + Math.cos(a) * 100},${170 + Math.sin(a) * 100}`; }).join(' ')} fill="none" stroke="rgba(253,224,71,0.1)" strokeWidth="1.5" />
          </svg>
          {/* Lightning bolts */}
          <svg className="absolute top-0 left-[14%] w-10 h-28 animate-ping opacity-40" style={{ animationDuration: '3s' }} viewBox="0 0 40 112">
            <polyline points="20,0 14,30 24,34 10,65 22,68 6,112" fill="none" stroke="rgba(253,224,71,0.4)" strokeWidth="2" strokeLinejoin="round" />
            <polyline points="20,0 14,30 24,34 10,65 22,68 6,112" fill="none" stroke="rgba(253,224,71,0.15)" strokeWidth="6" strokeLinejoin="round" filter="blur(2px)" />
          </svg>
          <svg className="absolute top-[3%] right-[16%] w-8 h-24 animate-ping opacity-35" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }} viewBox="0 0 32 96">
            <polyline points="16,0 10,25 20,28 8,55 18,58 4,96" fill="none" stroke="rgba(253,224,71,0.35)" strokeWidth="2" strokeLinejoin="round" />
            <polyline points="16,0 10,25 20,28 8,55 18,58 4,96" fill="none" stroke="rgba(253,224,71,0.12)" strokeWidth="5" strokeLinejoin="round" filter="blur(2px)" />
          </svg>
          {/* Orbiting energy orbs */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 36;
            const colors = ['rgba(253,224,71,0.45)', 'rgba(168,85,247,0.4)', 'rgba(34,211,238,0.4)', 'rgba(74,222,128,0.35)'];
            const glowColors = ['rgba(253,224,71,0.3)', 'rgba(168,85,247,0.25)', 'rgba(34,211,238,0.25)', 'rgba(74,222,128,0.2)'];
            return (
              <div key={`o-${i}`} className="absolute w-3 h-3 rounded-full animate-pulse" style={{
                top: `${50 + Math.sin(angle) * r}%`, left: `${50 + Math.cos(angle) * r}%`,
                backgroundColor: colors[i % 4],
                boxShadow: `0 0 8px ${glowColors[i % 4]}, 0 0 20px ${glowColors[i % 4]}`,
                animationDelay: `${i * 0.25}s`, animationDuration: '2s',
              }} />
            );
          })}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-violet-950/20 via-indigo-950/8 to-transparent" />
        </div>
      );

    default:
      return null;
  }
}

// Particle effects
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
          &#x2726;
        </div>
      ))}
    </div>
  );
}

// Tower visualization
function TowerProgress({ currentFloor, totalFloors, floors }: { currentFloor: number; totalFloors: number; floors: MathQuestFloor[] }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {Array.from({ length: totalFloors }, (_, i) => {
        const floor = totalFloors - i;
        const isActive = floor === currentFloor;
        const isCompleted = floor < currentFloor;
        const emoji = floors[floor - 1]?.emoji || '';

        return (
          <div
            key={floor}
            className={`
              w-10 h-7 flex items-center justify-center rounded text-xs font-bold transition-all duration-300
              ${isActive ? 'bg-purple-500 text-white scale-125 shadow-lg shadow-purple-500/50 ring-2 ring-yellow-400' : ''}
              ${isCompleted ? 'bg-emerald-500/80 text-white' : ''}
              ${!isActive && !isCompleted ? 'bg-indigo-900/60 text-indigo-400/60' : ''}
            `}
            title={`Floor ${floor}: ${floors[floor - 1]?.challenge.floorName}`}
          >
            {isCompleted ? '\u2713' : isActive ? emoji : floor}
          </div>
        );
      })}
      <div className="w-12 h-3 bg-stone-600 rounded-b text-center text-[8px] text-stone-400">BASE</div>
    </div>
  );
}

// Lives display
function LivesDisplay({ lives, max }: { lives: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`text-2xl transition-all duration-300 ${i < lives ? 'scale-100' : 'scale-75 opacity-30 grayscale'}`}
        >
          {i < lives ? '\u{1F49C}' : '\u{1F5A4}'}
        </span>
      ))}
    </div>
  );
}

// Main Game
type MQGameState = 'intro' | 'playing' | 'success' | 'fail' | 'gameover' | 'victory';

export function MathQuestGame({ gameData, onComplete }: MathQuestGameProps) {
  const [gameState, setGameState] = useState<MQGameState>('intro');
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [lives, setLives] = useState(gameData.startingLives);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [expression, setExpression] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [timer, setTimer] = useState(gameData.timeLimitSeconds);
  const [showParticles, setShowParticles] = useState(false);
  const [floorTransition, setFloorTransition] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentFloor: MathQuestFloor | undefined = gameData.floors[currentFloorIdx];
  const totalFloors = gameData.floors.length;

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
    setLives(gameData.startingLives);
    setScore(0);
    setCombo(0);
    setExpression('');
    setFeedback(null);
    setShowHint(false);
    setHintUsed(false);
    setTimer(gameData.timeLimitSeconds);
  }, [gameData]);

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
        setTimer(gameData.timeLimitSeconds);
        setGameState('playing');
      }
      setFloorTransition(false);
    }, 800);
  }, [currentFloorIdx, totalFloors, gameData]);

  const submitAnswer = useCallback(() => {
    if (!currentFloor) return;
    const challenge = currentFloor.challenge;

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

    const target = challenge.targetValue;
    const isCorrect = Math.abs(value - target) < 0.001;

    if (isCorrect) {
      const timeBonus = Math.round((timer / gameData.timeLimitSeconds) * gameData.timeBonusMax);
      const comboMultiplier = gameData.comboMultipliers[Math.min(combo, gameData.comboMultipliers.length - 1)];
      const hintDeduction = hintUsed ? gameData.hintPenalty : 0;
      const floorPoints = Math.round((gameData.pointsPerFloor + timeBonus - hintDeduction) * comboMultiplier);

      setScore((s) => s + Math.max(floorPoints, 10));
      setCombo((c) => c + 1);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);

      setFeedback({
        message: `Correct! ${value} = ${target} (+${floorPoints} pts${combo > 0 ? ` | ${comboMultiplier}x combo!` : ''})`,
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
  }, [expression, currentFloor, timer, combo, hintUsed, gameData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      submitAnswer();
    }
    if (e.key === 'Enter' && gameState === 'success') {
      nextFloor();
    }
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-4 animate-bounce">{'\u{1F3F0}'}</div>
          <h1 className="font-serif text-5xl text-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">
            Math Quest
          </h1>
          <h2 className="font-serif text-2xl text-purple-300 mb-6">Wizard's Tower</h2>

          <div className="bg-indigo-900/50 backdrop-blur rounded-xl p-6 mb-6 border border-purple-500/30">
            <p className="text-purple-200 mb-4">
              Climb the Wizard's Tower by solving math challenges on each floor!
              Write Python math expressions to unlock doors, solve puzzles, and
              reach the summit.
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">{'\u{1F522}'}</div>
                <div className="text-purple-300">{totalFloors} Floors</div>
              </div>
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">{'\u{1F49C}'}</div>
                <div className="text-purple-300">{gameData.startingLives} Lives</div>
              </div>
              <div className="bg-purple-800/40 rounded-lg p-3">
                <div className="text-2xl mb-1">{'\u26A1'}</div>
                <div className="text-purple-300">Combos!</div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/30 rounded-lg p-4 mb-6 border border-indigo-500/20 text-left">
            <h3 className="text-yellow-300 font-serif text-lg mb-2">Operators You Can Use:</h3>
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-serif text-2xl py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95"
          >
            Begin the Ascent
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-slate-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-4">{'\u{1F480}'}</div>
          <h1 className="font-serif text-4xl text-red-400 mb-2">Tower Collapsed!</h1>
          <p className="text-slate-400 mb-6">
            You fell at Floor {currentFloorIdx + 1}: {currentFloor?.challenge.floorName}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-yellow-400 font-serif">{score}</div>
              <div className="text-sm text-slate-400">Final Score</div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 font-serif">
                {currentFloorIdx}/{totalFloors}
              </div>
              <div className="text-sm text-slate-400">Floors Cleared</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-serif text-xl py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Try Again
            </button>
            <button
              onClick={() => onComplete(score, Math.round(score * 0.5))}
              className="flex-1 bg-slate-700 text-slate-200 font-serif text-xl py-4 rounded-xl hover:bg-slate-600 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Victory Screen
  if (gameState === 'victory') {
    const maxScore = totalFloors * (gameData.pointsPerFloor + gameData.timeBonusMax) * gameData.comboMultipliers[gameData.comboMultipliers.length - 1];
    const percentage = Math.round((score / maxScore) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 60 ? 2 : 1;
    const xpEarned = gameData.baseXP + Math.round((percentage / 100) * gameData.bonusXP);

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900/30 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center relative">
          <StarParticles active={true} />

          <div className="text-8xl mb-4">{'\u{1F451}'}</div>
          <h1 className="font-serif text-5xl text-yellow-300 mb-2 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]">
            Tower Conquered!
          </h1>
          <p className="text-purple-300 mb-6 font-serif text-xl">
            The Wizard's power is yours!
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={`text-4xl ${i < stars ? 'animate-pulse' : 'opacity-20'}`}>
                {'\u2B50'}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-yellow-400 font-serif">{score}</div>
              <div className="text-sm text-purple-300">Score</div>
            </div>
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-emerald-400 font-serif">{lives}/{gameData.startingLives}</div>
              <div className="text-sm text-purple-300">Lives Left</div>
            </div>
            <div className="bg-indigo-900/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400 font-serif">+{xpEarned}</div>
              <div className="text-sm text-purple-300">XP Earned</div>
            </div>
          </div>

          <button
            onClick={() => onComplete(score, xpEarned)}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-indigo-950 font-serif text-xl py-4 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95"
          >
            Claim Rewards &amp; Continue
          </button>
        </div>
      </div>
    );
  }

  // Playing / Success Screen
  if (!currentFloor) return null;

  const timerColor = timer > 30 ? 'text-emerald-400' : timer > 10 ? 'text-yellow-400' : 'text-red-400';
  const timerBarWidth = (timer / gameData.timeLimitSeconds) * 100;

  const floorGradients: Record<number, string> = {
    1: 'from-stone-950 via-stone-900 to-indigo-950',
    2: 'from-emerald-950 via-indigo-950 to-purple-950',
    3: 'from-cyan-950 via-indigo-950 to-purple-950',
    4: 'from-amber-950 via-stone-900 to-indigo-950',
    5: 'from-slate-950 via-indigo-950 to-purple-950',
    6: 'from-violet-950 via-purple-950 to-indigo-950',
    7: 'from-yellow-950 via-amber-950 to-indigo-950',
    8: 'from-blue-950 via-indigo-950 to-slate-950',
    9: 'from-red-950 via-orange-950 to-slate-950',
    10: 'from-violet-950 via-indigo-950 to-yellow-950/30',
  };

  const bgGradient = floorGradients[currentFloor.challenge.id] || 'from-indigo-950 via-purple-950 to-slate-950';

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgGradient} flex flex-col transition-all duration-700 relative ${floorTransition ? 'opacity-0' : 'opacity-100'}`}
      onKeyDown={handleKeyDown}
    >
      <FloorThemeBackground floorId={currentFloor.challenge.id} />
      <StarParticles active={showParticles} />

      {/* Header bar */}
      <div className="bg-indigo-900/60 backdrop-blur border-b border-purple-500/30 px-4 py-2 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LivesDisplay lives={lives} max={gameData.startingLives} />
            <div className="text-yellow-400 font-serif text-lg">
              {'\u26A1'} {score}
            </div>
          </div>

          <div className="text-center">
            <div className="text-purple-300 text-sm font-serif">
              Floor {currentFloorIdx + 1} of {totalFloors}
            </div>
            {combo > 1 && (
              <div className="text-yellow-300 text-xs font-bold animate-pulse">
                {gameData.comboMultipliers[Math.min(combo - 1, gameData.comboMultipliers.length - 1)]}x COMBO
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold text-lg ${timerColor}`}>
              {timer}s
            </span>
          </div>
        </div>

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
            <TowerProgress currentFloor={currentFloorIdx + 1} totalFloors={totalFloors} floors={gameData.floors} />
          </div>

          {/* Challenge area */}
          <div className="flex-1 max-w-2xl">
            <div className="text-purple-400/80 italic text-sm mb-3 text-center">
              {currentFloor.flavorText}
            </div>

            <div className="bg-indigo-900/40 backdrop-blur rounded-2xl border border-purple-500/30 p-6 shadow-2xl shadow-purple-900/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{currentFloor.emoji}</span>
                <div>
                  <h2 className="font-serif text-2xl text-yellow-300">
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

              <div className="bg-indigo-950/60 rounded-xl p-4 mb-4 border border-indigo-500/20">
                <p className="text-purple-100 leading-relaxed">
                  {currentFloor.challenge.description}
                </p>
              </div>

              <div className="mb-4">
                <label className="text-purple-400 text-sm mb-1 block font-serif">
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
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-serif text-lg hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                      Cast
                    </button>
                  )}
                  {gameState === 'success' && (
                    <button
                      onClick={nextFloor}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-serif text-lg hover:from-emerald-500 hover:to-teal-500 transition-all hover:scale-105 active:scale-95 shadow-lg animate-pulse"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>

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
                      Show Hint (-{gameData.hintPenalty} pts)
                    </button>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 text-yellow-300 text-sm">
                      {currentFloor.challenge.hint}
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
