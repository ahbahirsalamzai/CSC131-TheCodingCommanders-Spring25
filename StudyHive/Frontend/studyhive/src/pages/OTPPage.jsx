import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyForgotPasswordOTP, sendForgotPasswordOTP } from "../api/authService";
import transferlife from "../assets/transferlife.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OTPPage() {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
    if (!/^\d*$/.test(value)) return;

    if (value.length === 6) {
      const digits = value.split("").slice(0, 6);
      setOtpDigits(digits);
      digits.forEach((digit, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      inputRefs.current[5]?.focus();
    } else {
      const newDigits = [...otpDigits];
      newDigits[index] = value;
      setOtpDigits(newDigits);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtpDigits(digits);
      digits.forEach((digit, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newDigits = [...otpDigits];
      if (otpDigits[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          newDigits[index - 1] = "";
          setOtpDigits(newDigits);
        }
      } else {
        newDigits[index] = "";
        setOtpDigits(newDigits);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otpDigits.join("");
    if (otpCode.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      setSuccess("");
      return;
    }

    setLoading(true);
    try {
      await verifyForgotPasswordOTP(email, otpCode);
      setSuccess("OTP verified successfully!");
      setError("");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (error) {
      setError(error.message || "Verification failed. Try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      await sendForgotPasswordOTP(email);
      setResendMessage("A new OTP has been sent to your email.");
      setError("");
    } catch (error) {
      setError(error.message || "Failed to resend OTP.");
      setResendMessage("");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12 relative">
          <img
            className="w-full h-full object-cover"
            src={transferlife}
            alt="OTP page"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[31px]" />
        </div>

        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish'] mb-4">
            OTP Code
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm font-semibold mb-2">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-center text-sm font-semibold mb-2">{success}</p>
          )}

          {resendMessage && (
            <p className="text-green-600 text-center text-sm font-semibold mb-2">{resendMessage}</p>
          )}

          <p className="text-center text-black text-sm mb-4">
            A 6 digit OTP Code has been sent to your email
            <br />
            <span className="font-semibold">({email || "missing email"})</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="flex gap-2 mb-4" onPaste={handlePaste}>
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#1f4d39] text-white rounded-lg text-base font-semibold hover:bg-[#163a2b] transition mb-4"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Done"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-[#1f4d39] hover:underline font-semibold"
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend OTP Code"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Remember your password?{' '}
            <a href="/login" className="text-[#1f4d39] font-semibold hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
