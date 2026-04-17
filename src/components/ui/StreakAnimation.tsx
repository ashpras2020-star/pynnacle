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

      const t = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(t);
    }
  }, [streakAnimationData]);

  const dismiss = () => setVisible(false);

  if (!visible || !data) return null;

  const isFirstEver = data.prev === 0;

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center"
      onClick={dismiss}
    >
      <style>{`
        @keyframes streak-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes streak-pop {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes streak-bounce {
          0%   { transform: translateY(0)   scale(1); }
          30%  { transform: translateY(-18px) scale(1.2); }
          60%  { transform: translateY(6px)  scale(0.9); }
          80%  { transform: translateY(-6px) scale(1.05); }
          100% { transform: translateY(0)   scale(1); }
        }
        @keyframes streak-number-in {
          from { transform: scale(0.5) translateY(10px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        .streak-backdrop {
          animation: streak-fade-in 0.3s ease forwards;
        }
        .streak-card {
          animation: streak-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .streak-flame {
          animation: streak-bounce 0.7s 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
          display: inline-block;
        }
        .streak-number {
          animation: streak-number-in 0.4s 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="streak-backdrop absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.65)' }}
      />

      {/* Card */}
      <div
        className="streak-card relative flex flex-col items-center gap-4 px-10 py-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1a0533, #3b0764)',
          border: '2px solid rgba(251,191,36,0.5)',
          boxShadow: '0 0 80px rgba(251,191,36,0.25), 0 20px 60px rgba(0,0,0,0.5)',
          minWidth: 260,
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
          style={{ fontSize: 20 }}
        >
          ✕
        </button>

        {/* Flame */}
        <span className="streak-flame" style={{ fontSize: 80, lineHeight: 1 }}>🔥</span>

        {/* Counter */}
        {!isFirstEver && (
          <div className="streak-number flex items-center gap-3">
            <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.25)', fontWeight: 700 }}>
              {data.prev}
            </span>
            <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.25)' }}>→</span>
            <span style={{ fontSize: 56, color: '#fbbf24', fontWeight: 900, lineHeight: 1, textShadow: '0 0 20px rgba(251,191,36,0.6)' }}>
              {data.next}
            </span>
          </div>
        )}

        <p style={{ color: '#fbbf24', fontWeight: 800, fontSize: 22, letterSpacing: '0.05em', margin: 0 }}>
          {isFirstEver ? 'Streak Started! 🎉' : 'Streak Extended!'}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: 0, textAlign: 'center' }}>
          {isFirstEver
            ? 'Complete a lesson every day to keep it going!'
            : `${data.next} day${data.next !== 1 ? 's' : ''} in a row — keep it up!`}
        </p>

        <button
          onClick={dismiss}
          style={{
            marginTop: 4,
            padding: '8px 28px',
            background: 'linear-gradient(to right,#d97706,#f59e0b)',
            color: '#1a0533',
            fontWeight: 800,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Keep it up!
        </button>
      </div>
    </div>
  );
}
