import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';  // Make sure axios is installed

const GlobalChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch messages from the backend when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/global');
        setMessages(response.data);  // Store messages in state
        setLoading(false);  // Set loading to false after messages are loaded
      } catch (err) {
        console.error('Error fetching messages:', err);
        setLoading(false);
      }
    };

    fetchMessages();  // Call the function to fetch messages

    const newSocket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'), // Get token from localStorage
      },
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    newSocket.on('connect', () => {
      console.log('Connected to the socket server');
      newSocket.emit('joinRoom', 'global');  // Join global chat room
    });

    newSocket.on('receiveMessage', (messageData) => {
    

      setMessages((prevMessages) => [...prevMessages, messageData]);  // Add new messages to the state

    });
    

    setSocket(newSocket);  // Save the socket instance
    return () => {
      newSocket.disconnect();  // Clean up the socket when the component is unmounted
    };
  }, []);

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit('sendMessage', {
        roomId: 'global',
        message: message,
       
      });

      setMessage('');  // Clear the input field
    }
  };

  if (loading) return <p>Loading chat...</p>;

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default GlobalChat;
