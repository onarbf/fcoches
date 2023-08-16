import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { getDataFromToken } from "@/helpers";
import User from "@/models/userModel";
import { validators } from "@/helpers/validators";
import {sanitize} from "@/helpers/sanitizers";


export async function GET(request: NextRequest){
    
    try {
        const posts = await Post.find({}).limit(100);
        return NextResponse.json({posts},{status: 200})

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status:500})
    }
}



export async function POST(request: NextRequest){

    try {
        const {title, body, category} = await request.json()
        console.log({title, body, category})
        const [validTitle, messageTitle] = validators.title({title})
        const [validBody, messageBody] = validators.body({body})
        
        if(!validTitle) return NextResponse.json({message: messageTitle},{status:400})
        if(!validBody) return NextResponse.json({message: messageBody},{status:400})
        
        const sanitizedBody = sanitize(body);
        const token = request.cookies.get('token')?.value || ''
        if(!token)return NextResponse.json({message: 'token not defined '},{status: 400})
        const userId = getDataFromToken(request)
        if(!userId)return NextResponse.json({message: 'wrong token '},{status: 400})
        const post = await Post.create({
            title,
            body: sanitizedBody,
            category,
            author: userId,
        })

        const savedUser = await User.findOneAndUpdate({_id: userId},{ $push: { posts: post._id } },{ new: true } )
        console.log(savedUser)
        return NextResponse.json({message:"post created successfully", post},{status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status:500})
    }


}
