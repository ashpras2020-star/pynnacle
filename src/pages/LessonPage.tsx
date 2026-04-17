// Lesson Page - Individual lesson with IDE, validation, and end-of-lesson challenge

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IDEContainer } from '@components/ide/IDEContainer';
import { useProgressStore } from '@store/useProgressStore';
import { getLessonById } from '@data/courses/beginner';
import { validateCodeWithAI } from '@services/aiValidator';
import { ChatbotButton } from '@components/chatbot/ChatbotButton';
import { Zap, SkipForward, Lightbulb } from 'lucide-react';

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const {
    addCompletedLesson,
    addXP,
    completedLessons,
    isLessonUnlocked,
    getItemQuantity,
    activateXPBoost,
    skipChallenge,
    hasActiveXPBoost
  } = useProgressStore();

  // Get the actual lesson data
  const lesson = getLessonById(lessonId!);

  // If lesson not found, show error
  if (!lesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">
            This lesson doesn't exist or hasn't been created yet.
          </p>
          <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Check if lesson is unlocked
  const isUnlocked = isLessonUnlocked(lessonId!);
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lesson Locked</h1>
          <p className="text-gray-600 mb-6">
            Complete the previous lesson to unlock this one.
          </p>
          <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Lesson state
  const [showHints, setShowHints] = useState(false);

  // Challenge state
  const [challengeCode, setChallengeCode] = useState(lesson.challenge?.starterCode || '');
  const [challengeValidated, setChallengeValidated] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(false);
  const [challengeOutput, setChallengeOutput] = useState('');
  const [showChallengeHints, setShowChallengeHints] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [awardedXP, setAwardedXP] = useState(0);

  const isCompleted = completedLessons.some(cl => cl.lessonId === lessonId);

  async function handleValidateChallenge() {
    if (!lesson.challenge) return;

    setIsValidating(true);
    setChallengeValidated(false);

    try {
      // Use AI to validate the code
      const result = await validateCodeWithAI({
        challengePrompt: lesson.challenge.prompt,
        studentCode: challengeCode,
        expectedSolution: lesson.challenge.solution,
        hints: lesson.challenge.hints,
      });

      setChallengeValidated(true);
      setChallengeCorrect(result.isCorrect);

      if (result.isCorrect) {
        // Award challenge XP immediately when AI validates correctly
        const xpAmount = lesson.challenge!.xpReward;
        const boosted = hasActiveXPBoost();
        const earned = boosted ? xpAmount * 2 : xpAmount;
        addXP(earned);
        setAwardedXP(earned);
        setChallengeOutput(`✅ ${result.feedback}\n\nGreat job! Click "Continue to Quiz" to complete this lesson.`);
      } else {
        // Show AI feedback with suggestions
        let feedback = result.feedback;
        if (result.suggestions && result.suggestions.length > 0) {
          feedback += '\n\nSuggestions:\n' + result.suggestions.map(s => `• ${s}`).join('\n');
        }
        setChallengeOutput(feedback);
      }
    } catch (error) {
      setChallengeValidated(true);
      setChallengeCorrect(false);
      setChallengeOutput(`❌ Error validating code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsValidating(false);
    }
  }

  function handleNext() {
    // Navigate to game page
    navigate(`/game/${lessonId}`);
  }

  function handleSkipChallenge() {
    const success = skipChallenge(lessonId!);
    if (success) {
      navigate(`/game/${lessonId}`);
    }
  }

  function handleActivateBoost() {
    activateXPBoost();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold">
              ← Back to Course
            </Link>

            <div className="flex items-center gap-4">
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold">Completed</span>
                </div>
              )}

              {hasActiveXPBoost() && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-lg">⚡</span>
                  <span className="text-sm font-semibold">2x XP Active!</span>
                </div>
              )}

              <div className="text-sm text-gray-600">
                <span className="font-semibold text-purple-600">
                  {hasActiveXPBoost() ? (lesson.challenge?.xpReward ?? lesson.xpReward) * 2 : (lesson.challenge?.xpReward ?? lesson.xpReward)} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Lesson Content */}
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {lesson.content.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200 prose prose-purple max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.content.explanation.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Hints */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>

              {showHints && (
                <div className="mt-4 space-y-2">
                  {lesson.hints.map((hint, index) => (
                    <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-gray-700 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Challenge Section */}
          <div className="space-y-6">
            {lesson.challenge && (
            <div className="bg-blue-50 rounded-xl shadow-2xl p-8 border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:'linear-gradient(135deg,#2563eb,#4338ca)'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Challenge: Earn {lesson.challenge.xpReward} XP!</h2>
                <p className="text-gray-600">Put your new skills to the test</p>
              </div>
            </div>

            {/* Challenge Prompt */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Task:</h3>
              <div className="text-gray-700 whitespace-pre-wrap">{lesson.challenge.prompt}</div>
            </div>

            {/* Challenge IDE */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-200">
              <IDEContainer
                initialCode={lesson.challenge.starterCode || '# Write your solution here\n'}
                onCodeChange={setChallengeCode}
                showRunButton={true}
              />

              {/* Challenge Actions */}
              <div className="mt-6 space-y-4">
                {/* Power-ups Section */}
                {!challengeValidated && (
                  <div className="flex gap-2">
                    {/* XP Boost Button */}
                    {getItemQuantity('xp-boost') > 0 && !hasActiveXPBoost() && (
                      <button
                        onClick={handleActivateBoost}
                        className="flex-1 btn-green px-4 py-2 rounded-lg transition-all text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Activate 2x XP ({getItemQuantity('xp-boost')})
                      </button>
                    )}

                    {/* Skip Token Button */}
                    {getItemQuantity('skip-token') > 0 && (
                      <button
                        onClick={handleSkipChallenge}
                        className="flex-1 btn-orange px-4 py-2 rounded-lg transition-all text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <SkipForward className="w-4 h-4" />
                        Skip Challenge ({getItemQuantity('skip-token')})
                      </button>
                    )}
                  </div>
                )}

                {/* Hints Button */}
                {lesson.challenge.hints && lesson.challenge.hints.length > 0 && !challengeValidated && (
                  <div>
                    <button
                      onClick={() => setShowChallengeHints(!showChallengeHints)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {showChallengeHints ? 'Hide Hints' : 'Need a Hint?'}
                      {getItemQuantity('hint-pack') > 0 && (
                        <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded-full">
                          +{getItemQuantity('hint-pack') * 3} bonus hints
                        </span>
                      )}
                    </button>
                    {showChallengeHints && (
                      <div className="mt-2 space-y-2">
                        {lesson.challenge.hints.map((hint, index) => (
                          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-gray-700 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> {hint}
                          </div>
                        ))}
                        {getItemQuantity('hint-pack') > 0 && (
                          <>
                            <div className="border-l-4 border-yellow-500 p-3 text-sm text-gray-700 flex items-start gap-2" style={{background:'#fffbeb'}}>
                              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> <strong>Bonus Hint:</strong> Try breaking down the problem into smaller steps. Write one line at a time and test each part.
                            </div>
                            <div className="border-l-4 border-yellow-500 p-3 text-sm text-gray-700 flex items-start gap-2" style={{background:'#fffbeb'}}>
                              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> <strong>Bonus Hint:</strong> Review the lesson content above. The answer often follows the same pattern as the examples shown.
                            </div>
                            <div className="border-l-4 border-yellow-500 p-3 text-sm text-gray-700 flex items-start gap-2" style={{background:'#fffbeb'}}>
                              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> <strong>Bonus Hint:</strong> Use print() statements to check what your code is doing at each step. This helps you find where things go wrong.
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Validate Button */}
                <div className="flex gap-4">
                  <button
                    onClick={handleValidateChallenge}
                    disabled={isValidating || (challengeValidated && challengeCorrect)}
                    className={`flex-1 font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg ${
                      (challengeValidated && challengeCorrect) || isValidating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'btn-indigo hover:shadow-xl'
                    }`}
                  >
                    {isValidating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Validating with AI...
                      </span>
                    ) : challengeValidated && challengeCorrect ? (
                      '✓ Challenge Complete!'
                    ) : (
                      'Validate Challenge'
                    )}
                  </button>

                  {challengeValidated && challengeCorrect && (
                    <button
                      onClick={handleNext}
                      className="flex-1 btn-green font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Continue to Quiz
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Challenge Feedback */}
                {challengeValidated && (
                  <div className={`p-4 rounded-lg border-l-4 ${
                    challengeCorrect
                      ? 'bg-green-50 border-green-400'
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {challengeCorrect ? '🎉' : '📚'}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold mb-1 ${
                          challengeCorrect ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {challengeCorrect
                            ? awardedXP > lesson.challenge!.xpReward
                              ? `Success! +${awardedXP} XP (2x Boost Applied! ⚡)`
                              : `Success! +${awardedXP} XP`
                            : 'Not Quite Right'}
                        </div>
                        <div className={`text-sm whitespace-pre-wrap ${
                          challengeCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {challengeOutput}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
            )}
          </div>
        </div>
      </main>

      {/* AI Chatbot with lesson context */}
      <ChatbotButton
        lessonContext={{
          lessonId: lessonId!,
          lessonTitle: lesson.title,
          concepts: lesson.content.concepts,
          challengePrompt: lesson.challenge?.prompt,
        }}
      />
    </div>
  );
}
