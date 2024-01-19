const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title: String,
        content: String,
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

module.exports = Post;
