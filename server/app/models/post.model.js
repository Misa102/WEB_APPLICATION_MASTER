const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        content: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        totalLike: {type: Number, default: 0},
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now },
        createBy: String,
        modifyBy: String
    })          
);

module.exports = Post;
