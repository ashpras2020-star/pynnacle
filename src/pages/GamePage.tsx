// Game Page - Gamified Quiz Challenge (TypingClub-style) or Debug Detective

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { getQuizQuestions } from '@data/gameConfigs/quizQuestions';
import { selectQuizQuestions } from '@utils/questionRandomizer';
import { getDebugGameByModuleId } from '@data/games/debug';
import { getListChefGameByModuleId } from '@data/games/listchef';
import { getGuardGateGameByModuleId } from '@data/games/guardgate';
import { getMathQuestGameByModuleId } from '@data/games/mathquest';
import { DebugDetective } from '@components/games/DebugDetective';
import { ListChefGame } from '@components/games/ListChef';
import { GuardGateGame } from '@components/games/GuardGate';
import { MathQuestGame } from '@components/games/MathQuest';
import { getLessonById } from '@data/courses/beginner';

export function GamePage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { addXP, addCompletedLesson, isLessonCompleted } = useProgressStore();

  // Determine game type and load appropriate game data
  const lesson = getLessonById(lessonId!);
  const gameType = lesson?.gameType || 'quiz'; // Default to quiz

  // For special games, get the module ID from lesson ID (e.g., 'lesson-1-5' -> 'module-1')
  const moduleId = lessonId ? 'module-' + lessonId.split('-')[1] : undefined;
  const debugGame = gameType === 'debug' && moduleId ? getDebugGameByModuleId(moduleId) : null;
  const listChefGame = gameType === 'listchef' && moduleId ? getListChefGameByModuleId(moduleId) : null;
  const guardGateGame = gameType === 'guardgate' && moduleId ? getGuardGateGameByModuleId(moduleId) : null;
  const mathQuestGame = gameType === 'mathquest' && moduleId ? getMathQuestGameByModuleId(moduleId) : null;

  // State to track which game component to show
  const [showDebugGame, setShowDebugGame] = useState(gameType === 'debug');
  const [showListChef, setShowListChef] = useState(gameType === 'listchef');
  const [showGuardGate, setShowGuardGate] = useState(gameType === 'guardgate');
  const [showMathQuest, setShowMathQuest] = useState(gameType === 'mathquest');

  const pickQuestions = useCallback(
    () => selectQuizQuestions(getQuizQuestions(lessonId!), 10),
    [lessonId],
  );
  const [questions, setQuestions] = useState(pickQuestions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer state
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const multiplier = Math.min(combo + 1, 5); // Max 5x multiplier

  // Show combo celebration
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    if (combo > 0 && combo % 3 === 0) {
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 1000);
    }
  }, [combo]);

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const points = 50 * multiplier; // 50 XP base per question
      setScore(score + points);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > bestCombo) setBestCombo(newCombo);
    } else {
      setCombo(0); // Reset combo on wrong answer
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives === 0) {
        setTimeout(() => {
          // Mark lesson as complete (even if game lost) - award lesson XP but no game bonus
          if (lesson) {
            addCompletedLesson({
              lessonId: lessonId!,
              completedAt: new Date().toISOString(),
              xpEarned: lesson.xpReward || 0,
              codeSubmitted: '// Completed via game',
            });
          }
          setCompletionTime(Date.now() - startTime);
          setGameOver(true);
        }, 1500);
        return;
      }
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowExplanation(false);
      } else {
        // Mark lesson as complete and award XP (lesson XP + game bonus XP)
        const gameScore = score + (correct ? 50 * multiplier : 0);

        if (lesson && !isLessonCompleted(lessonId!)) {
          addCompletedLesson({
            lessonId: lessonId!,
            completedAt: new Date().toISOString(),
            xpEarned: lesson.xpReward || 0,
            codeSubmitted: '// Completed via game',
          });
        }

        // Award game bonus XP separately
        addXP(gameScore);
        setCompletionTime(Date.now() - startTime);
        setGameWon(true);
      }
    }, 2500);
  }

  function handleNext() {
    navigate('/course/beginner');
  }

  function handleDebugComplete(score: number, xpEarned: number) {
    // Mark lesson as complete and award XP
    if (lesson && !isLessonCompleted(lessonId!)) {
      addCompletedLesson({
        lessonId: lessonId!,
        completedAt: new Date().toISOString(),
        xpEarned: lesson.xpReward || 0,
        codeSubmitted: '// Completed via game',
      });
    }

    // Award game bonus XP separately
    addXP(xpEarned);
    setShowDebugGame(false);
    // Show completion screen
    setScore(score);
    setCompletionTime(Date.now() - startTime);
    setGameWon(true);
  }

  function handleListChefComplete(score: number, xpEarned: number) {
    // Mark lesson as complete and award XP
    if (lesson && !isLessonCompleted(lessonId!)) {
      addCompletedLesson({
        lessonId: lessonId!,
        completedAt: new Date().toISOString(),
        xpEarned: lesson.xpReward || 0,
        codeSubmitted: '// Completed via game',
      });
    }

    // Award game bonus XP separately
    addXP(xpEarned);
    setShowListChef(false);
    // Show completion screen
    setScore(score);
    setCompletionTime(Date.now() - startTime);
    setGameWon(true);
  }

  function handleGuardGateComplete(score: number, xpEarned: number) {
    // Mark lesson as complete and award XP
    if (lesson && !isLessonCompleted(lessonId!)) {
      addCompletedLesson({
        lessonId: lessonId!,
        completedAt: new Date().toISOString(),
        xpEarned: lesson.xpReward || 0,
        codeSubmitted: '// Completed via game',
      });
    }

    // Award game bonus XP separately
    addXP(xpEarned);
    setShowGuardGate(false);
    // Show completion screen
    setScore(score);
    setCompletionTime(Date.now() - startTime);
    setGameWon(true);
  }

  function handleMathQuestComplete(score: number, xpEarned: number) {
    // Mark lesson as complete and award XP
    if (lesson && !isLessonCompleted(lessonId!)) {
      addCompletedLesson({
        lessonId: lessonId!,
        completedAt: new Date().toISOString(),
        xpEarned: lesson.xpReward || 0,
        codeSubmitted: '// Completed via game',
      });
    }

    // Award game bonus XP separately
    addXP(xpEarned);
    setShowMathQuest(false);
    // Show completion screen
    setScore(score);
    setCompletionTime(Date.now() - startTime);
    setGameWon(true);
  }

  function handleRetry() {
    setQuestions(pickQuestions()); // Re-randomize questions on retry
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setCombo(0);
    setBestCombo(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
    setGameWon(false);
    setShowExplanation(false);
  }

  // Format time in minutes and seconds
  function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  // Game Over Screen
  if (gameOver) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 text-center animate-scale-in">
          <div className="text-7xl mb-4 animate-bounce">💔</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Game Over!</h1>
          <p className="text-gray-600 mb-6">
            You ran out of lives, but you made it to question {currentQuestion + 1}!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">XP Earned</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-600">{bestCombo}</div>
              <div className="text-sm text-gray-600">Best Combo</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{completionTime ? formatTime(completionTime) : '-'}</div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 btn-purple font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg"
            >
              🔄 Try Again
            </button>
            <button
              onClick={handleNext}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Victory Screen
  if (gameWon) {
    const isPerfect = bestCombo === totalQuestions;
    const starCount = lives === 3 ? 3 : lives === 2 ? 2 : 1;

    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 text-center animate-scale-in">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isPerfect ? 'Perfect Score!' : 'Well Done!'}
          </h1>
          <p className="text-gray-600 mb-6">
            You completed all {totalQuestions} questions!
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`text-5xl ${i < starCount ? 'animate-star' : 'opacity-30'}`}>
                ⭐
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-xs text-gray-600">XP Earned</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-600">{bestCombo}x</div>
              <div className="text-xs text-gray-600">Best Combo</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">{lives}</div>
              <div className="text-xs text-gray-600">Lives Left</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{completionTime ? formatTime(completionTime) : '-'}</div>
              <div className="text-xs text-gray-600">Time</div>
            </div>
          </div>

          {/* Achievements */}
          {isPerfect && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6 animate-pulse">
              <div className="text-2xl mb-1">🏆</div>
              <div className="font-bold text-yellow-800">Perfect Run!</div>
              <div className="text-sm text-yellow-700">Answered every question correctly!</div>
            </div>
          )}
          {bestCombo >= 5 && !isPerfect && (
            <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4 mb-6">
              <div className="text-2xl mb-1">🔥</div>
              <div className="font-bold text-orange-800">Combo Master!</div>
              <div className="text-sm text-orange-700">Reached a {bestCombo}x combo streak!</div>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full btn-green font-semibold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Continue to Next Lesson
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // List Chef Game
  if (showListChef && listChefGame) {
    return <ListChefGame gameData={listChefGame} onComplete={handleListChefComplete} />;
  }

  // Guard Gate Game
  if (showGuardGate && guardGateGame) {
    return <GuardGateGame gameData={guardGateGame} onComplete={handleGuardGateComplete} />;
  }

  // Math Quest Game
  if (showMathQuest && mathQuestGame) {
    return <MathQuestGame gameData={mathQuestGame} onComplete={handleMathQuestComplete} />;
  }

  // Debug Detective Game
  if (showDebugGame && debugGame) {
    return (
      <div className="min-h-screen bg-white py-8">
        <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
              ← Back to Course
            </Link>
          </div>
        </header>
        <DebugDetective game={debugGame} onComplete={handleDebugComplete} />
      </div>
    );
  }

  // No questions available
  if (!question) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">No Questions Available</h1>
          <p className="text-gray-600 mb-6">This lesson doesn't have a quiz yet.</p>
          <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
              ← Back to Course
            </Link>

            <div className="flex items-center gap-6">
              {/* Combo Indicator */}
              {combo > 0 && (
                <div className={`flex items-center gap-2 ${showCombo ? 'animate-pulse scale-125' : ''}`}>
                  <div className="text-orange-600 font-bold text-xl">
                    🔥 {combo}x
                  </div>
                  {multiplier > 1 && (
                    <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                      {multiplier}x XP
                    </div>
                  )}
                </div>
              )}

              {/* Lives */}
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-7 h-7 transition-all duration-200 ${
                      i < lives ? 'text-red-500 scale-100' : 'text-gray-300 scale-75'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ))}
              </div>

              {/* Score */}
              <div className="bg-purple-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-600">XP Earned</div>
                <div className="text-2xl font-bold text-purple-600">{score}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% complete
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%`, background: 'linear-gradient(to right, #9333ea, #a855f7, #c084fc)' }}
            ></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center leading-tight">
              {question.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => {
              let styles = 'bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-400 hover:scale-105';

              if (selectedAnswer !== null) {
                if (index === question.correctIndex) {
                  styles = 'bg-green-100 border-green-500 scale-105 ring-4 ring-green-200';
                } else if (index === selectedAnswer) {
                  styles = 'bg-red-100 border-red-500 scale-95';
                } else {
                  styles = 'bg-gray-50 border-gray-200 opacity-40';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-5 rounded-xl border-2 text-left font-semibold text-gray-800
                    transition-all duration-200 ${styles}
                    ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">{option}</div>
                    {selectedAnswer !== null && index === question.correctIndex && (
                      <div className="text-green-600 text-2xl">✓</div>
                    )}
                    {selectedAnswer !== null && index === selectedAnswer && index !== question.correctIndex && (
                      <div className="text-red-600 text-2xl">✗</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isCorrect !== null && (
            <div
              className={`p-5 rounded-xl animate-slide-up ${
                isCorrect
                  ? 'bg-green-50 border-2 border-green-400'
                  : 'bg-red-50 border-2 border-red-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">
                  {isCorrect ? '🎯' : '💡'}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-lg mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? (
                      <>
                        Correct! +{50 * multiplier} XP {combo > 1 && `(${multiplier}x combo)`}
                      </>
                    ) : (
                      'Not quite right!'
                    )}
                  </div>
                  {showExplanation && question.explanation && (
                    <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {question.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-gray-500">
          💡 Tip: Answer correctly in a row to build a combo and earn bonus XP!
        </div>
      </main>

      {/* CSS for animations */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes star {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-star {
          animation: star 0.5s ease-in-out;
          animation-fill-mode: backwards;
        }
        .animate-star:nth-child(1) { animation-delay: 0.1s; }
        .animate-star:nth-child(2) { animation-delay: 0.2s; }
        .animate-star:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
