const express = require("express");
const app = express();
const port = 5000;
const password = encodeURIComponent("jllee1295@@");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://jurilee:${password}@react-learn.e6jf7ya.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("err.."));

app.get("/", function (req, res) { res.send("hello world"); });
app.listen(port, () => console.log(`express app listening on ${port} servers on!`))
