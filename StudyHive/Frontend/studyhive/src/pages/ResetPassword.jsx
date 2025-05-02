import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authService";
import Passwordreset from "../assets/Passwordreset.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem("resetEmail");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await resetPassword(email, password);
      toast.success("Password reset successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 3000); // delay so user can read the toast
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12 relative">
          <img
            className="w-full h-full object-cover"
            src={Passwordreset}
            alt="Reset Password Illustration"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[31px]"></div>
        </div>

        {/* Reset Password Form */}
        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            Reset Password
          </div>

          <p className="text-center text-gray-600 text-sm mt-2 mb-6 font-['Mulish']">
            Your new password must be different from the old password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-black font-bold font-['Mulish']">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border border-[#e0e0e0] rounded-lg focus:ring-2 focus:ring-[#1f4d39]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-black font-bold font-['Mulish']">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border border-[#e0e0e0] rounded-lg focus:ring-2 focus:ring-[#1f4d39]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-red-500 text-sm font-['Mulish']">{message}</p>
            )}

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold font-['Mulish'] hover:bg-[#163a2b] transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
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
      <ToastContainer />
    </div>
  );
}
