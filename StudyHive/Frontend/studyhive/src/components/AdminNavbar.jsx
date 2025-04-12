import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoR.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Top black bar */}
      <div className="w-full bg-black text-white flex justify-between px-10 py-2 text-sm font-semibold">
        <span>Email: info@domainname.com</span>
        <span>Contact: +123 (456) 789</span>
      </div>

      {/* Main navbar */}
      <nav className="bg-white w-full border-b px-10 py-4 flex justify-between items-center shadow">
        {/* Logo */}
        <div className="flex items-center gap-2 -ml-6">
          <img
            src={logo}
            alt="StudyHive Logo"
            className="h-8 w-auto transition-transform duration-300 transform hover:rotate-12"
          />
          <h1 className="text-4xl font-bold ml-1 hover:scale-105 transition-transform duration-300">
            Study<span className="text-[#1F4D39]">Hive</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex gap-8 text-lg font-medium">
          <a href="/" className="hover:text-[#1F4D39] transition">Home</a>
          <a href="/about" className="hover:text-[#1F4D39] transition">About Us</a>
          <a href="/faq" className="hover:text-[#1F4D39] transition">FAQs</a>
          <a href="/contact" className="hover:text-[#1F4D39] transition">Contact Us</a>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#1F4D39] text-white px-4 py-2 rounded-md"
          >
            Profile ▾
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
