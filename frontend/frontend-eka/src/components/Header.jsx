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
    <header className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 shadow-md px-6 py-9 flex justify-between items-center text-white">
      <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">
        Ledger<span className="text-yellow-300">Ease</span>
      </h1>
      <div className="space-x-4 ">
      <Link
          to="/dashboard"
          className="hover:text-yellow-300 font-semibold transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="hover:text-yellow-300 font-semibold transition duration-300"
        >
          Transaksi
        </Link>
        <Link
          to="/about"
          className="hover:text-yellow-300 font-semibold transition duration-300"
        >
          About
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-red-500 text-white font-semibold transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
