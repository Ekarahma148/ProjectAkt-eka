import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [gmail, setGmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        gmail,
        username,
        password
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Buat Akun</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{' '}
          <Link to="/" className="text-green-600 underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
