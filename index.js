const express = require("express");
const app = express();
const port = 5000;
const password = encodeURIComponent("jllee1295@@");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { User } = require('./Users');
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log("err.."));

app.get("/", function (req, res) { res.send("hello world"); });

app.post('/register', (req, res) => {
    //회원가입 할 때 필요한 정보들을 클라이언트에서 가져온 뒤 DB에 적재
    const user = new User(req.body);
    user.save((err, userInfor) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
})

app.listen(port, () => console.log(`express app listening on ${port} servers on!`))
