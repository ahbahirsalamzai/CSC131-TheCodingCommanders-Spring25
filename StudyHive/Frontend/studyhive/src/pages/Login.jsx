import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/authService"; // you still need this for API call
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import union from "../assets/union.png";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (name, value) => {
    if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
    if (name === "password" && value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const res = await login(formData); // 🔥 actually call API here

        if (res.token) {
          const userObject = {
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            role: res.role,
            isVerified: res.isVerified,
            token: res.token,
          };

          // 🔥 Save user to context AND localStorage
          handleLogin(userObject);

          toast.success("Login successful!", {
            position: "top-center",
            autoClose: 1500,
          });

          const decoded = jwtDecode(res.token);

          setTimeout(() => {
            if (decoded.role === "student") {
              navigate("/student-dashboard");
            } else if (decoded.role === "tutor") {
              navigate("/tutor-dashboard");
            } else {
              navigate("/profile");
            }
          }, 1500);
        }
      } catch (err) {
        setErrorMessage(err.message || "Login failed.");
        toast.error(err.message || "Login failed.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12">
          <img className="w-full h-full object-cover" src={union} alt="Illustration for login page" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[450px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold">Sign In</div>

          {errorMessage && (
            <div className="text-red-600 text-sm text-center mt-2">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            {/* Email Input */}
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-black text-base font-bold">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="abc12@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="password" className="text-black text-base font-bold">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*******"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm text-[#1f4d39] font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between w-full">
              <label className="flex items-center text-black text-sm font-medium">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-[#1f1f1f] text-sm font-semibold hover:text-blue-600 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
              disabled={!!errors.email || !!errors.password || !formData.email || !formData.password}
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">Don’t have an account?</span>
            <Link to="/signup" className="text-[#1f4d39] text-base font-bold ml-2">Sign Up</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
