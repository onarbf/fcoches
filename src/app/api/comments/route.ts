import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers";
import Comment from "@/models/commentModel";
import User from "@/models/userModel";
import { validators } from "@/helpers/validators";
import {sanitize} from "@/helpers/sanitizers";
import Post from "@/models/postModel";
import { connect } from "@/helpers/dbConfig";

connect()

export async function POST(request: NextRequest, {params}: {params: {id: string}}){

    try {
        const url = new URL(request.url)
        const postId = url.searchParams.get('postId')
        const {body} = await request.json()
        const [validBody, messageBody] = validators.body({body})
        if(!validBody) return NextResponse.json({message: messageBody},{status:400})
        const sanitizedBody = sanitize(body);

        const token = request.cookies.get('token')?.value || ''
        if(!token)return NextResponse.json({message: 'token not defined '},{status: 400})
        const userId = getDataFromToken(request)
        if(!userId)return NextResponse.json({message: 'wrong token '},{status: 400})
        const comment = await Comment.create({
            body: sanitizedBody,
            author: userId,
            post: postId
        })
        console.log('comment',comment)
        await User.findOneAndUpdate({_id: userId},{ $push: { comments: comment._id } },{ new: true } )
        await Post.findOneAndUpdate({_id: postId},{ $push: { comments: comment._id } },{ new: true } )
        return NextResponse.json({message:"post created successfully", comment},{status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status:500})
    }


}
