import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoR.png";

// Array of navigation links with styling for each
const navLinks = [
  {
    href: "/#Home",
    label: "Home",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/#About Us",
    label: "About Us",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/#FAQs",
    label: "FAQs",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/Contact",
    label: "Contact Us",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isHeaderVisible = currentScroll <= lastScrollTop;
      
      // Update header visibility state
      setHeaderVisible(isHeaderVisible);
      
      // Update navbar shadow state
      setIsScrolled(currentScroll > 50);
      
      lastScrollTop = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white shadow-md w-full fixed ${
        headerVisible ? "top-9" : "top-0"
      } z-[999] transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-15" />
          <span className="font-bold text-4xl ml-2">
            Study<span className="text-[#1F4D39]">Hive</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.href} className={link.className}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="space-x-4">
          <Link to="/signup" className="border px-4 py-2 rounded-lg">
            Sign Up
          </Link>
          <Link to="/login" className="bg-[#1F4D39] text-white px-4 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;