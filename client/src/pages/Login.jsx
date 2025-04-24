import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend API
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Assuming the response contains both the user data and token
      const { user, token } = res.data;

      // Store user and token in context and localStorage
      login(user, token);

      // Optionally, redirect to dashboard or another protected route
      window.location.href = '/dashboard'; // Or use react-router's useNavigate for navigation

    } catch (err) {
      // Handle error and display error message
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error in red */}
    </div>
  );
};

export default Login;
