const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

const Post = db.post;
const User = db.user;
const PostLike = db.postLike;

exports.save = (req, res) => {
    console.log("rest request to save post like");
    Post.findById(req.body.postId)
        .then((post) => {
            User.findById(req.userId)
                .then((user) => {
                    if (post && user) {
                        PostLike.findOne({ user: user, post: post })
                            .then((postLike) => {
                                if (!postLike) {
                                    const postLikeSave = new PostLike({
                                        user: user,
                                        post: post,
                                        createBy: user.username,
                                        modifiedBy: user.username,
                                    });
                                    postLikeSave
                                        .save()
                                        .then((resultPostLike) => {
                                            if (resultPostLike) {
                                                Post.findOneAndUpdate(
                                                    {
                                                        _id: new ObjectId(
                                                            post.id
                                                        ),
                                                    },
                                                    {
                                                        $set: {
                                                            totalLike:
                                                                post.totalLike +
                                                                1,
                                                        },
                                                    }
                                                ).then((updatePost) => {
                                                    if (updatePost) {
                                                        res.status(201).send();
                                                    } else {
                                                        res.status(400).send();
                                                    }
                                                });
                                            }
                                        });
                                } else {
                                    res.status(400).send();
                                }
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
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.delete = (req, res) => {
    console.log("rest request to delete post like");
    Post.findById(req.body.postId)
        .then((post) => {
            User.findById(req.userId)
                .then((user) => {
                    if (post && user) {
                        PostLike.findOne({ user: user, post: post })
                            .then((postLike) => {
                                if (postLike) {
                                    let totalLike =
                                        post.totalLike > 0
                                            ? post.totalLike - 1
                                            : 0;
                                    Post.findOneAndUpdate(
                                        {
                                            _id: new ObjectId(post.id),
                                        },
                                        {
                                            $set: {
                                                totalLike: totalLike,
                                            },
                                        }
                                    ).then((updatePost) => {
                                        if (updatePost) {
                                            PostLike.deleteOne({
                                                _id: new ObjectId(postLike.id),
                                            })
                                                .then((resultDelete) => {
                                                    res.status(200).send();
                                                })
                                                .catch((err) => {
                                                    res.status(500).send({
                                                        message: err,
                                                    });
                                                    return;
                                                });
                                        } else {
                                            res.status(400).send();
                                        }
                                    });
                                }
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
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};
