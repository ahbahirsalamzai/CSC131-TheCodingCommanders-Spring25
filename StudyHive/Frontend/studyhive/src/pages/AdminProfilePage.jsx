import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

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

  useEffect(() => {
    // This effect can be used to fetch user data (personal information) if needed
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPersonalInfo(response.data);  // assuming the response structure matches
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in personalInfo) {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else {
      setPasswordInfo({ ...passwordInfo, [name]: value });
    }
  };

  const handleSubmitPersonalInfo = async () => {
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
    try {
      const response = await axios.put("/api/users/change-password", passwordInfo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      alert("Password Updated Successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password.");
    }
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

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
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Password</h3>
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
