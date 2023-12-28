import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type : String,
        required: true, 
        default: 'Anonymous'
    },
    attachment: String,
    likeCount: {
        type: Number,
        default: 0,
    }
    //option pour schema, auto add 2 field createdAt, updatedAt 
}, {timestamps: true}
);

// ici, on a réusi à créer un post model
export const PostModel = mongoose.model('Post', schema);