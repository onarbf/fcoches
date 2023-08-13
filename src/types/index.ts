import mongoose from "mongoose";

export interface UserTypes {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string | undefined;
    forgotPasswordTokenExpiry: Date | undefined,
    verifyToken: string | undefined,
    verifyTokenExpiry: string | undefined,
    posts: string[]
  }

  export interface PostType {
    _id: string | mongoose.Schema.Types.ObjectId 
    title:string,
    body: string,
    category: string,
    createdAt: Date,
    updatedAt: Date,
    author: string
  }