import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.delete(`${import.meta.env.VITE_API}/logout`, {
      withCredentials: true,
    });
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="font-bold text-xl">AkuntansiApp</div>
      <div className="space-x-4">
        <Link to="/transaksi" className="hover:underline">
          Transaksi
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
