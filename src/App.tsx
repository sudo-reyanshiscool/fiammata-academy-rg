import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import FindMentor from './pages/FindMentor';
import MentorProfile from './pages/MentorProfile';
import RequestMentorship from './pages/RequestMentorship';
import MyRequests from './pages/MyRequests';
import AskExpert from './pages/AskExpert';
import Workshops from './pages/Workshops';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import MentorDashboard from './pages/MentorDashboard';
import MentorLogin from './pages/MentorLogin';
import MentorSignup from './pages/MentorSignup';
import AuthPortal from './pages/AuthPortal';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Preloader from './components/Preloader';

import ProfileSettings from './pages/ProfileSettings';

// Protected Route Component
function ProtectedRoute({ children, mentorOnly = false }: { children: React.ReactNode, mentorOnly?: boolean }) {
  const { user, loading, isMentor } = useAuth();
  
  if (loading) return <div className="flex-1 flex items-center justify-center p-20 text-white font-sans">INITIALIZING TELEMETRY...</div>;
  if (!user) return <Navigate to="/auth-portal" replace />;
  if (mentorOnly && !isMentor) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}

// Onboarding Guard
function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';
  
  if (!hasSeenOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
}

function AnimatedPageRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<PageTransition><Home /></PageTransition>} />
        <Route path="auth-portal" element={<PageTransition><AuthPortal /></PageTransition>} />
        <Route path="find-a-mentor" element={<PageTransition><FindMentor /></PageTransition>} />
        <Route path="mentor/:mentorId" element={<PageTransition><MentorProfile /></PageTransition>} />
        <Route path="login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="signup" element={<PageTransition><Signup /></PageTransition>} />
        
        {/* Mentor Auth */}
        <Route path="mentor/login" element={<PageTransition><MentorLogin /></PageTransition>} />
        <Route path="mentor/signup" element={<PageTransition><MentorSignup /></PageTransition>} />
        
        {/* Auth Routes */}
        <Route path="forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="update-password" element={<PageTransition><UpdatePassword /></PageTransition>} />
        
        {/* Protected Student Routes */}
        <Route path="request/:mentorId" element={
          <ProtectedRoute><PageTransition><RequestMentorship /></PageTransition></ProtectedRoute>
        } />
        <Route path="my-requests" element={
          <ProtectedRoute><PageTransition><MyRequests /></PageTransition></ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute><PageTransition><ProfileSettings /></PageTransition></ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute><PageTransition><ProfileSettings /></PageTransition></ProtectedRoute>
        } />
        
        {/* Protected Mentor Routes */}
        <Route path="mentor/dashboard" element={
          <ProtectedRoute mentorOnly={true}>
            <PageTransition><MentorDashboard /></PageTransition>
          </ProtectedRoute>
        } />

        <Route path="ask-an-expert" element={<PageTransition><AskExpert /></PageTransition>} />
        <Route path="workshops" element={<PageTransition><Workshops /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Preloader />
          <OnboardingGuard>
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={
                <MainLayout>
                  <AnimatedPageRoutes />
                </MainLayout>
              } />
            </Routes>
          </OnboardingGuard>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
