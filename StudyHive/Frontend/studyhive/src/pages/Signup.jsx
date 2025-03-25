import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authService";
import Studs from "../assets/Studentswalk.jpg";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    acceptedTerms: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      return setError("You must accept the terms.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setIsSubmitting(true);

      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Redirect to OTP page
      navigate("/VerifySignUpOTP", {
        state: {
          email: formData.email,
        },
      });
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] mb-[50px] flex justify-center items-center">
        {/* Form Section */}
        <div className="w-full max-w-[500px] mt-[80px] ml-[30px] mr-[30px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish'] mb-4">
            Sign Up
          </div>

          {error && (
            <div className="text-red-600 text-sm font-semibold mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center mt-2">
            {/* Role Selection */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-2">Select Your Role:</label>
              <div className="flex gap-6">
                {["tutor", "student"].map((role) => (
                  <label key={role} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                    />
                    <span className="capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Username */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
            </div>

            {/* Terms */}
            <label className="flex items-center w-full text-sm mt-2">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mr-2"
              />
              I Accept Terms & Conditions
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 mt-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base">Already have an account?</span>
            <a href="/login" className="text-[#1f4d39] text-base font-bold ml-2 hover:underline">
              Sign In
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden xl:block w-[600px] h-[800px] mb-[20px] mt-[100px] overflow-hidden rounded-[31px] ml-12">
          <img
            className="w-full h-full object-cover filter brightness-50"
            src={Studs}
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
}
