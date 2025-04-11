// src/pages/ScheduleSession.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const ScheduleSession = () => {
  return (
    <div className="flex pt-20 min-h-screen bg-gray-50"> {/* <-- pt-20 pushes content below the navbar */}
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-xl border border-slate-200">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pick Up Availability</h2>
            <p className="text-gray-600">
              Select a date and time to schedule your session. Your availability will sync with Google Calendar.
            </p>
          </div>

          {/* Tutor Info */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-lg font-semibold">James Dupont</h3>
            <p className="text-sm text-gray-600 mt-1">
              James is experienced in helping students build strong math foundations. Select a time that works best.
            </p>
          </div>

          {/* Calendar + Time Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Date <FontAwesomeIcon icon={faCalendarDays} className="ml-2 text-green-700" />
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Time <FontAwesomeIcon icon={faClock} className="ml-2 text-green-700" />
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Choose a time slot</option>
                <option>9:00 AM – 10:00 AM</option>
                <option>10:15 AM – 11:15 AM</option>
                <option>1:00 PM – 2:00 PM</option>
                <option>3:30 PM – 4:30 PM</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-800">
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSession;