import { useState, useEffect, useRef, useCallback } from 'react';
import type { BooleanBouncerGame as BooleanBouncerGameData, BooleanBouncerGuest } from '@types';

type GamePhase = 'intro' | 'playing' | 'checking' | 'roundResult' | 'victory' | 'gameover';

interface GuestResult {
  guest: BooleanBouncerGuest;
  playerResult: boolean;
  expectedResult: boolean;
  correct: boolean;
}

interface Props {
  gameData: BooleanBouncerGameData;
  onComplete: (score: number, xpEarned: number) => void;
}

// ─── Helper: Python → JS condition converter ────────────────────────────────

function evaluateCondition(condition: string, guest: BooleanBouncerGuest): boolean {
  let js = condition
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\s+/g, '!')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false');

  js = js.replace(/'/g, '"');

  const fn = new Function(
    'name', 'age', 'vip', 'dress',
    `"use strict"; return Boolean(${js});`
  );
  return fn(guest.name, guest.age, guest.vip, guest.dress ?? '');
}

// ─── Visual Subcomponents ────────────────────────────────────────────────────

function NeonSign({ text, className = '' }: { text: string; className?: string }) {
  return (
    <h1
      className={`text-4xl md:text-5xl font-extrabold tracking-widest neon-text animate-bb-neon-flicker ${className}`}
      style={{ color: '#ff00ff' }}
    >
      {text}
    </h1>
  );
}

function LivesDisplay({ lives, max }: { lives: number; max: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-lg transition-all duration-300 ${
            i < lives ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
          }`}
        >
          {i < lives ? '💜' : '🖤'}
        </span>
      ))}
    </div>
  );
}

function RoundProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i < current
              ? 'bg-green-400 shadow-[0_0_6px_#00ff88]'
              : i === current
              ? 'bg-fuchsia-400 shadow-[0_0_6px_#ff00ff] scale-125'
              : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { label: 'EASY', bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-500/50' },
    medium: { label: 'MEDIUM', bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    hard: { label: 'HARD', bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-500/50' },
  };
  const c = config[difficulty];
  return (
    <span className={`px-2 py-0.5 text-xs font-bold rounded border ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}

function ConceptTags({ concepts }: { concepts: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {concepts.map((c) => (
        <span
          key={c}
          className="px-2 py-0.5 text-xs rounded-full bg-fuchsia-900/30 text-fuchsia-300 border border-fuchsia-500/30"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function TimerBar({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) {
  const pct = (timeLeft / maxTime) * 100;
  const color =
    pct > 50 ? 'bg-green-500 shadow-[0_0_8px_#00ff88]'
    : pct > 20 ? 'bg-yellow-500 shadow-[0_0_8px_#ffd700]'
    : 'bg-red-500 shadow-[0_0_8px_#ff3366]';

  return (
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-linear ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function GuestCard({
  guest,
  result,
  animState,
  index,
}: {
  guest: BooleanBouncerGuest;
  result?: GuestResult;
  animState: 'idle' | 'checking' | 'admitted' | 'rejected';
  index: number;
}) {
  const borderColor =
    animState === 'admitted'
      ? result?.correct
        ? 'border-green-400 shadow-[0_0_12px_rgba(0,255,136,0.4)]'
        : 'border-red-400 shadow-[0_0_12px_rgba(255,51,102,0.4)]'
      : animState === 'rejected'
      ? result?.correct
        ? 'border-green-400 shadow-[0_0_12px_rgba(0,255,136,0.4)]'
        : 'border-red-400 shadow-[0_0_12px_rgba(255,51,102,0.4)]'
      : animState === 'checking'
      ? 'border-yellow-400 shadow-[0_0_12px_rgba(255,215,0,0.4)]'
      : 'border-fuchsia-500/40';

  const animClass =
    animState === 'admitted'
      ? 'animate-bb-slide-out-left'
      : animState === 'rejected'
      ? 'animate-bb-slide-out-right'
      : animState === 'checking'
      ? 'animate-bb-glow-pulse'
      : '';

  return (
    <div
      className={`guest-card relative bg-gray-900/80 border-2 rounded-xl p-3 min-w-[120px] transition-all duration-300 ${borderColor} ${animClass}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {(animState === 'admitted' || animState === 'rejected') && result && (
        <div className="absolute -top-2 -right-2 text-lg">
          {result.correct ? '✅' : '❌'}
        </div>
      )}

      <div className="text-center">
        <div className="text-2xl mb-1">
          {guest.vip ? '⭐' : '👤'}
        </div>
        <div className="font-bold text-sm text-white">{guest.name}</div>
        <div className="text-xs text-gray-400 mt-1 space-y-0.5">
          <div>age: <span className="text-fuchsia-300">{guest.age}</span></div>
          <div>vip: <span className={guest.vip ? 'text-green-400' : 'text-red-400'}>{guest.vip ? 'True' : 'False'}</span></div>
          {guest.dress && (
            <div>dress: <span className="text-yellow-300">"{guest.dress}"</span></div>
          )}
        </div>
      </div>

      {(animState === 'admitted' || animState === 'rejected') && (
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            animState === 'admitted'
              ? 'bg-green-500/80 text-white'
              : 'bg-red-500/80 text-white'
          }`}
        >
          {animState === 'admitted' ? 'ADMIT' : 'REJECT'}
        </div>
      )}
    </div>
  );
}

function ScreenFlash({ type }: { type: 'correct' | 'wrong' | null }) {
  if (!type) return null;
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 ${
        type === 'correct' ? 'animate-bb-flash-green' : 'animate-bb-flash-red'
      }`}
    />
  );
}

function VelvetRope() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="w-3 h-12 bg-yellow-600 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
      <div className="flex-1 h-2 velvet-rope rounded-full animate-bb-rope-sway origin-left" />
      <div className="w-3 h-12 bg-yellow-600 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
    </div>
  );
}

// ─── Main Game Component ─────────────────────────────────────────────────────

export function BooleanBouncerGame({ gameData, onComplete }: Props) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(gameData.startingLives);
  const [combo, setCombo] = useState(0);
  const [input, setInput] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameData.timeLimitSeconds);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [flashType, setFlashType] = useState<'correct' | 'wrong' | null>(null);
  const [showIntroStamp, setShowIntroStamp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [guestResults, setGuestResults] = useState<GuestResult[]>([]);
  const [checkingIndex, setCheckingIndex] = useState(-1);
  const [guestAnimStates, setGuestAnimStates] = useState<('idle' | 'checking' | 'admitted' | 'rejected')[]>([]);
  const [allCorrect, setAllCorrect] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentRound = gameData.rounds[roundIndex];
  const maxScore = gameData.rounds.length * (gameData.pointsPerRound + gameData.timeBonusMax);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      handleTimerExpired();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, roundIndex]);

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => setShowIntroStamp(true), 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'checking') return;
    if (checkingIndex < 0) return;
    if (checkingIndex >= guestResults.length) {
      const timer = setTimeout(() => {
        const correct = guestResults.every((r) => r.correct);
        setAllCorrect(correct);
        if (correct) {
          handleRoundPassed();
        } else {
          handleRoundFailed();
        }
      }, 600);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      const result = guestResults[checkingIndex];
      setGuestAnimStates((prev) => {
        const next = [...prev];
        next[checkingIndex] = result.playerResult ? 'admitted' : 'rejected';
        return next;
      });
      setCheckingIndex((i) => i + 1);
    }, 700);
    return () => clearTimeout(timer);
  }, [phase, checkingIndex, guestResults]);

  const triggerFlash = useCallback((type: 'correct' | 'wrong') => {
    setFlashType(type);
    setTimeout(() => setFlashType(null), 800);
  }, []);

  function calculateXP(finalScore: number, isGameOver: boolean) {
    const percentage = Math.min(100, (finalScore / maxScore) * 100);
    const bonus = Math.round((percentage / 100) * gameData.bonusXP);
    const total = gameData.baseXP + bonus;
    return isGameOver ? Math.round(total * 0.5) : total;
  }

  function startGame() {
    setPhase('playing');
    setRoundIndex(0);
    setScore(0);
    setLives(gameData.startingLives);
    setCombo(0);
    setInput('');
    setHintUsed(false);
    setShowHint(false);
    setTimeLeft(gameData.timeLimitSeconds);
    setRoundStartTime(Date.now());
    setErrorMessage('');
  }

  function handleSubmit() {
    if (!input.trim()) return;
    setErrorMessage('');

    const results: GuestResult[] = [];
    try {
      for (let i = 0; i < currentRound.guests.length; i++) {
        const guest = currentRound.guests[i];
        const playerResult = evaluateCondition(input.trim(), guest);
        results.push({
          guest,
          playerResult,
          expectedResult: currentRound.expectedResults[i],
          correct: playerResult === currentRound.expectedResults[i],
        });
      }
    } catch {
      setErrorMessage('Invalid condition! Check your syntax and try again.');
      return;
    }

    setGuestResults(results);
    setCheckingIndex(0);
    setGuestAnimStates(currentRound.guests.map(() => 'checking'));
    setPhase('checking');
  }

  function handleRoundPassed() {
    const newCombo = combo + 1;
    const multiplierIdx = Math.min(newCombo - 1, gameData.comboMultipliers.length - 1);
    const multiplier = gameData.comboMultipliers[multiplierIdx];
    const elapsed = (Date.now() - roundStartTime) / 1000;
    const timeBonus = Math.max(0, Math.round(gameData.timeBonusMax * (1 - elapsed / gameData.timeLimitSeconds)));
    const hintDeduction = hintUsed ? gameData.hintPenalty : 0;
    const points = Math.round((gameData.pointsPerRound + timeBonus - hintDeduction) * multiplier);

    const newScore = score + points;
    setScore(newScore);
    setCombo(newCombo);
    triggerFlash('correct');

    if (roundIndex >= gameData.rounds.length - 1) {
      setTimeout(() => {
        setPhase('victory');
        onComplete(newScore, calculateXP(newScore, false));
      }, 1500);
    } else {
      setTimeout(() => setPhase('roundResult'), 1500);
    }
  }

  function handleRoundFailed() {
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    triggerFlash('wrong');

    if (newLives <= 0) {
      setTimeout(() => {
        setPhase('gameover');
        onComplete(score, calculateXP(score, true));
      }, 1500);
    } else {
      setTimeout(() => setPhase('roundResult'), 1500);
    }
  }

  function handleTimerExpired() {
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    triggerFlash('wrong');

    if (newLives <= 0) {
      setPhase('gameover');
      onComplete(score, calculateXP(score, true));
    } else {
      setTimeLeft(gameData.timeLimitSeconds);
      setRoundStartTime(Date.now());
    }
  }

  function advanceToNextRound() {
    const nextIdx = roundIndex + 1;
    if (nextIdx >= gameData.rounds.length) {
      setPhase('victory');
      onComplete(score, calculateXP(score, false));
    } else {
      setRoundIndex(nextIdx);
      setInput('');
      setHintUsed(false);
      setShowHint(false);
      setTimeLeft(gameData.timeLimitSeconds);
      setRoundStartTime(Date.now());
      setErrorMessage('');
      setGuestResults([]);
      setCheckingIndex(-1);
      setGuestAnimStates([]);
      setPhase('playing');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-bb-disco relative" style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0533 40%, #0f0a1a 100%)' }}>
      <ScreenFlash type={flashType} />

      {/* INTRO */}
      {phase === 'intro' && (
        <div className="max-w-lg w-full text-center animate-bb-fade-in">
          <div className="text-6xl mb-4 animate-bb-float">🕶️</div>
          <NeonSign text="THE BOOLEAN BOUNCE" className="mb-2" />
          <p className="text-fuchsia-300/70 text-sm tracking-[0.3em] uppercase mb-6">
            Nightclub Security Training
          </p>
          <VelvetRope />
          <div className="bg-gray-900/60 border border-fuchsia-500/30 rounded-xl p-5 mb-6 text-left">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Welcome, rookie bouncer. Your job is simple: write Python <span className="text-fuchsia-300 font-mono">if</span> conditions
              to decide who gets past the velvet rope. Each round has a rule — you write the boolean expression.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-xl font-bold text-fuchsia-400">{gameData.rounds.length}</div>
                <div className="text-xs text-gray-500 uppercase">Rounds</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-xl font-bold text-red-400">{gameData.startingLives}</div>
                <div className="text-xs text-gray-500 uppercase">Lives</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-xl font-bold text-yellow-400">{gameData.timeLimitSeconds}s</div>
                <div className="text-xs text-gray-500 uppercase">Per Round</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <DifficultyBadge difficulty="easy" />
              <span className="text-gray-500 text-xs">×3</span>
              <DifficultyBadge difficulty="medium" />
              <span className="text-gray-500 text-xs">×3</span>
              <DifficultyBadge difficulty="hard" />
              <span className="text-gray-500 text-xs">×2</span>
            </div>
          </div>
          {showIntroStamp && (
            <div className="absolute top-8 right-8 animate-bb-stamp pointer-events-none">
              <div className="border-4 border-fuchsia-500 text-fuchsia-500 font-extrabold text-xl px-4 py-2 rounded-lg rotate-[-12deg] opacity-60">
                VIP ACCESS
              </div>
            </div>
          )}
          <button
            onClick={startGame}
            className="relative px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-lg rounded-xl transition-all duration-300 animate-bb-glow-pulse tracking-wider"
          >
            OPEN THE DOORS
            <div className="absolute inset-0 rounded-xl animate-bb-shimmer pointer-events-none" />
          </button>
        </div>
      )}

      {/* PLAYING */}
      {(phase === 'playing' || phase === 'checking') && currentRound && (
        <div className="max-w-2xl w-full animate-bb-fade-in">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <LivesDisplay lives={lives} max={gameData.startingLives} />
            {combo > 1 && (
              <span className="text-fuchsia-400 font-bold text-sm animate-bb-count-pop neon-text">
                {gameData.comboMultipliers[Math.min(combo - 1, gameData.comboMultipliers.length - 1)]}x COMBO
              </span>
            )}
            <span className="text-white font-bold font-mono text-lg">
              SCORE: <span className="text-fuchsia-300">{score}</span>
            </span>
            <RoundProgress current={roundIndex} total={gameData.rounds.length} />
            <span className={`font-mono font-bold text-sm ${timeLeft <= 10 ? 'text-red-400 animate-bb-pulse' : timeLeft <= 30 ? 'text-yellow-400' : 'text-green-400'}`}>
              {timeLeft}s
            </span>
          </div>

          <TimerBar timeLeft={timeLeft} maxTime={gameData.timeLimitSeconds} />

          <div className="mt-4 mb-3 flex items-center gap-3">
            <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-wider">
              Round {roundIndex + 1}/{gameData.rounds.length}
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-white font-bold">{currentRound.title}</span>
            <DifficultyBadge difficulty={currentRound.difficulty} />
          </div>

          <div className="bg-gray-900/70 border border-fuchsia-500/40 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 mt-1.5 animate-bb-pulse" />
              <div>
                <div className="text-xs text-fuchsia-400 uppercase tracking-wider mb-1">Tonight's Rule</div>
                <p className="text-white text-lg font-medium">{currentRound.rule}</p>
              </div>
            </div>
          </div>

          {/* Available variables reference */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 mb-4">
            <div className="text-xs text-fuchsia-400 uppercase tracking-wider mb-2">Available Variables</div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-fuchsia-300">name</span>
                <span className="text-gray-600">:</span>
                <span className="text-yellow-400">str</span>
                <span className="text-gray-600 text-[10px]">
                  ({[...new Set(currentRound.guests.map(g => `"${g.name}"`))].join(', ')})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-fuchsia-300">age</span>
                <span className="text-gray-600">:</span>
                <span className="text-blue-400">int</span>
                <span className="text-gray-600 text-[10px]">
                  ({[...new Set(currentRound.guests.map(g => g.age))].sort((a, b) => a - b).join(', ')})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-fuchsia-300">vip</span>
                <span className="text-gray-600">:</span>
                <span className="text-green-400">bool</span>
                <span className="text-gray-600 text-[10px]">(True / False)</span>
              </div>
              {currentRound.guests.some(g => g.dress) && (
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-fuchsia-300">dress</span>
                  <span className="text-gray-600">:</span>
                  <span className="text-yellow-400">str</span>
                  <span className="text-gray-600 text-[10px]">
                    ({[...new Set(currentRound.guests.map(g => g.dress).filter(Boolean))].map(d => `"${d}"`).join(', ')})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Guest List</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {currentRound.guests.map((guest, i) => (
                <GuestCard
                  key={`${roundIndex}-${i}`}
                  guest={guest}
                  result={guestResults[i]}
                  animState={phase === 'checking' ? (guestAnimStates[i] || 'idle') : 'idle'}
                  index={i}
                />
              ))}
            </div>
          </div>

          <VelvetRope />

          <div className="mb-3">
            <ConceptTags concepts={currentRound.concepts} />
          </div>

          <div className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your Condition</div>
            <div className="flex items-center gap-2">
              <span className="text-fuchsia-400 font-mono font-bold text-sm shrink-0">if</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={phase === 'checking'}
                placeholder={
                  currentRound.guests.some(g => g.dress)
                    ? 'age >= 21 and dress == "formal"'
                    : 'age >= 21'
                }
                className="bb-input flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm placeholder:text-gray-600"
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || phase === 'checking'}
                className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold rounded-lg transition-all duration-200 text-sm tracking-wider"
              >
                CHECK
              </button>
            </div>
            {errorMessage && (
              <div className="mt-2 text-red-400 text-xs font-mono">
                ❌ {errorMessage}
              </div>
            )}
            <div className="mt-3">
              {!showHint ? (
                <button
                  onClick={() => { setShowHint(true); setHintUsed(true); }}
                  className="text-yellow-500/60 hover:text-yellow-400 text-xs transition-colors"
                  disabled={phase === 'checking'}
                >
                  💡 Need a hint? (-{gameData.hintPenalty} pts)
                </button>
              ) : (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 text-yellow-300 text-xs animate-bb-fade-in">
                  💡 {currentRound.hint}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ROUND RESULT */}
      {phase === 'roundResult' && (
        <div className="max-w-lg w-full text-center animate-bb-bounce-in">
          <div className="bg-gray-900/70 border border-fuchsia-500/30 rounded-xl p-6">
            {allCorrect ? (
              <>
                <div className="text-4xl mb-3">🎉</div>
                <h2 className="text-2xl font-bold text-green-400 neon-text-green mb-2">PERFECT SORT!</h2>
                <p className="text-gray-300 text-sm mb-4">All guests sorted correctly!</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">😬</div>
                <h2 className="text-2xl font-bold text-red-400 neon-text-red mb-2">WRONG CALL!</h2>
                <p className="text-gray-300 text-sm mb-4">Some guests were sorted incorrectly.</p>
                <div className="space-y-2 mb-4 text-left">
                  {guestResults.map((r, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs font-mono p-2 rounded ${
                        r.correct ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
                      }`}
                    >
                      <span>{r.correct ? '✅' : '❌'}</span>
                      <span>{r.guest.name}</span>
                      <span className="text-gray-500">→</span>
                      <span>You: {r.playerResult ? 'ADMIT' : 'REJECT'}</span>
                      {!r.correct && (
                        <>
                          <span className="text-gray-500">|</span>
                          <span>Should: {r.expectedResult ? 'ADMIT' : 'REJECT'}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {currentRound.exampleAnswer && (
                  <div className="bg-fuchsia-900/30 border border-fuchsia-500/40 rounded-lg p-3 mb-4 text-left">
                    <div className="text-xs text-fuchsia-400 uppercase tracking-wider mb-1">Correct Answer</div>
                    <code className="text-fuchsia-200 text-sm font-mono">{currentRound.exampleAnswer}</code>
                  </div>
                )}
              </>
            )}
            {roundIndex < gameData.rounds.length - 1 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next Round</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white font-bold">{gameData.rounds[roundIndex + 1].title}</span>
                  <DifficultyBadge difficulty={gameData.rounds[roundIndex + 1].difficulty} />
                </div>
              </div>
            )}
            <button
              onClick={advanceToNextRound}
              className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-all duration-200 tracking-wider"
            >
              {allCorrect ? 'NEXT ROUND' : 'TRY NEXT ROUND'}
            </button>
          </div>
        </div>
      )}

      {/* VICTORY */}
      {phase === 'victory' && (
        <div className="max-w-lg w-full text-center animate-bb-bounce-in">
          <div className="text-6xl mb-4">🏆</div>
          <NeonSign text="CLUB SECURED!" className="mb-2" />
          <p className="text-fuchsia-300/70 text-sm mb-6">All rounds complete — you're the head bouncer now!</p>
          <div className="bg-gray-900/70 border border-fuchsia-500/30 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-fuchsia-400">{score}</div>
                <div className="text-xs text-gray-500 uppercase">Total Score</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">+{calculateXP(score, false)}</div>
                <div className="text-xs text-gray-500 uppercase">XP Earned</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Base XP: {gameData.baseXP} + Bonus: {calculateXP(score, false) - gameData.baseXP}
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'gameover' && (
        <div className="max-w-lg w-full text-center animate-bb-bounce-in">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-3xl font-bold text-red-400 neon-text-red mb-2">FIRED!</h2>
          <p className="text-gray-400 text-sm mb-6">Too many wrong calls — you've been let go.</p>
          <div className="bg-gray-900/70 border border-red-500/30 rounded-xl p-6 mb-6">
            <div className="mb-2 text-gray-400 text-xs">
              Made it to Round {roundIndex + 1} of {gameData.rounds.length}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-fuchsia-400">{score}</div>
                <div className="text-xs text-gray-500 uppercase">Score</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">+{calculateXP(score, true)}</div>
                <div className="text-xs text-gray-500 uppercase">XP (50%)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
