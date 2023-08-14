import Post from "@/models/postModel"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    try {
        const {id} = params
        const post = await Post.findById(id).populate('author', 'username -_id posts')
        return NextResponse.json({message: 'post found', post},{status:200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status:500})
    }
}