"use client"

import React, { useEffect, useState } from "react";
import BlogItem from "./blogItem";
import { blog_data } from "@/assets/assets";
import Link from "next/link";
import axios from "axios";




const BlogList = () => {

    const [menu, setMenu] = useState("All");

    const [blogs, setBlogs] = useState([]);


    const fetchBlogs= async ()=>{
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }


    useEffect(()=>{
        fetchBlogs()
    },[])
    
    return ( 
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={()=>setMenu("All")}  className={menu==="All" ? "bg-black text-white py-1 px-4 rounded-sm": ""}>All</button>
                <button onClick={()=>setMenu("Technology")} className={menu==="Technology" ? "bg-black text-white py-1 px-4 rounded-sm": ""} >Technology</button>
                <button onClick={()=>setMenu("Startup")} className={menu==="Startup" ? "bg-black text-white py-1 px-4 rounded-sm": ""} >Startup</button>
                <button onClick={()=>setMenu("Lifestyle")} className={menu==="Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm": ""} >Lifestyle</button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blogs.map(blog=>{
                    if(blog.category===menu || menu ==="All"){
                        return(
        
                            <Link key={blog._id} href={`/blogs/${blog._id}`} >
                            <BlogItem id={blog._id} 
                            title={blog.title} image={blog.image} 
                            category={blog.category} description={blog.description}/>
                            </Link>
                        
                            
                        )
                    }
                    
                    
                })}
            </div>
        </div>
     );
}
 
export default BlogList;