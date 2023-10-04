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

const readAllUser = async () => {
  const client = await pool.connect();
  const user = await pool.query(`select * from users;`);
  client.release();
  return user;
};

const readUser = async (id) => {
  const client = await pool.connect();
  const user = await pool.query(`select * from users where id=${id};`);
  client.release();
  return user;
};

const addUser = async ({ email, username, password }) => {
  const client = await pool.connect();
  const query = `INSERT INTO Users (username, email,  password) VALUES ($1,$2,$3);`;
  const values = [username,email, password]
  await pool.query(query,values);
  const user = { email: email, username: username };
  client.release();
  return user;
};

const updateUser = async ({ id,email, username, password }) => {
  const client = await pool.connect();
  const query = `UPDATE Users SET username = $1, email = $2, password = $3 WHERE id = $4`;
  const values = [username,email, password,id]
  await pool.query(query,values);
  const user = { email: email, username: username };

  client.release();
  return user;
};

const deleteUser = async (id) => {
  const client = await pool.connect();
  const query = `DELETE FROM Users WHERE id = $1`;
  const values = [id]
  try {
    await pool.query(query,values);
    const message = { message: 'successful delete' };
    client.release();
    return message
  } catch {
    const message = { message: 'bad request' };
    client.release();
    return message
  }

};

const readTodo = async (id) => {
  const client = await pool.connect();
  const todo = 1;
  client.release();
  return todo;
};

const addTodo = async (id) => {
  const client = await pool.connect();
  const todo = 1;
  client.release();
  return todo;
};

const updateTodo = async (id) => {
  const client = await pool.connect();
  const todo = 1;
  client.release();
  return todo;
};

const deleteTodo = async (id) => {
  const client = await pool.connect();
  const todo = 1;
  client.release();
  return todo;
};

const readComment = async (id) => {
  const client = await pool.connect();
  const comment = 1;
  client.release();
  return comment;
};

const addComment = async (id) => {
  const client = await pool.connect();
  const comment = 1;
  client.release();
  return comment;
};

const updateComment = async (id) => {
  const client = await pool.connect();
  const comment = 1;
  client.release();
  return comment;
};

const deleteComment = async (id) => {
  const client = await pool.connect();
  const comment = 1;
  client.release();
  return comment;
};

const readConnectTodo = async (id) => {
  const client = await pool.connect();
  const List = 1;
  client.release();
  return List;
};

const readConnectUser = async (id) => {
  const client = await pool.connect();
  const List = 1;
  client.release();
  return List;
};

const deleteConnect = async (id) => {
  const client = await pool.connect();
  const List = 1;
  client.release();
  return List;
};

module.exports = {
  pool,
  addComment,
  addTodo,
  addUser,
  deleteComment,
  deleteConnect,
  deleteTodo,
  deleteUser,
  readComment,
  readConnectTodo,
  readConnectUser,
  readTodo,
  readUser,
  updateComment,
  updateTodo,
  updateUser,
  readAllUser,
};
