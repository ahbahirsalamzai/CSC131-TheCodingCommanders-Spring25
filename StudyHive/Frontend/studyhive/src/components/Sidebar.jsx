import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faSignOutAlt,
  faListAlt,  
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const location = useLocation();

  
  const isTutor = location.pathname.includes("tutor");
  const isStudent = location.pathname.includes("student");
  const isAdmin = location.pathname.includes("admin");

  
  const navItems = [];

  // Dashboard and Schedule Session for non-admins
  if (!isAdmin) {
    navItems.push(
      {
        icon: faListAlt,
        path: isTutor ? "/tutor-dashboard" : isStudent ? "/student-dashboard" : "/admin-dashboard",
        label: "Dashboard"
      },
      {
        icon: faCalendarAlt,
        path: isTutor ? "/tutor-schedule-session" : isStudent ? "/student-schedule-session" : "/schedule-session",  // Fixed the typo and updated path
        label: "Schedule Session"
      }
    );
  }

  // Admin Preview only for admins
  const adminPreviewLink = "/admin-preview";

  return (
    <div className="w-64 min-h-screen ml-[10%] mt-[40%] px-5 flex flex-col justify-between overflow-y-auto">
      <div className="space-y-6 flex-1">
        <nav className="flex flex-col gap-4">
          {/* Dashboard and Schedule links based on role */}
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors duration-200 ${
                  isActive ? "bg-[#1F4D39] text-white" : "bg-white text-[#697586] hover:bg-[#1F4D39]"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span className="text-[16px] font-[400] leading-6">{item.label}</span>
              </Link>
            );
          })}

          {/* Show Admin Preview link only for Admin */}
          {isAdmin && (
            <Link
              to={adminPreviewLink}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors duration-200 ${
                location.pathname === adminPreviewLink
                  ? "bg-[#1F4D39] text-white"
                  : "bg-white text-[#697586] hover:bg-[#1F4D39]"
              }`}
              style={{ marginTop: "20px" }} // Added margin to space it from other links
            >
              <FontAwesomeIcon icon={faListAlt} className="text-lg" />
              <span className="text-[16px] font-[400] leading-6">Admin Preview</span>
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