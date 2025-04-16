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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    }finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-50 p-6 flex justify-center">
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
  disabled={loading}
  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
>
  {loading && (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"></path>
    </svg>
  )}
  {loading ? "Menyimpan..." : "Simpan"}
</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
