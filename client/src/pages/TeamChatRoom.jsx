import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamChatRooms = ({ teamId, onEnterRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chatrooms/team/${teamId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChatRooms(res.data);
      } catch (err) {
        console.error('Error fetching chatrooms:', err);
      }
    };

    if (teamId) fetchChatRooms();
  }, [teamId]);

  const handleCreateRoom = async () => {
    if (!newRoomName) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chatrooms',
        { name: newRoomName, teamId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChatRooms((prev) => [...prev, res.data]);
      setNewRoomName('');
    } catch (err) {
      console.error('Error creating chatroom:', err);
    }
  };

  return (
    <div>
      <h2>Team Chat Rooms</h2>

      <div>
        <input
          type="text"
          placeholder="New chat room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Create</button>
      </div>

      <ul>
        {chatRooms.map((room) => (
          <li key={room._id}>
            <button onClick={() => onEnterRoom(room._id)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamChatRooms;
