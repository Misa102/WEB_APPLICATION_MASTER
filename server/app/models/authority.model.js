const mongoose = require("mongoose");

const Authority = mongoose.model(
    "Authority",
    new mongoose.Schema({
        name: String,
    })
);

module.exports = Authority;
