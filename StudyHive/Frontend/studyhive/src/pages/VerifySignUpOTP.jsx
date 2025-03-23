import React, { useState, useRef } from "react";
import TransferL from "../assets/transferlife.jpg"; // Ensure the image path is correct

export default function VerifySignUpOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus the next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Submitting OTP:", otpCode);
    // Handle OTP submission here
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section with Dark Overlay */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12 relative">
          <img
            className="w-full h-full object-cover"
            src={TransferL} // Use the imported image
            alt="Illustration for OTP page"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[31px]"></div>
        </div>

        {/* OTP Form Section */}
        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            OTP Code
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full items-center">
              {/* Updated Text with Line Break */}
              <p className="text-black text-sm font-normal font-['Mulish'] text-center">
                A 6 digit OTP Code has been sent to your email<br />given by you
              </p>

              {/* OTP Input Fields with Background Zeros */}
              <div className="flex gap-4 mt-6">
                {otp.map((digit, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 relative">
                    {/* Background Zero (only shown when input is empty) */}
                    {!digit && (
                      <div className="absolute text-neutral-300 text-xl font-normal font-['Mulish'] leading-loose top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        0
                      </div>
                    )}
                    {/* Input Field */}
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
                    {/* Bottom Line */}
                    <div className="w-11 h-0 outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done Button */}
            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold font-['Mulish'] hover:bg-[#163a2b] transition"
              disabled={otp.some((digit) => !digit)}
            >
              Done
            </button>

            {/* Sign In Link */}
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