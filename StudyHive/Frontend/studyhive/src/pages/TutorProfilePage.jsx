import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const TutorProfilePage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    subjects: [],
    newSubject: "",
    philosophy: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    api.get("/tutor/profile").then((res) => {
      const { name, email } = res.data;
      setFormData((prev) => ({ ...prev, name, email }));
    }).catch(() => {
      // Do nothing for now if error happens (e.g., backend not ready)
    });
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddSubject = () => {
    if (formData.newSubject && !formData.subjects.includes(formData.newSubject)) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, formData.newSubject],
        newSubject: ""
      });
    }
  };

  const handleRemoveSubject = (subject) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject)
    });
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 space-y-10">
        {location.pathname.includes("tutor-profile") && (
          <div className="bg-white shadow px-6 py-4 flex justify-between rounded-xl border border-slate-200 min-h-[80px]">
            <div className="text-left">
              <div className="text-sm font-semibold text-[#1F1F1F]">{formData.name || "Tutor Name"}</div>
              <div className="text-sm text-[#697586]">{formData.email || "Email Address"}</div>
            </div>
          </div>
        )}

        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Personal info</h2>
          <p className="text-sm text-gray-500 mb-4">Update your photo and personal details.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                placeholder="James Dupont"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button className="border border-[#1F4D39] text-[#1F4D39] px-6 py-2 rounded">Cancel</button>
            <button className="bg-[#1F4D39] text-white px-6 py-2 rounded">Update</button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Teaching Details</h2>
          <p className="text-sm text-gray-500 mb-4">Update your teaching details.</p>

          <div className="mb-4">
            <label className="block font-medium">Subjects Taught</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {formData.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#697586] rounded-full px-3 py-1 flex items-center gap-2"
                >
                  <span className="text-gray-800">{subject}</span>
                  <button onClick={() => handleRemoveSubject(subject)} className="text-sm">×</button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Biology, Algebra, etc."
              value={formData.newSubject}
              onChange={(e) => handleChange("newSubject", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSubject()}
              className="mt-2 p-2 border rounded w-full text-gray-800 placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Teaching Philosophy</label>
            <textarea
              placeholder="Share your teaching philosophy here..."
              value={formData.philosophy}
              onChange={(e) => handleChange("philosophy", e.target.value)}
              className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              rows="4"
            />
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button className="border border-[#1F4D39] text-[#1F4D39] px-6 py-2 rounded">Cancel</button>
            <button className="bg-[#1F4D39] text-white px-6 py-2 rounded">Update</button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Password</h2>
          <p className="text-sm text-gray-500 mb-4">Update Your Password.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="w-full mt-1 p-2 border rounded text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button className="border border-[#1F4D39] text-[#1F4D39] px-6 py-2 rounded">Cancel</button>
            <button className="bg-[#1F4D39] text-white px-6 py-2 rounded">Submit</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TutorProfilePage;
