import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const AdminProfilePage = () => {
const [personalInfo, setPersonalInfo] = useState({
    username: "",
    email: "",
});

const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const [errors, setErrors] = useState({});
const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
});

useEffect(() => {
    const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    console.log("🔑 Loaded token:", token);

if (!token) {
        console.warn("⚠️ No token found in localStorage.");
        return;
}

try {
    const response = await axios.get("http://localhost:3001/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Admin profile response:", response.data);

        setPersonalInfo({
        username: response.data.username || "",
        email: response.data.email || "",
        });
} catch (error) {
        console.error("❌ Error fetching user info:", error);
}
    };

    fetchUserInfo();
}, []);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    if (name in personalInfo) {
    setPersonalInfo({ ...personalInfo, [name]: value });
    } else {
    setPasswordInfo({ ...passwordInfo, [name]: value });
    }
};

const handleSubmitPersonalInfo = async () => {
    const newErrors = {};
    if (!validateEmail(personalInfo.email)) {
    newErrors.email = "Invalid email address format.";
    }

    if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
    }

    try {
    const response = await axios.put("/api/users/update", personalInfo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    alert("Personal Info Updated Successfully");
    } catch (error) {
    console.error("Error updating personal info:", error);
    alert("Failed to update personal info.");
    }
};

const handleSubmitPassword = async () => {
    const newErrors = {};

    if (passwordInfo.newPassword.length < 6) {
    newErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!passwordInfo.currentPassword) {
    newErrors.currentPassword = "Current password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
    }

    try {
    const response = await axios.put("/api/users/change-password", passwordInfo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    alert("Password Updated Successfully");
    setPasswordInfo({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    } catch (error) {
    console.error("Error changing password:", error);
    const apiErrors = error?.response?.data?.errors || {};
    const fallback = error?.response?.data?.message || "Incorrect current password.";
    const updatedErrors = {};

    Object.keys(apiErrors).forEach((key) => {
        updatedErrors[key] = apiErrors[key];
    });

    if (Object.keys(updatedErrors).length === 0) {
        updatedErrors.currentPassword = fallback;
    }

    setErrors(updatedErrors);
    }
};

return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
    <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
    </div>

    <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Personal Info Section */}
        <div className="bg-white border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Personal Info</h3>
            <p className="text-sm text-gray-500 mb-4">Update your personal details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
                <label className="text-sm text-gray-700">Name</label>
                <input
                type="text"
                name="username"
                value={personalInfo.username}
                onChange={handleChange}
                placeholder="Example Name"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm text-gray-700">Email</label>
                <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            </div>

            <div className="flex gap-4 justify-end mt-4">
            <button
                onClick={() => setPersonalInfo({ username: "", email: "" })}
                className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmitPersonalInfo}
                className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base capitalize font-semibold rounded-lg"
            >
                Update
            </button>
            </div>
        </div>

          {/* Password Section */}
        <div className="bg-white border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Password</h3>
            <p className="text-sm text-gray-500 mb-4">Update your password</p>

            <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
                <label className="text-sm text-gray-700">Current Password</label>
                <div className="relative">
                <input
                    type={showPassword.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordInfo.currentPassword}
                    onChange={handleChange}
                    placeholder="*******"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
                <button
                    type="button"
                    onClick={() =>
                    setShowPassword({
                        ...showPassword,
                        currentPassword: !showPassword.currentPassword,
                    })
                    }
                    className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                >
                    {showPassword.currentPassword ? "Hide" : "Show"}
                </button>
                </div>
                {errors.currentPassword && (
                <span className="text-red-500 text-sm">{errors.currentPassword}</span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                <label className="text-sm text-gray-700">New Password</label>
                <div className="relative">
                    <input
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordInfo.newPassword}
                    onChange={handleChange}
                    placeholder="*******"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                    />
                    <button
                    type="button"
                    onClick={() =>
                        setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
                    }
                    className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                    >
                    {showPassword.newPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {errors.newPassword && (
                    <span className="text-red-500 text-sm">{errors.newPassword}</span>
                )}
                </div>

                <div className="flex flex-col">
                <label className="text-sm text-gray-700">Confirm Password</label>
                <div className="relative">
                    <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordInfo.confirmPassword}
                    onChange={handleChange}
                    placeholder="*******"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                    />
                    <button
                    type="button"
                    onClick={() =>
                        setShowPassword({
                        ...showPassword,
                        confirmPassword: !showPassword.confirmPassword,
                    })
                    }
                    className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                    >
                    {showPassword.confirmPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                )}
                </div>
            </div>
            </div>

            <div className="flex gap-4 justify-end mt-4">
            <button
                onClick={() =>
                setPasswordInfo({ currentPassword: "", newPassword: "", confirmPassword: "" })
                }
                className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmitPassword}
                className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base capitalize font-semibold rounded-lg"
            >
                Submit
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default AdminProfilePage;
