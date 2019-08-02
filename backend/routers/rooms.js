const express = require("express");
const login = require("./login");
const { NotFoundError } = require("../libs/errors.js");
const Room = require("../class/Room.js");

const app = express.Router();

app.param("roomId", function (req, res, next, id) {
    Room.findOne({ _id: id, hotel: req.hotel._id }, function (err, room) {
        if (err) {
            return next(err);
        }

        if (!room) {
            return next(new NotFoundError("Room"));
        }

        req.room = room;
        next();
    })
});

app.get("/", function (req, res, next) {
    Room.find({ hotel: req.hotel._id }, function (err, rooms) {
        if (err) {
            return next(err);
        }

        res.send(rooms);
    }).select("number description");
});


app.get("/:roomId", function (req, res, next) {
    res.send(req.room);
});

app.post("/:roomId/order", login, function (req, res, next) {
    req.room.order(req.user, function (err) {
        if (err) {
            return next(err);
        }

        res.send();
    })
});

module.exports = app;