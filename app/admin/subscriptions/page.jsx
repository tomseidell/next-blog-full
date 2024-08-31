"use client"

import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {

    const [emails, setEmails] = useState([]);

const fetchEmails = async ()=>{
    const response = await axios.get("/api/email")
    setEmails(response.data.emails)
}

const deleteEmail = async (mongoId)=>{
    const response = axios.delete("/api/email",{
        params:{
            id: mongoId
        }
    })
    fetchEmails()
}

    useEffect(()=>{
    fetchEmails()
    },[])


    


    return ( 
        <div className="flex-1 pt-5 px-5 sm:pt-12 pl-16">
            <h1>All Subscription</h1>
            <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email Subscription
                            </th>
                            <th scope="col" className="px-6 py-3 hidden sm:block">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email, index )=>{
                           return <SubsTableItem handleDelete={deleteEmail} key={index} email={email.email} mongoId={email._id} date={email.date}/>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default page;