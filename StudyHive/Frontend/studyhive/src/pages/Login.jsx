import React from "react";
import union from "../assets/union.png";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section - Hidden on screens smaller than 1400px */}
        <div className="hidden xl:block w-[600px] h-[800px] mb-[100px] mt-10 overflow-hidden rounded-[31px] mr-12">
          <img
            className="w-full h-full object-cover"
            src={union}
            alt="Illustration for sign-in page"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[471px] mt-[-100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            Sign In
          </div>
          <div className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Email
              </label>
              <input
                type="email"
                placeholder="abc12@gmail.com"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Password
              </label>
              <input
                type="password"
                placeholder="*******"
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
              />
            </div>
            <div className="flex justify-between w-full">
              <label className="flex items-center text-black text-sm font-medium">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a
                href="/"
                className="text-[#1f1f1f] text-sm font-semibold"
              >
                Forgot Password?
              </a>
            </div>
            <button className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold">
              Sign In
            </button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">
              Don’t have an account?
            </span>
            <a
              href="/"
              className="text-[#1f4d39] text-base font-bold ml-2"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
