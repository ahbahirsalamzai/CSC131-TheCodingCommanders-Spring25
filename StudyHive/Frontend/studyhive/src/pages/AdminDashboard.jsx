// src/pages/AdminDashboard.jsx
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const tableStyle = "w-full text-left text-sm";
  const thStyle = "px-4 py-2 bg-gray-100";
  const tdStyle = "px-4 py-2 border-t";

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 px-10 py-8 space-y-12">
        {/* ✨ Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-xl font-semibold text-neutral-800">Manage Accounts</h1>
        </div>

        {/* Students */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Students</h2>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Name</th>
                <th className={thStyle}>Attendance</th>
                <th className={thStyle}>Last Attended</th>
                <th className={thStyle}>Created</th>
                <th className={thStyle}>Control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdStyle}>John Doe</td>
                <td className={tdStyle}>12</td>
                <td className={tdStyle}>04/01/2025</td>
                <td className={tdStyle}>01/15/2025</td>
                <td className={tdStyle}><button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tutors */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Tutors</h2>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Name</th>
                <th className={thStyle}>Sessions</th>
                <th className={thStyle}>Last Session</th>
                <th className={thStyle}>Joined</th>
                <th className={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdStyle}>Jane Smith</td>
                <td className={tdStyle}>8</td>
                <td className={tdStyle}>04/02/2025</td>
                <td className={tdStyle}>02/01/2025</td>
                <td className={tdStyle}><div className="flex space-x-2"><button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded">Approve</button><button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">Decline</button></div></td>
              </tr>
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
              <tr>
                <td className={tdStyle}>Pending Tutor</td>
                <td className={tdStyle}>pending@example.com</td>
                <td className={tdStyle}><button className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700">Approve</button><button className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 ml-2">Decline</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Admin */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
          <p className="text-sm text-gray-500 mb-4">Grant admin privileges to a user.</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border px-4 py-2 rounded" required />
            <input type="text" placeholder="Last Name" className="border px-4 py-2 rounded" required />
            <input type="email" placeholder="Admin Email" className="border px-4 py-2 rounded" required />
            <input type="text" placeholder="Username" className="border px-4 py-2 rounded" required />
            <input type="password" placeholder="Password" className="border px-4 py-2 rounded w-full" required />
            <input type="password" placeholder="Confirm Password" className="border px-4 py-2 rounded w-full" required />
            <button type="submit" className="bg-[#1F4D39] hover:bg-[#163829] text-white text-sm px-5 py-1.5 rounded-md w-24">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
