# LEDGEREASE

LEDGEREASE adalah aplikasi pencatatan transaksi berbasis web yang membantu pengguna dalam mengelola keuangan harian secara lebih efisien. Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete), pencarian, filter berdasarkan tipe transaksi, sorting, dan pagination untuk memudahkan pengguna memantau pemasukan dan pengeluaran mereka.

## Deskripsi

Aplikasi ini dirancang untuk pengguna individu atau pelaku UMKM yang ingin mencatat transaksi keuangan harian mereka dengan praktis dan aman. Semua data transaksi hanya dapat diakses oleh pengguna yang sudah login melalui sistem autentikasi menggunakan token dan cookies. Pengguna dapat mencatat transaksi, melihat ringkasan pemasukan/pengeluaran, serta mengelola data keuangan mereka melalui dashboard yang bersih dan responsif.

## Fitur

- Autentikasi login dan register (JWT, cookies, hashing password)
- Dashboard keuangan (pemasukan, pengeluaran, saldo)
- CRUD transaksi:
  - Tambah transaksi
  - Edit transaksi
  - Hapus transaksi
- Search transaksi berdasarkan deskripsi
- Filter transaksi berdasarkan tipe (income/expense)
- Sort transaksi berdasarkan tanggal
- Pagination transaksi
- Desain antarmuka dengan Tailwind CSS
- Proteksi route dengan validasi token (ProtectedRoute)

## Diagram ER

![Diagram ER](./ERD.png)

Struktur tabel utama:

- `users`: id, gmail, username, password
- `transactions`: id, description, amount, type, date, user_id

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router DOM, Axios
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, cookie-parser, argon2
- **Deployment & Tools**: Vite, dotenv, GitHub

---

