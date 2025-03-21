import React, { useState, useRef } from "react";

export default function OTPPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    // Handle OTP Input
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

    // Handle Backspace
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle OTP Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setMessage("OTP must be exactly 6 digits.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "user@example.com", otp: otpCode }),
            });

            const data = await response.json();
            if (data.success) {
                alert("OTP Verified! Redirecting...");
                window.location.href = "/reset-password";
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-10 shadow-lg rounded-lg text-center w-full max-w-md">
                <h2 className="text-3xl font-bold text-black">OTP Code</h2>
                <p className="text-sm text-gray-600 mt-2">
                    A 6-digit OTP code has been sent to your email.
                </p>

                {/* OTP Input Fields */}
                <form onSubmit={handleSubmit} className="flex justify-center mt-6 space-x-2 sm:space-x-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength="1"
                            className="w-12 h-14 sm:w-14 sm:h-16 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    ))}
                </form>

                {/* Error Message */}
                {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 w-full bg-[#275e49] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition text-lg"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Done"}
                </button>

                {/* Sign In Link */}
                <p className="mt-4 text-sm text-gray-600">
                    Do you remember your password? {" "}
                    <a href="/login" className="text-[#275e49] font-semibold hover:underline">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}
