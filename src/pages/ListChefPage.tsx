// List Chef Page - Module-level List Chef Game
// Warm kitchen theme wrapper

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getListChefGameByModuleId } from '@data/games/listchef';
import { ListChefGame } from '@components/games/ListChef/ListChefGame';

export function ListChefPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const listChefGame = getListChefGameByModuleId(moduleId!);
  const [gameComplete, setGameComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  function handleListChefComplete(score: number, xp: number) {
    addXP(xp);
    setFinalScore(score);
    setXpEarned(xp);
    setGameComplete(true);
  }

  function handleBackToCourse() {
    navigate('/course/beginner');
  }

  // Game not found
  if (!listChefGame) {
    return (
      <div className="min-h-screen lc-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h1 className="text-3xl font-bold text-orange-800 mb-2">Kitchen Not Found</h1>
          <p className="text-orange-600/60 mb-6">This module doesn't have a List Chef game yet.</p>
          <Link to="/course/beginner" className="text-orange-600 hover:text-orange-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Completion screen
  if (gameComplete) {
    const isPerfect = finalScore >= listChefGame.goalPoints;

    return (
      <div className="min-h-screen lc-bg flex items-center justify-center p-4">
        <div className="max-w-lg w-full lc-panel rounded-2xl p-8 text-center animate-lc-bounce-in">
          <div className="text-7xl mb-4">{isPerfect ? '👨‍🍳' : '🍽️'}</div>
          <h1 className="text-4xl font-bold text-orange-800 mb-2">
            {isPerfect ? 'Master Chef!' : 'Great Cooking!'}
          </h1>
          <p className="text-orange-600/60 mb-6">
            You mastered the List Chef challenges!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 font-mono">{finalScore}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Final Score</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-600 font-mono">+{xpEarned}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">XP Earned</div>
            </div>
          </div>

          {isPerfect && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
              <div className="text-2xl mb-1">🏆</div>
              <div className="font-bold text-amber-800">Master Chef!</div>
              <div className="text-sm text-amber-700">You reached the goal score!</div>
            </div>
          )}

          <button
            onClick={handleBackToCourse}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/15 flex items-center justify-center gap-2"
          >
            Back to Course
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Main Game — ListChefGame renders its own full-screen layout
  return <ListChefGame onComplete={handleListChefComplete} gameData={listChefGame} />;
}
