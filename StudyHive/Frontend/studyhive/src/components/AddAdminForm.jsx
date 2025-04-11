import React, { useState } from "react";
import axios from "axios";

const AddAdminForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("/api/users/admin", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        setSuccess("Admin added successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Email already exists.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="w-[1149px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-1">Add New Admin</h2>
      <p className="text-sm text-gray-500 mb-6">
        Grant administrative privileges to a user to help manage the website. Only authorized users can assign admin roles.
      </p>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="James"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc12@gmail.com"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-[#1F4D39] text-white rounded-md text-sm hover:opacity-90 transition"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
