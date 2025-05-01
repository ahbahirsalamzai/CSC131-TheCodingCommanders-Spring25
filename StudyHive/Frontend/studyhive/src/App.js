import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Sessions from "./pages/Sessions";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import VerifySignUpOTP from "./pages/VerifySignUpOTP";
import OTPPage from "./pages/OTPPage";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import ScheduleSession from "./pages/ScheduleSession";
import StudentSchedulePage from "./pages/StudentSchedulePage";
import StudentProfilePage from "./pages/StudentProfile";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navbar />

          <main className="flex-grow container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifySignUpOTP />} />
              <Route path="/otp" element={<OTPPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["student", "tutor", "admin"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute allowedRoles={["student", "tutor"]}>
                    <Sessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payroll"
                element={
                  <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                    <Payroll />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tutor-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["tutor"]}>
                    <TutorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-schedule-session"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentSchedulePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tutor-schedule-session"
                element={
                  <ProtectedRoute allowedRoles={["tutor"]}>
                    <ScheduleSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule-session"
                element={
                  <ProtectedRoute allowedRoles={["tutor"]}>
                    <ScheduleSession />
                  </ProtectedRoute>
                }
              />

              {/* Student Profile Page */}
              <Route
                path="/student-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Forbidden & 404 */}
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
