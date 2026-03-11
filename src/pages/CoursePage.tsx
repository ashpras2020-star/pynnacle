// Course Page - Overview of all modules in a course

import { useParams, Link } from 'react-router-dom';
import { useProgressStore } from '@store/useProgressStore';
import { getUnlockCost, isLessonAvailableToPurchase } from '@utils/unlockCosts';

// Mock module data - will be replaced with actual data later
const BEGINNER_MODULES = [
  // 1. Basics & Syntax — foundation: variables, print, operators
  {
    id: 'module-1',
    title: 'Basics & Syntax',
    description: 'Variables, data types, print statements, and basic operators',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-1-1', title: 'Your First Python Program', completed: false },
      { id: 'lesson-1-2', title: 'Variables and Types', completed: false },
      { id: 'lesson-1-3', title: 'Basic Math', completed: false },
      { id: 'lesson-1-4', title: 'Comments', completed: false },
      { id: 'lesson-1-5', title: 'Input and Output', completed: false },
    ],
  },
  // 2. Numbers & Math — builds directly on variables/operators
  {
    id: 'module-2',
    title: 'Working with Numbers & Math',
    description: 'Math operations, math module, random numbers, type conversion, and formatting',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-2-1', title: 'Advanced Math Operations', completed: false },
      { id: 'lesson-2-2', title: 'The Math Module', completed: false },
      { id: 'lesson-2-3', title: 'Random Numbers', completed: false },
      { id: 'lesson-2-4', title: 'Type Conversion', completed: false },
      { id: 'lesson-2-5', title: 'Number Formatting', completed: false },
    ],
  },
  // 3. String Manipulation — core data type, needed before control flow examples
  {
    id: 'module-3',
    title: 'String Manipulation',
    description: 'String methods, formatting, and text processing',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-3-1', title: 'String Methods', completed: false },
      { id: 'lesson-3-2', title: 'String Concatenation', completed: false },
      { id: 'lesson-3-3', title: 'F-Strings', completed: false },
      { id: 'lesson-3-4', title: 'String Formatting', completed: false },
      { id: 'lesson-3-5', title: 'Working with Text', completed: false },
    ],
  },
  // 4. Boolean Logic — comparisons & logical operators, prerequisite for if/else
  {
    id: 'module-4',
    title: 'Boolean Logic & Comparisons',
    description: 'Comparison operators, logical operators, truthiness, and boolean expressions',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-4-1', title: 'Comparison Operators', completed: false },
      { id: 'lesson-4-2', title: 'Logical Operators', completed: false },
      { id: 'lesson-4-3', title: 'Truthiness and Falsiness', completed: false },
      { id: 'lesson-4-4', title: 'Boolean Expressions', completed: false },
      { id: 'lesson-4-5', title: 'Combining Conditions', completed: false },
    ],
  },
  // 5. Control Flow — if/else/loops, requires booleans
  {
    id: 'module-5',
    title: 'Control Flow',
    description: 'If/elif/else statements, while loops, for loops',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-5-1', title: 'If Statements', completed: false },
      { id: 'lesson-5-2', title: 'Else and Elif', completed: false },
      { id: 'lesson-5-3', title: 'While Loops', completed: false },
      { id: 'lesson-5-4', title: 'For Loops', completed: false },
      { id: 'lesson-5-5', title: 'Break and Continue', completed: false },
    ],
  },
  // 6. Collections — lists, dicts, tuples, sets
  {
    id: 'module-6',
    title: 'Collections',
    description: 'Lists, dictionaries, tuples, and sets',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-6-1', title: 'Lists Basics', completed: false },
      { id: 'lesson-6-2', title: 'List Indexing and Slicing', completed: false },
      { id: 'lesson-6-3', title: 'Dictionaries', completed: false },
      { id: 'lesson-6-4', title: 'Tuples', completed: false },
      { id: 'lesson-6-5', title: 'Sets', completed: false },
    ],
  },
  // 7. Functions — requires data types + control flow understanding
  {
    id: 'module-7',
    title: 'Functions',
    description: 'Defining functions, parameters, return values, and scope',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-7-1', title: 'Defining Functions', completed: false },
      { id: 'lesson-7-2', title: 'Function Parameters', completed: false },
      { id: 'lesson-7-3', title: 'Return Values', completed: false },
      { id: 'lesson-7-4', title: 'Scope', completed: false },
      { id: 'lesson-7-5', title: 'Built-in Functions', completed: false },
    ],
  },
  // 8. List Comprehensions — combines loops + lists
  {
    id: 'module-8',
    title: 'List Comprehensions & Advanced Lists',
    description: 'List comprehensions, filtering, nested lists, and advanced list operations',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-8-1', title: 'List Comprehensions Basics', completed: false },
      { id: 'lesson-8-2', title: 'Filtering with Conditions', completed: false },
      { id: 'lesson-8-3', title: 'Nested Lists', completed: false },
      { id: 'lesson-8-4', title: 'Advanced List Methods', completed: false },
      { id: 'lesson-8-5', title: 'Enumerate and Zip', completed: false },
    ],
  },
  // 9. Error Handling — requires understanding of code flow & functions
  {
    id: 'module-9',
    title: 'Error Handling',
    description: 'Understanding errors, try/except blocks, and debugging techniques',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-9-1', title: 'Understanding Errors', completed: false },
      { id: 'lesson-9-2', title: 'Try and Except', completed: false },
      { id: 'lesson-9-3', title: 'Specific Exceptions', completed: false },
      { id: 'lesson-9-4', title: 'Finally and Else', completed: false },
      { id: 'lesson-9-5', title: 'Debugging Techniques', completed: false },
    ],
  },
  // 10. File I/O — requires error handling, strings, and functions
  {
    id: 'module-10',
    title: 'File I/O',
    description: 'Reading and writing files, file paths, and processing text files',
    lessonCount: 5,
    lessons: [
      { id: 'lesson-10-1', title: 'Opening and Closing Files', completed: false },
      { id: 'lesson-10-2', title: 'Reading Files', completed: false },
      { id: 'lesson-10-3', title: 'Writing Files', completed: false },
      { id: 'lesson-10-4', title: 'File Paths', completed: false },
      { id: 'lesson-10-5', title: 'Processing Files', completed: false },
    ],
  },
];

export function CoursePage() {
  const { courseId } = useParams();
  const {
    completedLessons,
    isLessonUnlocked,
    isModuleCompleted,
    unlockLesson,
    canUnlockLesson,
    getAvailableXP,
    isAssessmentPassed
  } = useProgressStore();

  const availableXP = getAvailableXP();

  function handleUnlockLesson(lessonId: string) {
    const cost = getUnlockCost(lessonId);
    const success = unlockLesson(lessonId, cost);
    if (!success) {
      alert(`Not enough XP! You need ${cost} XP but only have ${availableXP} XP available.`);
    }
  }

  if (courseId !== 'beginner') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Locked</h1>
          <p className="text-gray-600 mb-6">
            Complete the previous course to unlock this one.
          </p>
          <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 font-semibold mb-4 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Beginner Course
              </h1>
              <p className="text-gray-600 mt-2">
                Master Python fundamentals through 10 modules and 50 interactive lessons
              </p>
            </div>

            {/* XP Balance */}
            <div className="bg-purple-50 rounded-xl px-6 py-4 border-2 border-purple-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{availableXP}</div>
                <div className="text-xs text-gray-600 mt-1">Available XP</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Use to unlock lessons
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Course Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <span className="text-sm text-gray-500">
              {completedLessons.length} / 50 lessons completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons.length / 50) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {BEGINNER_MODULES.map((module, index) => {
            const moduleCompleted = true; // TODO: revert — was: module.lessons.every(lesson => completedLessons.some(cl => cl.lessonId === lesson.id));
            const completedCount = module.lessons.filter(lesson =>
              completedLessons.some(cl => cl.lessonId === lesson.id)
            ).length;

            // Check if this module is locked (need to pass previous module's assessment)
            const isModuleLocked = false; // TODO: revert — was: index > 0 && !isAssessmentPassed(BEGINNER_MODULES[index - 1].id);
            const previousModuleNumber = index;

            // If module is locked, render locked state
            if (isModuleLocked) {
              return (
                <div key={module.id} className="bg-gray-50 rounded-xl shadow-lg p-6 border-2 border-gray-300 opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-500">{module.title}</h3>
                      </div>
                      <p className="text-gray-500 ml-13">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        🔒 Locked
                      </div>
                    </div>
                  </div>

                  {/* Locked Message */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⚠️</div>
                      <div>
                        <div className="font-semibold text-orange-800 mb-1">Assessment Required</div>
                        <div className="text-sm text-orange-700">
                          Complete <strong>Module {previousModuleNumber} Assessment</strong> with a score of <strong>80% or higher</strong> to unlock this module.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grayed out lessons preview */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 opacity-50 pointer-events-none">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="p-4 rounded-lg border-2 bg-gray-100 border-gray-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              Lesson {lessonIndex + 1}
                            </div>
                            <div className="font-semibold text-gray-600">
                              {lesson.title}
                            </div>
                          </div>
                          <div className="text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{module.title}</h3>
                      {moduleCompleted && (
                        <div className="text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                      {isAssessmentPassed(module.id) && (
                        <div className="px-3 py-1 bg-green-100 border-2 border-green-300 rounded-full text-xs font-bold text-green-700">
                          ✅ Assessment Passed
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 ml-13">{module.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {completedCount} / {module.lessonCount} lessons
                    </div>
                  </div>
                </div>

                {/* Lessons */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.some(cl => cl.lessonId === lesson.id);
                    const isUnlocked = isLessonUnlocked(lesson.id);
                    const unlockCost = getUnlockCost(lesson.id);
                    const canAfford = canUnlockLesson(lesson.id, unlockCost);
                    const canPurchase = isLessonAvailableToPurchase(
                      lesson.id,
                      completedLessons.map(c => c.lessonId)
                    );

                    // Unlocked and accessible
                    if (isUnlocked) {
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${lesson.id}`}
                          className="group"
                        >
                          <div className={`
                            p-4 rounded-lg border-2 transition-all duration-200
                            ${isCompleted
                              ? 'bg-green-50 border-green-300 hover:border-green-400'
                              : 'bg-gray-50 border-gray-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer'
                            }
                          `}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-1">
                                  Lesson {lessonIndex + 1}
                                </div>
                                <div className="font-semibold text-gray-800 group-hover:text-purple-600">
                                  {lesson.title}
                                </div>
                              </div>
                              {isCompleted && (
                                <div className="text-green-600">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    }

                    // Locked - show unlock button if can purchase
                    return (
                      <div key={lesson.id}>
                        <div className="p-4 rounded-lg border-2 bg-gray-100 border-gray-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">
                                Lesson {lessonIndex + 1}
                              </div>
                              <div className="font-semibold text-gray-600">
                                {lesson.title}
                              </div>
                            </div>
                            <div className="text-gray-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          </div>

                          {canPurchase ? (
                            <button
                              onClick={() => handleUnlockLesson(lesson.id)}
                              disabled={!canAfford}
                              className={`
                                w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                                ${canAfford
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-md hover:shadow-lg'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }
                              `}
                            >
                              {canAfford ? (
                                <>
                                  <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    Unlock for {unlockCost} XP
                                  </span>
                                </>
                              ) : (
                                `Need ${unlockCost - availableXP} more XP`
                              )}
                            </button>
                          ) : (
                            <div className="text-xs text-gray-500 text-center py-2">
                              Complete previous lesson first
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Module Actions */}
                {moduleCompleted && (
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                    <Link
                      to={`/assessment/${module.id}`}
                      className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                        isAssessmentPassed(module.id)
                          ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isAssessmentPassed(module.id)
                        ? `Retake Module ${index + 1} Assessment`
                        : `Take Module ${index + 1} Assessment`
                      }
                    </Link>
                    {module.id !== 'module-5' && module.id !== 'module-6' && module.id !== 'module-3' && module.id !== 'module-2' && module.id !== 'module-4' && module.id !== 'module-7' && module.id !== 'module-8' && module.id !== 'module-9' && module.id !== 'module-10' && (
                      <Link
                        to={`/debug/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Debug Detective
                      </Link>
                    )}
                    {module.id === 'module-2' && (
                      <Link
                        to={`/mathquest/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Math Quest
                      </Link>
                    )}
                    {module.id === 'module-5' && (
                      <Link
                        to={`/guardgate/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        🏰 Guard Gate
                      </Link>
                    )}
                    {module.id === 'module-6' && (
                      <Link
                        to={`/listchef/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        🍳 List Chef
                      </Link>
                    )}
                    {module.id === 'module-3' && (
                      <Link
                        to={`/ciphercracker/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-800 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        🔐 Cipher Cracker
                      </Link>
                    )}
                    {module.id === 'module-4' && (
                      <Link
                        to={`/booleanbouncer/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-fuchsia-800 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        🕶️ Boolean Bouncer
                      </Link>
                    )}
                    {module.id === 'module-7' && (
                      <Link
                        to={`/robotcommander/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        🤖 Robot Commander
                      </Link>
                    )}
                    {module.id === 'module-8' && (
                      <Link
                        to={`/conveyorcrafter/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        🏭 Conveyor Crafter
                      </Link>
                    )}
                    {module.id === 'module-9' && (
                      <Link
                        to={`/coderescue/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        🛸 Station Rescue
                      </Link>
                    )}
                    {module.id === 'module-10' && (
                      <Link
                        to={`/filesorter/${module.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-emerald-800 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        📂 File Sorter
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
