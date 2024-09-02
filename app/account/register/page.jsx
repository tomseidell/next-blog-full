
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/RegisterForm";

const Register = async () => {

    const session = await getServerSession(authOptions)

    if(session){
        redirect("/account/dashboard")
    }






    return ( 
        <RegisterForm />
     );
}
 
export default Register;