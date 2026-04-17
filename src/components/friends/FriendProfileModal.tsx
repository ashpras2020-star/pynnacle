import { useState, useEffect, useMemo } from 'react';
import { X, Trophy, Flame, BookOpen, Gift, Pin, Award, Swords } from 'lucide-react';
import type { FriendProfile } from '@services/friendsService';
import { activityService } from '@services/activityService';
import type { ActivityFeedItem } from '@services/activityService';
import { ALL_BADGES, getEarnedBadgeIds } from '@data/badges';
import type { BadgeProgress } from '@data/badges';
import { ActivityFeedItemCard } from './ActivityFeedItem';
import { GiftXPModal } from './GiftXPModal';
import { CreateChallengeModal } from '../challenges/CreateChallengeModal';
import { ChallengeCard } from '../challenges/ChallengeCard';
import { useProgressStore } from '@store/useProgressStore';
import { useChallengeStore } from '@store/useChallengeStore';

interface FriendProfileModalProps {
  friend: FriendProfile;
  onGiftXP: (friendId: string, amount: number) => Promise<void>;
  onClose: () => void;
}

export function FriendProfileModal({ friend, onGiftXP, onClose }: FriendProfileModalProps) {
  const [recentActivity, setRecentActivity] = useState<ActivityFeedItem[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const availableXP = useProgressStore((s) => s.totalXP - s.spentXP);
  const challenges = useChallengeStore((s) => s.challenges);

  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  // Filter challenges with this friend
  const friendChallenges = useMemo(
    () => challenges.filter(
      (c) => c.participants.includes(friend.uid) && c.status !== 'cancelled'
    ),
    [challenges, friend.uid]
  );

  // Compute friend's earned badges from their public profile stats
  const badgeProgress: BadgeProgress = useMemo(() => ({
    currentStreak: friend.currentStreak,
    totalXP: friend.totalXP,
    completedLessonCount: friend.completedLessons,
    completedModuleCount: friend.completedModuleCount || 0,
    completedAssessmentCount: friend.completedAssessmentCount || 0,
    perfectAssessments: friend.perfectAssessments || 0,
    purchasedItemCount: friend.purchasedItemCount || 0,
  }), [friend]);

  const earnedBadgeIds = useMemo(() => getEarnedBadgeIds(badgeProgress), [badgeProgress]);

  // Pinned badges
  const pinnedBadges = (friend.pinnedBadges || [])
    .map((id) => ALL_BADGES.find((b) => b.id === id))
    .filter(Boolean);

  // Load recent activity
  useEffect(() => {
    setLoadingActivity(true);
    activityService
      .getFriendActivities([friend.uid], 10)
      .then((items) => {
        const enriched = items.map((a) => ({
          ...a,
          userName: friend.displayName || 'A friend',
          userPhoto: friend.photoURL || null,
        }));
        setRecentActivity(enriched);
      })
      .catch(() => {})
      .finally(() => setLoadingActivity(false));
  }, [friend.uid, friend.displayName, friend.photoURL]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="text-xl font-bold text-gray-900">Friend Profile</h2>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-6 pt-4 space-y-6">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={friend.photoURL || defaultAvatar}
                  alt={friend.displayName || 'Friend'}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    friend.isOnline ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {friend.displayName || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-500 truncate">{friend.email}</p>
                <p className={`text-xs mt-0.5 ${friend.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                  {friend.isOnline ? 'Online now' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{friend.totalXP.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total XP</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{friend.currentStreak}</p>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <BookOpen className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{friend.completedLessons}/50</p>
                <p className="text-xs text-gray-500">Lessons</p>
              </div>
            </div>

            {/* Active Challenges with this friend */}
            {friendChallenges.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Challenges</h4>
                <div className="space-y-2">
                  {friendChallenges.map((c) => (
                    <ChallengeCard key={c.id} challenge={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Pinned Badges */}
            {pinnedBadges.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Pin className="w-4 h-4 text-purple-500" />
                  <h4 className="text-sm font-semibold text-gray-700">Showcase</h4>
                </div>
                <div className="flex gap-3">
                  {pinnedBadges.map((badge) => badge && (
                    <div key={badge.id} className="flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{background:'linear-gradient(135deg,#8b5cf6,#6d28d9)'}}>
                        <span>{badge.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-purple-700">{badge.name}</p>
                        <p className="text-[10px] text-purple-500">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Badges */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Award className="w-4 h-4 text-purple-500" />
                <h4 className="text-sm font-semibold text-gray-700">
                  Badges ({earnedBadgeIds.length}/{ALL_BADGES.length})
                </h4>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {ALL_BADGES.map((badge) => {
                  const isEarned = earnedBadgeIds.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      title={isEarned ? `${badge.name}: ${badge.description}` : 'Locked'}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isEarned ? 'shadow-sm' : 'bg-gray-200 opacity-40'}`}
                      style={isEarned ? {background:'linear-gradient(135deg,#8b5cf6,#6d28d9)'} : {}}
                    >
                      {isEarned ? (
                        <span>{badge.icon}</span>
                      ) : (
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</h4>
              {loadingActivity ? (
                <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
              ) : recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
              ) : (
                <div className="bg-gray-50 rounded-xl divide-y divide-gray-100 px-3">
                  {recentActivity.map((item) => (
                    <ActivityFeedItemCard key={`${item.userId}-${item.id}`} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-6 pt-3 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => setShowChallengeModal(true)}
              className="flex-1 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              Challenge
            </button>
            <button
              onClick={() => setShowGiftModal(true)}
              className="flex-1 py-2.5 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Gift XP
            </button>
          </div>
        </div>
      </div>

      {showGiftModal && (
        <GiftXPModal
          friend={friend}
          availableXP={availableXP}
          onGift={async (amount) => {
            await onGiftXP(friend.uid, amount);
            setShowGiftModal(false);
          }}
          onClose={() => setShowGiftModal(false)}
        />
      )}

      {showChallengeModal && (
        <CreateChallengeModal
          friend={friend}
          onClose={() => setShowChallengeModal(false)}
        />
      )}
    </>
  );
}
