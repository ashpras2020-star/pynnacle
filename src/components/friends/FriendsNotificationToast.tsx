// Friends notification toast — friend requests, challenge invites, XP gifts

import { useEffect, useRef, useState } from 'react';
import { UserPlus, Swords, Gift, X, Check } from 'lucide-react';
import { useFriendsStore } from '@store/useFriendsStore';
import { useChallengeStore } from '@store/useChallengeStore';
import { useUserStore } from '@store/useUserStore';
import { getChallengeTypeLabel } from '@types/challenge';

type NotifKind = 'request' | 'challenge' | 'gift';

interface FriendNotif {
  kind: NotifKind;
  id: string;             // requestId | challengeId | activityId
  label: string;          // one-liner describing what happened
  subLabel?: string;      // optional second line
  fromName: string;
  fromPhoto?: string | null;
  autoClose?: boolean;    // gifts auto-close, actions don't
}

// Accent colours per kind
const ACCENT: Record<NotifKind, string> = {
  request: 'linear-gradient(to right,#0ea5e9,#38bdf8)',
  challenge: 'linear-gradient(to right,#f59e0b,#fbbf24)',
  gift: 'linear-gradient(to right,#10b981,#34d399)',
};

const ICON_BG: Record<NotifKind, string> = {
  request: 'rgba(14,165,233,0.15)',
  challenge: 'rgba(245,158,11,0.15)',
  gift: 'rgba(16,185,129,0.15)',
};

const ICON_COLOR: Record<NotifKind, string> = {
  request: '#38bdf8',
  challenge: '#fbbf24',
  gift: '#34d399',
};

function NotifIcon({ kind }: { kind: NotifKind }) {
  const style = { color: ICON_COLOR[kind] };
  if (kind === 'request') return <UserPlus className="w-4 h-4" style={style} />;
  if (kind === 'challenge') return <Swords className="w-4 h-4" style={style} />;
  return <Gift className="w-4 h-4" style={style} />;
}

export function FriendsNotificationToast() {
  const user = useUserStore((s) => s.user);
  const incomingRequests = useFriendsStore((s) => s.incomingRequests);
  const acceptRequest = useFriendsStore((s) => s.acceptRequest);
  const rejectRequest = useFriendsStore((s) => s.rejectRequest);
  const pendingGiftNotifications = useFriendsStore((s) => s.pendingGiftNotifications);
  const clearGiftNotification = useFriendsStore((s) => s.clearGiftNotification);
  const challenges = useChallengeStore((s) => s.challenges);
  const acceptChallenge = useChallengeStore((s) => s.acceptChallenge);
  const declineChallenge = useChallengeStore((s) => s.declineChallenge);

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<FriendNotif | null>(null);
  const [isActioning, setIsActioning] = useState(false);
  const seenIds = useRef<Set<string>>(new Set());
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build unified queue from all sources
  function buildQueue(): FriendNotif[] {
    const items: FriendNotif[] = [];

    // Friend requests (pending status)
    for (const req of incomingRequests) {
      if (req.id && !seenIds.current.has(`req-${req.id}`)) {
        items.push({
          kind: 'request',
          id: req.id,
          label: `${req.fromName} sent you a friend request`,
          fromName: req.fromName,
          fromPhoto: req.fromPhoto,
        });
      }
    }

    // Pending challenges where current user is NOT the creator
    if (user?.uid) {
      for (const ch of challenges) {
        if (
          ch.status === 'pending' &&
          ch.createdBy !== user.uid &&
          !seenIds.current.has(`ch-${ch.id}`)
        ) {
          const challengerName = ch.participantNames[ch.createdBy] || 'A friend';
          const challengerPhoto = ch.participantPhotos?.[ch.createdBy] ?? null;
          items.push({
            kind: 'challenge',
            id: ch.id,
            label: `${challengerName} challenged you!`,
            subLabel: `${getChallengeTypeLabel(ch.type)} · ${ch.wager} XP wager`,
            fromName: challengerName,
            fromPhoto: challengerPhoto,
          });
        }
      }
    }

    // XP gifts
    for (const gift of pendingGiftNotifications) {
      if (!seenIds.current.has(`gift-${gift.id}`)) {
        items.push({
          kind: 'gift',
          id: gift.id,
          label: `${gift.fromName} sent you ${gift.amount} XP!`,
          fromName: gift.fromName,
          autoClose: true,
        });
      }
    }

    return items;
  }

  useEffect(() => {
    if (visible) return;

    const queue = buildQueue();
    if (queue.length === 0) return;

    const next = queue[0];
    const seenKey = `${next.kind === 'request' ? 'req' : next.kind === 'challenge' ? 'ch' : 'gift'}-${next.id}`;
    seenIds.current.add(seenKey);
    setCurrent(next);
    setVisible(true);

    if (next.autoClose) {
      autoCloseTimer.current = setTimeout(() => dismiss(next), 6000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingRequests, challenges, pendingGiftNotifications, visible]);

  function dismiss(notif?: FriendNotif) {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = null;
    }
    const n = notif ?? current;
    if (n?.kind === 'gift') clearGiftNotification(n.id);
    setVisible(false);
  }

  async function handleAccept() {
    if (!current) return;
    setIsActioning(true);
    try {
      if (current.kind === 'request') {
        await acceptRequest(current.id);
      } else if (current.kind === 'challenge') {
        await acceptChallenge(current.id);
      }
    } catch {
      // ignore
    } finally {
      setIsActioning(false);
      dismiss();
    }
  }

  async function handleDecline() {
    if (!current) return;
    setIsActioning(true);
    try {
      if (current.kind === 'request') {
        await rejectRequest(current.id);
      } else if (current.kind === 'challenge') {
        await declineChallenge(current.id);
      }
    } catch {
      // ignore
    } finally {
      setIsActioning(false);
      dismiss();
    }
  }

  if (!visible || !current) return null;

  const isActionable = current.kind !== 'gift';

  return (
    <div className="fixed top-4 right-4 z-[9998] w-80 animate-fn-slide-in">
      <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Accent bar */}
        <div className="h-1" style={{ background: ACCENT[current.kind] }} />

        <div className="p-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              {/* Avatar or icon */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: ICON_BG[current.kind] }}
              >
                {current.fromPhoto ? (
                  <img src={current.fromPhoto} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <NotifIcon kind={current.kind} />
                )}
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{current.label}</p>
                {current.subLabel && (
                  <p className="text-white/50 text-xs mt-0.5">{current.subLabel}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => dismiss()}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="w-4 h-4 text-white/40" />
            </button>
          </div>

          {/* Buttons */}
          {isActionable ? (
            <div className="flex gap-2">
              <button
                onClick={handleDecline}
                disabled={isActioning}
                className="flex-1 py-2 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                disabled={isActioning}
                className="flex-1 py-2 rounded-xl text-gray-900 text-sm font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
                style={{ background: ACCENT[current.kind] }}
              >
                {isActioning ? (
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {current.kind === 'request' ? 'Accept' : 'Accept'}
                  </>
                )}
              </button>
            </div>
          ) : (
            // Gift: just a dismiss button
            <button
              onClick={() => dismiss()}
              className="w-full py-2 rounded-xl text-gray-900 text-sm font-bold transition-all"
              style={{ background: ACCENT[current.kind] }}
            >
              Awesome! 🎉
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fn-slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        .animate-fn-slide-in { animation: fn-slide-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
}
