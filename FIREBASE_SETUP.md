# Firebase Setup Guide for PyQuest

This guide will help you set up Firebase for cloud authentication and data synchronization in PyQuest.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter a project name (e.g., "PyQuest")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (</>) to add a web app
2. Enter an app nickname (e.g., "PyQuest Web")
3. Click "Register app"
4. You'll see a `firebaseConfig` object with your credentials
5. **Copy these values** - you'll need them for the `.env` file

## Step 3: Enable Authentication Methods

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"
3. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter a support email
   - Click "Save"

## Step 4: Create Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose a location (select one closest to your users)
4. Start in **Test mode** (you can update security rules later)
5. Click "Enable"

## Step 5: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the Firebase placeholders with your actual credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

3. Save the `.env` file
4. Restart your development server: `npm run dev`

## Step 6: (Optional) Update Firestore Security Rules

For production, you should update your Firestore security rules to protect user data:

1. Go to **Firestore Database** > **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Try signing up with email/password
3. Try signing in with Google
4. Check the Firebase Console:
   - **Authentication** > **Users** should show your account
   - **Firestore Database** > **Data** should show a `users` collection with your data

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all Firebase environment variables are set correctly in `.env`
- Restart your dev server after updating `.env`

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your `VITE_FIREBASE_API_KEY` in `.env`
- Make sure you copied the correct value from Firebase Console

### Google Sign-In popup closes immediately
- Check that your Firebase project has Google sign-in enabled
- Verify the authorized domains in Firebase Console > Authentication > Settings

### Data not syncing
- Check browser console for errors
- Verify Firestore security rules allow your user to write data
- Make sure you're logged in with a valid Firebase account

## Features

With Firebase enabled, PyQuest now supports:

✅ **Cloud Authentication**
- Email/password signup and login
- Google Sign-In
- Secure password hashing

✅ **Cross-Device Sync**
- Your progress automatically syncs across all devices
- Sign in from any device and continue where you left off

✅ **Data Persistence**
- All your progress is stored safely in the cloud
- XP, streak, completed lessons, and purchased items are synced

✅ **Real-time Updates**
- Changes sync immediately to Firebase
- Access your data from anywhere

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
