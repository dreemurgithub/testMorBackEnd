const URL_LIST = require("../constants");
const { readTodoFromUser, pool } = require("../models/postgresJs/index");
const urlKeys = Object.keys(URL_LIST);
const urlRoutes = urlKeys.map((el) => URL_LIST[el]);
const authMiddleware = async (req, res, next) => {
  // allow login and logout and create new user
  const autoPass =
    req.url === URL_LIST.login ||
    req.url === URL_LIST.logout ||
    req.url === URL_LIST.register ||
    req.url === `${URL_LIST.register}/orm`;
  const userId = req.session.userId;
  // allow POST and GET for authenticated user, new todo/comment are base on the userId on session
  if (autoPass || ((req.method === "GET" || req.method === "POST") && userId)) {
    next();
    return;
  }
  const { commentid, todo_id, id } = req.body;

  // put and delete only allow if user is in todo/is comment's author
  if (commentid && (req.method === "PUT" || req.method === "DELETE")) {
    const allowRoute = await checkAuthSession("comment", { userId, commentid, todo_id, id });
    if (allowRoute.includes(req.url)) {
      next();
      return;
    }
  }
  if (todo_id && (req.method === "PUT" || req.method === "DELETE")) {
    const allowRoute = await checkAuthSession("todo", { userId, commentid, todo_id, id });
    if (allowRoute.includes(req.url)) {
      next();
      return;
    }
  }
  if (id && (req.method === "PUT" || req.method === "DELETE")) {
    const allowRoute = await checkAuthSession("users", { userId, commentid, todo_id, id });
    if (allowRoute.includes(req.url)) {
      next();
      return;
    }
  }
  res.  status(401).send({ message: "Not Allowed" });
};

const checkAuthSession = async (table, { userId, commentid, todo_id, id }) => {
  if (table === "users") {
    if (id === userId)
      return [
        `${URL_LIST.sqlQueryUser}/delete`,
        URL_LIST.sqlQueryUser,
        `${URL_LIST.sqlQueryUser}/${id}`,
      ];
    else return [];
  }
  const client = await pool.connect();
  if (table === "todo") {
    const userCheck = await pool.query(
      `select todo_id from users_todo where user_id = $1`,
      [userId]
    );
    client.release();
    const todoArrId = [];
    userCheck.rows.forEach((row) => todoArrId.push(row.todo_id));
    if (todoArrId.includes(todo_id))
      return [`${URL_LIST.sqlQueryTodo}/delete`, URL_LIST.sqlQueryTodo];
    else return [];
  }
  if (table === "comment") {
    const commentAllow = await pool.query(
      `select * from comment where author = $1`,
      [userId]
    );
    client.release();
    if (commentAllow.rows[0].todo_id === todo_id && commentAllow.rows[0].author === userId)
      return [URL_LIST.sqlQueryComment];
    if (!todo_id && commentAllow.author === userId)
      return [`${URL_LIST.sqlQueryComment}/delete`];
    return [];
  }
  client.release();
  return [];
};

module.exports = authMiddleware;
