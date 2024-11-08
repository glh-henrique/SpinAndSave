import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import BaseLayout from "./theme/components/BaseLayout";
import NotFound from "./pages/NotFound";
import UsageHistory from "./pages/UsageHistory";
import { AuthProvider } from "./context/AuthContext";
import GlobalMessage from "./components/GlobalMessage";
import { MessageProvider } from "./context/MessageContext";
import PasswordRecovery from "./pages/PasswordRecovery";
import ResetPassword from "./pages/PasswordReset";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <MessageProvider>
          <AuthProvider>
            <GlobalMessage />
            <Routes>
              <Route path="/" element={
                <ProtectedRoute requiresAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
              />
              <Route path="/login" element={
                <ProtectedRoute requiresAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
              />
              <Route path="/register" element={
                <ProtectedRoute requiresAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
              />
              <Route path="/email-verification" element={
                <ProtectedRoute requiresAuth={false}>
                  <EmailVerification />
                </ProtectedRoute>
              }
              />
              <Route path="/password-recovery" element={
                <ProtectedRoute requiresAuth={false}>
                  <PasswordRecovery />
                </ProtectedRoute>
              }
              />
              <Route path="/reset-password" element={
                <ProtectedRoute requiresAuth={false}>
                  <ResetPassword />
                </ProtectedRoute>
              }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute requiresAuth>
                    <BaseLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="usage-history" element={<UsageHistory />} />
                <Route path="laundry-status" element={<p> aqui ainda não ta pronto</p>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </MessageProvider>
      </Router>
    </>
  );
};

export default App;
