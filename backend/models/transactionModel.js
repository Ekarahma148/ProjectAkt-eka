import pool from '../db/db.js';

export const createTransaction = async ({ description, amount, type, date, user_id }) => {
  const res = await pool.query(
    `INSERT INTO transactions (description, amount, type, date, user_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [description, amount, type, date, user_id]
  );
  return res.rows[0];
};

export async function getTransactions({ user_id, search, sort, type, page, limit }) {
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM transactions WHERE user_id = $1`;
  let params = [user_id];
  let paramIndex = 2;

  if (search) {
    query += ` AND description ILIKE $${paramIndex}`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (type) {
    query += ` AND type = $${paramIndex}`;
    params.push(type);
    paramIndex++;
  }

  query += ` ORDER BY date ${sort === 'asc' ? 'ASC' : 'DESC'} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit);
  params.push(offset);

  const result = await pool.query(query, params);
  return result.rows;
}



export const updateTransaction = async (id, user_id, data) => {
  const { description, amount, type, date } = data;
  const res = await pool.query(
    `UPDATE transactions SET description = $1, amount = $2, type = $3, date = $4
     WHERE id = $5 AND user_id = $6 RETURNING *`,
    [description, amount, type, date, id, user_id]
  );
  return res.rows[0];
};

export const deleteTransaction = async (id, user_id) => {
  const res = await pool.query(
    `DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, user_id]
  );
  return res.rows[0];
};

export const getTransactionById = async (id, user_id) => {
  const res = await pool.query(
    `SELECT * FROM transactions WHERE id = $1 AND user_id = $2`,
    [id, user_id]
  );
  return res.rows[0];
};
