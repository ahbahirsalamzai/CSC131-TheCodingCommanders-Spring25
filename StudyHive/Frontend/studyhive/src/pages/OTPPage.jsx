import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyForgotPasswordOTP,
  sendForgotPasswordOTP,
} from "../api/authService";
import transferlife from "../assets/transferlife.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    const otpCode = otp.join(""); // ✅ Define it BEFORE using it
  
    if (otpCode.length !== 6) {
      setMessage("OTP must be exactly 6 digits.");
      return;
    }
  
    setLoading(true);
    try {
      await verifyForgotPasswordOTP(email, otpCode);
      toast.success("✅ OTP Verified! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleResendOTP = async () => {
    setResending(true);
    try {
      await sendForgotPasswordOTP(email);
      toast.success("🔁 OTP resent to your email.", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP.", {
        position: "top-center",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Left Image */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12 relative">
          <img
            className="w-full h-full object-cover"
            src={transferlife}
            alt="OTP page"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[31px]" />
        </div>

        {/* OTP Form */}
        <div className="w-full max-w-[550px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            OTP Code
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full items-center mt-6"
          >
            <div className="flex flex-col w-full items-center">
              <p className="text-black text-sm font-normal font-['Mulish'] text-center">
                A 6-digit OTP has been sent to your email.<br />
                Please enter it below to verify.
              </p>

              <div className="flex gap-4 mt-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 text-center text-xl font-['Mulish'] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f4d39] bg-transparent"
                    maxLength={1}
                    inputMode="numeric"
                  />
                ))}
              </div>
            </div>

            {message && (
              <div className="text-red-600 text-sm text-center mt-2 font-['Mulish']">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold font-['Mulish'] hover:bg-[#163a2b] transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Done"}
            </button>

            {/* Resend OTP */}
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600 font-['Mulish']">
                Didn’t receive the code?
              </span>
              <button
                type="button"
                onClick={handleResendOTP}
                className="ml-2 text-sm text-[#1f4d39] font-semibold hover:underline"
                disabled={resending}
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            <div className="flex justify-center items-center mt-4">
              <span className="text-black text-base font-normal font-['Mulish']">
                Remember your password?
              </span>
              <a
                href="/login"
                className="text-[#1f4d39] text-base font-bold font-['Mulish'] ml-2 hover:underline"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
