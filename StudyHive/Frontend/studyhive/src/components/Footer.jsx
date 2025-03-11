import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        
        {/* Left Section - StudyHive Info */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold">Study<span className="text-[#1F4D39]">Hive</span></h2>
          <p className="mt-2 text-gray-400">Qualified and experienced educators dedicated to student success.</p>
          {/* Social Media Icons Placeholder */}
          <div className="mt-4 flex space-x-4 text-gray-500">
            <span>FB.</span>
            <span>TW.</span>
            <span>LN.</span>
            <span>IG</span>
          </div>
        </div>

        {/* Center Section - Company Links */}
        <div className="md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/services" className="hover:text-white">Our Services</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="mt-2 text-gray-400"><span className="font-semibold">PHONE :</span> (123) 456-7890</p>
          <p className="text-gray-400"><span className="font-semibold">Address:</span> 123 Learning Lane, Education City, EC 45678</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; All Rights Reserved StudyHive</p>
        <div className="space-x-4">
          <a href="/terms" className="hover:text-white">Terms & Conditions</a>
          <span>|</span>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

