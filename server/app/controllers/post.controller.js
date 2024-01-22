const db = require("../models");

const Post = db.post;
const User = db.user;
const PostLike = db.postLike;

exports.findAllPost = (req, res) => {
    console.log("rest request to find all posts");
    let userId = "";
    let query = req.query;
    if (query.hasOwnProperty("userId")){
        userId = String(query.userId);
    }
    Post.find()
        .then((post) => {
            let postMap = Object.assign([], post);
            if (post.length > 0) {
                PostLike.find({ post: { $in: post } }).then((postLike) => {
                    let convertPost = postMap.map(v => {
                        let isLike = postLike.filter(pl => (pl.post._id.equals(v.id)) && (pl.user._id.equals(userId))).length > 0;
                        return {
                            id: v._id,
                            title: v.title,
                            content: v.content,
                            totalLike: v.totalLike,
                            createBy: v.createBy,
                            modifiedAt: v.modifiedAt,
                            isLike: isLike
                        }
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
