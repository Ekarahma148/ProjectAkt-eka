import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, {
          withCredentials: true,
        });
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error('Gagal ambil data transaksi:', err);
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
      <main className="p-6 bg-gray-50 min-h-[80vh] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Ringkasan Transaksi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-gray-600 font-semibold">Pemasukan</h3>
            <p className="text-2xl text-green-600 font-bold">Rp {income.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-500">
            <h3 className="text-gray-600 font-semibold">Pengeluaran</h3>
            <p className="text-2xl text-red-600 font-bold">Rp {expense.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-gray-600 font-semibold">Sisa Saldo</h3>
            <p className="text-2xl text-blue-600 font-bold">Rp {balance.toLocaleString()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
