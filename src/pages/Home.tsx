// Home Page - Main dashboard with course portals and free IDE

import { Link, useNavigate } from 'react-router-dom';
import { useProgressStore } from '@store/useProgressStore';
import { useUserStore } from '@store/useUserStore';
import { IDEContainer } from '@components/ide/IDEContainer';
import { ChatbotButton } from '@components/chatbot/ChatbotButton';

export function Home() {
  const navigate = useNavigate();
  const {
    totalXP,
    spentXP,
    currentStreak,
    completedLessons,
    getAvailableXP,
    purchaseItem,
    getItemQuantity
  } = useProgressStore();
  const { user, isAuthenticated, signInWithGoogle, signOut, isLoading } = useUserStore();
  const availableXP = getAvailableXP();

  const beginnerProgress = (completedLessons.length / 50) * 100;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log('✅ Signed in successfully');
      // Redirect to profile setup page
      navigate('/profile-setup');
    } catch (error: any) {
      console.error('❌ Sign-in failed:', error);

      // Handle specific Firebase errors
      let errorMessage = 'An error occurred during sign-in';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email';
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Don't crash - just show the error
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-3 w-fit hover:opacity-80 transition-opacity">
                <div className="text-2xl">🐍</div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  PyQuest
                </span>
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Python Learning Platform
              </h1>
              <p className="text-gray-600 mt-1">Master Python through interactive lessons</p>
            </div>

            {/* User Profile & Stats */}
            <div className="flex items-center gap-6">
              {/* User Profile or Sign In */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3 border-r border-gray-200 pr-6">
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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold">
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
                    className="ml-3 px-3 py-1.5 text-sm text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <div className="border-r border-gray-200 pr-6">
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">
                      {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </button>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    ☁️ Sign in to sync your progress
                  </div>
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
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-400">
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
                      className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${beginnerProgress}%` }}
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
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
                  ❄️
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
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 2500 XP
              </button>
            </div>

            {/* Hint Pack */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl">
                  💡
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
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 1000 XP
              </button>
            </div>

            {/* XP Boost */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-3xl">
                  ⚡
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
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase for 1500 XP
              </button>
            </div>

            {/* Skip Token */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-3xl">
                  ⏭️
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
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
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
          <div className="bg-white rounded-xl shadow-lg p-6">
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
      </main>

      {/* AI Chatbot */}
      <ChatbotButton />
    </div>
  );
}
