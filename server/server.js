import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

import { FormatDateStringForServer } from "../client/src/string.js";

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

app.post("/messages", async (req, res) => {
    const body = req.body;

    const nameFromClient = body.sender;
    const feedbackFromClient = body.feedback;
    const ratingFromClient = Number(body.rating);
    const postDate = FormatDateStringForServer(new Date());
    const initialLikes = 0;

    const data = await db.query(`INSERT INTO messages (content, sender, rating, date, likes) VALUES ($1, $2, $3, $4, $5)`, [feedbackFromClient, nameFromClient, ratingFromClient, postDate, initialLikes]);

    res.send(data);
});

app.listen("4974", () => {
    console.log("Server running...");
});