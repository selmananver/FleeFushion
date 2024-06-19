

import { ObjectId } from "bson";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "../components/utils/mongodb";
import  authOptions from "./auth/[...nextauth]";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === 'POST') {
            const { status, _id } = req.body
            const { db } = await connectToDatabase()
            const order = await db.collection('orders').findOne({ _id: new ObjectId(_id) })
            if (order) {
                if (order.user === session.user.email || session.admin) {
                    const order_status = { status, timestamp: new Date() }
                    await db.collection('orders').updateOne({ _id: new ObjectId(_id) },  {
                        $set: { 'order_status.current': order_status },
                        $push: { 'order_status.info': order_status }
                      }
                    )
                    return res.status(200).json({ message: 'Order cancelled' })
                }
                else {
                    return res.status(401).json({ message: 'Unauthorized' })
                }
            }
            else {
                return res.status(401).json({ message: 'Order not found' })
            }
        }
        else {
            return res.status(401).json({ message: 'Bad Request' })
        }
    }
    else {
        return res.status(401).json({ message: 'Bad Request' })
    }
}



