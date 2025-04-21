import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faDoorOpen,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const isTutor = location.pathname.includes("tutor");
  const isStudent = location.pathname.includes("student");
  const isAdmin = location.pathname.includes("admin");

  const dashboardLink = isTutor
    ? "/tutor-dashboard"
    : isStudent
    ? "/student-dashboard"
    : "/admin-dashboard";

  const scheduleLink = isTutor
    ? "/tutor-schedule-session"
    : "/schedule-session";

  return (
    <div className="w-64 min-h-screen bg-[#E3EAE0] mt-[180px] px-5 shadow-md flex flex-col justify-between">
      {/* Nav Section */}
      <div className="space-y-6">
        <nav className="flex flex-col gap-4">
          <Link
            to={dashboardLink}
            className={`flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-base ${
              isActive(dashboardLink)
                ? "bg-green-800 text-white"
                : "text-gray-500 hover:bg-[#1F4D39]"
            }`}
          >
            <FontAwesomeIcon icon={faDisplay} className="w-5 h-5" />
            Dashboard
          </Link>

          {(!isAdmin && (isTutor || isStudent)) && (
            <Link
              to={scheduleLink}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-base ${
                isActive(scheduleLink)
                  ? "bg-green-900 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={faCalendarDays} className="w-5 h-5" />
              Schedule Session
            </Link>
          )}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-3 pb-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 justify-start px-3 py-2 bg-white rounded-md text-gray-400 text-base font-normal hover:shadow-md"
        >
          <FontAwesomeIcon icon={faDoorOpen} className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
