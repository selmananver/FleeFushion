import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
    try {
        const session = await getServerSession(req,res,authOptions)

        if (session && session.admin) {
            const { db } = await connectToDatabase()
            let orders = await db.collection('orders').find({
                payment_status: 'paid',
                'order_status.current.status': {
                    $in: ['shipping soon', 'shipped', 'out for delivery']
                }
            }).sort({ timestamp: -1 }).toArray()
            orders = JSON.parse(JSON.stringify(orders))
            return res.status(200).json(orders)
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