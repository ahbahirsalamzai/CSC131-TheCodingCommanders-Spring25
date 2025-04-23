import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getTutorSessions = async () => {
  const res = await axios.get(`${API_URL}/sessions/availability`);
  const allSessions = res.data;

  // Filter only booked sessions (assumes "student" is filled)
  const bookedSessions = allSessions.filter(session => session.student);

  // Format sessions to frontend-friendly format
  return bookedSessions.map(session => ({
    _id: session._id,
    student: session.student,
    subject: session.subject,
    date: new Date(session.start).toLocaleDateString(),
    time: new Date(session.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
};
