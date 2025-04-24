import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const CreateHackathon = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Check if token exists
      if (!token) {
        setError('You must be logged in to create a hackathon');
        return;
      }

      // Send a POST request to the backend to create a new hackathon
      const response = await axios.post(
        `${API_BASE_URL}/hackathons`, 
        { name, description, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to the hackathons page or dashboard
      navigate('/hackathons');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating hackathon');
    }
  };

  return (
    <div>
      <h2>Create a New Hackathon</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Hackathon Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Create Hackathon</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateHackathon;
