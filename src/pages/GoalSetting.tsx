// Goal Setting Page - First-time user onboarding
// Student sets learning goal (complete course in X days)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import { db } from '@services/database';

export function GoalSetting() {
  const navigate = useNavigate();
  const { setGoal } = useUserStore();
  const [days, setDays] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lessonsPerDay = Math.ceil(50 / days);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const goal = {
      id: crypto.randomUUID(),
      targetDays: days,
      lessonsPerDay,
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to IndexedDB
      await db.goals.add(goal);

      // Update store
      setGoal(goal);

      // Sync to Firebase cloud (if logged in)
      const { syncToCloud } = useUserStore.getState();
      await syncToCloud().catch(err => console.warn('Cloud sync skipped:', err));

      // Navigate to profile setup, then dashboard
      navigate('/profile-setup');
    } catch (error) {
      console.error('Failed to save goal:', error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Set Your Learning Goal
          </h1>
          <p className="text-xl text-gray-600">
            How long do you want to spend completing the Beginner course?
          </p>
        </div>

        {/* Goal Form */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-purple-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-4">
                I want to complete the Beginner course in:
              </label>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="days"
                  min="7"
                  max="90"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((days - 7) / 83) * 100}%, #e9d5ff ${((days - 7) / 83) * 100}%, #e9d5ff 100%)`
                  }}
                />
                <div className="text-3xl font-bold text-purple-600 min-w-[80px] text-center">
                  {days}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>7 days</span>
                <span>90 days</span>
              </div>
            </div>

            {/* Calculation Display */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Your daily target:</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {lessonsPerDay} lesson{lessonsPerDay > 1 ? 's' : ''}/day
                </div>
                <div className="text-sm text-gray-500">
                  50 total lessons in the Beginner course
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-purple font-semibold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Setting up...
                </span>
              ) : (
                "Let's Start Learning!"
              )}
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">10</div>
            <div className="text-sm text-gray-600">Modules</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">50</div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">10</div>
            <div className="text-sm text-gray-600">Unique Games</div>
          </div>
        </div>
      </div>
    </div>
  );
}
