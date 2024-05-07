import NextAuth from "next-auth";
import  GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from "@/pages/components/utils/mongodb";

export  default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET

        })
    ],
    callbacks:{
        async session({session,token}){
            session.admin =false
            const {db} =  await connectToDatabase()
            const result = await db.collection('admins').findOne({user:session.user.email})
            if(result){
                session.admin = true
            }
            return session
        }
    }
})