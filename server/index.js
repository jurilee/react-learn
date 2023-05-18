const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", function (req, res) { res.send("hello world"); });
app.get("/api/hello", (req, res) => {
    res.send('도착도착')
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // email 조회 - 있다면 email과 password가 동일한지 - 동일하다면, token 생성
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSucess: false,
                message: "해당하는 유저가 없습니다"
            });
        }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) return res.json({ loginSucess: false, message: "비밀번호가 틀렸습니다" });
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSucess: true, userId: user._id });
                });
        });
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    //middleware를 통과했다면 프론트에 code 200과 아래 정보 전달
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, //role = 0 normal user/ role != admin user
        isAuth: true,
        email: req.user.email,
        name: req.uesr.name.name,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
});

app.listen(port, () => console.log(`express app listening on ${port} servers on!`));
