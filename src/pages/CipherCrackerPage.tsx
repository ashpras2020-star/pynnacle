import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getCipherCrackerGameByModuleId } from '@data/games/ciphercracker';
import { CipherCrackerGame } from '@components/games/CipherCracker/CipherCrackerGame';

export function CipherCrackerPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useProgressStore();

  const game = getCipherCrackerGameByModuleId(moduleId!);
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{background:'linear-gradient(to bottom,#030712,#111827,#052e16)'}}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">Signal Lost</h1>
          <p className="text-green-600 font-mono mb-6">No cipher missions found for this module.</p>
          <Link to="/course/beginner" className="text-green-400 hover:text-green-300 font-mono">
            ← Return to Base
          </Link>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background:'linear-gradient(to bottom,#030712,#111827,#052e16)'}}>
        <div className="max-w-lg w-full bg-gray-900/90 rounded-xl shadow-2xl border border-green-800/60 p-8 text-center">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-green-400 font-mono mb-2 tracking-wider">Mission Complete</h1>
          <p className="text-green-600 font-mono mb-6">All transmissions decoded successfully, Agent.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/60 rounded-lg p-4 border border-green-900/40">
              <div className="text-3xl font-bold text-green-400 font-mono">{finalScore}</div>
              <div className="text-sm text-green-700 font-mono">Score</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-4 border border-emerald-900/40">
              <div className="text-3xl font-bold text-emerald-400 font-mono">+{xpEarned}</div>
              <div className="text-sm text-emerald-700 font-mono">XP Earned</div>
            </div>
          </div>

          <button
            onClick={handleBackToCourse}
            className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg transition-all font-mono text-lg tracking-widest"
          >
            [ RETURN TO BASE ]
          </button>
        </div>
      </div>
    );
  }

  return <CipherCrackerGame gameData={game} onComplete={handleComplete} />;
}
