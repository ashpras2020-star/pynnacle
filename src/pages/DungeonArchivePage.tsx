import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getDungeonArchiveGameByModuleId } from '@data/games/dungeonarchive';
import { DungeonArchiveGame } from '@components/games/DungeonArchive/DungeonArchiveGame';

export function DungeonArchivePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const gameData = getDungeonArchiveGameByModuleId(moduleId!);
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
      <div className="fs-scene flex items-center justify-center p-4">
        <div className="text-center relative z-10">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-xl font-black text-red-400 mb-2 font-mono">ACCESS DENIED</h1>
          <p className="text-green-500/40 text-sm mb-6 font-mono">Target not found in database.</p>
          <Link to="/course/beginner" className="text-green-400 hover:text-green-300 font-bold text-sm font-mono">
            &lt; RETURN TO BASE
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="fs-scene flex items-center justify-center p-4">
        <div className="fs-scanlines" />
        <div className="fs-glow" />
        <div className="max-w-sm w-full relative z-10">
          <div className="fs-monitor rounded-xl p-1">
            <div className="fs-card rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🔓</div>
              <h1 className="text-2xl font-black text-green-400 mb-1 font-mono fs-neon">MISSION COMPLETE</h1>
              <p className="text-green-500/40 text-xs mb-6 font-mono">{'// '}All packets decoded. Exfiltration successful.</p>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-black/40 rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl font-black text-green-400 font-mono" style={{ textShadow: '0 0 10px rgba(0,255,65,0.4)' }}>{finalScore.toLocaleString()}</div>
                  <div className="text-[8px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">Score</div>
                </div>
                <div className="flex-1 bg-black/40 rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl font-black text-green-400 font-mono" style={{ textShadow: '0 0 10px rgba(0,255,65,0.4)' }}>+{xpEarned}</div>
                  <div className="text-[8px] text-green-500/30 uppercase tracking-widest mt-1 font-mono">XP</div>
                </div>
              </div>

              <button onClick={handleBackToCourse}
                className="w-full py-3 bg-green-600/80 text-green-100 font-black rounded-lg hover:bg-green-500/80 transition-all text-sm tracking-widest font-mono hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] border border-green-400/20">
                {'>'} RETURN TO BASE_
              </button>
            </div>
            <div className="fs-monitor-led" />
            <div className="fs-monitor-brand">GHOST_OS</div>
          </div>
        </div>
      </div>
    );
  }

  return <DungeonArchiveGame onComplete={handleComplete} gameData={gameData} />;
}
