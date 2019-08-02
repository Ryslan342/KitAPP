const express = require("express");
const findUser = require("../libs/login.js");

const app = express.Router();

app.post("/in", function (req, res, next) {
    const login = req.body.login;
    const passw = req.body.password;

    findUser({login, password: passw}, function (err, user) {
        if (err) {
            return res.status(401).send(err.type);
        }

        res.cookie("login", login, { maxAge: 1000 * 60 * 60 * 24 * 30, secure: false});
        res.cookie("password", passw, { domain: "localhost" } );

        res.send(user);
    });
});

app.get("/user", require("./login.js"), function (req, res, next) {
    res.send(req.user);
});

module.exports = app;