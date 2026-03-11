import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import type { CodeRescueGame as GameType, CodeRescueMission } from '../../../types/game';

interface Props {
  gameData: GameType;
  onComplete: (score: number, xp: number) => void;
}

type Phase = 'briefing' | 'playing' | 'success' | 'fail' | 'gameover' | 'victory';

const SHIELD_CLASS: Record<string, string> = {
  blue: 'cr-shield-blue', red: 'cr-shield-red', amber: 'cr-shield-amber',
  emerald: 'cr-shield-emerald', purple: 'cr-shield-purple',
};

const TIME_LIMITS: Record<string, number> = { easy: 50, medium: 40, hard: 35 };

export function CodeRescueGame({ gameData, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('briefing');
  const [caseIdx, setCaseIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [placements, setPlacements] = useState<Record<number, string>>({});
  const [lineResults, setLineResults] = useState<Record<number, 'correct' | 'wrong' | 'missed'> | null>(null);
  const [flashClass, setFlashClass] = useState('');
  const [floatScore, setFloatScore] = useState<number | null>(null);

  const slotRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const missions = gameData.missions;
  const mission = missions[caseIdx] as CodeRescueMission | undefined;

  const startCase = useCallback((idx: number) => {
    const m = missions[idx];
    if (!m) return;
    setCaseIdx(idx);
    setPlacements({});
    setLineResults(null);
    setFlashClass('');
    setFloatScore(null);
    setTimeLeft(TIME_LIMITS[m.difficulty] || 45);
    setPhase('playing');
  }, [missions]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          loseLife();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, caseIdx]);

  function loseLife() {
    const n = lives - 1;
    setLives(n);
    setCombo(0);
    setFlashClass('cr-flash-fail');
    setPhase(n <= 0 ? 'gameover' : 'fail');
  }

  // Drag end handler — check if dropped on a slot
  function handleDragEnd(blockId: string, _e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (phase !== 'playing') return;
    const { point } = info;

    for (const [lineIdStr, el] of Object.entries(slotRefs.current)) {
      if (!el) continue;
      const lineId = Number(lineIdStr);
      if (placements[lineId]) continue; // already filled

      const rect = el.getBoundingClientRect();
      if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
        setPlacements(prev => ({ ...prev, [lineId]: blockId }));
        return;
      }
    }
  }

  function handleRemoveBlock(lineId: number) {
    if (phase !== 'playing' || lineResults) return;
    setPlacements(prev => { const n = { ...prev }; delete n[lineId]; return n; });
  }

  function handleExecute() {
    if (phase !== 'playing' || !mission) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const slots = mission.codeLines.filter(l => l.isSlot);
    const results: Record<number, 'correct' | 'wrong' | 'missed'> = {};
    let ok = true;
    for (const s of slots) {
      const p = placements[s.id];
      if (!p) { results[s.id] = 'missed'; ok = false; }
      else if (p === s.correctBlock) { results[s.id] = 'correct'; }
      else { results[s.id] = 'wrong'; ok = false; }
    }
    setLineResults(results);

    if (ok) {
      const nc = combo + 1;
      setCombo(nc);
      setBestCombo(prev => Math.max(prev, nc));
      const mult = Math.min(nc, 4);
      const base = mission.difficulty === 'easy' ? 100 : mission.difficulty === 'medium' ? 200 : 300;
      const pts = (base + timeLeft * 5) * mult;
      setScore(prev => prev + pts);
      setFloatScore(pts);
      setFlashClass('cr-flash-success');
      setPhase('success');
    } else {
      loseLife();
    }
  }

  function handleNext() {
    if (caseIdx + 1 >= missions.length) setPhase('victory');
    else startCase(caseIdx + 1);
  }

  function handleFinish() {
    const pct = Math.min(score / (missions.length * 600), 1);
    const xp = gameData.baseXP + Math.round(gameData.bonusXP * pct);
    onComplete(score, xp);
  }

  const placedIds = new Set(Object.values(placements));
  const o2Pct = mission ? (timeLeft / (TIME_LIMITS[mission.difficulty] || 45)) * 100 : 100;
  const o2Color = o2Pct > 50 ? '#22d3ee' : o2Pct > 25 ? '#f59e0b' : '#ef4444';

  // === BRIEFING ===
  if (phase === 'briefing') {
    return (
      <div className="cr-space flex items-center justify-center p-4">
        <div className="cr-stars"><div className="cr-stars-layer" /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg relative z-10">
          <div className="text-6xl mb-4">🛸</div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">CODE RESCUE</h1>
          <div className="text-cyan-400 text-sm font-mono mb-6">SPACE STATION ALPHA — SYSTEM FAILURE DETECTED</div>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Critical systems are crashing. Drag error-handling shields onto the failing code
            before oxygen runs out. You have 3 hull segments — each failure breaches the hull.
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex gap-1 justify-center mb-1">
                {[1,2,3].map(i => <div key={i} className="cr-hull-seg intact" />)}
              </div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Hull</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-cyan-400">{missions.length}</div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Systems</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-amber-400">x4</div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Max Combo</div>
            </div>
          </div>

          <motion.button onClick={() => startCase(0)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="px-12 py-4 bg-cyan-500 text-black font-black rounded-lg text-lg hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            DEPLOY ENGINEER
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // === GAME OVER ===
  if (phase === 'gameover') {
    return (
      <div className="cr-space flex items-center justify-center p-4">
        <div className="cr-stars"><div className="cr-stars-layer" /></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md relative z-10">
          <div className="text-6xl mb-4">💥</div>
          <h1 className="text-3xl font-black text-red-400 mb-2">STATION LOST</h1>
          <p className="text-slate-500 text-sm mb-2 font-mono">Hull integrity at zero. All systems offline.</p>
          <div className="text-4xl font-black text-white mb-8 font-mono">{score.toLocaleString()} pts</div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setLives(3); setScore(0); setCombo(0); setBestCombo(0); startCase(0); }}
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all">
              RELAUNCH
            </button>
            <button onClick={handleFinish}
              className="px-8 py-3 border border-slate-700 text-slate-400 font-bold rounded-lg hover:bg-slate-800 transition-all">
              ABORT
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // === VICTORY ===
  if (phase === 'victory') {
    return (
      <div className="cr-space flex items-center justify-center p-4">
        <div className="cr-stars"><div className="cr-stars-layer" /></div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md relative z-10 animate-cr-pop">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-black text-cyan-400 mb-2">ALL SYSTEMS ONLINE</h1>
          <p className="text-slate-400 text-sm mb-6 font-mono">Station Alpha fully operational. Outstanding work, engineer.</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-white font-mono">{score.toLocaleString()}</div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Score</div>
            </div>
            <div className="text-center">
              <div className="flex gap-1 justify-center">
                {[1,2,3].map(i => <div key={i} className={`cr-hull-seg ${i <= lives ? 'intact' : 'broken'}`} />)}
              </div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">Hull</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-amber-400 font-mono">x{bestCombo}</div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Best Combo</div>
            </div>
          </div>
          <button onClick={handleFinish}
            className="px-12 py-4 bg-cyan-500 text-black font-black rounded-lg text-lg hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            COLLECT XP
          </button>
        </motion.div>
      </div>
    );
  }

  if (!mission) return null;
  const showResults = phase === 'success' || phase === 'fail';

  // === GAMEPLAY ===
  return (
    <div className={`cr-space flex flex-col ${flashClass}`} style={{ minHeight: '100vh' }}>
      <div className="cr-stars"><div className="cr-stars-layer" /></div>

      {/* HUD */}
      <div className="cr-hull relative z-10 mx-4 mt-3 rounded-lg px-4 py-2 flex items-center justify-between">
        {/* Hull integrity */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Hull</span>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className={`cr-hull-seg ${i <= lives ? 'intact' : 'broken'}`} />)}
          </div>
        </div>

        {/* Case counter */}
        <div className="text-xs text-slate-500 font-mono">
          SYS <span className="text-cyan-400 font-bold">{caseIdx + 1}</span>/{missions.length}
        </div>

        {/* Combo + Score */}
        <div className="flex items-center gap-4">
          {combo > 1 && (
            <span className="text-amber-400 font-black text-xs font-mono">x{Math.min(combo, 4)} COMBO</span>
          )}
          <div className="font-mono text-white font-bold relative">
            {score.toLocaleString()}
            <AnimatePresence>
              {floatScore && (
                <motion.span key={floatScore + caseIdx}
                  initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -30 }} transition={{ duration: 0.7 }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 text-cyan-400 text-xs font-black whitespace-nowrap">
                  +{floatScore.toLocaleString()}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* O2 bar */}
      <div className="relative z-10 mx-4 mt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] text-slate-600 font-mono">O2</span>
          <span className="text-xs font-bold font-mono" style={{ color: o2Color }}>{Math.round(o2Pct)}%</span>
        </div>
        <div className="cr-o2-bar">
          <div className="cr-o2-fill" style={{ width: `${o2Pct}%`, backgroundColor: o2Color, color: o2Color }} />
        </div>
      </div>

      {/* Mission info */}
      <div className="relative z-10 mx-4 mt-4">
        <motion.div key={caseIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono
              ${mission.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                mission.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'}`}>
              {mission.difficulty}
            </span>
            <span className="text-white font-bold text-sm">{mission.name}</span>
          </div>
          <p className="text-slate-500 text-xs">{mission.briefing}</p>
        </motion.div>
      </div>

      {/* Holographic code display */}
      <motion.div key={'holo-' + caseIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="cr-holo relative z-10 mx-4 mt-3 flex-1">
        <div className="py-3">
          {(() => {
            let ln = 0;
            return mission.codeLines.map(line => {
              if (line.isSlot) {
                const placed = placements[line.id];
                const block = placed ? mission.availableBlocks.find(b => b.id === placed) : null;
                const res = lineResults?.[line.id];

                return (
                  <div key={line.id} className="flex items-center px-4 py-0.5">
                    <span className="w-6 text-right text-indigo-900 text-xs font-mono select-none mr-3" />
                    <span style={{ width: `${line.indentLevel * 20}px` }} className="flex-shrink-0" />
                    {block ? (
                      <div onClick={() => handleRemoveBlock(line.id)}
                        className={`cr-sealed ${res || ''} ${!showResults ? 'cursor-pointer hover:opacity-80' : ''} flex items-center gap-2 px-3 py-0.5 flex-1 animate-cr-seal`}>
                        <span className={`font-mono text-sm font-bold ${
                          res === 'correct' ? 'text-green-400' : res === 'wrong' ? 'text-red-400' : 'text-cyan-300'
                        }`}>{block.label}</span>
                        {res === 'correct' && <span className="ml-auto text-green-500 text-[10px] font-mono font-bold">SEALED</span>}
                        {res === 'wrong' && <span className="ml-auto text-red-500 text-[10px] font-mono font-bold">WRONG</span>}
                      </div>
                    ) : (
                      <div ref={el => { slotRefs.current[line.id] = el; }}
                        className={`cr-breach ${res === 'missed' ? 'missed' : ''} flex items-center px-3 py-0.5 flex-1`}>
                        <span className="text-[10px] font-mono text-orange-400/60">BREACH</span>
                        {res === 'missed' && <span className="ml-auto text-amber-500 text-[10px] font-mono font-bold">NEEDED</span>}
                      </div>
                    )}
                  </div>
                );
              }
              ln++;
              return (
                <div key={line.id} className="flex items-center px-4 py-0.5">
                  <span className="w-6 text-right text-indigo-800/60 text-xs font-mono select-none mr-3">{ln}</span>
                  <code className="text-blue-100/80 text-sm font-mono whitespace-pre">
                    {'  '.repeat(line.indentLevel)}{line.content}
                  </code>
                </div>
              );
            });
          })()}
        </div>
      </motion.div>

      {/* Shield dock + execute */}
      {!showResults ? (
        <div className="cr-dock relative z-20 px-4 py-4 mt-3">
          <div className="flex items-center gap-3 mb-3 flex-wrap justify-center">
            {mission.availableBlocks.map(block => {
              const used = placedIds.has(block.id);
              if (used) return (
                <div key={block.id} className={`cr-shield ${SHIELD_CLASS[block.color] || 'cr-shield-blue'} opacity-20 cursor-not-allowed`}>
                  {block.label}
                </div>
              );

              return (
                <motion.div key={block.id} drag dragSnapToOrigin
                  dragMomentum={false}
                  onDragEnd={(e, info) => handleDragEnd(block.id, e as any, info)}
                  whileDrag={{ scale: 1.1, zIndex: 50 }}
                  className={`cr-shield cr-shield-idle ${SHIELD_CLASS[block.color] || 'cr-shield-blue'}`}>
                  {block.label}
                </motion.div>
              );
            })}
          </div>
          <button onClick={handleExecute}
            className="w-full py-3 bg-cyan-500 text-black font-black rounded-lg text-sm hover:bg-cyan-400 transition-all tracking-wider shadow-lg shadow-cyan-500/15">
            EXECUTE PROGRAM
          </button>
        </div>
      ) : (
        <div className="relative z-10 px-4 py-6 text-center">
          {phase === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-2xl font-black text-green-400 font-mono mb-2">SYSTEM STABILIZED</div>
              <p className="text-slate-500 text-sm font-mono mb-4">Subsystem online. Moving to next system...</p>
              <button onClick={handleNext}
                className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all">
                NEXT SYSTEM &gt;&gt;
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-2xl font-black text-red-400 font-mono mb-2">HULL BREACH</div>
              <p className="text-slate-500 text-sm font-mono mb-4">Wrong shields deployed. Rerouting...</p>
              <button onClick={() => startCase(caseIdx)}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-all">
                RETRY SYSTEM
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
