import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 📚 Get all sessions for tutors
export const getTutorSessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/sessions`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch sessions.';
    throw new Error(errorMessage);
  }
};
