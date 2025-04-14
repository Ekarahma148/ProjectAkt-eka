import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Halaman tidak ditemukan</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
