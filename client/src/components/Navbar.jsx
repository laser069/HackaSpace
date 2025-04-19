import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold hover:text-yellow-400">
          HackathonHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          {!token ? (
            <>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
              <Link to="/register" className="hover:text-yellow-400">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
              <Link to="/hackathons" className="hover:text-yellow-400">Hackathons</Link>
              <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          {!token ? (
            <>
              <Link to="/login" className="block hover:text-yellow-400">Login</Link>
              <Link to="/register" className="block hover:text-yellow-400">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block hover:text-yellow-400">Dashboard</Link>
              <Link to="/hackathons" className="block hover:text-yellow-400">Hackathons</Link>
              <Link to="/profile" className="block hover:text-yellow-400">Profile</Link>
              <button onClick={handleLogout} className="block hover:text-red-400">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
