import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FileSorterGame, FileSorterCard } from '../../../types/game';

interface Props {
  gameData: FileSorterGame;
  onComplete: (score: number, xp: number) => void;
}

type Phase = 'intro' | 'playing' | 'result' | 'gameover' | 'victory';

interface ScorePopup {
  id: number;
  value: number;
  x: number;
}

const TIMER_BY_DIFFICULTY: Record<string, number> = { easy: 12, medium: 10, hard: 8 };
const POINTS_BY_DIFFICULTY: Record<string, number> = { easy: 100, medium: 200, hard: 300 };
const MAX_STREAK_MULT = 4;
const MAX_LIVES = 3;
const RESULT_DELAY = 1400;

// Matrix rain characters
const RAIN_CHARS = [
  '01001', '10110', '0xFF', '0x3A', 'SYN', 'ACK', 'r+', 'w+', 'a+',
  'open()', 'read()', 'chmod', '>>>',  'sudo', 'grep', 'ssh',
  '0xDEAD', 'root', '//TODO', 'NULL', 'exec()', 'fork()',
];

// Fake hacking log lines
const LOG_LINES = [
  'scanning port 443...',
  'TCP handshake OK',
  'injecting payload...',
  'bypassing auth layer',
  'decrypting packet...',
  'AES-256: cracked',
  'uploading backdoor',
  'parsing file headers',
  'checksum verified',
  'buffer overflow detected',
  'heap spray: success',
  'routing through proxy',
  'spoofing MAC addr',
  'dumping memory...',
  'escalating privileges',
  'intercepting I/O call',
  'kernel hook installed',
  'extracting credentials',
];

function MatrixRain() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      text: RAIN_CHARS[i % RAIN_CHARS.length],
      left: `${(i * 4.3 + 0.5) % 100}%`,
      delay: `${(i * 1.1) % 12}s`,
      duration: `${8 + (i % 8) * 2.5}s`,
      opacity: 0.08 + (i % 6) * 0.04,
      fontSize: 9 + (i % 3) * 2,
    })),
  []);

  return (
    <div className="fs-particles">
      {particles.map(p => (
        <span
          key={p.id}
          className="fs-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            fontSize: `${p.fontSize}px`,
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}

function ProgressDots({ total, current, results }: { total: number; current: number; results: ('correct' | 'wrong' | null)[] }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: total }, (_, i) => {
        let cls = 'fs-dot';
        if (i < current) {
          cls += results[i] === 'correct' ? ' fs-dot-done' : ' fs-dot-failed';
        } else if (i === current) {
          cls += ' fs-dot-current';
        } else {
          cls += ' fs-dot-pending';
        }
        return <div key={i} className={cls} />;
      })}
    </div>
  );
}

// Scrolling terminal log sidebar
function HackerLog({ cardIdx }: { cardIdx: number }) {
  const lines = useMemo(() => {
    // Pick pseudo-random lines based on cardIdx
    const result = [];
    for (let i = 0; i < 12; i++) {
      const idx = (cardIdx * 3 + i * 7) % LOG_LINES.length;
      result.push(LOG_LINES[idx]);
    }
    return result;
  }, [cardIdx]);

  return (
    <div className="fs-log hidden lg:flex">
      {lines.map((line, i) => (
        <div key={i} className={`fs-log-line ${i >= 9 ? 'fs-log-line-bright' : ''}`}>
          {line}
        </div>
      ))}
    </div>
  );
}

function SceneWrapper({ children, extraClass, screenFlash }: { children: React.ReactNode; extraClass?: string; screenFlash?: 'correct' | 'wrong' | null }) {
  return (
    <div className={`fs-scene ${extraClass || ''} ${
      screenFlash === 'correct' ? 'fs-flash-correct' : screenFlash === 'wrong' ? 'fs-flash-wrong' : ''
    }`}>
      <div className="fs-grid" />
      <MatrixRain />
      <div className="fs-glow" />
      <div className="fs-scanlines" />
      <div className="fs-desk" />
      {children}
    </div>
  );
}

export function DungeonArchiveGame({ gameData, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [cardIdx, setCardIdx] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [cardResult, setCardResult] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [screenFlash, setScreenFlash] = useState<'correct' | 'wrong' | null>(null);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [cardResults, setCardResults] = useState<('correct' | 'wrong' | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupIdRef = useRef(0);

  const cards = gameData.cards;
  const currentCard: FileSorterCard | undefined = cards[cardIdx];
  const streakMult = Math.min(streak + 1, MAX_STREAK_MULT);

  // Hex address for current card
  const hexAddr = useMemo(() => {
    return `0x${((cardIdx + 1) * 0x1A3F).toString(16).toUpperCase().padStart(4, '0')}`;
  }, [cardIdx]);

  // ── Timer ──
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback((seconds: number) => {
    clearTimer();
    setTimeLeft(seconds);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearTimer(); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => {
    if (phase === 'playing' && currentCard) {
      startTimer(TIMER_BY_DIFFICULTY[currentCard.difficulty]);
    }
    return clearTimer;
  }, [phase, cardIdx, currentCard, startTimer, clearTimer]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0 && currentCard && chosen === null) {
      handleAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    if (phase !== 'playing' || chosen !== null || !currentCard) return;
    function handleKey(e: KeyboardEvent) {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < currentCard!.options.length) {
        handleAnswer(currentCard!.options[idx].id);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, chosen, currentCard]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current);
    };
  }, [clearTimer]);

  function addScorePopup(value: number) {
    const id = ++popupIdRef.current;
    const x = 40 + Math.random() * 20;
    setScorePopups(prev => [...prev, { id, value, x }]);
    setTimeout(() => {
      setScorePopups(prev => prev.filter(p => p.id !== id));
    }, 1200);
  }

  function handleAnswer(optionId: string | null) {
    if (chosen !== null) return;
    clearTimer();

    const isCorrect = optionId === currentCard?.correctOptionId;
    setChosen(optionId);
    setCardResult(isCorrect ? 'correct' : 'wrong');
    setScreenFlash(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setScreenFlash(null), 600);

    setCardResults(prev => { const next = [...prev]; next[cardIdx] = isCorrect ? 'correct' : 'wrong'; return next; });

    if (isCorrect) {
      const basePoints = POINTS_BY_DIFFICULTY[currentCard!.difficulty];
      const timeBonus = timeLeft * 10;
      const mult = Math.min(streak + 1, MAX_STREAK_MULT);
      const earned = (basePoints + timeBonus) * mult;
      setScore(prev => prev + earned);
      addScorePopup(earned);
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(best => Math.max(best, next));
        return next;
      });
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
    }

    setPhase('result');

    resultTimeoutRef.current = setTimeout(() => {
      const newLives = isCorrect ? lives : lives - 1;
      const nextIdx = cardIdx + 1;
      if (newLives <= 0) { setPhase('gameover'); }
      else if (nextIdx >= cards.length) { setPhase('victory'); }
      else {
        setCardIdx(nextIdx);
        setChosen(null);
        setCardResult(null);
        setPhase('playing');
      }
    }, RESULT_DELAY);
  }

  function handleStart() {
    setPhase('playing');
    setCardIdx(0);
    setLives(MAX_LIVES);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setChosen(null);
    setCardResult(null);
    setCardResults([]);
    setScorePopups([]);
  }

  function handleFinish() {
    const maxPossible = cards.reduce((sum, c) => {
      const base = POINTS_BY_DIFFICULTY[c.difficulty];
      const maxTime = TIMER_BY_DIFFICULTY[c.difficulty] * 10;
      return sum + (base + maxTime) * MAX_STREAK_MULT;
    }, 0);
    const ratio = Math.min(score / maxPossible, 1);
    const xp = Math.round(gameData.baseXP + gameData.bonusXP * ratio);
    onComplete(score, xp);
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <SceneWrapper screenFlash={screenFlash}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full relative z-10"
          >
            <div className="fs-monitor rounded-xl p-1">
              <div className="fs-card rounded-lg p-8 text-center">
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-green-500/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-green-500/40 font-mono ml-2">root@target:~/classified</span>
                </div>

                {/* ASCII skull */}
                <pre className="text-green-500/40 text-[8px] leading-tight mb-4 font-mono select-none">
{`    ┌─────────────────┐
    │  ╔═╗╦╦  ╔═╗     │
    │  ╠╣ ║║  ║╣      │
    │  ╚  ╩╩═╝╚═╝     │
    │  ╔═╗╔═╗╦═╗╔╦╗   │
    │  ╚═╗║ ║╠╦╝ ║    │
    │  ╚═╝╚═╝╩╚═ ╩    │
    └─────────────────┘`}
                </pre>

                <h1 className="text-2xl font-black text-green-400 mb-1 font-mono fs-neon">{gameData.title}</h1>
                <p className="text-green-500/40 text-xs font-mono mb-5">{'// '}{gameData.description}</p>

                {/* Hacking boot sequence */}
                <div className="text-left mb-5 bg-black/50 rounded-lg p-3 border border-green-500/10">
                  <div className="fs-terminal-line">$ ssh root@10.0.0.42 -p 22</div>
                  <div className="fs-terminal-line">Password: ********</div>
                  <div className="fs-terminal-line fs-terminal-line-highlight">[+] Connection established</div>
                  <div className="fs-terminal-line fs-terminal-line-highlight">[+] 15 classified files intercepted</div>
                  <div className="fs-terminal-line text-red-500/50">[!] TRACE ACTIVE — sort fast or get caught</div>
                  <div className="fs-terminal-line fs-terminal-line-highlight">
                    awaiting input... <span className="fs-cursor" />
                  </div>
                </div>

                {/* Mission briefing */}
                <div className="space-y-2 text-left text-xs text-green-500/50 font-mono mb-6 bg-black/30 rounded-lg p-4 border border-green-500/5">
                  <div className="text-green-400/60 text-[10px] tracking-widest mb-2">{'# MISSION BRIEF'}</div>
                  <div><span className="text-green-400">[1]</span> Intercepted file operations appear on screen</div>
                  <div><span className="text-green-400">[2]</span> Classify each packet into the correct output</div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">[3]</span>
                    <span>Click or press</span>
                    <span className="fs-keycap">1</span>
                    <span className="fs-keycap">2</span>
                    <span className="fs-keycap">3</span>
                  </div>
                  <div><span className="text-yellow-400">[!</span><span className="text-yellow-400">]</span> Streaks boost your score up to <span className="text-yellow-400 font-bold">4x</span></div>
                  <div><span className="text-red-500">[X]</span> 3 wrong = <span className="text-red-500 font-bold">TRACE COMPLETE — connection killed</span></div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-5 mb-5 text-[10px] text-green-500/40 font-mono">
                  <div><span className="text-green-400 font-bold">15</span> packets</div>
                  <div className="text-green-900">│</div>
                  <div><span className="text-red-400 font-bold">3</span> lives</div>
                  <div className="text-green-900">│</div>
                  <div><span className="text-yellow-400 font-bold">4x</span> combo</div>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full py-3.5 bg-green-600/80 text-green-100 font-black rounded-lg hover:bg-green-500/80 transition-all text-sm tracking-widest font-mono hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] active:scale-[0.98] border border-green-400/20"
                >
                  {'>'} BREACH SYSTEM_
                </button>
              </div>
              <div className="fs-monitor-led" />
              <div className="fs-monitor-brand">GHOST_OS</div>
            </div>
            <div className="fs-monitor-stand" />
            <div className="fs-monitor-base" />
          </motion.div>
        </div>
      </SceneWrapper>
    );
  }

  // ── Game Over ──
  if (phase === 'gameover') {
    const sorted = cardResults.filter(r => r === 'correct').length;
    return (
      <SceneWrapper screenFlash={screenFlash}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full relative z-10"
          >
            <div className="fs-monitor rounded-xl p-1">
              <div className="fs-card rounded-lg p-8 text-center">
                <div className="text-5xl mb-3">🚨</div>
                <h1 className="text-2xl font-black text-red-500 mb-1 font-mono" style={{ textShadow: '0 0 20px rgba(255,0,0,0.6)' }}>
                  TRACE COMPLETE
                </h1>
                <p className="text-red-500/40 text-xs font-mono mb-1">CONNECTION TERMINATED BY HOST</p>
                <p className="text-red-500/30 text-[9px] font-mono mb-5">ERR_0xDEAD: intrusion detected at kernel level</p>

                {/* Error log */}
                <div className="text-left mb-5 bg-black/50 rounded-lg p-3 border border-red-500/15">
                  <div className="fs-terminal-line text-red-400/50">$ whoami</div>
                  <div className="fs-terminal-line text-red-400/40">INTRUDER DETECTED</div>
                  <div className="fs-terminal-line text-red-400/40">IP logged: 192.168.█.███</div>
                  <div className="fs-terminal-line text-red-400/40">killing session... done.</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-black/40 rounded-lg p-4 border border-green-500/10">
                    <div className="text-xl font-black text-green-400 font-mono">{score.toLocaleString()}</div>
                    <div className="text-[8px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Score</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border border-green-500/10">
                    <div className="text-xl font-black text-green-400 font-mono">{sorted}/{cards.length}</div>
                    <div className="text-[8px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Decoded</div>
                  </div>
                </div>

                <div className="mb-5">
                  <ProgressDots total={cards.length} current={cardIdx + 1} results={cardResults} />
                </div>

                <div className="flex gap-3">
                  <button onClick={handleStart}
                    className="flex-1 py-3 bg-green-900/50 text-green-400 font-bold rounded-lg hover:bg-green-800/50 transition-all text-sm font-mono active:scale-[0.98] border border-green-500/15">
                    ↻ RECONNECT
                  </button>
                  <button onClick={handleFinish}
                    className="flex-1 py-3 bg-green-600/80 text-green-100 font-bold rounded-lg hover:bg-green-500/80 transition-all text-sm font-mono active:scale-[0.98] border border-green-400/20">
                    {'>'} EXTRACT
                  </button>
                </div>
              </div>
              <div className="fs-monitor-led" />
              <div className="fs-monitor-brand">GHOST_OS</div>
            </div>
            <div className="fs-monitor-stand" />
            <div className="fs-monitor-base" />
          </motion.div>
        </div>
      </SceneWrapper>
    );
  }

  // ── Victory ──
  if (phase === 'victory') {
    const perfect = cardResults.every(r => r === 'correct');
    const sorted = cardResults.filter(r => r === 'correct').length;
    return (
      <SceneWrapper screenFlash={screenFlash}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full relative z-10"
          >
            <div className="fs-monitor rounded-xl p-1">
              <div className="fs-card rounded-lg p-8 text-center">
                <div className="text-5xl mb-3">{perfect ? '👑' : '🔓'}</div>
                <h1 className="text-2xl font-black text-green-400 mb-1 font-mono fs-neon">
                  {perfect ? 'ZERO TRACE' : 'EXTRACTION COMPLETE'}
                </h1>
                <p className="text-green-500/40 text-xs font-mono mb-1">
                  {perfect ? 'Ghost protocol — zero errors logged.' : 'All packets classified. Connection secure.'}
                </p>

                {/* Success log */}
                <div className="text-left mb-5 bg-black/50 rounded-lg p-3 border border-green-500/10">
                  <div className="fs-terminal-line">$ verify --all --checksum</div>
                  <div className="fs-terminal-line fs-terminal-line-highlight">[+] {sorted}/{cards.length} packets decoded</div>
                  <div className="fs-terminal-line fs-terminal-line-highlight">[+] best combo: {bestStreak}x multiplier</div>
                  {perfect && <div className="fs-terminal-line text-yellow-400/60">[★] PERFECT — undetected, zero footprint</div>}
                  <div className="fs-terminal-line fs-terminal-line-highlight">[+] exfiltration successful</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-black/40 rounded-lg p-3 border border-green-500/10">
                    <div className="text-lg font-black text-green-400 font-mono">{score.toLocaleString()}</div>
                    <div className="text-[7px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Score</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-yellow-500/10">
                    <div className="text-lg font-black text-yellow-400 font-mono">{bestStreak}x</div>
                    <div className="text-[7px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Combo</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-green-500/10">
                    <div className="text-lg font-black text-green-400 font-mono">{lives}/{MAX_LIVES}</div>
                    <div className="text-[7px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Lives</div>
                  </div>
                </div>

                <div className="mb-5">
                  <ProgressDots total={cards.length} current={cards.length} results={cardResults} />
                </div>

                <button onClick={handleFinish}
                  className="w-full py-3.5 bg-green-600/80 text-green-100 font-black rounded-lg hover:bg-green-500/80 transition-all text-sm tracking-widest font-mono hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] active:scale-[0.98] border border-green-400/20">
                  {'>'} COLLECT BOUNTY_
                </button>
              </div>
              <div className="fs-monitor-led" />
              <div className="fs-monitor-brand">GHOST_OS</div>
            </div>
            <div className="fs-monitor-stand" />
            <div className="fs-monitor-base" />
          </motion.div>
        </div>
      </SceneWrapper>
    );
  }

  // ── Playing / Result ──
  const timerMax = currentCard ? TIMER_BY_DIFFICULTY[currentCard.difficulty] : 12;
  const timerPct = (timeLeft / timerMax) * 100;
  const tracePct = 100 - timerPct; // trace builds as timer drops
  const timerUrgent = timeLeft <= 3;
  const timerWarning = timeLeft <= 5;
  const timerBgColor = timerUrgent ? 'bg-red-500' : timerWarning ? 'bg-yellow-500' : 'bg-green-500';
  const timerCssColor = timerUrgent ? '#ff0000' : timerWarning ? '#eab308' : '#00ff41';
  const diffLabel = currentCard?.difficulty.toUpperCase() ?? '';
  const diffColor = currentCard?.difficulty === 'easy'
    ? 'text-green-400 bg-green-400/10 border-green-400/20'
    : currentCard?.difficulty === 'medium'
      ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      : 'text-red-400 bg-red-400/10 border-red-400/20';
  const secLevel = currentCard?.difficulty === 'easy' ? 'LOW' : currentCard?.difficulty === 'medium' ? 'MED' : 'HIGH';

  return (
    <SceneWrapper screenFlash={screenFlash} extraClass="flex items-center justify-center p-2 sm:p-4">
      <div className="fs-monitor-fullscreen relative z-10 w-full max-w-4xl flex flex-col">
        {/* Hacker log sidebar */}
        <HackerLog cardIdx={cardIdx} />

        {/* HUD */}
        <div className="fs-hud flex items-center justify-between px-4 py-2 relative z-10 rounded-t-[10px]">
          {/* Lives */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={i === lives - 1 && cardResult === 'wrong' ? { scale: [1, 0.5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-sm ${i < lives ? '' : 'opacity-15'}`}>
                    {i < lives ? '🟢' : '⚫'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal path + trace */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="fs-path">
              <span>root@target:</span>
              <span className="fs-path-active">~/{currentCard?.difficulty}/</span>
              <span className="fs-path-active">pkt_{hexAddr}</span>
            </div>
            {/* Trace meter */}
            <div className="fs-trace">
              <span>TRACE</span>
              <div className="fs-trace-bar">
                <div className="fs-trace-fill" style={{ width: `${tracePct}%` }} />
              </div>
              <span>{Math.round(tracePct)}%</span>
            </div>
          </div>

          {/* Mobile: dots */}
          <div className="sm:hidden">
            <ProgressDots total={cards.length} current={cardIdx} results={cardResults} />
          </div>

          {/* Score + Streak */}
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <motion.div
                key={streak}
                initial={{ scale: 1.6, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`font-black text-sm font-mono ${streak >= 3 ? 'fs-streak-fire text-green-300' : 'text-green-400'}`}
              >
                {streakMult}x
              </motion.div>
            )}
            <motion.div
              key={score}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-green-400 font-black text-sm font-mono"
              style={{ textShadow: '0 0 8px rgba(0,255,65,0.4)' }}
            >
              {score.toLocaleString()}
            </motion.div>
          </div>
        </div>

        {/* Desktop progress dots */}
        <div className="hidden sm:flex justify-center py-1 relative z-10 bg-black/30">
          <ProgressDots total={cards.length} current={cardIdx} results={cardResults} />
        </div>

        {/* Timer bar */}
        <div className="w-full h-2 bg-black/60 relative z-10">
          <div
            className={`h-full ${timerBgColor} fs-timer-bar ${timerUrgent && phase === 'playing' ? 'fs-timer-danger' : ''}`}
            style={{
              width: `${timerPct}%`,
              transition: 'width 0.4s linear',
              color: timerCssColor,
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold z-10" style={{ color: timerCssColor }}>
            {phase === 'playing' ? `${timeLeft}s` : ''}
          </div>
        </div>

        {/* Card area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6 relative z-10">
          {/* Score popups */}
          <AnimatePresence>
            {scorePopups.map(popup => (
              <motion.div
                key={popup.id}
                initial={{ opacity: 1, y: 0, x: '-50%' }}
                animate={{ opacity: 0, y: -80 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="fs-score-popup"
                style={{ left: `${popup.x}%`, top: '30%' }}
              >
                +{popup.value}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={cardIdx}
              initial={{ opacity: 0, x: 60, rotate: 1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -60, rotate: -1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-lg"
            >
              {/* Header: difficulty + packet info */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${diffColor}`}>
                    {diffLabel}
                  </span>
                  <span className="fs-hex-badge">
                    SEC:{secLevel}
                  </span>
                </div>
                <span className="text-[10px] text-green-500/40 font-mono">
                  PKT {cardIdx + 1}/{cards.length} [{hexAddr}]
                </span>
              </div>

              {/* Card — intercepted packet */}
              <div className={`fs-card rounded-lg p-6 sm:p-8 text-center mb-5 relative ${
                cardResult === 'correct' ? 'fs-card-correct' :
                cardResult === 'wrong' ? 'fs-card-wrong' : ''
              }`}>
                {/* Terminal prompt */}
                <div className="text-green-500/25 text-[10px] font-mono text-left mb-3">
                  root@target:~# decrypt --packet={hexAddr}
                </div>

                {/* Question */}
                <div className="text-base sm:text-lg font-bold text-green-100 leading-relaxed font-mono mb-1">
                  {currentCard?.prompt}
                </div>

                {/* Cursor */}
                {!cardResult && <span className="fs-cursor" />}

                {/* ACCESS GRANTED / DENIED stamp */}
                <AnimatePresence>
                  {cardResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 2.5, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: -12 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className={`fs-stamp ${cardResult === 'correct' ? 'fs-stamp-correct' : 'fs-stamp-wrong'}`}
                    >
                      {cardResult === 'correct' ? 'GRANTED' : 'DENIED'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bins */}
              <div className="grid grid-cols-3 gap-3">
                {currentCard?.options.map((opt, i) => {
                  const isChosen = chosen === opt.id;
                  const isCorrect = opt.id === currentCard.correctOptionId;
                  const showResult = cardResult !== null;

                  let binClass = 'fs-bin';
                  if (showResult && isCorrect) binClass += ' fs-bin-correct';
                  else if (showResult && isChosen && !isCorrect) binClass += ' fs-bin-wrong';
                  else if (showResult) binClass += ' fs-bin-dim';

                  return (
                    <motion.button
                      key={opt.id}
                      whileHover={!showResult ? { scale: 1.05, y: -3 } : {}}
                      whileTap={!showResult ? { scale: 0.95 } : {}}
                      onClick={() => !showResult && handleAnswer(opt.id)}
                      disabled={showResult}
                      className={binClass}
                    >
                      <div className={`fs-keycap ${isChosen ? 'fs-keycap-active' : ''}`}>{i + 1}</div>
                      <div className="text-sm font-mono font-bold mt-1">{opt.label}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Result feedback */}
              <AnimatePresence>
                {cardResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center mt-4"
                  >
                    <span className={`text-xs font-black font-mono px-4 py-1.5 rounded ${
                      cardResult === 'correct'
                        ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                        : 'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`} style={{ textShadow: cardResult === 'correct' ? '0 0 8px rgba(0,255,65,0.4)' : '0 0 8px rgba(255,0,0,0.4)' }}>
                      {cardResult === 'correct' ? '[+] ACCESS GRANTED' : chosen === null ? '[!] TIMEOUT — PACKET LOST' : '[X] ACCESS DENIED'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-black/50 rounded-b-[10px] border-t border-green-500/10 relative z-10">
          <div className="fs-path">ghost@proxy:~$</div>
          <div className="flex items-center gap-3 text-[8px] font-mono text-green-500/30">
            <span>PID:4823</span>
            <span>MEM:64MB</span>
            <div className="w-[6px] h-[6px] rounded-full bg-green-500 shadow-[0_0_6px_#00ff41]" />
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
