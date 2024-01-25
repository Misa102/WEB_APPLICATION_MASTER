const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

const Post = db.post;
const User = db.user;
const PostLike = db.postLike;

exports.findAllPost = (req, res) => {
    console.log("rest request to find all posts");
    let userId = "";
    let query = req.query;
    if (query.hasOwnProperty("userId")) {
        userId = String(query.userId);
    }
    let searchValue = "";
    if (query.hasOwnProperty("searchValue")) {
        searchValue = String(query.searchValue);
    }
    let querySearch = {};
    if (searchValue !== "") {
        querySearch = {
            $or: [
                { content: new RegExp(searchValue, "i") },
                { createBy: new RegExp(searchValue, "i") },
            ],
        };
    }

    Post.find(querySearch)
        .then((post) => {
            let postMap = Object.assign([], post);
            if (post.length > 0) {
                PostLike.find({ post: { $in: post } }).then((postLike) => {
                    let convertPost = postMap.map((v) => {
                        let isLike =
                            postLike.filter(
                                (pl) =>
                                    pl.post._id.equals(v.id) &&
                                    pl.user._id.equals(userId)
                            ).length > 0;
                        return {
                            id: v._id,
                            content: v.content,
                            totalLike: v.totalLike,
                            createBy: v.createBy,
                            modifiedAt: v.modifiedAt,
                            isLike: isLike,
                            userId: v.user._id,
                        };
                    });
                    res.status(200).send(convertPost);
                });
            } else {
                res.status(200).send(post);
            }
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
                    content: req.body.content,
                    createBy: user.username === "" ? user.usernameDiscord : user.username,
                    modifiedBy: user.username === "" ? user.usernameDiscord : user.username,
                    user: user,
                });
                post.save()
                    .then((post) => {
                        res.status(201).send({
                            id: post.id,
                            content: post.content,
                            createBy: post.createBy,
                            modifiedAt: post.modifiedAt,
                            userId: post.user.id,
                            totalLike: 0,
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

exports.delete = (req, res) => {
    console.log("rest request to delete post");
    Post.findById(req.body.postId)
        .then((post) => {
            if (post.user._id.equals(req.userId) || req.isAdmin) {
                Post.deleteOne({ _id: new ObjectId(post.id) })
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
                res.status(403).send();
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.update = (req, res) => {
    console.log("rest request to update post");
    Post.findById(req.body.postId)
        .then((post) => {
            if (post.user._id.equals(req.userId) || req.isAdmin) {
                Post.updateOne(
                    {
                        _id: new ObjectId(post.id),
                    },
                    {
                        $set: {
                            content: req.body.content,
                        },
                    }
                )
                    .then((updatePost) => {
                        res.status(200).send();
                        return;
                    })
                    .catch((err) => {
                        res.status(500).send({ message: err });
                        return;
                    });
            } else {
                res.status(403).send();
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

exports.getDetailPost = (req, res) => {
    console.log("rest request to get details post");
    let postId = "";
    let params = req.params;
    if (params.hasOwnProperty("postId")) {
        postId = String(params.postId);
    }

    Post.findOne({ _id: new ObjectId(postId) })
        .then((post) => {
            res.status(200).send(post);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};
