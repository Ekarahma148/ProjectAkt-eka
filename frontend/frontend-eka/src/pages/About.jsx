import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
        <Header/> 
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-3xl font-bold text-blue-600">Tentang Aplikasi</div>

        <div className="text-lg text-gray-700">
          <span className="font-semibold text-blue-500">LedgerEase</span>  adalah aplikasi pencatatan transaksi berbasis web yang dirancang khusus untuk memudahkan pengguna dalam mengelola keuangan harian. Dengan aplikasi ini, pengguna dapat mencatat setiap pemasukan dan pengeluaran secara sistematis, cepat, dan akurat. 
          AkuntansiApp hadir sebagai solusi digital yang sederhana namun efektif bagi individu maupun pelaku usaha kecil yang ingin memiliki kontrol lebih baik terhadap kondisi keuangan mereka.
        </div>

        <div className="text-base text-gray-700">
        Aplikasi ini tidak hanya memungkinkan pengguna untuk menambahkan, mengedit, dan menghapus transaksi, tetapi juga dilengkapi dengan fitur tambahan seperti pencarian, filter berdasarkan tipe transaksi, pengurutan berdasarkan tanggal, serta sistem pagination yang memudahkan navigasi data dalam jumlah besar. Semua transaksi yang dicatat disimpan secara aman dan hanya dapat diakses
        oleh pengguna yang sudah terautentikasi melalui sistem login yang dilengkapi dengan enkripsi dan validasi token  
      </div>

        <div className="text-2xl font-semibold text-blue-500">Manfaat Aplikasi</div>

        <div className="text-gray-700 space-y-2">
          <div>• Membantu pencatatan keuangan harian secara aman dan rapi.</div>
          <div>• Memudahkan pengguna dalam memantau pemasukan dan pengeluaran.</div>
          <div>• Menyediakan data transaksi yang bisa diakses kapan saja.</div>
          <div>• Menjamin keamanan data dengan sistem autentikasi.</div>
          <div>• Cocok untuk kebutuhan pribadi atau usaha kecil.</div>
        </div>

        <div className="text-sm text-gray-500 pt-4">
          Dibuat oleh Eka Rahma sebagai proyek aplikasi akuntansi berbasis web untuk mendukung pemahaman akuntansi digital.
        </div>
      </div>
    </div>
      <Footer/>
      </>
  );
}
