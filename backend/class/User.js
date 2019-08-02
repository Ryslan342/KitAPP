const mongoose = require("mongoose");
const passwordHash = require("password-hash");

const required = true;

const schema = new mongoose.Schema({
    fullname: {
        name: {
            type: String,
            required,
            minlength: 3,
            maxlength: 25
        },
        surname: {
            type: String,
            required,
            minlength: 3,
            maxlength: 25
        },
        patronymic: {
            type: String,
            required,
            minlength: 3,
            maxlength: 25
        }
    },
    balance: {
        type: Number,
        required,
        min: 0,
        set(value) {
            return Math.floor(value);
        }
    },

    login: {
        type: String,
        required,
        minlength: 4
    },
    password: {
        type: String,
        required,
        set(value) {
          return passwordHash.generate(value);
        }
    }
});

schema.pre("save", function (next) {
    if (this.isNew) {
        module.exports.countDocuments({login: this.login}, function (err, count) {
            if (err) {
                return next(err);
            }

            if (count !== 0) {
                return next(new Error("Login already used"))
            }

            return next();
        });
    } else {
        next();
    }
});

schema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.login;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

schema.methods = {
    getFullName() {
        return [this.fullname.surname, this.fullname.name, this.fullname.patronymic].join(" ");
    },
    verifyPassword(value) {
        return passwordHash.verify(value, this.password);
    }
};

module.exports = mongoose.model("User", schema);