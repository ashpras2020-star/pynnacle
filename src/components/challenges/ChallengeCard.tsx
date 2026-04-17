import { Trophy, Flame, BookOpen, Target, Swords, X, Check } from 'lucide-react';
import { useChallengeStore } from '@store/useChallengeStore';
import { useUserStore } from '@store/useUserStore';
import { getChallengeTypeLabel, getChallengeDescription } from '@types/challenge';
import type { Challenge } from '@types/challenge';
import toast from 'react-hot-toast';

function getChallengeIcon(type: string) {
  switch (type) {
    case 'xp_race': return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 'lesson_count': return <BookOpen className="w-5 h-5 text-purple-500" />;
    case 'streak': return <Flame className="w-5 h-5 text-orange-500" />;
    case 'module_completion': return <Target className="w-5 h-5 text-blue-500" />;
    default: return <Swords className="w-5 h-5 text-gray-500" />;
  }
}

interface Props {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: Props) {
  const user = useUserStore((s) => s.user);
  const acceptChallenge = useChallengeStore((s) => s.acceptChallenge);
  const declineChallenge = useChallengeStore((s) => s.declineChallenge);
  const cancelChallenge = useChallengeStore((s) => s.cancelChallenge);

  const userId = user?.uid || '';
  const isCreator = challenge.createdBy === userId;
  const opponentId = challenge.participants.find((p) => p !== userId) || '';
  const opponentName = challenge.participantNames[opponentId] || 'Unknown';

  const myProgress = challenge.progress[userId];
  const opponentProgress = challenge.progress[opponentId];

  const myDelta = myProgress ? myProgress.currentValue - myProgress.startValue : 0;
  const opponentDelta = opponentProgress ? opponentProgress.currentValue - opponentProgress.startValue : 0;
  const targetValue = challenge.type === 'module_completion' ? 1 : challenge.targetValue;

  const myPercent = Math.min(100, (myDelta / targetValue) * 100);
  const opponentPercent = Math.min(100, (opponentDelta / targetValue) * 100);

  const isWinner = challenge.winner === userId;
  const isLoser = challenge.winner && challenge.winner !== userId;

  const handleAccept = async () => {
    try {
      await acceptChallenge(challenge.id);
      toast.success('Challenge accepted!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to accept');
    }
  };

  const handleDecline = async () => {
    try {
      await declineChallenge(challenge.id);
      toast.success('Challenge declined');
    } catch (err: any) {
      toast.error(err.message || 'Failed to decline');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelChallenge(challenge.id);
      toast.success('Challenge cancelled');
    } catch (err: any) {
      toast.error(err.message || 'Failed to cancel');
    }
  };

  return (
    <div className={`bg-white rounded-xl border p-4 ${
      challenge.status === 'completed'
        ? isWinner ? 'border-green-300 bg-green-50/50' : 'border-gray-200'
        : challenge.status === 'active' ? 'border-purple-200' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getChallengeIcon(challenge.type)}
          <div>
            <p className="text-sm font-bold text-gray-900">
              {getChallengeTypeLabel(challenge.type)}
            </p>
            <p className="text-xs text-gray-500">
              vs {opponentName}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-purple-600">
            {challenge.wager.toLocaleString()} XP wager
          </p>
          {challenge.status === 'pending' && (
            <span className="text-[10px] text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
              Pending
            </span>
          )}
          {challenge.status === 'active' && (
            <span className="text-[10px] text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
          {challenge.status === 'completed' && isWinner && (
            <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              Won!
            </span>
          )}
          {challenge.status === 'completed' && isLoser && (
            <span className="text-[10px] text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              Lost
            </span>
          )}
          {challenge.status === 'cancelled' && (
            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Cancelled
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-3">
        {getChallengeDescription(challenge.type, challenge.targetValue, challenge.targetModuleId)}
      </p>

      {/* Progress bars (only for active challenges) */}
      {challenge.status === 'active' && (
        <div className="space-y-2 mb-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-700 font-medium">You</span>
              <span className="text-gray-500">{myDelta}/{targetValue}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${myPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-700 font-medium">{opponentName}</span>
              <span className="text-gray-500">{opponentDelta}/{targetValue}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full transition-all"
                style={{ width: `${opponentPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {challenge.status === 'pending' && !isCreator && (
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
          >
            <Check className="w-4 h-4" />
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" />
            Decline
          </button>
        </div>
      )}

      {challenge.status === 'pending' && isCreator && (
        <button
          onClick={handleCancel}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel Challenge
        </button>
      )}
    </div>
  );
}
