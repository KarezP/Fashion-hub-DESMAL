import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config(); 

const db = mysql.createConnection(process.env.DATABASE_URL); // Use env var set in Railway or locally

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

export default db;
