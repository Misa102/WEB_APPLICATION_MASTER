const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Authority = db.authority;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save()
        .then((user) => {
            if (req.body.roles) {
                Authority.find({ name: { $in: req.body.roles } })
                    .then((authorities) => {
                        user.roles = authorities.map((role) => role._id);
                        user.save()
                            .then((user) => {
                                res.status(201).send({
                                    message:
                                        "User was registered successfully!",
                                });
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
            } else {
                Authority.findOne({ name: "user" })
                    .then((authority) => {
                        user.roles = [authority._id];
                        user.save()
                            .then((user) => {
                                res.status(201).send({
                                    message:
                                        "User was registered successfully!",
                                });
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
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.login = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

            let authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};
