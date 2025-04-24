import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoomList = ({ user, socket }) => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    // Fetch existing chat rooms (if any)
    const fetchRooms = async () => {
      try {
        // Add your endpoint to get the chat rooms
        const response = await axios.get('/api/chat/rooms'); // Adjust this based on your API
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const createRoom = async () => {
    if (!roomName) return;

    try {
      const response = await axios.post('/api/chat/create', {
        roomName,
        creatorId: user._id, // Assuming you have user info in state
      });

      // Add the newly created room to the list of rooms
      setRooms([...rooms, response.data.chatRoom]);
      setRoomName('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const joinRoom = (roomId) => {
    socket.emit('joinRoom', roomId); // Emit a message to join the room
  };

  return (
    <div>
      <h3>Chat Rooms</h3>
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>

      <div>
        {rooms.map((room) => (
          <div key={room._id}>
            <span>{room.roomName}</span>
            <button onClick={() => joinRoom(room._id)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
