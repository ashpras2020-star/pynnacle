import { useState, useEffect } from 'react';
import { Kitchen } from './Kitchen';
import { CodeEditorPanel } from './CodeEditorPanel';
import { Orders } from './Orders';
import { Tutorial } from './Tutorial';
import { recipes as defaultRecipes } from './recipes';
import type { Ingredient } from './types';
import type { ListChefGame as ListChefGameType } from '../../../types/game';

interface ListChefGameProps {
  onComplete: (score: number, xpEarned: number) => void;
  gameData?: ListChefGameType;
}

export function ListChefGame({ onComplete, gameData }: ListChefGameProps) {
  const recipes = gameData?.recipes || defaultRecipes;
  const initialTime = gameData?.timeLimit || 300;
  const goalPoints = gameData?.goalPoints || 2000;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [score, setScore] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameActive, setGameActive] = useState(false);
  const [codeHistory, setCodeHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const GOAL_POINTS = goalPoints;

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      onComplete(score, score);
    }
  }, [timeLeft, gameActive, score, onComplete]);

  const executeCode = (code: string) => {
    if (!code.trim()) {
      setFeedback('❌ Please write some code first!');
      return;
    }

    setCodeHistory(prev => [...prev, code]);
    setFeedback('✅ Code executed!');

    try {
      const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

      lines.forEach(line => {
        const appendMatch = line.match(/ingredients\.append\(['"](.*?)['"]\)/);
        if (appendMatch) {
          const [, item] = appendMatch;
          setIngredients(prev => [...prev, item]);
          return;
        }

        const removeMatch = line.match(/ingredients\.remove\(['"](.*?)['"]\)/);
        if (removeMatch) {
          const [, item] = removeMatch;
          setIngredients(prev => {
            const index = prev.indexOf(item);
            if (index > -1) {
              return [...prev.slice(0, index), ...prev.slice(index + 1)];
            }
            return prev;
          });
          return;
        }

        if (line.match(/ingredients\.pop\(\)/)) {
          setIngredients(prev => prev.slice(0, -1));
          return;
        }

        const insertMatch = line.match(/ingredients\.insert\((\d+),\s*['"](.*?)['"]\)/);
        if (insertMatch) {
          const [, indexStr, item] = insertMatch;
          const index = parseInt(indexStr);
          setIngredients(prev => [
            ...prev.slice(0, index),
            item,
            ...prev.slice(index)
          ]);
          return;
        }

        if (line.match(/ingredients\.clear\(\)/)) {
          setIngredients([]);
          return;
        }

        if (line.match(/ingredients\.reverse\(\)/)) {
          setIngredients(prev => [...prev].reverse());
          return;
        }

        if (line.match(/ingredients\.sort\(\)/)) {
          setIngredients(prev => [...prev].sort());
          return;
        }
      });
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  const checkOrder = () => {
    const order = recipes[currentOrder];
    const matches = JSON.stringify(ingredients) === JSON.stringify(order.ingredients);

    if (matches) {
      const newScore = score + order.points;
      setScore(newScore);

      if (newScore >= GOAL_POINTS) {
        setFeedback(`🏆 YOU WON! ${newScore} points in ${300 - timeLeft} seconds!`);
        setGameActive(false);
        setTimeout(() => {
          onComplete(newScore, newScore);
        }, 2000);
        return true;
      }

      setFeedback(`🎉 Perfect! +${order.points} pts (${newScore}/${GOAL_POINTS})`);
      setTimeout(() => {
        setCurrentOrder((currentOrder + 1) % recipes.length);
        setIngredients([]);
        setCodeHistory([]);
        setFeedback('');
      }, 1500);
      return true;
    } else {
      if (ingredients.length === 0) {
        setFeedback('❌ Your pot is empty! Add ingredients first.');
      } else if (ingredients.length !== order.ingredients.length) {
        setFeedback(`❌ Need ${order.ingredients.length} ingredients, got ${ingredients.length}.`);
      } else {
        setFeedback('❌ Wrong order! Check the positions.');
      }
      return false;
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(300);
    setCurrentOrder(0);
    setIngredients([]);
    setCodeHistory([]);
    setFeedback('');
  };

  return (
    <div className="min-h-screen p-6 lc-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-orange-800 mb-1">
            <span className="mr-2">👨‍🍳</span>List Chef
          </h1>
          <p className="text-orange-600/70">
            Master Python lists by cooking delicious recipes!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="lc-panel rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 font-mono">
              {score} <span className="text-sm text-orange-400">/ {GOAL_POINTS}</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Score</div>
            {gameActive && (
              <div className="mt-2 w-full bg-orange-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((score / GOAL_POINTS) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
          <div className="lc-panel rounded-xl p-4 flex items-center justify-center">
            <button
              onClick={startGame}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold rounded-lg transition-all shadow-md shadow-orange-500/15"
            >
              {gameActive ? '🔄 Restart' : '▶️ Start Cooking'}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-4 p-4 rounded-xl text-center font-bold animate-lc-fade-in ${
            feedback.includes('🎉') || feedback.includes('🏆')
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : feedback.includes('❌')
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {feedback}
          </div>
        )}

        <Tutorial />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <Orders currentOrder={recipes[currentOrder]} onCheck={checkOrder} gameActive={gameActive} />
          </div>
          <div className="lg:col-span-1">
            <Kitchen ingredients={ingredients} timeLeft={timeLeft} gameActive={gameActive} />
          </div>
          <div className="lg:col-span-1">
            <CodeEditorPanel onExecute={executeCode} codeHistory={codeHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
