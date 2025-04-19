// src/pages/TeamPage.jsx
import React from "react";

const TeamPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Your Team</h1>
      <p className="mt-4">You are a member of the following team:</p>
      <div className="mt-6 border p-4 rounded">
        <h2 className="text-xl">Team Alpha</h2>
        <ul>
          <li>John Doe (Team Lead)</li>
          <li>Jane Smith</li>
          <li>Mark Johnson</li>
        </ul>
      </div>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Create New Team</button>
    </div>
  );
};

export default TeamPage;
