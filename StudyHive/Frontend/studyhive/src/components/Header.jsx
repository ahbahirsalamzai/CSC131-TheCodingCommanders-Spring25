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
    <div className={`fixed w-full bg-black text-white text-sm py-2 px-4 flex justify-between items-center transition-all duration-300 z-[1000] ${
      isVisible ? "top-0" : "-top-9"
    }`}>
      <span>Email: studyhivehelpteam@gmail.com</span>
      <span>Contact: +1 (220) 215-0466</span>
    </div>
  );
};

export default Header;