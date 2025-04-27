import { useEffect, useState } from "react";
import axios from "axios";

export default function UserTable() {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        const users = res.data.users;
        setStudents(users.filter((u) => u.role === "student"));
        setTutors(users.filter((u) => u.role === "tutor"));
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setTutors((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const tableClass = "w-full border-collapse text-sm text-left text-gray-700";
  const thClass = "px-4 py-3 bg-gray-100 font-semibold";
  const tdClass = "px-4 py-2 border-t";

  return (
    <div className="space-y-10">
      {/* STUDENT TABLE */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Student Name</h2>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Attendance Days</th>
              <th className={thClass}>Last Attended</th>
              <th className={thClass}>Creation Date</th>
              <th className={thClass}>Account Control</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className={tdClass}>{student.attendance || "-"}</td>
                <td className={tdClass}>{student.lastAttended || "-"}</td>
                <td className={tdClass}>{new Date(student.createdAt).toLocaleDateString()}</td>
                <td className={tdClass}>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TUTOR TABLE */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Tutor Name</h2>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Sessions Completed</th>
              <th className={thClass}>Last Session</th>
              <th className={thClass}>Creation Date</th>
              <th className={thClass}>Account Control</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id}>
                <td className={tdClass}>{tutor.sessions || "-"}</td>
                <td className={tdClass}>{tutor.lastSession || "-"}</td>
                <td className={tdClass}>{new Date(tutor.createdAt).toLocaleDateString()}</td>
                <td className={tdClass}>
                  <button
                    onClick={() => handleDelete(tutor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
