import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { createUser, findUserByGmail } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { gmail, username, password } = req.body;
    const existingUser = await findUserByGmail(gmail);
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar!' });

    const hashedPassword = await argon2.hash(password);
    const user = await createUser(gmail, username, hashedPassword);

    res.status(201).json({ message: 'Registrasi berhasil!', user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
  }
};

export const login = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const user = await findUserByGmail(gmail);
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan!' });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah!' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.json({ message: 'Login berhasil!', user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout berhasil' });
};
export const checkAuth = (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
};