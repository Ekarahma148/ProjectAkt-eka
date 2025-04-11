// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ gmail: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/auth/register`, form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:bg-gray-900 dark:text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm p-6 border rounded shadow dark:bg-gray-800"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login di sini
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
