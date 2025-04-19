import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
          });
          
          // If login is successful, save the token in localStorage and redirect
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard'); // Redirect to dashboard after login
        } catch (error) {
          setErrorMessage('Invalid credentials or server error');
        }
      };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mt-4 dark:bg-zinc-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



