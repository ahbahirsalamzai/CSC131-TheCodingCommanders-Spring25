import React from "react";
import Sidebar from "../Sidebar";
import AdminNavbar from "../AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      {/* Admin Top Navbar */}
      <AdminNavbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-row">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content goes full width like homepage */}
        <main className="flex-1 bg-white p-6 space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
