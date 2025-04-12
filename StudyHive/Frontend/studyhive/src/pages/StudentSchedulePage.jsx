// src/pages/StudentSchedulePage.jsx
import React from 'react';
import Sidebar from "../components/Sidebar";

const StudentSchedulePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">Schedule a Session</h1>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">johndoe@example.com</p>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full">
            <option>Choose Available Tutor ...</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full">
            <option>Choose your prefer subject ...</option>
          </select>
        </div>

        {/* Date & Time Availability */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-1">Date & Time Availability</h2>
          <p className="text-sm text-gray-500 mb-4">Select the day & time that a tutor is available</p>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
            {/* Calendar (placeholder) */}
            <div>
              <div className="grid grid-cols-7 text-center gap-2 text-sm font-medium text-gray-600 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm hover:bg-green-100 ${i === 12 ? 'bg-black text-white font-semibold' : 'bg-gray-100'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                '9:00 am to 10:00 am',
                '10:15 am to 11:15 am',
                '11:30 am to 12:30 pm',
                '12:45 pm to 1:45 pm',
                '05:00 pm to 06:00 pm',
                '06:15 pm to 07:15 pm',
                '07:30 pm to 08:30 pm',
                '08:45 am to 9:45 pm',
              ].map((time, idx) => (
                <button
                  key={idx}
                  className="px-3 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-50"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message + Submit */}
        <div className="bg-white border rounded-xl p-6">
          <label className="block mb-2 text-sm text-gray-700">Message</label>
          <textarea className="w-full border rounded-lg p-3 h-28 mb-4" placeholder="Enter message"></textarea>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedulePage;
