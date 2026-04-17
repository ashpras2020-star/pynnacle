// Challenge result animation — shown when a wager challenge is won or lost

import { useEffect, useState } from 'react';
import { useChallengeStore } from '@store/useChallengeStore';
import { getChallengeTypeLabel } from '@types/challenge';

export function ChallengeResultAnimation() {
  const challengeResultData = useChallengeStore((s) => s.challengeResultData);
  const claimChallengeReward = useChallengeStore((s) => s.claimChallengeReward);
  const dismissChallengeResult = useChallengeStore((s) => s.dismissChallengeResult);

  const [visible, setVisible] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (challengeResultData) {
      setVisible(true);
    }
  }, [challengeResultData]);

  const dismiss = () => {
    setVisible(false);
    dismissChallengeResult();
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    await claimChallengeReward();
    setVisible(false);
    setIsClaiming(false);
  };

  if (!visible || !challengeResultData) return null;

  const { won, xpToAward, opponentName, wager, type } = challengeResultData;
  const typeLabel = getChallengeTypeLabel(type);

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center"
      onClick={dismiss}
    >
      <style>{`
        @keyframes cr-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cr-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes cr-trophy-bounce {
          0%   { transform: translateY(0)    scale(1); }
          30%  { transform: translateY(-20px) scale(1.25); }
          60%  { transform: translateY(8px)  scale(0.92); }
          80%  { transform: translateY(-8px) scale(1.07); }
          100% { transform: translateY(0)    scale(1); }
        }
        @keyframes cr-xp-in {
          from { transform: scale(0.4) translateY(12px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        @keyframes cr-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cr-backdrop  { animation: cr-fade-in 0.3s ease forwards; }
        .cr-card      { animation: cr-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .cr-icon      { animation: cr-trophy-bounce 0.8s 0.35s cubic-bezier(0.34,1.56,0.64,1) both; display: inline-block; }
        .cr-xp        { animation: cr-xp-in 0.4s 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .cr-shimmer-btn {
          background: linear-gradient(90deg, #d97706 0%, #fbbf24 40%, #fef08a 60%, #f59e0b 100%);
          background-size: 200% auto;
          animation: cr-shimmer 2s linear infinite;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="cr-backdrop absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.7)' }}
      />

      {/* Card */}
      <div
        className="cr-card relative flex flex-col items-center gap-4 px-10 py-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={won ? {
          background: 'linear-gradient(135deg,#1a0a00,#3b1a00)',
          border: '2px solid rgba(251,191,36,0.55)',
          boxShadow: '0 0 90px rgba(251,191,36,0.3), 0 24px 64px rgba(0,0,0,0.55)',
          minWidth: 280,
        } : {
          background: 'linear-gradient(135deg,#0f172a,#1e293b)',
          border: '2px solid rgba(148,163,184,0.25)',
          boxShadow: '0 0 60px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.5)',
          minWidth: 280,
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
          style={{ fontSize: 20, lineHeight: 1 }}
        >
          ✕
        </button>

        {/* Icon */}
        <span className="cr-icon" style={{ fontSize: 80, lineHeight: 1 }}>
          {won ? '🏆' : '💔'}
        </span>

        {/* Headline */}
        <p style={{
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: '0.04em',
          margin: 0,
          color: won ? '#fbbf24' : '#94a3b8',
        }}>
          {won ? 'You Won!' : 'You Lost'}
        </p>

        {/* Subline */}
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0, textAlign: 'center' }}>
          {typeLabel} vs {opponentName}
        </p>

        {/* XP display */}
        <div className="cr-xp flex flex-col items-center gap-1">
          {won ? (
            <>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Reward
              </p>
              <p style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1,
                color: '#fbbf24',
                textShadow: '0 0 24px rgba(251,191,36,0.7)',
                margin: 0,
              }}>
                +{xpToAward.toLocaleString()}
              </p>
              <p style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700, margin: 0 }}>XP</p>
            </>
          ) : (
            <>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Wagered
              </p>
              <p style={{
                fontSize: 44,
                fontWeight: 900,
                lineHeight: 1,
                color: '#64748b',
                margin: 0,
              }}>
                -{wager.toLocaleString()}
              </p>
              <p style={{ color: '#64748b', fontSize: 13, fontWeight: 700, margin: 0 }}>XP</p>
            </>
          )}
        </div>

        {/* Encouragement */}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, textAlign: 'center' }}>
          {won
            ? `You beat ${opponentName} and won their wager!`
            : `${opponentName} beat you this time. Challenge them again!`}
        </p>

        {/* CTA */}
        {won ? (
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="cr-shimmer-btn"
            style={{
              marginTop: 4,
              padding: '10px 32px',
              color: '#1a0a00',
              fontWeight: 900,
              borderRadius: 14,
              border: 'none',
              cursor: isClaiming ? 'not-allowed' : 'pointer',
              fontSize: 15,
              opacity: isClaiming ? 0.7 : 1,
            }}
          >
            {isClaiming ? 'Claiming…' : '✨ Claim XP'}
          </button>
        ) : (
          <button
            onClick={dismiss}
            style={{
              marginTop: 4,
              padding: '10px 32px',
              background: 'rgba(255,255,255,0.08)',
              color: '#94a3b8',
              fontWeight: 700,
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Better luck next time
          </button>
        )}
      </div>
    </div>
  );
}
