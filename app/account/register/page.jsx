"use client"


import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Register = async () => {

    const session = await getServerSession(authOptions)

    if(session){
        redirect("/account/dashboard")
    }



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();


    
    const handleSubmit = async (e)=>{
        e.preventDefault()
    if(!name || !email || !password){
        setError("all fields are neccessary")
        return;
            
        }

        const formData = new FormData()
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password)


        try {
            const response = await axios.post("/api/register", formData);

            if (response.data.success) {
                setName("");
                setEmail("");
                setPassword("");
                setError(""); 

                router.push("/account/login")
            } else {
                setError(response.data.msg); 
            }
        } 

        catch (err) {
            if (err.response && err.response.status === 409) {
                setError("User already exists with this email.");
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    }




    return ( 
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded border-t-4 border-black">
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e)=>setName(e.target.value)} value={name} className="w-[400px] border border-gray-200 py-2 px-6
                     bg-zinc-100/40" type="text" placeholder="Name"></input>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="w-[400px] border border-gray-200 py-2 px-6
                     bg-zinc-100/40" type="email" placeholder="Email"></input>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="w-[400px] border border-gray-200 py-2 px-6
                     bg-zinc-100/40" type="password" placeholder="Password"></input>
                     <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">
                        Create Account
                     </button>
                     {
                        error&&<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                     </div>
                     }
                     
                     <Link className="text-sm mt-3 text-right" href={"/account/login"}>
                     Already have an Account? <span className="underline">Register</span>
                     </Link>
                </form>
            </div>
            
        </div>
     );
}
 
export default Register;