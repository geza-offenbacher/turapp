const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    text: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    arrive: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },

    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    hikeLikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
        },
    ],
    hikeComments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Hike = mongoose.model("hike", HikeSchema);
