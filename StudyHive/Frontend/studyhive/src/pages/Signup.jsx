import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      } else if (name === "password" && value.length < 6) {
        error = "Password must be at least 6 characters";
      } else if (name === "confirmPassword" && value !== formData.password) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate on change
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "acceptedTerms") {
        newErrors[key] = validateField(key, value);
      }
    });

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the terms.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      try {
        setIsSubmitting(true);

        await signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 2500,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2600);
      } catch (err) {
        toast.error(err.message || "Signup failed.", {
          position: "top-center",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] mb-[50px] flex justify-center items-center">
        {/* Form Section */}
        <div className="w-full max-w-[500px] mt-[120px] ml-[30px] mr-[30px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish'] mb-4">
            Sign Up
          </div>

          {Object.values(errors).some((e) => e) && (
            <div className="text-red-600 text-sm font-semibold mb-2 text-center">
              Please fix the highlighted fields.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center mt-2">
            {/* Role */}
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
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-black text-base font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full relative">
              <label className="block text-black text-base font-bold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-sm text-[#1f4d39] font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full relative">
              <label className="block text-black text-base font-bold mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#e0e0e0] text-black"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-sm text-[#1f4d39] font-semibold"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
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
            {errors.acceptedTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.acceptedTerms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 mt-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Link to Login */}
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

      <ToastContainer />
    </div>
  );
}
