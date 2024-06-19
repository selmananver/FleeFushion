import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async (req,res)=>{
    try {
        if(req.method ==='POST'){
        const session = await getServerSession (req,res,authOptions)
        if(session){
            const  {db} =await connectToDatabase()
            const admin = db.collection('admin').findOne({user:session.user.email})
            if(!admin){
                res.status(401).json({message:'Unauthorized'})
            }
            else{
                const dish = {...req.body,price:parseInt(req.body.price)}
                await db.collection('dishes').insertOne(dish)
                return res.status(200).json({message:'Dish added successfully'})
            }
        }
        else{
            return res.status(401).json({message:'Unauthorized'})
        }
    }
    else {
        return res.status(401).json({message:'Bad Request'})
    }
}
catch(err){
    console.error(err)
    return res.status(500).json({message:'Internal server error'})
}
}