import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authService";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    acceptedTerms: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!formData.acceptedTerms) {
      return setError("You must accept the terms.");
    }

    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/login", {
        state: {
          registrationSuccess: true,
          email: formData.email,
        },
      });
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">SIGN UP</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700">
            Select Your Role:
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="tutor"
                checked={formData.role === "tutor"}
                onChange={handleChange}
              />
              <span className="ml-2">Tutor</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              <span className="ml-2">Student</span>
            </label>
          </div>
        </div>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          required
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            className="form-checkbox"
            required
          />
          <span className="ml-2">I Accept Terms & Conditions</span>
        </label>

        <button
          type="submit"
          className="bg-[#275e49] text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-800"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-[#275e49] hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
