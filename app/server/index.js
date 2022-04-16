const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const dotenv = require("dotenv").config();

// db
const UserModel = require("./models/users");
const mongoose = require("mongoose");
mongoose.connect(process.env.db_devdash);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Connected to db"));

// app
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const getUsersDb = async () => {
  return await UserModel.find().lean();
};
// app routes

app.set("json spaces", 2);
app.get("/", async (req, res) => {
  // res.send("Hello World!");
  const data = await getUsersDb();
  res.json(data);
  try {
    res.send("Hello World!");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({}).select({
      _id: 0,
      disc_id: 1,
      avatar: 1,
      discriminator: 1,
      public_flags: 1,
      user_count: 1,
      username: 1,
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/messagecount/:num", async (req, res) => {
  let num = req.params.num;
  console.log(num);
  try {
    const users = await UserModel.find({
      total_messages: { $gte: num },
    }).select({
      _id: 0,
      disc_id: 1,
      avatar: 1,
      discriminator: 1,
      public_flags: 1,
      user_count: 1,
      username: 1,
      total_messages: 1,
    });
    res.json({ query: `$gte ${num}`, count: users.length, data: users });
    console.log("users length", users.length);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const users = await getUsersDb();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
app.get("/messageCount", async (req, res) => {
  try {
    const messageCount = await db.UserModel.find({}).select({
      _id: 0,
      disc_id: 1,
      username: 1,
      total_messages: 1,
    });
    res.json(messageCount);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await UserModel.find({}).select({
      _id: 0,
      disc_id: 1,
      username: 1,
      messages: 1,
      total_messages: 1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
app.get("/messages/:id", async (req, res) => {
  try {
    const users = await getUsersDb();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
