import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hackathons");
        setHackathons(res.data);
      } catch (err) {
        console.error("Failed to fetch hackathons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) return <p>Loading hackathons...</p>;

  return (
    <div>
      <h1 className="text-3xl mb-4">Available Hackathons</h1>
      {hackathons.length === 0 ? (
        <p>No hackathons available.</p>
      ) : (
        <ul className="space-y-4">
          {hackathons.map((hackathon) => (
            <li key={hackathon._id} className="p-4 border rounded shadow">
              <Link to={`/hackathons/${hackathon._id}`} className="text-xl text-blue-600">
                {hackathon.name}
              </Link>
              <p className="text-sm text-gray-600">{hackathon.description}</p>
              <p className="text-sm text-gray-400">
                {new Date(hackathon.startDate).toLocaleDateString()} →{" "}
                {new Date(hackathon.endDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackathonList;
