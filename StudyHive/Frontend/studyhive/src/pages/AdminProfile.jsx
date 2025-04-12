import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AdminLayout from "../components/layouts/AdminLayout";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/users/admin/profile");
      setAdmin((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        dob: data.dob ? data.dob.substring(0, 10) : "",
        phone: data.phone || "",
      }));
    } catch (err) {
      console.error("Failed to fetch admin info:", err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin.newPassword && admin.newPassword !== admin.confirmPassword) {
      return alert("❌ New and confirm passwords do not match!");
    }

    try {
      const { name, email, phone, dob, currentPassword, newPassword } = admin;

      const res = await axios.patch("http://localhost:3001/api/users/admin/profile", {
        name,
        email,
        phone,
        dob,
        currentPassword,
        newPassword,
      });

      alert("✅ " + res.data.message);
      setAdmin((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      console.error("Failed to update admin profile:", err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <AdminLayout>
      <div className="w-[1128px] mx-auto">
        {/* Header */}
        <div className="bg-white border rounded-xl p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-1">{admin.name || "Admin Name"}</h2>
          <p className="text-sm text-gray-500">{admin.email || "admin@email.com"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white border rounded-xl p-6 shadow">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Personal Info</h3>
            <p className="text-sm text-gray-500 mb-4">Update your photo and personal details.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={admin.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={admin.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="border border-gray-300 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button type="submit" className="bg-[#1F4D39] text-white px-6 py-2 rounded-md">
                Update
              </button>
            </div>
          </div>

          {/* Password Section (Current top, New + Confirm side-by-side) */}
          <div className="bg-white border rounded-xl p-6 shadow">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Password</h3>
            <p className="text-sm text-gray-500 mb-4">Update your password.</p>

            <div className="grid grid-cols-1 gap-4">
              {/* Current Password - full width */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={admin.currentPassword}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10"
                />
                <span
                  className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                  onClick={() => toggleVisibility("current")}
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* New + Confirm Password side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New Password */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={admin.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10"
                  />
                  <span
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                    onClick={() => toggleVisibility("new")}
                  >
                    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={admin.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10"
                  />
                  <span
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                    onClick={() => toggleVisibility("confirm")}
                  >
                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="border border-gray-300 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button type="submit" className="bg-[#1F4D39] text-white px-6 py-2 rounded-md">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
