import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"


export const authOptions : NextAuthOptions  ={
    providers : [
        CredentialsProvider({
                id:"credentials",
                name:"Credentials",
    
                credentials: {
                    email: { label: "Email", type: "text", placeholder: "jsmith@gamil.com" },
                    password: { label: "Password", type: "password" }
                  },
    
                  async authorize(credentials:any):Promise <any> {
                    await dbConnect();
                  try {
                          const user =  await UserModel.findOne({
                                $or :[
                                    {email: credentials.indentifier},
                                    {username:credentials.indentifier}
                                 ]
                            })

                            if(!user){
                                throw new Error("No user Found With this Email or Username")
                            }

                            if(!user.isVerified){
                                throw new Error("please verfiy your account before login")
                            }

                        let isPasswordCorrect =   await bcrypt.compare(credentials.password , user.password)

                        if(isPasswordCorrect){
                            return user
                        }
                        else{
                            throw new Error("Invalid Credentials")
                        }
                        
                  } catch (error:any) {
                    throw new Error(error)
                  }
                  }
    
    
        })
    ],

    pages:{
        signIn : '/sign-in'
    },

    session :{
        strategy: "jwt"
    },

    secret : process.env.NEXTAUTH_SECRET

}