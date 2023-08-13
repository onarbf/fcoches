
import { sendEmail} from '@/helpers';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
var bcryptjs = require('bcryptjs');


export async function POST(request: NextRequest) {
    try {
        const {username, email, password, repeatedPassword} = await request.json();
        if(password !== repeatedPassword){
            return NextResponse.json({error: "Las contraseñas no coinciden"}, {status: 400})
        }
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
        
        setTimeout(()=>{
            sendEmail({email,emailType: "VERIFY",userId: savedUser._id})
        },0)

        return NextResponse.json({
            message: "Usuario creado con éxito. Te hemos enviado un email, lo recibirás en un par de minutos!",
            success: true,
            savedUser
        })

        

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

