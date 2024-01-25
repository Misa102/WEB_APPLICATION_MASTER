const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {type: String, default: ""},
        email: {type: String, default: ""},
        password: {type: String, default: ""},
        discordId: {type: String, default: ""},
        usernameDiscord: {type: String, default: ""},
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
