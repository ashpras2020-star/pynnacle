import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Play, LogOut, Clock, Hash, BookOpen, Zap, UserPlus, X, Send } from 'lucide-react';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useUserStore } from '@store/useUserStore';
import { useFriendsStore } from '@store/useFriendsStore';
import { liveQuizService } from '@services/liveQuizService';

export function QuizLobbyPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const currentGame = useLiveQuizStore((s) => s.currentGame);
  const startGameListener = useLiveQuizStore((s) => s.startGameListener);
  const stopGameListener = useLiveQuizStore((s) => s.stopGameListener);
  const toggleReady = useLiveQuizStore((s) => s.toggleReady);
  const startGame = useLiveQuizStore((s) => s.startGame);
  const leaveGame = useLiveQuizStore((s) => s.leaveGame);

  const friends = useFriendsStore((s) => s.friends);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [sentInvites, setSentInvites] = useState<Set<string>>(new Set());
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  useEffect(() => {
    if (gameId) startGameListener(gameId);
  }, [gameId]);

  useEffect(() => {
    if (currentGame?.status === 'playing') {
      navigate(`/quiz/play/${currentGame.id}`, { replace: true });
    }
  }, [currentGame?.status]);

  if (!currentGame || !user?.uid) {
    return (
      <div className="min-h-screen quiz-dark-bg flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-200 font-medium">Loading lobby...</p>
        </div>
      </div>
    );
  }

  const isHost = currentGame.hostId === user.uid;
  const participants = Object.entries(currentGame.participants || {});
  const myParticipant = currentGame.participants[user.uid];
  const allReady = participants.every(([, p]) => p.ready);
  const canStart = isHost && allReady && participants.length >= 2;

  const handleLeave = async () => {
    await leaveGame();
    navigate('/friends');
  };

  const handleInvite = async (friendId: string) => {
    if (!currentGame || !user?.name) return;
    setSendingTo(friendId);
    try {
      await liveQuizService.inviteFriends(
        currentGame.id,
        user.name,
        currentGame.maxModule,
        [friendId]
      );
      setSentInvites(prev => new Set(prev).add(friendId));
    } finally {
      setSendingTo(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom, #1a0533, #111827, #030712)'}}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ filter: 'blur(64px)', background: 'rgba(168,85,247,0.1)' }} />

      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleLeave} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Quiz Lobby</h1>
            </div>
          </div>
          <button
            onClick={handleLeave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Leave
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5 relative z-10">
        {/* Game Settings */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
          <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
            Game Settings
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-sm font-bold text-white">1–{currentGame.maxModule}</p>
              <p className="text-[10px] text-white/40">Modules</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Hash className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm font-bold text-white">{currentGame.questionCount}</p>
              <p className="text-[10px] text-white/40">Questions</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-sm font-bold text-white">{currentGame.timePerQuestion}s</p>
              <p className="text-[10px] text-white/40">Per question</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
          <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
            Players ({participants.length})
          </h3>
          <div className="space-y-2.5">
            {participants.map(([uid, p]) => (
              <div
                key={uid}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5"
              >
                <img
                  src={p.photoURL || defaultAvatar}
                  alt={p.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {p.displayName}
                    {uid === currentGame.hostId && (
                      <span className="text-[10px] text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded-full ml-2 border border-purple-500/30">
                        Host
                      </span>
                    )}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  p.ready
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}>
                  {p.ready ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <span className="w-2 h-2 bg-white/20 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waiting message */}
        {!allReady && (
          <p className="text-center text-sm text-purple-300/50 animate-pulse">
            Waiting for all players to be ready...
          </p>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {!isHost && myParticipant && (
            <button
              onClick={() => toggleReady(!myParticipant.ready)}
              className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                myParticipant.ready
                  ? 'bg-white/10 text-white/70 border border-white/10 hover:bg-white/15'
                  : 'text-white shadow-lg'
              }`}
              style={myParticipant.ready ? {} : { background: 'linear-gradient(to right, #22c55e, #10b981)' }}
            >
              <Check className="w-5 h-5" />
              {myParticipant.ready ? 'Unready' : 'Ready Up'}
            </button>
          )}

          {isHost && (
            <>
              <button
                onClick={() => setShowInviteModal(true)}
                className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <UserPlus className="w-5 h-5 text-purple-300" />
                Invite Friends
              </button>
              <button
                onClick={startGame}
                disabled={!canStart}
                className="w-full py-3.5 btn-purple rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Play className="w-5 h-5" />
                {participants.length < 2
                  ? 'Need 2+ players'
                  : !allReady
                  ? 'Waiting for ready...'
                  : 'Start Quiz!'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Invite Friends Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-white font-bold text-lg">Invite Friends</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
              {friends.length === 0 ? (
                <p className="text-center text-white/40 text-sm py-6">No friends to invite</p>
              ) : (
                friends.map(friend => {
                  const alreadyIn = !!currentGame?.participants?.[friend.uid];
                  const invited = sentInvites.has(friend.uid);
                  const sending = sendingTo === friend.uid;
                  return (
                    <div key={friend.uid} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5">
                      <img
                        src={friend.photoURL || defaultAvatar}
                        alt={friend.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="flex-1 text-sm font-semibold text-white truncate">{friend.displayName}</p>
                      {alreadyIn ? (
                        <span className="text-xs text-green-400 font-medium">In lobby</span>
                      ) : invited ? (
                        <span className="text-xs text-purple-300 font-medium">Invited ✓</span>
                      ) : (
                        <button
                          onClick={() => handleInvite(friend.uid)}
                          disabled={sending}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                          {sending ? (
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Send className="w-3 h-3" />
                          )}
                          Invite
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
