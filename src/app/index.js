const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const mongoose = require("mongoose");
mongoose.connect(process.env.db_devdash);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Connected to db"));
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send("users");
});
