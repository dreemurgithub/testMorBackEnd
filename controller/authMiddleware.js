const URL_LIST = require("../constants");
const { readTodoFromUser, pool } = require("../models/postgresJs/index");
const urlKeys = Object.keys(URL_LIST);
const urlRoutes = urlKeys.map((el) => URL_LIST[el]);
const authMiddleware = async (req, res, next) => {
  // allow login and logout and create new user
  const autoPass =
    req.url === "/login" || req.url === "/logout" || req.url === "/register";
  const userId = req.session.userId;
  // allow POST and GET for authenticated user, new todo/comment are base on the userId on session
  if (autoPass || ((req.method === "GET" || req.method === "POST") && userId)) {
    next();
    return;
  }
  const { CommentId, todo_id, id } = req.body;

  if (CommentId && (req.method === "PUT" || req.method === "DELETE")) {
    const checkListObj = await checkAuthSession(userId, "comment");
    const checkList = [];
    checkListObj.forEach((el) => checkList.push(el.CommentId));
    if (checkList.includes(CommentId)) {
      next();
      return;
    }
  }
  if (todo_id && (req.method === "PUT" || req.method === "DELETE")) {
    const checkListObj = await checkAuthSession(userId, "todo");
    const checkList = [];
    checkListObj.forEach((el) => checkList.push(el.todo_id));
    if (checkList.includes(todo_id)) {
      next();
      return;
    }
  }
  if (id && (req.method === "PUT" || req.method === "DELETE")) {
    const checkListObj = await checkAuthSession(userId, "users");
    const checkList = [];
    checkListObj.forEach((el) => checkList.push(el.id));
    if (checkList.includes(id)) {
      next();
      return;
    }
  }
  res.status(401).send({ message: "Not Allowed" });
};

const checkAuthSession = async (userId, table) => {
  const client = await pool.connect();
  if (table === "users") {
    const userCheck = await pool.query(`select id from users where id = $1`, [
      userId,
    ]);
    client.release();
    const a = userCheck;
    return userCheck.rows;
  }
  if (table === "todo") {
    const userCheck = await pool.query(
      `select todo_id from users_todo where user_id = $1`,
      [userId]
    );
    client.release();
    return userCheck.rows;
  }
  if (table === "comment") {
    const userCheck = await pool.query(
      `select id from comment where author = $1`,
      [userId]
    );
    client.release();
    return userCheck.rows;
  }
};

module.exports = authMiddleware;
