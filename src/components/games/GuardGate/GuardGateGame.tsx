import { useState } from 'react';
import type { GuardGateGame as GuardGateGameType, GuardGateValue } from '../../../types/game';

interface GuardGateGameProps {
  gameData: GuardGateGameType;
  onComplete: (score: number, xpEarned: number) => void;
}

type ValueResult = { value: GuardGateValue; got: 'A' | 'B' | 'error'; correct: boolean };

/** Castle courtyard background with towers, knight, and king */
function CastleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Sky glow — warm sun from upper right */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 400,
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(ellipse at center, rgba(255,220,140,0.35) 0%, rgba(255,180,80,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Ambient warm glow across bottom (ground reflection) */}
      <div
        className="absolute"
        style={{
          width: '100%',
          height: 300,
          bottom: 0,
          left: 0,
          background: 'linear-gradient(0deg, rgba(160,120,60,0.2) 0%, transparent 100%)',
        }}
      />

      {/* Castle scene SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="gg-soft">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="gg-glow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          {/* Stone texture gradient */}
          <linearGradient id="gg-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9a8a6a" />
            <stop offset="100%" stopColor="#7a6a4a" />
          </linearGradient>
          <linearGradient id="gg-stone-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a6a50" />
            <stop offset="100%" stopColor="#5a4a30" />
          </linearGradient>
          <linearGradient id="gg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a90b8" />
            <stop offset="100%" stopColor="#a8c0d8" />
          </linearGradient>
        </defs>

        {/* ── Background castle wall ── */}
        <rect x="0" y="280" width="1200" height="520" fill="url(#gg-stone)" opacity="0.3" />

        {/* Stone block pattern on back wall */}
        {[...Array(8)].map((_, row) => (
          [...Array(13)].map((__, col) => (
            <rect
              key={`block-${row}-${col}`}
              x={col * 94 + (row % 2 === 0 ? 0 : 47)}
              y={290 + row * 48}
              width="90"
              height="44"
              rx="2"
              fill="none"
              stroke="rgba(100,80,50,0.1)"
              strokeWidth="1"
            />
          ))
        ))}

        {/* ── Left tower ── */}
        <g opacity="0.6">
          {/* Tower body */}
          <rect x="20" y="120" width="120" height="680" fill="url(#gg-stone-dark)" />
          {/* Crenellations */}
          {[...Array(5)].map((_, i) => (
            <rect key={`lt-cren-${i}`} x={20 + i * 28} y="105" width="16" height="20" rx="1" fill="#6a5a3a" />
          ))}
          {/* Window */}
          <rect x="60" y="200" width="40" height="55" rx="20" fill="#3a4a60" />
          <line x1="80" y1="200" x2="80" y2="255" stroke="#5a4a30" strokeWidth="2" />
          <line x1="60" y1="228" x2="100" y2="228" stroke="#5a4a30" strokeWidth="2" />
          {/* Window glow */}
          <rect x="60" y="200" width="40" height="55" rx="20" fill="rgba(255,200,100,0.15)" />
          {/* Lower window */}
          <rect x="60" y="380" width="40" height="55" rx="20" fill="#3a4a60" />
          <line x1="80" y1="380" x2="80" y2="435" stroke="#5a4a30" strokeWidth="2" />
          <line x1="60" y1="408" x2="100" y2="408" stroke="#5a4a30" strokeWidth="2" />
        </g>

        {/* ── Right tower ── */}
        <g opacity="0.6">
          <rect x="1060" y="140" width="120" height="660" fill="url(#gg-stone-dark)" />
          {[...Array(5)].map((_, i) => (
            <rect key={`rt-cren-${i}`} x={1060 + i * 28} y="125" width="16" height="20" rx="1" fill="#6a5a3a" />
          ))}
          <rect x="1100" y="220" width="40" height="55" rx="20" fill="#3a4a60" />
          <line x1="1120" y1="220" x2="1120" y2="275" stroke="#5a4a30" strokeWidth="2" />
          <line x1="1100" y1="248" x2="1140" y2="248" stroke="#5a4a30" strokeWidth="2" />
          <rect x="1100" y="220" width="40" height="55" rx="20" fill="rgba(255,200,100,0.15)" />
          {/* Flag on right tower */}
          <line x1="1120" y1="125" x2="1120" y2="70" stroke="#5a4a30" strokeWidth="2.5" />
          <polygon points="1120,72 1160,85 1120,98" fill="#8b2020" opacity="0.7" />
        </g>

        {/* ── Center back tower (taller, behind content) ── */}
        <g opacity="0.35">
          <rect x="520" y="60" width="160" height="740" fill="url(#gg-stone-dark)" />
          {[...Array(6)].map((_, i) => (
            <rect key={`ct-cren-${i}`} x={520 + i * 30} y="44" width="18" height="22" rx="1" fill="#6a5a3a" />
          ))}
          {/* Flag */}
          <line x1="600" y1="44" x2="600" y2="-10" stroke="#5a4a30" strokeWidth="2.5" />
          <polygon points="600,0 650,18 600,36" fill="#1a4a8a" opacity="0.6" />
          {/* Large window */}
          <rect x="565" y="130" width="70" height="90" rx="35" fill="#3a4a60" />
          <line x1="600" y1="130" x2="600" y2="220" stroke="#5a4a30" strokeWidth="2" />
          <line x1="565" y1="175" x2="635" y2="175" stroke="#5a4a30" strokeWidth="2" />
          <rect x="565" y="130" width="70" height="90" rx="35" fill="rgba(255,200,100,0.1)" />
        </g>

        {/* ── Stone floor / courtyard ── */}
        <rect x="0" y="680" width="1200" height="120" fill="#8a7a58" opacity="0.4" />
        <line x1="0" y1="682" x2="1200" y2="682" stroke="rgba(100,80,50,0.2)" strokeWidth="2" />
        {/* Floor tiles */}
        {[...Array(14)].map((_, i) => (
          <line key={`floor-${i}`} x1={i * 90} y1="682" x2={i * 90} y2="800" stroke="rgba(100,80,50,0.08)" strokeWidth="1" />
        ))}

        {/* ── Knight silhouette (left side) ── */}
        <g opacity="0.45" transform="translate(160, 520)">
          {/* Helmet */}
          <rect x="-12" y="0" width="24" height="28" rx="6" fill="#5a5a60" />
          {/* Visor slit */}
          <rect x="-8" y="10" width="16" height="3" rx="1" fill="#2a2a30" />
          {/* Plume on top */}
          <ellipse cx="0" cy="-4" rx="4" ry="8" fill="#8b2020" opacity="0.7" />
          {/* Body / armor */}
          <path d="M-16,28 L-20,90 L20,90 L16,28 Z" fill="#6a6a70" />
          {/* Shoulders */}
          <ellipse cx="-20" cy="34" rx="10" ry="6" fill="#5a5a60" />
          <ellipse cx="20" cy="34" rx="10" ry="6" fill="#5a5a60" />
          {/* Legs */}
          <rect x="-14" y="90" width="10" height="50" rx="2" fill="#5a5a60" />
          <rect x="4" y="90" width="10" height="50" rx="2" fill="#5a5a60" />
          {/* Boots */}
          <rect x="-16" y="136" width="14" height="8" rx="2" fill="#3a3a40" />
          <rect x="2" y="136" width="14" height="8" rx="2" fill="#3a3a40" />
          {/* Shield on left arm */}
          <path d="M-30,40 L-30,75 L-20,85 L-10,75 L-10,40 Z" fill="#3a5a8a" stroke="#4a6a9a" strokeWidth="1" />
          <line x1="-20" y1="42" x2="-20" y2="80" stroke="#5a7aaa" strokeWidth="1" />
          <line x1="-30" y1="58" x2="-10" y2="58" stroke="#5a7aaa" strokeWidth="1" />
          {/* Sword on right */}
          <line x1="28" y1="30" x2="28" y2="120" stroke="#8a8a90" strokeWidth="3" />
          <line x1="20" y1="35" x2="36" y2="35" stroke="#7a7a80" strokeWidth="2.5" />
          {/* Sword pommel */}
          <circle cx="28" cy="28" r="3" fill="#aa9040" />
        </g>

        {/* ── King silhouette (right side, on small throne) ── */}
        <g opacity="0.4" transform="translate(1020, 500)">
          {/* Throne back */}
          <path d="M-30,-20 L-35,80 L35,80 L30,-20 Q0,-40 -30,-20 Z" fill="#5a3a20" />
          {/* Throne arm rests */}
          <rect x="-38" y="40" width="12" height="35" rx="3" fill="#6a4a28" />
          <rect x="26" y="40" width="12" height="35" rx="3" fill="#6a4a28" />
          {/* Throne finials */}
          <circle cx="-30" cy="-22" r="5" fill="#aa8030" />
          <circle cx="30" cy="-22" r="5" fill="#aa8030" />

          {/* King body / robe */}
          <path d="M-18,30 L-22,78 L22,78 L18,30 Z" fill="#6a2020" />
          {/* Robe trim */}
          <line x1="-20" y1="74" x2="20" y2="74" stroke="#aa8030" strokeWidth="2" />
          {/* Head */}
          <circle cx="0" cy="14" r="14" fill="#c8a880" />
          {/* Crown */}
          <polygon points="-12,4 -10,-8 -5,-2 0,-12 5,-2 10,-8 12,4" fill="#daa520" />
          {/* Crown jewels */}
          <circle cx="0" cy="-6" r="2" fill="#e04040" />
          <circle cx="-7" cy="-2" r="1.5" fill="#4080e0" />
          <circle cx="7" cy="-2" r="1.5" fill="#4080e0" />
          {/* Eyes */}
          <circle cx="-4" cy="12" r="1.5" fill="#3a2a1a" />
          <circle cx="4" cy="12" r="1.5" fill="#3a2a1a" />
          {/* Beard */}
          <path d="M-8,20 Q0,32 8,20" fill="#8a7a60" opacity="0.6" />
          {/* Scepter */}
          <line x1="26" y1="25" x2="30" y2="80" stroke="#aa8030" strokeWidth="2.5" />
          <circle cx="25" cy="22" r="5" fill="#daa520" />
          <circle cx="25" cy="22" r="2.5" fill="#e06060" />
          {/* Legs (under robe) */}
          <rect x="-10" y="78" width="8" height="30" rx="2" fill="#5a2020" />
          <rect x="2" y="78" width="8" height="30" rx="2" fill="#5a2020" />
          <rect x="-12" y="104" width="12" height="6" rx="2" fill="#3a1a10" />
          <rect x="0" y="104" width="12" height="6" rx="2" fill="#3a1a10" />
        </g>

        {/* ── Banners hanging from wall ── */}
        <g opacity="0.5">
          {/* Left banner */}
          <rect x="260" y="290" width="40" height="70" rx="2" fill="#7a2020" />
          <rect x="255" y="288" width="50" height="6" rx="2" fill="#8a7a5a" />
          <polygon points="260,360 280,375 300,360" fill="#7a2020" />
          <path d="M275,310 L280,330 L285,310 Z" fill="#daa520" opacity="0.6" />

          {/* Right banner */}
          <rect x="900" y="290" width="40" height="70" rx="2" fill="#1a3a6a" />
          <rect x="895" y="288" width="50" height="6" rx="2" fill="#8a7a5a" />
          <polygon points="900,360 920,375 940,360" fill="#1a3a6a" />
          <path d="M915,310 L920,330 L925,310 Z" fill="#daa520" opacity="0.6" />
        </g>

        {/* ── Torch on left wall ── */}
        <g>
          <rect x="230" y="380" width="6" height="30" rx="1" fill="#6a5a3a" />
          <rect x="224" y="374" width="18" height="8" rx="2" fill="#7a6a4a" />
          <ellipse cx="233" cy="356" rx="6" ry="14" fill="#ff9020" opacity="0.5" filter="url(#gg-soft)" />
          <ellipse cx="233" cy="360" rx="4" ry="9" fill="#ffcc40" opacity="0.6" filter="url(#gg-soft)" />
          <ellipse cx="233" cy="363" rx="2" ry="5" fill="#fff4cc" opacity="0.8" />
        </g>
        {/* Torch glow */}
        <circle cx="233" cy="360" r="40" fill="rgba(255,160,40,0.08)" filter="url(#gg-glow)" />

        {/* ── Torch on right wall ── */}
        <g>
          <rect x="964" y="380" width="6" height="30" rx="1" fill="#6a5a3a" />
          <rect x="958" y="374" width="18" height="8" rx="2" fill="#7a6a4a" />
          <ellipse cx="967" cy="356" rx="6" ry="14" fill="#ff9020" opacity="0.5" filter="url(#gg-soft)" />
          <ellipse cx="967" cy="360" rx="4" ry="9" fill="#ffcc40" opacity="0.6" filter="url(#gg-soft)" />
          <ellipse cx="967" cy="363" rx="2" ry="5" fill="#fff4cc" opacity="0.8" />
        </g>
        <circle cx="967" cy="360" r="40" fill="rgba(255,160,40,0.08)" filter="url(#gg-glow)" />
      </svg>

      {/* Floating dust motes */}
      <div className="gg-dust-motes" />

      {/* Soft vignette (lighter) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(80,60,30,0.25) 100%)',
        }}
      />
    </div>
  );
}

function pythonToJs(condition: string): string {
  return condition
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\b/g, '!')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false');
}

function evaluateCondition(condition: string, numericValue: number): boolean {
  const jsCondition = pythonToJs(condition);
  const fn = new Function('value', `return Boolean(${jsCondition});`);
  return fn(numericValue);
}

/** Castle gate with stone arch, portcullis bars & crenellations */
function GateCard({
  label,
  values,
  highlight,
}: {
  label: 'A' | 'B';
  values: { display: string; correct: boolean }[];
  highlight: 'success' | 'error' | null;
}) {
  const isA = label === 'A';

  // Color palette per gate
  const stoneBase = isA ? '#3b5998' : '#8b3a3a';
  const stoneDark = isA ? '#2c4373' : '#6b2a2a';
  const stoneLight = isA ? '#5a7ec2' : '#b05050';
  const archInner = isA ? '#1a2d52' : '#4a1a1a';
  const barColor = isA ? '#4a6fa5' : '#7a3535';
  const labelText = isA ? 'text-blue-200' : 'text-rose-200';
  const condText = isA ? 'text-blue-300/70' : 'text-rose-300/70';
  const wellBg = isA ? 'rgba(30,50,90,0.85)' : 'rgba(80,25,25,0.85)';
  const wellBorder = isA ? '#4a6fa5' : '#7a3535';
  const emptyText = isA ? 'text-blue-400/50' : 'text-rose-400/50';

  const glowStyle: React.CSSProperties =
    highlight === 'success'
      ? { boxShadow: '0 0 24px rgba(34,197,94,0.4), inset 0 0 12px rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.6)' }
      : highlight === 'error'
        ? { boxShadow: '0 0 24px rgba(239,68,68,0.4), inset 0 0 12px rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.6)' }
        : {};

  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        className="w-full max-w-[260px] relative transition-all duration-300"
        style={glowStyle}
      >
        {/* Stone tower top with crenellations */}
        <div className="relative" style={{ background: `linear-gradient(180deg, ${stoneLight} 0%, ${stoneBase} 100%)` }}>
          {/* Crenellation merlons */}
          <div className="flex justify-between px-0">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  height: 14,
                  background: i % 2 === 0
                    ? `linear-gradient(180deg, ${stoneDark}, ${stoneBase})`
                    : 'transparent',
                  borderLeft: i % 2 === 0 ? `1px solid ${stoneDark}` : 'none',
                  borderRight: i % 2 === 0 ? `1px solid ${stoneDark}` : 'none',
                }}
              />
            ))}
          </div>

          {/* Gate label area */}
          <div className="text-center py-3 px-4">
            <div className={`text-lg font-bold ${labelText} tracking-wider`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {isA ? '⚔️' : '🛡️'} Gate {label}
            </div>
            <div className={`text-xs mt-0.5 font-mono ${condText}`}>
              {isA ? 'condition = True' : 'condition = False'}
            </div>
          </div>

          {/* Stone arch (rounded top) */}
          <div className="px-3 pb-0">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
                background: `linear-gradient(180deg, ${stoneDark} 0%, ${stoneBase} 30%)`,
                padding: '3px 3px 0 3px',
              }}
            >
              {/* Inner arch (dark opening) */}
              <div
                style={{
                  borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
                  background: `radial-gradient(ellipse at center top, ${archInner} 0%, rgba(0,0,0,0.9) 100%)`,
                  minHeight: 36,
                }}
              >
                {/* Portcullis bars */}
                <div className="flex justify-evenly pt-2 px-2" style={{ minHeight: 36 }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: 3,
                        height: '100%',
                        minHeight: 28,
                        background: `linear-gradient(180deg, ${barColor}, ${stoneDark})`,
                        boxShadow: `1px 0 2px rgba(0,0,0,0.4)`,
                      }}
                    />
                  ))}
                </div>
                {/* Horizontal bar across portcullis */}
                <div
                  className="mx-2 mt-1"
                  style={{
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${barColor}, transparent)`,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values well (below the gate) */}
        <div
          className="min-h-[90px] p-3 flex flex-wrap gap-2 justify-center content-start transition-all duration-300"
          style={{
            background: wellBg,
            borderLeft: `3px solid ${wellBorder}`,
            borderRight: `3px solid ${wellBorder}`,
            borderBottom: `3px solid ${wellBorder}`,
            borderRadius: '0 0 12px 12px',
          }}
        >
          {values.length === 0 && (
            <span className={`${emptyText} text-xs italic mt-6`}>awaiting values...</span>
          )}
          {values.map((v, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-11 h-11 rounded-lg font-mono font-bold text-sm transition-all duration-300 ${
                v.correct
                  ? 'bg-emerald-900/60 text-emerald-300 border-2 border-emerald-500/60'
                  : 'bg-red-900/60 text-red-300 border-2 border-red-500/60'
              }`}
              style={{ boxShadow: v.correct ? '0 0 8px rgba(34,197,94,0.2)' : '0 0 8px rgba(239,68,68,0.2)' }}
            >
              {v.display}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GuardGateGame({ gameData, onComplete }: GuardGateGameProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [condition, setCondition] = useState('');
  const [results, setResults] = useState<ValueResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [roundPassed, setRoundPassed] = useState(false);

  const round = gameData.rounds[currentRound];
  const totalRounds = gameData.rounds.length;

  const gateAValues: { display: string; correct: boolean }[] = [];
  const gateBValues: { display: string; correct: boolean }[] = [];
  let gateAHighlight: 'success' | 'error' | null = null;
  let gateBHighlight: 'success' | 'error' | null = null;

  if (results) {
    results.forEach((r) => {
      if (r.got === 'A') {
        gateAValues.push({ display: r.value.display, correct: r.correct });
        if (!r.correct) gateAHighlight = 'error';
      } else if (r.got === 'B') {
        gateBValues.push({ display: r.value.display, correct: r.correct });
        if (!r.correct) gateBHighlight = 'error';
      }
    });
    if (roundPassed) {
      gateAHighlight = 'success';
      gateBHighlight = 'success';
    }
  }

  function handleCheck() {
    if (!condition.trim()) {
      setError('Write a condition first!');
      return;
    }

    setError(null);
    setShowAnswer(false);

    try {
      const evalResults: ValueResult[] = round.values.map((v) => {
        try {
          const result = evaluateCondition(condition.trim(), v.numericValue);
          const got: 'A' | 'B' = result ? 'A' : 'B';
          return { value: v, got, correct: got === v.correctGate };
        } catch {
          return { value: v, got: 'error' as const, correct: false };
        }
      });

      setResults(evalResults);

      const allCorrect = evalResults.every((r) => r.correct);

      if (allCorrect) {
        const roundPoints = round.difficulty === 'hard' ? 200 : round.difficulty === 'medium' ? 150 : 100;
        setScore((prev) => prev + roundPoints);
        setRoundPassed(true);
      } else {
        const newLives = lives - 1;
        setLives(newLives);

        if (newLives === 0) {
          setTimeout(() => {
            onComplete(score, Math.floor(score / 2));
          }, 2000);
        }
      }
    } catch (e: any) {
      setError(`Invalid condition: ${e.message}`);
      setResults(null);
    }
  }

  function handleNextRound() {
    const isLast = currentRound >= totalRounds - 1;
    if (isLast) {
      const xpEarned = gameData.baseXP + (lives === 3 ? gameData.bonusXP : 0);
      onComplete(score, xpEarned);
      return;
    }

    setCurrentRound((prev) => prev + 1);
    setCondition('');
    setResults(null);
    setError(null);
    setShowHint(false);
    setShowAnswer(false);
    setRoundPassed(false);
  }

  const difficultyBadge: Record<string, string> = {
    easy: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border border-amber-200',
    hard: 'bg-red-100 text-red-700 border border-red-200',
  };

  // ─── Intro Screen ───
  if (!gameStarted) {
    return (
      <div className="min-h-screen gg-bg relative overflow-hidden">
        {/* Atmospheric background */}
        <CastleBackground />

        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <div className="max-w-lg w-full rounded-2xl p-8 text-center animate-gg-bounce-in"
            style={{
              background: 'linear-gradient(180deg, rgba(30,25,20,0.92) 0%, rgba(45,35,25,0.95) 100%)',
              border: '2px solid rgba(180,140,60,0.4)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(180,140,60,0.2)',
            }}
          >
            <div className="text-7xl mb-4">🏰</div>
            <h1 className="text-3xl font-bold text-amber-100 mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {gameData.title}
            </h1>
            <p className="text-amber-200/60 mb-6">{gameData.description}</p>

            <div className="rounded-xl p-5 mb-6 text-left" style={{ background: 'rgba(120,90,30,0.15)', border: '1px solid rgba(180,140,60,0.3)', borderLeft: '4px solid rgba(245,158,11,0.6)' }}>
              <h3 className="font-bold text-amber-400 mb-3 text-sm uppercase tracking-wider">How to Play</h3>
              <ul className="text-sm text-amber-100/80 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">1.</span>
                  Each round shows values and where they should go
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">2.</span>
                  Write a Python condition using <code className="bg-amber-900/40 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs border border-amber-600/30">value</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">3.</span>
                  <span>If <strong className="text-blue-300">True</strong> → <strong className="text-blue-300">Gate A</strong> &nbsp;|&nbsp; If <strong className="text-rose-300">False</strong> → <strong className="text-rose-300">Gate B</strong></span>
                </li>
              </ul>
              <div className="mt-4 gg-code-block p-3 font-mono text-sm">
                <div className="text-gray-500"># Example:</div>
                <div><span className="text-purple-400">if</span> <span className="text-yellow-300">value &gt;= 10</span><span className="text-gray-400">:</span></div>
                <div className="pl-4 text-gray-400">gate(<span className="text-green-400">"A"</span>)</div>
                <div><span className="text-purple-400">else</span><span className="text-gray-400">:</span></div>
                <div className="pl-4 text-gray-400">gate(<span className="text-green-400">"B"</span>)</div>
              </div>
            </div>

            <button
              onClick={() => setGameStarted(true)}
              className="w-full text-white font-bold py-4 rounded-xl transition-all text-lg"
              style={{
                background: 'linear-gradient(135deg, #b45309, #d97706, #b45309)',
                boxShadow: '0 4px 20px rgba(180,100,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              Enter the Castle
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!round) return null;

  // ─── Game Screen ───
  return (
    <div className="min-h-screen gg-bg relative overflow-hidden">
      {/* Atmospheric background */}
      <CastleBackground />

      {/* Header */}
      <header className="relative z-10" style={{
        background: 'linear-gradient(180deg, rgba(25,20,15,0.95) 0%, rgba(35,28,18,0.9) 100%)',
        borderBottom: '2px solid rgba(180,140,60,0.3)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-amber-400/60">
                Round {currentRound + 1}/{totalRounds}
              </span>
              <span className="font-bold text-amber-100">{round.title}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyBadge[round.difficulty]}`}>
                {round.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* Lives */}
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg transition-all duration-300 ${i < lives ? '' : 'opacity-20 scale-75 grayscale'}`}
                  >
                    🛡️
                  </span>
                ))}
              </div>
              {/* Score */}
              <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(120,90,30,0.3)', border: '1px solid rgba(180,140,60,0.4)' }}>
                <span className="text-lg font-bold text-amber-400 font-mono">{score}</span>
                <span className="text-xs text-amber-500/60 ml-1">pts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {/* Progress */}
        <div className="mb-6">
          <div className="w-full rounded-full h-2.5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(180,140,60,0.2)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentRound + (roundPassed ? 1 : 0)) / totalRounds) * 100}%`,
                background: 'linear-gradient(90deg, #b45309, #d97706)',
              }}
            />
          </div>
        </div>

        {/* Task description */}
        <div className="rounded-xl p-5 mb-5 animate-gg-fade-in" style={{
          background: 'rgba(120,90,30,0.15)',
          border: '1px solid rgba(180,140,60,0.3)',
          borderLeft: '4px solid rgba(245,158,11,0.6)',
        }}>
          <h2 className="font-bold text-amber-100 text-lg mb-1">{round.description}</h2>
          <p className="text-sm text-amber-200/60">
            Write a condition — <strong className="text-blue-300">True → Gate A</strong> &nbsp;·&nbsp; <strong className="text-rose-300">False → Gate B</strong>
          </p>
        </div>

        {/* Travelers */}
        <div className="rounded-xl p-5 mb-5" style={{
          background: 'rgba(30,25,20,0.8)',
          border: '1.5px solid rgba(180,140,60,0.25)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-3">Values to Sort</h3>
          <div className="flex flex-wrap gap-2">
            {round.values.map((v, i) => {
              const result = results?.[i];
              let style: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', color: '#e5d5b0', border: '2px solid rgba(180,140,60,0.2)' };
              if (result) {
                style = result.correct
                  ? { background: 'rgba(34,197,94,0.1)', color: '#86efac', border: '2px solid rgba(34,197,94,0.4)' }
                  : { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '2px solid rgba(239,68,68,0.4)' };
              }
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm font-bold transition-all"
                  style={style}
                >
                  <span className="text-lg">{v.display}</span>
                  <span className="text-xs font-normal opacity-50">→ {v.correctGate}</span>
                  {result && (
                    <span className="text-xs">
                      {result.correct ? '✅' : `❌ ${result.got}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Gates */}
        <div className="flex gap-6 mb-5 px-2">
          <GateCard label="A" values={gateAValues} highlight={gateAHighlight} />
          <GateCard label="B" values={gateBValues} highlight={gateBHighlight} />
        </div>

        {/* Code Input */}
        <div className="rounded-xl p-5 mb-5" style={{
          background: 'rgba(30,25,20,0.8)',
          border: '1.5px solid rgba(180,140,60,0.25)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-3">Your Condition</h3>

          {/* Code preview */}
          <div className="gg-code-block p-4 font-mono text-sm mb-4">
            <div className="text-gray-500"># Runs for each value</div>
            <div>
              <span className="text-purple-400">if</span>{' '}
              <span className="text-yellow-300">{condition || '_______________'}</span>
              <span className="text-gray-400">:</span>
            </div>
            <div className="text-gray-400 pl-4">
              gate(<span className="text-green-400">"A"</span>)
            </div>
            <div>
              <span className="text-purple-400">else</span>
              <span className="text-gray-400">:</span>
            </div>
            <div className="text-gray-400 pl-4">
              gate(<span className="text-green-400">"B"</span>)
            </div>
          </div>

          {/* Input row */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 font-mono font-bold text-sm">if</span>
              <input
                type="text"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                  setResults(null);
                  setError(null);
                  setShowAnswer(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !roundPassed) handleCheck();
                }}
                placeholder="value >= 10"
                disabled={roundPassed || lives === 0}
                className="w-full pl-10 pr-4 py-3 gg-input-dark rounded-xl font-mono text-lg"
              />
            </div>
            {!roundPassed ? (
              <button
                onClick={handleCheck}
                disabled={lives === 0 || !condition.trim()}
                className="px-6 py-3 text-white font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #b45309, #d97706)',
                  boxShadow: '0 4px 16px rgba(180,100,0,0.3)',
                }}
              >
                Check
              </button>
            ) : (
              <button
                onClick={handleNextRound}
                className="px-6 py-3 text-white font-bold rounded-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                }}
              >
                {currentRound >= totalRounds - 1 ? 'Finish' : 'Next →'}
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 text-sm px-4 py-2.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
              {error}
            </div>
          )}

          {/* Success */}
          {roundPassed && (
            <div className="mt-3 text-sm px-4 py-2.5 rounded-lg font-semibold" style={{ background: 'rgba(34,197,94,0.1)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)' }}>
              All values sorted correctly! +{round.difficulty === 'hard' ? 200 : round.difficulty === 'medium' ? 150 : 100} pts
            </div>
          )}

          {/* Wrong answer */}
          {results && !roundPassed && lives > 0 && (
            <div className="mt-3 text-sm px-4 py-2.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
              Some values went to the wrong gate. Try again!
            </div>
          )}

          {/* Hint & Answer */}
          {!roundPassed && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-amber-400 hover:text-amber-300 font-medium"
              >
                {showHint ? 'Hide Hint' : '💡 Hint'}
              </button>
              {results && !roundPassed && round.exampleAnswer && (
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="text-sm text-orange-400 hover:text-orange-300 font-medium"
                >
                  {showAnswer ? 'Hide Answer' : '🔓 Show Answer'}
                </button>
              )}
            </div>
          )}

          {showHint && (
            <div className="mt-2 text-sm px-4 py-2.5 rounded-lg" style={{ background: 'rgba(180,140,60,0.1)', color: '#fcd34d', border: '1px solid rgba(180,140,60,0.3)' }}>
              💡 {round.hint}
            </div>
          )}

          {showAnswer && round.exampleAnswer && (
            <div className="mt-2 text-sm px-4 py-2.5 rounded-lg font-mono" style={{ background: 'rgba(234,88,12,0.1)', color: '#fdba74', border: '1px solid rgba(234,88,12,0.3)' }}>
              Answer: <strong>{round.exampleAnswer}</strong>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
