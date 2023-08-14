import mongoose, {Schema} from "mongoose";  

const commentSchema = new mongoose.Schema({
body: {
    type: String,
    required: [true, "Please provide a body"],
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
 post: {
   type:  Schema.Types.ObjectId,
   ref: 'posts' 
}
})

const Comment = mongoose.models.posts || mongoose.model("comments", commentSchema)

export default Comment;