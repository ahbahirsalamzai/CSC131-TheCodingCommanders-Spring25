import { useState, useEffect } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

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
    <div className={`bg-black text-white text-sm py-2 px-4 flex justify-between items-center transition-all duration-300 ${isVisible ? "block" : "hidden"}`}>
      <span>Email: info@domainname.com</span>
      <span>Contact: +123 (456) 789</span>
    </div>
  );
};

export default Header;