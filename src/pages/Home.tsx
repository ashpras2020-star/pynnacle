// Home Page - Main dashboard with course portals and free IDE

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgressStore } from '@store/useProgressStore';
import { useUserStore } from '@store/useUserStore';
import { IDEContainer } from '@components/ide/IDEContainer';
import { ChatbotButton } from '@components/chatbot/ChatbotButton';
import { Users, Snowflake, Lightbulb, Zap, SkipForward, Moon, Sun } from 'lucide-react';
import { useFriendsStore } from '@store/useFriendsStore';
import { useChallengeStore } from '@store/useChallengeStore';
import { useThemeStore } from '@store/useThemeStore';
import { PynnacleLogo } from '@components/ui/PynnacleLogo';

export function Home() {
  const navigate = useNavigate();
  const {
    totalXP,
    spentXP,
    currentStreak,
    completedLessons,
    getAvailableXP,
    purchaseItem,
    getItemQuantity,
    resetProgress
  } = useProgressStore();
  const { user, isAuthenticated, signInWithGoogle, signOut, isLoading } = useUserStore();
  const incomingRequestCount = useFriendsStore((s) => s.incomingRequests.length);
  const quizInviteCount = useFriendsStore((s) => s.quizInvites.length);
  const pendingGiftCount = useFriendsStore((s) => s.pendingGiftNotifications.length);
  const pendingChallengeCount = useChallengeStore((s) =>
    s.challenges.filter((c) => c.status === 'pending' && c.createdBy !== user?.uid).length
  );
  const friendsNotificationCount = incomingRequestCount + quizInviteCount + pendingChallengeCount + pendingGiftCount;
  const { darkMode, toggleDarkMode } = useThemeStore();
  const availableXP = getAvailableXP();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const beginnerProgress = (completedLessons.length / 50) * 100;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/goal-setting');
    } catch (error: any) {
      // Silently ignore user-cancelled popups
      if (error.code === 'auth/popup-closed-by-user' ||
          error.code === 'auth/cancelled-popup-request' ||
          error.code === 'auth/already-in-progress') {
        return;
      }

      console.error('Sign-in failed:', error);
      const errorMessage = error.code === 'auth/account-exists-with-different-credential'
        ? 'An account already exists with this email'
        : error.message || 'An error occurred during sign-in';
      alert(`Sign-in failed: ${errorMessage}`);
    }
  };

  const handleSignOut = async () => {
    console.log('🔄 Sign-out button clicked');
    try {
      console.log('Calling signOut...');
      await signOut();
      console.log('✅ Signed out successfully');
    } catch (error: any) {
      console.error('❌ Sign-out failed:', error);
      alert(`Sign-out failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-3 w-fit hover:opacity-80 transition-opacity">
                <PynnacleLogo className="w-8 h-8" />
                <span className="text-xl font-bold gradient-text">
                  Pynnacle
                </span>
              </Link>
              <h1 className="text-3xl font-bold gradient-text">
                Python Learning Platform
              </h1>
              <p className="text-gray-600 mt-1">Master Python through interactive lessons</p>
            </div>

            {/* User Profile & Stats */}
            <div className="flex items-center gap-6">
              {/* User Profile or Sign In */}
              {/* Always-visible icon buttons */}
              <div className="flex items-center gap-1">
                {isAuthenticated && user && (
                  <button
                    onClick={() => navigate('/friends')}
                    className="relative p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Friends"
                  >
                    <Users className="w-5 h-5" />
                    {friendsNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {friendsNotificationCount}
                      </span>
                    )}
                  </button>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {isAuthenticated && user && (
                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                  <button
                    onClick={() => navigate('/profile-setup')}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-purple-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)' }}>
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </button>
                  <button
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="ml-2 px-3 py-1.5 text-sm text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{availableXP}</div>
                <div className="text-xs text-gray-500">Available XP</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  ({totalXP} total, {spentXP} spent)
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{currentStreak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedLessons.length}/50</div>
                <div className="text-xs text-gray-500">Lessons</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Course Portals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Course</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Beginner Course - Unlocked */}
            <Link to="/course/beginner">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-purple-200 hover:border-purple-400">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Beginner</h3>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  Start your Python journey with basics, control flow, and functions.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{beginnerProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ background: 'linear-gradient(to right, #9333ea, #c084fc)', width: `${beginnerProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>10 Modules</span>
                  <span>50 Lessons</span>
                </div>
              </div>
            </Link>

            {/* Intermediate Course - Locked */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 opacity-60 cursor-not-allowed relative">
              <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-500 mb-4">Intermediate</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Unlock by completing the Beginner course first.
              </p>

              <div className="space-y-2 mb-4">
                <div className="w-full bg-gray-300 rounded-full h-2"></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>6 Modules</span>
                <span>30 Lessons</span>
              </div>
            </div>

            {/* Expert Course - Locked */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 opacity-60 cursor-not-allowed relative">
              <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-500 mb-4">Expert</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Unlock by completing the Intermediate course first.
              </p>

              <div className="space-y-2 mb-4">
                <div className="w-full bg-gray-300 rounded-full h-2"></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>7 Modules</span>
                <span>35 Lessons</span>
              </div>
            </div>
          </div>
        </section>

        {/* Item Shop */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Shop</h2>
          <p className="text-gray-600 mb-6">Spend your XP to purchase helpful items</p>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Streak Freeze */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #60a5fa, #2563eb)'}}>
                  <Snowflake className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Streak Freeze</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Protect your streak if you miss a day
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Owned:</span>
                <span className="text-sm font-semibold text-purple-600">{getItemQuantity('streak-freeze')}</span>
              </div>
              <button
                onClick={() => purchaseItem('streak-freeze', 2500)}
                disabled={availableXP < 2500}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  availableXP >= 2500
                    ? 'btn-purple'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 2500 XP
              </button>
            </div>

            {/* Hint Pack */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #facc15, #ca8a04)'}}>
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Hint Pack</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Get 3 extra hints for challenges
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Owned:</span>
                <span className="text-sm font-semibold text-purple-600">{getItemQuantity('hint-pack')}</span>
              </div>
              <button
                onClick={() => purchaseItem('hint-pack', 1000)}
                disabled={availableXP < 1000}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  availableXP >= 1000
                    ? 'btn-purple'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 1000 XP
              </button>
            </div>

            {/* XP Boost */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #4ade80, #16a34a)'}}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-2">XP Boost</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Double XP for your next lesson
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Owned:</span>
                <span className="text-sm font-semibold text-purple-600">{getItemQuantity('xp-boost')}</span>
              </div>
              <button
                onClick={() => purchaseItem('xp-boost', 1500)}
                disabled={availableXP < 1500}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  availableXP >= 1500
                    ? 'btn-purple'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 1500 XP
              </button>
            </div>

            {/* Skip Token */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #fb923c, #ea580c)'}}>
                  <SkipForward className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Skip Token</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Skip a challenge (lose XP reward)
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Owned:</span>
                <span className="text-sm font-semibold text-purple-600">{getItemQuantity('skip-token')}</span>
              </div>
              <button
                onClick={() => purchaseItem('skip-token', 500)}
                disabled={availableXP < 500}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  availableXP >= 500
                    ? 'btn-purple'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 500 XP
              </button>
            </div>
          </div>
        </section>

        {/* Free-form IDE */}
        <section>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Practice Playground</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Experiment with Python code in this free-form editor
                </p>
              </div>

              <div className="text-xs text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
                Your code runs locally in your browser
              </div>
            </div>

            <IDEContainer
              initialCode="# Try some Python code here!\nprint('Hello from the playground!')\n\n# Calculate something\nresult = 10 * 5\nprint(f'10 times 5 equals {result}')"
              showRunButton={true}
            />
          </div>
        </section>
        {/* Reset Progress */}
        <section className="mt-12 border-t border-gray-200 pt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Reset Progress</h2>
            <p className="text-sm text-gray-500 mb-4">
              This will erase all your completed lessons, XP, streak, and purchased items.
            </p>
            <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="font-medium">Warning: This cannot be undone. Your progress will be permanently deleted.</span>
            </div>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Reset All Progress
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                <button
                  onClick={async () => {
                    resetProgress();
                    if (user?.uid) {
                      try {
                        const { syncService } = await import('@services/syncService');
                        await syncService.resetCloudProgress(user.uid);
                      } catch (e) {
                        console.error('Failed to reset cloud progress:', e);
                      }
                    }
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* AI Chatbot */}
      <ChatbotButton />
    </div>
  );
}
