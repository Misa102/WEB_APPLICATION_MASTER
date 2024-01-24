const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Authority = db.authority;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

haveAdminRole = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            Authority.find({ _id: { $in: user.roles } })
                .then((authorities) => {
                    for (let i = 0; i < authorities.length; i++) {
                        if (authorities[i].name === "admin") {
                            req.isAdmin = true;
                            next();
                            return;
                        }
                    }

                    req.isAdmin = false;
                    return;
                })
                .catch((err) => {
                    res.status(500).send({ message: err });
                    return;
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            Authority.find({ _id: { $in: user.roles } })
                .then((authorities) => {
                    for (let i = 0; i < authorities.length; i++) {
                        if (authorities[i].name === "admin") {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: "Require Admin Role!" });
                    return;
                })
                .catch((err) => {
                    res.status(500).send({ message: err });
                    return;
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

const authJwt = {
    verifyToken,
    isAdmin,
    haveAdminRole
};
module.exports = authJwt;
