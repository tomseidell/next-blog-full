"use client"

import BlogTableItem from "@/components/adminComponents/blogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {

    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async ()=>{
      const response = await axios.get("/api/blog")
        setBlogs(response.data.blogs)
    }

    const deleteBlogs = async (mongoId)=>{
     const respone= await axios.delete("/api/blog",{
            params:{
                id: mongoId
            }
        })
        fetchBlogs();
    }


    useEffect(()=>{
        fetchBlogs()
    },[])





    return ( 
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1>All blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="hidden sm:block px-6 py-3">
                                Author name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Blog Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Blog Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog)=>{
            
                            return <BlogTableItem handleDelete={deleteBlogs} key={blog._id} id={blog._id} date={blog.date} authorImg={blog.authorImg} title={blog.title} author={blog.author}/>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
     );
}



export default page;