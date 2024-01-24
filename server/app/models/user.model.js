const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        status: {
            type: Number, default: 1
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Authority",
            },
        ],
    })          
);

module.exports = User;
