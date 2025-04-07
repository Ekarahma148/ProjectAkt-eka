// models/userModel.js
import pool from "../db/db.js";

export const createUser = async (gmail, username, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (gmail, username, password) VALUES ($1, $2, $3) RETURNING *",
    [gmail, username, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByGmail = async (gmail) => {
  const result = await pool.query("SELECT * FROM users WHERE gmail = $1", [gmail]);
  return result.rows[0];
};
