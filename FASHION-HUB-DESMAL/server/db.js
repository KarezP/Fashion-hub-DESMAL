import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "164339Yaris%&",
  database: "fashion",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

export default db;
