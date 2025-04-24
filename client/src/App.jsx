import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HackathonList from "./pages/HackathonList";
import HackathonDetails from "./pages/HackathonDetails";
import TeamPage from "./pages/TeamPage";
import CreateHackathon from "./pages/CreateHackathon";
import NotFound from "./pages/NotFound";
import GlobalChat from "./pages/GlobalChat";
import Notifications from "./pages/Notifications";
import AuthContext from './context/authContext';  // Import your AuthContext
import FriendSearch from './pages/FriendSearch';
import "./App.css";

const App = () => {
  const [dark, setDark] = useState(false);
  const { user, loading } = useContext(AuthContext);  // Access user from context

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // If the user is loading, we show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
      <Navbar setDark={setDark} dark={dark} />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home setDark={setDark} dark={dark} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hackathons" element={<HackathonList />} />
          <Route path="/hackathons/:id" element={<HackathonDetails />} />
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create-hackathon" element={<CreateHackathon />} />
          <Route path="/friends/search" element={<FriendSearch />} />
          
          {/* Global Chat Route */}
          <Route 
            path="/chat" 
            element={user ? <GlobalChat user={user} /> : <div>Please log in to access the chat.</div>} 
          />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
