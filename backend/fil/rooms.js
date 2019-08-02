const Hotel = require("../class/Hotel.js");
const Async = require("async");

if (module.parent) {
    module.exports = fil;
} else {
    const mongoose = require("mongoose");
    const {mongodb} = require("../config");

    fil(8, function (err) {
        if (err) {
            throw(err);
        }

        console.log("Created");
        process.exit();
    });

    mongoose.connect(mongodb.url, {}, function (err) {
        if (err) {
            throw err;
        }

        console.log("Connected to database");
    });
}

function fil(count, callback) {
    const quality = ["Лучший", "Отличный", "Замечательный", "Неплохой", "Средний"];
    const floors = ["первом", "втором"];

    Hotel.find({}, function (err, hotels) {
        Async.concat(hotels, function (hotel, callback) {
            const newRooms = [];

            for (let i = 0; i < count; i++) {
                newRooms.push({
                    number: i + 1,
                    description: `${ getRandomItem(quality) } отельный номер расположен на ${ getRandomItem(floors) } этаже.`,
                    price: getRandomPrice(hotel.price.min, hotel.price.max),
                    free: Math.round(Math.random())
                });
            }

            Async.concatSeries(newRooms, hotel.createRoom.bind(hotel), callback);
        }, callback);
    });

    function getRandomPrice(min, max) {
        return min + Math.floor((max - min) / 10 * Math.random()) * 10;
    }
    function getRandomItem(items) {
        return items[Math.floor(items.length * Math.random())];
    }
}