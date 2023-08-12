import { connect } from "@/dbConfig";
import { sendEmail } from "@/helpers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request: NextRequest){
    
    try {
        const {token} = await request.json()
        const user = await User.findOne({verifyToken: token})
        console.log(user)
        const emailSent = await sendEmail({email: user.email,emailType:"VERIFY",userId: user._id})

        return NextResponse.json({message: "Email with new token sent", success: true})
    } catch (error: any) {
        return NextResponse.json({messsage: error.message},{status: 400})
    }
}