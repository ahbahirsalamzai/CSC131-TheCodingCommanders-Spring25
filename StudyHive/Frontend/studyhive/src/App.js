// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Sessions from './pages/Sessions';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import VerifySignUpOTP from './pages/VerifySignUpOTP';
import OTPPage from './pages/OTPPage';
import ResetPassword from './pages/ResetPassword';
import StudentDashboard from './pages/StudentDashboard';
import ScheduleSession from './pages/ScheduleSession'; // Make sure this exists
import StudentSchedulePage from './pages/StudentSchedulePage'; // student schedual session
import TutorDashboard from './pages/TutorDashboard'; // tutor dashbord


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifySignUpOTP />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Dashboards */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/tutor-dashboard" element={<TutorDashboard />} />
            <Route path="/tutor-schedule-session" element={<ScheduleSession />} />

            {/*student schedule session */}
            <Route path="/student-schedule-session" element={<StudentSchedulePage />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;