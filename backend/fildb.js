const mongoose = require("mongoose");
const Async = require("async");
const {mongodb} = require("./config.json");

const fil = {
    users: require("./fil/users.js"),
    hotels: require("./fil/hotels.js"),
    rooms: require("./fil/rooms.js"),
};


mongoose.connect(mongodb.url, {}, function (err) {
    if (err) {
        throw err;
    }

    console.log("Connected to database");

    Async.applyEachSeries([
        function (callback) {
            fil.users(5, callback)
        },
        function (callback) {
            fil.hotels(callback)
        },
        function (callback) {
            fil.rooms(10, callback)
        }
    ])(function (err) {
        if (err) {
            throw err;
        }

        console.log("Compiled");
        process.exit();
    });
});