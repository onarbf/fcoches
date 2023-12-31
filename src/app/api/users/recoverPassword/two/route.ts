
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/dbConfig";
const bcryptjs = require('bcryptjs');

connect()

export async function POST(request: NextRequest){
    try {
        const {password, repeatPassword, passwordToken} = await request.json()
        if(password !== repeatPassword) return NextResponse.json({message: "Los passwords no coinciden"},{status: 400})
        
        const user = await User.findOne({forgotPasswordToken: passwordToken});

        if(!user)  return NextResponse.json({message: "No hay ningún usuario que haya solicitado un cambio de contraseña"},{status: 400})


        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        user.password = hashedPassword
        await user.save()
        return NextResponse.json({message: "Contraseña Cambiada con éxito!"},{status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({message: error.message},{status: 500})
    }
}