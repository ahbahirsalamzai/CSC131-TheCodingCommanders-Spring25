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
      <nav className="bg-white w-full border-b px-10 py-4 flex justify-between items-center shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="StudyHive Logo" className="h-8 w-auto" />
          <h1 className="text-[34px] font-extrabold">
            <span className="text-black">Study</span>
            <span className="text-[#1F4D39]">Hive</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex gap-8 text-[16px] font-medium">
          <a href="/" className="hover:text-[#1F4D39]">Home</a>
          <a href="/about" className="hover:text-[#1F4D39]">About Us</a>
          <a href="/faq" className="hover:text-[#1F4D39]">FAQs</a>
          <a href="/contact" className="hover:text-[#1F4D39]">Contact Us</a>
        </div>

        {/* Profile Button */}
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
