import React, { useState } from 'react';
import axios from 'axios';

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/user/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/requests/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Friend request sent!');
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
