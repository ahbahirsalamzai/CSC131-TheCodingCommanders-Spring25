import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// ----------------------
// 🔐 Signup
// ----------------------
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("API URL:", process.env.REACT_APP_API_URL);// debug purpose. 
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// 🔓 Login
// ----------------------
export const login = async (userData) => {
  try {
    console.log("🔐 Login payload:", userData); // 🧪 Log payload before request

    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log("✅ Login response:", response.data); // 🧪 Log success response

    return response.data;
  } catch (error) {
    console.log("❌ Login error response:", error.response?.data); // 🧪 Log error from backend
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// ✅ Verify SignUp/Login OTP
// ----------------------
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "OTP verification failed.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// 🔁 Resend OTP for SignUp/Login
// ----------------------
export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-otp`, { email });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to resend OTP.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// 🔑 Forgot Password - Send OTP
// ----------------------
export const sendForgotPasswordOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to send OTP for password reset.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// 🔐 Verify OTP for Password Reset
// ----------------------
export const verifyForgotPasswordOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-forgot-otp`, { email, otp });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "OTP verification for password reset failed.";
    throw new Error(errorMessage);
  }
};

// ----------------------
// 🔒 Reset Password
// ----------------------
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { email, newPassword });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Password reset failed.";
    throw new Error(errorMessage);
  }
};
