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
                    const { _id, title, category, description, price, image } = req.body
                    await db.collection('dishes').replaceOne({ _id: new ObjectId(_id) }, { title, category, description, price:parseInt(price), image })
                    return res.status(200).json({ message: 'Dish Updated successfully' })
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