import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createHackathon = async (data, token) => {
  const response = await axios.post(
    `${API_URL}/hackathons`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getHackathons = async () => {
  const response = await axios.get(`http://localhost:5000/api/hackathons`);
  return response.data;
};
