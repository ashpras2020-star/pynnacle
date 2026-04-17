import { BookOpen, Trophy, Flame, Star, Gift, Swords, Gamepad2 } from 'lucide-react';
import type { ActivityFeedItem as FeedItem } from '@services/activityService';
import { activityService } from '@services/activityService';
import { getLessonById } from '@data/courses/beginner';

interface ActivityFeedItemProps {
  item: FeedItem;
}

function getRelativeTime(timestamp: { toMillis: () => number } | null): string {
  if (!timestamp) return '';
  const diff = Date.now() - timestamp.toMillis();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'lesson_completed':
      return <BookOpen className="w-4 h-4 text-purple-500" />;
    case 'assessment_passed':
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    case 'streak_milestone':
      return <Flame className="w-4 h-4 text-orange-500" />;
    case 'xp_milestone':
      return <Star className="w-4 h-4 text-green-500" />;
    case 'xp_gift_sent':
    case 'xp_gift_received':
      return <Gift className="w-4 h-4 text-pink-500" />;
    case 'challenge_won':
      return <Swords className="w-4 h-4 text-yellow-500" />;
    case 'challenge_lost':
      return <Swords className="w-4 h-4 text-gray-400" />;
    case 'quiz_game_won':
      return <Gamepad2 className="w-4 h-4 text-purple-500" />;
    default:
      return <Star className="w-4 h-4 text-gray-400" />;
  }
}

function getActivityIconBg(type: string) {
  switch (type) {
    case 'lesson_completed':
      return 'bg-purple-100';
    case 'assessment_passed':
      return 'bg-yellow-100';
    case 'streak_milestone':
      return 'bg-orange-100';
    case 'xp_milestone':
      return 'bg-green-100';
    case 'xp_gift_sent':
    case 'xp_gift_received':
      return 'bg-pink-100';
    case 'challenge_won':
      return 'bg-yellow-100';
    case 'challenge_lost':
      return 'bg-gray-100';
    case 'quiz_game_won':
      return 'bg-purple-100';
    default:
      return 'bg-gray-100';
  }
}

function getDescription(item: FeedItem): string {
  const { type, data } = item;

  if (type === 'lesson_completed' && data.lessonId) {
    const lesson = getLessonById(data.lessonId);
    const name = lesson?.title || data.lessonId;
    const xp = data.xpEarned ? ` (+${data.xpEarned} XP)` : '';
    return `completed "${name}"${xp}`;
  }

  return activityService.getActivityDescription(type, data);
}

export function ActivityFeedItemCard({ item }: ActivityFeedItemProps) {
  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  return (
    <div className="flex items-start gap-3 py-3">
      {/* Avatar */}
      <img
        src={item.userPhoto || defaultAvatar}
        alt={item.userName || 'Friend'}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 text-sm truncate">
            {item.userName || 'A friend'}
          </span>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {getRelativeTime(item.timestamp)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityIconBg(item.type)}`}>
            {getActivityIcon(item.type)}
          </div>
          <span className="text-sm text-gray-600">
            {getDescription(item)}
          </span>
        </div>
      </div>
    </div>
  );
}
