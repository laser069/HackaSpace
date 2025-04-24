import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HackathonDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hackathons/${id}`);
        setHackathon(res.data);
      } catch (err) {
        setError("Failed to fetch hackathon details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;

    try {
      setCreating(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/chatrooms",
        {
          name: teamName,
          hackathon: hackathon._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg(`Team "${res.data.name}" created successfully!`);
      setTeamName("");
      setShowForm(false);
    } catch (err) {
      setCreateError("Failed to create team.");
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p>Loading hackathon details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!hackathon) return <p>Hackathon not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 p-6 rounded shadow">
      <h1 className="text-3xl font-bold">{hackathon.name}</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{hackathon.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        From: {new Date(hackathon.startDate).toLocaleDateString()} &nbsp;→&nbsp;
        To: {new Date(hackathon.endDate).toLocaleDateString()}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Join or Create a Team</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-3 mr-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {showForm ? "Cancel" : "Create Team"}
        </button>

        <button className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
          Join Team
        </button>

        {showForm && (
          <div className="mt-4">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleCreateTeam}
              disabled={creating}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {creating ? "Creating..." : "Submit"}
            </button>
            {createError && <p className="text-red-500 mt-2">{createError}</p>}
          </div>
        )}

        {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
      </div>
    </div>
  );
};

export default HackathonDetails;
