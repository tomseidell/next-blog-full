import ConnectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

const LoadDB = async ()=>{
    await ConnectDB();
}
LoadDB()


export async function POST(request){

    const formData = await request.formData();

    const emailData ={
        email: `${formData.get("email")}`,
        date: `${formData.get("date")}`
    }

    await EmailModel.create(emailData);
    console.log("email is safed ")

    return NextResponse.json({success: true, msg:"email added"})



}