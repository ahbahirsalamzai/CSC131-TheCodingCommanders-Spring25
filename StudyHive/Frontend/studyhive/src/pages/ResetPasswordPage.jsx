import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle Password Reset Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (data.success) {
                alert("Password reset successful! Redirecting to login...");
                navigate("/login");
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
                <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
                <p className="text-sm text-gray-600 mt-2">
                    Your new password must be different from the old password.
                </p>

                {/* Password Reset Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="text-left">
                        <label className="block text-gray-800 font-bold">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-left">
                        <label className="block text-gray-800 font-bold">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {message && <p className="text-red-500 text-sm">{message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#275e49] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition text-lg"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
