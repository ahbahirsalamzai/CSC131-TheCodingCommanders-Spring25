import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getTutorSessions } from '../api/SessionService'; // ✅ Use service function

const TutorDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getTutorSessions();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error.message);
      }
    };

    fetchSessions();
  }, []);

  const displayedSessions = showAll ? sessions : sessions.slice(0, 3);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 ml-[-2%] bg-[#E3EAE0] shadow-md border-r">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-8 mt-20 flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sessions Scheduled Card */}
            <div className="px-4 py-6 bg-orange-50 rounded-2xl flex items-center gap-4">
              <div className="p-3.5 bg-white rounded-xl">
                <div className="w-8 h-8 relative">
                  <img src="" alt="" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-semibold">{sessions.length}</div>
                <div className="text-sm text-gray-600">Sessions Scheduled</div>
              </div>
            </div>

            {/* Payroll Card */}
            <div className="px-4 py-6 bg-orange-50 rounded-2xl flex items-center gap-4">
              <div className="p-3.5 bg-white rounded-xl">
                <div className="w-6 h-6 relative">
                  <div className="w-5 h-5 absolute left-[2px] top-[2px] border-2 border-orange-500" />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div className="text-2xl font-semibold">Pay Roll</div>
                <div className="text-2xl font-extralight">$100,000</div>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions Section */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 text-green-900 font-semibold capitalize"
              >
                {showAll ? 'Hide Sessions' : 'View All Sessions'}
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="#14532D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="divide-y divide-slate-200">
              {displayedSessions.map((session) => (
                <div key={session._id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xl font-semibold text-gray-900">Student - {session.student}</div>
                      <div className="px-2 py-0.5 bg-indigo-50 rounded-2xl inline-flex mt-2">
                        <span className="text-indigo-700 text-xs font-medium">{session.subject}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-2 py-0.5 bg-slate-50 rounded-2xl">
                    <span className="text-gray-700 text-xs font-semibold">
                      {session.date} - {session.time}
                    </span>
                  </div>

                  <button className="h-10 px-6 border border-green-900 rounded-md text-green-900 font-semibold capitalize">
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
