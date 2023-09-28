require("dotenv").config();
const express = require('express')
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send('hello world')
});


app.listen(port, () => {
  console.log(`Server is running on port ${port} - build1`);
  // console.log(process.env);
  console.log(process.env);
});
