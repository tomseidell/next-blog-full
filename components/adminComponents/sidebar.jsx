"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Sidebar = () => {
    return ( 
        <div className="flex flex-col bg-slate-100">
            <div className="px-2 sm:pl-14 py-3 border border-black">
                <Link href="/">
                <Image src={assets.logo} width={120} height={40} alt="Logo"/> {/* Hinzufügen von height */}
                </Link>
            </div>
            <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
                <div className="w-[50%] sm:w-[80%] absolute right-0">
                    <Link href="/admin/addProduct" className="flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.add_icon} alt="Add Icon" width={28} height={28}/>{/* Hinzufügen von height */}
                        <p>Add Blogs</p>
                    </Link>
                    <Link href="/admin/blogList" className="mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.blog_icon} alt="Blog Icon" width={28} height={28}/>{/* Hinzufügen von height */}
                        <p>Bloglist</p>
                    </Link>
                    <Link href="/admin/subscriptions" className="mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.email_icon} alt="Email Icon" width={28} height={28}/>{/* Hinzufügen von height */}
                        <p>Subscriptions</p>
                    </Link>
                    <Link href="/account/dashboard/settings" className="mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.settings_account} alt="Settings" width={28} height={28}/>
                        <p>Settings</p>
                    </Link>
                    <div onClick={() => signOut()} className="mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] cursor-pointer">
                        <Image src={assets.logout} alt="Logout Icon" width={28} height={28}/>{/* Hinzufügen von height */}
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;



/*

 <Link href='/admin/subscriptions' className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] group">
            <FaSignOutAlt className="text-lg sm:mr-2 transform transition-transform duration-300 group-hover:scale-125" /> 
            <p className='hidden sm:block'>Log out</p> 
          </Link>


*/ 