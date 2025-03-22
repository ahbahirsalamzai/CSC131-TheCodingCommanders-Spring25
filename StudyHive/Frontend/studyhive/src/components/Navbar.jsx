import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoR.png";

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

const navLinks = [
  { href: "/#home", label: "Home", targetId: "home" },
  { href: "/#about-us", label: "About Us", targetId: "about" },
  { href: "/#faq", label: "FAQs", targetId: "faq" },
  { href: "/#footer", label: "Contact Us", targetId: "footer" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isHeaderVisible = currentScroll <= lastScrollTop;
      setHeaderVisible(isHeaderVisible);
      setIsScrolled(currentScroll > 50);
      lastScrollTop = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/");
    setTimeout(() => scrollToSection("home"), 100);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`bg-white w-full fixed ${
        headerVisible ? "top-9" : "top-0"
      } z-[999] transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center cursor-pointer group"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-15 ml-2 transition-transform duration-300 transform group-hover:rotate-12"
            />
            <span className="font-bold text-4xl ml-2 transition-all duration-300 transform group-hover:scale-105">
              Study<span className="text-[#1F4D39]">Hive</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100 scale-100">
          {navLinks.map((link, index) => (
            <a
              key={index}
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
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex space-x-4 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100 scale-100">
          <Link
            to="/signup"
            className="border px-4 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-[#1F4D39] text-white px-4 py-2 rounded-lg hover:bg-[#17382a] transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Hamburger Button */}
        <div
          className={`lg:hidden z-[999] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-100"
          }`}
        >
          <button onClick={toggleMenu} className="relative w-8 h-8 focus:outline-none">
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] transform transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isMenuOpen ? "rotate-45 top-3.5" : "top-2"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isMenuOpen ? "opacity-0 top-3.5" : "top-3.5"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-8 bg-[#1F4D39] transform transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isMenuOpen ? "-rotate-45 bottom-3.5" : "bottom-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md flex flex-col items-center justify-center space-y-6 z-[998] transform transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") navigate("/");
              setTimeout(() => scrollToSection(link.targetId), 100);
              setIsMenuOpen(false);
            }}
            className="text-2xl font-medium hover:text-[#1F4D39] transition-transform duration-300 transform hover:scale-105"
          >
            {link.label}
          </a>
        ))}

        <Link
          to="/signup"
          className="border px-6 py-2 rounded-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-[#1F4D39] text-white px-6 py-2 rounded-lg hover:bg-[#17382a]"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
