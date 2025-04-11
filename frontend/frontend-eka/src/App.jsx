// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API}/auth/check`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/logout`, {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/transaksi" /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={checkAuth} />} />
        <Route path="/transaksi" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
