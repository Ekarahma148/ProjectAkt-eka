import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { gmail, password }, { withCredentials: true });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login Akun</h1>    
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-600 underline hover:text-blue-700">            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
