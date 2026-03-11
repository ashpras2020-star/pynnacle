import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from '@store/useUserStore';
import { useProgressStore } from '@store/useProgressStore';

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

// Components
import { ScrollToTop } from '@components/common/ScrollToTop';

function App() {
  const { hasCompletedGoalSetting } = useUserStore();
  const { updateStreak } = useProgressStore();

  // Update streak on app load
  useEffect(() => {
    if (hasCompletedGoalSetting) {
      updateStreak();
    }
  }, [hasCompletedGoalSetting, updateStreak]);

  return (
    <BrowserRouter basename="/pynnacle">
      <ScrollToTop />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Firebase Connection Test */}
        <Route path="/firebase-test" element={<FirebaseTest />} />

        {/* Profile Setup - After Google sign-in */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* Goal Setting */}
        <Route path="/goal-setting" element={<GoalSetting />} />

        {/* Dashboard (formerly home) - redirect based on goal setting status */}
        <Route
          path="/dashboard"
          element={
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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
            hasCompletedGoalSetting ? (
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

export default App;
