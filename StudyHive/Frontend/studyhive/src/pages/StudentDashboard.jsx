import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions/availability');
        const fullName = `${user.firstName} ${user.lastName}`;
        const userSessions = res.data.filter(session => session.bookedBy === fullName);
        const now = new Date();

        const upcoming = userSessions.filter(session => new Date(session.start) > now);
        const past = userSessions.filter(session => new Date(session.start) <= now);

        setUpcomingSessions(upcoming);
        setPastSessions(past);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      }
    };

    if (user) fetchSessions();
  }, [user]);

  const openModal = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
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

        {/* Upcoming Sessions Section */}
        <SessionSection
          title="Upcoming Sessions"
          sessions={upcomingSessions}
          showAll={showAllUpcoming}
          setShowAll={setShowAllUpcoming}
          onDetailClick={openModal}
        />

        {/* Past Sessions Section */}
        <SessionSection
          title="Past Sessions"
          sessions={pastSessions}
          showAll={showAllPast}
          setShowAll={setShowAllPast}
          onDetailClick={openModal}
        />
      </div>

      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Session Details</h2>
            <div className="text-sm space-y-2 text-gray-700">
              <p><strong>Tutor:</strong> {selectedSession.tutorName || "TBD"}</p>
              <p><strong>Subject:</strong> {selectedSession.subject || "No subject"}</p>
              <p><strong>Date:</strong> {new Date(selectedSession.start).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(selectedSession.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedSession.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SessionSection = ({ title, sessions, showAll, setShowAll, onDetailClick }) => (
  <div className="bg-white rounded-xl shadow-md p-5 mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-sm text-green-800 font-medium hover:underline"
      >
        {showAll ? 'Show Less' : 'View All'}
      </button>
    </div>
    <div className="divide-y divide-slate-200">
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-sm">No sessions to show.</p>
      ) : (
        (showAll ? sessions : sessions.slice(0, 3)).map(session => (
          <div
            key={session._id}
            className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 transition hover:bg-slate-50 rounded-lg px-2"
          >
            <div>
              <div className="text-base font-semibold text-gray-800">
                Tutor: {session.tutorName || 'TBD'}
              </div>
              <div className="text-xs text-gray-600">{session.subject || 'No subject'}</div>
            </div>
            <div className="text-sm text-gray-700">
              {new Date(session.start).toLocaleDateString()} – {new Date(session.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button
              className="w-full sm:w-auto px-4 py-2 text-sm border border-green-900 text-green-900 rounded-md hover:bg-green-50 transition"
              onClick={() => onDetailClick(session)}
            >
              Detail
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default StudentDashboard;
