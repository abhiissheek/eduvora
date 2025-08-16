import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await axios.get('/api/auth/me');
          setCurrentUser(response.data.data);
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { data } = response.data;
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setCurrentUser(data);
      
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      const { data } = response.data;
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setCurrentUser(data);
      
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/api/auth/me', userData);
      const { data } = response.data;
      
      setCurrentUser(data);
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  };

  const value = {
    currentUser,
    token,
    register,
    login,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
