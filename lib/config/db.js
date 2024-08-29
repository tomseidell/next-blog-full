import mongoose from "mongoose";

const ConnectDB = async() => {
    await mongoose.connect("mongodb+srv://tomseidell:Surfing123@cluster0.0f4e6.mongodb.net/blog-app")
    console.log("db connected")
}
 
export default ConnectDB;