import { useState } from 'react';
import { Trophy, Flame, BookOpen, UserMinus } from 'lucide-react';
import type { FriendProfile } from '@services/friendsService';
import { ALL_BADGES } from '@data/badges';

interface FriendCardProps {
  friend: FriendProfile;
  onRemove: (friendId: string) => void;
  onViewProfile: (friend: FriendProfile) => void;
}

export function FriendCard({ friend, onRemove, onViewProfile }: FriendCardProps) {
  const [confirming, setConfirming] = useState(false);
  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  const pinnedBadges = (friend.pinnedBadges || [])
    .map((id) => ALL_BADGES.find((b) => b.id === id))
    .filter(Boolean);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 cursor-pointer hover:border-purple-300 transition-colors"
      onClick={() => onViewProfile(friend)}
    >
      {/* Avatar + online indicator */}
      <div className="relative flex-shrink-0">
        <img
          src={friend.photoURL || defaultAvatar}
          alt={friend.displayName || 'Friend'}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            friend.isOnline ? 'bg-green-500' : 'bg-gray-300'
          }`}
          title={friend.isOnline ? 'Online' : 'Offline'}
        />
      </div>

      {/* Name + badges + stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 truncate">
            {friend.displayName || 'Unknown'}
          </span>
          {pinnedBadges.length > 0 && (
            <div className="flex gap-0.5">
              {pinnedBadges.map((badge) => badge && (
                <span
                  key={badge.id}
                  title={badge.name}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0" style={{background:'linear-gradient(135deg,#8b5cf6,#6d28d9)'}}
                >
                  {badge.icon}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            {friend.totalXP} XP
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            {friend.currentStreak}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-purple-500" />
            {friend.completedLessons}/50
          </span>
        </div>
      </div>

      {/* Remove button */}
      {confirming ? (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onRemove(friend.uid)}
            className="text-xs px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Remove friend"
        >
          <UserMinus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
