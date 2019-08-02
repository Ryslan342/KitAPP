const express = require("express");

const { NotFoundError } = require("../libs/errors.js");
const Hotels = require("../class/Hotel.js");

const app = express.Router();

app.param("id", function (req, res, next, id) {
    Hotels.findById(id, function (err, hotel) {
        if (err) {
            return next(err);
        }

        if (!hotel) {
            return next(new NotFoundError("Hotel"));
        }

        req.hotel = hotel;
        return next();
    });
});

app.get("/", function (req, res, next) {
    Hotels.find(function (err, hotels) {
        if (err) {
            return next(err);
        }

        res.send(hotels);
    }).limit(20).sort("-price.min");
});

app.get("/:id", function (req, res, next) {
    res.send(req.hotel);
});

app.use("/:id/rooms/", require("./rooms.js"));

module.exports = app;