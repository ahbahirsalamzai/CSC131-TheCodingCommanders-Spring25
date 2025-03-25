import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};
