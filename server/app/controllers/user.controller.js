const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

const User = db.user;

exports.getListUser = (req, res) => {
    console.log("rest request to find all user");

    User.find({ _id: { $ne: new ObjectId(req.userId) } })
        .populate("roles", "-__v")
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.updateStatus = (req, res) => {
    console.log("rest request to update status user");
    let status = req.body.status;
    User.findOneAndUpdate(
        {
            _id: new ObjectId(req.body.userId),
        },
        {
            $set: {
                status: status,
            },
        }
    )
        .then((user) => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};
