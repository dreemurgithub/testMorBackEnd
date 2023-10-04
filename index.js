require("dotenv").config();
const express = require("express");
const app = express();
const { pool } = require("./models/postgresJs/index");
const connectRoute = require("./controller/connect/index");
const commentRoute = require("./controller/comment/index");
const todoRoute = require("./controller/todo/index");
const usertRoute = require("./controller/user/index");
app.use(express.json());
app.use(connectRoute);
app.use(commentRoute);
app.use(todoRoute);
app.use(usertRoute);
app.listen(process.env.Port, async () => {
  const client = await pool.connect();
  const query = `SELECT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'users'
  );`;

  const tableExist = await pool.query(query);
  const createTableQuery = `CREATE TABLE users (id SERIAL PRIMARY KEY,name VARCHAR(50), email VARCHAR(100),password VARCHAR(100));`;
  if (!tableExist.rows[0].exists) await pool.query(createTableQuery);
  client.release();

  console.log(`Server is running on port ${process.env.Port} - build1`);
});

app.get("/", async (req, res) => {
  const client = await pool.connect();
  const item = await pool.query(`select * from users;`);
  res.send(item.rows);
  client.release();
});

app.post("/", async (req, res) => {
  const client = await pool.connect();

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@gmail.com', '1234');`
  );
  const item2 = await pool.query(`select * from users;`);
  res.send(item2.rows);
  // await pool.end()
  client.release();
});

app.put("/", async (req, res) => {
  // await pool.connect()
  const client = await pool.connect();

  const item = await pool.query(`SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'users'
  );
  `);
  // item = await pool.query(`select now();`)
  res.send(item.rows);
  // await pool.end()
  client.release();
});
