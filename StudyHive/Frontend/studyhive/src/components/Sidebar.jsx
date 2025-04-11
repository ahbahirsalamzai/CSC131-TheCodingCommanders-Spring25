import React from "react";
import { LayoutDashboard } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-[264px] min-h-screen bg-[#DDE8DB] p-6 flex flex-col justify-between">
            <div>
                {/* StudyHive Logo with Figma style */}



                {/* Admin Overview Button with icon */}
                <button className="mt-8 w-full flex items-center gap-2 bg-[#294B3A] text-white py-3 px-4 rounded-lg hover:opacity-90 transition">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-base font-medium">Admin Overview</span>
                </button>
            </div>

            {/* Logout (bottom) */}
            <button className="bg-white rounded-md text-sm px-4 py-2 text-[#475467] border border-gray-300 hover:bg-gray-100 transition flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
