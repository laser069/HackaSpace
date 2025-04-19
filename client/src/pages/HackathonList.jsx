// src/pages/HackathonList.jsx
import React from "react";
import { Link } from "react-router-dom";

const HackathonList = () => {
  return (
    <div>
      <h1 className="text-3xl">Available Hackathons</h1>
      <ul className="mt-6 space-y-4">
        <li className="p-4 border rounded shadow">
          <Link to="/hackathons/1" className="text-xl text-blue-600">Hackathon 1</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <Link to="/hackathons/2" className="text-xl text-blue-600">Hackathon 2</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <Link to="/hackathons/3" className="text-xl text-blue-600">Hackathon 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default HackathonList;
