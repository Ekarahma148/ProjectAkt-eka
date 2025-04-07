import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ gmail: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/login`, form, {
        withCredentials: true,
      });
      navigate("/transaksi");
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:bg-gray-900 dark:text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 border rounded shadow dark:bg-gray-800"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={form.gmail}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
