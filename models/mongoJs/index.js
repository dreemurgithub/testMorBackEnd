import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
if (process.env.MongoURI) mongoose.connect(process.env.MongoURI);
const { Schema } = mongoose;
const toDo = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
const toDoModel = mongoose.model("todo", toDo);

const user = new Schema({
  username: String,
  password: String,
  email: String,
});
const userModel = mongoose.model("user", user);

class checkInput {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  checkRegister() {
    const checkUsername = this.username && typeof this.username === "string";
    const checkEmail = this.email && typeof this.password === "string";
    const checkPassword = this.password && typeof this.password === "string";
    return checkUsername && checkEmail && checkPassword;
  }
  checkLoginId() {
    const checkUsername = this.username && typeof this.username === "string";
    const checkPassword = this.password && typeof this.password === "string";
    return checkUsername && checkPassword;
  }
  async addUser() {
    if (this.checkRegister()) {
      const newUser = new userModel({
        email: email,
        password: password,
        username: username,
      });
      await newUser.save();
    }
  }
  async loginUserId() {
    if (this.checkLoginId()) {
      const user = await userModel.findOne(this.username);
      if (user.password === this.password) {
        return
      }
      // await newUser.save();
    }
    return;
  }
  async signOut() {}
}
