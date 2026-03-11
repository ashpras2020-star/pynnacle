// Guard Gate Page - Module-level Guard Gate Game
// Bright modern castle theme wrapper

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getGuardGateGameByModuleId } from '@data/games/guardgate';
import { GuardGateGame } from '@components/games/GuardGate/GuardGateGame';

export function GuardGatePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const guardGateGame = getGuardGateGameByModuleId(moduleId!);
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

  // Game not found
  if (!guardGateGame) {
    return (
      <div className="min-h-screen gg-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🏰</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Not Found</h1>
          <p className="text-gray-500 mb-6">This module doesn't have a Guard Gate game yet.</p>
          <Link to="/course/beginner" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Completion screen
  if (gameComplete) {
    return (
      <div className="min-h-screen gg-bg flex items-center justify-center p-4 relative gg-brick-wall">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-amber-200/60 p-8 text-center animate-gg-bounce-in relative z-10">
          <div className="text-7xl mb-4">👑</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Victory!</h1>
          <p className="text-gray-500 mb-6">The castle gates have been guarded well!</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-600">{finalScore}</div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-600">+{xpEarned}</div>
              <div className="text-sm text-gray-500">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 text-lg"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return <GuardGateGame gameData={guardGateGame} onComplete={handleComplete} />;
}
