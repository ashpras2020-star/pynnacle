// Profile Setup Page - After Google sign-in
// Users can choose an avatar, customize their name, and view badges

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import { useProgressStore } from '@store/useProgressStore';
import { useThemeStore } from '@store/useThemeStore';
import { ALL_BADGES, getEarnedBadgeIds, type BadgeProgress } from '@data/badges';
import { PinBadgesModal } from '@components/friends/PinBadgesModal';
import { friendsService } from '@services/friendsService';
import toast from 'react-hot-toast';
import { Moon, Sun } from 'lucide-react';

// Avatar options — use BASE_URL so paths work on GitHub Pages (/pynnacle/)
const base = import.meta.env.BASE_URL;
const AVATAR_OPTIONS = [
  { id: 'avatar-1', src: `${base}avatars/avatar-1.png`, alt: 'Avatar 1', name: 'Viper' },
  { id: 'avatar-2', src: `${base}avatars/avatar-2.png`, alt: 'Avatar 2', name: 'Phoenix' },
  { id: 'avatar-3', src: `${base}avatars/avatar-3.png`, alt: 'Avatar 3', name: 'Shadow' },
];

// Badge category labels
const CATEGORY_LABELS: Record<string, string> = {
  streak: 'Streak',
  xp: 'XP',
  lessons: 'Lessons',
  modules: 'Modules',
  assessments: 'Assessments',
  special: 'Special',
};

export function ProfileSetup() {
  const navigate = useNavigate();
  const { user, updateUserProfile, hasCompletedGoalSetting } = useUserStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const {
    currentStreak,
    totalXP,
    completedLessons,
    completedAssessments,
    purchasedItems,
  } = useProgressStore();

  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.picture || AVATAR_OPTIONS[0].src);
  const [displayName, setDisplayName] = useState<string>(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinnedBadges, setPinnedBadges] = useState<string[]>([]);

  // Load pinned badges from cloud on mount
  useEffect(() => {
    if (!user?.uid) return;
    friendsService.getPinnedBadges(user.uid).then(setPinnedBadges).catch(() => {});
  }, [user?.uid]);

  // Calculate badge progress from stores
  const badgeProgress: BadgeProgress = useMemo(() => {
    // Count completed modules (check each module 1-10)
    let completedModuleCount = 0;
    for (let m = 1; m <= 10; m++) {
      let allDone = true;
      for (let l = 1; l <= 5; l++) {
        if (!completedLessons.some((c) => c.lessonId === `lesson-${m}-${l}`)) {
          allDone = false;
          break;
        }
      }
      if (allDone) completedModuleCount++;
    }

    return {
      currentStreak,
      totalXP,
      completedLessonCount: completedLessons.length,
      completedModuleCount,
      completedAssessmentCount: completedAssessments.filter((a) => a.passed).length,
      perfectAssessments: completedAssessments.filter((a) => a.percentage === 100).length,
      purchasedItemCount: purchasedItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [currentStreak, totalXP, completedLessons, completedAssessments, purchasedItems]);

  const earnedBadgeIds = useMemo(() => getEarnedBadgeIds(badgeProgress), [badgeProgress]);

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      alert('Please enter a name');
      return;
    }

    setIsSaving(true);
    try {
      // Update user profile with selected avatar and name
      await updateUserProfile({
        name: displayName.trim(),
        picture: selectedAvatar,
      });

      // Navigate to goal-setting if not completed, otherwise dashboard
      if (!hasCompletedGoalSetting) {
        navigate('/goal-setting');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    // Navigate to goal-setting if not completed, otherwise dashboard
    if (!hasCompletedGoalSetting) {
      navigate('/goal-setting');
    } else {
      navigate('/dashboard');
    }
  };

  // Group badges by category
  const badgesByCategory = useMemo(() => {
    const grouped: Record<string, typeof ALL_BADGES> = {};
    for (const badge of ALL_BADGES) {
      if (!grouped[badge.category]) grouped[badge.category] = [];
      grouped[badge.category].push(badge);
    }
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-purple-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">👤</div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Choose an avatar and customize your display name
            </p>
          </div>

          {/* Avatar Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-3 gap-6">
              {AVATAR_OPTIONS.map((avatar) => (
                <div key={avatar.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedAvatar(avatar.src)}
                    className={`
                      relative p-4 rounded-xl transition-all duration-200 w-full
                      ${selectedAvatar === avatar.src
                        ? 'bg-purple-100 border-4 border-purple-500 shadow-lg scale-105'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }
                    `}
                  >
                    <img
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-full h-auto rounded-lg"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<div class="text-6xl">👤</div>';
                      }}
                    />
                    {selectedAvatar === avatar.src && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                  <p className="text-sm font-semibold text-gray-700 mt-2">{avatar.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-8">
            <label htmlFor="displayName" className="block text-lg font-semibold text-gray-800 mb-2">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              This is how other learners will see you
            </p>
          </div>

          {/* Appearance */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Appearance
            </label>
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-900 border-purple-500 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <div className="text-left">
                  <p className="font-semibold">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {darkMode ? 'Click to switch to light mode' : 'Click to switch to dark mode'}
                  </p>
                </div>
              </div>
              {/* Toggle pill */}
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Skip for Now
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving || !displayName.trim()}
              className={`
                flex-1 px-6 py-3 font-semibold rounded-lg transition-all shadow-lg
                ${isSaving || !displayName.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-purple hover:shadow-xl'
                }
              `}
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-purple-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold gradient-text mb-1">
              Badges
            </h2>
            <p className="text-gray-500 text-sm">
              {earnedBadgeIds.length} / {ALL_BADGES.length} earned
            </p>
            {earnedBadgeIds.length > 0 && (
              <button
                onClick={() => setShowPinModal(true)}
                className="mt-3 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors"
              >
                Pin Badges to Profile ({pinnedBadges.length}/3)
              </button>
            )}
          </div>

          <div className="space-y-6">
            {Object.entries(badgesByCategory).map(([category, badges]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {CATEGORY_LABELS[category] || category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {badges.map((badge) => {
                    const isEarned = earnedBadgeIds.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`
                          relative rounded-lg p-3 text-center transition-all duration-200
                          ${isEarned
                            ? 'bg-purple-50 border-2 border-purple-400 shadow-md'
                            : 'bg-gray-100 border-2 border-gray-200 opacity-60'
                          }
                        `}
                      >
                        {/* Badge icon */}
                        <div
                          className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${isEarned ? 'shadow-lg' : 'bg-gray-300'}`}
                          style={isEarned ? {background:'linear-gradient(135deg,#8b5cf6,#6d28d9)'} : {}}
                        >
                          {isEarned ? (
                            <span>{badge.icon}</span>
                          ) : (
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </div>
                        {/* Badge name */}
                        <p className={`text-xs font-bold mb-0.5 ${isEarned ? 'text-purple-700' : 'text-gray-500'}`}>
                          {badge.name}
                        </p>
                        {/* Badge description */}
                        <p className={`text-[10px] leading-tight ${isEarned ? 'text-purple-500' : 'text-gray-400'}`}>
                          {badge.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPinModal && (
        <PinBadgesModal
          earnedBadgeIds={earnedBadgeIds}
          currentPinned={pinnedBadges}
          onSave={async (ids) => {
            setPinnedBadges(ids);
            setShowPinModal(false);
            if (user?.uid) {
              try {
                await friendsService.updatePinnedBadges(user.uid, ids);
                toast.success('Pinned badges updated!');
              } catch {
                toast.error('Failed to save pinned badges');
              }
            }
          }}
          onClose={() => setShowPinModal(false)}
        />
      )}
    </div>
  );
}
