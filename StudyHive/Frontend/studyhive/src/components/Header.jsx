import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Get logged-in user info

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useAuth(); // Contains { email, role, id, ... }

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll <= lastScrollTop);
      lastScrollTop = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full bg-black text-white text-sm py-2 px-4 flex justify-between items-center transition-all duration-300 z-[1000] ${
        isVisible ? "top-0" : "-top-9"
      }`}
    >
      <span>
        {user?.email 
        ? `${user.email}` : "Email: info@domainname.com"}
      </span>
      <span>
        {user?.phone
          ? `Contact: ${user.phone}`
          : "Contact: +123 (456) 789"}
      </span>
    </div>
  );
};

export default Header;
