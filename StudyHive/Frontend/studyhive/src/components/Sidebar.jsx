import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faThLarge,
  faCalendarAlt,
  faSignOutAlt,
  faListAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('role') || 'student';
  const isTutor = location.pathname.includes("tutor");
  const isStudent = location.pathname.includes("student");
  const isAdmin = location.pathname.includes("admin");

  const navItems = [];

  if (!isAdmin) {
    navItems.push(
      {
        icon: faThLarge,
        path: isTutor ? "/tutor-dashboard" : isStudent ? "/student-dashboard" : "/",
        label: "Dashboard"
      },
      {
        icon: faCalendarAlt,
        path: isTutor ? "/tutor-schedule-session" : isStudent ? "/student-schedule-session" : "/schedule-session",
        label: "Schedule Session"
      }
    );
  }

  const adminPreviewLink = "/admin-preview";

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-[#E1EADF] min-h-screen shadow-md flex flex-col justify-between transition-all duration-300`}>
      <div>
        {/* Toggle + Logo */}
        <div className="relative">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-2 top-2 w-8 h-8 bg-[#1F4D39] text-white rounded-full shadow"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="text-3xl font-bold mb-10 pt-6 flex items-center justify-center">
            {!collapsed && (
              <>
                <span className="text-[#232323]" style={{ fontFamily: 'Montserrat' }}>Study</span>
                <span className="text-[#1F4D39]" style={{ fontFamily: 'Montserrat' }}>Hive</span>
              </>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 px-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors duration-200 ${isActive ? 'bg-[#1F4D39]' : 'bg-white'}`}
              >
                <FontAwesomeIcon icon={item.icon} className={`${isActive ? 'text-white' : 'text-[#697586]'} text-lg`} />
                {!collapsed && (
                  <span className={`text-[16px] font-[400] leading-6 ${isActive ? 'text-white' : 'text-[#697586]'}`} style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          {isAdmin && !collapsed && (
            <Link
              to={adminPreviewLink}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${location.pathname === adminPreviewLink ? 'bg-[#1F4D39] text-white' : 'bg-white text-[#697586] hover:bg-[#1F4D39]'}`}
            >
              <FontAwesomeIcon icon={faListAlt} className="text-lg" />
              <span className="text-[16px] font-[400] leading-6">Admin Preview</span>
            </Link>
          )}

          {/* Back Button */}
          {!collapsed && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white rounded-md flex items-center justify-center mx-auto"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-[#697586] text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-2 pb-4">
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="flex items-center gap-3 px-4 py-2 bg-white rounded-md w-full"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-[#9AA4B2] text-lg" />
          {!collapsed && (
            <span className="text-[#9AA4B2] text-[16px] font-[400] leading-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
