import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface TestCase {
  call: string;
  args: any[];
  expected: any;
  expectedDisplay: string;
}

interface RobotModule {
  id: number;
  partName: string;
  partEmoji: string;
  description: string;
  functionName: string;
  params: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
  testCases: TestCase[];
  hint: string;
  starterCode: string;
  exampleAnswer: string;
  specs: string[];
}

interface WorkshopData {
  id: string;
  title: string;
  description: string;
  modules: RobotModule[];
  pointsPerModule: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

type GamePhase = 'intro' | 'playing' | 'checking' | 'moduleResult' | 'victory' | 'gameover';

interface TestResult {
  testCase: TestCase;
  actual: any;
  actualDisplay: string;
  passed: boolean;
  error?: string;
}

// ─── Game Data ──────────────────────────────────────────────────────────────────

const workshopData: WorkshopData = {
  id: 'robot-commander-module-7',
  title: 'Robot Commander',
  description: 'Build your robot by programming each module with Python functions!',
  pointsPerModule: 100,
  timeBonusMax: 50,
  timeLimitSeconds: 120,
  comboMultipliers: [1, 1.5, 2, 2.5, 3],
  startingLives: 3,
  hintPenalty: 25,
  baseXP: 200,
  bonusXP: 300,
  modules: [
    {
      id: 1,
      partName: 'Voice Box',
      partEmoji: '🔊',
      description: 'Install the voice module so the robot can speak.',
      functionName: 'greet',
      params: '',
      difficulty: 'easy',
      concepts: ['def', 'return'],
      specs: [
        'Function: greet()',
        'Takes no parameters',
        'Returns the string "Hello, Robot!"',
      ],
      testCases: [
        { call: 'greet()', args: [], expected: 'Hello, Robot!', expectedDisplay: '"Hello, Robot!"' },
      ],
      hint: 'Use def greet(): and return the string directly with return "Hello, Robot!"',
      starterCode: 'def greet():\n    ',
      exampleAnswer: 'def greet():\n    return "Hello, Robot!"',
    },
    {
      id: 2,
      partName: 'Name Recognition',
      partEmoji: '👁️',
      description: 'Upgrade the voice to greet people by name.',
      functionName: 'greet',
      params: 'name',
      difficulty: 'easy',
      concepts: ['parameters', 'string concatenation'],
      specs: [
        'Function: greet(name)',
        'Takes a name parameter',
        'Should return a greeting like "Hello, Commander!"',
      ],
      testCases: [
        { call: 'greet("Commander")', args: ['Commander'], expected: 'Hello, Commander!', expectedDisplay: '"Hello, Commander!"' },
        { call: 'greet("Alex")', args: ['Alex'], expected: 'Hello, Alex!', expectedDisplay: '"Hello, Alex!"' },
      ],
      hint: 'Use string concatenation: return "Hello, " + name + "!"',
      starterCode: 'def greet(name):\n    ',
      exampleAnswer: 'def greet(name):\n    return "Hello, " + name + "!"',
    },
    {
      id: 3,
      partName: 'Power Core',
      partEmoji: '⚡',
      description: 'Install the power calculator for energy management.',
      functionName: 'add',
      params: 'a, b',
      difficulty: 'easy',
      concepts: ['multiple parameters', 'return values'],
      specs: [
        'Function: add(a, b)',
        'Takes two numbers a and b',
        'Should return the result of adding them together',
      ],
      testCases: [
        { call: 'add(3, 5)', args: [3, 5], expected: 8, expectedDisplay: '8' },
        { call: 'add(-1, 1)', args: [-1, 1], expected: 0, expectedDisplay: '0' },
        { call: 'add(10, 20)', args: [10, 20], expected: 30, expectedDisplay: '30' },
      ],
      hint: 'Simply return a + b',
      starterCode: 'def add(a, b):\n    ',
      exampleAnswer: 'def add(a, b):\n    return a + b',
    },
    {
      id: 4,
      partName: 'Thruster System',
      partEmoji: '🚀',
      description: 'Program the launch system with configurable speed.',
      functionName: 'launch',
      params: 'destination, speed=100',
      difficulty: 'medium',
      concepts: ['default parameters', 'str()'],
      specs: [
        'Function: launch(destination, speed=100)',
        'speed defaults to 100 if not given',
        'Should return a string like "Mars at speed 100"',
      ],
      testCases: [
        { call: 'launch("Mars")', args: ['Mars'], expected: 'Mars at speed 100', expectedDisplay: '"Mars at speed 100"' },
        { call: 'launch("Moon", 50)', args: ['Moon', 50], expected: 'Moon at speed 50', expectedDisplay: '"Moon at speed 50"' },
        { call: 'launch("Venus", 200)', args: ['Venus', 200], expected: 'Venus at speed 200', expectedDisplay: '"Venus at speed 200"' },
      ],
      hint: 'Use a default parameter: def launch(destination, speed=100): and return destination + " at speed " + str(speed)',
      starterCode: 'def launch(destination, speed=100):\n    ',
      exampleAnswer: 'def launch(destination, speed=100):\n    return destination + " at speed " + str(speed)',
    },
    {
      id: 5,
      partName: 'Health Monitor',
      partEmoji: '💗',
      description: 'Add a damage assessment system to monitor robot health.',
      functionName: 'status',
      params: 'health',
      difficulty: 'medium',
      concepts: ['conditionals in functions', 'multiple return paths'],
      specs: [
        'Function: status(health)',
        'Check the health value and return a status label',
        'Low health → worse status, high health → better status',
        'Use the test cases below to figure out the thresholds',
      ],
      testCases: [
        { call: 'status(10)', args: [10], expected: 'Critical', expectedDisplay: '"Critical"' },
        { call: 'status(30)', args: [30], expected: 'Damaged', expectedDisplay: '"Damaged"' },
        { call: 'status(60)', args: [60], expected: 'Operational', expectedDisplay: '"Operational"' },
        { call: 'status(90)', args: [90], expected: 'Perfect', expectedDisplay: '"Perfect"' },
      ],
      hint: 'Use if/elif/else with a return statement in each branch',
      starterCode: 'def status(health):\n    ',
      exampleAnswer: 'def status(health):\n    if health < 25:\n        return "Critical"\n    elif health < 50:\n        return "Damaged"\n    elif health < 75:\n        return "Operational"\n    else:\n        return "Perfect"',
    },
    {
      id: 6,
      partName: 'Cargo Bay',
      partEmoji: '📦',
      description: 'Install inventory tracking for the cargo hold.',
      functionName: 'count_items',
      params: 'items',
      difficulty: 'medium',
      concepts: ['list parameters', 'len()'],
      specs: [
        'Function: count_items(items)',
        'Takes a list called items',
        'Should return how many items are in the list',
      ],
      testCases: [
        { call: 'count_items(["fuel", "ammo"])', args: [['fuel', 'ammo']], expected: 2, expectedDisplay: '2' },
        { call: 'count_items([])', args: [[]], expected: 0, expectedDisplay: '0' },
        { call: 'count_items(["a", "b", "c"])', args: [['a', 'b', 'c']], expected: 3, expectedDisplay: '3' },
      ],
      hint: 'Use return len(items) to return the length of the list',
      starterCode: 'def count_items(items):\n    ',
      exampleAnswer: 'def count_items(items):\n    return len(items)',
    },
    {
      id: 7,
      partName: 'Navigation Chip',
      partEmoji: '🧭',
      description: 'Program directional movement for the robot.',
      functionName: 'navigate',
      params: 'x, y, direction',
      difficulty: 'hard',
      concepts: ['tuple return values', 'complex conditionals'],
      specs: [
        'Function: navigate(x, y, direction)',
        'direction is "north", "south", "east", or "west"',
        'North → y+1, South → y-1',
        'East → x+1, West → x-1',
        'Returns the new (x, y) as a tuple',
      ],
      testCases: [
        { call: 'navigate(0, 0, "north")', args: [0, 0, 'north'], expected: [0, 1], expectedDisplay: '(0, 1)' },
        { call: 'navigate(3, 2, "west")', args: [3, 2, 'west'], expected: [2, 2], expectedDisplay: '(2, 2)' },
        { call: 'navigate(1, 1, "south")', args: [1, 1, 'south'], expected: [1, 0], expectedDisplay: '(1, 0)' },
        { call: 'navigate(0, 0, "east")', args: [0, 0, 'east'], expected: [1, 0], expectedDisplay: '(1, 0)' },
      ],
      hint: 'Use if/elif to check direction and modify x or y, then return (x, y)',
      starterCode: 'def navigate(x, y, direction):\n    ',
      exampleAnswer: 'def navigate(x, y, direction):\n    if direction == "north":\n        y = y + 1\n    elif direction == "south":\n        y = y - 1\n    elif direction == "east":\n        x = x + 1\n    elif direction == "west":\n        x = x - 1\n    return (x, y)',
    },
    {
      id: 8,
      partName: 'Command Center',
      partEmoji: '🎛️',
      description: 'Install the final brain module — full mission reporting.',
      functionName: 'mission_report',
      params: 'crew_count, fuel=100, destination="Mars"',
      difficulty: 'hard',
      concepts: ['default params', 'early return', 'string formatting'],
      specs: [
        'Function: mission_report(crew_count, fuel=100, destination="Mars")',
        'Should abort if there is no crew or fuel is dangerously low',
        'Otherwise build a report string (check the test cases for the format)',
      ],
      testCases: [
        { call: 'mission_report(0)', args: [0], expected: 'ABORT', expectedDisplay: '"ABORT"' },
        { call: 'mission_report(5, 5)', args: [5, 5], expected: 'ABORT', expectedDisplay: '"ABORT"' },
        { call: 'mission_report(3)', args: [3], expected: '3 crew heading to Mars with 100% fuel', expectedDisplay: '"3 crew heading to Mars with 100% fuel"' },
        { call: 'mission_report(2, 80, "Jupiter")', args: [2, 80, 'Jupiter'], expected: '2 crew heading to Jupiter with 80% fuel', expectedDisplay: '"2 crew heading to Jupiter with 80% fuel"' },
      ],
      hint: 'First check if crew_count == 0 or fuel < 10 and return "ABORT". Then return the formatted string using str() for numbers.',
      starterCode: 'def mission_report(crew_count, fuel=100, destination="Mars"):\n    ',
      exampleAnswer: 'def mission_report(crew_count, fuel=100, destination="Mars"):\n    if crew_count == 0 or fuel < 10:\n        return "ABORT"\n    return str(crew_count) + " crew heading to " + destination + " with " + str(fuel) + "% fuel"',
    },
  ],
};

// ─── Python → JS Converter ──────────────────────────────────────────────────────

function convertPythonToJS(code: string, functionName: string): string {
  const lines = code.replace(/\r\n/g, '\n').split('\n');
  let defParams = '';
  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('def ')) {
      const match = trimmed.match(/def\s+\w+\(([^)]*)\)\s*:/);
      if (match) {
        defParams = match[1].replace(/'/g, '"');
      }
      bodyStartIndex = i + 1;
      break;
    }
  }

  const bodyLines: { indent: number; code: string }[] = [];

  for (let i = bodyStartIndex; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);
    if (indent < 0) continue;

    let jsLine = trimmed;

    jsLine = jsLine.replace(/^elif\s+(.+):$/, (_, cond) => `} else if (${convertCondition(cond)}) {`);
    jsLine = jsLine.replace(/^if\s+(.+):$/, (_, cond) => `if (${convertCondition(cond)}) {`);
    jsLine = jsLine.replace(/^else\s*:$/, '} else {');

    jsLine = jsLine.replace(/^return\s+\(([^)]+)\)\s*$/, 'return [$1];');

    if (jsLine.match(/^return\s+.+,\s*.+/) && !jsLine.includes('[')) {
      jsLine = jsLine.replace(/^return\s+(.+)$/, (_, vals) => `return [${vals}];`);
    }

    jsLine = jsLine.replace(/f"([^"]*)"/g, (_, inner) => {
      const converted = inner.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + converted + '`';
    });
    jsLine = jsLine.replace(/f'([^']*)'/g, (_, inner) => {
      const converted = inner.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + converted + '`';
    });

    jsLine = jsLine.replace(/\blen\(([^)]+)\)/g, '$1.length');
    jsLine = jsLine.replace(/\bstr\(([^)]+)\)/g, 'String($1)');
    jsLine = jsLine.replace(/\bint\(([^)]+)\)/g, 'Math.floor(Number($1))');

    jsLine = jsLine.replace(/\band\b/g, '&&');
    jsLine = jsLine.replace(/\bor\b/g, '||');
    jsLine = jsLine.replace(/\bnot\s+/g, '!');
    jsLine = jsLine.replace(/\bTrue\b/g, 'true');
    jsLine = jsLine.replace(/\bFalse\b/g, 'false');
    jsLine = jsLine.replace(/\bNone\b/g, 'null');

    if ((jsLine.startsWith('return ') || jsLine.includes(' = ')) && !jsLine.endsWith('{') && !jsLine.endsWith(';')) {
      jsLine += ';';
    }

    bodyLines.push({ indent, code: jsLine });
  }

  const jsBody = buildJSBody(bodyLines);
  return `function ${functionName}(${defParams}) {\n${jsBody}\n}`;
}

function convertCondition(cond: string): string {
  let js = cond;
  js = js.replace(/\band\b/g, '&&');
  js = js.replace(/\bor\b/g, '||');
  js = js.replace(/\bnot\s+/g, '!');
  js = js.replace(/\bTrue\b/g, 'true');
  js = js.replace(/\bFalse\b/g, 'false');
  return js;
}

function buildJSBody(lines: { indent: number; code: string }[]): string {
  if (lines.length === 0) return '';

  const result: string[] = [];
  const minIndent = Math.min(...lines.map(l => l.indent));
  const indentStack: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const normalizedIndent = lines[i].indent - minIndent;
    const code = lines[i].code;

    while (indentStack.length > 0 && normalizedIndent <= indentStack[indentStack.length - 1]) {
      if (code.startsWith('} else')) {
        indentStack.pop();
        break;
      }
      indentStack.pop();
      result.push('  '.repeat(indentStack.length + 1) + '}');
    }

    const jsIndent = '  '.repeat(indentStack.length + 1);
    result.push(jsIndent + code);

    if (code.endsWith('{')) {
      indentStack.push(normalizedIndent);
    }
  }

  while (indentStack.length > 0) {
    indentStack.pop();
    result.push('  '.repeat(indentStack.length + 1) + '}');
  }

  return result.join('\n');
}

function compareResults(actual: any, expected: any): boolean {
  if (Array.isArray(expected)) {
    return Array.isArray(actual) &&
      actual.length === expected.length &&
      actual.every((v: any, i: number) => v === expected[i]);
  }
  if (typeof expected === 'string') return String(actual) === expected;
  if (typeof expected === 'number') return actual === expected;
  return actual === expected;
}

function formatActual(val: any): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'None';
  if (Array.isArray(val)) return `(${val.join(', ')})`;
  if (typeof val === 'string') return `"${val}"`;
  return String(val);
}

function runTests(code: string, mod: RobotModule): TestResult[] {
  let jsFunction: string;
  try {
    jsFunction = convertPythonToJS(code, mod.functionName);
  } catch {
    return mod.testCases.map(tc => ({
      testCase: tc, actual: undefined, actualDisplay: 'Error', passed: false,
      error: 'Could not parse your function. Check your syntax!',
    }));
  }

  return mod.testCases.map(tc => {
    try {
      const argsStr = tc.args.map(a => JSON.stringify(a)).join(', ');
      const fullCode = `${jsFunction}\nreturn ${mod.functionName}(${argsStr});`;
      const fn = new Function(fullCode);
      const actual = fn();
      const passed = compareResults(actual, tc.expected);
      return { testCase: tc, actual, actualDisplay: formatActual(actual), passed };
    } catch (err: any) {
      return { testCase: tc, actual: undefined, actualDisplay: 'Error', passed: false, error: err.message };
    }
  });
}

// ─── Robot SVG ──────────────────────────────────────────────────────────────────

function RobotBody({ installedCount }: { installedCount: number }) {
  // Parts light up as they're installed (0-8)
  const on = (partIndex: number) => partIndex < installedCount;
  const fill = (partIndex: number) => on(partIndex) ? '#3b82f6' : '#e2e8f0';
  const glow = (partIndex: number) => on(partIndex) ? 'drop-shadow(0 0 4px rgba(59,130,246,0.5))' : 'none';

  return (
    <svg width="120" height="160" viewBox="0 0 120 160" className="mx-auto">
      {/* Antenna — Command Center (8) */}
      <line x1="60" y1="5" x2="60" y2="20" stroke={fill(7)} strokeWidth="3" style={{ filter: glow(7) }} />
      <circle cx="60" cy="5" r="4" fill={fill(7)} style={{ filter: glow(7) }} />

      {/* Head */}
      <rect x="35" y="20" width="50" height="35" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Eyes — Name Recognition (2) */}
      <circle cx="48" cy="35" r="5" fill={fill(1)} style={{ filter: glow(1) }} />
      <circle cx="72" cy="35" r="5" fill={fill(1)} style={{ filter: glow(1) }} />
      {/* Mouth — Voice Box (1) */}
      <rect x="45" y="44" width="30" height="4" rx="2" fill={fill(0)} style={{ filter: glow(0) }} />

      {/* Body */}
      <rect x="25" y="58" width="70" height="55" rx="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Power Core (3) — center chest */}
      <circle cx="60" cy="75" r="8" fill={fill(2)} stroke={on(2) ? '#2563eb' : '#94a3b8'} strokeWidth="1.5" style={{ filter: glow(2) }} />
      {/* Health Monitor (5) — small heart icon area */}
      <rect x="32" y="65" width="14" height="10" rx="2" fill={fill(4)} style={{ filter: glow(4) }} />
      {/* Navigation Chip (7) — small chip area */}
      <rect x="74" y="65" width="14" height="10" rx="2" fill={fill(6)} style={{ filter: glow(6) }} />
      {/* Cargo Bay (6) — lower body */}
      <rect x="35" y="90" width="50" height="16" rx="3" fill={fill(5)} stroke={on(5) ? '#2563eb' : '#94a3b8'} strokeWidth="1" style={{ filter: glow(5) }} />

      {/* Left Arm — Thruster (4) */}
      <rect x="8" y="62" width="14" height="40" rx="4" fill={fill(3)} stroke={on(3) ? '#2563eb' : '#94a3b8'} strokeWidth="1" style={{ filter: glow(3) }} />

      {/* Right Arm */}
      <rect x="98" y="62" width="14" height="40" rx="4" fill={fill(3)} stroke={on(3) ? '#2563eb' : '#94a3b8'} strokeWidth="1" style={{ filter: glow(3) }} />

      {/* Legs */}
      <rect x="35" y="116" width="18" height="35" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="67" y="116" width="18" height="35" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Feet */}
      <rect x="30" y="147" width="28" height="8" rx="3" fill="#94a3b8" />
      <rect x="62" y="147" width="28" height="8" rx="3" fill="#94a3b8" />
    </svg>
  );
}

// ─── Visual Sub-components ──────────────────────────────────────────────────────

function ScreenFlash({ type }: { type: 'correct' | 'wrong' | null }) {
  if (!type) return null;
  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${
      type === 'correct' ? 'animate-rc-flash-correct' : 'animate-rc-flash-red'
    }`} />
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { label: 'EASY', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
    medium: { label: 'MEDIUM', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
    hard: { label: 'HARD', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300' },
  };
  const c = config[difficulty];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}

function TimerBar({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) {
  const pct = (timeLeft / maxTime) * 100;
  const color =
    pct > 50 ? 'bg-blue-500'
    : pct > 20 ? 'bg-amber-500'
    : 'bg-red-500';

  return (
    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function PartsChecklist({ modules, currentIndex, completedParts }: { modules: RobotModule[]; currentIndex: number; completedParts: Set<number> }) {
  return (
    <div className="space-y-1">
      {modules.map((mod, i) => {
        const done = completedParts.has(i);
        const active = i === currentIndex;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 text-xs px-2 py-1 rounded transition-all ${
              done ? 'text-green-600 bg-green-50' :
              active ? 'text-blue-700 bg-blue-50 font-semibold' :
              'text-slate-400'
            }`}
          >
            <span className="w-4 text-center">
              {done ? '✓' : active ? '▸' : '○'}
            </span>
            <span>{mod.partEmoji}</span>
            <span>{mod.partName}</span>
          </div>
        );
      })}
    </div>
  );
}

function BlueprintPanel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rc-panel rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-200 bg-slate-50/80">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-blue-500">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
        </svg>
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-medium">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Main Game Component ────────────────────────────────────────────────────────

export function RobotCommanderGame() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [moduleIndex, setModuleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(workshopData.startingLives);
  const [combo, setCombo] = useState(0);
  const [code, setCode] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workshopData.timeLimitSeconds);
  const [moduleStartTime, setModuleStartTime] = useState(0);
  const [flashType, setFlashType] = useState<'correct' | 'wrong' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedParts, setCompletedParts] = useState<Set<number>>(new Set());

  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [checkingIndex, setCheckingIndex] = useState(-1);
  const [allPassed, setAllPassed] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentModule = workshopData.modules[moduleIndex];
  const maxScore = workshopData.modules.length * (workshopData.pointsPerModule + workshopData.timeBonusMax);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) { handleTimerExpired(); return; }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === 'playing' && textareaRef.current) textareaRef.current.focus();
  }, [phase, moduleIndex]);

  useEffect(() => {
    if (phase !== 'checking') return;
    if (checkingIndex < 0) return;
    if (checkingIndex >= testResults.length) {
      const timer = setTimeout(() => {
        const passed = testResults.every(r => r.passed);
        setAllPassed(passed);
        if (passed) handleModulePassed();
        else handleModuleFailed();
      }, 600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCheckingIndex(i => i + 1), 700);
    return () => clearTimeout(timer);
  }, [phase, checkingIndex, testResults]);

  const triggerFlash = useCallback((type: 'correct' | 'wrong') => {
    setFlashType(type);
    setTimeout(() => setFlashType(null), 800);
  }, []);

  function calculateXP(finalScore: number, isGameOver: boolean) {
    const percentage = Math.min(100, (finalScore / maxScore) * 100);
    const bonus = Math.round((percentage / 100) * workshopData.bonusXP);
    const total = workshopData.baseXP + bonus;
    return isGameOver ? Math.round(total * 0.5) : total;
  }

  function startGame() {
    setPhase('playing');
    setModuleIndex(0);
    setScore(0);
    setLives(workshopData.startingLives);
    setCombo(0);
    setCode(workshopData.modules[0].starterCode);
    setHintUsed(false);
    setShowHint(false);
    setTimeLeft(workshopData.timeLimitSeconds);
    setModuleStartTime(Date.now());
    setErrorMessage('');
    setTestResults([]);
    setCheckingIndex(-1);
    setCompletedParts(new Set());
  }

  function handleSubmit() {
    if (!code.trim()) return;
    setErrorMessage('');

    if (!code.includes('def ')) {
      setErrorMessage('Your code must define a function using "def"!');
      return;
    }

    const results = runTests(code, currentModule);
    if (results.length > 0 && results[0].error && results.every(r => r.error === results[0].error)) {
      setErrorMessage(results[0].error!);
      return;
    }

    setTestResults(results);
    setCheckingIndex(0);
    setPhase('checking');
  }

  function handleModulePassed() {
    const newCombo = combo + 1;
    const multiplierIdx = Math.min(newCombo - 1, workshopData.comboMultipliers.length - 1);
    const multiplier = workshopData.comboMultipliers[multiplierIdx];
    const elapsed = (Date.now() - moduleStartTime) / 1000;
    const timeBonus = Math.max(0, Math.round(workshopData.timeBonusMax * (1 - elapsed / workshopData.timeLimitSeconds)));
    const hintDeduction = hintUsed ? workshopData.hintPenalty : 0;
    const points = Math.round((workshopData.pointsPerModule + timeBonus - hintDeduction) * multiplier);

    const newScore = score + points;
    setScore(newScore);
    setCombo(newCombo);
    setCompletedParts(prev => new Set([...prev, moduleIndex]));
    triggerFlash('correct');

    if (moduleIndex >= workshopData.modules.length - 1) {
      setTimeout(() => setPhase('victory'), 1500);
    } else {
      setTimeout(() => setPhase('moduleResult'), 1500);
    }
  }

  function handleModuleFailed() {
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    triggerFlash('wrong');

    if (newLives <= 0) {
      setTimeout(() => setPhase('gameover'), 1500);
    } else {
      setTimeout(() => setPhase('moduleResult'), 1500);
    }
  }

  function handleTimerExpired() {
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    triggerFlash('wrong');
    if (newLives <= 0) {
      setPhase('gameover');
    } else {
      setTimeLeft(workshopData.timeLimitSeconds);
      setModuleStartTime(Date.now());
    }
  }

  function advanceToNextModule() {
    const nextIdx = moduleIndex + 1;
    if (nextIdx >= workshopData.modules.length) {
      setPhase('victory');
    } else {
      setModuleIndex(nextIdx);
      setCode(workshopData.modules[nextIdx].starterCode);
      setHintUsed(false);
      setShowHint(false);
      setTimeLeft(workshopData.timeLimitSeconds);
      setModuleStartTime(Date.now());
      setErrorMessage('');
      setTestResults([]);
      setCheckingIndex(-1);
      setPhase('playing');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => { target.selectionStart = target.selectionEnd = start + 4; }, 0);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative rc-blueprint-bg">
      <ScreenFlash type={flashType} />

      {/* ─── INTRO ─── */}
      {phase === 'intro' && (
        <div className="max-w-2xl w-full animate-rc-fade-in relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Robot preview */}
            <div className="flex-shrink-0">
              <div className="animate-rc-float">
                <RobotBody installedCount={0} />
              </div>
              <p className="text-center text-slate-400 text-xs mt-2">No modules installed</p>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-slate-800 mb-1">
                Robot Commander
              </h1>
              <p className="text-slate-400 text-sm mb-5">
                Your robot is powered off. Install 8 modules by writing Python functions to bring it online.
              </p>

              <BlueprintPanel title="Assembly Checklist" className="mb-5">
                <div className="grid grid-cols-2 gap-1">
                  {workshopData.modules.map((mod) => (
                    <div key={mod.id} className="flex items-center gap-2 text-xs text-slate-500 py-0.5">
                      <span>{mod.partEmoji}</span>
                      <span>{mod.partName}</span>
                      <DifficultyBadge difficulty={mod.difficulty} />
                    </div>
                  ))}
                </div>
              </BlueprintPanel>

              <div className="flex gap-4 text-center justify-center md:justify-start mb-5">
                <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
                  <div className="text-lg font-bold text-blue-600">{workshopData.startingLives}</div>
                  <div className="text-[10px] text-slate-400 uppercase">Attempts</div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
                  <div className="text-lg font-bold text-blue-600">{workshopData.timeLimitSeconds}s</div>
                  <div className="text-[10px] text-slate-400 uppercase">Per Part</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 animate-rc-border-pulse shadow-md"
              >
                Start Assembly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PLAYING / CHECKING ─── */}
      {(phase === 'playing' || phase === 'checking') && currentModule && (
        <div className="max-w-4xl w-full animate-rc-fade-in relative z-20">
          {/* Compact status bar */}
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: workshopData.startingLives }).map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i < lives ? 'bg-blue-500' : 'bg-slate-200'}`} />
                ))}
              </div>
              {combo > 1 && (
                <span className="text-blue-600 font-bold animate-rc-count-pop">
                  {workshopData.comboMultipliers[Math.min(combo - 1, workshopData.comboMultipliers.length - 1)]}x
                </span>
              )}
            </div>
            <span className="text-slate-600 font-semibold">
              Score: <span className="text-blue-600">{score}</span>
            </span>
            <span className={`font-mono font-bold ${timeLeft <= 10 ? 'text-red-500 animate-rc-pulse' : timeLeft <= 30 ? 'text-amber-500' : 'text-slate-400'}`}>
              {timeLeft}s
            </span>
          </div>
          <TimerBar timeLeft={timeLeft} maxTime={workshopData.timeLimitSeconds} />

          {/* Main layout: sidebar + content */}
          <div className="flex gap-4 mt-4">
            {/* Left sidebar: robot + parts list */}
            <div className="hidden md:block w-44 flex-shrink-0">
              <div className="mb-3">
                <RobotBody installedCount={completedParts.size} />
              </div>
              <PartsChecklist modules={workshopData.modules} currentIndex={moduleIndex} completedParts={completedParts} />
            </div>

            {/* Right: main content */}
            <div className="flex-1 min-w-0">
              {/* Part header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{currentModule.partEmoji}</span>
                <span className="text-slate-800 font-bold text-lg">{currentModule.partName}</span>
                <DifficultyBadge difficulty={currentModule.difficulty} />
                <span className="text-slate-300 text-xs ml-auto">{moduleIndex + 1}/{workshopData.modules.length}</span>
              </div>

              <p className="text-slate-500 text-sm mb-3">{currentModule.description}</p>

              {/* Spec sheet — bullet points, not a paragraph */}
              <BlueprintPanel title="Spec Sheet" className="mb-3">
                <div className="space-y-1">
                  {currentModule.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      {i === 0 ? (
                        <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-xs border border-blue-200 font-mono">{spec.replace('Function: ', '')}</code>
                      ) : (
                        <>
                          <span className="text-slate-300 mt-0.5">•</span>
                          <span className="text-slate-600 font-mono text-xs">{spec}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Concept tags inline */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-100">
                  {currentModule.concepts.map((c) => (
                    <span key={c} className="px-2 py-0.5 text-[10px] rounded bg-blue-50 text-blue-500 border border-blue-100 font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </BlueprintPanel>

              {/* Code input */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Terminal</span>
                  <span className="text-[10px] text-slate-300">— {currentModule.functionName}.py</span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={phase === 'checking'}
                  rows={6}
                  className="rc-code-input w-full bg-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-green-400 text-sm"
                  spellCheck={false}
                />
                {errorMessage && (
                  <div className="mt-1.5 text-red-500 text-xs font-mono">✗ {errorMessage}</div>
                )}
              </div>

              {/* Diagnostics + actions */}
              <div className="flex items-start gap-4">
                {/* Diagnostic results */}
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Diagnostics</div>
                  <div className="space-y-1">
                    {currentModule.testCases.map((tc, i) => {
                      const result = testResults[i];
                      const state = phase === 'checking'
                        ? i < checkingIndex ? (result?.passed ? 'passed' : 'failed')
                        : i === checkingIndex ? 'running' : 'pending'
                        : 'pending';

                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-xs font-mono py-1 px-2 rounded border transition-all duration-300 ${
                            state === 'passed' ? 'bg-green-50 border-green-200 text-green-700'
                            : state === 'failed' ? 'bg-red-50 border-red-200 text-red-600'
                            : state === 'running' ? 'bg-blue-50 border-blue-200 text-blue-600 animate-rc-test-run'
                            : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          <span className="w-3 text-center text-[10px]">
                            {state === 'passed' ? '✓' : state === 'failed' ? '✗' : state === 'running' ? '▸' : '○'}
                          </span>
                          <span>{tc.call}</span>
                          <span className="text-slate-300">→</span>
                          <span>{tc.expectedDisplay}</span>
                          {state === 'failed' && result && (
                            <span className="text-red-500 ml-auto">got {result.actualDisplay}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={handleSubmit}
                    disabled={!code.trim() || phase === 'checking'}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-lg transition-all text-sm shadow-sm"
                  >
                    Run Diagnostics
                  </button>
                  {!showHint ? (
                    <button
                      onClick={() => { setShowHint(true); setHintUsed(true); }}
                      className="text-slate-400 hover:text-blue-500 text-xs transition-colors text-center"
                      disabled={phase === 'checking'}
                    >
                      Hint (-{workshopData.hintPenalty}pts)
                    </button>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded p-2 text-amber-700 text-xs animate-rc-fade-in max-w-[200px]">
                      {currentModule.hint}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODULE RESULT ─── */}
      {phase === 'moduleResult' && (
        <div className="max-w-lg w-full text-center animate-rc-bounce-in relative z-20">
          <BlueprintPanel title="Installation Result">
            {allPassed ? (
              <>
                <div className="mb-3">
                  <RobotBody installedCount={completedParts.size} />
                </div>
                <h2 className="text-xl font-bold text-green-600 mb-1">
                  {currentModule.partEmoji} {currentModule.partName} Installed!
                </h2>
                <p className="text-slate-400 text-sm mb-4">All diagnostics passed. Part is online.</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3 text-red-400">✗</div>
                <h2 className="text-xl font-bold text-red-500 mb-1">Installation Failed</h2>
                <p className="text-slate-400 text-sm mb-3">
                  {currentModule.partEmoji} {currentModule.partName} didn't pass diagnostics.
                </p>
                <div className="space-y-1 mb-4 text-left">
                  {testResults.map((r, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs font-mono p-1.5 rounded border ${
                        r.passed ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'
                      }`}
                    >
                      <span>{r.passed ? '✓' : '✗'}</span>
                      <span>{r.testCase.call}</span>
                      <span className="text-slate-300">→</span>
                      <span>{r.testCase.expectedDisplay}</span>
                      {!r.passed && (
                        <span className="ml-auto text-red-500">got {r.actualDisplay}</span>
                      )}
                    </div>
                  ))}
                </div>
                {currentModule.exampleAnswer && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-left">
                    <div className="text-[10px] text-blue-500 uppercase tracking-wider mb-1.5 font-semibold">Correct Code</div>
                    <pre className="text-slate-700 text-xs font-mono whitespace-pre leading-relaxed">{currentModule.exampleAnswer}</pre>
                  </div>
                )}
              </>
            )}
            {moduleIndex < workshopData.modules.length - 1 && (
              <div className="mb-4 text-xs text-slate-400">
                Next: <span className="text-slate-600 font-medium">{workshopData.modules[moduleIndex + 1].partEmoji} {workshopData.modules[moduleIndex + 1].partName}</span>
              </div>
            )}
            <button
              onClick={advanceToNextModule}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm"
            >
              {allPassed ? 'Install Next Part' : 'Skip to Next Part'}
            </button>
          </BlueprintPanel>
        </div>
      )}

      {/* ─── VICTORY ─── */}
      {phase === 'victory' && (
        <div className="max-w-lg w-full text-center animate-rc-bounce-in relative z-20">
          <div className="mb-4">
            <RobotBody installedCount={8} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1">
            Robot Fully Assembled!
          </h1>
          <p className="text-slate-400 text-sm mb-6">All 8 modules installed and online. Your robot is ready for action.</p>
          <BlueprintPanel title="Build Report" className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-[10px] text-slate-400 uppercase">Total Score</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-2xl font-bold text-green-600">+{calculateXP(score, false)}</div>
                <div className="text-[10px] text-slate-400 uppercase">XP Earned</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Base XP: {workshopData.baseXP} + Bonus: {calculateXP(score, false) - workshopData.baseXP}
            </div>
          </BlueprintPanel>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm"
          >
            Build Another
          </button>
        </div>
      )}

      {/* ─── GAME OVER ─── */}
      {phase === 'gameover' && (
        <div className="max-w-lg w-full text-center animate-rc-bounce-in relative z-20">
          <div className="mb-4">
            <RobotBody installedCount={completedParts.size} />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-1">Assembly Failed</h2>
          <p className="text-slate-400 text-sm mb-6">
            Robot only {Math.round((completedParts.size / workshopData.modules.length) * 100)}% complete. Try again!
          </p>
          <BlueprintPanel title="Partial Build" className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-[10px] text-slate-400 uppercase">Score</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-2xl font-bold text-amber-600">+{calculateXP(score, true)}</div>
                <div className="text-[10px] text-slate-400 uppercase">XP (50%)</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Parts installed: {completedParts.size} of {workshopData.modules.length}
            </div>
          </BlueprintPanel>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm"
          >
            Restart Assembly
          </button>
        </div>
      )}
    </div>
  );
}
