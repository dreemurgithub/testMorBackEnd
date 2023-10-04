const URL_LIST = require("../../constants");
const authRoute = require("express")();
const { pool } = require("../../models/postgresJs/index");

authRoute.post(URL_LIST.login, async (req, res) => {
  const client = await pool.connect();
  const user = await pool.query(
    `select * from users where email= $1 and password= $2;`,
    [req.body.email, req.body.password]
  );
  if(user.rows.length){
      req.session.userId = user.rows[0].id;
      res.send(user.rows[0]);

  } else res.status(400).send({message: 'Bad Request'})
  client.release();
});

authRoute.delete(URL_LIST.logout, async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.send({ message: "Logout" });
});

module.exports = authRoute;