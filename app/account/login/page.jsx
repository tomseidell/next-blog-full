import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/LoginForm";


export default async function Login(){

    const session = await getServerSession(authOptions)

    if(session){
        redirect("/account/dashboard")
    }


    return(
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded border-t-4 border-black">
                <h1 className="text-xl font-bold my-4">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}