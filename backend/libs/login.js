const User = require("../class/User.js");
const { NotFoundError, InvalidPasswordError  } = require("../libs/errors.js");

module.exports = function ({login, password}, callback) {
    User.findOne({login}, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(new NotFoundError("User"));
        }

        if (user.verifyPassword(password)) {
            return callback(null, user);
        } else {
            return callback(new InvalidPasswordError());
        }
    });
};

