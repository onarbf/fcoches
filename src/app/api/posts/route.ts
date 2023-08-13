import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers";
import Post from "@/models/postModel";
import User from "@/models/userModel";

export async function GET(request: NextRequest){
    try {
        const posts = await Post.find({}).limit(100);
        return NextResponse.json({posts},{status: 200})

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: error.message},{status:500})
    }
}

export async function POST(request: NextRequest){

    try {
        const {title, body, category} = await request.json()
        const token = request.cookies.get('token')?.value || ''
        if(!token)return NextResponse.json({error: 'token not defined '},{status: 400})
        const userId = getDataFromToken(request)
        if(!userId)return NextResponse.json({error: 'wrong token '},{status: 400})
        const post = await Post.create({
            title,
            body,
            category,
            author: userId,
        })

        const savedUser = await User.findOneAndUpdate({_id: userId},{ $push: { posts: post._id } },{ new: true } )
        console.log(savedUser)
        return NextResponse.json({message:"post created successfully", post},{status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: error.message},{status:500})
    }


}