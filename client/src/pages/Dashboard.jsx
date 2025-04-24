import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHackathons } from '../services/hackathonService'; // Assuming you have this service
import AuthContext from '../context/authContext'; // Importing AuthContext

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Accessing user and logout function from AuthContext
  const [hackathons, setHackathons] = useState([]); // State for storing hackathons data

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await getHackathons(); // Fetching hackathons data
        if (Array.isArray(data)) {
          setHackathons(data); // Only set if it's an array
        } else {
          console.error("Data is not an array:", data); // Log the error if data is not an array
        }
      } catch (error) {
        console.error("Error fetching hackathons", error); // Error handling
      }
    };
    fetchHackathons(); // Calling the function to fetch hackathons data
  }, []); // Empty dependency array means it runs only once when the component is mounted

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Navigation Bar */}


      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Display User Email */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome back, {user.username}!</h2>
          <p className="text-gray-600 text-lg">Your email: {user.email}</p>
        </div>

        {/* Hackathon List */}
        <h2 className="text-2xl font-semibold mb-4">Available Hackathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <div key={hackathon._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
                <h3 className="font-semibold text-lg">{hackathon.title}</h3>
                <p className="text-gray-700">{hackathon.description}</p>
                <Link 
                  to={`/hackathon/${hackathon._id}`} 
                  className="text-blue-500 hover:text-blue-700 mt-2 block"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No hackathons available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
