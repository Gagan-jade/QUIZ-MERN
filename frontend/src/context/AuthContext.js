import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const login = async (username, password) => {
    try {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        setUser(data.user);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return 1
    } catch (error) {
        console.error('Error during login:', error);
    }
};

  const register = async (username, password) => {
    try {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', { username, password });
        setUser(data.user);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return 1;
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
const testUpload = async (username, score, totalQuestions) => {
  try {
      const { data } = await axios.post('http://localhost:5000/api/auth/save', {username, score, totalQuestions });
      if (data.success) { 
          return 1;
      } else {
          console.error('Error response from server:', data.message);
          return 0; 
      }
  } catch (error) {
      console.error('Error during saving test results:', error);
      return 0; 
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, testUpload }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
