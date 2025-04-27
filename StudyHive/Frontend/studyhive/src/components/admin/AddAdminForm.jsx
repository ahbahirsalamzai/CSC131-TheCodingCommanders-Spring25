import { useState } from "react";
import axios from "axios";

export default function AddAdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admins", { name, email });
      setName("");
      setEmail("");
      alert("Admin added!");
    } catch (err) {
      console.error("Failed to add admin", err);
      alert("Error: Could not add admin.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
      <p className="text-sm text-gray-500 mb-4">
        Grant administrative privileges to a user to help manage the website. Only authorized users can assign admin roles.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#2C5F3E] hover:bg-[#244F34] text-white px-6 py-2 rounded-md transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
