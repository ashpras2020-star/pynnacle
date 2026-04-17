// Global quiz invite notification — appears on any page when a new invite arrives

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, X, Check } from 'lucide-react';
import { useFriendsStore } from '@store/useFriendsStore';
import { liveQuizService } from '@services/liveQuizService';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useUserStore } from '@store/useUserStore';

export function QuizInviteToast() {
  const navigate = useNavigate();
  const quizInvites = useFriendsStore((s) => s.quizInvites);
  const loadQuizInvites = useFriendsStore((s) => s.loadQuizInvites);
  const joinGame = useLiveQuizStore((s) => s.joinGame);
  const user = useUserStore((s) => s.user);

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<{ gameId: string; hostName: string; maxModule: number } | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  // Track which invites have already been shown
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (visible) return; // Don't interrupt an active toast

    const newInvite = quizInvites.find(inv => !seenIds.current.has(inv.gameId));
    if (newInvite) {
      seenIds.current.add(newInvite.gameId);
      setCurrent(newInvite);
      setVisible(true);
    }
  }, [quizInvites, visible]);

  const handleAccept = async () => {
    if (!current || !user?.uid) return;
    setIsJoining(true);
    // Timeout so a hanging Firestore call never locks the button forever
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 8000)
    );
    try {
      await Promise.race([
        liveQuizService.acceptInvite(current.gameId, user.uid),
        timeout,
      ]);
      await Promise.race([joinGame(current.gameId), timeout]);
      setVisible(false);
      navigate(`/quiz/lobby/${current.gameId}`);
    } catch {
      // Always dismiss and reload so the user is never stuck
      setVisible(false);
      await loadQuizInvites();
    } finally {
      setIsJoining(false);
    }
  };

  const handleDecline = async () => {
    if (!current || !user?.uid) return;
    await liveQuizService.declineInvite(current.gameId, user.uid).catch(() => {});
    setVisible(false);
    await loadQuizInvites();
  };

  if (!visible || !current) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] w-80 animate-slide-in">
      <div className="bg-gray-900 border border-purple-500/40 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1" style={{background:'linear-gradient(to right,#7c3aed,#a78bfa)'}} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Quiz Invite!</p>
                <p className="text-purple-300 text-xs">{current.hostName} invited you</p>
              </div>
            </div>
            <button
              onClick={handleDecline}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-white/40" />
            </button>
          </div>

          {/* Info */}
          <div className="bg-white/5 rounded-xl px-3 py-2 mb-3">
            <p className="text-white/60 text-xs">Modules 1–{current.maxModule}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="flex-1 py-2 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={isJoining}
              className="flex-1 py-2 rounded-xl btn-purple text-sm font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {isJoining ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Join
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
}
