import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
} from '../models/transactionModel.js';

export const addTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { description, amount, type, date } = req.body;

    if (!description || !amount || !type || !date)
      return res.status(400).json({ message: 'Lengkapi semua field!' });

    const transaction = await createTransaction({ description, amount, type, date, user_id });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan transaksi.' });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { search = '', sort = 'desc', type = '', page = 1, limit = 10 } = req.query;

    const transactions = await getTransactions({
      user_id,
      search,
      sort,
      type,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data transaksi.' });
  }
};
export const editTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const data = req.body;

    const existing = await getTransactionById(id, user_id);
    if (!existing) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

    const updated = await updateTransaction(id, user_id, data);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate transaksi' });
  }
};

export const removeTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const deleted = await deleteTransaction(id, user_id);
    if (!deleted) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

    res.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus transaksi' });
  }
};