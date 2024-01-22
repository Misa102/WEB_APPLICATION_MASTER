const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Authority = db.authority;


// add for connection with Discord
const axios = require("axios");
const { getUser } = require("../utils/auth.util");

exports.discordLogin = async(req, res) =>{
    //rediriger l'utilisateur ver l'URL d'autorisation Discord
    res.redirect(
        `https://discord.com/login?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${config.DISCORD_REDIRECT_URI}&response_type=code&scope=identify`
    );
};
exports.discordCallback = async (req, res) => {
    try {

      const code = req.query.code;
  
      // Échanger le code d'autorisation contre un token d'accès Discord
      const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        null,
        {
          params: {
            client_id: config.DISCORD_CLIENT_ID,
            client_secret: config.DISCORD_CLIENT_SECRET,
            redirect_uri: config.DISCORD_REDIRECT_URI,
            code: code,
            grant_type: "authorization_code",
            scope: "identify",
          },
        }
      );
  
      const discordToken = response.data.access_token;

      console.log("Redirecting to home page...");
      res.redirect("http://localhost:3000/");
      
    } catch (error) {
      console.error("Discord connection error:", error.message);
      res.status(500).send("Error connecting with Discord");
    }
  };



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
