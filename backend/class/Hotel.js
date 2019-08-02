const mongoose = require("mongoose");
const Room = require("./Room.js");

const required = true;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required
    },
    description: {
        type: String,
        required
    },

    price: {
        min: {
            type: Number,
            required
        },
        max: {
            type: Number,
            required
        }
    }
});

schema.methods = {
    createRoom(data, callback) {
        this.price.min = Math.min(this.price.min, data.price);
        this.price.max = Math.max(this.price.max, data.price);

        const room = new Room({
            number: data.number,
            description: data.description,
            price: data.price,
            free: data.free,

            hotel: this._id
        });

        room.save((err) => {
            if (err) {
                return callback(err);
            }

            this.save((err) => {
                if (err) {
                    room.remove((err) => {});
                    return callback(err);
                }

                return callback(null, room);
            });
        });
    }
};

module.exports = mongoose.model("Hotel", schema);