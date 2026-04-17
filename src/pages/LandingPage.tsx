// Landing Page - Public home page with course info, login, and settings

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '@store/useUserStore';
import { PynnacleLogo } from '@components/ui/PynnacleLogo';
import { useThemeStore } from '@store/useThemeStore';
import { useFriendsStore } from '@store/useFriendsStore';
import { useChallengeStore } from '@store/useChallengeStore';
import { Users, Moon, Sun } from 'lucide-react';

// Google Sign-In types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function LandingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut, signInWithGoogle, isLoading } = useUserStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const incomingRequestCount = useFriendsStore((s) => s.incomingRequests.length);
  const quizInviteCount = useFriendsStore((s) => s.quizInvites.length);
  const pendingGiftCount = useFriendsStore((s) => s.pendingGiftNotifications.length);
  const pendingChallengeCount = useChallengeStore((s) =>
    s.challenges.filter((c) => c.status === 'pending' && c.createdBy !== user?.uid).length
  );
  const friendsNotificationCount = incomingRequestCount + quizInviteCount + pendingChallengeCount + pendingGiftCount;

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      console.log('✅ Logged out successfully');
      // Stay on landing page
    } catch (error: any) {
      console.error('❌ Logout failed:', error);
      alert(`Logout failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PynnacleLogo className="w-10 h-10" />
              <h1 className="text-2xl font-bold gradient-text">
                Pynnacle
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Always-visible buttons */}
              <div className="flex items-center gap-1">
                {user && (
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

              {user ? (
                // Logged in: Show user profile and logout
                <>
                  <Link
                    to="/profile-setup"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-purple-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{background:'linear-gradient(135deg,#8b5cf6,#7c3aed)'}}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 font-semibold transition-colors"
                  >
                    Logout
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn-purple px-6 py-2 rounded-lg transition-all font-semibold"
                  >
                    My Courses
                  </Link>
                </>
              ) : (
                // Not logged in: Show sign-in + get started
                <>
                  <button
                    onClick={async () => {
                      try {
                        await signInWithGoogle();
                        navigate('/dashboard');
                      } catch (error: any) {
                        if (error.code === 'auth/popup-closed-by-user' ||
                            error.code === 'auth/cancelled-popup-request' ||
                            error.code === 'auth/already-in-progress') return;
                        alert(`Sign-in failed: ${error.message || 'Unknown error'}`);
                      }
                    }}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-700">
                      {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn-purple px-6 py-2 rounded-lg transition-all font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Master Python Through
              <span className="gradient-text"> Interactive Learning</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Learn Python with gamified lessons, AI-powered validation, and real-time feedback.
              From beginner to expert, Pynnacle makes coding fun and engaging.
            </p>
            <div className="flex gap-4">
              {user ? (
                // Logged in: Show only "Go to Dashboard" button
                <Link
                  to="/dashboard"
                  className="btn-purple px-8 py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                // Not logged in: Show "Get Started" button
                <>
                  <Link
                    to="/dashboard"
                    className="btn-purple px-8 py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Get Started →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="rounded-2xl p-8 shadow-2xl" style={{background:'linear-gradient(135deg,#ede9fe,#f5f3ff)'}}>
            <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-gray-800">
                <code>{`# Your first Python program
print("Hello, Pynnacle!")

# Learn step by step
for i in range(3):
    print(f"Lesson {i + 1} ✓")`}</code>
              </pre>
            </div>
            <div className="flex gap-2">
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                ✓ Challenge Complete!
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                +150 XP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Pynnacle?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-purple-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{background:'linear-gradient(135deg,#7c3aed,#a78bfa)'}}>
                🎮
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Gamified Learning</h4>
              <p className="text-gray-600">
                Earn XP, maintain streaks, and unlock achievements as you progress. Learning Python has never been this fun!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-purple-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{background:'linear-gradient(135deg,#2563eb,#60a5fa)'}}>
                🤖
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Feedback</h4>
              <p className="text-gray-600">
                Get instant, intelligent feedback on your code. Our AI tutor helps you understand mistakes and improve faster.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{background:'linear-gradient(135deg,#16a34a,#4ade80)'}}>
                💻
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Hands-On Practice</h4>
              <p className="text-gray-600">
                Write real Python code in your browser. No setup required - start coding immediately with our interactive IDE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Offerings */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Choose Your Learning Path
        </h3>
        <p className="text-center text-gray-600 mb-12 text-lg">
          From complete beginner to Python expert - we've got you covered
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Beginner Course */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold text-gray-800">Beginner</h4>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                FREE
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Start your Python journey with the fundamentals
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                10 Modules, 50 Lessons
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Interactive Coding Challenges
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AI Code Validation
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 AI Tutor Access
              </li>
            </ul>
            <Link
              to="/dashboard"
              className="block w-full btn-purple text-center px-6 py-3 rounded-lg transition-all font-semibold"
            >
              Start Learning
            </Link>
          </div>

          {/* Intermediate Course */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-200 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold text-gray-800">Intermediate</h4>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                $49
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Level up with advanced Python concepts
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                6 Modules, 30 Lessons
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real-World Projects
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                OOP & Advanced Functions
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Certificate of Completion
              </li>
            </ul>
            <button
              className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed font-semibold"
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* Expert Course */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-200 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold text-gray-800">Expert</h4>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                $99
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Master advanced Python development
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                7 Modules, 35 Lessons
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced Projects
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Async, Testing, & More
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Professional Certificate
              </li>
            </ul>
            <button
              className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed font-semibold"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{background: 'linear-gradient(to right, #7c3aed, #8b5cf6)'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Python Journey?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of learners mastering Python with Pynnacle
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={`${import.meta.env.BASE_URL}avatars/avatar-1.png`} alt="Pynnacle" className="w-8 h-8" />
                <h5 className="text-xl font-bold">Pynnacle</h5>
              </div>
              <p className="text-gray-400">
                Interactive Python learning platform
              </p>
            </div>
            <div>
              <h6 className="font-bold mb-4">Product</h6>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Courses</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Company</h6>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Legal</h6>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Pynnacle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
