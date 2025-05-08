import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { full_name, address, email, phone, items, total_price } = req.body;

  const sql = `
    INSERT INTO orders (full_name, address, email, phone, items, total_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    address,
    email,
    phone,
    JSON.stringify(items),
    total_price,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(" Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Order saved!" });
  });
});

export default router;
