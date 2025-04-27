import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 📚 For STUDENTS → get all available sessions
export const getAllSessions = async () => {
  const res = await axios.get(`${API_URL}/sessions/availability`, {
    withCredentials: true,
  });

  const allSessions = res.data;

  return allSessions.map(session => ({
    _id: session._id,
    tutorName: session.tutorName,
    subject: session.subject,
    start: session.start,
    end: session.end,
    student: session.student,
  }));
};

// 🎯 For TUTORS → get sessions belonging to the logged-in tutor
export const getTutorSessions = async () => {
  const res = await axios.get(`${API_URL}/sessions/tutor`, {
    withCredentials: true,
  });

  const allSessions = res.data;

  // Only sessions that are booked
  const bookedSessions = allSessions.filter(session => session.student);

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
