
import { connect } from '@/helpers/dbConfig'
import { validators } from '@/helpers/validators'
import User from '@/models/userModel'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
var bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")

connect()


export async function POST(request: NextRequest) {
    const cookieStorage = cookies()
    
    try {
        const {email, password} = await request.json()
        console.log({email, password})
        
        const user = await User.findOne({email})
        const validPassword = await bcryptjs.compare(password, user.password)
        const [validEmail, msgEmail] = validators.email({email})

        if(!validEmail) return  NextResponse.json({message: msgEmail},{status: 400})
        if(!validPassword) return  NextResponse.json({message: "Ese password es invalido"},{status: 400})

        
        if(!user) return  NextResponse.json({message: "Ese usuario no existe"},{status: 400})
        if(!user.isVerified) return  NextResponse.json({message: "Tu email no está verificado. Revisa tu email"},{status: 400})

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        cookieStorage.set("token",token,{httpOnly: true})
        return response;
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

