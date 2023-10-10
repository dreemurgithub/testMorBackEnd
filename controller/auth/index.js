const URL_LIST = require("../../constants");
const authRoute = require("express")();
const { pool, addUser, signinUser } = require("../../models/postgresJs/index");

authRoute.post(URL_LIST.login, async (req, res) => {
  const { email, password } = req.body;
  const user = await signinUser({ email, password });
  if (user.length) {
    req.session.userId = user[0].id
    res.send(user);
  }
  else res.status(400).send({ message: "There is no user like this" });
});

authRoute.delete(URL_LIST.logout, async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.send({ message: "Logout" });
});

authRoute.post(URL_LIST.register, async (req, res) => {
  const userInfor = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  if (!userInfor.email || !userInfor.username || !userInfor.password) {
    res.status(400).send({ message: "Bad Request" });
    return;
  }
  const user = await addUser(userInfor);
  res.send(user);
});

module.exports = authRoute;
