import { useState } from 'react';
import { X, Swords, Target, Flame, BookOpen, Trophy } from 'lucide-react';
import { useChallengeStore } from '@store/useChallengeStore';
import { useProgressStore } from '@store/useProgressStore';
import type { FriendProfile } from '@services/friendsService';
import type { ChallengeType } from '@types/challenge';
import toast from 'react-hot-toast';

const MODULE_NAMES: Record<string, string> = {
  'module-1': 'Basics & Syntax',
  'module-2': 'Working with Numbers & Math',
  'module-3': 'String Manipulation',
  'module-4': 'Boolean Logic',
  'module-5': 'Control Flow',
  'module-6': 'Collections',
  'module-7': 'Functions',
  'module-8': 'List Comprehensions',
  'module-9': 'Error Handling',
  'module-10': 'File I/O',
};

const CHALLENGE_TYPES: { type: ChallengeType; label: string; icon: typeof Trophy; color: string; description: string }[] = [
  { type: 'xp_race', label: 'XP Race', icon: Trophy, color: 'text-yellow-500', description: 'First to earn target XP wins' },
  { type: 'lesson_count', label: 'Lesson Count', icon: BookOpen, color: 'text-purple-500', description: 'First to complete target lessons wins' },
  { type: 'streak', label: 'Streak', icon: Flame, color: 'text-orange-500', description: 'First to reach target streak wins' },
  { type: 'module_completion', label: 'Module Completion', icon: Target, color: 'text-blue-500', description: 'First to pass a module assessment wins' },
];

interface Props {
  friend: FriendProfile;
  onClose: () => void;
}

export function CreateChallengeModal({ friend, onClose }: Props) {
  const [challengeType, setChallengeType] = useState<ChallengeType>('xp_race');
  const [targetValue, setTargetValue] = useState(500);
  const [targetModuleId, setTargetModuleId] = useState('module-1');
  const [wager, setWager] = useState(100);
  const [sending, setSending] = useState(false);

  const createChallenge = useChallengeStore((s) => s.createChallenge);
  const availableXP = useProgressStore((s) => s.totalXP - s.spentXP);

  const handleSend = async () => {
    if (wager <= 0) {
      toast.error('Wager must be greater than 0');
      return;
    }
    if (wager > availableXP) {
      toast.error('Not enough XP for that wager');
      return;
    }
    if (targetValue <= 0) {
      toast.error('Target must be greater than 0');
      return;
    }

    setSending(true);
    try {
      await createChallenge({
        type: challengeType,
        targetValue: challengeType === 'module_completion' ? 1 : targetValue,
        targetModuleId: challengeType === 'module_completion' ? targetModuleId : undefined,
        wager,
        opponentId: friend.uid,
        opponentName: friend.displayName || 'Unknown',
        opponentPhoto: friend.photoURL || null,
      });
      toast.success('Challenge sent!');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to send challenge');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Challenge {friend.displayName}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Challenge Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Challenge Type</label>
            <div className="grid grid-cols-2 gap-2">
              {CHALLENGE_TYPES.map((ct) => {
                const Icon = ct.icon;
                const selected = challengeType === ct.type;
                return (
                  <button
                    key={ct.type}
                    onClick={() => setChallengeType(ct.type)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors text-left ${
                      selected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${ct.color}`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{ct.label}</p>
                      <p className="text-[10px] text-gray-500">{ct.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Value */}
          {challengeType === 'module_completion' ? (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Module</label>
              <select
                value={targetModuleId}
                onChange={(e) => setTargetModuleId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {Object.entries(MODULE_NAMES).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Target {challengeType === 'xp_race' ? 'XP' : challengeType === 'lesson_count' ? 'Lessons' : 'Days'}
              </label>
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(Math.max(1, parseInt(e.target.value) || 0))}
                min={1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                {challengeType === 'xp_race' && 'First to earn this much XP from the start wins'}
                {challengeType === 'lesson_count' && 'First to complete this many new lessons wins'}
                {challengeType === 'streak' && 'First to reach this streak length wins'}
              </p>
            </div>
          )}

          {/* Wager */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              XP Wager
            </label>
            <input
              type="number"
              value={wager}
              onChange={(e) => setWager(Math.max(0, parseInt(e.target.value) || 0))}
              min={0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Available: {availableXP.toLocaleString()} XP — Winner gets {(wager * 2).toLocaleString()} XP
            </p>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={sending || wager > availableXP || wager <= 0}
            className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Swords className="w-4 h-4" />
            {sending ? 'Sending...' : 'Send Challenge'}
          </button>
        </div>
      </div>
    </div>
  );
}
