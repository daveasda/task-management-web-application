import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import db from "./config/db.js";
import accountRoutes from "./routes/account.js";

dotenv.config();



const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Your React app's URL
  credentials: true
}));
const port=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/account", accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

