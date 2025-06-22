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
});

app.get(`/messages/:msgId`, async (req, res) => {
    const msgId = req.params.msgId;

    const result = await db.query(`SELECT * FROM messages WHERE msg_id = $1`, [msgId]);

    res.json(result.rows);
});

app.post("/messages", async (req, res) => {
    const body = req.body;

    const nameFromClient = body.senderName;
    const feedbackFromClient = body.feedback;
    const ratingFromClient = Number(body.rating);
    const postDate = FormatDateStringForServer(new Date());
    const initialLikes = 0;

    const data = await db.query(`INSERT INTO messages (content, sender, rating, date, likes) VALUES ($1, $2, $3, $4, $5)`, [feedbackFromClient, nameFromClient, ratingFromClient, postDate, initialLikes]);

    res.send(data);
});

app.put("/messages/:msgId", async (req, res) => {
    const body = req.body;

    let likes = Number(body.likes);
    likes++;
    const msgId = req.params.msgId;

    const data = await db.query(`UPDATE messages SET likes = $1 WHERE msg_id = $2`, [likes, msgId]);

    res.send(data);
});

app.delete("/messages/:msg_id", async (req, res) => {
    const msgId = req.params.msg_id;

    const data = await db.query(`DELETE FROM messages WHERE msg_id = $1`, [msgId]);

    res.send(data);
});

app.listen("4974", () => {
    console.log("Server running...");
});