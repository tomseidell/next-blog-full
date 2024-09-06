import ConnectDB from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"


const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB();



 export const authOptions ={
    providers:[
        Credentials({
            name: "credentials",
            credentials: {},

             async authorize(credentials){
                const {email, password} = credentials
                
                try{
                  const user = await UserModel.findOne({email});

                  if(!user){
                    return null 
                  }
                 const passwordsMatch = await bcrypt.compare(password, user.password)

                 if(!passwordsMatch){
                    return null
                 }
                 return user;


                }catch(error){
                    console.lof("error:", error)
                }

            },
        })
    ],
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET, 
    pages:{
        signIn: "/account/login"
    },
    callbacks: {
        async jwt({ token, user }) {
          // Falls ein Benutzerobjekt vorhanden ist (neue Anmeldung)
          if (user) {
            token.id = user._id;
            token.name = user.name;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
          // Session mit den neuesten Token-Daten aktualisieren
          if (token) {
            session.user = {
              id: token.id,
              name: token.name,
              email: token.email,
            };
          }
          return session;
        },
      },
};

/// update: nur callbacks hinzugefügt
 
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}