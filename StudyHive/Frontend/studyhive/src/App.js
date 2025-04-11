import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";

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
import AdminAccounts from './pages/AdminAccounts';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hide Header + Navbar on admin pages */}
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Navbar />}

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
          <Route path="/admin/accounts" element={<AdminAccounts />} />
        </Routes>
      </main>

      {/* Hide Footer on admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
