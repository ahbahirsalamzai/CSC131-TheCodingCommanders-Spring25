import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faThLarge, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    { icon: faThLarge, path: '/dashboard', label: 'Dashboard' },
    { icon: faCalendarAlt, path: '/schedule-session', label: 'Schedule Session' }
  ];

  return (
    <div className="w-64 bg-[#E1EADF] min-h-screen shadow-md flex flex-col justify-between py-6 px-4">
      <div>
        {/* Logo */}
        <div className="text-3xl font-bold mb-10 flex items-center justify-center">
          <span className="text-[#232323]" style={{ fontFamily: 'Montserrat' }}>Study</span>
          <span className="text-[#1F4D39]" style={{ fontFamily: 'Montserrat' }}>Hive</span>
        </div>

        {/* Nav buttons */}
        <div className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 px-4 py-2 bg-white rounded-md text-left"
            >
              <FontAwesomeIcon icon={item.icon} className="text-[#697586] text-lg" />
              <span className="text-[#697586] text-[16px] font-[400] leading-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {item.label}
              </span>
            </button>
          ))}

          {/* Centered back arrow icon */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-md flex items-center justify-center mx-auto"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-[#697586] text-lg" />
          </button>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
        className="flex items-center gap-3 px-4 py-2 bg-white rounded-md"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="text-[#9AA4B2] text-lg" />
        <span className="text-[#9AA4B2] text-[16px] font-[400] leading-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Logout
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
