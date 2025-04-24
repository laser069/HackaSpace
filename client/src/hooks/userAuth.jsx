import { useContext } from 'react';
import AuthContext from '../context/authContext';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, login, logout };
};

export default useAuth;
