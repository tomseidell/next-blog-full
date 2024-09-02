import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

const { default: ConnectDB } = require("@/lib/config/db");

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB()


export async function POST(request){



 const formData = await request.formData();
 const name = formData.get("name");
 const email = formData.get("email");
 const password = formData.get("password");

 const existingUser = await UserModel.findOne({email});

 if(existingUser){
    return NextResponse.json({success: false, msg: "user already exists"}, { status: 409 })
 }
 const hashedPassword = await bcrypt.hash(password,10)

const userData ={
    name: `${name}`,
    email: `${email}`,
    password: `${hashedPassword}`
}


 await UserModel.create(userData)
 return NextResponse.json({success: true, msg:"blog added"})



}