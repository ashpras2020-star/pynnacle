import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useUserStore } from '@store/useUserStore';
import { QuizLeaderboard } from '@components/liveQuiz/QuizLeaderboard';
import { CodeBackground } from '@components/ui/CodeBackground';

const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

const ANSWER_COLORS = [
  { bg: 'bg-red-500', hover: 'hover:bg-red-600', hex: '#ef4444' },
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', hex: '#3b82f6' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', hex: '#10b981' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', hex: '#f59e0b' },
];

export function QuizGamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const currentGame = useLiveQuizStore((s) => s.currentGame);
  const startGameListener = useLiveQuizStore((s) => s.startGameListener);
  const submitAnswer = useLiveQuizStore((s) => s.submitAnswer);
  const scoreCurrentQuestion = useLiveQuizStore((s) => s.scoreCurrentQuestion);
  const advanceQuestion = useLiveQuizStore((s) => s.advanceQuestion);
  const readyForNext = useLiveQuizStore((s) => s.readyForNext);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showingScores, setShowingScores] = useState(false);
  const [votedReady, setVotedReady] = useState(false);
  const questionStartTime = useRef(Date.now());
  const lastQuestionIndex = useRef(-1);
  const hasScoredQuestion = useRef(false);
  const hasCalledAdvance = useRef(false);

  useEffect(() => {
    if (gameId && !currentGame) startGameListener(gameId);
  }, [gameId]);

  useEffect(() => {
    if (currentGame?.status === 'completed') {
      navigate(`/quiz/results/${currentGame.id}`, { replace: true });
    }
  }, [currentGame?.status]);

  useEffect(() => {
    if (currentGame && currentGame.currentQuestionIndex !== lastQuestionIndex.current) {
      lastQuestionIndex.current = currentGame.currentQuestionIndex;
      setSelectedAnswer(null);
      setShowingScores(false);
      setVotedReady(false);
      hasScoredQuestion.current = false;
      hasCalledAdvance.current = false;
      questionStartTime.current = Date.now();
      setTimeLeft(currentGame.timePerQuestion);
    }
  }, [currentGame?.currentQuestionIndex]);

  useEffect(() => {
    if (!currentGame || currentGame.status !== 'playing' || showingScores) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStartTime.current) / 1000;
      const remaining = Math.max(0, currentGame.timePerQuestion - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setShowingScores(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentGame?.currentQuestionIndex, currentGame?.status, showingScores]);

  const handleAnswer = useCallback(async (index: number) => {
    if (selectedAnswer !== null || !currentGame || !user?.uid) return;
    setSelectedAnswer(index);
    const timeToAnswer = Date.now() - questionStartTime.current;
    await submitAnswer(index, timeToAnswer);
  }, [selectedAnswer, currentGame, user?.uid, submitAnswer]);

  // When all players answered → show scores
  useEffect(() => {
    if (!currentGame || !user?.uid || showingScores) return;
    const participantCount = Object.keys(currentGame.participants || {}).length;
    const answerCount = Object.keys(currentGame.answers || {}).length;
    if (answerCount >= participantCount && participantCount > 0) {
      setShowingScores(true);
    }
  }, [currentGame?.answers, showingScores]);

  // Host calculates scores immediately when question ends
  useEffect(() => {
    if (!showingScores || !currentGame || !user?.uid) return;
    if (currentGame.hostId !== user.uid) return;
    if (hasScoredQuestion.current) return;
    hasScoredQuestion.current = true;
    scoreCurrentQuestion().catch(() => {});
  }, [showingScores]);

  // Host advances when all players are ready
  useEffect(() => {
    if (!showingScores || !currentGame || !user?.uid) return;
    if (currentGame.hostId !== user.uid) return;
    if (hasCalledAdvance.current) return;

    const participantCount = Object.keys(currentGame.participants || {}).length;
    const readyCount = Object.keys(currentGame.readyForNext || {}).length;

    if (readyCount >= participantCount && participantCount > 0) {
      hasCalledAdvance.current = true;
      advanceQuestion().catch(() => {});
    }
  }, [currentGame?.readyForNext, showingScores]);

  const handleReadyForNext = async () => {
    if (votedReady) return;
    setVotedReady(true);
    await readyForNext();
  };

  if (!currentGame || !user?.uid) {
    return (
      <div className="relative min-h-screen quiz-dark-bg flex items-center justify-center">
        <CodeBackground />
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-200 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const question = currentGame.questions?.[currentGame.currentQuestionIndex];
  const hasAnswered = selectedAnswer !== null;
  const progress = ((currentGame.currentQuestionIndex + 1) / currentGame.questionCount) * 100;

  if (!question) {
    return (
      <div className="relative min-h-screen quiz-dark-bg flex items-center justify-center">
        <CodeBackground />
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-200 font-medium">Waiting for next question...</p>
        </div>
      </div>
    );
  }

  // Build answer histogram data
  const answerCounts = question.options.map((_, i) => {
    return Object.values(currentGame.answers || {}).filter((a) => a.answerIndex === i).length;
  });
  const totalAnswers = Object.keys(currentGame.answers || {}).length;
  const maxCount = Math.max(...answerCounts, 1);

  // Between-question score view with histogram + ready-up
  if (showingScores) {
    const participantCount = Object.keys(currentGame.participants || {}).length;
    const readyCount = Object.keys(currentGame.readyForNext || {}).length;
    const readyMap = currentGame.readyForNext || {};
    const iAmReady = votedReady || readyMap[user.uid];

    return (
      <div className="relative min-h-screen quiz-dark-bg px-4 py-6">
        <CodeBackground />
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <p className="text-purple-300 text-sm font-medium mb-1">
              Question {currentGame.currentQuestionIndex + 1} of {currentGame.questionCount}
            </p>
            <h2 className="text-xl font-bold text-white">Results</h2>
          </div>

          {/* Question recap */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/80 text-sm text-center leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Answer Histogram */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
              Answer Distribution
            </p>
            <div className="space-y-2.5">
              {question.options.map((option, i) => {
                const count = answerCounts[i];
                const isCorrect = i === question.correctIndex;
                const pct = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;
                const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
                const wasMyAnswer = selectedAnswer === i;

                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className={`text-xs font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? 'bg-green-500 text-white' : 'bg-white/10 text-white/50'
                        }`}>
                          {ANSWER_LABELS[i]}
                        </span>
                        <span className={`text-sm truncate ${
                          isCorrect ? 'text-green-400 font-semibold' : 'text-white/70'
                        }`}>
                          {option}
                          {wasMyAnswer && (
                            <span className="text-purple-400 text-xs ml-1.5">(you)</span>
                          )}
                        </span>
                      </div>
                      <span className={`text-xs font-medium flex-shrink-0 ml-2 ${
                        isCorrect ? 'text-green-400' : 'text-white/40'
                      }`}>
                        {count} ({Math.round(pct)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${barWidth}%`, background: isCorrect ? 'linear-gradient(to right, #22c55e, #34d399)' : 'linear-gradient(to right, rgba(239,68,68,0.7), rgba(248,113,113,0.5))' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
              Standings
            </p>
            <QuizLeaderboard
              participants={currentGame.participants}
              scores={currentGame.scores}
              currentUserId={user.uid}
            />
          </div>

          {/* Ready status + button */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-purple-300/70">
              <span>{readyCount}/{participantCount} ready</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(currentGame.participants).map(([uid, p]) => (
                <div
                  key={uid}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    readyMap[uid]
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {readyMap[uid] && <Check className="w-3 h-3" />}
                  {p.displayName}
                </div>
              ))}
            </div>

            {!iAmReady ? (
              <button
                onClick={handleReadyForNext}
                className="w-full py-3.5 btn-purple rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Check className="w-5 h-5" />
                Ready for Next
              </button>
            ) : (
              <div className="text-center py-3">
                <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  You're ready!
                </p>
                <p className="text-purple-300/50 text-sm mt-1">Waiting for others...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main question view
  const timerFraction = timeLeft / currentGame.timePerQuestion;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference * (1 - timerFraction);

  return (
    <div className="relative min-h-screen quiz-dark-bg flex flex-col">
      <CodeBackground />
      {/* Progress bar */}
      <div className="h-1.5 bg-white/5">
        <div
          className="h-full transition-all duration-300 rounded-r-full"
          style={{ width: `${progress}%`, background: 'linear-gradient(to right, #a855f7, #c084fc)' }}
        />
      </div>

      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">
            {currentGame.currentQuestionIndex + 1}/{currentGame.questionCount}
          </span>
        </div>
        <div className={`text-sm font-bold px-3 py-1 rounded-full ${
          timeLeft <= 5
            ? 'bg-red-500/20 text-red-400'
            : 'bg-white/10 text-white'
        }`}>
          {Math.ceil(timeLeft)}s
        </div>
      </div>

      {/* Circular timer */}
      <div className="flex justify-center py-4">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke={timeLeft <= 5 ? '#ef4444' : '#a855f7'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
              style={{ filter: timeLeft <= 5 ? 'drop-shadow(0 0 8px #ef4444)' : 'drop-shadow(0 0 8px #a855f7)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
              {Math.ceil(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-4 pb-6 flex-1 flex flex-col">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white text-lg font-semibold text-center leading-relaxed">
            {question.question}
          </p>
        </div>

        {/* Answer Options */}
        {hasAnswered ? (
          <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
              <Check className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-purple-300 font-semibold text-lg">Answer submitted!</p>
            <p className="text-white/30 text-sm mt-1">Waiting for others...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 flex-1">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`${ANSWER_COLORS[i].bg} ${ANSWER_COLORS[i].hover} text-white p-4 rounded-2xl font-semibold text-sm min-h-[80px] transition-all active:scale-[0.96] shadow-lg relative overflow-hidden`}
              >
                <span className="absolute top-2 left-3 text-white/40 text-xs font-bold">
                  {ANSWER_LABELS[i]}
                </span>
                <span className="relative z-10">{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
