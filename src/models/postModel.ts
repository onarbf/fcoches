import { PostType } from "@/types";
import mongoose, {Schema} from "mongoose";
 
  

const postSchema = new mongoose.Schema({
title: {
    type: String,
    required: [true, "Please provide a title"],
},
body: {
    type: String,
    required: [true, "Please provide a body"],
},
category: {
    type: String,
    required: [true, "Please provide a category"]
},
 createdAt: {
    type: Date,
    default: new Date()
 },
 updatedAt: {
    type: Date,
    default: undefined
 },
 author: {
    type:  Schema.Types.ObjectId,
    ref: 'users' 
 },
 comments: [{
    type:  Schema.Types.ObjectId,
    ref: 'comments' 
 }]
})

const Post = mongoose.models.posts || mongoose.model("posts", postSchema)

export default Post;