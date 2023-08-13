import { PostType } from "@/types";
import mongoose from "mongoose";
 
  

const postSchema = new mongoose.Schema({
title: {
    type: String,
    required: [true, "Please provide a username"],
},
body: {
    type: String,
    required: [true, "Please provide a password"],
},
category: {
    type: String,
    required: [true, "Please provide an email"]
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
    type:  mongoose.Schema.Types.ObjectId
 }
})

const Post = mongoose.models.posts || mongoose.model("posts", postSchema)

export default Post;