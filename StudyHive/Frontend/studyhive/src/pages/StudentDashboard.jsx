// src/pages/StudentDashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const StudentDashboard = () => {
  const handleViewAllSessions = () => console.log("View all sessions clicked");
  const handleViewDetails = (studentName) => console.log(`View details for ${studentName}`);

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-orange-50 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3.5 bg-white rounded-xl">
              <FontAwesomeIcon icon={faCalendarDays} className="text-orange-500 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">3</h2>
              <p className="text-gray-600 text-sm">Sessions Scheduled</p>
            </div>
          </div>

          <div className="bg-lime-50 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3.5 bg-white rounded-xl">
              <FontAwesomeIcon icon={faSquareCheck} className="text-lime-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">12+</h2>
              <p className="text-gray-600 text-sm">Days Attended</p>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            <button
              onClick={handleViewAllSessions}
              className="text-green-700 font-semibold hover:underline"
            >
              View All Sessions
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: 'James Smith', subject: 'Math' },
              { name: 'Bill Nye', subject: 'Science' },
              { name: 'William Shakespeare', subject: 'English' },
            ].map((s, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Tutor - {s.name}</h3>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full mt-1">
                      {s.subject}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    March 10, 2025 – 4:00 PM - 5:00 PM
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(s.name)}
                  className="mt-2 text-green-700 text-sm font-semibold hover:underline"
                >
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
