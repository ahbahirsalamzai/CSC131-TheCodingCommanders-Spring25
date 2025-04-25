import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function AdminLayout({ children }) {
  const admin = {
    name: "John Doe",
    email: "john@example.com"
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Admin Info Header */}
        <div className="flex justify-end items-center p-4 border-b bg-white shadow-sm mt-[64px]">
          <div className="text-right">
            <p className="font-semibold text-sm">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 space-y-10 bg-[#f9fafb] flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
