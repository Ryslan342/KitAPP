const User = require("../class/User.js");

// random dataset
const names = ["Руслан", "Сергей", "Вадим", "Антон", "Алексадр"];
const surnames = ["Бондаренко", "Аврамов", "Шевченко"];
const patronymics = ["Сергеевич", "Константинович"];


if (module.parent) {
    module.exports = fil;
} else {
    const mongoose = require("mongoose");
    const { mongodb } = require("../config");

    fil(10, function (err, loginData) {
        if (err) {
            throw err;
        }
        console.log(loginData);
        process.exit();
    });

    mongoose.connect(mongodb.url, {}, function (err) {
        if (err) {
            throw err;
        }

        console.log("Connected to database");
    });
}


function fil(count, callback, maxMoney = 2500) {
    User.deleteMany({}, function (err) {
        if (err) {
            return callback(err);
        }

        const usersData = [];
        let loginData = "";

        for (let i = 0; i < count; i++) {
            const login = "login" + i;
            const passw = "passw" + i;

            usersData.push({
                fullname: {
                    name: getRandomItem(names),
                    surname: getRandomItem(surnames),
                    patronymic: getRandomItem(patronymics)
                },
                balance: maxMoney * Math.random(),
                login: login,
                password: passw
            });

            loginData += `login:"${ login }", passw:"${ passw }" \n`;
        }

        User.create(usersData, function (err) {
            if (err) {
                throw err;
            }

            callback(err, loginData);
        });
    });
}

function getRandomItem(arr) {
    const index = Math.floor(arr.length * Math.random());
    return arr[index];
}