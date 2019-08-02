const express = require("express");
const findUser = require("../libs/login.js");

module.exports = function (req, res, next) {
    const login = req.headers["auth-login"];
    const passw = req.headers["auth-password"];

    findUser({login, password: passw}, function (err, user) {
        if (err) {
            return res.status(401).send(err.type);
        }

        req.user = user;
        next();
    });
};