import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token as Authorization header
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
