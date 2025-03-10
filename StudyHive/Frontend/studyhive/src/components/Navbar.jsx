import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoR.png";
import Contact from "../pages/Contact";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white shadow-md w-full fixed top-[40px] z-50 transition-all ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-15" />
        <span className="font-bold text-lg ml-2">
            Study<span className="text-green-600">Hive</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">
            About Us
          </Link>
          <Link to="/faqs" className="text-gray-700 hover:text-green-600">
            FAQ's
          </Link>
          <Link to="/Contact" className="text-gray-700 hover:text-green-600">
            Contact Us
          </Link>
        </div>

        {/* Buttons */}
        <div className="space-x-4">
          <Link to="/signup" className="border px-4 py-2 rounded-lg">
            Sign Up
          </Link>
          <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
