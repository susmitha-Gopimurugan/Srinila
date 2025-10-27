import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7500/';

export const register = async (username, password) => {
  try {
    await axios.post(`${API_URL}register`, { username, password });
  } catch (err) {
    console.error('Error during registration:', err.response ? err.response.data : err.message);
    throw new Error('Registration Failed');
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    console.error('Error during login:', err.response ? err.response.data : err.message);
    throw new Error('Login Failed');
  }
};
