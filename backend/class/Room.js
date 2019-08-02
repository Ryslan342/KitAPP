const mongoose = require("mongoose");
const { BalanceError } = require("../libs/errors");

const required = true;

const schema = new mongoose.Schema({
    number: {
        type: Number,
        required
    },
    description: {
        type: String,
        required
    },
    price: {
        type: Number,
        required,
        min: 100,
    },
    free: {
        type: Boolean,
        required,
        default: true
    },

    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required,
    }
});

schema.methods = {
    order(user, callback) {
        if (!this.free) {
            return callback(new Error("Already ordered"));
        }

        if (user.balance < this.price) {
            return callback(new BalanceError());
        }

        user.balance -= this.price;
        user.save((err) => {
            if (err) {
                return callback(err);
            }

            this.free = false;
            this.save((err) => {
                if (err) {
                    user.balance += this.price;
                    user.save(() => {});
                    return callback(err);
                }

                return callback();
            });
        });
    }
};

module.exports = mongoose.model("Room", schema);