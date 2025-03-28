import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/authService";
import union from "../assets/union.png";

export default function VerifySignUpOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem("otp_email");

    if (emailFromState) {
      setEmail(emailFromState);
      localStorage.setItem("otp_email", emailFromState); // Save for fallback
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      setError("Email is missing. Please sign in again.");
    }
  }, [location.state]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all digits are filled
    if (otpDigits.some((digit) => digit === "")) {
      setError("Please enter all 6 digits.");
      return;
    }
  
    const otp = otpDigits.join(""); // Combine digits into one string
  
    try {
      // Make sure email exists
      if (!email) {
        setError("Email is missing. Please log in again.");
        return;
      }
  
      // Call verifyOTP from authService
      const res = await verifyOTP(email, otp);
  
      setSuccess("Account activated successfully!");
      setError("");
      localStorage.removeItem("otp_email");
  
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError(err.message || "OTP verification failed.");
      setSuccess("");
    }
  };
signup-otp-email-41-local
  const handleResendOTP = async () => {
    if (!email) {
      setMessage("Email is missing. Please sign up again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP resent to your email.");
      } else {
        setMessage("❌ Failed to resend OTP: " + data.message);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setMessage("❌ An error occurred while resending OTP.");
    }
  };

  
 main

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Left Image Section */}
        <div className="hidden xl:block w-[600px] h-[800px] overflow-hidden rounded-[31px] mr-12 mt-[80px]">
          <img
            className="w-full h-full object-cover"
            src={union}
            alt="OTP Verification"
          />
        </div>

        {/* OTP Form Section */}
        <div className="w-full max-w-[450px] bg-white mt-[80px] ml-[30px] mr-[30px] rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[32px] font-bold mb-4">
            OTP Code
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm font-semibold mb-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-center text-sm font-semibold mb-2">
              {success}
            </p>
          )}

          <p className="text-center text-black text-sm mb-4">
            A 6 digit OTP Code has been sent to your email
            <br />
            <span className="font-semibold">
              ({email || "missing email"})
            </span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#1f4d39] text-white rounded-lg text-base font-semibold hover:bg-[#163a2b] transition"
            >
              Done
            </button>
signup-otp-email-41-local
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-[#1f4d39] text-sm font-bold hover:underline mt-2"
            >
              Resend OTP
            </button>


            <div className="flex justify-center items-center mt-4">
              <span className="text-black text-base font-normal font-['Mulish']">
                Do you remember your password?
              </span>
              <a
                href="/login"
                className="text-[#1f4d39] text-base font-bold font-['Mulish'] ml-2 hover:underline"
              >
                Sign In
              </a>
            </div>

main
          </form>

          <div className="text-center mt-4 text-sm">
            Do you remember your password?{" "}
            <a
              href="/login"
              className="text-[#1f4d39] font-semibold hover:underline"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
