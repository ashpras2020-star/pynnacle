import { Trophy, Medal } from 'lucide-react';
import type { QuizScore, QuizParticipant } from '@types/liveQuiz';

interface Props {
  participants: Record<string, QuizParticipant>;
  scores: Record<string, QuizScore>;
  currentUserId: string;
  questionCount?: number;
}

export function QuizLeaderboard({ participants, scores, currentUserId, questionCount }: Props) {
  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b.total - a.total)
    .map(([uid, score], index) => ({
      uid,
      score,
      participant: participants[uid],
      position: index + 1,
    }));

  return (
    <div className="space-y-2">
      {sorted.map(({ uid, score, participant, position }) => {
        const isMe = uid === currentUserId;
        return (
          <div
            key={uid}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              isMe
                ? 'bg-purple-500/15 border border-purple-500/30'
                : 'bg-white/5 border border-white/10'
            }`}
          >
            {/* Position */}
            <div className="w-8 flex-shrink-0 flex items-center justify-center">
              {position === 1 ? (
                <Trophy className="w-6 h-6 text-yellow-400" />
              ) : position === 2 ? (
                <Medal className="w-6 h-6 text-gray-400" />
              ) : position === 3 ? (
                <Medal className="w-6 h-6 text-amber-600" />
              ) : (
                <span className="text-lg font-bold text-white/30">{position}</span>
              )}
            </div>

            {/* Avatar */}
            <img
              src={participant?.photoURL || defaultAvatar}
              alt={participant?.displayName || 'Player'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
            />

            {/* Name & Score */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${isMe ? 'text-purple-300' : 'text-white'}`}>
                {participant?.displayName || 'Unknown'} {isMe && '(You)'}
              </p>
              <p className="text-xs text-white/40">
                {score.correct}{questionCount ? `/${questionCount}` : ''} correct
              </p>
            </div>

            {/* Points */}
            <div className="text-right">
              <p className={`text-lg font-bold ${
                position === 1 ? 'text-yellow-400' : 'text-white/80'
              }`}>
                {score.total.toLocaleString()}
              </p>
              <p className="text-[10px] text-white/30">pts</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
