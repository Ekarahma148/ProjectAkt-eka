// backend/models/taskModel.js
import pool from '../db/db.js';

export const createTask = async (title, description, status, projectId) => {
  const res = await pool.query(
    'INSERT INTO tasks (title, description, status, project_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, status, projectId]
  );
  return res.rows[0];
};

export const getTasksByProject = async (projectId) => {
  const res = await pool.query(
    'SELECT * FROM tasks WHERE project_id = $1 ORDER BY id DESC',
    [projectId]
  );
  return res.rows;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await pool.query(
    'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    [status, taskId]
  );
  return res.rows[0];
};

export const deleteTask = async (taskId) => {
  const res = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [taskId]
  );
  return res.rows[0];
};
