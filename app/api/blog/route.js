import ConnectDB from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import {writeFile} from "fs/promises"
const { NextResponse } = require("next/server")
const fs = require("fs")

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB();

///herer Get starts

export async function GET(request){

    const blogId = request.nextUrl.searchParams.get("id")

    if (blogId){
        const blog = await BlogModel.findById(blogId) //
        return NextResponse.json(blog)
    }else{

    const blogs =await BlogModel.find({})

    return NextResponse.json({blogs})
    
    }

}



///here post starts

export async function POST(request){

const formData = await request.formData();
const timestamp = Date.now();

const image = formData.get("image"); // get image out of formdata comes as blob
const imageByteData = await image.arrayBuffer();/// images that are getting uploaded are in a binary format (blob). But to work with this kinda data we need to convert it into a NodeBuffer, this is the 1 step and it converts it to an arraybuffer
const buffer = Buffer.from(imageByteData); ///here we actually connect it from a arrayBuffer to a normal buffer
const path = `./public/${timestamp}_${image.name}`;
await writeFile(path, buffer); // write file takes a buffer or a string as the 2 argument
const imgUrl = `/${timestamp}_${image.name}`

    const blogData = {
        title : `${formData.get("title")}`,//make a string even if value is undefined or null
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get("authorImg")}`

    }

    await BlogModel.create(blogData)// hier wird es gespeichert, und BlogModel gibt die struktur vor und setzt die daten von blogData ein und durch .create wird es dann tatsächlich in der db gespeichert 
    console.log("Blog saved")


return NextResponse.json({success: true, msg:"blog added"})
}


///delete api


export async function DELETE(request){
    const blogId = request.nextUrl.searchParams.get("id")
   
    const blog = await BlogModel.findById(blogId)
    fs.unlink(`./public${blog.image}`,async ()=>{})
    await BlogModel.findByIdAndDelete(blogId)

    return NextResponse.json({message: "Blog deleted successfully"}, {status:200})

}