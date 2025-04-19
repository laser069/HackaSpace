// src/pages/HackathonDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const HackathonDetails = () => {
  const { id } = useParams(); // Get hackathon ID from URL

  return (
    <div>
      <h1 className="text-3xl font-semibold">Hackathon {id} Details</h1>
      <p className="mt-4">Details about Hackathon {id} will be displayed here.</p>
      {/* You can fetch hackathon data using the ID */}
      <div className="mt-6">
        <h2 className="text-2xl">Join a Team</h2>
        {/* Add team joining functionality */}
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Join Team</button>
      </div>
    </div>
  );
};

export default HackathonDetails;
