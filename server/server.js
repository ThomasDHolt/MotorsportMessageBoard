import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
});

app.get("/", (req, res) => {
    res.json("On the root route");
});

app.get("/messages", async (req, res) => {
    const result = await db.query('SELECT * FROM messages');

    res.json(result.rows);
})

app.listen("4974", () => {
    console.log("Server running...");
});