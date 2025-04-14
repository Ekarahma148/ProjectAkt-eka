import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Akuntansi<span className="text-gray-700">App</span>
      </h1>
      <nav className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
        <Link to="/transactions" className="text-gray-700 hover:text-blue-600 font-medium">Transaksi</Link>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline font-medium"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
