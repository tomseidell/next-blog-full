import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
});


const UserModel = mongoose.models.user || mongoose.model("user", Schema)
export default UserModel;