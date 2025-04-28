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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPersonalInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const validatePhone = (phone) => /^[0-9-]+$/.test(phone);
  const validateDOB = (dob) =>
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/i.test(dob);
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

    if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = "Phone number must contain only digits and dashes.";
    }
    if (!validateDOB(personalInfo.dob)) {
      newErrors.dob = "Date of Birth must be like 'January 1, 2000'.";
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

    if (passwordInfo.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long.";
    }
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({ currentPassword: "Incorrect current password." });
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
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
                {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
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
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
              </div>
            </div>

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
                {errors.currentPassword && <span className="text-red-500 text-sm">{errors.currentPassword}</span>}
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
                {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword}</span>}
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
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
              </div>
            </div>

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
