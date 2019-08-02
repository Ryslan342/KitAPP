const Hotel = require("../class/Hotel.js");

const hotels = [{
    name: "Dark rose",
    description: "\"Dark rose\" достаточно известный отель, в нём достаточно часто останавливаются различные знаменитости.",
    price: {
        min: 800,
        max: 2000
    }
}, {
    name: "Golden sky",
    description: "Расположен на берегу Карибского моря, есть бассейн, 5 звезд.",
    price: {
        min: 500,
        max: 1700
    }
}, {
    name: "Blue sky",
    description: "Недорогой, но комфортный, отличный вариант для среднего класса и отдыха всей семьёй.",
    price: {
        min: 300,
        max: 1200
    }
}, {
    name: "Green",
    description: "Самый экологически чистый отель мира, для тех кто заботиться о природе!",
    price: {
        min: 900,
        max: 2800
    }
}, {
    name: "Party time",
    description: "В отеле постоянно проходят пивные вечеринки, лучший вариант для молодых и энергичных!",
    price: {
        min: 400,
        max: 1400
    }
}];

if (module.parent) {
    module.exports = fil;
} else {
    const mongoose = require("mongoose");
    const {mongodb} = require("../config");

    fil(function (err) {
        if (err) {
            throw err;
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

function fil(callback) {
    Hotel.deleteMany({}, function (err) {
        if (err) {
            return callback(err);
        }

        Hotel.create(hotels, function (err) {
            callback(err)
        })
    });
}