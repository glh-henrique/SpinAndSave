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

const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
    </Router>
    </>
  );
};

export default App;
