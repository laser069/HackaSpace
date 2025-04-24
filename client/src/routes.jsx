import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateHackathon from './pages/CreateHackathon';
import TeamManagement from './pages/TeamManagement';
import GlobalChat from './pages/GlobalChat';
import { AuthProvider } from './context/authContext';
import { SocketProvider } from './context/SocketContext';

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hackathon/create" element={<CreateHackathon />} />
          <Route path="/hackathon/:hackathonId/teams" element={<TeamManagement />} />
          <Route path="/chat/global" element={<GlobalChat />} />
        </Routes>
      </Router>
    </SocketProvider>
  </AuthProvider>
);

export default App;
