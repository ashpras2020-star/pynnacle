// Landing Page - Public home page with course info, login, and settings

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '@store/useUserStore';

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
  const { user, isAuthenticated, signOut } = useUserStore();

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🐍</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                PyQuest
              </h1>
            </div>

            <div className="flex items-center gap-4">
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
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
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
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold"
                  >
                    My Courses
                  </Link>
                </>
              ) : (
                // Not logged in: Show get started button
                <>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold"
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
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"> Interactive Learning</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Learn Python with gamified lessons, AI-powered validation, and real-time feedback.
              From beginner to expert, PyQuest makes coding fun and engaging.
            </p>
            <div className="flex gap-4">
              {user ? (
                // Logged in: Show only "Go to Dashboard" button
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                // Not logged in: Show "Get Started" button
                <>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Get Started →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-gray-800">
                <code>{`# Your first Python program
print("Hello, PyQuest!")

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
            Why Choose PyQuest?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-3xl mb-4">
                🎮
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Gamified Learning</h4>
              <p className="text-gray-600">
                Earn XP, maintain streaks, and unlock achievements as you progress. Learning Python has never been this fun!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-3xl mb-4">
                🤖
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Feedback</h4>
              <p className="text-gray-600">
                Get instant, intelligent feedback on your code. Our AI tutor helps you understand mistakes and improve faster.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-3xl mb-4">
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
              className="block w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold"
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
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Python Journey?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of learners mastering Python with PyQuest
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
                <div className="text-2xl">🐍</div>
                <h5 className="text-xl font-bold">PyQuest</h5>
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
            <p>&copy; 2024 PyQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
