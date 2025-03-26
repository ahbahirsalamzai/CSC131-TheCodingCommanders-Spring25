import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransferL from "../assets/transferlife.jpg";

export default function VerifySignUpOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    setMessage("");

    if (!email) {
      setMessage("Email is missing. Please sign up again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Account verified successfully. You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ Verification failed: " + data.message);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setMessage("❌ An error occurred during verification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12 relative">
          <img
            className="w-full h-full object-cover"
            src={TransferL}
            alt="Illustration for OTP page"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[31px]" />
        </div>

        {/* OTP Form Section */}
        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            OTP Code
          </div>

          {message && (
            <div className="text-center text-sm font-medium text-red-600 mt-2">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full items-center">
              <p className="text-black text-sm font-normal font-['Mulish'] text-center">
                A 6 digit OTP Code has been sent to your email<br />
                <strong>{email || "(missing email)"}</strong>
              </p>

              <div className="flex gap-4 mt-6">
                {otp.map((digit, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 relative">
                    {!digit && (
                      <div className="absolute text-neutral-300 text-xl font-normal font-['Mulish'] leading-loose top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        0
                      </div>
                    )}
                    <input
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-xl font-['Mulish'] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f4d39] bg-transparent relative z-10"
                      maxLength={1}
                      inputMode="numeric"
                    />
                    <div className="w-11 h-0 outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-300"></div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold font-['Mulish'] hover:bg-[#163a2b] transition"
              disabled={otp.some((digit) => !digit)}
            >
              Done
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
          </form>
        </div>
      </div>
    </div>
  );
}