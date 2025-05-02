import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoR.png";
import { useAuth } from "../context/AuthContext.js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/#home", label: "Home", targetId: "home" },
    { href: "/#about-us", label: "About Us", targetId: "about" },
    { href: "/#faq", label: "FAQs", targetId: "faq" },
    { href: "/#footer", label: "Contact Us", targetId: "footer" },
  ];

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHeaderVisible(currentScroll <= lastScrollTop);
      setIsScrolled(currentScroll > 50);
      lastScrollTop = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfileClick = () => {
    if (user?.role === "admin") navigate("/admin-profile");
    else navigate("/profile");
  };

  const handleDashboardClick = () => {
    if (user?.role === "student") {
      navigate("/student-dashboard");
    } else if (user?.role === "tutor") {
      navigate("/tutor-dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/profile");
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`bg-white w-full fixed ${
        headerVisible ? "top-9" : "top-0"
      } z-[999] transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center -ml-8">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-15 ml-5 transition-transform duration-300 transform group-hover:rotate-12"
            />
            <span className="font-bold text-4xl ml-2 transition-all duration-300 transform group-hover:scale-105">
              Study<span className="text-[#1F4D39]">Hive</span>
            </span>
          </Link>
        </div>

        {/* Middle Links */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") navigate("/");
                setTimeout(() => scrollToSection(link.targetId), 100);
              }}
              className="text-lg hover:text-[#1F4D39] transition duration-200"
            >
              {link.label}
            </a>
          ))}
          {user && location.pathname === "/" && (
            <button
              onClick={handleDashboardClick}
              className="text-lg hover:text-[#1F4D39] transition duration-200"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex lg:items-center space-x-4">
          {user ? (
            <>
              <div
                className="flex flex-col items-end text-black mr-4 cursor-pointer"
                onClick={handleProfileClick}
              >
                <span className="text-sm font-bold">{user.firstName} {user.lastName}</span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#1F4D39] text-white px-4 py-2 rounded-lg hover:bg-[#17382a] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-[#1F4D39] text-white px-4 py-2 rounded-lg hover:bg-[#17382a] transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden z-[999]">
          <button onClick={toggleMenu} className="relative w-8 h-8 focus:outline-none">
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] transform transition-all ${
                isMenuOpen ? "rotate-45 top-3.5" : "top-2"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] ${
                isMenuOpen ? "opacity-0 top-3.5" : "top-3.5"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] transform transition-all ${
                isMenuOpen ? "-rotate-45 bottom-3.5" : "bottom-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white py-6 space-y-4">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") navigate("/");
                setTimeout(() => scrollToSection(link.targetId), 100);
                setIsMenuOpen(false);
              }}
              className="text-xl font-medium hover:text-[#1F4D39]"
            >
              {link.label}
            </a>
          ))}
          {user && location.pathname === "/" && (
            <button
              onClick={() => {
                handleDashboardClick();
                setIsMenuOpen(false);
              }}
              className="text-xl font-medium hover:text-[#1F4D39]"
            >
              Dashboard
            </button>
          )}
          {user ? (
            <>
              <div
                className="flex flex-col items-center text-black cursor-pointer"
                onClick={() => {
                  handleProfileClick();
                  setIsMenuOpen(false);
                }}
              >
                <span className="font-bold text-lg">{user.firstName} {user.lastName}</span>
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-[#1F4D39] text-white px-6 py-2 rounded-lg hover:bg-[#17382a] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="border px-6 py-2 rounded-lg"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#1F4D39] text-white px-6 py-2 rounded-lg hover:bg-[#17382a] transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
