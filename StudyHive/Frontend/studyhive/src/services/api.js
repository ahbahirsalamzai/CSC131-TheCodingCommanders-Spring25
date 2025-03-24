// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., http://localhost:3001/api
  withCredentials: true, // if you're using cookies/sessions
});

export default api;
