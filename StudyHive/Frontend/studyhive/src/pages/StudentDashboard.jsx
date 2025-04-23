import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const StudentDashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions/availability');
        const bookedSessions = res.data.filter(session => session.bookedBy);
        const now = new Date();

        const upcoming = bookedSessions.filter(session => new Date(session.start) > now);
        const past = bookedSessions.filter(session => new Date(session.start) <= now);

        setUpcomingSessions(upcoming);
        setPastSessions(past);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <div className="w-64 mt-[-60px] ml-[-2%] bg-[#E3EAE0] shadow-md border-r hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-orange-50 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3.5 bg-white rounded-xl">
              <FontAwesomeIcon icon={faCalendarDays} className="text-orange-500 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">{upcomingSessions.length}</h2>
              <p className="text-gray-600 text-sm">Sessions Scheduled</p>
            </div>
          </div>

          <div className="bg-lime-50 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3.5 bg-white rounded-xl">
              <FontAwesomeIcon icon={faSquareCheck} className="text-lime-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">{pastSessions.length}</h2>
              <p className="text-gray-600 text-sm">Days Attended</p>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            <button
              onClick={() => console.log("View all sessions clicked")}
              className="text-green-700 font-semibold hover:underline"
            >
              View All Sessions
            </button>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Tutor - {session.tutorName}</h3>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full mt-1">
                      {session.subject || 'No subject provided'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(session.start).toLocaleDateString()} – {new Date(session.start).toLocaleTimeString()} - {new Date(session.end).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
          <div className="space-y-4">
            {pastSessions.map((session, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Tutor - {session.tutorName}</h3>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full mt-1">
                      {session.subject || 'No subject provided'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(session.start).toLocaleDateString()} – {new Date(session.start).toLocaleTimeString()} - {new Date(session.end).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
