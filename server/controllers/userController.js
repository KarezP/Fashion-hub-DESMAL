import db from "../db.js";
import bcrypt from "bcryptjs";

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Password hashing failed." });

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already registered." });
        }
        return res.status(500).json({ error: "Database error." });
      }

      return res.status(201).json({ message: "User registered successfully!" });
    });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  });
};
