import { useState, useEffect, useRef, useCallback } from 'react';
import type { CipherCrackerGame as CipherCrackerGameType, CipherCrackerMission } from '../../../types/game';

interface CipherCrackerGameProps {
  gameData: CipherCrackerGameType;
  onComplete: (score: number, xpEarned: number) => void;
}

type GamePhase = 'intro' | 'playing' | 'success' | 'nextMission' | 'victory' | 'gameover';

/* ── Matrix rain background ─────────────────────────────────────── */
function MatrixRain() {
  const columns = 28;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const seeds = Array.from({ length: columns }, (_, i) => ({
    left: `${(i / columns) * 100}%`,
    delay: `${(i * 0.37) % 5}s`,
    dur: `${4 + (i % 5)}s`,
    char: chars[i % chars.length],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {seeds.map((s, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono text-xs cc-animate-rain"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          {s.char}
        </div>
      ))}
    </div>
  );
}

/* ── Scanline overlay ───────────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-5"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
      }}
    />
  );
}

/* ── Lives display ──────────────────────────────────────────────── */
function LivesDisplay({ lives, max }: { lives: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`text-lg ${i < lives ? 'opacity-100' : 'opacity-30'}`}>
          {i < lives ? '🟢' : '⚫'}
        </span>
      ))}
    </div>
  );
}

/* ── Difficulty badge ───────────────────────────────────────────── */
function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    easy: 'bg-green-900/50 text-green-400 border-green-700',
    medium: 'bg-yellow-900/50 text-yellow-400 border-yellow-700',
    hard: 'bg-red-900/50 text-red-400 border-red-700',
  };
  const c = colors[difficulty as keyof typeof colors] || colors.easy;
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-mono border ${c}`}>
      {difficulty.toUpperCase()}
    </span>
  );
}

/* ── Python string expression evaluator ─────────────────────────── */
function evaluateExpression(
  expression: string,
  variableName: string,
  encodedMessage: string,
  extraVariables?: Record<string, any>
): string {
  // Convert Python string methods to JS equivalents
  let jsExpr = expression.trim();

  // Python → JS string method conversions
  jsExpr = jsExpr.replace(/\.lower\(\)/g, '.toLowerCase()');
  jsExpr = jsExpr.replace(/\.upper\(\)/g, '.toUpperCase()');
  jsExpr = jsExpr.replace(/\.strip\(\)/g, '.trim()');
  jsExpr = jsExpr.replace(/\.lstrip\(\)/g, '.trimStart()');
  jsExpr = jsExpr.replace(/\.rstrip\(\)/g, '.trimEnd()');
  jsExpr = jsExpr.replace(/\.title\(\)/g, '.replace(/\\w\\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())');

  // Handle Python slice [::-1] for reversing
  jsExpr = jsExpr.replace(/\[::-1\]/g, '.split("").reverse().join("")');

  // Handle Python .split() with no args (splits on whitespace)
  jsExpr = jsExpr.replace(/\.split\(\)/g, '.split(/\\s+/)');

  // Handle f-strings: f"...{var}..." → template literals
  if (jsExpr.startsWith('f"') || jsExpr.startsWith("f'")) {
    const quote = jsExpr[1];
    let inner = jsExpr.slice(2, jsExpr.lastIndexOf(quote));
    inner = inner.replace(/\{([^}]+)\}/g, '${$1}');
    jsExpr = '`' + inner + '`';
  }

  // Build the function body with all available variables
  const varDeclarations = [`const ${variableName} = __encodedMessage__;`];
  if (extraVariables) {
    for (const [k, v] of Object.entries(extraVariables)) {
      varDeclarations.push(`const ${k} = ${JSON.stringify(v)};`);
    }
  }

  const fnBody = `
    ${varDeclarations.join('\n')}
    return String(${jsExpr});
  `;

  const fn = new Function('__encodedMessage__', fnBody);
  return fn(encodedMessage);
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export function CipherCrackerGame({ gameData, onComplete }: CipherCrackerGameProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [missionIndex, setMissionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(gameData.startingLives);
  const [combo, setCombo] = useState(0);
  const [input, setInput] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(gameData.timeLimitSeconds);
  const [missionStartTime, setMissionStartTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const mission = gameData.missions[missionIndex];
  const totalMissions = gameData.missions.length;

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      handleWrongAnswer('Time ran out!');
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // Focus input when playing
  useEffect(() => {
    if (phase === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, missionIndex]);

  const startMission = useCallback(() => {
    setPhase('playing');
    setInput('');
    setHintUsed(false);
    setShowHint(false);
    setFeedback(null);
    setTimeLeft(gameData.timeLimitSeconds);
    setMissionStartTime(Date.now());
  }, [gameData.timeLimitSeconds]);

  function handleSubmit() {
    if (!input.trim() || phase !== 'playing') return;

    try {
      const result = evaluateExpression(
        input,
        mission.variableName,
        mission.encodedMessage,
        mission.extraVariables
      );

      if (result.trim() === mission.expectedOutput.trim()) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer(`Got: "${result}" — Expected: "${mission.expectedOutput}"`);
      }
    } catch (err: any) {
      handleWrongAnswer(`Error: ${err.message || 'Invalid expression'}`);
    }
  }

  function handleCorrectAnswer() {
    const newCombo = combo + 1;
    const multiplier = gameData.comboMultipliers[Math.min(newCombo - 1, gameData.comboMultipliers.length - 1)];
    const elapsed = (Date.now() - missionStartTime) / 1000;
    const timeBonus = Math.max(0, Math.round(gameData.timeBonusMax * (1 - elapsed / gameData.timeLimitSeconds)));
    const hintDeduction = hintUsed ? gameData.hintPenalty : 0;
    const missionScore = Math.max(0, Math.round((gameData.pointsPerMission + timeBonus - hintDeduction) * multiplier));

    setScore((s) => s + missionScore);
    setCombo(newCombo);
    setFeedback({ type: 'correct', message: `+${missionScore} pts${newCombo > 1 ? ` (${multiplier}x combo!)` : ''}` });
    setPhase('success');

    setTimeout(() => {
      if (missionIndex + 1 >= totalMissions) {
        setPhase('victory');
      } else {
        setPhase('nextMission');
      }
    }, 1500);
  }

  function handleWrongAnswer(message: string) {
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    setFeedback({ type: 'wrong', message });

    if (newLives <= 0) {
      setTimeout(() => setPhase('gameover'), 1500);
    } else {
      // Reset timer for retry
      setTimeout(() => {
        setFeedback(null);
        setTimeLeft(gameData.timeLimitSeconds);
        setMissionStartTime(Date.now());
        setInput('');
      }, 2000);
    }
  }

  function handleNextMission() {
    setMissionIndex((i) => i + 1);
    startMission();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  function calcXP() {
    const percentage = (score / (totalMissions * (gameData.pointsPerMission + gameData.timeBonusMax))) * 100;
    return gameData.baseXP + Math.round((Math.min(percentage, 100) / 100) * gameData.bonusXP);
  }

  /* ── INTRO SCREEN ──────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <ScanLines />
        <div className="max-w-lg w-full relative z-10">
          <div className="bg-gray-900/90 border border-green-800/60 rounded-xl shadow-2xl shadow-green-900/20 p-8 text-center backdrop-blur-sm">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-green-400 font-mono mb-2 tracking-wider">
              {gameData.title}
            </h1>
            <p className="text-green-300/70 font-mono text-sm mb-6">
              {gameData.description}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-800/60 rounded-lg p-3 border border-green-900/40">
                <div className="text-2xl font-bold text-green-400 font-mono">{totalMissions}</div>
                <div className="text-xs text-green-600 font-mono">MISSIONS</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3 border border-green-900/40">
                <div className="text-2xl font-bold text-green-400 font-mono">{gameData.startingLives}</div>
                <div className="text-xs text-green-600 font-mono">LIVES</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3 border border-green-900/40">
                <div className="text-2xl font-bold text-green-400 font-mono">{gameData.timeLimitSeconds}s</div>
                <div className="text-xs text-green-600 font-mono">PER MISSION</div>
              </div>
            </div>

            <button
              onClick={startMission}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-lg tracking-widest shadow-lg shadow-green-900/40 hover:shadow-green-800/60"
            >
              [ START MISSION ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── VICTORY SCREEN ────────────────────────────────────────────── */
  if (phase === 'victory') {
    const xpEarned = calcXP();
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <ScanLines />
        <div className="max-w-lg w-full relative z-10">
          <div className="bg-gray-900/90 border border-green-800/60 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm">
            <div className="text-7xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-green-400 font-mono mb-2 tracking-wider">
              MISSION COMPLETE
            </h1>
            <p className="text-green-300/70 font-mono text-sm mb-6">
              All transmissions decoded. Outstanding work, Agent.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/60 rounded-lg p-4 border border-green-900/40">
                <div className="text-3xl font-bold text-green-400 font-mono">{score}</div>
                <div className="text-xs text-green-600 font-mono">TOTAL SCORE</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 border border-emerald-900/40">
                <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
                <div className="text-xs text-emerald-600 font-mono">XP EARNED</div>
              </div>
            </div>

            <button
              onClick={() => onComplete(score, xpEarned)}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-lg tracking-widest"
            >
              [ RETURN TO BASE ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── GAME OVER SCREEN ──────────────────────────────────────────── */
  if (phase === 'gameover') {
    const xpEarned = Math.round(calcXP() * 0.5);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-red-950/30 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        <ScanLines />
        <div className="max-w-lg w-full relative z-10">
          <div className="bg-gray-900/90 border border-red-800/60 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm">
            <div className="text-7xl mb-4">💀</div>
            <h1 className="text-3xl font-bold text-red-400 font-mono mb-2 tracking-wider">
              COVER BLOWN
            </h1>
            <p className="text-red-300/70 font-mono text-sm mb-6">
              Mission failed. You decoded {missionIndex} of {totalMissions} transmissions.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/60 rounded-lg p-4 border border-red-900/40">
                <div className="text-3xl font-bold text-red-400 font-mono">{score}</div>
                <div className="text-xs text-red-600 font-mono">SCORE</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 border border-emerald-900/40">
                <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
                <div className="text-xs text-emerald-600 font-mono">XP EARNED</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMissionIndex(0);
                  setScore(0);
                  setLives(gameData.startingLives);
                  setCombo(0);
                  startMission();
                }}
                className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-all font-mono tracking-widest"
              >
                [ RETRY ]
              </button>
              <button
                onClick={() => onComplete(score, xpEarned)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-3 rounded-lg transition-all font-mono tracking-widest"
              >
                [ ABORT ]
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── NEXT MISSION TRANSITION ───────────────────────────────────── */
  if (phase === 'nextMission') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <ScanLines />
        <div className="max-w-lg w-full relative z-10">
          <div className="bg-gray-900/90 border border-green-800/60 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-xl font-bold text-green-400 font-mono mb-2">
              TRANSMISSION DECODED
            </h2>
            <p className="text-green-300/70 font-mono text-sm mb-6">
              Incoming new transmission...
            </p>
            <button
              onClick={handleNextMission}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-lg tracking-widest"
            >
              [ NEXT MISSION ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── PLAYING SCREEN ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex flex-col relative overflow-hidden">
      <MatrixRain />
      <ScanLines />

      {/* ─── Top bar ─── */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-green-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <LivesDisplay lives={lives} max={gameData.startingLives} />
          {combo > 1 && (
            <span className="text-yellow-400 font-mono text-sm font-bold cc-animate-pulse">
              {gameData.comboMultipliers[Math.min(combo - 1, gameData.comboMultipliers.length - 1)]}x COMBO
            </span>
          )}
        </div>
        <div className="text-green-400 font-mono font-bold">
          SCORE: {score}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-600 font-mono text-sm">
            MISSION {missionIndex + 1}/{totalMissions}
          </span>
          <span className={`font-mono font-bold text-lg ${timeLeft <= 10 ? 'text-red-400 cc-animate-pulse' : 'text-green-400'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* ─── Mission content ─── */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-2xl w-full space-y-4">
          {/* Mission header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-green-400 font-mono tracking-wider">
                {mission.codeName}
              </h2>
            </div>
            <DifficultyBadge difficulty={mission.difficulty} />
          </div>

          {/* Briefing */}
          <div className="bg-gray-800/60 rounded-lg p-4 border border-green-900/30">
            <div className="text-green-600 font-mono text-xs mb-1 tracking-widest">BRIEFING</div>
            <p className="text-green-300/90 font-mono text-sm leading-relaxed">
              {mission.briefing}
            </p>
          </div>

          {/* Encoded message terminal */}
          <div className="bg-black/80 rounded-lg p-4 border border-green-800/50 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-green-700 font-mono text-xs ml-2">intercepted_message.py</span>
            </div>
            {mission.extraVariables ? (
              <div className="font-mono text-sm">
                {Object.entries(mission.extraVariables).map(([k, v]) => (
                  <div key={k} className="text-green-300">
                    <span className="text-green-600">{k}</span> = <span className="text-yellow-300">{JSON.stringify(v)}</span>
                  </div>
                ))}
                <div className="text-green-500/50 mt-1"># Produce the decoded output using these variables</div>
              </div>
            ) : (
              <div className="font-mono text-sm">
                <span className="text-green-600">{mission.variableName}</span>
                <span className="text-green-400"> = </span>
                <span className="text-yellow-300">"{mission.encodedMessage}"</span>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="bg-gray-800/40 rounded-lg p-4 border border-green-900/30">
            <div className="text-green-600 font-mono text-xs mb-2 tracking-widest">YOUR EXPRESSION</div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-mono text-sm">{'>>>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`e.g. ${mission.variableName}.lower()`}
                  className="w-full bg-black/60 text-green-300 font-mono text-sm pl-12 pr-4 py-3 rounded-lg border border-green-900/50 focus:border-green-500 focus:outline-none placeholder-green-800/50"
                  disabled={phase !== 'playing' || feedback?.type === 'wrong'}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || feedback?.type === 'wrong'}
                className={`px-6 py-3 rounded-lg font-mono font-bold tracking-wider transition-all ${
                  !input.trim() || feedback?.type === 'wrong'
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-black'
                }`}
              >
                DECODE
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`rounded-lg p-3 font-mono text-sm border ${
                feedback.type === 'correct'
                  ? 'bg-green-900/40 text-green-300 border-green-700/50'
                  : 'bg-red-900/40 text-red-300 border-red-700/50'
              }`}
            >
              <span className="font-bold">{feedback.type === 'correct' ? '✅ DECODED! ' : '❌ FAILED: '}</span>
              {feedback.message}
            </div>
          )}

          {/* Hint */}
          <div className="flex justify-center">
            {!showHint ? (
              <button
                onClick={() => {
                  setShowHint(true);
                  setHintUsed(true);
                }}
                className="text-green-700 hover:text-green-500 font-mono text-xs transition-colors"
              >
                [ REQUEST HINT (-{gameData.hintPenalty} pts) ]
              </button>
            ) : (
              <div className="bg-yellow-900/20 rounded-lg px-4 py-2 border border-yellow-800/30 font-mono text-xs text-yellow-400/80">
                💡 {mission.hint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
