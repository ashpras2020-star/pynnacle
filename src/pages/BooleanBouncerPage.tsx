import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getBooleanBouncerGameByModuleId } from '@data/games/booleanbouncer';
import { BooleanBouncerGame } from '@components/games/BooleanBouncer/BooleanBouncerGame';

export function BooleanBouncerPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const game = getBooleanBouncerGameByModuleId(moduleId!);
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

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0533 40%, #0f0a1a 100%)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🕶️</div>
          <h1 className="text-3xl font-bold text-fuchsia-400 mb-2">Club Closed</h1>
          <p className="text-fuchsia-600 mb-6">No bouncer rounds found for this module.</p>
          <Link to="/course/beginner" className="text-fuchsia-400 hover:text-fuchsia-300">
            ← Return to Course
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0533 40%, #0f0a1a 100%)' }}>
        <div className="max-w-lg w-full bg-gray-900/90 rounded-xl shadow-2xl border border-fuchsia-800/60 p-8 text-center">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-fuchsia-400 mb-2 tracking-wider">Club Secured!</h1>
          <p className="text-fuchsia-600 mb-6">Outstanding work, bouncer. The club is safe tonight.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/60 rounded-lg p-4 border border-fuchsia-900/40">
              <div className="text-3xl font-bold text-fuchsia-400 font-mono">{finalScore}</div>
              <div className="text-sm text-fuchsia-700">Score</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-4 border border-green-900/40">
              <div className="text-3xl font-bold text-green-400 font-mono">+{xpEarned}</div>
              <div className="text-sm text-green-700">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-4 rounded-lg transition-all text-lg tracking-widest"
          >
            RETURN TO COURSE
          </button>
        </div>
      </div>
    );
  }

  return <BooleanBouncerGame gameData={game} onComplete={handleComplete} />;
}
