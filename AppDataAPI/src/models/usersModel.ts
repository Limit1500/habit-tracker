import { pool } from "../config/database.js";
import { userData } from "../types/usersTypes.js";

const usersModel = {
  async getAllUsers() {
    try {
      const response = await pool.query(
        "SELECT users.username, users.email FROM users"
      );
      return response.rows;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(userId: number) {
    try {
      const response = await pool.query(
        "SELECT users.username, users.email FROM users WHERE id = $1",
        [userId]
      );
      return response.rows;
    } catch (error) {
      throw error;
    }
  },

  async deleteUserById(userId: number) {
    try {
      const response = await pool.query("DELETE FROM users WHERE id = $1", [
        userId,
      ]);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async postUser(userData: userData) {
    try {
      const checkQuery = await pool.query(
        "SELECT id FROM users WHERE username = $1 OR email = $2",
        [userData.username, userData.email]
      );
      if (checkQuery.rowCount !== 0) {
        return { rowCount: 0 };
      }

      const response = await pool.query(
        "INSERT INTO users ( username, email, password ) VALUES ( $1, $2, $3 )",
        [userData.username, userData.email, userData.password]
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async patchUser(userData: userData) {
    try {
      const response = await pool.query(
        "UPDATE users SET username = $1, password = $2 WHERE email = $3",
        [userData.username, userData.password, userData.email]
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersModel;