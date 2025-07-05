import React, { useEffect, useState } from 'react';
import { getMySessions } from '../api/sessionService';
import { useAuth } from '../context/AuthContext';

export default function Sessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getMySessions();
        setSessions(data);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
        setError('Failed to load your sessions.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSessions();
    } else {
      setLoading(false);
      setError('Please log in to view your sessions.');
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading your sessions...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Upcoming Sessions</h1>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-600">You don't have any upcoming sessions.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map(session => (
            <li
              key={session._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <div className="font-semibold text-xl">{session.subject || 'No subject specified'}</div>
              <div className="text-gray-700">With: {session.tutorName}</div>
              <div className="text-gray-600">
                {session.date} at {session.time}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
