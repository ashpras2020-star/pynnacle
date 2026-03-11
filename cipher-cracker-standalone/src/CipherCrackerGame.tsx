import { useState, useEffect, useRef, useCallback } from 'react';

/* ── Inline Types ──────────────────────────────────────────────── */
interface CipherCrackerMission {
  id: number;
  codeName: string;
  briefing: string;
  encodedMessage: string;
  expectedOutput: string;
  hint: string;
  variableName: string;
  extraVariables?: Record<string, any>;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
}

interface CipherCrackerGameData {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  missions: CipherCrackerMission[];
  pointsPerMission: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

/* ── Inline Game Data ──────────────────────────────────────────── */
const gameData: CipherCrackerGameData = {
  id: 'ciphercracker-module-5',
  moduleId: 'module-5',
  title: 'Cipher Cracker: Operation Python',
  description: 'Decode intercepted messages using Python string operations to complete your spy missions!',
  pointsPerMission: 100,
  timeBonusMax: 50,
  timeLimitSeconds: 90,
  comboMultipliers: [1, 1.5, 2, 2.5, 3],
  startingLives: 3,
  hintPenalty: 25,
  baseXP: 200,
  bonusXP: 300,
  missions: [
    {
      id: 1,
      codeName: 'The Shouting Whisper',
      briefing: 'An intercepted transmission is in ALL CAPS. Convert it to lowercase to avoid detection. Use a string method on the variable `message`.',
      encodedMessage: 'MEET AT THE DOCKS AT MIDNIGHT',
      expectedOutput: 'meet at the docks at midnight',
      hint: 'Try message.lower()',
      variableName: 'message',
      difficulty: 'easy',
      concepts: ['lower'],
    },
    {
      id: 2,
      codeName: 'The Backwards Message',
      briefing: 'This message was written in reverse to fool enemy agents. Reverse the string to read the real message. Use Python slicing on `message`.',
      encodedMessage: '!thginot epacsE',
      expectedOutput: 'Escape tonight!',
      hint: 'Try message[::-1] to reverse a string',
      variableName: 'message',
      difficulty: 'easy',
      concepts: ['slicing', 'reverse'],
    },
    {
      id: 3,
      codeName: 'The Space Agent',
      briefing: 'The agent encoded spaces as dashes to disguise the message. Replace all dashes with spaces using a string method on `message`.',
      encodedMessage: 'the-package-is-under-the-bridge',
      expectedOutput: 'the package is under the bridge',
      hint: 'Try message.replace("-", " ")',
      variableName: 'message',
      difficulty: 'easy',
      concepts: ['replace'],
    },
    {
      id: 4,
      codeName: 'The First Letter Code',
      briefing: 'The secret word is hidden in the first letter of each word. Extract the first letter of every word and join them together. The variable `message` contains the encoded phrase.',
      encodedMessage: 'Send Pickles Yesterday',
      expectedOutput: 'SPY',
      hint: 'Try "".join(word[0] for word in message.split())',
      variableName: 'message',
      difficulty: 'medium',
      concepts: ['split', 'join', 'indexing'],
    },
    {
      id: 5,
      codeName: 'The Title Protocol',
      briefing: 'This report has messy formatting — extra spaces and random capitalization. Clean it up: strip whitespace and convert to title case. Use `message`.',
      encodedMessage: '   agent SMITH reporting for DUTY   ',
      expectedOutput: 'Agent Smith Reporting For Duty',
      hint: 'Try message.strip().title()',
      variableName: 'message',
      difficulty: 'medium',
      concepts: ['strip', 'title'],
    },
    {
      id: 6,
      codeName: 'The Number Station',
      briefing: 'HQ needs a formatted status report. You have two variables: `agent` (a name) and `code` (a number). Produce the exact string: "Agent Fox, your code is 42"',
      encodedMessage: 'agent = "Fox", code = 42',
      expectedOutput: 'Agent Fox, your code is 42',
      hint: 'Try f"Agent {agent}, your code is {code}"',
      variableName: 'message',
      extraVariables: { agent: 'Fox', code: 42 },
      difficulty: 'medium',
      concepts: ['f-strings', 'formatting'],
    },
    {
      id: 7,
      codeName: 'The Vowel Cipher',
      briefing: 'Enemy agents replaced vowels with numbers: e\u21923, o\u21920, i\u21921, a\u21922. Reverse the substitution to decode `message`. Chain multiple .replace() calls.',
      encodedMessage: 'Th3 dr0p p01nt 1s th3 l1br2ry',
      expectedOutput: 'The drop point is the library',
      hint: 'Try message.replace("3","e").replace("0","o").replace("1","i").replace("2","a")',
      variableName: 'message',
      difficulty: 'hard',
      concepts: ['replace', 'chaining'],
    },
    {
      id: 8,
      codeName: 'The Final Transmission',
      briefing: 'The final intercepted message is reversed, uppercase, and padded with spaces. Strip it, reverse it, and convert to title case. Use `message`.',
      encodedMessage: '  HSIF EHT TAE ,KCAB GNIMOC MI  ',
      expectedOutput: "Im Coming Back, Eat The Fish",
      hint: 'Try message.strip()[::-1].title()',
      variableName: 'message',
      difficulty: 'hard',
      concepts: ['strip', 'slicing', 'title', 'chaining'],
    },
  ],
};

type GamePhase = 'intro' | 'playing' | 'success' | 'nextMission' | 'victory' | 'gameover';

/* ── Matrix rain background (enhanced) ──────────────────────────── */
function MatrixRain() {
  const columns = 40;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>=/\\|';
  const seeds = Array.from({ length: columns }, (_, i) => ({
    left: `${(i / columns) * 100}%`,
    delay: `${(i * 0.31) % 6}s`,
    dur: `${3 + (i % 6)}s`,
    char: chars[i % chars.length],
    size: i % 5 === 0 ? 'text-sm' : i % 3 === 0 ? 'text-xs' : 'text-[10px]',
    opacity: i % 4 === 0 ? 'opacity-20' : 'opacity-10',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {seeds.map((s, i) => (
        <div
          key={i}
          className={`absolute text-green-400 font-mono ${s.size} ${s.opacity} cc-animate-rain`}
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
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)',
      }}
    />
  );
}

/* ── Grid overlay for extra depth ───────────────────────────────── */
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
}

/* ── Screen flash overlay ───────────────────────────────────────── */
function ScreenFlash({ type }: { type: 'correct' | 'wrong' | null }) {
  if (!type) return null;
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-50 ${
        type === 'correct' ? 'bg-green-500 cc-flash-green' : 'bg-red-500 cc-flash-red'
      }`}
    />
  );
}

/* ── Corner decorations ─────────────────────────────────────────── */
function CornerBrackets({ color = 'green' }: { color?: 'green' | 'red' | 'yellow' }) {
  const c = {
    green: 'border-green-500/40',
    red: 'border-red-500/40',
    yellow: 'border-yellow-500/40',
  }[color];
  return (
    <>
      <div className={`absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 ${c}`} />
      <div className={`absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 ${c}`} />
      <div className={`absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 ${c}`} />
      <div className={`absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 ${c}`} />
    </>
  );
}

/* ── Lives display ──────────────────────────────────────────────── */
function LivesDisplay({ lives, max }: { lives: number; max: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      <span className="text-green-600 font-mono text-[10px] tracking-widest mr-1">LIVES</span>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            i < lives
              ? 'bg-green-500 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
              : 'bg-gray-800 border-gray-700'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Mission progress dots ──────────────────────────────────────── */
function MissionProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i < current
              ? 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]'
              : i === current
              ? 'bg-green-400 cc-animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.7)]'
              : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Difficulty badge ───────────────────────────────────────────── */
function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    easy: 'bg-green-900/50 text-green-400 border-green-700/60',
    medium: 'bg-yellow-900/50 text-yellow-400 border-yellow-700/60',
    hard: 'bg-red-900/50 text-red-400 border-red-700/60',
  };
  const dots = { easy: 1, medium: 2, hard: 3 };
  const dotColor = { easy: 'bg-green-400', medium: 'bg-yellow-400', hard: 'bg-red-400' };
  const c = colors[difficulty as keyof typeof colors] || colors.easy;
  const n = dots[difficulty as keyof typeof dots] || 1;
  const dc = dotColor[difficulty as keyof typeof dotColor] || dotColor.easy;

  return (
    <span className={`px-2.5 py-1 rounded text-[10px] font-mono border ${c} flex items-center gap-1.5`}>
      <span className="flex gap-0.5">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full ${dc}`} />
        ))}
      </span>
      {difficulty.toUpperCase()}
    </span>
  );
}

/* ── Concept tags ───────────────────────────────────────────────── */
function ConceptTags({ concepts }: { concepts: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {concepts.map((c) => (
        <span
          key={c}
          className="px-2 py-0.5 bg-green-950/60 text-green-500/70 text-[10px] font-mono rounded border border-green-900/30"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* ── Timer bar ──────────────────────────────────────────────────── */
function TimerBar({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) {
  const pct = (timeLeft / maxTime) * 100;
  const color =
    pct > 50 ? 'bg-green-500' : pct > 25 ? 'bg-yellow-500' : 'bg-red-500';
  const glow =
    pct > 50
      ? 'shadow-[0_0_8px_rgba(34,197,94,0.4)]'
      : pct > 25
      ? 'shadow-[0_0_8px_rgba(234,179,8,0.4)]'
      : 'shadow-[0_0_8px_rgba(239,68,68,0.4)]';

  return (
    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} ${glow} cc-timer-bar rounded-full`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ── Python string expression evaluator ─────────────────────────── */
function evaluateExpression(
  expression: string,
  variableName: string,
  encodedMessage: string,
  extraVariables?: Record<string, any>
): string {
  let jsExpr = expression.trim();

  jsExpr = jsExpr.replace(/\.lower\(\)/g, '.toLowerCase()');
  jsExpr = jsExpr.replace(/\.upper\(\)/g, '.toUpperCase()');
  jsExpr = jsExpr.replace(/\.strip\(\)/g, '.trim()');
  jsExpr = jsExpr.replace(/\.lstrip\(\)/g, '.trimStart()');
  jsExpr = jsExpr.replace(/\.rstrip\(\)/g, '.trimEnd()');
  jsExpr = jsExpr.replace(/\.title\(\)/g, '.replace(/\\w\\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())');
  jsExpr = jsExpr.replace(/\[::-1\]/g, '.split("").reverse().join("")');
  jsExpr = jsExpr.replace(/\.split\(\)/g, '.split(/\\s+/)');

  if (jsExpr.startsWith('f"') || jsExpr.startsWith("f'")) {
    const quote = jsExpr[1];
    let inner = jsExpr.slice(2, jsExpr.lastIndexOf(quote));
    inner = inner.replace(/\{([^}]+)\}/g, '${$1}');
    jsExpr = '`' + inner + '`';
  }

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
export function CipherCrackerGame() {
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
  const [flashType, setFlashType] = useState<'correct' | 'wrong' | null>(null);
  const [showIntroStamp, setShowIntroStamp] = useState(false);
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

  // Show stamp on intro after delay
  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(() => setShowIntroStamp(true), 800);
      return () => clearTimeout(t);
    }
    setShowIntroStamp(false);
  }, [phase]);

  const startMission = useCallback(() => {
    setPhase('playing');
    setInput('');
    setHintUsed(false);
    setShowHint(false);
    setFeedback(null);
    setFlashType(null);
    setTimeLeft(gameData.timeLimitSeconds);
    setMissionStartTime(Date.now());
  }, []);

  function triggerFlash(type: 'correct' | 'wrong') {
    setFlashType(null);
    requestAnimationFrame(() => setFlashType(type));
    setTimeout(() => setFlashType(null), 600);
  }

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
        handleWrongAnswer(`Got: "${result}" \u2014 Expected: "${mission.expectedOutput}"`);
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
    triggerFlash('correct');

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
    triggerFlash('wrong');

    if (newLives <= 0) {
      setTimeout(() => setPhase('gameover'), 1500);
    } else {
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

  function handleRestart() {
    setMissionIndex(0);
    setScore(0);
    setLives(gameData.startingLives);
    setCombo(0);
    startMission();
  }

  /* ── INTRO SCREEN ──────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <ScanLines />
        <GridOverlay />
        <div className="max-w-lg w-full relative z-10 cc-fade-in">
          <div className="bg-gray-900/90 border border-green-800/50 rounded-xl shadow-2xl shadow-green-900/20 p-8 text-center backdrop-blur-sm cc-glow relative overflow-hidden">
            <CornerBrackets />

            {/* Classified stamp */}
            {showIntroStamp && (
              <div className="absolute top-6 right-4 cc-stamp pointer-events-none select-none">
                <div className="border-2 border-red-500/70 text-red-500/70 font-mono text-xs font-bold px-3 py-1 rounded tracking-widest">
                  TOP SECRET
                </div>
              </div>
            )}

            {/* Agency logo */}
            <div className="mb-4 relative inline-block">
              <div className="w-20 h-20 rounded-full border-2 border-green-500/40 flex items-center justify-center mx-auto relative">
                <div className="w-16 h-16 rounded-full border border-green-600/30 flex items-center justify-center bg-green-950/40">
                  <span className="text-3xl">🔐</span>
                </div>
                <div className="absolute inset-0 rounded-full border border-green-400/20 cc-spin" style={{ borderTopColor: 'rgba(34, 197, 94, 0.5)' }} />
              </div>
            </div>

            <div className="text-green-600/60 font-mono text-[10px] tracking-[0.3em] mb-1">
              PYTHON INTELLIGENCE AGENCY
            </div>
            <h1 className="text-2xl font-bold text-green-400 font-mono mb-1 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {gameData.title}
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto my-3" />
            <p className="text-green-300/60 font-mono text-xs mb-6 leading-relaxed max-w-sm mx-auto">
              {gameData.description}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { val: totalMissions, label: 'MISSIONS', icon: '📋' },
                { val: gameData.startingLives, label: 'LIVES', icon: '💚' },
                { val: `${gameData.timeLimitSeconds}s`, label: 'PER MISSION', icon: '⏱' },
              ].map((item) => (
                <div key={item.label} className="bg-black/40 rounded-lg p-3 border border-green-900/30 relative">
                  <CornerBrackets />
                  <div className="text-[10px] mb-1">{item.icon}</div>
                  <div className="text-xl font-bold text-green-400 font-mono">{item.val}</div>
                  <div className="text-[9px] text-green-600/70 font-mono tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Mission difficulty breakdown */}
            <div className="flex justify-center gap-4 mb-5">
              {[
                { label: 'EASY', count: gameData.missions.filter(m => m.difficulty === 'easy').length, color: 'text-green-500' },
                { label: 'MEDIUM', count: gameData.missions.filter(m => m.difficulty === 'medium').length, color: 'text-yellow-500' },
                { label: 'HARD', count: gameData.missions.filter(m => m.difficulty === 'hard').length, color: 'text-red-500' },
              ].map((d) => (
                <div key={d.label} className="font-mono text-[10px] tracking-wider">
                  <span className={`${d.color} font-bold`}>{d.count}</span>
                  <span className="text-gray-500 ml-1">{d.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={startMission}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-sm tracking-[0.2em] shadow-lg shadow-green-900/40 hover:shadow-green-700/50 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">[ INITIATE MISSION ]</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
        <GridOverlay />
        <div className="max-w-lg w-full relative z-10 cc-fade-in">
          <div className="bg-gray-900/90 border border-green-800/50 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm cc-glow relative">
            <CornerBrackets />

            <div className="absolute top-5 right-4 cc-stamp pointer-events-none select-none">
              <div className="border-2 border-green-500/70 text-green-500/70 font-mono text-xs font-bold px-3 py-1 rounded tracking-widest">
                MISSION CLEAR
              </div>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-green-400/50 flex items-center justify-center mx-auto mb-4 bg-green-950/30">
              <span className="text-4xl">🏆</span>
            </div>

            <div className="text-green-600/60 font-mono text-[10px] tracking-[0.3em] mb-1">STATUS REPORT</div>
            <h1 className="text-2xl font-bold text-green-400 font-mono mb-1 tracking-wider">
              MISSION COMPLETE
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto my-3" />
            <p className="text-green-300/60 font-mono text-xs mb-6">
              All transmissions decoded. Outstanding work, Agent.
            </p>

            {/* Mission progress (all complete) */}
            <div className="flex justify-center mb-5">
              <MissionProgress current={totalMissions} total={totalMissions} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 rounded-lg p-4 border border-green-900/30 relative cc-count-pop" style={{ animationDelay: '0.1s' }}>
                <CornerBrackets />
                <div className="text-green-600/60 font-mono text-[9px] tracking-widest mb-1">TOTAL SCORE</div>
                <div className="text-3xl font-bold text-green-400 font-mono">{score}</div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-emerald-900/30 relative cc-count-pop" style={{ animationDelay: '0.3s' }}>
                <CornerBrackets />
                <div className="text-emerald-600/60 font-mono text-[9px] tracking-widest mb-1">XP EARNED</div>
                <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">[ REPLAY MISSIONS ]</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-red-950/20 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        <ScanLines />
        <GridOverlay />
        <div className="max-w-lg w-full relative z-10 cc-fade-in">
          <div className="bg-gray-900/90 border border-red-800/40 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm relative" style={{ boxShadow: '0 0 40px rgba(239,68,68,0.1)' }}>
            <CornerBrackets color="red" />

            <div className="absolute top-5 right-4 cc-stamp pointer-events-none select-none">
              <div className="border-2 border-red-500/70 text-red-500/70 font-mono text-xs font-bold px-3 py-1 rounded tracking-widest">
                COMPROMISED
              </div>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-red-500/30 flex items-center justify-center mx-auto mb-4 bg-red-950/20">
              <span className="text-4xl">💀</span>
            </div>

            <div className="text-red-600/60 font-mono text-[10px] tracking-[0.3em] mb-1">STATUS REPORT</div>
            <h1 className="text-2xl font-bold text-red-400 font-mono mb-1 tracking-wider">
              COVER BLOWN
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mx-auto my-3" />
            <p className="text-red-300/60 font-mono text-xs mb-4">
              Mission failed. You decoded {missionIndex} of {totalMissions} transmissions.
            </p>

            {/* Mission progress (partial) */}
            <div className="flex justify-center mb-5">
              <MissionProgress current={missionIndex} total={totalMissions} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 rounded-lg p-4 border border-red-900/30 relative">
                <CornerBrackets color="red" />
                <div className="text-red-600/60 font-mono text-[9px] tracking-widest mb-1">SCORE</div>
                <div className="text-3xl font-bold text-red-400 font-mono">{score}</div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-emerald-900/30 relative">
                <CornerBrackets />
                <div className="text-emerald-600/60 font-mono text-[9px] tracking-widest mb-1">XP EARNED</div>
                <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">[ RETRY MISSION ]</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── NEXT MISSION TRANSITION ───────────────────────────────────── */
  if (phase === 'nextMission') {
    const nextMission = gameData.missions[missionIndex + 1];
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-green-950 flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <ScanLines />
        <GridOverlay />
        <div className="max-w-lg w-full relative z-10 cc-slide-up">
          <div className="bg-gray-900/90 border border-green-800/50 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm cc-glow relative">
            <CornerBrackets />

            {/* Radar / signal icon */}
            <div className="w-16 h-16 rounded-full border-2 border-green-500/30 flex items-center justify-center mx-auto mb-4 relative">
              <span className="text-2xl">📡</span>
              <div className="absolute inset-0 rounded-full border border-green-400/20 cc-spin" style={{ borderTopColor: 'rgba(34, 197, 94, 0.4)' }} />
            </div>

            <div className="text-green-600/60 font-mono text-[10px] tracking-[0.3em] mb-1">SIGNAL INTERCEPTED</div>
            <h2 className="text-xl font-bold text-green-400 font-mono mb-1 tracking-wider">
              TRANSMISSION DECODED
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto my-3" />

            {/* Progress */}
            <div className="flex justify-center mb-4">
              <MissionProgress current={missionIndex + 1} total={totalMissions} />
            </div>

            {/* Next mission preview */}
            {nextMission && (
              <div className="bg-black/30 rounded-lg p-3 border border-green-900/20 mb-5 text-left">
                <div className="text-green-600/50 font-mono text-[9px] tracking-widest mb-1">NEXT TARGET</div>
                <div className="flex items-center justify-between">
                  <span className="text-green-300/80 font-mono text-sm font-bold">{nextMission.codeName}</span>
                  <DifficultyBadge difficulty={nextMission.difficulty} />
                </div>
              </div>
            )}

            <button
              onClick={handleNextMission}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">[ NEXT MISSION ]</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
      <GridOverlay />
      <ScreenFlash type={flashType} />

      {/* ─── Top bar ─── */}
      <div className="relative z-10 bg-gray-900/80 border-b border-green-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-4">
            <LivesDisplay lives={lives} max={gameData.startingLives} />
            {combo > 1 && (
              <span className="text-yellow-400 font-mono text-xs font-bold cc-animate-pulse flex items-center gap-1">
                <span className="text-yellow-500">⚡</span>
                {gameData.comboMultipliers[Math.min(combo - 1, gameData.comboMultipliers.length - 1)]}x
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-700 font-mono text-[10px] tracking-wider">SCORE</span>
            <span className="text-green-400 font-mono font-bold text-lg">{score}</span>
          </div>

          <div className="flex items-center gap-4">
            <MissionProgress current={missionIndex} total={totalMissions} />
            <span className={`font-mono font-bold text-lg tabular-nums min-w-[3ch] text-right ${
              timeLeft <= 10 ? 'text-red-400 cc-animate-pulse' : timeLeft <= 30 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        {/* Timer progress bar */}
        <TimerBar timeLeft={timeLeft} maxTime={gameData.timeLimitSeconds} />
      </div>

      {/* ─── Mission content ─── */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-2xl w-full space-y-4 cc-slide-up">
          {/* Mission header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-950/60 border border-green-800/30 flex items-center justify-center font-mono text-green-500 text-sm font-bold">
                {mission.id}
              </div>
              <div>
                <h2 className="text-lg font-bold text-green-400 font-mono tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {mission.codeName}
                </h2>
                <ConceptTags concepts={mission.concepts} />
              </div>
            </div>
            <DifficultyBadge difficulty={mission.difficulty} />
          </div>

          {/* Briefing */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-900/20 relative">
            <CornerBrackets />
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 cc-animate-pulse" />
              <span className="text-green-600/70 font-mono text-[10px] tracking-[0.2em]">MISSION BRIEFING</span>
            </div>
            <p className="text-green-300/80 font-mono text-sm leading-relaxed">
              {mission.briefing}
            </p>
          </div>

          {/* Encoded message terminal */}
          <div className="bg-black/80 rounded-lg border border-green-800/40 shadow-inner overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/60 border-b border-green-900/20">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-green-700/60 font-mono text-[10px] ml-2 tracking-wider">intercepted_message.py</span>
              <span className="ml-auto text-green-800/40 font-mono text-[9px]">ENCRYPTED</span>
            </div>
            {/* Terminal content */}
            <div className="p-4">
              {mission.extraVariables ? (
                <div className="font-mono text-sm space-y-0.5">
                  {Object.entries(mission.extraVariables).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-green-600">{k}</span>
                      <span className="text-green-700"> = </span>
                      <span className="text-yellow-300">{JSON.stringify(v)}</span>
                    </div>
                  ))}
                  <div className="text-green-700/40 mt-2 cc-cursor"># Produce the decoded output using these variables</div>
                </div>
              ) : (
                <div className="font-mono text-sm">
                  <span className="text-green-600">{mission.variableName}</span>
                  <span className="text-green-700"> = </span>
                  <span className="text-yellow-300">"{mission.encodedMessage}"</span>
                  <span className="cc-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="bg-gray-800/30 rounded-lg p-4 border border-green-900/20 relative">
            <CornerBrackets />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
              <span className="text-green-600/70 font-mono text-[10px] tracking-[0.2em]">YOUR PYTHON EXPRESSION</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600/50 font-mono text-sm select-none">{'>>>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`e.g. ${mission.variableName}.lower()`}
                  className="w-full bg-black/60 text-green-300 font-mono text-sm pl-12 pr-4 py-3 rounded-lg border border-green-900/40 focus:border-green-500/60 focus:outline-none placeholder-green-800/30 transition-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  disabled={phase !== 'playing' || feedback?.type === 'wrong'}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || feedback?.type === 'wrong'}
                className={`px-6 py-3 rounded-lg font-mono font-bold text-sm tracking-wider transition-all ${
                  !input.trim() || feedback?.type === 'wrong'
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                    : 'bg-green-600 hover:bg-green-500 text-black hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/30'
                }`}
              >
                DECODE
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`rounded-lg p-3 font-mono text-sm border cc-slide-up ${
                feedback.type === 'correct'
                  ? 'bg-green-900/30 text-green-300 border-green-700/40'
                  : 'bg-red-900/30 text-red-300 border-red-700/40'
              }`}
            >
              <span className="font-bold">
                {feedback.type === 'correct' ? '[ DECODED ] ' : '[ FAILED ] '}
              </span>
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
                className="text-green-700/60 hover:text-green-500 font-mono text-[11px] transition-colors tracking-wider hover:tracking-[0.15em]"
              >
                [ REQUEST INTEL (-{gameData.hintPenalty} pts) ]
              </button>
            ) : (
              <div className="bg-yellow-900/15 rounded-lg px-4 py-2 border border-yellow-800/20 font-mono text-xs text-yellow-400/70 cc-slide-up flex items-center gap-2">
                <span className="text-yellow-500/50">INTEL:</span>
                {mission.hint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
