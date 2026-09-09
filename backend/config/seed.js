import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const seed = async () => {
  try {
    await db.connect();
    console.log("Connected to database");

    // Read SQL file
    const seedQuery = fs.readFileSync("./config/admin.sql", { encoding: "utf-8" });

    // Generate random password and hash
    const psw = Math.random().toString(36).substring(2);
    const hash = bcrypt.hashSync(psw, 10);

    console.log("Running SQL seed...");

    // Run seed query with hashed password
    await db.query(seedQuery, [hash]);

    console.log("✓ SQL seed completed!");
    console.log("Initial admin password: " + psw);
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await db.end();  // ← Close connection when done
  }
};

seed();

