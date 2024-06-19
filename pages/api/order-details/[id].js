import { ObjectId } from "bson";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
    try {
        const session = await getServerSession(req,res,authOptions)
        if (session) {
            const { db } = await connectToDatabase()
            let order
            if (session.admin) {
                order = await db.collection('orders').findOne({ _id: new ObjectId(req.query.id) })
            }
            else {
                order = await db.collection('orders').findOne({ user: session.user.email, _id: new ObjectId(req.query.id) })
            }
            if (!order) {
                return res.status(401).json({ message: 'Not found' })
            }
            order = JSON.parse(JSON.stringify(order))
            return res.status(200).json(order)
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}