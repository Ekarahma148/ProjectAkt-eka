// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="font-bold text-xl">AkuntansiApp</div>
      <div className="space-x-4">
        <Link to="/transaksi" className="hover:underline">
          Transaksi
        </Link>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
