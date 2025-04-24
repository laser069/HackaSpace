import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (id, decision) => {
    await axios.patch(`http://localhost:5000/api/requests/${id}`, { status: decision });
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  return (
    <div>
      <h2>Join Requests</h2>
      {requests.map((req) => (
        <div key={req._id}>
          {req.userId.username} wants to join {req.teamId.name}
          <button onClick={() => handleResponse(req._id, 'accepted')}>Accept</button>
          <button onClick={() => handleResponse(req._id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
