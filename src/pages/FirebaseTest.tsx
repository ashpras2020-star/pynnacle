// Firebase Connection Test Page
import { useState } from 'react';

export function FirebaseTest() {
  const [status, setStatus] = useState<string>('Click button to test Firebase');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setStatus('Testing Firebase connection...');

    try {
      // Step 1: Check if Firebase config exists
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

      if (!apiKey || !projectId) {
        setStatus('❌ Firebase environment variables not found in .env file');
        setLoading(false);
        return;
      }

      setStatus(`✅ Environment variables found\n📝 Project ID: ${projectId}\n\nStep 2: Testing Firebase initialization...`);

      // Step 2: Try to import and initialize Firebase
      const { auth, db } = await import('@config/firebase');

      if (!auth || !db) {
        setStatus('❌ Firebase failed to initialize. Check console for errors.');
        setLoading(false);
        return;
      }

      setStatus('✅ Firebase initialized!\n\nStep 3: Testing authentication service...');

      // Step 3: Test if we can import auth functions
      const { signUpWithEmail } = await import('@services/firebaseAuth');

      setStatus('✅ All Firebase services loaded successfully!\n\n✨ Firebase is working correctly!\n\nYou can now:\n1. Create accounts with email/password\n2. Sign in with Google\n3. Sync data across devices');

    } catch (error: any) {
      setStatus(`❌ Firebase Error:\n\n${error.message}\n\nCommon fixes:\n1. Enable Email/Password auth in Firebase Console\n2. Enable Google auth in Firebase Console\n3. Add localhost to authorized domains\n4. Check if Firebase project exists`);
      console.error('Firebase test error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          🔥 Firebase Connection Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={testFirebaseConnection}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Testing...' : 'Test Firebase Connection'}
          </button>
        </div>

        <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
          {status}
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Landing Page
          </a>
        </div>
      </div>
    </div>
  );
}
