import React from 'react';
import insta from "../assets/insta.png";
import face from "../assets/facebook.png";
import linked from "../assets/linkedin.png";
import x from "../assets/x.png";
// add in images for the socials icons



export default function Footer() {
  return (

    <footer id="footer" className="w-full bg-black text-white py-12">
    
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
  

          {/* Left Section - StudyHive Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-white">StudyHive</h2>
              <p className="mt-3.5 text-lg font-light">
                Qualified and experienced educators dedicated to student success.
              </p>
            </div>


                  {/* Clickables to socials */}
            <div className="flex gap-4 mt-2">
              <a href= "https://www.facebook.com" target="_black" rel="noopener noreferrer">
            <img src={face} alt="Facebook" className="h-6 w-6 hover:opacity-80" ></img>
              </a>


              <a href= "https://www.instagram.com" target="_black" rel="noopener noreferrer">
            <img src={insta} alt="Instagram" className="h-6 w-6 hover:opacity-80" ></img>
              </a> 


              <a href= "https://www.linkedin.com" target="_black" rel="noopener noreferrer">
            <img src={linked} alt="LinkedIn" className="h-6 w-6 hover:opacity-80" ></img>
              </a>
              <a href= "https://www.twitter.com" target="_black" rel="noopener noreferrer">
            <img src={x} alt="X" className="h-6 w-6 hover:opacity-80" ></img>
              </a>
            </div>
          </div>


          {/* Center Section - Company Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Company</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'About Us' },
                { label: 'Our Services' },
                { label: 'Contact' }
              ].map((item, index) => (
                <span key={index} className="text-lg font-light">
                  {item.label}
                </span>
              ))}
            </div>
          </div>


          {/* Right Section - Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-light">
                <span className="font-semibold">PHONE:</span> +1 (220) 215-0466
              </p>
              <p className="text-lg font-light">
                <span className="font-semibold">Email:</span> studyhivehelpteam@gmail.com
              </p>
              <p className="text-lg font-light">
                <span className="font-semibold">Address:</span> 6000 Jed Smith Dr, Sacramento, CA 95819
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