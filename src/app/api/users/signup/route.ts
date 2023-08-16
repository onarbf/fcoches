
import { sendEmail} from '@/helpers';
import { connect } from '@/helpers/dbConfig';
import { validators } from '@/helpers/validators';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
var bcryptjs = require('bcryptjs');
connect()

export async function POST(request: NextRequest) {
    try {
        const {username, email, password, repeatedPassword} = await request.json();

        const [validUsername, msgUsername] = validators.username({username})
        const [validEmail, msgEmail] = validators.email({email})
        const [validPassword, msgPassword] = validators.password({password, repeatedPassword})
        
        if(!validUsername) return NextResponse.json({message: msgUsername},{status: 400})
        if(!validEmail) return NextResponse.json({message: msgEmail},{status: 400})
        if(!validPassword) return NextResponse.json({message: msgPassword},{status: 400})
        
        const user = await User.findOne({email})
        if(user) return NextResponse.json({message: "El usuario ya existe"}, {status: 400})

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
            message: "Usuario creado con éxito. Te hemos enviado un email, lo recibirás en un par de minutos!",
            success: true,
            savedUser
        })

        

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

