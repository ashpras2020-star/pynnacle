import { useState, useEffect, useMemo } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface StationData {
  id: number;
  name: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inputItems: any[];
  expectedOutput: any[];
  inputVariableName: string;
  expressionOptions: string[];
  correctExpression: string;
  filterOptions: string[] | null;   // null = no filter slot shown
  correctFilter: string | null;
  variableOptions?: string[];       // for enumerate stations
  iterableOptions?: string[];       // for enumerate stations
  hint: string;
}

interface StationProgress {
  stars: number;        // 0 = not completed, 1-3
  attempts: number;
  hintUsed: boolean;
  bestStars: number;
}

type GameScreen = 'map' | 'station' | 'complete';

// ─── Game Data ──────────────────────────────────────────────────────────────────

const stations: StationData[] = [
  {
    id: 1, name: 'Double Up', emoji: '✨', difficulty: 'easy',
    inputItems: [1, 2, 3, 4, 5],
    expectedOutput: [2, 4, 6, 8, 10],
    inputVariableName: 'items',
    expressionOptions: ['x * 2', 'x + 1', 'x', 'x ** 2'],
    correctExpression: 'x * 2',
    filterOptions: null,
    correctFilter: null,
    hint: 'You want to multiply each item by 2',
  },
  {
    id: 2, name: 'Big Picks', emoji: '🔮', difficulty: 'easy',
    inputItems: [5, 12, 3, 18, 7, 15],
    expectedOutput: [12, 18, 15],
    inputVariableName: 'items',
    expressionOptions: ['x', 'x * 2', 'str(x)'],
    correctExpression: 'x',
    filterOptions: ['x > 10', 'x > 5', 'x < 10'],
    correctFilter: 'x > 10',
    hint: 'Keep the item unchanged, but only if it passes a size check',
  },
  {
    id: 3, name: 'Label Maker', emoji: '🏷️', difficulty: 'easy',
    inputItems: [10, 20, 30],
    expectedOutput: ['10', '20', '30'],
    inputVariableName: 'items',
    expressionOptions: ['str(x)', 'x', 'int(x)', 'len(x)'],
    correctExpression: 'str(x)',
    filterOptions: null,
    correctFilter: null,
    hint: 'Convert each number into text',
  },
  {
    id: 4, name: 'Even Steven', emoji: '🎯', difficulty: 'medium',
    inputItems: [1, 2, 3, 4, 5, 6],
    expectedOutput: [4, 8, 12],
    inputVariableName: 'items',
    expressionOptions: ['x * 2', 'x + 1', 'x', 'x * 3'],
    correctExpression: 'x * 2',
    filterOptions: ['x % 2 == 0', 'x % 2 != 0', 'x > 3'],
    correctFilter: 'x % 2 == 0',
    hint: 'First filter for even numbers, then double them',
  },
  {
    id: 5, name: 'Shout Out', emoji: '📢', difficulty: 'medium',
    inputItems: ['alice', 'bob', 'charlie'],
    expectedOutput: ['ALICE', 'BOB', 'CHARLIE'],
    inputVariableName: 'names',
    expressionOptions: ['x.upper()', 'x.lower()', 'x', 'len(x)'],
    correctExpression: 'x.upper()',
    filterOptions: null,
    correctFilter: null,
    hint: 'Use a string method to make everything LOUD',
  },
  {
    id: 6, name: 'Size Check', emoji: '📏', difficulty: 'medium',
    inputItems: ['hi', 'hello', 'hey', 'welcome'],
    expectedOutput: [5, 7],
    inputVariableName: 'words',
    expressionOptions: ['len(x)', 'x', 'x.upper()', 'str(x)'],
    correctExpression: 'len(x)',
    filterOptions: ['len(x) > 3', 'len(x) > 2', 'len(x) == 3'],
    correctFilter: 'len(x) > 3',
    hint: 'Measure word length, but only for longer words',
  },
  {
    id: 7, name: 'First Letter', emoji: '🔤', difficulty: 'hard',
    inputItems: ['Factory', 'Assembly', 'Steel', 'Tank'],
    expectedOutput: ['F', 'A', 'S', 'T'],
    inputVariableName: 'items',
    expressionOptions: ['x[0]', 'x[-1]', 'x', 'len(x)'],
    correctExpression: 'x[0]',
    filterOptions: null,
    correctFilter: null,
    hint: 'Use indexing to grab just the first character',
  },
  {
    id: 8, name: 'Tag Team', emoji: '🎪', difficulty: 'hard',
    inputItems: ['Bolt', 'Gear', 'Spring', 'Valve'],
    expectedOutput: ['0: Bolt', '1: Gear', '2: Spring', '3: Valve'],
    inputVariableName: 'items',
    expressionOptions: ['str(i) + ": " + x', 'x + str(i)', 'str(i)', 'x'],
    correctExpression: 'str(i) + ": " + x',
    filterOptions: null,
    correctFilter: null,
    variableOptions: ['i, x', 'x, i', 'x'],
    iterableOptions: ['enumerate(items)', 'items', 'range(len(items))'],
    hint: 'Use enumerate to get both the index and the value',
  },
];

const BASE_XP = 200;
const BONUS_XP = 300;
const MAX_STARS = 24; // 8 stations × 3

// ─── Comprehension Evaluator ────────────────────────────────────────────────────

function convertPyExpr(expr: string): string {
  let js = expr;
  js = js.replace(/\.upper\(\)/g, '.toUpperCase()');
  js = js.replace(/\.lower\(\)/g, '.toLowerCase()');
  js = js.replace(/\.strip\(\)/g, '.trim()');
  js = js.replace(/\bstr\(([^)]+)\)/g, 'String($1)');
  js = js.replace(/\bint\(([^)]+)\)/g, 'Math.floor(Number($1))');
  js = js.replace(/\blen\(([^)]+)\)/g, '$1.length');
  js = js.replace(/\babs\(([^)]+)\)/g, 'Math.abs($1)');
  js = js.replace(/\band\b/g, '&&');
  js = js.replace(/\bor\b/g, '||');
  js = js.replace(/\bnot\s+/g, '!');
  js = js.replace(/\bTrue\b/g, 'true');
  js = js.replace(/\bFalse\b/g, 'false');
  js = js.replace(/\bNone\b/g, 'null');
  js = js.replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)');
  js = js.replace(/==/g, '===');
  js = js.replace(/!=/g, '!==');
  return js;
}

function evaluateSelection(
  station: StationData,
  expression: string | null,
  filter: string | null,
  variable?: string,
  iterable?: string,
): any[] | null {
  if (!expression) return null;

  try {
    const jsExpr = convertPyExpr(expression);
    const jsFilter = filter ? convertPyExpr(filter) : null;
    const varName = variable || 'x';
    const iterName = iterable || station.inputVariableName;

    // Detect enumerate
    const enumMatch = iterName.match(/^enumerate\((.+)\)$/);
    if (enumMatch) {
      const baseIter = enumMatch[1].trim();
      const vars = varName.split(',').map(v => v.trim());
      const iVar = vars[0];
      const xVar = vars[1] || vars[0];

      let jsCode: string;
      if (jsFilter) {
        jsCode = `${baseIter}.reduce((acc, ${xVar}, ${iVar}) => { if (${jsFilter}) acc.push(${jsExpr}); return acc; }, [])`;
      } else {
        jsCode = `${baseIter}.map((${xVar}, ${iVar}) => ${jsExpr})`;
      }

      const fn = new Function('__input__', `const ${baseIter} = __input__;\nreturn ${jsCode};`);
      return fn(JSON.parse(JSON.stringify(station.inputItems)));
    }

    // Standard: map, filter, or filter+map
    const simpleVar = varName.trim();
    const isIdentity = jsExpr === simpleVar;

    let jsCode: string;
    if (jsFilter && isIdentity) {
      jsCode = `${iterName}.filter(${simpleVar} => ${jsFilter})`;
    } else if (jsFilter) {
      jsCode = `${iterName}.filter(${simpleVar} => ${jsFilter}).map(${simpleVar} => ${jsExpr})`;
    } else {
      jsCode = `${iterName}.map(${simpleVar} => ${jsExpr})`;
    }

    const fn = new Function('__input__', `const ${station.inputVariableName} = __input__;\nreturn ${jsCode};`);
    return fn(JSON.parse(JSON.stringify(station.inputItems)));
  } catch {
    return null;
  }
}

function compareResults(actual: any[], expected: any[]): boolean {
  if (actual.length !== expected.length) return false;
  return actual.every((v, i) => {
    if (typeof expected[i] === 'string') return String(v) === expected[i];
    return v === expected[i];
  });
}

function formatItem(value: any): string {
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

function formatList(items: any[]): string {
  return '[' + items.map(formatItem).join(', ') + ']';
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { label: 'EASY', bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
    medium: { label: 'MEDIUM', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
    hard: { label: 'HARD', bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300' },
  };
  const c = config[difficulty];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}

function StarDisplay({ stars, max = 3, size = 'text-lg' }: { stars: number; max?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`${size} ${i < stars ? 'opacity-100' : 'opacity-25'}`}>
          {i < stars ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}

function ItemBox({ value, variant = 'normal' }: { value: any; variant?: 'normal' | 'unknown' | 'preview' }) {
  const styles = {
    normal: 'bg-white border-violet-300 text-violet-700',
    unknown: 'bg-violet-50 border-violet-200 text-violet-300',
    preview: 'bg-violet-50 border-violet-400 text-violet-600',
  };
  return (
    <div className={`inline-flex items-center justify-center px-3 py-1.5 border-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap shadow-sm ${styles[variant]}`}>
      {variant === 'unknown' ? '?' : formatItem(value)}
    </div>
  );
}

function ConveyorBelt({
  inputItems,
  outputItems,
  showPreview,
}: {
  inputItems: any[];
  outputItems: any[] | null;
  showPreview: boolean;
}) {
  return (
    <div className="flex items-stretch gap-0 rounded-2xl overflow-hidden shadow-lg">
      {/* Input belt */}
      <div className="flex-1 relative">
        <div className="ff-conveyor h-16 flex items-center px-4 gap-2 overflow-hidden">
          {inputItems.map((item, i) => (
            <ItemBox key={i} value={item} />
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-violet-400 flex flex-col justify-center items-center rounded-l-xl">
          <div className="w-2 h-2 rounded-full bg-violet-300" />
        </div>
      </div>

      {/* Processor */}
      <div className="w-20 flex-shrink-0 bg-white/90 border-x-2 border-violet-400 flex flex-col items-center justify-center animate-ff-machine-pulse">
        <span className="text-violet-500 text-lg animate-ff-gear-spin">⚙</span>
      </div>

      {/* Output belt */}
      <div className="flex-1 relative">
        <div className="ff-conveyor h-16 flex items-center px-4 gap-2 overflow-hidden">
          {showPreview && outputItems
            ? outputItems.map((item, i) => (
                <ItemBox key={i} value={item} variant="preview" />
              ))
            : inputItems.map((_, i) => (
                <ItemBox key={i} value={null} variant="unknown" />
              ))
          }
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-violet-400 flex flex-col justify-center items-center rounded-r-xl">
          <div className="w-2 h-2 rounded-full bg-violet-300" />
        </div>
      </div>
    </div>
  );
}

function SlotDropdown({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-violet-400 uppercase font-bold tracking-wider">{label}</span>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="ff-slot-select bg-white border-2 border-violet-300 rounded-xl px-3 py-2 text-violet-700 text-sm font-mono font-bold cursor-pointer hover:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] text-center appearance-none"
      >
        <option value="" disabled>Choose...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Station Map Screen ─────────────────────────────────────────────────────────

function StationMap({
  progress,
  onSelectStation,
  totalStars,
  onComplete,
}: {
  progress: Record<number, StationProgress>;
  onSelectStation: (id: number) => void;
  totalStars: number;
  onComplete: () => void;
}) {
  const easyCompleted = stations.filter(s => s.difficulty === 'easy' && (progress[s.id]?.stars || 0) > 0).length;
  const mediumCompleted = stations.filter(s => s.difficulty === 'medium' && (progress[s.id]?.stars || 0) > 0).length;
  const allCompleted = stations.every(s => (progress[s.id]?.stars || 0) > 0);

  function isUnlocked(station: StationData): boolean {
    if (station.difficulty === 'easy') return true;
    if (station.difficulty === 'medium') return easyCompleted >= 2;
    if (station.difficulty === 'hard') return mediumCompleted >= 2;
    return false;
  }

  const easyStations = stations.filter(s => s.difficulty === 'easy');
  const mediumStations = stations.filter(s => s.difficulty === 'medium');
  const hardStations = stations.filter(s => s.difficulty === 'hard');

  function renderRow(label: string, stationList: StationData[]) {
    return (
      <div className="mb-6">
        <div className="text-xs text-violet-400 uppercase tracking-wider font-bold mb-3 px-1">{label}</div>
        <div className="grid grid-cols-3 gap-3">
          {stationList.map((station) => {
            const unlocked = isUnlocked(station);
            const stars = progress[station.id]?.stars || 0;
            return (
              <button
                key={station.id}
                onClick={() => unlocked && onSelectStation(station.id)}
                disabled={!unlocked}
                className={`ff-panel rounded-2xl p-4 text-center transition-all ${
                  unlocked
                    ? 'hover:shadow-lg hover:scale-[1.03] hover:border-violet-400 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl mb-2">{unlocked ? station.emoji : '🔒'}</div>
                <div className="text-slate-700 font-bold text-sm mb-1">{station.name}</div>
                <div className="mb-2">
                  <StarDisplay stars={stars} size="text-sm" />
                </div>
                <DifficultyBadge difficulty={station.difficulty} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-full animate-ff-fade-in">
      <div className="text-center mb-8">
        <div className="text-6xl mb-3">🏭</div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          Conveyor Crafter
        </h1>
        <p className="text-slate-400 text-sm mb-4">Pick a station and craft list comprehensions!</p>
        <div className="flex items-center justify-center gap-4">
          <div className="ff-panel rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="text-sm">⭐</span>
            <span className="text-violet-700 font-bold text-sm">{totalStars}</span>
            <span className="text-slate-400 text-xs">/ {MAX_STARS}</span>
          </div>
          <div className="ff-panel rounded-xl px-4 py-2">
            <span className="text-violet-700 font-bold text-sm">
              {Math.round(BASE_XP + (totalStars / MAX_STARS) * BONUS_XP)} XP
            </span>
          </div>
        </div>
      </div>

      {renderRow('Easy', easyStations)}
      {renderRow('Medium', mediumStations)}
      {renderRow('Hard', hardStations)}

      {allCompleted && (
        <div className="text-center mt-4">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200 text-sm"
          >
            All stations complete! View results
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Station Screen ─────────────────────────────────────────────────────────────

function StationScreen({
  station,
  progress,
  onBack,
  onCrafted,
}: {
  station: StationData;
  progress: StationProgress;
  onBack: () => void;
  onCrafted: (stars: number) => void;
}) {
  const [selectedExpr, setSelectedExpr] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedVar, setSelectedVar] = useState<string | null>(
    station.variableOptions ? null : null
  );
  const [selectedIterable, setSelectedIterable] = useState<string | null>(
    station.iterableOptions ? null : null
  );
  const [attempts, setAttempts] = useState(progress.attempts);
  const [hintUsed, setHintUsed] = useState(progress.hintUsed);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [currentStars, setCurrentStars] = useState(progress.bestStars);

  // Determine effective variable and iterable for evaluation
  const effectiveVar = station.variableOptions
    ? selectedVar
    : 'x';
  const effectiveIterable = station.iterableOptions
    ? selectedIterable
    : station.inputVariableName;

  // Live preview
  const preview = useMemo(() => {
    if (!selectedExpr) return null;
    if (station.variableOptions && !selectedVar) return null;
    if (station.iterableOptions && !selectedIterable) return null;
    return evaluateSelection(station, selectedExpr, selectedFilter, effectiveVar || undefined, effectiveIterable || undefined);
  }, [selectedExpr, selectedFilter, selectedVar, selectedIterable, station, effectiveVar, effectiveIterable]);

  const previewMatches = preview ? compareResults(preview, station.expectedOutput) : false;

  // Build the comprehension string for display
  const comprehensionStr = useMemo(() => {
    const expr = selectedExpr || '___';
    const varStr = station.variableOptions ? (selectedVar || '___') : 'x';
    const iterStr = station.iterableOptions ? (selectedIterable || '___') : station.inputVariableName;
    const filterStr = station.filterOptions
      ? selectedFilter ? ` if ${selectedFilter}` : ''
      : '';
    return `[${expr} for ${varStr} in ${iterStr}${filterStr}]`;
  }, [selectedExpr, selectedFilter, selectedVar, selectedIterable, station]);

  function handleCraft() {
    if (!preview) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (previewMatches) {
      let earnedStars = 3;
      if (newAttempts > 1 || hintUsed) earnedStars = 2;
      if (newAttempts > 2) earnedStars = 1;
      const best = Math.max(earnedStars, currentStars);
      setCurrentStars(best);
      setResult('correct');
      onCrafted(best);
    } else {
      setResult('wrong');
      setTimeout(() => setResult('idle'), 1500);
    }
  }

  function handleRetry() {
    setSelectedExpr(null);
    setSelectedFilter(null);
    setSelectedVar(null);
    setSelectedIterable(null);
    setResult('idle');
  }

  return (
    <div className="max-w-2xl w-full animate-ff-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-violet-600 text-sm font-medium transition-colors flex items-center gap-1"
        >
          ← Back to Map
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{station.emoji}</span>
          <span className="text-slate-800 font-bold text-xl">{station.name}</span>
          <DifficultyBadge difficulty={station.difficulty} />
        </div>
        <StarDisplay stars={currentStars} size="text-base" />
      </div>

      {/* Conveyor Belt */}
      <ConveyorBelt
        inputItems={station.inputItems}
        outputItems={preview}
        showPreview={!!selectedExpr && result !== 'correct'}
      />

      {/* Target */}
      <div className="text-center my-3">
        <span className="text-slate-400 text-xs">Target: </span>
        <span className="font-mono text-violet-600 font-bold text-sm">{formatList(station.expectedOutput)}</span>
      </div>

      {result === 'correct' ? (
        /* ── Success ── */
        <div className="ff-panel rounded-2xl p-8 text-center animate-ff-bounce-in">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-emerald-600 mb-2">Crafted!</h2>
          <div className="mb-3">
            <StarDisplay stars={currentStars} size="text-2xl" />
          </div>
          <div className="bg-violet-50 rounded-xl p-3 mb-4 font-mono text-violet-700 text-sm">
            {comprehensionStr}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="px-5 py-2 bg-white border-2 border-violet-300 text-violet-600 font-bold rounded-xl text-sm hover:border-violet-500 transition-all"
            >
              Retry for more stars
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl text-sm hover:from-violet-600 hover:to-purple-700 transition-all shadow-md"
            >
              Back to Map
            </button>
          </div>
        </div>
      ) : (
        /* ── Builder ── */
        <div className="ff-panel rounded-2xl p-6">
          {/* Comprehension display */}
          <div className="bg-violet-50/50 rounded-xl p-3 mb-5 text-center">
            <span className="font-mono text-violet-500 text-sm">{comprehensionStr}</span>
          </div>

          {/* Dropdown slots */}
          <div className="flex flex-wrap items-end justify-center gap-4 mb-5">
            <span className="text-violet-300 font-mono text-lg font-bold pb-2">[</span>

            <SlotDropdown
              label="Expression"
              options={station.expressionOptions}
              value={selectedExpr}
              onChange={setSelectedExpr}
            />

            <span className="text-violet-300 font-mono text-sm pb-2">for</span>

            {station.variableOptions ? (
              <SlotDropdown
                label="Variable"
                options={station.variableOptions}
                value={selectedVar}
                onChange={setSelectedVar}
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-violet-400 uppercase font-bold tracking-wider">Variable</span>
                <div className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-2 text-violet-500 text-sm font-mono font-bold min-w-[80px] text-center">
                  x
                </div>
              </div>
            )}

            <span className="text-violet-300 font-mono text-sm pb-2">in</span>

            {station.iterableOptions ? (
              <SlotDropdown
                label="Iterable"
                options={station.iterableOptions}
                value={selectedIterable}
                onChange={setSelectedIterable}
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-violet-400 uppercase font-bold tracking-wider">Iterable</span>
                <div className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-2 text-violet-500 text-sm font-mono font-bold min-w-[80px] text-center">
                  {station.inputVariableName}
                </div>
              </div>
            )}

            {station.filterOptions && (
              <>
                <span className="text-violet-300 font-mono text-sm pb-2">if</span>
                <SlotDropdown
                  label="Filter"
                  options={station.filterOptions}
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                />
              </>
            )}

            <span className="text-violet-300 font-mono text-lg font-bold pb-2">]</span>
          </div>

          {/* Preview */}
          {preview && (
            <div className={`rounded-xl p-3 mb-5 text-center text-sm font-mono transition-all ${
              previewMatches
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                : 'bg-rose-50 border border-rose-200 text-rose-500'
            }`}>
              <span className="text-slate-400 text-xs mr-2">Preview:</span>
              {formatList(preview)}
              {previewMatches ? ' ✅' : ' ✗'}
            </div>
          )}

          {/* Wrong attempt feedback */}
          {result === 'wrong' && (
            <div className="text-center mb-4 text-rose-500 text-sm font-medium animate-ff-fade-in">
              Not quite — try different options!
            </div>
          )}

          {/* Craft button */}
          <div className="text-center mb-4">
            <button
              onClick={handleCraft}
              disabled={!preview}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-400 text-white font-bold rounded-xl transition-all text-sm shadow-md disabled:shadow-none"
            >
              Craft!
            </button>
          </div>

          {/* Hint */}
          <div className="text-center">
            {!showHint ? (
              <button
                onClick={() => { setShowHint(true); setHintUsed(true); }}
                className="text-slate-400 hover:text-violet-500 text-xs transition-colors"
              >
                💡 Hint (costs 1 star)
              </button>
            ) : (
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-violet-600 text-xs animate-ff-fade-in inline-block">
                💡 {station.hint}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Results Screen ─────────────────────────────────────────────────────────────

function ResultsScreen({
  progress,
  totalStars,
  onRestart,
}: {
  progress: Record<number, StationProgress>;
  totalStars: number;
  onRestart: () => void;
}) {
  const xp = Math.round(BASE_XP + (totalStars / MAX_STARS) * BONUS_XP);

  return (
    <div className="max-w-lg w-full text-center animate-ff-bounce-in">
      <div className="text-7xl mb-4">🎊</div>
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
        All Crafted!
      </h1>
      <p className="text-slate-500 text-sm mb-6">You've completed every station on the line.</p>

      <div className="ff-panel rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <div className="text-3xl font-bold text-violet-600">⭐ {totalStars}</div>
            <div className="text-xs text-slate-400 uppercase font-medium mt-1">Total Stars</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="text-3xl font-bold text-emerald-500">+{xp}</div>
            <div className="text-xs text-slate-400 uppercase font-medium mt-1">XP Earned</div>
          </div>
        </div>

        <div className="space-y-2">
          {stations.map((s) => {
            const p = progress[s.id];
            return (
              <div key={s.id} className="flex items-center justify-between text-sm px-2">
                <div className="flex items-center gap-2">
                  <span>{s.emoji}</span>
                  <span className="text-slate-700 font-medium">{s.name}</span>
                </div>
                <StarDisplay stars={p?.bestStars || 0} size="text-sm" />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-violet-300"
      >
        Play Again
      </button>
    </div>
  );
}

// ─── Main Game Component ────────────────────────────────────────────────────────

export function FilterFactoryGame() {
  const [screen, setScreen] = useState<GameScreen>('map');
  const [activeStationId, setActiveStationId] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, StationProgress>>({});

  const totalStars = Object.values(progress).reduce((sum, p) => sum + p.bestStars, 0);

  function handleSelectStation(id: number) {
    setActiveStationId(id);
    setScreen('station');
  }

  function handleCrafted(stationId: number, stars: number) {
    setProgress(prev => {
      const existing = prev[stationId] || { stars: 0, attempts: 0, hintUsed: false, bestStars: 0 };
      return {
        ...prev,
        [stationId]: {
          ...existing,
          stars,
          bestStars: Math.max(existing.bestStars, stars),
          attempts: existing.attempts + 1,
        },
      };
    });
  }

  function handleBack() {
    setScreen('map');
    setActiveStationId(null);
  }

  function handleComplete() {
    setScreen('complete');
  }

  function handleRestart() {
    setProgress({});
    setScreen('map');
    setActiveStationId(null);
  }

  const activeStation = stations.find(s => s.id === activeStationId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {screen === 'map' && (
        <StationMap
          progress={progress}
          onSelectStation={handleSelectStation}
          totalStars={totalStars}
          onComplete={handleComplete}
        />
      )}

      {screen === 'station' && activeStation && (
        <StationScreen
          key={activeStationId}
          station={activeStation}
          progress={progress[activeStation.id] || { stars: 0, attempts: 0, hintUsed: false, bestStars: 0 }}
          onBack={handleBack}
          onCrafted={(stars) => handleCrafted(activeStation.id, stars)}
        />
      )}

      {screen === 'complete' && (
        <ResultsScreen
          progress={progress}
          totalStars={totalStars}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
