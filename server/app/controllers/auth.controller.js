const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Authority = db.authority;
const { CLIENT_ID, CLIENT_SECRET } = require("../config/discord.config");

const axios = require("axios");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.discordLogin = async (req, res) => {
    let code = "";
    let query = req.query;
    if (query.hasOwnProperty("code")) {
        code = String(query.code);
    }

    if (code.length > 0) {
        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append(
            "redirect_uri",
            "http://localhost:5000/api/auth/login/discord"
        );
        try {
            const response = await axios.post(
                "https://discord.com/api/oauth2/token",
                params
            );
            const { access_token, token_type } = response.data;
            const userDataResponse = await axios.get(
                "https://discord.com/api/users/@me",
                {
                    headers: {
                        authorization: `${token_type} ${access_token}`,
                    },
                }
            );

            const userDiscord = new User({
                discordId: userDataResponse.data.id,
                usernameDiscord: userDataResponse.data.username,
                email: userDataResponse.data.email,
            });

            User.findOne({ usernameDiscord: userDiscord.usernameDiscord })
                .populate("roles", "-__v")
                .then((user) => {
                    if (!user) {
                        userDiscord
                            .save()
                            .then((userSaved) => {
                                Authority.findOne({ name: "user" })
                                    .then((authority) => {
                                        userSaved.roles = [authority._id];
                                        userSaved
                                            .save()
                                            .then((result) => {
                                                User.findOne({
                                                    usernameDiscord:
                                                        result.usernameDiscord,
                                                    status: 1,
                                                })
                                                    .populate("roles", "-__v")
                                                    .then((user) => {
                                                        if (!user) {
                                                            return res
                                                                .status(404)
                                                                .send({
                                                                    message:
                                                                        "User Not found.",
                                                                });
                                                        }

                                                        const token = jwt.sign(
                                                            { id: user.id },
                                                            config.secret,
                                                            {
                                                                algorithm:
                                                                    "HS256",
                                                                allowInsecureKeySizes: true,
                                                                expiresIn: 86400,
                                                            }
                                                        );

                                                        let authorities = [];

                                                        for (
                                                            let i = 0;
                                                            i <
                                                            user.roles.length;
                                                            i++
                                                        ) {
                                                            authorities.push(
                                                                "ROLE_" +
                                                                    user.roles[
                                                                        i
                                                                    ].name.toUpperCase()
                                                            );
                                                        }

                                                        res.redirect(
                                                            `http://localhost:3000/auth/login/discord/callback?id=${user._id}&username=${user.usernameDiscord}&email=${user.email}&roles=${authorities}&accessToken=${token}`
                                                        );
                                                    })
                                                    .catch((err) => {
                                                        res.status(500).send({
                                                            message: err,
                                                        });
                                                        return;
                                                    });
                                            })
                                            .catch((err) => {
                                                res.status(500).send({
                                                    message: err,
                                                });
                                                return;
                                            });
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
                        const token = jwt.sign({ id: user.id }, config.secret, {
                            algorithm: "HS256",
                            allowInsecureKeySizes: true,
                            expiresIn: 86400,
                        });

                        let authorities = [];

                        for (let i = 0; i < user.roles.length; i++) {
                            authorities.push(
                                "ROLE_" + user.roles[i].name.toUpperCase()
                            );
                        }

                        res.redirect(
                            `http://localhost:3000/auth/login/discord/callback?id=${user._id}&username=${user.usernameDiscord}&email=${user.email}&roles=${authorities}&accessToken=${token}`
                        );
                    }
                });
        } catch (error) {
            console.log("Error", error);
            return res.send("Some error occurred! ");
        }
    }
};

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
        status: 1,
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
