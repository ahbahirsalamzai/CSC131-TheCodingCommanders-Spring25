import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP, sendOTP } from "../api/authService";
import union from "../assets/union.png";

export default function VerifySignUpOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem("otp_email");

    if (emailFromState) {
      setEmail(emailFromState);
      localStorage.setItem("otp_email", emailFromState);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      setError("Email is missing. Please sign in again.");
    }
  }, [location.state]);

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      const digits = paste.split("");
      setOtpDigits(digits);
      setTimeout(() => {
        document.getElementById("otp-5")?.focus();
      }, 10);
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newDigits = [...otpDigits];
      if (otpDigits[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-${index - 1}`).focus();
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
    if (otpDigits.some((digit) => digit === "")) {
      setError("Please enter all 6 digits.");
      return;
    }

    const otp = otpDigits.join("");
    try {
      if (!email) {
        setError("Email is missing. Please log in again.");
        return;
      }
      await verifyOTP(email, otp);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.isVerified = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
      setSuccess("Account activated successfully!");
      setError("");
      localStorage.removeItem("otp_email");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.message || "OTP verification failed.");
      setSuccess("");
    }
  };

  const handleResendOTP = async () => {
    try {
      if (!email) {
        setError("Email is missing. Please log in again.");
        return;
      }
      await sendOTP(email);
      setResendMessage("A new OTP has been sent to your email.");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
      setResendMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12">
          <img className="w-full h-full object-cover" src={union} alt="OTP Verification" />
        </div>

        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish'] mb-4">
            OTP Code
          </div>

          {error && <p className="text-red-600 text-center text-sm font-semibold mb-2">{error}</p>}
          {success && <p className="text-green-600 text-center text-sm font-semibold mb-2">{success}</p>}
          {resendMessage && <p className="text-green-600 text-center text-sm font-semibold mb-2">{resendMessage}</p>}

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
                  className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              ))}
            </div>

            <button type="submit" className="w-full px-6 py-3 bg-[#1f4d39] text-white rounded-lg text-base font-semibold hover:bg-[#163a2b] transition mb-4">
              Done
            </button>

            <button type="button" onClick={handleResendOTP} className="text-sm text-[#1f4d39] hover:underline font-semibold">
              Resend OTP Code
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Do you remember your password?{' '}
            <a href="/login" className="text-[#1f4d39] font-semibold hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
