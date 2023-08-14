import { UserTypes } from "@/types";
import mongoose, {Schema} from "mongoose";
 
  

const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
},
password: {
    type: String,
    required: [true, "Please provide a password"],
},
email: {
    type: String,
    required: [true, "Please provide an email"]
},
 isVerified: {
    type: Boolean,
    default: false
 },
 isAdmin: {
    type: Boolean,
    default: false
 },
 posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
 comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
 forgotPasswordToken: String,
 forgotPasswordTokenExpiry: Date,
 verifyToken: String,
 verifyTokenExpiry: String
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;