import { connect } from "@/helpers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

connect()

export async function GET(request: NextRequest){
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log('user',token)
        if(!token){
            return NextResponse.json({});
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findById(decodedToken.id).select("-password -__v ")
        console.log('user',user)
        return NextResponse.json({...user, isLogged: true});
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}