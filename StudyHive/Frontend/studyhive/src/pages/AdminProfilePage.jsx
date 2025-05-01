import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const AdminProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
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
      console.log("🔑 Loaded token:", token); // 🔍 Check if token exists
  
      if (!token) {
        console.warn("⚠️ No token found in localStorage.");
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:3001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("✅ Fetched user info:", response.data); // 🔍 Log response
        setPersonalInfo(response.data);
      } catch (error) {
        console.error("❌ Error fetching user info:", error);
      }
    };
  
    fetchUserInfo();
  }, []);
  
  const validatePhone = (phone) => /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone);
  const validateDOB = (dob) => /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/.test(dob);
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

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    setPersonalInfo({ ...personalInfo, phone: value });
  };

  const handleDOBChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }
    setPersonalInfo({ ...personalInfo, dob: value });
  };

  const handleSubmitPersonalInfo = async () => {
    const newErrors = {};
    if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = "Phone number must be in the format xxx-xxx-xxxx.";
    }
    if (!validateDOB(personalInfo.dob)) {
      newErrors.dob = "Date of Birth must be in the format MM-DD-YYYY.";
    }
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
  
    // Inline validation hints
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
  
      // Show all returned field-level errors, fallback to general error
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
              {/* Username */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  name="username"
                  value={personalInfo.username || ""}
                  onChange={handleChange}
                  placeholder="Example Name"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email || ""}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              {/* DOB */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Date of Birth</label>
                <input
                  type="text"
                  name="dob"
                  value={personalInfo.dob || ""}
                  onChange={handleDOBChange}
                  placeholder="MM-DD-YYYY"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
                {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={personalInfo.phone || ""}
                  onChange={handlePhoneChange}
                  placeholder="xxx-xxx-xxxx"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-4">
              <button
                onClick={() => setPersonalInfo({ username: "", email: "", phone: "", dob: "" })}
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
              {/* Current Password */}
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
                    onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })}
                    className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                  >
                    {showPassword.currentPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.currentPassword && <span className="text-red-500 text-sm">{errors.currentPassword}</span>}
              </div>

              {/* New Password */}
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
                      onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                      className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                    >
                      {showPassword.newPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword}</span>}
                </div>

                {/* Confirm Password */}
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
                      onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                      className="absolute right-3 top-3 text-sm text-[#1F4D39] font-semibold"
                    >
                      {showPassword.confirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-4">
              <button
                onClick={() => setPasswordInfo({ currentPassword: "", newPassword: "", confirmPassword: "" })}
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