require("dotenv").config();

const isLocalhost = process.env.ENVIROMENT === "DEV";

// if(process.env.PostgressqlURI) mongoose.connect(process.env.PostgressqlURI)
// somehow client work, not pool
const { Pool } = require("pg");

const pool = new Pool({
  port: process.env.POSTGRES_PORT, // Postgres server port[s]
  database: process.env.POSTGRES_DB, // Name of database to connect to
  user: process.env.POSTGRES_USER, // Username of database user
  password: process.env.POSTGRES_PASSWORD, // Password of database user
  host: isLocalhost ? process.env.POSTGRES_LOCAL : process.env.POSTGRES_HOST,
});

const connect = async () => {
  await client.connect();
  const query = `SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'users'
  );
  `;
  const tableExist = await client.query(query);

  // if (tableExist.rows[0].exists) {

  //   const insertTest = `INSERT INTO users (name, email, password)
  //   VALUES ('John Doe', 'john@gmail.com', '1234');
  //   `;
  //   console.log('old table')

  //   await client.query(insertTest);
  //   const result = await client.query(`select * from users;`);
  //   const a = 0;
  //   await client.end();
  // } else {
  //   const createTableQuery = `CREATE TABLE users (id SERIAL PRIMARY KEY,name VARCHAR(50), email VARCHAR(100),password VARCHAR(100));`;
  //   await client.query(createTableQuery);
  //   const insertTest = `INSERT INTO users (name, email, password)
  //   VALUES ('John Doe', 'john@gmail.com', '1234');
  //   `;
  //   await client.query(insertTest);
  //   const result = await client.query(`select * from users;`);
  //   const a = 0;
  //   console.log('new table')
  //   await client.end();
  // }

  const a = 0;

  await client.end();
};

const AllUser = async () => {
  const result = await client.query(`select * from users;`);
};

const createTable = async () => {};

module.exports = { connect, pool, AllUser };
