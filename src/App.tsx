import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { useUserStore } from '@store/useUserStore';
import { useProgressStore } from '@store/useProgressStore';
import { useThemeStore } from '@store/useThemeStore';

// Pages
import { LandingPage } from '@pages/LandingPage';
import { ProfileSetup } from '@pages/ProfileSetup';
import { GoalSetting } from '@pages/GoalSetting';
import { Home } from '@pages/Home';
import { CoursePage } from '@pages/CoursePage';
import { LessonPage } from '@pages/LessonPage';
import { GamePage } from '@pages/GamePage';
import { AssessmentPage } from '@pages/AssessmentPage';
import { DebugPage } from '@pages/DebugPage';
import { ListChefPage } from '@pages/ListChefPage';
import { GuardGatePage } from '@pages/GuardGatePage';
import { MathQuestPage } from '@pages/MathQuestPage';
import { CipherCrackerPage } from '@pages/CipherCrackerPage';
import { BooleanBouncerPage } from '@pages/BooleanBouncerPage';
import { RobotCommanderPage } from '@pages/RobotCommanderPage';
import { ConveyorCrafterPage } from '@pages/ConveyorCrafterPage';
import { CodeRescuePage } from '@pages/CodeRescuePage';
import { DungeonArchivePage } from '@pages/DungeonArchivePage';
import { FirebaseTest } from '@pages/FirebaseTest';
import { FriendsPage } from '@pages/FriendsPage';
import { QuizLobbyPage } from '@pages/QuizLobbyPage';
import { QuizGamePage } from '@pages/QuizGamePage';
import { QuizResultsPage } from '@pages/QuizResultsPage';

// Components
import { ScrollToTop } from '@components/common/ScrollToTop';
import { QuizInviteToast } from '@components/liveQuiz/QuizInviteToast';
import { BadgeEarnedToast } from '@components/ui/BadgeEarnedToast';
import { StreakAnimation } from '@components/ui/StreakAnimation';
import { ChallengeResultAnimation } from '@components/ui/ChallengeResultAnimation';
import { FriendsNotificationToast } from '@components/friends/FriendsNotificationToast';

// Game/quiz routes that already have their own dark styling — skip dark-mode filter on these.
// Assessment pages use a light bg, so dark mode CAN apply there.
const GAME_ROUTE_RE = /^\/(debug|listchef|guardgate|mathquest|ciphercracker|booleanbouncer|robotcommander|conveyorcrafter|coderescue|filesorter|quiz\/lobby|quiz\/play|quiz\/results)(\/|$)/;

// Applies / removes body.dark-mode, skipping game routes
function DarkModeApplier() {
  const darkMode = useThemeStore((s) => s.darkMode);
  const { pathname } = useLocation();
  const isGameRoute = GAME_ROUTE_RE.test(pathname);

  useEffect(() => {
    if (darkMode && !isGameRoute) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    }
    return () => {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    };
  }, [darkMode, isGameRoute]);

  return null;
}

function App() {
  const { hasCompletedGoalSetting, isAuthenticated } = useUserStore();
  const { completedLessons } = useProgressStore();
  const canAccessApp = hasCompletedGoalSetting || completedLessons.length > 0;

  return (
    <BrowserRouter basename="/pynnacle">
      <DarkModeApplier />
      <ScrollToTop />
      <QuizInviteToast />
      <FriendsNotificationToast />
      <BadgeEarnedToast />
      <StreakAnimation />
      <ChallengeResultAnimation />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Firebase Connection Test */}
        <Route path="/firebase-test" element={<FirebaseTest />} />

        {/* Profile Setup - After Google sign-in */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* Goal Setting - requires authentication, skip if already has progress */}
        <Route
          path="/goal-setting"
          element={
            canAccessApp ? (
              <Navigate to="/dashboard" replace />
            ) : isAuthenticated ? (
              <GoalSetting />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Friends Page */}
        <Route
          path="/friends"
          element={
            canAccessApp ? (
              <FriendsPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Live Quiz Pages */}
        <Route
          path="/quiz/lobby/:gameId"
          element={canAccessApp ? <QuizLobbyPage /> : <Navigate to="/goal-setting" replace />}
        />
        <Route
          path="/quiz/play/:gameId"
          element={canAccessApp ? <QuizGamePage /> : <Navigate to="/goal-setting" replace />}
        />
        <Route
          path="/quiz/results/:gameId"
          element={canAccessApp ? <QuizResultsPage /> : <Navigate to="/goal-setting" replace />}
        />

        {/* Dashboard (formerly home) - redirect based on goal setting status */}
        <Route
          path="/dashboard"
          element={
            canAccessApp ? (
              <Home />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Course Overview */}
        <Route
          path="/course/:courseId"
          element={
            canAccessApp ? (
              <CoursePage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Individual Lesson */}
        <Route
          path="/lesson/:lessonId"
          element={
            canAccessApp ? (
              <LessonPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Post-Lesson Game */}
        <Route
          path="/game/:lessonId"
          element={
            canAccessApp ? (
              <GamePage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Module Assessment */}
        <Route
          path="/assessment/:moduleId"
          element={
            canAccessApp ? (
              <AssessmentPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Debug Detective Game */}
        <Route
          path="/debug/:moduleId"
          element={
            canAccessApp ? (
              <DebugPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* List Chef Game */}
        <Route
          path="/listchef/:moduleId"
          element={
            canAccessApp ? (
              <ListChefPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Guard Gate Game */}
        <Route
          path="/guardgate/:moduleId"
          element={
            canAccessApp ? (
              <GuardGatePage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Math Quest Game */}
        <Route
          path="/mathquest/:moduleId"
          element={
            canAccessApp ? (
              <MathQuestPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Cipher Cracker Game */}
        <Route
          path="/ciphercracker/:moduleId"
          element={
            canAccessApp ? (
              <CipherCrackerPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Boolean Bouncer Game */}
        <Route
          path="/booleanbouncer/:moduleId"
          element={
            canAccessApp ? (
              <BooleanBouncerPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Robot Commander Game */}
        <Route
          path="/robotcommander/:moduleId"
          element={
            canAccessApp ? (
              <RobotCommanderPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Conveyor Crafter Game */}
        <Route
          path="/conveyorcrafter/:moduleId"
          element={
            canAccessApp ? (
              <ConveyorCrafterPage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Code Rescue Game */}
        <Route
          path="/coderescue/:moduleId"
          element={
            canAccessApp ? (
              <CodeRescuePage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* File Sorter Game */}
        <Route
          path="/filesorter/:moduleId"
          element={
            canAccessApp ? (
              <DungeonArchivePage />
            ) : (
              <Navigate to="/goal-setting" replace />
            )
          }
        />

        {/* Catch all - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Try refreshing the page. If the problem persists, try disabling
            browser extensions that may block scripts.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#7c3aed',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithBoundary;
