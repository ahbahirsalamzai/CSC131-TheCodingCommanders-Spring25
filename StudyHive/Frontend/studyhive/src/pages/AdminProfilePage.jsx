import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


const AdminProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in personalInfo) {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else {
      setPasswordInfo({ ...passwordInfo, [name]: value });
    }
  };

  const handleSubmitPersonalInfo = () => {
    // Handle form submission for personal info (call backend API to save the data)
    console.log("Personal Info Submitted", personalInfo);
  };

  const handleSubmitPassword = () => {
    // Handle form submission for password (call backend API to save the data)
    console.log("Password Info Submitted", passwordInfo);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-10 py-8">
        <div className="space-y-6">
          {/* Personal Info Section */}
          <div className="bg-white border rounded-xl p-6 mb-6">
            {/* Title for Personal Info */}
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Personal Info</h2>
            <p className="text-sm text-gray-500 mb-4">Update your personal details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={personalInfo.name}
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
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Date of Birth</label>
                <input
                  type="text"
                  name="dob"
                  value={personalInfo.dob}
                  onChange={handleChange}
                  placeholder="January 1, 2000"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>
            </div>

            {/* Cancel and Update buttons for Personal Info */}
            <div className="flex gap-4 justify-end mt-4">
              <button
                onClick={() => setPersonalInfo({ name: "", email: "", phone: "", dob: "" })}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPersonalInfo}
                className="px-6 py-2 bg-green-700 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>

          {/* Password Update Section */}
          <div className="bg-white border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Password</h2>
            <p className="text-sm text-gray-500 mb-4">Update your password</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordInfo.currentPassword}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordInfo.confirmPassword}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
                />
              </div>
            </div>

            {/* Cancel and Submit buttons for Password */}
            <div className="flex gap-4 justify-end mt-4">
              <button
                onClick={() => setPasswordInfo({ currentPassword: "", newPassword: "", confirmPassword: "" })}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPassword}
                className="px-6 py-2 bg-green-700 text-white rounded-lg"
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
