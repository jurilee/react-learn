const { User } = require("../models/User");

let auth = (req, res, next) => {
    //[인증처리] 클라이언트에서 쿠키에서 토큰 가져옴 - 복호화(디코드)해서 user 찾기 - user가 있으면 실행(없으면 리턴)
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    next();
    });
};

module.exports = { auth };