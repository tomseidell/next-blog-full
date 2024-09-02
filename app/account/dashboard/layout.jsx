import { assets } from "@/assets/assets";
import Sidebar from "@/components/adminComponents/sidebar";
import Image from "next/image";
///import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
    return ( 
        <>
        <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-2.5 max-h-[60] px-12 border-b border-black">
                <h3 className="font-medium">Account</h3>
                <Image src={assets.profile_icon} width={40} alt=""/>
            </div>
            {children}
        </div>
        </div>
        
        </>
     );
}
 
export default Layout;