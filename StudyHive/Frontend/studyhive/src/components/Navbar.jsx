import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoR.png";

// Function to handle smooth scrolling to sections
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // Scroll to the exact top of the section
    const offset = 80; // Adjust this value based on your navbar height
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

// Array of navigation links with styling and target IDs
const navLinks = [
  {
    href: "/#home",
    label: "Home",
    targetId: "home",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/#about-us",
    label: "About Us",
    targetId: "about",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/#faq",
    label: "FAQs",
    targetId: "faq",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
  {
    href: "/#footer",
    label: "Contact Us",
    targetId: "footer",
    className:
      "text-xl sm:text-lg hover:text-[#1F4D39] transition duration-300 transform hover:scale-110",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const location = useLocation(); // Get current route location
  const navigate = useNavigate(); // For programmatic navigation

  // Effect to handle scroll behavior
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

  // Function to handle Home link and logo click
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/"); // Navigate to the home page
    }
    setTimeout(() => {
      scrollToSection("home"); // Scroll to the home section
    }, 100); // Small delay to ensure the page has loaded
  };

  return (
    <nav
      className={`bg-white shadow-md w-full fixed ${
        headerVisible ? "top-9" : "top-0"
      } z-[999] transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo Section - Adjusted to move further left */}
        <div className="flex items-center -ml-8"> {/* Increased to -ml-8 */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center cursor-pointer"
          >
            <img src={logo} alt="Logo" className="h-8 w-15" />
            <span className="font-bold text-4xl ml-2">
              Study<span className="text-[#1F4D39]">Hive</span>
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={link.className}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  navigate("/"); // Navigate to the home page first
                }
                setTimeout(() => {
                  scrollToSection(link.targetId); // Scroll to the section
                }, 100); // Small delay to ensure the page has loaded
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;