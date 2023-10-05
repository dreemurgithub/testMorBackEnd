require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({}));
app.use(express.json());

const authMiddleware = require("./controller/authMiddleware");
const authRoute = require("./controller/auth/index");
const { pool } = require("./models/postgresJs/index");
const connectRoute = require("./controller/connect/index");
const commentRoute = require("./controller/comment/index");
const todoRoute = require("./controller/todo/index");
const usertRoute = require("./controller/user/index");

const expressSession = require("express-session");

app.use(
  expressSession({
    store: new (require("connect-pg-simple")(expressSession))({
      pool: pool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
    }),
    secret: "somesecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.ENVIROMENT === "DEV" ? "auto" : true,
      sameSite: process.env.ENVIROMENT === "DEV" ? "lax" : "none",
    }, // 30 days
    // for browser security requirement on https
  })
);
app.use(authMiddleware);
app.use(authRoute);
app.use(connectRoute);
app.use(commentRoute);
app.use(todoRoute);
app.use(usertRoute);
app.listen(process.env.Port, async () => {
  const client = await pool.connect();
  // user exist?
  const queryUserExist = `SELECT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'users'
  );`;

  const userExist = await pool.query(queryUserExist);

  const createTableQuery = `CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(50), email VARCHAR(100),password VARCHAR(100),created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP);`;
  if (!userExist.rows[0].exists) await pool.query(createTableQuery);
  // todo exist?
  const queryTodoExist = `SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'todo'
    );`;
  const todoExist = await pool.query(queryTodoExist);

  const createTodoQuery = `CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    status TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
    );`;
  if (!todoExist.rows[0].exists) await pool.query(createTodoQuery);

  // users_session exists?
  const querySession = `SELECT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE tablename = 'user_sessions'
        );`;

  const sessionExist = await pool.query(querySession);

  if (!sessionExist.rows[0].exists) {
    const createSessionTable = `CREATE TABLE user_sessions (sid varchar NOT NULL COLLATE "default",
     sess json NOT NULL, expire timestamp(6) NOT NULL );`;
    const addCCONSTRAINT = `ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_sid_unique UNIQUE (sid);`;
    //  error: there is no unique or exclusion constraint matching the ON CONFLICT specification => addCONSTRAINT fix this
    await pool.query(createSessionTable);
    await pool.query(addCCONSTRAINT);
  }

  // users_todo exist?

  const queryConnect = `SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE tablename = 'users_todo'
    );`;

  const connectExist = await pool.query(queryConnect);

  if (!connectExist.rows[0].exists) {
    const createUser_todoTable = `CREATE TABLE users_todo (
  user_id INTEGER,
  todo_id INTEGER,
  PRIMARY KEY (user_id, todo_id)
);`;
    await pool.query(createUser_todoTable);
  }

  const queryComment = `SELECT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE tablename = 'comment'
  );`;

  const commentExist = await pool.query(queryComment);

  if (!commentExist.rows[0].exists) {
    const createCommentTable = `CREATE TABLE comment (
      CommentId SERIAL PRIMARY KEY,
      title TEXT,
      body TEXT,
      todo_id INTEGER,
      author INTEGER,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`;
    await pool.query(createCommentTable);
  }

  client.release();

  console.log(`Server is running on port ${process.env.Port} - build1`);
});
