import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getConveyorCrafterGameByModuleId } from '@data/games/conveyorcrafter';
import { ConveyorCrafterGame } from '@components/games/ConveyorCrafter/ConveyorCrafterGame';

export function ConveyorCrafterPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const game = getConveyorCrafterGameByModuleId(moduleId!);
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🏭</div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">Station Offline</h1>
          <p className="text-slate-500 mb-6">No crafter stations found for this module.</p>
          <Link to="/course/beginner" className="text-violet-600 hover:text-violet-500">
            ← Return to Course
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%)' }}>
        <div className="max-w-lg w-full bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-violet-200">
          <div className="text-7xl mb-4">🎊</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">All Crafted!</h1>
          <p className="text-slate-500 mb-6">Great work! You've completed all the stations.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
              <div className="text-3xl font-bold text-violet-600">⭐ {finalScore}</div>
              <div className="text-sm text-slate-400">Stars</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-600">+{xpEarned}</div>
              <div className="text-sm text-slate-400">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-lg"
          >
            RETURN TO COURSE
          </button>
        </div>
      </div>
    );
  }

  return <ConveyorCrafterGame gameData={game} onComplete={handleComplete} />;
}
