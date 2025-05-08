import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (_, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM items WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Item not found" });
    res.json(results[0]);
  });
});

export default router;
