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
  

  // if (tableExist.rows[0].exists) {

  //   const insertTest = `INSERT INTO users (name, email, password)
  //   VALUES ('John Doe', 'john@gmail.com', '1234');
  //   `;

  //   await client.query(insertTest);
  //   const result = await client.query(`select * from users;`);

  // } 

  const a = 0;
};



module.exports = { pool };
