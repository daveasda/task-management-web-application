import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import db from "./config/db.js";
import accountRoutes from "./routes/account.js";
import taskRoutes from "./routes/task.js";

dotenv.config();



const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/account", accountRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

