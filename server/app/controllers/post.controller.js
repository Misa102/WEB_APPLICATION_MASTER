const db = require("../models");

const Post = db.post;
const User = db.user;
const PostLike = db.postLike;

exports.findAllPost = (req, res) => {
    console.log("rest request to find all posts");
    Post.find()
        .then((post) => {
            // let postMap = [];
            // if(post.length > 0) {
            //     PostLike.find()
            // }
            res.status(200).send(post);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.save = (req, res) => {
    console.log("rest request to save post");
    User.findById(req.userId)
        .then((user) => {
            if (user) {
                const post = new Post({
                    title: req.body.title,
                    content: req.body.content,
                    createBy: user.username,
                    modifiedBy: user.username,
                    user: user,
                });
                post.save()
                    .then((post) => {
                        res.status(201).send({
                            title: post.title,
                            content: post.content,
                            createBy: post.createBy,
                            modifiedAt: post.modifiedAt,
                            userId: post.user.id,
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
