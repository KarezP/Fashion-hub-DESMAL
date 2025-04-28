import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/items.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
