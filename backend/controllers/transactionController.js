import pool from '../db/db.js';

export const getTransactions = async (req, res) => {
  const userId = req.userId;

  const {
    search = "",
    type = "all",
    sort = "date",
    order = "desc",
    page = 1,
  } = req.query;

  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    let baseQuery = `SELECT * FROM transactions WHERE user_id = $1`;
    const params = [userId];
    let countQuery = `SELECT COUNT(*) FROM transactions WHERE user_id = $1`;

    // Filter by type
    if (type !== "all") {
      params.push(type);
      baseQuery += ` AND type = $${params.length}`;
      countQuery += ` AND type = $${params.length}`;
    }

    // Search by description
    if (search) {
      params.push(`%${search}%`);
      baseQuery += ` AND description ILIKE $${params.length}`;
      countQuery += ` AND description ILIKE $${params.length}`;
    }

    // Sorting
    const validSort = ["amount", "date"];
    const validOrder = ["asc", "desc"];
    const sortBy = validSort.includes(sort) ? sort : "date";
    const sortDirection = validOrder.includes(order) ? order : "desc";
    baseQuery += ` ORDER BY ${sortBy} ${sortDirection}`;

    // Pagination
    params.push(limit, offset);
    baseQuery += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const data = await db.query(baseQuery, params);
    const countResult = await db.query(countQuery, params.slice(0, params.length - 2));
    const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

    res.json({
      data: data.rows,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ msg: 'Transaksi tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createTransaction = async (req, res) => {
  const { description, amount, type, date } = req.body;
  const userId = req.userId;
  try {
    await pool.query(
      'INSERT INTO transactions (description, amount, type, date, user_id) VALUES ($1, $2, $3, $4, $5)',
      [description, amount, type, date, userId]
    );
    res.status(201).json({ msg: 'Transaksi berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, amount, type, date } = req.body;
  const userId = req.userId;
  try {
    const result = await pool.query(
      'UPDATE transactions SET description=$1, amount=$2, type=$3, date=$4 WHERE id=$5 AND user_id=$6',
      [description, amount, type, date, id, userId]
    );
    if (result.rowCount === 0) return res.status(404).json({ msg: 'Transaksi tidak ditemukan' });
    res.json({ msg: 'Transaksi berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (result.rowCount === 0) return res.status(404).json({ msg: 'Transaksi tidak ditemukan' });
    res.json({ msg: 'Transaksi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
