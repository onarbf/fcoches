import { connect } from '@/dbConfig'
import { sendEmail } from '@/helpers';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
var bcryptjs = require('bcryptjs');

connect()

export async function POST(request: NextRequest) {
    try {
        console.log('working')
        const {username, email, password} = await request.json();
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        await sendEmail({email,emailType: "VERIFY",userId: savedUser._id})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

        

        
    } catch (error: any) {
        return NextResponse.json({error:error.message}, {status: 500})
        console.log(error)
    }
}

