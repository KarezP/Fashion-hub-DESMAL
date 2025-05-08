import db from "../db.js";

export const getAllItems = (req, res) => {
  const { category, search } = req.query;
  let query = "SELECT * FROM items";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  } else if (search) {
    query += " WHERE name LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(" Failed to fetch items:", err);
      return res.status(500).json({ error: "Failed to fetch items" });
    }

    res.json(results);
  });
};
