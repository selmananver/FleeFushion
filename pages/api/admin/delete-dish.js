import { ObjectId } from "bson";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const session = await getServerSession(req, res, authOptions)
            if (session) {
                const { db } = await connectToDatabase()
                const admin = await db.collection('admin').findOne({ user: session.user.email })
                if (!admin) {
                    return res.status(401).json({ message: 'Unauthorized' })
                }
                else {
                   await db.collection('dishes').deleteOne({_id:new ObjectId(req.body._id)})
                    return res.status(200).json({ message: 'Dish Deleted successfully' })
                }
            }
            else {
                return res.status(401).json({ message: 'Unauthorized' })
            }
        }
        else {
            return res.status(401).json({ message: 'Bad Request' })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server error' })
    }
}