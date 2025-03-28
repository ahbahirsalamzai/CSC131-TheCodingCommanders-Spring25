import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tutor",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error) && formData.acceptTerms) {
      try {
        const response = await fetch("http://localhost:3001/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          navigate("/verify-otp", { state: { email: formData.email } });
        } else {
          const errorData = await response.json();
          alert("Signup failed: " + (errorData.message || "Unknown error"));
        }
      } catch (error) {
        alert("Something went wrong. Try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] mb-[150px] flex justify-center items-center">
        <div className="w-full max-w-[500px] mt-[100px]  mt-[150px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            Sign Up
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Select Your Role:
              </label>
              <div className="flex gap-4 mt-2">
                {["tutor", "student"].map((role) => (
                  <div
                    key={role}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${formData.role === role
                        ? "bg-blue-50 border border-blue-500"
                        : "bg-white border border-gray-300"
                      }`}
                    onClick={() => handleRoleChange(role)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.role === role ? "border-blue-500" : "border-gray-400"
                        }`}
                    >
                      {formData.role === role && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-neutral-800 capitalize">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                aria-invalid={!!errors.username}
                aria-describedby="username-error"
                required
              />
              {errors.username && (
                <p id="username-error" className="text-red-500 text-sm mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abc12@gmail.com"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                required
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="*******"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                required
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="*******"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
                required
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))
                }
                className="w-4 h-4 border border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-black text-sm font-medium">
                I Accept Terms & Conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
              disabled={
                !!errors.username ||
                !!errors.email ||
                !!errors.password ||
                !!errors.confirmPassword ||
                !formData.acceptTerms
              }
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">
              Already have an account?
            </span>
            <a href="/signin" className="text-[#1f4d39] text-base font-bold ml-2">
              Sign In
            </a>
          </div>
        </div>

        <div className="hidden xl:block w-[600px] h-[800px] mb-[100px] mt-[150px] overflow-hidden rounded-[31px] ml-12">
          <img
            className="w-full h-full object-cover"
            src="https://placehold.co/500x700"
            alt="Illustration for sign-up page"
          />
        </div>
      </div>
    </div>
  );
}
