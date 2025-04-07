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
      await axios.get('http://localhost:5000/api/auth/check', { withCredentials: true });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
      {isAuthenticated && <Navbar onLogout={() => setIsAuthenticated(false)} />}
        <Route path="/" element={isAuthenticated ? <Navigate to="/transactions" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={checkAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/transaksi"
  element={
    <PrivateRoute>
      <TransactionPage />
    </PrivateRoute>
  }
/>
        <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
