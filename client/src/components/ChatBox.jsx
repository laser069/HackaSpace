import { useState, useEffect, useContext, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import AuthContext from '../context/authContext';
import axios from 'axios';

const ChatBox = ({ roomId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/history/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history', error);
      }
    };

    fetchMessages();

    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { roomId, message: newMessage, user: user.username });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-60">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2">
            <span className="font-semibold">{msg.user}: </span>{msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <textarea
          className="w-full p-2 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
