// Authentication Service
// Handles Google OAuth sign-in and user management

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@config/firebase';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account', // Always show account picker
});

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      console.log('Auth state changed:', user ? `Signed in as ${user.email}` : 'Signed out');
    });
  }

  /**
   * Sign in with Google
   */
  private signInInProgress = false;

  async signInWithGoogle(): Promise<AuthUser> {
    // Prevent overlapping sign-in attempts
    if (this.signInInProgress) {
      throw Object.assign(new Error('Sign-in already in progress'), {
        code: 'auth/already-in-progress',
      });
    }

    this.signInInProgress = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error: any) {
      console.error('Sign-in error:', error);
      // Preserve the Firebase error code so callers can check it
      throw error;
    } finally {
      this.signInInProgress = false;
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      this.currentUser = null;
    } catch (error: any) {
      console.error('Sign-out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null {
    if (!this.currentUser) return null;

    return {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
    };
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        callback(null);
      }
    });
  }

  /**
   * Check if user is signed in
   */
  isSignedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Get user ID
   */
  getUserId(): string | null {
    return this.currentUser?.uid || null;
  }
}

export const authService = new AuthService();
