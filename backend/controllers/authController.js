import pool from '../db/db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { gmail, username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    await pool.query(
      'INSERT INTO users (gmail, username, password) VALUES ($1, $2, $3)',
      [gmail, username, hashedPassword]
    );
    res.status(201).json({ msg: 'Registrasi berhasil' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE gmail = $1', [gmail]);
    if (result.rows.length === 0) return res.status(404).json({ msg: 'User tidak ditemukan' });

    const user = result.rows[0];
    const match = await argon2.verify(user.password, password);
    if (!match) return res.status(400).json({ msg: 'Password salah' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 hari
    res.json({ msg: 'Login berhasil', username: user.username });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await pool.query('SELECT id, gmail, username FROM users WHERE id = $1', [req.userId]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout berhasil' });
};
