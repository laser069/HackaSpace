import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import { createTeam, getTeamsForHackathon } from '../services/teamService';

const TeamManagement = () => {
  const { user } = useContext(AuthContext);
  const { hackathonId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeamsForHackathon(hackathonId);
      setTeams(data);
    };
    fetchTeams();
  }, [hackathonId]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam({ name: teamName, hackathonId }, user.token);
      setTeamName('');
      const data = await getTeamsForHackathon(hackathonId);
      setTeams(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Manage Teams for Hackathon</h2>
      <form onSubmit={handleCreateTeam} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Create Team</button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl">Your Teams:</h3>
        <ul className="list-disc ml-5 mt-2">
          {teams.map((team) => (
            <li key={team._id} className="mt-2">
              {team.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamManagement;
