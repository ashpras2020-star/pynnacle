// Assessment Page - Module assessment with questions and scoring

import { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAssessmentByModule } from '@data/courses/beginner/assessments';
import { useProgressStore } from '@store/useProgressStore';
import { selectAssessmentQuestions } from '@utils/questionRandomizer';
import type { AssessmentQuestion } from '@types';

export function AssessmentPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addCompletedAssessment } = useProgressStore();

  // Get assessment data
  const assessment = getAssessmentByModule(moduleId!);

  const pickQuestions = useCallback(
    () => assessment ? selectAssessmentQuestions(assessment.questions, 20) : [],
    [assessment],
  );
  const [questions, setQuestions] = useState(pickQuestions);

  // State
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Timer state
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  if (!assessment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment Not Found</h1>
          <p className="text-gray-600 mb-6">
            This assessment doesn't exist or hasn't been created yet.
          </p>
          <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  function handleAnswerChange(questionId: string, answerIndex: number) {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  }

  function handleSubmit() {
    // Calculate score
    let totalScore = 0;
    let earnedScore = 0;

    questions.forEach((question: AssessmentQuestion) => {
      totalScore += question.points;
      const userAnswer = answers[question.id];

      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        earnedScore += question.points;
      }
    });

    const percentageScore = Math.round((earnedScore / totalScore) * 100);
    const passed = percentageScore >= assessment.passingScore;

    setScore(earnedScore);
    setPercentage(percentageScore);
    setCompletionTime(Date.now() - startTime);
    setSubmitted(true);

    // Save assessment completion to progress store
    addCompletedAssessment({
      moduleId: moduleId!,
      score: earnedScore,
      percentage: percentageScore,
      passed: passed,
      completedAt: new Date().toISOString(),
    });

    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRetry() {
    setQuestions(pickQuestions()); // Re-randomize questions on retry
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPercentage(0);
    setCompletionTime(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
  const passed = percentage >= assessment.passingScore;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/course/beginner" className="text-purple-600 hover:text-purple-700 font-semibold mb-4 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            {assessment.title}
          </h1>
          <p className="text-gray-600 mt-2">
            {assessment.description}
          </p>
          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            <span>📝 {questions.length} questions</span>
            <span>📊 {assessment.totalPoints} points</span>
            <span>✅ {assessment.passingScore}% to pass</span>
            {assessment.timeLimit && <span>⏱️ {assessment.timeLimit} minutes</span>}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Results Banner */}
        {submitted && (
          <div className={`rounded-xl p-6 mb-8 ${
            passed
              ? 'bg-green-50 border-2 border-green-300'
              : 'bg-red-50 border-2 border-red-300'
          }`}>
            <div className="flex items-start gap-4">
              <div className="text-5xl">
                {passed ? '🎉' : '📚'}
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold mb-2 ${
                  passed ? 'text-green-800' : 'text-red-800'
                }`}>
                  {passed ? 'Congratulations! You Passed!' : 'Keep Learning!'}
                </h2>
                <div className={`mb-3 ${passed ? 'text-green-700' : 'text-red-700'}`}>
                  <p className="text-lg">
                    You scored {score}/{assessment.totalPoints} points ({percentage}%)
                  </p>
                  {completionTime && (
                    <p className="text-sm mt-1">
                      ⏱️ Completed in {formatTime(completionTime)}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  {passed ? (
                    <button
                      onClick={() => navigate('/course/beginner')}
                      className="btn-green font-semibold px-6 py-2 rounded-lg transition-all duration-200"
                    >
                      Continue to Next Module
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleRetry}
                        className="btn-purple font-semibold px-6 py-2 rounded-lg transition-all duration-200"
                      >
                        Retry Assessment
                      </button>
                      <button
                        onClick={() => navigate('/course/beginner')}
                        className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200"
                      >
                        Review Lessons
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question: AssessmentQuestion, index: number) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const showFeedback = submitted;

            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                  showFeedback
                    ? isCorrect
                      ? 'border-green-300'
                      : userAnswer !== undefined
                      ? 'border-red-300'
                      : 'border-purple-200'
                    : 'border-purple-200'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
                        Question {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">
                        {question.points} points
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {question.question}
                    </h3>
                  </div>
                  {showFeedback && (
                    <div className="text-3xl">
                      {isCorrect ? '✅' : userAnswer !== undefined ? '❌' : '⚪'}
                    </div>
                  )}
                </div>

                {/* Options */}
                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option: string, optionIndex: number) => {
                      const isSelected = userAnswer === optionIndex;
                      const isCorrectOption = optionIndex === question.correctAnswer;
                      const showAsCorrect = showFeedback && isCorrectOption;
                      const showAsWrong = showFeedback && isSelected && !isCorrect;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => !submitted && handleAnswerChange(question.id, optionIndex)}
                          disabled={submitted}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                            submitted
                              ? showAsCorrect
                                ? 'bg-green-50 border-green-400 cursor-default'
                                : showAsWrong
                                ? 'bg-red-50 border-red-400 cursor-default'
                                : 'bg-gray-50 border-gray-200 cursor-default'
                              : isSelected
                              ? 'bg-purple-50 border-purple-400'
                              : 'bg-white border-gray-300 hover:border-purple-300 hover:bg-purple-50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              submitted
                                ? showAsCorrect
                                  ? 'border-green-500 bg-green-500'
                                  : showAsWrong
                                  ? 'border-red-500 bg-red-500'
                                  : 'border-gray-300'
                                : isSelected
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-400'
                            }`}>
                              {(isSelected || showAsCorrect) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium ${
                              submitted
                                ? showAsCorrect
                                  ? 'text-green-800'
                                  : showAsWrong
                                  ? 'text-red-800'
                                  : 'text-gray-700'
                                : isSelected
                                ? 'text-purple-800'
                                : 'text-gray-800'
                            }`}>
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation (shown after submission) */}
                {showFeedback && (
                  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 text-xl">💡</span>
                      <div>
                        <div className="font-semibold text-blue-800 mb-1">Explanation:</div>
                        <div className="text-blue-700 text-sm">{question.explanation}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                allQuestionsAnswered
                  ? 'btn-purple shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allQuestionsAnswered
                ? 'Submit Assessment'
                : `Answer all questions (${Object.keys(answers).length}/${questions.length})`
              }
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
