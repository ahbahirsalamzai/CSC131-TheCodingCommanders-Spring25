import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendForgotPasswordOTP } from "../api/authService";
import welcome from "../assets/welcome.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });

  const validateField = (name, value) => {
    if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: validateField("email", formData.email) };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const res = await sendForgotPasswordOTP(formData.email);

        toast.success("OTP sent to your email!", {
          position: "top-center",
          autoClose: 2000,
        });

        localStorage.setItem("resetEmail", formData.email);
        setTimeout(() => {
          navigate("/otp", { state: { email: formData.email } });
        }, 2000);
      } catch (err) {
        toast.error(err.message || "Something went wrong. Try again.", {
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
          <img className="w-full h-full object-cover" src={welcome} alt="Forgot password" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold">Forgot Your Password?</div>
          <div className="text-center text-neutral-600 text-sm font-normal mt-4">
            Don’t worry! Just type in the email you used on StudyHive.
          </div>

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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
              disabled={!!errors.email || !formData.email}
            >
              Send
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">Remember your password?</span>
            <Link to="/login" className="text-[#1f1f1f] text-sm font-semibold hover:text-blue-600 transition-colors duration-200 ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
