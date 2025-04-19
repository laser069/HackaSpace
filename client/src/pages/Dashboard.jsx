// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold">Your Dashboard</h1>
      <p className="text-lg">Welcome to your personalized dashboard!</p>
      <div className="mt-6">
        <h2 className="text-2xl">Your Hackathons</h2>
        <ul className="mt-4">
          <li className="p-2 border rounded mb-2">
            <a href="/hackathons/1" className="text-blue-500">Hackathon 1</a>
          </li>
          <li className="p-2 border rounded mb-2">
            <a href="/hackathons/2" className="text-blue-500">Hackathon 2</a>
          </li>
          {/* Add more hackathons dynamically based on the user */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
