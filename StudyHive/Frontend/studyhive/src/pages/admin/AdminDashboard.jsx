import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/students/active").then((res) => setStudents(res.data));
    axios.get("/api/tutors/active").then((res) => setTutors(res.data));
    axios.get("/api/tutors/pending").then((res) => setPendingTutors(res.data));
  }, []);

  const handleDelete = async (id, type) => {
    const endpoint = type === "student" ? `/api/students/${id}` : `/api/tutors/${id}`;
    await axios.delete(endpoint);
    if (type === "student") {
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } else {
      setTutors((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const handleDecision = async (id, decision) => {
    await axios.post(`/api/tutors/approval/${id}`, { decision });
    setPendingTutors((prev) => prev.filter((t) => t._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await axios.post("/api/auth/signup", {
        username: name,
        email,
        password: "admin1234",
        role: "admin",
      });
      setSuccess("New admin added! Ask them to check their email.");
      setName("");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin.");
    }
  };

  const tableStyle = "w-full text-left text-sm";
  const thStyle = "px-4 py-2 bg-gray-100";
  const tdStyle = "px-4 py-2 border-t";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow pt-28 px-6 space-y-12">
        {/* Student Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Students</h2>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Attendance</th>
                <th className={thStyle}>Last Attended</th>
                <th className={thStyle}>Created</th>
                <th className={thStyle}>Control</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td className={tdStyle}>{s.attendance}</td>
                  <td className={tdStyle}>{s.lastAttended}</td>
                  <td className={tdStyle}>{s.createdAt}</td>
                  <td className={tdStyle}>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      onClick={() => handleDelete(s._id, "student")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tutor Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Tutors</h2>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Sessions</th>
                <th className={thStyle}>Last Session</th>
                <th className={thStyle}>Created</th>
                <th className={thStyle}>Control</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((t) => (
                <tr key={t._id}>
                  <td className={tdStyle}>{t.sessions}</td>
                  <td className={tdStyle}>{t.lastSession}</td>
                  <td className={tdStyle}>{t.createdAt}</td>
                  <td className={tdStyle}>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      onClick={() => handleDelete(t._id, "tutor")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tutor Approval */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Tutor Approval</h2>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Name</th>
                <th className={thStyle}>Email</th>
                <th className={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTutors.map((t) => (
                <tr key={t._id}>
                  <td className={tdStyle}>{t.username}</td>
                  <td className={tdStyle}>{t.email}</td>
                  <td className={tdStyle}>
                    <button
                      onClick={() => handleDecision(t._id, "approved")}
                      className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(t._id, "declined")}
                      className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 ml-2"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Admin Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
          <p className="text-sm text-gray-500 mb-4">
            Grant admin privileges to a user. They'll receive OTP after signup.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Admin Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-[#1F4D39] hover:bg-[#163829] text-white text-sm px-5 py-1.5 rounded-md w-24"
            >
              Send
            </button>
          </form>
          {success && <p className="text-green-600 text-sm mt-4">{success}</p>}
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
