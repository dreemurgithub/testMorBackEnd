require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const { Pool,Client } = require("pg");
const client = new Client({
  port: process.env.POSTGRES_PORT, // Postgres server port[s]
  database: process.env.POSTGRES_DB, // Name of database to connect to
  user: process.env.POSTGRES_USER, // Username of database user
  password: process.env.POSTGRES_PASSWORD, // Password of database user
  host: process.env.POSTGRES_HOST,
});
async function connect() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Perform your database operations here

    await client.end();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error.message);
  }
}



// const pool = new Pool({
//   port: process.env.POSTGRES_PORT, // Postgres server port[s]
//   database: process.env.POSTGRES_DB, // Name of database to connect to
//   user: process.env.POSTGRES_USER, // Username of database user
//   password: process.env.POSTGRES_PASSWORD, // Password of database user
//   host: process.env.POSTGRES_HOST,
// });




app.listen(process.env.Port, async() => {
  // console.log("Connection infors:", pool.options);
  // console.log("Connection Client:", client.options);
  console.log(`Server is running on port ${process.env.Port} - build1`);
  await connect()
});

app.get("/", (req, res) => {

  res.send(pool.options);
});