// Math Quest Page - Module-level Math Quest Game
// Accessible through module completion buttons

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getMathQuestGameByModuleId } from '@data/games/mathquest';
import { MathQuestGame } from '@components/games/MathQuest/MathQuestGame';

export function MathQuestPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const mathQuestGame = getMathQuestGameByModuleId(moduleId!);
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
  if (!mathQuestGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">{'\u{1F3F0}'}</div>
          <h1 className="text-3xl font-bold text-purple-300 font-serif mb-2">Tower Not Found</h1>
          <p className="text-slate-400 mb-6">This module doesn't have a Math Quest game yet.</p>
          <Link to="/course/beginner" className="text-yellow-400 hover:text-yellow-300 font-semibold font-serif">
            &larr; Return to Course
          </Link>
        </div>
      </div>
    );
  }

  // Completion screen
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900/30 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-indigo-900/60 backdrop-blur rounded-2xl shadow-2xl border border-purple-500/30 p-8 text-center">
          <div className="text-7xl mb-4">{'\u{1F451}'}</div>
          <h1 className="text-4xl font-bold text-yellow-300 font-serif mb-2">Quest Complete!</h1>
          <p className="text-purple-300 mb-6">The Wizard's Tower has been conquered!</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-950/60 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-yellow-400 font-serif">{finalScore}</div>
              <div className="text-sm text-purple-300">Score</div>
            </div>
            <div className="bg-indigo-950/60 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-emerald-400 font-serif">+{xpEarned}</div>
              <div className="text-sm text-purple-300">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-indigo-950 font-semibold py-4 rounded-lg hover:from-yellow-400 hover:to-amber-400 transition-all shadow-lg hover:shadow-xl font-serif text-lg tracking-wide"
          >
            Return to Course
          </button>
        </div>
      </div>
    );
  }

  return <MathQuestGame gameData={mathQuestGame} onComplete={handleComplete} />;
}
