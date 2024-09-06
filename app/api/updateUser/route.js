import UserModel from "@/lib/models/UserModel";

import { NextResponse } from "next/server";

const { default: ConnectDB } = require("@/lib/config/db");

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB()


export async function PATCH(request){

   /* const userId = request.nextUrl.searchParams.get("id")
    if (!userId) {
        return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
      }*/

    

    

    const formData = await request.json()
    const name = formData.name;
    const email = formData.email;



    const user = await UserModel.findOne({ email: email });
    
    if(!user){
        return NextResponse.json({error: "no user found"}, 
        {status:406})
    }
    const userId = user._id;

   const updatedUser= await UserModel.findByIdAndUpdate(
    userId,
    {
        name: name,
        email: email
    },
    { new: true }
)

    if (!updatedUser) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

   return NextResponse.json({ success: true, data: updatedUser });


}