import React, { useState } from "react";
import axios from "axios";

const AddAdminForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return alert("❌ Please fill in all fields.");
    }

    try {
      const res = await axios.post("http://localhost:3001/api/users/admin", {
        username,
        email,
        password,
      });

      alert("✅ " + res.data.message);

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Failed to create admin:", err);
      alert("❌ Failed to create admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        className="bg-[#1F4D39] text-white px-6 py-2 rounded-md hover:bg-[#17382a]"
      >
        Create Admin
      </button>
    </form>
  );
};

export default AddAdminForm;
