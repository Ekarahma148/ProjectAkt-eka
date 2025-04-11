// backend/models/projectModel.js
import pool from '../db/db.js';

export const createProject = async (name, description, userId) => {
  const res = await pool.query(
    'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
    [name, description, userId]
  );
  return res.rows[0];
};

export const getProjectsByUser = async (userId) => {
  const res = await pool.query(
    'SELECT * FROM projects WHERE created_by = $1 ORDER BY id DESC',
    [userId]
  );
  return res.rows;
};

export const deleteProject = async (projectId, userId) => {
  const res = await pool.query(
    'DELETE FROM projects WHERE id = $1 AND created_by = $2 RETURNING *',
    [projectId, userId]
  );
  return res.rows[0];
};
