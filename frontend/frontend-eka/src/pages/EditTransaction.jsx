import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    date: '',
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
          withCredentials: true,
        });
        const data = res.data;
        setForm({
          description: data.description,
          amount: data.amount,
          type: data.type,
          date: data.date.slice(0, 10), // format YYYY-MM-DD
        });
      } catch (err) {
        console.error('Gagal memuat data transaksi:', err);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/transactions/${id}`, form, {
        withCredentials: true,
      });
      alert("Transaksi berhasil diperbarui!")
      navigate('/transactions');
    } catch (err) {
      console.error('Gagal update transaksi:', err);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-50 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Transaksi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Deskripsi</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Jumlah</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tipe</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Tanggal</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate('/transactions')}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
