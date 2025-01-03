import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// initialize database
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT!,
});

// check database connection
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));
