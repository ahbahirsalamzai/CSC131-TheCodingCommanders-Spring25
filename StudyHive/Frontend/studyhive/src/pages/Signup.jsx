// FRONTEND: SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Studs from "../assets/Studentswalk.jpg";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function SignUp() {
  const { handleSignup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
  const [showTerms, setShowTerms] = useState(false);

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

        await handleSignup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName
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
        <div className="w-full max-w-[500px] mt-[120px] ml-[30px] mr-[30px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold mb-4">Sign Up</div>

          {Object.values(errors).some((e) => e) && (
            <div className="text-red-600 text-sm font-semibold mb-2 text-center">
              Please fix the highlighted fields.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center mt-2">
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

            <div className="w-full">
              <label className="block font-bold mb-1">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="w-full">
              <label className="block font-bold mb-1">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div className="w-full">
              <label className="block font-bold mb-1">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div className="w-full">
              <label className="block font-bold mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="w-full relative">
              <label className="block font-bold mb-1">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-sm text-[#1f4d39] font-semibold">
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="w-full relative">
              <label className="block font-bold mb-1">Confirm Password</label>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-sm text-[#1f4d39] font-semibold">
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center w-full text-sm mt-2">
              <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} className="mr-2" />
              I accept <button type="button" className="text-[#1f4d39] font-semibold hover:underline ml-1" onClick={() => setShowTerms(true)}>Terms & Conditions</button>
            </div>
            {errors.acceptedTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptedTerms}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 mt-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition">
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base">Already have an account?</span>
            <Link to="/login" className="text-[#1f4d39] text-base font-bold ml-2 hover:underline">Sign In</Link>
          </div>
        </div>

        <div className="hidden xl:block w-[600px] h-[800px] mb-[20px] mt-[100px] overflow-hidden rounded-[31px] ml-12">
          <img className="w-full h-full object-cover filter brightness-50" src={Studs} alt="Illustration" />
        </div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[500px] p-6 rounded-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-[#1f4d39]">Terms and Conditions</h2>
            <p className="text-sm text-gray-700 mb-10">
              StudyHive is an educational platform. By signing up, you agree to use the platform respectfully,
              maintain academic honesty, and abide by all community guidelines.
            </p>
            <button onClick={() => setShowTerms(false)} className="absolute bottom-4 right-6 text-sm font-semibold text-black hover:underline">
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}