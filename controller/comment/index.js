const commentRoute = require("express")();
const URL_LIST = require("../../constants");
const {
  addComment,
  readCommentTodo,
  updateComment,
  readCommentUser
} = require("../../models/postgresJs");

commentRoute.get(URL_LIST.sqlQueryComment, async (req, res) => {
  const userId = req.session.userId;
  const commentList = await readCommentUser(userId);
  res.send(commentList);
});
commentRoute.get(`${URL_LIST.sqlQueryComment}/:todo_id`, async (req, res) => {
  const commentList = await readCommentTodo(req.params.todo_id);
  res.send(commentList);
});

commentRoute.post(URL_LIST.sqlQueryComment, async (req, res) => {
  const { title, body, todo_id } = req.body;
  const userId = req.session.userId;
  if (!title || !body || !todo_id)
    res.send(400).send({ message: "Bad Request" });
  const message = await addComment({ todo_id, userId, body, title });
  res.send(message);
});

// commentRoute.put(`${URL_LIST.sqlQueryComment}/:id`, async (req, res) => {
//   const id = req.params.id;
//   const { title, body,id } = req.body;
//   const newComment = await updateComment({ title, body, id });
//   res.send(newComment);
// });

commentRoute.delete(`${URL_LIST.sqlQueryComment}/:id`, async (req, res) => {
  res.send(`hello ${URL_LIST.sqlQueryComment}`);
});

// end sql
commentRoute.get(URL_LIST.typeOrmComment, async (req, res) => {
  res.send(`hello ${URL_LIST.typeOrmComment}`);
});

commentRoute.post(URL_LIST.typeOrmComment, async (req, res) => {
  res.send(`hello ${URL_LIST.typeOrmComment}`);
});

commentRoute.put(URL_LIST.typeOrmComment, async (req, res) => {
  res.send(`hello ${URL_LIST.typeOrmComment}`);
});

commentRoute.delete(URL_LIST.typeOrmComment, async (req, res) => {
  res.send(`hello ${URL_LIST.typeOrmComment}`);
});

module.exports = commentRoute;
