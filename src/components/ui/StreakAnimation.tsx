// Streak animation — shows after completing the first lesson of the day

import { useEffect, useState } from 'react';
import { useProgressStore } from '@store/useProgressStore';

export function StreakAnimation() {
  const streakAnimationData = useProgressStore((s) => s.streakAnimationData);
  const clearStreakAnimation = useProgressStore((s) => s.clearStreakAnimation);

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<{ prev: number; next: number } | null>(null);

  useEffect(() => {
    if (streakAnimationData) {
      setData(streakAnimationData);
      setVisible(true);
      clearStreakAnimation();

      const t = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(t);
    }
  }, [streakAnimationData]);

  if (!visible || !data) return null;

  const isFirstEver = data.prev === 0;

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none"
      style={{ animation: 'streak-fade-in 0.3s ease' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.55)', animation: 'streak-fade-in 0.3s ease' }}
      />

      {/* Card */}
      <div
        className="relative flex flex-col items-center gap-3 px-10 py-8 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #1a0533, #3b0764)',
          border: '1px solid rgba(251,191,36,0.4)',
          boxShadow: '0 0 60px rgba(251,191,36,0.2)',
          animation: 'streak-pop 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Flame emoji big */}
        <div style={{ fontSize: 72, lineHeight: 1, animation: 'streak-bounce 0.6s 0.3s ease both' }}>
          🔥
        </div>

        {/* Counter */}
        {!isFirstEver && (
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
              {data.prev}
            </span>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)' }}>→</span>
            <span style={{ fontSize: 48, color: '#fbbf24', fontWeight: 800, lineHeight: 1 }}>
              {data.next}
            </span>
          </div>
        )}

        <p style={{ color: '#fbbf24', fontWeight: 800, fontSize: 20, letterSpacing: '0.05em' }}>
          {isFirstEver ? 'Streak Started!' : 'Streak Extended!'}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
          {isFirstEver
            ? 'Complete a lesson every day to keep it going!'
            : `${data.next} day${data.next !== 1 ? 's' : ''} in a row — keep it up!`}
        </p>
      </div>

      <style>{`
        @keyframes streak-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes streak-pop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes streak-bounce {
          0%   { transform: translateY(0) scale(1); }
          40%  { transform: translateY(-12px) scale(1.15); }
          70%  { transform: translateY(4px) scale(0.95); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
