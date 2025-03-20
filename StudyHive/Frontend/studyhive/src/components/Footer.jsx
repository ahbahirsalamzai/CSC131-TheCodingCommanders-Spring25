import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {/* Left Section - StudyHive Info */}
          <div className="relative pl-2">
            <div className="absolute left-0 top-0 h-full w-px bg-white bg-opacity-10" />
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl font-semibold">Study<span className="text-[#1F4D39]">Hive</span></h2>
                <p className="mt-3.5 text-lg font-light">
                  Qualified and experienced educators dedicated to student success.
                </p>
              </div>
              <div className="flex gap-3.5 text-sm font-semibold text-gray-400">
                {['FB', 'TW', 'LN', 'IG'].map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Center Section - Company Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Company</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'About Us', target: '#about' },
                { label: 'Our Services', target: '#services' },
                { label: 'Contact', target: '#contact' }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.target}
                  className="text-lg font-light hover:text-[#1F4D39] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-light">
                <span className="font-semibold">PHONE:</span> (123) 456-7890
              </p>
              <p className="text-lg font-light">
                <span className="font-semibold">Address:</span> 123 Learning Lane, Education City, EC 45678
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-white border-opacity-10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm font-light">
            ©All Rights Reserved StudyHive
          </span>
          <div className="flex items-center gap-2 mt-2 md:mt-0 text-sm font-light">
            <span>Terms & Conditions</span>
            <div className="w-px h-3 bg-white" />
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}