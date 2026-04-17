// Global badge-earned notification — fires whenever the user earns a new badge

import { useEffect, useRef, useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';
import { ALL_BADGES, getEarnedBadgeIds } from '@data/badges';
import type { BadgeProgress } from '@data/badges';
import type { Badge } from '@data/badges';

const STORAGE_KEY = 'pynnacle_seen_badges';

function getSeenBadges(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function persistSeenBadges(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

export function BadgeEarnedToast() {
  const { currentStreak, totalXP, completedLessons, completedAssessments, purchasedItems } = useProgressStore();

  // Queue of badges to show
  const [queue, setQueue] = useState<Badge[]>([]);
  const [current, setCurrent] = useState<Badge | null>(null);
  const [visible, setVisible] = useState(false);
  const seenRef = useRef<Set<string>>(getSeenBadges());
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build badge progress whenever relevant state changes
  useEffect(() => {
    let completedModuleCount = 0;
    for (let m = 1; m <= 10; m++) {
      const allDone = [1, 2, 3, 4, 5].every((l) =>
        completedLessons.some((c) => c.lessonId === `lesson-${m}-${l}`)
      );
      if (allDone) completedModuleCount++;
    }

    const progress: BadgeProgress = {
      currentStreak,
      totalXP,
      completedLessonCount: completedLessons.length,
      completedModuleCount,
      completedAssessmentCount: completedAssessments.filter((a) => a.passed).length,
      perfectAssessments: completedAssessments.filter((a) => a.percentage === 100).length,
      purchasedItemCount: purchasedItems.reduce((sum, i) => sum + i.quantity, 0),
    };

    const earnedIds = getEarnedBadgeIds(progress);
    const newlyEarned: Badge[] = [];

    for (const id of earnedIds) {
      if (!seenRef.current.has(id)) {
        seenRef.current.add(id);
        const badge = ALL_BADGES.find((b) => b.id === id);
        if (badge) newlyEarned.push(badge);
      }
    }

    if (newlyEarned.length > 0) {
      persistSeenBadges(seenRef.current);
      setQueue((prev) => [...prev, ...newlyEarned]);
    }
  }, [currentStreak, totalXP, completedLessons.length, completedAssessments.length, purchasedItems.length]);

  // Pop from queue when not showing
  useEffect(() => {
    if (!visible && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setVisible(true);
      setQueue(rest);

      // Auto-dismiss after 4s
      hideTimer.current = setTimeout(() => setVisible(false), 4000);
    }
  }, [queue, visible]);

  const dismiss = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(false);
  };

  if (!visible || !current) return null;

  return (
    <div
      className="fixed bottom-24 right-4 z-[9998] w-72"
      style={{ animation: 'badge-slide-in 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      <div className="bg-gray-900 border border-yellow-500/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Gold accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(to right, #eab308, #f59e0b, #fbbf24)' }} />
        <div className="p-4 flex items-center gap-3">
          {/* Badge icon with glow */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 0 20px rgba(168,85,247,0.5)',
              animation: 'badge-pop 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {current.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-0.5">
              Badge Unlocked!
            </p>
            <p className="text-white font-bold text-sm leading-tight">{current.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{current.description}</p>
          </div>
          <button
            onClick={dismiss}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 self-start"
          >
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes badge-slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes badge-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
