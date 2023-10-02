require("dotenv").config();
// if(process.env.PostgressqlURI) mongoose.connect(process.env.PostgressqlURI)

const { Client } = require("pg");
const client = new Client({
  port: process.env.POSTGRES_PORT, // Postgres server port[s]
  database: process.env.POSTGRES_DB, // Name of database to connect to
  user: process.env.POSTGRES_USER, // Username of database user
  password: process.env.POSTGRES_PASSWORD, // Password of database user
  host: process.env.POSTGRES_HOST
});
const sqlConnect = async () => {
  // client.connect()
  //   .then(() => {
  //     console.log("Connected to PostgreSQL");
  //   })
  //   .catch((err) => {
  //     console.error("Error connecting XXX to PostgreSQL:", err);
  //   });

  await client.connect();

  const res = await client.query("SELECT NOW();");
  console.log(res)
  await client.end();
};
// async function getUsersOver(age) {
//   const users = await sql`
//       select
//         name,
//         age
//       from users
//       where age > ${age}
//     `;
//   // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
//   return users;
// }

// async function insertUser({ name, age }) {
//   const users = await sql`
//       insert into users
//         (name, age)
//       values
//         (${name}, ${age})
//       returning name, age
//     `;
//   // users = Result [{ name: "Murray", age: 68 }]
//   return users;
// }

module.exports = { client, sqlConnect };
// export { insertUser, getUsersOver };
