// src/App.jsx
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing React Router
import Navbar from "./components/Navbar"; // Importing Navbar component
import Home from "./pages/Home"; // Importing Home page
import Login from "./pages/Login"; // Importing Login page
import Register from "./pages/Register"; // Importing Register page
import Dashboard from "./pages/Dashboard"; // Importing Dashboard page
import HackathonList from "./pages/HackathonList"; // Importing HackathonList page
import HackathonDetails from "./pages/HackathonDetails"; // Importing HackathonDetails page
import TeamPage from "./pages/TeamPage"; // Importing TeamPage page
import CreateHackathon from "./pages/CreateHackathon"; // Importing CreateHackathon page
import NotFound from "./pages/NotFound"; // Importing NotFound page

const App = () => {
  const [dark, setDark] = useState(false);

  // Toggle Dark Mode on <html> tag
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
      <Navbar setDark={setDark} dark={dark} />

        <div className="p-6">
          <Routes>
            {/* Define the Routes for each page */}
            <Route path="/" element={<Home setDark={setDark} dark={dark} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hackathons" element={<HackathonList />} />
            <Route path="/hackathons/:id" element={<HackathonDetails />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/create-hackathon" element={<CreateHackathon />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
