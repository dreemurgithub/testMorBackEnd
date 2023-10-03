require("dotenv").config();
const express = require("express");
const app = express();
const { connect, AllUser, pool } = require("./models/postgresJs/index");
app.use(express.json());

app.listen(process.env.Port, async () => {
  // await connect()
  const client = await pool.connect()
  const result = await pool.query(`select * from users;`);
  console.log(result.rows)
  client.release()

  console.log(`Server is running on port ${process.env.Port} - build1`);
});

app.get("/", async (req, res) => {
  // await pool.connect()
  const item = await pool.query(`select * from users;`);
  res.send(item.rows);
  // await pool.end()
});

app.post("/", async (req, res) => {
  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@gmail.com', '1234');`
  );
  const item2 = await pool.query(`select * from users;`);
  res.send(item2.rows);
  // await pool.end()
});

app.put("/", async (req, res) => {
  // await pool.connect()
  const item = await pool.query(`SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'users'
  );
  `);
  res.send(item.rows);
  // await pool.end()
});
