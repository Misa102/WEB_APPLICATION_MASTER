const mongoose = require("mongoose");

const PostLike = mongoose.model(
    "PostLike",
    new mongoose.Schema({
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now },
        createBy: String,
        modifyBy: String
    })          
);

module.exports = PostLike;
