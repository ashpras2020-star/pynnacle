import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getRobotCommanderGameByModuleId } from '@data/games/robotcommander';
import { RobotCommanderGame } from '@components/games/RobotCommander/RobotCommanderGame';

export function RobotCommanderPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const game = getRobotCommanderGameByModuleId(moduleId!);
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
      <div className="min-h-screen flex items-center justify-center p-4 rc-blueprint-bg">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">Workshop Closed</h1>
          <p className="text-slate-500 mb-6">No robot modules found for this module.</p>
          <Link to="/course/beginner" className="text-blue-600 hover:text-blue-500">
            ← Return to Course
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 rc-blueprint-bg">
        <div className="max-w-lg w-full rc-panel rounded-xl shadow-2xl p-8 text-center">
          <div className="text-7xl mb-4">🤖</div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Assembly Complete!</h1>
          <p className="text-slate-500 mb-6">Great work, Commander. Your robot is fully operational.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600">{finalScore}</div>
              <div className="text-sm text-slate-400">Score</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-green-200">
              <div className="text-3xl font-bold text-green-600">+{xpEarned}</div>
              <div className="text-sm text-slate-400">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all text-lg"
          >
            RETURN TO COURSE
          </button>
        </div>
      </div>
    );
  }

  return <RobotCommanderGame gameData={game} onComplete={handleComplete} />;
}
