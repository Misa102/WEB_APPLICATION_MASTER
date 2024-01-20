const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

getUser = (req) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
        return decoded.id;
    });
};

const authUtils = {
    getUser
};
module.exports = authUtils;