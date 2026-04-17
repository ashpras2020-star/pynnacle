// Debug Detective Game Component
// Find and fix bugs in Python code — Detective noir theme

import { useState, useEffect } from 'react';
import type { DebugGame } from '../../../types/game';

interface DebugDetectiveProps {
  game: DebugGame;
  onComplete: (score: number, xpEarned: number) => void;
}

export function DebugDetective({ game, onComplete }: DebugDetectiveProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [challengeStartTime, setChallengeStartTime] = useState(Date.now());

  const currentChallenge = game.challenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex === game.challenges.length - 1;
  const codeLines = currentChallenge.code.split('\n');

  useEffect(() => {
    setChallengeStartTime(Date.now());
  }, [currentChallengeIndex]);

  function handleLineClick(lineNumber: number) {
    if (showFeedback) return;

    setSelectedLines(prev => {
      if (prev.includes(lineNumber)) {
        return prev.filter(l => l !== lineNumber);
      } else {
        return [...prev, lineNumber];
      }
    });
  }

  function handleSubmit() {
    const selectedSet = new Set(selectedLines.sort());
    const bugSet = new Set(currentChallenge.bugLines.sort());
    const correct = selectedSet.size === bugSet.size &&
                   [...selectedSet].every(line => bugSet.has(line));

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const timeBonus = Math.max(0, 30 - Math.floor((Date.now() - challengeStartTime) / 1000));
      const hintPenalty = hintsUsed * 5;
      const challengeScore = Math.max(10, 30 - hintPenalty + timeBonus);
      setScore(prev => prev + challengeScore);
    }
  }

  function handleNext() {
    if (isLastChallenge) {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      const perfect = score === game.challenges.length * 30;
      const xpEarned = game.baseXP + (perfect ? game.bonusXP : 0);
      onComplete(score, xpEarned);
    } else {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedLines([]);
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);
      setHintsUsed(0);
    }
  }

  function handleHint() {
    if (hintsUsed < currentChallenge.hints.length) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  }

  const difficultyLabels: Record<string, { label: string; color: string }> = {
    easy: { label: 'LOW RISK', color: 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30' },
    medium: { label: 'MODERATE', color: 'bg-amber-900/50 text-amber-400 border border-amber-500/30' },
    hard: { label: 'HIGH RISK', color: 'bg-red-900/50 text-red-400 border border-red-500/30' },
  };

  return (
    <div className="max-w-5xl mx-auto animate-dd-fade-in">
      {/* Case File Header */}
      <div className="dd-panel rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🔍</span>
              <h2 className="text-2xl font-bold text-amber-400">{game.title}</h2>
            </div>
            <p className="text-slate-400 mt-1 ml-11">{game.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-400 font-mono">{score}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Case Score</div>
          </div>
        </div>

        {/* Investigation Progress */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-400 whitespace-nowrap">
            Case {currentChallengeIndex + 1} of {game.challenges.length}
          </span>
          <div className="flex-1 bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{background:'linear-gradient(to right,#f59e0b,#fbbf24)', width: `${((currentChallengeIndex + 1) / game.challenges.length) * 100}%`}}
            />
          </div>
          <span className="text-xs text-amber-400/60 font-mono">
            {Math.round(((currentChallengeIndex + 1) / game.challenges.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Case Details */}
      <div className="dd-panel rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-200">
              <span className="text-amber-500 font-mono mr-2">CASE #{currentChallengeIndex + 1}:</span>
              {currentChallenge.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2.5 py-1 rounded font-mono uppercase tracking-wider ${difficultyLabels[currentChallenge.difficulty].color}`}>
                {difficultyLabels[currentChallenge.difficulty].label}
              </span>
              {currentChallenge.concepts.map(concept => (
                <span key={concept} className="dd-tag text-xs px-2.5 py-1 rounded font-mono">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-amber-400">🔎</span>
          <p className="text-slate-300 font-semibold">Examine the evidence and identify the bugs</p>
        </div>
        <p className="text-sm text-slate-500 ml-7 -mt-2 mb-4">Click on suspicious lines to mark them</p>

        {/* Evidence Document (Code Display) */}
        <div className="dd-evidence rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20">
            <span className="text-amber-400 text-sm">📄</span>
            <span className="text-amber-400/80 text-xs font-mono uppercase tracking-widest">Evidence Document</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="font-mono text-sm">
              {codeLines.map((line, index) => {
                const lineNumber = index + 1;
                const isSelected = selectedLines.includes(lineNumber);
                const isBugLine = currentChallenge.bugLines.includes(lineNumber);
                const showAsCorrect = showFeedback && isBugLine && isSelected;
                const showAsWrong = showFeedback && !isBugLine && isSelected;
                const showAsMissed = showFeedback && isBugLine && !isSelected;

                return (
                  <div
                    key={index}
                    onClick={() => handleLineClick(lineNumber)}
                    className={`flex items-start cursor-pointer px-3 py-1 rounded transition-all ${
                      !showFeedback ? 'hover:bg-amber-500/10' : ''
                    } ${
                      isSelected && !showFeedback
                        ? 'bg-amber-500/20 border-l-2 border-amber-400 animate-dd-evidence-glow'
                        : 'border-l-2 border-transparent'
                    } ${showAsCorrect ? 'bg-emerald-500/20 border-l-2 !border-emerald-400' : ''} ${
                      showAsWrong ? 'bg-red-500/20 border-l-2 !border-red-400' : ''
                    } ${showAsMissed ? 'bg-amber-500/10 border-l-2 !border-amber-400/50' : ''}`}
                  >
                    <span className="text-amber-500/50 select-none mr-4 min-w-[2rem] text-right font-mono text-xs leading-6">
                      {lineNumber}
                    </span>
                    <div className="flex items-center gap-2 flex-1">
                      {showFeedback && (
                        <span className="text-xs font-mono font-bold whitespace-nowrap">
                          {showAsCorrect && <span className="text-emerald-400">FOUND</span>}
                          {showAsWrong && <span className="text-red-400">FALSE LEAD</span>}
                          {showAsMissed && <span className="text-amber-400 animate-dd-pulse">MISSED</span>}
                        </span>
                      )}
                      <span className={`leading-6 ${line.trim() ? 'text-slate-300' : 'text-slate-600'}`}>
                        {line || ' '}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Field Notes (Hints) */}
        {!showFeedback && (
          <div className="mt-4">
            <button
              onClick={handleHint}
              disabled={hintsUsed >= currentChallenge.hints.length}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                hintsUsed >= currentChallenge.hints.length
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <span>📓</span>
              {hintsUsed >= currentChallenge.hints.length ? 'No more field notes' : 'Consult Field Notes'}
              <span className="text-xs text-slate-500">(-5 pts)</span>
            </button>
            {showHint && (
              <div className="mt-3 dd-notebook rounded-lg p-4">
                <p className="text-amber-400 font-semibold text-sm mb-1 font-mono">Field Note #{hintsUsed}:</p>
                <p className="text-slate-300 italic">{currentChallenge.hints[hintsUsed - 1]}</p>
              </div>
            )}
          </div>
        )}

        {/* Case Report (Feedback) */}
        {showFeedback && (
          <div className={`mt-6 rounded-lg border animate-dd-fade-in ${
            isCorrect
              ? 'bg-emerald-900/30 border-emerald-500/30'
              : 'bg-red-900/20 border-red-500/30'
          }`}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">
                  {isCorrect ? '🏆' : '📋'}
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-bold mb-2 font-mono ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect ? 'CASE SOLVED!' : 'CASE REMAINS OPEN'}
                  </h4>

                  {!isCorrect && (
                    <div className="mb-4">
                      <p className="text-slate-400 mb-2 text-sm uppercase tracking-wider">Bug locations:</p>
                      <div className="flex gap-2">
                        {currentChallenge.bugLines.map(line => (
                          <span key={line} className="bg-red-900/50 text-red-400 border border-red-500/30 px-3 py-1 rounded font-mono text-sm">
                            Line {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="font-semibold text-amber-400 mb-2 text-sm uppercase tracking-wider">Evidence Found:</p>
                    <ul className="space-y-1">
                      {currentChallenge.bugDescriptions.map((desc, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">▸</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-amber-400 mb-2 text-sm uppercase tracking-wider">Recommended Fix:</p>
                    <ul className="space-y-1">
                      {currentChallenge.fixes.map((fix, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">▸</span>
                          {fix}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="dd-notebook rounded-lg p-4 mt-4">
                    <p className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">Case Notes</p>
                    <p className="text-slate-300 text-sm italic">{currentChallenge.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => setSelectedLines([])}
          disabled={showFeedback || selectedLines.length === 0}
          className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-slate-600"
        >
          Clear Selection
        </button>

        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedLines.length === 0}
            className="px-8 py-3 text-slate-900 font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all" style={{background:'linear-gradient(to right,#f59e0b,#f97316)'}}
          >
            🔏 Submit Report
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 text-slate-900 font-bold rounded-lg shadow-lg transition-all" style={{background:'linear-gradient(to right,#f59e0b,#f97316)'}}
          >
            {isLastChallenge ? 'Close Case File' : 'Next Case'} →
          </button>
        )}
      </div>
    </div>
  );
}
