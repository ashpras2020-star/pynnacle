// Debug Detective Page - Module-level Debug Game
// Detective noir theme wrapper

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getDebugGameByModuleId } from '@data/games/debug';
import { DebugDetective } from '@components/games/DebugDetective';

export function DebugPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const debugGame = getDebugGameByModuleId(moduleId!);
  const [gameComplete, setGameComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  function handleDebugComplete(score: number, xp: number) {
    addXP(xp);
    setFinalScore(score);
    setXpEarned(xp);
    setGameComplete(true);
  }

  function handleBackToCourse() {
    navigate('/course/beginner');
  }

  // Game not found
  if (!debugGame) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Case File Not Found</h1>
          <p className="text-slate-500 mb-6">No investigation records for this module.</p>
          <Link to="/course/beginner" className="text-amber-400 hover:text-amber-300 font-semibold">
            ← Return to HQ
          </Link>
        </div>
      </div>
    );
  }

  // Completion screen
  if (gameComplete) {
    const isPerfect = finalScore === debugGame.challenges.length * 30;

    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background:'linear-gradient(135deg,#0f172a,#1e293b,#0f172a)'}}>
        <div className="max-w-lg w-full dd-panel rounded-2xl p-8 text-center animate-dd-fade-in">
          <div className="text-7xl mb-4">{isPerfect ? '🏆' : '🔍'}</div>
          <h1 className="text-4xl font-bold text-amber-400 mb-2 font-mono">
            {isPerfect ? 'PERFECT RECORD' : 'CASES CLOSED'}
          </h1>
          <p className="text-slate-400 mb-6">
            All {debugGame.challenges.length} cases investigated and closed.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-400 font-mono">{finalScore}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Final Score</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">XP Earned</div>
            </div>
          </div>

          {/* Perfect Score Achievement */}
          {isPerfect && (
            <div className="bg-amber-500/10 border-2 border-amber-400/40 rounded-xl p-4 mb-6 animate-dd-pulse">
              <div className="text-2xl mb-1">🏅</div>
              <div className="font-bold text-amber-400 font-mono">MASTER DETECTIVE</div>
              <div className="text-sm text-slate-400">Every bug found on first inspection!</div>
            </div>
          )}

          <button
            onClick={handleBackToCourse}
            className="w-full text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2" style={{background:'linear-gradient(to right,#f59e0b,#f97316)'}}
          >
            RETURN TO HQ
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Main Debug Detective Game
  return (
    <div className="min-h-screen py-8 detective-cursor" style={{background:'linear-gradient(135deg,#0f172a,#1e293b,#0f172a)'}}>
      <header className="dd-panel mb-8 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/course/beginner" className="text-amber-400 hover:text-amber-300 font-semibold text-sm cursor-pointer">
            ← Back to HQ
          </Link>
        </div>
      </header>
      <DebugDetective game={debugGame} onComplete={handleDebugComplete} />

      {/* CSS for custom cursor */}
      <style>{`
        /* Detective magnifying glass cursor */
        .detective-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="12" cy="12" r="8" fill="none" stroke="%23f59e0b" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="rgba(245, 158, 11, 0.08)"/><line x1="17" y1="17" x2="28" y2="28" stroke="%23f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="18" x2="27" y2="27" stroke="%2392400e" stroke-width="2" stroke-linecap="round"/></svg>') 12 12, auto;
        }

        /* Apply magnifying glass to code lines */
        .detective-cursor .cursor-pointer {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="12" cy="12" r="8" fill="none" stroke="%23f59e0b" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="rgba(245, 158, 11, 0.08)"/><line x1="17" y1="17" x2="28" y2="28" stroke="%23f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="18" x2="27" y2="27" stroke="%2392400e" stroke-width="2" stroke-linecap="round"/></svg>') 12 12, pointer !important;
        }

        /* Keep pointer cursor for buttons and navigation */
        .detective-cursor button:not(.cursor-pointer),
        .detective-cursor a[href^="/"],
        .detective-cursor [role="button"]:not(.cursor-pointer) {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
