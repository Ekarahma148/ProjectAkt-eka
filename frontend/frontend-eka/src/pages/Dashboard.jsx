import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, {
          withCredentials: true,
        });
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error('Gagal ambil data transaksi:', err);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hitung total pakai useMemo biar optimal
  const income = useMemo(() =>
    transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0), [transactions]);

  const expense = useMemo(() =>
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0), [transactions]);

  const balance = useMemo(() => income - expense, [income, expense]);

  return (
    <>
      <Header />
     <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Dashboard</h1>
        {loading ? (
  <div className="flex justify-center items-center gap-2 text-blue-500">
    <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"></path>
    </svg>
    Memuat data...
  </div>
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center transition duration-700 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold">Pemasukan</h3>
            <p className="text-2xl mt-2">Rp {income.toLocaleString()}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center transition duration-700 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold">Pengeluaran</h3>
            <p className="text-2xl mt-2">Rp {expense.toLocaleString()}</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center transition duration-700 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold">Saldo</h3>
            <p className="text-2xl mt-2">Rp {balance.toLocaleString()}</p>
          </div>
        </div>
          )}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>📌 Data terakhir diperbarui: {new Date().toLocaleDateString()}</p>
            <p>📊 Total transaksi yang tercatat: {transactions.length} item</p>
            <p className="italic mt-2">"Kelola keuangan hari ini, nikmati kebebasan finansial di masa depan."</p>
          </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
