import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = ({ socket, user, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    // Fetch messages for the selected room
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${roomId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for incoming messages in the room
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Emit the new message to the server
    socket.emit('sendMessage', {
      roomId,
      message: newMessage,
      user: user.username,
    });

    // Optionally, you can also post the message to the server
    axios
      .post(`/api/chat/${roomId}/messages`, {
        sender: user.username,
        message: newMessage,
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div>
      <h3>{roomName}</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.username}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
