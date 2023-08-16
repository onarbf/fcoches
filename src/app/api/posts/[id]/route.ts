import Post from "@/models/postModel"
import Comment from "@/models/commentModel"
import { connect } from "@/helpers/dbConfig"

import { NextRequest, NextResponse } from "next/server"

connect()
export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    try {
        const {id} = params
        const post = await Post.findById(id)
        .populate({
            path:'comments',
            populate: {
                path:'author'
            }
    })
        .populate('author', 'username -_id posts comments')
        
        return NextResponse.json({message: 'post found', post},{status:200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status:500})
    }
}