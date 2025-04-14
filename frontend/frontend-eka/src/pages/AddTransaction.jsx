import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AddTransaction() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !type || !date) {
      return setError('Semua field harus diisi!');
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        { description, amount, type, date },
        { withCredentials: true }
      );
      navigate('/transactions');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan transaksi');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-gray-50 p-6 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
          <h2 className="text-xl font-bold mb-6 text-center">Tambah Transaksi</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Deskripsi"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Jumlah"
              className="w-full p-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select
              className="w-full p-2 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Simpan Transaksi
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
