import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamInviteButton = ({ teamId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all users (in real app, you'd use search or friends only)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.filter((u) => u._id !== JSON.parse(atob(token.split('.')[1])).id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const sendInvite = async () => {
    if (!selectedUserId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/invites/${teamId}`,
        { invitedUserId: selectedUserId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Invitation sent!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to send invite');
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
        <option value="">Select user to invite</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username} ({user.email})
          </option>
        ))}
      </select>
      <button onClick={sendInvite} style={{ marginLeft: '0.5rem' }}>
        Invite to Team
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeamInviteButton;
    