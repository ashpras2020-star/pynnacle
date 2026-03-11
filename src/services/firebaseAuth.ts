// Firebase Authentication Service

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '@config/firebase';
import type { UserGoal } from '@types';

// User data structure in Firestore
export interface FirebaseUserData {
  uid: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'email';
  createdAt: any;
  lastLogin: any;

  // Progress data
  goal: UserGoal | null;
  hasCompletedGoalSetting: boolean;
  totalXP: number;
  spentXP: number;
  currentStreak: number;
  lastActivityDate: string | null;
  completedLessons: string[];
  inventory: Record<string, number>;
}

// Google Sign-In
export const signInWithGoogle = async (): Promise<{ user: User; userData: FirebaseUserData }> => {
  if (!auth || !db) {
    throw new Error('Firebase is not configured. Please check your .env file.');
  }
  const provider = new GoogleAuthProvider();
  const result: UserCredential = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if user document exists
  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  let userData: FirebaseUserData;

  if (!userDoc.exists()) {
    // Create new user document
    userData = {
      uid: user.uid,
      email: user.email!,
      name: user.displayName || 'User',
      picture: user.photoURL || undefined,
      provider: 'google',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      goal: null,
      hasCompletedGoalSetting: false,
      totalXP: 0,
      spentXP: 0,
      currentStreak: 0,
      lastActivityDate: null,
      completedLessons: [],
      inventory: {},
    };
    await setDoc(userDocRef, userData);
  } else {
    // Update last login
    await updateDoc(userDocRef, {
      lastLogin: serverTimestamp(),
    });
    userData = userDoc.data() as FirebaseUserData;
  }

  return { user, userData };
};

// Email/Password Sign Up
export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: User; userData: FirebaseUserData }> => {
  const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // Create user document
  const userData: FirebaseUserData = {
    uid: user.uid,
    email: user.email!,
    name: name,
    provider: 'email',
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    goal: null,
    hasCompletedGoalSetting: false,
    totalXP: 0,
    spentXP: 0,
    currentStreak: 0,
    lastActivityDate: null,
    completedLessons: [],
    inventory: {},
  };

  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, userData);

  return { user, userData };
};

// Email/Password Sign In
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{ user: User; userData: FirebaseUserData }> => {
  const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // Update last login
  const userDocRef = doc(db, 'users', user.uid);
  await updateDoc(userDocRef, {
    lastLogin: serverTimestamp(),
  });

  // Get user data
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data() as FirebaseUserData;

  return { user, userData };
};

// Sign Out
export const logout = async (): Promise<void> => {
  if (!auth || !auth.signOut) {
    console.warn('Firebase not configured, skipping cloud logout');
    return;
  }
  await signOut(auth);
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<FirebaseUserData | null> => {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data() as FirebaseUserData;
  }
  return null;
};

// Update user data in Firestore
export const updateUserData = async (
  uid: string,
  data: Partial<FirebaseUserData>
): Promise<void> => {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, data);
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
