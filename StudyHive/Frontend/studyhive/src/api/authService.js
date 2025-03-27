import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Signup Function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Signup failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// Login Function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// ✅ Verify OTP Function
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "OTP verification failed.";
    throw new Error(errorMessage);
  }
};


// ✅ Send OTP Function (for resend feature)
export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-otp`, { email });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to send OTP.";
    throw new Error(errorMessage);
  }
};
