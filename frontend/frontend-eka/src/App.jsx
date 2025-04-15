import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TransactionList from './pages/TransactionList';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import NotFound from './pages/NotFound';
import About from './pages/About';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (error) {
        console.error('Authentication error:', error); // Menambahkan log error
        setError(error.response?.data?.message || 'Unknown error');
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div className="text-center p-4">Memuat...</div>;

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>; // Menampilkan error jika ada
  }

  return isAuth ? children : <Navigate to="/login" />;
};


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/add"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/edit/:id"
          element={
            <ProtectedRoute>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
