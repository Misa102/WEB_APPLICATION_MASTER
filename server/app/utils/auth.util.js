const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

getUser = (req) => {
    if(req.headers["x-access-token"] !== undefined) {
        let token = req.headers["x-access-token"];
        jwt.verify(token, config.secret, (err, decoded) => {
            return decoded.id;
        });
    }
};

const authUtils = {
    getUser
};
module.exports = authUtils; 