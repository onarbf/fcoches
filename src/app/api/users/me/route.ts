import { connect } from "@/dbConfig";
import { getDataFromToken } from "@/helpers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request: NextRequest){
        try {
            const userId = await getDataFromToken(request);
            const user = await User.findById({_id: userId}).select("-password");
            return NextResponse.json({message:"Returned user",user})
        } catch (error: any) {
            return NextResponse.json({message: error.message},{status: 400})
        } 
}