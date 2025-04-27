import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faListAlt,
  faSignOutAlt, // <-- This was missing in one version!
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const location = useLocation();

  const isTutor = location.pathname.includes("tutor");
  const isStudent = location.pathname.includes("student");
  const isAdmin = location.pathname.includes("admin");

  const navItems = [];

  // Dashboard and Schedule Session links for tutors and students
  if (!isAdmin) {
    navItems.push(
      {
        icon: faListAlt,
        path: isTutor ? "/tutor-dashboard" : isStudent ? "/student-dashboard" : "/admin-dashboard",
        label: "Dashboard",
      },
      {
        icon: faCalendarAlt,
        path: isTutor
          ? "/tutor-schedule-session"
          : isStudent
          ? "/student-schedule-session"
          : "/schedule-session",
        label: "Schedule Session",
      }
    );
  }

  // Admin Preview (resolved conflict: use "/admin-preview")
  const adminPreviewLink = "/admin-preview";

  return (
    <div className="w-64 min-h-screen ml-[10%] mt-[40%] px-5 flex flex-col justify-between overflow-y-auto">
      <div className="space-y-6 flex-1">
        <nav className="flex flex-col gap-4">
          {/* Dashboard and Schedule links */}
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-all duration-200 transform ${
                  isActive
                    ? "bg-[#1F4D39] text-white"
                    : "text-[#1F4D39] hover:bg-[#D9F4E6] hover:scale-105 hover:font-semibold hover:shadow-md"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span className="text-[16px] font-[400] leading-6">{item.label}</span>
              </Link>
            );
          })}

          {/* Admin only preview */}
          {isAdmin && (
            <Link
              to={adminPreviewLink}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-all duration-200 transform ${
                location.pathname === adminPreviewLink
                  ? "bg-[#1F4D39] text-white"
                  : "text-[#1F4D39] hover:bg-[#D9F4E6] hover:scale-105 hover:font-semibold hover:shadow-md"
              }`}
              style={{ marginTop: "20px" }}
            >
              <FontAwesomeIcon icon={faListAlt} className="text-lg" />
              <span className="text-[16px] font-[400] leading-6">Admin Overview</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-2 pb-4">
        <Link
          to="/login"
          onClick={() => {
            localStorage.clear();
          }}
          className="w-full flex items-center gap-3 justify-start px-4 py-2 bg-white rounded-md text-[#9AA4B2] text-base font-normal hover:shadow-md"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          <span className="text-[16px] font-[400] leading-6">Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
