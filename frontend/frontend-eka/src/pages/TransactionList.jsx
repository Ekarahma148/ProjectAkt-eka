import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, {
        withCredentials: true,
        params: {
          search,
          type: filterType,
          sort: sortOrder,
          page,
          limit,
        },
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error('Gagal fetch transaksi:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [search, filterType, sortOrder, page]);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus transaksi ini?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
        withCredentials: true,
      });
      fetchTransactions();
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 bg-gray-50 min-h-[80vh]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold">Daftar Transaksi</h2>
            <Link to="/transactions/add" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              + Tambah Transaksi
            </Link>
          </div>

          {/* Filter dan Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Cari deskripsi..."
              className="w-full md:w-1/3 border p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="w-full md:w-1/4 border p-2 rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Semua Tipe</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
            <select
              className="w-full md:w-1/4 border p-2 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Terbaru</option>
              <option value="asc">Terlama</option>
            </select>
          </div>

          {/* Header "Tabel" */}
          <div className="hidden md:grid grid-cols-5 gap-4 font-semibold text-gray-600 bg-gray-100 p-3 rounded">
            <div>Tanggal</div>
            <div>Deskripsi</div>
            <div>Tipe</div>
            <div>Jumlah</div>
            <div className="text-center">Aksi</div>
          </div>

          {/* Daftar Transaksi */}
          <div className="space-y-2 mt-2">
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <div
                  key={t.id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 shadow-sm rounded border"
                >
                  <div>{new Date(t.date).toLocaleDateString()}</div>
                  <div>{t.description}</div>
                  <div className={t.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                  </div>
                  <div>Rp {parseFloat(t.amount).toLocaleString()}</div>
                  <div className="flex justify-start md:justify-center gap-2">
                    <Link
                      to={`/transactions/edit/${t.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-6">Tidak ada transaksi ditemukan.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-200"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              prev
            </button>
            <span className="px-4 py-2 font-medium text-gray-700">Halaman {page}</span>
            <button
              className="px-4 py-2 border rounded hover:bg-gray-200"
              onClick={() => setPage((prev) => prev + 1)}
            >
              next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
