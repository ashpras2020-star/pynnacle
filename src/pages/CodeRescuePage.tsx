import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getCodeRescueGameByModuleId } from '@data/games/coderescue';
import { CodeRescueGame } from '@components/games/CodeRescue/CodeRescueGame';

export function CodeRescuePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const gameData = getCodeRescueGameByModuleId(moduleId!);
  const [gameComplete, setGameComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  function handleComplete(score: number, xp: number) {
    addXP(xp);
    setFinalScore(score);
    setXpEarned(xp);
    setGameComplete(true);
  }

  function handleBackToCourse() {
    navigate('/course/beginner');
  }

  if (!gameData) {
    return (
      <div className="cr-space flex items-center justify-center p-4">
        <div className="cr-stars"><div className="cr-stars-layer" /></div>
        <div className="text-center relative z-10">
          <div className="text-5xl mb-4">🛸</div>
          <h1 className="text-xl font-black text-white mb-2">SIGNAL LOST</h1>
          <p className="text-slate-500 text-sm mb-6 font-mono">No rescue mission found for this sector.</p>
          <Link to="/course/beginner" className="text-cyan-400 hover:text-cyan-300 font-bold text-sm font-mono">
            &lt; RETURN TO BASE
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="cr-space flex items-center justify-center p-4">
        <div className="cr-stars"><div className="cr-stars-layer" /></div>
        <div className="max-w-sm w-full relative z-10 animate-cr-pop">
          <div className="cr-hull rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-2xl font-black text-white mb-1">MISSION COMPLETE</h1>
            <p className="text-slate-500 text-xs mb-8 font-mono">Station Alpha systems restored.</p>

            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-black/30 rounded-lg p-4 border border-cyan-500/10">
                <div className="text-2xl font-black text-cyan-400 font-mono">{finalScore.toLocaleString()}</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">Score</div>
              </div>
              <div className="flex-1 bg-black/30 rounded-lg p-4 border border-green-500/10">
                <div className="text-2xl font-black text-green-400 font-mono">+{xpEarned}</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">XP</div>
              </div>
            </div>

            <button onClick={handleBackToCourse}
              className="w-full py-3 bg-cyan-500 text-black font-black rounded-lg hover:bg-cyan-400 transition-all text-sm tracking-wider">
              RETURN TO BASE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <CodeRescueGame onComplete={handleComplete} gameData={gameData} />;
}
